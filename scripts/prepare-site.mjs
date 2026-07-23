import { cp, mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const site = path.join(root, 'site');
await mkdir(site, { recursive: true });
await cp(path.join(root, 'dist'), site, { recursive: true });
await cp(path.join(root, 'public', 'data'), path.join(site, 'data'), { recursive: true });
await cp(path.join(root, 'demo'), path.join(site, 'demo'), { recursive: true });

const manifest = JSON.parse(await readFile(path.join(root, 'dist', 'manifest.json'), 'utf8'));
const index = `<!doctype html>
<html lang="ru">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="color-scheme" content="dark">
  <title>Lampa IPTV ${manifest.version}</title>
  <style>
    body{margin:0;min-height:100vh;display:grid;place-items:center;background:#091017;color:#fff;font:18px/1.5 system-ui,sans-serif}
    main{max-width:760px;padding:3rem}a{color:#53d18d}code{background:#15222a;padding:.2em .4em;border-radius:.3em}
  </style>
</head>
<body>
  <main>
    <h1>Lampa IPTV ${manifest.version}</h1>
    <p>IPTV-клиент для Lampa со строгим реестром из 28 каналов. Приватные ссылки хранятся только на устройстве.</p>
    <p><strong>URL установки:</strong> <code id="url"></code></p>
    <p><a href="./plugin.js">plugin.js</a> · <a href="./plugin.min.js">plugin.min.js</a> · <a href="./demo/">демо</a> · <a href="./manifest.json">manifest.json</a></p>
    <script>document.getElementById('url').textContent=new URL('./plugin.js',location.href).href</script>
  </main>
</body>
</html>`;
await writeFile(path.join(site, 'index.html'), index, 'utf8');
