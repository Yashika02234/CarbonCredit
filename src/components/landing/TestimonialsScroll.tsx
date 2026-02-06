import React, { useEffect, useRef, useState } from "react";

type Testimonial = {
  quote: string;
  author: string;
  role: string;
  rating: number;
  accent: string;
  bg: string;
};

const testimonials: Testimonial[] = [
  {
    quote:
      "Partnering with Offset has revolutionized our approach to carbon trading. Their innovative solutions have significantly enhanced our trading activities and contributed to our environmental goals.",
    author: "John Doe",
    role: "Sustainability Lead",
    rating: 5,
    accent: "Media On-Demand",
    bg: "bg-[#E6D9FF]",
  },
  {
    quote:
      "Offset provides a level of transparency and trust that we have not seen before in carbon markets. Their platform has become a critical part of our ESG strategy.",
    author: "Sarah Williams",
    role: "Head of ESG, FinCorp",
    rating: 5,
    accent: "Web3",
    bg: "bg-[#DDF3EE]",
  },
  {
    quote:
      "The geospatial verification and trust scoring mechanisms offered by Offset have given our institution confidence in every credit we retire.",
    author: "Michael Chen",
    role: "Director of Climate Finance",
    rating: 5,
    accent: "Cyber-security",
    bg: "bg-[#FFF1DC]",
  },
  {
    quote:
      "Offset has transformed how we evaluate impact and risk in climate finance decisions.",
    author: "Emily Brown",
    role: "Climate Strategy Advisor",
    rating: 5,
    accent: "Enterprise AI",
    bg: "bg-[#E9F2FF]",
  },
];

const TestimonialsStackScroll: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!sectionRef.current) return;
    const steps = sectionRef.current.querySelectorAll("[data-step]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveIndex(
              Number((entry.target as HTMLElement).dataset.step)
            );
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px" }
    );

    steps.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-white"
      style={{ height: `${testimonials.length * 100}vh` }}
    >
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <div className="relative w-full max-w-[92vw] h-[600px]">


          {testimonials.map((t, i) => {
            const isPast = i < activeIndex;
            const isFuture = i > activeIndex;

            let translateY = 0;
            let scale = 1;
            let opacity = 1;

            if (isPast) {
              const depth = activeIndex - i;
              translateY = -depth * 72;
              scale = 1 - depth * 0.02;
            }

            if (isFuture) {
              translateY = 120;
              opacity = 0;
            }

            return (
              <div
                key={i}
                className={`
                  absolute left-0 right-0 bottom-0
                  rounded-[14px]
                  overflow-hidden
                  shadow-[0_30px_80px_rgba(0,0,0,0.15)]
                  transition-all duration-700 ease-out
                  ${t.bg}
                `}
                style={{
                  transform: `translateY(${translateY}px) scale(${scale})`,
                  opacity,
                  zIndex: 100 + i,
                }}
              >
                {/* ================= CARD CONTENT ================= */}
                <div className="grid grid-cols-[300px_1fr] min-h-[600px]">

                  {/* LEFT META STRIP */}
                  <div className="bg-[#0B1220] text-white p-10 flex flex-col justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-widest opacity-70 mb-4">
                        {t.accent}
                      </p>
                      <p className="text-lg font-semibold">Offset</p>
                    </div>

                    <div className="flex gap-1 text-sm opacity-80">
                      {Array.from({ length: t.rating }).map((_, idx) => (
                        <span key={idx}>★</span>
                      ))}
                    </div>
                  </div>

                  {/* RIGHT CONTENT */}
                  <div className="p-12 flex flex-col justify-between">
                    <p className="text-[17px] leading-relaxed text-gray-900 max-w-xl">
                      {t.quote}
                    </p>

                    <div className="mt-10">
                      <p className="font-medium text-gray-900">{t.author}</p>
                      <p className="text-sm text-gray-500">{t.role}</p>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </div>

      {testimonials.map((_, i) => (
        <div key={i} data-step={i} className="h-screen" />
      ))}
    </section>
  );
};

export default TestimonialsStackScroll;
