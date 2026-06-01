// ─────────────────────────────────────────────────────────────────────────────
// ComplianceProblemPlatform — Apple-style sticky scroll storytelling
// Phase 1: Core Problem (5 steps) → Transition → Phase 2: Platform (5 modules)
// Uses Framer Motion useScroll + useTransform
// ─────────────────────────────────────────────────────────────────────────────
import { useRef, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useSpring,
} from "framer-motion";

// ── Types ─────────────────────────────────────────────────────────────────────
type Phase = "problem" | "transition" | "platform" | "final";

// ── Scroll config ─────────────────────────────────────────────────────────────
// Total "virtual" scroll steps:  5 problems + 1 transition + 5 modules + 1 final = 12
// We allocate 1 viewport-height per step for 100vh × 12 = 1200vh of scroll space
const STEPS = {
  PROBLEMS: 5,
  TRANSITION: 1,
  MODULES: 5,
  FINAL: 1,
};
const TOTAL_STEPS = STEPS.PROBLEMS + STEPS.TRANSITION + STEPS.MODULES + STEPS.FINAL; // 12

// ── Inline SVG Icons ──────────────────────────────────────────────────────────
function IcoFragmented({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 28" fill="none" className={className} aria-hidden>
      <rect x="3" y="3" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      <rect x="17" y="3" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      <rect x="3" y="17" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      <rect x="17" y="17" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M11 7h6M11 21h6M7 11v6M21 11v6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeDasharray="2 2" />
    </svg>
  );
}
function IcoSpreadsheet({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 28" fill="none" className={className} aria-hidden>
      <rect x="4" y="4" width="20" height="20" rx="2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M4 10h20M4 16h20M10 10v14M17 10v14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M13 7l2 2-2 2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IcoConsultant({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 28" fill="none" className={className} aria-hidden>
      <circle cx="14" cy="9" r="4" stroke="currentColor" strokeWidth="1.4" />
      <path d="M5 23c0-4.418 4.03-8 9-8s9 3.582 9 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M20 13l2 2-2 2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IcoValidation({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 28" fill="none" className={className} aria-hidden>
      <circle cx="14" cy="14" r="10" stroke="currentColor" strokeWidth="1.4" />
      <path d="M9 14l3 3 7-7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3 2" />
    </svg>
  );
}
function IcoAudit({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 28" fill="none" className={className} aria-hidden>
      <rect x="5" y="4" width="18" height="20" rx="2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M9 10h10M9 14h10M9 18h6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M18 19l2 2 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IcoCalc({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 28" fill="none" className={className} aria-hidden>
      <rect x="4" y="4" width="20" height="20" rx="2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M9 9h10M9 14h5M9 19h3M17 14l4 5M21 14l-4 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}
function IcoEngine({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 28" fill="none" className={className} aria-hidden>
      <circle cx="14" cy="14" r="5" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="14" cy="14" r="1.5" fill="currentColor" />
      <path d="M14 4v4M14 20v4M4 14h4M20 14h4M6.34 6.34l2.83 2.83M18.83 18.83l2.83 2.83M21.66 6.34l-2.83 2.83M9.17 18.83l-2.83 2.83" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}
function IcoTrail({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 28" fill="none" className={className} aria-hidden>
      <path d="M6 8h16M6 14h12M6 20h8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="22" cy="14" r="2.5" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="17" cy="20" r="2.5" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}
function IcoReport({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 28" fill="none" className={className} aria-hidden>
      <rect x="5" y="3" width="18" height="22" rx="2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M9 9h10M9 13h10M9 17h6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M17 18l2 2 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IcoData({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 28" fill="none" className={className} aria-hidden>
      <ellipse cx="14" cy="9" rx="9" ry="4" stroke="currentColor" strokeWidth="1.4" />
      <path d="M5 9v5c0 2.21 4.03 4 9 4s9-1.79 9-4V9" stroke="currentColor" strokeWidth="1.4" />
      <path d="M5 14v5c0 2.21 4.03 4 9 4s9-1.79 9-4v-5" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}
function IcoCore({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden>
      <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="16" cy="16" r="6" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
      <circle cx="16" cy="16" r="2.5" fill="currentColor" />
      <path d="M16 4v4M16 24v4M4 16h4M24 16h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}
function IcoCheck() {
  return (
    <svg viewBox="0 0 14 14" fill="none" className="w-3.5 h-3.5" aria-hidden>
      <path d="M2 7l4 4 6-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ── Data ──────────────────────────────────────────────────────────────────────
const PROBLEMS = [
  {
    id: "fragmented",
    index: 0,
    title: "Fragmented Data",
    desc: "Emissions data lives across ERP systems, spreadsheets, utility invoices, and supplier records with no single source of truth.",
    severity: "high" as const,
    icon: IcoFragmented,
    visual: ["ERP", "Sheets", "Invoices", "Suppliers", "Emails"],
  },
  {
    id: "spreadsheet",
    index: 1,
    title: "Spreadsheet Dependency",
    desc: "Manual calculations introduce errors, inconsistencies, and reporting delays at every stage of the compliance workflow.",
    severity: "high" as const,
    icon: IcoSpreadsheet,
    visual: ["=SUM(B2:B47)", "N/A", "#REF!", "Manual entry", "Copy/Paste"],
  },
  {
    id: "consultant",
    index: 2,
    title: "Consultant Reliance",
    desc: "Organizations depend on external consultants for emissions calculations, creating cost, latency, and knowledge gaps.",
    severity: "medium" as const,
    icon: IcoConsultant,
    visual: ["3-week turnaround", "High fees", "Data gaps", "Version control issues"],
  },
  {
    id: "validation",
    index: 3,
    title: "Weak Validation",
    desc: "Limited verification mechanisms make reported emissions difficult to trust, audit, or defend before regulators.",
    severity: "medium" as const,
    icon: IcoValidation,
    visual: ["No checks", "Unverified inputs", "Missing baselines", "Methodology gaps"],
  },
  {
    id: "audit",
    index: 4,
    title: "Audit Risk",
    desc: "Incomplete records and poor traceability create serious regulatory, financial, and reputational exposure.",
    severity: "high" as const,
    icon: IcoAudit,
    visual: ["Missing records", "Liability exposure", "Penalties", "Regulator flags"],
  },
];

const MODULES = [
  {
    id: "calc",
    index: 0,
    title: "Emissions Calculation",
    desc: "Automated carbon footprint calculations across operations and supply chains.",
    icon: IcoCalc,
    solves: "Eliminates manual spreadsheet errors",
    angle: -120, // degrees around center circle
    color: "from-blue-500/10 to-blue-500/5",
    accent: "border-blue-200 text-blue-700",
    dot: "bg-blue-400",
  },
  {
    id: "engine",
    index: 1,
    title: "Validation Engine",
    desc: "Verification rules and consistency checks for compliance readiness.",
    icon: IcoEngine,
    solves: "Replaces weak manual verification",
    angle: -60,
    color: "from-violet-500/10 to-violet-500/5",
    accent: "border-violet-200 text-violet-700",
    dot: "bg-violet-400",
  },
  {
    id: "trail",
    index: 2,
    title: "Audit Trails",
    desc: "Immutable record history and full reporting traceability.",
    icon: IcoTrail,
    solves: "Closes audit risk gaps completely",
    angle: 0,
    color: "from-emerald-500/10 to-emerald-500/5",
    accent: "border-emerald-200 text-emerald-700",
    dot: "bg-emerald-400",
  },
  {
    id: "report",
    index: 3,
    title: "Compliance Reporting",
    desc: "Generate CBAM, EU ETS, CSRD, and CCTS regulatory reporting outputs.",
    icon: IcoReport,
    solves: "Automates consultant-dependent reports",
    angle: 60,
    color: "from-amber-500/10 to-amber-500/5",
    accent: "border-amber-200 text-amber-700",
    dot: "bg-amber-400",
  },
  {
    id: "data",
    index: 4,
    title: "Data Integrity Layer",
    desc: "Maintain structured, trustworthy, and auditable emissions data.",
    icon: IcoData,
    solves: "Unifies all fragmented data sources",
    angle: 120,
    color: "from-rose-500/10 to-rose-500/5",
    accent: "border-rose-200 text-rose-700",
    dot: "bg-rose-400",
  },
];

const BENEFITS = [
  "Faster Compliance",
  "Reduced Audit Risk",
  "Better Data Integrity",
  "Lower Reporting Costs",
  "Audit-Ready Outputs",
];

// ── Animated SVG connector line ───────────────────────────────────────────────
function ConnectorLine({
  angle,
  visible,
  delay = 0,
}: {
  angle: number;
  visible: boolean;
  delay?: number;
}) {
  const rad = (angle * Math.PI) / 180;
  const r = 108; // distance from center to module (px)
  const cx = 140; // SVG center x
  const cy = 140; // SVG center y
  const x2 = cx + r * Math.cos(rad);
  const y2 = cy + r * Math.sin(rad);

  return (
    <motion.line
      x1={cx}
      y1={cy}
      x2={x2}
      y2={y2}
      stroke="#10b981"
      strokeWidth={1.5}
      strokeDasharray="4 3"
      strokeLinecap="round"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={visible ? { pathLength: 1, opacity: 0.55 } : { pathLength: 0, opacity: 0 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    />
  );
}

// ── Hub diagram component ─────────────────────────────────────────────────────
function HubDiagram({
  activeModuleCount,
  isMobile,
}: {
  activeModuleCount: number;
  isMobile: boolean;
}) {
  if (isMobile) {
    // Mobile: simple vertical list
    return (
      <div className="w-full flex flex-col gap-3">
        {/* Core */}
        <div className="flex items-center gap-3 p-4 rounded-2xl border-2 border-emerald-200 bg-gradient-to-r from-emerald-50 to-white">
          <span className="h-10 w-10 rounded-xl bg-[#07110E] flex items-center justify-center text-emerald-300 shrink-0">
            <IcoCore className="w-5 h-5" />
          </span>
          <div>
            <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-emerald-600">Core Engine</p>
            <p className="text-[13px] font-semibold text-slate-900">OffsetX Compliance Engine</p>
          </div>
        </div>
        {MODULES.map((m, i) => {
          const visible = i < activeModuleCount;
          return (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, x: -20 }}
              animate={visible ? { opacity: 1, x: 0 } : { opacity: 0.15, x: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className={`flex items-start gap-3 p-4 rounded-xl border bg-gradient-to-br ${m.color} ${m.accent}`}
            >
              <span className={`h-8 w-8 rounded-lg border ${m.accent} flex items-center justify-center shrink-0`}>
                <m.icon className="w-4 h-4" />
              </span>
              <div>
                <p className="text-[12px] font-semibold leading-snug">{m.title}</p>
                <p className="text-[11px] text-slate-500 leading-relaxed mt-0.5">{m.solves}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    );
  }

  // Desktop: radial hub SVG + module cards positioned around it
  const SVG_SIZE = 280;
  const CX = SVG_SIZE / 2;
  const CY = SVG_SIZE / 2;
  const MODULE_R = 108; // radius for module cards

  return (
    <div className="relative w-full flex flex-col items-center">
      {/* SVG hub (lines + center) */}
      <div className="relative" style={{ width: SVG_SIZE, height: SVG_SIZE }}>
        <svg
          viewBox={`0 0 ${SVG_SIZE} ${SVG_SIZE}`}
          className="absolute inset-0 w-full h-full"
          aria-hidden
        >
          {/* Outer rings */}
          <circle cx={CX} cy={CY} r={104} stroke="#e2e8f0" strokeWidth={1} strokeDasharray="4 4" fill="none" />
          <circle cx={CX} cy={CY} r={60} stroke="#e2e8f0" strokeWidth={1} fill="none" />
          {/* Connectors */}
          {MODULES.map((m, i) => (
            <ConnectorLine
              key={m.id}
              angle={m.angle}
              visible={i < activeModuleCount}
              delay={i * 0.12}
            />
          ))}
        </svg>

        {/* Center core badge */}
        <div
          className="absolute"
          style={{
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center gap-1.5 px-5 py-4 rounded-2xl border-2 border-emerald-200 bg-gradient-to-b from-emerald-50 to-white shadow-[0_4px_24px_rgba(16,185,129,0.15)] text-center"
            style={{ minWidth: 90 }}
          >
            <span className="h-10 w-10 rounded-xl bg-[#07110E] flex items-center justify-center text-emerald-300">
              <IcoCore className="w-5 h-5" />
            </span>
            <p className="text-[9px] font-bold tracking-[0.15em] uppercase text-emerald-600 leading-none">Engine</p>
            <p className="text-[11px] font-semibold text-slate-800 leading-snug">OffsetX</p>
          </motion.div>
        </div>

        {/* Module dots positioned radially */}
        {MODULES.map((m, i) => {
          const rad = (m.angle * Math.PI) / 180;
          const px = CX + MODULE_R * Math.cos(rad);
          const py = CY + MODULE_R * Math.sin(rad);
          const visible = i < activeModuleCount;
          return (
            <motion.div
              key={m.id}
              className="absolute"
              style={{
                left: px,
                top: py,
                transform: "translate(-50%, -50%)",
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={visible ? { scale: 1, opacity: 1 } : { scale: 0.4, opacity: 0 }}
              transition={{ duration: 0.45, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className={`h-8 w-8 rounded-xl border-2 ${m.accent} bg-white shadow-md flex items-center justify-center`}>
                <m.icon className="w-4 h-4" />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Module legend below */}
      <div className="mt-6 w-full grid grid-cols-1 gap-2 max-w-sm">
        {MODULES.map((m, i) => {
          const visible = i < activeModuleCount;
          return (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, x: 16 }}
              animate={visible ? { opacity: 1, x: 0 } : { opacity: 0.12, x: 16 }}
              transition={{ duration: 0.4, delay: i * 0.08, ease: "easeOut" }}
              className="flex items-center gap-3"
            >
              <span className={`h-1.5 w-1.5 rounded-full shrink-0 ${m.dot}`} />
              <span className={`text-[12px] font-semibold ${visible ? "text-slate-700" : "text-slate-300"}`}>
                {m.title}
              </span>
              {visible && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="ml-auto text-[10px] text-emerald-600 font-medium"
                >
                  Active
                </motion.span>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// ── Problem visual chip strip ─────────────────────────────────────────────────
function ProblemVisual({ items, severity }: { items: string[]; severity: "high" | "medium" }) {
  const color = severity === "high" ? "bg-red-50 border-red-100 text-red-600" : "bg-amber-50 border-amber-100 text-amber-700";
  return (
    <div className="flex flex-wrap gap-2 mt-5">
      {items.map((item, i) => (
        <motion.span
          key={item}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: i * 0.06 }}
          className={`text-[11px] font-medium px-2.5 py-1 rounded-full border ${color}`}
        >
          {item}
        </motion.span>
      ))}
    </div>
  );
}

// ── Progress indicator (vertical pill bar) ────────────────────────────────────
function ProgressPill({
  total,
  current,
  phase,
}: {
  total: number;
  current: number;
  phase: Phase;
}) {
  const isProblem = phase === "problem";
  const colors = isProblem
    ? { fill: "bg-red-400", track: "bg-red-100" }
    : { fill: "bg-emerald-400", track: "bg-emerald-100" };

  return (
    <div className="flex flex-col gap-1.5">
      {Array.from({ length: total }).map((_, i) => (
        <motion.div
          key={i}
          className={`h-1 w-6 rounded-full ${colors.track} overflow-hidden`}
        >
          <motion.div
            className={`h-full rounded-full ${colors.fill}`}
            initial={{ width: "0%" }}
            animate={{ width: i <= current ? "100%" : "0%" }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          />
        </motion.div>
      ))}
    </div>
  );
}

// ── Step counter badge ────────────────────────────────────────────────────────
function StepBadge({ step, total, phase }: { step: number; total: number; phase: Phase }) {
  const label = phase === "problem" ? "Problem" : phase === "platform" ? "Module" : "";
  if (!label) return null;
  return (
    <div className="flex items-center gap-2">
      <span className="text-[11px] font-bold tracking-[0.18em] uppercase text-white/40">
        {label}
      </span>
      <span className="text-[11px] font-bold text-white/25">
        {step + 1} / {total}
      </span>
    </div>
  );
}

// ── Main exported component ───────────────────────────────────────────────────
export default function ComplianceProblemPlatform() {
  const containerRef = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Scroll tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Map scrollYProgress [0,1] → step index [0, TOTAL_STEPS-1]
  const rawStep = useTransform(scrollYProgress, [0, 1], [0, TOTAL_STEPS - 0.001]);
  const springStep = useSpring(rawStep, { stiffness: 80, damping: 20, mass: 0.5 });

  const [step, setStep] = useState(0);

  useEffect(() => {
    const unsub = springStep.on("change", (v) => {
      setStep(Math.floor(v));
    });
    return unsub;
  }, [springStep]);

  // Determine phase and sub-index
  const phase: Phase =
    step < STEPS.PROBLEMS
      ? "problem"
      : step < STEPS.PROBLEMS + STEPS.TRANSITION
      ? "transition"
      : step < STEPS.PROBLEMS + STEPS.TRANSITION + STEPS.MODULES
      ? "platform"
      : "final";

  const problemIndex = Math.min(step, STEPS.PROBLEMS - 1);
  const moduleCount =
    phase === "platform"
      ? step - STEPS.PROBLEMS - STEPS.TRANSITION + 1
      : phase === "final"
      ? STEPS.MODULES
      : 0;

  // Background color transition
  const bgProgress = useTransform(
    scrollYProgress,
    [
      0,
      (STEPS.PROBLEMS - 0.5) / TOTAL_STEPS,
      (STEPS.PROBLEMS + STEPS.TRANSITION - 0.5) / TOTAL_STEPS,
      (STEPS.PROBLEMS + STEPS.TRANSITION) / TOTAL_STEPS,
      1,
    ],
    [0, 0, 0.5, 1, 1]
  );

  const currentProblem = PROBLEMS[problemIndex];
  const currentModule = phase === "platform"
    ? MODULES[Math.min(step - STEPS.PROBLEMS - STEPS.TRANSITION, STEPS.MODULES - 1)]
    : null;

  return (
    // Container: TOTAL_STEPS × 100vh of scroll space
    <section
      ref={containerRef}
      id="compliance-story"
      className="relative w-full"
      style={{ height: `${TOTAL_STEPS * 100}vh` }}
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Animated background */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: useTransform(
              bgProgress,
              [0, 0.5, 1],
              ["#07110E", "#07110E", "#040d0a"]
            ),
          }}
        />

        {/* Subtle dot-grid texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* ── LAYOUT ── */}
        <div className="relative h-full flex flex-col">
          {/* Top eyebrow bar */}
          <div className="flex items-center justify-between px-6 md:px-12 pt-10 pb-0 shrink-0">
            <AnimatePresence mode="wait">
              <motion.p
                key={phase}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.4 }}
                className={`text-[11px] font-bold tracking-[0.22em] uppercase ${
                  phase === "problem" ? "text-red-400" :
                  phase === "transition" ? "text-slate-400" :
                  "text-emerald-400"
                }`}
              >
                {phase === "problem" ? "CORE PROBLEM" :
                 phase === "transition" ? "TRANSFORMATION" :
                 phase === "platform" ? "OFFSETX PLATFORM" :
                 "OFFSETX PLATFORM"}
              </motion.p>
            </AnimatePresence>

            {/* Step counter */}
            <AnimatePresence mode="wait">
              {(phase === "problem" || phase === "platform") && (
                <motion.div
                  key={`${phase}-badge`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <StepBadge
                    step={phase === "problem" ? problemIndex : step - STEPS.PROBLEMS - STEPS.TRANSITION}
                    total={phase === "problem" ? STEPS.PROBLEMS : STEPS.MODULES}
                    phase={phase}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Main content area */}
          <div className="flex-1 flex flex-col md:flex-row items-center justify-center px-6 md:px-12 gap-8 md:gap-16 py-8">
            {/* LEFT — narrative panel */}
            <div className="w-full md:w-[480px] shrink-0 flex flex-col gap-0">

              {/* ── PHASE: PROBLEM ── */}
              <AnimatePresence mode="wait">
                {phase === "problem" && (
                  <motion.div
                    key={`problem-${currentProblem.id}`}
                    initial={{ opacity: 0, y: 32 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -32 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col"
                  >
                    {/* Problem number */}
                    <div className="flex items-center gap-3 mb-6">
                      <span
                        className={`
                          h-8 w-8 rounded-full flex items-center justify-center
                          text-[12px] font-bold border-2
                          ${currentProblem.severity === "high"
                            ? "border-red-300 text-red-400 bg-red-950/30"
                            : "border-amber-300 text-amber-400 bg-amber-950/20"}
                        `}
                      >
                        {currentProblem.index + 1}
                      </span>
                      <span
                        className={`text-[11px] font-bold tracking-[0.15em] uppercase
                          ${currentProblem.severity === "high" ? "text-red-400" : "text-amber-400"}`}
                      >
                        {currentProblem.severity === "high" ? "High Risk" : "Medium Risk"}
                      </span>
                    </div>

                    {/* Main headline */}
                    <h2 className="text-[36px] md:text-[52px] font-semibold tracking-tight leading-[1.05] text-white">
                      {currentProblem.title}
                    </h2>

                    <p className="mt-5 text-[15px] md:text-[17px] leading-relaxed text-white/60 max-w-[420px]">
                      {currentProblem.desc}
                    </p>

                    {/* Visual chips */}
                    <ProblemVisual items={currentProblem.visual} severity={currentProblem.severity} />

                    {/* Progress bar */}
                    <div className="mt-8 flex items-center gap-4">
                      <ProgressPill total={STEPS.PROBLEMS} current={problemIndex} phase="problem" />
                      <p className="text-[12px] text-white/30">Scroll to continue</p>
                    </div>
                  </motion.div>
                )}

                {/* ── PHASE: TRANSITION ── */}
                {phase === "transition" && (
                  <motion.div
                    key="transition"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col gap-6 text-center items-center w-full"
                  >
                    <div className="space-y-2">
                      <motion.p
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-red-400/70 text-[13px] font-medium tracking-wide line-through decoration-red-500/50"
                      >
                        Fragmented · Manual · Error-prone · Unauditable
                      </motion.p>
                      <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.25, duration: 0.6 }}
                        className="h-px w-48 mx-auto bg-gradient-to-r from-red-500/40 via-emerald-400/60 to-emerald-400/40"
                      />
                      <motion.p
                        initial={{ opacity: 0, y: -12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-emerald-400 text-[13px] font-medium tracking-wide"
                      >
                        Unified · Automated · Verified · Audit-ready
                      </motion.p>
                    </div>

                    <motion.h2
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                      className="text-[40px] md:text-[62px] font-semibold tracking-tight text-white leading-[1.04]"
                    >
                      Current State
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.55 }}
                        className="block text-white/25"
                      >
                        → OffsetX →
                      </motion.span>
                      <motion.span
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.75, duration: 0.6 }}
                        className="block text-emerald-400"
                      >
                        Compliance Infrastructure
                      </motion.span>
                    </motion.h2>

                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.9 }}
                      className="text-white/40 text-[14px] max-w-sm"
                    >
                      One platform replaces all five failure modes.
                    </motion.p>
                  </motion.div>
                )}

                {/* ── PHASE: PLATFORM ── */}
                {(phase === "platform") && currentModule && (
                  <motion.div
                    key={`module-${currentModule.id}`}
                    initial={{ opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -28 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col"
                  >
                    {/* Module number */}
                    <div className="flex items-center gap-3 mb-6">
                      <span className="h-8 w-8 rounded-full flex items-center justify-center text-[12px] font-bold border-2 border-emerald-400/40 text-emerald-400 bg-emerald-950/30">
                        {currentModule.index + 1}
                      </span>
                      <span className="text-[11px] font-bold tracking-[0.15em] uppercase text-emerald-400">
                        Module Active
                      </span>
                    </div>

                    <h2 className="text-[36px] md:text-[52px] font-semibold tracking-tight leading-[1.05] text-white">
                      {currentModule.title}
                    </h2>

                    <p className="mt-5 text-[15px] md:text-[17px] leading-relaxed text-white/60 max-w-[420px]">
                      {currentModule.desc}
                    </p>

                    {/* Solves badge */}
                    <motion.div
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      className="mt-6 flex items-center gap-2.5"
                    >
                      <span className="h-5 w-5 rounded-full bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-400">
                        <IcoCheck />
                      </span>
                      <span className="text-[13px] text-emerald-300 font-medium">{currentModule.solves}</span>
                    </motion.div>

                    {/* Progress bar */}
                    <div className="mt-8 flex items-center gap-4">
                      <ProgressPill
                        total={STEPS.MODULES}
                        current={step - STEPS.PROBLEMS - STEPS.TRANSITION}
                        phase="platform"
                      />
                      <p className="text-[12px] text-white/30">Scroll to continue</p>
                    </div>
                  </motion.div>
                )}

                {/* ── PHASE: FINAL ── */}
                {phase === "final" && (
                  <motion.div
                    key="final"
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col gap-6"
                  >
                    <h2 className="text-[40px] md:text-[58px] font-semibold tracking-tight leading-[1.04] text-white">
                      One Infrastructure Layer
                      <span className="block text-white/30">For Carbon Compliance</span>
                    </h2>

                    <div className="flex flex-col gap-3">
                      {BENEFITS.map((b, i) => (
                        <motion.div
                          key={b}
                          initial={{ opacity: 0, x: -16 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1, duration: 0.45 }}
                          className="flex items-center gap-3"
                        >
                          <span className="h-6 w-6 rounded-full bg-emerald-500/15 border border-emerald-400/30 flex items-center justify-center text-emerald-400 shrink-0">
                            <IcoCheck />
                          </span>
                          <span className="text-[15px] text-white/80 font-medium">{b}</span>
                        </motion.div>
                      ))}
                    </div>

                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.7 }}
                      className="text-[13px] text-white/35 leading-relaxed max-w-sm mt-2"
                    >
                      Built for industrial companies navigating CBAM, EU ETS, CSRD, and CCTS.
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* RIGHT — visual panel */}
            <div className="w-full md:flex-1 flex items-center justify-center">
              <AnimatePresence mode="wait">
                {/* Problem visual — icon + context diagram */}
                {phase === "problem" && (
                  <motion.div
                    key={`pvis-${currentProblem.id}`}
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full max-w-[380px] rounded-2xl border border-white/8 bg-white/[0.03] backdrop-blur-sm p-8 flex flex-col gap-5"
                  >
                    {/* Icon large */}
                    <span
                      className={`h-16 w-16 rounded-2xl flex items-center justify-center
                        ${currentProblem.severity === "high"
                          ? "bg-red-950/40 text-red-400 border border-red-900/30"
                          : "bg-amber-950/30 text-amber-400 border border-amber-900/20"}`}
                    >
                      <currentProblem.icon className="w-8 h-8" />
                    </span>

                    {/* Mock "broken" state bars */}
                    <div className="space-y-2.5">
                      {[72, 45, 91, 33, 58].map((w, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className="h-1.5 bg-white/5 rounded-full flex-1 overflow-hidden">
                            <motion.div
                              className={`h-full rounded-full ${
                                currentProblem.severity === "high" ? "bg-red-500/50" : "bg-amber-500/40"
                              }`}
                              initial={{ width: 0 }}
                              animate={{ width: `${w}%` }}
                              transition={{ duration: 0.5, delay: i * 0.05, ease: "easeOut" }}
                            />
                          </div>
                          <span className="text-[10px] text-white/20 w-8 text-right">{w}%</span>
                        </div>
                      ))}
                    </div>

                    <div className="h-px w-full bg-white/8" />

                    <div className="flex items-center gap-2">
                      <svg className="w-3.5 h-3.5 text-red-400/70 shrink-0" viewBox="0 0 12 12" fill="none">
                        <path d="M6 2v5M6 9.5v.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                        <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2" />
                      </svg>
                      <p className="text-[11px] text-white/35 leading-snug">
                        Compliance exposure increases with every manual handoff
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* Transition visual */}
                {phase === "transition" && (
                  <motion.div
                    key="transition-vis"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-[360px] flex flex-col gap-3"
                  >
                    {/* "Before" stack */}
                    {["Fragmented Data", "Manual Errors", "Audit Risk"].map((label, i) => (
                      <motion.div
                        key={label}
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: i * 0.12 }}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl border border-red-900/30 bg-red-950/20 line-through decoration-red-500/40"
                      >
                        <span className="h-2 w-2 rounded-full bg-red-500/50 shrink-0" />
                        <span className="text-[13px] text-red-300/50 font-medium">{label}</span>
                      </motion.div>
                    ))}

                    {/* Arrow */}
                    <motion.div
                      initial={{ opacity: 0, scaleY: 0 }}
                      animate={{ opacity: 1, scaleY: 1 }}
                      transition={{ delay: 0.5, duration: 0.4 }}
                      className="flex justify-center py-2"
                    >
                      <div className="flex flex-col items-center gap-1">
                        <div className="w-px h-6 bg-gradient-to-b from-red-500/30 to-emerald-400/50" />
                        <div className="text-emerald-400 text-lg">↓</div>
                        <div className="w-px h-6 bg-emerald-400/50" />
                      </div>
                    </motion.div>

                    {/* "After" stack */}
                    {["Unified Platform", "Automated Validation", "Audit-Ready Output"].map((label, i) => (
                      <motion.div
                        key={label}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.6 + i * 0.12 }}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl border border-emerald-700/30 bg-emerald-950/20"
                      >
                        <span className="h-2 w-2 rounded-full bg-emerald-400 shrink-0" />
                        <span className="text-[13px] text-emerald-300 font-medium">{label}</span>
                      </motion.div>
                    ))}
                  </motion.div>
                )}

                {/* Platform hub */}
                {(phase === "platform" || phase === "final") && (
                  <motion.div
                    key="hub"
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full max-w-[380px]"
                  >
                    <HubDiagram
                      activeModuleCount={phase === "final" ? STEPS.MODULES : moduleCount}
                      isMobile={isMobile}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Bottom scroll hint / step dots */}
          <div className="shrink-0 px-6 md:px-12 pb-8 flex items-center justify-between">
            {/* Phase dots */}
            <div className="flex items-center gap-1.5">
              {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
                <div
                  key={i}
                  className={`
                    h-1 rounded-full transition-all duration-300
                    ${i === step
                      ? phase === "problem"
                        ? "w-6 bg-red-400"
                        : phase === "transition"
                        ? "w-6 bg-slate-400"
                        : "w-6 bg-emerald-400"
                      : "w-1.5 bg-white/10"
                    }
                  `}
                />
              ))}
            </div>

            {/* Phase label */}
            <AnimatePresence mode="wait">
              <motion.p
                key={phase}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3 }}
                className="text-[11px] text-white/25 font-medium tracking-wide"
              >
                {phase === "problem" && `${problemIndex + 1} of 5 problems`}
                {phase === "transition" && "Transformation"}
                {phase === "platform" && `Module ${moduleCount} of 5`}
                {phase === "final" && "Platform complete"}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
