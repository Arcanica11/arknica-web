// src/proxy.js
import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing"; // Importa la config de i18n

// --- CONFIGURACIÓN DE RUTAS ---
const protectedPagesPrefix = "/dashboard";
const publicPages = ["/", "/login", "/servicios", "/nosotros", "/contacto"];

/**
 * Crea el middleware de i18n (multi-idioma).
 */
const intlMiddleware = createIntlMiddleware({
  ...routing, // Carga locales y defaultLocale ('es')
  localePrefix: "as-needed", // No añade prefijo para 'es'
});

/**
 * Este es el middleware principal (proxy) que se ejecuta en cada petición.
 * ¡CORRECCIÓN! Usamos 'export default' como requiere Next.js 16.
 * @param {import("next/server").NextRequest} req
 */
export default async function middleware(req) {
  // 1. EJECUTAR I18N PRIMERO
  const res = intlMiddleware(req);

  // 2. CREAR CLIENTE SUPABASE (MODO MIDDLEWARE)
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name) {
          return req.cookies.get(name)?.value;
        },
        set(name, value, options) {
          req.cookies.set({ name, value, ...options });
          res.cookies.set({ name, value, ...options });
        },
        remove(name, options) {
          req.cookies.set({ name, value: "", ...options });
          res.cookies.set({ name, value: "", ...options });
        },
      },
    }
  );

  // 3. REFESCAR Y OBTENER SESIÓN
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // 4. LÓGICA DE AUTORIZACIÓN (PROTECCIÓN DE RUTAS)
  const pathname = req.nextUrl.pathname;
  const locale = res.headers.get("x-next-intl-locale") || routing.defaultLocale;

  const pathnameWithoutLocale = pathname.startsWith(`/${locale}`)
    ? pathname.substring(locale.length + 1) || "/"
    : pathname;

  const isProtectedRoute =
    pathnameWithoutLocale.startsWith(protectedPagesPrefix);
  const isLoginPage = pathnameWithoutLocale === "/login";

  // REDIRIGIR: Si es ruta protegida y NO hay sesión
  if (isProtectedRoute && !session) {
    const loginUrl = new URL(`/${locale}/login`, req.url);
    loginUrl.searchParams.set("redirectedFrom", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // REDIRIGIR: Si HAY sesión y está intentando ir a /login
  if (session && isLoginPage) {
    const dashboardUrl = new URL(`/${locale}/dashboard`, req.url);
    return NextResponse.redirect(dashboardUrl);
  }

  // 5. PERMITIR ACCESO
  return res;
}

// Configuración del Matcher: (Sin cambios)
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|assets|favicon.ico).*)"],
};
