/* eslint-disable no-irregular-whitespace */

import React, { useEffect, useRef, useState } from "react";

import StickyHome from "./StickyHome";

// Assets
import landingv from "../../assets/images/landingv.mp4";

// Hooks
import { useScrollReveal } from "../../hooks/useScrollReveal";
import VerifiedProjectsShowcase from "./VerifiedProjectsShowcase";

import VerificationFlow from "./VerificationFlow";
import ImpactMetricsStip from "./ImpactMetricsStrip";
import WhatWeDoSection from "./WhatWeDoSection";
import EducationCenter from "./EducationCenter";
import TestimonialsStackScroll from "./TestimonialsScroll";

import TrustInfrastructureSection from "./TrustInfrastructureSection";
import SecurityComplianceSection from "./SecurityComplianceSection";

interface LandingPageProps {
  onOpenAuth: (mode: "login" | "signup") => void;
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

      <TestimonialsStackScroll />

      {/* ================= BRAND STATEMENT SECTION ================= */}
      <section className="w-full bg-[#F6F2E8] px-6 lg:px-12 py-24 lg:py-32">
        <div className="max-w-[1600px] mx-auto">
          {/* ================= TOP TEXT (LIKE REF) ================= */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left big headline */}
            <div className="lg:col-span-7">
              <h2 className="text-slate-900 text-[44px] md:text-[64px] lg:text-[78px] leading-[1.03] tracking-tight font-semibold">
                Building transparent infrastructure for carbon markets
              </h2>
            </div>

            {/* Right supporting text + CTA */}
            <div className="lg:col-span-5 lg:pt-4">
              <p className="text-slate-800 text-lg leading-relaxed max-w-[44ch]">
                Offset helps institutions evaluate, verify, and trade carbon credits with
                traceable evidence — combining registry validation, methodology checks,
                and risk signals for decision-grade integrity.
              </p>

              <button className="mt-10 inline-flex items-center gap-3 text-slate-900 text-base hover:opacity-70 transition">
                <span className="text-xl leading-none">›</span>
                Learn more
              </button>
            </div>
          </div>

          {/* ================= VIDEO (BELOW TEXT) ================= */}
          <div className="mt-16 lg:mt-20 overflow-hidden rounded-[8px] border border-black/10">
            <div className="relative h-[340px] md:h-[520px] lg:h-[620px]">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              >
                <source src={landingv} />
              </video>

              <div className="absolute inset-0 bg-black/10" />
            </div>
          </div>
        </div>
      </section>

      {/* ================= VERIFIED PROJECTS ================= */}
      <VerifiedProjectsShowcase />

      <TrustInfrastructureSection />

      <SecurityComplianceSection />

      <EducationCenter />

      {/* ================= FOOTER (ANIM + NO OVERLAP) ================= */}
      <FooterAnimated />
    </div>
  );
}

/* ================= FOOTER COMPONENT ================= */
function FooterAnimated() {
  const footerRef = useRef<HTMLElement | null>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setShow(true);
        });
      },
      { threshold: 0.2 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <footer ref={footerRef} className="relative bg-[#07110E] overflow-hidden">
      {/* CONTENT: reserve bottom band so big OFFSET never overlaps */}
      <div className="relative z-10 max-w-[2400px] mx-auto px-6 md:px-16 pt-20 pb-[320px]">
        {/* ================= TOP LINKS ================= */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-16 text-sm">
          <div>
            <p className="font-medium text-white mb-6">Platform</p>
            <ul className="space-y-3 text-white/80">
              <li>Overview</li>
              <li>Playbooks</li>
              <li>Integrations</li>
            </ul>
          </div>

          <div>
            <p className="font-medium text-white mb-6">Channels</p>
            <ul className="space-y-3 text-white/80">
              <li>Messaging</li>
              <li>Voice</li>
              <li>Email</li>
            </ul>
          </div>

          <div>
            <p className="font-medium text-white mb-6">Industries</p>
            <ul className="space-y-3 text-white/80">
              <li>Financial Services</li>
              <li>Insurance</li>
              <li>Technology</li>
              <li>Energy</li>
              <li>Travel</li>
            </ul>
          </div>

          <div>
            <p className="font-medium text-white mb-6">Resources</p>
            <ul className="space-y-3 text-white/80">
              <li>Blog</li>
              <li>Documentation</li>
              <li>Pricing</li>
              <li>Resource Library</li>
              <li>ROI Calculator</li>
            </ul>
          </div>

          <div>
            <p className="font-medium text-white mb-6">Company</p>
            <ul className="space-y-3 text-white/80">
              <li>Who we are</li>
              <li>Careers</li>
              <li>Partners</li>
              <li>Trust Center</li>
            </ul>
          </div>
        </div>

        {/* ================= DIVIDER ================= */}
        <div className="my-16 h-px bg-white/10" />

        {/* ================= BOTTOM SECTION ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
          <div>
            <p className="text-white/80 max-w-sm leading-relaxed">
              Offset is building transparent, data-backed infrastructure
              for high-integrity global carbon markets.
            </p>
          </div>

          <div>
            <p className="font-medium text-white mb-4">Who we are</p>
            <p className="text-white/80 leading-relaxed">
              We help institutions understand, evaluate, and trust
              carbon credits through verifiable data and scoring.
            </p>

            <p className="font-medium text-white mt-10 mb-4">Follow us</p>
            <div className="flex gap-6 text-white/80">
              <span>LinkedIn</span>
              <span>Twitter</span>
              <span>YouTube</span>
            </div>
          </div>

          <div>
            <p className="font-medium text-white mb-4">Request an AI summary</p>
            <p className="text-white/80 mb-6 leading-relaxed">
              Learn how Offset helps enterprises
              navigate carbon markets with confidence.
            </p>

            <button
              className="
                inline-flex items-center gap-2
                px-6 py-3 rounded-full
                bg-[#1E6B5C] text-white
                hover:bg-[#155447]
                transition
              "
            >
              Request summary →
            </button>

            <div className="flex flex-wrap gap-6 text-xs text-white/40 mt-10">
              <span>Terms</span>
              <span>Privacy</span>
              <span>Security</span>
              <span>Accessibility</span>
              <span>Status</span>
            </div>
          </div>
        </div>
      </div>

      {/* BIG WORD BAND (no overlap) */}
      <div className="absolute inset-x-0 bottom-0 h-[280px] overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10" />

        <div className="h-full flex items-end justify-center">
          <div
            className="
              select-none whitespace-nowrap
              font-semibold tracking-tight leading-none
              text-white/[0.05]
              will-change-transform
              transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]
              motion-reduce:transition-none
            "
            style={{
              fontSize: "22vw",
              transformOrigin: "center",
              transform: show
                ? "translate3d(0, 14px, 0) scaleX(1)"
                : "translate3d(0, 14px, 0) scaleX(0.65)",
            }}
          >
            OFFSET
          </div>
        </div>
      </div>
    </footer>
  );
}