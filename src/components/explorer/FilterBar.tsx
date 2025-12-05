import { useState, useRef, useEffect, useMemo } from 'react';
import type { InputHTMLAttributes, ChangeEvent } from 'react';
import {
  SlidersHorizontal,
  Search,
  ChevronDown,
  Check,
  X,
  LayoutDashboard,
} from 'lucide-react';
import { projectTypes, mockCredits } from '../../lib/mock-data';

// --- STYLE CONFIGURATION FOR BLOCKS ---
const typeStyles: Record<string, { emoji: string; color: string }> = {
  all: { emoji: '🌍', color: 'bg-slate-600' },
  'Forestry (REDD+)': { emoji: '🌲', color: 'bg-emerald-600' },
  'Renewable Energy': { emoji: '⚡', color: 'bg-yellow-500' },
  'Blue Carbon': { emoji: '🌊', color: 'bg-cyan-500' },
  'Community Projects': { emoji: '🔥', color: 'bg-orange-500' },
  'Waste Recovery': { emoji: '♻️', color: 'bg-lime-600' },
  'Tech-Based Removal': { emoji: '⚙️', color: 'bg-purple-500' },
};

// --- 1. CUSTOM DROPDOWN COMPONENT ---

interface CustomDropdownProps {
  label: string;
  value: string;
  options: string[];
  onChange: (val: string) => void;
}

