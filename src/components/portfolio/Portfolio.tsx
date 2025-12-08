import React, { useState, useEffect } from 'react';
import {
  Leaf,
  TrendingUp,
  Award,
  Download,
  Wind,
  Trees,
  ArrowRight,
  Globe2,
  PieChart,
  Wallet,
  CheckCircle2,
  MoreHorizontal,
  Share2,
  Maximize2,
  Layers
} from 'lucide-react';

// --- SUB-COMPONENTS ---

// 1. High-Fidelity Stat Card (Financial Style)
const ImpactCard = ({ icon: Icon, label, value, sub, trend, color, delay }: any) => (
  <div 
    className="relative overflow-hidden rounded-3xl bg-[#0A0A0A] border border-white/5 p-8 group hover:border-white/10 transition-all duration-500 animate-in fade-in slide-in-from-bottom-4 hover:-translate-y-1 hover:shadow-2xl"
    style={{ animationDelay: delay }}
  >
    {/* Background Glow */}
    <div className={`absolute top-0 right-0 w-32 h-32 ${color.replace('text-', 'bg-')}/5 blur-[60px] rounded-full group-hover:bg-opacity-20 transition-all`} />
    
    <div className="relative z-10 flex flex-col h-full justify-between">
      <div className="flex justify-between items-start mb-6">
        <div className={`p-3 rounded-2xl bg-white/5 border border-white/5 ${color}`}>
          <Icon className="w-6 h-6" />
        </div>
        {trend && (
          <span className="flex items-center gap-1 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-lg border border-emerald-500/20">
            <TrendingUp className="w-3 h-3" /> {trend}
          </span>
        )}
      </div>
      
      <div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">{label}</p>
        <h3 className="text-4xl font-bold text-white mb-2 tracking-tight">{value}</h3>
        <p className="text-sm text-slate-400 font-medium">{sub}</p>
      </div>
    </div>
  </div>
);

