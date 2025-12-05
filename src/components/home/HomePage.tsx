import React from 'react';
import {
  ArrowRight,
  Leaf,
  Sparkles,
  Globe2,
  Zap,
  ShieldCheck,
} from 'lucide-react';
import { mockCredits } from '../../lib/mock-data';
import { CarbonCredit } from '../../lib/types';

interface HomePageProps {
  onNavigate: (view: 'marketplace' | 'portfolio' | 'home' | 'about') => void;
}

const GlassCard = ({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`relative overflow-hidden rounded-3xl border border-white/10 bg-white/5/10 backdrop-blur-2xl p-5 md:p-6 transition-all duration-500 hover:border-emerald-400/40 hover:bg-white/[0.08] hover:-translate-y-1 hover:shadow-[0_24px_80px_rgba(15,23,42,0.85)] ${className}`}
  >
    {/* subtle glow on hover */}
    <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(circle_at_top,_rgba(52,211,153,0.22),_transparent_65%)]" />
    {children}
  </div>
);

export default function HomePage({ onNavigate }: HomePageProps) {
  const trending: CarbonCredit[] = mockCredits.slice(0, 3);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 pt-28 pb-24 relative overflow-hidden">
      {/* COSMIC BACKGROUND GLOWS */}
      <div className="pointer-events-none">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[480px] bg-emerald-500/25 blur-[150px] opacity-40" />
        <div className="absolute bottom-[-200px] right-[-120px] w-[600px] h-[420px] bg-blue-500/20 blur-[160px] opacity-50" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(148,163,184,0.18),_transparent_60%)] opacity-60" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 space-y-16">
        {/* HERO */}
        <section className="mt-2 animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-8">
          {/* Top chip + floating tags */}
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl text-xs font-medium text-emerald-200 animate-[pulse_2.6s_ease-in-out_infinite]">
              <Sparkles className="w-3.5 h-3.5" />
              <span className="tracking-[0.2em] uppercase">Dashboard</span>
            </div>

            <div className="hidden md:flex gap-2 text-[11px] text-slate-400">
              <span className="px-2 py-1 rounded-full border border-white/10 bg-black/30">
                Live market
              </span>
              <span className="px-2 py-1 rounded-full border border-white/10 bg-black/30">
                High-integrity only
              </span>
            </div>
          </div>

          {/* Title + Sub + CTAs */}
          <div className="grid gap-10 md:grid-cols-[minmax(0,1.7fr)_minmax(0,1.1fr)] items-start">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-white leading-tight">
                Your climate
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400">
                  command center.
                </span>
              </h1>

              <p className="mt-4 text-base md:text-lg text-slate-300 max-w-xl">
                See your impact at a glance, discover new verified projects, and
                retire carbon in a few clicks — all from one cosmic control room.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  onClick={() => onNavigate('marketplace')}
                  className="inline-flex items-center gap-2 rounded-xl bg-white text-slate-950 px-6 py-3 text-sm md:text-[15px] font-semibold shadow-[0_15px_45px_rgba(15,23,42,0.75)] hover:bg-emerald-50 hover:-translate-y-[1px] transition-all"
                >
                  Explore marketplace
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onNavigate('portfolio')}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-slate-100 hover:bg-white/10 hover:border-emerald-400/40 transition-all"
                >
                  View portfolio
                  <Leaf className="w-4 h-4 text-emerald-300" />
                </button>
              </div>
            </div>

            {/* Right side mini “status” stack */}
            <div className="space-y-4 md:space-y-5">
              <GlassCard className="group">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs uppercase tracking-[0.18em] text-slate-400">
                    Current footprint
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2 py-1 text-[11px] font-medium text-emerald-300 border border-emerald-400/30">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-60 animate-ping" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    </span>
                    live
                  </span>
                </div>
                <p className="text-3xl font-semibold text-white mb-1">
                  2,450 tCO₂e
                </p>
                <p className="text-xs text-slate-400">
                  tracked across scopes 1, 2 &amp; 3 this year
                </p>
              </GlassCard>

              <GlassCard className="group">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-300" />
                    <span className="text-xs uppercase tracking-[0.18em] text-slate-400">
                      Integrity
                    </span>
                  </div>
                  <span className="text-xs text-emerald-200">
                    Registry-verified
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-300">140 active projects</span>
                  <span className="text-slate-400 flex items-center gap-1">
                    <Globe2 className="w-4 h-4 text-blue-300" />
                    6 regions
                  </span>
                </div>
              </GlassCard>

              <GlassCard className="group cursor-pointer hover:scale-[1.01] transition-transform">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-9 w-9 rounded-2xl bg-emerald-500/15 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-emerald-300" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Suggested action</p>
                    <p className="text-sm font-medium text-white">
                      Retire credits for Q4 emissions
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => onNavigate('marketplace')}
                  className="text-xs text-emerald-300 hover:text-emerald-200 inline-flex items-center gap-1"
                >
                  Go to retirement flow
                  <ArrowRight className="w-3 h-3" />
                </button>
              </GlassCard>
            </div>
          </div>
        </section>

        {/* IMPACT STRIP */}
        <section className="rounded-3xl border border-white/10 bg-gradient-to-r from-emerald-500/15 via-slate-900 to-blue-500/10 px-5 md:px-7 py-5 md:py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-6">
          <div>
            <p className="text-[11px] uppercase tracking-[0.25em] text-emerald-100/80 mb-1">
              Impact so far
            </p>
            <p className="text-lg md:text-xl font-semibold text-white">
              2.5M tonnes of CO₂e retired through Offset.
            </p>
            <p className="text-xs md:text-sm text-emerald-50/80 mt-1">
              Roughly equivalent to taking 540,000 cars off the road for a year.
            </p>
          </div>
          <div className="flex gap-6 text-xs md:text-sm">
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-emerald-100/80 mb-1">
                Companies
              </p>
              <p className="text-white font-semibold text-base md:text-lg">
                300+
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-emerald-100/80 mb-1">
                Projects
              </p>
              <p className="text-white font-semibold text-base md:text-lg">
                140
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-emerald-100/80 mb-1">
                Regions
              </p>
              <p className="text-white font-semibold text-base md:text-lg">
                6+
              </p>
            </div>
          </div>
        </section>

        {/* RECOMMENDED / TRENDING PROJECTS */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-slate-400 mb-1">
                Recommended for you
              </p>
              <h2 className="text-lg md:text-xl font-semibold text-white">
                High-trust projects to explore next
              </h2>
            </div>
            <button
              onClick={() => onNavigate('marketplace')}
              className="hidden md:inline-flex items-center gap-1 text-xs text-emerald-300 hover:text-emerald-200"
            >
              View all projects
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {trending.map((p) => (
              <button
                key={p.id}
                onClick={() => onNavigate('marketplace')}
                className="group text-left rounded-2xl border border-white/10 bg-white/5/10 backdrop-blur-xl overflow-hidden transition-all duration-500 hover:border-emerald-400/50 hover:-translate-y-1 hover:shadow-[0_18px_60px_rgba(15,23,42,0.9)]"
              >
                <div className="relative h-32 overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.projectName}
                    className="h-full w-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                  <div className="absolute top-3 left-3 flex items-center gap-2 text-[10px]">
                    <span className="rounded-full bg-black/60 px-2 py-1 text-emerald-300 border border-emerald-500/40">
                      {p.trustScore} Trust
                    </span>
                    <span className="rounded-full bg-black/40 px-2 py-1 text-slate-200 border border-white/10">
                      {p.registry}
                    </span>
                  </div>
                </div>

                <div className="p-4 space-y-1.5">
                  <h3 className="text-sm font-semibold text-white line-clamp-1">
                    {p.projectName}
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    {p.location}, {p.country}
                  </p>
                  <div className="mt-2 flex items-center justify-between text-xs">
                    <span className="font-mono text-slate-200">
                      ${p.pricePerCredit.toFixed(2)} / t
                    </span>
                    <span className="inline-flex items-center gap-1 text-emerald-300 group-hover:translate-x-[1px] transition-transform">
                      View in market
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
