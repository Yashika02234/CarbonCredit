import { useState, useEffect, useMemo, memo, useRef } from 'react';
import {
  Activity,
  Search,
  Loader2,
  Sparkles,
  Map as LocationIcon,
  BarChart3,
  Globe2,
  ChevronDown,
  ChevronRight,
  Filter,
  Layers,
} from 'lucide-react';

import type { CarbonCredit } from '@/lib/types';
import { mockCredits, REGISTRIES } from '@/lib/mock-data';
import Pagination from '@/components/common/Pagination';
import herovideo from '../../assets/images/hero.mp4';
import StatsRibbon from "@/components/explorer/StatsRibbon";

// --- 1. IMPORT LEAF IMAGES ---
// Replace these with your actual image paths.
// For now, I'll use placeholders so the code works.
import leafLeft from '../../assets/images/leaf-left.png'; // e.g. a leaf bunch on the left
import leafRight from '../../assets/images/leaf-right.png'; // e.g. a leaf branch on the right

/* ======================================================
   SCROLL REVEAL HOOK (FIXED)
====================================================== */
function useScrollReveal(dependencies: any[] = []) {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const elements = document.querySelectorAll('[data-reveal]');
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add('reveal-active');
              observer.unobserve(e.target);
            }
          });
        },
        { threshold: 0.1 }
      );

      elements.forEach((el) => observer.observe(el));
      return () => observer.disconnect();
    }, 100);

    return () => clearTimeout(timeoutId);
  }, dependencies);
}

/* ======================================================
   DATA FETCHING SIMULATION
====================================================== */
const useData = () => {
  const [projects, setProjects] = useState<CarbonCredit[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      setProjects(mockCredits);
      setIsLoading(false);
    }, 400);
    return () => clearTimeout(t);
  }, []);

  return { projects, isLoading };
};

/* ======================================================
   EMOJI FILTERS CONFIG
====================================================== */
const EMOJI_FILTERS = [
  { id: 'all', label: 'All Assets', emoji: '🌍' },
  { id: 'forest', label: 'Forestry', emoji: '🌳', types: ['Forestry (REDD+)'] },
  { id: 'renewable', label: 'Renewables', emoji: '⚡️', types: ['Renewable Energy'] },
  { id: 'solar', label: 'Solar', emoji: '☀️', types: ['Renewable Energy'] },
  { id: 'wind', label: 'Wind', emoji: '🌬️', types: ['Renewable Energy'] },
  { id: 'community', label: 'Community', emoji: '🤝', types: ['Community Projects'] },
  { id: 'blue', label: 'Blue Carbon', emoji: '🌊', types: ['Blue Carbon'] },
  { id: 'waste', label: 'Waste', emoji: '♻️', types: ['Waste Recovery'] },
  { id: 'tech', label: 'Tech Removal', emoji: '🤖', types: ['Tech-Based Removal'] },
];