function CustomDropdown({ label, value, options, onChange }: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`
          w-full flex items-center justify-between px-4 py-3 rounded-xl border text-sm font-medium 
          transition-all duration-300
          ${
            isOpen
              ? 'bg-slate-800 border-emerald-500/50 text-white shadow-[0_0_20px_-5px_rgba(16,185,129,0.3)]'
              : 'bg-slate-900/40 border-slate-700/50 text-slate-400 hover:bg-slate-800 hover:border-slate-600 hover:text-slate-200'
          }
        `}
      >
        <span className="truncate capitalize">
          {value === 'all' ? `All ${label}` : value}
        </span>
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-300 ${
            isOpen ? 'rotate-180 text-emerald-400' : ''
          }`}
        />
      </button>

      <div
        className={`
          absolute z-50 top-full left-0 w-full mt-2 p-1
          bg-slate-900/95 backdrop-blur-xl border border-slate-700 rounded-xl shadow-2xl
          origin-top transition-all duration-200 ease-out
          ${
            isOpen
              ? 'opacity-100 scale-100 translate-y-0'
              : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
          }
        `}
      >
        <div className="max-h-60 overflow-y-auto custom-scrollbar">
          <button
            type="button"
            onClick={() => {
              onChange('all');
              setIsOpen(false);
            }}
            className={`
              w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-left mb-1
              ${
                value === 'all'
                  ? 'bg-emerald-500/20 text-emerald-400'
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }
            `}
          >
            <span>All {label}</span>
            {value === 'all' && <Check className="w-3.5 h-3.5" />}
          </button>

          {options.map((option) => (
            <button
              type="button"
              key={option}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
              className={`
                w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-left mb-1 last:mb-0 
                transition-colors capitalize
                ${
                  value === option
                    ? 'bg-emerald-500/20 text-emerald-400'
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }
              `}
            >
              <span className="truncate">{option}</span>
              {value === option && <Check className="w-3.5 h-3.5" />}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// --- 2. FILTER TYPES / PROPS ---

export type Filters = {
  search: string;
  registry: string;
  country: string;
  vintage: string;
  status: string;
  projectType: string;
};

interface FilterBarProps {
  filters: Filters;
  setFilters: (filters: Filters) => void;
}

// --- 3. INPUT COMPONENT (TYPE-SAFE) ---

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
};

const Input = ({ className = '', ...props }: InputProps) => (
  <input
    className={`
      flex h-10 w-full rounded-lg border border-slate-700 bg-slate-900/50 px-3 py-2 
      text-sm text-white placeholder:text-slate-500 
      focus:outline-none focus:ring-2 focus:ring-emerald-500/50 
      disabled:cursor-not-allowed disabled:opacity-50
      ${className}
    `}
    {...props}
  />
);

// --- 4. MAIN FILTERBAR COMPONENT ---

export default function FilterBar({ filters, setFilters }: FilterBarProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const activeFilterCount = Object.entries(filters).filter(
    ([key, val]) => key !== 'search' && val !== '' && val !== 'all',
  ).length;

  const handleChange = (key: keyof Filters, val: string) =>
    setFilters({ ...filters, [key]: val });

  const clearFilters = () => {
    setFilters({
      ...filters,
      registry: 'all',
      country: 'all',
      vintage: 'all',
      status: 'all',
      projectType: 'all',
    });
  };

  // Logic to Calculate Counts
  const projectCounts = useMemo(() => {
    const counts: Record<string, number> = { all: mockCredits.length };

    projectTypes.forEach((t) => {
      if (t !== 'all') counts[t] = 0;
    });

    mockCredits.forEach((credit) => {
      if (counts[credit.projectType] !== undefined) {
        counts[credit.projectType]++;
      }
    });

    return counts;
  }, []);

  return (
    <div className="space-y-6">
      {/* --- 1. Project Types (Always Visible at Top) --- */}
      <div>
        <div className="flex items-center gap-2 mb-3 text-slate-400">
          <LayoutDashboard className="h-4 w-4" />
          <span className="text-xs font-semibold uppercase tracking-wider">
            Project Types
          </span>
        </div>

        <div className="relative w-full">
          <div className="flex gap-12 overflow-x-auto pb-2  no-scrollbar w-full px-4 py-5 md:justify-center">
            {projectTypes.map((type) => {
              const isActive = filters.projectType === type;
              const style = typeStyles[type] || {
                emoji: '🌱',
                color: 'bg-slate-600',
              };
              const count = projectCounts[type] || 0;

              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => handleChange('projectType', type)}
                  className={`
                    relative group flex-shrink-0 flex flex-col items-center justify-center 
                    w-20 h-20 rounded-2xl transition-all duration-300 border
                    ${
                      isActive
                        ? 'bg-slate-800 border-emerald-500 shadow-[0_0_20px_-5px_rgba(16,185,129,0.3)] scale-[1.03] z-10'
                        : 'bg-slate-900/40 border-slate-700/50 hover:bg-slate-800 hover:border-slate-600 hover:scale-[1.03] hover:z-10'
                    }
                  `}
                >
                  {/* Top: Colored Icon Box */}
                  <span className="mb-1.5 text-2xl leading-none">
  {style.emoji}
</span>


                  {/* Middle: Count */}
                  <span
                    className={`text-lg font-bold mb-0.5 ${
                      isActive ? 'text-white' : 'text-slate-300'
                    }`}
                  >
                    {count}
                  </span>

                  {/* Bottom: Label */}
                  <span
                    className={`text-[9px] font-medium uppercase tracking-wide text-center px-1 truncate w-full ${
                      isActive ? 'text-emerald-400' : 'text-slate-500'
                    }`}
                  >
                    {type === 'all' ? 'All' : type.split(' ')[0]}
                  </span>

                  {/* Active Indicator Dot */}
                  {isActive && (
                    <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,1)]" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* --- 2. Search & Advanced Toggle Row --- */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between pt-4 border-t border-slate-800/50">
        {/* Search Bar */}
        <div className="flex-1 w-full">
          <div className="relative max-w-md w-full group">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-400 transition-colors" />
            <Input
              type="search"
              placeholder="Search projects..."
              value={filters.search}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleChange('search', e.target.value)
              }
              className="
                block w-full pl-11 pr-4 py-3.5 
                bg-slate-900/40 border border-slate-700/50 rounded-2xl
                text-slate-200 placeholder-slate-500
                focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 focus:bg-slate-900/80
                transition-all duration-300 outline-none
              "
            />
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          {activeFilterCount > 0 && (
            <button
              type="button"
              onClick={clearFilters}
              className="hidden sm:inline-flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 transition-colors"
            >
              {activeFilterCount} Active
              <X className="h-3 w-3 ml-1" />
            </button>
          )}

          {/* Toggle Advanced Filters Button */}
          <button
            type="button"
            onClick={() => setIsExpanded((prev) => !prev)}
            className={`
              flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg font-medium 
              transition-all duration-300 border
              ${
                isExpanded
                  ? 'bg-emerald-600 text-white border-emerald-500 shadow-lg shadow-emerald-900/20'
                  : 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700 hover:border-slate-600'
              }
            `}
          >
            <SlidersHorizontal className="h-4 w-4" />
            <span>{isExpanded ? 'Hide Filters' : 'More Filters'}</span>
          </button>
        </div>
      </div>

      {/* --- 3. Collapsible Advanced Filters (Dropdowns) --- */}
      {isExpanded && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2 animate-in fade-in slide-in-from-top-2 duration-300">
          <CustomDropdown
            label="Registry"
            value={filters.registry}
            options={[
              'Verra (VCS)',
              'Gold Standard',
              'Climate Action Reserve',
              'American Carbon Registry',
            ]}
            onChange={(val) => handleChange('registry', val)}
          />
          <CustomDropdown
            label="Country"
            value={filters.country}
            options={[
              'Brazil',
              'India',
              'Kenya',
              'Indonesia',
              'Peru',
              'Vietnam',
              'Mexico',
            ]}
            onChange={(val) => handleChange('country', val)}
          />
          <CustomDropdown
            label="Vintage"
            value={filters.vintage}
            options={['2024', '2023', '2022', '2021']}
            onChange={(val) => handleChange('vintage', val)}
          />
          <CustomDropdown
            label="Status"
            value={filters.status}
            options={['active', 'pending', 'retired']}
            onChange={(val) => handleChange('status', val)}
          />

          {/* Mobile Clear Button */}
          <div className="flex justify-end sm:hidden pt-2 col-span-full">
            <button
              type="button"
              onClick={clearFilters}
              className="text-sm text-slate-400 hover:text-white underline underline-offset-4"
            >
              Reset all filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
