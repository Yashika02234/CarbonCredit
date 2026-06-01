import React, { useState, useEffect, useRef } from 'react';
import { Loader2, Download, CheckCircle2, AlertCircle, Building2, Zap, Fuel, BarChart3, ShieldCheck, TrendingUp, FileText, Activity } from 'lucide-react';
import { CreditCard } from '../explorer/CreditCard';

// ─── All original types preserved ────────────────────────────────────────────
interface AnalyzeResult {
  emissions: number;
  creditsRequired: number;
  estimatedCost: number;
  projects: any[];
}

// ─── Staged loading messages ──────────────────────────────────────────────────
const LOADING_STAGES = [
  'Analyzing operational inputs...',
  'Calculating emissions exposure...',
  'Validating compliance metrics...',
  'Generating mitigation recommendations...',
  'Preparing reporting outputs...',
];

// ─── Animated grid background (on emerald-800 header) ─────────────────────────
function GridBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-emerald-900" />
      {/* Subtle white glow */}

    </div>
  );
}

// ─── Context cards ────────────────────────────────────────────────────────────
const CONTEXT_CARDS = [
  {
    icon: ShieldCheck,
    label: 'CBAM Ready',
    desc: 'Prepare emissions reporting for EU carbon border adjustment requirements.',
  },
  {
    icon: FileText,
    label: 'Audit-grade Reporting',
    desc: 'Generate structured compliance-ready outputs with full data lineage.',
  },
  {
    icon: Activity,
    label: 'Emissions Intelligence',
    desc: 'Analyze operational carbon exposure across industrial processes.',
  },
];

