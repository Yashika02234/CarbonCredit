import { 
  ArrowRight, 
  ArrowUpRight,
  Globe, 
  ShieldCheck, 
  Cpu, 
  Mail, 
  MapPin, 
  Layers,
  Activity,
  Zap,
  BarChart3,
  Wifi
} from 'lucide-react';

// --- COMPONENTS ---

// 1. Data Console (The New "Unique Element")
// A structured HUD instead of random floating chips
const DataConsole = () => (
  <div className="relative z-10 hidden lg:block animate-fade-in-right">
    {/* Glass Container */}
    <div className="bg-slate-950/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-2xl w-full max-w-sm ml-auto relative overflow-hidden group hover:border-emerald-500/30 transition-colors">
      
      {/* Scanline Effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/5 to-transparent h-[200%] w-full animate-scan pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping opacity-75" />
          </div>
          <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest font-bold">Live Telemetry</span>
        </div>
        <Wifi className="w-4 h-4 text-slate-500" />
      </div>
      
     
      {/* Mini Chart Visualization */}
      <div className="mt-6 pt-4 border-t border-white/5">
         <div className="flex justify-between items-end h-12 gap-1">
            {[35, 55, 40, 70, 60, 85, 75, 95, 60, 50].map((h, i) => (
              <div 
                key={i} 
                style={{ height: `${h}%` }} 
                className={`w-full rounded-t-sm transition-all duration-500 ${i === 7 ? 'bg-emerald-500' : 'bg-emerald-500/20 group-hover:bg-emerald-500/40'}`} 
              />
            ))}
         </div>
         <div className="flex justify-between mt-2 text-[10px] text-slate-500 font-mono uppercase">
            <span>00:00</span>
            <span>12:00</span>
            <span>24:00</span>
         </div>
      </div>
    </div>
  </div>
);

// 2. News/Feature Overlay Card
const NewsCard = () => (
  <div className="absolute bottom-12 right-8 z-20 max-w-sm w-full hidden lg:block animate-slide-in-up">
    <div className="bg-black/60 backdrop-blur-xl border border-white/10 p-5 rounded-2xl shadow-2xl flex gap-5 items-center group cursor-pointer hover:border-emerald-500/30 transition-all hover:translate-y-[-4px]">
      <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0 border border-white/10 relative">
        <div className="absolute inset-0 bg-emerald-500/10 mix-blend-overlay z-10" />
        <img 
          src="https://images.unsplash.com/photo-1516214104703-d870798883c5?q=80&w=1000&auto=format&fit=crop" 
          alt="Project" 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
        />
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-[10px] font-bold font-mono text-emerald-400 uppercase tracking-widest">New Listing</span>
          <ArrowUpRight className="w-3 h-3 text-slate-400 group-hover:text-white transition-colors" />
        </div>
        <h3 className="text-base font-medium text-white leading-tight mb-1 group-hover:text-emerald-200 transition-colors">
          Rimba Raya Reserve
        </h3>
        <p className="text-xs text-slate-400 line-clamp-1">
          Borneo, Indonesia • Peat Swamp
        </p>
      </div>
    </div>
  </div>
);

