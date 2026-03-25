'use client';

import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, PerspectiveCamera, Stars, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function AbstractDumbbell() {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    // Rotate based on time and mouse position
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      (state.pointer.x * Math.PI) / 4 + t * 0.2,
      0.1
    );
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      (state.pointer.y * Math.PI) / 4 + t * 0.1,
      0.1
    );
  });

  return (
    <group ref={meshRef}>
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        {/* Core sphere - glowing */}
        <mesh position={[0, 0, 0]} scale={1.2}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color="#b026ff"
            emissive="#b026ff"
            emissiveIntensity={0.5}
            wireframe
          />
        </mesh>

        {/* Outer distortion representing energy/muscle */}
        <mesh position={[0, 0, 0]} scale={1.5}>
          <sphereGeometry args={[1, 64, 64]} />
          <MeshDistortMaterial
            color="#030303"
            envMapIntensity={1}
            clearcoat={1}
            clearcoatRoughness={0.1}
            metalness={0.9}
            roughness={0.1}
            distort={0.4}
            speed={2}
          />
        </mesh>
        
        {/* Floating weights around */}
        {[-3, 3].map((x, i) => (
          <mesh key={i} position={[x, i===0?1:-1, 0]}>
            <torusGeometry args={[0.5, 0.2, 16, 32]} />
            <meshStandardMaterial
              color="#ff2a2a"
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
        ))}
      </Float>
    </group>
  );
}

export default function Scene() {
  return (
    <Canvas className="w-full h-full" dpr={[1, 2]}>
      <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={45} />
      
      {/* Lighting */}
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#b026ff" />
      <directionalLight position={[-10, -10, -5]} intensity={1} color="#00d2ff" />
      <spotLight position={[0, 5, 0]} intensity={2} color="#ff2a2a" penumbra={1} distance={10} />
      
      {/* 3D Elements */}
      <Suspense fallback={null}>
        <AbstractDumbbell />
        <Environment preset="night" />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      </Suspense>
    </Canvas>
  );
}
