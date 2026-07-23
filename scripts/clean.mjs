import { access } from 'node:fs/promises';
import path from 'node:path';
import { rm } from 'node:fs/promises';

const root = process.cwd();
const packageFile = path.join(root, 'package.json');
if (!root.endsWith('lampa-iptv')) {
  throw new Error(`Отказ очистки вне каталога lampa-iptv: ${root}`);
}

await access(packageFile);
await Promise.all([
  rm(path.join(root, 'dist'), { recursive: true, force: true }),
  rm(path.join(root, 'site'), { recursive: true, force: true })
]);
