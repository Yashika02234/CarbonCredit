import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/* ===== MEDIA ===== */
const mangroveVideo = "https://drive.google.com/file/d/1GsQgvANiw7LAQn1okk5xGbljKQQLXqjv/view?usp=sharing"

import solarVideo from "../../assets/images/solar.mp4";
import methaneVideo from "../../assets/images/methane.mp4";
import forestVideo from "../../assets/images/forest.mp4";

/* ===== DATA ===== */

const projects = [
  {
    id: 1,
    name: "Mangrove Restoration",
    location: "India",
    video: mangroveVideo,
    credits: "420,000+",
    methodology: "Blue Carbon ARR",
    registry: "Verra",
    desc: "Large-scale mangrove restoration delivering verified removals with satellite and on-ground monitoring."
  },
  {
    id: 2,
    name: "Solar Energy Initiative",
    location: "Brazil",
    video: solarVideo,
    credits: "310,000+",
    methodology: "Grid Displacement",
    registry: "Gold Standard",
    desc: "Utility-scale solar replacing fossil grid energy with measurable emissions reduction."
  },
  {
    id: 3,
    name: "Methane Capture Program",
    location: "Indonesia",
    video: methaneVideo,
    credits: "190,000+",
    methodology: "Methane Avoidance",
    registry: "ACR",
    desc: "Industrial methane capture converting harmful emissions into usable energy."
  },
  {
    id: 4,
    name: "Forest Conservation",
    location: "Kenya",
    video: forestVideo,
    credits: "510,000+",
    methodology: "REDD+",
    registry: "Verra",
    desc: "Avoided deforestation program protecting high-value biodiversity zones."
  }
];

/* ===== COMPONENT ===== */

export default function VerifiedProjectsShowcase() {
  const [index, setIndex] = useState(0);
  const active = projects[index];

  const next = () => setIndex(i => (i + 1) % projects.length);
  const prev = () => setIndex(i => (i - 1 + projects.length) % projects.length);

  return (
    <section className="relative bg-[#3F5D50] text-white py-36 px-6 lg:px-12 overflow-hidden">

      {/* ===== CURVE TOP ===== */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
        <svg
          className="relative block w-[130%] h-[160px] -translate-x-[5%]"
          viewBox="0 0 1200 160"
          preserveAspectRatio="none"
        >
          <path
            d="M0,80 C300,180 900,-20 1200,100 L1200,0 L0,0 Z"
            fill="#ffffff"
          />
        </svg>
      </div>

      {/* ===== CONTENT ===== */}
      <div className="relative max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-20 items-center z-10">

        {/* ================= LEFT — SINGLE PROJECT ONLY ================= */}
        <div className="relative">

          <div className="
            rounded-[32px]
            overflow-hidden
            shadow-[0_40px_120px_rgba(0,0,0,0.6)]
            h-[520px]
            relative
          ">

            {/* Only ONE video rendered */}
            <video
              key={active.id}
              src={active.video}
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover animate-fade"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            <div className="absolute bottom-8 left-8">
              <h3 className="text-xl font-medium">{active.name}</h3>
              <p className="text-white/70 text-sm">{active.location}</p>
            </div>

          </div>

          {/* arrows */}
          <div className="flex gap-4 mt-8">
            <button onClick={prev} className="w-12 h-12 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center transition">
              <ChevronLeft size={22} />
            </button>
            <button onClick={next} className="w-12 h-12 rounded-full bg-[#6bc14a] hover:bg-[#5aad3f] flex items-center justify-center transition">
              <ChevronRight size={22} />
            </button>
          </div>

        </div>

        {/* ================= RIGHT — DETAILS ================= */}
        <div className="max-w-xl">

          <p className="text-sm uppercase tracking-widest text-white/60 mb-4">
            Verified Project
          </p>

          <h2 className="text-4xl md:text-5xl font-medium mb-8">
            {active.name}
          </h2>

          <p className="text-white/80 text-lg leading-relaxed mb-10">
            {active.desc}
          </p>

          <div className="grid grid-cols-2 gap-8 mb-12">
            <Metric label="Location" value={active.location} />
            <Metric label="Registry" value={active.registry} />
            <Metric label="Methodology" value={active.methodology} />
            <Metric label="Credits Issued" value={active.credits} />
          </div>

          <div className="flex flex-wrap gap-3 mb-12">
            {["Verified", "Traceable", "Audit Ready", "Methodology Approved"].map(b => (
              <span key={b} className="text-xs bg-white/10 border border-white/20 px-4 py-2 rounded-full">
                {b}
              </span>
            ))}
          </div>

          <button className="px-8 py-4 rounded-full bg-[#6bc14a] hover:bg-[#5aad3f] font-medium transition">
            View Project Details
          </button>

        </div>

      </div>
    </section>
  );
}

/* ===== METRIC ===== */

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-white/50 text-sm mb-1">{label}</p>
      <p className="font-medium text-lg">{value}</p>
    </div>
  );
}