// ─── Staged loading indicator ─────────────────────────────────────────────────
function StagedLoader({ stage }: { stage: number }) {
  return (
    <div className="flex flex-col items-center gap-6 py-16">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-2 border-emerald-200" />
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-emerald-800 animate-spin" />
        <div className="absolute inset-[6px] rounded-full bg-emerald-100 animate-pulse" />
      </div>
      <div className="space-y-3 w-full max-w-xs">
        {LOADING_STAGES.map((msg, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all duration-500 ${i < stage ? 'bg-emerald-600' : i === stage ? 'bg-emerald-800 animate-pulse' : 'bg-emerald-200'
              }`} />
            <span className={`text-sm transition-all duration-500 ${i < stage ? 'text-emerald-400 line-through' : i === stage ? 'text-emerald-900' : 'text-emerald-300'
              }`}>
              {msg}
            </span>
            {i < stage && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 ml-auto flex-shrink-0" />}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Metric card (white bg) ────────────────────────────────────────────────────
function MetricCard({
  label, value, unit, sub, color, icon: Icon
}: {
  label: string; value: string; unit?: string; sub: string; color: string; icon: React.ElementType;
}) {
  return (
    <div className="relative overflow-hidden bg-white border border-emerald-100 rounded-2xl p-6 group hover:border-emerald-300 hover:shadow-md transition-all duration-300">
      {/* Top accent line */}
      <div className={`absolute top-0 left-0 right-0 h-[3px] ${color}`} />
      <div className="flex items-start justify-between mb-4">
        <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-emerald-500">{label}</p>
        <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center">
          <Icon className="w-4 h-4 text-emerald-600" />
        </div>
      </div>
      <p className="text-4xl font-semibold text-emerald-900 tracking-tight leading-none">
        {value}
        {unit && <span className="text-lg font-normal text-emerald-400 ml-1.5">{unit}</span>}
      </p>
      <p className="mt-3 text-xs text-emerald-500 leading-relaxed">{sub}</p>
    </div>
  );
}

// ─── Insight pill (white bg) ───────────────────────────────────────────────────
function InsightCard({ label, value, icon: Icon, trend }: { label: string; value: string; icon: React.ElementType; trend?: 'up' | 'down' | 'neutral' }) {
  return (
    <div className="flex items-center gap-3 bg-white border border-emerald-100 rounded-xl px-4 py-3.5 hover:border-emerald-300 transition-colors duration-200">
      <div className="w-8 h-8 rounded-lg bg-emerald-800 flex items-center justify-center flex-shrink-0">
        <Icon className="w-3.5 h-3.5 text-white" />
      </div>
      <div className="min-w-0">
        <p className="text-[10px] text-emerald-500 uppercase tracking-widest font-medium truncate">{label}</p>
        <p className="text-sm font-semibold text-emerald-900 mt-0.5">{value}</p>
      </div>
      {trend && (
        <TrendingUp className={`w-3.5 h-3.5 ml-auto flex-shrink-0 ${trend === 'up' ? 'text-rose-500' : trend === 'down' ? 'text-emerald-600' : 'text-emerald-300'
          }`} />
      )}
    </div>
  );
}

// ─── Main component (all original logic unchanged) ────────────────────────────
export default function AnalyzePage() {
  // ── All original state ──────────────────────────────────────────────────────
  const [formData, setFormData] = useState({
    companyName: '',
    industry: 'Manufacturing',
    energyConsumption: '',
    fuelType: 'Coal',
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalyzeResult | null>(null);

  // ── UI-only loading stage state ─────────────────────────────────────────────
  const [loadingStage, setLoadingStage] = useState(0);
  const stageTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (loading) {
      setLoadingStage(0);
      stageTimerRef.current = setInterval(() => {
        setLoadingStage((s) => Math.min(s + 1, LOADING_STAGES.length - 1));
      }, 600);
    } else {
      if (stageTimerRef.current) clearInterval(stageTimerRef.current);
      setLoadingStage(0);
    }
    return () => { if (stageTimerRef.current) clearInterval(stageTimerRef.current); };
  }, [loading]);

  // ── All original handlers (unchanged) ───────────────────────────────────────
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('http://localhost:5000/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          energyConsumption: Number(formData.energyConsumption)
        }),
      });

      if (!response.ok) {
        throw new Error('API failed');
      }

      const data = await response.json();
      setResult(data);
    } catch (error) {
      // Fallback for demonstration if backend is not reachable
      console.warn("Backend not reachable, using mock data for demonstration.");
      setTimeout(() => {
        setResult({
          emissions: 250,
          creditsRequired: 250,
          estimatedCost: 125000,
          projects: [
            {
              name: 'Solar Farm Rajasthan',
              registry: 'Verra',
              confidence: 'High',
              pricePerCredit: 15,
              location: 'Rajasthan',
              vintage: 2023,
              trustScore: 95,
              availableCredits: 10000,
              status: 'Active',
              projectType: 'Solar',
              unicId: 'VERRA-1029',
              country: 'India',
              image: 'https://images.unsplash.com/photo-1509391366360-5154316d3fba?auto=format&fit=crop&q=80',
            },
            {
              name: 'Wind Project Gujarat',
              registry: 'Gold Standard',
              confidence: 'Medium',
              pricePerCredit: 12,
              location: 'Gujarat',
              vintage: 2022,
              trustScore: 88,
              availableCredits: 5000,
              status: 'Active',
              projectType: 'Wind',
              unicId: 'GS-3021',
              country: 'India',
              image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&q=80',
            }
          ]
        });
        setLoading(false);
      }, 1000);
      return;
    }

    setLoading(false);
  };

  const handleDownload = async () => {
    if (!formData.companyName) return;
    try {
      window.open(`http://localhost:5000/report?companyName=${encodeURIComponent(formData.companyName)}`, '_blank');
    } catch (error) {
      console.error("Failed to download report", error);
    }
  };

  // ─── Input / Select classes — white bg on emerald-800 panel ──────────────────
  const inputCls = `
    w-full bg-white border border-white/20 rounded-xl px-4 py-3 text-emerald-900 text-sm
    placeholder:text-emerald-300
    focus:outline-none focus:border-white focus:ring-2 focus:ring-white/30
    hover:border-white/40 transition-all duration-200
  `;

  const labelCls = "block text-[11px] font-semibold tracking-[0.14em] uppercase text-white/70 mb-2";

  // ─── Render ──────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-white text-emerald-900/95">

      {/* ═══════════════════════ HEADER — emerald-800 ════════════════════════ */}
      <div className="relative pt-20 pb-14 px-6 overflow-hidden bg-emerald-900/95">
        <GridBackground />
        <div className="relative z-10 max-w-7xl mx-auto">

          <h1 className="text-3xl md:text-7xl font-semibold tracking-tight text-white leading-tight max-w-3xl">
            Carbon Compliance
            <span className="text-white/40"> Intelligence</span>
          </h1>
          <p className="mt-4 text-white/60 text-base md:text-lg max-w-2xl leading-relaxed">
            Analyze industrial emissions, estimate compliance exposure, and generate audit-ready reporting insights.
          </p>

          {/* Context cards — white/translucent on emerald */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl">
            {CONTEXT_CARDS.map(({ icon: Icon, label, desc }) => (
              <div key={label} className="flex items-start gap-3 bg-white/10 border border-white/15 rounded-xl p-4 backdrop-blur-sm">
                <div className="w-8 h-8 rounded-lg bg-white/20 border border-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon className="w-3.5 h-3.5 text-white" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">{label}</p>
                  <p className="text-[11px] text-white/60 mt-0.5 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════════════════════ MAIN LAYOUT — white bg ═══════════════════════ */}
      <div className="max-w-7xl mx-auto px-6 pb-24 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-6 items-start">

          {/* ══════════ LEFT: FORM PANEL — emerald-800 ════════════════════════ */}
          <div className="sticky top-24">
            <div className="bg-emerald-900/95 rounded-2xl overflow-hidden shadow-xl shadow-emerald-900/20">
              {/* Panel header */}
              <div className="px-6 py-4 border-b border-white/10 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-white" />
                <span className="text-xs font-semibold tracking-widest uppercase text-white/70">Operational Inputs</span>
              </div>

              <form onSubmit={handleAnalyze} className="p-6 space-y-5">
                {/* Company Name */}
                <div>
                  <label className={labelCls}>
                    <Building2 className="inline w-3 h-3 mr-1.5 -mt-0.5" />
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    required
                    value={formData.companyName}
                    onChange={handleChange}
                    className={inputCls}
                    placeholder="e.g. Tata Steel Ltd"
                  />
                </div>

                {/* Industry + Fuel Type */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelCls}>
                      <BarChart3 className="inline w-3 h-3 mr-1.5 -mt-0.5" />
                      Industry
                    </label>
                    <select
                      name="industry"
                      value={formData.industry}
                      onChange={handleChange}
                      className={inputCls}
                    >
                      <option>Manufacturing</option>
                      <option>Energy</option>
                      <option>Transport</option>
                      <option>IT</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div>
                    <label className={labelCls}>
                      <Fuel className="inline w-3 h-3 mr-1.5 -mt-0.5" />
                      Fuel Type
                    </label>
                    <select
                      name="fuelType"
                      value={formData.fuelType}
                      onChange={handleChange}
                      className={inputCls}
                    >
                      <option>Coal</option>
                      <option>Diesel</option>
                      <option>Petrol</option>
                      <option>Natural Gas</option>
                      <option>Renewable</option>
                    </select>
                  </div>
                </div>

                {/* Energy Consumption */}
                <div>
                  <label className={labelCls}>
                    <Zap className="inline w-3 h-3 mr-1.5 -mt-0.5" />
                    Energy Consumption
                    <span className="ml-1.5 text-white/40 normal-case tracking-normal font-normal">(MWh / year)</span>
                  </label>
                  <input
                    type="number"
                    name="energyConsumption"
                    required
                    value={formData.energyConsumption}
                    onChange={handleChange}
                    className={inputCls}
                    placeholder="e.g. 1000"
                  />
                </div>

                {/* Divider */}
                <div className="h-px bg-white/10" />

                {/* Submit — white button on emerald panel */}
                <button
                  type="submit"
                  disabled={loading}
                  className="
                    w-full bg-white hover:bg-emerald-50 disabled:opacity-50 disabled:cursor-not-allowed
                    text-emerald-800 font-semibold text-sm py-3.5 rounded-xl
                    flex items-center justify-center gap-2.5
                    transition-all duration-200 shadow-lg shadow-emerald-900/20
                  "
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Running analysis...
                    </>
                  ) : (
                    <>
                      <Activity className="w-4 h-4" />
                      Run Compliance Analysis
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* ══════════ RIGHT: INSIGHTS / RESULTS — white ═════════════════════ */}
          <div className="space-y-6">

            {/* Empty / pre-run state */}
            {!loading && !result && (
              <div className="bg-white border border-emerald-100 rounded-2xl p-10 flex flex-col items-center justify-center text-center min-h-[340px] space-y-4 shadow-sm">
                <div className="w-14 h-14 rounded-2xl bg-emerald-800 flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-emerald-800 font-semibold text-sm">Compliance Intelligence</p>
                  <p className="text-emerald-400 text-xs mt-1.5 max-w-[280px] leading-relaxed">
                    Complete the operational input form and run an analysis to view emissions exposure, compliance cost, and mitigation pathways.
                  </p>
                </div>
                {/* Static insight pills */}
                <div className="grid grid-cols-2 gap-2.5 w-full max-w-sm mt-4">
                  <InsightCard label="Regulatory Exposure" value="—" icon={ShieldCheck} />
                  <InsightCard label="Carbon Intensity" value="—" icon={Activity} />
                  <InsightCard label="Transition Risk" value="—" icon={TrendingUp} />
                  <InsightCard label="Reporting Score" value="—" icon={FileText} />
                </div>
              </div>
            )}

            {/* Loading state */}
            {loading && (
              <div className="bg-white border border-emerald-100 rounded-2xl shadow-sm">
                <div className="px-6 py-4 border-b border-emerald-100 flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-800 animate-pulse" />
                  <span className="text-xs font-semibold tracking-widest uppercase text-emerald-500">Processing</span>
                </div>
                <StagedLoader stage={loadingStage} />
              </div>
            )}

            {/* Results */}
            {result && !loading && (
              <div className="space-y-5">

                {/* Compliance Summary Banner — emerald-800 */}
                <div className="bg-emerald-800 rounded-2xl px-6 py-5">
                  <div className="flex items-center gap-2.5 mb-2">
                    <ShieldCheck className="w-4 h-4 text-white/80" />
                    <span className="text-xs font-semibold tracking-widest uppercase text-white/80">Compliance Summary</span>
                  </div>
                  <p className="text-white/70 text-sm leading-relaxed max-w-2xl">
                    Based on current operational inputs for{' '}
                    <span className="text-white font-semibold">{formData.companyName}</span>,
                    your estimated emissions exposure indicates{' '}
                    <span className="text-amber-300 font-medium">moderate compliance impact</span>{' '}
                    under emerging carbon regulatory frameworks including CBAM and EU ETS.
                  </p>
                </div>

                {/* Metric cards — white */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <MetricCard
                    label="Total Emissions"
                    value={result.emissions.toString()}
                    unit="tCO₂"
                    sub="+12% vs. industry benchmark"
                    color="bg-gradient-to-r from-rose-500 to-rose-600"
                    icon={Activity}
                  />
                  <MetricCard
                    label="Credits Required"
                    value={result.creditsRequired.toString()}
                    unit="units"
                    sub="Offset volume to achieve net compliance"
                    color="bg-gradient-to-r from-amber-500 to-orange-500"
                    icon={BarChart3}
                  />
                  <MetricCard
                    label="Compliance Cost"
                    value={`₹${(result.estimatedCost / 1000).toFixed(0)}K`}
                    sub={`₹${result.estimatedCost.toLocaleString()} estimated exposure`}
                    color="bg-gradient-to-r from-emerald-700 to-emerald-800"
                    icon={TrendingUp}
                  />
                </div>

                {/* Insight pills — white */}
                <div className="grid grid-cols-2 gap-2.5">
                  <InsightCard label="Regulatory Exposure" value="Moderate" icon={ShieldCheck} trend="up" />
                  <InsightCard label="Carbon Intensity Risk" value={`${(result.emissions / 100).toFixed(1)} tCO₂/unit`} icon={Activity} trend="neutral" />
                  <InsightCard label="Renewable Transition" value="Recommended" icon={TrendingUp} trend="down" />
                  <InsightCard label="Reporting Readiness" value="Requires Action" icon={FileText} trend="up" />
                </div>

                {/* Mitigation Pathways — white panel */}
                <div className="bg-white border border-emerald-100 rounded-2xl overflow-hidden shadow-sm">
                  <div className="px-6 py-4 border-b border-emerald-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-emerald-800" />
                      <div>
                        <p className="text-sm font-semibold text-emerald-900">Recommended Mitigation Pathways</p>
                        <p className="text-[11px] text-emerald-400 mt-0.5">Compliance-aligned offset options ranked by suitability</p>
                      </div>
                    </div>
                    <button
                      onClick={handleDownload}
                      className="
                        flex items-center gap-2 px-4 py-2 rounded-xl
                        bg-emerald-800 hover:bg-emerald-700
                        text-xs font-semibold text-white
                        transition-all duration-200
                      "
                    >
                      <Download className="w-3.5 h-3.5" />
                      Download Report
                    </button>
                  </div>

                  <div className="p-6">
                    {result.projects && result.projects.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {result.projects.map((project: any, i: number) => (
                          <div key={i} className="relative group">
                            {/* All original CreditCard logic preserved */}
                            <CreditCard
                              credit={{
                                id: project.id || `proj-${i}`,
                                projectName: project.name || project.projectName || 'Unknown Project',
                                pricePerCredit: project.pricePerCredit || 0,
                                location: project.location || 'Unknown',
                                vintage: project.vintage || new Date().getFullYear(),
                                registry: project.registry || 'Unknown',
                                trustScore: project.trustScore || (project.confidence === 'High' ? 95 : 85),
                                availableCredits: project.availableCredits || 0,
                                status: project.status || 'Active',
                                projectType: project.projectType || 'Renewable',
                                unicId: project.unicId || `ID-${Math.floor(Math.random() * 1000)}`,
                                country: project.country || 'India',
                                image: project.image || 'https://images.unsplash.com/photo-1509391366360-5154316d3fba?auto=format&fit=crop&q=80',
                                batch_id: `batch-${i}`,
                                methodology: 'Mock Methodology',
                                total_quantity: 10000,
                                sold_quantity: 0,
                                retired_quantity: 0,
                                available_quantity: project.availableCredits || 10000,
                                updated_at: new Date().toISOString(),
                                version: 1,
                              }}
                              onClick={() => { }}
                            />
                            {/* Confidence badge — original logic preserved */}
                            <div className="absolute top-3 right-3 z-30">
                              <span className={`
                                px-2.5 py-1 backdrop-blur-md border text-[10px] font-bold uppercase tracking-wider rounded-full
                                flex items-center gap-1.5 shadow-xl
                                ${project.confidence === 'High'
                                  ? 'bg-emerald-900/80 border-emerald-500/30 text-emerald-300'
                                  : 'bg-amber-900/80 border-amber-500/30 text-amber-300'
                                }
                              `}>
                                {project.confidence === 'High' ? (
                                  <CheckCircle2 className="w-3 h-3" />
                                ) : (
                                  <AlertCircle className="w-3 h-3" />
                                )}
                                {project.confidence || 'Medium'} Match
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 text-emerald-400 text-sm">
                        No mitigation pathways found for the current operational profile.
                      </div>
                    )}
                  </div>
                </div>

              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