// 3. Feature Card (Grid Items)
const FeatureCard = ({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) => (
  <div className="group p-8 rounded-3xl bg-slate-900/50 border border-slate-800 hover:border-emerald-500/30 transition-all duration-300 hover:-translate-y-1">
    <div className="h-12 w-12 rounded-2xl bg-slate-800 flex items-center justify-center mb-6 text-emerald-400 group-hover:scale-110 group-hover:bg-emerald-500/10 transition-all">
      <Icon className="h-6 w-6" />
    </div>
    <h3 className="text-xl font-medium text-white mb-3">{title}</h3>
    <p className="text-slate-400 leading-relaxed text-sm">{desc}</p>
  </div>
);

export default function LandingPage({ onOpenAuth }: { onOpenAuth: (mode: 'login' | 'signup') => void }) {
  return (
    <div className="bg-[#050505] text-slate-200 font-sans selection:bg-emerald-500/30">
      
      {/* --- HERO SECTION --- */}
      <div id="home" className="relative h-screen w-full overflow-hidden flex flex-col justify-center">
        
        {/* 1. Immersive Full-Screen Background */}
        <div className="absolute inset-0 z-0">
           <img 
             src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop" 
             alt="Satellite Map" 
             className="w-full h-full object-cover scale-105 animate-pulse-slow opacity-50" 
             style={{ animationDuration: '120s' }} 
           />
           {/* Technical Overlays */}
           <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:64px_64px]" />
           <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/80 to-transparent" />
           <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
        </div>

        {/* 2. Hero Content (Grid Layout) */}
        <div className="relative z-20 container mx-auto px-6 lg:px-12 pt-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left: Text Content */}
            <div className="max-w-3xl">
              {/* Badge */}
              <div className="inline-flex items-center gap-3 px-3 py-1.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white text-xs mb-8 animate-fade-in hover:bg-white/10 transition-colors cursor-default">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="font-mono text-emerald-300 tracking-wider">SYSTEM OPERATIONAL</span>
              </div>

              {/* Huge Typography */}
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium text-white leading-[0.95] tracking-tight mb-8 drop-shadow-2xl">
                Digitizing <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 via-teal-200 to-emerald-500">
                  Nature's Value.
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-slate-300 max-w-xl leading-relaxed mb-10 font-light drop-shadow-md">
                AI-driven verification. Satellite precision. 
                <span className="text-white font-normal block mt-1"> The new standard for carbon trading.</span>
              </p>
              
              {/* Pill Buttons */}
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => onOpenAuth('signup')}
                  className="h-14 px-8 rounded-full bg-emerald-500 text-black font-bold text-base hover:bg-emerald-400 transition-all hover:scale-105 flex items-center gap-2 shadow-[0_0_40px_-10px_rgba(16,185,129,0.5)]"
                >
                  Start Offsetting
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button 
                  onClick={() => document.getElementById('mission')?.scrollIntoView({ behavior: 'smooth' })}
                  className="h-14 px-8 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white font-medium hover:bg-white/10 transition-all hover:border-white/20"
                >
                  Explore Technology
                </button>
              </div>
            </div>

            {/* Right: Data Console (Replaces Floating Overlaps) */}
            <div className="flex justify-end">
               <DataConsole />
            </div>

          </div>
        </div>

        {/* 3. Floating News Card (Bottom Right) */}
        <NewsCard />
      </div>

      {/* --- DATA STRIP (With Emojis) --- */}
      <div className="border-y border-white/5 bg-[#0A0A0A] relative z-20">
        <div className="container mx-auto px-6 lg:px-12 grid grid-cols-2 md:grid-cols-4 divide-x divide-white/5">
          {[
            { label: 'CO2 Removed', value: '2.5M t', icon: '☁️' },
            { label: 'Active Projects', value: '142', icon: '🌱' },
            { label: 'Market Cap', value: '$84M', icon: '📊' },
            { label: 'Partners', value: '500+', icon: '🤝' },
          ].map((stat, i) => (
            <div key={i} className="py-12 px-6 group hover:bg-white/[0.02] transition-colors">
              <div className="flex items-center gap-2 mb-2 opacity-50 group-hover:opacity-100 transition-opacity">
                 <span className="text-lg grayscale group-hover:grayscale-0 transition-all">{stat.icon}</span>
              </div>
              <div className="text-4xl md:text-5xl font-medium text-white mb-2 group-hover:text-emerald-300 transition-colors">
                {stat.value}
              </div>
              <div className="text-xs font-mono text-slate-500 uppercase tracking-widest">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- MISSION / TECH --- */}
      <div id="mission" className="py-32 px-6 bg-[#050505] relative overflow-hidden">
        {/* Background blobs for color */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="mb-24 max-w-3xl">
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-sm mb-6">
              <Layers className="w-4 h-4" />
              <span>INTELLIGENT VERIFICATION</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-medium text-white mb-8 leading-tight">
              Data-Driven <br /> Climate Action.
            </h2>
            <p className="text-xl text-slate-400 leading-relaxed font-light">
              We verify projects using <span className="text-emerald-300">satellite telemetry</span> and on-chain ledger technology. 
              Ensure your impact is real, measurable, and permanent.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <FeatureCard 
              icon={ShieldCheck} 
              title="Verified Quality" 
              desc="Every credit is verified by independent bodies like Verra and Gold Standard. Zero double counting." 
            />
            <FeatureCard 
              icon={Globe} 
              title="Global Scale" 
              desc="From the Amazon rainforest to renewable energy in India, our portfolio spans 40+ countries." 
            />
            <FeatureCard 
              icon={Cpu} 
              title="API First" 
              desc="Integrate carbon offsetting directly into your checkout flow with our developer-friendly API." 
            />
          </div>
        </div>
      </div>

      {/* --- CONTACT SECTION --- */}
      <div id="about" className="py-32 border-t border-white/10 bg-[#0A0A0A]">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-20">
            <div>
              <h2 className="text-4xl md:text-6xl font-medium text-white mb-8">Partner with us.</h2>
              <p className="text-xl text-slate-400 font-light mb-12">
                Ready to institutionalize your climate strategy? We help large enterprises measure and neutralize their footprint.
              </p>
              
              <div className="space-y-8">
                <div className="flex items-center gap-6 p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-500/50 transition-colors cursor-pointer group">
                  <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center text-white group-hover:bg-emerald-500 group-hover:text-black transition-colors">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">General Inquiries</p>
                    <p className="text-white text-lg">hello@offset.io</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-6 p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-500/50 transition-colors cursor-pointer group">
                  <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center text-white group-hover:bg-emerald-500 group-hover:text-black transition-colors">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Headquarters</p>
                    <p className="text-white text-lg">123 Innovation Dr, Tech City</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 p-8 rounded-3xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
              
              <h3 className="text-2xl font-medium text-white mb-8 flex items-center gap-3">
                <Zap className="w-5 h-5 text-emerald-400" /> Initialize Request
              </h3>
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-2 gap-6">
                   <div className="space-y-2">
                      <label className="text-xs font-mono text-slate-500 uppercase">First Name</label>
                      <input type="text" className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-4 text-white focus:border-emerald-500 focus:outline-none transition-colors placeholder:text-slate-700" placeholder="Jane" />
                   </div>
                   <div className="space-y-2">
                      <label className="text-xs font-mono text-slate-500 uppercase">Last Name</label>
                      <input type="text" className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-4 text-white focus:border-emerald-500 focus:outline-none transition-colors placeholder:text-slate-700" placeholder="Doe" />
                   </div>
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-mono text-slate-500 uppercase">Work Email</label>
                    <input type="email" className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-4 text-white focus:border-emerald-500 focus:outline-none transition-colors placeholder:text-slate-700" placeholder="jane@company.com" />
                </div>
                <button className="w-full bg-emerald-500 text-black font-bold py-5 rounded-xl hover:bg-emerald-400 transition-colors mt-4 shadow-lg shadow-emerald-900/20">
                  Submit Request
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}