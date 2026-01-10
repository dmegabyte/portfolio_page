export const config = { runtime: 'nodejs18.x' };
import { Buffer } from 'node:buffer';
import process from 'node:process';

type AnyReq = any;
type AnyRes = any;

const safeJson = async (req: AnyReq): Promise<any> => {
  if (req?.body && typeof req.body === 'object') return req.body;
  if (typeof req?.body === 'string') {
    try {
      return JSON.parse(req.body);
    } catch {
      return null;
    }
  }

  const chunks: Buffer[] = [];
  await new Promise<void>((resolve) => {
    req.on('data', (chunk: Buffer) => chunks.push(chunk));
    req.on('end', () => resolve());
    req.on('error', () => resolve());
  });
  if (chunks.length === 0) return null;
  try {
    return JSON.parse(Buffer.concat(chunks).toString('utf8'));
  } catch {
    return null;
  }
};

const normalizeAuthHeader = (raw: string): string => {
  const value = raw.trim();
  if (!value) return value;
  if (value.toLowerCase().startsWith('bearer ')) return value;
  return value;
};

const doRequest = async (authorization: string, payload: any, baseUrl?: string) => {
  const origin = (baseUrl || process.env.GPTUNNEL_BASE_URL || 'https://gptunnel.ru').replace(/\/$/, '');
  const endpoint = `${origin}/v1/assistant/chat`;
  const resp = await fetch(endpoint, {
    method: 'POST',
    headers: {
      Authorization: authorization,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const text = await resp.text();
  let json: any = null;
  try {
    json = text ? JSON.parse(text) : null;
  } catch {
    json = null;
  }

  return { resp, text, json };
};

export default async function handler(req: AnyReq, res: AnyRes) {
  if (req?.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  const token = process.env.GPTUNNEL_API_KEY || process.env.GPTUNNEL_TOKEN;
  const assistantCode = process.env.GPTUNNEL_ASSISTANT_CODE;

  if (!token) {
    res.status(500).json({ error: 'Server misconfigured: missing GPTUNNEL_API_KEY' });
    return;
  }
  if (!assistantCode) {
    res.status(500).json({ error: 'Server misconfigured: missing GPTUNNEL_ASSISTANT_CODE' });
    return;
  }

  const body = await safeJson(req);
  const chatId = body?.chatId;
  const message = body?.message;
  const maxContext = body?.maxContext;
  const images = body?.images;
  const stream = body?.stream;

  if (typeof chatId !== 'string' || chatId.length < 24 || chatId.length > 36) {
    res.status(400).json({ error: 'Invalid chatId: must be a string of length 24..36' });
    return;
  }
  if (typeof message !== 'string' || !message.trim()) {
    res.status(400).json({ error: 'Invalid message: must be a non-empty string' });
    return;
  }

  const payload: Record<string, any> = {
    chatId,
    assistantCode,
    message: message.trim(),
  };
  if (typeof maxContext === 'number') payload.maxContext = maxContext;
  if (Array.isArray(images) && images.length > 0) payload.images = images;
  if (typeof stream === 'boolean') payload.stream = stream;

  const auth = normalizeAuthHeader(token);

  let result = await doRequest(auth, payload, process.env.GPTUNNEL_BASE_URL);
  if (result.resp.status === 401 && !auth.toLowerCase().startsWith('bearer ')) {
    result = await doRequest(`Bearer ${auth}`, payload, process.env.GPTUNNEL_BASE_URL);
  }

  if (!result.resp.ok) {
    res.status(result.resp.status).send(result.text || result.resp.statusText);
    return;
  }

  res.status(200).send(result.text);
}
