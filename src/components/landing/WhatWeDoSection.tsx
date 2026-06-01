
// ─────────────────────────────────────────────────────────────────────────────
// Market Shift — Educational compliance-focused section
// ─────────────────────────────────────────────────────────────────────────────

const regulations = [
  {
    id: "cbam",
    acronym: "CBAM",
    name: "Carbon Border Adjustment Mechanism",
    description:
      "EU regulation that places a carbon cost on imported goods based on embedded emissions.",
    impact: "Importers must report emissions and pay carbon-related charges.",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
        <circle cx="16" cy="16" r="13" stroke="currentColor" strokeWidth="1.5" />
        <path d="M16 9v7l5 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6 16h3M23 16h3M16 6v3M16 23v3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    ),
    color: "from-blue-50 to-indigo-50",
    accentColor: "text-indigo-700",
    borderColor: "border-indigo-100",
    tagColor: "bg-indigo-50 text-indigo-700",
  },
  {
    id: "ets",
    acronym: "EU ETS",
    name: "European Union Emissions Trading System",
    description:
      "Cap-and-trade framework that requires companies to hold allowances for emissions.",
    impact: "Organizations may need to purchase allowances for excess emissions.",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
        <rect x="5" y="18" width="5" height="9" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <rect x="13.5" y="12" width="5" height="15" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <rect x="22" y="6" width="5" height="21" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <path d="M7.5 14l6-5 8-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="24.5" cy="6" r="2" fill="currentColor" opacity="0.2" />
      </svg>
    ),
    color: "from-emerald-50 to-teal-50",
    accentColor: "text-teal-700",
    borderColor: "border-teal-100",
    tagColor: "bg-teal-50 text-teal-700",
  },
  {
    id: "ccts",
    acronym: "CCTS",
    name: "Carbon Credit Trading Scheme",
    description:
      "Framework enabling organizations to offset emissions through carbon credit mechanisms.",
    impact: "Companies may need credits to meet compliance or sustainability goals.",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
        <path d="M16 5l2.8 8.6H27l-7.4 5.4 2.8 8.6L16 22.2 9.6 27.6l2.8-8.6L5 13.6h8.2L16 5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
    color: "from-amber-50 to-orange-50",
    accentColor: "text-amber-700",
    borderColor: "border-amber-100",
    tagColor: "bg-amber-50 text-amber-700",
  },
  {
    id: "csrd",
    acronym: "CSRD",
    name: "Corporate Sustainability Reporting Directive",
    description:
      "EU reporting regulation requiring detailed sustainability disclosures.",
    impact: "Businesses must maintain accurate and auditable ESG reporting.",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
        <rect x="6" y="4" width="20" height="24" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M11 12h10M11 17h10M11 22h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="22" cy="22" r="0" />
      </svg>
    ),
    color: "from-violet-50 to-purple-50",
    accentColor: "text-violet-700",
    borderColor: "border-violet-100",
    tagColor: "bg-violet-50 text-violet-700",
  },
];

const voluntaryItems = [
  "Sustainability Reports",
  "Voluntary Carbon Tracking",
  "Investor-driven ESG Metrics",
  "Spreadsheet-based Processes",
];

const mandatoryItems = [
  "Emissions Accounting",
  "Regulatory Reporting",
  "Carbon Pricing Exposure",
  "Carbon Credit Obligations",
  "Audit-ready Documentation",
];

const infrastructureItems = [
  "Calculate emissions automatically",
  "Estimate compliance costs",
  "Track carbon credit requirements",
  "Maintain audit-ready records",
  "Generate regulatory reports",
];

