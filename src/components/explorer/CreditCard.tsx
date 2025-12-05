import React from 'react';
import { MapPin, Calendar, Shield, ArrowUpRight, Activity } from 'lucide-react';
import { CarbonCredit } from '../../lib/types';

interface CreditCardProps {
  credit: CarbonCredit;
  onClick: () => void;
}

export function CreditCard({ credit, onClick }: CreditCardProps) {
  // Dynamic color for Trust Score
  const scoreColor = credit.trustScore >= 90 ? 'text-emerald-400' : credit.trustScore >= 75 ? 'text-blue-400' : 'text-amber-400';
  
  // Status Indicator Color
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'bg-emerald-500';
      case 'pending': return 'bg-amber-500';
      case 'retired': return 'bg-slate-500';
      default: return 'bg-blue-500';
    }
  };

  return (
    <div 
      onClick={onClick}
      className="group relative bg-[#0B0C15] rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-1"
    >
      {/* 1. Animated Glow Border Gradient */}
      <div className="absolute -inset-0.5 bg-gradient-to-b from-white/10 to-transparent opacity-50 group-hover:opacity-100 group-hover:from-emerald-500/50 group-hover:to-emerald-900/50 rounded-2xl blur-[1px] transition-all duration-500" />
      
      {/* 2. Main Card Content */}
      <div className="relative h-full flex flex-col bg-[#0B0C15] rounded-xl overflow-hidden">
        
        {/* Image Section */}
        <div className="relative h-52 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C15] via-transparent to-transparent z-10" />
          
          {/* Status Pill (Floating) */}
          <div className="absolute top-3 left-3 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
            <span className={`w-1.5 h-1.5 rounded-full ${getStatusColor(credit.status)} animate-pulse`} />
            <span className="text-[10px] font-bold uppercase tracking-wider text-white/90">{credit.status}</span>
          </div>

          <img
            src={credit.image}
            alt={credit.projectName}
            className="live-photo-img h-full w-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700 ease-out"
          />
          
          {/* Registry Tag (Bottom Right) */}
          <div className="absolute bottom-3 right-3 z-20">
             <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/5 text-[10px] font-medium text-slate-300">
               <Shield className="h-3 w-3 text-emerald-500" />
               {credit.registry.split(' ')[0]}
             </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="p-5 flex-1 flex flex-col gap-4">
          
          {/* Header */}
          <div>
            <div className="flex justify-between items-start mb-1">
               <p className="text-[10px] font-mono text-emerald-500/80 mb-1 tracking-wider">{credit.unicId}</p>
               <div className="opacity-0 group-hover:opacity-100 transition-opacity -mr-2 -mt-2 p-2">
                 <ArrowUpRight className="h-4 w-4 text-white" />
               </div>
            </div>
            <h3 className="text-lg font-bold text-white leading-snug group-hover:text-emerald-400 transition-colors line-clamp-2">
              {credit.projectName}
            </h3>
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-2 gap-3 py-3 border-t border-white/5 border-b">
             <div className="flex flex-col gap-1">
                <span className="text-[10px] uppercase text-slate-500 font-semibold tracking-wider">Location</span>
                <div className="flex items-center gap-1.5 text-sm text-slate-300">
                  <MapPin className="h-3.5 w-3.5 text-slate-500" />
                  <span className="truncate">{credit.country}</span>
                </div>
             </div>
             <div className="flex flex-col gap-1 pl-4 border-l border-white/5">
                <span className="text-[10px] uppercase text-slate-500 font-semibold tracking-wider">Vintage</span>
                <div className="flex items-center gap-1.5 text-sm text-slate-300">
                  <Calendar className="h-3.5 w-3.5 text-slate-500" />
                  <span>{credit.vintage}</span>
                </div>
             </div>
          </div>

          {/* Footer Stats (Financial Terminal Style) */}
          <div className="flex items-end justify-between mt-auto">
            <div>
              <div className="flex items-center gap-1.5 mb-0.5">
                <Activity className="h-3 w-3 text-slate-500" />
                <span className="text-[10px] uppercase text-slate-500 font-bold">Trust Score</span>
              </div>
              <span className={`text-2xl font-mono font-bold ${scoreColor}`}>{credit.trustScore}</span>
            </div>

            <div className="text-right">
               <span className="text-[10px] uppercase text-slate-500 font-bold block mb-0.5">Price / Tonne</span>
               <div className="flex items-baseline gap-1 justify-end">
                 <span className="text-sm text-slate-500 font-mono">$</span>
                 <span className="text-2xl font-mono font-bold text-white">{credit.pricePerCredit}</span>
               </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}