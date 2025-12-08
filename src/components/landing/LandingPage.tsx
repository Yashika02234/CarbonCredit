import React, { useState, useEffect } from 'react';
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
  Wifi,
} from 'lucide-react';

// --- SUB-COMPONENTS ---

// 1. Data Console (HUD Element)
const DataConsole = () => (
  <div className="relative z-10 hidden lg:block animate-fade-in-right">
    <div className="bg-card/90 backdrop-blur-md border border-border rounded-2xl p-6 shadow-xl w-full max-w-sm ml-auto relative overflow-hidden group hover:border-primary/50 transition-colors">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent h-[200%] w-full animate-scan pointer-events-none" />

      <div className="flex items-center justify-between mb-6 border-b border-border/50 pb-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
            <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-primary animate-ping opacity-75" />
          </div>
          <span className="text-xs font-mono text-primary uppercase tracking-widest font-bold">
            Live Telemetry
          </span>
        </div>
        <Wifi className="w-4 h-4 text-muted-foreground" />
      </div>

      <div className="space-y-4 font-mono text-xs relative z-10">
        <div className="flex items-center justify-between p-2 rounded hover:bg-muted/20 transition-colors">
          <span className="text-muted-foreground flex items-center gap-2">
            🛰️ Sat-Link A4
          </span>
          <span className="text-primary font-bold">CONNECTED</span>
        </div>
        <div className="flex items-center justify-between p-2 rounded hover:bg-muted/20 transition-colors">
          <span className="text-muted-foreground flex items-center gap-2">
            🌳 Bio-Density
          </span>
          <span className="text-foreground">
            94% <span className="text-muted-foreground">|</span> High
          </span>
        </div>
        <div className="flex items-center justify-between p-2 rounded hover:bg-muted/20 transition-colors">
          <span className="text-muted-foreground flex items-center gap-2">
            💧 Blue Carbon
          </span>
          <span className="text-cyan-500">VERIFIED</span>
        </div>
      </div>
    </div>
  </div>
);

// 2. News/Feature Overlay Card
const NewsCard = () => (
  <div className="absolute bottom-8 right-8 z-20 max-w-sm w-full hidden lg:block animate-slide-in-up">
    <div className="bg-card/90 backdrop-blur-xl border border-border p-5 rounded-2xl shadow-xl flex gap-5 items-center group cursor-pointer hover:border-primary/30 transition-all hover:-translate-y-1">
      <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0 border border-border relative">
        <div className="absolute inset-0 bg-primary/10 mix-blend-overlay z-10" />
        <img
          src="https://images.unsplash.com/photo-1516214104703-d870798883c5?q=80&w=1000&auto=format&fit=crop"
          alt="Project"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-[10px] font-bold font-mono text-primary uppercase tracking-widest">
            New Listing
          </span>
          <ArrowUpRight className="w-3 h-3 text-muted-foreground group-hover:text-foreground transition-colors" />
        </div>
        <h3 className="text-base font-medium text-foreground leading-tight mb-1 group-hover:text-primary transition-colors">
          Rimba Raya Reserve
        </h3>
        <p className="text-xs text-muted-foreground line-clamp-1">
          Borneo, Indonesia • Peat Swamp
        </p>
      </div>
    </div>
  </div>
);

// 3. Feature Card (Grid Items)
const FeatureCard = ({
  icon: Icon,
  title,
  desc,
  delay,
}: {
  icon: any;
  title: string;
  desc: string;
  delay: string;
}) => (
  <div
    className="group p-8 rounded-3xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:-translate-y-1"
    style={{ animationDelay: delay }}
  >
    <div className="h-12 w-12 rounded-2xl bg-muted/50 border border-border flex items-center justify-center mb-6 text-primary group-hover:scale-110 group-hover:bg-primary/10 transition-all">
      <Icon className="h-6 w-6" />
    </div>
    <h3 className="text-xl font-medium text-foreground mb-3">{title}</h3>
    <p className="text-muted-foreground leading-relaxed text-sm font-light">
      {desc}
    </p>
  </div>
);

