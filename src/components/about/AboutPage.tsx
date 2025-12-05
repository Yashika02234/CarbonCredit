import React from 'react';
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
} from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 pt-28 pb-24 relative overflow-hidden">
      {/* COSMIC BACKGROUND */}
      <div className="pointer-events-none">
        <div className="absolute -top-40 -right-20 w-[520px] h-[520px] bg-emerald-600/20 blur-[140px] opacity-40" />
        <div className="absolute top-40 -left-32 w-[420px] h-[420px] bg-blue-500/15 blur-[140px] opacity-40" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(148,163,184,0.08),_transparent_60%)]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 space-y-16">
        {/* HERO SECTION */}
        <section className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl text-xs font-medium text-slate-300">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span className="tracking-[0.18em] uppercase">
              About Offset
            </span>
          </div>

          <div className="grid gap-10 md:grid-cols-[minmax(0,2fr)_minmax(0,1.4fr)] items-start">
            <div>
              <h1 className="text-4xl md:text-5xl font-semibold text-white leading-tight mb-4">
                We’re building the operating system
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400">
                  for climate-positive companies.
                </span>
              </h1>
              <p className="text-base md:text-lg text-slate-400 max-w-xl">
                Offset gives teams a single place to understand, reduce,
                and neutralize their carbon footprint — with verified projects,
                transparent pricing, and data you can trust.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>High-integrity carbon credits only</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <Globe2 className="w-4 h-4 text-blue-400" />
                  <span>Global project network</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6 shadow-[0_24px_80px_rgba(15,23,42,0.9)]">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-2xl bg-emerald-500/20 flex items-center justify-center">
                      <Leaf className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Lifetime impact</p>
                      <p className="text-lg font-semibold text-white">
                        2.5M tCO₂e
                      </p>
                    </div>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                    Audited annually
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm mt-4">
                  <div className="rounded-2xl bg-white/5 border border-white/10 p-3">
                    <p className="text-slate-400 text-xs mb-1">
                      Active companies
                    </p>
                    <p className="text-lg font-semibold">300+</p>
                  </div>
                  <div className="rounded-2xl bg-white/5 border border-white/10 p-3">
                    <p className="text-slate-400 text-xs mb-1">
                      Verified projects
                    </p>
                    <p className="text-lg font-semibold">140</p>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                      Backed by data
                    </p>
                    <p className="text-sm text-slate-300">
                      Registry-grade auditing & tracking
                    </p>
                  </div>
                  <button className="inline-flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300">
                    View how it works
                    <ArrowUpRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MISSION / VISION */}
        <section className="grid gap-8 md:grid-cols-3">
          <div className="col-span-1 md:col-span-1">
            <h2 className="text-sm font-semibold tracking-[0.18em] uppercase text-slate-400 mb-3">
              Our Mission
            </h2>
            <p className="text-xl font-semibold text-white">
              Make climate action
              <span className="text-emerald-300"> radically accessible </span>
              to every company, everywhere.
            </p>
          </div>

          <div className="md:col-span-2 space-y-4 text-sm text-slate-400">
            <p>
              Carbon markets are complex, fragmented, and often opaque.
              We built Offset to remove that friction — so teams can focus on
              doing meaningful work for the planet, not wrestling with spreadsheets
              and registry IDs.
            </p>
            <p>
              From API-driven carbon accounting to curated project portfolios,
              we bring transparency and trust to every tonne of CO₂e you retire.
            </p>
          </div>
        </section>

        {/* VALUES / PILLARS */}
        <section className="grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-white/5/10 backdrop-blur-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <h3 className="text-base font-semibold text-white">
                Integrity by default
              </h3>
            </div>
            <p className="text-sm text-slate-400">
              We only list projects that are verified by leading standards and
              undergo rigorous due diligence — no double counting, no greenwashing.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5/10 backdrop-blur-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-5 h-5 text-teal-300" />
              <h3 className="text-base font-semibold text-white">
                Design for teams
              </h3>
            </div>
            <p className="text-sm text-slate-400">
              Built for sustainability leaders, finance teams, and operators who
              need one shared source of truth across the organization.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5/10 backdrop-blur-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-5 h-5 text-blue-300" />
              <h3 className="text-base font-semibold text-white">
                Partnership, not just product
              </h3>
            </div>
            <p className="text-sm text-slate-400">
              We work directly with project developers, climate experts, and your
              internal teams to design impact strategies that last.
            </p>
          </div>
        </section>

        {/* IMPACT STRIP */}
        <section className="rounded-3xl border border-white/10 bg-gradient-to-r from-emerald-500/15 via-slate-900 to-blue-500/10 p-6 md:p-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-emerald-200 mb-2">
              Impact so far
            </p>
            <p className="text-2xl font-semibold text-white mb-2">
              2.5 million tonnes of CO₂e retired with Offset.
            </p>
            <p className="text-sm text-emerald-100/80 max-w-md">
              That’s equivalent to taking ~540,000 cars off the road for a year.
            </p>
          </div>
          <div className="flex gap-6 text-sm">
            <div>
              <p className="text-xs text-emerald-100/80 uppercase tracking-[0.18em] mb-1">
                Regions
              </p>
              <p className="text-white font-semibold text-lg">6+</p>
            </div>
            <div>
              <p className="text-xs text-emerald-100/80 uppercase tracking-[0.18em] mb-1">
                Projects
              </p>
              <p className="text-white font-semibold text-lg">140</p>
            </div>
            <div>
              <p className="text-xs text-emerald-100/80 uppercase tracking-[0.18em] mb-1">
                Partners
              </p>
              <p className="text-white font-semibold text-lg">300+</p>
            </div>
          </div>
        </section>

        {/* TEAM / COLLAB CARD */}
        <section className="grid gap-8 md:grid-cols-[minmax(0,1.7fr)_minmax(0,1.3fr)] items-start">
          <div className="space-y-4">
            <h2 className="text-sm font-semibold tracking-[0.18em] uppercase text-slate-400">
              The people behind Offset
            </h2>
            <p className="text-lg text-slate-200">
              We’re a small, focused team of engineers, designers, and climate
              nerds working across time zones — from product to policy.
            </p>
            <p className="text-sm text-slate-400">
              We’ve shipped products at modern SaaS companies, collaborated
              with leading climate scientists, and worked side-by-side with
              project developers in the field.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5/10 backdrop-blur-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Handshake className="w-5 h-5 text-emerald-300" />
              <h3 className="text-base font-semibold text-white">
                Work with Offset
              </h3>
            </div>
            <p className="text-sm text-slate-400 mb-4">
              Have a project you’d like to bring to the platform, or want to
              explore a custom climate program for your company?
            </p>
            <button className="inline-flex items-center gap-2 text-sm px-4 py-2 rounded-xl bg-white text-black font-semibold hover:bg-emerald-50 transition-all">
              Talk to our team
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
