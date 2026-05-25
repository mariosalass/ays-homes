import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = resolve(__dirname, '../public');

const today = new Date();
const v = `${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, '0')}${String(today.getDate()).padStart(2, '0')}`;

const files = ['admin.html'];

for (const file of files) {
  const path = resolve(publicDir, file);
  const original = readFileSync(path, 'utf8');
  const updated = original.replace(/cr-locations\.js\?v=\d{8}/g, `cr-locations.js?v=${v}`);
  if (original !== updated) {
    writeFileSync(path, updated, 'utf8');
    console.log(`[bump-locations-version] ${file} → ?v=${v}`);
  }
}
