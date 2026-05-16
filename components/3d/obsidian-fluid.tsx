'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = `
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uScroll;
  
  void main() {
    vUv = uv;
    vec3 pos = position;
    
    // Complex wave mathematics
    float noiseFreq = 2.5;
    float noiseAmp = 0.5;
    vec3 noisePos = vec3(pos.x * noiseFreq + uTime, pos.y, pos.z);
    
    // The plane bends towards the user as they scroll
    pos.z += sin(pos.x * 2.0 + uTime * 0.5) * 0.2;
    pos.z += cos(pos.y * 2.0 + uTime * 0.4) * 0.2;
    pos.z += uScroll * 0.005; // Scroll depth displacement

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uMouse;
  
  void main() {
    vec2 p = -1.0 + 2.0 * vUv;
    
    // Mouse distortion field
    float mouseDist = length(p - uMouse);
    float mouseEffect = exp(-mouseDist * 3.0);
    
    // Dynamic coloring based on mathematical coordinates
    vec3 color1 = vec3(0.02, 0.04, 0.08); // Deep Obsidian
    vec3 color2 = vec3(0.04, 0.15, 0.35); // Navy Highlight
    vec3 color3 = vec3(0.06, 0.72, 0.50); // Emerald Data Pulse
    
    float wave = sin(p.x * 10.0 + uTime) * cos(p.y * 10.0 + uTime);
    
    vec3 finalColor = mix(color1, color2, wave + mouseEffect * 0.5);
    
    // Add the emerald pulse near the mouse
    finalColor = mix(finalColor, color3, mouseEffect * 0.4);
    
    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

function FluidPlane() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { viewport } = useThree();

  // 1. We declare the uniforms here
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uScroll: { value: 0 }
  }), []);

  useFrame((state) => {
    // 2. Add an extra safety check for the specific uniform just in case R3F lags behind a frame
    if (materialRef.current && materialRef.current.uniforms.uTime) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime * 0.5;
      
      const targetX = (state.pointer.x * viewport.width) / 2;
      const targetY = (state.pointer.y * viewport.height) / 2;
      
      materialRef.current.uniforms.uMouse.value.x += (state.pointer.x - materialRef.current.uniforms.uMouse.value.x) * 0.05;
      materialRef.current.uniforms.uMouse.value.y += (state.pointer.y - materialRef.current.uniforms.uMouse.value.y) * 0.05;
      
      materialRef.current.uniforms.uScroll.value = window.scrollY;
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[viewport.width * 1.5, viewport.height * 1.5, 64, 64]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        wireframe={false}
        uniforms={uniforms} /* 👈 THIS WAS MISSING */
      />
    </mesh>
  );
}

export default function ObsidianFluidScene() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <FluidPlane />
      </Canvas>
    </div>
  );
}