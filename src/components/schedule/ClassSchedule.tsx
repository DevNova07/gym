'use client';

import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Clock, Users, ArrowRight } from 'lucide-react';

const schedule = [
  { time: '06:00 AM', name: 'Spartan Conditioning', trainer: 'Marcus Vance', spots: 4, glow: 'purple' },
  { time: '08:00 AM', name: 'Hypertrophy Power Hour', trainer: 'David Russo', spots: 0, glow: 'red' },
  { time: '12:00 PM', name: 'Mobility & Recovery', trainer: 'Elena Rostova', spots: 12, glow: 'blue' },
  { time: '05:30 PM', name: 'Elite HIIT Circuit', trainer: 'Marcus Vance', spots: 2, glow: 'purple' },
  { time: '07:00 PM', name: 'Advanced Box Fit', trainer: 'Sarah Jenkins', spots: 8, glow: 'red' },
];

export function ClassSchedule() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-10% 0px' });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="relative py-32 w-full bg-[#030303]" ref={containerRef}>
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-heading font-bold text-4xl md:text-5xl text-white uppercase tracking-tight mb-4">
              Daily <span className="text-purple-500">Battleground</span>
            </h2>
            <p className="text-gray-400">Lock in your slot. Spaces are highly limited.</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex gap-2">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, i) => (
                <button 
                  key={day}
                  className={`w-12 h-12 rounded-xl border flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                    i === 0 
                      ? 'bg-purple-600 border-purple-400 text-white shadow-[0_0_15px_rgba(176,38,255,0.4)]' 
                      : 'bg-white/5 border-white/10 text-gray-500 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="flex flex-col gap-4">
          {schedule.map((cls, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              onHoverStart={() => setHoveredIndex(i)}
              onHoverEnd={() => setHoveredIndex(null)}
              className="group relative w-full glass rounded-3xl overflow-hidden cursor-pointer"
            >
              {/* Dynamic Glow Background */}
              <motion.div 
                className={`absolute inset-0 bg-gradient-to-r ${cls.glow === 'purple' ? 'from-purple-900/40' : cls.glow === 'red' ? 'from-red-900/40' : 'from-blue-900/40'} to-transparent`}
                initial={{ opacity: 0, x: '-100%' }}
                animate={{ opacity: hoveredIndex === i ? 1 : 0, x: hoveredIndex === i ? 0 : '-100%' }}
                transition={{ duration: 0.4 }}
              />

              <div className="relative z-10 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-12 w-full md:w-auto">
                  <div className="flex items-center gap-3 text-purple-400 font-mono text-lg shrink-0">
                    <Clock className="w-5 h-5" />
                    {cls.time}
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-bold text-white uppercase tracking-wider mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all">
                      {cls.name}
                    </h3>
                    <p className="text-gray-400 text-sm">Led by: <span className="text-white">{cls.trainer}</span></p>
                  </div>
                </div>

                <div className="flex items-center gap-8 w-full md:w-auto justify-between md:justify-end">
                  <div className="flex items-center gap-2">
                    <Users className={`w-5 h-5 ${cls.spots === 0 ? 'text-red-500' : 'text-gray-400'}`} />
                    <span className={`text-sm font-bold ${cls.spots === 0 ? 'text-red-500' : 'text-gray-300'}`}>
                      {cls.spots === 0 ? 'WAITLIST' : `${cls.spots} SPOTS LEFT`}
                    </span>
                  </div>

                  <a 
                    href={cls.spots === 0 ? '#' : 'https://wa.me/919506724451'}
                    target={cls.spots === 0 ? '_self' : '_blank'}
                    rel="noopener noreferrer"
                    className={`h-12 px-6 rounded-full font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-2 transition-all duration-300 ${
                      cls.spots === 0 
                        ? 'bg-white/5 text-gray-600 cursor-not-allowed border border-white/5 pointer-events-none' 
                        : 'bg-white text-black hover:bg-gray-200 hover:gap-4'
                    }`}
                  >
                    {cls.spots === 0 ? 'Full' : 'Book on WhatsApp'}
                    {cls.spots > 0 && <ArrowRight className="w-4 h-4" />}
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
