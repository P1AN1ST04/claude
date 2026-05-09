/**
 * inject-env.js — Build script para Netlify
 * Lee variables de entorno del sistema y genera public/js/env.js
 */

import { writeFileSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, '..', 'public', 'js');
const outFile = join(outDir, 'env.js');

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_PUBLISHABLE_KEY = process.env.SUPABASE_PUBLISHABLE_KEY;

if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) {
  console.error('❌ ERROR: Faltan variables de entorno.');
  console.error('   Necesitas definir SUPABASE_URL y SUPABASE_PUBLISHABLE_KEY');
  console.error('   En Netlify: Site configuration → Environment variables');
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });

const content = `// Auto-generado por scripts/inject-env.js — NO editar manualmente
window.ENV = {
  SUPABASE_URL: '${SUPABASE_URL}',
  SUPABASE_PUBLISHABLE_KEY: '${SUPABASE_PUBLISHABLE_KEY}'
};
`;

writeFileSync(outFile, content, 'utf-8');
console.log('✅ public/js/env.js generado correctamente.');
