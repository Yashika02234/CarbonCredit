import { 
  ArrowRight, 
  Globe, 
  ShieldCheck, 
  BarChart3, 
  Mail, 
  MapPin 
} from 'lucide-react';
import { mockCredits } from '../../lib/mock-data';

// Infer the credit type from mockCredits
type Credit = (typeof mockCredits)[number];

// --- Types ---

interface FeatureCardProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  desc: string;
}

interface FloatingCardProps {
  credit: Credit;
  className: string;
  delay: string;
}

// --- Components ---

// 1. Feature Card (Glassmorphism)
const FeatureCard = ({ icon: Icon, title, desc }: FeatureCardProps) => (
  <div className="group relative p-6 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-500 hover:-translate-y-1">
    <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <div className="relative z-10">
      <div className="h-12 w-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center mb-4 text-emerald-400">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="text-xl font-medium text-white mb-2">{title}</h3>
      <p className="text-slate-400 leading-relaxed">{desc}</p>
    </div>
  </div>
);

// 2. Floating Credit Card (Miniature) for Hero Background
const FloatingCard = ({ credit, className, delay }: FloatingCardProps) => (
  <div 
    className={`absolute z-0 hidden lg:block w-64 rounded-2xl overflow-hidden bg-slate-900/80 backdrop-blur-md border border-white/10 shadow-2xl ${className}`}
    style={{ animationDelay: delay }}
  >
    <div className="h-32 relative">
      <img src={credit.image} alt="" className="w-full h-full object-cover opacity-80" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
    </div>
    <div className="p-4">
      <div className="flex items-center gap-2 text-xs text-emerald-400 mb-2">
        <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/20">
          {credit.status}
        </span>
        <span className="text-slate-500">•</span>
        <span className="text-slate-400">{credit.registry}</span>
      </div>
      <h4 className="text-sm font-medium text-white truncate">{credit.projectName}</h4>
    </div>
  </div>
);

