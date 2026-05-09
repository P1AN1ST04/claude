/**
 * auth.js — Guard de autenticación para páginas protegidas de MOVIFLEX
 * Importar como módulo en páginas que requieren login.
 *
 * Uso:
 *   import { supabase, session, perfil, logout } from './auth.js';
 *
 * Si no hay sesión activa, redirige automáticamente a /login.html
 */

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

if (!window.ENV || !window.ENV.SUPABASE_URL || !window.ENV.SUPABASE_PUBLISHABLE_KEY) {
  console.error('MOVIFLEX: Credenciales de Supabase no configuradas.');
  window.location.href = '/login.html';
}

const supabase = createClient(window.ENV.SUPABASE_URL, window.ENV.SUPABASE_PUBLISHABLE_KEY);

// Check session
const { data: { session } } = await supabase.auth.getSession();

if (!session) {
  window.location.href = '/login.html';
  // halt execution
  await new Promise(() => {});
}

// Fetch profile
const { data: perfil } = await supabase
  .from('perfiles')
  .select('id, nombre, rol, local_asignado')
  .eq('id', session.user.id)
  .single();

if (!perfil) {
  await supabase.auth.signOut();
  window.location.href = '/login.html';
  await new Promise(() => {});
}

async function logout() {
  await supabase.auth.signOut();
  window.location.href = '/login.html';
}

// Listen for auth changes (token expired, etc.)
supabase.auth.onAuthStateChange((event) => {
  if (event === 'SIGNED_OUT') {
    window.location.href = '/login.html';
  }
});

export { supabase, session, perfil, logout };
