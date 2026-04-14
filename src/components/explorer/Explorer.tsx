import { useState, useEffect, useMemo, memo } from "react";
import { Search, Filter } from "lucide-react";

import type { CarbonCredit } from "@/lib/types";
import { REGISTRIES } from "@/lib/mock-data";
import Pagination from "@/components/common/Pagination";
import CreditGrid from "./CreditGrid";

const EMOJI_FILTERS = [
  { id: "all", label: "All Assets", emoji: "🌍" },
  { id: "forest", label: "Forestry", emoji: "🌳", types: ["Forestry (REDD+)", "ARR"] },
  { id: "renewable", label: "Renewables", emoji: "⚡️", types: ["Renewable Energy", "RENEWABLE"] },
  { id: "solar", label: "Solar", emoji: "☀️", types: ["Renewable Energy", "RENEWABLE"] },
  { id: "wind", label: "Wind", emoji: "🌬️", types: ["Renewable Energy", "RENEWABLE"] },
  { id: "community", label: "Community", emoji: "🤝", types: ["Community Projects", "COMMUNITY"] },
  { id: "blue", label: "Blue Carbon", emoji: "🌊", types: ["Blue Carbon", "ARR"] },
  { id: "waste", label: "Waste", emoji: "♻️", types: ["Waste Recovery", "WASTE"] },
  { id: "tech", label: "Tech Removal", emoji: "🤖", types: ["Tech-Based Removal", "CDR"] },
  { id: "nature", label: "Restoration", emoji: "🌱", types: ["Nature Restoration", "ARR"] },
  { id: "industrial", label: "Industrial", emoji: "🏭", types: ["Tech-Based Removal", "CDR"] },
  { id: "water", label: "Water", emoji: "💧", types: ["Water Conservation"] },
];

const SidebarFilters = memo(({ filters, setFilters }: any) => (
  <aside className="w-full lg:w-72 shrink-0">
    <div className="sticky top-28 bg-white border border-gray-200 rounded-2xl p-6 space-y-6">
      <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
        <Filter className="w-4 h-4" />
        Filters
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          className="pl-10 pr-3 py-2.5 w-full rounded-xl border border-gray-300 text-sm"
          placeholder="Search projects"
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        />
      </div>

      {[
        { label: "Registry", key: "registry", options: ["all", ...REGISTRIES] },
        { label: "Status", key: "status", options: ["all", "SELLABLE", "UNAVAILABLE"] },
        { label: "Vintage", key: "vintage", options: ["all", "2021", "2022", "2023", "2024"] },
      ].map((f) => (
        <div key={f.key}>
          <label className="text-xs font-medium text-gray-500 mb-1 block">
            {f.label}
          </label>
          <select
            className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm"
            value={filters[f.key]}
            onChange={(e) => setFilters({ ...filters, [f.key]: e.target.value })}
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

const EmojiFilterRow = memo(({ selected, onChange }: any) => (
  <div className="flex gap-10 overflow-x-auto pb-2">
    {EMOJI_FILTERS.map((f) => (
      <button
        key={f.id}
        onClick={() => onChange(f.id)}
        className={`flex flex-col items-center gap-2 min-w-[80px] ${selected === f.id ? "text-emerald-700" : "text-gray-500"
          }`}
      >
        <div
          className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl border ${selected === f.id
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

interface ExplorerProps {
  projects?: CarbonCredit[];
  isLoading?: boolean;
  onSelectProject: (p: CarbonCredit) => void;
}

export default function Explorer({
  projects = [],
  isLoading = true,
  onSelectProject,
}: ExplorerProps) {
  const [filters, setFilters] = useState({
    search: "",
    registry: "all",
    status: "all",
    vintage: "all",
    projectType: "all",
  });

  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("trustScore");
  const PER_PAGE = 8;

  const filtered = useMemo(() => {
    let data = [...projects];

    if (filters.search) {
      const q = filters.search.toLowerCase();
      data = data.filter(
        (c) =>
          c.projectName.toLowerCase().includes(q) ||
          c.country.toLowerCase().includes(q) ||
          c.batch_id.toLowerCase().includes(q)
      );
    }

    if (filters.registry !== "all") {
      data = data.filter((c) => c.registry === filters.registry);
    }

    if (filters.status !== "all") {
      data = data.filter((c) => c.status === filters.status);
    }

    if (filters.vintage !== "all") {
      data = data.filter((c) => c.vintage.toString() === filters.vintage);
    }

    if (filters.projectType !== "all") {
      const emoji = EMOJI_FILTERS.find((e) => e.id === filters.projectType);
      if (emoji?.types) {
        data = data.filter(
          (c) =>
            emoji.types.includes(c.projectType) ||
            emoji.types.includes(c.methodology)
        );
      }
    }

    return data;
  }, [projects, filters]);

  useEffect(() => {
    setPage(1);
  }, [filters]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const pageData = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <div className="bg-gray-50 text-gray-800">
      <div className="max-w-[1600px] mx-auto px-6 pt-10">
        <div className="mb-8">
          <h1 className="text-7xl font-light tracking-tight">
            Carbon Credit
            Marketplace
          </h1>
          <p className="text-3xl text-emerald-700/70 mt-1 py-2">
            Explore verified climate projects across the globe
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-4 mb-8">
          <EmojiFilterRow
            selected={filters.projectType}
            onChange={(id: string) =>
              setFilters({ ...filters, projectType: id })
            }
          />
        </div>

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
                sortBy={sortBy}
                setSortBy={setSortBy}
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