'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';

function GlassKnot() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} scale={1.2}>
        {/* High-segment geometry for perfect glass curves */}
        <torusKnotGeometry args={[2, 0.6, 256, 64]} />
        <MeshTransmissionMaterial
          backside
          samples={16}
          thickness={1.5}
          chromaticAberration={0.1}
          anisotropy={0.3}
          clearcoat={1}
          clearcoatRoughness={0.1}
          envMapIntensity={2}
          color="#ffffff" // Pure glass
          distortion={0.2}
          distortionScale={0.1}
          temporalDistortion={0.1}
        />
      </mesh>
    </Float>
  );
}

export default function GlassCoreScene() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }} gl={{ antialias: true }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={2} />
        <Environment preset="city" />
        <GlassKnot />
      </Canvas>
    </div>
  );
}