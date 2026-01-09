// src/components/explorer/ProjectDetail.tsx
import { useState, useEffect, useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { 
  ArrowLeft, 
  Leaf, 
  Globe2, 
  CheckCircle2, 
  X,
  CreditCard as CreditCardIcon, 
  Loader2,
  ArrowRight,
  Smartphone,
  ChevronDown,
  Trees,
  Wind,
  Search,
  Download,
  Calendar,
  Lock,
 
} from 'lucide-react';
import { CarbonCredit } from '../../lib/types';

interface ProjectDetailProps {
  project: CarbonCredit;
  onBack: () => void;
}

// --- THEME CONSTANTS ---
const THEME = {
  bg: "bg-[#FDFBF7]",
  card: "bg-[#F4F1E8]",
  textMain: "text-[#2F3E33]",
  textSub: "text-[#5C6F66]",
  greenDark: "bg-[#4F6F52]",
  greenLight: "bg-[#9CCBA0]",
  greenSoft: "bg-[#E8EFE8]",
  border: "border-[#EBE8E0]"
};

// --- HELPER: GENERATE PROPER PDF REPORT ---
const generateProjectReport = async (project: CarbonCredit) => {
  // We target the HIDDEN report template, not the main screen
  const element = document.getElementById('official-report-template');
  if (!element) {
    alert("Error finding report template.");
    return;
  }

  // Temporarily make it visible/positioned for capture (if needed by some browsers)
  // but usually absolute positioning off-screen works fine with html2canvas.
  
  try {
    const canvas = await html2canvas(element, { 
        scale: 2, // High resolution
        useCORS: true, // Allow images to load
        logging: false
    });
    
    const imgData = canvas.toDataURL('image/jpeg', 1.0);
    const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    
    pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${project.projectName.replace(/\s+/g, '_')}_Verified_Report.pdf`);
  } catch (err) {
    console.error("PDF Generation failed", err);
    alert("Could not generate report. Please try again.");
  }
};

// --- HIDDEN REPORT COMPONENT (A4 STYLED) ---
const ReportTemplate = ({ project }: { project: CarbonCredit }) => (
  <div 
    id="official-report-template" 
    className="absolute -left-[9999px] top-0 w-[794px] min-h-[1123px] bg-white text-slate-800 p-12 font-serif"
    style={{ fontFamily: 'Georgia, serif' }} // Enforce serif for formal look
  >
      {/* Header */}
      <div className="flex justify-between items-start border-b-2 border-slate-800 pb-6 mb-8">
          <div>
              <h1 className="text-3xl font-bold text-slate-900 uppercase tracking-wide">Verification Report</h1>
              <p className="text-sm text-slate-500 mt-1">Carbon Offset Issuance & Project Audit</p>
          </div>
          <div className="text-right">
              <div className="flex items-center justify-end gap-2 text-emerald-700 font-bold mb-1">
                  <Leaf className="w-5 h-5" /> Offset Platform
              </div>
              <p className="text-xs text-slate-400 font-sans">Report ID: OF-{Math.floor(Math.random()*100000)}</p>
              <p className="text-xs text-slate-400 font-sans">Date: {new Date().toLocaleDateString()}</p>
          </div>
      </div>

      {/* Main Project Info */}
      <div className="mb-10">
          <h2 className="text-xl font-bold text-slate-800 mb-4 border-l-4 border-emerald-600 pl-3">1. Project Summary</h2>
          <div className="grid grid-cols-2 gap-8">
              <div className="space-y-4">
                  <div>
                      <p className="text-xs uppercase font-sans font-bold text-slate-400">Project Name</p>
                      <p className="text-lg font-bold">{project.projectName}</p>
                  </div>
                  <div>
                      <p className="text-xs uppercase font-sans font-bold text-slate-400">Location</p>
                      <p className="text-base">{project.location}, {project.country}</p>
                  </div>
              </div>
              <div className="space-y-4">
                  <div className="flex justify-between border-b border-slate-100 pb-2">
                      <span className="text-sm text-slate-500">Project Type</span>
                      <span className="font-bold text-slate-800">{project.projectType}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 pb-2">
                      <span className="text-sm text-slate-500">Registry Standard</span>
                      <span className="font-bold text-slate-800">{project.registry}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 pb-2">
                      <span className="text-sm text-slate-500">Vintage Year</span>
                      <span className="font-bold text-slate-800">{project.vintage}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 pb-2">
                      <span className="text-sm text-slate-500">Unique Identifier</span>
                      <span className="font-mono text-xs font-bold text-slate-600">{project.unicId}</span>
                  </div>
              </div>
          </div>
      </div>

      {/* Impact Data */}
      <div className="mb-10 bg-slate-50 p-6 rounded-xl border border-slate-200">
          <h2 className="text-xl font-bold text-slate-800 mb-6 border-l-4 border-emerald-600 pl-3">2. Impact Metrics</h2>
          
          <div className="grid grid-cols-3 gap-6 text-center mb-8">
              <div className="p-4 bg-white rounded shadow-sm">
                  <p className="text-3xl font-bold text-emerald-700">{project.availableCredits.toLocaleString()}</p>
                  <p className="text-xs uppercase font-sans font-bold text-slate-400 mt-1">tCO₂ Sequestered</p>
              </div>
              <div className="p-4 bg-white rounded shadow-sm">
                  <p className="text-3xl font-bold text-emerald-700">{project.trustScore || 92}/100</p>
                  <p className="text-xs uppercase font-sans font-bold text-slate-400 mt-1">Audit Trust Score</p>
              </div>
              <div className="p-4 bg-white rounded shadow-sm">
                  <p className="text-3xl font-bold text-emerald-700">210k</p>
                  <p className="text-xs uppercase font-sans font-bold text-slate-400 mt-1">Trees Equivalent</p>
              </div>
          </div>

          <div className="text-sm text-slate-600 leading-relaxed text-justify">
              This project has been rigorously audited against the {project.registry} methodology. 
              Remote sensing data combined with on-ground verification confirms that the carbon 
              sequestration targets for the vintage year {project.vintage} have been met or exceeded. 
              The project contributes directly to UN Sustainable Development Goals (SDGs) #13 (Climate Action) 
              and #15 (Life on Land).
          </div>
      </div>

      {/* Verification Stamp Area */}
      <div className="mt-12 flex justify-between items-end border-t-2 border-slate-800 pt-8">
          <div>
              <p className="text-xs font-sans text-slate-400 mb-4">Digitally Signed by:</p>
              <div className="h-12 w-48 border-b border-dashed border-slate-400 mb-2 relative">
                  <span className="absolute bottom-2 left-0 font-script text-2xl text-slate-800 italic">Offset Verification Team</span>
              </div>
              <p className="text-xs font-bold text-slate-800">Authorized Auditor</p>
          </div>

          {/* STAMP */}
          <div className="border-4 border-emerald-600 text-emerald-600 rounded p-2 px-4 transform -rotate-12 opacity-80 select-none">
              <p className="text-xl font-black uppercase tracking-widest text-center">VERIFIED</p>
              <p className="text-[10px] font-bold text-center uppercase">Offset Ledger</p>
          </div>
      </div>

      {/* Footer */}
      <div className="mt-auto pt-12 text-center">
          <p className="text-[10px] text-slate-400 font-sans">
              This document is a formal record of the project's status at the time of generation. 
              It does not constitute a financial receipt for a specific transaction unless accompanied by a Transaction Hash.
          </p>
      </div>
  </div>
);

// --- SUB-COMPONENT: AREA CHART (UI ONLY) ---
const ImpactAreaChart = () => (
  <div className="relative h-64 w-full">
    <div className="absolute inset-0 flex flex-col justify-between text-[10px] text-[#8C9E96] font-medium pointer-events-none z-0 py-2">
       {[600, 500, 400, 250].map((val, i) => (
         <div key={i} className="flex items-center w-full">
            <span className="w-8 text-right mr-2 opacity-50">{val}k</span>
            <div className="h-[1px] w-full bg-[#D6D3C9]/40"></div>
         </div>
       ))}
    </div>
    <svg viewBox="0 0 100 50" preserveAspectRatio="none" className="absolute inset-0 w-full h-full z-10 pl-10 pb-6 pt-4">
      <defs>
        <linearGradient id="chartFill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#9CCBA0" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#9CCBA0" stopOpacity="0.1" />
        </linearGradient>
      </defs>
      <path d="M0,50 L10,48 L20,45 L30,40 L40,35 L50,30 L60,25 L70,18 L80,12 L90,8 L100,5 V50 H0 Z" fill="url(#chartFill)" stroke="none" />
      <path d="M0,50 L10,48 L20,45 L30,40 L40,35 L50,30 L60,25 L70,18 L80,12 L90,8 L100,5" fill="none" stroke="#4F6F52" strokeWidth="0.5" />
      {[ {x: 20, y: 45}, {x: 40, y: 35}, {x: 60, y: 25}, {x: 80, y: 12} ].map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="1" fill="#2F3E33" stroke="#FDFBF7" strokeWidth="0.5" />
      ))}
    </svg>
    <div className="absolute bottom-0 left-10 right-0 flex justify-between text-[10px] text-[#8C9E96] font-medium">
       {['2019', '2020', '2021', '2022', '2023', '2024', '2025'].map(y => <span key={y}>{y}</span>)}
    </div>
    <div className="absolute top-4 right-4 bg-white shadow-sm border border-[#EBE8E0] px-3 py-1.5 rounded-lg text-center">
       <p className="text-xs font-bold text-[#2F3E33]">616,000</p>
       <p className="text-[9px] text-[#5C6F66] uppercase">Offset</p>
    </div>
  </div>
);

// --- SUB-COMPONENT: IMPACT STATS ---
const ImpactStats = () => (
  <div className="flex flex-col md:flex-row items-center gap-12 h-full w-full">
     <div className="flex-shrink-0">
        <div className="relative w-32 h-32">
           <svg viewBox="0 0 36 36" className="w-full h-full rotate-[-90deg]">
              <path className="text-[#E8EFE8]" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" />
              <path className="text-[#4F6F52]" strokeDasharray="75, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
           </svg>
           <div className="absolute inset-0 flex flex-col items-center justify-center text-[#2F3E33]">
              <span className="text-3xl font-serif font-bold">350</span>
              <span className="text-[9px] uppercase font-bold tracking-widest text-[#5C6F66]">Species</span>
           </div>
        </div>
     </div>
     <div className="flex-1 w-full h-32 flex items-end justify-between gap-4">
        {[30, 45, 60, 80, 55, 75, 90].map((h, i) => (
           <div key={i} className="flex-1 h-full flex flex-col justify-end gap-2 group">
              <div className={`w-full rounded-t-sm transition-all duration-500 group-hover:opacity-80 ${i % 2 === 0 ? 'bg-[#4F6F52]' : 'bg-[#9CCBA0]'}`} style={{ height: `${h}%` }} />
              <span className="text-[10px] text-center font-bold text-[#8C9E96]">20{18+i}</span>
           </div>
        ))}
     </div>
  </div>
);

// --- PAYMENT MODAL ---
function PaymentModal({ isOpen, onClose, project, quantity }: any) {
  const [step, setStep] = useState('review');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');

  useEffect(() => {
    if (isOpen) {
      setStep('review');
      setPaymentMethod('card');
      setCardName('');
      setCardNumber('');
      setExpiry('');
      setCvc('');
    }
  }, [isOpen]);

  if (!isOpen) return null;
  
  const handleProcess = async (e: React.FormEvent) => {
    e.preventDefault();
    setStep('processing');
    await new Promise(resolve => setTimeout(resolve, 3000));
    setStep('success');
  }

  const total = (project.pricePerCredit * quantity).toFixed(2);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[#2F3E33]/40 backdrop-blur-sm transition-opacity" onClick={onClose} />
      
      <div className="relative w-full max-w-md bg-[#FDFBF7] rounded-[2rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between p-6 border-b border-[#EBE8E0]">
           <h3 className="font-serif text-xl text-[#2F3E33]">
             {step === 'review' ? 'Checkout' : step === 'processing' ? 'Processing' : 'Completed'}
           </h3>
           <button onClick={onClose} className="text-[#5C6F66] hover:text-[#2F3E33]"><X className="w-5 h-5"/></button>
        </div>

        <div className="p-6 overflow-y-auto">
          {step === 'review' && (
            <div className="space-y-6">
               <div className="bg-[#F4F1E8] p-4 rounded-xl flex gap-4">
                  <img src={project.image} className="w-16 h-16 rounded-lg object-cover" alt="" />
                  <div>
                     <p className="font-bold text-[#2F3E33]">{project.projectName}</p>
                     <p className="text-xs text-[#5C6F66]">{quantity} Tonnes • {project.vintage}</p>
                     <p className="font-mono text-emerald-700 mt-1">${total}</p>
                  </div>
               </div>
               
               <div className="grid grid-cols-2 gap-3">
                  {['card', 'upi'].map(m => (
                    <button 
                      key={m}
                      onClick={() => setPaymentMethod(m)}
                      className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${paymentMethod === m ? 'border-[#4F6F52] bg-[#E8EFE8]' : 'border-transparent bg-[#F4F1E8]'}`}
                    >
                       {m === 'card' ? <CreditCardIcon className="w-5 h-5 mb-1" /> : <Smartphone className="w-5 h-5 mb-1"/>}
                       <span className="text-xs font-bold uppercase">{m}</span>
                    </button>
                  ))}
               </div>

               {paymentMethod === 'card' && (
                 <form onSubmit={handleProcess} className="space-y-4 animate-in fade-in slide-in-from-top-2">
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase text-[#5C6F66] tracking-wider">Cardholder Name</label>
                        <input required type="text" placeholder="John Doe" className="w-full bg-white border border-[#EBE8E0] p-3 rounded-xl text-sm outline-none focus:border-[#4F6F52] transition-colors" value={cardName} onChange={e => setCardName(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase text-[#5C6F66] tracking-wider">Card Number</label>
                        <div className="relative">
                            <CreditCardIcon className="absolute left-3 top-3 w-4 h-4 text-[#8C9E96]" />
                            <input required type="text" maxLength={19} placeholder="0000 0000 0000 0000" className="w-full bg-white border border-[#EBE8E0] p-3 pl-10 rounded-xl text-sm outline-none focus:border-[#4F6F52] transition-colors font-mono" value={cardNumber} onChange={e => setCardNumber(e.target.value)} />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase text-[#5C6F66] tracking-wider">Expiry</label>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-3 w-4 h-4 text-[#8C9E96]" />
                                <input required type="text" maxLength={5} placeholder="MM/YY" className="w-full bg-white border border-[#EBE8E0] p-3 pl-10 rounded-xl text-sm outline-none focus:border-[#4F6F52] transition-colors font-mono" value={expiry} onChange={e => setExpiry(e.target.value)} />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase text-[#5C6F66] tracking-wider">CVC</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 w-4 h-4 text-[#8C9E96]" />
                                <input required type="text" maxLength={3} placeholder="123" className="w-full bg-white border border-[#EBE8E0] p-3 pl-10 rounded-xl text-sm outline-none focus:border-[#4F6F52] transition-colors font-mono" value={cvc} onChange={e => setCvc(e.target.value)} />
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="w-full py-4 bg-[#4F6F52] text-white font-bold rounded-xl hover:bg-[#3E5842] transition-colors flex items-center justify-center gap-2 mt-4">
                      Pay ${total} <ArrowRight className="w-4 h-4" />
                    </button>
                 </form>
               )}

               {paymentMethod === 'upi' && (
                 <div className="bg-white border border-[#EBE8E0] p-6 rounded-2xl flex flex-col items-center text-center animate-in fade-in slide-in-from-top-2">
                    <p className="text-xs font-bold text-[#5C6F66] mb-4 uppercase tracking-wider">Scan to Pay ${total}</p>
                    <div className="p-2 bg-white rounded-xl shadow-sm border border-gray-100 mb-4">
                        <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=offset@bank&pn=OffsetPlatform&am=${total}&cu=USD`} alt="UPI QR Code" className="w-32 h-32" />
                    </div>
                    <p className="text-[10px] text-[#8C9E96] mb-6">Supported by GPay, PhonePe, Paytm</p>
                    <button onClick={handleProcess} className="w-full py-4 bg-[#4F6F52] text-white font-bold rounded-xl hover:bg-[#3E5842] transition-colors flex items-center justify-center gap-2">
                      I Have Scanned & Paid <ArrowRight className="w-4 h-4" />
                    </button>
                 </div>
               )}
            </div>
          )}

          {step === 'processing' && (
             <div className="py-10 text-center space-y-4">
                <Loader2 className="w-10 h-10 text-[#4F6F52] animate-spin mx-auto" />
                <p className="text-[#5C6F66]">Verifying credentials...</p>
                <p className="text-xs text-[#8C9E96]">Please do not close this window</p>
             </div>
          )}

          {step === 'success' && (
             <div className="py-6 text-center space-y-4 animate-in zoom-in-95 duration-300">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
                   <CheckCircle2 className="w-8 h-8" />
                </div>
                <div>
                   <h4 className="text-xl font-serif text-[#2F3E33]">Payment Successful!</h4>
                   <p className="text-sm text-[#5C6F66] mt-2">You have successfully offset {quantity} tonnes.</p>
                </div>
                <button onClick={onClose} className="w-full py-3 bg-[#E8EFE8] text-[#2F3E33] font-bold rounded-xl">Close</button>
             </div>
          )}
        </div>
      </div>
    </div>
  )
}

// --- MAIN PAGE ---

export default function ProjectDetail({ project, onBack }: ProjectDetailProps) {
  const [quantity] = useState<number>(12);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  // Refs for Scrolling
  const overviewRef = useRef<HTMLDivElement>(null);
  const impactRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);

  const trustScore = project.trustScore || 92;

  const scrollToSection = (ref: any) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleBuyClick = () => {
    setIsPaymentOpen(true);
  };

  return (
    <div id="project-report-content" className={`min-h-screen ${THEME.bg} text-[#2F3E33] font-sans selection:bg-[#9CCBA0]/30`}>
      
      {/* Invisible Report Template for PDF Generation */}
      <ReportTemplate project={project} />

      <PaymentModal 
        isOpen={isPaymentOpen} 
        onClose={() => setIsPaymentOpen(false)} 
        project={project}
        quantity={quantity}
        action="buy"
      />

      <header className="relative pt-24 pb-8 px-6 md:px-12 max-w-7xl mx-auto" ref={overviewRef}>
         <button onClick={onBack} className="absolute top-8 left-6 md:left-12 flex items-center gap-2 text-[#5C6F66] hover:text-[#2F3E33] transition-colors text-sm font-bold uppercase tracking-wider">
            <ArrowLeft className="w-4 h-4" /> Back
         </button>

         <div className="mb-6">
            <h1 className="text-4xl md:text-5xl font-serif text-[#1A2F23] mb-2">{project.projectName}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-[#5C6F66]">
               <span className="font-medium">{project.country} – {project.location.split(',')[0]}</span>
               <span className="w-1 h-1 bg-[#D6D3C9] rounded-full" />
               <span className="bg-[#E8EFE8] px-2 py-0.5 rounded text-[#2F3E33] text-xs font-bold uppercase">{project.projectType}</span>
               <span className="bg-[#F4F1E8] px-2 py-0.5 rounded text-[#5C6F66] text-xs font-bold uppercase">Conservation</span>
            </div>
         </div>

         <div className="w-full h-[400px] rounded-[2rem] overflow-hidden relative shadow-sm border border-[#EBE8E0]">
            <img src={project.image} alt={project.projectName} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
            
            <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl flex items-center gap-3 shadow-sm">
               <div className="relative w-10 h-10 flex items-center justify-center">
                  <svg className="w-full h-full rotate-[-90deg]">
                     <circle cx="20" cy="20" r="18" stroke="#E6EEF3" strokeWidth="3" fill="none" />
                     <circle cx="20" cy="20" r="18" stroke="#10b981" strokeWidth="3" fill="none" strokeDasharray="113" strokeDashoffset={113 - (113 * trustScore) / 100} />
                  </svg>
                  <span className="absolute text-[10px] font-bold">{trustScore}</span>
               </div>
               <div>
                  <p className="text-[10px] uppercase font-bold text-[#8C9E96] tracking-wider">Trust Score</p>
                  <p className="text-xs font-bold text-[#2F3E33]">Excellent</p>
               </div>
            </div>
         </div>
      </header>

      <section className="bg-[#F4F1E8] border-y border-[#EBE8E0]">
         <div className="max-w-7xl mx-auto px-6 md:px-12 py-6">
            <div className="flex flex-wrap md:flex-nowrap items-center justify-between gap-8">
               <div className="flex-1">
                  <p className="text-3xl font-serif text-[#2F3E33] mb-1">{project.availableCredits.toLocaleString()}</p>
                  <p className="text-xs font-bold text-[#5C6F66] uppercase tracking-wider">tCO₂ Offset</p>
               </div>
               <div className="w-px h-12 bg-[#D6D3C9] hidden md:block" />
               <div className="flex-1">
                  <p className="text-3xl font-serif text-[#2F3E33] mb-1">${project.pricePerCredit.toFixed(2)}</p>
                  <p className="text-xs font-bold text-[#5C6F66] uppercase tracking-wider">per ton</p>
               </div>
               <div className="w-px h-12 bg-[#D6D3C9] hidden md:block" />
               <div className="flex-1">
                  <p className="text-3xl font-serif text-[#2F3E33] mb-1">{(project.availableCredits * 1.5).toLocaleString()}</p>
                  <p className="text-xs font-bold text-[#5C6F66] uppercase tracking-wider">Credits Available</p>
               </div>
            </div>
         </div>
      </section>

      <section className="sticky top-0 z-40 bg-[#FDFBF7]/90 backdrop-blur-md border-b border-[#EBE8E0]">
         <div className="max-w-7xl mx-auto px-6 md:px-12 py-3 flex items-center justify-between">
            <div className="flex items-center gap-1 md:gap-2">
               <button onClick={() => scrollToSection(overviewRef)} className="px-4 py-2 bg-[#F4F1E8] hover:bg-[#E8EFE8] rounded-lg text-sm font-bold text-[#2F3E33] flex items-center gap-2 transition-colors">
                 <Search className="w-4 h-4" /> Overview
               </button>
               <button onClick={() => scrollToSection(impactRef)} className="px-4 py-2 hover:bg-[#F4F1E8] rounded-lg text-sm font-medium text-[#5C6F66] transition-colors">Impact</button>
               <button onClick={() => scrollToSection(detailsRef)} className="px-4 py-2 hover:bg-[#F4F1E8] rounded-lg text-sm font-medium text-[#5C6F66] transition-colors flex items-center gap-1">
                  Details <ChevronDown className="w-3 h-3" />
               </button>
            </div>

            <button 
              onClick={handleBuyClick}
              className="bg-[#4F6F52] hover:bg-[#3E5842] text-white px-6 py-2.5 rounded-lg text-sm font-bold uppercase tracking-wider flex items-center gap-2 transition-all shadow-sm active:scale-95"
            >
               Buy Credits <ArrowRight className="w-4 h-4" />
            </button>
         </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 md:px-12 py-10 grid lg:grid-cols-3 gap-10">
         
         <div className="lg:col-span-2 space-y-10" ref={impactRef}>
            
            <section>
               <div className="bg-[#F4F1E8] rounded-[2rem] p-6 md:p-8 border border-[#EBE8E0] shadow-sm">
                  <div className="flex justify-between items-center mb-6">
                     <h3 className="text-lg font-serif text-[#2F3E33]">Projected Impact</h3>
                     <span className="bg-white px-3 py-1 rounded-full text-xs font-bold text-[#5C6F66] border border-[#EBE8E0]">2019 - 2024</span>
                  </div>
                  <ImpactAreaChart />
               </div>
            </section>

            <section>
               <h3 className="text-lg font-serif text-[#2F3E33] mb-4">Carbon Reduction Over Time</h3>
               <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-[#FDFBF7] border border-[#EBE8E0] rounded-[1.5rem] p-6 shadow-sm flex items-center gap-4">
                     <div className="w-12 h-12 bg-[#E8EFE8] rounded-full flex items-center justify-center text-[#4F6F52]"><CheckCircle2 className="w-6 h-6" /></div>
                     <div>
                        <p className="text-xs font-bold text-[#5C6F66] uppercase tracking-wide">CO₂ Sequestered</p>
                        <p className="text-2xl font-serif text-[#2F3E33]">{project.availableCredits.toLocaleString()} <span className="text-sm font-sans text-[#5C6F66]">tons</span></p>
                     </div>
                  </div>
                  <div className="bg-[#FDFBF7] border border-[#EBE8E0] rounded-[1.5rem] p-6 shadow-sm flex items-center gap-4">
                     <div className="w-12 h-12 bg-[#E8EFE8] rounded-full flex items-center justify-center text-[#4F6F52]"><Trees className="w-6 h-6" /></div>
                     <div>
                        <p className="text-xs font-bold text-[#5C6F66] uppercase tracking-wide">Equivalency</p>
                        <p className="text-2xl font-serif text-[#2F3E33]">210,000 <span className="text-sm font-sans text-[#5C6F66]">Trees</span></p>
                     </div>
                  </div>
               </div>
            </section>

            <section className="bg-[#F4F1E8] rounded-[2rem] p-8 border border-[#EBE8E0] shadow-sm">
               <div className="flex justify-between items-center mb-6">
                   <h3 className="text-lg font-serif text-[#2F3E33]">Impact Statistics</h3>
                   <Leaf className="w-5 h-5 text-[#9CCBA0]" />
               </div>
               <ImpactStats />
            </section>
         </div>

         <div className="space-y-8" ref={detailsRef}>
            
            <div className="bg-white rounded-[2rem] p-8 border border-[#EBE8E0] shadow-sm">
               <h3 className="text-lg font-serif text-[#2F3E33] mb-4">About Project</h3>
               <p className="text-[#5C6F66] leading-relaxed text-sm mb-6">
                 This project focuses on protecting specific areas of the Amazon Rainforest from deforestation. By engaging local communities in sustainable land management, it ensures the longevity of critical biodiversity hotspots.
               </p>
               
               <div className="space-y-4">
                  <div className="flex items-center gap-3">
                     <div className="w-8 h-8 rounded-full bg-[#E8EFE8] flex items-center justify-center"><Globe2 className="w-4 h-4 text-[#4F6F52]" /></div>
                     <span className="text-sm font-medium text-[#2F3E33]">{project.registry} Registry</span>
                  </div>
                  <div className="flex items-center gap-3">
                     <div className="w-8 h-8 rounded-full bg-[#E8EFE8] flex items-center justify-center"><Wind className="w-4 h-4 text-[#4F6F52]" /></div>
                     <span className="text-sm font-medium text-[#2F3E33]">{project.vintage} Vintage</span>
                  </div>
               </div>

               <button 
                 onClick={() => generateProjectReport(project)}
                 className="w-full mt-8 py-3 rounded-xl border border-[#EBE8E0] text-sm font-bold text-[#5C6F66] hover:bg-[#F4F1E8] transition-colors flex items-center justify-center gap-2 group"
               >
                  <Download className="w-4 h-4 group-hover:text-[#4F6F52]" /> Download Verified Report
               </button>
            </div>

            <div className="h-64 rounded-[2rem] overflow-hidden relative group">
               <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Map" />
               <div className="absolute inset-0 bg-[#2F3E33]/20 group-hover:bg-[#2F3E33]/10 transition-colors" />
               <div className="absolute bottom-4 left-4 bg-white px-3 py-1.5 rounded-lg shadow-sm">
                  <p className="text-[10px] uppercase font-bold text-[#8C9E96]">Location</p>
                  <p className="text-xs font-bold text-[#2F3E33]">{project.location}</p>
               </div>
            </div>
         </div>
      </main>
    </div>
  );
}