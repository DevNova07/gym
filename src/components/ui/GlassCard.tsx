'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  glowOnHover?: boolean;
  glowColor?: 'purple' | 'red' | 'blue';
}

export function GlassCard({
  children,
  className,
  glowOnHover = true,
  glowColor = 'purple',
}: GlassCardProps) {
  const glowColors = {
    purple: 'group-hover:shadow-[0_0_30px_rgba(176,38,255,0.2)]',
    red: 'group-hover:shadow-[0_0_30px_rgba(255,42,42,0.2)]',
    blue: 'group-hover:shadow-[0_0_30px_rgba(0,210,255,0.2)]',
  };

  return (
    <div className="group perspective-1000 w-full h-full">
      <motion.div
        whileHover={{ rotateX: 2, rotateY: -2, scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className={cn(
          'relative w-full h-full bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-8 overflow-hidden transition-all duration-500',
          glowOnHover && glowColors[glowColor],
          className
        )}
      >
        {/* Glow overlay effect internally */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative z-10 w-full h-full">{children}</div>
      </motion.div>
    </div>
  );
}
