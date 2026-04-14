import { useMemo, useState } from "react";
import {
  Wallet,
  Leaf,
  CheckCircle2,
  TrendingUp,
  ArrowRight,
  FileCheck2,
  ShieldCheck,
  Globe2,
  ShoppingBag,
  BadgeCheck,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { motion } from "framer-motion";
import { usePortfolio } from "@/context/PortfolioContext";
import earth from "../../assets/images/dashearth.jpg";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  BarChart,
  Bar,
  Sector,
} from "recharts";

type DashboardProps = {
  onNavigate?: (
    view: "portfolio" | "marketplace" | "home" | "dashboard"
  ) => void;
};

export default function Dashboard({ onNavigate }: DashboardProps) {
  const { assets, certificates } = usePortfolio();
  const [openProject, setOpenProject] = useState<string | null>(null);
  const [activePie, setActivePie] = useState<number>(0);

  const goToMarketplace = () => onNavigate?.("marketplace");
  const goToPortfolio = () => onNavigate?.("portfolio");
  const goToDashboard = () => onNavigate?.("dashboard");

  const ownedAssets = assets.filter((a) => a.status === "owned");
  const retiredAssets = assets.filter((a) => a.status === "retired");

  const totalBought = assets.reduce((s, a) => s + a.quantity, 0);
  const totalRetired = certificates.reduce((s, c) => s + c.quantity, 0);
  const activeProjects = ownedAssets.length;
  const retiredProjects = retiredAssets.length;
  const activeCredits = ownedAssets.reduce((s, a) => s + a.quantity, 0);

  const retirementRatio =
    totalBought === 0 ? 0 : Math.round((totalRetired / totalBought) * 100);

  const totalInvestment = assets.reduce((s, a) => s + a.quantity * a.price, 0);

  const avgBuyPrice =
    totalBought === 0 ? 0 : Number((totalInvestment / totalBought).toFixed(2));

  const totalOffset = totalRetired;
  const treeEquivalent = totalRetired > 0 ? Math.round(totalRetired * 2.5) : 0;
  const flightEquivalent =
    totalRetired > 0 ? Math.max(1, Math.round(totalRetired / 8)) : 0;

  const pieData = [
    { name: "Retired", value: totalRetired },
    { name: "Active", value: activeCredits },
  ];

  const insight = useMemo(() => {
    if (totalBought === 0) {
      return "Start purchasing credits to build your climate impact profile.";
    }
    if (retirementRatio > 70) {
      return "Strong performance. A large share of your credits has already been retired.";
    }
    if (retirementRatio > 40) {
      return "Healthy momentum. Your account is steadily converting holdings into impact.";
    }
    return "Most of your credits are still active and available for retirement.";
  }, [totalBought, retirementRatio]);

  const monthlyTrendData = useMemo(() => {
    const now = new Date();
    const months: { month: string; bought: number; retired: number }[] = [];

    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthLabel = d.toLocaleString("en-US", { month: "short" });

      const monthAssets = assets.filter((a) => {
        const ad = new Date(a.createdAt);
        return (
          ad.getMonth() === d.getMonth() && ad.getFullYear() === d.getFullYear()
        );
      });

      const monthCerts = certificates.filter((c) => {
        const cd = new Date(c.createdAt);
        return (
          cd.getMonth() === d.getMonth() && cd.getFullYear() === d.getFullYear()
        );
      });

      months.push({
        month: monthLabel,
        bought: monthAssets.reduce((s, a) => s + a.quantity, 0),
        retired: monthCerts.reduce((s, c) => s + c.quantity, 0),
      });
    }

    return months;
  }, [assets, certificates]);

  const projectAllocation = useMemo(() => {
    return ownedAssets.map((asset) => {
      const retiredForProject = certificates
        .filter((c) => c.projectId === asset.projectId)
        .reduce((s, c) => s + c.quantity, 0);

      const totalForProject = asset.quantity + retiredForProject;
      const retiredPercent =
        totalForProject === 0
          ? 0
          : Math.round((retiredForProject / totalForProject) * 100);

      return {
        ...asset,
        retiredForProject,
        totalForProject,
        retiredPercent,
        activePercent: 100 - retiredPercent,
      };
    });
  }, [ownedAssets, certificates]);

  const topProject = useMemo(() => {
    if (projectAllocation.length === 0) return null;
    return [...projectAllocation].sort(
      (a, b) => b.retiredForProject - a.retiredForProject
    )[0];
  }, [projectAllocation]);

  const latestCertificate = useMemo(() => {
    if (certificates.length === 0) return null;
    return [...certificates].sort((a, b) => b.createdAt - a.createdAt)[0];
  }, [certificates]);

  const latestPurchase = useMemo(() => {
    if (assets.length === 0) return null;
    return [...assets].sort((a, b) => b.createdAt - a.createdAt)[0];
  }, [assets]);

  const recentActivity = useMemo(() => {
    const items: {
      title: string;
      desc: string;
      time: string;
      icon: any;
      onClick?: () => void;
    }[] = [];

    if (latestPurchase) {
      items.push({
        title: `Purchased ${latestPurchase.quantity} credits`,
        desc: `${latestPurchase.projectName} was added to your holdings.`,
        time: formatTimeAgo(latestPurchase.createdAt),
        icon: ShoppingBag,
        onClick: goToPortfolio,
      });
    }

    if (latestCertificate) {
      items.push({
        title: `Retired ${latestCertificate.quantity} credits`,
        desc: `${latestCertificate.projectName} retirement was recorded successfully.`,
        time: formatTimeAgo(latestCertificate.createdAt),
        icon: CheckCircle2,
        onClick: goToPortfolio,
      });

      items.push({
        title: "Certificate generated",
        desc: `Certificate ${latestCertificate.certificateId} is available in your records.`,
        time: formatTimeAgo(latestCertificate.createdAt),
        icon: FileCheck2,
        onClick: goToPortfolio,
      });
    }

    items.push({
      title: "Registry status healthy",
      desc: "Verification and retirement records are synced successfully.",
      time: "Just now",
      icon: ShieldCheck,
      onClick: goToDashboard,
    });

    return items.slice(0, 4);
  }, [latestPurchase, latestCertificate]);

  const snapshotCards = [
    {
      label: "Average buy price",
      value: totalBought === 0 ? "$0.00" : `$${avgBuyPrice}`,
      note: "Across your purchases",
      icon: TrendingUp,
      onClick: goToPortfolio,
    },
    {
      label: "Tracked projects",
      value: `${assets.length}`,
      note: "Projects in account",
      icon: Leaf,
      onClick: goToPortfolio,
    },
    {
      label: "Certificates",
      value: `${certificates.length}`,
      note: "Retirement records",
      icon: BadgeCheck,
      onClick: goToPortfolio,
    },
    {
      label: "Total investment",
      value: `$${totalInvestment.toFixed(2)}`,
      note: "From recorded purchases",
      icon: Globe2,
      onClick: goToPortfolio,
    },
    {
      label: "Active credits",
      value: `${activeCredits}`,
      note: "Available for retirement",
      icon: Wallet,
      onClick: goToPortfolio,
    },
  ];

  const statusItems = [
    {
      label: "Active credits",
      value: `${activeCredits}`,
      note: "Available for retirement",
      onClick: goToPortfolio,
    },
    {
      label: "Retired projects",
      value: `${retiredProjects}`,
      note: "Projects fully retired",
      onClick: goToPortfolio,
    },
    {
      label: "Owned projects",
      value: `${activeProjects}`,
      note: "Still active in account",
      onClick: goToPortfolio,
    },
    {
      label: "Platform status",
      value: "Live",
      note: "Records healthy",
      onClick: goToDashboard,
    },
  ];

  const quickActions = [
    {
      title: "Explore Marketplace",
      desc: "Browse verified projects",
      onClick: goToMarketplace,
    },
    {
      title: "Open Portfolio",
      desc: "View holdings and records",
      onClick: goToPortfolio,
    },
    {
      title: "View Certificates",
      desc: "See retirement proof",
      onClick: goToPortfolio,
    },
  ];

  const pieActiveLabel = pieData[activePie] ?? pieData[0];

  return (
    <div className="bg-[#F6FBF8] text-[#064E3B]">
      {/* HEADER - LIGHT */}
      <section className="bg-[#F6FBF8]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 pt-10 pb-10">
          <div className="flex justify-between items-end gap-8 flex-wrap">
            <Reveal>
              <div>
                <h1 className="text-6xl md:text-8xl lg:text-9xl font-light tracking-tight">
                  Dashboard
                </h1>

                <p className="text-2xl md:text-4xl lg:text-5xl text-emerald-700/70 mt-1 py-6 md:py-8 leading-tight">
                  Overview of your
                  <br />
                  climate impact
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="flex items-center gap-3 flex-wrap">
                <MagneticButton
                  onClick={goToMarketplace}
                  className="px-5 py-3 rounded-full bg-[#0F3D2E] text-white text-sm tracking-wide"
                >
                  Explore projects
                </MagneticButton>

                <MagneticButton
                  onClick={goToPortfolio}
                  className="px-5 py-3 rounded-full border border-emerald-800/15 bg-white text-sm tracking-wide"
                >
                  Open portfolio
                </MagneticButton>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* STICKY BAR - LIGHT */}
    

      {/* KPI - DARK */}
      <section className="bg-[#111A17] text-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10">
            <Reveal>
              <StatCard
                icon={Wallet}
                label="Credits Bought"
                value={`${totalBought}`}
              />
            </Reveal>
            <Reveal delay={0.05}>
              <StatCard
                icon={CheckCircle2}
                label="Credits Retired"
                value={`${totalRetired}`}
              />
            </Reveal>
            <Reveal delay={0.1}>
              <StatCard
                icon={Leaf}
                label="Active Projects"
                value={`${activeProjects}`}
              />
            </Reveal>
            <Reveal delay={0.15}>
              <StatCard
                icon={TrendingUp}
                label="Retirement Ratio"
                value={`${retirementRatio}%`}
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* QUICK ACTIONS + SNAPSHOT - LIGHT */}
      <section className="bg-[#F6FBF8]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 pt-10 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickActions.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.05}>
                <button
                  onClick={item.onClick}
                  className="group relative overflow-hidden bg-white rounded-3xl border border-emerald-900/8 p-6 text-left shadow-sm hover:-translate-y-1 hover:border-emerald-700/15 hover:bg-emerald-50/30 transition-all duration-500 cursor-pointer w-full"
                >
                  <div className="absolute top-0 left-6 h-[2px] w-0 bg-emerald-500 group-hover:w-20 transition-all duration-500" />

                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xl font-medium tracking-tight">
                        {item.title}
                      </p>
                      <p className="text-sm text-emerald-700/70 mt-2">
                        {item.desc}
                      </p>
                    </div>

                    <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center group-hover:scale-105 transition">
                      <ArrowRight className="w-4 h-4 text-emerald-700 group-hover:translate-x-0.5 transition" />
                    </div>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>

          <div className="mt-8">
            <Reveal>
              <div className="mb-4">
                <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
                  Quick Snapshot
                </h2>
                <p className="text-sm text-emerald-700/70 mt-1">
                  Swipe or scroll through account highlights.
                </p>
              </div>
            </Reveal>

            <div className="overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <div className="flex gap-4 min-w-max snap-x snap-mandatory">
                {snapshotCards.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <Reveal key={item.label} delay={i * 0.04}>
                      <button
                        onClick={item.onClick}
                        className="snap-start min-w-[260px] max-w-[260px] group relative overflow-hidden rounded-3xl border border-emerald-900/8 bg-white p-5 shadow-sm hover:-translate-y-1 hover:border-emerald-700/15 hover:bg-emerald-50/20 transition-all duration-500 text-left cursor-pointer"
                      >
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.08),transparent_45%)]" />
                        <div className="relative">
                          <div className="flex items-center justify-between mb-5">
                            <Icon className="w-5 h-5 text-emerald-700 group-hover:scale-110 transition-transform duration-500" />
                            <span className="text-[11px] uppercase tracking-[0.18em] text-emerald-700/45">
                              Live
                            </span>
                          </div>
                          <p className="text-xs uppercase tracking-[0.18em] text-emerald-700/45">
                            {item.label}
                          </p>
                          <p className="text-2xl font-medium tracking-tight mt-2">
                            {item.value}
                          </p>
                          <p className="text-sm text-emerald-700/65 mt-1">
                            {item.note}
                          </p>
                        </div>
                      </button>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* IMPACT + PROJECTS - DARK */}
      <section className="bg-[#0B1F19] text-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-16 grid grid-cols-12 gap-8 md:gap-10">
          <div className="col-span-12 md:col-span-8">
            <Reveal>
              <div className="bg-white/5 rounded-3xl p-6 border border-white/10 shadow-sm overflow-hidden">
                <div className="flex items-start justify-between gap-6 mb-6 flex-wrap">
                  <div>
                    <h2 className="font-semibold text-3xl md:text-4xl mb-2">
                      Impact Overview
                    </h2>
                    <p className="text-sm text-white/70 max-w-xl">
                      A high-level view of your retired credits, active balance,
                      and measurable climate contribution.
                    </p>
                  </div>

                  <button
                    onClick={goToDashboard}
                    className="px-4 py-2 rounded-full bg-white/10 text-white text-sm hover:bg-white/15 transition cursor-pointer"
                  >
                    Updated just now
                  </button>
                </div>

                <div className="relative rounded-[28px] overflow-hidden group">
                  <motion.img
                    src={earth}
                    alt="Earth Impact"
                    className="w-full h-[380px] object-cover"
                    whileHover={{ scale: 1.04 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#06130F]/75 via-[#06130F]/20 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <OverlayStat
                        title="Total offset"
                        value={`${totalOffset} tCO₂`}
                        sub="Measured from retired credits"
                        onClick={goToPortfolio}
                      />
                      <OverlayStat
                        title="Tree equivalent"
                        value={`${treeEquivalent}`}
                        sub="Approximate impact comparison"
                        onClick={goToPortfolio}
                      />
                      <OverlayStat
                        title="Flight equivalent"
                        value={`${flightEquivalent}`}
                        sub="Approximate short-haul flights offset"
                        onClick={goToPortfolio}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="col-span-12 md:col-span-4">
            <Reveal delay={0.05}>
              <div className="bg-white/5 rounded-3xl p-6 border border-white/10 shadow-sm h-full">
                <h2 className="font-semibold text-3xl mb-3">
                  Asset Allocation
                </h2>
                <p className="text-sm text-white/70 mb-6">
                  Active vs retired distribution across your account.
                </p>

                <button
                  onClick={goToPortfolio}
                  className="relative h-[260px] w-full cursor-pointer"
                >
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie
                        data={pieData}
                        dataKey="value"
                        innerRadius={65}
                        outerRadius={95}
                        paddingAngle={4}
                        activeIndex={activePie}
                        activeShape={renderActiveShape}
                        onMouseEnter={(_, index) => setActivePie(index)}
                      >
                        <Cell fill="#10B981" />
                        <Cell fill="#D1FAE5" />
                      </Pie>
                      <Tooltip content={<DarkTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>

                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <p className="text-xs uppercase tracking-[0.18em] text-white/50">
                      {pieActiveLabel.name}
                    </p>
                    <p className="text-3xl font-medium tracking-tight mt-1 text-white">
                      {pieActiveLabel.value}
                    </p>
                  </div>
                </button>

                <div className="grid grid-cols-2 gap-4 mt-3">
                  <DarkLegendStat
                    label="Retired"
                    value={totalRetired}
                    dot="bg-emerald-500"
                    onClick={goToPortfolio}
                  />
                  <DarkLegendStat
                    label="Active"
                    value={activeCredits}
                    dot="bg-emerald-200"
                    onClick={goToPortfolio}
                  />
                </div>

                <button
                  onClick={goToPortfolio}
                  className="text-sm text-center text-white/70 mt-6 w-full hover:text-white transition cursor-pointer"
                >
                  {insight}
                </button>
              </div>
            </Reveal>
          </div>

          <div className="col-span-12 mt-2">
            <Reveal>
              <div className="bg-white/5 rounded-3xl p-6 border border-white/10 shadow-sm">
                <div className="flex items-center justify-between gap-6 mb-6 flex-wrap">
                  <div>
                    <h2 className="font-semibold text-2xl md:text-3xl">
                      Project Impact Allocation
                    </h2>
                    <p className="text-sm text-white/70 mt-1">
                      Click a project to expand details.
                    </p>
                  </div>

                  {topProject && (
                    <button
                      onClick={goToPortfolio}
                      className="px-4 py-3 rounded-2xl bg-white/10 border border-white/10 text-left cursor-pointer hover:bg-white/15 transition"
                    >
                      <p className="text-[11px] uppercase tracking-[0.18em] text-white/50 mb-1">
                        Top impact project
                      </p>
                      <p className="font-medium text-white">
                        {topProject.projectName}
                      </p>
                    </button>
                  )}
                </div>

                {ownedAssets.length === 0 ? (
                  <button
                    onClick={goToMarketplace}
                    className="text-sm text-white/70 hover:text-white transition cursor-pointer"
                  >
                    No active projects yet. Visit marketplace to begin.
                  </button>
                ) : (
                  <div className="space-y-5">
                    {projectAllocation.map((asset, i) => {
                      const isOpen = openProject === asset.batchId;
                      return (
                        <Reveal key={asset.batchId} delay={i * 0.03}>
                          <motion.div
                            layout
                            className="group rounded-3xl border border-white/10 bg-[#0F2A22] p-5 hover:border-white/20 hover:bg-[#133429] transition-all duration-500"
                          >
                            <button
                              onClick={() =>
                                setOpenProject(isOpen ? null : asset.batchId)
                              }
                              className="w-full text-left cursor-pointer"
                            >
                              <div className="flex justify-between items-center gap-4 flex-wrap mb-3">
                                <div>
                                  <div className="font-medium text-white text-base">
                                    {asset.projectName}
                                  </div>
                                  <div className="text-xs text-white/55 mt-1">
                                    Vintage {asset.vintage} • ${asset.price}
                                    /credit
                                  </div>
                                </div>

                                <div className="flex items-center gap-4">
                                  <div className="text-white/70 text-sm">
                                    {asset.retiredForProject} /{" "}
                                    {asset.totalForProject} retired
                                  </div>
                                  <div className="w-9 h-9 rounded-full bg-white/10 border border-white/10 flex items-center justify-center">
                                    {isOpen ? (
                                      <ChevronUp className="w-4 h-4 text-white" />
                                    ) : (
                                      <ChevronDown className="w-4 h-4 text-white" />
                                    )}
                                  </div>
                                </div>
                              </div>

                              <div className="relative h-3 rounded-full bg-white/10 overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  whileInView={{
                                    width: `${asset.retiredPercent}%`,
                                  }}
                                  viewport={{ once: true }}
                                  transition={{
                                    duration: 0.9,
                                    ease: "easeOut",
                                  }}
                                  className="absolute left-0 top-0 h-full bg-gradient-to-r from-emerald-500 to-emerald-600"
                                />
                                <motion.div
                                  initial={{ width: 0 }}
                                  whileInView={{
                                    width: `${asset.activePercent}%`,
                                  }}
                                  viewport={{ once: true }}
                                  transition={{
                                    duration: 0.9,
                                    ease: "easeOut",
                                  }}
                                  className="absolute right-0 top-0 h-full bg-emerald-200/25"
                                />
                              </div>

                              <div className="flex gap-5 text-xs mt-3 text-white/70 flex-wrap">
                                <span className="flex items-center gap-1.5">
                                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                                  Retired
                                </span>
                                <span className="flex items-center gap-1.5">
                                  <span className="w-2 h-2 rounded-full bg-emerald-200" />
                                  Active
                                </span>
                                <span>{asset.retiredPercent}% completed</span>
                              </div>
                            </button>

                            <motion.div
                              initial={false}
                              animate={{
                                height: isOpen ? "auto" : 0,
                                opacity: isOpen ? 1 : 0,
                                marginTop: isOpen ? 20 : 0,
                              }}
                              transition={{
                                duration: 0.35,
                                ease: "easeInOut",
                              }}
                              className="overflow-hidden"
                            >
                              <div className="grid md:grid-cols-4 gap-4 pt-4 border-t border-white/10">
                                <DarkExpandMeta
                                  label="Batch ID"
                                  value={asset.batchId}
                                />
                                <DarkExpandMeta
                                  label="Remaining active"
                                  value={`${asset.quantity}`}
                                />
                                <DarkExpandMeta
                                  label="Retired credits"
                                  value={`${asset.retiredForProject}`}
                                />
                                <DarkExpandMeta
                                  label="Total project credits"
                                  value={`${asset.totalForProject}`}
                                />
                              </div>

                              <div className="pt-5 flex items-center gap-3 flex-wrap">
                                <button
                                  onClick={goToPortfolio}
                                  className="px-4 py-2 rounded-full bg-white text-[#0F2A22] text-sm hover:bg-emerald-50 transition cursor-pointer"
                                >
                                  View in portfolio
                                </button>
                                <button
                                  onClick={goToMarketplace}
                                  className="px-4 py-2 rounded-full border border-white/15 bg-white/5 text-white text-sm hover:bg-white/10 transition cursor-pointer"
                                >
                                  Explore similar projects
                                </button>
                              </div>
                            </motion.div>
                          </motion.div>
                        </Reveal>
                      );
                    })}
                  </div>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CERTIFICATE + STATUS + CHARTS - LIGHT */}
      <section className="bg-[#F6FBF8] text-[#064E3B]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-16 grid grid-cols-12 gap-8 md:gap-10">
          <div className="col-span-12 md:col-span-6">
            <Reveal>
              <div className="bg-white rounded-3xl p-6 border border-emerald-900/8 shadow-sm h-full">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="font-semibold text-2xl md:text-3xl">
                      Latest Certificate
                    </h2>
                    <p className="text-sm text-emerald-700/70 mt-1">
                      Your most recent retirement proof.
                    </p>
                  </div>
                  <button onClick={goToPortfolio} className="cursor-pointer">
                    <FileCheck2 className="w-5 h-5 text-emerald-700/70 hover:text-emerald-800 transition" />
                  </button>
                </div>

                <div className="group rounded-[28px] bg-[#0F3D2E] text-white p-8 min-h-[280px] flex flex-col justify-between overflow-hidden relative">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_40%)]" />
                  <div className="relative">
                    {latestCertificate ? (
                      <>
                        <button
                          onClick={goToPortfolio}
                          className="text-left cursor-pointer"
                        >
                          <p className="text-xs uppercase tracking-[0.22em] text-white/50 mb-4">
                            Retirement Record
                          </p>
                          <h3 className="text-3xl font-medium tracking-tight mb-2">
                            {latestCertificate.certificateId}
                          </h3>
                          <p className="text-white/75 text-sm leading-relaxed max-w-lg">
                            Verified certificate generated after successful
                            retirement of credits.
                          </p>
                        </button>

                        <div className="grid grid-cols-2 gap-5 mt-8">
                          <MiniMeta
                            label="Project"
                            value={latestCertificate.projectName}
                          />
                          <MiniMeta
                            label="Quantity retired"
                            value={`${latestCertificate.quantity} credits`}
                          />
                          <MiniMeta
                            label="Date"
                            value={latestCertificate.date}
                          />
                          <MiniMeta label="Status" value="Confirmed" />
                        </div>

                        <div className="pt-8 flex items-center gap-3 flex-wrap">
                          <button
                            onClick={goToPortfolio}
                            className="px-5 py-3 rounded-full bg-white text-[#0F3D2E] text-sm hover:bg-emerald-50 transition cursor-pointer"
                          >
                            View certificates
                          </button>
                          <button
                            onClick={goToPortfolio}
                            className="px-5 py-3 rounded-full border border-white/20 text-white text-sm hover:bg-white/10 transition cursor-pointer"
                          >
                            Open records
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className="h-full flex flex-col justify-center">
                        <h3 className="text-3xl font-medium tracking-tight mb-3">
                          No certificates yet
                        </h3>
                        <p className="text-white/75 text-sm max-w-md mb-8">
                          Once you retire credits, your latest certificate will
                          appear here.
                        </p>
                        <button
                          onClick={goToMarketplace}
                          className="w-fit px-5 py-3 rounded-full bg-white text-[#0F3D2E] text-sm hover:bg-emerald-50 transition cursor-pointer"
                        >
                          Explore marketplace
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="col-span-12 md:col-span-6">
            <Reveal delay={0.05}>
              <div className="bg-white rounded-3xl p-6 border border-emerald-900/8 shadow-sm h-full">
                <div className="mb-6">
                  <h2 className="font-semibold text-2xl md:text-3xl">
                    Platform Status
                  </h2>
                  <p className="text-sm text-emerald-700/70 mt-1">
                    Key account indicators at a glance.
                  </p>
                </div>

                <div className="space-y-4">
                  {statusItems.map((item) => (
                    <button
                      key={item.label}
                      onClick={item.onClick}
                      className="group rounded-2xl bg-[#F8FCFA] border border-emerald-900/6 p-5 flex items-center justify-between gap-4 hover:-translate-y-0.5 hover:border-emerald-700/12 transition-all duration-500 w-full text-left cursor-pointer"
                    >
                      <div>
                        <p className="text-sm font-medium">{item.label}</p>
                        <p className="text-xs text-emerald-700/60 mt-1">
                          {item.note}
                        </p>
                      </div>
                      <div className="text-2xl font-medium tracking-tight group-hover:text-emerald-700 transition">
                        {item.value}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          <div className="col-span-12 md:col-span-7">
            <Reveal>
              <div className="bg-white rounded-3xl p-6 border border-emerald-900/8 shadow-sm h-full">
                <div className="mb-6 flex items-center justify-between gap-4 flex-wrap">
                  <div>
                    <h2 className="font-semibold text-2xl md:text-3xl">
                      Retirement Trend
                    </h2>
                    <p className="text-sm text-emerald-700/70 mt-1">
                      Monthly movement of bought and retired credits.
                    </p>
                  </div>
                  <button
                    onClick={goToPortfolio}
                    className="px-4 py-2 rounded-full bg-emerald-50 text-emerald-800 text-sm hover:bg-emerald-100 transition cursor-pointer"
                  >
                    Open details
                  </button>
                </div>

                <button
                  onClick={goToPortfolio}
                  className="h-[320px] w-full cursor-pointer"
                >
                  <ResponsiveContainer>
                    <AreaChart data={monthlyTrendData}>
                      <defs>
                        <linearGradient
                          id="retGrad"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#10B981"
                            stopOpacity={0.35}
                          />
                          <stop
                            offset="95%"
                            stopColor="#10B981"
                            stopOpacity={0.02}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid stroke="#E6F4EC" vertical={false} />
                      <XAxis dataKey="month" tickLine={false} axisLine={false} />
                      <YAxis tickLine={false} axisLine={false} />
                      <Tooltip content={<CustomTooltip />} />
                      <Area
                        type="monotone"
                        dataKey="retired"
                        stroke="#10B981"
                        fill="url(#retGrad)"
                        strokeWidth={2.5}
                        animationDuration={1000}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </button>
              </div>
            </Reveal>
          </div>

          <div className="col-span-12 md:col-span-5">
            <Reveal delay={0.05}>
              <div className="bg-white rounded-3xl p-6 border border-emerald-900/8 shadow-sm h-full">
                <div className="mb-6">
                  <h2 className="font-semibold text-2xl md:text-3xl">
                    Recent Activity
                  </h2>
                  <p className="text-sm text-emerald-700/70 mt-1">
                    Most recent updates from your account.
                  </p>
                </div>

                <div className="space-y-5">
                  {recentActivity.map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <motion.button
                        key={`${item.title}-${i}`}
                        onClick={item.onClick}
                        whileHover={{ x: 4 }}
                        transition={{ duration: 0.25 }}
                        className="flex gap-4 group w-full text-left cursor-pointer"
                      >
                        <div className="flex flex-col items-center">
                          <div className="w-11 h-11 rounded-full bg-emerald-50 border border-emerald-900/8 flex items-center justify-center group-hover:scale-105 group-hover:bg-emerald-100 transition">
                            <Icon className="w-5 h-5 text-emerald-700" />
                          </div>
                          {i !== recentActivity.length - 1 && (
                            <div className="w-px flex-1 bg-emerald-100 mt-2 group-hover:bg-emerald-200 transition" />
                          )}
                        </div>

                        <div className="pb-5">
                          <div className="flex items-center gap-3 flex-wrap">
                            <p className="font-medium">{item.title}</p>
                            <span className="text-xs text-emerald-700/50">
                              {item.time}
                            </span>
                          </div>
                          <p className="text-sm text-emerald-700/70 mt-1 max-w-xl">
                            {item.desc}
                          </p>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </Reveal>
          </div>

          <div className="col-span-12">
            <Reveal>
              <div className="bg-white rounded-3xl p-6 border border-emerald-900/8 shadow-sm">
                <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                  <div>
                    <h2 className="font-semibold text-2xl md:text-3xl">
                      Monthly Purchase vs Retirement
                    </h2>
                    <p className="text-sm text-emerald-700/70 mt-1">
                      Compare account activity over the last 6 months.
                    </p>
                  </div>
                  <button
                    onClick={goToPortfolio}
                    className="text-sm text-emerald-700/60 hover:text-emerald-800 transition cursor-pointer"
                  >
                    Last 6 months
                  </button>
                </div>

                <button
                  onClick={goToPortfolio}
                  className="h-[320px] w-full cursor-pointer"
                >
                  <ResponsiveContainer>
                    <BarChart data={monthlyTrendData} barGap={10}>
                      <CartesianGrid stroke="#E6F4EC" vertical={false} />
                      <XAxis dataKey="month" tickLine={false} axisLine={false} />
                      <YAxis tickLine={false} axisLine={false} />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar
                        dataKey="bought"
                        fill="#B7EBCB"
                        radius={[8, 8, 0, 0]}
                        animationDuration={900}
                      />
                      <Bar
                        dataKey="retired"
                        fill="#10B981"
                        radius={[8, 8, 0, 0]}
                        animationDuration={1100}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FOOTER - DARK */}
      <footer className="bg-[#3F5D50] text-white">
        <section className="relative px-6 lg:px-12 py-24 md:py-32">
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

          <div className="max-w-[1600px] mx-auto grid lg:grid-cols-2 gap-16 md:gap-24 items-center">
            <div className="text-white grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-20">
              <div className="flex flex-col justify-between">
                <div>
                  <button
                    onClick={goToDashboard}
                    className="text-4xl font-medium tracking-tight mb-6 cursor-pointer hover:opacity-90 transition"
                  >
                    Offset
                  </button>

                  <p className="text-sm text-white/85 leading-relaxed max-w-xs mb-14">
                    Transparent, data-backed infrastructure for verified carbon
                    credit trading.
                  </p>

                  <div className="space-y-3 text-sm text-white/90">
                    <button
                      onClick={goToDashboard}
                      className="block cursor-pointer hover:text-white transition"
                    >
                      123-456-7890
                    </button>
                    <button
                      onClick={goToDashboard}
                      className="block cursor-pointer hover:text-white transition"
                    >
                      support@offset.com
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-center">
                <div className="mb-12">
                  <p className="text-xs uppercase tracking-widest text-white/70 mb-6">
                    Platform assurances
                  </p>
                  <ul className="space-y-5 text-sm text-white/90">
                    <li>
                      <button
                        onClick={goToDashboard}
                        className="cursor-pointer hover:text-white transition"
                      >
                        • Verified project registry
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={goToPortfolio}
                        className="cursor-pointer hover:text-white transition"
                      >
                        • Permanent credit retirement
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={goToPortfolio}
                        className="cursor-pointer hover:text-white transition"
                      >
                        • Full transaction audit trail
                      </button>
                    </li>
                  </ul>
                </div>

                <div className="flex items-center gap-4 flex-wrap">
                  {["Portfolio", "Marketplace"].map((item) => (
                    <button
                      key={item}
                      onClick={() =>
                        onNavigate?.(
                          item.toLowerCase() as "portfolio" | "marketplace"
                        )
                      }
                      className="text-xs uppercase tracking-widest border border-white/40 px-4 py-2 rounded-full hover:bg-white hover:text-[#3F5D50] transition cursor-pointer"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-[#FFF1E6] rounded-[32px] p-10 md:p-14 shadow-[0_40px_120px_rgba(0,0,0,0.2)]">
              <h3 className="text-3xl font-serif text-[#3F5D50] mb-6">
                Your impact, secured
              </h3>

              <p className="text-sm text-[#3F5D50]/80 leading-relaxed mb-10">
                All credits shown in this dashboard are tracked through your
                purchase and retirement records. Your climate activity stays
                visible, organized, and easy to review.
              </p>

              <div className="grid grid-cols-2 gap-6 text-sm text-[#3F5D50]/90">
                <button
                  onClick={goToDashboard}
                  className="text-left cursor-pointer hover:opacity-80 transition"
                >
                  <p className="font-medium mb-1">Verification</p>
                  <p className="text-xs">Recorded account actions</p>
                </button>
                <button
                  onClick={goToPortfolio}
                  className="text-left cursor-pointer hover:opacity-80 transition"
                >
                  <p className="font-medium mb-1">Transparency</p>
                  <p className="text-xs">Clear activity history</p>
                </button>
                <button
                  onClick={goToPortfolio}
                  className="text-left cursor-pointer hover:opacity-80 transition"
                >
                  <p className="font-medium mb-1">Finality</p>
                  <p className="text-xs">Certificate-backed retirement</p>
                </button>
                <button
                  onClick={goToPortfolio}
                  className="text-left cursor-pointer hover:opacity-80 transition"
                >
                  <p className="font-medium mb-1">Clarity</p>
                  <p className="text-xs">Clean project-level reporting</p>
                </button>
              </div>
            </div>
          </div>
        </section>
      </footer>
    </div>
  );
}

/* HELPERS */

function formatTimeAgo(ts: number) {
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / (1000 * 60));
  const hrs = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins} min ago`;
  if (hrs < 24) return `${hrs} hr ago`;
  return `${days} day ago`;
}

function renderActiveShape(props: any) {
  const {
    cx,
    cy,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
  } = props;

  return (
    <Sector
      cx={cx}
      cy={cy}
      innerRadius={innerRadius}
      outerRadius={outerRadius + 6}
      startAngle={startAngle}
      endAngle={endAngle}
      fill={fill}
    />
  );
}

/* SMALL COMPONENTS */

function Reveal({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: 0.55, delay }}
    >
      {children}
    </motion.div>
  );
}

function MagneticButton({
  children,
  onClick,
  className,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -2, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      transition={{ duration: 0.2 }}
      className={`${className} transition cursor-pointer`}
    >
      {children}
    </motion.button>
  );
}

function MiniSticky({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-emerald-700/55 text-xs uppercase tracking-[0.18em]">
        {label}
      </span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

function StatCard({ icon: Icon, label, value }: any) {
  return (
    <div className="group relative py-8 border-b border-white/10 transition-colors duration-500">
      <div className="flex items-start justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="mt-1">
            <Icon className="w-5 h-5 text-emerald-400/80 group-hover:text-emerald-400 group-hover:scale-110 transition-all duration-500" />
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest text-white/50 mb-2">
              {label}
            </p>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
              className="text-4xl font-medium tracking-tight text-white"
            >
              {value}
            </motion.p>
          </div>
        </div>

        <div className="text-xs text-white/40 mt-2">Updated just now</div>
      </div>

      <div className="absolute left-0 bottom-0 h-[1px] w-0 bg-emerald-400 group-hover:w-full transition-all duration-[1200ms] ease-out" />
    </div>
  );
}

function OverlayStat({
  title,
  value,
  sub,
  onClick,
}: {
  title: string;
  value: string;
  sub: string;
  onClick?: () => void;
}) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 p-5 text-white text-left cursor-pointer w-full"
    >
      <p className="text-xs uppercase tracking-[0.18em] text-white/60 mb-2">
        {title}
      </p>
      <p className="text-2xl md:text-3xl font-medium tracking-tight">{value}</p>
      <p className="text-sm text-white/70 mt-2 leading-relaxed">{sub}</p>
    </motion.button>
  );
}

function DarkLegendStat({
  label,
  value,
  dot,
  onClick,
}: {
  label: string;
  value: string | number;
  dot: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="rounded-2xl bg-white/5 border border-white/10 p-4 hover:bg-white/10 transition text-left cursor-pointer"
    >
      <div className="flex items-center gap-2 mb-2">
        <span className={`w-2.5 h-2.5 rounded-full ${dot}`} />
        <span className="text-sm text-white/70">{label}</span>
      </div>
      <p className="text-2xl font-medium tracking-tight text-white">{value}</p>
    </button>
  );
}

function MiniMeta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.18em] text-white/45 mb-2">
        {label}
      </p>
      <p className="text-sm text-white/90">{value}</p>
    </div>
  );
}

function DarkExpandMeta({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
      <p className="text-[11px] uppercase tracking-[0.18em] text-white/45 mb-2">
        {label}
      </p>
      <p className="text-sm font-medium text-white break-all">{value}</p>
    </div>
  );
}

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className="rounded-2xl border border-emerald-900/8 bg-white px-4 py-3 shadow-lg">
      <p className="text-sm font-medium text-[#064E3B] mb-2">{label}</p>
      {payload.map((entry: any) => (
        <div
          key={entry.dataKey}
          className="flex items-center justify-between gap-5 text-sm"
        >
          <span className="text-emerald-700/70 capitalize">
            {entry.dataKey}
          </span>
          <span className="font-medium text-[#064E3B]">{entry.value}</span>
        </div>
      ))}
    </div>
  );
}

function DarkTooltip({ active, payload, label }: any) {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className="rounded-2xl border border-white/10 bg-[#102822] px-4 py-3 shadow-lg">
      <p className="text-sm font-medium text-white mb-2">{label}</p>
      {payload.map((entry: any) => (
        <div
          key={entry.dataKey}
          className="flex items-center justify-between gap-5 text-sm"
        >
          <span className="text-white/70 capitalize">{entry.dataKey}</span>
          <span className="font-medium text-white">{entry.value}</span>
        </div>
      ))}
    </div>
  );
}