// 2. Digital Certificate Asset (The "Vault" Card)
const CertificateCard = ({ id, project, amount, date, image, type, color, status = "Retired" }: any) => (
  <div className="group relative bg-[#0F0F0F] border border-white/5 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl cursor-pointer">
    {/* Top Image Section */}
    <div className="h-40 relative overflow-hidden">
       <img src={image} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-700 grayscale group-hover:grayscale-0" />
       <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-[#0F0F0F]/20 to-transparent" />
       
       <div className={`absolute top-3 left-3 px-2 py-1 rounded text-[9px] font-bold uppercase tracking-wider bg-black/60 backdrop-blur border border-white/10 text-white flex items-center gap-1.5`}>
          <div className={`w-1.5 h-1.5 rounded-full ${color.replace('text-', 'bg-')}`} />
          {type}
       </div>
       
       <div className="absolute top-3 right-3 px-2 py-1 rounded text-[9px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 backdrop-blur">
          {status}
       </div>
    </div>

    {/* Content */}
    <div className="p-5 relative">
       {/* Decorative Line */}
       <div className={`absolute top-0 left-6 w-8 h-1 -mt-0.5 rounded-b-full ${color.replace('text-', 'bg-')}`} />
       
       <div className="flex justify-between items-start mb-4 mt-2">
          <div>
             <p className="text-[9px] text-slate-500 font-mono mb-1 uppercase tracking-widest">Certificate ID</p>
             <p className="text-xs text-white font-mono tracking-wide">{id}</p>
          </div>
          <div className="text-right">
             <p className="text-[9px] text-slate-500 font-mono mb-1 uppercase tracking-widest">Amount</p>
             <p className="text-lg font-bold text-white">{amount} t</p>
          </div>
       </div>

       <h4 className="text-base font-bold text-slate-200 mb-4 line-clamp-1 group-hover:text-white transition-colors">{project}</h4>

       <div className="flex items-center justify-between pt-4 border-t border-white/5">
          <span className="text-xs text-slate-500 font-mono">{date}</span>
          <div className="flex gap-2">
             <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors" title="Share">
                <Share2 className="w-3.5 h-3.5" />
             </button>
             <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors flex items-center gap-2 text-[10px] font-bold uppercase px-3" title="Download">
                <Download className="w-3.5 h-3.5" /> PDF
             </button>
          </div>
       </div>
    </div>
  </div>
);

// 3. SDG Goal Chip
const SDGChip = ({ num, color, label }: any) => (
  <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-default group">
     <div className={`w-10 h-10 rounded-lg ${color} flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
        {num}
     </div>
     <div>
        <p className="text-[9px] text-slate-500 uppercase tracking-wider font-bold">Goal {num}</p>
        <p className="text-xs text-slate-300 font-medium group-hover:text-white transition-colors">{label}</p>
     </div>
  </div>
);

export default function Portfolio() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="min-h-screen bg-[#050505] text-slate-200 pt-28 pb-20 font-sans selection:bg-emerald-500/30 overflow-x-hidden">
      
      {/* Background Gradients */}
      <div className="fixed inset-0 pointer-events-none">
         <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-slate-900 via-[#050505] to-[#050505]" />
         <div className="absolute top-20 right-20 w-[600px] h-[600px] bg-emerald-500/5 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-[1600px] mx-auto px-6 relative z-10">
        
        {/* --- 1. HEADER SECTION --- */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16 animate-in slide-in-from-bottom-4 duration-700">
          <div>
            <div className="flex items-center gap-3 mb-4">
               <div className="p-2 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                  <Wallet className="w-5 h-5 text-emerald-400" />
               </div>
               <span className="text-sm font-mono text-emerald-400 uppercase tracking-widest">Asset Vault</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-tight">
               Climate <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Portfolio.</span>
            </h1>
          </div>
          <div className="flex gap-3">
             <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-xs font-bold uppercase tracking-wider">
                <Download className="w-4 h-4" /> Annual Report
             </button>
             <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-900/20 transition-all text-xs font-bold uppercase tracking-wider">
                Add Assets <ArrowRight className="w-4 h-4" />
             </button>
          </div>
        </div>

        {/* --- 2. IMPACT OVERVIEW --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
           <ImpactCard 
             icon={Leaf} 
             label="Net Carbon Offset" 
             value="2,450 t" 
             sub="Equivalent to 120,000 trees" 
             trend="+12%" 
             color="text-emerald-400" 
             delay="0ms" 
           />
           <ImpactCard 
             icon={TrendingUp} 
             label="Portfolio Value" 
             value="$42,890" 
             sub="Current market valuation" 
             trend="+8.4%" 
             color="text-cyan-400" 
             delay="100ms" 
           />
           <ImpactCard 
             icon={Globe2} 
             label="Global Reach" 
             value="6 Regions" 
             sub="Supporting 14 communities" 
             color="text-indigo-400" 
             delay="200ms" 
           />
           <ImpactCard 
             icon={CheckCircle2} 
             label="Retirement Ratio" 
             value="98.5%" 
             sub="Assets permanently retired" 
             color="text-orange-400" 
             delay="300ms" 
           />
        </div>

        {/* --- 3. INTELLIGENCE DECK (Map & DNA) --- */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
           
           {/* Global Map Visualization */}
           <div className="lg:col-span-2 bg-[#0A0A0A] border border-white/10 rounded-3xl p-8 relative overflow-hidden group">
              <div className="flex justify-between items-center mb-8 relative z-10">
                 <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Globe2 className="w-5 h-5 text-emerald-500" /> Impact Distribution
                 </h3>
                 <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 rounded-full border border-emerald-500/20">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider">Live View</span>
                 </div>
              </div>
              
              {/* Map Graphic */}
              <div className="relative h-[350px] w-full rounded-2xl overflow-hidden bg-slate-900 border border-white/5">
                 <img 
                   src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000" 
                   className="w-full h-full object-cover opacity-40 grayscale group-hover:scale-105 transition-transform duration-[10s]" 
                 />
                 <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0A0A0A_100%)]" />
                 
                 {/* Map Pins */}
                 <div className="absolute top-[40%] left-[30%] group/pin cursor-pointer">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full animate-ping absolute opacity-75" />
                    <div className="w-3 h-3 bg-emerald-500 rounded-full border-2 border-black relative z-10 hover:scale-150 transition-transform" />
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur px-2 py-1 rounded border border-white/10 text-[9px] text-white whitespace-nowrap opacity-0 group-hover/pin:opacity-100 transition-opacity">Brazil</div>
                 </div>
                 
                 <div className="absolute top-[50%] right-[25%] group/pin cursor-pointer">
                    <div className="w-3 h-3 bg-cyan-500 rounded-full animate-ping absolute opacity-75 delay-700" />
                    <div className="w-3 h-3 bg-cyan-500 rounded-full border-2 border-black relative z-10" />
                 </div>

                 <div className="absolute bottom-[30%] left-[55%] group/pin cursor-pointer">
                    <div className="w-3 h-3 bg-orange-500 rounded-full animate-ping absolute opacity-75 delay-300" />
                    <div className="w-3 h-3 bg-orange-500 rounded-full border-2 border-black relative z-10" />
                 </div>
              </div>
           </div>

           {/* Allocation & SDGs */}
           <div className="flex flex-col gap-6">
              
              {/* Portfolio Mix */}
              <div className="bg-[#0A0A0A] border border-white/10 rounded-3xl p-8 flex-1">
                 <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                    <PieChart className="w-5 h-5 text-blue-500" /> Asset Allocation
                 </h3>
                 <div className="space-y-5">
                    {[
                      { label: 'Forestry', pct: '45%', color: 'bg-emerald-500', icon: Trees },
                      { label: 'Renewable', pct: '30%', color: 'bg-cyan-500', icon: Wind },
                      { label: 'Community', pct: '25%', color: 'bg-orange-500', icon: Maximize2 },
                    ].map((item, i) => (
                      <div key={i}>
                         <div className="flex justify-between text-xs mb-2">
                            <span className="text-slate-300 flex items-center gap-2">
                              <item.icon className={`w-3.5 h-3.5 ${item.color.replace('bg-', 'text-')}`}/> {item.label}
                            </span>
                            <span className="text-white font-mono">{item.pct}</span>
                         </div>
                         <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                            <div className={`h-full ${item.color}`} style={{ width: item.pct }} />
                         </div>
                      </div>
                    ))}
                 </div>
              </div>

              {/* SDG Impact */}
              <div className="bg-[#0A0A0A] border border-white/10 rounded-3xl p-8">
                 <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">SDG Contribution</h3>
                 <div className="grid grid-cols-1 gap-3">
                    <SDGChip num="13" color="bg-[#3F7E44]" label="Climate Action" />
                    <SDGChip num="15" color="bg-[#56C02B]" label="Life on Land" />
                    <SDGChip num="07" color="bg-[#FCC30B]" label="Affordable Energy" />
                 </div>
              </div>
           </div>
        </div>

        {/* --- 4. DIGITAL ASSET VAULT (Certificates) --- */}
        <div className="mb-20">
           <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-white tracking-tight">Digital Assets</h2>
              <div className="flex gap-2">
                 <button className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors border border-white/5"><Layers className="w-5 h-5"/></button>
                 <button className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors border border-white/5"><MoreHorizontal className="w-5 h-5"/></button>
              </div>
           </div>

           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <CertificateCard 
                id="CRT-2024-8892"
                project="Amazon Conservation"
                amount="500"
                date="Oct 12, 2024"
                image="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b"
                type="Forestry"
                color="text-emerald-400"
              />
              <CertificateCard 
                id="CRT-2024-7721"
                project="Wind Energy Maharashtra"
                amount="1,200"
                date="Sep 28, 2024"
                image="https://images.unsplash.com/photo-1466611653911-95081537e5b7"
                type="Renewable"
                color="text-cyan-400"
              />
              <CertificateCard 
                id="CRT-2024-6654"
                project="Blue Carbon Mangrove"
                amount="350"
                date="Aug 15, 2024"
                image="https://images.unsplash.com/photo-1583212292454-1fe6229603b7"
                type="Blue Carbon"
                color="text-blue-400"
              />
              <CertificateCard 
                id="CRT-2024-5510"
                project="Clean Cookstoves"
                amount="400"
                date="Jul 02, 2024"
                image="https://images.unsplash.com/photo-1595278069441-2cf29f525a3c"
                type="Community"
                color="text-orange-400"
              />
           </div>
        </div>

      </div>
    </div>
  );
}