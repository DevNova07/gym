'use client';

import React, { useState, Suspense, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, MeshDistortMaterial, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { MagneticButton } from '@/components/ui/MagneticButton';

function MorphingPhysique({ goal }: { goal: 'fatloss' | 'muscle' | 'athletic' }) {
  const meshRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  
  // Define target states
  const targets = {
    fatloss: { scale: [0.8, 1.2, 0.8], color: '#ff2a2a' },
    muscle: { scale: [1.3, 1.1, 1.3], color: '#b026ff' },
    athletic: { scale: [1, 1, 1], color: '#00d2ff' },
  };
  
  const target = targets[goal];

  useFrame((state) => {
    if (!meshRef.current || !coreRef.current) return;
    const t = state.clock.getElapsedTime();
    
    // Smoothly interpolate scale
    meshRef.current.scale.x = THREE.MathUtils.lerp(meshRef.current.scale.x, target.scale[0], 0.05);
    meshRef.current.scale.y = THREE.MathUtils.lerp(meshRef.current.scale.y, target.scale[1], 0.05);
    meshRef.current.scale.z = THREE.MathUtils.lerp(meshRef.current.scale.z, target.scale[2], 0.05);
    
    // Rotate
    meshRef.current.rotation.y = t * 0.5;
    meshRef.current.rotation.x = Math.sin(t * 0.5) * 0.2;
    
    // Counter rotate core
    coreRef.current.rotation.z = -t;
  });

  return (
    <group ref={meshRef}>
      <mesh>
        <icosahedronGeometry args={[2, 2]} />
        <meshStandardMaterial
          color={target.color}
          wireframe={true}
          emissive={target.color}
          emissiveIntensity={0.5}
          transparent
          opacity={0.8}
        />
      </mesh>
      
      <mesh ref={coreRef}>
        <octahedronGeometry args={[1.2, 0]} />
        <meshStandardMaterial
          color={'#ffffff'}
          roughness={0.1}
          metalness={1}
        />
      </mesh>
    </group>
  );
}

export function GoalVisualizer() {
  const [goal, setGoal] = useState<'fatloss' | 'muscle' | 'athletic'>('athletic');
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-10% 0px' });

  return (
    <section className="relative py-32 w-full bg-[#030303] overflow-hidden" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Side: Setup */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-heading font-bold text-4xl md:text-5xl text-white mb-6 uppercase tracking-tight">
            Visualize Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500">Evolution</span>
          </h2>
          <p className="text-gray-400 mb-10 text-lg">
            Select your primary objective to see how our proprietary protocol restructures your composition.
          </p>

          <div className="space-y-4 mb-10">
            {[
              { id: 'fatloss', label: 'Fat Loss Catalyst', desc: 'Shed body fat while preserving lean tissue' },
              { id: 'muscle', label: 'Hypertrophy Max', desc: 'Maximum muscle mass accruement' },
              { id: 'athletic', label: 'Functional Elite', desc: 'Balanced strength, endurance, and agility' }
            ].map((opt) => (
              <div 
                key={opt.id}
                onClick={() => setGoal(opt.id as any)}
                className={`p-6 rounded-2xl cursor-pointer border transition-all duration-300 ${
                  goal === opt.id 
                    ? 'border-purple-500 bg-purple-500/10 shadow-[0_0_20px_rgba(176,38,255,0.2)]' 
                    : 'border-white/10 bg-white/5 hover:bg-white/10'
                }`}
              >
                <h3 className={`text-xl font-bold uppercase mb-2 ${goal === opt.id ? 'text-white' : 'text-gray-300'}`}>
                  {opt.label}
                </h3>
                <p className={goal === opt.id ? 'text-gray-200' : 'text-gray-500'}>
                  {opt.desc}
                </p>
              </div>
            ))}
          </div>

          <a href="https://wa.me/919506724451?text=Hi,%20I%20want%20to%20generate%20a%20custom%20plan!" target="_blank" rel="noopener noreferrer">
            <MagneticButton variant="primary">Generate Custom Plan</MagneticButton>
          </a>
        </motion.div>

        {/* Right Side: 3D Visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="h-[600px] w-full relative rounded-3xl overflow-hidden glass border-white/5"
        >
          <div className="absolute inset-x-0 top-0 p-6 flex justify-between z-10 pointer-events-none">
            <span className="text-white/50 text-xs font-mono tracking-widest uppercase">Target Output</span>
            <span className="text-purple-400 text-xs font-mono tracking-widest animate-pulse">Live Render</span>
          </div>

          <Suspense fallback={<div className="h-full w-full flex items-center justify-center text-white/20">Loading Physics...</div>}>
            <Canvas dpr={[1, 2]}>
              <PerspectiveCamera makeDefault position={[0, 0, 8]} />
              <ambientLight intensity={0.5} />
              <directionalLight position={[10, 10, 5]} intensity={2} color="#ffffff" />
              <pointLight position={[-10, -10, -5]} intensity={1} color="#b026ff" />
              <Environment preset="studio" />
              <MorphingPhysique goal={goal} />
            </Canvas>
          </Suspense>
          
          <div className="absolute inset-x-0 bottom-0 p-6 z-10 pointer-events-none bg-gradient-to-t from-black/80 to-transparent">
            <p className="text-white text-center font-mono text-sm tracking-widest uppercase">
              {goal === 'fatloss' && 'Metabolic Optimization'}
              {goal === 'muscle' && 'Anabolic Drive Active'}
              {goal === 'athletic' && 'Equilibrium Maintained'}
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
