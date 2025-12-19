import React, { useState, useEffect } from 'react';
import {
  Cpu,
  Code,
  Zap,
  Network,
  Target,
  Handshake,
  TrendingUp,
  Activity,
  ArrowRight,
  History,
} from 'lucide-react';

// Assets from your project structure
import landingheroimage from '../../assets/images/landingheroimage.jpg';
import landingv from '../../assets/images/landingv.mp4';
import earthSvg from '../../assets/images/earth.png';


function useScrollReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll('[data-reveal]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('reveal-active');
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

// --- SUB-COMPONENTS ---

interface PrincipleCardProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  title: string;
  desc: string;
  glowClass: string;
  labelColor: string;
  delay?: string;
}

const PrincipleCard: React.FC<PrincipleCardProps> = ({
  icon: Icon,
  label,
  title,
  desc,
  glowClass,
  labelColor,
  delay,
}) => (
  <div
    className="group relative overflow-hidden rounded-[28px] bg-[#f3f4ff] border border-transparent p-10
      transition-all duration-700 ease-out
      hover:bg-[#30574E] hover:-translate-y-2 hover:shadow-[0_40px_80px_rgba(48,87,78,0.15)]
      animate-in fade-in slide-in-from-bottom-8 fill-mode-backwards"
    style={{ animationDelay: delay }}
  >
    <div
      className={`absolute inset-0 bg-gradient-to-br ${glowClass} opacity-0 group-hover:opacity-20 transition-opacity duration-700`}
    />
    <div className="relative z-10 flex flex-col h-full">
      <div className="flex justify-between items-start mb-8">
        <div className="p-4 rounded-xl bg-white text-[#30574E] transition-transform duration-300 group-hover:scale-110">
          <Icon className="w-6 h-6" />
        </div>
        <span
          className={`text-[10px] font-mono font-bold uppercase tracking-[0.2em]
          ${labelColor} group-hover:text-white/70 transition-colors duration-500`}
        >
          {label}
        </span>
      </div>

      <h3 className="text-2xl font-medium text-gray-900 mb-4 leading-tight group-hover:text-white transition-colors duration-500">
        {title}
      </h3>
      <p className="text-base text-gray-600 leading-relaxed group-hover:text-white/85 transition-colors duration-500">
        {desc}
      </p>
    </div>
  </div>
);

const TimelineEvent = ({
  year,
  title,
  desc,
  isHighlighted,
  isLineHighlighted,
  onMouseEnter,
  onMouseLeave,
}: {
  year: string;
  title: string;
  desc: string;
  isHighlighted: boolean;
  isLineHighlighted: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) => (
  <div
    data-reveal
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    className="reveal relative pl-16 pb-14 last:pb-0 group cursor-default
      transition-all duration-700 ease-out"
  >
    {/* Vertical Track Line */}
    <div
      className={`absolute left-[7px] top-2 bottom-0 w-[2px] transition-colors duration-700 group-last:hidden ${
        isLineHighlighted ? 'bg-[#30574E]' : 'bg-gray-200'
      }`}
    />

    {/* Progress Dot */}
    <div
      className={`absolute left-0 top-2 w-4 h-4 rounded-full border-2 transition-all duration-700 z-10 ${
        isHighlighted
          ? 'bg-[#30574E] border-[#30574E] scale-125'
          : 'bg-white border-gray-300'
      }`}
    >
      <div
        className={`absolute inset-1 rounded-full bg-white transition-transform duration-300 ${
          isHighlighted ? 'scale-100' : 'scale-0'
        }`}
      />
    </div>

    <div
      className={`transition-all duration-700 ease-out p-6 rounded-2xl ${
        isHighlighted
          ? 'bg-[#FCF1E7]/40 translate-x-3'
          : 'hover:bg-[#f3f4ff]/50'
      }`}
    >
      <span
        className={`text-sm font-mono font-bold mb-2 block tracking-[0.2em] transition-colors duration-500 ${
          isHighlighted ? 'text-[#30574E]' : 'text-gray-400'
        }`}
      >
        {year}
      </span>
      <h4 className="text-xl font-medium text-gray-900 mb-3 tracking-tight">
        {title}
      </h4>
      <p className="text-base text-gray-600 max-w-lg leading-relaxed font-light">
        {desc}
      </p>
    </div>
  </div>
);

// --- MAIN PAGE ---

const AboutPage: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [hoveredTimeline, setHoveredTimeline] = useState<number | null>(null);

  useScrollReveal();

  useEffect(() => {
    setMounted(true);
  }, []);

  const timelineData = [
    {
      year: '2021',
      title: 'System Genesis',
      desc: 'Founded by former NASA engineers. Launched first satellite verification model.',
    },
    {
      year: '2022',
      title: 'Series A & Scale',
      desc: 'Raised $24M to expand sensor network across the Amazon basin.',
    },
    {
      year: '2023',
      title: 'The API Launch',
      desc: 'Opened our infrastructure to developers. 500+ integrations in 6 months.',
    },
    {
      year: '2024',
      title: 'Global Liquidity',
      desc: 'Reaching 2.5M tonnes retired. Launching the Blue Carbon vertical.',
    },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-[#30574E]/20 overflow-x-hidden">

      {/* PAGE-SCOPED ANIMATIONS */}
      <style>{`
        /* Slow, calm color shift for the text */
        @keyframes oceanShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .animate-ocean-text {
          background-size: 200% auto;
          animation: oceanShift 15s ease-in-out infinite;
        }

        @keyframes orbitDrift {
          from {
            stroke-dashoffset: 0;
          }
          to {
            stroke-dashoffset: -120;
          }
        }

        .orbit-line {
          animation: orbitDrift 18s linear infinite;
        }


        /* Satellite Orbit Animation */
        @keyframes satelliteOrbit {
          0% {
            transform: rotate(0deg) translateX(160px) rotate(0deg);
          }
          100% {
            transform: rotate(360deg) translateX(160px) rotate(-360deg);
          }
        }

        .satellite-orbit {
          animation: satelliteOrbit 30s linear infinite;
          transform-origin: 200px 200px;
        }
      `}</style>

      {/* --- ANIMATED BACKGROUND --- */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-50">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-emerald-600/5 blur-3xl rounded-full" />
        <div
          className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-[#FCF1E7]/40 blur-3xl rounded-full animate-pulse-slow"
          style={{ animationDelay: '4s' }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(48,87,78,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(48,87,78,0.05)_1px,transparent_1px)] bg-[size:50px_50px] opacity-30" />
      </div>

      <div className="relative z-10">

        {/* --- 1. HERO SECTION --- */}
        <section className="pt-40 pb-20 px-6 lg:px-12 bg-white relative overflow-hidden border-b border-gray-100">
          <div className="max-w-[1400px] mx-auto">
            <div className="bg-[#30574E] rounded-[28px] p-12 md:p-20 relative overflow-hidden min-h-[600px] flex items-center shadow-2xl shadow-[#30574E]/20 transition-all duration-700 ease-out">
              
              <div className="grid lg:grid-cols-2 gap-12 w-full relative z-10 items-center">
                
                {/* Left: Text Content */}
                <div>
                  <div className="inline-flex items-center gap-3 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-[10px] font-mono text-white mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700 uppercase tracking-widest shadow-sm">
                    <Activity className="w-3 h-3 animate-pulse text-emerald-400" />
                    System Status: Operational
                  </div>

                  <h1 className="text-5xl md:text-7xl lg:text-7xl font-medium text-white leading-[1.1] tracking-tight mb-10">
                    The Climate <br />
                    <span
                      className="
                        text-transparent bg-clip-text
                        bg-gradient-to-r from-sky-300 via-teal-300 to-emerald-400
                        animate-ocean-text
                      "
                    >
                      Operating System.
                    </span>
                  </h1>

                  <p className="text-xl md:text-2xl text-white/85 max-w-xl leading-relaxed font-light border-l border-white/20 pl-8">
                    Offset replaces opaque spreadsheets with{' '}
                    <span className="text-white font-medium">
                      real-time, satellite-verified infrastructure
                    </span>
                    . We are digitizing the planet&apos;s natural capital to make
                    the regenerative economy scalable.
                  </p>
                </div>

                {/* Right: Vector Earth Graphic */}
                {/* Right: Earth + Satellite */}
                {/* Right: Earth + Satellite */}
                <div className="relative h-[420px] w-full flex items-center justify-center lg:justify-end animate-in fade-in duration-1000 delay-300">
                  {/* Fixed coordinate wrapper */}
                  <div className="relative w-[420px] h-[420px]">
                      
                    {/* Earth SVG Image (perfectly centered) */}
                    <img
                      src={earthSvg}
                      alt="Earth"
                      className="
                        absolute top-1/2 left-1/2
                        w-[260px] h-[260px]
                        -translate-x-1/2 -translate-y-1/2
                        rounded-full
                        bg-[radial-gradient(circle_at_70%_50%,rgba(0,0,0,0.35),transparent_60%)]
                        pointer-events-none
                      "
                    />
                
                    {/* Orbit + Satellite */}
                    <svg
                      viewBox="0 0 400 400"
                      className="absolute inset-0 w-full h-full"
                    >
                      {/* Orbit Path */}
                      <ellipse
                        cx="200"
                        cy="200"
                        rx="160"
                        ry="145"
                        fill="none"
                        stroke="rgba(255,255,255,0.22)"
                        strokeWidth="1"
                        strokeDasharray="2 10"
                        strokeLinecap="round"
                        className="orbit-line"
                        transform="rotate(-15 200 200)"
                      />


                    {/* Orbiting Satellite */}
                      <g className="satellite-orbit">
                        {/* Signal Glow */}
                        <circle cx="200" cy="200" r="8" fill="#6ee7b7" opacity="0.2" />
                      
                        {/* Satellite Body */}
                        <rect x="198" y="197" width="4" height="6" rx="0.5" fill="#e5e7eb" />
                      
                        {/* Solar Panels */}
                        <rect x="194" y="199" width="3" height="2" fill="#3b82f6" />
                        <rect x="203" y="199" width="3" height="2" fill="#3b82f6" />
                      
                        {/* Antenna */}
                        <line
                          x1="200"
                          y1="197"
                          x2="200"
                          y2="194"
                          stroke="#9ca3af"
                          strokeWidth="0.5"
                        />
                        <circle cx="200" cy="194" r="0.8" fill="#fbbf24" />
                      
                        {/* Blinking Signal Light */}
                        <circle cx="200" cy="197" r="0.7" fill="#ef4444">
                          <animate
                            attributeName="opacity"
                            values="0.3;1;0.3"
                            dur="2s"
                            repeatCount="indefinite"
                          />
                        </circle>
                      </g>
                    </svg>
                  </div>
</div>

              </div>

              {/* Decorative Background Grid Pattern */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none opacity-20" />
            </div>
          </div>
        </section>


        {/* --- 2. MARKET EFFICIENCY & ANALYSIS --- */}
        <section className="py-24 px-6 lg:px-12 bg-[#f3f4ff]">
          <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-24 items-center">

            <div className="group cursor-default order-2 lg:order-1">
              <div className="bg-white border border-gray-100 rounded-[28px] p-12 transition-all duration-700 ease-out group-hover:shadow-[0_40px_100px_rgba(48,87,78,0.08)] group-hover:-translate-y-2">
                <div className="flex items-center justify-between mb-12 pb-6 border-b border-gray-100">
                  <span className="text-xs uppercase tracking-[0.2em] text-gray-500 font-bold group-hover:text-[#30574E] transition-colors duration-500">
                    Market efficiency
                  </span>
                  <span className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#30574E] font-bold">
                    <span className="w-2 h-2 rounded-full bg-[#30574E] animate-pulse" />
                    Live
                  </span>
                </div>

                <div className="space-y-12">
                  <div>
                    <div className="flex justify-between items-end mb-4">
                      <span className="text-base font-medium text-gray-900">Verification latency</span>
                      <span className="text-sm font-mono text-gray-400 line-through">~6 months</span>
                    </div>
                    <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div className={`h-full bg-[#30574E] transition-all duration-[2000ms] ease-out ${mounted ? 'w-[12%]' : 'w-0'}`} />
                    </div>
                    <p className="mt-3 text-right text-xs uppercase tracking-widest text-[#30574E] font-bold font-mono">
                      Continuous
                    </p>
                  </div>

                  <div>
                    <div className="flex justify-between items-end mb-4">
                      <span className="text-base font-medium text-gray-900">Retirement overhead</span>
                      <span className="text-sm font-mono text-gray-400 line-through">~15% fees</span>
                    </div>
                    <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div className={`h-full bg-[#30574E]/60 transition-all duration-[2000ms] ease-out delay-300 ${mounted ? 'w-[8%]' : 'w-0'}`} />
                    </div>
                    <p className="mt-3 text-right text-xs uppercase tracking-widest text-[#30574E] font-bold font-mono">
                      Flat 1%
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="flex items-center gap-2 text-[#30574E] font-mono text-xs mb-8 uppercase tracking-[0.2em] bg-[#FCF1E7]/60 w-fit px-3 py-1.5 rounded-md border border-[#FCF1E7] shadow-sm">
                <TrendingUp className="w-4 h-4" /> Market Analysis
              </div>

              <h2 className="text-4xl md:text-5xl font-medium text-gray-900 mb-8 leading-tight tracking-tight">
                The market is broken. <br />
                <span className="text-gray-400">We fixed it.</span>
              </h2>

              <p className="text-lg text-gray-600 mb-8 leading-relaxed font-light">
                Traditional carbon markets suffer from trust gaps, slow verification,
                and fragmented infrastructure.
              </p>

              <p className="text-lg text-gray-600 leading-relaxed font-light">
                Our system replaces delay and opacity with continuous verification
                and transparent settlement.
              </p>
            </div>
          </div>
        </section>
                {/* --- 3. SYSTEM ARCHITECTURE / CORE PRINCIPLES --- */}
        <section className="py-32 px-6 lg:px-12 bg-white">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
              <div className="max-w-2xl">
                <h2 className="text-4xl md:text-5xl font-medium text-gray-900 mb-6 tracking-tight">
                  System Architecture
                </h2>
                <p className="text-xl text-gray-600 font-light leading-relaxed">
                  Our platform is built on three immutable principles designed to solve the
                  &quot;Trust Gap&quot; in voluntary carbon markets.
                </p>
              </div>
              <button className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#30574E] hover:text-white transition-all duration-500 border border-[#FCF1E7] px-8 py-4 rounded-xl hover:bg-[#30574E] group bg-[#FCF1E7]/40 shadow-sm hover:-translate-y-1">
                Technical Whitepaper
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <PrincipleCard
                icon={Cpu}
                label="Layer 1: Verification"
                title="Code, Not Trust."
                desc="We don't rely on PDFs. We use satellite telemetry and IoT sensors to verify biomass density in real-time."
                glowClass="from-emerald-400"
                labelColor="text-emerald-700"
                delay="0ms"
              />
              <PrincipleCard
                icon={Network}
                label="Layer 2: Consensus"
                title="Radical Openness."
                desc="Every retirement is minted on-chain. Double-spending is mathematically impossible on our network."
                glowClass="from-teal-400"
                labelColor="text-teal-700"
                delay="150ms"
              />
              <PrincipleCard
                icon={Zap}
                label="Layer 3: Access"
                title="Frictionless Scale."
                desc="We built the pipes so you can build the product. Integrate carbon removal into any transaction with 3 lines of code."
                glowClass="from-[#FCF1E7]"
                labelColor="text-gray-600"
                delay="300ms"
              />
            </div>
          </div>
        </section>

        {/* --- 4. EVOLUTION LOG / TIMELINE --- */}
        <section className="relative bg-[#f3f4ff] px-6 lg:px-12 py-40">
          <div className="max-w-[1600px] mx-auto">
            <div className="flex items-center gap-2 text-gray-500 font-mono text-xs mb-12 uppercase tracking-[0.3em] justify-center">
              <History className="w-4 h-4" /> Evolution Log
            </div>

            <div className="flex flex-col lg:flex-row gap-20 items-start">
              <div className="w-full lg:w-[45%] lg:sticky lg:top-32">
                <div className="mb-12">
                  <h2 className="text-5xl font-medium text-gray-900 mb-8 leading-tight tracking-tight">
                    From prototype to <br /> global standard.
                  </h2>
                  <p className="text-gray-600 mb-10 font-light text-xl leading-relaxed">
                    We started as a research project at MIT, obsessing over satellite data.
                    Today, we power the climate strategies of the Fortune 500.
                  </p>
                  <div className="h-1 w-24 bg-gradient-to-r from-[#30574E] to-[#FCF1E7] rounded-full" />
                </div>

                <div className="h-[520px] rounded-[32px] overflow-hidden bg-gray-200 shadow-[0_30px_60px_rgba(0,0,0,0.1)] group transition-all duration-700 hover:-translate-y-2">
                  <img
                    src={landingheroimage}
                    alt="Infrastructure"
                    className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700"
                  />
                </div>
              </div>

              <div className="w-full lg:w-[55%]">
                <div className="space-y-2">
                  {timelineData.map((event, idx) => (
                    <TimelineEvent
                      key={idx}
                      {...event}
                      isHighlighted={hoveredTimeline !== null && idx <= hoveredTimeline}
                      isLineHighlighted={hoveredTimeline !== null && idx < hoveredTimeline}
                      onMouseEnter={() => setHoveredTimeline(idx)}
                      onMouseLeave={() => setHoveredTimeline(null)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- 5. OPERATORS & CTA --- */}
        <section className="py-32 bg-white px-6 lg:px-12 overflow-hidden">
          <div className="max-w-[1400px] mx-auto">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <span className="w-2 h-2 bg-[#30574E] rounded-full" />
                  <span className="text-xs font-mono text-gray-500 uppercase tracking-[0.2em] font-bold">
                    The Operators
                  </span>
                </div>

                <h2 className="text-5xl md:text-7xl font-medium text-gray-900 mb-10 leading-[1.1] tracking-tight">
                  Built by builders, <br />
                  <span className="text-gray-400">for builders.</span>
                </h2>

                <p className="text-xl text-gray-600 mb-10 leading-relaxed font-light max-w-xl">
                  We aren&apos;t just climate scientists. We are engineers, product designers,
                  and founders who have scaled systems to millions of users.
                </p>

                <div className="flex flex-wrap gap-4">
                  <div className="px-5 py-3 bg-[#f3f4ff] rounded-full text-[11px] font-mono text-[#30574E] font-bold flex items-center gap-3 hover:bg-[#30574E] hover:text-white transition-all duration-500 cursor-default uppercase tracking-wider">
                    <Code className="w-4 h-4" /> Ex-Stripe
                  </div>
                  <div className="px-5 py-3 bg-[#f3f4ff] rounded-full text-[11px] font-mono text-[#30574E] font-bold flex items-center gap-3 hover:bg-[#30574E] hover:text-white transition-all duration-500 cursor-default uppercase tracking-wider">
                    <Cpu className="w-4 h-4" /> NASA JPL
                  </div>
                  <div className="px-5 py-3 bg-[#f3f4ff] rounded-full text-[11px] font-mono text-[#30574E] font-bold flex items-center gap-3 hover:bg-[#30574E] hover:text-white transition-all duration-500 cursor-default uppercase tracking-wider">
                    <Target className="w-4 h-4" /> Gold Standard
                  </div>
                </div>
              </div>
                            <div className="relative group">
                <div className="relative rounded-[32px] overflow-hidden min-h-[500px] shadow-[0_40px_100px_rgba(0,0,0,0.15)] flex flex-col justify-center p-12 md:p-16 transition-all duration-700 hover:-translate-y-2">
                  <video
                    src={landingv}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-[#30574E]/85 backdrop-blur-[2px]" />

                  <div className="relative z-10 text-center md:text-left">
                    <Handshake className="w-16 h-16 text-[#FCF1E7] mb-8 mx-auto md:mx-0 group-hover:scale-110 transition-transform duration-300" />
                    <h3 className="text-4xl font-medium text-white mb-6 tracking-tight">
                      Deploy with us.
                    </h3>
                    <p className="text-white/80 mb-12 text-lg font-light leading-relaxed max-w-md mx-auto md:mx-0">
                      Whether you are a startup integrating an offset API or an enterprise
                      securing a 10-year supply chain, we are your infrastructure partners.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-5">
                      <button className="flex-1 py-5 bg-white text-[#30574E] font-bold rounded-lg hover:bg-[#FCF1E7] transition-all duration-500 uppercase tracking-[0.2em] text-xs">
                        Start Building
                      </button>
                      <button className="flex-1 py-5 border-2 border-white/30 text-white font-bold rounded-lg hover:bg-white/10 transition-all duration-500 uppercase tracking-[0.2em] text-xs">
                        Contact Sales
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- 6. CONTACT FOOTER --- */}
        <section className="relative bg-[#30574E] px-6 lg:px-12 py-32 mt-20">
          <div className="max-w-[1600px] mx-auto grid lg:grid-cols-2 gap-24 items-center">

            <div className="text-white grid grid-cols-2 gap-20">
              <div className="flex flex-col justify-between">
                <div>
                  <h2 className="text-4xl font-medium tracking-tight mb-6">Offset</h2>
                  <p className="text-sm text-white/85 leading-relaxed max-w-xs mb-14">
                    Building transparent, data-backed infrastructure for global carbon
                    markets — designed for institutions, regulators, and climate leaders.
                  </p>
                  <div className="space-y-3 text-sm text-white/90 font-mono tracking-tight">
                    <p>123-456-7890</p>
                    <p>info@offset.com</p>
                    <p>
                      500 Terry Francine St.<br />
                      San Francisco, CA 94158
                    </p>
                  </div>
                </div>
                <div className="mt-16 w-16 h-px bg-white/30" />
              </div>

              <div className="flex flex-col justify-center">
                <div className="mb-12">
                  <p className="text-xs uppercase tracking-[0.3em] text-white/70 mb-6 font-bold">
                    Why contact us
                  </p>
                  <ul className="space-y-5 text-sm text-white/90">
                    <li>• Institutional onboarding & partnerships</li>
                    <li>• API & data integrations</li>
                    <li>• Compliance & reporting support</li>
                    <li>• Climate strategy advisory</li>
                  </ul>
                </div>
                <div className="flex items-center gap-6 mb-10">
                  {['f', 'in', 'ig', 'x'].map((icon, i) => (
                    <div
                      key={i}
                      className="w-11 h-11 rounded-full border border-white/40 flex items-center justify-center text-white/90 hover:bg-[#FCF1E7] hover:text-[#30574E] transition-all duration-500 cursor-pointer font-mono"
                    >
                      {icon}
                    </div>
                  ))}
                </div>
                <div className="text-sm text-white/90 space-y-3">
                  <p className="hover:underline cursor-pointer">Privacy Policy</p>
                  <p className="hover:underline cursor-pointer">Accessibility Statement</p>
                </div>
              </div>
            </div>

            <div className="bg-[#FCF1E7] rounded-[32px] p-14 shadow-[0_40px_120px_rgba(0,0,0,0.2)] transition-all duration-700 hover:-translate-y-2">
              <h3 className="text-3xl font-medium text-[#30574E] mb-12">Get in touch</h3>
              <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-[#30574E] mb-2 font-medium">
                      First name *
                    </label>
                    <input className="w-full h-12 rounded-md bg-[#30574E]/5 border border-[#30574E]/10 px-4 focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm text-[#30574E] mb-2 font-medium">
                      Last name
                    </label>
                    <input className="w-full h-12 rounded-md bg-[#30574E]/5 border border-[#30574E]/10 px-4 focus:outline-none" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-[#30574E] mb-2 font-medium">
                      Email *
                    </label>
                    <input
                      type="email"
                      className="w-full h-12 rounded-md bg-[#30574E]/5 border border-[#30574E]/10 px-4 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[#30574E] mb-2 font-medium">
                      Phone
                    </label>
                    <input className="w-full h-12 rounded-md bg-[#30574E]/5 border border-[#30574E]/10 px-4 focus:outline-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-[#30574E] mb-2 font-medium">
                    Write a message
                  </label>
                  <textarea
                    rows={4}
                    className="w-full rounded-md bg-[#30574E]/5 border border-[#30574E]/10 px-4 py-3 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full h-14 rounded-md bg-[#30574E] text-white font-bold hover:bg-[#25453e] transition-all duration-500 uppercase tracking-[0.2em] text-xs"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};



export default AboutPage;


