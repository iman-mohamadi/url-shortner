'use client';

import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Zap, ShieldCheck, Globe2, Activity, ArrowRight, Link2, BarChart3, Lock, Cpu } from 'lucide-react';
import SystemMarquee from '@/components/ui/marquee';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function LandingPage() {
  const mainRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 15) + 5;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setTimeout(() => setIsLoaded(true), 400); 
      }
      setLoadingProgress(progress);
    }, 150);
    return () => clearInterval(interval);
  }, []);

  useGSAP(() => {
    if (!isLoaded) return;

    let mm = gsap.matchMedia();

    const initTl = gsap.timeline();
    initTl.to('.preloader-curtain', { clipPath: 'inset(0% 0% 100% 0%)', duration: 1.5, ease: 'expo.inOut' })
      .from('.massive-logo', { scale: 0.9, opacity: 0, filter: 'blur(10px)', duration: 1.5, ease: 'expo.out' }, "-=1")
      .from('.hero-form-container', { y: 40, opacity: 0, duration: 1.2, ease: 'power3.out' }, "-=1.2")
      .from('.ambient-glow', { opacity: 0, scale: 0.5, duration: 2, ease: 'power2.out' }, "-=1.5");

    gsap.from('.bento-header-element', { scrollTrigger: { trigger: '#bento-features', start: 'top 80%' }, y: 40, opacity: 0, duration: 1, stagger: 0.15, ease: 'power3.out' });
    gsap.from('.bento-item', { scrollTrigger: { trigger: '.bento-grid', start: 'top 75%' }, y: 60, opacity: 0, scale: 0.95, duration: 1.2, stagger: 0.1, ease: 'expo.out' });

    mm.add("(min-width: 768px)", () => {
      const heroTl = gsap.timeline({ scrollTrigger: { trigger: '.hero-spacer', start: 'top top', end: 'bottom top', scrub: 1 } });
      heroTl.to('.massive-logo', { top: '1.5rem', left: '1.5rem', xPercent: 0, yPercent: 0, x: 0, y: 0, fontSize: '1.5rem', letterSpacing: '-0.05em', ease: 'power2.out' }, 0)
            .to('.hero-form-container', { opacity: 0, y: -50, scale: 0.95, ease: 'power2.out' }, 0);

      const archTl = gsap.timeline({ scrollTrigger: { trigger: '#architecture', start: 'top 70%', end: 'bottom 60%', scrub: 1.5 } });
      archTl.to('.arch-text', { color: 'rgba(255, 255, 255, 1)', stagger: 0.2, duration: 1, ease: 'power1.inOut' }, 0)
            .fromTo('.arch-pill', { scale: 0.5, opacity: 0, rotateX: 60 }, { scale: 1, opacity: 1, rotateX: 0, stagger: 0.2, duration: 1.2, ease: 'back.out(2)' }, 0.1);

      const showcaseTl = gsap.timeline({ scrollTrigger: { trigger: '.showcase-pin-wrapper', start: 'top top', end: '+=200%', pin: true, scrub: true } });
      showcaseTl.to('.stack-panel-1', { clipPath: 'inset(0% 0% 100% 0%)', ease: 'none', duration: 1 })
                .to('.stack-panel-2', { clipPath: 'inset(0% 0% 100% 0%)', ease: 'none', duration: 1 });

      const sweepTl = gsap.timeline({ scrollTrigger: { trigger: '.sweep-container', start: 'center center', end: '+=250%', pin: true, scrub: 1 } });
      sweepTl.fromTo('.sweep-text', { x: '100vw', xPercent: 0 }, { x: '-10vw', xPercent: -100, ease: 'none' });
    });

    mm.add("(max-width: 767px)", () => {
      const heroTl = gsap.timeline({ scrollTrigger: { trigger: '.hero-spacer', start: 'top top', end: 'bottom 20%', scrub: 1 } });
      heroTl.to('.massive-logo', { top: '1.5rem', left: '1.5rem', xPercent: 0, yPercent: 0, x: 0, y: 0, fontSize: '1.25rem', ease: 'power2.out' }, 0)
            .to('.hero-form-container', { opacity: 0, y: -20, ease: 'power2.out' }, 0);

      gsap.utils.toArray('.stack-panel').forEach((panel: any) => { gsap.from(panel, { scrollTrigger: { trigger: panel, start: 'top 80%', end: 'top 50%', scrub: 1 }, opacity: 0, y: 50 }); });
      
      const sweepTl = gsap.timeline({ scrollTrigger: { trigger: '.sweep-container', start: 'top bottom', end: 'bottom top', scrub: 1 } });
      sweepTl.fromTo('.sweep-text', { x: '10vw' }, { x: '-100vw', ease: 'none' });
    });

    return () => mm.revert(); 
  }, { scope: mainRef, dependencies: [isLoaded] });

  return (
    // FIX 1: The outer wrapper has pointer-events-none, letting clicks pass entirely through the empty space to the footer
    <div ref={mainRef} className="relative w-full text-white pointer-events-none">
      
      {!isLoaded && (
        <div className="fixed inset-0 z-[200] bg-[#020617] flex flex-col items-center justify-center pointer-events-none">
           <div className="text-[15vw] font-black tracking-tighter leading-none text-white/10 relative">
             <span className="absolute inset-0 text-white clip-text transition-all duration-300" style={{ clipPath: `inset(${100 - loadingProgress}% 0 0 0)` }}>{loadingProgress}</span>
             {loadingProgress}
           </div>
           <p className="font-mono text-xs text-white/30 tracking-widest uppercase mt-4">Initializing Architecture</p>
        </div>
      )}
      <div className="preloader-curtain fixed inset-0 z-[190] bg-[#020617] pointer-events-none" />

      <svg className="pointer-events-none fixed inset-0 z-[50] h-full w-full opacity-[0.03] mix-blend-overlay">
        <filter id="noise"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" /></filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>
      <div className="ambient-glow fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none z-0 mix-blend-screen" />

      {/* FIX 2: We turn clicks BACK ON for the solid block. */}
      {/* FIX 3: Replaced the spacer div entirely with mb-[60vh] to guarantee an empty hole in the DOM. */}
      <div className="relative z-10 bg-[#020617] pointer-events-auto overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-b border-white/5 mb-[60vh]">
        
        <h1 className="massive-logo fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[16vw] leading-none font-black tracking-tighter text-white z-[60] mix-blend-difference pointer-events-none">
          RAYA.
        </h1>
        
        <div className="hero-spacer h-[120vh] w-full relative z-10">
           <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-end pb-8">
              
              <div className="hero-form-container px-6 w-full max-w-2xl flex flex-col items-center gap-6 z-[60] mb-12">
                <form className="w-full relative group" aria-label="URL Shortener Form">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-emerald-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition duration-700" />
                  <div className="relative glass-panel rounded-full p-2 flex items-center bg-white/[0.02] backdrop-blur-3xl border border-white/10 focus-within:border-white/30 transition-colors pointer-events-auto">
                    <input type="url" placeholder="Paste your original URL..." aria-label="URL to shorten" className="flex-1 bg-transparent text-white placeholder:text-white/30 px-6 py-4 focus:outline-none text-lg font-light w-full" required />
                    <button type="submit" aria-label="Shorten URL" className="bg-white text-black px-8 py-4 rounded-full font-medium tracking-wide flex items-center gap-2 hover:scale-[0.98] focus:ring-2 focus:ring-white/50 transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                      Shorten <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </form>
                <p className="text-white/40 uppercase tracking-[0.2em] text-[10px] font-mono animate-pulse">Scroll to initialize engine ↓</p>
              </div>

              <div className="w-full relative z-10 pointer-events-none overflow-hidden">
                <SystemMarquee />
              </div>
              
           </div>
        </div>

        <section id="architecture" className="min-h-screen flex items-center justify-center px-6 py-32 bg-[#020617] perspective-[1000px] z-10 relative border-t border-white/5">
          <div className="max-w-5xl mx-auto">
            <p className="text-blue-400 font-mono text-xs tracking-widest uppercase mb-12">The Architecture</p>
            <h2 className="text-[clamp(2rem,5vw,4.5rem)] leading-[1.15] font-light tracking-tight text-white/10">
              <span className="arch-text transition-colors">Raya is engineered with a custom </span>
              <span className="arch-pill inline-flex items-center justify-center align-middle mx-3 px-5 py-1.5 bg-white/5 border border-white/10 rounded-full text-white text-[clamp(1.5rem,3vw,2.5rem)] font-medium shadow-2xl backdrop-blur-md transform-gpu"><Zap className="w-5 h-5 mr-2 text-yellow-400" /> Fastify</span> 
              <span className="arch-text transition-colors"> engine, ensuring every redirect processes in under </span>
              <span className="arch-text text-white/20 italic mx-2 font-medium transition-colors">50 milliseconds. </span>
              <span className="arch-text transition-colors">We secure your vault using military-grade </span>
              <span className="arch-pill inline-flex items-center justify-center align-middle mx-3 px-5 py-1.5 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-400 text-[clamp(1.5rem,3vw,2.5rem)] font-medium transform-gpu"><ShieldCheck className="w-5 h-5 mr-2" /> Bcrypt</span>
              <span className="arch-text transition-colors"> hashing, while our data layer maps global demographics instantly.</span>
            </h2>
          </div>
        </section>

        <section id="bento-features" className="py-32 px-6 bg-[#020617] z-10 relative border-t border-white/5">
           <div className="max-w-6xl mx-auto">
             <div className="mb-16">
               <h3 className="bento-header-element text-4xl font-semibold tracking-tight">Ecosystem.</h3>
               <p className="bento-header-element text-white/50 text-lg mt-4 max-w-xl font-light">Everything you need to control the narrative of your links, housed in a single optimized platform.</p>
             </div>
             <div className="bento-grid grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
                <div className="bento-item md:col-span-2 rounded-3xl glass-panel p-8 flex flex-col justify-between group overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <BarChart3 className="w-10 h-10 text-blue-400" />
                  <div className="relative z-10">
                    <h4 className="text-2xl font-medium mb-2">Real-time Telemetry</h4>
                    <p className="text-white/50 font-light">Watch global clicks stream in live. Device filtering, referrer data, and geo-mapping built into the core router.</p>
                  </div>
                </div>
                <div className="bento-item rounded-3xl glass-panel p-8 flex flex-col justify-between group relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-40 transition-opacity"><Lock className="w-24 h-24" /></div>
                   <ShieldCheck className="w-8 h-8 text-emerald-400" />
                   <div className="relative z-10">
                     <h4 className="text-xl font-medium mb-2">Vault Security</h4>
                     <p className="text-white/50 font-light text-sm">Bcrypt hashed endpoints.</p>
                   </div>
                </div>
                <div className="bento-item rounded-3xl glass-panel p-8 flex flex-col justify-between group relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-40 transition-opacity"><Cpu className="w-24 h-24" /></div>
                   <Zap className="w-8 h-8 text-yellow-400" />
                   <div className="relative z-10">
                     <h4 className="text-xl font-medium mb-2">Edge Routing</h4>
                     <p className="text-white/50 font-light text-sm">Redis caching for sub-50ms speeds.</p>
                   </div>
                </div>
                <div className="bento-item md:col-span-2 rounded-3xl glass-panel p-8 flex flex-col justify-between group relative overflow-hidden">
                   <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                   <Link2 className="w-10 h-10 text-purple-400" />
                   <div className="relative z-10">
                     <h4 className="text-2xl font-medium mb-2">Custom Domains</h4>
                     <p className="text-white/50 font-light">Bring your own narrative. Attach SSL-secured custom domains to your workspace instantly.</p>
                   </div>
                </div>
             </div>
           </div>
        </section>

        <div className="showcase-pin-wrapper md:h-screen w-full relative overflow-hidden z-10">
          <section className="stack-panel stack-panel-1 md:absolute inset-0 md:h-screen w-full flex items-center justify-center bg-[#0A142F] z-30 px-6 py-24 md:py-0 border-t border-white/10" style={{ clipPath: 'inset(0% 0% 0% 0%)' }}>
            <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="w-full aspect-square rounded-[3rem] bg-white/[0.02] backdrop-blur-xl border border-white/10 flex flex-col items-center justify-center relative overflow-hidden">
                <Activity className="w-32 h-32 text-blue-400 opacity-50 drop-shadow-[0_0_30px_rgba(96,165,250,0.5)]" />
              </div>
              <div className="flex flex-col"><span className="text-blue-400 font-mono text-xs tracking-widest uppercase mb-4">01 // The Data Layer</span><h2 className="text-5xl md:text-6xl font-semibold tracking-tight mb-6">Deep Analytics.</h2><p className="text-xl md:text-2xl text-white/50 font-light leading-relaxed">Instantly parse global IPs and device fingerprints.</p></div>
            </div>
          </section>

          <section className="stack-panel stack-panel-2 md:absolute inset-0 md:h-screen w-full flex items-center justify-center bg-[#050505] z-20 px-6 py-24 md:py-0" style={{ clipPath: 'inset(0% 0% 0% 0%)' }}>
            <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="w-full aspect-square rounded-[3rem] bg-white/[0.02] backdrop-blur-xl border border-white/10 flex flex-col items-center justify-center relative overflow-hidden">
                <ShieldCheck className="w-32 h-32 text-emerald-400 opacity-50 drop-shadow-[0_0_30px_rgba(52,211,153,0.5)]" />
              </div>
              <div className="flex flex-col"><span className="text-emerald-400 font-mono text-xs tracking-widest uppercase mb-4">02 // The Vault</span><h2 className="text-5xl md:text-6xl font-semibold tracking-tight mb-6">Military Secure.</h2><p className="text-xl md:text-2xl text-white/50 font-light leading-relaxed">Seal sensitive links behind bcrypt hashing.</p></div>
            </div>
          </section>

          <section className="stack-panel stack-panel-3 md:absolute inset-0 md:h-screen w-full flex items-center justify-center bg-[#1E0A0A] z-10 px-6 py-24 md:py-0" style={{ clipPath: 'inset(0% 0% 0% 0%)' }}>
            <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="w-full aspect-square rounded-[3rem] bg-white/[0.02] backdrop-blur-xl border border-white/10 flex flex-col items-center justify-center relative overflow-hidden">
                <Zap className="w-32 h-32 text-red-400 opacity-50 drop-shadow-[0_0_30px_rgba(248,113,113,0.5)]" />
              </div>
              <div className="flex flex-col"><span className="text-red-400 font-mono text-xs tracking-widest uppercase mb-4">03 // The Engine</span><h2 className="text-5xl md:text-6xl font-semibold tracking-tight mb-6">Sub-50ms Speed.</h2><p className="text-xl md:text-2xl text-white/50 font-light leading-relaxed">Backed by Redis in-memory caching.</p></div>
            </div>
          </section>
        </div>

        <section className="sweep-container h-[50vh] md:h-screen flex flex-col justify-center overflow-hidden bg-white border-y border-white/10 z-10 relative">
          <h2 className="sweep-text text-[12vw] leading-none font-black tracking-tighter text-black uppercase whitespace-nowrap">Control the Narrative. Own the Link.</h2>
        </section>

      </div>
    </div>
  );
}