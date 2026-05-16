export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 w-full h-[60vh] -z-10 bg-black flex flex-col justify-end pb-12 pt-24 px-6 border-t border-white/10">
      <div className="max-w-7xl mx-auto w-full flex flex-col items-center text-center">
        
        <h2 className="text-[clamp(4rem,12vw,15rem)] leading-none font-bold tracking-tighter text-white mb-8">
          RAYA.
        </h2>
        
        <div className="flex justify-between items-end w-full pb-4 border-b border-white/20">
          <p className="text-sm text-white/40 max-w-xs text-left">
            Precision link management engineered for high-performance teams.
          </p>
          <div className="flex gap-6 text-sm font-medium text-white/60">
            <a href="#" className="hover:text-white transition-colors duration-300">Features</a>
            <a href="#" className="hover:text-white transition-colors duration-300">Raya Pro</a>
            <a href="#" className="hover:text-white transition-colors duration-300">Login</a>
          </div>
        </div>
        
        <div className="flex w-full justify-between items-center text-xs text-white/30 pt-4">
          <p>© {new Date().getFullYear()} Raya URL.</p>
          <p className="flex items-center gap-2">
            System: <span className="flex w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Online
          </p>
        </div>

      </div>
    </footer>
  );
}