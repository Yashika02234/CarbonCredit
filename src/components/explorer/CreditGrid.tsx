import { useState, useEffect, useRef } from 'react';
import { ChevronDown, Grid3X3, List, ArrowUpDown } from 'lucide-react';
import { CreditCard } from './CreditCard';
import { CarbonCredit } from '../../lib/types';

// Mock options
const sortOptions: Record<string, string> = {
  trustScore: 'Trust Score',
  priceAsc: 'Price: Low to High',
  priceDesc: 'Price: High to Low',
  vintage: 'Vintage (Newest)'
};

interface CreditGridProps {
  credits: CarbonCredit[];
  sortBy: string;
  setSortBy: (sortKey: string) => void;
  onSelectProject?: (project: CarbonCredit) => void;
}

export default function CreditGrid({ credits, sortBy, setSortBy, onSelectProject }: CreditGridProps) {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  return (
    <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 pb-24">
      
      {/* --- CONTROL HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-white/5 pb-6">
        
        {/* Left: Result Counter */}
        <div className="flex items-center gap-3">
           <div className="flex items-center justify-center w-8 h-8 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
             <span className="relative flex h-2 w-2">
               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
               <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
             </span>
           </div>
           <div>
             <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-0.5">Live Assets</p>
             <p className="text-xl font-mono text-white leading-none font-medium">
               {credits.length} <span className="text-slate-600 text-sm">/ Items</span>
             </p>
           </div>
        </div>
        
        {/* Right: Controls */}
        <div className="flex items-center gap-4">
          
          {/* Sort Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setIsSortOpen(!isSortOpen)}
              className={`
                flex items-center gap-3 px-4 py-2.5 rounded-xl border transition-all duration-300
                ${isSortOpen 
                  ? 'bg-white/10 border-white/20 text-white' 
                  : 'bg-black/40 border-white/10 text-slate-400 hover:text-white hover:border-white/20'
                }
              `}
            >
              <ArrowUpDown className="w-4 h-4 opacity-70" />
              <div className="text-left hidden sm:block">
                <span className="text-[9px] uppercase tracking-wider font-bold block text-slate-500">Sort By</span>
                <span className="text-xs font-medium block text-emerald-400">{sortOptions[sortBy] || sortBy}</span>
              </div>
              <ChevronDown className={`w-4 h-4 ml-2 transition-transform duration-300 ${isSortOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {/* Dropdown Menu */}
            {isSortOpen && (
              <ul className="absolute top-full right-0 mt-2 w-56 bg-[#0A0A0A] border border-slate-800 rounded-xl shadow-2xl shadow-black/50 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200">
                {Object.entries(sortOptions).map(([key, value]) => (
                  <li
                    key={key}
                    onClick={() => {
                      setSortBy(key);
                      setIsSortOpen(false);
                    }}
                    className={`
                      px-4 py-3 text-xs font-medium cursor-pointer transition-colors border-b border-white/5 last:border-0 flex items-center justify-between
                      ${sortBy === key 
                        ? 'bg-emerald-500/10 text-emerald-400' 
                        : 'text-slate-400 hover:bg-white/5 hover:text-white'
                      }
                    `}
                  >
                    {value}
                    {sortBy === key && <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="h-8 w-px bg-white/10 hidden md:block" />

          {/* Layout Toggles (Visual Only) */}
          <div className="hidden md:flex bg-black/40 border border-white/10 rounded-xl p-1">
             <button className="p-2 rounded-lg bg-white/10 text-white shadow-sm transition-all"><Grid3X3 className="w-4 h-4" /></button>
             <button className="p-2 rounded-lg text-slate-600 hover:text-slate-400 transition-all"><List className="w-4 h-4" /></button>
          </div>

        </div>
      </div>

      {/* --- GRID LAYOUT --- */}
      {credits.length > 0 ? (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {credits.map((credit) => (
            <CreditCard 
               key={credit.id} 
               credit={credit} 
               onClick={() => onSelectProject && onSelectProject(credit)} 
            />
          ))}
        </div>
      ) : (
        // Empty State
        <div className="flex flex-col items-center justify-center py-32 text-center border border-dashed border-white/10 rounded-3xl bg-white/5/5">
          <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center mb-4 border border-white/10">
             <Grid3X3 className="w-8 h-8 text-slate-600" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">No Assets Found</h3>
          <p className="text-slate-400 max-w-xs mx-auto">Try adjusting your filters to see available projects.</p>
        </div>
      )}
    </div>
  );
}