export default function WhatWeDoSection() {
  return (
    <section
      id="market-shift"
      className="relative z-20 bg-[#F7F8F7] px-6 lg:px-12 py-28 lg:py-36"
    >
      {/* Subtle grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.8) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,0.8) 1px,transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative max-w-[1400px] mx-auto">
        {/* ── HERO ── */}
        <div className="max-w-[900px]">
          <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-slate-500">
            MARKET SHIFT
          </p>

          <h2
            className="mt-6 text-[42px] leading-[1.06] md:text-[62px] md:leading-[1.04] lg:text-[72px] lg:leading-[1.03]
                       font-semibold tracking-tight text-slate-950"
          >
            From Optional ESG to Mandatory Carbon Compliance
          </h2>

          <p className="mt-8 max-w-[720px] text-lg md:text-xl leading-relaxed text-slate-600">
            Global regulations are transforming sustainability from a voluntary
            reporting exercise into a legal compliance requirement. Organizations
            must now measure emissions, calculate liabilities, manage carbon
            costs, and maintain audit-ready records.
          </p>
        </div>

        {/* ── REGULATION CARDS ── */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {regulations.map((reg) => (
            <article
              key={reg.id}
              className={`
                group relative flex flex-col gap-4 p-7
                bg-white border rounded-2xl
                ${reg.borderColor}
                shadow-[0_2px_12px_rgba(0,0,0,0.04)]
                hover:shadow-[0_8px_32px_rgba(0,0,0,0.10)]
                hover:-translate-y-1
                transition-all duration-300 ease-out
                cursor-default
              `}
            >
              {/* Icon + acronym */}
              <div className="flex items-start justify-between">
                <span
                  className={`
                    inline-flex items-center justify-center
                    h-11 w-11 rounded-xl
                    bg-gradient-to-br ${reg.color}
                    ${reg.accentColor}
                    border ${reg.borderColor}
                  `}
                >
                  {reg.icon}
                </span>
                <span
                  className={`
                    text-[11px] font-bold tracking-[0.14em] uppercase
                    px-2.5 py-1 rounded-full
                    ${reg.tagColor}
                  `}
                >
                  {reg.acronym}
                </span>
              </div>

              {/* Name */}
              <h3 className="text-[15px] font-semibold leading-snug text-slate-900 mt-1">
                {reg.name}
              </h3>

              {/* Description */}
              <p className="text-[14px] leading-relaxed text-slate-500 flex-1">
                {reg.description}
              </p>

              {/* Divider */}
              <div className="h-px bg-slate-100" />

              {/* Impact */}
              <div>
                <p className="text-[10px] font-bold tracking-[0.18em] uppercase text-slate-400 mb-2">
                  IMPACT
                </p>
                <p className={`text-[13px] font-medium leading-relaxed ${reg.accentColor}`}>
                  {reg.impact}
                </p>
              </div>

              {/* Hover accent line */}
              <span
                className={`
                  absolute inset-x-0 bottom-0 h-[3px] rounded-b-2xl
                  bg-gradient-to-r ${reg.color}
                  opacity-0 group-hover:opacity-100
                  transition-opacity duration-300
                `}
              />
            </article>
          ))}
        </div>

        {/* ── TRANSITION TIMELINE ── */}
        <div className="mt-20 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_2px_16px_rgba(0,0,0,0.05)]">
          {/* Header bar */}
          <div className="px-8 py-5 border-b border-slate-100 flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-slate-300" />
            <span className="h-2 w-2 rounded-full bg-slate-300" />
            <span className="h-2 w-2 rounded-full bg-slate-300" />
            <span className="ml-4 text-[11px] font-semibold tracking-[0.18em] uppercase text-slate-400">
              Regulatory Transition
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr]">
            {/* Left — Voluntary */}
            <div className="p-8 lg:p-12">
              <div className="flex items-center gap-3 mb-6">
                <span className="h-8 w-8 rounded-full border-2 border-slate-200 flex items-center justify-center">
                  <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                </span>
                <h3 className="text-base font-semibold text-slate-500">
                  Voluntary ESG Reporting
                </h3>
              </div>
              <ul className="space-y-3">
                {voluntaryItems.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-slate-500">
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-300 shrink-0" />
                    <span className="text-[14px] leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Center arrow */}
            <div className="hidden md:flex flex-col items-center justify-center px-6 py-12">
              <div className="flex flex-col items-center gap-1">
                <div className="w-px h-12 bg-gradient-to-b from-slate-200 to-slate-400" />
                <div className="h-8 w-8 rounded-full border-2 border-slate-300 bg-white flex items-center justify-center shadow-sm">
                  <svg className="w-4 h-4 text-slate-500" viewBox="0 0 16 16" fill="none">
                    <path d="M8 3v10M4 10l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className="w-px h-12 bg-gradient-to-b from-slate-400 to-emerald-500" />
              </div>
            </div>

            {/* Mobile arrow */}
            <div className="md:hidden flex items-center justify-center py-4 border-y border-slate-100">
              <div className="flex items-center gap-2 text-slate-500">
                <div className="w-16 h-px bg-gradient-to-r from-slate-300 to-emerald-500" />
                <svg className="w-4 h-4 text-emerald-600" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M10 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="w-16 h-px bg-emerald-400" />
              </div>
            </div>

            {/* Right — Mandatory */}
            <div className="p-8 lg:p-12 bg-[#F0FAF6]">
              <div className="flex items-center gap-3 mb-6">
                <span className="h-8 w-8 rounded-full border-2 border-emerald-300 bg-emerald-50 flex items-center justify-center">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                </span>
                <h3 className="text-base font-semibold text-slate-900">
                  Mandatory Carbon Compliance
                </h3>
              </div>
              <ul className="space-y-3">
                {mandatoryItems.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
                    <span className="text-[14px] leading-snug text-slate-700 font-medium">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ── WHY INFRASTRUCTURE MATTERS ── */}
        <div
          className="
            mt-8 rounded-2xl overflow-hidden
            border border-slate-900
            bg-[#07110E]
            shadow-[0_4px_32px_rgba(0,0,0,0.18)]
          "
        >
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr]">
            {/* Left text block */}
            <div className="p-10 lg:p-14 flex flex-col justify-center">
              <p className="text-[10px] font-bold tracking-[0.24em] uppercase text-emerald-400/70 mb-5">
                INFRASTRUCTURE REQUIREMENT
              </p>
              <h3 className="text-3xl md:text-4xl font-semibold tracking-tight text-white leading-snug">
                Why Infrastructure Matters
              </h3>
              <p className="mt-5 text-white/60 text-base leading-relaxed max-w-sm">
                Modern organizations need systems that can automate the complexity
                of carbon compliance — from emissions quantification to regulator-ready
                reporting.
              </p>

              {/* Decorative dots */}
              <div className="mt-12 flex gap-2">
                {[0, 1, 2, 3].map((i) => (
                  <span
                    key={i}
                    className="h-1.5 w-1.5 rounded-full bg-emerald-500/50"
                    style={{ opacity: 1 - i * 0.2 }}
                  />
                ))}
              </div>
            </div>

            {/* Right capabilities list */}
            <div className="border-t lg:border-t-0 lg:border-l border-white/10 p-10 lg:p-14 flex flex-col justify-center">
              <ul className="space-y-4">
                {infrastructureItems.map((item) => (
                  <li key={item} className="flex items-start gap-4">
                    <span
                      className="
                        shrink-0 mt-0.5
                        h-5 w-5 rounded-full
                        bg-emerald-500/15
                        border border-emerald-500/30
                        flex items-center justify-center
                      "
                    >
                      <svg className="w-3 h-3 text-emerald-400" viewBox="0 0 12 12" fill="none">
                        <path
                          d="M2 6l3 3 5-5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span className="text-[15px] text-white/85 font-medium leading-snug">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (prefers-reduced-motion: reduce) {
          #market-shift article {
            transition: none;
          }
        }
      `}</style>
    </section>
  );
}