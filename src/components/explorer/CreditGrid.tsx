import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { CreditCard } from './CreditCard';
import { CarbonCredit } from '../../lib/types';
import { sortOptions } from '../../lib/mock-data';

interface CreditGridProps {
  credits: CarbonCredit[];
  sortBy: string;
  setSortBy: (sortKey: string) => void;
  onSelectProject?: (project: CarbonCredit) => void;
}

export default function CreditGrid({ credits, sortBy, setSortBy, onSelectProject }: CreditGridProps) {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-slate-400">
          Showing <span className="font-medium text-white">{credits.length}</span> projects
        </p>
        
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setIsSortOpen(!isSortOpen)}
            className="flex items-center gap-2 text-sm text-slate-400 font-medium px-3 py-2 rounded-lg hover:bg-white/5 transition-colors"
          >
            <span>Sort by:</span>
            <span className="font-medium text-emerald-400">{sortOptions[sortBy]}</span>
            <ChevronDown className={`h-4 w-4 text-slate-500 transition-transform ${isSortOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {isSortOpen && (
            <ul className="absolute top-full right-0 mt-2 w-48 bg-slate-900 border border-slate-700 rounded-lg shadow-xl overflow-hidden z-30">
              {Object.entries(sortOptions).map(([key, value]) => (
                <li
                  key={key}
                  className="px-4 py-2 text-sm text-slate-300 hover:bg-emerald-500/10 hover:text-emerald-400 cursor-pointer transition-colors"
                  onClick={() => {
                    setSortBy(key);
                    setIsSortOpen(false);
                  }}
                >
                  {value}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {credits.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {credits.map((credit) => (
            <CreditCard 
               key={credit.id} 
               credit={credit} 
               onClick={() => onSelectProject && onSelectProject(credit)} 
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-slate-500">
          No projects found matching your criteria.
        </div>
      )}
    </div>
  );
}