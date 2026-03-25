'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { ShoppingCart } from 'lucide-react';

const products = [
  {
    id: 1,
    name: 'Elite Training Hoodie',
    price: 120,
    category: 'Apparel',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&q=80',
    glow: 'blue' as const,
  },
  {
    id: 2,
    name: 'Performance Whey Isolate',
    price: 65,
    category: 'Nutrition',
    image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=600&q=80',
    glow: 'purple' as const,
  },
  {
    id: 3,
    name: 'Carbon Fiber Lifting Belt',
    price: 185,
    category: 'Gear',
    image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=600&q=80',
    glow: 'red' as const,
  },
];

export function MerchandiseStore() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-10% 0px' });

  return (
    <section className="relative py-32 w-full bg-[#030303]" ref={containerRef}>
      {/* Background ambient light */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-heading font-bold text-4xl md:text-5xl text-white uppercase tracking-tight mb-4">
              Premium <span className="text-purple-500">Gear</span>
            </h2>
            <p className="text-gray-400">Engineered for performance. Worn by champions.</p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              <GlassCard glowColor={product.glow} className="!p-0 overflow-hidden h-full flex flex-col group">
                <div className="relative h-64 w-full bg-white/5 overflow-hidden flex items-center justify-center p-8">
                  <motion.div 
                    className="w-full h-full bg-contain bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-110 drop-shadow-2xl"
                    style={{ backgroundImage: `url(${product.image})` }}
                  />
                  
                  {/* Hover Add to cart overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                    <button className="bg-white text-black px-6 py-3 rounded-full font-bold uppercase tracking-widest text-sm flex items-center gap-2 hover:bg-gray-200 transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300">
                      <ShoppingCart className="w-4 h-4" />
                      Add To Cart
                    </button>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <span className="text-xs font-bold uppercase tracking-widest text-white/50 mb-2">
                    {product.category}
                  </span>
                  <div className="flex justify-between items-start mb-4 gap-4">
                    <h3 className="text-xl font-bold text-white leading-tight">
                      {product.name}
                    </h3>
                    <span className="text-xl font-heading text-purple-400 font-bold shrink-0">
                      ${product.price}
                    </span>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <button className="px-8 py-4 rounded-full border border-white/20 text-white font-bold uppercase tracking-widest text-sm hover:bg-white/5 transition-colors">
            View Full Collection
          </button>
        </div>
      </div>
    </section>
  );
}
