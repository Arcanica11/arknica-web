// src/components/modules/PublicHeader.jsx
'use client';

import { useState } from 'react';
import Link from 'next-intl/link'; // CRÍTICO: Usar 'next-intl/link' para i18n
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Menu } from 'lucide-react'; // Icono para el menú móvil

export default function PublicHeader() {
  const t = useTranslations('common.navbar');
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  // Hook de Framer Motion para detectar el scroll
  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 50);
  });

  return (
    <motion.header
      // Animación de fondo al hacer scroll
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled
          ? 'bg-background/80 backdrop-blur-sm border-b border-border'
          : 'bg-transparent'
      }`}
      // Animación de entrada
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="container mx-auto flex items-center justify-between h-20 px-4">
        {/* Link del Logo (usa los logos de /public/) */}
        <Link href="/" className="flex items-center">
          {/* Logo para Modo Claro (se oculta en dark) */}
          <Image
            src="/logoDarkArk-hrz.png"
            alt="Arknica Logo"
            width={150}
            height={40}
            priority
            className="dark:hidden"
          />
          {/* Logo para Modo Oscuro (se muestra en dark) */}
          <Image
            src="/logoClaroArk-hrz.png"
            alt="Arknica Logo"
            width={150}
            height={40}
            priority
            className="hidden dark:block"
          />
        </Link>

        {/* Navegación de Escritorio */}
        <nav className="hidden md:block">
          <ul className="flex items-center gap-6 text-sm font-medium text-foreground/80">
            <li>
              <Link href="/" className="hover:text-primary transition-colors">{t('home')}</Link>
            </li>
            <li>
              <Link href="/servicios" className="hover:text-primary transition-colors">{t('services')}</Link>
            </li>
            <li>
              <Link href="/nosotros" className="hover:text-primary transition-colors">{t('about')}</Link>
            </li>
            <li>
              <Link href="/contacto" className="hover:text-primary transition-colors">{t('contactUs')}</Link>
            </li>
            <li>
              <Button asChild variant="outline" size="sm">
                <Link href="/login">
                  {t('login')}
                </Link>
              </Button>
            </li>
          </ul>
        </nav>

        {/* Botón de Menú Móvil (Placeholder) */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Abrir menú</span>
          </Button>
        </div>
      </div>
    </motion.header>
  );
}