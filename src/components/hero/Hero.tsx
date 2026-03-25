'use client';

import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { ChevronDown } from 'lucide-react';

const Scene = dynamic(() => import('./Scene'), { ssr: false });

export function Hero() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={<div className="w-full h-full bg-black/80 flex items-center justify-center text-white/50">Loading Experience...</div>}>
          <Scene />
        </Suspense>
      </div>

      {/* Dark Gradient Overlay for text readability */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-black/80 to-transparent z-10" />
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 max-w-5xl mx-auto h-full pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="mb-6 font-heading font-bold text-5xl md:text-7xl lg:text-8xl tracking-tight leading-loose uppercase pb-4"
        >
          <span className="text-white block mb-2 leading-none">Unleash Your</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-red-500 to-blue-500 block leading-none pb-2">
            True Potential.
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
          className="text-lg md:text-2xl text-gray-300 mb-10 font-sans max-w-3xl font-light leading-relaxed"
        >
          Build an unbreakable physique. Stop making excuses and start your 90-day transformation journey today.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: 'easeOut' }}
          className="flex flex-col sm:flex-row gap-6 items-center"
        >
          <a href="https://wa.me/919506724451" target="_blank" rel="noopener noreferrer">
            <MagneticButton variant="primary" glowColor="purple" className="text-lg px-10 py-5">
              Start Transformation
            </MagneticButton>
          </a>
          <a href="#programs">
            <MagneticButton variant="secondary" className="text-lg px-10 py-5">
              Explore Programs
            </MagneticButton>
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-xs uppercase tracking-widest text-white/50 font-sans">Scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="text-white/50 w-6 h-6" />
        </motion.div>
      </motion.div>
    </section>
  );
}
