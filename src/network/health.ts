import type { ChannelSource, HealthResult, StreamStatus } from '../types';

function result(
  status: StreamStatus,
  detail: string,
  startedAt: number,
  httpStatus?: number
): HealthResult {
  return {
    status,
    detail,
    checkedAt: new Date().toISOString(),
    responseTimeMs: Date.now() - startedAt,
    httpStatus
  };
}

function statusFromHttp(code: number): StreamStatus {
  if (code === 401 || code === 403) return 'auth_required';
  if (code === 404 || code === 410) return 'offline';
  if (code === 429 || code >= 500) return 'temporarily_unavailable';
  return code >= 400 ? 'offline' : 'unknown';
}

function hasForbiddenBrowserHeaders(source: ChannelSource): boolean {
  return Boolean(
    source.headers?.userAgent ||
    source.headers?.referer ||
    source.headers?.origin ||
    source.headers?.cookie ||
    source.headers?.authorization
  );
}

export async function checkStream(
  source: ChannelSource,
  timeoutMs = 12_000
): Promise<HealthResult> {
  const startedAt = Date.now();
  if (!source.url) return result('not_configured', 'Источник не настроен.', startedAt);
  if (location.protocol === 'https:' && source.url.startsWith('http:')) {
    return result(
      'unsupported',
      'HTTP-поток заблокирован политикой mixed content на HTTPS-странице.',
      startedAt
    );
  }
  const controller = typeof AbortController !== 'undefined' ? new AbortController() : undefined;
  const timeout = globalThis.setTimeout(() => controller?.abort(), timeoutMs);
  try {
    const response = await fetch(source.url, {
      method: 'GET',
      signal: controller?.signal,
      credentials: 'omit',
      redirect: 'follow',
      headers: {
        Accept: 'application/vnd.apple.mpegurl, application/x-mpegURL, video/*, */*',
        Range: 'bytes=0-131071'
      }
    });
    if (!response.ok && response.status !== 206) {
      return result(
        statusFromHttp(response.status),
        `Сервер ответил HTTP ${response.status}.`,
        startedAt,
        response.status
      );
    }
    const contentType = response.headers.get('content-type') ?? '';
    if (/mpegurl|m3u8/i.test(contentType) || /\.m3u8(?:$|[?#])/i.test(source.url)) {
      const body = await response.text();
      if (
        !body
          .replace(/^\uFEFF/, '')
          .trimStart()
          .startsWith('#EXTM3U')
      ) {
        return result(
          'offline',
          'Ответ не является HLS-манифестом #EXTM3U.',
          startedAt,
          response.status
        );
      }
      const hasMedia = /#EXT-X-STREAM-INF|#EXTINF|#EXT-X-TARGETDURATION|#EXT-X-MEDIA/i.test(body);
      if (!hasMedia) {
        return result('offline', 'HLS-манифест не содержит вариантов или сегментов.', startedAt);
      }
    }
    const elapsed = Date.now() - startedAt;
    return result(
      elapsed > Math.min(5_000, timeoutMs / 2) ? 'slow' : 'online',
      hasForbiddenBrowserHeaders(source)
        ? 'Поток ответил, но специальные заголовки браузером не проверялись.'
        : 'Источник ответил корректно.',
      startedAt,
      response.status
    );
  } catch (error) {
    if ((error as Error).name === 'AbortError') {
      return result('offline', 'Истекло время ожидания ответа.', startedAt);
    }
    if (error instanceof TypeError) {
      return result(
        'cors_unknown',
        'Браузер не смог проверить поток: CORS или сетевая политика. Это не доказывает недоступность в нативном плеере.',
        startedAt
      );
    }
    return result('offline', (error as Error).message || 'Неизвестная ошибка проверки.', startedAt);
  } finally {
    globalThis.clearTimeout(timeout);
  }
}

export function applyHealthResult(source: ChannelSource, health: HealthResult): void {
  source.status = health.status;
  source.responseTimeMs = health.responseTimeMs;
  source.lastCheckedAt = health.checkedAt;
}
