import type { DiagnosticLogEntry, StreamHeaders } from '../types';

const SECRET_QUERY_KEYS =
  /^(?:token|key|auth|authorization|password|passwd|pass|username|user|login|cookie|signature|sig|session|access_token)$/i;

export function isAllowedUrl(value: string, allowRelative = false): boolean {
  const trimmed = value.trim();
  if (!trimmed || /^(?:javascript|data|vbscript|file|blob):/i.test(trimmed)) return false;
  if (allowRelative && /^(?:\.{0,2}\/|\/)/.test(trimmed)) return true;

  try {
    const parsed = new URL(trimmed);
    return parsed.protocol === 'https:' || parsed.protocol === 'http:';
  } catch {
    return false;
  }
}

export function normalizeServerUrl(value: string): string {
  const trimmed = value.trim().replace(/\/+$/, '');
  if (!isAllowedUrl(trimmed)) throw new Error('Разрешены только URL с протоколом HTTP или HTTPS.');
  return trimmed;
}

export function maskUrl(value: string): string {
  try {
    const parsed = new URL(value);
    if (parsed.username) parsed.username = '***';
    if (parsed.password) parsed.password = '***';
    for (const key of Array.from(parsed.searchParams.keys())) {
      if (SECRET_QUERY_KEYS.test(key)) parsed.searchParams.set(key, '***');
    }
    parsed.pathname = parsed.pathname
      .split('/')
      .map((segment) =>
        segment.length > 20 && /[A-Za-z0-9_-]{16,}/.test(segment) ? '***' : segment
      )
      .join('/');
    return parsed.toString();
  } catch {
    return value
      .replace(/([?&](?:token|key|auth|password|user|login)=)[^&\s]+/gi, '$1***')
      .replace(/\/\/([^:/\s]+):([^@/\s]+)@/g, '//***:***@');
  }
}

export function maskHeaders(headers: StreamHeaders | undefined): StreamHeaders | undefined {
  if (!headers) return undefined;
  return {
    userAgent: headers.userAgent,
    referer: headers.referer ? maskUrl(headers.referer) : undefined,
    origin: headers.origin,
    authorization: headers.authorization ? '***' : undefined,
    cookie: headers.cookie ? '***' : undefined
  };
}

export function sanitizeLogMessage(message: string): string {
  return maskUrl(message)
    .replace(/(authorization|cookie|password|passwd|token)\s*[:=]\s*[^\s,;]+/gi, '$1=***')
    .slice(0, 1000);
}

export function addDiagnostic(
  entries: DiagnosticLogEntry[],
  level: DiagnosticLogEntry['level'],
  message: string,
  max = 100
): DiagnosticLogEntry[] {
  const next = [
    ...entries,
    {
      at: new Date().toISOString(),
      level,
      message: sanitizeLogMessage(message)
    }
  ];
  return next.slice(-max);
}

function fallbackHash(value: string): string {
  let first = 0x811c9dc5;
  let second = 0x9e3779b9;
  for (let index = 0; index < value.length; index += 1) {
    const code = value.charCodeAt(index);
    first = Math.imul(first ^ code, 0x01000193);
    second = Math.imul(second ^ code, 0x85ebca6b);
  }
  return `${(first >>> 0).toString(16).padStart(8, '0')}${(second >>> 0)
    .toString(16)
    .padStart(8, '0')}`;
}

export async function hashPin(pin: string, salt: string): Promise<string> {
  const input = new TextEncoder().encode(`${salt}:${pin}`);
  if (globalThis.crypto?.subtle) {
    const digest = await globalThis.crypto.subtle.digest('SHA-256', input);
    return Array.from(new Uint8Array(digest))
      .map((byte) => byte.toString(16).padStart(2, '0'))
      .join('');
  }
  return fallbackHash(`${salt}:${pin}`);
}

export function createSalt(): string {
  if (globalThis.crypto?.getRandomValues) {
    const bytes = new Uint8Array(16);
    globalThis.crypto.getRandomValues(bytes);
    return Array.from(bytes)
      .map((byte) => byte.toString(16).padStart(2, '0'))
      .join('');
  }
  return `${Date.now().toString(36)}${Math.random().toString(36).slice(2)}`;
}
