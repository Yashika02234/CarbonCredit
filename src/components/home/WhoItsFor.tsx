import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { mockCredits } from '@/lib/mock-data';
import { ViewState } from '@/lib/types';

/* ================= CONSTANTS ================= */

const CARD_WIDTH = 320;
const CARD_GAP = 32;
const SLIDE_WIDTH = CARD_WIDTH + CARD_GAP;

/* ================= COMPONENT ================= */

export default function WhoItsFor({
  onNavigate,
}: {
  onNavigate?: (view: ViewState) => void;
}) {
  const [index, setIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(0);

  const viewportRef = useRef<HTMLDivElement>(null);

  const cards = mockCredits.slice(0, 6);

  /* ===== CALCULATE MAX INDEX BASED ON REAL WIDTH ===== */
  useEffect(() => {
    if (!viewportRef.current) return;

    const viewportWidth = viewportRef.current.offsetWidth;
    const totalSliderWidth =
      cards.length * SLIDE_WIDTH - CARD_GAP;

    const maxTranslate =
      totalSliderWidth - viewportWidth;

    const maxIdx = Math.max(
      Math.ceil(maxTranslate / SLIDE_WIDTH),
      0
    );

    setMaxIndex(maxIdx);
    setIndex(0); // reset safely on resize
  }, [cards.length]);

  const next = () =>
    setIndex((prev) => Math.min(prev + 1, maxIndex));

  const prev = () =>
    setIndex((prev) => Math.max(prev - 1, 0));

  const navigate = (view: ViewState) => {
    if (onNavigate) onNavigate(view);
  };

  return (
    <section className="relative bg-[#d6ccb8] py-32 overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 flex gap-24">

        {/* ================= LEFT CONTENT ================= */}
        <div className="w-[35%]">
          <h2 className="text-5xl font-medium leading-tight mb-8 text-[#2b2a25]">
            Who Offset <br /> is for
          </h2>

          <p className="text-[#2b2a25]/70 max-w-sm mb-16">
            Offset serves institutions and industries that demand transparency,
            traceability, and trust in climate markets.
          </p>

          <div className="flex items-center">
            {/* ARROWS */}
            <div className="flex gap-4 mr-16">
              <button
                onClick={prev}
                disabled={index === 0}
                className="
                  w-13 h-13
                  rounded-full
                  bg-[#b9b8a8]
                  text-white
                  flex items-center justify-center
                  hover:bg-[#a7a694]
                  disabled:opacity-40
                  transition
                "
              >
                <ChevronLeft size={55} />
              </button>

              <button
                onClick={next}
                disabled={index === maxIndex}
                className="
                  w-13 h-13
                  rounded-full
                  bg-[#6bc14a]
                  text-white
                  flex items-center justify-center
                  hover:bg-[#5aad3f]
                  disabled:opacity-40
                  transition
                "
              >
                <ChevronRight size={55} />
              </button>
            </div>

            {/* CTA */}
            <button
              onClick={() => navigate('marketplace')}
              className="
                px-10 py-4
                rounded-full
                border border-[#2b2a25]/40
                text-sm font-medium
                text-[#2b2a25]
                hover:bg-[#2b2a25]
                hover:text-white
                transition
              "
            >
              Explore Market
            </button>
          </div>
        </div>

        {/* ================= RIGHT SLIDER ================= */}
        <div ref={viewportRef} className="w-[65%] overflow-hidden">
          <div
            className="
              flex gap-8
              transition-transform
              duration-700
              ease-[cubic-bezier(0.32,0.72,0,1)]
            "
            style={{
              transform: `translateX(-${index * SLIDE_WIDTH}px)`,
            }}
          >
            {cards.map((item, idx) => (
              <div
                key={item.id}
                className="
                  relative
                  min-w-[320px] h-[420px]
                  rounded-[28px]
                  overflow-hidden
                  cursor-pointer
                  group
                "
              >
                <img
                  src={item.image}
                  alt={item.projectName}
                  className="
                    absolute inset-0
                    w-full h-full
                    object-cover
                    scale-105
                    transition-transform
                    duration-[1200ms]
                    group-hover:scale-110
                  "
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                <div className="relative z-10 h-full p-8 flex flex-col justify-between">
                  <span className="text-sm font-mono text-white/60">
                    {String(idx + 1).padStart(3, '0')}
                  </span>

                  <div>
                    <h3 className="text-2xl font-medium text-white mb-3">
                      {item.projectName}
                    </h3>

                    <p className="text-sm text-white/80 leading-relaxed">
                      {item.projectType} • {item.country}
                      <br />
                      {item.registry}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
