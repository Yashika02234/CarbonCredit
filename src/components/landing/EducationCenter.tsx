import { useState } from "react";

export default function EducationCenter() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const items = [
    {
      q: "What are Carbon Credits?",
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
  ];

  return (
    <section className="bg-white py-36 px-2 lg:px-12">
      <div className="max-w-[1400px]">

        {/* HEADER */}
        <div className="mb-24">
          <h2 className="text-8xl  font-light text-[#0B3F34] mb-4">
            Learn Carbon Markets
          </h2>
          <p className="text-[#0B3F34]/70 max-w-xl text-lg">
            Clear answers to common questions about carbon markets,
            verification, and credit quality.
          </p>
        </div>

        {/* FAQ */}
        <div className="border-t border-[#0B3F34]/20">
          {items.map((item, i) => {
            const isOpen = openIndex === i;

            return (
              <div
                key={i}
                className={`border-b border-[#0B3F34]/20`}
              >
                {/* QUESTION */}
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="relative w-full text-left overflow-hidden group"
                >
                  {/* HOVER SWEEP (only when closed) */}
                  {!isOpen && (
                    <span className="
                      absolute inset-0
                      bg-[#0B3F34]
                      transform scale-x-0
                      origin-left
                      transition-transform duration-500 ease-out
                      group-hover:scale-x-100
                    " />
                  )}

                  <div
                    className={`
                      relative flex justify-between items-center
                      px-4 py-8
                      transition-colors duration-300
                      ${isOpen ? "bg-[#0B3F34] text-white" : "text-[#0B3F34] group-hover:text-white"}
                    `}
                  >
                    <span className="text-lg md:text-xl font-medium">
                      {item.q}
                    </span>

                    <span
                      className={`
                        text-2xl font-light transition-transform duration-300
                        ${isOpen ? "rotate-45" : ""}
                      `}
                    >
                      +
                    </span>
                  </div>
                </button>

                {/* ANSWER */}
                <div
                  className={`
                    overflow-hidden transition-all duration-500 ease-in-out
                    ${isOpen ? "max-h-[300px]" : "max-h-0"}
                  `}
                >
                  <div className="bg-[#0B3F34] px-4 pb-8">
                    <p className="text-white/85 leading-relaxed max-w-3xl">
                      {item.a}
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
