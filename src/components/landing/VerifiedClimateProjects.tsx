import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/* ========= MEDIA IMPORTS ========= */
import mangroveVideo from "../../assets/images/mangrove.mp4";
import solarVideo from "../../assets/images/solar.mp4";
import methaneVideo from "../../assets/images/methane.mp4";
import forestVideo from "../../assets/images/forest.mp4";
import windImage from "../../assets/images/wind.png";


/* ========= DATA ========= */

const projects = [
  { id: 1, name: "Mangrove Restoration", location: "India", video: mangroveVideo },
  { id: 2, name: "Solar Energy Initiative", location: "Brazil", video: solarVideo },
  { id: 3, name: "Methane Capture Program", location: "Indonesia", video: methaneVideo },
  { id: 4, name: "Forest Conservation", location: "Kenya", video: forestVideo },
  { id: 5, name: "Wind Farm Cluster", location: "Spain", image: windImage },
 
];

/* ========= COMPONENT ========= */

export default function VerifiedClimateProjects() {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((i) => (i + 1) % projects.length);
  const prev = () => setIndex((i) => (i - 1 + projects.length) % projects.length);

  return (
    <section className="relative bg-[#3F5D50] py-36 overflow-hidden text-white">

      {/* ===== CURVED TOP ===== */}
     {/* ===== CURVED TOP — SMOOTH ARC ===== */}
<div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
  <svg
    className="relative block w-[130%] h-[160px] -translate-x-[5%]"
    viewBox="0 0 1200 160"
    preserveAspectRatio="none"
  >
    <path
      d="M0,40 C250,120 950,-20 1200,60 L1200,0 L0,0 Z"
      fill="#ffffff"
    />
  </svg>
</div>

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">

        {/* ===== HEADER ===== */}
        <div className="flex items-end justify-between mb-20">
          <div>
            <h2 className="text-5xl font-medium mb-6">
              Verified Climate Projects
            </h2>
            <p className="text-white/80 max-w-lg leading-relaxed">
              Explore independently verified climate initiatives with
              measurable, transparent impact.
            </p>
          </div>

          {/* ===== NAV ===== */}
          <div className="flex gap-4">
            <button
              onClick={prev}
              className="w-14 h-14 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition"
            >
              <ChevronLeft size={30} />
            </button>

            <button
              onClick={next}
              className="w-14 h-14 rounded-full bg-[#6bc14a] hover:bg-[#5aad3f] flex items-center justify-center transition"
            >
              <ChevronRight size={30} />
            </button>
          </div>
        </div>

        {/* ===== SLIDER ===== */}
        <div className="relative h-[500px] flex items-center justify-center">

          {projects.map((project, i) => {
            const offset = i - index;
            const isActive = i === index;

            return (
              <div
                key={project.id}
                className="
                  absolute
                  w-[380px] h-[440px]
                  rounded-[30px]
                  overflow-hidden
                  transition-all duration-700 ease-out
                  shadow-[0_40px_120px_rgba(0,0,0,0.35)]
                "
                style={{
                  transform: `
                    translateX(${offset * 340}px)
                    scale(${isActive ? 1.02 : 0.78})
                  `,
                  opacity: isActive ? 1 : 0.5,
                  filter: isActive ? "none" : "blur(2px)",
                  zIndex: isActive ? 10 : 1,
                }}
              >

                {/* ===== MEDIA ===== */}
                {project.video ? (
                  <video
                    src={project.video}
                    autoPlay={isActive}
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={project.image}
                    alt={project.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}

                {/* ===== OVERLAY ===== */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />

                {/* ===== TEXT ===== */}
                <div className="relative z-10 h-full p-10 flex flex-col justify-end">
                  <h3 className="text-2xl font-medium mb-2">
                    {project.name}
                  </h3>
                  <p className="text-white/80">
                    {project.location}
                  </p>
                </div>

              </div>
            );
          })}
        </div>

        {/* ===== DOTS ===== */}
        <div className="flex justify-center gap-3 mt-12">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`
                w-2.5 h-2.5 rounded-full transition
                ${i === index ? "bg-white" : "bg-white/40"}
              `}
            />
          ))}
        </div>

      </div>
    </section>
  );
}