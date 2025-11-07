// src/app/[locale]/(public)/layout.jsx
import React from 'react';
import PublicHeader from '@/components/modules/PublicHeader';
import PublicFooter from '@/components/modules/PublicFooter';

export default function PublicLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <PublicHeader />
      {/* 'flex-grow' asegura que el 'main' ocupe el espacio
          disponible, empujando el footer hacia abajo */}
      <main className="flex-grow">
        {children}
      </main>
      <PublicFooter />
    </div>
  );
}