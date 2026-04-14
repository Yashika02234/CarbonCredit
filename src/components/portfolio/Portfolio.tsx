import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { ChevronDown, ArrowUpRight, CheckCircle2, ShieldCheck, Download, History, BadgeDollarSign, Leaf, Activity } from "lucide-react";

import { usePortfolio } from "@/context/PortfolioContext";
import AddAssetModal from "./AddAssetModal";
import RetireCreditsModal from "./RetireCreditsModal";
import CertificatePDF from "./CertificatePDF";
import { downloadPDF } from "@/utils/downloadPDF";
import { ActiveProjectsSection } from "./ActiveProjectsSection";

/* =========================
   ANIMATED HELPERS
========================= */
const fadeUpVariants: any = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

function AnimatedCountUp({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const spring = useSpring(0, { bounce: 0, duration: 2500 });
  const display = useTransform(spring, (current) => `${prefix}${Math.round(current).toLocaleString()}${suffix}`);

  useEffect(() => {
    spring.set(value);
  }, [value, spring]);

  return <motion.span>{display}</motion.span>;
}

/* =========================
   MAIN COMPONENT
========================= */
export default function Portfolio() {
  const { assets, certificates, retireCredits } = usePortfolio();
  const { scrollY } = useScroll();

  // Sticky Bar Animation
  const stickyOpacity = useTransform(scrollY, [150, 300], [0, 1]);
  const stickyY = useTransform(scrollY, [150, 300], [-50, 0]);

  // Modals & States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [retireTarget, setRetireTarget] = useState<{ projectId: string; projectName: string; quantity: number; } | null>(null);
  const [logFilter, setLogFilter] = useState<"all" | "purchases" | "retirements">("all");
  const [chartRange, setChartRange] = useState("ALL");

  // Portfolio Computations
  const ownedAssets = assets.filter((a) => a.status === "owned");
  const totalCredits = assets.reduce((s, a) => s + a.quantity, 0);
  const activeCredits = ownedAssets.reduce((s, a) => s + a.quantity, 0);
  const retiredCredits = certificates.reduce((s, c) => s + c.quantity, 0);
  const portfolioValueNumeric = totalCredits * 12; // Static $12 mock price logic

  const portfolioValueSeries = useMemo(() => {
    let cumulative = 0;
    return assets.map((a, index) => {
      cumulative += a.quantity * 12; // Adjusted to uniform price for aesthetic chart
      return { label: `M${index + 1}`, value: cumulative };
    });
  }, [assets]);

  const KPI = ({ label, valueNumeric, prefix = "", suffix = "", icon: Icon }: any) => (
    <motion.div
      variants={fadeUpVariants}
      className="relative group overflow-hidden bg-white rounded-3xl p-8 border border-black/5 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1.5"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10 flex flex-col h-full justify-between gap-4">
        <div className="flex items-center justify-between">
          <p className="text-xs font-bold uppercase tracking-widest text-neutral-500">{label}</p>
          <div className="w-10 h-10 rounded-2xl bg-neutral-50 flex items-center justify-center text-neutral-400 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors duration-500 border border-black/5">
            <Icon className="w-5 h-5" />
          </div>
        </div>

        <div>
          <h3 className="text-4xl md:text-5xl font-semibold tracking-tight text-neutral-900 group-hover:scale-[1.02] transform origin-left transition-transform duration-500">
            <AnimatedCountUp value={valueNumeric} prefix={prefix} suffix={suffix} />
          </h3>
          <p className="text-sm text-neutral-400 font-medium mt-2 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-2 group-hover:translate-y-0">
            <ArrowUpRight className="w-4 h-4 text-emerald-500" /> Tracked live
          </p>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-[#F5F5F5] font-sans selection:bg-emerald-100 pb-32">
      
      {/* ================= STICKY SUMMARY NAV ================= */}
      <motion.div 
        style={{ opacity: stickyOpacity, y: stickyY }}
        className="fixed top-24 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-5xl bg-white/80 backdrop-blur-xl border border-black/5 shadow-lg rounded-full px-8 py-4 flex items-center justify-between pointer-events-auto"
      >
        <div className="flex items-center gap-6">
           <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
              <Leaf className="w-5 h-5" />
           </div>
           <div>
             <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Total Value</p>
             <p className="text-lg font-bold text-neutral-900">${portfolioValueNumeric.toLocaleString()}</p>
           </div>
        </div>
        <div className="hidden md:flex gap-8">
           <div>
             <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Active</p>
             <p className="text-sm font-bold text-neutral-800">{activeCredits.toLocaleString()} tCO₂e</p>
           </div>
           <div>
             <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Retired</p>
             <p className="text-sm font-bold text-emerald-700">{retiredCredits.toLocaleString()} tCO₂e</p>
           </div>
        </div>
      </motion.div>

      <div className="max-w-[1600px] mx-auto pt-16 md:pt-24 px-6 md:px-12">

        {/* ================= HEADER ================= */}
        <motion.header 
          initial="hidden" animate="visible" variants={fadeUpVariants}
          className="mb-16"
        >
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-light tracking-tight">
            Portfolio <span className="text-neutral-400 font-light hidden sm:inline">Overview</span>
          </h1>
          <p className="text-xl md:text-2xl text-neutral-500 font-medium max-w-3xl leading-snug">
            Monitor your climate investments, orchestrate credit retirements, and verify your global footprint in real-time.
          </p>
        </motion.header>
       
        {/* ================= KPIs ================= */}
        <motion.section 
          initial="hidden" animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24"
        >
          <KPI label="Total Credits Held" valueNumeric={totalCredits} icon={DatabaseIcon} />
          <KPI label="Active Supply" valueNumeric={activeCredits} suffix=" t" icon={ActivityIcon} />
          <KPI label="Permanently Retired" valueNumeric={retiredCredits} suffix=" t" icon={ShieldCheck} />
          <KPI label="Total Portfolio Value" valueNumeric={portfolioValueNumeric} prefix="$" icon={BadgeDollarSign} />
        </motion.section>

        {/* ================= ASSET ALLOCATION ================= */}
        <motion.section 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariants}
          className="bg-white rounded-[2rem] border border-black/5 shadow-sm p-8 md:p-12 mb-24"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <h2 className="text-3xl font-light tracking-tight text-slate-800 mb-2">Asset Allocation</h2>
              <p className="text-slate-500 font-medium">Live distribution of your actively held climate investments.</p>
            </div>
          </div>

          <div className="relative h-72 md:h-96 w-full flex items-center justify-center">
            {ownedAssets.length === 0 ? (
               <p className="text-slate-500 font-medium text-lg border border-dashed border-black/10 rounded-2xl p-12 bg-slate-50 text-center max-w-sm">No active assets available yet to construct your allocation chart.</p>
            ) : (
               <AnimatedDonutChart data={ownedAssets.map((a: any, i: number) => ({ label: a.projectName, value: a.quantity, color: ["#022c22", "#064e3b", "#065f46", "#047857", "#059669", "#10b981", "#34d399", "#6ee7b7", "#a7f3d0"][i % 9] }))} />
            )}
          </div>
        </motion.section>

        {/* ================= ACTIVE PROJECTS (Re-Imported) ================= */}
        <ActiveProjectsSection ownedAssets={ownedAssets} setRetireTarget={setRetireTarget} />

        {/* ================= EDUCATIONAL ACCORDION ================= */}
        <motion.section 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariants}
          className="bg-emerald-950 rounded-[3rem] p-10 md:p-20 text-emerald-50 my-24 overflow-hidden relative"
        >
          {/* Decorative background blur */}
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-emerald-500/20 blur-[100px] rounded-full point-events-none" />

          <div className="grid lg:grid-cols-5 gap-16 relative z-10">
            <div className="lg:col-span-2">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">How credit retirement works</h2>
              <p className="text-emerald-200/80 text-lg leading-relaxed mb-8">
                Retiring credits is the crucial final mechanism. It ensures your climate impact is permanent, mathematically verifiable, and definitively removed from global circulation.
              </p>
            </div>
            
            <div className="lg:col-span-3 divide-y divide-emerald-800/50">
              <RetirementItem title="Dematerialization from circulation" content="Retiring a carbon credit permanently burns it at the registry level. It removes it completely from circulation, ensuring it cannot be resold or re-claimed." />
              <RetirementItem title="Immutability & Double-Counting" content="Once retired, the credit is permanently locked in the central ledger. This blockchain-verified step prevents the core issue of double counting in ESG markets." />
              <RetirementItem title="Proof of Impact Generation" content="A cryptographic retirement certificate is instantly issued. This verified receipt can be used directly for your Scope 3 ESG audits, disclosures, and climate pledges." />
            </div>
          </div>
        </motion.section>

        {/* ================= RETIRED PROJECTS ================= */}
        <motion.section 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariants}
          className="my-24"
        >
          <div className="flex items-center gap-4 mb-12">
             <div className="p-3 bg-neutral-100 rounded-2xl border border-black/5 text-neutral-600 shadow-sm">
                <ShieldCheck className="w-6 h-6" />
             </div>
             <h2 className="text-4xl font-bold tracking-tight">Retired Projects</h2>
          </div>

          {certificates.length === 0 ? (
             <div className="flex flex-col items-center justify-center p-24 rounded-[2rem] bg-white border border-dashed border-black/10 text-center shadow-sm">
               <ShieldCheck className="w-12 h-12 text-neutral-300 mb-4" />
               <p className="text-xl font-bold text-neutral-800">No retirements yet</p>
               <p className="text-neutral-500 mt-2 max-w-sm">Retire active credits from your portfolio to generate permanent verifiable certificates.</p>
             </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {certificates.map(cert => (
                <div key={cert.certificateId} className="group bg-white rounded-3xl p-8 border border-black/5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 flex flex-col">
                  
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-500">
                       <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <span className="bg-neutral-100 text-neutral-600 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase">
                      Certificate
                    </span>
                  </div>

                  <h3 className="font-bold text-xl text-neutral-900 mb-2 leading-tight">
                    {cert.projectName}
                  </h3>
                  
                  <div className="space-y-4 my-6 py-6 border-y border-neutral-100 flex-1">
                    <div className="flex justify-between">
                      <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">Yield</span>
                      <strong className="text-sm font-bold text-neutral-800">{cert.quantity.toLocaleString()} <span className="text-neutral-400">tCO₂e</span></strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">Date</span>
                      <strong className="text-sm font-semibold text-neutral-800">{new Date(cert.createdAt || Date.now()).toLocaleDateString()}</strong>
                    </div>
                  </div>

                  <button
                    onClick={() => downloadPDF(<CertificatePDF {...cert} />, `${cert.certificateId}.pdf`)}
                    className="flex justify-center items-center gap-2 w-full py-3.5 bg-neutral-900 text-white rounded-xl text-sm font-bold hover:bg-emerald-700 transition-colors shadow-sm"
                  >
                    <Download className="w-4 h-4" /> View Full Certificate
                  </button>
                </div>
              ))}
            </div>
          )}
        </motion.section>

        {/* ================= ACTIVITY LOG ================= */}
        <motion.section 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariants}
          className="bg-white border border-black/5 shadow-sm rounded-[2rem] overflow-hidden"
        >
          <div className="p-8 md:p-10 border-b border-neutral-100 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-2">Transaction Ledger</h2>
              <p className="text-neutral-500 font-medium text-sm">A verified chronological ledger of asset state changes.</p>
            </div>
            
            <div className="flex gap-2 p-1 bg-neutral-100 rounded-xl border border-black/5 w-max">
              {(["all", "purchases", "retirements"] as const).map(f => (
                <button
                  key={f} onClick={() => setLogFilter(f)}
                  className={`px-4 py-2 font-bold uppercase tracking-widest text-[10px] rounded-lg transition-all ${logFilter === f ? 'bg-white shadow-sm text-neutral-900' : 'text-neutral-400 hover:text-neutral-700'}`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left whitespace-nowrap">
              <thead className="bg-[#FAFBFB] text-xs uppercase font-bold tracking-widest text-neutral-400 border-b border-black/5">
                <tr>
                  <th className="px-8 py-5 rounded-tl-xl">Timestamp</th>
                  <th className="px-8 py-5">Event</th>
                  <th className="px-8 py-5">Target Project</th>
                  <th className="px-8 py-5 text-right">Volume</th>
                  <th className="px-8 py-5">Chain Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5">
                {assets.filter(asset => logFilter === 'all' || logFilter === 'purchases').map(asset => (
                  <tr key={`buy-${asset.projectId}`} className="group hover:bg-neutral-50/50 transition-colors">
                    <td className="px-8 py-5 font-semibold text-neutral-600">{new Date(asset.createdAt || Date.now()).toLocaleDateString()}</td>
                    <td className="px-8 py-5">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-bold tracking-wide border border-blue-100">
                        <ArrowUpRight className="w-3 h-3" /> Acquisition
                      </span>
                    </td>
                    <td className="px-8 py-5 font-semibold text-neutral-900">{asset.projectName}</td>
                    <td className="px-8 py-5 text-right font-bold text-neutral-900">+{asset.quantity.toLocaleString()} t</td>
                    <td className="px-8 py-5">
                      <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 uppercase tracking-widest">
                        <CheckCircle2 className="w-4 h-4" /> Settled
                      </span>
                    </td>
                  </tr>
                ))}
                {certificates.filter(cert => logFilter === 'all' || logFilter === 'retirements').map(cert => (
                  <tr key={`retire-${cert.certificateId}`} className="group hover:bg-neutral-50/50 transition-colors">
                    <td className="px-8 py-5 font-semibold text-neutral-600">{new Date(cert.createdAt || Date.now()).toLocaleDateString()}</td>
                    <td className="px-8 py-5">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-700 rounded-lg text-xs font-bold tracking-wide border border-amber-100">
                        <ShieldCheck className="w-3 h-3" /> Burn
                      </span>
                    </td>
                    <td className="px-8 py-5 font-semibold text-neutral-900">{cert.projectName}</td>
                    <td className="px-8 py-5 text-right font-bold text-neutral-900">-{cert.quantity.toLocaleString()} t</td>
                    <td className="px-8 py-5">
                      <span className="flex items-center gap-1.5 text-xs font-bold text-neutral-400 uppercase tracking-widest">
                        <History className="w-4 h-4" /> Permanently Retired
                      </span>
                    </td>
                  </tr>
                ))}
                {(assets.length === 0 && certificates.length === 0) && (
                  <tr>
                    <td colSpan={5} className="py-20 text-center text-neutral-400 font-medium">No ledger events found for your account.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.section>

      </div>

      {/* MODALS */}
      <AddAssetModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onAdd={() => setIsAddModalOpen(false)} />
      {retireTarget && (
        <RetireCreditsModal
          isOpen onClose={() => setRetireTarget(null)} projectName={retireTarget.projectName} ownedQuantity={retireTarget.quantity}
          onConfirm={(qty) => { retireCredits(retireTarget.projectId, qty); setRetireTarget(null); }}
        />
      )}
    </div>
  );
}

/* =========================
   UI HELPERS & CHARTS
========================= */

function AnimatedDonutChart({ data }: { data: { label: string; value: number; color: string }[] }) {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let cumulativeValue = 0;

  return (
    <div className="w-full max-w-4xl h-full flex flex-col md:flex-row items-center justify-center gap-16 group">
      <div className="relative w-56 h-56 md:w-80 md:h-80 shrink-0">
        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90 drop-shadow-sm">
          {data.map((item, i) => {
            const percentage = item.value / total;
            const strokeDasharray = `${percentage * 283} 283`;
            const strokeDashoffset = -cumulativeValue / total * 283;
            cumulativeValue += item.value;

            return (
              <motion.circle
                key={i}
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke={item.color}
                strokeWidth="10"
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: i * 0.1 }}
                className="hover:stroke-emerald-400 transition-colors cursor-pointer"
              />
            );
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
           <p className="text-[10px] font-medium text-slate-400 uppercase tracking-widest mb-1">Total Assets</p>
           <p className="text-3xl font-light text-slate-800 tracking-tight">{total.toLocaleString()}<span className="text-sm">t</span></p>
        </div>
      </div>
      
      <div className="flex flex-col gap-4 w-full md:w-auto min-w-[200px] border-t md:border-t-0 md:border-l border-black/5 pt-6 md:pt-0 md:pl-12">
        {data.map((item, i) => (
          <div key={i} className="flex items-center justify-between gap-8 group-hover:opacity-40 hover:!opacity-100 transition-opacity cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: item.color }} />
              <p className="text-sm font-medium text-slate-600 truncate max-w-[12rem] md:max-w-[16rem]">{item.label}</p>
            </div>
            <p className="text-sm font-medium text-slate-900">{Math.round((item.value / total) * 100)}%</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function RetirementItem({ title, content }: { title: string; content: string; }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="py-6">
      <button onClick={() => setOpen(!open)} className="w-full flex justify-between items-center text-left group">
        <span className="text-xl font-semibold text-emerald-50 group-hover:text-white transition-colors">{title}</span>
        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 border border-emerald-800 ${open ? 'bg-emerald-800 text-white rotate-180' : 'bg-transparent text-emerald-400 group-hover:bg-emerald-800 group-hover:text-emerald-50'}`}>
          <ChevronDown className="w-5 h-5" />
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden"
          >
            <p className="pt-4 text-emerald-200/80 leading-relaxed max-w-4xl text-lg relative pl-6 border-l-2 border-emerald-800/50 my-2">
              {content}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Minimal Icons for KPIs
const DatabaseIcon = (props: any) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M3 5V19A9 3 0 0 0 21 19V5"></path><path d="M3 12A9 3 0 0 0 21 12"></path></svg>;
const ActivityIcon = (props: any) => <Activity {...props} />;
