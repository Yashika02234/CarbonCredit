import { useMemo, useState } from "react";

type FAQ = { q: string; a: string };

export default function EducationCenter() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const items: FAQ[] = useMemo(
    () => [
      {
        q: "What are carbon credits?",
        a: "Carbon credits represent one tonne of CO₂ equivalent reduced or removed from the atmosphere through verified climate projects.",
      },
      {
        q: "Why does verification matter?",
        a: "Verification ensures credits are real, additional, permanent, and independently audited under trusted global standards.",
      },
      {
        q: "How are Trust Scores calculated?",
        a: "Trust Scores combine methodology quality, project vintage, monitoring data, and risk signals to assess credit integrity.",
      },
      {
        q: "Which registries are supported?",
        a: "We analyze credits issued under registries such as Verra, Gold Standard, ACR, and other leading standards.",
      },
      {
        q: "What happens during credit retirement?",
        a: "Credits are permanently retired on public registries, creating an immutable audit trail for reporting and compliance.",
      },
      {
        q: "Why focus on quality over volume?",
        a: "High-quality credits reduce reputational risk, improve climate impact, and strengthen long-term sustainability claims.",
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
              EDUCATION CENTER
            </p>

            <h2 className="mt-7 text-[44px] md:text-[64px] leading-[1.05] font-semibold tracking-tight text-black">
              Learn carbon markets.
              <br />
              <span className="text-black/35">Fast, clear answers.</span>
            </h2>
          </div>

          <div className="lg:pt-16">
            <p className="text-black/60 text-lg leading-relaxed max-w-xl">
              Clear explanations of verification, registries, and integrity signals —
              written for teams making real procurement and compliance decisions.
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