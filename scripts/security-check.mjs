import { readFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const files = ['src/index.ts', 'src/bootstrap.ts', 'dist/plugin.js', 'dist/plugin.min.js'];
const forbidden = [
  { name: 'dynamic code execution', expression: new RegExp('\\be' + 'val\\s*\\(') },
  { name: 'Function constructor', expression: /new\s+Function\s*\(/ },
  { name: 'localhost dependency', expression: /https?:\/\/(?:localhost|127\.0\.0\.1)/i },
  { name: 'private key', expression: /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/ },
  { name: 'GitHub token', expression: /\bgh[opsu]_[A-Za-z0-9_]{30,}\b/ }
];

for (const relative of files) {
  const content = await readFile(path.join(root, relative), 'utf8');
  for (const rule of forbidden) {
    if (rule.expression.test(content)) throw new Error(`${relative}: найдено ${rule.name}.`);
  }
}
console.log('Security checks passed.');
