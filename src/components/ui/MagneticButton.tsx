'use client';

import React, { useRef, useState } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface MagneticButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  glowColor?: 'purple' | 'red' | 'blue';
}

export function MagneticButton({
  children,
  variant = 'primary',
  glowColor = 'purple',
  className,
  ...props
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMousePosition = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = buttonRef.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x, y });
  };

  const resetPosition = () => {
    setPosition({ x: 0, y: 0 });
  };

  const variants = {
    primary: 'bg-white text-black hover:bg-gray-200',
    secondary: 'bg-white/10 text-white hover:bg-white/20 backdrop-blur-md',
    outline: 'border border-white/20 text-white hover:bg-white/5',
  };

  const glowColors = {
    purple: 'hover:shadow-[0_0_20px_rgba(176,38,255,0.5)]',
    red: 'hover:shadow-[0_0_20px_rgba(255,42,42,0.5)]',
    blue: 'hover:shadow-[0_0_20px_rgba(0,210,255,0.5)]',
  };

  return (
    <motion.button
      ref={buttonRef}
      onMouseMove={handleMousePosition}
      onMouseLeave={resetPosition}
      animate={{ x: position.x * 0.2, y: position.y * 0.2 }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      className={cn(
        'relative px-8 py-4 rounded-full font-sans font-medium transition-all duration-300 overflow-hidden group',
        variants[variant],
        variant === 'primary' && glowColors[glowColor],
        className
      )}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      {variant === 'primary' && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
      )}
    </motion.button>
  );
}
