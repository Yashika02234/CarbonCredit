import { useState, useEffect, useMemo, memo } from 'react';
import { 
  Leaf, 
  Search, 
  Loader2, 
  ChevronLeft, 
  ChevronRight, 
  Filter, 
  ArrowUpRight, 
  Map,
  Activity,
  Zap,
  Droplets,
  Users,
  Grid3X3,
  List,
  ArrowUpDown,
  Sun,
  Wind,
  Tractor,
  Recycle,
  Globe,
  Clock,
  Tag,
  X // Imported X for the remove button
} from 'lucide-react';

// ==========================================
// 1. LOCAL DEFINITIONS
// ==========================================

export interface CarbonCredit {
  id: string;
  projectName: string;
  pricePerCredit: number;
  location: string;
  vintage: number;
  registry: string;
  trustScore: number;
  availableCredits: number;
  status: string;
  projectType: string; 
  unicId: string;
  country: string;
  image: string; 
}

const PROJECT_TYPES = [
  'Forestry', 'Renewable', 'Blue Carbon', 'Community', 
  'Solar', 'Wind', 'Agriculture', 'Waste'
] as const;

const STATUSES = ['Active', 'Selling Fast', 'Coming Soon', 'Sold Out'];
const COUNTRIES = ['Brazil', 'Indonesia', 'India', 'USA', 'Philippines', 'Kenya', 'Peru'];

// Added Category Data for Emoji Filters
const CATEGORIES = [
  { id: 'all', label: 'All', emoji: '🌍' },
  { id: 'Forestry', label: 'Forest', emoji: '🌳' },
  { id: 'Renewable', label: 'Renewable', emoji: '⚡' },
  { id: 'Blue Carbon', label: 'Ocean', emoji: '🌊' },
  { id: 'Solar', label: 'Solar', emoji: '☀️' },
  { id: 'Wind', label: 'Wind', emoji: '💨' },
  { id: 'Agriculture', label: 'Agri', emoji: '🌾' },
  { id: 'Waste', label: 'Waste', emoji: '♻️' },
  { id: 'Community', label: 'Social', emoji: '🤝' },
];

// Helper to get realistic images
const getCategoryImage = (type: string, index: number) => {
  const collections: Record<string, string[]> = {
    Forestry: ['https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800', 'https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&q=80&w=800'],
    Renewable: ['https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&q=80&w=800', 'https://images.unsplash.com/photo-1497436072909-60f360e1d4b0?auto=format&fit=crop&q=80&w=800'],
    'Blue Carbon': ['https://images.unsplash.com/photo-1583212292454-1fe6229603b7?auto=format&fit=crop&q=80&w=800', 'https://images.unsplash.com/photo-1621451537084-482c73073a0f?auto=format&fit=crop&q=80&w=800'],
    Solar: ['https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=800'],
    Wind: ['https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?auto=format&fit=crop&q=80&w=800'],
    Agriculture: ['https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80&w=800'],
    default: ['https://images.unsplash.com/photo-1516214104703-d870798883c5?auto=format&fit=crop&q=80&w=800']
  };
  const list = collections[type] || collections.default;
  return list[index % list.length];
};

const MOCK_CREDITS: CarbonCredit[] = Array.from({ length: 120 }).map((_, i) => {
  const type = PROJECT_TYPES[i % PROJECT_TYPES.length];
  return {
    id: `c-${i}`,
    projectName: `Project ${type} Alpha-${i + 100}`,
    pricePerCredit: 12 + Math.random() * 35,
    location: `Region ${i}`,
    country: COUNTRIES[i % COUNTRIES.length],
    vintage: 2018 + (i % 6),
    registry: i % 2 === 0 ? 'Verra' : 'Gold Standard',
    trustScore: 80 + Math.floor(Math.random() * 19),
    availableCredits: 500 + i * 150,
    status: STATUSES[i % STATUSES.length],
    projectType: type,
    unicId: `UNI-${i}-${type.substring(0,3).toUpperCase()}`,
    image: getCategoryImage(type, i)
  };
});

