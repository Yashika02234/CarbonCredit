/* eslint-disable no-irregular-whitespace */
import {
  ChevronLeft, 
  ChevronRight,
} from 'lucide-react';
import StickyHome from "./StickyHome";


type Testimonial = {
  quote: string;
  author: string;
  role?: string;
  rating?: number;
};
const testimonials: Testimonial[] = [
  {
    quote:
      'Partnering with Offset has revolutionized our approach to carbon trading. Their innovative solutions have significantly enhanced our trading activities and contributed to our environmental goals.',
    author: 'John Doe',
    role: 'Sustainability Lead',
    rating: 5,
  },
  {
    quote:
      'Offset provides a level of transparency and trust that we have not seen before in carbon markets. Their platform has become a critical part of our ESG strategy.',
    author: 'Sarah Williams',
    role: 'Head of ESG, FinCorp',
    rating: 5,
  },
  {
    quote:
      'The geospatial verification and trust scoring mechanisms offered by Offset have given our institution confidence in every credit we retire.',
    author: 'Michael Chen',
    role: 'Director of Climate Finance',
    rating: 5,
  },
];

import landingheroimage from '../../assets/images/landingheroimage.jpg';
import landingv from '../../assets/images/landingv.mp4';
/* ================= SCROLL REVEAL ================= */

import { useScrollReveal } from '../../hooks/useScrollReveal';
import { useState } from 'react';

/* ================= STAT BUBBLE ================= */




