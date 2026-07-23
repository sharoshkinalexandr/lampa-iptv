const QUALITY_MARKERS =
  /\b(?:uhd|fhd|full\s*hd|hd|sd|4k|2160p|1440p|1080p|720p|576p|480p|hevc|h265|h264)\b/gi;

export function normalizeName(value: string): string {
  return value
    .normalize('NFKC')
    .toLocaleLowerCase('ru-RU')
    .replace(QUALITY_MARKERS, ' ')
    .replace(/ё/g, 'е')
    .replace(/&/g, ' и ')
    .replace(/[«»"'`’]/g, '')
    .replace(/[^a-zа-я0-9]+/gi, ' ')
    .trim()
    .replace(/\s+/g, ' ');
}

export function normalizeExact(value: string | undefined): string {
  return (value ?? '').normalize('NFKC').trim().toLocaleLowerCase('ru-RU');
}

export function stableId(prefix: string, value: string): string {
  let hash = 2166136261;
  const text = `${prefix}:${value}`;
  for (let index = 0; index < text.length; index += 1) {
    hash ^= text.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return `${prefix}-${(hash >>> 0).toString(16).padStart(8, '0')}`;
}
