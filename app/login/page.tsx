'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ArrowRight, Fingerprint, LockKeyhole, Phone, CheckCircle2 } from 'lucide-react';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

gsap.registerPlugin(useGSAP);

export default function AuthGateway() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const phoneWrapperRef = useRef<HTMLDivElement>(null);
  const otpWrapperRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  const [step, setStep] = useState<'phone' | 'otp' | 'success'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initial Entrance Animation
  useGSAP(() => {
    gsap.from('.auth-elem', {
      y: 30,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: 'power3.out',
    });
  }, { scope: containerRef });

  // --- 1. REQUEST OTP ---
  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || phone.length < 10) return;
    
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone })
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Failed to send OTP');

      setIsLoading(false);
      setStep('otp');

      // GSAP Morph: Phone Out, OTP In
      const tl = gsap.timeline();
      tl.to(phoneWrapperRef.current, {
        y: -40,
        opacity: 0,
        filter: 'blur(10px)',
        duration: 0.5,
        ease: 'power2.in',
        display: 'none'
      })
      .fromTo(otpWrapperRef.current, 
        { y: 40, opacity: 0, filter: 'blur(10px)', display: 'none' },
        { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.6, display: 'flex', ease: 'back.out(1.2)' }
      );

    } catch (err: any) {
      setIsLoading(false);
      setError(err.message);
    }
  };

  // --- 2. VERIFY OTP & STORE JWT ---
  const handleVerifyOTP = async (value: string) => {
    setOtp(value);
    setError(null);
    
    // Auto-submit when the 6th digit is typed
    if (value.length === 6) {
      setIsLoading(true);

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify-otp`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ phone, code: value })
        });

        const data = await res.json();

        // Handle Fastify 400 Error (Invalid OTP)
        if (!res.ok) {
          throw new Error(data.error || 'Invalid authorization code');
        }
        
        // Success: Store the JWT Token securely
        localStorage.setItem('raya_token', data.token);

        setIsLoading(false);
        setStep('success');

        // GSAP Morph: OTP Out, Success Burst In
        const tl = gsap.timeline();
        tl.to(otpWrapperRef.current, {
          scale: 0.9,
          opacity: 0,
          filter: 'blur(20px)',
          duration: 0.4,
          ease: 'power2.in',
          display: 'none'
        })
        .fromTo(successRef.current,
          { scale: 0.5, opacity: 0, display: 'none' },
          { scale: 1, opacity: 1, duration: 0.8, display: 'flex', ease: 'elastic.out(1, 0.5)' }
        )
        // Physical screen unlock effect before routing
        .to(containerRef.current, {
          scale: 1.1,
          opacity: 0,
          filter: 'blur(40px)',
          duration: 0.8,
          delay: 0.5,
          ease: 'power3.inOut',
          onComplete: () => router.push('/dashboard')
        });

      } catch (err: any) {
        setIsLoading(false);
        setOtp(''); // Clear the boxes so they can type again
        setError(err.message);
        
        // Shake animation for invalid OTP
        gsap.fromTo('.otp-group', 
          { x: -10 }, 
          { x: 10, duration: 0.1, yoyo: true, repeat: 5, ease: 'power1.inOut', onComplete: () => gsap.set('.otp-group', { x: 0 }) }
        );
      }
    }
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-[#020617] flex flex-col items-center justify-center relative overflow-hidden font-sans selection:bg-emerald-500/30">
      
      {/* Background Security Orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] bg-blue-500/5 rounded-full blur-[120px] animate-[pulse_8s_ease-in-out_infinite] pointer-events-none" />
      {step === 'success' && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-emerald-500/10 rounded-full blur-[150px] pointer-events-none" />
      )}

      <div className="absolute top-8 left-8 auth-elem">
        <h1 className="text-2xl font-black tracking-tighter text-white">RAYA.</h1>
      </div>

      <div className="relative z-10 w-full max-w-md flex flex-col items-center px-6">
        
        {/* STEP 1: PHONE INPUT */}
        <div ref={phoneWrapperRef} className="w-full flex flex-col items-center">
          <div className="auth-elem w-16 h-16 rounded-3xl bg-white/[0.02] border border-white/10 flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(255,255,255,0.05)]">
            <Fingerprint className="w-8 h-8 text-white/80" />
          </div>
          
          <h2 className="auth-elem text-3xl md:text-4xl font-semibold tracking-tight text-white mb-2 text-center">
            Identify.
          </h2>
          <p className="auth-elem text-white/50 text-center mb-10 font-light">
            Enter your secure number to access the command center.
          </p>

          <form onSubmit={handleSendOTP} className="auth-elem w-full relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-white/10 rounded-2xl blur opacity-20 group-hover:opacity-50 transition duration-500" />
            <div className="relative glass-panel rounded-2xl p-2 flex items-center bg-black/60 backdrop-blur-3xl border border-white/10 focus-within:border-white/30 transition-colors">
              <Phone className="w-5 h-5 text-white/40 ml-4" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (555) 000-0000"
                className="flex-1 bg-transparent text-white placeholder:text-white/20 px-4 py-4 focus:outline-none text-lg font-light tracking-wide w-full"
                autoFocus
                disabled={isLoading}
              />
              <button 
                type="submit"
                disabled={isLoading || phone.length < 5}
                className="bg-white text-black px-6 py-3 rounded-xl font-medium flex items-center gap-2 hover:scale-[0.97] transition-transform disabled:opacity-50 disabled:hover:scale-100"
              >
                {isLoading ? <span className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" /> : <ArrowRight className="w-5 h-5" />}
              </button>
            </div>
          </form>
          {error && step === 'phone' && (
            <p className="mt-6 text-red-400 text-sm font-mono tracking-widest uppercase animate-pulse">{error}</p>
          )}
        </div>

        {/* STEP 2: OTP INPUT */}
        <div ref={otpWrapperRef} className="w-full flex-col items-center hidden">
          <div className="w-16 h-16 rounded-3xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(59,130,246,0.2)]">
            <LockKeyhole className="w-8 h-8 text-blue-400" />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-2 text-center">
            Verify.
          </h2>
          <p className="text-white/50 text-center mb-10 font-light">
            Redis-backed authorization code sent to <span className="text-white font-medium">{phone}</span>
          </p>

          <div className="w-full flex justify-center otp-group">
            <InputOTP 
              maxLength={6} 
              value={otp}
              onChange={handleVerifyOTP}
              disabled={isLoading}
              className="gap-2 sm:gap-4"
            >
              <InputOTPGroup className="gap-2 sm:gap-4 w-full justify-center">
                {[0, 1, 2, 3, 4, 5].map((index) => (
                  <InputOTPSlot 
                    key={index} 
                    index={index} 
                    className={`w-12 h-16 sm:w-14 sm:h-16 text-2xl font-light text-white bg-white/[0.02] border ${error ? 'border-red-500/50' : 'border-white/10'} rounded-xl backdrop-blur-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] ring-offset-background focus-visible:ring-1 focus-visible:ring-blue-500 focus-visible:border-blue-500 transition-all`}
                  />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </div>
          
          {isLoading && (
            <p className="mt-8 text-blue-400 text-sm font-mono tracking-widest uppercase animate-pulse flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-400 rounded-full animate-ping" /> Decrypting
            </p>
          )}
          {error && step === 'otp' && !isLoading && (
            <p className="mt-8 text-red-400 text-sm font-mono tracking-widest uppercase animate-pulse">{error}</p>
          )}
        </div>

        {/* STEP 3: SUCCESS BURST */}
        <div ref={successRef} className="w-full flex-col items-center hidden">
           <div className="w-24 h-24 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center mb-6 shadow-[0_0_60px_rgba(16,185,129,0.4)]">
             <CheckCircle2 className="w-12 h-12 text-emerald-400" />
           </div>
           <h2 className="text-4xl font-semibold tracking-tight text-white mb-2 text-center">
            Access Granted.
          </h2>
          <p className="text-emerald-400/80 text-sm font-mono tracking-widest uppercase mt-4">
            Routing to Command Center...
          </p>
        </div>

      </div>
    </div>
  );
}