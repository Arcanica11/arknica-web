// src/app/[locale]/layout.js
import React from 'react';
import { Inter } from 'next/font/google';
import I18nProvider from '../../components/I18nProvider.jsx'; // Importaremos este nuevo componente
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata = {
  title: "Arknica Tec",
  description: "Transformamos ideas en realidades escalables...",
};

// --- LA CORRECCIÓN ---
// 1. Quitamos 'async' de la función.
export default function RootLayout({ children, params: { locale } }) {
  // 2. Ahora podemos desestructurar 'locale' de forma segura.

  return (
    <html lang={locale} className={`${inter.variable} font-sans h-full`} suppressHydrationWarning>
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@600,500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="flex flex-col min-h-full bg-background text-foreground">
        {/* 3. Movemos la lógica 'async' a un componente hijo */}
        <I18nProvider locale={locale}>
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}