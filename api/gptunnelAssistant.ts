// Helper utilities for GPTunnel Assistant chat API.
// - Resolves env vars from multiple runtimes (process/import.meta/window).
// - Generates or derives stable chatId per user.
// - Sends messages to GPTunnel Assistant endpoint.

type SendAssistantMessageOptions = {
  message: string;
  chatId: string;
  assistantCode?: string;
  maxContext?: number;
  images?: string[];
  stream?: boolean;
  useProxy?: boolean;
};

const CHAT_ID_STORAGE_KEY = 'gptunnel_chat_id';

const safeGetEnv = (key: string): string | undefined => {
  // Server-side only: read from process.env
  try {
    if (typeof process !== 'undefined' && process.env && process.env[key]) {
      return process.env[key];
    }
  } catch (_) {
    /* ignore */
  }

  return undefined;
};

const randomId = (): string => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  // Fallback UUID v4-ish
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

const hashToken = async (token: string): Promise<string> => {
  try {
    if (typeof crypto !== 'undefined' && crypto.subtle && crypto.subtle.digest) {
      const data = new TextEncoder().encode(token);
      const hash = await crypto.subtle.digest('SHA-256', data);
      const hex = Array.from(new Uint8Array(hash))
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('');
      return hex.slice(0, 36);
    }
  } catch (_) {
    /* ignore */
  }

  // Lightweight sync hash fallback (not cryptographically strong).
  let h1 = 0x811c9dc5;
  for (let i = 0; i < token.length; i += 1) {
    h1 ^= token.charCodeAt(i);
    h1 = Math.imul(h1, 0x01000193);
  }
  return Math.abs(h1).toString(16).padStart(24, '0').slice(0, 32);
};

export const resolveChatId = async (sessionToken?: string): Promise<string> => {
  // Server-side: no localStorage, use sessionToken or generate random
  if (sessionToken && sessionToken.trim()) {
    const base = sessionToken.length >= 24 && sessionToken.length <= 36
      ? sessionToken
      : await hashToken(sessionToken);
    return base.slice(0, 36);
  }

  // Generate fresh random ID
  return randomId();
};

export const sendAssistantMessage = async ({
  message,
  chatId,
  assistantCode,
  maxContext = 10,
  images,
  stream,
  useProxy,
}: SendAssistantMessageOptions): Promise<string> => {
  // Always use direct API unless useProxy is explicitly true or proxyPref is set
  const proxyEndpoint = safeGetEnv('GPTUNNEL_PROXY_URL') || '/api/assistant-chat';
  const proxyPref = String(safeGetEnv('GPTUNNEL_USE_PROXY') || '').toLowerCase() === 'true';

  const apiKey = safeGetEnv('GPTUNNEL_API_KEY');
  const code = assistantCode || safeGetEnv('GPTUNNEL_ASSISTANT_CODE');
  const baseUrl = safeGetEnv('GPTUNNEL_BASE_URL')?.replace(/\/$/, '') || 'https://gptunnel.ru';
  const hasDirectCreds = Boolean(apiKey && code);
  const shouldUseProxy =
    typeof useProxy === 'boolean'
      ? useProxy
      : proxyPref;

  const endpoint = shouldUseProxy ? proxyEndpoint : `${baseUrl}/v1/assistant/chat`;

  if (!shouldUseProxy) {
    if (!apiKey) {
      throw new Error('GPTunnel API key is missing. Set GPTUNNEL_API_KEY in .env.local.');
    }
    if (!code) {
      throw new Error('Assistant code is missing. Set GPTUNNEL_ASSISTANT_CODE in .env.local.');
    }
  }

  if (!message || !message.trim()) {
    throw new Error('Message is empty.');
  }

  const body: Record<string, any> = {
    chatId,
    message: message.trim(),
    maxContext,
  };
  if (!shouldUseProxy) {
    body.assistantCode = code;
  }

  if (Array.isArray(images) && images.length > 0) {
    body.images = images;
  }
  if (typeof stream === 'boolean') {
    body.stream = stream;
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      ...(shouldUseProxy ? {} : { Authorization: apiKey as string }),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`GPTunnel request failed (${response.status}): ${text || response.statusText}`);
  }

  let data: any = null;
  try {
    data = await response.json();
  } catch (_) {
    /* ignore */
  }

  const answer =
    data?.choices?.[0]?.message?.content ||
    data?.choices?.[0]?.text ||
    data?.message ||
    data?.answer;

  if (typeof answer === 'string' && answer.trim()) {
    return answer.trim();
  }

  return typeof data === 'string' ? data : JSON.stringify(data || {});
};
