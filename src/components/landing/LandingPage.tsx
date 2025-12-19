/* eslint-disable no-irregular-whitespace */
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import StickyHome from "./StickyHome";

// Assets
import landingheroimage from '../../assets/images/landingheroimage.jpg';
import landingv from '../../assets/images/landingv.mp4';

// Hooks
import { useScrollReveal } from '../../hooks/useScrollReveal';

type Testimonial = {
  quote: string;
  author: string;
  role?: string;
  rating?: number;
};

const testimonials: Testimonial[] = [
  {
    quote: 'Partnering with Offset has revolutionized our approach to carbon trading. Their innovative solutions have significantly enhanced our trading activities and contributed to our environmental goals.',
    author: 'John Doe',
    role: 'Sustainability Lead',
    rating: 5,
  },
  {
    quote: 'Offset provides a level of transparency and trust that we have not seen before in carbon markets. Their platform has become a critical part of our ESG strategy.',
    author: 'Sarah Williams',
    role: 'Head of ESG, FinCorp',
    rating: 5,
  },
  {
    quote: 'The geospatial verification and trust scoring mechanisms offered by Offset have given our institution confidence in every credit we retire.',
    author: 'Michael Chen',
    role: 'Director of Climate Finance',
    rating: 5,
  },
];

// ✅ DEFINE THE PROPS INTERFACE
interface LandingPageProps {
  onOpenAuth: (mode: 'login' | 'signup') => void;
}

export default function LandingPage({ onOpenAuth }: LandingPageProps) {
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  useScrollReveal();

  return (
    <div className="bg-white text-gray-900 font-sans selection:bg-[#30574E]/20">

      {/* ================= HERO ================= */}
      <section className="relative h-[380vh] w-full">
        <StickyHome />
      </section>

      {/* ================= WHAT WE DO ================= */}
      <section id="what-we-do" className="relative bg-[#f3f4ff] px-6 lg:px-12 py-42">
        <div className="max-w-[1600px] mx-auto flex gap-20">
          {/* LEFT: STICKY IMAGE */}
          <div className="w-[45%] hidden lg:block">
            <div className="relative h-full">
              <div className="sticky top-32">
                <div className="rounded-[28px] overflow-hidden h-[860px] bg-gray-200">
                  <img
                    src={landingheroimage}
                    alt="What we do"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: SCROLL CONTENT */}
          <div className="w-full lg:w-[55%] py-32 space-y-72">
            {[
              {
                title: "What We Do",
                text: "We bridge the gap between environmental impact and financial markets by providing a high-fidelity infrastructure for carbon credit trading. Our platform utilizes geospatial data and real-time tracking to ensure every credit traded is additionality-verified, transparently priced, and permanently retired."
              },
              {
                title: "Geospatial Project Discovery",
                text: "Visualize the impact. We utilize satellite-integrated mapping to provide a digital twin of every carbon project. Users can explore global initiatives through an interactive interface that displays real-time site data, boundary polygons, and local environmental metrics."
              },
              {
                title: "Algorithmic Trust Scoring",
                text: "Quantify your integrity. Every credit is passed through our proprietary verification engine to generate a dynamic Trust Score. We analyze project vintage, methodology, and third-party registry data to provide a clear risk-assessment metric for institutional buyers."
              }
            ].map((block, i) => (
              <div
                key={i}
                data-reveal
                className="reveal max-w-xl p-8 rounded-2xl transition-all duration-300 hover:bg-[#30574E] hover:-translate-y-1 group"
              >
                <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-6 text-gray-900 transition-colors duration-300 group-hover:text-white">
                  {block.title}
                </h2>
                <p className="text-gray-600 leading-relaxed transition-colors duration-300 group-hover:text-white/90 text-lg">
                  {block.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= BRAND STATEMENT SECTION ================= */}
      <section className="relative w-full px-6 lg:px-12 py-28">
        <div className="max-w-[1600px] mx-auto">
          <div className="relative rounded-[28px] overflow-hidden h-[580px]">
            <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
              <source src={landingv} />
            </video>
            <div className="absolute inset-0 bg-[#30574E]/60" />
            <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
              <h2 className="text-white text-3xl font-bold mb-4">Offset</h2>
              <p className="text-sm md:text-base text-white/85 tracking-wide">
                A Global Leader in Carbon Trading
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="relative bg-white py-40 px-6 lg:px-12 overflow-hidden">
        <div className="relative max-w-[1200px] mx-auto text-center">
          <p className="text-sm uppercase tracking-widest text-gray-500 mb-4">Client Testimonials</p>
          <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-[#30574E] mb-28">Success Stories</h2>
          
          <div className="relative flex items-center justify-center">
            <button
              onClick={() => setTestimonialIndex(prev => (prev === 0 ? testimonials.length - 1 : prev - 1))}
              className="absolute left-0 md:-left-20 p-4 rounded-full border border-gray-300 hover:border-[#30574E] transition-all"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div key={testimonialIndex} className="max-w-3xl px-6">
              <p className="text-2xl md:text-3xl leading-relaxed text-[#30574E] mb-12 font-light italic">
                “{testimonials[testimonialIndex].quote}”
              </p>
              <p className="font-medium">{testimonials[testimonialIndex].author}</p>
              <p className="text-gray-500">{testimonials[testimonialIndex].role}</p>
            </div>

            <button
              onClick={() => setTestimonialIndex(prev => (prev === testimonials.length - 1 ? 0 : prev + 1))}
              className="absolute right-0 md:-right-20 p-4 rounded-full border border-gray-300 hover:border-[#30574E] transition-all"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </section>

      {/* ================= CALL TO ACTION ================= */}
      <section className="relative w-full py-32 px-6 lg:px-12 bg-[#30574E]">
        <div className="max-w-[1100px] mx-auto text-center">
          <div className="bg-[#f3f4ff] rounded-[24px] px-14 py-16 shadow-xl">
            <h2 className="text-4xl md:text-5xl font-medium text-gray-900 mb-8">Ready to start?</h2>
            <p className="text-gray-700 mb-10 max-w-xl mx-auto">
              Join hundreds of institutions using Offset to manage their carbon portfolio.
            </p>
            <button
              onClick={() => onOpenAuth('signup')}
              className="bg-black text-white px-10 py-4 rounded-md font-medium hover:bg-gray-800 transition"
            >
              Get Started Now
            </button>
          </div>
        </div>
      </section>

      {/* ================= FOOTER / CONTACT ================= */}
      <footer className="bg-[#3F5D50] text-white py-20 px-6 lg:px-12">
        <div className="max-w-[1600px] mx-auto grid md:grid-cols-2 gap-20">
          <div>
            <h2 className="text-4xl font-medium mb-6">Offset</h2>
            <p className="text-white/80 max-w-sm mb-10">Building transparent, data-backed infrastructure for global carbon markets.</p>
            <button 
              onClick={() => onOpenAuth('login')}
              className="border border-white/40 px-6 py-2 rounded-full hover:bg-white hover:text-[#3F5D50] transition"
            >
              Partner Login
            </button>
          </div>
          <div className="bg-[#FFF1E6] text-[#3F5D50] p-10 rounded-[32px]">
             <h3 className="text-2xl mb-6">Stay Updated</h3>
             <p className="mb-6">Join our newsletter for the latest in carbon market insights.</p>
             <button onClick={() => onOpenAuth('signup')} className="w-full bg-[#3F5D50] text-white py-4 rounded-xl">Join the Platform</button>
          </div>
        </div>
      </footer>
    </div>
  );
}