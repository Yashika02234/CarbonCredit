/* ================= WHAT WE DO ================= */

import React from "react";
import landingheroimage from "../../assets/images/landingheroimage.jpg"; // adjust path if needed

type ContentBlock = {
  title: string;
  text: string;
};

const contentBlocks: ContentBlock[] = [
  {
    title: "What We Do",
    text:
      "We’re building a platform to make carbon markets more transparent, approachable, and trustworthy. OffSet simplifies how climate projects are explored, evaluated, and understood — helping teams make more informed and responsible climate decisions.",
  },
  {
    title: "Geospatial Project Discovery",
    text:
      "OffSet makes climate projects easier to explore through clear visual context and structured project data. Users can navigate global initiatives and better interpret environmental impact.",
  },
  {
    title: "Algorithmic Trust Scoring",
    text:
      "Each credit is evaluated through our verification engine to produce a dynamic Trust Score — analyzing methodology, vintage, and registry data to support institutional decision-making.",
  },
];

const WhatWeDoSection: React.FC = () => {
  return (
    <section
      id="what-we-do"
      className="
        relative
        bg-[#f3f4ff]
        px-6 lg:px-12
        py-44
        z-20
      "
    >
      {/* Top fade */}
      <div className="absolute top-0 left-0 w-full h-28 bg-gradient-to-b from-white/90 to-transparent pointer-events-none" />

      <div className="max-w-[1500px] mx-auto grid lg:grid-cols-2 gap-28">

        {/* ================= LEFT — STICKY IMAGE ================= */}
        <div className="hidden lg:block">
          <div className="sticky top-40">
            <div className="rounded-[32px] overflow-hidden h-[720px] bg-gray-200 shadow-lg">
              <img
                src={landingheroimage}
                alt="What we do"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* ================= RIGHT — SCROLL STORY ================= */}
        <div className="space-y-40">
          {contentBlocks.map((block, i) => (
            <div
              key={i}
              data-reveal
              className="
                group
                max-w-2xl
                p-12
                rounded-[28px]
                bg-white/70
                backdrop-blur-sm
                border border-black/5
                transition-all duration-500
                hover:bg-[#30574E]
                hover:-translate-y-2
              "
            >
              <h2
                className="
                  text-3xl md:text-4xl font-medium
                  mb-8
                  text-gray-900
                  transition-colors duration-300
                  group-hover:text-white
                "
              >
                {block.title}
              </h2>

              <p
                className="
                  text-gray-600
                  leading-relaxed
                  text-lg
                  transition-colors duration-300
                  group-hover:text-white/90
                "
              >
                {block.text}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhatWeDoSection;