/* ================= MAIN PAGE ================= */
export default function LandingPage() {
const [testimonialIndex, setTestimonialIndex] = useState(0);

useScrollReveal();
  return (
    <div className="bg-white text-gray-900 font-sans selection:bg-primary/20">

      {/* ================= HERO ================= */}
      {/* ================= HERO SECTION ================= */}
<section className="relative h-[380vh] w-full">
  <StickyHome />
</section>


      {/* ================= STATS ================= */}
     {/* ================= WHAT WE DO ================= */}
 <section
      id="what-we-do"
      className="relative bg-[#f3f4ff] px-6 lg:px-12 py-42"
    >
      <div className="max-w-[1600px] mx-auto flex gap-20">

        {/* ================= LEFT: STICKY IMAGE ================= */}
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

        {/* ================= RIGHT: SCROLL CONTENT ================= */}
        <div className="w-full lg:w-[55%] py-32 space-y-72">

  {/* BLOCK 1 */}
  <div
    data-reveal
    className="
      reveal max-w-xl
      p-8 rounded-2xl
      transition-all duration-300
      hover:bg-[#30574E]
      hover:-translate-y-1
      group
    "
  >
    <h2
      className="
        text-3xl md:text-4xl font-medium tracking-tight mb-6
        text-gray-900
        transition-colors duration-300
        group-hover:text-white
      "
    >
      What We Do
    </h2>

    <p
      className="
        text-gray-600 leading-relaxed
        transition-colors duration-300
        group-hover:text-white/90 text-lg 
      "
    >
      We bridge the gap between environmental impact and financial
      markets by providing a high-fidelity infrastructure for carbon
      credit trading. Our platform utilizes geospatial data and
      real-time tracking to ensure every credit traded is
      additionality-verified, transparently priced, and permanently
      retired.
    </p>
  </div>

  {/* BLOCK 2 */}
  <div
    data-reveal
    className="
      reveal max-w-xl
      p-8 rounded-2xl
      transition-all duration-300
      hover:bg-[#30574E]
      hover:-translate-y-1
      group
    "
  >
    <h3
      className="
        text-xl font-medium mb-4
        text-gray-900
        transition-colors duration-300
        group-hover:text-white 
      "
    >
      Geospatial Project Discovery
    </h3>

    <p
      className="
        text-gray-600 leading-relaxed
        transition-colors duration-300
        group-hover:text-white/90 text-lg
      "
    >
      Visualize the impact. We utilize satellite-integrated mapping to
      provide a digital twin of every carbon project. Users can explore
      global initiatives through an interactive interface that displays
      real-time site data, boundary polygons, and local environmental
      metrics.
    </p>
  </div>

  {/* BLOCK 3 */}
  <div
    data-reveal
    className="
      reveal max-w-xl
      p-8 rounded-2xl
      transition-all duration-300
      hover:bg-[#30574E]
      hover:-translate-y-1
      group
    "
  >
    <h3
      className="
        text-xl font-medium mb-4
        text-gray-900
        transition-colors duration-300
        group-hover:text-white
      "
    >
      Algorithmic Trust Scoring
    </h3>

    <p
      className="
        text-gray-600 leading-relaxed
        transition-colors duration-300
        group-hover:text-white/90 text-lg
      "
    >
      Quantify your integrity. Every credit is passed through our
      proprietary verification engine to generate a dynamic Trust
      Score. We analyze project vintage, methodology, and third-party
      registry data to provide a clear risk-assessment metric for
      institutional buyers.
    </p>
  </div>

  {/* BLOCK 4 */}
  <div
    data-reveal
    className="
      reveal max-w-xl
      p-8 rounded-2xl
      transition-all duration-300
      hover:bg-[#30574E]
      hover:-translate-y-1
      group
    "
  >
    <h3
      className="
        text-xl font-medium mb-4
        text-gray-900
        transition-colors duration-300
        group-hover:text-white 
      "
    >
      Immutable Lifecycle Tracking
    </h3>

    <p
      className="
        text-gray-600 leading-relaxed
        transition-colors duration-300
        group-hover:text-white/90 text-lg
      "
    >
      Ensure permanent retirement. From listing to final retirement,
      every transaction is recorded on a transparent events timeline.
      Our automated system generates verifiable retirement
      certificates, preventing double-counting and providing
      audit-ready documentation for ESG reporting.
    </p>
  </div>

  {/* BLOCK 5 */}
  <div
    data-reveal
    className="
      reveal max-w-xl
      p-8 rounded-2xl
      transition-all duration-300
      hover:bg-[#30574E]
      hover:-translate-y-1
      group
    "
  >
    <h3
      className="
        text-xl font-medium mb-4
        text-gray-900
        transition-colors duration-300
        group-hover:text-white
      "
    >
      Real-Time Market Liquidity
    </h3>

    <p
      className="
        text-gray-600 leading-relaxed
        transition-colors duration-300
        group-hover:text-white/90 text-lg
      "
    >
      Trade with Precision. Our live API-driven exchange provides
      up-to-the-minute pricing and market depth for global carbon assets.
      We eliminate the friction of OTC trading, allowing for instant
      execution and transparent price discovery across diverse credit
      categories.
    </p>
  </div>

</div>

      </div>
    </section>

    {/* ================= BRAND STATEMENT SECTION ================= */}
<section className="relative w-full px-6 lg:px-12 py-28">
  <div className="max-w-[1600px] mx-auto">

    <div className="relative rounded-[28px] overflow-hidden h-[580px]">

      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={landingv} />
      </video>

      {/* Soft Overlay (very important) */}
      <div className="absolute inset-0 bg-[#30574E]/60" />

      {/* Centered Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">

        {/* Logo */}
        <img
          src="logo"
          alt="Offset"
          className="h-14 mb-6 opacity-90"
        />

        {/* Caption */}
        <p className="text-sm md:text-base text-white/85 tracking-wide">
          A Global Leader in Carbon Trading
        </p>

      </div>
    </div>

  </div>
</section>
{/* ================= TESTIMONIALS ================= */}
<section className="relative bg-white py-40 px-6 lg:px-12 overflow-hidden">

  {/* ===== Ambient Background Accents ===== */}
  <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-[#30574E]/10 blur-[140px] rounded-full animate-[pulse_18s_ease-in-out_infinite]" />
  <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-[#30574E]/10 blur-[140px] rounded-full animate-[pulse_22s_ease-in-out_infinite]" />

  {/* Subtle orbital line */}
  <svg
    className="absolute inset-0 w-full h-full opacity-[0.06]"
    viewBox="0 0 1200 600"
    fill="none"
  >
    <path
      d="M100 300 C400 150 800 450 1100 300"
      stroke="#30574E"
      strokeWidth="1"
      strokeDasharray="6 10"
    />
  </svg>

  <div className="relative max-w-[1200px] mx-auto text-center">

    {/* Heading */}
    <p className="text-sm uppercase tracking-widest text-gray-500 mb-4">
      Client Testimonials
    </p>

    <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-[#30574E] mb-28">
      Success Stories
    </h2>

    {/* Slider */}
    <div className="relative flex items-center justify-center">

      {/* Left Arrow */}
      <button
        onClick={() =>
          setTestimonialIndex(
            testimonialIndex === 0
              ? testimonials.length - 1
              : testimonialIndex - 1
          )
        }
        className="absolute left-0 md:-left-20 p-4 rounded-full border border-gray-300 
                   hover:border-[#30574E] hover:scale-105 transition-all"
        aria-label="Previous testimonial"
      >
        <ChevronLeft className="w-6 h-6 text-gray-600" />
      </button>

      {/* Testimonial Card */}
      <div
        key={testimonialIndex}
        className="
          max-w-3xl px-6
          animate-[fadeUp_0.7s_ease-out]
        "
      >
        {/* Stars */}
        <div className="flex justify-center mb-10">
          {[...Array(testimonials[testimonialIndex].rating || 5)].map((_, i) => (
            <span key={i} className="text-[#30574E] text-lg">★</span>
          ))}
        </div>

        {/* Quote */}
        <p className="text-2xl md:text-3xl leading-relaxed text-[#30574E] mb-12 font-light">
          “{testimonials[testimonialIndex].quote}”
        </p>

        {/* Author */}
        <div className="text-sm text-gray-700">
          <p className="font-medium">
            {testimonials[testimonialIndex].author}
          </p>
          <p className="text-gray-500 mt-1">
            {testimonials[testimonialIndex].role}
          </p>
        </div>
      </div>

      {/* Right Arrow */}
      <button
        onClick={() =>
          setTestimonialIndex(
            testimonialIndex === testimonials.length - 1
              ? 0
              : testimonialIndex + 1
          )
        }
        className="absolute right-0 md:-right-20 p-4 rounded-full border border-gray-300 
                   hover:border-[#30574E] hover:scale-105 transition-all"
        aria-label="Next testimonial"
      >
        <ChevronRight className="w-6 h-6 text-gray-600" />
      </button>

    </div>
  </div>
</section>

{/* ================= DISCOVER CARBON ================= */}
<section className="relative w-full py-32 px-6 lg:px-12 overflow-hidden">

  {/* Background Image */}
  <div
    className="absolute inset-0 bg-cover bg-center"
    style={{
      backgroundImage:
        "url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2000')",
    }}
  />

  {/* Soft Overlay */}
  <div className="absolute inset-0  " />

  {/* Content */}
  <div className="relative z-10 max-w-[1100px] mx-auto flex justify-center">

    <div
      className="
        bg-[#f3f4ff]
        rounded-[24px]
        px-14 py-16
        text-center
        max-w-[720px]
        shadow-[0_40px_120px_rgba(0,0,0,0.12)]
        transition-transform
        hover:-translate-y-1
      "
    >
      <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-gray-900 mb-8">
        Discover Carbon
      </h2>

      <p className="text-gray-700 text-base leading-relaxed mb-10 max-w-xl mx-auto">
        Explore the world of carbon trading with Offset. Learn about carbon
        credits, CCUs, and the Paris Agreement. Stay informed with market
        updates and compliance links.
      </p>

      <button
        className="
          bg-black text-white
          px-8 py-4
          text-sm font-medium
          rounded-md
          hover:bg-gray-900
          transition
        "
      >
        Learn More
      </button>
    </div>

  </div>
</section>

      {/* ================= CONTACT / GET IN TOUCH ================= */}
<section className="relative bg-[#3F5D50] px-6 lg:px-12 py-32">
  <div className="max-w-[1600px] mx-auto grid lg:grid-cols-2 gap-24 items-center">


{/* ================= LEFT ================= */}
<div className="text-white grid grid-cols-2 gap-20">

  {/* ===== LEFT-LEFT: OFFSET INFO ===== */}
  <div className="flex flex-col justify-between">

    {/* Brand */}
    <div>
      <h2 className="text-4xl font-medium tracking-tight mb-6">
        Offset
      </h2>

      {/* Brand description */}
      <p className="text-sm text-white/85 leading-relaxed max-w-xs mb-14">
        Building transparent, data-backed infrastructure for global carbon
        markets — designed for institutions, regulators, and climate leaders.
      </p>

      {/* Contact Info */}
      <div className="space-y-3 text-sm text-white/90">
        <p>123-456-7890</p>
        <p>info@offset.com</p>
        <p>
          500 Terry Francine St.<br />
          San Francisco, CA 94158
        </p>
      </div>
    </div>

    {/* Subtle divider */}
    <div className="mt-16 w-16 h-px bg-white/30" />
  </div>

  {/* ===== LEFT-RIGHT: SOCIAL + VALUE POINTS ===== */}
  <div className="flex flex-col justify-center">

    {/* Why reach out */}
    <div className="mb-12">
      <p className="text-xs uppercase tracking-widest text-white/70 mb-6">
        Why contact us
      </p>

      <ul className="space-y-5 text-sm text-white/90">
        <li>• Institutional onboarding & partnerships</li>
        <li>• API & data integrations</li>
        <li>• Compliance & reporting support</li>
        <li>• Climate strategy advisory</li>
      </ul>
    </div>

    {/* Social Icons */}
    <div className="flex items-center gap-6 mb-10">
      {['f', 'in', 'ig', 'x'].map((icon, i) => (
        <div
          key={i}
          className="
            w-11 h-11 rounded-full
            border border-white/40
            flex items-center justify-center
            text-white/90
            hover:bg-white hover:text-[#3F5D50]
            transition
          "
        >
          {icon}
        </div>
      ))}
    </div>

    {/* Policies */}
    <div className="text-sm text-white/90 space-y-3">
      <p className="hover:underline cursor-pointer">
        Privacy Policy
      </p>
      <p className="hover:underline cursor-pointer">
        Accessibility Statement
      </p>
    </div>

  </div>
</div>


    {/* ================= RIGHT (FORM CARD) ================= */}
    <div className="bg-[#FFF1E6] rounded-[32px] p-14 shadow-[0_40px_120px_rgba(0,0,0,0.2)]">

      <h3 className="text-3xl font-serif text-[#3F5D50] mb-12">
        Get in touch
      </h3>

      <form className="space-y-8">

        {/* Name */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm text-[#3F5D50] mb-2">
              First name *
            </label>
            <input
              className="w-full h-12 rounded-md bg-[#E6DDD3] px-4 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm text-[#3F5D50] mb-2">
              Last name
            </label>
            <input
              className="w-full h-12 rounded-md bg-[#E6DDD3] px-4 focus:outline-none"
            />
          </div>
        </div>

        {/* Email + Phone */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm text-[#3F5D50] mb-2">
              Email *
            </label>
            <input
              type="email"
              className="w-full h-12 rounded-md bg-[#E6DDD3] px-4 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm text-[#3F5D50] mb-2">
              Phone
            </label>
            <input
              className="w-full h-12 rounded-md bg-[#E6DDD3] px-4 focus:outline-none"
            />
          </div>
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm text-[#3F5D50] mb-2">
            Write a message
          </label>
          <textarea
            rows={4}
            className="w-full rounded-md bg-[#E6DDD3] px-4 py-3 focus:outline-none"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="
            w-full h-14 rounded-md
            bg-[#3F5D50] text-white
            font-medium
            hover:bg-[#2F4A40]
            transition
          "
        >
          Submit
        </button>
      </form>
    </div>
  </div>
</section>


      

    </div>
  );
}
