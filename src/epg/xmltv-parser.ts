import { LIMITS } from '../config';
import type { EpgChannel, EpgProgram, XmltvResult } from '../types';

function text(element: Element, selector: string): string | undefined {
  const value = element.querySelector(selector)?.textContent?.trim();
  return value || undefined;
}

export function parseXmltvTime(value: string, defaultOffsetMinutes = 0): number {
  const match = /^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})?(?:\s*([+-])(\d{2})(\d{2})|Z)?$/.exec(
    value.trim()
  );
  if (!match) return Number.NaN;
  const year = Number(match[1]);
  const month = Number(match[2]) - 1;
  const day = Number(match[3]);
  const hour = Number(match[4]);
  const minute = Number(match[5]);
  const second = Number(match[6] ?? 0);
  const sign = match[7] === '-' ? -1 : 1;
  const explicitOffset =
    match[8] && match[9] ? sign * (Number(match[8]) * 60 + Number(match[9])) : undefined;
  const offset = explicitOffset ?? defaultOffsetMinutes;
  return Date.UTC(year, month, day, hour, minute, second) - offset * 60_000;
}

export function parseXmltv(content: string, defaultOffsetMinutes = 0): XmltvResult {
  if (new Blob([content]).size > LIMITS.maxXmltvBytes) {
    throw new Error(`XMLTV превышает лимит ${LIMITS.maxXmltvBytes / 1024 / 1024} МБ.`);
  }
  if (/<!DOCTYPE|<!ENTITY/i.test(content)) {
    throw new Error(
      'XMLTV с DTD или внешними сущностями не поддерживается из соображений безопасности.'
    );
  }
  const documentNode = new DOMParser().parseFromString(content, 'application/xml');
  if (documentNode.querySelector('parsererror'))
    throw new Error('XMLTV содержит некорректный XML.');

  const channels: EpgChannel[] = Array.from(documentNode.querySelectorAll('channel'))
    .map((element) => ({
      id: element.getAttribute('id')?.trim() ?? '',
      names: Array.from(element.querySelectorAll('display-name'))
        .map((name) => name.textContent?.trim() ?? '')
        .filter(Boolean),
      icon: element.querySelector('icon')?.getAttribute('src') ?? undefined
    }))
    .filter((channel) => Boolean(channel.id));

  const warnings: string[] = [];
  const programs: EpgProgram[] = [];
  const elements = Array.from(documentNode.querySelectorAll('programme')).slice(
    0,
    LIMITS.maxPrograms
  );
  for (const element of elements) {
    const channelId = element.getAttribute('channel')?.trim() ?? '';
    const start = parseXmltvTime(element.getAttribute('start') ?? '', defaultOffsetMinutes);
    const stop = parseXmltvTime(element.getAttribute('stop') ?? '', defaultOffsetMinutes);
    const title = text(element, 'title') ?? '';
    if (
      !channelId ||
      !title ||
      !Number.isFinite(start) ||
      !Number.isFinite(stop) ||
      stop <= start
    ) {
      warnings.push('Пропущена программа с неполными или некорректными полями.');
      continue;
    }
    programs.push({
      channelId,
      start,
      stop,
      title,
      description: text(element, 'desc'),
      category: text(element, 'category'),
      icon: element.querySelector('icon')?.getAttribute('src') ?? undefined,
      episode: text(element, 'episode-num'),
      rating: text(element, 'rating value')
    });
  }
  if (documentNode.querySelectorAll('programme').length > LIMITS.maxPrograms) {
    warnings.push(`Применён лимит ${LIMITS.maxPrograms} программ.`);
  }
  return {
    channels,
    programs: programs.sort((left, right) => left.start - right.start),
    warnings: Array.from(new Set(warnings)).slice(0, 100)
  };
}

export function programProgress(program: EpgProgram, now = Date.now()): number {
  if (now <= program.start) return 0;
  if (now >= program.stop) return 100;
  return Math.max(0, Math.min(100, ((now - program.start) / (program.stop - program.start)) * 100));
}
