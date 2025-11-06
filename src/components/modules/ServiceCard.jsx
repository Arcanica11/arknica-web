// src/components/modules/ServiceCard.jsx
'use client'; // Requerido para Framer Motion

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

// Variantes de animación para la aparición de la tarjeta
const cardVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: (i) => ({ // 'i' es el índice (index) para el delay escalonado
    y: 0,
    opacity: 1,
    transition: {
      delay: i * 0.15,
      duration: 0.5,
      ease: "easeOut"
    }
  })
};

const ServiceCard = ({ title, description, icon: Icon, index, className }) => {
  return (
    <motion.div
      variants={cardVariants}
      custom={index}      // Pasa el índice a las variantes
      initial="hidden"
      whileInView="visible" // Se anima cuando entra en la vista
      viewport={{ once: true, amount: 0.3 }} // Se anima una vez
      className={cn(
        "h-full flex flex-col",
        "bg-secondary/30 dark:bg-secondary/20",
        "border border-border",
        "hover:border-primary/50 hover:shadow-lg", // Efecto moderno al hacer hover
        "transition-all duration-300",
        "shadow-sm",
        "p-6 md:p-8",
        "rounded-lg",
        className
      )}
    >
      {/* Icono */}
      {Icon && (
        <div className="mb-4 text-primary p-3 bg-primary/10 rounded-full w-fit">
          <Icon className="h-8 w-8 md:h-10 md:w-10" />
        </div>
      )}
      
      {/* Título */}
      <h3 className="text-xl md:text-2xl font-display font-semibold text-foreground mb-3">
        {title}
      </h3>

      {/* Descripción */}
      <p className="text-base text-muted-foreground">
        {description}
      </p>
    </motion.div>
  );
};

export default ServiceCard;