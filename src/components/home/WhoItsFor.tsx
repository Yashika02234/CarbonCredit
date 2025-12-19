import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { mockCredits } from '@/lib/mock-data';

const VISIBLE_CARDS = 3;

export default function WhoItsFor() {
  const [index, setIndex] = useState(0);

  const cards = mockCredits.slice(0, 6); // add more if needed
  const maxIndex = cards.length - VISIBLE_CARDS;

  const next = () => {
    setIndex(prev => Math.min(prev + 1, maxIndex));
  };

  const prev = () => {
    setIndex(prev => Math.max(prev - 1, 0));
  };

    function onNavigate(arg0: string): void {
        throw new Error('Function not implemented.');
    }

  return (
    <section className="relative bg-[#d6ccb8] py-32 overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 flex gap-24">

        {/* LEFT CONTENT */}
        <div className="w-[35%]">
          <h2 className="text-5xl font-medium leading-tight mb-8 text-[#2b2a25]">
            Who Offset <br /> is for
          </h2>

          <p className="text-[#2b2a25]/70 max-w-sm mb-16">
            Offset serves institutions and industries that demand transparency,
            traceability, and trust in climate markets.
          </p>

          {/* CONTROLS */}
         <div className="flex items-center">

  {/* ARROWS */}
  <div className="flex gap-4 mr-16">
    <button
      onClick={prev}
      className="w-11 h-11 rounded-full bg-[#b9b8a8] text-white flex items-center justify-center hover:bg-[#a7a694] transition"
    >
      <ChevronLeft />
    </button>

    <button
      onClick={next}
      className="w-14 h-14 rounded-full bg-[#6bc14a] text-white flex items-center justify-center hover:bg-[#5aad3f] transition"
    >
      <ChevronRight />
    </button>
  </div>

  {/* EXPLORE MARKET */}
  <button
    onClick={() => onNavigate('marketplace')}
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

        {/* RIGHT SLIDER */}
        <div className="w-[65%] overflow-hidden">
          <div
            className="flex gap-8 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]"
            style={{
              transform: `translateX(-${index * 360}px)`,
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
  {/* IMAGE */}
  <img
    src={item.image}
    alt={item.projectName}
    className="
      absolute inset-0
      w-full h-full
      object-cover
      scale-105
      transition-transform duration-[1200ms]
      group-hover:scale-110
    "
  />

  {/* DARK GRADIENT */}
  <div
    className="
      absolute inset-0
      bg-gradient-to-t
      from-black/80
      via-black/30
      to-transparent
    "
  />

  {/* CONTENT */}
  <div
    className="
      relative z-10
      h-full
      p-8
      flex flex-col justify-between
      transition
    "
  >
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
