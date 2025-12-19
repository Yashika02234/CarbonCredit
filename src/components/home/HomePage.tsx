import { useEffect } from 'react';
import {
  Leaf,
  Mail,
  Linkedin,
  Twitter,
} from 'lucide-react';

import WhoItsFor from '@/components/home/WhoItsFor';

import homeVideo from '../../assets/images/homeVideo.mp4';


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

interface HomePageProps {
  onNavigate: (view: 'marketplace' | 'portfolio' | 'home' | 'about') => void;
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

  return (
    <div className="min-h-screen bg-[#0F3D36] text-foreground overflow-x-hidden">
      <main>

        {/* ================= HERO ================= */}
        <section className="relative h-[520px] md:h-[600px] overflow-hidden rounded-none">
  {/* Background Video */}
  <video
    className="absolute inset-0 w-full h-full object-cover"
    src={homeVideo}
    autoPlay
    loop
    muted
    playsInline
  />

  {/* Overlay */}
  <div className="absolute inset-0 bg-[#0f2f2a]/55" />

  {/* Content */}
  <div className="relative z-10 h-full flex items-center">
    <div className="max-w-[1100px] mx-auto px-6 text-center">

      <h1 className="text-4xl md:text-6xl font-medium text-white tracking-tight mb-6">
        Carbon Intelligence
      </h1>

      <p className="text-base md:text-lg text-white/85 max-w-2xl mx-auto leading-relaxed mb-10">
        Explore real-world climate projects with institutional-grade clarity,
        live verification, and trusted market data.
      </p>

      <button className="inline-flex items-center justify-center px-8 py-3 text-sm font-medium rounded-md bg-black text-white hover:bg-black/90 transition">
        View Portfolio
      </button>

    </div>
  </div>
</section>


        {/* ================= MARKETPLACE PREVIEW ================= */}
        
<WhoItsFor />
      </main>

      <Footer />
    </div>
  );
}
