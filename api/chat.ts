/// <reference types="node" />
export const config = { runtime: 'nodejs' };
import process from 'node:process';
import { projects } from '../data/projects';

type ClientMessage = {
  role: 'user' | 'assistant' | string;
  content: string;
};

type PageContext = {
  route?: string;
  projectSlug?: string;
};

type ChatRequestBody = {
  messages?: ClientMessage[];
  pageContext?: PageContext;
};

type RateLimitEntry = { count: number; resetAtMs: number };

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 20;
const MAX_MESSAGES = 12;
const MAX_MESSAGE_LENGTH = 1200;

const getRateLimitStore = (): Map<string, RateLimitEntry> => {
  const globalAny = globalThis as any;
  if (!globalAny.__portfolioChatRateLimitStore) {
    globalAny.__portfolioChatRateLimitStore = new Map<string, RateLimitEntry>();
  }
  return globalAny.__portfolioChatRateLimitStore as Map<string, RateLimitEntry>;
};

const getClientIp = (req: any): string => {
  const forwardedFor = req?.headers?.['x-forwarded-for'];
  if (typeof forwardedFor === 'string' && forwardedFor.trim()) {
    return forwardedFor.split(',')[0]?.trim() || 'unknown';
  }
  return req?.socket?.remoteAddress || 'unknown';
};

const safeJson = async (req: any): Promise<any> => {
  if (req?.body && typeof req.body === 'object') return req.body;
  if (typeof req?.body === 'string') {
    try {
      return JSON.parse(req.body);
    } catch {
      return null;
    }
  }
  return null;
};

