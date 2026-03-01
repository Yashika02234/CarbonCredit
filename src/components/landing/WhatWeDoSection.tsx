
type CardItem = {
  title: string;
  text: string;
  image: string;
  details: string[];
};

const hero = {
  eyebrow: "What we do",
  headline: "Transparent carbon intelligence for responsible decisions.",
  subtext:
    "OffSet helps teams discover climate projects, evaluate credit quality, and understand impact — with clarity, traceability, and trust.",
};

const cards: CardItem[] = [
  {
    title: "Geospatial Project Discovery",
    text: "Explore projects through clear visual context and structured data to interpret impact faster.",
    image:
      "https://images.unsplash.com/photo-1526779259212-939e64788e3c?auto=format&fit=crop&w=1400&q=80",
    details: ["Map-first exploration", "Structured project metadata", "Region-level filtering"],
  },
  {
    title: "Algorithmic Trust Scoring",
    text: "A dynamic Trust Score analyzing methodology, vintage, and registry data for decision-making.",
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1400&q=80",
    details: ["Methodology scoring", "Vintage + registry signals", "Audit-ready rationale"],
  },
  {
    title: "Registry & Methodology Context",
    text: "Standardized project details across registries and methodologies to reduce ambiguity.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=80",
    details: ["Registry normalization", "Methodology comparisons", "Evidence links"],
  },
  {
    title: "Audit-ready Traceability",
    text: "Transparent evidence trails designed for institutional review workflows.",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1400&q=80",
    details: ["Full trace history", "Exportable reports", "Compliance-friendly outputs"],
  },
];

function HoverRevealCard({ item }: { item: CardItem }) {
  return (
    <article
      className="
        group relative
        min-w-[280px] sm:min-w-[340px] lg:min-w-[420px]
        h-[420px] md:h-[460px]
        overflow-hidden
        border border-black/10
        bg-black
        shadow-[0_20px_60px_rgba(0,0,0,0.14)]
      "
      style={{ borderRadius: 0 }}
    >
      {/* Image */}
      <img
        src={item.image}
        alt={item.title}
        className="
          absolute inset-0 h-full w-full object-cover
          transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
          group-hover:scale-[1.05]
        "
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-black/10" />

      {/* Title */}
      <div
        className="
          absolute left-7 right-7 bottom-7
          transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
          group-hover:translate-y-[-150px]
        "
      >
        <h3 className="text-white text-2xl md:text-3xl font-semibold tracking-tight">
          {item.title}
        </h3>
      </div>

      {/* Slide-up panel */}
      <div
        className="
          absolute left-0 right-0 bottom-0
          translate-y-full
          group-hover:translate-y-0
          transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
          bg-white/92 backdrop-blur-md
          border-t border-black/10
          p-7
        "
      >
        <p className="text-white/80 text-sm md:text-base leading-relaxed">{item.text}</p>

        <ul className="mt-5 space-y-2 text-sm text-white/70">
          {item.details.map((d) => (
            <li key={d} className="flex gap-2">
              <span className="mt-[7px] h-[6px] w-[6px] bg-emerald-900/70" />
              <span>{d}</span>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="
            mt-6 inline-flex items-center gap-2
            text-emerald-900 font-medium
            hover:opacity-80 transition-opacity
          "
        >
          See details <span aria-hidden>→</span>
        </button>
      </div>
    </article>
  );
}

export default function WhatWeDoSection() {
  const marqueeItems = [...cards, ...cards];

  return (
    <section
      id="what-we-do"
      className="
        relative z-20
        px-6 lg:px-12
        py-28 lg:py-36
        bg-[linear-gradient(180deg,rgba(6,95,70,0.06)_0%,rgba(6,95,70,0.03)_45%,rgba(255,255,255,1)_100%)]
      "
    >
      {/* subtle top fade */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/80 to-transparent" />

      <div className="max-w-[1500px] mx-auto">
        {/* HEADER */}
        <div className="max-w-[980px]">
          <p className="text-sm md:text-base tracking-[0.18em] uppercase text-emerald-950/60">
            {hero.eyebrow}
          </p>

          <h1 className="mt-6 text-[44px] leading-[1.05] md:text-[72px] md:leading-[1.02] font-medium tracking-tight text-slate-950">
            {hero.headline}
          </h1>

          <p className="mt-10 max-w-[740px] text-lg md:text-xl leading-relaxed text-slate-700">
            {hero.subtext}
          </p>

          <button
            type="button"
            onClick={() => {
              const el = document.getElementById("what-we-do-cards");
              el?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            className="
              mt-12 inline-flex items-center gap-2
              text-slate-800 hover:text-slate-950
              text-base md:text-lg
              underline underline-offset-8
              decoration-slate-300 hover:decoration-slate-500
              transition-colors
            "
          >
            Learn more
            <span aria-hidden className="text-slate-400">
              →
            </span>
          </button>
        </div>

        {/* MARQUEE */}
        <div id="what-we-do-cards" className="mt-20 lg:mt-24">
          <div className="relative">
            {/* edge fades */}
            <div className="pointer-events-none absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-white/90 to-transparent z-10" />
            <div className="pointer-events-none absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-white/90 to-transparent z-10" />

            <div
              className="
                overflow-hidden
                border border-black/10
                bg-white/55 backdrop-blur-md
                shadow-[0_20px_60px_rgba(0,0,0,0.08)]
              "
              style={{ borderRadius: 0 }}
            >
              <div className="marquee-wrap py-10">
                <div className="marquee flex gap-6 will-change-transform px-6">
                  {marqueeItems.map((item, idx) => (
                    <HoverRevealCard key={`${item.title}-${idx}`} item={item} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <style>{`
            @keyframes marqueeScroll {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .marquee {
              width: max-content;
              animation: marqueeScroll 28s linear infinite;
            }
            .marquee-wrap:hover .marquee {
              animation-play-state: paused;
            }
            @media (prefers-reduced-motion: reduce) {
              .marquee { animation: none; }
            }
          `}</style>
        </div>
      </div>
    </section>
  );
}