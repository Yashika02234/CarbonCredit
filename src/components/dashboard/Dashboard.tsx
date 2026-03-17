import { useMemo } from "react";
import {
  Wallet,
  Leaf,
  CheckCircle2,
  TrendingUp,
  
} from "lucide-react";
import { usePortfolio } from "@/context/PortfolioContext";
import earth from "../../assets/images/dashearth.jpg";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

type DashboardProps = {
  onNavigate?: (view: "portfolio" | "marketplace" | "home" | "dashboard") => void;
};

export default function Dashboard({ onNavigate }: DashboardProps) {
  const { assets, certificates } = usePortfolio();

  /* ================= DATA ================= */

  const ownedAssets = assets.filter(a => a.status === "owned");
  const totalBought = assets.reduce((s, a) => s + a.quantity, 0);
  const totalRetired = certificates.reduce((s, c) => s + c.quantity, 0);
  const activeProjects = ownedAssets.length;

  const retirementRatio =
    totalBought === 0 ? 0 : Math.round((totalRetired / totalBought) * 100);

  const pieData = [
    { name: "Retired", value: totalRetired },
    { name: "Available", value: Math.max(totalBought - totalRetired, 0) },
  ];

  const insight = useMemo(() => {
    if (totalBought === 0) return "Start purchasing credits to see your impact.";
    if (retirementRatio > 70) return "Excellent progress in climate action.";
    if (retirementRatio > 40) return "Good momentum. Retire more credits.";
    return "Most credits are still active. Consider retiring some.";
  }, [retirementRatio, totalBought]);

  /* ================= UI ================= */

  return (
    <div className=" bg-[#F6FBF8] text-[#064E3B]">

      {/* ===== HEADER ===== */}
      <section className="max-w-[1400px] mx-auto px-10 pt-10 pb-10">
        <div className="flex justify-between items-center">
          <div>
           <h1 className="text-9xl font-light tracking-tight">
  Dashboard

</h1>

            <p className="text-5xl text-emerald-700/70 mt-1 py-10">
              Overview of your 
              <br />
             
              climate impact
            </p>
          </div>

          
        </div>
      </section>

      {/* ===== KPI CARDS ===== */}
      <section className="bg-[#1E2623] text-white">
  <div className="max-w-[1400px] mx-auto px-10 py-20">
    
   

    <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
      <StatCard icon={Wallet} label="Credits Bought" value={`${totalBought}`} />
      <StatCard icon={CheckCircle2} label="Credits Retired" value={`${totalRetired}`} />
      <StatCard icon={Leaf} label="Active Projects" value={activeProjects} />
      <StatCard icon={TrendingUp} label="Retirement Ratio" value={`${retirementRatio}%`} />
    </div>

  </div>
</section>


      {/* ===== MAIN GRID ===== */}
      <section className="max-w-[1400px] mx-auto px-10 pb-24 grid grid-cols-12 gap-10 py-10">

        {/* IMPACT DISTRIBUTION */}
        <div className="col-span-12 md:col-span-8 bg-white rounded-3xl p-6 border shadow-sm">
         

          <div className="relative rounded-2xl overflow-hidden">
            <img
              src={earth}
              alt="Earth Impact"
              className="w-full h-[340px] object-cover"
            />
          </div>
        </div>

        {/* ASSET ALLOCATION */}
        <div className="col-span-12 md:col-span-4 bg-white rounded-3xl p-6 border shadow-sm">
          <h2 className="font-semibold text-4xl mb-6">Asset Allocation</h2>

          <div className="h-[260px]">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={4}
                >
                  <Cell fill="#22C55E" />
                  <Cell fill="#D1FAE5" />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <p className="text-sm text-center text-emerald-700/70 mt-4">
            {insight}
          </p>
        </div>

        {/* PROJECT BREAKDOWN */}
      {/* PROJECT IMPACT ALLOCATION */}
<div className="col-span-12 bg-white rounded-3xl p-6 border shadow-sm">
  <h2 className="font-semibold text-lg mb-6">
    Project Impact Allocation
  </h2>

  {assets.length === 0 ? (
    <p className="text-sm text-emerald-700/70">
      No projects yet. Visit marketplace to begin.
    </p>
  ) : (
    <div className="space-y-6">
      {assets.map((asset) => {
        const retiredForProject = certificates
          .filter(c => c.projectId === asset.projectId)
          .reduce((s, c) => s + c.quantity, 0);

        const total = asset.quantity + retiredForProject;

        const retiredPercent =
          total === 0 ? 0 : Math.round((retiredForProject / total) * 100);

        const activePercent = 100 - retiredPercent;

        return (
          <div
            key={asset.projectId}
            className="group transition-all"
          >
            {/* LABEL ROW */}
            <div className="flex justify-between items-center text-sm mb-2">
              <div className="font-medium text-[#064E3B]">
                {asset.projectName}
              </div>
              <div className="text-emerald-700/70">
                {retiredForProject} / {total} t retired
              </div>
            </div>

            {/* BAR */}
            <div className="relative h-2.5 rounded-full bg-emerald-100 overflow-hidden">
              {/* RETIRED */}
              <div
                className="absolute left-0 top-0 h-full
                  bg-gradient-to-r from-emerald-500 to-emerald-600
                  transition-all duration-700 ease-out
                  group-hover:brightness-110"
                style={{ width: `${retiredPercent}%` }}
              />

              {/* ACTIVE */}
              <div
                className="absolute right-0 top-0 h-full
                  bg-emerald-300/40
                  transition-all duration-700"
                style={{ width: `${activePercent}%` }}
              />
            </div>

            {/* LEGEND */}
            <div className="flex gap-4 text-xs mt-2 text-emerald-800/70">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-600" />
                Retired
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-300" />
                Active
              </span>
            </div>
          </div>
        );
      })}
    </div>
  )}
</div>

      </section>

      {/* ===== FOOT CTA ===== */}
      <footer className="bg-[#3F5D50] text-white">
  <section className="relative px-6 lg:px-12 py-32">

    {/* WAVE */}
    <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
      <svg
        className="relative block w-[130%] h-[160px] -translate-x-[5%]"
        viewBox="0 0 1200 160"
        preserveAspectRatio="none"
      >
        <path
          d="M0,80 C300,180 900,-20 1200,100 L1200,0 L0,0 Z"
          fill="#f3f4ff"
        />
      </svg>
    </div>

    <div className="max-w-[1600px] mx-auto grid lg:grid-cols-2 gap-24 items-center">

      {/* LEFT – BRAND & CONTACT */}
      <div className="text-white grid grid-cols-2 gap-20">
        <div className="flex flex-col justify-between">
          <div>
            <h2 className="text-4xl font-medium tracking-tight mb-6">
              Offset
            </h2>

            <p className="text-sm text-white/85 leading-relaxed max-w-xs mb-14">
              Transparent, data-backed infrastructure for verified carbon credit trading.
            </p>

            <div className="space-y-3 text-sm text-white/90">
              <p>123-456-7890</p>
              <p>support@offset.com</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <div className="mb-12">
            <p className="text-xs uppercase tracking-widest text-white/70 mb-6">
              Platform assurances
            </p>
            <ul className="space-y-5 text-sm text-white/90">
              <li>• Verified project registry</li>
              <li>• Permanent credit retirement</li>
              <li>• Full transaction audit trail</li>
            </ul>
          </div>

          <div className="flex items-center gap-6">
            {['Portfolio', 'Marketplace'].map((item) => (
              <button
                key={item}
                onClick={() =>
                  onNavigate?.(
                    item.toLowerCase() as "portfolio" | "marketplace"
                  )
                }
                className="text-xs uppercase tracking-widest
                  border border-white/40 px-4 py-2 rounded-full
                  hover:bg-white hover:text-[#3F5D50] transition"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT – TRUST CARD */}
      <div className="bg-[#FFF1E6] rounded-[32px] p-14 shadow-[0_40px_120px_rgba(0,0,0,0.2)]">
        <h3 className="text-3xl font-serif text-[#3F5D50] mb-6">
          Your impact, secured
        </h3>

        <p className="text-sm text-[#3F5D50]/80 leading-relaxed mb-10">
          All credits shown in this dashboard are sourced from verified projects
          and tracked through permanent retirement records. Your climate claims
          are transparent, auditable, and irreversible.
        </p>

        <div className="grid grid-cols-2 gap-6 text-sm text-[#3F5D50]/90">
          <div>
            <p className="font-medium mb-1">Verification</p>
            <p className="text-xs">Registry-backed credits</p>
          </div>
          <div>
            <p className="font-medium mb-1">Transparency</p>
            <p className="text-xs">Full transaction history</p>
          </div>
          <div>
            <p className="font-medium mb-1">Finality</p>
            <p className="text-xs">Irreversible retirement</p>
          </div>
          <div>
            <p className="font-medium mb-1">Compliance</p>
            <p className="text-xs">Aligned with global standards</p>
          </div>
        </div>
      </div>

    </div>
  </section>
</footer>

    </div>
  );
}

/* ===== SMALL COMPONENT ===== */

function StatCard({ icon: Icon, label, value }: any) {
  return (
    <div
      className="
        group
        relative
        py-8
        border-b border-white/10
        transition-colors duration-500
      "
    >
      <div className="flex items-start justify-between gap-6">

        {/* LEFT: ICON + LABEL */}
        <div className="flex items-start gap-4">
          <div className="mt-1">
            <Icon className="w-5 h-5 text-emerald-400/80 group-hover:text-emerald-400 transition-colors duration-500" />
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest text-white/50 mb-2">
              {label}
            </p>

            <p className="text-4xl font-medium tracking-tight text-white">
              {value}
            </p>
          </div>
        </div>

        {/* RIGHT: META */}
        <div className="text-xs text-white/40 mt-2">
          Updated just now
        </div>
      </div>

      {/* HOVER ACCENT LINE */}
      <div
        className="
          absolute left-0 bottom-0 h-[1px] w-0
          bg-emerald-400
          group-hover:w-full
          transition-all duration-[1200ms] ease-out
        "
      />
    </div>
  );
}

