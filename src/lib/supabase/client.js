// src/lib/supabase/client.js
import { createBrowserClient } from '@supabase/ssr';

// Definimos las variables de entorno
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/**
 * Crea un cliente de Supabase para el lado del cliente (navegador).
 * Esta función está diseñada para ser usada en componentes 'use client'.
 * @returns {SupabaseClient}
 */
export function createClient() {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Variables de entorno de Supabase no configuradas para el cliente.');
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}