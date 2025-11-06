// next.config.mjs
import createWithIntl from 'next-intl/plugin';

// Apuntamos al archivo de configuración de i18n que crearemos en src/
const withIntl = createWithIntl('./src/i18n.js');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Aquí puedes añadir futuras configuraciones de Next.js
  // (ej. optimización de imágenes para Supabase)
};

export default withIntl(nextConfig);