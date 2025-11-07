// src/components/I18nProvider.jsx
import React from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

// Este es un Componente de Servidor 'async'
export default async function I18nProvider({ children, locale }) {
  // Cargamos los mensajes aquí, de forma asíncrona
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      {children}
    </NextIntlClientProvider>
  );
}