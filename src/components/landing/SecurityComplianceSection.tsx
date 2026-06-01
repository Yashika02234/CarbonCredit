import { useMemo, useState } from "react";

type Item = {
  step: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
};

export default function SecurityComplianceSection() {
  const items: Item[] = useMemo(
    () => [
      {
        step: 1,
        title: "Encrypted Workflows",
        subtitle: "End-to-end data protection",
        description:
          "All compliance data — from emissions inputs to report outputs — flows through encrypted, access-controlled pipelines. No unprotected data transmission across the compliance stack.",
        image:
          "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=2200&q=80",
      },
      {
        step: 2,
        title: "Audit Logs",
        subtitle: "Full calculation traceability",
        description:
          "Every data point, calculation step, validation decision, and report generation is logged with full attribution — creating a defensible audit trail for any regulatory review.",
        image:
          "https://images.unsplash.com/photo-1556155092-490a1ba16284?auto=format&fit=crop&w=2200&q=80",
      },
      {
        step: 3,
        title: "Data Traceability",
        subtitle: "Immutable emissions records",
        description:
          "Critical emissions records are append-only and protected against retroactive modification. Every entry has a verified origin, timestamp, and chain of custody.",
        image:
          "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=2200&q=80",
      },
      {
        step: 4,
        title: "Regulatory Alignment",
        subtitle: "Built for CBAM, EU ETS & CSRD",
        description:
          "OffsetX is architected to meet the requirements of active and emerging carbon compliance regulations — with infrastructure that adapts as disclosure obligations evolve.",
        image:
          "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=2200&q=80",
      },
    ],
    []
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const active = items[activeIndex];

  const goPrev = () => setActiveIndex((i) => Math.max(0, i - 1));
  const goNext = () => setActiveIndex((i) => Math.min(items.length - 1, i + 1));

  return (
    // ✅ FIX: isolate + z-index to prevent overlap
    <section className="relative isolate z-30 w-full bg-[#F6F5F1] px-6 lg:px-12 py-28">
      <div className="max-w-[1700px] mx-auto">
        {/* HEADER */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-14">
          <div>
            <p className="text-xs tracking-[0.28em] uppercase text-black/45">
              SECURITY & COMPLIANCE
            </p>

            <h2 className="mt-7 text-[44px] md:text-[64px] leading-[1.05] font-semibold tracking-tight text-black">
              Security & governance
              <br />
              <span className="text-black/35">as compliance infrastructure.</span>
            </h2>
          </div>

          <div className="lg:pt-16">
            <p className="text-black/60 text-lg leading-relaxed max-w-xl">
              OffsetX treats security and governance as core compliance requirements — not features to be added later. Enterprise-grade reliability with full traceability at every layer.
            </p>
          </div>
        </div>

        {/* STRIP */}
        <div
          className="relative overflow-hidden border border-black/10 bg-[#07110E]"
          style={{ borderRadius: 16 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_0.6fr]">
            {/* LEFT */}
            <div className="relative p-10 md:p-14">
              <div className="absolute top-8 right-8 flex gap-2">
                <button
                  onClick={goPrev}
                  disabled={activeIndex === 0}
                  className={`h-10 w-10 rounded-full border border-white/20 flex items-center justify-center transition ${
                    activeIndex === 0 ? "opacity-30 cursor-not-allowed" : "hover:bg-white/10"
                  }`}
                >
                  ←
                </button>
                <button
                  onClick={goNext}
                  disabled={activeIndex === items.length - 1}
                  className={`h-10 w-10 rounded-full border border-white/20 flex items-center justify-center transition ${
                    activeIndex === items.length - 1
                      ? "opacity-30 cursor-not-allowed"
                      : "hover:bg-white/10"
                  }`}
                >
                  →
                </button>
              </div>

              <div className="flex items-center gap-3">
                <span className="h-9 w-9 rounded-full border border-white/35 flex items-center justify-center text-sm text-white">
                  {active.step}
                </span>
                <span className="text-sm text-white/55 tracking-wide">
                  Step {active.step} of {items.length}
                </span>
              </div>

              <h3 className="mt-6 text-3xl md:text-4xl font-semibold tracking-tight text-white">
                {active.title}
              </h3>
              <p className="mt-3 text-emerald-200/80 text-base">{active.subtitle}</p>

              <p className="mt-6 text-white/70 max-w-xl leading-relaxed">
                {active.description}
              </p>

              <div className="mt-10 overflow-hidden border border-white/10" style={{ borderRadius: 14 }}>
                <img
                  src={active.image}
                  alt={active.title}
                  className="w-full h-[260px] md:h-[320px] object-cover"
                />
              </div>

              <div className="mt-10 h-px w-full bg-white/10" />
              <p className="mt-5 text-xs tracking-[0.28em] uppercase text-white/45">
                Built for audit-ready carbon compliance
              </p>
            </div>

            {/* RIGHT */}
            <div className="border-t lg:border-t-0 lg:border-l border-white/10">
              <div className="h-full grid grid-cols-4 lg:grid-cols-1">
                {items.map((it, idx) => {
                  const isActive = idx === activeIndex;
                  return (
                    <button
                      key={it.step}
                      onClick={() => setActiveIndex(idx)}
                      className={`group relative p-6 md:p-8 flex items-start text-left transition ${
                        isActive ? "bg-white/[0.06]" : "hover:bg-white/[0.05]"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`h-9 w-9 rounded-full border flex items-center justify-center text-sm transition ${
                            isActive
                              ? "border-white/60 text-white"
                              : "border-white/25 text-white/70 group-hover:text-white"
                          }`}
                        >
                          {it.step}
                        </span>

                        <div className="hidden lg:block">
                          <p
                            className={`text-sm font-medium transition ${
                              isActive ? "text-white" : "text-white/70 group-hover:text-white"
                            }`}
                          >
                            {it.title}
                          </p>
                          <p className="mt-1 text-xs text-white/45 line-clamp-2">
                            {it.subtitle}
                          </p>
                        </div>
                      </div>

                      {isActive && (
                        <span className="absolute left-0 top-0 bottom-0 w-[2px] bg-emerald-300/70" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="h-2" />
      </div>
    </section>
  );
}