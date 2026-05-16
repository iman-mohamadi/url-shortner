'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Plus, Zap, Globe, Smartphone, MousePointerClick, ExternalLink, Copy, MoreVertical, Loader2, X, Activity  } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { apiRequest } from '@/lib/api';
import { Numans } from 'next/font/google';

const BentoCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <div className={`dashboard-card glass-panel p-6 rounded-[2rem] relative overflow-hidden group hover:border-white/20 transition-colors duration-500 ${className}`}>
    {children}
  </div>
);

export default function DashboardPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  
  const [links, setLinks] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  

  // --- DATA FETCHING ---
 const loadDashboardData = async () => {
  try {
    const linksData = await apiRequest('/user/me/links');
    setLinks(linksData);
    // ... rest of logic
  } catch (err: any) {
    console.error("Dashboard Load Failed:", err);
    // This will trigger the app/error.tsx boundary
    throw err; 
  } finally {
    setLoading(false);
  }
};

  useEffect(() => { loadDashboardData(); }, []);

  // --- ANIMATIONS ---
  useGSAP(() => {
    if (!loading) {
      gsap.from('.dashboard-card', { y: 40, opacity: 0, scale: 0.95, duration: 0.8, stagger: 0.1, ease: 'power4.out' });
    }
  }, [loading]);

  const toggleDrawer = (open: boolean) => {
    setIsDrawerOpen(open);
    gsap.to(drawerRef.current, {
      y: open ? 0 : '100%',
      duration: 0.6,
      ease: 'expo.out'
    });
  };

  // --- CREATE LINK HANDLER ---
  const handleCreateLink = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCreating(true);
    const formData = new FormData(e.currentTarget);
    
    try {
      await apiRequest('/create', { // Hits createLinkHandler
        method: 'POST',
        body: JSON.stringify(Object.fromEntries(formData))
      });
      await loadDashboardData(); // Refresh list
      toggleDrawer(false);
    } catch (err) {
      alert(err);
    } finally {
      setCreating(false);
    }
  };

  if (loading) return (
    <div className="h-screen w-full flex items-center justify-center bg-[#020617]">
      <Loader2 className="w-10 h-10 text-white animate-spin opacity-20" />
    </div>
  );

  return (
    <div ref={containerRef} className="min-h-screen bg-[#020617] pt-28 pb-12 px-6 overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        
        <div className="dashboard-header flex flex-col md:items-end md:flex-row justify-between gap-6 mb-12">
          <div>
            <p className="text-emerald-400 font-mono text-xs tracking-widest uppercase mb-2">Authenticated // Raya Pro</p>
            <h1 className="text-5xl font-black tracking-tighter text-white uppercase">Network.</h1>
          </div>
          <button 
            onClick={() => toggleDrawer(true)}
            className="bg-white text-black px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:scale-95 transition-transform"
          >
            <Plus className="w-5 h-5" /> NEW LINK
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-fr">
          {/* Main Chart: Real data from getLinkStatsHandler */}
          <BentoCard className="md:col-span-3 md:row-span-2 min-h-[400px]">
            <h3 className="text-xl font-medium text-white mb-8">Traffic Flow</h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={clickDataPlaceholder}> 
                  <defs>
                    <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="clicks" stroke="#10b981" strokeWidth={3} fill="url(#colorClicks)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </BentoCard>

          {/* Real stats group */}
          <BentoCard>
            <Globe className="w-6 h-6 text-blue-400 mb-4" />
            <p className="text-white/40 text-xs uppercase tracking-widest">Total Reach</p>
            <h4 className="text-4xl font-bold text-white mt-1">{stats?.totalClicks || 0}</h4>
          </BentoCard>

          <BentoCard>
            <Activity className="w-6 h-6 text-purple-400 mb-4" />
            <p className="text-white/40 text-xs uppercase tracking-widest">Active Links</p>
            <h4 className="text-4xl font-bold text-white mt-1">{links.length}</h4>
          </BentoCard>

          {/* Real Link Table from Prisma */}
          <BentoCard className="md:col-span-4">
            <table className="w-full text-left">
              <thead className="text-white/20 text-[10px] uppercase tracking-widest border-b border-white/5">
                <tr><th className="pb-4">Identity</th><th className="pb-4">Clicks</th><th className="pb-4">Created</th><th className="pb-4 text-right">Actions</th></tr>
              </thead>
              <tbody>
                {links.map((link) => (
                  <tr key={link.id} className="group border-b border-white/5 hover:bg-white/[0.01]">
                    <td className="py-6 flex items-center gap-3">
                       <Zap className="w-4 h-4 text-emerald-400" />
                       <span className="font-medium">raya.link/{link.slug}</span>
                    </td>
                    <td className="py-6 font-mono text-white/60">{link.clicks}</td>
                    <td className="py-6 text-white/30 text-xs">{new Date(link.createdAt).toLocaleDateString()}</td>
                    <td className="py-6 text-right">
                       <button className="opacity-0 group-hover:opacity-100 p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-all">
                         <Copy className="w-4 h-4" />
                       </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </BentoCard>
        </div>
      </div>

      {/* --- SLIDE-UP GLASS DRAWER (CREATE LINK) --- */}
      <div 
        ref={drawerRef} 
        className="fixed inset-x-0 bottom-0 z-50 h-[80vh] translate-y-full glass-panel rounded-t-[3rem] bg-black/90 backdrop-blur-3xl border-t border-white/10 p-12 shadow-[0_-20px_100px_rgba(0,0,0,0.8)]"
      >
        <div className="max-w-2xl mx-auto h-full flex flex-col">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-4xl font-bold tracking-tighter uppercase">Initialize Link.</h2>
            <button onClick={() => toggleDrawer(false)} className="p-3 hover:bg-white/10 rounded-full transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleCreateLink} className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase tracking-widest text-white/40 ml-4">Destination URL</label>
              <input name="originalUrl" required placeholder="https://..." className="bg-white/5 border border-white/10 rounded-2xl p-6 text-lg focus:outline-none focus:border-white/30 transition-all" />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-widest text-white/40 ml-4">Custom Slug (Pro)</label>
                <input name="customSlug" placeholder="my-campaign" className="bg-white/5 border border-white/10 rounded-2xl p-6 focus:outline-none" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-widest text-white/40 ml-4">Protection (Pro)</label>
                <input name="password" type="password" placeholder="Bcrypt Vault" className="bg-white/5 border border-white/10 rounded-2xl p-6 focus:outline-none" />
              </div>
            </div>

            <button 
              disabled={creating}
              type="submit" 
              className="mt-8 bg-white text-black py-6 rounded-2xl font-bold text-lg hover:scale-[0.98] transition-all flex items-center justify-center gap-3"
            >
              {creating ? <Loader2 className="animate-spin w-6 h-6" /> : "ENGAGE COMMAND"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

const clickDataPlaceholder = [{ name: 'S', clicks: 100 }, { name: 'M', clicks: 400 }, { name: 'T', clicks: 300 }, { name: 'W', clicks: 800 }];