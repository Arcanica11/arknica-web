// src/app/[locale]/layout.jsx
import React from 'react';
import { Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import './globals.css'; // ¡Importante! Carga nuestro CSS de Tailwind v4

// Configurar fuente 'Inter' (Cuerpo)
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter', // Variable CSS para Tailwind
  display: 'swap',
});

// (Podemos añadir metadata aquí más tarde)
// export async function generateMetadata({ params: { locale } }) { ... }

export default async function RootLayout({ children, params: { locale } }) {
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${inter.variable} font-sans h-full`} suppressHydrationWarning>
      <head>
        {/* Cargar fuente 'Clash Display' (Titulares) */}
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@600,500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="flex flex-col min-h-full bg-background text-foreground">
        {/* El proveedor de i18n es esencial para los Client Components */}
        <NextIntlClientProvider messages={messages} locale={locale}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}