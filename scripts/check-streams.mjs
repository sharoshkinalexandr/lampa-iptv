import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const sourcesFile = path.join(root, 'public', 'data', 'sources.json');
const healthFile = path.join(root, 'public', 'data', 'health.json');
const sources = JSON.parse(await readFile(sourcesFile, 'utf8'));
const allowed = sources.filter(
  (source) =>
    source.public === true &&
    source.official === true &&
    source.url &&
    /^https?:\/\//i.test(source.url)
);

async function check(source) {
  const started = Date.now();
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12_000);
  try {
    const response = await fetch(source.url, {
      method: 'GET',
      signal: controller.signal,
      redirect: 'follow',
      headers: { Range: 'bytes=0-131071' }
    });
    let status = response.ok || response.status === 206 ? 'online' : 'offline';
    if (response.status === 401 || response.status === 403) status = 'auth_required';
    if (response.status === 429 || response.status >= 500) status = 'temporarily_unavailable';
    if ((response.ok || response.status === 206) && /\.m3u8(?:$|[?#])/i.test(source.url)) {
      const body = await response.text();
      if (!body.trimStart().startsWith('#EXTM3U')) status = 'offline';
    }
    return {
      id: source.id,
      status,
      responseTimeMs: Date.now() - started,
      httpStatus: response.status,
      checkedAt: new Date().toISOString(),
      method: 'GET range + HLS manifest'
    };
  } catch (error) {
    return {
      id: source.id,
      status: error.name === 'AbortError' ? 'offline' : 'temporarily_unavailable',
      responseTimeMs: Date.now() - started,
      checkedAt: new Date().toISOString(),
      method: 'GET range',
      detail: error.name
    };
  } finally {
    clearTimeout(timeout);
  }
}

if (!allowed.length) {
  console.log('No repository-safe official public streams configured; health.json unchanged.');
} else {
  const results = [];
  for (let index = 0; index < allowed.length; index += 4) {
    results.push(...(await Promise.all(allowed.slice(index, index + 4).map(check))));
  }
  await writeFile(
    healthFile,
    `${JSON.stringify({ generatedAt: new Date().toISOString(), sources: results }, null, 2)}\n`
  );
  console.log(`Checked ${results.length} official public streams.`);
}
