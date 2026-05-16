'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const navLinks = [
  { name: 'Platform', href: '#' },
  { name: 'Analytics', href: '#' },
  { name: 'Architecture', href: '#' },
  { name: 'Pricing', href: '#' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline>(null);

  useGSAP(() => {
    gsap.set('.menu-link', { y: 100, opacity: 0 });
    gsap.set('.menu-overlay', { clipPath: 'inset(0% 0% 100% 0%)' });

    tl.current = gsap.timeline({ paused: true })
      .to('.menu-overlay', {
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 0.8,
        ease: 'power4.inOut',
      })
      .to('.menu-link', {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
      }, "-=0.4");
  }, { scope: containerRef });

  useEffect(() => {
    if (isOpen) {
      tl.current?.play();
      document.body.style.overflow = 'hidden';
    } else {
      tl.current?.reverse();
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  return (
    <div ref={containerRef}>
      
      {/* PERFECT BURGER MENU (Isolated mix-blend-difference so it doesn't break the drawer) */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-6 right-6 z-[200] w-12 h-12 flex flex-col items-center justify-center mix-blend-difference focus:outline-none group pointer-events-auto"
        aria-label="Toggle Menu"
      >
        <div className="relative w-8 h-4">
          <span 
            className={`absolute right-0 h-[2px] bg-white transition-all duration-300 ease-in-out origin-center ${isOpen ? 'top-2 w-8 -rotate-45' : 'top-0 w-8 group-hover:w-6'}`} 
          />
          <span 
            className={`absolute right-0 h-[2px] bg-white transition-all duration-300 ease-in-out origin-center ${isOpen ? 'top-2 w-8 rotate-45' : 'top-4 w-6 group-hover:w-8'}`} 
          />
        </div>
      </button>

      {/* THE DRAWER OVERLAY (Solid background, text is clear) */}
      <div className="menu-overlay fixed inset-0 bg-[#020617] z-[150] flex flex-col justify-center px-6 md:px-24 pt-24 pb-12 will-change-[clip-path] text-white">
        <nav className="flex flex-col gap-4 md:gap-8">
          {navLinks.map((link, i) => (
            <div key={i} className="overflow-hidden">
              <Link 
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="menu-link block text-5xl md:text-[8vw] font-light tracking-tighter leading-none hover:text-white/50 transition-colors"
              >
                {link.name}
              </Link>
            </div>
          ))}
        </nav>
        
        <div className="mt-auto flex flex-col md:flex-row justify-between items-start md:items-end text-white/40 font-mono text-xs uppercase tracking-widest gap-4 overflow-hidden">
          <p className="menu-link">Tehran, IR // System Active</p>
          <p className="menu-link">© 2026 Raya Web Technologies</p>
        </div>
      </div>
    </div>
  );
}