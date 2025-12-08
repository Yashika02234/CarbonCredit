import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  Globe2,
  Zap,
  ShieldCheck,
  Map as MapIcon,
  Layers,
  Maximize2,
  BarChart3,
  Activity,
  ScanLine,
  FileText,
  TrendingUp,
  Cpu
} from 'lucide-react';

// --- TYPES & MOCK DATA ---
export interface CarbonCredit {
  id: string;
  projectName: string;
  pricePerCredit: number;
  location: string;
  vintage: number;
  registry: string;
  trustScore: number;
  availableCredits: number;
  status: string;
  projectType: string;
  unicId: string;
  country: string;
  image: string;
}

const mockCredits: CarbonCredit[] = [
  {
    id: '1',
    projectName: 'Amazon Rainforest Protection',
    pricePerCredit: 15.50,
    location: 'Brazil',
    country: 'Brazil',
    vintage: 2021,
    registry: 'Verra',
    trustScore: 98,
    availableCredits: 12500,
    status: 'Active',
    projectType: 'Forestry',
    unicId: 'VCS-1234',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: '2',
    projectName: 'Rimba Raya Biodiversity',
    pricePerCredit: 22.00,
    location: 'Borneo',
    country: 'Indonesia',
    vintage: 2020,
    registry: 'Gold Standard',
    trustScore: 96,
    availableCredits: 8400,
    status: 'Active',
    projectType: 'Forestry',
    unicId: 'GS-5678',
    image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: '3',
    projectName: 'Blue Carbon Mangrove',
    pricePerCredit: 35.00,
    location: 'Palawan',
    country: 'Philippines',
    vintage: 2022,
    registry: 'Verra',
    trustScore: 99,
    availableCredits: 400,
    status: 'Selling Fast',
    projectType: 'Blue Carbon',
    unicId: 'VCS-9012',
    image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&q=80&w=1000'
  }
];

interface HomePageProps {
  onNavigate: (view: 'marketplace' | 'portfolio' | 'home' | 'about') => void;
}

// --- COMPONENTS ---

// 1. Data Stat Block (Enhanced with Micro-Charts)
const StatBlock = ({ label, value, unit, color = "text-white", trend }: { label: string, value: string, unit?: string, color?: string, trend?: string }) => (
  <div className="group cursor-default relative overflow-hidden">
    <div className="flex justify-between items-center mb-2">
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 group-hover:text-emerald-400 transition-colors">{label}</p>
        {trend && <span className="text-[10px] font-mono text-emerald-500 bg-emerald-500/10 px-1 rounded">{trend}</span>}
    </div>
    <div className="flex items-baseline gap-1 relative z-10">
      <span className={`text-4xl md:text-5xl font-bold ${color} tracking-tight`}>{value}</span>
      {unit && <span className="text-lg font-medium text-slate-400">{unit}</span>}
    </div>
    
    {/* Decorative Bar Line */}
    <div className="h-1 w-full bg-slate-800 mt-4 rounded-full overflow-hidden">
        <div className={`h-full ${color.replace('text-', 'bg-')} w-2/3 opacity-50 group-hover:w-full group-hover:opacity-100 transition-all duration-700 ease-out`} />
    </div>
  </div>
);

