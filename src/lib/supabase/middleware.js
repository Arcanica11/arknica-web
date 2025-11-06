// src/lib/supabase/middleware.js
import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';

// Definimos las variables de entorno
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/**
 * Esta función maneja el refresco de la sesión en el Middleware.
 * Crea un cliente de Supabase usando los objetos 'req' y 'res'
 * y refresca la sesión.
 * @param {NextRequest} req - La solicitud entrante.
 * @returns {NextResponse} - La respuesta (potencialmente con la cookie de sesión actualizada).
 */
export async function updateSession(req) {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Variables de entorno de Supabase no configuradas para el middleware.');
  }

  // Creamos una respuesta base
  let res = NextResponse.next({
    request: {
      headers: req.headers,
    },
  });

  const supabase = createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        get(name) {
          return req.cookies.get(name)?.value;
        },
        set(name, value, options) {
          // Si set/remove se llaman, actualizamos la respuesta
          req.cookies.set({ name, value, ...options });
          res = NextResponse.next({
            request: {
              headers: req.headers,
            },
          });
          res.cookies.set({ name, value, ...options });
        },
        remove(name, options) {
          req.cookies.set({ name, value: '', ...options });
          res = NextResponse.next({
            request: {
              headers: req.headers,
            },
          });
          res.cookies.set({ name, value: '', ...options });
        },
      },
    }
  );

  // Paso CRÍTICO: Refrescar la sesión del usuario.
  // Esto actualiza la cookie de autenticación si es necesario.
  await supabase.auth.getSession();

  return res;
}