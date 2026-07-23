import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import * as sass from 'sass';

const root = process.cwd();
const dist = path.join(root, 'dist');
await mkdir(dist, { recursive: true });

const packageJson = JSON.parse(await readFile(path.join(root, 'package.json'), 'utf8'));
const builtAt = new Date().toISOString();
const css = sass.compile(path.join(root, 'src', 'styles', 'plugin.scss'), {
  style: 'expanded'
}).css;
const minCss = sass.compile(path.join(root, 'src', 'styles', 'plugin.scss'), {
  style: 'compressed'
}).css;
await writeFile(path.join(dist, 'plugin.css'), css, 'utf8');
await writeFile(path.join(dist, 'plugin.min.css'), minCss, 'utf8');

const manifest = {
  id: 'lampa_iptv',
  name: 'Lampa IPTV',
  version: packageJson.version,
  description: 'IPTV-клиент Lampa со строгим реестром из 28 каналов',
  entry: 'plugin.js',
  minified: 'plugin.min.js',
  language: 'ru',
  channels: 28,
  telemetry: false,
  optionalClients: [
    {
      id: 'diesel_iptv',
      name: 'Дизель ТВ',
      enabledByDefault: false,
      script: 'https://andreyurl54.github.io/diesel5/diesel.js'
    }
  ],
  builtAt
};
await writeFile(path.join(dist, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`);
await writeFile(
  path.join(dist, 'version.json'),
  `${JSON.stringify({ version: packageJson.version, builtAt }, null, 2)}\n`
);

const artifactNames = ['plugin.js', 'plugin.min.js', 'plugin.css', 'plugin.min.css'];
const checksums = [];
for (const name of artifactNames) {
  const content = await readFile(path.join(dist, name));
  checksums.push(`${createHash('sha256').update(content).digest('hex')}  ${name}`);
}
await writeFile(path.join(dist, 'SHA256SUMS.txt'), `${checksums.join('\n')}\n`);
