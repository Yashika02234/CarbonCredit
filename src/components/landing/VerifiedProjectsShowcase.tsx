import { useState, useEffect, useRef } from "react";

/* ===== MEDIA ===== */
const mangroveVideo =
  "https://drive.google.com/uc?export=download&id=1GsQgvANiw7LAQn1okk5xGbljKQQLXqjv";

import solarVideo from "../../assets/images/solar.mp4";
import methaneVideo from "../../assets/images/methane.mp4";
import forestVideo from "../../assets/images/forest.mp4";

/* ===== DATA ===== */
const slides = [
  { id: 1, src: mangroveVideo, type: "video", title: "Individuals & Businesses" },
  { id: 2, src: solarVideo, type: "video", title: "Verified Carbon Projects" },
  { id: 3, src: methaneVideo, type: "video", title: "Carbon Portfolio" },
  { id: 4, src: forestVideo, type: "video", title: "Climate Accountability" },
  { id: 5, src: solarVideo, type: "video", title: "Registry Integrity" },
];

export default function ExpandableHoverRail() {
  const [start, setStart] = useState(0);
  const [hovered, setHovered] = useState<number | null>(1);
  const timer = useRef<NodeJS.Timeout | null>(null);

  /* ===== AUTO SHIFT WINDOW ===== */
  useEffect(() => {
    startAuto();
    return stopAuto;
  }, []);

  const startAuto = () => {
    stopAuto();
    timer.current = setInterval(() => {
      setStart((s) => (s + 1) % slides.length);
      setHovered(1); // reset hover to center
    }, 4500);
  };

  const stopAuto = () => {
    if (timer.current) clearInterval(timer.current);
  };

  /* ===== VISIBLE WINDOW (3) ===== */
  const visible = [
    slides[start % slides.length],
    slides[(start + 1) % slides.length],
    slides[(start + 2) % slides.length],
  ];

  return (
    <section className="bg-emerald-950 py-32 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6">

        {/* HEADER */}
        <h2 className="text-6xl font-light text-white mb-6">
          Turning Carbon Commitments <br /> into Verified Climate Action
        </h2>
        <p className="text-white/70 mb-20 max-w-xl">
          Hover a project to expand it. Others compress automatically.
        </p>

        {/* HOVER RAIL */}
        <div
          className="flex gap-6 h-[480px]"
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
                  rounded-2xl
                  overflow-hidden
                  transition-[flex] duration-700
                  ease-[cubic-bezier(0.22,1,0.36,1)]
                  ${expanded ? "flex-[3]" : "flex-[1]"}
                `}
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
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}

                {/* OVERLAY */}
                <div className="absolute inset-0 bg-black/35" />

                {/* CONTENT */}
                <div className="relative h-full flex items-end p-6">
                  <div
                    className={`
                      transition-all duration-500
                      ${expanded ? "opacity-100 translate-y-0" : "opacity-60 translate-y-2"}
                    `}
                  >
                    <p className="text-white text-lg font-medium">
                      {slide.title}
                    </p>
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
