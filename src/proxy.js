// src/proxy.js
import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing"; 

const protectedPagesPrefix = "/dashboard";

const intlMiddleware = createIntlMiddleware({
  ...routing,
  localePrefix: "always", // 'always' para que / vaya a /es
});

/**
 * @param {import("next/server").NextRequest} req
 */
export default async function middleware(req) {
  // 1. i18n se encarga del enrutamiento
  const res = intlMiddleware(req);

  // 2. Supabase se encarga de la sesión
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name) { return req.cookies.get(name)?.value; },
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

  const { data: { session } } = await supabase.auth.getSession();

  // 3. Lógica de autorización
  const pathname = req.nextUrl.pathname;
  const locale = res.headers.get("x-next-intl-locale") || routing.defaultLocale;
  const pathnameWithoutLocale = pathname.startsWith(`/${locale}`)
    ? pathname.substring(locale.length + 1) || "/"
    : pathname;

  const isProtectedRoute = pathnameWithoutLocale.startsWith(protectedPagesPrefix);
  const isLoginPage = pathnameWithoutLocale === "/login";

  if (isProtectedRoute && !session) {
    const loginUrl = new URL(`/${locale}/login`, req.url);
    loginUrl.searchParams.set("redirectedFrom", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (session && isLoginPage) {
    const dashboardUrl = new URL(`/${locale}/dashboard`, req.url);
    return NextResponse.redirect(dashboardUrl);
  }

  // Devolvemos la respuesta (con cookies de sesión si se actualizaron)
  return res;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|assets|favicon.ico).*)"],
};