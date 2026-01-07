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
        <StickyHome onOpenAuth={onOpenAuth} />
      </section>

      {/* ================= WHAT WE DO ================= */}
      <section id="what-we-do" className="relative bg-[#f3f4ff] px-6 lg:px-12 py-42">
        <div className="max-w-[1600px] mx-auto flex gap-20">
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

          <div className="w-full lg:w-[55%] py-30 space-y-62">
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
              <p className="text-sm md:text-base text-white/85 tracking-wide ">
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
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button>

            <div key={testimonialIndex} className="max-w-3xl px-6">
              <div className="flex justify-center mb-10">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-[#30574E] text-lg">★</span>
                ))}
              </div>
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
              <ChevronRight className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>
      </section>

      {/* ================= DISCOVER CARBON ================= */}
      <section className="relative w-full py-32 px-6 lg:px-12 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2000')" }} />
        <div className="relative z-10 max-w-[1100px] mx-auto flex justify-center">
          <div className="bg-[#f3f4ff] rounded-[24px] px-14 py-16 text-center max-w-[720px] shadow-[0_40px_120px_rgba(0,0,0,0.12)] transition-transform hover:-translate-y-1">
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-gray-900 mb-8">Discover Carbon</h2>
            <p className="text-gray-700 text-base leading-relaxed mb-10 max-w-xl mx-auto">
              Explore the world of carbon trading with Offset. Learn about carbon credits, CCUs, and the Paris Agreement.
            </p>
            <button
              onClick={() => onOpenAuth('signup')} // ✅ USE HERE
              className="bg-black text-white px-8 py-4 text-sm font-medium rounded-md hover:bg-gray-900 transition"
            >
              Get Started
            </button>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-[#3F5D50] text-white">
        <section className="relative px-6 lg:px-12 py-32">
          <div className="max-w-[1600px] mx-auto grid lg:grid-cols-2 gap-24 items-center">
            <div className="text-white grid grid-cols-2 gap-20">
              <div className="flex flex-col justify-between">
                <div>
                  <h2 className="text-4xl font-medium tracking-tight mb-6">Offset</h2>
                  <p className="text-sm text-white/85 leading-relaxed max-w-xs mb-14">
                    Building transparent, data-backed infrastructure for global carbon markets.
                  </p>
                  <div className="space-y-3 text-sm text-white/90">
                    <p>123-456-7890</p>
                    <p>info@offset.com</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-center">
                <div className="mb-12">
                  <p className="text-xs uppercase tracking-widest text-white/70 mb-6">Why contact us</p>
                  <ul className="space-y-5 text-sm text-white/90">
                    <li>• Institutional onboarding</li>
                    <li>• API & data integrations</li>
                  </ul>
                </div>
                {/* Social Login triggers */}
                <div className="flex items-center gap-6">
                  {['Login', 'Signup'].map((mode) => (
                    <button
                      key={mode}
                      onClick={() => onOpenAuth(mode.toLowerCase() as 'login' | 'signup')} // ✅ USE HERE
                      className="text-xs uppercase tracking-widest border border-white/40 px-4 py-2 rounded-full hover:bg-white hover:text-[#3F5D50] transition"
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-[#FFF1E6] rounded-[32px] p-14 shadow-[0_40px_120px_rgba(0,0,0,0.2)]">
              <h3 className="text-3xl font-serif text-[#3F5D50] mb-12">Ready to contribute?</h3>
              <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); onOpenAuth('signup'); }}>
                <div className="grid grid-cols-2 gap-6">
                  <input placeholder="First name" className="w-full h-12 rounded-md bg-[#E6DDD3] px-4 focus:outline-none placeholder:text-[#3F5D50]/60" />
                  <input placeholder="Last name" className="w-full h-12 rounded-md bg-[#E6DDD3] px-4 focus:outline-none placeholder:text-[#3F5D50]/60" />
                </div>
                <input placeholder="Email" className="w-full h-12 rounded-md bg-[#E6DDD3] px-4 focus:outline-none placeholder:text-[#3F5D50]/60" />
                <button
                  type="submit"
                  className="w-full h-14 rounded-md bg-[#3F5D50] text-white font-medium hover:bg-[#2F4A40] transition"
                >
                  Join Now
                </button>
              </form>
            </div>
          </div>
        </section>
      </footer>
    </div>
  );
}