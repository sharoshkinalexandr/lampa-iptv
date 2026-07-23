import { LIMITS } from '../config';
import type { M3uParseReport, M3uParseResult, PlaylistEntry, PlaylistHeaders } from '../types';
import { isAllowedUrl } from './security';

interface PendingEntry {
  name: string;
  attributes: Record<string, string>;
  line: number;
  raw: string[];
  headers: PlaylistHeaders;
}

function findCommaOutsideQuotes(value: string): number {
  let quote = '';
  for (let index = 0; index < value.length; index += 1) {
    const character = value[index] ?? '';
    if ((character === '"' || character === "'") && value[index - 1] !== '\\') {
      if (quote === character) quote = '';
      else if (!quote) quote = character;
    } else if (character === ',' && !quote) {
      return index;
    }
  }
  return -1;
}

export function parseAttributes(value: string): Record<string, string> {
  const attributes: Record<string, string> = {};
  const matcher = /([A-Za-z0-9_-]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s]+))/g;
  let match: RegExpExecArray | null;
  while ((match = matcher.exec(value)) !== null) {
    const key = (match[1] ?? '').toLocaleLowerCase('en-US');
    attributes[key] = match[2] ?? match[3] ?? match[4] ?? '';
  }
  return attributes;
}

function parseExtinf(line: string, lineNumber: number): PendingEntry {
  const body = line.slice(line.indexOf(':') + 1);
  const commaIndex = findCommaOutsideQuotes(body);
  const metadata = commaIndex >= 0 ? body.slice(0, commaIndex) : body;
  const attributes = parseAttributes(metadata);
  const name =
    (commaIndex >= 0 ? body.slice(commaIndex + 1).trim() : '') ||
    attributes['tvg-name'] ||
    attributes['tvg-id'] ||
    `Канал из строки ${lineNumber}`;

  return {
    name,
    attributes,
    line: lineNumber,
    raw: [line],
    headers: {
      userAgent: attributes['user-agent'],
      referer: attributes['http-referrer'] ?? attributes['referer'],
      origin: attributes['origin']
    }
  };
}

function splitUrlAndOptions(value: string): { url: string; headers: PlaylistHeaders } {
  const separator = value.indexOf('|');
  if (separator < 0) return { url: value.trim(), headers: {} };
  const url = value.slice(0, separator).trim();
  const options = new URLSearchParams(value.slice(separator + 1));
  const lookup = (name: string): string | undefined =>
    options.get(name) ?? options.get(name.toLocaleLowerCase('en-US')) ?? undefined;
  return {
    url,
    headers: {
      userAgent: lookup('User-Agent'),
      referer: lookup('Referer') ?? lookup('Referrer'),
      origin: lookup('Origin'),
      authorization: lookup('Authorization'),
      cookie: lookup('Cookie')
    }
  };
}

function resolveUrl(value: string, baseUrl?: string): string | undefined {
  if (isAllowedUrl(value)) return value;
  if (!baseUrl || !isAllowedUrl(value, true)) return undefined;
  try {
    const result = new URL(value, baseUrl).toString();
    return isAllowedUrl(result) ? result : undefined;
  } catch {
    return undefined;
  }
}

function parseHeaderUrls(line: string): string[] {
  const attributes = parseAttributes(line);
  return [attributes['url-tvg'], attributes['x-tvg-url']]
    .filter((value): value is string => Boolean(value))
    .flatMap((value) => value.split(','))
    .map((value) => value.trim())
    .filter((url) => isAllowedUrl(url));
}

