import { useEffect, useMemo, useRef, useState } from "react";

type SectionItem = {
  title: string;
  description: string;
};

type SectionBlock = {
  id: string;
  nav: string[];
  activeNavLabel: string;
  rightTitle: string;
  rightDescription: string;
  rightItems: SectionItem[];
  image: string;
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}
function clamp01(n: number) {
  return clamp(n, 0, 1);
}
function smoothstep(t: number) {
  return t * t * (3 - 2 * t);
}

export default function PlatformStickySections() {
  const VIEW_H = "92vh";
  const VIEW_MIN_H = 900; // panel height driver (px)

  const blocks: SectionBlock[] = useMemo(
    () => [
      {
        id: "different",
        nav: ["How Offset Is Different", "Trust Infrastructure", "Who This Is For"],
        activeNavLabel: "How Offset Is Different",
        rightTitle: "How Offset Is Different",
        rightDescription:
          "Offset is built as neutral infrastructure for trust — not as a marketplace or registry replacement.",
        rightItems: [
          { title: "Integrity is computed", description: "Scores evolve continuously from registry signals." },
          { title: "Full lifecycle traceability", description: "Credits remain contextual across transfers." },
          { title: "Neutral by design", description: "Independent and auditable signals only." },
        ],
        image: "https://images.unsplash.com/photo-1509395176047-4a66953fd231?q=80&w=2000",
      },
      {
        id: "infra",
        nav: ["How Offset Is Different", "Trust Infrastructure", "Who This Is For"],
        activeNavLabel: "Trust Infrastructure",
        rightTitle: "Trust Infrastructure",
        rightDescription:
          "Offset is built on verifiable primitives that enforce integrity without reliance on trust.",
        rightItems: [
          { title: "Ledger", description: "Append-only event history." },
          { title: "UNIC", description: "Universal persistent identifier." },
          { title: "Trust Score", description: "Continuously evaluated integrity signal." },
        ],
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000",
      },
      {
        id: "who",
        nav: ["How Offset Is Different", "Trust Infrastructure", "Who This Is For"],
        activeNavLabel: "Who This Is For",
        rightTitle: "Who This Is For",
        rightDescription:
          "Designed for institutions that require verifiable integrity — not marketing claims.",
        rightItems: [
          { title: "Enterprise", description: "Decision-grade signals at scale." },
          { title: "Developers", description: "Integrate carbon intelligence." },
          { title: "Government & Regulators", description: "Oversight and accountability." },
        ],
        image: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=2000",
      },
    ],
    []
  );

  const total = blocks.length;
  const sectionRef = useRef<HTMLElement | null>(null);

  const [progress, setProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  // ✅ NEW: compute proper height based on px travel
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let raf = 0;

    const measure = () => {
      // travel = (total-1) * panelHeightPx
      // total scrollable inside section = travel
      // total section height = viewport + travel
      const travel = (total - 1) * VIEW_MIN_H;
      section.style.height = `${window.innerHeight + travel}px`;
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        const end = section.offsetHeight - window.innerHeight; // == travel
        const inside = -rect.top;
        const p = end > 0 ? clamp01(inside / end) : 0;
        setProgress(p);
      });
    };

    measure();
    onScroll();

    window.addEventListener("resize", () => {
      measure();
      onScroll();
    });
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", () => {
        measure();
        onScroll();
      });
    };
  }, [total]);

  const floatIndex = progress * (total - 1);
  const base = clamp(Math.floor(floatIndex), 0, total - 1);
  const eased = smoothstep(clamp01(floatIndex - base));
  const rightY = -(base + eased) * VIEW_MIN_H;

  useEffect(() => {
    setActiveIndex(base);
  }, [base]);

  return (
    <>
      {/* HERO ABOVE */}
      <section className="w-full bg-[#F6F5F1] pt-32 pb-24">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <p className="text-xs tracking-[0.28em] uppercase text-black/50">
            OFFSET PLATFORM
          </p>

          <h1 className="mt-8 text-[48px] md:text-[76px] leading-[1.04] font-semibold tracking-tight text-black max-w-[1100px]">
            One home for operating and
            <br />
            scaling carbon integrity.
            <br />
            <span className="text-black/35">However complex.</span>
          </h1>
        </div>
      </section>

      {/* STICKY SYSTEM */}
      <section ref={sectionRef} className="relative w-full bg-[#F6F5F1]">
        <div className="sticky top-0 h-screen flex items-start pt-1 pb-1">
          <div className="w-full max-w-[1700px] mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-5">
              {/* LEFT NAV */}
              <aside className="hidden lg:block pt-6">
                <div className="relative pl-6">
                  <span className="absolute left-[7px] top-0 bottom-0 w-px bg-black/10" />
                  <ul className="space-y-4">
                    {blocks[activeIndex].nav.map((label) => {
                      const isActive = label === blocks[activeIndex].activeNavLabel;
                      return (
                        <li key={label} className="relative">
                          <span
                            className={`absolute left-[-18px] top-[8px] h-2 w-2 rounded-full ${
                              isActive ? "bg-[#2B6E5D]" : "bg-black/15"
                            }`}
                          />
                          <span
                            className={`text-[16px] ${
                              isActive ? "text-black" : "text-black/45"
                            }`}
                          >
                            {label}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </aside>

              {/* RIGHT PANEL */}
              <div
                className="relative overflow-hidden border border-black/10 bg-white rounded-2xl"
                style={{ height: VIEW_H, minHeight: VIEW_MIN_H }}
              >
                <div
                  style={{
                    transform: `translate3d(0, ${rightY}px, 0)`,
                    transition: "transform 600ms cubic-bezier(0.22,1,0.36,1)",
                  }}
                >
                  {blocks.map((b) => (
                    <div
                      key={b.id}
                      className="p-12"
                      style={{ minHeight: VIEW_MIN_H }}
                    >
                      <h3 className="text-[38px] font-semibold text-black">
                        {b.rightTitle}
                      </h3>

                      <p className="mt-6 text-black/65 text-lg max-w-3xl">
                        {b.rightDescription}
                      </p>

                      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-10">
                        {b.rightItems.map((it) => (
                          <div key={it.title}>
                            <p className="text-lg font-semibold text-black">{it.title}</p>
                            <p className="mt-3 text-black/60 text-sm leading-relaxed">
                              {it.description}
                            </p>
                          </div>
                        ))}
                      </div>

                      <div className="mt-14 rounded-xl overflow-hidden border border-black/10">
                        <img
                          src={b.image}
                          alt={b.rightTitle}
                          className="w-full h-[320px] object-cover"
                        />
                      </div>

                      {/* slightly smaller end spacer */}
                      <div className="h-10" />
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
}