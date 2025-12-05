import React, { useState, useEffect, useMemo } from 'react';
import FilterBar from './FilterBar'; 
import CreditGrid from './CreditGrid'; 
import { mockCredits } from '../../lib/mock-data';
import { CarbonCredit } from '../../lib/types';

// Props interface update
interface ExplorerProps {
  onSelectProject: (project: CarbonCredit) => void;
}

// Default export update
export default function Explorer({ onSelectProject }: ExplorerProps) {
  const [filters, setFilters] = useState({
    search: '',
    registry: 'all',
    country: 'all',
    vintage: 'all',
    status: 'all',
    projectType: 'all',
  });
  const [sortBy, setSortBy] = useState('trustScore');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const processedCredits = useMemo(() => {
    let credits: CarbonCredit[] = [...mockCredits]; 
    if (filters.registry && filters.registry !== 'all') credits = credits.filter((c) => c.registry === filters.registry);
    if (filters.country && filters.country !== 'all') credits = credits.filter((c) => c.country === filters.country);
    if (filters.vintage && filters.vintage !== 'all') credits = credits.filter((c) => c.vintage.toString() === filters.vintage);
    if (filters.status && filters.status !== 'all') credits = credits.filter((c) => c.status === filters.status);
    if (filters.projectType && filters.projectType !== 'all') credits = credits.filter((c) => c.projectType === filters.projectType);

    if (filters.search) {
      const term = filters.search.toLowerCase();
      credits = credits.filter((c) => 
        c.projectName.toLowerCase().includes(term) || c.unicId.toLowerCase().includes(term) || c.location.toLowerCase().includes(term)
      );
    }

    if (sortBy === 'trustScore') credits.sort((a, b) => b.trustScore - a.trustScore); 
    else if (sortBy === 'vintage') credits.sort((a, b) => b.vintage - a.vintage);
    else if (sortBy === 'availableCredits') credits.sort((a, b) => b.availableCredits - a.availableCredits);
    else if (sortBy === 'pricePerCredit') credits.sort((a, b) => a.pricePerCredit - b.pricePerCredit);
    
    return credits;
  }, [filters, sortBy]);

  return (
    <>
      {/* Sticky Hero */}
      <div className="h-screen sticky top-0 flex flex-col justify-center items-center z-0 bg-slate-950 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className={`text-center transition-all duration-700 ease-out px-4 ${isScrolled ? 'scale-75 opacity-0 blur-sm translate-y-[-50px]' : 'scale-100 opacity-100 blur-0 translate-y-0'}`}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm mb-6">
             <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span></span>
             Live Marketplace
          </div>
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-white mb-6">Carbon Credit <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Explorer</span></h1>
          <p className="mt-4 text-xl text-slate-400 max-w-2xl mx-auto">Discover, verify, and trade tokenized carbon credits from registries worldwide with complete transparency.</p>
        </div>
        <div className={`absolute bottom-12 transition-all duration-500 ${isScrolled ? 'opacity-0 translate-y-10' : 'opacity-100 translate-y-0'} scroll-down-arrow`}>
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24" className="text-slate-500"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15.25 10.75L12 14.25L8.75 10.75" /></svg>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 bg-slate-950 min-h-screen border-t border-white/5 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
             <h2 className="text-3xl font-bold text-white">Available Projects</h2>
             <span className="text-slate-400 text-sm">{processedCredits.length} results found</span>
          </div>
          
          <div className="mb-8">
            <FilterBar filters={filters} setFilters={setFilters} />
          </div>

          <CreditGrid 
            credits={processedCredits} 
            sortBy={sortBy} 
            setSortBy={setSortBy}
            onSelectProject={onSelectProject} // Pass the handler down
          />
        </div>
      </div>
    </>
  );
}