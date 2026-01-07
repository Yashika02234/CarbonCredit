import { useEffect, useState } from "react";
import landinghero from "../../assets/images/landinghero.mp4";

export default function StickyHome({
  onOpenAuth,
}: {
  onOpenAuth: (mode: "login" | "signup") => void;
}) {
  const [step, setStep] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Assuming your header is 80px high. Adjust this variable to match your actual header height.
  const headerHeight = "80px"; 
  

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const vh = window.innerHeight;
      
      const progress = Math.min(100, (scrollTop / (vh * 2)) * 100);
      setScrollProgress(progress);

      const s = Math.min(3, Math.floor(scrollTop / vh));
      setStep(s);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    /* 1. Ensure the parent section is full width to remove side gaps */
    <section className="relative w-full h-[370vh] bg-[#0a1210] m-0 p-0">
      
      {/* 2. Sticky Container: top-[80px] prevents overlap; h-[calc...] prevents overflow */}
      <div 
        className="sticky w-full overflow-hidden flex items-center justify-center"
        style={{ 
          top: headerHeight, 
          height: `calc(100vh - ${headerHeight} + 260px)` 
        }}
      >
        
        {/* BACKGROUND VIDEO LAYER */}
        <div className="absolute inset-0 z-0">
          <video
            src={landinghero}
            autoPlay muted loop playsInline
            className="w-full h-full object-cover opacity-50"
          />
          {/* 3. Gradient Overlay: Top black fade prevents visual clashing with header */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a1210] via-transparent to-[#0a1210]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a1210]/60 via-transparent to-transparent" />
        </div>

        {/* GUIDING LINE */}
        <div className="absolute left-8 lg:left-16 top-1/2 -translate-y-1/2 h-64 w-[2px] bg-white/10 hidden md:block">
          <div 
            className="w-full bg-emerald-400 transition-all duration-300"
            style={{ height: `${scrollProgress}%` }}
          />
          <span className="absolute -bottom-8 left-0 text-[10px] text-emerald-400 font-mono tracking-widest">
            {Math.round(scrollProgress)}%
          </span>
        </div>

        {/* CONTENT WRAPPER: Removed max-width restrictions for eye-catchy width */}
        <div className="relative z-10 w-full px-8 md:px-16 lg:px-24 ">
          <div className="flex flex-col items-start ">
            
            <h1 className=" text-5xl md:text-7xl lg:text-[6.5rem] font-serif text-white leading-[1.1] tracking-tighter">
              <span className={`transition-all duration-1000 block ${step >= 0 ? "opacity-100" : "opacity-0 translate-y-4"}`}>
                A Global Marketplace
              </span>
              <span className={`transition-all duration-1000 delay-150 block text-emerald-400 ${step >= 1 ? "opacity-100" : "opacity-20"}`}>
                for Data-Backed
              </span>
              <span className={`transition-all duration-1000 delay-300 block ${step >= 1 ? "opacity-100" : "opacity-0 translate-y-4"}`}>
                Carbon Credits
              </span>
            </h1>

            <div className={`mt-8 transition-all duration-1000 delay-300 ${
                step >= 2 ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
              }`}>
              <div className="backdrop-blur-md bg-white/5 border border-white/10 p-8 rounded-2xl max-w-xl">
                <p className="text-xl md:text-2xl text-white/80 font-light leading-relaxed">
                  Offset blends <span className="text-white font-medium">geospatial intelligence</span> with 
                  a live trading API to replace opaque offsets.
                </p>
              </div>
            </div>

            <div className={`mt-10 flex flex-wrap items-center gap-10 transition-all duration-1000 ${
                step >= 3 ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}>
              <button 
               onClick={() => onOpenAuth("login")}
                className="bg-emerald-500 hover:bg-emerald-400 text-[#0a1210] px-10 py-4 rounded-full text-lg font-bold transition-all shadow-lg shadow-emerald-500/20">
              
                Explore Marketplace
              </button>

              <div className="flex gap-8 text-white/40 font-mono text-xs uppercase tracking-widest">
                <div className="border-l border-white/20 pl-4">
                  <p className="text-emerald-400 text-lg">99.9%</p>
                  <p>Traceability</p>
                </div>
                <div className="border-l border-white/20 pl-4">
                  <p className="text-emerald-400 text-lg">Real-time</p>
                  <p>Audits</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}