const TYPE_CONFIG: Record<string, { color: string, border: string, bg: string, icon: any }> = {
  Forestry: { color: 'text-emerald-400', border: 'border-emerald-500/40', bg: 'bg-emerald-500/10', icon: Leaf },
  Renewable: { color: 'text-yellow-400', border: 'border-yellow-500/40', bg: 'bg-yellow-500/10', icon: Zap },
  'Blue Carbon': { color: 'text-cyan-400', border: 'border-cyan-500/40', bg: 'bg-cyan-500/10', icon: Droplets },
  Community: { color: 'text-pink-400', border: 'border-pink-500/40', bg: 'bg-pink-500/10', icon: Users },
  Solar: { color: 'text-orange-400', border: 'border-orange-500/40', bg: 'bg-orange-500/10', icon: Sun },
  Wind: { color: 'text-sky-300', border: 'border-sky-500/40', bg: 'bg-sky-500/10', icon: Wind },
  Agriculture: { color: 'text-lime-400', border: 'border-lime-500/40', bg: 'bg-lime-500/10', icon: Tractor },
  Waste: { color: 'text-purple-400', border: 'border-purple-500/40', bg: 'bg-purple-500/10', icon: Recycle },
  default: { color: 'text-slate-400', border: 'border-slate-500/40', bg: 'bg-slate-500/10', icon: Leaf }
};

