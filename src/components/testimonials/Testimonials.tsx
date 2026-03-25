'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Jenkins',
    role: 'Marathon Runner',
    content: 'The metabolic optimization protocols completely changed my performance. I shattered my PR by 15 minutes.',
    rating: 5,
  },
  {
    name: 'Michael Chang',
    role: 'CEO & Entrepreneur',
    content: 'Efficiency is everything. The tailored analytics allow me to maximize my 45-minute sessions.',
    rating: 5,
  },
  {
    name: 'Jessica Thorne',
    role: 'Professional Dancer',
    content: 'Incredible facility and truly elite staff. The recovery suite has kept me injury-free for two seasons.',
    rating: 5,
  },
  {
    name: 'David Russo',
    role: 'Powerlifter',
    content: 'The hypertrophy programs are brutally effective. Best equipment and environment I have ever experienced.',
    rating: 5,
  },
];

export function Testimonials() {
  // Duplicate array for seamless infinite scroll
  const items = [...testimonials, ...testimonials];

  return (
    <section className="relative py-32 w-full bg-[#030303] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 text-center mb-16">
        <h2 className="font-heading font-bold text-4xl md:text-5xl text-white uppercase tracking-tight">
          Trusted By <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-400">Champions</span>
        </h2>
      </div>

      <div className="relative w-full flex align-center">
        {/* Blur Edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#030303] to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#030303] to-transparent z-10" />

        <div className="flex overflow-hidden">
          <motion.div
            className="flex gap-6 py-8 px-4"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ ease: 'linear', duration: 30, repeat: Infinity }}
          >
            {items.map((testimonial, i) => (
              <div 
                key={i} 
                className="w-[350px] md:w-[400px] flex-shrink-0 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-colors cursor-grab active:cursor-grabbing"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.1, duration: 0.3 }}
                      viewport={{ once: true }}
                    >
                      <Star className="w-5 h-5 fill-purple-500 text-purple-500" />
                    </motion.div>
                  ))}
                </div>
                <p className="text-gray-300 text-lg mb-6 leading-relaxed italic">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center font-bold text-lg">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-white font-bold">{testimonial.name}</h4>
                    <p className="text-white/50 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
