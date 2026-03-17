import { useState, useEffect, useMemo, memo } from "react";
import {
  Search,
  Filter,
} from "lucide-react";

import type { CarbonCredit } from "@/lib/types";
import { mockCredits, REGISTRIES } from "@/lib/mock-data";
import Pagination from "@/components/common/Pagination";
import CreditGrid from "./CreditGrid";

/* ======================================================
   DATA FETCH (same logic)
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
   EMOJI FILTERS (top row)
====================================================== */
const EMOJI_FILTERS = [
  { id: "all", label: "All Assets", emoji: "🌍" },
  { id: "forest", label: "Forestry", emoji: "🌳", types: ["Forestry (REDD+)"] },
  { id: "renewable", label: "Renewables", emoji: "⚡️", types: ["Renewable Energy"] },
  { id: "solar", label: "Solar", emoji: "☀️", types: ["Renewable Energy"] },
  { id: "wind", label: "Wind", emoji: "🌬️", types: ["Renewable Energy"] },
  { id: "community", label: "Community", emoji: "🤝", types: ["Community Projects"] },
  { id: "blue", label: "Blue Carbon", emoji: "🌊", types: ["Blue Carbon"] },
  { id: "waste", label: "Waste", emoji: "♻️", types: ["Waste Recovery"] },
  { id: "tech", label: "Tech Removal", emoji: "🤖", types: ["Tech-Based Removal"] },
   { id: 'nature', label: 'Restoration', emoji: '🌱', types: ['Nature Restoration'] },
  { id: 'industrial', label: 'Industrial', emoji: '🏭', types: ['Tech-Based Removal'] },
  { id: 'water', label: 'Water', emoji: '💧', types: ['Water Conservation'] },
];

/* ======================================================
   SIDEBAR FILTERS (left panel)
====================================================== */
const SidebarFilters = memo(({ filters, setFilters }: any) => (
  <aside className="w-full lg:w-72 shrink-0">
    <div className="sticky top-28 bg-white border border-gray-200 rounded-2xl p-6 space-y-6">
      <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
        <Filter className="w-4 h-4" />
        Filters
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          className="pl-10 pr-3 py-2.5 w-full rounded-xl border border-gray-300 text-sm"
          placeholder="Search projects"
          value={filters.search}
          onChange={(e) =>
            setFilters({ ...filters, search: e.target.value })
          }
        />
      </div>

      {[
        { label: "Registry", key: "registry", options: ["all", ...REGISTRIES] },
        { label: "Status", key: "status", options: ["all", "Active", "Retired", "Pending"] },
        { label: "Vintage", key: "vintage", options: ["all", "2021", "2022", "2023", "2024"] },
      ].map((f) => (
        <div key={f.key}>
          <label className="text-xs font-medium text-gray-500 mb-1 block">
            {f.label}
          </label>
          <select
            className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm"
            value={filters[f.key]}
            onChange={(e) =>
              setFilters({ ...filters, [f.key]: e.target.value })
            }
          >
            {f.options.map((o) => (
              <option key={o} value={o}>
                {o === "all" ? "All" : o}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  </aside>
));

/* ======================================================
   TOP EMOJI ROW
====================================================== */
const EmojiFilterRow = memo(({ selected, onChange }: any) => (
  <div className="flex gap-10 overflow-x-auto pb-2">
    {EMOJI_FILTERS.map((f) => (
      <button
        key={f.id}
        onClick={() => onChange(f.id)}
        className={`flex flex-col items-center gap-2 min-w-[80px]
          ${selected === f.id ? "text-emerald-700" : "text-gray-500"}`}
      >
        <div
          className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl border
            ${selected === f.id
              ? "bg-emerald-100 border-emerald-300"
              : "bg-white border-gray-200"
            }`}
        >
          {f.emoji}
        </div>
        <span className="text-xs font-medium">{f.label}</span>
      </button>
    ))}
  </div>
));

/* ======================================================
   MAIN EXPLORER
====================================================== */
export default function Explorer({
  onSelectProject,
}: {
  onSelectProject: (p: CarbonCredit) => void;
}) {
  const { projects, isLoading } = useData();

  const [filters, setFilters] = useState({
    search: "",
    registry: "all",
    status: "all",
    vintage: "all",
    projectType: "all",
  });

  const [page, setPage] = useState(1);
  const PER_PAGE = 8;

  const filtered = useMemo(() => {
    let data = [...projects];

    if (filters.search) {
      const q = filters.search.toLowerCase();
      data = data.filter((c) =>
        c.projectName.toLowerCase().includes(q)
      );
    }

    if (filters.registry !== "all")
      data = data.filter((c) => c.registry === filters.registry);

    if (filters.status !== "all")
      data = data.filter((c) => c.status === filters.status);

    if (filters.vintage !== "all")
      data = data.filter((c) => c.vintage.toString() === filters.vintage);

    if (filters.projectType !== "all") {
      const emoji = EMOJI_FILTERS.find(
        (e) => e.id === filters.projectType
      );
      if (emoji?.types)
        data = data.filter((c) =>
          emoji.types.includes(c.projectType)
        );
    }

    return data;
  }, [projects, filters]);

  useEffect(() => setPage(1), [filters]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const pageData = filtered.slice(
    (page - 1) * PER_PAGE,
    page * PER_PAGE
  );

  return (
    <div className="bg-gray-50 text-gray-800">
      <div className="max-w-[1600px] mx-auto px-6 pt-10">

        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-7xl font-light tracking-tight">
            Carbon Credit 
            Marketplace
          </h1>
          <p className="text-3xl text-emerald-700/70 mt-1 py-2">
            Explore verified climate projects across the globe
          </p>
        </div>

        {/* EMOJI FILTERS */}
        <div className="bg-white border border-gray-200 rounded-2xl p-4 mb-8">
          <EmojiFilterRow
            selected={filters.projectType}
            onChange={(id: string) =>
              setFilters({ ...filters, projectType: id })
            }
          />
        </div>

        {/* MAIN CONTENT */}
        <div className="flex gap-10 items-start">
          <SidebarFilters filters={filters} setFilters={setFilters} />

          <div className="flex-1">
            {isLoading ? (
              <div className="py-32 text-center text-gray-500">
                Loading projects…
              </div>
            ) : (
              <CreditGrid
                credits={pageData}
                sortBy="trustScore"
                setSortBy={() => {}}
                onSelectProject={onSelectProject}
              />
            )}

            {totalPages > 1 && (
              <div className="mt-12 flex justify-center">
                <Pagination
                  currentPage={page}
                  totalPages={totalPages}
                  onPageChange={setPage}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
