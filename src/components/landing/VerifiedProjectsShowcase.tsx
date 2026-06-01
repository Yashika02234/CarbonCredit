import { useEffect, useRef, useState } from "react";

/* ===== MEDIA ===== */
const mangroveVideo =
  "https://drive.google.com/uc?export=download&id=1GsQgvANiw7LAQn1okk5xGbljKQQLXqjv";

import solarVideo from "../../assets/images/solar.mp4";
import methaneVideo from "../../assets/images/methane.mp4";
import forestVideo from "../../assets/images/forest.mp4";

/* ===== DATA ===== */
type Slide = {
  id: number;
  src: string;
  type: "video" | "image";
  kicker: string; // small label line
  title: string;  // big title
  date: string;
  desc: string;
  cta: string;
};

const slides: Slide[] = [
  {
    id: 1,
    src: mangroveVideo,
    type: "video",
    kicker: "STEEL & METALS",
    title: "Industrial steel compliance",
    date: "CBAM SECTOR",
    desc: "Scope 1 & 2 emissions tracking, CBAM declaration generation, and audit-ready data lineage for steel producers exporting to the EU.",
    cta: "See compliance module",
  },
  {
    id: 2,
    src: solarVideo,
    type: "video",
    kicker: "CEMENT",
    title: "Cement & clinker reporting",
    date: "CBAM SECTOR",
    desc: "Process emissions quantification, embedded carbon calculations, and EU ETS surrender compliance for cement manufacturers.",
    cta: "View methodology",
  },
  {
    id: 3,
    src: methaneVideo,
    type: "video",
    kicker: "ALUMINUM",
    title: "Aluminum production traceability",
    date: "CBAM SECTOR",
    desc: "Electrolysis and smelting emissions data structured for CBAM reporting with full audit trails and regulator-ready output.",
    cta: "Explore traceability",
  },
  {
    id: 4,
    src: forestVideo,
    type: "video",
    kicker: "ENERGY & POWER",
    title: "Energy sector compliance",
    date: "EU ETS SECTOR",
    desc: "Generation, transmission, and fuel combustion emissions mapped to EU ETS obligations with automated allowance reconciliation.",
    cta: "View energy module",
  },
  {
    id: 5,
    src: solarVideo,
    type: "video",
    kicker: "MANUFACTURING",
    title: "Industrial manufacturing reporting",
    date: "CSRD SECTOR",
    desc: "End-to-end Scope 1, 2 & 3 reporting for manufacturing operations, structured for CSRD disclosures and third-party assurance.",
    cta: "Explore reporting",
  },
];

export default function ExpandableHoverRail() {
  const [start, setStart] = useState(0);
  const [hovered, setHovered] = useState<number>(1); // 0..2 in visible
  const timer = useRef<number | null>(null);

  /* ===== AUTO SHIFT WINDOW ===== */
  useEffect(() => {
    startAuto();
    return stopAuto;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startAuto = () => {
    stopAuto();
    timer.current = window.setInterval(() => {
      setStart((s) => (s + 1) % slides.length);
      setHovered(1); // keep center expanded by default
    }, 5200);
  };

  const stopAuto = () => {
    if (timer.current) window.clearInterval(timer.current);
    timer.current = null;
  };

  /* ===== VISIBLE WINDOW (3) ===== */
  const visible = [
    slides[start % slides.length],
    slides[(start + 1) % slides.length],
    slides[(start + 2) % slides.length],
  ];

  return (
    <section className="bg-[#F6F2E8] py-24 lg:py-32 overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        {/* ================= TOP TEXT (LIKE REF) ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-7">
            <h2 className="text-slate-900 text-[44px] md:text-[64px] lg:text-[78px] leading-[1.03] tracking-tight font-semibold">
              Industries we serve
            </h2>
          </div>

          <div className="lg:col-span-5 lg:pt-4">
            <p className="text-slate-800 text-lg leading-relaxed max-w-[44ch]">
              OffsetX is built for industrial sectors facing mandatory carbon compliance — from CBAM-exposed exporters to EU ETS participants and CSRD-obligated enterprises.
            </p>

            <button className="mt-10 inline-flex items-center gap-3 text-slate-900 text-base hover:opacity-70 transition">
              <span className="text-xl leading-none">›</span>
              Explore sectors
            </button>
          </div>
        </div>

        {/* ================= PROJECT RAIL (BELOW TEXT) ================= */}
        <div
          className="mt-16 lg:mt-20 flex gap-6 h-[520px]"
          onMouseEnter={stopAuto}
          onMouseLeave={startAuto}
        >
          {visible.map((slide, i) => {
            const expanded = hovered === i;

            return (
              <div
                key={slide.id}
                onMouseEnter={() => setHovered(i)}
                className={`
                  relative
                  overflow-hidden
                  border border-black/10
                  transition-[flex] duration-700
                  ease-[cubic-bezier(0.22,1,0.36,1)]
                  ${expanded ? "flex-[3]" : "flex-[1]"}
                `}
                style={{ borderRadius: 0 }}
              >
                {/* MEDIA */}
                {slide.type === "video" ? (
                  <video
                    src={slide.src}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={slide.src}
                    alt={slide.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}

                {/* OVERLAY */}
                <div className="absolute inset-0 bg-black/20" />

                {/* BOTTOM-LEFT DETAIL CARD (LIKE REF) */}
                <div className="absolute left-6 bottom-6 right-6 flex items-end">
                  <div
                    className={`
                      bg-black/45 backdrop-blur-[2px]
                      text-white
                      border border-white/10
                      transition-all duration-500 ease-out
                      ${expanded ? "opacity-100 translate-y-0" : "opacity-90 translate-y-0"}
                    `}
                    style={{
                      width: expanded ? "420px" : "320px",
                      borderRadius: 0,
                      padding: "22px",
                    }}
                  >
                    <p className="text-[11px] tracking-[0.22em] uppercase text-white/80">
                      ■ {slide.kicker}
                    </p>

                    <p className="mt-3 text-[11px] tracking-[0.22em] uppercase text-white/80">
                      {slide.date}
                    </p>

                    <h3 className="mt-4 text-xl md:text-2xl font-semibold tracking-tight">
                      {slide.title}
                    </h3>

                    <p className="mt-4 text-white/80 leading-relaxed text-sm">
                      {slide.desc}
                    </p>

                    <button className="mt-6 inline-flex items-center gap-3 text-white/90 hover:text-white transition">
                      <span className="text-xl leading-none">›</span>
                      {slide.cta}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* small helper */}
        <div className="mt-6 text-xs text-slate-500">
          Hover a sector panel to expand • Auto-rotates
        </div>
      </div>
    </section>
  );
}