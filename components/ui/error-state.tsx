'use client';

import { AlertTriangle, RefreshCcw } from 'lucide-react';

export default function ErrorState({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="fixed inset-0 z-[100] bg-[#020617] flex flex-col items-center justify-center p-6 text-center">
      {/* Subtle pulsing background orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30vw] h-[30vw] bg-red-500/10 rounded-full blur-[100px] animate-pulse" />
      
      <div className="relative z-10 glass-panel p-12 rounded-[3rem] max-w-md border-red-500/20">
        <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-8 mx-auto">
          <AlertTriangle className="w-8 h-8 text-red-500" />
        </div>
        
        <h2 className="text-3xl font-bold tracking-tighter text-white mb-4 uppercase">Link Severed.</h2>
        <p className="text-white/50 font-light mb-8 leading-relaxed">
          The Command Center is currently unreachable. Ensure the Fastify engine is initialized and try again.
        </p>
        
        <button 
          onClick={() => reset()}
          className="w-full bg-white text-black py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:scale-[0.98] transition-all"
        >
          <RefreshCcw className="w-5 h-5" /> RECONNECT SYSTEM
        </button>
        
        <p className="mt-6 text-[10px] font-mono text-red-500/50 uppercase tracking-widest">
          Error: {error.message || "CONNECTION_REFUSED"}
        </p>
      </div>
    </div>
  );
}