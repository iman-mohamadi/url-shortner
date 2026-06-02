'use client';

import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface Particle {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  size: number;
}

function ParticleField() {
  const groupRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<Particle[]>([]);
  const pointsRef = useRef<THREE.Points>(null);

  useEffect(() => {
    const particles: Particle[] = [];
    const count = 150;

    for (let i = 0; i < count; i++) {
      particles.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 40,
          (Math.random() - 0.5) * 40,
          (Math.random() - 0.5) * 40
        ),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.1,
          (Math.random() - 0.5) * 0.1,
          (Math.random() - 0.5) * 0.1
        ),
        size: Math.random() * 0.5 + 0.1,
      });
    }

    particlesRef.current = particles;
  }, []);

  useFrame(() => {
    if (!pointsRef.current) return;

    const positions = new Float32Array(particlesRef.current.length * 3);
    const sizes = new Float32Array(particlesRef.current.length);

    particlesRef.current.forEach((particle, i) => {
      particle.position.add(particle.velocity);

      // Wrap around
      if (Math.abs(particle.position.x) > 20) particle.velocity.x *= -1;
      if (Math.abs(particle.position.y) > 20) particle.velocity.y *= -1;
      if (Math.abs(particle.position.z) > 20) particle.velocity.z *= -1;

      positions[i * 3] = particle.position.x;
      positions[i * 3 + 1] = particle.position.y;
      positions[i * 3 + 2] = particle.position.z;
      sizes[i] = particle.size;
    });

    pointsRef.current.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    pointsRef.current.geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={150} array={new Float32Array(150 * 3)} itemSize={3} />
        <bufferAttribute attach="attributes-size" count={150} array={new Float32Array(150)} itemSize={1} />
      </bufferGeometry>
      <pointsMaterial
        size={0.5}
        sizeAttenuation
        color="#ffa500"
        fog={false}
        transparent
        opacity={0.6}
      />
    </points>
  );
}

export function Particles() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 25], fov: 75 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ParticleField />
      </Canvas>
    </div>
  );
}
