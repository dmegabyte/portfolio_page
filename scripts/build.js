/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const esbuild = require('esbuild');

const readEnvFile = (filePath) => {
  if (!fs.existsSync(filePath)) return {};
  const raw = fs.readFileSync(filePath, 'utf8');
  const lines = raw.split(/\r?\n/);
  const env = {};
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    env[key] = value;
  }
  return env;
};

const mergeEnv = (...sources) => Object.assign({}, ...sources);

const projectRoot = process.cwd();
const env = mergeEnv(
  readEnvFile(path.join(projectRoot, '.env')),
  readEnvFile(path.join(projectRoot, '.env.local'))
);

const definedEnv = {
  API_KEY: env.GEMINI_API_KEY,
  GEMINI_API_KEY: env.GEMINI_API_KEY,
  GPTUNNEL_API_KEY: env.GPTUNNEL_API_KEY,
  GPTUNNEL_ASSISTANT_CODE: env.GPTUNNEL_ASSISTANT_CODE,
  GPTUNNEL_BASE_URL: env.GPTUNNEL_BASE_URL || '',
  GPTUNNEL_USE_PROXY: env.GPTUNNEL_USE_PROXY || '',
};

const cleanDist = () => {
  fs.rmSync(path.join(projectRoot, 'dist'), { recursive: true, force: true });
};

const copyStatic = () => {
  fs.copyFileSync(path.join(projectRoot, 'index.html'), path.join(projectRoot, 'dist', 'index.html'));
  fs.cpSync(path.join(projectRoot, 'assets'), path.join(projectRoot, 'dist', 'assets'), { recursive: true });
};

const main = async () => {
  cleanDist();

  await esbuild.build({
    entryPoints: [path.join(projectRoot, 'index.tsx')],
    bundle: true,
    outdir: path.join(projectRoot, 'dist'),
    splitting: true,
    format: 'esm',
    loader: { '.tsx': 'tsx' },
    external: ['react', 'react-dom', 'react-router-dom', '@heroicons/react/*'],
    define: {
      'process.env': JSON.stringify(definedEnv),
    },
  });

  copyStatic();

  const missing = [];
  if (!definedEnv.GPTUNNEL_API_KEY) missing.push('GPTUNNEL_API_KEY');
  if (!definedEnv.GPTUNNEL_ASSISTANT_CODE) missing.push('GPTUNNEL_ASSISTANT_CODE');
  if (missing.length > 0) {
    console.warn(`[build] Warning: missing env vars: ${missing.join(', ')}`);
  }
};

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
