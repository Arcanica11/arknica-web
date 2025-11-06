// src/lib/supabase/server.js
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

// Definimos las variables de entorno
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/**
 * Crea un cliente de Supabase para el lado del servidor.
 * Esta función está diseñada para React Server Components, Server Actions,
 * y Rutas API. Lee y escribe cookies usando el 'cookieStore' de Next.js.
 * @returns {SupabaseClient}
 */
export function createServerActionClient() {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Variables de entorno de Supabase no configuradas para el servidor.');
  }
  
  // Obtenemos el almacén de cookies de next/headers
  const cookieStore = cookies();

  return createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        /**
         * Lee una cookie del almacén.
         * @param {string} name - El nombre de la cookie.
         * @returns {Promise<string | undefined>}
         */
        get(name) {
          return cookieStore.get(name)?.value;
        },
        /**
         * Escribe una cookie en el almacén.
         * @param {string} name - El nombre de la cookie.
         * @param {string} value - El valor de la cookie.
         * @param {object} options - Opciones de la cookie.
         */
        set(name, value, options) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch (error) {
            // Esto puede fallar si se llama desde un RSC (solo lectura)
            // Lo ignoramos de forma segura, ya que solo es necesario en Server Actions o Route Handlers.
          }
        },
        /**
         * Elimina una cookie del almacén.
         * @param {string} name - El nombre de la cookie.
         * @param {object} options - Opciones de la cookie.
         */
        remove(name, options) {
          try {
            cookieStore.set({ name, value: '', ...options });
          } catch (error) {
            // Esto puede fallar si se llama desde un RSC (solo lectura)
          }
        },
      },
    }
  );
}