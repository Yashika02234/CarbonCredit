import { useState, useEffect, useRef, useMemo } from "react";
import { ChevronDown, Grid3X3, List, ArrowUpDown } from "lucide-react";
import { CreditCard } from "./CreditCard";
import { CarbonCredit } from "../../lib/types";

const sortOptions: Record<string, string> = {
  trustScore: "Trust Score",
  priceAsc: "Price: Low to High",
  priceDesc: "Price: High to Low",
  vintage: "Vintage (Newest)",
};

interface CreditGridProps {
  credits: CarbonCredit[];
  sortBy: string;
  setSortBy: (sortKey: string) => void;
  onSelectProject?: (project: CarbonCredit) => void;
}

export default function CreditGrid({
  credits,
  sortBy,
  setSortBy,
  onSelectProject,
}: CreditGridProps) {
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
  }, []);

  const sortedCredits = useMemo(() => {
    const data = [...credits];

    switch (sortBy) {
      case "priceAsc":
        return data.sort((a, b) => a.pricePerCredit - b.pricePerCredit);

      case "priceDesc":
        return data.sort((a, b) => b.pricePerCredit - a.pricePerCredit);

      case "vintage":
        return data.sort((a, b) => b.vintage - a.vintage);

      case "trustScore":
      default:
        return data.sort((a, b) => b.trustScore - a.trustScore);
    }
  }, [credits, sortBy]);

  return (
    <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 pb-24">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-gray-200 pb-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-500">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-0.5">
              Live Assets
            </p>
            <p className="text-xl font-mono text-slate-900 leading-none font-medium">
              {sortedCredits.length} <span className="text-slate-500 text-sm">/ Items</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsSortOpen(!isSortOpen)}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border transition-all duration-300 ${isSortOpen
                  ? "bg-white border-gray-300 text-slate-900"
                  : "bg-white border-gray-200 text-slate-600 hover:text-slate-900 hover:border-gray-300"
                }`}
            >
              <ArrowUpDown className="w-4 h-4 opacity-70" />
              <div className="text-left hidden sm:block">
                <span className="text-[9px] uppercase tracking-wider font-bold block text-slate-500">
                  Sort By
                </span>
                <span className="text-xs font-medium block text-emerald-700">
                  {sortOptions[sortBy] || sortBy}
                </span>
              </div>
              <ChevronDown
                className={`w-4 h-4 ml-2 transition-transform duration-300 ${isSortOpen ? "rotate-180" : ""
                  }`}
              />
            </button>

            {isSortOpen && (
              <ul className="absolute top-full right-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200">
                {Object.entries(sortOptions).map(([key, value]) => (
                  <li
                    key={key}
                    onClick={() => {
                      setSortBy(key);
                      setIsSortOpen(false);
                    }}
                    className={`px-4 py-3 text-xs font-medium cursor-pointer transition-colors border-b border-gray-100 last:border-0 flex items-center justify-between ${sortBy === key
                        ? "bg-emerald-50 text-emerald-700"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                      }`}
                  >
                    {value}
                    {sortBy === key && <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="h-8 w-px bg-gray-200 hidden md:block" />

          <div className="hidden md:flex bg-white border border-gray-200 rounded-xl p-1">
            <button className="p-2 rounded-lg bg-slate-100 text-slate-900 shadow-sm transition-all">
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button className="p-2 rounded-lg text-slate-400 hover:text-slate-600 transition-all">
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {sortedCredits.length > 0 ? (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {sortedCredits.map((credit) => (
            <CreditCard
              key={`${credit.id}-${credit.unicId}`}
              credit={credit}
              onClick={() => onSelectProject && onSelectProject(credit)}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-32 text-center border border-dashed border-gray-300 rounded-3xl bg-white">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4 border border-gray-200">
            <Grid3X3 className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">No Assets Found</h3>
          <p className="text-slate-500 max-w-xs mx-auto">
            Try adjusting your filters to see available projects.
          </p>
        </div>
      )}
    </div>
  );
}