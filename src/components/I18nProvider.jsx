// src/components/I18nProvider.jsx
import React from 'react';
import { NextIntlClientProvider } from 'next-intl';

export default async function I18nProvider({ children, locale }) {
  
  let messages;
  try {
    // Carga manual del archivo JSON
    messages = (await import(`../messages/${locale}.json`)).default;
  } catch (error) {
    console.error("No se pudo cargar el archivo de idioma:", error);
    messages = (await import(`../messages/es.json`)).default; // Fallback
  }

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      {children}
    </NextIntlClientProvider>
  );
}