const useData = () => {
  const [projects, setProjects] = useState<CarbonCredit[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProjects(MOCK_CREDITS);
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  return { projects, isLoading };
};

// ==========================================
// 2. UI COMPONENTS
// ==========================================

// New: Small Square Icon Filter (Restored)
const FilterTile = ({ active, label, emoji, onClick }: any) => (
  <button
    onClick={onClick}
    className="group flex flex-col items-center gap-2 focus:outline-none shrink-0"
  >
    <div 
      className={`
        relative flex items-center justify-center w-12 h-12 rounded-xl border transition-all duration-300
        ${active 
          ? 'bg-white/10 border-white/40 shadow-[0_0_15px_rgba(255,255,255,0.15)] scale-105' 
          : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/20'
        }
      `}
    >
      <span className="text-xl filter drop-shadow-md transform group-hover:scale-110 transition-transform duration-300">{emoji}</span>
      
      {/* Active Dot */}
      {active && (
        <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#050505] rounded-full flex items-center justify-center">
          <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
        </div>
      )}
    </div>
    <span className={`text-[9px] font-bold uppercase tracking-wider transition-colors ${active ? 'text-white' : 'text-slate-500 group-hover:text-slate-300'}`}>
      {label}
    </span>
  </button>
);

const FilterDropdown = ({ icon: Icon, value, onChange, options, label }: any) => (
  <div className="relative group">
    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-hover:text-emerald-400 transition-colors">
      <Icon className="w-4 h-4" />
    </div>
    <select 
      className="appearance-none bg-black/40 border border-white/10 rounded-xl py-3 pl-10 pr-8 text-sm text-slate-200 outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 hover:bg-white/5 transition-all w-full min-w-[140px] cursor-pointer"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="all" className="bg-slate-900">{label}</option>
      {options.map((opt: string) => (
        <option key={opt} value={opt} className="bg-slate-900">{opt}</option>
      ))}
    </select>
    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
      <ChevronLeft className="w-3 h-3 text-slate-500 -rotate-90" />
    </div>
  </div>
);

const FilterBar = memo(({ filters, setFilters, resultCount, sortBy, setSortBy }: any) => {
  // Helper to count active filters
  const activeFilters = useMemo(() => {
    return Object.entries(filters).filter(([key, value]) => 
      value !== 'all' && value !== '' && key !== 'projectType' // Project type handles its own tiles, but we can include it if needed
    );
  }, [filters]);

  const clearFilter = (key: string) => {
    setFilters((prev: any) => ({ ...prev, [key]: 'all' }));
  };

  const clearAll = () => {
    setFilters({
      search: '',
      registry: 'all',
      vintage: 'all',
      country: 'all',
      status: 'all',
      projectType: 'all'
    });
  };

  return (
    <div className="relative z-30 mb-8">
      <div className="flex flex-col gap-6 max-w-[1600px] mx-auto px-6">
        
        {/* Control Deck */}
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 bg-[#0A0A0A]/80 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-2xl">
          
          {/* Search */}
          <div className="relative group w-full xl:w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-500 group-focus-within:text-[#ec4899] transition-colors" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-3 bg-black/40 border border-white/10 rounded-xl text-sm placeholder-slate-500 text-white focus:outline-none focus:border-[#ec4899]/50 focus:ring-1 focus:ring-[#ec4899]/50 transition-all"
              placeholder="Search projects..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            />
          </div>

          {/* Filters Row */}
          <div className="flex flex-wrap items-center gap-3 flex-1 overflow-x-auto pb-2 xl:pb-0 scrollbar-hide">
            <FilterDropdown 
              icon={Filter}
              label="Registry: All" 
              value={filters.registry} 
              onChange={(v: string) => setFilters({...filters, registry: v})}
              options={['Verra', 'Gold Standard']}
            />
            
            <FilterDropdown 
              icon={Globe}
              label="Country: All" 
              value={filters.country} 
              onChange={(v: string) => setFilters({...filters, country: v})}
              options={COUNTRIES}
            />

            <FilterDropdown 
              icon={Clock}
              label="Vintage: All" 
              value={filters.vintage} 
              onChange={(v: string) => setFilters({...filters, vintage: v})}
              options={['2018', '2019', '2020', '2021', '2022', '2023']}
            />

            <FilterDropdown 
              icon={Tag}
              label="Status: All" 
              value={filters.status} 
              onChange={(v: string) => setFilters({...filters, status: v})}
              options={STATUSES}
            />
          </div>

          {/* Sort & Stats */}
          <div className="flex items-center gap-4 border-t xl:border-t-0 xl:border-l border-white/10 pt-4 xl:pt-0 xl:pl-4">
            <div className="flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
               <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest whitespace-nowrap">{resultCount} Assets</span>
            </div>
            
            <div className="h-8 w-px bg-white/10 hidden xl:block" />

            <div className="flex items-center gap-2 relative group">
               <ArrowUpDown className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
               <select 
                  className="bg-black/40 border border-white/10 rounded-xl py-2 pl-9 pr-4 text-sm text-white font-medium outline-none focus:border-white/20 cursor-pointer appearance-none hover:bg-white/5 transition-all"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
               >
                  <option value="trustScore" className="bg-slate-900">Sort: Trust Score</option>
                  <option value="priceAsc" className="bg-slate-900">Price: Low to High</option>
                  <option value="priceDesc" className="bg-slate-900">Price: High to Low</option>
                  <option value="vintage" className="bg-slate-900">Vintage (Newest)</option>
               </select>
            </div>
          </div>
        </div>

        {/* 2. Emoji Filter Row (Restored with Spacing) */}
        <div className="flex flex-col gap-4">
          <div className="flex items-start justify-between w-full gap-4 overflow-x-auto pb-4 pt-2 scrollbar-hide">
            {CATEGORIES.map((cat) => (
              <FilterTile
                key={cat.id}
                active={filters.projectType === cat.id}
                label={cat.label}
                emoji={cat.emoji}
                onClick={() => setFilters({ 
                  ...filters, 
                  projectType: filters.projectType === cat.id ? 'all' : cat.id // Toggle logic
                })}
              />
            ))}
          </div>

          {/* 3. Active Filters Display (New Feature) */}
          {(activeFilters.length > 0 || filters.search) && (
            <div className="flex flex-wrap items-center gap-2 animate-in fade-in slide-in-from-top-2">
              <span className="text-xs text-slate-500 uppercase tracking-wider font-bold mr-2">Active Filters:</span>
              
              {activeFilters.map(([key, value]) => (
                <button
                  key={key}
                  onClick={() => clearFilter(key)}
                  className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono rounded-lg hover:bg-emerald-500/20 hover:border-emerald-500/40 transition-all group"
                >
                  <span className="opacity-70 capitalize">{key}:</span> 
                  <span className="font-bold">{value as string}</span>
                  <X className="w-3 h-3 ml-1 opacity-50 group-hover:opacity-100" />
                </button>
              ))}

              {filters.search && (
                <button
                  onClick={() => setFilters({ ...filters, search: '' })}
                  className="flex items-center gap-1.5 px-3 py-1 bg-pink-500/10 border border-pink-500/20 text-pink-400 text-xs font-mono rounded-lg hover:bg-pink-500/20 transition-all group"
                >
                  <span className="opacity-70">Search:</span> 
                  <span className="font-bold">"{filters.search}"</span>
                  <X className="w-3 h-3 ml-1 opacity-50 group-hover:opacity-100" />
                </button>
              )}

              <button 
                onClick={clearAll}
                className="text-xs text-slate-500 hover:text-white ml-2 underline decoration-slate-700 underline-offset-4 hover:decoration-white transition-all"
              >
                Clear All
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

// Full Bleed Card
const ProjectCard = memo(({ project, onClick, index }: { project: CarbonCredit, onClick: () => void, index: number }) => {
  const config = TYPE_CONFIG[project.projectType] || TYPE_CONFIG.default;
  const Icon = config.icon;

  return (
    <div 
      onClick={onClick}
      className={`group relative h-[400px] bg-[#050505] border rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:border-white/20`}
      style={{ animationDelay: `${index * 50}ms` }} 
    >
      <div className="absolute inset-0 z-0">
        <img 
          src={project.image} 
          alt={project.projectName} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent opacity-80" />
      </div>

      <div className="absolute top-4 left-4 z-20 flex gap-2">
         <span className={`px-2.5 py-1 bg-black/60 backdrop-blur-xl border border-white/10 text-[10px] font-bold uppercase tracking-wider rounded-md flex items-center gap-1.5 ${config.color}`}>
           <Icon className="w-3 h-3" />
           {project.projectType}
         </span>
         {project.status === 'Selling Fast' && (
            <span className="px-2 py-1 bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[10px] font-bold uppercase tracking-wider rounded-md backdrop-blur-md">
              Hot
            </span>
         )}
      </div>

      <div className="absolute bottom-0 left-0 w-full p-6 z-20">
        <div className="transform transition-transform duration-300 translate-y-2 group-hover:translate-y-0">
          <h3 className="text-xl font-bold text-white leading-tight mb-2 drop-shadow-md line-clamp-2">
            {project.projectName}
          </h3>

          <div className="flex items-center gap-3 text-xs text-slate-300 mb-4 font-mono uppercase tracking-wide">
             <span className="flex items-center gap-1"><Map className="w-3 h-3 text-slate-400" /> {project.country}</span>
             <span className="text-slate-500">|</span>
             <span>{project.registry}</span>
             <span className="text-slate-500">|</span>
             <span>{project.vintage}</span>
          </div>

          <div className="flex items-center justify-between bg-white/10 backdrop-blur-md rounded-lg p-3 border border-white/10 group-hover:bg-white/20 transition-colors">
             <div>
                <p className="text-[9px] uppercase tracking-widest text-slate-300 mb-0.5">Price</p>
                <p className="text-lg font-mono text-white font-bold">${project.pricePerCredit.toFixed(2)}</p>
             </div>
             <div className="text-right">
                <p className="text-[9px] uppercase tracking-widest text-slate-300 mb-0.5">Trust Score</p>
                <div className={`text-sm font-mono font-bold flex items-center justify-end gap-1 ${project.trustScore > 90 ? 'text-emerald-400' : 'text-yellow-400'}`}>
                   <Activity className="w-3 h-3" /> {project.trustScore}%
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
});

// ==========================================
// 3. MAIN COMPONENT
// ==========================================

export default function Explorer({ onSelectProject }: { onSelectProject: (p: CarbonCredit) => void }) {
  const { projects, isLoading } = useData(); 
  
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 12;

  const [filters, setFilters] = useState({
    search: '',
    registry: 'all',
    vintage: 'all',
    country: 'all',
    status: 'all',
    projectType: 'all',
  });
  const [sortBy, setSortBy] = useState('trustScore');

  const processedCredits = useMemo(() => {
    let credits = [...projects]; 
    if (filters.registry !== 'all') credits = credits.filter((c) => c.registry === filters.registry);
    if (filters.vintage !== 'all') credits = credits.filter((c) => c.vintage.toString() === filters.vintage);
    if (filters.country !== 'all') credits = credits.filter((c) => c.country === filters.country);
    if (filters.status !== 'all') credits = credits.filter((c) => c.status === filters.status);
    if (filters.projectType !== 'all') credits = credits.filter((c) => c.projectType === filters.projectType);

    if (filters.search) {
      const term = filters.search.toLowerCase();
      credits = credits.filter((c) => 
        c.projectName.toLowerCase().includes(term) || c.unicId.toLowerCase().includes(term)
      );
    }
    
    // Sort Logic
    if (sortBy === 'trustScore') credits.sort((a, b) => b.trustScore - a.trustScore); 
    else if (sortBy === 'priceAsc') credits.sort((a, b) => a.pricePerCredit - b.pricePerCredit);
    else if (sortBy === 'priceDesc') credits.sort((a, b) => b.pricePerCredit - a.pricePerCredit);
    else if (sortBy === 'vintage') credits.sort((a, b) => b.vintage - a.vintage);
    
    return credits;
  }, [filters, sortBy, projects]);

  const totalPages = Math.ceil(processedCredits.length / ITEMS_PER_PAGE);
  const paginatedCredits = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return processedCredits.slice(start, start + ITEMS_PER_PAGE);
  }, [processedCredits, currentPage]);

  useEffect(() => setCurrentPage(1), [filters, sortBy]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading && projects.length === 0) {
    return <div className="h-screen flex items-center justify-center bg-[#050505]"><Loader2 className="w-10 h-10 text-[#ec4899] animate-spin"/></div>;
  }

  return (
    <div className="min-h-screen bg-[#050505] text-slate-200 font-sans selection:bg-[#ec4899]/30 relative overflow-hidden">
      
      {/* Background Gradients */}
      <div className="fixed inset-0 pointer-events-none">
         <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-500/5 blur-[120px] rounded-full" />
         <div className="absolute top-20 left-20 w-[600px] h-[600px] bg-emerald-500/5 blur-[150px] rounded-full" />
         <div className="absolute bottom-0 left-1/3 w-[800px] h-[600px] bg-[#ec4899]/5 blur-[180px] rounded-full" />
         <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px]" />
      </div>

      {/* Hero */}
      <div className="relative pt-32 pb-12 px-6 border-b border-white/5">
         <div className="relative z-10 max-w-[1600px] mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tighter mb-4">
               Market <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-blue-400 to-[#ec4899]">Intelligence.</span>
            </h1>
            <p className="text-slate-400 max-w-2xl text-lg leading-relaxed">
               Real-time pricing, satellite verification, and instant retirement for high-integrity assets.
            </p>
         </div>
      </div>

      {/* Control Panel */}
      <FilterBar 
        filters={filters} 
        setFilters={setFilters} 
        resultCount={processedCredits.length} 
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      {/* Main Grid */}
      <div className="relative z-10 max-w-[1600px] mx-auto px-6 pb-24">
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {paginatedCredits.map((project, index) => (
               <ProjectCard 
                  key={project.id} 
                  project={project} 
                  onClick={() => onSelectProject(project)}
                  index={index}
               />
            ))}
         </div>

         {/* Pagination */}
         {totalPages > 1 && (
            <div className="flex items-center justify-center gap-6 mt-16 py-8 border-t border-white/5">
               <button 
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="p-3 rounded-full border border-white/10 hover:bg-white/10 hover:border-white/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
               >
                  <ChevronLeft className="w-5 h-5" />
               </button>
               <div className="flex items-center gap-2 font-mono text-sm">
                  <span className="text-white font-bold">{currentPage}</span>
                  <span className="text-slate-600">/</span>
                  <span className="text-slate-500">{totalPages}</span>
               </div>
               <button 
                  onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="p-3 rounded-full border border-white/10 hover:bg-white/10 hover:border-white/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
               >
                  <ChevronRight className="w-5 h-5" />
               </button>
            </div>
         )}
      </div>
    </div>
  );
}