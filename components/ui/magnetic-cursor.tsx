'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function MagneticCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Follow mouse with slight delay (Lerp)
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', onMouseMove);

    const render = () => {
      // 0.15 is the friction/lerp amount. Lower = heavier
      cursorX += (mouseX - cursorX) * 0.15;
      cursorY += (mouseY - cursorY) * 0.15;
      
      gsap.set(cursor, {
        x: cursorX,
        y: cursorY,
      });
      
      requestAnimationFrame(render);
    };
    
    requestAnimationFrame(render);

    // Magnetic logic for any element with data-magnetic="true"
    const magneticElements = document.querySelectorAll('[data-magnetic="true"]');
    
    magneticElements.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        gsap.to(cursor, { scale: 3, backgroundColor: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.5)', duration: 0.3 });
      });
      el.addEventListener('mouseleave', () => {
        gsap.to(cursor, { scale: 1, backgroundColor: 'white', border: 'none', duration: 0.3 });
        gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.3)' });
      });
      el.addEventListener('mousemove', (e: any) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        // Move the button itself slightly towards the mouse
        gsap.to(el, { x: x * 0.2, y: y * 0.2, duration: 0.3 });
      });
    });

    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  return (
    <div 
      ref={cursorRef} 
      className="fixed top-0 left-0 w-3 h-3 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference transform -translate-x-1/2 -translate-y-1/2"
    />
  );
}