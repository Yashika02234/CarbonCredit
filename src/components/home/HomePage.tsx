// src/components/home/HomePage.tsx
import React, { useEffect, useState } from 'react';
import {
  ArrowRight,
  Map as MapIcon,
  Layers,
  Maximize2,
  Activity,
  FileText,
  TrendingUp,
  Cpu,
  Zap,
  ShieldCheck,
  Mail,
  Linkedin,
  Twitter,
  Leaf,
} from 'lucide-react';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

// Keep your project types and mock data import paths — these should already exist in your repo.
import type { CarbonCredit } from '@/lib/types';
import { mockCredits } from '@/lib/mock-data';

interface HomePageProps {
  onNavigate: (view: 'marketplace' | 'portfolio' | 'home' | 'about') => void;
}

/* ===========================
   Small shared components
   =========================== */

const StatBlock = ({
  label,
  value,
  unit,
  color = 'text-foreground',
  trend,
}: {
  label: string;
  value: string;
  unit?: string;
  color?: string;
  trend?: string;
}) => {
  // color is a tailwind text class (eg. 'text-emerald-600')
  // The inner progress bar uses a derived bg class
  const barBg = color.replace('text-', 'bg-');
  return (
    <div className="group cursor-default relative overflow-hidden">
      <div className="flex justify-between items-center mb-2">
        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground group-hover:text-primary transition-colors">
          {label}
        </p>
        {trend && (
          <span className="text-[10px] font-mono text-emerald-600 bg-emerald-50 px-1 rounded">
            {trend}
          </span>
        )}
      </div>
      <div className="flex items-baseline gap-1 relative z-10">
        <span className={`text-4xl md:text-5xl font-bold ${color} tracking-tight`}>
          {value}
        </span>
        {unit && <span className="text-lg font-medium text-muted-foreground">{unit}</span>}
      </div>

      <div className="h-1 w-full bg-slate-200 mt-4 rounded-full overflow-hidden">
        <div className={`h-full ${barBg} w-1/2 opacity-70 group-hover:w-full group-hover:opacity-100 transition-all duration-2000 ease-smooth`} />
      </div>
    </div>
  );
};

