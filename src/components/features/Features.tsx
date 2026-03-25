'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { Dumbbell, Activity, HeartPulse, Zap } from 'lucide-react';

const features = [
  {
    title: 'Advanced Training Programs',
    description: 'AI-tailored workouts that adapt dynamically to your personal strength curve and recovery rate.',
    icon: Dumbbell,
    glow: 'purple' as const,
  },
  {
    title: 'Metabolic Optimization',
    description: 'Precision nutrition and recovery protocols designed to maximize your physiological output.',
    icon: Activity,
    glow: 'blue' as const,
  },
  {
    title: 'Elite Coaching Access',
    description: 'Direct 1-on-1 access to world-class trainers and physiological experts around the clock.',
    icon: HeartPulse,
    glow: 'red' as const,
  },
  {
    title: 'Performance Analytics',
    description: 'Real-time biomechanics tracking and granular data analysis of every set, rep, and breath.',
    icon: Zap,
    glow: 'purple' as const,
  },
];

export function Features() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-10% 0px' });

  return (
    <section className="relative py-32 w-full bg-[#030303] overflow-hidden">
      {/* Background glow elements */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 relative z-10" ref={containerRef}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center mb-20"
        >
          <h2 className="font-heading font-bold text-4xl md:text-6xl text-white mb-6 uppercase tracking-tight">
            Engineered For <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500">Excellence</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto font-sans text-lg">
            Our platform merges cutting-edge sports science with military-grade tracking to forge the ultimate version of you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, index) => (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1, ease: 'easeOut' }}
            >
              <GlassCard glowColor={feat.glow}>
                <div className="flex flex-col h-full items-start justify-between">
                  <div className="mb-8 p-4 rounded-2xl bg-white/5 border border-white/10 group-hover:scale-110 group-hover:bg-white/10 transition-all duration-300">
                    <feat.icon className="w-8 h-8 text-white group-hover:text-purple-400 transition-colors" />
                  </div>
                  <div>
                    <h3 className="text-xl font-heading font-bold text-white mb-3">
                      {feat.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {feat.description}
                    </p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
