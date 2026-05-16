'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-6 py-6 pointer-events-none flex justify-end mix-blend-difference">
      {/* Stripped back to transparent with a subtle border. 
        Because the parent has mix-blend-difference, this entire block 
        will perfectly invert on white backgrounds.
      */}
      <nav className="pointer-events-auto flex items-center gap-6 px-6 py-2.5 rounded-full border border-white/20 bg-transparent text-white">
        
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-white/80">
          <Link href="#architecture" className="hover:text-white transition-colors duration-300">
            Architecture
          </Link>
          <Link href="#pro" className="hover:text-white transition-colors duration-300 flex items-center gap-1">
            Raya Pro <ArrowUpRight className="w-3 h-3 opacity-50" />
          </Link>
        </div>

        <div className="w-[1px] h-4 bg-white/30 hidden md:block" />

        {/* On a black bg: bg-white text-black looks normal.
          On a white bg: difference blending turns this into a black button with white text!
        */}
        <Link 
          href="/dashboard"
          className="text-sm font-medium text-black bg-white px-5 py-1.5 rounded-full hover:scale-95 transition-transform duration-300"
        >
          Dashboard
        </Link>
        
      </nav>
    </header>
  );
}