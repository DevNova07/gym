'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

export function BeforeAfterSlider() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  // 45kg Boy skinny transformation placeholder images
  const beforeImage = 'https://images.unsplash.com/photo-1549476464-37392f717541?w=800&q=80'; // Skinny/thin looking guy
  const afterImage = 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80';  // Muscular guy


  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const { left, width } = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - left, width));
    const percent = (x / width) * 100;
    setSliderPosition(percent);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  return (
    <section className="relative py-32 w-full bg-[#030303]">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-4xl md:text-5xl text-white uppercase tracking-tight mb-4">
            Real <span className="text-purple-500">Results</span>
          </h2>
          <p className="text-gray-400">Drag to see the 12-week transformation.</p>
        </div>

        <div 
          ref={containerRef}
          className="relative w-full h-[500px] md:h-[600px] rounded-3xl overflow-hidden cursor-ew-resize select-none border border-white/10"
          onMouseMove={handleMouseMove}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
          onTouchMove={handleTouchMove}
          onTouchEnd={() => setIsDragging(false)}
        >
          {/* After Image (Background) */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${afterImage})` }}
          />

          {/* Before Image (Clipped) */}
          <div 
            className="absolute inset-0 bg-cover bg-center grayscale"
            style={{ 
              backgroundImage: `url(${beforeImage})`,
              clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`
            }}
          />

          {/* Slider Handle */}
          <div 
            className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize shadow-[0_0_15px_rgba(176,38,255,0.8)]"
            style={{ left: `${sliderPosition}%` }}
            onMouseDown={() => setIsDragging(true)}
            onTouchStart={() => setIsDragging(true)}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-lg">
              <div className="flex gap-1">
                <div className="w-1 h-3 bg-gray-400 rounded-full" />
                <div className="w-1 h-3 bg-gray-400 rounded-full" />
              </div>
            </div>
          </div>

          <div className="absolute bottom-6 left-6 bg-black/50 backdrop-blur-md text-white px-4 py-1 rounded-full text-sm font-bold tracking-widest uppercase">
            Day 1
          </div>
          <div className="absolute bottom-6 right-6 bg-purple-500/50 backdrop-blur-md text-white px-4 py-1 rounded-full text-sm font-bold tracking-widest uppercase shadow-[0_0_10px_purple]">
            Day 90
          </div>
        </div>
      </div>
    </section>
  );
}
