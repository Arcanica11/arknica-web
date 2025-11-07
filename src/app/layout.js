// src/app/[locale]/layout.js
import React from 'react'; // Asegúrate de que 'React' esté importado
import { Inter } from 'next/font/google';
import I18nProvider from '../components/I18nProvider.jsx';
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

// --- LA CORRECCIÓN DEFINITIVA (Next 16 / React 19) ---

// 1. Recibimos 'params' como una prop normal (que sabemos es una Promesa).
export default function RootLayout({ children, params }) {
  
  // 2. Usamos 'React.use()' para "desenvolver" la Promesa y obtener el valor.
  //    Esto es lo que el error nos pide que hagamos.
  const { locale } = React.use(params);

  return (
    <html lang={locale} className={`${inter.variable} font-sans h-full`} suppressHydrationWarning>
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@600,500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="flex flex-col min-h-full bg-background text-foreground">
        {/* 3. Pasamos el 'locale' ya resuelto al I18nProvider */}
        <I18nProvider locale={locale}>
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}