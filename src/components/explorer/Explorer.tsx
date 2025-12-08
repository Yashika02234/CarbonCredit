// src/components/explorer/Explorer.tsx
import { useState, useEffect, useMemo, memo } from 'react';
import {
  Leaf,
  Search,
  Loader2,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Activity,
  Map,
  BarChart3,
  Globe2,
} from 'lucide-react';

import type { CarbonCredit } from '../../lib/types';
import { mockCredits } from '../../lib/mock-data';

// ==========================================
// 1. DATA HOOK (SIMULATED LOAD)
// ==========================================

const useData = () => {
  const [projects, setProjects] = useState<CarbonCredit[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProjects(mockCredits);
      setIsLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  return { projects, isLoading };
};

// ==========================================
// 2. FILTER CONFIG WITH EMOJIS (MATCHING MOCK DATA TYPES)
// ==========================================

const EMOJI_FILTERS: {
  id: string;
  label: string;
  emoji: string;
  types?: string[];
}[] = [
  { id: 'all', label: 'All Assets', emoji: '🌍' },
  { id: 'forest', label: 'Forestry', emoji: '🌳', types: ['Forestry (REDD+)'] },
  { id: 'renewable', label: 'Renewables', emoji: '⚡️', types: ['Renewable Energy'] },
  {
    id: 'community',
    label: 'Community',
    emoji: '🤝',
    types: ['Community Projects'],
  },
  { id: 'blue', label: 'Blue Carbon', emoji: '🌊', types: ['Blue Carbon'] },
  { id: 'waste', label: 'Waste', emoji: '♻️', types: ['Waste Recovery'] },
  {
    id: 'tech',
    label: 'Tech Removal',
    emoji: '🤖',
    types: ['Tech-Based Removal'],
  },
];

// ------------------------------------------
// FilterBar (light theme) + STATUS filter
// ------------------------------------------

const FilterBar = memo(({ filters, setFilters }: any) => (
  <div className="flex flex-wrap gap-3 mb-4 overflow-x-auto pb-2 scrollbar-hide">
    {/* Search */}
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
      <input
        type="text"
        placeholder="Search projects by name, UNIC ID or location..."
        className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 outline-none w-72 shadow-inner"
        value={filters.search}
        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
      />
    </div>

    {/* Registry */}
    <select
      className="bg-white border border-gray-200 rounded-lg text-sm text-gray-700 px-4 py-2 outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-300 shadow-sm"
      value={filters.registry}
      onChange={(e) => setFilters({ ...filters, registry: e.target.value })}
    >
      <option value="all">All Registries</option>
      <option value="Verra (VCS)">Verra (VCS)</option>
      <option value="Gold Standard">Gold Standard</option>
      <option value="American Carbon Registry">American Carbon Registry</option>
      <option value="Climate Action Reserve">Climate Action Reserve</option>
      <option value="Puro.earth">Puro.earth</option>
    </select>

    {/* Vintage */}
    <select
      className="bg-white border border-gray-200 rounded-lg text-sm text-gray-700 px-4 py-2 outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-300 shadow-sm"
      value={filters.vintage}
      onChange={(e) => setFilters({ ...filters, vintage: e.target.value })}
    >
      <option value="all">All Vintages</option>
      <option value="2021">2021</option>
      <option value="2022">2022</option>
      <option value="2023">2023</option>
      <option value="2024">2024</option>
    </select>

    {/* Status (stored lowercase in mockCredits) */}
    <select
      className="bg-white border border-gray-200 rounded-lg text-sm text-gray-700 px-4 py-2 outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-300 shadow-sm"
      value={filters.status}
      onChange={(e) => setFilters({ ...filters, status: e.target.value })}
    >
      <option value="all">All Statuses</option>
      <option value="active">Active</option>
      <option value="retired">Retired</option>
      <option value="pending">Pending</option>
    </select>
  </div>
));

// ------------------------------------------
// Emoji Filter Row
// ------------------------------------------

const EmojiFilterRow = memo(
  ({
    selected,
    onChange,
  }: {
    selected: string;
    onChange: (id: string) => void;
  }) => (
    <div className="mt-4 rounded-2xl bg-white/70 border border-emerald-100 px-4 py-3 shadow-sm backdrop-blur">
      <div className="flex items-center justify-between mb-3 gap-2">
        <div className="flex items-center gap-2 text-xs text-emerald-700 font-semibold">
          <Sparkles className="w-4 h-4" />
          <span>Browse by theme</span>
        </div>
        <span className="text-[11px] text-gray-400 hidden sm:inline">
          Tap an emoji to filter categories
        </span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-4 w-full">
        {EMOJI_FILTERS.map((f) => {
          const active = selected === f.id;
          return (
            <button
              key={f.id}
              onClick={() => onChange(f.id)}
              className="flex flex-col items-center gap-2 group"
            >
              <div
                className={`w-16 aspect-square rounded-2xl flex items-center justify-center text-2xl border transition-all duration-200 relative
                ${
                  active
                    ? 'bg-gradient-to-br from-emerald-100 via-teal-100 to-sky-100 border-emerald-400 shadow-lg shadow-emerald-100 scale-[1.03]'
                    : 'bg-white border-gray-200 hover:border-emerald-300 hover:bg-emerald-50/70 hover:scale-[1.02]'
                }`}
              >
                <span className="relative z-10">{f.emoji}</span>
                {active && (
                  <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white animate-pulse" />
                )}
              </div>
              <span
                className={`text-[11px] font-medium tracking-wide text-center ${
                  active
                    ? 'text-emerald-700'
                    : 'text-gray-500 group-hover:text-emerald-600'
                }`}
              >
                {f.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  ),
);

// ------------------------------------------
// CreditGrid (cards)
// ------------------------------------------

const CreditGrid = memo(
  ({
    credits,
    sortBy,
    setSortBy,
    onSelectProject,
  }: {
    credits: CarbonCredit[];
    sortBy: string;
    setSortBy: (k: string) => void;
    onSelectProject: (p: CarbonCredit) => void;
  }) => {
    if (credits.length === 0)
      return (
        <div className="text-center text-gray-500 py-20">
          No projects found. Try adjusting your filters 🌱
        </div>
      );

    const getStatusStyle = (status: string) => {
      const s = status.toLowerCase();
      if (s === 'active') return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      if (s === 'retired') return 'bg-sky-50 text-sky-700 border-sky-100';
      if (s === 'pending') return 'bg-amber-50 text-amber-700 border-amber-100';
      return 'bg-gray-50 text-gray-600 border-gray-100';
    };

    const statusLabel = (status: string) =>
      status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();

    return (
      <div>
        {/* Sort controls */}
        <div className="flex flex-wrap items-center justify-end mb-4 gap-2 text-sm text-gray-500">
          <span className="flex items-center gap-1 text-xs">
            <BarChart3 className="w-3 h-3 text-emerald-500" />
            Sort by:
          </span>
          <button
            onClick={() => setSortBy('trustScore')}
            className={`px-2 py-1 rounded-full text-xs transition-colors ${
              sortBy === 'trustScore'
                ? 'bg-emerald-100 text-emerald-700 font-semibold'
                : 'hover:bg-gray-100 hover:text-emerald-700'
            }`}
          >
            Trust Score
          </button>
          <button
            onClick={() => setSortBy('pricePerCredit')}
            className={`px-2 py-1 rounded-full text-xs transition-colors ${
              sortBy === 'pricePerCredit'
                ? 'bg-emerald-100 text-emerald-700 font-semibold'
                : 'hover:bg-gray-100 hover:text-emerald-700'
            }`}
          >
            Price
          </button>
          <button
            onClick={() => setSortBy('vintage')}
            className={`px-2 py-1 rounded-full text-xs transition-colors ${
              sortBy === 'vintage'
                ? 'bg-emerald-100 text-emerald-700 font-semibold'
                : 'hover:bg-gray-100 hover:text-emerald-700'
            }`}
          >
            Newest
          </button>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {credits.map((c, idx) => (
            <div
              key={c.id}
              onClick={() => onSelectProject(c)}
              className="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-emerald-400/80 hover:shadow-2xl hover:shadow-emerald-100 transition-all cursor-pointer relative"
              style={{ animationDelay: `${idx * 30}ms` }}
            >
              {/* Image header */}
              <div className="h-40 relative overflow-hidden">
                <img
                  src={c.image}
                  alt={c.projectName}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
                <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur px-2 py-1 rounded text-[11px] text-emerald-700 font-medium flex items-center gap-1 shadow-sm border border-emerald-100">
                  <Leaf className="w-3 h-3 text-emerald-500" /> {c.registry}
                </div>
                <div className="absolute top-3 right-3 flex flex-col items-end gap-1">
                  <span className="text-[10px] bg-slate-900/80 text-white px-2 py-0.5 rounded-full font-mono shadow-sm">
                    {c.vintage}
                  </span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${getStatusStyle(
                      c.status,
                    )}`}
                  >
                    {statusLabel(c.status)}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 flex flex-col gap-3">
                <div className="flex justify-between items-start gap-3">
                  <div className="space-y-1">
                    <h3 className="font-semibold text-gray-900 group-hover:text-emerald-700 transition-colors line-clamp-2">
                      {c.projectName}
                    </h3>
                    <p className="text-[11px] text-gray-500 flex items-center gap-1">
                      <Map className="w-3 h-3 text-emerald-500" />
                      {c.location} • {c.country}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <div className="flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded-full text-[10px] text-emerald-700 font-mono border border-emerald-100">
                      <Activity className="w-3 h-3" />
                      {c.trustScore.toFixed(0)} TS
                    </div>
                    <span className="text-[10px] text-gray-400">
                      {c.availableCredits.toLocaleString()} t
                    </span>
                  </div>
                </div>

                <div className="h-px w-full bg-gradient-to-r from-emerald-100 via-gray-200 to-transparent" />

                <div className="flex justify-between items-center mt-2">
                  <span className="text-2xl font-bold text-gray-900">
                    ${c.pricePerCredit.toFixed(2)}
                  </span>
                  <button className="text-xs text-emerald-600 group-hover:text-emerald-700 font-semibold transition-colors flex items-center gap-1">
                    View Details
                    <span className="translate-x-0 group-hover:translate-x-0.5 transition-transform">
                      →
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  },
);

interface ExplorerProps {
  onSelectProject: (project: CarbonCredit) => void;
}

// Small stats strip under hero heading
const StatsStrip = ({
  total,
  avgPrice,
  avgTrust,
}: {
  total: number;
  avgPrice: number;
  avgTrust: number;
}) => (
  <div className="mt-4 mb-6 grid grid-cols-1 sm:grid-cols-3 gap-3 rounded-2xl bg-white/80 border border-emerald-100 p-4 shadow-sm backdrop-blur">
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center">
        <Globe2 className="w-4 h-4 text-emerald-600" />
      </div>
      <div>
        <p className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold">
          Assets
        </p>
        <p className="text-sm font-semibold text-gray-900">{total} assets</p>
      </div>
    </div>
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-xl bg-sky-100 flex items-center justify-center">
        <BarChart3 className="w-4 h-4 text-sky-600" />
      </div>
      <div>
        <p className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold">
          Avg Price
        </p>
        <p className="text-sm font-semibold text-gray-900">
          ${avgPrice.toFixed(2)} / t
        </p>
      </div>
    </div>
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center">
        <Activity className="w-4 h-4 text-amber-600" />
      </div>
      <div>
        <p className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold">
          Avg Trust Score
        </p>
        <p className="text-sm font-semibold text-gray-900">
          {avgTrust.toFixed(1)}%
        </p>
      </div>
    </div>
  </div>
);

// ==========================================
// 3. MAIN COMPONENT
// ==========================================

export default function Explorer({ onSelectProject }: ExplorerProps) {
  const { projects, isLoading } = useData();

  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 9;

  const [filters, setFilters] = useState({
    search: '',
    registry: 'all',
    country: 'all',
    vintage: 'all',
    status: 'all',
    projectType: 'all',
  });
  const [sortBy, setSortBy] = useState('trustScore');

  // Filter + sort
  const processedCredits = useMemo(() => {
    let credits: CarbonCredit[] = [...projects];

    if (filters.registry !== 'all')
      credits = credits.filter((c) => c.registry === filters.registry);
    if (filters.country !== 'all')
      credits = credits.filter((c) => c.country === filters.country);
    if (filters.vintage !== 'all')
      credits = credits.filter((c) => c.vintage.toString() === filters.vintage);
    if (filters.status !== 'all')
      credits = credits.filter(
        (c) => c.status.toLowerCase() === filters.status,
      );

    const emojiConfig = EMOJI_FILTERS.find(
      (f) => f.id === filters.projectType,
    );
    if (emojiConfig && emojiConfig.id !== 'all' && emojiConfig.types) {
      credits = credits.filter((c) => emojiConfig.types!.includes(c.projectType));
    }

    if (filters.search) {
      const term = filters.search.toLowerCase();
      credits = credits.filter(
        (c) =>
          c.projectName.toLowerCase().includes(term) ||
          c.unicId.toLowerCase().includes(term) ||
          c.location.toLowerCase().includes(term) ||
          c.country.toLowerCase().includes(term),
      );
    }

    if (sortBy === 'trustScore')
      credits.sort((a, b) => (b.trustScore || 0) - (a.trustScore || 0));
    else if (sortBy === 'vintage') credits.sort((a, b) => b.vintage - a.vintage);
    else if (sortBy === 'availableCredits')
      credits.sort(
        (a, b) => (b.availableCredits || 0) - (a.availableCredits || 0),
      );
    else if (sortBy === 'pricePerCredit')
      credits.sort((a, b) => a.pricePerCredit - b.pricePerCredit);

    return credits;
  }, [filters, sortBy, projects]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters, sortBy]);

  const { avgPrice, avgTrust } = useMemo(() => {
    if (processedCredits.length === 0) return { avgPrice: 0, avgTrust: 0 };
    const sumPrice = processedCredits.reduce(
      (acc, c) => acc + c.pricePerCredit,
      0,
    );
    const sumTrust = processedCredits.reduce(
      (acc, c) => acc + (c.trustScore || 0),
      0,
    );
    return {
      avgPrice: sumPrice / processedCredits.length,
      avgTrust: sumTrust / processedCredits.length,
    };
  }, [processedCredits]);

  const totalPages = Math.ceil(processedCredits.length / ITEMS_PER_PAGE);
  const paginatedCredits = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return processedCredits.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [processedCredits, currentPage]);

  if (isLoading && projects.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center bg-white">
        <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5fffb] text-slate-900">
      {/* HERO */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Moving fog orbs + grid (CSS in global file) */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="fog-orb fog-orb-1" />
          <div className="fog-orb fog-orb-2" />
          <div className="fog-orb fog-orb-3" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.04)_1px,transparent_1px)] bg-[size:80px_80px] opacity-40" />
        </div>

        {/* Top pill */}
        <div className="absolute top-10 inset-x-0 flex justify-center">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/80 border border-emerald-100 text-emerald-700 text-xs md:text-sm shadow-sm backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            Live Marketplace
            <span className="w-px h-3 bg-emerald-200" />
            <span className="flex items-center gap-1 text-[11px] text-emerald-600">
              <Activity className="w-3 h-3" />
              Real-time data
            </span>
          </div>
        </div>

        {/* Center content */}
        <div className="relative z-10 text-center px-4">
          <h1 className="text-[2.8rem] sm:text-[3.4rem] md:text-[4.2rem] lg:text-[4.8rem] font-extrabold tracking-tight leading-tight text-slate-900">
            Carbon Credit
          </h1>
          <h2 className="text-[2.4rem] sm:text-[3rem] md:text-[3.6rem] lg:text-[4rem] font-extrabold tracking-tight leading-tight mt-1">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500">
              Explorer
            </span>
          </h2>

          <p className="mt-5 text-sm sm:text-base md:text-lg text-slate-600 max-w-2xl mx-auto">
            Discover, verify, and trade tokenized carbon credits from registries
            worldwide with complete transparency and live intelligence.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3 text-[11px] text-gray-500">
            <span className="px-3 py-1 rounded-full bg-white/90 border border-gray-200 flex items-center gap-1 shadow-sm">
              <Globe2 className="w-3 h-3 text-emerald-500" />
              Global coverage
            </span>
            <span className="px-3 py-1 rounded-full bg-white/90 border border-gray-200 flex items-center gap-1 shadow-sm">
              <Sparkles className="w-3 h-3 text-amber-500" />
              High-integrity assets
            </span>
          </div>
        </div>

        {/* Down arrow */}
        <div className="absolute bottom-10 flex justify-center z-10">
          <svg
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
            className="text-gray-400 animate-bounce-slow"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M15.25 10.75L12 14.25L8.75 10.75"
            />
          </svg>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="relative z-10 bg-gray-50/90 border-t border-gray-200 shadow-[0_-20px_60px_rgba(15,23,42,0.06)] backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="h-1 w-full bg-gradient-to-r from-emerald-400 via-teal-400 to-sky-400 rounded-full mb-6" />

          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between mb-4">
            <div>
              <h3 className="text-3xl font-bold text-gray-900">
                Available Projects
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Filter, sort and explore high-integrity climate assets.
              </p>
            </div>
            <span className="text-gray-500 text-xs sm:text-sm">
              Showing {paginatedCredits.length} of {processedCredits.length} results
            </span>
          </div>

          <StatsStrip
            total={processedCredits.length}
            avgPrice={avgPrice}
            avgTrust={avgTrust}
          />

          <div className="mb-8">
            <FilterBar filters={filters} setFilters={setFilters} />
            <EmojiFilterRow
              selected={filters.projectType}
              onChange={(id) =>
                setFilters((prev) => ({ ...prev, projectType: id }))
              }
            />
          </div>

          <CreditGrid
            credits={paginatedCredits}
            sortBy={sortBy}
            setSortBy={setSortBy}
            onSelectProject={onSelectProject}
          />

          {/* PAGINATION (no stray 0) */}
          {processedCredits.length > ITEMS_PER_PAGE && totalPages > 1 && (
            <nav
              aria-label="Pagination"
              className="mt-12 flex items-center justify-center gap-3 py-4"
            >
              {/* Previous */}
              <button
                onClick={() => {
                  setCurrentPage((p) => Math.max(1, p - 1));
                  window.scrollTo({
                    top: window.innerHeight,
                    behavior: 'smooth',
                  });
                }}
                disabled={currentPage === 1}
                className="inline-flex items-center gap-2 px-4 h-10 rounded-md border border-gray-300 bg-white text-sm text-gray-500 hover:text-emerald-600 hover:border-emerald-400 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <span className="text-lg">‹</span>
                <span>Previous</span>
              </button>

              {/* Page numbers */}
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }).map((_, i) => {
                  const pageNum = i + 1;

                  // collapse middle pages with ellipsis when many pages
                  if (
                    totalPages > 7 &&
                    pageNum > 2 &&
                    pageNum < totalPages - 1 &&
                    Math.abs(pageNum - currentPage) > 1
                  ) {
                    if (pageNum === 3 || pageNum === totalPages - 2) {
                      return (
                        <span
                          key={`dots-${pageNum}`}
                          className="px-2 text-sm text-gray-400 select-none"
                        >
                          …
                        </span>
                      );
                    }
                    return null;
                  }

                  return (
                    <button
                      key={`page-${pageNum}`}
                      onClick={() => {
                        setCurrentPage(pageNum);
                        window.scrollTo({
                          top: window.innerHeight,
                          behavior: 'smooth',
                        });
                      }}
                      className={`min-w-10 h-10 px-3 rounded-md text-sm font-medium transition-all ${
                        currentPage === pageNum
                          ? 'bg-emerald-600 text-white shadow-[0_0_20px_rgba(16,185,129,0.35)]'
                          : 'bg-white border border-gray-300 text-gray-600 hover:text-emerald-600 hover:border-emerald-400'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              {/* Next */}
              <button
                onClick={() => {
                  setCurrentPage((p) => Math.min(totalPages, p + 1));
                  window.scrollTo({
                    top: window.innerHeight,
                    behavior: 'smooth',
                  });
                }}
                disabled={currentPage === totalPages}
                className="inline-flex items-center gap-2 px-4 h-10 rounded-md border border-gray-300 bg-white text-sm text-gray-500 hover:text-emerald-600 hover:border-emerald-400 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <span>Next</span>
                <span className="text-lg">›</span>
              </button>
            </nav>
          )}
        </div>
      </section>
    </div>
  );
}
