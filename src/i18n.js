// src/i18n.js
import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from './i18n/routing'; // Importamos la config

export default getRequestConfig(async ({ locale }) => {
  // Validar que el locale de la URL es uno que soportamos
  if (!routing.locales.includes(locale)) notFound();

  return {
    // Carga el archivo .json correspondiente
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});