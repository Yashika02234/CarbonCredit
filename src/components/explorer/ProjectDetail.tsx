// src/components/explorer/ProjectDetail.tsx
import { useState, useEffect } from 'react';
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

// 1. Metric Tile (Light)
const MetricCard = ({ label, value, sub, icon: Icon, delay }: any) => (
  <div 
    className="bg-card/90 backdrop-blur-sm border border-border p-6 rounded-2xl relative overflow-hidden group hover:border-primary/40 transition-all duration-500 animate-in fade-in slide-in-from-bottom-4"
    style={{ animationDelay: delay }}
  >
    {/* Hover Scan Effect */}
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent -translate-x-[200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-in-out" />
    
    <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 group-hover:text-primary transition-all">
      <Icon className="w-6 h-6" />
    </div>
    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">{label}</p>
    <p className="text-3xl font-mono font-bold text-foreground mb-1 tracking-tight">{value}</p>
    {sub && <p className="text-xs text-primary font-mono border-t border-border pt-2 mt-2 inline-block">{sub}</p>}
  </div>
);

// 2. Timeline Event (Light)
const TimelineItem = ({ date, title, status }: any) => (
  <div className="relative pl-8 pb-8 border-l border-border last:pb-0 group">
    <div className={`absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full border-2 border-white transition-colors duration-300 ${status === 'complete' ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.2)]' : 'bg-slate-300'}`} />
    <div className="flex flex-col gap-1 -mt-1.5">
      <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wide">{date}</span>
      <h4 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">{title}</h4>
      <span className="text-[10px] uppercase tracking-wider text-muted-foreground bg-muted w-fit px-2 py-0.5 rounded border border-border mt-1">{status === 'complete' ? 'Verified' : 'Pending Audit'}</span>
    </div>
  </div>
);

// --- PAYMENT MODAL (Light) ---

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: CarbonCredit;
  quantity: number;
  action: 'buy' | 'retire';
}

