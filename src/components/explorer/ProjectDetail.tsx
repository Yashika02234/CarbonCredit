import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  MapPin, 
  Shield, 
  Calendar, 
  Leaf, 
  Activity, 
  CheckCircle2, 
  Globe2, 
  BarChart3, 
  Layers,
  FileText,
  Satellite,
  Maximize2,
  X,
  CreditCard as CreditCardIcon, 
  Loader2,
  ArrowRight,
  ShieldCheck,
  Wallet,
  Flame,
  Smartphone
} from 'lucide-react';
import { CarbonCredit } from '../../lib/types';

interface ProjectDetailProps {
  project: CarbonCredit;
  onBack: () => void;
}

// --- SUB-COMPONENTS ---

// 1. Metric Tile
const MetricCard = ({ label, value, sub, icon: Icon, delay }: any) => (
  <div 
    className="bg-[#0A0A0A]/80 backdrop-blur-sm border border-white/10 p-6 rounded-2xl relative overflow-hidden group hover:border-emerald-500/30 transition-all duration-500 animate-in fade-in slide-in-from-bottom-4"
    style={{ animationDelay: delay }}
  >
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-[200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-in-out" />
    <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 group-hover:text-emerald-400 transition-all">
      <Icon className="w-6 h-6" />
    </div>
    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">{label}</p>
    <p className="text-3xl font-mono font-bold text-white mb-1 tracking-tight">{value}</p>
    {sub && <p className="text-xs text-emerald-500/80 font-mono border-t border-white/5 pt-2 mt-2 inline-block">{sub}</p>}
  </div>
);

// 2. Timeline Event
const TimelineItem = ({ date, title, status }: any) => (
  <div className="relative pl-8 pb-8 border-l border-white/10 last:pb-0 group">
    <div className={`absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full border-2 border-[#050505] transition-colors duration-300 ${status === 'complete' ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-slate-700'}`} />
    <div className="flex flex-col gap-1 -mt-1.5">
      <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wide">{date}</span>
      <h4 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">{title}</h4>
      <span className="text-[10px] uppercase tracking-wider text-slate-400 bg-white/5 w-fit px-2 py-0.5 rounded border border-white/5 mt-1">{status === 'complete' ? 'Verified' : 'Pending Audit'}</span>
    </div>
  </div>
);

// --- PAYMENT MODAL ---

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: CarbonCredit;
  quantity: number;
  action: 'buy' | 'retire'; // NEW PROP
}

