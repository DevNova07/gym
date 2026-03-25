'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Play, X } from 'lucide-react';

export function VideoParallax() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], ['-20%', '20%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1.1, 0.9]);

  // Lock scroll when modal is open
  useEffect(() => {
    if (isVideoOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isVideoOpen]);

  return (
    <>
      <section 
        ref={containerRef} 
        className="relative h-[120vh] w-full bg-[#030303] overflow-hidden flex items-center justify-center cursor-default"
      >
        <motion.div 
          style={{ y, opacity, scale }}
          className="absolute inset-0 w-full h-full pb-[20%]"
        >
          <div className="relative w-full h-[140%]">
            {/* Fallback cinematic image background instead of broken video URL */}
            <div 
              className="w-full h-full bg-cover bg-center opacity-50"
              style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1600&q=80")' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]" />
            <div className="absolute inset-0 bg-black/50" />
          </div>
        </motion.div>

        <div className="relative z-10 flex flex-col items-center">
          <motion.div 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsVideoOpen(true)}
            className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center cursor-pointer group mb-8 shadow-[0_0_50px_rgba(255,42,42,0.3)] hover:shadow-[0_0_80px_rgba(255,42,42,0.6)] transition-all duration-500"
          >
            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center group-hover:scale-95 transition-transform shadow-[0_0_30px_rgba(255,255,255,0.5)]">
              <Play className="w-6 h-6 text-black ml-1" />
            </div>
          </motion.div>
          
          <h2 className="font-heading font-bold text-5xl md:text-7xl text-white uppercase tracking-tighter text-center">
            Witness The <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-purple-500">
              Evolution
            </span>
          </h2>
        </div>
      </section>

      {/* Cinematic Fullscreen Video Modal */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex items-center justify-center"
          >
            {/* Close Button */}
            <motion.button
              onClick={() => setIsVideoOpen(false)}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="absolute top-8 right-8 w-14 h-14 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-full flex items-center justify-center backdrop-blur-lg transition-all z-[110]"
            >
              <X className="w-6 h-6" />
            </motion.button>

            {/* Video Container */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-[90%] md:w-[80%] max-w-6xl aspect-video bg-black rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(176,38,255,0.3)] border border-white/10"
            >
              <iframe 
                className="w-full h-full object-cover" 
                src="https://www.youtube.com/embed/8BcPHWGQO44?autoplay=1&mute=0&rel=0" 
                title="Cinematic Gym Trailer"
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
