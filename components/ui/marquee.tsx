'use client';

export default function SystemMarquee() {
  return (
    <div className="relative w-full bg-emerald-500 text-black py-2 overflow-hidden flex whitespace-nowrap z-50 border-b border-black/10">
      <div className="animate-[marquee_20s_linear_infinite] flex items-center gap-8 px-4 font-mono text-[11px] uppercase tracking-widest font-bold">
        <span>System Status: Optimal</span>
        <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
        <span>Sub-50ms Routing Active</span>
        <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
        <span>Redis Cache: Hit Rate 99.8%</span>
        <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
        <span>Bcrypt Encryption: Secured</span>
        <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
        <span>Geo-IP Parsing Online</span>
      </div>
      {/* Duplicate for seamless looping */}
      <div className="absolute top-2 animate-[marquee2_20s_linear_infinite] flex items-center gap-8 px-4 font-mono text-[11px] uppercase tracking-widest font-bold">
        <span>System Status: Optimal</span>
        <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
        <span>Sub-50ms Routing Active</span>
        <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
        <span>Redis Cache: Hit Rate 99.8%</span>
        <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
        <span>Bcrypt Encryption: Secured</span>
        <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
        <span>Geo-IP Parsing Online</span>
      </div>
    </div>
  );
}