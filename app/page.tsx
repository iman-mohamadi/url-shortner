'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Zap, ShieldCheck, Globe2, Activity, ArrowRight } from 'lucide-react';
import SystemMarquee from '@/components/ui/marquee';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function LandingPage() {
  const mainRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 0. Set Initial State natively with GSAP
    gsap.set('.massive-logo', { xPercent: -50, yPercent: -50 });
    gsap.set('.arch-pill', { scale: 0.5, opacity: 0, rotateX: 60 });
    
    // 1. The Logo Morph (Shrinks into the Navbar)
    const heroTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.hero-spacer',
        start: 'top top',
        end: 'bottom top',
        scrub: 1, 
      }
    });

    heroTl.to('.massive-logo', {
      top: '1.5rem',      
      left: '1.5rem',     
      xPercent: 0,        
      yPercent: 0,
      fontSize: '1.5rem', 
      letterSpacing: '-0.05em',
      ease: 'power2.out',
    }, 0)
    .to('.hero-form-container', {
      opacity: 0,
      y: -50,
      scale: 0.95,
      ease: 'power2.out',
    }, 0);

    // 2. The Architecture Text Reveal (Scrubbing)
    const archTl = gsap.timeline({
      scrollTrigger: {
        trigger: '#architecture',
        start: 'top 70%',  
        end: 'bottom 60%', 
        scrub: 1.5,        
      }
    });

    archTl.to('.arch-text', {
      color: 'rgba(255, 255, 255, 1)',
      stagger: 0.2,
      duration: 1,
      ease: 'power1.inOut'
    }, 0)
    .to('.arch-pill', {
      scale: 1,
      opacity: 1,
      rotateX: 0,
      stagger: 0.2,
      duration: 1.2,
      ease: 'back.out(2)' 
    }, 0.1);

    // 3. The Clip-Path Showcase (The Stacking Cards)
    const showcaseTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.showcase-pin-wrapper',
        start: 'top top',
        end: '+=200%', 
        pin: true,
        scrub: true,
      }
    });

    showcaseTl.to('.stack-panel-1', {
      clipPath: 'inset(0% 0% 100% 0%)',
      ease: 'none',
      duration: 1
    })
    .to('.stack-panel-2', {
      clipPath: 'inset(0% 0% 100% 0%)',
      ease: 'none',
      duration: 1
    });

    // 4. Horizontal Sweep (Pinned for readability - MATHEMATICALLY PERFECTED)
    const sweepTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.sweep-container',
        start: 'center center', 
        end: '+=250%', // Increased scroll duration so you have more time to read it
        pin: true,
        scrub: 1,
      }
    });

    sweepTl.fromTo('.sweep-text', 
      // Start: The left edge of the text sits exactly at the right edge of the screen
      { x: '100vw', xPercent: 0 }, 
      // End: We move it left by its entire width (xPercent: -100), AND an extra 10vw to clear the left edge of the screen completely.
      { x: '-10vw', xPercent: -100, ease: 'none' } 
    );

  }, { scope: mainRef });

  return (
    <>
      <main ref={mainRef} className="relative z-10 bg-[#020617] text-white overflow-hidden">
        
        {/* THE FIXED LOGO */}
        <h1 className="massive-logo fixed top-1/2 left-1/2 text-[16vw] leading-none font-black tracking-tighter text-white z-50 mix-blend-difference pointer-events-none">
          RAYA.
        </h1>
        
        <SystemMarquee />

        {/* --- HERO SPACER --- */}
        <div className="hero-spacer h-[120vh] w-full relative">
           <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-end pb-24 px-6">
              <div className="hero-form-container w-full max-w-2xl flex flex-col items-center gap-6">
                <form className="w-full relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-white/10 to-white/5 rounded-full blur opacity-20 group-hover:opacity-40 transition duration-500" />
                  <div className="relative glass-panel rounded-full p-2 flex items-center bg-white/[0.02] backdrop-blur-2xl border border-white/10">
                    <input
                      type="url"
                      placeholder="Paste your original URL..."
                      className="flex-1 bg-transparent text-white placeholder:text-white/30 px-6 py-4 focus:outline-none text-lg font-light w-full"
                      required
                    />
                    <button className="bg-white text-black px-8 py-4 rounded-full font-medium tracking-wide flex items-center gap-2 hover:scale-[0.98] transition-transform shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                      Shorten <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </form>
                <p className="text-white/40 uppercase tracking-[0.2em] text-[10px] font-mono animate-pulse">
                  Scroll to initialize engine ↓
                </p>
              </div>
           </div>
        </div>

        {/* --- SCRUBBED TYPOGRAPHY SECTION --- */}
        <section id="architecture" className="min-h-screen flex items-center justify-center px-6 py-32 bg-[#050505] perspective-[1000px]">
          <div className="max-w-5xl mx-auto">
            <p className="text-emerald-400 font-mono text-xs tracking-widest uppercase mb-12">The Architecture</p>
            <h2 className="text-[clamp(2rem,5vw,4.5rem)] leading-[1.15] font-light tracking-tight text-white/10">
              
              <span className="arch-text transition-colors">Raya is engineered with a custom </span>
              
              <span className="arch-pill inline-flex items-center justify-center align-middle mx-3 px-5 py-1.5 bg-white/5 border border-white/10 rounded-full text-white text-[clamp(1.5rem,3vw,2.5rem)] font-medium shadow-2xl backdrop-blur-md transform-gpu">
                <Zap className="w-5 h-5 mr-2 text-yellow-400" /> Fastify
              </span> 
              
              <span className="arch-text transition-colors"> engine, ensuring every redirect processes in under </span>
              
              <span className="arch-text text-white/20 italic mx-2 font-medium transition-colors">50 milliseconds. </span>
              
              <span className="arch-text transition-colors">We secure your vault using military-grade </span>
              
              <span className="arch-pill inline-flex items-center justify-center align-middle mx-3 px-5 py-1.5 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-400 text-[clamp(1.5rem,3vw,2.5rem)] font-medium transform-gpu">
                <ShieldCheck className="w-5 h-5 mr-2" /> Bcrypt
              </span>
              
              <span className="arch-text transition-colors"> hashing, while our data layer maps global demographics instantly via </span>
              
              <span className="arch-pill inline-flex items-center justify-center align-middle mx-3 w-14 h-12 bg-emerald-500/20 border border-emerald-500/50 rounded-full transform-gpu">
                <Globe2 className="w-5 h-5 text-emerald-400" />
              </span>
              
              <span className="arch-text transition-colors"> Geo-IP integration.</span>
              
            </h2>
          </div>
        </section>

        {/* --- THE MASTER PIN WRAPPER --- */}
        <div className="showcase-pin-wrapper h-screen w-full relative overflow-hidden">
          
          <section className="stack-panel-1 absolute inset-0 h-screen w-full flex items-center justify-center bg-[#0A142F] z-30 px-6" style={{ clipPath: 'inset(0% 0% 0% 0%)' }}>
            <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="w-full aspect-square rounded-[3rem] bg-white/[0.02] backdrop-blur-xl border border-white/10 flex flex-col items-center justify-center relative overflow-hidden">
                <Activity className="w-32 h-32 text-blue-400 opacity-50 drop-shadow-[0_0_30px_rgba(96,165,250,0.5)]" />
              </div>
              <div className="flex flex-col">
                <span className="text-blue-400 font-mono text-xs tracking-widest uppercase mb-4">01 // The Data Layer</span>
                <h2 className="text-5xl md:text-6xl font-semibold tracking-tight mb-6">Deep Analytics.</h2>
                <p className="text-xl md:text-2xl text-white/50 font-light leading-relaxed">
                  Instantly parse global IPs and device fingerprints. Know exactly who clicks, when, and from what device.
                </p>
              </div>
            </div>
          </section>

          <section className="stack-panel-2 absolute inset-0 h-screen w-full flex items-center justify-center bg-[#050505] z-20 px-6" style={{ clipPath: 'inset(0% 0% 0% 0%)' }}>
            <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="w-full aspect-square rounded-[3rem] bg-white/[0.02] backdrop-blur-xl border border-white/10 flex flex-col items-center justify-center relative overflow-hidden">
                <ShieldCheck className="w-32 h-32 text-emerald-400 opacity-50 drop-shadow-[0_0_30px_rgba(52,211,153,0.5)]" />
              </div>
              <div className="flex flex-col">
                <span className="text-emerald-400 font-mono text-xs tracking-widest uppercase mb-4">02 // The Vault</span>
                <h2 className="text-5xl md:text-6xl font-semibold tracking-tight mb-6">Military Secure.</h2>
                <p className="text-xl md:text-2xl text-white/50 font-light leading-relaxed">
                  Seal sensitive links behind bcrypt hashing. The Fastify router freezes the redirect until authorization clears.
                </p>
              </div>
            </div>
          </section>

          <section className="stack-panel-3 absolute inset-0 h-screen w-full flex items-center justify-center bg-[#1E0A0A] z-10 px-6" style={{ clipPath: 'inset(0% 0% 0% 0%)' }}>
            <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="w-full aspect-square rounded-[3rem] bg-white/[0.02] backdrop-blur-xl border border-white/10 flex flex-col items-center justify-center relative overflow-hidden">
                <Zap className="w-32 h-32 text-red-400 opacity-50 drop-shadow-[0_0_30px_rgba(248,113,113,0.5)]" />
              </div>
              <div className="flex flex-col">
                <span className="text-red-400 font-mono text-xs tracking-widest uppercase mb-4">03 // The Engine</span>
                <h2 className="text-5xl md:text-6xl font-semibold tracking-tight mb-6">Sub-50ms Speed.</h2>
                <p className="text-xl md:text-2xl text-white/50 font-light leading-relaxed">
                  Backed by Redis in-memory caching. We execute the lookup, write the analytics, and redirect faster than the browser paints.
                </p>
              </div>
            </div>
          </section>

        </div>

        {/* --- HORIZONTAL SWEEP MARQUEE --- */}
        <section className="sweep-container h-screen flex flex-col justify-center overflow-hidden bg-white border-y border-white/10">
          <h2 className="sweep-text text-[12vw] leading-none font-black tracking-tighter text-black uppercase whitespace-nowrap">
            Control the Narrative. Own the Link.
          </h2>
        </section>

      </main>

      {/* CURTAIN FOOTER REVEAL */}
      <div className="h-[60vh] w-full bg-transparent pointer-events-none" />
    </>
  );
}