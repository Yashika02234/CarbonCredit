import React, { useState, useEffect } from 'react';
import {
  Leaf,
  Globe2,
  ShieldCheck,
  Users,
  Sparkles,
  Target,
  Handshake,
  ArrowRight,
  ArrowUpRight,
  Cpu,
  Code,
  Zap,
  Network,
  History,
  TrendingUp,
  BarChart3,
  Map,
  Activity
} from 'lucide-react';

// --- SUB-COMPONENTS ---

const PrincipleCard = ({ icon: Icon, label, title, desc, color, delay }: any) => (
  <div 
    className="group relative overflow-hidden rounded-2xl bg-[#0A0A0A]/80 backdrop-blur-sm border border-white/10 p-8 hover:border-white/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl animate-in fade-in slide-in-from-bottom-8 fill-mode-backwards"
    style={{ animationDelay: delay }}
  >
    {/* Dynamic colored glow on hover */}
    <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
    <div className={`absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-tl ${color} opacity-0 group-hover:opacity-20 blur-3xl transition-all duration-700`} />
    
    <div className="relative z-10 flex flex-col h-full">
      <div className="flex justify-between items-start mb-6">
        <div className={`p-3 rounded-lg bg-white/5 border border-white/10 text-white group-hover:scale-110 transition-transform duration-300 group-hover:bg-white/10 shadow-[0_0_15px_rgba(0,0,0,0.5)]`}>
          <Icon className="w-5 h-5" />
        </div>
        <span className={`text-[10px] font-mono font-bold uppercase tracking-widest ${color.split(' ')[1].replace('to-', 'text-')}`}>
          {label}
        </span>
      </div>
      
      <h3 className="text-xl font-bold text-white mb-3 leading-tight group-hover:text-white transition-colors">{title}</h3>
      <p className="text-slate-400 leading-relaxed text-sm font-light group-hover:text-slate-300 transition-colors">{desc}</p>
    </div>
  </div>
);

const StatItem = ({ label, value, index, color = "text-white" }: { label: string, value: string, index: number, color?: string }) => (
  <div 
    className="flex flex-col px-8 border-l border-white/10 first:border-0 animate-in fade-in slide-in-from-bottom-4 fill-mode-backwards group cursor-default"
    style={{ animationDelay: `${index * 150}ms` }}
  >
    <span className={`text-4xl md:text-5xl font-bold ${color} tracking-tighter mb-2 group-hover:scale-105 transition-transform origin-left`}>{value}</span>
    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest group-hover:text-slate-300 transition-colors">{label}</span>
  </div>
);