export function parseM3u(content: string, baseUrl?: string): M3uParseResult {
  if (new Blob([content]).size > LIMITS.maxM3uBytes) {
    throw new Error(`Плейлист превышает лимит ${LIMITS.maxM3uBytes / 1024 / 1024} МБ.`);
  }

  const normalized = content.replace(/^\uFEFF/, '').replace(/\r\n?/g, '\n');
  const lines = normalized.split('\n');
  const report: M3uParseReport = {
    processedLines: lines.length,
    foundChannels: 0,
    skippedEntries: 0,
    duplicateUrls: 0,
    warnings: [],
    errors: [],
    epgUrls: []
  };
  const firstMeaningful = lines.find((line) => line.trim().length > 0);
  if (!firstMeaningful?.trim().startsWith('#EXTM3U')) {
    report.warnings.push('Заголовок #EXTM3U отсутствует; выполнен осторожный разбор записей.');
  } else {
    report.epgUrls.push(...parseHeaderUrls(firstMeaningful));
  }

  const entries: PlaylistEntry[] = [];
  const seenUrls = new Set<string>();
  let pending: PendingEntry | undefined;

  for (let index = 0; index < lines.length; index += 1) {
    const raw = lines[index] ?? '';
    const line = raw.trim();
    const lineNumber = index + 1;
    if (!line) continue;

    if (line.startsWith('#EXTINF:')) {
      if (pending) {
        report.skippedEntries += 1;
        report.warnings.push(`Строка ${pending.line}: у записи отсутствует URL.`);
      }
      pending = parseExtinf(line, lineNumber);
      continue;
    }

    if (!pending) continue;

    if (line.startsWith('#EXTVLCOPT:')) {
      const option = line.slice('#EXTVLCOPT:'.length);
      const separator = option.indexOf('=');
      if (separator > 0) {
        const key = option.slice(0, separator).trim().toLocaleLowerCase('en-US');
        const value = option
          .slice(separator + 1)
          .trim()
          .replace(/^["']|["']$/g, '');
        if (key === 'http-user-agent') pending.headers.userAgent = value;
        if (key === 'http-referrer' || key === 'http-referer') pending.headers.referer = value;
        if (key === 'http-origin') pending.headers.origin = value;
        if (key === 'http-cookie') pending.headers.cookie = value;
      }
      pending.raw.push(line);
      continue;
    }

    if (line.startsWith('#EXTGRP:')) {
      pending.attributes['group-title'] ||= line.slice('#EXTGRP:'.length).trim();
      pending.raw.push(line);
      continue;
    }

    if (line.startsWith('#')) {
      pending.raw.push(line);
      continue;
    }

    const split = splitUrlAndOptions(line);
    const url = resolveUrl(split.url, baseUrl);
    pending.raw.push(line);
    if (!url) {
      report.skippedEntries += 1;
      report.warnings.push(`Строка ${lineNumber}: URL имеет неподдерживаемый формат.`);
      pending = undefined;
      continue;
    }

    if (entries.length >= LIMITS.maxM3uEntries) {
      report.errors.push(`Достигнут лимит ${LIMITS.maxM3uEntries} записей.`);
      break;
    }

    if (seenUrls.has(url)) report.duplicateUrls += 1;
    seenUrls.add(url);
    const attributes = pending.attributes;
    entries.push({
      name: pending.name,
      tvgId: attributes['tvg-id'] || undefined,
      tvgName: attributes['tvg-name'] || undefined,
      tvgLogo: attributes['tvg-logo'] || undefined,
      tvgChno: Number.isFinite(Number(attributes['tvg-chno']))
        ? Number(attributes['tvg-chno'])
        : undefined,
      group: attributes['group-title'] || undefined,
      url,
      headers: {
        userAgent: split.headers.userAgent ?? pending.headers.userAgent,
        referer: split.headers.referer ?? pending.headers.referer,
        origin: split.headers.origin ?? pending.headers.origin,
        authorization: split.headers.authorization ?? pending.headers.authorization,
        cookie: split.headers.cookie ?? pending.headers.cookie
      },
      catchup:
        attributes['catchup'] || attributes['catchup-source'] || attributes['catchup-days']
          ? {
              type: attributes['catchup'],
              source: attributes['catchup-source'],
              days: Number(attributes['catchup-days']) || undefined
            }
          : undefined,
      attributes,
      line: pending.line,
      raw: pending.raw.join('\n')
    });
    pending = undefined;
  }

  if (pending) {
    report.skippedEntries += 1;
    report.warnings.push(`Строка ${pending.line}: у последней записи отсутствует URL.`);
  }

  report.foundChannels = entries.length;
  report.epgUrls = Array.from(new Set(report.epgUrls));
  return { entries, report };
}
