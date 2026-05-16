'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';

function LiquidCrystal() {
  const meshRef = useRef<THREE.Mesh>(null);

  // Smooth, continuous rotation for that premium ambient feel
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={2}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[2.5, 3]} />
        <MeshTransmissionMaterial
          backside
          samples={16}
          thickness={1.5}
          chromaticAberration={0.06}
          anisotropy={0.3}
          clearcoat={1}
          clearcoatRoughness={0.1}
          envMapIntensity={1.5}
          color="#0A142F" // Deep Obsidian Navy tint
          distortion={0.5}
          distortionScale={0.3}
          temporalDistortion={0.1}
        />
      </mesh>
    </Float>
  );
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-80">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }} gl={{ antialias: true }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />
        {/* The environment map is crucial for the glass reflections */}
        <Environment preset="city" />
        <LiquidCrystal />
      </Canvas>
      {/* Subtle vignette to blend the 3D canvas with the dark background */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent to-background/80 mix-blend-multiply" />
    </div>
  );
}