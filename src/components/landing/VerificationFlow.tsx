

import { useEffect } from "react";

export default function VerificationFlow() {
  const steps = [
    {
      step: "01",
      title: "Project Intake",
      desc: "Registry records, methodology details, and issuance data are ingested and normalized.",
    },
    {
      step: "02",
      title: "Methodology Check",
      desc: "Standards, vintages, and baselines are validated against accepted frameworks.",
    },
    {
      step: "03",
      title: "Risk & Integrity Scan",
      desc: "Automated signals flag duplication, leakage, and vintage quality risks.",
    },
    {
      step: "04",
      title: "Trust Score Output",
      desc: "A composite trust score and audit trail are generated for buyers.",
    },
  ];

 useEffect(() => {
  const lines = document.querySelectorAll(".flow-line") as NodeListOf<SVGPathElement>;
  if (!lines.length) return;

  lines.forEach(path => {
    const length = path.getTotalLength();
    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;
    path.style.transition = "stroke-dashoffset 2.4s ease";
  });

  const observer = new IntersectionObserver(
    ([entry]) => {
      lines.forEach(path => {
        const length = path.getTotalLength();
        path.style.strokeDashoffset = entry.isIntersecting ? "0" : `${length}`;
      });
    },
    { threshold: 0.25 }
  );

  observer.observe(lines[1]); // observe center line only

  // ---- STEPS (unchanged logic) ----
  const stepObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.remove("opacity-0", "translate-y-6");
          entry.target.classList.add("opacity-100", "translate-y-0");
        } else {
          entry.target.classList.remove("opacity-100", "translate-y-0");
          entry.target.classList.add("opacity-0", "translate-y-6");
        }
      });
    },
    { threshold: 0.35 }
  );

  document
    .querySelectorAll("[data-step]")
    .forEach(el => stepObserver.observe(el));

  return () => {
    observer.disconnect();
    stepObserver.disconnect();
  };
}, []);

  return (
    <section className="relative bg-[#3F5D50] text-white overflow-hidden rounded-t-[56px] -mt-32 z-30">

      {/* soft blend */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-[#f3f4ff]/95 to-transparent" />

      {/* curved top */}
    <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
  <svg
    className="relative block w-[130%] h-[180px] -translate-x-[5%]"
    viewBox="0 0 1200 180"
    preserveAspectRatio="none"
  >
    <defs>
      <linearGradient id="fadeBlend" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#f3f4ff" />
        <stop offset="75%" stopColor="#f3f4ff" />
        <stop offset="100%" stopColor="#f3f4ff" stopOpacity="0" />
      </linearGradient>
    </defs>

    <path
      d="M0,90 C300,190 900,-10 1200,110 L1200,0 L0,0 Z"
      fill="url(#fadeBlend)"
    />
  </svg>
</div>


      <div className="relative pt-40 pb-36 px-6 lg:px-2 max-w-[1300px] mx-auto">

        {/* header */}
        <div className=" mb-28">
          <h2 className="
  text-[64px] md:text-[88px] lg:text-[104px]
  leading-[0.95]
  font-light
  text-[#8F86A1]
  tracking-tight
  px-2
">
  How Credits are
  <br />
  Verified
</h2>

          <p className="text-white/80 mt-6 max-w-2xl ">
            Every project passes through a structured validation pipeline —
            combining data, methodology checks, and risk signals.
          </p>
        </div>

        {/* SVG FLOW LINE */}
       {/* SVG FLOW LINE CLUSTER */}
<svg
  className="absolute left-1/2 top-[380px] -translate-x-1/2 pointer-events-none"
  width="520"
  height="1100"
  viewBox="0 0 520 1100"
  fill="none"
>
  {/* LEFT SOFT LINE */}
  <path
    className="flow-line"
    d="
      M240 0
      C240 140 90 220 90 340
      C90 460 390 540 390 660
      C390 780 90 860 90 980
      C90 1080 240 1100 240 1100
    "
    stroke="#6bc14a"
    strokeWidth="2"
    strokeOpacity="0.25"
    fill="none"
  />

  {/* CENTER PRIMARY LINE */}
  <path
    id="flowPath"
    className="flow-line"
    d="
      M260 0
      C260 140 110 220 110 340
      C110 460 410 540 410 660
      C410 780 110 860 110 980
      C110 1080 260 1100 260 1100
    "
    stroke="#6bc14a"
    strokeWidth="3"
    strokeOpacity="0.9"
    fill="none"
  />

  {/* RIGHT SOFT LINE */}
  <path
    className="flow-line"
    d="
      M280 0
      C280 140 130 220 130 340
      C130 460 430 540 430 660
      C430 780 130 860 130 980
      C130 1080 280 1100 280 1100
    "
    stroke="#6bc14a"
    strokeWidth="2"
    strokeOpacity="0.25"
    fill="none"
  />
</svg>


        {/* steps */}
        <div className="relative flex flex-col gap-28">
          {steps.map((item, i) => (
            <div
              key={item.step}
              data-step
              className={`flex ${
                i % 2 === 0 ? "justify-start" : "justify-end"
              } opacity-0 translate-y-6 transition-all duration-700`}
            >
              <div className="w-full md:w-[420px] bg-white/95 text-gray-900 p-10 rounded-2xl shadow-[0_30px_80px_rgba(0,0,0,0.25)] hover:bg-[#30574E] hover:text-white transition-all duration-500">

                {/* badge */}
                <div className="inline-block mb-4 px-4 py-1 rounded-full bg-[#6bc14a] text-xs font-semibold tracking-wider text-white">
                  STEP {item.step}
                </div>

                <h3 className="text-xl font-medium mb-3">
                  {item.title}
                </h3>

                <p className="text-gray-600 hover:text-white/85 transition-colors">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* bottom note */}
        <p className="text-center text-white/80 text-sm max-w-2xl mx-auto mt-24">
          Full audit trails and registry references remain accessible for
          independent verification and compliance review.
        </p>
      </div>
    </section>
  );
}

