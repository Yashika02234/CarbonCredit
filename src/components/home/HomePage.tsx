import { useEffect } from 'react';
import {
  Leaf,
  Mail,
  Linkedin,
  Twitter,
} from 'lucide-react';

import WhoItsFor from '@/components/home/WhoItsFor';


import placeholder from '../../assets/images/placeholder-2.jpg';
import place from '../../assets/images/placeholder-1.jpg';

/* ======================================================
   SCROLL REVEAL
====================================================== */
function useScrollReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll('[data-reveal]');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-active');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}
function useScrollZoom() {
  useEffect(() => {
    const elements = document.querySelectorAll('[data-zoom]');

    const onScroll = () => {
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (rect.top < windowHeight && rect.bottom > 0) {
          const progress =
            1 - Math.min(Math.max(rect.top / windowHeight, 0), 1);

          const scale = 1.08 - progress * 0.08;
          (el as HTMLElement).style.transform = `scale(${scale})`;
        }
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);
}
function useTitleZoomOnLoad() {
  useEffect(() => {
    const el = document.querySelector('[data-zoom-title]');
    if (!el) return;

    setTimeout(() => {
      el.classList.add('zoom-active');
    }, 100); // small delay so initial scale renders
  }, []);
}



import { ViewState } from '@/lib/types';

interface HomePageProps {
  onNavigate: (view: ViewState) => void;
}

/* ======================================================
   SMALL COMPONENTS
====================================================== */



/* ======================================================
   FOOTER
====================================================== */

const Footer = () => (
  <footer className="bg-[#0F3D36] text-white">
    <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-2 gap-10">
      <div className="md:col-span-3 space-y-7">
        <div className="flex items-center gap-2 text-lg font-semibold">
          <Leaf className="w-5 h-5" />
          OffSet
        </div>

        <p className="text-sm text-white/75 max-w-sm">
          We’re building simple tools to explore and understand
          climate projects — starting with carbon credits.
        </p>

        <div className="flex gap-4 pt-2">
          <Twitter className="w-4 h-4 opacity-70 hover:opacity-100 cursor-pointer" />
          <Linkedin className="w-4 h-4 opacity-70 hover:opacity-100 cursor-pointer" />
          <Mail className="w-4 h-4 opacity-70 hover:opacity-100 cursor-pointer" />
        </div>
      </div>

      {[
        { title: 'Product', links: ['Marketplace', 'Portfolio', 'Analytics'] },
        { title: 'Company', links: ['About', 'Careers', 'Contact'] },
        { title: 'Resources', links: ['Docs', 'API', 'Insights'] },
      ].map((section) => (
        <div key={section.title}>
          <h4 className="text-xs font-semibold uppercase tracking-widest mb-4">
            {section.title}
          </h4>
          <ul className="space-y-2 text-sm text-white/70">
            {section.links.map((item) => (
              <li key={item} className="hover:text-white cursor-pointer">
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    <div className="border-t border-white/15 py-4 text-xs text-white/60 text-center">
      © {new Date().getFullYear()} OffSet. All rights reserved.
    </div>
  </footer>
);

/* ======================================================
   MAIN HOMEPAGE
====================================================== */

export default function HomePage({ onNavigate }: HomePageProps) {
  useScrollReveal();
useScrollZoom();
useTitleZoomOnLoad();
  return (
    <div className="min-h-screen bg-[#0F3D36] text-foreground overflow-x-hidden">
      <main>

        {/* ================= HERO ================= */}
       {/* ================= INTRO / TEXT HERO ================= */}
<section className="relative bg-[#0F3D36] text-white overflow-hidden">
  <div className="max-w-[1300px] mx-auto px-6 pt-28 pb-24">

    {/* FLOATING HEADING */}
<h1
  data-zoom-title
  className="
    font-serif
    text-[clamp(3rem,8vw,7rem)]
    leading-[0.95]
    tracking-tight
    mb-20
    text-white
    will-change-transform
  "
>
  Carbon Intelligence
</h1>


    <div className="flex flex-col md:flex-row items-start justify-between gap-10">
      <p
        data-reveal
        data-float
        className="  max-w-xl
    text-lg
    md:text-xl
    text-white/80
    leading-relaxed"
        style={{ transitionDelay: '120ms' }}
      >
       Explore real-world climate projects with institutional-grade clarity,live verification, and trusted market data.OffSet helps investors, teams, and institutionsnavigate climate impact with confidence — combiningtransparent insights, verified methodologies, anddecision-ready intelligence in one unified platform.
      </p>

      <button className="inline-flex items-center justify-center px-8 py-3 text-sm font-medium rounded-md bg-black text-white hover:bg-black/90 transition">
        View Portfolio
      </button>
    </div>

  </div>
</section>


{/* ================= VISUAL BLOCKS ================= */}
{/* ================= VISUAL BLOCKS ================= */}
<section className="bg-[#0F3D36] py-20">
  <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10">

    <div
      data-reveal
      className="h-[320px] rounded-xl overflow-hidden bg-neutral-200"
    >
      <img
        data-zoom
        src={place}
        alt="Climate project"
        className="w-full h-full object-cover transition-transform duration-300 will-change-transform"
      />
    </div>

    <div
      data-reveal
      className="h-[320px] rounded-xl overflow-hidden bg-neutral-200"
    >
      <img
        data-zoom
        src={placeholder}
        alt="Carbon analytics"
        className="w-full h-full object-cover transition-transform duration-300 will-change-transform"
      />
    </div>

  </div>
</section>



        {/* ================= MARKETPLACE PREVIEW ================= */}
        
      <WhoItsFor onNavigate={onNavigate} />
      </main>

      <Footer />
    </div>
  );
}
