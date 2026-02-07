/* eslint-disable no-irregular-whitespace */
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import StickyHome from "./StickyHome";

// Assets
import landingheroimage from '../../assets/images/landingheroimage.jpg';
import landingv from '../../assets/images/landingv.mp4';

// Hooks
import { useScrollReveal } from '../../hooks/useScrollReveal';
import VerifiedProjectsShowcase from './VerifiedProjectsShowcase';
import education  from "../../assets/images/education.mp4"
import VerificationFlow from './VerificationFlow';

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
    <section className="relative h-[380vh] w-full z-0">

        <StickyHome onOpenAuth={onOpenAuth} />
      </section>

      {/* ================= IMPACT METRICS STRIP ================= */}
{/* ================= IMPACT METRICS STRIP ================= */}
<section className="relative z-20 -mt-28 px-6 lg:px-0">
  <div className="max-w-[2400px] mx-auto">

    <div
      data-reveal="up"
      className="
        grid grid-cols-2 md:grid-cols-4
        gap-6
        bg-white/95 backdrop-blur-md
        border border-black/5
        rounded-[28px]
        shadow-[0_30px_80px_rgba(0,0,0,0.12)]
        p-10 md:p-14
      "
    >
    


      {[
        {
          value: "2.4M+",
          label: "Credits Evaluated",
          sub: "Across verified registries",
        },
        {
          value: "38",
          label: "Active Projects",
          sub: "Multi-region coverage",
        },
        {
          value: "12",
          label: "Standards Supported",
          sub: "Global methodologies",
        },
        {
          value: "99.2%",
          label: "Data Traceability",
          sub: "Audit-ready records",
        },
      ].map((item) => (
        <div
          key={item.label}
          className="
            group
            text-center
            md:text-left
            px-4
          "
        >
          <p className="
            text-3xl md:text-4xl font-semibold
            text-[#30574E]
            mb-2
            tracking-tight
          ">
            {item.value}
          </p>

          <p className="
            text-sm font-medium
            text-gray-900
            mb-1
          ">
            {item.label}
          </p>

          <p className="
            text-xs text-gray-500
            group-hover:text-gray-700
            transition-colors
          ">
            {item.sub}
          </p>
        </div>
      ))}

    </div>

  </div>
</section>


      {/* ================= WHAT WE DO ================= */}
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

      {[
        {
          title: "What We Do",
          text: "We’re building a platform to make carbon markets more transparent, approachable, and trustworthy. OffSet simplifies how climate projects are explored, evaluated, and understood — helping teams make more informed and responsible climate decisions."
        },
        {
          title: "Geospatial Project Discovery",
          text: "OffSet makes climate projects easier to explore through clear visual context and structured project data. Users can navigate global initiatives and better interpret environmental impact."
        },
        {
          title: "Algorithmic Trust Scoring",
          text: "Each credit is evaluated through our verification engine to produce a dynamic Trust Score — analyzing methodology, vintage, and registry data to support institutional decision-making."
        }
      ].map((block, i) => (
        <div
          key={i}
          data-reveal
          className="
            max-w-2xl
            p-12
            rounded-[28px]
            bg-white/70
            backdrop-blur-sm
            border border-black/5
            transition-all duration-500
            hover:bg-[#30574E]
            hover:-translate-y-2
            group
          "
        >
          <h2 className="
            text-3xl md:text-4xl font-medium
            mb-8
            text-gray-900
            transition-colors duration-300
            group-hover:text-white
          ">
            {block.title}
          </h2>

          <p className="
            text-gray-600
            leading-relaxed
            text-lg
            transition-colors duration-300
            group-hover:text-white/90
          ">
            {block.text}
          </p>
        </div>
      ))}

    </div>
  </div>
</section>

      {/* ================= TRUST & VERIFICATION ================= */}
<VerificationFlow/>


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
     
      {/* ================= BRAND STATEMENT SECTION ================= */}
      <section className="relative w-full px-6 lg:px-12 py-28">
        <div className="max-w-[1600px] mx-auto">
          <div className="relative rounded-[28px] overflow-hidden h-[580px]">
            <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
              <source src={landingv} />
            </video>
            <div className="absolute inset-0 bg-[#30574E]/60" />
            <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
              <h2 className="text-white text-4xl md:text-5xl font-medium mb-6">
  Building Transparent Infrastructure for Carbon Markets
</h2>
<p className="text-white/85 max-w-2xl mx-auto">
  Offset focuses on traceability, verification, and data-backed decision-making for responsible climate action.
</p>

            </div>
          </div>
        </div>
      </section>

      
      {/* ================= VERIFIED PROJECTS ================= */}
<VerifiedProjectsShowcase />


      {/* ================= EDUCATION ================= */}
{/* ================= EDUCATION CENTER ================= */}
<section className="relative bg-[#f6f7f9] py-36 px-6 lg:px-12 overflow-hidden">

  {/* soft top divider fade */}
  <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-white to-transparent pointer-events-none" />

  <div className="max-w-[1300px] mx-auto">

    {/* ===== HEADER ===== */}
    <div className="mb-20 text-center" data-reveal="up">
      <p className="text-xs uppercase tracking-widest text-gray-500 mb-4">
        Knowledge Center
      </p>

      <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-gray-900 mb-6">
        Learn Carbon Markets with Clarity
      </h2>

      <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
        Understand carbon credits, verification standards, and risk signals
        through structured, easy-to-digest learning modules.
      </p>
    </div>

    {/* ===== FEATURED GUIDE (BIG CARD) ===== */}
    <div
      data-reveal="up"
      className="
        mb-20
        rounded-[28px]
        bg-white
        border border-gray-200
        shadow-[0_30px_80px_rgba(0,0,0,0.08)]
        p-12 md:p-16
        grid md:grid-cols-2 gap-14
        items-center
      "
    >
      <div>
        <p className="text-sm text-[#30574E] font-medium mb-4">
          Featured Guide
        </p>

        <h3 className="text-3xl font-medium mb-6">
          Carbon Credits — End-to-End Explained
        </h3>

        <p className="text-gray-600 leading-relaxed mb-8">
          From project creation to credit issuance and retirement —
          understand the full lifecycle with diagrams and real registry data
          examples.
        </p>

        <button className="
          px-8 py-4
          rounded-full
          bg-[#30574E]
          text-white
          font-medium
          hover:bg-[#24463d]
          transition
        ">
          Read Full Guide
        </button>
      </div>

     <div className="
  relative
  rounded-2xl
  overflow-hidden
  h-[220px] md:h-[260px]
  group
  shadow-[0_20px_60px_rgba(0,0,0,0.25)]
">

  {/* VIDEO */}
  <video
    src={education}   // ← change path
    autoPlay
    muted
    loop
    playsInline
    preload="metadata"
    className="
      absolute inset-0
      w-full h-full
      object-cover
      transition-transform duration-700
      group-hover:scale-105
    "
  />

  {/* DARK OVERLAY FOR TEXT READABILITY */}
  <div className="
    absolute inset-0
    bg-gradient-to-br
    from-black/50 via-black/30 to-black/40
  " />

  {/* LABEL */}
  <div className="
    relative z-10
    h-full
    flex flex-col
    items-center justify-center
    text-white
  ">
    
  </div>

</div>

    </div>

    {/* ===== LEARNING MODULE GRID ===== */}
    <div
      className="grid md:grid-cols-3 gap-10"
      data-reveal="up"
    >

      {[
        {
          title: "What Are Carbon Credits?",
          desc: "Definition, types, compliance vs voluntary markets, and how credits are generated.",
          tag: "Foundations",
          time: "5 min read"
        },
        {
          title: "Verification & Registries",
          desc: "How Verra, Gold Standard, ACR and other registries validate climate projects.",
          tag: "Verification",
          time: "7 min read"
        },
        {
          title: "Risk & Trust Scores",
          desc: "How project risk is evaluated using methodology, vintage, and monitoring signals.",
          tag: "Risk Models",
          time: "6 min read"
        },
        {
          title: "Project Methodologies",
          desc: "ARR, REDD+, methane capture, blue carbon — methodology differences explained.",
          tag: "Methods",
          time: "8 min read"
        },
        {
          title: "Offsets vs Reductions",
          desc: "When to offset vs when to directly reduce emissions — decision framework.",
          tag: "Strategy",
          time: "4 min read"
        },
        {
          title: "Retirement & Audits",
          desc: "Credit retirement flow, audit trails, and reporting best practices.",
          tag: "Compliance",
          time: "5 min read"
        },
      ].map((item) => (
        <div
          key={item.title}
          className="
            group
            bg-white
            border border-gray-200
            rounded-2xl
            p-10
            transition-all duration-500
            hover:-translate-y-2
            hover:shadow-[0_30px_80px_rgba(0,0,0,0.12)]
          "
        >

          {/* tag */}
          <div className="flex items-center justify-between mb-6">
            <span className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-600">
              {item.tag}
            </span>

            <span className="text-xs text-gray-500">
              {item.time}
            </span>
          </div>

          <h4 className="
            text-xl font-medium mb-4
            text-gray-900
            group-hover:text-[#30574E]
            transition-colors
          ">
            {item.title}
          </h4>

          <p className="text-gray-600 leading-relaxed mb-6">
            {item.desc}
          </p>

          <button className="
            text-sm font-medium
            text-[#30574E]
            hover:underline
          ">
            Open Module →
          </button>

        </div>
      ))}

    </div>

  </div>
</section>



      {/* ================= FOOTER ================= */}
      <footer className="bg-[#3F5D50] text-white">
        <section className="relative px-6 lg:px-12 py-32">
           <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
    <svg
      className="relative block w-[130%] h-[160px] -translate-x-[5%]"
      viewBox="0 0 1200 160"
      preserveAspectRatio="none"
    >
      <path
        d="M0,80 C300,180 900,-20 1200,100 L1200,0 L0,0 Z"
        fill="#f3f4ff"
      />
    </svg>
  </div>
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