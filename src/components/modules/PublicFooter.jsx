// src/components/modules/PublicFooter.jsx
import React from 'react';

export default function PublicFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto py-8 px-4 text-center">
        <p className="text-sm text-muted-foreground">
          © {currentYear} Arknica Tec. Todos los derechos reservados.
        </p>
        {/* Aquí podemos añadir enlaces de navegación secundarios si es necesario */}
      </div>
    </footer>
  );
}