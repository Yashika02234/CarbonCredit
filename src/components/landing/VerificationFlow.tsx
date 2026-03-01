import { useEffect, useMemo, useRef, useState } from "react";

type Step = {
  step: string;
  title: string;
  desc: string;
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export default function VerificationFlow() {
  const steps: Step[] = useMemo(
    () => [
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
    ],
    []
  );

  const totalCards = 1 + steps.length;
  const totalSteps = totalCards + 1;

  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [uiStep, setUiStep] = useState(0);
  const [stepPx, setStepPx] = useState(560);

  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;

      const firstCard = track.querySelector<HTMLElement>("[data-card]");
      if (!firstCard) return;

      const cardW = firstCard.getBoundingClientRect().width;
      const gapPx = 40; // gap-10
      setStepPx(cardW + gapPx);
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const vh = window.innerHeight;
      const sectionTop = section.offsetTop;
      const y = window.scrollY;

      const inside = y - sectionTop;

      const s = clamp(Math.floor(inside / vh), 0, totalSteps - 1);
      setUiStep(s);

      const idx = clamp(s, 0, totalCards - 1);
      setActiveIndex(idx);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [totalCards, totalSteps]);

  const x = -(activeIndex * stepPx);
  const isLightBg = uiStep === 0 || uiStep === totalSteps - 1;

  return (
    <section
      ref={sectionRef}
      className="relative w-full transition-colors duration-500"
      style={{
        background: isLightBg ? "#F8FAF9" : "#07110E",
        height: `${totalSteps * 100}vh`,
      }}
    >
      {/* STICKY VIEWPORT */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* ✅ make content fit: reduce top padding a bit + add bottom padding */}
        <div className="max-w-[1500px] mx-auto px-6 lg:px-12 pt-14 md:pt-16 lg:pt-18 pb-10">
          <p
            className={`text-xs tracking-[0.28em] uppercase ${
              isLightBg ? "text-slate-600" : "text-white/55"
            }`}
          >
            Verification flow
          </p>

          <h2
            className={`mt-5 text-center text-[34px] md:text-[58px] lg:text-[64px] leading-[1.06] font-medium tracking-tight ${
              isLightBg ? "text-slate-950" : "text-white"
            }`}
          >
            How carbon credits
            <br />
            <span className={isLightBg ? "text-slate-400" : "text-white/35"}>
              earn their integrity.
            </span>
          </h2>

          {/* ✅ slightly reduce vertical space so bottom doesn’t cut */}
          <div
            className={`mt-10 md:mt-12 border overflow-hidden ${
              isLightBg ? "border-black/10" : "border-white/10"
            }`}
            style={{ borderRadius: 0 }}
          >
            <div className="relative">
              <div
                ref={trackRef}
                className="flex items-stretch gap-10 py-10 md:py-12 px-6 md:px-8 will-change-transform"
                style={{
                  transform: `translate3d(${x}px,0,0)`,
                  transition: "transform 600ms cubic-bezier(0.22,1,0.36,1)",
                }}
              >
                {/* Intro */}
                <div
                  data-card
                  className="min-w-[340px] md:min-w-[520px] h-[300px] md:h-[360px] bg-white border border-black/10 p-8 md:p-10"
                  style={{ borderRadius: 0 }}
                >
                  <p className="text-xs tracking-[0.28em] uppercase text-emerald-900/70">
                    Process overview
                  </p>
                  <h3 className="mt-4 text-2xl md:text-3xl font-medium text-slate-950 tracking-tight">
                    Verification, end to end.
                  </h3>
                  <p className="mt-4 md:mt-5 text-slate-700 leading-relaxed">
                    Har 1 scroll screen (100vh) par 1 card next hoga — hero jaisa.
                  </p>
                  <div className="mt-8 md:mt-10 h-px w-full bg-gradient-to-r from-emerald-900/25 to-transparent" />
                </div>

                {/* Steps */}
                {steps.map((s) => (
                  <article
                    key={s.step}
                    data-card
                    className={`min-w-[340px] md:min-w-[520px] h-[300px] md:h-[360px] border p-8 md:p-10 ${
                      isLightBg ? "border-black/10 bg-white" : "border-white/10 bg-white/[0.04]"
                    }`}
                    style={{ borderRadius: 0 }}
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className={`text-xs tracking-[0.3em] uppercase ${
                          isLightBg ? "text-emerald-900/70" : "text-emerald-200/70"
                        }`}
                      >
                        {s.step}
                      </span>
                      <div className={`h-px flex-1 ${isLightBg ? "bg-black/10" : "bg-white/10"}`} />
                    </div>

                    <h3
                      className={`mt-5 md:mt-6 text-2xl md:text-3xl font-medium tracking-tight ${
                        isLightBg ? "text-slate-950" : "text-white"
                      }`}
                    >
                      {s.title}
                    </h3>

                    <p
                      className={`mt-4 md:mt-5 leading-relaxed ${
                        isLightBg ? "text-slate-700" : "text-white/70"
                      }`}
                    >
                      {s.desc}
                    </p>

                    <div className="mt-8 md:mt-10 h-px w-full bg-gradient-to-r from-emerald-500/25 to-transparent" />
                    <p
                      className={`mt-4 md:mt-5 text-sm ${
                        isLightBg ? "text-emerald-900/70" : "text-emerald-200/80"
                      }`}
                    >
                      Scroll → next step
                    </p>
                  </article>
                ))}
              </div>

              <div className="absolute bottom-4 right-6">
                <span className={isLightBg ? "text-slate-500 text-xs" : "text-white/45 text-xs"}>
                  {activeIndex + 1} / {totalCards}
                </span>
              </div>
            </div>
          </div>

          {/* ✅ keep caption but ensure it doesn’t get cut */}
          <div className="mt-6 md:mt-8 max-w-[820px]">
            <h4 className={`${isLightBg ? "text-slate-950" : "text-white"} text-xl md:text-2xl font-medium`}>
              Integrity you can audit. Decisions you can defend.
            </h4>
          </div>
        </div>
      </div>
    </section>
  );
}