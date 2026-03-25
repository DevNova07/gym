'use client';

import React, { useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useStore } from '@/store/useStore';

export function AudioToggle() {
  const { isAudioMuted, toggleAudio } = useStore();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // We use a royalty-free stock audio URL or just an empty audio tag for demo purposes.
    // In a real app, this would point to a local asset.
    audioRef.current = new window.Audio('https://cdn.pixabay.com/audio/2022/10/25/audio_1f2fbb1c31.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;
    
    if (isAudioMuted) {
      audioRef.current.pause();
    } else {
      // Play might fail if user hasn't interacted with document yet
      audioRef.current.play().catch(e => console.log('Audio autoplay prevented by browser', e));
    }
  }, [isAudioMuted]);

  return (
    <button
      onClick={toggleAudio}
      className={`fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full backdrop-blur-md flex items-center justify-center transition-all duration-300 ${
        isAudioMuted 
          ? 'bg-white/10 text-white/50 border border-white/20 hover:bg-white/20 hover:text-white' 
          : 'bg-purple-500 text-white shadow-[0_0_20px_rgba(176,38,255,0.5)] border border-purple-400'
      }`}
      aria-label="Toggle Audio"
    >
      {isAudioMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
    </button>
  );
}
