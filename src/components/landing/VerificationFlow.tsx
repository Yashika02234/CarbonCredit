import { useEffect } from "react";

export default function VerificationFlow() {
  const steps = [
    {
      step: "001",
      title: "Project Intake",
      desc: "Registry records, project documentation, and methodology details are collected and normalized for evaluation.",
    },
    {
      step: "002",
      title: "Methodology Validation",
      desc: "Project methodologies, baselines, and vintages are checked against approved standards and protocols.",
    },
    {
      step: "003",
      title: "Registry & Issuance Check",
      desc: "Credits are verified against official registries to confirm issuance, ownership, and serial integrity.",
    },
    {
      step: "004",
      title: "Risk & Integrity Scan",
      desc: "Automated and rule-based checks flag risks such as double counting, leakage, and quality concerns.",
    },
    {
      step: "005",
      title: "Trust Score Generation",
      desc: "A composite trust score is calculated using methodology strength, data quality, and risk signals.",
    },
    {
      step: "006",
      title: "Audit-Ready Output",
      desc: "Transparent records, references, and scoring logic are made available for compliance and reporting.",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("opacity-0", "translate-y-12");
            entry.target.classList.add("opacity-100", "translate-y-0");
          } else {
            // reverse animation on scroll up
            entry.target.classList.remove("opacity-100", "translate-y-0");
            entry.target.classList.add("opacity-0", "translate-y-12");
          }
        });
      },
      { threshold: 0.35 }
    );

    document
      .querySelectorAll("[data-step]")
      .forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative bg-[#F4FAF8] overflow-hidden">
      {/* subtle background depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#E2F4EE_0%,transparent_60%)]" />

      <div className="relative max-w-[1300px] mx-auto px-6 py-40 grid grid-cols-1 lg:grid-cols-2 gap-24">

        {/* ================= LEFT (STICKY CONTENT) ================= */}
        <div className="lg:sticky lg:top-32 h-fit">
          <h2
            className="
              text-[64px] md:text-[88px]
              leading-[0.95]
              font-light
              tracking-tight
              text-[#1E6B5C]
              mb-8
            "
          >
            How carbon
            <br />
            credits are
            <br />
            verified
          </h2>

          <p className="text-[#1E6B5C]/75 max-w-md text-base leading-relaxed">
            Every credit passes through a structured verification pipeline —
            combining registry data, methodology checks, and risk analysis to
            ensure integrity and transparency.
          </p>
        </div>

        {/* ================= RIGHT (SCROLL STEPS) ================= */}
        <div className="flex flex-col gap-40">
          {steps.map((item) => (
            <div
              key={item.step}
              data-step
              className="
                opacity-0 translate-y-12
                transition-all duration-700 ease-out
              "
            >
              {/* step header */}
              <div className="flex items-center gap-6 mb-6">
                <span
                  className="
                    text-xs tracking-widest font-medium
                    px-3 py-1 rounded-full
                    bg-[#1E6B5C]/10
                    text-[#1E6B5C]
                  "
                >
                  {item.step}
                </span>

                <div className="relative flex-1 h-px bg-gradient-to-r from-[#1E6B5C] to-transparent">
                  <span className="absolute -left-1 -top-[5px] w-3 h-3 rounded-full bg-[#1E6B5C] shadow-[0_0_12px_rgba(30,107,92,0.6)]" />
                </div>
              </div>

              {/* content */}
              <h3 className="text-2xl font-medium text-[#1E6B5C] mb-4 uppercase">
                {item.title}
              </h3>

              <p className="text-sm leading-relaxed text-[#1E6B5C]/80 max-w-md">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