/* ======================================================
   SIDEBAR FILTERS
====================================================== */
const SidebarFilters = memo(({ filters, setFilters }: any) => (
  <aside className="w-full lg:w-80 shrink-0 relative z-10">
    <div className="sticky top-28 bg-white/80 backdrop-blur-md border border-[#30574E]/10 rounded-[28px] p-8 space-y-8 shadow-[0_20px_50px_rgba(48,87,78,0.05)]">
      <div className="flex items-center gap-2 mb-2">
        <Filter className="w-4 h-4 text-[#30574E]" />
        <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#30574E]">
          System Filters
        </h3>
      </div>

      <div className="relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[#30574E] transition-colors" />
        <input
          aria-label="Search carbon credit projects"
          className="pl-12 pr-4 py-4 w-full rounded-2xl bg-[#f3f4ff]/50 border border-transparent focus:bg-white focus:border-[#30574E]/20 focus:ring-2 focus:ring-[#30574E]/10 text-sm outline-none transition-all"
          placeholder="Search projects"
          value={filters.search}
          onChange={(e) =>
            setFilters({ ...filters, search: e.target.value })
          }
        />
      </div>

      <div className="space-y-6">
        {[
          { label: 'Asset Registry', key: 'registry', options: ['all', ...REGISTRIES] },
          { label: 'Project Status', key: 'status', options: ['all', 'Active', 'Retired', 'Pending'] },
          { label: 'Vintage Year', key: 'vintage', options: ['all', '2021', '2022', '2023', '2024'] },
        ].map((f) => (
          <div key={f.key} className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
              {f.label}
            </label>
            <div className="relative">
              <select
                className="w-full appearance-none rounded-xl bg-[#FCF1E7]/40 border border-[#FCF1E7] px-4 py-3 text-sm text-[#30574E] font-medium outline-none cursor-pointer hover:bg-[#FCF1E7]/60 focus:ring-2 focus:ring-[#30574E]/10 transition-all"
                value={filters[f.key]}
                onChange={(e) =>
                  setFilters({ ...filters, [f.key]: e.target.value })
                }
              >
                {f.options.map((o) => (
                  <option key={o} value={o}>
                    {o === 'all' ? `All ${f.label.split(' ')[1] || f.label}` : o}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#30574E] pointer-events-none" />
            </div>
          </div>
        ))}
      </div>

      <div className="pt-6 border-t border-[#30574E]/5">
        <p className="text-[9px] font-mono text-gray-400 uppercase tracking-tighter">
          Market ID: <span className="text-[#30574E]">OFFSET-PRO-X</span>
        </p>
      </div>
    </div>
  </aside>
));

/* ======================================================
   EMOJI FILTER ROW (keyboard nav + pulse)
====================================================== */
const EmojiFilterRow = memo(({ selected, onChange }: any) => {
  const btnRefs = useRef<HTMLButtonElement[]>([]);

  const handleKey = (e: React.KeyboardEvent, idx: number) => {
    if (e.key === 'ArrowRight') btnRefs.current[idx + 1]?.focus();
    if (e.key === 'ArrowLeft') btnRefs.current[idx - 1]?.focus();
    if (e.key === 'Enter') onChange(EMOJI_FILTERS[idx].id);
  };

  return (
    <div className="flex overflow-x-auto gap-6 px-4 py-6 no-scrollbar scroll-smooth relative z-10">
      {EMOJI_FILTERS.map((f, idx) => {
        const active = selected === f.id;
        return (
          <button
            key={f.id}
            ref={(el) => (btnRefs.current[idx] = el!)}
            onClick={() => onChange(f.id)}
            onKeyDown={(e) => handleKey(e, idx)}
            aria-pressed={active}
            className="flex flex-col items-center gap-3 shrink-0 group focus:outline-none"
          >
            <div
              className={`w-16 h-16 rounded-[22px] flex items-center justify-center text-2xl transition-all duration-300 will-change-transform
                ${active
                  ? 'bg-[#30574E] scale-110 shadow-[0_25px_45px_-15px_rgba(48,87,78,0.35)]'
                  : 'bg-white border border-gray-100 hover:border-[#30574E]/30 hover:-translate-y-1 hover:shadow-[0_20px_35px_-15px_rgba(48,87,78,0.25)]'
                }`}
            >
              {f.emoji}
            </div>
            <span className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${active ? 'text-[#30574E]' : 'text-gray-400 group-hover:text-gray-600'}`}>
              {f.label}
            </span>
          </button>
        );
      })}
    </div>
  );
});

/* ======================================================
   STATS STRIP (animated numbers)
====================================================== */
const AnimatedNumber = ({ value }: { value: number }) => {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 300;
    const step = value / (duration / 16);

    const id = setInterval(() => {
      start += step;
      if (start >= value) {
        setDisplay(value);
        clearInterval(id);
      } else setDisplay(start);
    }, 16);

    return () => clearInterval(id);
  }, [value]);

  return <>{Math.round(display)}</>;
};

const StatsStrip = ({ total, avgPrice, avgTrust }: any) => (
  <div className="flex flex-wrap gap-4 relative z-10">
    {[
      { l: 'Total Assets', v: total, i: Globe2, bg: 'bg-[#f3f4ff]' },
      { l: 'Avg Price', v: avgPrice, i: BarChart3, bg: 'bg-[#FCF1E7]/40', prefix: '$' },
      { l: 'Avg Trust', v: avgTrust, i: Activity, bg: 'bg-emerald-50', suffix: '%' },
    ].map(({ l, v, i: Icon, bg, prefix = '', suffix = '' }) => (
      <div key={l} className={`flex items-center gap-4 px-6 py-3 rounded-2xl ${bg}`}>
        <div className="p-2 rounded-lg bg-white shadow-sm">
          <Icon className="w-4 h-4 text-[#30574E]" />
          </div>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-0.5">{l}</p>
          <p className="text-base font-mono font-bold text-[#30574E] tracking-tight">
            {prefix}<AnimatedNumber value={Math.round(v)} />{suffix}
          </p>
        </div>
      </div>
    ))}
  </div>
);

/* ======================================================
   MARKET GRID (image parallax)
====================================================== */
const CreditGrid = memo(({ credits, onSelectProject }: any) => (
  <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 relative z-10">
    {credits.map((c: CarbonCredit, idx: number) => (
      <div
        key={c.id}
        onClick={() => onSelectProject(c)}
        data-reveal
        style={{ animationDelay: `${idx * 50}ms` }}
        className="reveal group bg-white/80 backdrop-blur-sm rounded-[28px] border border-gray-100 overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_40px_80px_rgba(48,87,78,0.1)]"
      >
        <div className="h-56 relative overflow-hidden">
          <img
            src={c.image}
            alt={c.projectName}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110 group-hover:-translate-y-1"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

          <div className="absolute top-4 left-4 z-10">
            <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-[9px] font-bold uppercase tracking-[0.15em] text-[#30574E] rounded-lg shadow-sm">
              {c.projectType}
            </span>
          </div>

          <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2">
            <LocationIcon className="w-3 h-3 text-white/80" />
            <span className="text-[10px] text-white font-medium tracking-wide">
              {c.location}, {c.country}
            </span>
          </div>
        </div>

        <div className="p-8">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-medium text-[#30574E] leading-tight line-clamp-2 max-w-[80%]">
              {c.projectName}
            </h3>
            <ChevronRight className="w-5 h-5 text-[#30574E]/20 group-hover:text-[#30574E] transition-all" />
          </div>

          <div className="flex items-center justify-between pt-6 border-t border-gray-50">
            <div>
              <p className="text-[9px] uppercase font-bold text-gray-400 tracking-widest mb-1">Market Price</p>
              <span className="text-xl font-mono font-bold text-[#30574E] tracking-tighter">${c.pricePerCredit.toFixed(2)}</span>
            </div>
            <div className="text-right">
              <p className="text-[9px] uppercase font-bold text-gray-400 tracking-widest mb-1">Trust Score</p>
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-12 bg-gray-100 rounded-full overflow-hidden hidden sm:block">
                  <div className="h-full bg-emerald-500" style={{ width: `${c.trustScore}%` }} />
                </div>
                <span className="text-sm font-mono font-bold text-emerald-600">{Math.round(c.trustScore)}%</span>
              </div>
            </div>
            </div>
        </div>
      </div>
    ))}
  </div>
));

/* ======================================================
   EXPLORER MAIN VIEW
====================================================== */
export default function Explorer({ onSelectProject }: { onSelectProject: (p: CarbonCredit) => void }) {
  const { projects, isLoading } = useData();
  const gridTopRef = useRef<HTMLDivElement>(null);
  const shouldScrollRef = useRef(false);

  const [filters, setFilters] = useState({
    search: '',
    registry: 'all',
    status: 'all',
    vintage: 'all',
    projectType: 'all',
  });

  const [page, setPage] = useState(1);
  const PER_PAGE = 9;

  const filtered = useMemo(() => {
    let data = [...projects];

    if (filters.search) {
      const q = filters.search.toLowerCase();
      data = data.filter((c) => c.projectName.toLowerCase().includes(q));
    }

    if (filters.registry !== 'all') data = data.filter((c) => c.registry === filters.registry);
    if (filters.status !== 'all') data = data.filter((c) => c.status === filters.status);
    if (filters.vintage !== 'all') data = data.filter((c) => c.vintage.toString() === filters.vintage);

    if (filters.projectType !== 'all') {
      const emoji = EMOJI_FILTERS.find((e) => e.id === filters.projectType);
      if (emoji?.types) data = data.filter((c) => emoji.types.includes(c.projectType));
    }

    return data;
  }, [projects, filters]);

  useEffect(() => setPage(1), [filters]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);

  const pageData = useMemo(() => {
    const start = (page - 1) * PER_PAGE;
    return filtered.slice(start, start + PER_PAGE);
  }, [filtered, page]);

  /* SCROLL ONLY WHEN PAGINATION CLICKED */
  useEffect(() => {
    if (!shouldScrollRef.current) return;

    gridTopRef.current?.scrollIntoView({ behavior: 'smooth' });
    shouldScrollRef.current = false;
  }, [page]);

  useScrollReveal([isLoading, page, filtered]);

  const avgPrice = filtered.reduce((a, c) => a + c.pricePerCredit, 0) / (filtered.length || 1);
  const avgTrust = filtered.reduce((a, c) => a + c.trustScore, 0) / (filtered.length || 1);

  return (
    <div className="min-h-screen bg-[#fcfdfc] text-[#30574E] font-sans selection:bg-[#30574E]/20 overflow-x-hidden relative">
      {/* --- 2. BACKGROUND LEAVES LAYER --- */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Left Leaf */}
        <img
          src={leafLeft}
          alt=""
          className="absolute top-[20%] -left-20 w-[300px] lg:w-[500px] opacity-50 blur-[1px] rotate-12"
        />
        {/* Right Leaf */}
        <img
          src={leafRight}
          alt=""
          className="absolute top-[40%] -right-20 w-[300px] lg:w-[500px] opacity-50 blur-[1px] -rotate-12"
        />
      </div>

      {/* HERO */}
      <div className="relative w-screen left-1/2 -ml-[50vw] mb-20 z-20">
        <video
          className="w-full h-[570px] object-cover"
          src={herovideo}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 flex items-center px-12">
          <div>
            <h1 className="text-6xl text-white font-semibold">Carbon Credit Explorer</h1>
            <p className="text-white/80 mt-4 max-w-lg">Discover and evaluate high-integrity climate assets.</p>
            <button className="mt-6 px-6 py-3 rounded-full bg-emerald-500 text-white flex items-center gap-2 hover:bg-emerald-400 transition-colors">
              Explore Assets <Sparkles className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
      <div className="relative -mt-20 z-30 flex justify-center">
        <StatsRibbon />
      </div>

      {/* MAIN */}
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-10 -mt-15 relative z-20" ref={gridTopRef}>
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          {/* --- 3. UPDATE SIDEBAR Z-INDEX AND BG OPACITY --- */}
          <SidebarFilters filters={filters} setFilters={setFilters} />

          <div className="flex-1 space-y-12 relative z-10">
            <div className="bg-white/80 backdrop-blur-md border border-gray-100 rounded-[32px] p-8 shadow-[0_30px_60px_rgba(48,87,78,0.04)] relative z-10">
              <div className="flex items-center justify-center gap-2 mb-8">
                <Layers className="w-4 h-4 text-[#30574E]" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                  Sector Discovery
                </span>
              </div>

              <div className="flex justify-center">
                <EmojiFilterRow
                  selected={filters.projectType}
                  onChange={(id: string) => setFilters({ ...filters, projectType: id })}
                />
              </div>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent relative z-10" />

            <StatsStrip total={filtered.length} avgPrice={avgPrice} avgTrust={avgTrust} />

            <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent relative z-10" />

            {isLoading ? (
              <div className="py-40 flex flex-col items-center justify-center text-center relative z-10">
                <Loader2 className="w-10 h-10 animate-spin text-[#30574E] mb-4" />
                <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-gray-400">
                  Accessing Distributed Ledger...
                </p>
              </div>
            ) : filtered.length > 0 ? (
              /* --- 4. UPDATE GRID CARDS BG OPACITY --- */
              <CreditGrid credits={pageData} onSelectProject={onSelectProject} />
            ) : (
              <div className="py-32 flex flex-col items-center justify-center text-center bg-[#f3f4ff]/50 backdrop-blur-sm rounded-[32px] border border-dashed border-gray-200 relative z-10">
                <h3 className="text-2xl font-medium mb-2 text-[#30574E]">
                  No {filters.projectType !== 'all' ? filters.projectType : ''} assets found
                </h3>
                <p className="text-gray-500 max-w-xs font-light">Try adjusting your filters.</p>
              </div>
            )}

            {totalPages > 1 && !isLoading && (
              <div className="pt-12 border-t border-gray-100 w-full flex justify-center pb-12 relative z-10">
                <Pagination
                  currentPage={page}
                  totalPages={totalPages}
                  onPageChange={(p) => {
                    shouldScrollRef.current = true;
                    setPage(p);
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}