function PaymentModal({ isOpen, onClose, project, quantity, action }: PaymentModalProps) {
  const [step, setStep] = useState<'review' | 'processing' | 'success'>('review');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi'>('card');

  useEffect(() => {
    if (isOpen) {
      setStep('review');
      setIsProcessing(false);
      setPaymentMethod('card');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const totalCost = project.pricePerCredit * quantity;
  const fees = totalCost * 0.01; 
  const finalTotal = totalCost + fees;
  
  // Theme based on action
  const themeColor = action === 'retire' ? 'text-emerald-400' : 'text-blue-400';
  const themeBg = action === 'retire' ? 'bg-emerald-500' : 'bg-blue-600';
  const themeHover = action === 'retire' ? 'hover:bg-emerald-400' : 'hover:bg-blue-500';

  const handlePurchase = async () => {
    setStep('processing');
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2500));
    setIsProcessing(false);
    setStep('success');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-[#050505]/90 backdrop-blur-xl transition-opacity animate-in fade-in duration-300" 
        onClick={onClose}
      />

      <div className="relative w-full max-w-lg bg-[#0A0A0A] border border-white/10 rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between p-6 border-b border-white/5 bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className={`w-2.5 h-2.5 rounded-full ${step === 'processing' ? 'bg-yellow-400 animate-pulse' : step === 'success' ? themeBg : 'bg-slate-400'}`} />
            <span className="text-xs font-mono font-bold text-slate-300 uppercase tracking-widest">
              {step === 'review' && (action === 'retire' ? 'Confirm Retirement' : 'Confirm Trade')}
              {step === 'processing' && 'Processing Chain'}
              {step === 'success' && (action === 'retire' ? 'Asset Retired' : 'Asset Acquired')}
            </span>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-8 overflow-y-auto custom-scrollbar">
          
          {/* STEP 1: REVIEW */}
          {step === 'review' && (
            <div className="space-y-8 animate-in slide-in-from-right-4 duration-300">
              
              <div className="bg-white/5 rounded-2xl p-5 border border-white/5 relative overflow-hidden group">
                <div className={`absolute top-0 left-0 w-1 h-full ${themeBg}`} />
                <div className="flex justify-between items-start mb-4">
                   <div>
                      <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Asset ID</p>
                      <p className={`text-xs font-mono ${themeColor}`}>{project.unicId}</p>
                   </div>
                   <div className="text-right">
                      <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Action</p>
                      <div className="flex items-center gap-1 text-xs font-bold text-white">
                        {action === 'retire' ? <Flame className="w-3 h-3 text-emerald-500" /> : <Wallet className="w-3 h-3 text-blue-500" />}
                        {action === 'retire' ? 'Offset (Burn)' : 'Buy (Hold)'}
                      </div>
                   </div>
                </div>
                <h3 className="text-lg font-bold text-white mb-4">{project.projectName}</h3>
                <div className="flex justify-between items-end border-t border-white/10 pt-4">
                   <div>
                      <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Quantity</p>
                      <p className="text-xl font-mono text-white">{quantity} t</p>
                   </div>
                   <div className="text-right">
                      <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Unit Price</p>
                      <p className="text-sm font-mono text-slate-300">${project.pricePerCredit.toFixed(2)}</p>
                   </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500 font-medium">Subtotal</span>
                  <span className="text-slate-300 font-mono">${totalCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500 font-medium">Network Fee (1%)</span>
                  <span className="text-slate-300 font-mono">${fees.toFixed(2)}</span>
                </div>
                <div className="h-px bg-white/10 my-2" />
                <div className="flex justify-between text-lg">
                  <span className="text-white font-bold">Total</span>
                  <span className={`font-mono font-bold ${themeColor}`}>${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Payment Method Selection */}
              <div className="space-y-4">
                <p className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">Select Payment Method</p>
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={() => setPaymentMethod('card')}
                    className={`flex items-center justify-center gap-2 p-4 rounded-xl border transition-all ${paymentMethod === 'card' ? 'bg-white text-black border-white' : 'bg-black/40 border-white/10 text-slate-400 hover:text-white hover:border-white/30'}`}
                  >
                    <CreditCardIcon className="w-4 h-4" />
                    <span className="text-sm font-bold">Card</span>
                  </button>
                  <button 
                    onClick={() => setPaymentMethod('upi')}
                    className={`flex items-center justify-center gap-2 p-4 rounded-xl border transition-all ${paymentMethod === 'upi' ? 'bg-white text-black border-white' : 'bg-black/40 border-white/10 text-slate-400 hover:text-white hover:border-white/30'}`}
                  >
                    <Smartphone className="w-4 h-4" />
                    <span className="text-sm font-bold">UPI</span>
                  </button>
                </div>

                {/* Dynamic Input Fields */}
                <div className="p-4 rounded-xl border border-white/10 bg-black/40 animate-in fade-in">
                  {paymentMethod === 'card' ? (
                    <div className="space-y-5">
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase text-slate-500 font-bold tracking-widest">Card Number</label>
                        <div className="flex items-center gap-3 border-b border-white/10 pb-2 focus-within:border-emerald-500/50 transition-colors">
                           <CreditCardIcon className="w-5 h-5 text-emerald-500/80" />
                           <input 
                             type="text" 
                             placeholder="0000 0000 0000 0000" 
                             maxLength={19}
                             className="w-full bg-transparent text-base text-white placeholder:text-slate-700 focus:outline-none font-mono tracking-wider" 
                           />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase text-slate-500 font-bold tracking-widest">Expiry</label>
                          <input 
                            type="text" 
                            placeholder="MM/YY" 
                            maxLength={5}
                            className="w-full bg-transparent border-b border-white/10 pb-2 text-base text-white placeholder:text-slate-700 focus:outline-none focus:border-emerald-500/50 transition-colors font-mono tracking-widest" 
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase text-slate-500 font-bold tracking-widest">CVC</label>
                          <input 
                             type="text" 
                             placeholder="123" 
                             maxLength={4}
                             className="w-full bg-transparent border-b border-white/10 pb-2 text-base text-white placeholder:text-slate-700 focus:outline-none focus:border-emerald-500/50 transition-colors font-mono tracking-widest" 
                           />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="space-y-2">
                         <label className="text-[10px] uppercase text-slate-500 font-bold tracking-widest">UPI ID</label>
                         <input 
                           type="text" 
                           placeholder="username@okhdfcbank" 
                           className="w-full bg-transparent border-b border-white/10 pb-2 text-base text-white placeholder:text-slate-700 focus:outline-none font-mono tracking-wide" 
                         />
                      </div>
                      <p className="text-xs text-slate-500">A payment request will be sent to your UPI app.</p>
                    </div>
                  )}
                </div>
              </div>

              <button
                onClick={handlePurchase}
                className={`w-full py-4 ${themeBg} ${themeHover} text-white font-bold text-sm uppercase tracking-widest rounded-xl shadow-lg shadow-emerald-900/20 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]`}
              >
                {action === 'retire' ? 'Confirm Retirement' : 'Confirm Purchase'} <ArrowRight className="w-4 h-4" />
              </button>
              
              <p className="text-[10px] text-slate-500 text-center flex items-center justify-center gap-1.5">
                 <ShieldCheck className="w-3 h-3" /> Secure Payment Processing
              </p>
            </div>
          )}

          {/* STEP 2: PROCESSING */}
          {step === 'processing' && (
            <div className="py-12 flex flex-col items-center justify-center text-center animate-in fade-in zoom-in-95">
              <div className="relative mb-8">
                <div className={`absolute inset-0 rounded-full border-2 ${action === 'retire' ? 'border-emerald-500/20' : 'border-blue-500/20'} animate-ping duration-1000`} />
                <div className={`absolute inset-[-10px] rounded-full border ${action === 'retire' ? 'border-emerald-500/10' : 'border-blue-500/10'} animate-pulse duration-2000`} />
                <div className={`w-20 h-20 rounded-full border-2 ${action === 'retire' ? 'border-t-emerald-400 border-r-emerald-500/50' : 'border-t-blue-400 border-r-blue-500/50'} border-b-transparent border-l-transparent animate-spin flex items-center justify-center bg-black/50 backdrop-blur-md`}>
                   <Loader2 className={`w-8 h-8 ${action === 'retire' ? 'text-emerald-400' : 'text-blue-400'} animate-pulse`} />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2 tracking-tight">Securing Assets</h3>
              <div className="space-y-1">
                 <p className={`text-[10px] font-mono ${action === 'retire' ? 'text-emerald-500/80' : 'text-blue-500/80'} uppercase tracking-widest animate-pulse`}>Writing to Ledger...</p>
                 <p className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">Block #1928374</p>
              </div>
            </div>
          )}

          {/* STEP 3: SUCCESS */}
          {step === 'success' && (
            <div className="py-4 flex flex-col items-center text-center animate-in zoom-in-95 duration-500">
              <div className={`w-24 h-24 ${action === 'retire' ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-blue-500/10 border-blue-500/20'} rounded-full flex items-center justify-center mb-6 border shadow-[0_0_40px_-10px_rgba(16,185,129,0.3)]`}>
                <CheckCircle2 className={`w-12 h-12 ${action === 'retire' ? 'text-emerald-400' : 'text-blue-400'}`} />
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">{action === 'retire' ? 'Retired.' : 'Acquired.'}</h3>
              <p className="text-slate-400 max-w-xs mx-auto mb-8 text-sm leading-relaxed">
                {action === 'retire' 
                  ? <span>You have successfully retired <span className="text-white font-bold">{quantity} tonnes</span>. This impact is now permanent.</span>
                  : <span>You have added <span className="text-white font-bold">{quantity} tonnes</span> to your portfolio. You can retire them later.</span>
                }
              </p>
              
              <div className="w-full bg-white/5 border border-white/5 rounded-xl p-4 mb-8 flex items-center gap-4 text-left">
                 <div className="w-10 h-10 bg-slate-800 rounded flex items-center justify-center text-emerald-500">
                    {action === 'retire' ? <Leaf className="w-5 h-5" /> : <Wallet className="w-5 h-5 text-blue-500" />}
                 </div>
                 <div>
                    <p className="text-xs font-bold text-white">{action === 'retire' ? 'Retirement Certificate' : 'Asset Ownership Token'}</p>
                    <p className="text-[10px] font-mono text-slate-500">ID: {action === 'retire' ? 'CERT' : 'OWN'}-{Math.floor(Math.random() * 999999)}</p>
                 </div>
                 <button className={`ml-auto text-xs font-bold ${themeColor} hover:text-white`}>
                    View
                 </button>
              </div>

              <button onClick={onClose} className="w-full py-4 bg-white text-black font-bold text-sm uppercase tracking-widest rounded-xl hover:bg-slate-200 transition-colors">Return to Dashboard</button>
            </div>
          )}
        </div>
        
        <div className="bg-black/40 p-4 text-center border-t border-white/5 backdrop-blur-md">
          <p className="text-[9px] text-slate-600 flex items-center justify-center gap-1.5 uppercase tracking-widest font-bold">
            <ShieldCheck className="w-3 h-3" /> End-to-End Encryption
          </p>
        </div>
      </div>
    </div>
  );
}

// --- MAIN PAGE ---

export default function ProjectDetail({ project, onBack }: ProjectDetailProps) {
  const [quantity, setQuantity] = useState<number>(10);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [tradeAction, setTradeAction] = useState<'buy' | 'retire'>('retire'); // Toggle State

  useEffect(() => {
    setMounted(true);
    // Ensure scroll resets when mounting
    window.scrollTo(0,0);
  }, []);

  const totalCost = (quantity * project.pricePerCredit);

  return (
    <div className="min-h-screen bg-[#050505] text-slate-200 font-sans selection:bg-emerald-500/30 animate-in fade-in duration-500">
      
      <PaymentModal 
        isOpen={isPaymentOpen} 
        onClose={() => setIsPaymentOpen(false)} 
        project={project}
        quantity={quantity}
        action={tradeAction}
      />

      {/* --- 1. CINEMATIC HERO (60vh) --- */}
      <div className="relative h-[65vh] w-full overflow-hidden border-b border-white/10 group">
        <div className="absolute top-24 left-6 z-30">
          <button onClick={onBack} className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 text-white text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-all hover:-translate-x-1">
            <ArrowLeft className="w-4 h-4" /> Market Index
          </button>
        </div>

        <div className="absolute inset-0 z-0">
           <img src={project.image} alt={project.projectName} className={`w-full h-full object-cover transition-transform duration-[30s] ease-out ${mounted ? 'scale-110' : 'scale-100'}`} />
           <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />
           <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.3)_1px,transparent_1px)] bg-[size:100px_100px] opacity-30" />
        </div>

        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 z-20">
          <div className="max-w-[1600px] mx-auto">
             <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div className="max-w-4xl space-y-6">
                   <div className="flex flex-wrap items-center gap-3 animate-in slide-in-from-bottom-4 duration-500">
                      <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold uppercase tracking-wider rounded backdrop-blur-md flex items-center gap-2">
                         <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                         {project.projectType}
                      </span>
                      <span className="px-3 py-1 bg-white/5 text-white border border-white/10 text-[10px] font-bold uppercase tracking-wider rounded backdrop-blur-md flex items-center gap-1">
                        <Globe2 className="w-3 h-3" /> {project.country}
                      </span>
                      <span className="px-3 py-1 bg-white/5 text-slate-300 border border-white/10 text-[10px] font-bold uppercase tracking-wider rounded backdrop-blur-md font-mono">
                        ID: {project.unicId}
                      </span>
                   </div>
                   <h1 className="text-5xl md:text-7xl font-bold text-white leading-[0.9] drop-shadow-2xl animate-in slide-in-from-bottom-6 duration-700">{project.projectName}</h1>
                   <div className="flex items-center gap-6 text-sm text-slate-300 font-mono animate-in slide-in-from-bottom-8 duration-700">
                      <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-emerald-500" /> {project.location}</span>
                      <span className="text-slate-600">|</span>
                      <span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-emerald-500" /> Vintage: {project.vintage}</span>
                      <span className="text-slate-600">|</span>
                      <span className="flex items-center gap-2"><Shield className="w-4 h-4 text-emerald-500" /> {project.registry} Verified</span>
                   </div>
                </div>
                
                <div className="hidden xl:block text-right animate-in fade-in zoom-in duration-1000 delay-200">
                   <div className="relative inline-block">
                      <svg className="w-32 h-32 transform -rotate-90">
                         <circle cx="64" cy="64" r="60" stroke="#334155" strokeWidth="6" fill="transparent" />
                         <circle cx="64" cy="64" r="60" stroke="#10b981" strokeWidth="6" fill="transparent" strokeDasharray="377" strokeDashoffset={377 - (377 * project.trustScore) / 100} className="transition-all duration-[2s] ease-out" />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                         <span className="text-4xl font-bold text-white">{project.trustScore}</span>
                         <span className="text-[9px] uppercase tracking-widest text-slate-500 font-bold">Trust Score</span>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* --- 2. MAIN LAYOUT --- */}
      <div className="max-w-[1600px] mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-12 gap-12">
           
           <div className="lg:col-span-8 space-y-12">
              <section className="bg-white/5 border border-white/5 p-8 rounded-2xl">
                 <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2"><Leaf className="w-4 h-4 text-emerald-500" /> Executive Summary</h3>
                 <p className="text-xl md:text-2xl text-slate-200 leading-relaxed font-light">This project protects critical biodiversity hotspots by engaging local communities in sustainable land management. It prevents deforestation across <span className="text-white font-medium border-b border-emerald-500">120,000 hectares</span> of primary rainforest.</p>
              </section>

              <section>
                 <div className="flex items-center justify-between mb-6"><h3 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2"><BarChart3 className="w-4 h-4 text-emerald-500" /> Key Metrics</h3></div>
                 <div className="grid sm:grid-cols-3 gap-4">
                    <MetricCard label="Total Volume" value={project.availableCredits.toLocaleString()} sub="Available Tonnes" icon={Layers} delay="0ms" />
                    <MetricCard label="Protection Area" value="125k" sub="Hectares" icon={MapPin} delay="100ms" />
                    <MetricCard label="Bio-Density" value="98.4" sub="Percentile Rank" icon={Activity} delay="200ms" />
                 </div>
              </section>

              <section>
                 <div className="flex items-center justify-between mb-6">
                    <h3 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2"><Satellite className="w-4 h-4 text-emerald-500" /> Geospatial Verification</h3>
                    <button className="text-[10px] text-emerald-400 uppercase tracking-widest font-bold hover:text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded bg-emerald-500/10 hover:bg-emerald-500/20 transition-all flex items-center gap-2"><Maximize2 className="w-3 h-3" /> Expand Map</button>
                 </div>
                 <div className="h-[400px] w-full bg-[#0F0F0F] rounded-2xl border border-white/10 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-30 grayscale group-hover:scale-105 transition-transform duration-[2s]" />
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
                    <div className="absolute top-6 left-6 bg-black/80 backdrop-blur border border-white/10 p-3 rounded-xl shadow-xl">
                       <p className="text-[9px] text-slate-500 uppercase font-bold tracking-widest mb-1">Target Coordinates</p>
                       <p className="text-sm font-mono text-emerald-400">03°08'12"S, 60°01'15"W</p>
                    </div>
                 </div>
              </section>

              <section>
                 <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6 flex items-center gap-2"><FileText className="w-4 h-4 text-emerald-500" /> Audit Log</h3>
                 <div className="bg-[#0F0F0F] rounded-2xl p-8 border border-white/5">
                    <TimelineItem date="OCT 12, 2023" title="Q3 Monitoring Report Verified" status="complete" />
                    <TimelineItem date="AUG 01, 2023" title="Satellite Biomass Scan" status="complete" />
                    <TimelineItem date="JUN 15, 2023" title="Community Benefit Audit" status="complete" />
                    <TimelineItem date="PENDING" title="2024 Annual Issuance" status="pending" />
                 </div>
              </section>
           </div>

           {/* RIGHT COLUMN: TRADE TERMINAL */}
           <div className="lg:col-span-4">
              <div className="sticky top-28">
                 
                 {/* Order Ticket */}
                 <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-6 shadow-2xl relative overflow-hidden group">
                    <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${tradeAction === 'retire' ? 'from-emerald-500 to-cyan-500' : 'from-blue-500 to-indigo-500'}`} />
                    
                    {/* Action Toggle */}
                    <div className="flex bg-white/5 p-1 rounded-xl mb-6">
                       <button onClick={() => setTradeAction('buy')} className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${tradeAction === 'buy' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}>Trade (Hold)</button>
                       <button onClick={() => setTradeAction('retire')} className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${tradeAction === 'retire' ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}>Offset (Retire)</button>
                    </div>
                    
                    <div className="mb-8">
                       <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Market Price</p>
                       <div className="flex items-end gap-3">
                          <span className="text-5xl font-mono font-bold text-white tracking-tighter">${project.pricePerCredit.toFixed(2)}</span>
                          <span className={`text-sm mb-2 font-mono ${tradeAction === 'retire' ? 'text-emerald-400' : 'text-blue-400'}`}>USD / t</span>
                       </div>
                    </div>

                    <div className="space-y-6">
                       <div className={`bg-white/5 border border-white/10 rounded-xl p-4 transition-colors focus-within:border-opacity-50 ${tradeAction === 'retire' ? 'focus-within:border-emerald-500' : 'focus-within:border-blue-500'}`}>
                          <div className="flex justify-between mb-2">
                             <label className="text-[9px] uppercase font-bold text-slate-400 tracking-widest">Quantity</label>
                             <span className="text-[9px] text-slate-500 font-mono tracking-widest">MAX: {project.availableCredits}</span>
                          </div>
                          <div className="flex items-center justify-between">
                             <input type="number" min="1" value={quantity} onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 0))} className="w-full bg-transparent text-2xl font-mono font-bold text-white outline-none placeholder:text-slate-700" />
                             <span className="text-xs text-slate-500 font-bold uppercase">tCO₂e</span>
                          </div>
                       </div>

                       <div className="space-y-3 py-4 border-t border-dashed border-white/10">
                          <div className="flex justify-between text-xs font-mono"><span className="text-slate-500">Subtotal</span><span className="text-slate-300">${totalCost.toFixed(2)}</span></div>
                          <div className="flex justify-between text-xs font-mono"><span className="text-slate-500">Fees (1%)</span><span className="text-slate-300">${(totalCost * 0.01).toFixed(2)}</span></div>
                          <div className="flex justify-between text-base pt-3 border-t border-white/10"><span className="text-white font-bold text-sm uppercase tracking-wide">Total Allocation</span><span className={`font-mono font-bold ${tradeAction === 'retire' ? 'text-emerald-400' : 'text-blue-400'}`}>${(totalCost * 1.01).toFixed(2)}</span></div>
                       </div>

                       <button 
                          onClick={() => setIsPaymentOpen(true)}
                          className={`w-full py-4 text-white font-bold text-sm uppercase tracking-widest rounded-xl transition-all hover:scale-[1.02] shadow-lg flex items-center justify-center gap-2 group/btn ${tradeAction === 'retire' ? 'bg-emerald-600 hover:bg-emerald-500' : 'bg-blue-600 hover:bg-blue-500'}`}
                       >
                          {tradeAction === 'retire' ? 'Initialize Retirement' : 'Add to Portfolio'} <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                       </button>
                    </div>
                 </div>

                 <div className="mt-4 flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/5 backdrop-blur-sm">
                    <CheckCircle2 className="w-5 h-5 text-slate-500" />
                    <div><p className="text-xs font-bold text-slate-300 uppercase tracking-wide">Verified Asset</p><p className="text-[10px] text-slate-500">Double-spend protection active.</p></div>
                 </div>

              </div>
           </div>
        </div>
      </div>
    </div>
  );
}