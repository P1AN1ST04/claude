/**
 * dev-inject.js — Script de desarrollo local
 * Lee variables desde .env y genera public/js/env.js
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');
const envFile = join(rootDir, '.env');
const outDir = join(rootDir, 'public', 'js');
const outFile = join(outDir, 'env.js');

if (!existsSync(envFile)) {
  console.error('❌ ERROR: No se encontró el archivo .env');
  console.error('   Copia .env.example a .env y llena tus credenciales:');
  console.error('   cp .env.example .env');
  process.exit(1);
}

// Parse .env file
const envContent = readFileSync(envFile, 'utf-8');
const vars = {};
for (const line of envContent.split('\n')) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) continue;
  const eqIndex = trimmed.indexOf('=');
  if (eqIndex === -1) continue;
  const key = trimmed.slice(0, eqIndex).trim();
  let value = trimmed.slice(eqIndex + 1).trim();
  // Remove surrounding quotes if present
  if ((value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))) {
    value = value.slice(1, -1);
  }
  vars[key] = value;
}

const SUPABASE_URL = vars.SUPABASE_URL;
const SUPABASE_PUBLISHABLE_KEY = vars.SUPABASE_PUBLISHABLE_KEY;

if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) {
  console.error('❌ ERROR: Faltan variables en .env');
  console.error('   Necesitas: SUPABASE_URL y SUPABASE_PUBLISHABLE_KEY');
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });

const content = `// Auto-generado por scripts/dev-inject.js — NO editar manualmente
window.ENV = {
  SUPABASE_URL: '${SUPABASE_URL}',
  SUPABASE_PUBLISHABLE_KEY: '${SUPABASE_PUBLISHABLE_KEY}'
};
`;

writeFileSync(outFile, content, 'utf-8');
console.log('✅ public/js/env.js generado para desarrollo local.');