// 2. Project Card (HUD Style Overlay)
const ProjectCard = ({ project, onClick }: { project: CarbonCredit, onClick: () => void }) => (
  <div 
    onClick={onClick}
    className="group relative h-[450px] w-full overflow-hidden cursor-pointer bg-[#050505] border-r border-b border-white/5 last:border-r-0 hover:z-10 transition-all duration-500"
  >
    {/* Image with Tech Overlay */}
    <div className="absolute inset-0">
      <img 
        src={project.image} 
        alt={project.projectName} 
        className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-50 group-hover:opacity-30 grayscale group-hover:grayscale-0" 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />
      
      {/* Grid Scan Effect */}
      <div className="absolute inset-0 bg-[linear-gradient(transparent_2px,#000_2px),linear-gradient(90deg,transparent_2px,#000_2px)] bg-[size:40px_40px] opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
    </div>

    {/* Status Indicators */}
    <div className="absolute top-6 left-6 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-y-2 group-hover:translate-y-0">
        <span className="inline-flex items-center gap-2 px-2 py-1 bg-emerald-500/20 text-emerald-400 text-[10px] font-mono border border-emerald-500/30 uppercase tracking-wider backdrop-blur-md">
            <Activity className="w-3 h-3" /> Live Feed
        </span>
    </div>

    {/* Content */}
    <div className="absolute inset-0 p-8 flex flex-col justify-end">
      <div className="transform transition-transform duration-500 translate-y-8 group-hover:translate-y-0">
        <div className="flex items-center gap-3 mb-3">
          <span className="bg-white text-black text-[10px] font-bold px-2 py-1 uppercase tracking-widest">{project.registry}</span>
          <span className="text-emerald-400 text-xs font-mono font-bold flex items-center gap-1">
            <ShieldCheck className="w-3 h-3" /> {project.trustScore}% VERIFIED
          </span>
        </div>
        
        <h3 className="text-2xl font-bold text-white mb-2 leading-tight group-hover:text-[#ec4899] transition-colors">{project.projectName}</h3>
        
        <div className="h-px w-full bg-white/10 my-4 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />

        <div className="flex justify-between items-end opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
          <div>
            <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-1">Available Volume</p>
            <p className="text-lg font-mono text-white">{project.availableCredits.toLocaleString()} t</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-1">Current Price</p>
            <p className="text-lg font-mono text-white">${project.pricePerCredit.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
    
    {/* Corner Borders (HUD look) */}
    <div className="absolute top-0 left-0 w-4 h-4 border-l border-t border-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
    <div className="absolute bottom-0 right-0 w-4 h-4 border-r border-b border-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
  </div>
);

// 3. Insight Card (New Component for Section 4)
const InsightCard = ({ category, title, date, icon: Icon }: any) => (
  <div className="group relative bg-slate-900/50 border border-slate-800 p-8 hover:bg-slate-800 transition-all duration-300 cursor-pointer overflow-hidden">
    <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 group-hover:text-[#ec4899] transition-all">
      <ArrowRight className="w-5 h-5 -translate-x-2 group-hover:translate-x-0 transition-transform" />
    </div>
    <div className="flex items-center gap-3 mb-4">
      <div className="p-2 bg-white/5 rounded text-emerald-400 group-hover:text-white group-hover:bg-[#ec4899] transition-colors">
        <Icon className="w-4 h-4" />
      </div>
      <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">{category}</span>
    </div>
    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#ec4899] transition-colors">{title}</h3>
    <p className="text-sm text-slate-400 font-mono">{date}</p>
    
    {/* Hover Line */}
    <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#ec4899] group-hover:w-full transition-all duration-500" />
  </div>
);

export default function HomePage({ onNavigate }: HomePageProps) {
  const [scrolled, setScrolled] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#ec4899]/30 font-sans overflow-x-hidden">
      
      {/* --- SECTION 1: IMMERSIVE HERO (Scrollable) --- */}
      <section className="relative h-[90vh] w-full flex flex-col justify-end border-b border-slate-800 overflow-hidden">
        {/* Background Map - Moving slowly */}
        <div className="absolute inset-0 z-0">
           <img 
             src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop" 
             className="w-full h-full object-cover opacity-30 saturate-0 scale-110"
             style={{ transform: `translateY(${scrolled * 0.2}px) scale(1.1)` }}
           />
           {/* Pink Data Highlight Overlay (Ecopia style) */}
           <div className="absolute inset-0 bg-[#ec4899]/10 mix-blend-overlay" />
           <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
        </div>

        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 pb-20">
          <div className="grid md:grid-cols-2 gap-12 items-end">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-2 w-2 bg-[#ec4899]" />
                <span className="text-xs font-bold tracking-[0.2em] text-slate-400 uppercase">Global Portfolio Status</span>
              </div>
              <h1 className="text-7xl md:text-8xl font-bold tracking-tighter text-white leading-[0.9] mb-8">
                Carbon <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ec4899] to-orange-400">Intelligence.</span>
              </h1>
              <p className="text-xl text-slate-400 max-w-md leading-relaxed">
                Your organizational footprint is being neutralized across 3 continents with satellite-verified precision.
              </p>
            </div>

            <div className="flex flex-col gap-8 md:pl-20">
               <StatBlock label="Net Offset" value="2,450" unit="tCO₂e" />
               <div className="h-px w-full bg-slate-800" />
               <div className="grid grid-cols-2 gap-8">
                 <StatBlock label="Scope 1 & 2" value="98%" color="text-emerald-400" />
                 <StatBlock label="Next Audit" value="14" unit="Days" />
               </div>
               <button 
                 onClick={() => onNavigate('portfolio')}
                 className="mt-4 w-fit flex items-center gap-2 border-b border-white pb-1 hover:text-[#ec4899] hover:border-[#ec4899] transition-all text-sm font-bold uppercase tracking-widest"
               >
                 View Full Analytics <ArrowRight className="w-4 h-4" />
               </button>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 2: MAP VISUALIZATION STRIP --- */}
      <section className="border-b border-slate-800 bg-[#0A0A0A] overflow-hidden">
        <div className="flex flex-col md:flex-row h-[600px]">
          
          {/* Left: Info */}
          <div className="w-full md:w-1/3 p-12 flex flex-col justify-between border-r border-slate-800">
             <div>
               <MapIcon className="w-12 h-12 text-slate-600 mb-8" />
               <h2 className="text-4xl font-bold mb-6">Vectorized <br />Impact.</h2>
               <p className="text-slate-400 leading-relaxed">
                 We digitize every hectare of forest you protect. Our AI extracts features from satellite imagery to prove biomass density and prevent encroachment.
               </p>
             </div>
             
             <div className="space-y-6">
                <div className="flex items-center gap-4">
                   <div className="w-10 h-10 bg-[#ec4899] flex items-center justify-center text-black font-bold">01</div>
                   <div className="text-sm font-medium uppercase tracking-wider text-slate-300">Feature Extraction</div>
                </div>
                <div className="flex items-center gap-4">
                   <div className="w-10 h-10 bg-slate-800 flex items-center justify-center text-white font-bold">02</div>
                   <div className="text-sm font-medium uppercase tracking-wider text-slate-500">Change Detection</div>
                </div>
                <div className="flex items-center gap-4">
                   <div className="w-10 h-10 bg-slate-800 flex items-center justify-center text-white font-bold">03</div>
                   <div className="text-sm font-medium uppercase tracking-wider text-slate-500">Credit Issuance</div>
                </div>
             </div>
          </div>

          {/* Right: The "Map" Visual */}
          <div className="w-full md:w-2/3 relative bg-slate-900 group overflow-hidden">
             <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074&auto=format&fit=crop')] bg-cover bg-center grayscale opacity-40 group-hover:scale-105 transition-transform duration-[2s]" />
             
             {/* "Segmentation" Overlay (Pink polygons mimicking Ecopia) */}
             <div className="absolute top-1/4 left-1/4 w-32 h-32 border-2 border-[#ec4899] bg-[#ec4899]/20 backdrop-blur-sm" />
             <div className="absolute top-1/3 left-1/2 w-48 h-24 border-2 border-cyan-400 bg-cyan-400/20 backdrop-blur-sm" />
             <div className="absolute bottom-1/4 right-1/3 w-40 h-40 border-2 border-yellow-400 bg-yellow-400/20 backdrop-blur-sm rounded-full" />

             <div className="absolute bottom-8 right-8 bg-black/80 backdrop-blur-md p-4 border border-slate-700 max-w-xs">
                <div className="flex items-center gap-2 mb-2 text-xs font-mono text-[#ec4899]">
                   <Layers className="w-3 h-3" />
                   <span>LAYER: VEGETATION_INDEX</span>
                </div>
                <p className="text-sm text-white">
                   High-resolution analysis confirms 94% canopy retention in your Borneo portfolio.
                </p>
             </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 3: MARKETPLACE FEED (Grid) --- */}
      <section className="bg-[#050505]">
        <div className="w-full max-w-[1400px] mx-auto px-6 py-24">
          <div className="flex items-end justify-between mb-12">
             <h2 className="text-5xl font-bold tracking-tight">Active Opportunities</h2>
             <button 
               onClick={() => onNavigate('marketplace')}
               className="hidden md:flex items-center gap-2 px-6 py-3 bg-white text-black font-bold hover:bg-[#ec4899] hover:text-white transition-colors"
             >
               Explore All <Maximize2 className="w-4 h-4" />
             </button>
          </div>

          <div className="grid md:grid-cols-3 border-t border-l border-slate-800">
             {mockCredits.map((project, i) => (
               <ProjectCard key={i} project={project} onClick={() => onNavigate('marketplace')} />
             ))}
          </div>
          
          <button 
             onClick={() => onNavigate('marketplace')}
             className="md:hidden mt-8 w-full py-4 bg-white text-black font-bold uppercase tracking-widest hover:bg-[#ec4899] transition-colors"
           >
             View Marketplace
           </button>
        </div>
      </section>

      {/* --- SECTION 4: INTELLIGENCE FEED (New Informative Section) --- */}
      <section className="bg-[#050505] border-t border-slate-800">
         <div className="w-full max-w-[1400px] mx-auto px-6 py-24">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
               <div>
                  <div className="flex items-center gap-2 text-emerald-400 font-mono text-sm mb-4">
                     <Zap className="w-4 h-4" />
                     <span>STRATEGIC INTELLIGENCE</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold text-white max-w-xl">
                     Insights for the Regenerative Economy.
                  </h2>
               </div>
               <p className="text-slate-400 max-w-sm text-sm leading-relaxed">
                  Stay ahead of regulatory changes and market dynamics with our expert analysis and satellite-verified data reports.
               </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
               <InsightCard 
                  category="Market Report"
                  title="Q3 Voluntary Carbon Market Trends"
                  date="OCT 2023 • 12 MIN READ"
                  icon={TrendingUp}
               />
               <InsightCard 
                  category="Methodology"
                  title="Satellite Verification v2.0: Deep Dive"
                  date="SEP 2023 • TECHNICAL PAPER"
                  icon={Cpu}
               />
               <InsightCard 
                  category="Regulatory"
                  title="Navigating Article 6 Compliance"
                  date="AUG 2023 • GUIDE"
                  icon={FileText}
               />
            </div>
         </div>
      </section>

    </div>
  );
}