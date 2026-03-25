'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const trainers = [
  {
    name: 'Marcus Vance',
    specialty: 'Head of Strength & Conditioning',
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&q=80',
  },
  {
    name: 'Elena Rostova',
    specialty: 'Mobility & Biomechanics Lead',
    image: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=800&q=80',
  },
  {
    name: 'David Chen',
    specialty: 'Elite Performance Nutritionist',
    image: 'https://images.unsplash.com/photo-1567598508481-65985588e295?w=800&q=80',
  },
];

export function Trainers() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-10% 0px' });

  return (
    <section className="relative py-32 w-full bg-[#030303]" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <h2 className="font-heading font-bold text-4xl md:text-6xl text-white mb-6 uppercase tracking-tight">
              World-Class <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Trainers</span>
            </h2>
            <p className="text-gray-400 font-sans text-lg">
              Learn from the best. Our instructors have trained Olympic athletes, professional fighters, and Hollywood leads.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {trainers.map((trainer, i) => (
            <motion.div
              key={trainer.name}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="group relative h-[600px] rounded-3xl overflow-hidden cursor-pointer"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url(${trainer.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <motion.div 
                  className="translate-y-12 group-hover:translate-y-0 transition-transform duration-500"
                >
                  <h3 className="text-3xl font-heading font-bold text-white mb-1 uppercase tracking-wider">{trainer.name}</h3>
                  <p className="text-purple-400 font-medium mb-6 uppercase text-sm tracking-widest">{trainer.specialty}</p>
                  
                  <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center text-white transition-colors">
                      IG
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center text-white transition-colors">
                      TW
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center text-white transition-colors">
                      YT
                    </a>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
