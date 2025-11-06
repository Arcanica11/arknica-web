// src/app/[locale]/(public)/page.jsx
'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link'; // <-- CORRECCIÓN AQUÍ
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import ServiceCard from '@/components/modules/ServiceCard';
import { Code, Bot, Palette } from 'lucide-react';

export default function LandingPage() {
  const tHero = useTranslations('common.hero');
  const tServices = useTranslations('common.services');

  const mainServices = [
    { 
      title: tServices('card1.title'), 
      description: tServices('card1.description'), 
      icon: Code 
    },
    { 
      title: tServices('card2.title'),
      description: tServices('card2.description'), 
      icon: Bot 
    },
    { 
      title: tServices('card3.title'),
      description: tServices('card3.description'), 
      icon: Palette 
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  };

  return (
    <>
      <motion.section
        className="relative flex flex-col items-center justify-center min-h-screen text-center px-4 py-32 overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="absolute inset-0 z-0 opacity-5 dark:opacity-10 [mask-image:radial-gradient(circle,white,transparent_70%)]">
        </div>
        
        <div className="relative z-10 max-w-4xl">
          <motion.h1 
            className="text-h2 md:text-h1 font-display mb-6"
            variants={itemVariants}
          >
            {tHero('title')}
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            {tHero('subtitle')}
          </motion.p>
          
          <motion.div variants={itemVariants}>
            <Button asChild size="lg" className="text-button font-bold">
              <Link href="/contacto">
                {tHero('button')}
              </Link>
            </Button>
          </motion.div>
        </div>
      </motion.section>

      <section className="py-24 bg-secondary/20 dark:bg-secondary/10">
        <div className="container mx-auto px-4">
          
          <motion.div
            className="text-center max-w-2xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-h3 md:text-h2 font-display mb-4">
              {tServices('hero.title')}
            </h2>
            <p className="text-lg text-muted-foreground">
              {tServices('hero.subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mainServices.map((service, index) => (
              <ServiceCard
                key={service.title}
                title={service.title}
                description={service.description}
                icon={service.icon}
                index={index}
              />
            ))}
          </div>
          
          <motion.div 
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Button asChild variant="outline">
              <Link href="/servicios">
                Ver todos los servicios
              </Link>
            </Button>
          </motion.div>

        </div>
      </section>
    </>
  );
}