// 4. Stat Item
const StatItem = ({
  label,
  value,
  index,
  icon: Icon,
  color = 'text-foreground',
}: {
  label: string;
  value: string;
  index: number;
  icon: any;
  color?: string;
}) => (
  <div
    className="py-10 px-6 group hover:bg-muted/20 transition-colors border-r border-border last:border-r-0"
    style={{ animationDelay: `${index * 150}ms` }}
  >
    <div className="flex items-center gap-2 mb-3 opacity-60 group-hover:opacity-100 transition-opacity">
      <Icon className={`w-5 h-5 ${color}`} />
    </div>
    <div
      className={`text-4xl md:text-5xl font-bold mb-2 ${color} tracking-tighter`}
    >
      {value}
    </div>
    <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
      {label}
    </div>
  </div>
);

export default function LandingPage({
  onOpenAuth,
}: {
  onOpenAuth: (mode: 'login' | 'signup') => void;
}) {
  const [scrolled, setScrolled] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    // Base uses semantic colors
    <div className="bg-background text-foreground font-sans selection:bg-primary/30">
      {/* --- HERO SECTION --- */}
      <div
        id="home"
        className="relative h-screen w-full overflow-hidden flex flex-col justify-center border-b border-border"
      >
        {/* 1. Immersive Background (Adaptive Opacity/Saturation) */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
            alt="Satellite Map"
            className="w-full h-full object-cover scale-110 opacity-70 saturate-100 dark:opacity-40"
            style={{
              transform: `translateY(${scrolled * 0.2}px) scale(1.1)`,
              animationDuration: '120s',
            }}
          />

          {/* Soft color overlays for light theme */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background/40 to-accent/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

          {/* Subtle grid using slate-like tone */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.04)_1px,transparent_1px)] bg-[size:100px_100px] opacity-30 dark:opacity-40" />
        </div>

        {/* 2. Hero Content */}
        <div className="relative z-20 container mx-auto px-6 lg:px-12 pt-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text Content */}
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-3 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/10 backdrop-blur-md text-sm mb-8 animate-fade-in uppercase tracking-widest text-primary shadow-sm">
                <Activity className="w-3 h-3 animate-pulse" />
                Global Network Active
              </div>

              <h1 className="text-6xl md:text-7xl lg:text-8xl font-medium text-foreground leading-[0.95] tracking-tight mb-8 animate-in slide-in-from-bottom-6 duration-1000">
                Digitizing <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-teal-400 to-cyan-500 animate-gradient-x">
                  Nature&apos;s Value.
                </span>
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed mb-10 font-light animate-in slide-in-from-bottom-8 duration-1000 delay-100 border-l-2 border-border pl-6">
                AI-driven verification. Satellite precision.
                <span className="text-foreground font-medium">
                  {' '}
                  The new standard for carbon trading.
                </span>
              </p>

              {/* Buttons */}
              <div className="flex flex-wrap gap-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    onOpenAuth('signup');
                  }}
                  className="h-14 px-8 rounded-full bg-primary text-primary-foreground font-bold text-sm uppercase tracking-widest hover:opacity-90 transition-all hover:scale-105 flex items-center gap-2 shadow-lg"
                >
                  Start Offsetting
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .getElementById('mission')
                      ?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="h-14 px-8 rounded-full border border-input bg-background/50 backdrop-blur-md text-foreground font-medium hover:bg-background/80 transition-all hover:border-primary/30"
                >
                  Explore Technology
                </button>
              </div>
            </div>

            {/* Right: Data Console */}
            <div className="flex justify-end">
              <DataConsole />
            </div>
          </div>
        </div>

        {/* 3. Floating News Card */}
        <NewsCard />
      </div>

      {/* --- DATA STRIP --- */}
      <div className="border-y border-border bg-card/70 backdrop-blur-sm relative z-20">
        <div className="container mx-auto px-6 lg:px-12 grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
          <StatItem
            label="CO2 Removed"
            value="2.5M t"
            index={0}
            color="text-foreground"
            icon={Layers}
          />
          <StatItem
            label="Active Projects"
            value="142"
            index={1}
            color="text-primary"
            icon={Globe}
          />
          <StatItem
            label="Market Cap"
            value="$84M"
            index={2}
            color="text-blue-500"
            icon={BarChart3}
          />
          <StatItem
            label="Partners"
            value="500+"
            index={3}
            color="text-pink-500"
            icon={ShieldCheck}
          />
        </div>
      </div>

      {/* --- MISSION / TECH --- */}
      <div id="mission" className="py-32 px-6 bg-background relative overflow-hidden">
        {/* Background blobs for color */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="mb-24 max-w-3xl">
            <div className="flex items-center gap-2 text-primary font-mono text-xs mb-6 uppercase tracking-widest">
              <Layers className="w-4 h-4" /> Intelligent Verification
            </div>
            <h2 className="text-4xl md:text-6xl font-medium text-foreground mb-8 leading-tight tracking-tight">
              Data-Driven <br /> Climate Action.
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed font-light">
              We verify projects using{' '}
              <span className="text-primary font-medium">
                satellite telemetry
              </span>{' '}
              and on-chain ledger technology. Ensure your impact is real,
              measurable, and permanent.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <FeatureCard
              icon={ShieldCheck}
              title="Verified Quality"
              desc="Every credit is verified by independent bodies like Verra and Gold Standard. Zero double counting."
              delay="0ms"
            />
            <FeatureCard
              icon={Globe}
              title="Global Scale"
              desc="From the Amazon rainforest to renewable energy in India, our portfolio spans 40+ countries."
              delay="150ms"
            />
            <FeatureCard
              icon={Cpu}
              title="API First"
              desc="Integrate carbon offsetting directly into your checkout flow with our developer-friendly API."
              delay="300ms"
            />
          </div>
        </div>
      </div>

      {/* --- CONTACT SECTION --- */}
      <div id="about" className="py-32 border-t border-border bg-card">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-20">
            <div>
              <h2 className="text-4xl md:text-6xl font-medium text-foreground mb-8 tracking-tight">
                Partner with us.
              </h2>
              <p className="text-lg text-muted-foreground font-light mb-12">
                Ready to institutionalize your climate strategy? We help large
                enterprises measure and neutralize their footprint.
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-6 p-6 rounded-xl bg-card/60 border border-border hover:border-primary/50 transition-colors cursor-pointer group">
                  <div className="h-12 w-12 rounded-full bg-background flex items-center justify-center text-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1 font-bold">
                      General Inquiries
                    </p>
                    <p className="text-foreground text-lg group-hover:text-primary transition-colors">
                      hello@offset.io
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6 p-6 rounded-xl bg-card/60 border border-border hover:border-primary/50 transition-colors cursor-pointer group">
                  <div className="h-12 w-12 rounded-full bg-background flex items-center justify-center text-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1 font-bold">
                      Headquarters
                    </p>
                    <p className="text-foreground text-lg">
                      123 Innovation Dr, Tech City
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border p-10 rounded-3xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl pointer-events-none" />

              <h3 className="text-2xl font-medium text-foreground mb-8 flex items-center gap-3">
                <Zap className="w-5 h-5 text-primary" /> Initialize Request
              </h3>

              <form
                className="space-y-6"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="w-full bg-background/50 border border-input rounded-lg px-4 py-3 text-foreground focus:border-primary/50 focus:outline-none transition-colors placeholder:text-muted-foreground font-mono text-sm"
                      placeholder="Jane"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="w-full bg-background/50 border border-input rounded-lg px-4 py-3 text-foreground focus:border-primary/50 focus:outline-none transition-colors placeholder:text-muted-foreground font-mono text-sm"
                      placeholder="Doe"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                    Work Email
                  </label>
                  <input
                    type="email"
                    className="w-full bg-background/50 border border-input rounded-lg px-4 py-3 text-foreground focus:border-primary/50 focus:outline-none transition-colors placeholder:text-muted-foreground font-mono text-sm"
                    placeholder="jane@company.com"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground font-bold py-4 rounded-lg hover:opacity-90 transition-colors mt-4 uppercase tracking-widest text-sm shadow-xl"
                >
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