const ProjectCard: React.FC<{ project: CarbonCredit; onClick: () => void }> = ({ project, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="group relative h-[340px] sm:h-[360px] w-full overflow-hidden cursor-pointer bg-card border border-border hover:shadow-xl hover:-translate-y-1 transition-all duration-2000 rounded-2xl fade-up"
    >
      <div className="absolute inset-0">
        <img
          src={project.image}
          alt={project.projectName}
          className="h-full w-full object-cover transition-transform duration-2000 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
      </div>

      <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
        <span className="inline-flex items-center gap-2 px-2 py-1 bg-black/75 text-emerald-300 text-[10px] font-mono border border-emerald-400/40 uppercase tracking-wider rounded-md">
          <Activity className="w-3 h-3" /> Live Feed
        </span>
        {project.status === 'Selling Fast' && (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-amber-500 text-black text-[10px] font-mono uppercase tracking-wider rounded-md">
            Hot
          </span>
        )}
      </div>

      <div className="absolute inset-0 p-4 sm:p-6 flex flex-col justify-end z-10">
        <div className="transform transition-transform duration-2000 translate-y-4 group-hover:translate-y-0">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="bg-white text-slate-900 text-[10px] font-bold px-2 py-1 uppercase tracking-widest rounded">
              {project.registry}
            </span>
            <span className="text-emerald-300 text-[10px] sm:text-xs font-mono font-bold flex items-center gap-1 bg-black/60 px-2 py-1 rounded-full">
              <ShieldCheck className="w-3 h-3" /> {Math.round(project.trustScore)}% VERIFIED
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2 leading-tight line-clamp-2 group-hover:text-primary transition-colors">
            {project.projectName}
          </h3>

          <div className="h-px w-full bg-white/30 my-3 sm:my-4 scale-x-0 group-hover:scale-x-100 transition-transform duration-2000 origin-left" />

          <div className="flex justify-between items-end text-white gap-4">
            <div>
              <p className="text-[10px] text-slate-200/80 uppercase tracking-widest mb-1">
                Available Volume
              </p>
              <p className="text-sm sm:text-lg font-mono">
                {project.availableCredits.toLocaleString()} t
              </p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-slate-200/80 uppercase tracking-widest mb-1">
                Current Price
              </p>
              <p className="text-sm sm:text-lg font-mono">${project.pricePerCredit.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-0 left-0 w-4 h-4 border-l border-t border-white/60" />
      <div className="absolute bottom-0 right-0 w-4 h-4 border-r border-b border-white/60" />
    </div>
  );
};

const InsightCard = ({ category, title, date, icon: Icon }: any) => (
  <div className="group relative bg-card border border-border p-6 sm:p-8 hover:bg-muted/80 transition-all duration-2000 cursor-pointer overflow-hidden rounded-2xl shadow-sm fade-up">
    <div className="absolute top-0 right-0 p-4 opacity-30 group-hover:opacity-100 group-hover:text-primary transition-all">
      <ArrowRight className="w-5 h-5 -translate-x-2 group-hover:translate-x-0 transition-transform" />
    </div>
    <div className="flex items-center gap-3 mb-4">
      <div className="p-2 bg-primary/10 rounded text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
        <Icon className="w-4 h-4" />
      </div>
      <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
        {category}
      </span>
    </div>
    <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
      {title}
    </h3>
    <p className="text-xs sm:text-sm text-muted-foreground font-mono">{date}</p>

    <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-primary group-hover:w-full transition-all duration-2000" />
  </div>
);

/* ===========================
   Modern banner (replaces SignUpBanner)
   Works with dark/light theming
   =========================== */

const ModernBanner: React.FC = () => {
  return (
    <section
      aria-labelledby="modern-banner-title"
      className="relative py-20 bg-background dark:bg-slate-900 overflow-hidden border-t border-border"
    >
      {/* decorative orbs */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-emerald-400/20 dark:bg-emerald-500/10 rounded-full blur-2xl animate-float" />
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-cyan-400/20 dark:bg-cyan-500/10 rounded-full blur-3xl animate-float duration-30000" />
      <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
        <h2
          id="modern-banner-title"
          className="text-4xl sm:text-5xl font-semibold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-primary to-cyan-400 fade-up"
        >
          Trade Carbon Credits with Confidence
        </h2>

        <p className="text-muted-foreground dark:text-slate-300 max-w-xl mx-auto text-sm sm:text-base mb-10 leading-relaxed fade-in">
          Access premium, satellite-verified carbon credit markets with
          real-time intelligence and transparent pricing. Explore projects,
          manage your portfolio and retire emissions — all from one place.
        </p>

        <div className="flex justify-center gap-4 mt-6 fade-up">
          <button className="px-7 py-3 bg-primary text-primary-foreground rounded-full font-semibold shadow-lg hover:scale-105 transition-transform ease-smooth duration-200">
            Start Trading
          </button>

          <button className="px-7 py-3 border border-border rounded-full font-semibold text-foreground hover:border-primary hover:text-primary transition-all ease-smooth">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};

/* ===========================
   Footer
   =========================== */

const Footer: React.FC = () => (
  <footer className="bg-background border-t border-border pt-16 pb-8">
    <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-10 lg:gap-16 pb-12">
        <div className="col-span-2 md:col-span-1 space-y-4">
          <div className="flex items-center gap-2 text-xl font-bold text-primary">
            <Leaf className="w-6 h-6" />
            OffSet
          </div>
          <p className="text-sm text-muted-foreground">
            Precision carbon credit trading powered by satellite verification.
          </p>
          <div className="flex gap-4">
            <a href="#" aria-label="Twitter" className="text-muted-foreground hover:text-primary transition-colors">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="#" aria-label="LinkedIn" className="text-muted-foreground hover:text-primary transition-colors">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href="#" aria-label="Email" className="text-muted-foreground hover:text-primary transition-colors">
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">Product</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="#" className="hover:text-primary transition-colors">Marketplace</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Portfolio</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Insights</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Pricing</a></li>
          </ul>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">Company</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Press</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
          </ul>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">Resources</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="#" className="hover:text-primary transition-colors">Documentation</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">API Reference</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Support</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
          </ul>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">Legal</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Cookie Policy</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-muted-foreground gap-3">
        <span>&copy; {new Date().getFullYear()} CarbonVault. All rights reserved.</span>
        <div className="flex items-center gap-1">
          <ShieldCheck className="w-3 h-3 text-emerald-500" /> Verified by satellite imagery
        </div>
      </div>
    </div>
  </footer>
);

/* ===========================
   HomePage (main)
   =========================== */

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [scrolled, setScrolled] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // GSAP enter/scroll animations
  useEffect(() => {
    // fade-up
    gsap.utils.toArray<HTMLElement>('.fade-up').forEach((el) => {
      gsap.fromTo(
        el,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'ease-smooth',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    // fade-in
    gsap.utils.toArray<HTMLElement>('.fade-in').forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1.2,
          ease: 'ease-smooth',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    // cleanup ScrollTrigger instances on unmount
    return () => {
      try {
        ScrollTrigger.getAll().forEach((t) => t.kill());
      } catch (e) {
        // ignore
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20 font-sans overflow-x-hidden">
      <main>
        {/* HERO */}
        <section className="relative min-h-[80vh] md:min-h-[90vh] w-full flex items-end border-b border-border overflow-hidden bg-gradient-to-b from-background via-background/95 to-background pt-16">
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
              className="w-full h-full object-cover opacity-40 saturate-0"
              style={{
                transform: `translateY(${scrolled * 0.15}px) scale(1.05)`,
                transition: 'transform 0.2s ease-out',
              }}
              alt="Global map visualization"
            />
            <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
          </div>

          <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 pb-16 sm:pb-20 animate-in fade-in slide-in-from-bottom-4">
            <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-end">
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-2 sm:mb-4">
                  <div className="h-2 w-2 bg-primary rounded-full animate-pulse" />
                  <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-muted-foreground uppercase">
                    Global Portfolio Status
                  </span>
                </div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-foreground leading-[0.95] mb-2 sm:mb-4 fade-up">
                  Carbon <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-emerald-400 to-accent">
                    Intelligence.
                  </span>
                </h1>
                <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-md leading-relaxed fade-in">
                  Your organizational footprint is being neutralized across three
                  continents with satellite-verified precision.
                </p>
              </div>

              <div className="flex flex-col gap-6 md:gap-8 md:pl-10 lg:pl-20 mt-8 md:mt-0">
                <StatBlock label="Net Offset" value="2,450" unit="tCO₂e" />
                <div className="h-px w-full bg-border" />
                <div className="grid grid-cols-2 gap-6">
                  <StatBlock label="Scope 1 & 2" value="98%" color="text-emerald-600" />
                  <StatBlock label="Next Audit" value="14" unit="Days" />
                </div>
                <button
                  onClick={() => onNavigate('portfolio')}
                  className="mt-2 w-fit flex items-center gap-2 border-b border-foreground pb-1 hover:text-primary hover:border-primary transition-all text-[11px] sm:text-sm font-bold uppercase tracking-widest"
                >
                  View Full Analytics <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* MAP VISUALIZATION STRIP */}
        <section className="border-b border-border bg-background">
          <div className="flex flex-col md:flex-row min-h-[420px] md:h-[520px]">
            <div className="w-full md:w-1/3 p-6 sm:p-8 lg:p-10 flex flex-col justify-between border-b md:border-b-0 md:border-r border-border bg-card animate-in fade-in slide-in-from-left-4">
              <div className="space-y-4">
                <MapIcon className="w-8 h-8 sm:w-10 sm:h-10 text-primary mb-2 sm:mb-4" />
                <h2 className="text-2xl sm:text-3xl font-semibold mb-2 text-foreground">
                  Vectorized <br />
                  Impact.
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We digitize every hectare of forest you protect. Our AI extracts
                  features from satellite imagery to prove biomass density and prevent
                  encroachment.
                </p>
              </div>

              <div className="space-y-4 pt-6">
                <div className="flex items-center gap-4">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 bg-primary flex items-center justify-center text-primary-foreground font-bold rounded-lg shadow-sm text-xs sm:text-sm">
                    01
                  </div>
                  <div className="text-[10px] sm:text-xs font-medium uppercase tracking-wider text-foreground">
                    Feature Extraction
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 bg-muted flex items-center justify-center text-foreground font-bold rounded-lg text-xs sm:text-sm">
                    02
                  </div>
                  <div className="text-[10px] sm:text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Change Detection
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 bg-muted flex items-center justify-center text-foreground font-bold rounded-lg text-xs sm:text-sm">
                    03
                  </div>
                  <div className="text-[10px] sm:text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Credit Issuance
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full md:w-2/3 relative bg-slate-900 group overflow-hidden animate-in fade-in slide-in-from-right-4">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074&auto=format&fit=crop')] bg-cover bg-center grayscale opacity-50 group-hover:scale-105 transition-transform duration-2000" />

              <div className="absolute top-1/4 left-1/6 sm:left-1/4 w-24 sm:w-32 h-24 sm:h-32 border-2 border-primary bg-primary/20 backdrop-blur-sm rounded-md" />
              <div className="absolute top-1/3 left-1/2 w-40 sm:w-48 h-20 sm:h-24 border-2 border-cyan-400 bg-cyan-400/25 backdrop-blur-sm rounded-md" />
              <div className="absolute bottom-1/4 right-1/4 sm:right-1/3 w-32 sm:w-40 h-32 sm:h-40 border-2 border-amber-400 bg-amber-400/25 backdrop-blur-sm rounded-full" />

              <div className="absolute bottom-6 right-4 sm:bottom-8 sm:right-8 bg-black/80 backdrop-blur-md p-3 sm:p-4 border border-slate-700 max-w-xs rounded-xl text-xs sm:text-sm">
                <div className="flex items-center gap-2 mb-2 text-[10px] sm:text-[11px] font-mono text-primary-foreground">
                  <Layers className="w-3 h-3 text-primary-foreground" />
                  <span className="text-primary-foreground">LAYER: VEGETATION_INDEX</span>
                </div>
                <p className="text-[11px] sm:text-xs text-slate-100">
                  High-resolution analysis confirms 94% canopy retention in your Borneo portfolio.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* MARKETPLACE FEED */}
        <section className="bg-background">
          <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 py-14 sm:py-20">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-8 sm:mb-10 gap-4">
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
                  Active Opportunities
                </h2>
                <p className="mt-2 text-sm text-muted-foreground max-w-md">
                  Explore a live feed of high-integrity projects across regions and methodologies.
                </p>
              </div>
              <button
                onClick={() => onNavigate('marketplace')}
                className="hidden md:flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 transition-colors text-xs sm:text-sm uppercase tracking-widest"
              >
                Explore All <Maximize2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
              {mockCredits.slice(0, 6).map((project: CarbonCredit, i: number) => (
                <ProjectCard
                  key={project.id ?? i}
                  project={project}
                  onClick={() => onNavigate('marketplace')}
                />
              ))}
            </div>

            <button
              onClick={() => onNavigate('marketplace')}
              className="md:hidden mt-8 w-full py-3.5 sm:py-4 bg-primary text-primary-foreground font-semibold uppercase tracking-widest rounded-lg hover:bg-primary/90 transition-colors text-xs sm:text-sm"
            >
              View Marketplace
            </button>
          </div>
        </section>

        {/* INTELLIGENCE FEED */}
        <section className="bg-background border-t border-border">
          <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 py-16 sm:py-20">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 sm:mb-12 gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-primary font-mono text-[10px] sm:text-xs mb-1 uppercase tracking-[0.2em]">
                  <Zap className="w-4 h-4" />
                  <span>Strategic Intelligence</span>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-foreground max-w-xl">
                  Insights for the regenerative economy.
                </h2>
              </div>
              <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
                Stay ahead of regulatory changes and market dynamics with our expert analysis and satellite-verified data reports.
              </p>
            </div>

            <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
              <InsightCard category="Market Report" title="Q3 voluntary carbon market trends" date="OCT 2023 • 12 MIN READ" icon={TrendingUp} />
              <InsightCard category="Methodology" title="Satellite verification v2.0: deep dive" date="SEP 2023 • TECHNICAL PAPER" icon={Cpu} />
              <InsightCard category="Regulatory" title="Navigating Article 6 compliance" date="AUG 2023 • GUIDE" icon={FileText} />
            </div>
          </div>
        </section>

        {/* MODERN BANNER (replaces SignUpBanner) */}
        <ModernBanner />
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;
