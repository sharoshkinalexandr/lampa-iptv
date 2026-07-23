import { stat } from 'node:fs/promises';
import path from 'node:path';

const file = path.join(process.cwd(), 'dist', 'plugin.min.js');
const bytes = (await stat(file)).size;
const budget = 500 * 1024;
console.log(`plugin.min.js: ${(bytes / 1024).toFixed(1)} KB / 500 KB`);
if (bytes > budget) {
  throw new Error(`Bundle превышает бюджет на ${((bytes - budget) / 1024).toFixed(1)} KB.`);
}
