/* eslint-disable no-irregular-whitespace */


import StickyHome from "./StickyHome";

// Assets

import landingv from '../../assets/images/landingv.mp4';

// Hooks
import { useScrollReveal } from '../../hooks/useScrollReveal';
import VerifiedProjectsShowcase from './VerifiedProjectsShowcase';

import VerificationFlow from './VerificationFlow';
import ImpactMetricsStip from './ImpactMetricsStrip';
import WhatWeDoSection from './WhatWeDoSection';
import EducationCenter from '../landing/EducationCenter';
import TestimonialsStackScroll from './TestimonialsScroll';


interface LandingPageProps {
  onOpenAuth: (mode: 'login' | 'signup') => void;
}

export default function LandingPage({ onOpenAuth }: LandingPageProps) {


  useScrollReveal();

  return (
    <div className="bg-white text-gray-900 font-sans selection:bg-[#30574E]/20">

      {/* ================= HERO ================= */}
    <section className="relative h-[380vh] w-full z-0">

        <StickyHome onOpenAuth={onOpenAuth} />
      </section>
      <ImpactMetricsStip />
      <WhatWeDoSection />
{/* ================= VERIFICATION PROCESS FLOW ================= */}
<VerificationFlow />


<TestimonialsStackScroll  />

     
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

<EducationCenter />
      {/* ================= FOOTER ================= */}
<footer className="bg-emerald-950  pb-20">
  <div className="
    max-w-[2400px] mx-auto
    bg-emerald-950
   
    shadow-[0_40px_120px_rgba(0,0,0,0.08)]
    px-16 py-20
  ">

    {/* ================= TOP LINKS ================= */}
    <div className="grid grid-cols-2 md:grid-cols-5 gap-16 text-sm">

      <div>
        <p className="font-medium text-white mb-6">Platform</p>
        <ul className="space-y-3 text-white">
          <li>Overview</li>
          <li>Playbooks</li>
          <li>Integrations</li>
        </ul>
      </div>

      <div>
        <p className="font-medium text-white mb-6">Channels</p>
        <ul className="space-y-3 text-white">
          <li>Messaging</li>
          <li>Voice</li>
          <li>Email</li>
        </ul>
      </div>

      <div>
        <p className="font-medium text-white mb-6">Industries</p>
        <ul className="space-y-3 text-white">
          <li>Financial Services</li>
          <li>Insurance</li>
          <li>Technology</li>
          <li>Energy</li>
          <li>Travel</li>
        </ul>
      </div>

      <div>
        <p className="font-medium text-white mb-6">Resources</p>
        <ul className="space-y-3 text-white">
          <li>Blog</li>
          <li>Documentation</li>
          <li>Pricing</li>
          <li>Resource Library</li>
          <li>ROI Calculator</li>
        </ul>
      </div>

      <div>
        <p className="font-medium text-white mb-6">Company</p>
        <ul className="space-y-3 text-white">
          <li>Who we are</li>
          <li>Careers</li>
          <li>Partners</li>
          <li>Trust Center</li>
        </ul>
      </div>

    </div>

    {/* ================= DIVIDER ================= */}
    <div className="my-16 h-px bg-gray-200" />

    {/* ================= BOTTOM SECTION ================= */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">

      {/* BRAND */}
      <div>
        <h2 className="text-6xl font-semibold text-white mb-6">
          Offset
        </h2>
        <p className="text-white max-w-sm leading-relaxed">
          Offset is building transparent, data-backed infrastructure
          for high-integrity global carbon markets.
        </p>
      </div>

      {/* WHO WE ARE */}
      <div>
        <p className="font-medium text-white mb-4">Who we are</p>
        <p className="text-white leading-relaxed">
          We help institutions understand, evaluate, and trust
          carbon credits through verifiable data and scoring.
        </p>

        <p className="font-medium text-white mt-10 mb-4">Follow us</p>
        <div className="flex gap-6 text-white">
          <span>LinkedIn</span>
          <span>Twitter</span>
          <span>YouTube</span>
        </div>
      </div>

      {/* CTA */}
      <div>
        <p className="font-medium text-white mb-4">
          Request an AI summary
        </p>
        <p className="text-white mb-6 leading-relaxed">
          Learn how Offset helps enterprises
          navigate carbon markets with confidence.
        </p>

        <button className="
          inline-flex items-center gap-2
          px-6 py-3 rounded-full
          bg-[#1E6B5C] text-white
          hover:bg-[#155447]
          transition
        ">
          Request summary →
        </button>

        {/* LEGAL */}
        <div className="flex flex-wrap gap-6 text-xs text-gray-500 mt-10">
          <span>Terms</span>
          <span>Privacy</span>
          <span>Security</span>
          <span>Accessibility</span>
          <span>Status</span>
        </div>
      </div>

    </div>
  </div>
</footer>

    </div>
  );
}