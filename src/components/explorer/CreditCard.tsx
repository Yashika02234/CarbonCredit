

import { MapPin, Calendar, ArrowUpRight, Activity, Leaf, Zap, Droplets, Users, Sun, Wind, Tractor, Recycle } from 'lucide-react';
import { CarbonCredit } from '../../lib/types';

interface CreditCardProps {
  credit: CarbonCredit;
  onClick: () => void;
}

// Helper to map project types to Ecopia-style neon colors
const getTypeConfig = (type: string) => {
  switch (type) {
    case 'Forestry': 
      return { color: 'text-emerald-400', bg: 'bg-emerald-400', icon: Leaf };
    case 'Renewable': 
      return { color: 'text-yellow-400', bg: 'bg-yellow-400', icon: Zap };
    case 'Blue Carbon': 
      return { color: 'text-cyan-400', bg: 'bg-cyan-400', icon: Droplets };
    case 'Community': 
      return { color: 'text-pink-400', bg: 'bg-pink-400', icon: Users };
    case 'Solar':
      return { color: 'text-orange-400', bg: 'bg-orange-400', icon: Sun };
    case 'Wind':
      return { color: 'text-sky-300', bg: 'bg-sky-300', icon: Wind };
    case 'Agriculture':
      return { color: 'text-lime-400', bg: 'bg-lime-400', icon: Tractor };
    case 'Waste':
      return { color: 'text-purple-400', bg: 'bg-purple-400', icon: Recycle };
    default: 
      return { color: 'text-slate-400', bg: 'bg-slate-400', icon: Leaf };
  }
};

export function CreditCard({ credit, onClick }: CreditCardProps) {
  const { color, bg, icon: Icon } = getTypeConfig(credit.projectType || 'Forestry');

  return (
    <div 
      onClick={onClick}
      className="group relative h-[440px] bg-[#0A0A0A] border border-white/5 rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:border-white/20"
    >
      {/* --- 1. IMAGE SECTION (Top Half) --- */}
      <div className="absolute inset-0 z-0 h-1/2 overflow-hidden">
        <img loading="lazy"
          src={credit.image} 
          alt={credit.projectName} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-100 grayscale group-hover:grayscale-0"
        />
        
        {/* Cinematic Gradients for Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
        
        {/* Grid Scan Effect (Visible on Hover) */}
        <div className="absolute inset-0 bg-[linear-gradient(transparent_2px,#000_2px),linear-gradient(90deg,transparent_2px,#000_2px)] bg-[size:40px_40px] opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none" />

        {/* Floating Badges */}
        <div className="absolute top-4 left-4 z-20 flex gap-2">
           <span className={`px-2.5 py-1 bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-bold uppercase tracking-wider rounded-md flex items-center gap-1.5 ${color}`}>
             <Icon className="w-3 h-3" />
             {credit.projectType}
           </span>
        </div>

        <div className="absolute top-4 right-4 z-20">
           <div className={`flex items-center justify-center px-2 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/10 ${credit.trustScore > 90 ? 'text-emerald-400' : 'text-yellow-400'}`}>
             <Activity className="w-3 h-3 mr-1" />
             <span className="text-[10px] font-bold font-mono">{credit.trustScore}% TRUST</span>
           </div>
        </div>
      </div>

      {/* --- 2. DATA HUD (Bottom Half) --- */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 p-6 z-20 bg-[#0A0A0A] flex flex-col justify-between border-t border-white/5">
        
        {/* Animated Scan Line at Divider */}
        <div className={`absolute top-[-1px] left-0 h-[1px] ${bg} w-0 group-hover:w-full transition-all duration-700 ease-in-out`} />

        <div className="transform transition-transform duration-300 translate-y-1 group-hover:translate-y-0">
          
          {/* Header Row */}
          <div className="flex justify-between items-start mb-2">
             <span className="text-[9px] font-mono text-slate-600 uppercase tracking-widest">{credit.unicId}</span>
             <ArrowUpRight className={`w-4 h-4 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0 ${color}`} />
          </div>

          <h3 className="text-lg font-bold text-white leading-tight mb-4 line-clamp-2 min-h-[3.5rem] group-hover:text-white transition-colors">
            {credit.projectName}
          </h3>

          {/* Meta Tags */}
          <div className="flex items-center gap-3 text-xs text-slate-500 mb-5 font-mono uppercase tracking-wide">
             <span className="flex items-center gap-1.5"><MapPin className="w-3 h-3" /> {credit.country}</span>
             <span className="text-slate-700">|</span>
             <span className="flex items-center gap-1.5"><Calendar className="w-3 h-3" /> {credit.vintage}</span>
          </div>

          {/* Pricing Grid (Glass) */}
          <div className="grid grid-cols-2 gap-px bg-white/10 rounded-lg overflow-hidden border border-white/5">
             <div className="bg-[#111] p-2.5 hover:bg-white/5 transition-colors">
                <p className="text-[9px] uppercase tracking-widest text-slate-500 mb-0.5">Price</p>
                <p className="text-base font-mono text-white font-bold">${credit.pricePerCredit.toFixed(2)}</p>
             </div>
             <div className="bg-[#111] p-2.5 hover:bg-white/5 transition-colors text-right">
                <p className="text-[9px] uppercase tracking-widest text-slate-500 mb-0.5">Volume</p>
                <p className={`text-xs font-mono font-medium ${color}`}>{credit.availableCredits.toLocaleString()} t</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}