const TimelineEvent = ({ year, title, desc, index }: { year: string, title: string, desc: string, index: number }) => (
  <div 
    className="relative pl-12 pb-12 border-l border-white/10 last:pb-0 last:border-0 group animate-in fade-in slide-in-from-left-4 fill-mode-backwards"
    style={{ animationDelay: `${index * 150}ms` }}
  >
    <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-600 group-hover:bg-[#ec4899] group-hover:border-[#ec4899] group-hover:scale-150 transition-all duration-300 shadow-[0_0_0_4px_rgba(0,0,0,0.5)] z-10" />
    <span className="text-xs font-mono text-[#ec4899] mb-1 block opacity-80 group-hover:opacity-100 transition-opacity tracking-widest">{year}</span>
    <h4 className="text-lg font-bold text-white mb-2 group-hover:translate-x-2 transition-transform duration-300">{title}</h4>
    <p className="text-slate-400 text-sm max-w-md group-hover:text-slate-300 transition-colors leading-relaxed">{desc}</p>
  </div>
);

export default function AboutPage() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-[#020408] text-slate-200 font-sans selection:bg-[#ec4899]/30 overflow-x-hidden">
      
      {/* --- ANIMATED BACKGROUND --- */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Colorful Orbs */}
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full animate-pulse-slow" />
        <div className="absolute top-[30%] right-[-10%] w-[500px] h-[500px] bg-[#ec4899]/10 blur-[120px] rounded-full animate-pulse-slow" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-emerald-500/10 blur-[120px] rounded-full animate-pulse-slow" style={{ animationDelay: '4s' }} />
        
        {/* Moving Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)] opacity-50" />
      </div>

      <div className="relative z-10">
        
        {/* --- 1. HERO SECTION --- */}
        <section className="pt-40 pb-20 px-6 border-b border-white/5 relative overflow-hidden">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex flex-col md:flex-row gap-16 items-end relative z-10">
              <div className="max-w-4xl">
                {/* Badge */}
                <div className="inline-flex items-center gap-3 px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/5 backdrop-blur-md text-[10px] font-mono text-emerald-400 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700 uppercase tracking-widest hover:bg-emerald-500/10 transition-colors cursor-default shadow-[0_0_20px_-5px_rgba(16,185,129,0.3)]">
                   <Activity className="w-3 h-3 animate-pulse" />
                   System Status: Operational
                </div>

                {/* Headline - Scaled Down & Sharper */}
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium text-white leading-[0.95] tracking-tight mb-8 animate-in slide-in-from-bottom-6 duration-1000">
                  The Climate <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-[#ec4899] animate-gradient-x">
                    Operating System.
                  </span>
                </h1>
                
                <p className="text-lg md:text-xl text-slate-400 max-w-2xl leading-relaxed font-light animate-in slide-in-from-bottom-8 duration-1000 delay-100 border-l-2 border-white/10 pl-6">
                  Offset replaces opaque spreadsheets with <span className="text-white font-medium">real-time, satellite-verified infrastructure</span>. 
                  We are digitizing the planet's natural capital to make the regenerative economy scalable.
                </p>
              </div>

              {/* Interactive Graphic - Spinning Network */}
              <div className="hidden lg:block absolute right-0 top-10 w-96 h-96 opacity-60 pointer-events-none">
                 <div className="absolute inset-0 border border-dashed border-white/10 rounded-full animate-[spin_60s_linear_infinite]" />
                 <div className="absolute inset-8 border border-white/5 rounded-full animate-[spin_40s_linear_infinite_reverse]" />
                 <div className="absolute inset-16 border border-white/5 rounded-full animate-[spin_20s_linear_infinite]" />
                 
                 {/* Floating Nodes */}
                 <div className="absolute top-0 left-1/2 w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_15px_#10b981] animate-ping" />
                 <div className="absolute bottom-1/4 right-0 w-2 h-2 bg-[#ec4899] rounded-full shadow-[0_0_15px_#ec4899]" />
                 <div className="absolute top-1/3 left-0 w-2 h-2 bg-cyan-500 rounded-full shadow-[0_0_15px_#06b6d4]" />
              </div>
            </div>
          </div>
        </section>

        {/* --- 2. STATS STRIP (Interactive) --- */}
        <section className="border-b border-white/5 bg-[#020408]/80 backdrop-blur-md sticky top-0 z-50">
           <div className="max-w-[1400px] mx-auto px-6 py-8 flex flex-wrap gap-y-8 justify-between items-center">
              <div className="flex flex-wrap gap-12">
                <StatItem value="2.5M" label="Tonnes Retired" index={0} color="text-white" />
                <StatItem value="142" label="Active Projects" index={1} color="text-emerald-400" />
                <StatItem value="$84M" label="Market Volume" index={2} color="text-blue-400" />
              </div>
              <div className="flex items-center gap-4 pr-8 border-l border-white/10 pl-8 hidden xl:flex animate-in fade-in slide-in-from-right-8 duration-1000 delay-500">
                 <div className="text-right">
                    <p className="text-[10px] font-bold text-white uppercase tracking-widest mb-0.5">Independent Audit</p>
                    <p className="text-[9px] font-mono text-slate-500">Q3 2023 Report • KPMG Verified</p>
                 </div>
                 <div className="h-10 w-10 bg-white rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                    <ShieldCheck className="w-5 h-5 text-black" />
                 </div>
              </div>
           </div>
        </section>

        {/* --- 3. THE PROBLEM (Animated Data Viz) --- */}
        <section className="py-24 px-6 border-b border-white/5 relative">
           <div className="max-w-[1400px] mx-auto">
              <div className="grid lg:grid-cols-2 gap-20 items-center">
                 <div className="animate-in slide-in-from-left-8 duration-700 delay-200">
                    <div className="flex items-center gap-2 text-[#ec4899] font-mono text-[10px] mb-6 uppercase tracking-widest bg-[#ec4899]/10 w-fit px-2 py-1 rounded">
                       <TrendingUp className="w-3 h-3" /> Market Analysis
                    </div>
                    <h2 className="text-4xl md:text-6xl font-medium text-white mb-6 leading-tight tracking-tight">
                       The market is broken. <br /> <span className="text-slate-600">We fixed it.</span>
                    </h2>
                    <p className="text-lg text-slate-400 mb-6 leading-relaxed font-light">
                       Traditional carbon markets suffer from a "Trust Gap". Double counting, lack of transparency, and outdated verification methods have paralyzed corporate action.
                    </p>
                    <p className="text-lg text-slate-400 leading-relaxed font-light">
                       We built a vertically integrated stack that combines satellite telemetry, on-chain ledgers, and direct developer partnerships to ensure <span className="text-white font-medium">1 tonne sold = 1 tonne removed</span>.
                    </p>
                 </div>

                 {/* Interactive Chart Container */}
                 <div className="relative animate-in slide-in-from-right-8 duration-700 delay-300 group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-[#ec4899]/20 blur-xl rounded-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-1000" />
                    <div className="relative bg-[#0A0A0A] border border-white/10 p-8 rounded-2xl">
                       <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
                          <span className="text-[10px] font-mono text-slate-500 tracking-widest">MARKET EFFICIENCY</span>
                          <span className="text-[10px] font-mono text-emerald-400 tracking-widest flex items-center gap-2">
                             <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> LIVE COMPARISON
                          </span>
                       </div>
                       <div className="space-y-8">
                          {/* Animated Bar 1 */}
                          <div>
                             <div className="flex justify-between text-sm text-white mb-2 font-medium">
                                <span>Verification Time</span>
                                <span className="text-slate-500 line-through text-xs font-mono">6 Months</span>
                             </div>
                             <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                                <div 
                                  className={`h-full bg-emerald-500 transition-all duration-[2000ms] ease-out shadow-[0_0_10px_#10b981] ${mounted ? 'w-[5%]' : 'w-0'}`} 
                                />
                             </div>
                             <p className="text-right text-[10px] text-emerald-400 mt-2 font-mono uppercase tracking-wider">Real-time (Sat-Link)</p>
                          </div>
                          
                          {/* Animated Bar 2 */}
                          <div>
                             <div className="flex justify-between text-sm text-white mb-2 font-medium">
                                <span>Cost to Retire</span>
                                <span className="text-slate-500 line-through text-xs font-mono">15% Fees</span>
                             </div>
                             <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                                <div 
                                  className={`h-full bg-cyan-500 transition-all duration-[2000ms] ease-out delay-500 shadow-[0_0_10px_#06b6d4] ${mounted ? 'w-[2%]' : 'w-0'}`} 
                                />
                             </div>
                             <p className="text-right text-[10px] text-cyan-400 mt-2 font-mono uppercase tracking-wider">1% Flat Fee</p>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* --- 4. CORE PRINCIPLES (Bento Grid) --- */}
        <section className="py-24 px-6 border-b border-white/5 bg-[#020408]">
           <div className="max-w-[1400px] mx-auto">
              <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
                 <div className="max-w-2xl">
                    <h2 className="text-4xl md:text-5xl font-medium text-white mb-4 tracking-tight">System Architecture</h2>
                    <p className="text-lg text-slate-400 font-light">Our platform is built on three immutable principles designed to solve the "Trust Gap" in voluntary carbon markets.</p>
                 </div>
                 <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#ec4899] hover:text-white transition-colors border border-[#ec4899]/30 px-6 py-3 rounded-lg hover:bg-[#ec4899] hover:border-[#ec4899] group bg-[#ec4899]/5">
                    Technical Whitepaper <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                 </button>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                 <PrincipleCard 
                   icon={Cpu}
                   label="Layer 1: Verification"
                   title="Code, Not Trust."
                   desc="We don't rely on PDFs. We use satellite telemetry and IoT sensors to verify biomass density in real-time."
                   color="from-emerald-500/20 to-transparent"
                   delay="0ms"
                 />
                 <PrincipleCard 
                   icon={Network}
                   label="Layer 2: Consensus"
                   title="Radical Openness."
                   desc="Every retirement is minted on-chain. Double-spending is mathematically impossible on our network."
                   color="from-cyan-500/20 to-transparent"
                   delay="150ms"
                 />
                 <PrincipleCard 
                   icon={Zap}
                   label="Layer 3: Access"
                   title="Frictionless Scale."
                   desc="We built the pipes so you can build the product. Integrate carbon removal into any transaction with 3 lines of code."
                   color="from-[#ec4899]/20 to-transparent"
                   delay="300ms"
                 />
              </div>
           </div>
        </section>

        {/* --- 5. TIMELINE (Vertical History) --- */}
        <section className="py-24 px-6 border-b border-white/5">
           <div className="max-w-[1000px] mx-auto">
              <div className="flex items-center gap-2 text-blue-400 font-mono text-[10px] mb-12 uppercase tracking-widest justify-center">
                 <History className="w-3 h-3" /> Evolution Log
              </div>
              
              <div className="grid md:grid-cols-2 gap-16">
                 <div className="sticky top-32 h-fit">
                    <h2 className="text-4xl font-medium text-white mb-6 leading-tight">From prototype to <br/> global standard.</h2>
                    <p className="text-slate-400 mb-8 font-light text-lg">We started as a research project at MIT, obsessing over satellite data. Today, we power the climate strategies of the Fortune 500.</p>
                    <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-[#ec4899] rounded-full" />
                 </div>
                 <div className="border-l border-white/10 pl-10 space-y-16">
                    <TimelineEvent 
                       index={0}
                       year="2021" 
                       title="System Genesis" 
                       desc="Founded by former NASA engineers. Launched first satellite verification model." 
                    />
                    <TimelineEvent 
                       index={1}
                       year="2022" 
                       title="Series A & Scale" 
                       desc="Raised $24M to expand sensor network across the Amazon basin." 
                    />
                    <TimelineEvent 
                       index={2}
                       year="2023" 
                       title="The API Launch" 
                       desc="Opened our infrastructure to developers. 500+ integrations in 6 months." 
                    />
                    <TimelineEvent 
                       index={3}
                       year="2024" 
                       title="Global Liquidity" 
                       desc="Reaching 2.5M tonnes retired. Launching the Blue Carbon vertical." 
                    />
                 </div>
              </div>
           </div>
        </section>

        {/* --- 6. TEAM / EXECUTION --- */}
        <section className="py-32 bg-[#020408] relative overflow-hidden">
           <div className="max-w-[1400px] mx-auto px-6 relative z-10">
              <div className="grid lg:grid-cols-2 gap-20 items-center">
                 
                 {/* Left: Content */}
                 <div className="animate-in slide-in-from-left-8 duration-700">
                    <div className="flex items-center gap-2 mb-6">
                       <span className="w-1.5 h-1.5 bg-white rounded-full" />
                       <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">The Operators</span>
                    </div>
                    <h2 className="text-5xl md:text-7xl font-medium text-white mb-8 leading-[0.9] tracking-tight">
                       Built by builders, <br />
                       <span className="text-slate-600">for builders.</span>
                    </h2>
                    <p className="text-lg text-slate-300 mb-8 leading-relaxed font-light">
                       We aren't just climate scientists. We are engineers, product designers, and founders who have scaled systems to millions of users. 
                       We understand that to fix the climate, the solution must be <span className="text-white font-medium">performant</span> and <span className="text-white font-medium">profitable</span>.
                    </p>
                    
                    <div className="flex flex-wrap gap-3">
                       <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-mono text-slate-300 flex items-center gap-2 hover:bg-white/10 transition-colors cursor-default">
                          <Code className="w-3 h-3 text-emerald-400" /> Ex-Stripe
                       </div>
                       <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-mono text-slate-300 flex items-center gap-2 hover:bg-white/10 transition-colors cursor-default">
                          <Cpu className="w-3 h-3 text-blue-400" /> NASA JPL
                       </div>
                       <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-mono text-slate-300 flex items-center gap-2 hover:bg-white/10 transition-colors cursor-default">
                          <Target className="w-3 h-3 text-[#ec4899]" /> Gold Standard
                       </div>
                    </div>
                 </div>

                 {/* Right: Interactive CTA Card */}
                 <div className="relative group animate-in slide-in-from-right-8 duration-700 delay-200">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-[#ec4899] rounded-3xl blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-700" />
                    <div className="relative bg-[#0A0A0A] border border-white/10 p-12 rounded-3xl group-hover:border-white/20 transition-colors">
                       <Handshake className="w-16 h-16 text-white mb-8 group-hover:scale-110 transition-transform duration-300" />
                       <h3 className="text-3xl font-bold text-white mb-4 tracking-tight">Deploy with us.</h3>
                       <p className="text-slate-400 mb-10 text-lg font-light">
                          Whether you are a startup integrating an offset API or an enterprise securing a 10-year supply chain, we are your infrastructure partners.
                       </p>
                       <div className="flex flex-col sm:flex-row gap-4">
                          <button className="flex-1 py-4 bg-white text-black font-bold rounded-lg hover:bg-slate-200 transition-colors uppercase tracking-widest text-xs shadow-xl">
                             Start Building
                          </button>
                          <button className="flex-1 py-4 border border-white/10 text-white font-bold rounded-lg hover:bg-white/5 transition-colors uppercase tracking-widest text-xs">
                             Contact Sales
                          </button>
                       </div>
                    </div>
                 </div>

              </div>
           </div>
        </section>

      </div>
    </div>
  );
}