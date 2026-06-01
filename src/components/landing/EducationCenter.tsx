import { useMemo, useState } from "react";

type FAQ = { q: string; a: string };

export default function EducationCenter() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const items: FAQ[] = useMemo(
    () => [
      {
        q: "What is CBAM and who does it affect?",
        a: "The EU Carbon Border Adjustment Mechanism (CBAM) imposes carbon levies on imports of steel, cement, aluminum, fertilizers, hydrogen, and electricity into the EU. Exporters in those sectors must report embedded emissions with verified data or face financial penalties from 2026.",
      },
      {
        q: "How is CSRD different from voluntary ESG reporting?",
        a: "CSRD (Corporate Sustainability Reporting Directive) mandates legally enforceable sustainability disclosures for large companies operating in the EU. Unlike voluntary ESG, CSRD requires third-party assurance, audit-grade data, and standardized reporting formats.",
      },
      {
        q: "What makes emissions data \"audit-ready\"?",
        a: "Audit-ready emissions data has full data lineage (traceable to source), calculation transparency (method and boundary documented), immutable records (protected against retroactive edits), and structured formats that map to specific regulatory requirements.",
      },
      {
        q: "How does OffsetX handle multi-regulation compliance?",
        a: "OffsetX maps a single emissions dataset to multiple regulations simultaneously — generating CBAM declarations, EU ETS submissions, and CSRD disclosures from the same validated data layer, reducing duplication and audit risk.",
      },
      {
        q: "Which industries does OffsetX serve?",
        a: "OffsetX is built for industrial sectors with high compliance exposure: steel, cement, aluminum, manufacturing, energy production, and industrial exporters facing cross-border carbon obligations.",
      },
      {
        q: "What is India's CCTS and when will it matter?",
        a: "India's Carbon Credit Trading Scheme (CCTS) is an emerging domestic compliance framework. As India formalizes its carbon market obligations, industrial operators will require the same infrastructure-level compliance capabilities that OffsetX provides for EU regulations today.",
      },
    ],
    []
  );

  return (
    <section className="relative isolate w-full bg-[#F6F5F1] px-6 lg:px-12 py-28 lg:py-36">
      <div className="max-w-[1600px] mx-auto">
        {/* HEADER */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-14 lg:mb-20">
          <div>
            <p className="text-xs tracking-[0.28em] uppercase text-black/45">
              COMPLIANCE INTELLIGENCE
            </p>

            <h2 className="mt-7 text-[44px] md:text-[64px] leading-[1.05] font-semibold tracking-tight text-black">
              Carbon compliance.
              <br />
              <span className="text-black/35">Clear, practical answers.</span>
            </h2>
          </div>

          <div className="lg:pt-16">
            <p className="text-black/60 text-lg leading-relaxed max-w-xl">
              Direct answers to the compliance questions industrial teams, procurement officers, and regulatory leads face today under CBAM, EU ETS, CSRD, and CCTS.
            </p>
          </div>
        </div>

        {/* FAQ PANEL */}
        <div className="border border-black/10 bg-white rounded-2xl overflow-hidden">
          {items.map((item, i) => {
            const isOpen = openIndex === i;

            return (
              <div key={i} className="border-t border-black/10 first:border-t-0">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full text-left"
                >
                  <div
                    className={`
                      flex items-center justify-between gap-8
                      px-6 md:px-10 py-6 md:py-8
                      transition-colors duration-300
                      ${isOpen ? "bg-[#07110E] text-white" : "bg-white text-black hover:bg-black/[0.03]"}
                    `}
                  >
                    <span className="text-lg md:text-xl font-medium tracking-tight">
                      {item.q}
                    </span>

                    <span
                      className={`
                        h-10 w-10 shrink-0 rounded-full
                        border flex items-center justify-center
                        transition-all duration-300
                        ${isOpen ? "border-white/25 text-white" : "border-black/15 text-black/70"}
                      `}
                    >
                      <span className={`transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}>
                        +
                      </span>
                    </span>
                  </div>
                </button>

                {/* ANSWER */}
                <div
                  className={`
                    grid transition-[grid-template-rows] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]
                    ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}
                  `}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 md:px-10 pb-7 md:pb-9 pt-0 bg-[#07110E]">
                      <p className="text-white/80 leading-relaxed max-w-3xl">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        
      </div>
    </section>
  );
}