export default function LandingPage({ onOpenAuth }: { onOpenAuth: (mode: 'login' | 'signup') => void }) {
  return (
    <div className="relative min-h-screen bg-[#050505] text-slate-200 overflow-hidden selection:bg-emerald-500/30">
      
      {/* --- COSMOS HERO SECTION --- */}
      <div id="home" className="relative pt-40 pb-32 px-6 flex flex-col items-center justify-center min-h-screen">
        
        {/* 1. Ambient Glow Background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/20 rounded-full blur-[120px] opacity-50 pointer-events-none" />
        
        {/* 2. Floating Cards (Orbiting Elements) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
           {/* Top Left */}
           <FloatingCard 
             credit={mockCredits[0]} 
             className="top-[15%] left-[10%] animate-float-slow -rotate-6 hover:z-10 hover:scale-105 transition-transform duration-500" 
             delay="0s"
           />
           {/* Bottom Left */}
           <FloatingCard 
             credit={mockCredits[1]} 
             className="bottom-[20%] left-[15%] animate-float-fast rotate-3 scale-90 opacity-80" 
             delay="2s"
           />
           {/* Top Right */}
           <FloatingCard 
             credit={mockCredits[2]} 
             className="top-[20%] right-[12%] animate-float-medium rotate-6" 
             delay="1s"
           />
           {/* Bottom Right */}
           <FloatingCard 
             credit={mockCredits[4]} 
             className="bottom-[25%] right-[18%] animate-float-slow -rotate-3 scale-95 opacity-90" 
             delay="3s"
           />
           
           {/* Background Stars */}
           <div className="absolute top-10 left-1/4 w-1 h-1 bg-white rounded-full animate-pulse" />
           <div className="absolute bottom-20 right-1/3 w-1.5 h-1.5 bg-emerald-400/50 rounded-full animate-pulse delay-700" />
           <div className="absolute top-1/3 right-10 w-1 h-1 bg-white/50 rounded-full animate-pulse delay-1000" />
        </div>

        {/* 3. Central Content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto space-y-8">
          
          {/* Notification Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-sm font-medium text-emerald-400 tracking-wide">Live Carbon Market Data</span>
          </div>

          {/* Headline */}
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-white leading-tight">
            Curate your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400 animate-text-shimmer bg-[length:200%_auto]">
              Climate Impact.
            </span>
          </h1>
          
          <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            The definitive platform for high-integrity carbon credits. 
            Join a network of forward-thinking companies neutralizing their footprint.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button 
              onClick={() => onOpenAuth('signup')}
              className="group h-14 px-8 rounded-full bg-white text-black font-bold text-lg hover:bg-emerald-50 transition-all hover:scale-105 flex items-center gap-2"
            >
              Start Offsetting 
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => document.getElementById('mission')?.scrollIntoView({ behavior: 'smooth' })}
              className="h-14 px-8 rounded-full border border-white/20 text-white font-medium hover:bg-white/10 transition-all backdrop-blur-sm"
            >
              How it works
            </button>
          </div>
        </div>
      </div>

      {/* --- STATS STRIP --- */}
      <div className="border-y border-white/5 bg-white/[0.02] backdrop-blur-sm">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-white/5">
          {[
            { label: 'Carbon Removed', value: '2.5M t', icon: '🌍' },
            { label: 'Active Projects', value: '140+', icon: '🌱' },
            { label: 'Countries', value: '32', icon: '🏳️' },
            { label: 'Partners', value: '5k+', icon: '🤝' },
          ].map((stat, i) => (
            <div key={i} className="py-12 text-center group cursor-default hover:bg-white/[0.02] transition-colors">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                {stat.value}
              </div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-widest flex items-center justify-center gap-2">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- MISSION SECTION --- */}
      <div id="mission" className="py-32 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Built on Trust.</h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">
              We only list projects that meet rigorous verification standards from the world's leading registries.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={ShieldCheck} 
              title="Verified Quality" 
              desc="Every credit is verified by independent bodies like Verra and Gold Standard. Zero double counting." 
            />
            <FeatureCard 
              icon={Globe} 
              title="Global Impact" 
              desc="From the Amazon rainforest to renewable energy in India, our portfolio spans the entire globe." 
            />
            <FeatureCard 
              icon={BarChart3} 
              title="Transparent Pricing" 
              desc="Direct access to project developers means more money goes to on-the-ground climate action." 
            />
          </div>
        </div>
      </div>

      {/* --- CONTACT / ABOUT SECTION --- */}
      <div id="about" className="py-32 border-t border-white/10 bg-gradient-to-b from-[#050505] to-slate-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Left: Info */}
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">Ready to lead?</h2>
              <p className="text-slate-400 mb-12 text-lg leading-relaxed">
                Whether you are a small business or a global enterprise, Offset helps you measure, reduce, and neutralize your carbon footprint with confidence.
              </p>
              
              <div className="space-y-8">
                <div className="flex items-center gap-5 group">
                  <div className="h-12 w-12 rounded-2xl bg-slate-900 flex items-center justify-center border border-slate-800 group-hover:border-emerald-500/50 transition-colors">
                    <Mail className="h-5 w-5 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Email Us</p>
                    <p className="text-white text-lg">hello@offset.io</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-5 group">
                  <div className="h-12 w-12 rounded-2xl bg-slate-900 flex items-center justify-center border border-slate-800 group-hover:border-emerald-500/50 transition-colors">
                    <MapPin className="h-5 w-5 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Visit Us</p>
                    <p className="text-white text-lg">123 Green Way, Eco City</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-3xl blur opacity-20" />
              <div className="relative bg-slate-900 border border-white/10 p-8 rounded-3xl shadow-2xl">
                <h3 className="text-xl font-bold text-white mb-6">Send us a Query</h3>
                <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                  <div>
                      <label className="block text-xs font-medium text-slate-400 uppercase mb-2 tracking-wider">Email Address</label>
                      <input type="email" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all" placeholder="you@example.com" />
                  </div>
                  <div>
                      <label className="block text-xs font-medium text-slate-400 uppercase mb-2 tracking-wider">Message</label>
                      <textarea className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all h-32 resize-none" placeholder="How can we help?"></textarea>
                  </div>
                  <button className="w-full bg-white text-slate-950 font-bold py-4 rounded-xl hover:bg-emerald-50 transition-colors">
                    Send Message
                  </button>
                </form>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}
