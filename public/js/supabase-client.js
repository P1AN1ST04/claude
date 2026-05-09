/**
 * supabase-client.js — Cliente de Supabase para MOVIFLEX
 * Requiere que public/js/env.js esté cargado antes (con window.ENV)
 */

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

if (!window.ENV || !window.ENV.SUPABASE_URL || !window.ENV.SUPABASE_PUBLISHABLE_KEY) {
  console.error('❌ MOVIFLEX: Credenciales de Supabase no configuradas. Verifica que env.js se cargó correctamente.');
  window.supabaseClient = null;
} else {
  try {
    window.supabaseClient = createClient(
      window.ENV.SUPABASE_URL,
      window.ENV.SUPABASE_PUBLISHABLE_KEY
    );
    console.log('✅ MOVIFLEX: Cliente Supabase inicializado.');
  } catch (err) {
    console.error('❌ MOVIFLEX: Error al crear cliente Supabase:', err);
    window.supabaseClient = null;
  }
}
