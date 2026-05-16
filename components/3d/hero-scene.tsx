'use client';

import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, MeshTransmissionMaterial, PerformanceMonitor } from '@react-three/drei';
import * as THREE from 'three';

function LiquidCrystal({ dpr }: { dpr: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

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
          samples={dpr > 1 ? 16 : 8} // Scale down samples on struggling devices
          resolution={dpr > 1 ? 1024 : 256} // Scale down reflection resolution
          thickness={1.5}
          chromaticAberration={0.06}
          anisotropy={0.3}
          clearcoat={1}
          clearcoatRoughness={0.1}
          envMapIntensity={1.5}
          color="#0A142F" 
          distortion={0.5}
          distortionScale={0.3}
          temporalDistortion={0.1}
        />
      </mesh>
    </Float>
  );
}

export default function HeroScene() {
  const [dpr, setDpr] = useState(2);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-80">
      <Canvas 
        camera={{ position: [0, 0, 8], fov: 45 }} 
        gl={{ antialias: true, alpha: true }}
        dpr={dpr}
      >
        <PerformanceMonitor 
          onDecline={() => setDpr(1)} 
          onIncline={() => setDpr(2)} 
        />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />
        <Environment preset="city" />
        <LiquidCrystal dpr={dpr} />
      </Canvas>
      
      <div className="absolute inset-0 bg-radial-gradient from-transparent to-[#020617]/90 mix-blend-multiply" />
    </div>
  );
}