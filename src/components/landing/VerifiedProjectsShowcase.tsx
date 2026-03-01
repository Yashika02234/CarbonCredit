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
    kicker: "MANGROVE RESTORATION",
    title: "Coastal blue carbon",
    date: "OCTOBER 29, 2025",
    desc: "Verified restoration sites with transparent baselines, monitoring, and third-party evidence.",
    cta: "Explore the project",
  },
  {
    id: 2,
    src: solarVideo,
    type: "video",
    kicker: "RENEWABLES",
    title: "Utility solar deployment",
    date: "OCTOBER 29, 2025",
    desc: "Registry-matched issuance and vintage checks with methodology validation for credit integrity.",
    cta: "See methodology",
  },
  {
    id: 3,
    src: methaneVideo,
    type: "video",
    kicker: "METHANE ABATEMENT",
    title: "Landfill capture program",
    date: "OCTOBER 29, 2025",
    desc: "Leakage + double counting scans, ownership validation, and audit-ready evidence trails.",
    cta: "View verification",
  },
  {
    id: 4,
    src: forestVideo,
    type: "video",
    kicker: "FORESTRY",
    title: "Improved forest management",
    date: "OCTOBER 29, 2025",
    desc: "Geospatial overlays, buffer pool checks, and defensible impact claims for procurement teams.",
    cta: "Watch summary",
  },
  {
    id: 5,
    src: solarVideo,
    type: "video",
    kicker: "REGISTRY INTEGRITY",
    title: "Serial-level traceability",
    date: "OCTOBER 29, 2025",
    desc: "End-to-end traceability from issuance to retirement with exportable reporting outputs.",
    cta: "See traceability",
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
              Verified project activity across the marketplace
            </h2>
          </div>

          <div className="lg:col-span-5 lg:pt-4">
            <p className="text-slate-800 text-lg leading-relaxed max-w-[44ch]">
              Explore a rotating set of verified project types — each panel includes
              a concise evidence summary designed for faster due diligence.
            </p>

            <button className="mt-10 inline-flex items-center gap-3 text-slate-900 text-base hover:opacity-70 transition">
              <span className="text-xl leading-none">›</span>
              Learn more
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
          Hover a panel to expand • Auto-rotates when not hovering
        </div>
      </div>
    </section>
  );
}