function PaymentModal({ isOpen, onClose, project, quantity, action }: PaymentModalProps) {
  const [step, setStep] = useState<'review' | 'processing' | 'success'>('review');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi'>('card');

  useEffect(() => {
    if (isOpen) {
      setStep('review');
      setPaymentMethod('card');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const totalCost = project.pricePerCredit * quantity;
  const fees = totalCost * 0.01; 
  const finalTotal = totalCost + fees;
  
  // Theme based on action
  const themeColor = action === 'retire' ? 'text-emerald-600' : 'text-sky-600';
  const themeBg = action === 'retire' ? 'bg-emerald-600' : 'bg-sky-600';
  const themeHover = action === 'retire' ? 'hover:bg-emerald-500' : 'hover:bg-sky-500';

  const handlePurchase = async () => {
    setStep('processing');
    // Simulate transaction time
    await new Promise(resolve => setTimeout(resolve, 2000));
    setStep('success');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      
      {/* 1. Light Backdrop */}
      <div 
        className="absolute inset-0 bg-white/60 backdrop-blur-md transition-opacity animate-in fade-in duration-200" 
        onClick={onClose}
      />

      {/* 2. The "Transaction Window" */}
      <div className="relative w-full max-w-lg bg-card border border-border rounded-3xl shadow-xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between p-6 border-b border-border bg-white/50">
          <div className="flex items-center gap-3">
            <div className={`w-2.5 h-2.5 rounded-full ${step === 'processing' ? 'bg-yellow-400 animate-pulse' : step === 'success' ? themeBg : 'bg-slate-400'}`} />
            <span className="text-xs font-mono font-bold text-muted-foreground uppercase tracking-widest">
              {step === 'review' && (action === 'retire' ? 'Confirm Retirement' : 'Confirm Trade')}
              {step === 'processing' && 'Processing Chain'}
              {step === 'success' && (action === 'retire' ? 'Asset Retired' : 'Asset Acquired')}
            </span>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-8 overflow-y-auto custom-scrollbar">
          
          {/* STEP 1: REVIEW */}
          {step === 'review' && (
            <div className="space-y-8 animate-in slide-in-from-right-4 duration-300">
              
              {/* Asset Ticket */}
              <div className="bg-white/5 rounded-2xl p-5 border border-border relative overflow-hidden group">
                <div className={`absolute top-0 left-0 w-1 h-full ${action === 'retire' ? 'bg-emerald-600' : 'bg-sky-600'}`} />
                <div className="flex justify-between items-start mb-4">
                   <div>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mb-1">Asset ID</p>
                      <p className={`text-xs font-mono ${themeColor}`}>{project.unicId}</p>
                   </div>
                   <div className="text-right">
                      <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mb-1">Action</p>
                      <div className="flex items-center gap-1 text-xs font-bold text-foreground">
                        {action === 'retire' ? <Flame className="w-3 h-3 text-emerald-500" /> : <Wallet className="w-3 h-3 text-sky-500" />}
                        {action === 'retire' ? 'Offset (Burn)' : 'Buy (Hold)'}
                      </div>
                   </div>
                </div>
                <h3 className="text-lg font-bold text-foreground mb-4">{project.projectName}</h3>
                <div className="flex justify-between items-end border-t border-border pt-4">
                   <div>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mb-1">Quantity</p>
                      <p className="text-xl font-mono text-foreground">{quantity} t</p>
                   </div>
                   <div className="text-right">
                      <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mb-1">Unit Price</p>
                      <p className="text-sm font-mono text-muted-foreground">${project.pricePerCredit.toFixed(2)}</p>
                   </div>
                </div>
              </div>

              {/* Financials */}
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground font-medium">Subtotal</span>
                  <span className="text-foreground font-mono">${totalCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground font-medium">Network Fee (1%)</span>
                  <span className="text-foreground font-mono">${fees.toFixed(2)}</span>
                </div>
                <div className="h-px bg-border my-2" />
                <div className="flex justify-between text-lg">
                  <span className="text-foreground font-bold">Total</span>
                  <span className={`font-mono font-bold ${themeColor}`}>${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Payment Method Selection */}
              <div className="space-y-4">
                <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Select Payment Method</p>
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={() => setPaymentMethod('card')}
                    className={`flex items-center justify-center gap-2 p-4 rounded-xl border transition-all ${paymentMethod === 'card' ? 'bg-white text-foreground border-border' : 'bg-white/10 border-border text-muted-foreground hover:text-foreground hover:border-border'}`}
                  >
                    <CreditCardIcon className="w-4 h-4" />
                    <span className="text-sm font-bold">Card</span>
                  </button>
                  <button 
                    onClick={() => setPaymentMethod('upi')}
                    className={`flex items-center justify-center gap-2 p-4 rounded-xl border transition-all ${paymentMethod === 'upi' ? 'bg-white text-foreground border-border' : 'bg-white/10 border-border text-muted-foreground hover:text-foreground hover:border-border'}`}
                  >
                    <Smartphone className="w-4 h-4" />
                    <span className="text-sm font-bold">UPI</span>
                  </button>
                </div>

                {/* Dynamic Input Fields */}
                <div className="p-4 rounded-xl border border-border bg-white/5 animate-in fade-in">
                  {paymentMethod === 'card' ? (
                    <div className="space-y-5">
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase text-muted-foreground font-bold tracking-widest">Card Number</label>
                        <div className="flex items-center gap-3 border-b border-border pb-2 focus-within:border-primary transition-colors">
                           <CreditCardIcon className="w-5 h-5 text-primary/80" />
                           <input 
                             type="text" 
                             placeholder="0000 0000 0000 0000" 
                             maxLength={19}
                             className="w-full bg-transparent text-base text-foreground placeholder:text-muted-foreground focus:outline-none font-mono tracking-wider" 
                           />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase text-muted-foreground font-bold tracking-widest">Expiry</label>
                          <input 
                            type="text" 
                            placeholder="MM/YY" 
                            maxLength={5}
                            className="w-full bg-transparent border-b border-border pb-2 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors font-mono tracking-widest" 
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase text-muted-foreground font-bold tracking-widest">CVC</label>
                          <input 
                             type="text" 
                             placeholder="123" 
                             maxLength={4}
                             className="w-full bg-transparent border-b border-border pb-2 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors font-mono tracking-widest" 
                           />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="space-y-2">
                         <label className="text-[10px] uppercase text-muted-foreground font-bold tracking-widest">UPI ID</label>
                         <input 
                           type="text" 
                           placeholder="username@bank" 
                           className="w-full bg-transparent border-b border-border pb-2 text-base text-foreground placeholder:text-muted-foreground focus:outline-none font-mono tracking-wide" 
                         />
                      </div>
                      <p className="text-xs text-muted-foreground">A payment request will be sent to your UPI app.</p>
                    </div>
                  )}
                </div>
              </div>

              <button
                onClick={handlePurchase}
                className={`w-full py-4 ${themeBg} ${themeHover} text-white font-bold text-sm uppercase tracking-widest rounded-xl shadow transition-all hover:scale-[1.01] flex items-center justify-center gap-2`}
              >
                {action === 'retire' ? 'Confirm Retirement' : 'Confirm Purchase'} <ArrowRight className="w-4 h-4" />
              </button>
              
              <p className="text-[10px] text-muted-foreground text-center flex items-center justify-center gap-1.5">
                 <ShieldCheck className="w-3 h-3" /> Secure Payment Processing
              </p>
            </div>
          )}

          {/* STEP 2: PROCESSING */}
          {step === 'processing' && (
            <div className="py-12 flex flex-col items-center justify-center text-center animate-in fade-in zoom-in-95">
              <div className="relative mb-8">
                <div className={`absolute inset-0 rounded-full border-2 ${action === 'retire' ? 'border-emerald-200' : 'border-sky-200'} animate-pulse`} />
                <div className={`w-20 h-20 rounded-full border-2 ${action === 'retire' ? 'border-t-emerald-500 border-r-emerald-400/50' : 'border-t-sky-500 border-r-sky-400/50'} border-b-transparent border-l-transparent animate-spin flex items-center justify-center bg-white/5`}>
                   <Loader2 className={`w-8 h-8 ${action === 'retire' ? 'text-emerald-500' : 'text-sky-500'} animate-pulse`} />
                </div>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2 tracking-tight">Securing Assets</h3>
              <div className="space-y-1">
                 <p className={`text-[10px] font-mono ${action === 'retire' ? 'text-emerald-600' : 'text-sky-600'} uppercase tracking-widest animate-pulse`}>Writing to Ledger...</p>
                 <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Block #1928374</p>
              </div>
            </div>
          )}

          {/* STEP 3: SUCCESS */}
          {step === 'success' && (
            <div className="py-4 flex flex-col items-center text-center animate-in zoom-in-95 duration-500">
              <div className={`w-24 h-24 ${action === 'retire' ? 'bg-emerald-50 border-emerald-200' : 'bg-sky-50 border-sky-200'} rounded-full flex items-center justify-center mb-6 border shadow-sm`}>
                <CheckCircle2 className={`w-12 h-12 ${action === 'retire' ? 'text-emerald-500' : 'text-sky-500'}`} />
              </div>
              <h3 className="text-3xl font-bold text-foreground mb-2">{action === 'retire' ? 'Retired.' : 'Acquired.'}</h3>
              <p className="text-muted-foreground max-w-xs mx-auto mb-8 text-sm leading-relaxed">
                {action === 'retire' 
                  ? <span>You have successfully retired <span className="text-foreground font-bold">{quantity} tonnes</span>. This impact is now permanent.</span>
                  : <span>You have added <span className="text-foreground font-bold">{quantity} tonnes</span> to your portfolio. You can retire them later.</span>
                }
              </p>
              
              <div className="w-full bg-white/5 border border-border rounded-xl p-4 mb-8 flex items-center gap-4 text-left">
                 <div className="w-10 h-10 bg-muted rounded flex items-center justify-center text-primary">
                    {action === 'retire' ? <Leaf className="w-5 h-5" /> : <Wallet className="w-5 h-5 text-sky-500" />}
                 </div>
                 <div>
                    <p className="text-xs font-bold text-foreground">{action === 'retire' ? 'Retirement Certificate' : 'Asset Ownership Token'}</p>
                    <p className="text-[10px] font-mono text-muted-foreground">ID: {action === 'retire' ? 'CERT' : 'OWN'}-{Math.floor(Math.random() * 999999)}</p>
                 </div>
                 <button className={`ml-auto text-xs font-bold ${themeColor} hover:text-foreground`}>
                    View
                 </button>
              </div>

              <button onClick={onClose} className="w-full py-4 bg-foreground text-white font-bold text-sm uppercase tracking-widest rounded-xl hover:opacity-95 transition-colors">Return to Dashboard</button>
            </div>
          )}
        </div>
        
        <div className="bg-white/5 p-4 text-center border-t border-border">
          <p className="text-[9px] text-muted-foreground flex items-center justify-center gap-1.5 uppercase tracking-widest font-bold">
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
  const [tradeAction, setTradeAction] = useState<'buy' | 'retire'>('retire'); 

  useEffect(() => {
    setMounted(true);
    // Ensure scroll resets when mounting
    window.scrollTo(0,0);
  }, []);

  const totalCost = (quantity * project.pricePerCredit);

  // Cap trust score to a maximum of 99 (two digits)
  const cappedTrust = Math.max(0, Math.min(99, Math.round(project.trustScore || 0)));

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30 animate-in fade-in duration-500">
      
      <PaymentModal 
        isOpen={isPaymentOpen} 
        onClose={() => setIsPaymentOpen(false)} 
        project={project}
        quantity={quantity}
        action={tradeAction}
      />

      {/* --- 1. CINEMATIC HERO (60vh) --- */}
      <div className="relative h-[65vh] w-full overflow-hidden border-b border-border group bg-card">
        <div className="absolute top-24 left-6 z-30">
          <button onClick={onBack} className="flex items-center gap-2 px-3 py-3  rounded-full bg-emerald-500 backdrop-blur border border-border text-foreground text-xs font-bold uppercase tracking-widest hover:bg-primary hover:text-white transition-all hover:-translate-x-1 ">
            <ArrowLeft className="w-4 h-4 " /> Market Index
          </button>
        </div>

        <div className="absolute inset-0 z-0">
           <img src={project.image} alt={project.projectName} className={`w-full h-full object-cover transition-transform duration-[30s] ease-out ${mounted ? 'scale-105' : 'scale-100'}`} />
           <div className="absolute inset-0 bg-gradient-to-t from-white/10 via-white/70 to-transparent" />
           <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:100px_100px] opacity-30" />
        </div>

        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 z-20">
          <div className="max-w-[1600px] mx-auto">
             <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div className="max-w-4xl space-y-6">
                   <div className="flex flex-wrap items-center gap-3 animate-in slide-in-from-bottom-4 duration-500">
                      <span className="px-3 py-1 bg-emerald-50 text-emerald-600 border border-emerald-100 text-[10px] font-bold uppercase tracking-wider rounded backdrop-blur-md flex items-center gap-2">
                         <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                         {project.projectType}
                      </span>
                      <span className="px-3 py-1 bg-white text-foreground border border-border text-[10px] font-bold uppercase tracking-wider rounded backdrop-blur-md flex items-center gap-1">
                        <Globe2 className="w-3 h-3" /> {project.country}
                      </span>
                      <span className="px-3 py-1 bg-white/90 text-muted-foreground border border-border text-[10px] font-bold uppercase tracking-wider rounded backdrop-blur-md font-mono">
                        ID: {project.unicId}
                      </span>
                   </div>
                   <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-[0.9] animate-in slide-in-from-bottom-6 duration-700">{project.projectName}</h1>
                   <div className="flex items-center gap-6 text-sm text-muted-foreground font-mono animate-in slide-in-from-bottom-8 duration-700">
                      <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-emerald-500" /> {project.location}</span>
                      <span className="text-muted-foreground">|</span>
                      <span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-emerald-500" /> Vintage: {project.vintage}</span>
                      <span className="text-muted-foreground">|</span>
                      <span className="flex items-center gap-2"><Shield className="w-4 h-4 text-emerald-500" /> {project.registry} Verified</span>
                   </div>
                </div>
                
                <div className="hidden xl:block text-right animate-in fade-in zoom-in duration-1000 delay-200">
                   <div className="relative inline-block">
                      <svg className="w-32 h-32 transform -rotate-90">
                         <circle cx="64" cy="64" r="60" stroke="#E6EEF3" strokeWidth="6" fill="transparent" />
                         <circle cx="64" cy="64" r="60" stroke="#10b981" strokeWidth="6" fill="transparent" strokeDasharray="377" strokeDashoffset={377 - (377 * cappedTrust) / 100} className="transition-all duration-[2s] ease-out" />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                         <span className="text-4xl font-bold text-foreground">{cappedTrust}</span>
                         <span className="text-[9px] uppercase tracking-widest text-muted-foreground font-bold">Trust Score</span>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* --- 2. MAIN LAYOUT (Split Intelligence) --- */}
      <div className="max-w-[1600px] mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-12 gap-12">
           
           {/* LEFT COLUMN: INTEL (8 cols) */}
           <div className="lg:col-span-8 space-y-12">
              
              {/* Mission Statement */}
              <section className="bg-card/80 border border-border p-8 rounded-2xl">
                 <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-4 flex items-center gap-2"><Leaf className="w-4 h-4 text-emerald-500" /> Executive Summary</h3>
                 <p className="text-xl md:text-2xl text-foreground leading-relaxed font-light">This project protects critical biodiversity hotspots by engaging local communities in sustainable land management. It prevents deforestation across <span className="text-foreground font-medium border-b border-emerald-500">120,000 hectares</span> of primary rainforest.</p>
              </section>

              {/* Data Grid */}
              <section>
                 <div className="flex items-center justify-between mb-6"><h3 className="text-sm font-bold text-foreground uppercase tracking-widest flex items-center gap-2"><BarChart3 className="w-4 h-4 text-emerald-500" /> Key Metrics</h3></div>
                 <div className="grid sm:grid-cols-3 gap-4">
                    <MetricCard label="Total Volume" value={project.availableCredits.toLocaleString()} sub="Available Tonnes" icon={Layers} delay="0ms" />
                    <MetricCard label="Protection Area" value="125k" sub="Hectares" icon={MapPin} delay="100ms" />
                    <MetricCard label="Bio-Density" value="98.4" sub="Percentile Rank" icon={Activity} delay="200ms" />
                 </div>
              </section>

              {/* Geospatial Map (Interactive Look) */}
              <section>
                 <div className="flex items-center justify-between mb-6">
                    <h3 className="text-sm font-bold text-foreground uppercase tracking-widest flex items-center gap-2"><Satellite className="w-4 h-4 text-emerald-500" /> Geospatial Verification</h3>
                    <button className="text-[10px] text-primary uppercase tracking-widest font-bold hover:text-primary-foreground border border-border px-3 py-1 rounded bg-white/50 transition-all flex items-center gap-2"><Maximize2 className="w-3 h-3" /> Expand Map</button>
                 </div>
                 <div className="h-[400px] w-full bg-card rounded-2xl border border-border relative overflow-hidden group">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-40 group-hover:scale-105 transition-transform duration-[2s]" />
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
                    
                    {/* Map UI Elements */}
                    <div className="absolute top-6 left-6 bg-white/90 backdrop-blur border border-border p-3 rounded-xl shadow">
                       <p className="text-[9px] text-muted-foreground uppercase font-bold tracking-widest mb-1">Target Coordinates</p>
                       <p className="text-sm font-mono text-emerald-600">03°08'12"S, 60°01'15"W</p>
                    </div>

                    {/* Active Scan Region */}
                    <div className="absolute top-1/3 left-1/3 w-64 h-48 border-2 border-emerald-200 bg-emerald-50 rounded-lg flex items-center justify-center">
                        <div className="text-emerald-600 font-mono text-xs font-bold bg-white/70 px-2 py-1">ZONE A4: VERIFIED</div>
                    </div>
                 </div>
              </section>

              {/* Verification Log */}
              <section>
                 <h3 className="text-sm font-bold text-foreground uppercase tracking-widest mb-6 flex items-center gap-2"><FileText className="w-4 h-4 text-emerald-500" /> Audit Log</h3>
                 <div className="bg-card rounded-2xl p-8 border border-border">
                    <TimelineItem date="OCT 12, 2023" title="Q3 Monitoring Report Verified" status="complete" />
                    <TimelineItem date="AUG 01, 2023" title="Satellite Biomass Scan" status="complete" />
                    <TimelineItem date="JUN 15, 2023" title="Community Benefit Audit" status="complete" />
                    <TimelineItem date="PENDING" title="2024 Annual Issuance" status="pending" />
                 </div>
              </section>
           </div>

           {/* RIGHT COLUMN: TRADE TERMINAL (Sticky) */}
           <div className="lg:col-span-4">
              <div className="sticky top-28">
                 
                 {/* Order Ticket */}
                 <div className="bg-card border border-border rounded-2xl p-6 shadow relative overflow-hidden group">
                    <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${tradeAction === 'retire' ? 'from-emerald-500 to-cyan-500' : 'from-sky-500 to-indigo-500'}`} />
                    
                    {/* Action Toggle */}
                    <div className="flex bg-white/5 p-1 rounded-xl mb-6">
                       <button onClick={() => setTradeAction('buy')} className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${tradeAction === 'buy' ? 'bg-sky-600 text-white shadow' : 'text-muted-foreground hover:text-foreground'}`}>Trade (Hold)</button>
                       <button onClick={() => setTradeAction('retire')} className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${tradeAction === 'retire' ? 'bg-emerald-600 text-white shadow' : 'text-muted-foreground hover:text-foreground'}`}>Offset (Retire)</button>
                    </div>
                    
                    <div className="mb-8">
                       <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2">Market Price</p>
                       <div className="flex items-end gap-3">
                          <span className="text-5xl font-mono font-bold text-foreground tracking-tighter">${project.pricePerCredit.toFixed(2)}</span>
                          <span className={`text-sm mb-2 font-mono ${tradeAction === 'retire' ? 'text-emerald-600' : 'text-sky-600'}`}>USD / t</span>
                       </div>
                    </div>

                    <div className="space-y-6">
                       {/* Quantity Input */}
                       <div className={`bg-white/5 border border-border rounded-xl p-4 transition-colors focus-within:border-opacity-50 ${tradeAction === 'retire' ? 'focus-within:border-emerald-500' : 'focus-within:border-sky-500'}`}>
                          <div className="flex justify-between mb-2">
                             <label className="text-[9px] uppercase font-bold text-muted-foreground tracking-widest">Quantity (Tonnes)</label>
                             <span className="text-[9px] text-emerald-600 font-mono tracking-widest">MAX: {project.availableCredits}</span>
                          </div>
                          <div className="flex items-center justify-between">
                             <input 
                                type="number" 
                                min="1"
                                value={quantity}
                                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 0))}
                                className="w-full bg-transparent text-2xl font-mono font-bold text-foreground outline-none placeholder:text-muted-foreground"
                             />
                             <span className="text-xs text-muted-foreground font-bold uppercase">tCO₂e</span>
                          </div>
                       </div>

                       {/* Summary */}
                       <div className="space-y-3 py-4 border-t border-dashed border-border">
                          <div className="flex justify-between text-xs font-mono"><span className="text-muted-foreground">Subtotal</span><span className="text-foreground">${totalCost.toFixed(2)}</span></div>
                          <div className="flex justify-between text-xs font-mono"><span className="text-muted-foreground">Fees (1%)</span><span className="text-foreground">${(totalCost * 0.01).toFixed(2)}</span></div>
                          <div className="flex justify-between text-base pt-3 border-t border-border"><span className="text-foreground font-bold text-sm uppercase tracking-wide">Total Allocation</span><span className={`font-mono font-bold ${tradeAction === 'retire' ? 'text-emerald-600' : 'text-sky-600'}`}>${(totalCost * 1.01).toFixed(2)}</span></div>
                       </div>

                       {/* Action Button */}
                       <button 
                          onClick={() => setIsPaymentOpen(true)}
                          className={`w-full py-4 text-white font-bold text-sm uppercase tracking-widest rounded-xl transition-all hover:scale-[1.02] shadow flex items-center justify-center gap-2 ${tradeAction === 'retire' ? 'bg-emerald-600 hover:bg-emerald-500' : 'bg-sky-600 hover:bg-sky-500'}`}
                       >
                          {tradeAction === 'retire' ? 'Initialize Retirement' : 'Add to Portfolio'} <ArrowRight className="w-4 h-4" />
                       </button>

                       <p className="text-[10px] text-muted-foreground text-center leading-relaxed px-4">
                          Assets are retired immediately upon settlement. <br/> Secured by <span className="text-muted-foreground">Offset Ledger™</span>.
                       </p>
                    </div>
                 </div>

                 {/* Verification Badge */}
                 <div className="mt-4 flex items-center gap-3 p-4 rounded-xl bg-emerald-50/40 border border-emerald-100 backdrop-blur-sm">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    <div>
                       <p className="text-xs font-bold text-emerald-600 uppercase tracking-wide">Verified Asset</p>
                       <p className="text-[10px] text-muted-foreground">Double-spend protection active.</p>
                    </div>
                 </div>

              </div>
           </div>

        </div>
      </div>
    </div>
  );
}
