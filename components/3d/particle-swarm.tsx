'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { Environment } from '@react-three/drei';

function Swarm() {
  const pointsRef = useRef<THREE.Points>(null);
  const { mouse, viewport } = useThree();
  
  // Generate 5000 particles in a complex vortex shape
  const count = 5000;
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const color = new THREE.Color();
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const radius = Math.random() * 10 + 2;
      const spinAngle = radius * 5;
      const branchAngle = ((i % 3) * Math.PI * 2) / 3;
      
      pos[i3] = Math.cos(spinAngle + branchAngle) * radius;
      pos[i3 + 1] = (Math.random() - 0.5) * (radius * 0.5); // height variance
      pos[i3 + 2] = Math.sin(spinAngle + branchAngle) * radius;

      // Mix between deep navy, pure white, and a hint of emerald
      const mixRatio = Math.random();
      if (mixRatio > 0.8) color.setHex(0x10b981); // Emerald
      else if (mixRatio > 0.4) color.setHex(0xffffff); // White
      else color.setHex(0x0a142f); // Deep Navy
      
      col[i3] = color.r;
      col[i3 + 1] = color.g;
      col[i3 + 2] = color.b;
    }
    return [pos, col];
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    
    // Slow, haunting global rotation
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    
    // Mouse magnetic effect (parallax)
    const targetX = (mouse.x * viewport.width) / 10;
    const targetY = (mouse.y * viewport.height) / 10;
    
    pointsRef.current.position.x += (targetX - pointsRef.current.position.x) * 0.02;
    pointsRef.current.position.y += (targetY - pointsRef.current.position.y) * 0.02;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.05} vertexColors transparent opacity={0.6} sizeAttenuation blending={THREE.AdditiveBlending} depthWrite={false} />
    </points>
  );
}

export default function ParticleScene() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-[#030712]">
      <Canvas camera={{ position: [0, 5, 15], fov: 60 }} gl={{ antialias: true, alpha: false }}>
        <fog attach="fog" args={['#030712', 10, 25]} />
        <Swarm />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}