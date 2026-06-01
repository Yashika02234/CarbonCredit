import React, { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Testimonial = {
  quote: string;
  author: string;
  role: string;
  rating: number;
  accent: string; // heading/title
};

const testimonials: Testimonial[] = [
  {
    quote:
      "OffsetX is exactly what industrial exporters needed. CBAM is forcing steel and cement manufacturers to completely rethink their emissions data workflows — and OffsetX gives them the infrastructure to do it without building it themselves.",
    author: "Carbon Markets Expert",
    role: "EU Policy & Regulatory Advisory",
    rating: 5,
    accent: "Regulatory Validation",
  },
  {
    quote:
      "The transition from voluntary ESG reporting to mandatory CSRD compliance is not incremental — it's a complete systems change. OffsetX provides the audit-grade architecture that compliance officers actually need.",
    author: "Chief Sustainability Officer",
    role: "Industrial Manufacturing Group",
    rating: 5,
    accent: "Enterprise Compliance",
  },
  {
    quote:
      "We piloted OffsetX across our emissions reporting for three facilities. The data integrity layer and automated validation cut our audit preparation time significantly. This is compliance infrastructure, not another dashboard.",
    author: "Head of Carbon Compliance",
    role: "Global Energy & Resources Firm",
    rating: 5,
    accent: "Pilot Readiness",
  },
  {
    quote:
      "OffsetX is being developed with deep understanding of how global compliance frameworks actually operate. Their architecture reflects the kind of thinking that comes from incubator-level engagement with regulatory realities.",
    author: "Program Director",
    role: "Climate Tech Incubator",
    rating: 5,
    accent: "Incubator Backed",
  },
];

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

const DARK = "#07110E"; // ✅ same as your VerificationFlow dark

const TestimonialsStackScroll: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const total = testimonials.length;
  const t = useMemo(() => testimonials[activeIndex], [activeIndex]);

  // Scroll -> step (like your VerificationFlow logic)
  useEffect(() => {
    const onScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const vh = window.innerHeight;
      const top = section.offsetTop;
      const inside = window.scrollY - top;

      const idx = clamp(Math.floor(inside / vh), 0, total - 1);
      setActiveIndex(idx);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [total]);

  const goPrev = () => setActiveIndex((p) => clamp(p - 1, 0, total - 1));
  const goNext = () => setActiveIndex((p) => clamp(p + 1, 0, total - 1));

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: `${total * 100}vh`, background: "#F8FAF7" }}
    >
      <div className="sticky top-0 h-screen flex items-center justify-center px-6 lg:px-12">
        <div className="w-full max-w-[1700px]">
          {/* Frame like reference */}
          <div className="rounded-[22px] overflow-hidden shadow-[0_40px_140px_rgba(0,0,0,0.12)]">
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_520px]">
              {/* LEFT: content */}
              <div
                className="text-white px-10 py-12 lg:px-14 lg:py-14"
                style={{ background: DARK }}
              >
                {/* Top row (Step + arrows) */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full border border-white/40 flex items-center justify-center text-sm">
                      {activeIndex + 1}
                    </div>
                    <p className="text-sm text-white/70">
                      Step {activeIndex + 1} of {total}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={goPrev}
                      disabled={activeIndex === 0}
                      className={`h-10 w-10 rounded-full border flex items-center justify-center transition ${
                        activeIndex === 0
                          ? "border-white/10 text-white/20"
                          : "border-white/30 text-white hover:bg-white/10"
                      }`}
                      aria-label="Previous"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>

                    <button
                      onClick={goNext}
                      disabled={activeIndex === total - 1}
                      className={`h-10 w-10 rounded-full border flex items-center justify-center transition ${
                        activeIndex === total - 1
                          ? "border-white/10 text-white/20"
                          : "border-white/30 text-white hover:bg-white/10"
                      }`}
                      aria-label="Next"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Title */}
                <h3 className="mt-10 text-4xl md:text-5xl font-semibold tracking-tight">
                  {t.accent}
                </h3>

                {/* Subtitle */}
                <p className="mt-4 text-white/70 text-lg">
                  {t.author} <span className="text-white/45">— {t.role}</span>
                </p>

                {/* Quote */}
                <p className="mt-10 max-w-[62ch] text-white/65 leading-relaxed text-lg">
                  {t.quote}
                </p>

                {/* Rating */}
                <div className="mt-10 flex items-center gap-1 text-white/60">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <span key={i} className="text-base">
                      ★
                    </span>
                  ))}
                </div>
              </div>

              {/* RIGHT: vertical step columns */}
              <div style={{ background: DARK }}>
                <div
                  className="grid h-full"
                  style={{ gridTemplateColumns: `repeat(${total}, minmax(0, 1fr))` }}
                >
                  {testimonials.map((_, i) => {
                    const active = i === activeIndex;
                    return (
                      <div
                        key={i}
                        className={`relative border-l border-white/10 transition-colors duration-500 ${
                          active ? "bg-white/5" : "bg-transparent"
                        }`}
                      >
                        {/* circle number */}
                        <div className="absolute top-10 left-1/2 -translate-x-1/2">
                          <div
                            className={`h-11 w-11 rounded-full border flex items-center justify-center text-sm transition ${
                              active
                                ? "border-white/70 text-white"
                                : "border-white/25 text-white/60"
                            }`}
                          >
                            {i + 1}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center text-xs text-slate-500">
            Scroll to move steps →
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsStackScroll;