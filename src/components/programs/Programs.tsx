'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { MagneticButton } from '@/components/ui/MagneticButton';

const programs = [
  {
    title: 'Fat Loss Catalyst',
    description: 'High-intensity metabolic conditioning to shred fat while preserving lean muscle mass.',
    duration: '12 Weeks',
    level: 'All Levels',
    glow: 'red' as const,
    bgImage: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.9)), url("https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80")',
  },
  {
    title: 'Hypertrophy Max',
    description: 'Science-backed volume training specifically engineered for maximum muscle accrual.',
    duration: '16 Weeks',
    level: 'Intermediate',
    glow: 'purple' as const,
    bgImage: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.9)), url("https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80")',
  },
  {
    title: 'Functional Elite',
    description: 'Build real-world strength, agility, and cardiovascular endurance used by pro athletes.',
    duration: '8 Weeks',
    level: 'Advanced',
    glow: 'blue' as const,
    bgImage: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.9)), url("https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80")',
  },
];

export function Programs() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-10% 0px' });

  return (
    <section className="relative py-32 w-full bg-[#030303]" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="font-heading font-bold text-4xl md:text-6xl text-white mb-6 uppercase tracking-tight">
            Elite <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-purple-500">Programs</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {programs.map((prog, i) => (
            <motion.div
              key={prog.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="h-[500px]"
            >
              <GlassCard glowColor={prog.glow} className="!p-0 overflow-hidden relative group">
                {/* Background Image Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110 opacity-50 group-hover:opacity-40"
                  style={{ backgroundImage: prog.bgImage }}
                />
                
                {/* Content */}
                <div className="relative z-10 p-8 h-full flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-xs font-bold uppercase tracking-wider text-white/70 bg-white/10 px-3 py-1 rounded-full backdrop-blur-md">
                        {prog.duration}
                      </span>
                      <span className="text-xs font-bold uppercase tracking-wider text-white/70 bg-white/10 px-3 py-1 rounded-full backdrop-blur-md">
                        {prog.level}
                      </span>
                    </div>
                    <h3 className="text-3xl font-heading font-bold text-white mb-4 leading-tight mt-8">
                      {prog.title}
                    </h3>
                    <p className="text-gray-300">
                      {prog.description}
                    </p>
                  </div>
                  
                  <MagneticButton variant="outline" className="w-full mt-auto">
                    Explore Plan
                  </MagneticButton>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