const normalizeText = (text: string): string =>
  text
    .toLowerCase()
    .replace(/[\u0000-\u001f]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const tokenize = (text: string): string[] =>
  normalizeText(text)
    .split(/[^a-zа-я0-9]+/i)
    .filter((token) => token.length >= 3);

const buildProjectLinks = (project: any) => {
  const asHashRoute = (path?: string) => {
    if (!path) return undefined;
    const normalized = path.startsWith('/') ? path : `/${path}`;
    return `/#${normalized}`;
  };

  return {
    project: asHashRoute(`/project/${project.slug}`),
    documentation: asHashRoute(project.documentationPage),
    report: asHashRoute(project.reportPage),
    repo: project.repoUrl,
  };
};

const relevanceScore = (project: any, query: string): number => {
  const q = normalizeText(query);
  let score = 0;

  if (project?.slug && q.includes(String(project.slug).toLowerCase())) score += 8;

  const titleTokens = tokenize(project?.title || '');
  for (const token of titleTokens) {
    if (q.includes(token)) score += 2;
  }

  const techs: string[] = Array.isArray(project?.technologies) ? project.technologies : [];
  for (const tech of techs) {
    const t = normalizeText(String(tech));
    if (t && q.includes(t)) score += 3;
  }

  const summary = normalizeText(project?.summary || '');
  if (summary) {
    const summaryTokens = tokenize(summary).slice(0, 10);
    for (const token of summaryTokens) {
      if (q.includes(token)) score += 1;
    }
  }

  return score;
};

const buildPortfolioContext = (selectedProjects: any[]) => {
  const catalog = projects
    .map((p: any) => {
      const links = buildProjectLinks(p);
      return [
        `- ${p.title} (slug: ${p.slug})`,
        `  summary: ${p.summary}`,
        links.project ? `  link: ${links.project}` : null,
      ]
        .filter(Boolean)
        .join('\n');
    })
    .join('\n');

  const detailed = selectedProjects
    .map((p: any) => {
      const links = buildProjectLinks(p);
      const techs = Array.isArray(p.technologies) ? p.technologies.join(', ') : '';
      const keyFeatures = Array.isArray(p.keyFeatures) ? p.keyFeatures.map((x: string) => `- ${x}`).join('\n') : '';
      const keyTakeaways = Array.isArray(p.keyTakeaways) ? p.keyTakeaways.map((x: string) => `- ${x}`).join('\n') : '';

      return [
        `PROJECT_START`,
        `slug: ${p.slug}`,
        `title: ${p.title}`,
        `summary: ${p.summary}`,
        `description: ${p.description}`,
        techs ? `technologies: ${techs}` : null,
        keyFeatures ? `key_features:\n${keyFeatures}` : null,
        keyTakeaways ? `key_takeaways:\n${keyTakeaways}` : null,
        links.project ? `link_project: ${links.project}` : null,
        links.documentation ? `link_documentation: ${links.documentation}` : null,
        links.report ? `link_report: ${links.report}` : null,
        links.repo ? `link_repo: ${links.repo}` : null,
        `PROJECT_END`,
      ]
        .filter(Boolean)
        .join('\n');
    })
    .join('\n\n');

  return [
    `CATALOG_START`,
    catalog,
    `CATALOG_END`,
    selectedProjects.length > 0 ? `\nSELECTED_PROJECTS_START\n${detailed}\nSELECTED_PROJECTS_END` : '',
  ]
    .filter(Boolean)
    .join('\n');
};

const extractAssistantReply = (data: any): string | null => {
  const content = data?.choices?.[0]?.message?.content;
  if (typeof content === 'string' && content.trim()) return content;
  const alt = data?.choices?.[0]?.text;
  if (typeof alt === 'string' && alt.trim()) return alt;
  return null;
};

export default async function handler(req: any, res: any) {
  if (req?.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  const token = process.env.GPTUNNEL_TOKEN || process.env.GPTUNNEL_API_KEY;
  if (!token) {
    res.status(500).json({ error: 'Server misconfigured: missing GPTUNNEL_TOKEN' });
    return;
  }

  const store = getRateLimitStore();
  const ip = getClientIp(req);
  const now = Date.now();
  const entry = store.get(ip);
  if (!entry || entry.resetAtMs <= now) {
    store.set(ip, { count: 1, resetAtMs: now + RATE_LIMIT_WINDOW_MS });
  } else if (entry.count >= RATE_LIMIT_MAX_REQUESTS) {
    res.status(429).json({ error: 'Rate limit exceeded. Please try again later.' });
    return;
  } else {
    entry.count += 1;
    store.set(ip, entry);
  }

  const body = (await safeJson(req)) as ChatRequestBody | null;
  if (!body) {
    res.status(400).json({ error: 'Invalid JSON body' });
    return;
  }

  const rawMessages = Array.isArray(body.messages) ? body.messages : [];
  const pageContext: PageContext = body.pageContext || {};

  const messages = rawMessages
    .filter((m) => m && typeof m.content === 'string')
    .map((m) => ({
      role: m.role === 'assistant' ? 'assistant' : 'user',
      content: String(m.content).trim().slice(0, MAX_MESSAGE_LENGTH),
    }))
    .filter((m) => m.content.length > 0)
    .slice(-MAX_MESSAGES);

  const lastUserMessage = [...messages].reverse().find((m) => m.role === 'user')?.content;
  if (!lastUserMessage) {
    res.status(400).json({ error: 'No user message provided' });
    return;
  }

  const projectBySlug =
    typeof pageContext.projectSlug === 'string'
      ? projects.find((p: any) => p.slug === pageContext.projectSlug)
      : undefined;

  const rankedProjects = projects
    .map((p: any) => ({ project: p, score: relevanceScore(p, lastUserMessage) }))
    .sort((a: any, b: any) => b.score - a.score)
    .filter((x: any) => x.score > 0)
    .slice(0, 2)
    .map((x: any) => x.project);

  const selectedProjects = Array.from(
    new Map(
      [projectBySlug, ...rankedProjects].filter(Boolean).map((p: any) => [p.slug, p]),
    ).values(),
  );

  const context = buildPortfolioContext(selectedProjects);
  const model = process.env.GPTUNNEL_MODEL || 'gemini-3-flash';
  const apiUrl = process.env.GPTUNNEL_BASE_URL
    ? `${process.env.GPTUNNEL_BASE_URL.replace(/\/$/, '')}/v1/chat/completions`
    : 'https://gptunnel.ru/v1/chat/completions';

  const systemPrompt = [
    `Ты — публичный AI-консультант портфолио. Отвечай на русском.`,
    `Правила:`,
    `- Используй только факты из CONTEXT ниже. Если данных не хватает — скажи об этом и попроси уточнить (например, выбрать проект по slug).`,
    `- Не выдумывай цифры, компании, опыт и ссылки. Не делай вид, что видел репозиторий, если ссылки нет в контексте.`,
    `- Если вопрос не про портфолио/проекты/технологии — мягко верни пользователя к этим темам.`,
    `- Пиши кратко и структурно: 3–8 буллетов, при необходимости 1 короткий абзац.`,
    `- Если уместно, в конце добавь блок "Ссылки" (только из CONTEXT).`,
    ``,
    `CONTEXT:`,
    context,
  ].join('\n');

  const payload = {
    model,
    messages: [{ role: 'system', content: systemPrompt }, ...messages],
    temperature: 0.2,
  };

  const headersBase: Record<string, string> = {
    'Content-Type': 'application/json',
    Authorization: token,
  };

  const doRequest = async (authorizationValue: string) => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 25_000);
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { ...headersBase, Authorization: authorizationValue },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      const json = await response.json().catch(() => null);
      return { response, json };
    } finally {
      clearTimeout(timeout);
    }
  };

  let result = await doRequest(token);
  if (
    (result.response.status === 401 || result.response.status === 403) &&
    typeof token === 'string' &&
    !token.toLowerCase().startsWith('bearer ')
  ) {
    result = await doRequest(`Bearer ${token}`);
  }

  if (!result.response.ok) {
    const errorData = result.json as any;
    const message =
      errorData?.error?.message ||
      errorData?.error ||
      errorData?.message ||
      `Upstream error: ${result.response.status}`;
    res.status(502).json({ error: message });
    return;
  }

  const reply = extractAssistantReply(result.json);
  if (!reply) {
    res.status(502).json({ error: 'Upstream returned empty response' });
    return;
  }

  res.status(200).json({
    reply,
    detectedProjectSlugs: selectedProjects.map((p: any) => p.slug),
  });
}
