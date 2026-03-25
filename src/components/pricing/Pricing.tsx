'use client';

import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Check } from 'lucide-react';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { GlassCard } from '@/components/ui/GlassCard';

const tiers = [
  {
    name: 'Basic',
    monthlyPrice: 29,
    yearlyPrice: 290,
    features: ['Access to Facility', 'Basic App Access', '1 Group Class / Month'],
    glow: 'blue' as const,
    isPro: false,
  },
  {
    name: 'Pro',
    monthlyPrice: 99,
    yearlyPrice: 990,
    features: ['Unlimited Facility Access', 'Full App Features', 'Unlimited Group Classes', 'Bi-weekly Check-ins', 'Custom Nutrition Plan'],
    glow: 'purple' as const,
    isPro: true,
  },
  {
    name: 'Elite',
    monthlyPrice: 299,
    yearlyPrice: 2990,
    features: ['Everything in Pro', 'Weekly 1-on-1 Training', 'Advanced Biometrics Tracker', 'Priority Support', 'Access to Elite Trainers'],
    glow: 'red' as const,
    isPro: false,
  },
];

export function Pricing() {
  const [isYearly, setIsYearly] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-10% 0px' });

  return (
    <section className="relative py-32 w-full bg-[#030303]" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="font-heading font-bold text-4xl md:text-6xl text-white mb-6 uppercase tracking-tight"
          >
            Access The <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-red-500">Elite</span>
          </motion.h2>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center justify-center gap-4 mt-8"
          >
            <span className={`text-sm md:text-base transition-colors ${!isYearly ? 'text-white' : 'text-white/50'}`}>Monthly</span>
            <button 
              onClick={() => setIsYearly(!isYearly)}
              className="relative w-16 h-8 rounded-full bg-white/10 hover:bg-white/20 transition-colors border border-white/20"
            >
              <motion.div 
                className="absolute top-1 bottom-1 w-6 bg-purple-500 rounded-full shadow-[0_0_15px_rgba(176,38,255,0.6)]"
                animate={{ left: isYearly ? 'calc(100% - 1.75rem)' : '0.25rem' }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            </button>
            <span className={`text-sm md:text-base transition-colors ${isYearly ? 'text-white' : 'text-white/50'}`}>
              Yearly <span className="text-purple-400 text-xs ml-1">(Save 15%)</span>
            </span>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`relative ${tier.isPro ? 'md:-mt-8 md:mb-8 z-10' : 'z-0'}`}
            >
              {tier.isPro && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-500 to-blue-500 text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-widest shadow-[0_0_20px_rgba(176,38,255,0.5)] z-20">
                  Most Popular
                </div>
              )}
              <GlassCard glowColor={tier.glow} className={tier.isPro ? 'border-purple-500/50 bg-purple-900/10' : ''}>
                <div className="p-2">
                  <h3 className="text-2xl font-heading font-bold text-white mb-2 uppercase">{tier.name}</h3>
                  <div className="flex items-baseline gap-2 mb-8">
                    <span className="text-5xl font-bold text-white tracking-tighter">
                      ${isYearly ? tier.yearlyPrice : tier.monthlyPrice}
                    </span>
                    <span className="text-white/50">/{isYearly ? 'year' : 'month'}</span>
                  </div>

                  <div className="space-y-4 mb-10">
                    {tier.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-white/10 flex items-center justify-center">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <a href="https://wa.me/919506724451" target="_blank" rel="noopener noreferrer">
                    <MagneticButton 
                      variant={tier.isPro ? 'primary' : 'outline'} 
                      glowColor={tier.glow}
                      className="w-full"
                    >
                      Book on WhatsApp
                    </MagneticButton>
                  </a>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
