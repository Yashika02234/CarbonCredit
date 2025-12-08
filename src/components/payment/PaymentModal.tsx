import React, { useState, useEffect } from 'react';
import { X, ShieldCheck, Loader2, ArrowRight, CheckCircle2, CreditCard, Leaf } from 'lucide-react';
import { CarbonCredit } from '../../lib/types';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: CarbonCredit;
  quantity: number;
}

export default function PaymentModal({ isOpen, onClose, project, quantity }: PaymentModalProps) {
  const [step, setStep] = useState<'review' | 'processing' | 'success'>('review');

  useEffect(() => {
    if (isOpen) setStep('review');
  }, [isOpen]);

  if (!isOpen) return null;

  const totalCost = project.pricePerCredit * quantity;
  const fees = totalCost * 0.01; 
  const finalTotal = totalCost + fees;

  const handlePurchase = async () => {
    setStep('processing');
    // Simulate transaction time
    await new Promise(resolve => setTimeout(resolve, 2500));
    setStep('success');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      
      {/* 1. Cinematic Backdrop */}
      <div 
        className="absolute inset-0 bg-[#050505]/90 backdrop-blur-xl transition-opacity animate-in fade-in duration-300" 
        onClick={onClose}
      />

      {/* 2. The "Transaction Window" */}
      <div className="relative w-full max-w-lg bg-[#0A0A0A] border border-white/10 rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between p-6 border-b border-white/5 bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className={`w-2.5 h-2.5 rounded-full ${step === 'processing' ? 'bg-yellow-400 animate-pulse' : step === 'success' ? 'bg-emerald-400' : 'bg-slate-400'}`} />
            <span className="text-xs font-mono font-bold text-slate-300 uppercase tracking-widest">
              {step === 'review' && 'Confirm Allocation'}
              {step === 'processing' && 'Processing Chain'}
              {step === 'success' && 'Asset Retired'}
            </span>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-8 overflow-y-auto custom-scrollbar">
          
          {/* STEP 1: REVIEW */}
          {step === 'review' && (
            <div className="space-y-8 animate-in slide-in-from-right-4 duration-300">
              
              {/* Asset Ticket */}
              <div className="bg-white/5 rounded-2xl p-5 border border-white/5 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500" />
                <div className="flex justify-between items-start mb-4">
                   <div>
                      <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Asset ID</p>
                      <p className="text-xs font-mono text-emerald-400">{project.unicId}</p>
                   </div>
                   <div className="text-right">
                      <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Vintage</p>
                      <p className="text-xs font-mono text-white">{project.vintage}</p>
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

              {/* Financials */}
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
                  <span className="text-emerald-400 font-mono font-bold">${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Payment Method Stub */}
              <div className="flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-black/40">
                <div className="w-10 h-6 bg-slate-200 rounded flex items-center justify-center">
                   <div className="w-6 h-6 rounded-full bg-red-500 opacity-80 -mr-3" />
                   <div className="w-6 h-6 rounded-full bg-yellow-500 opacity-80" />
                </div>
                <div>
                   <p className="text-xs text-white font-bold">Mastercard •••• 4242</p>
                   <p className="text-[10px] text-slate-500">Expires 12/28</p>
                </div>
                <div className="ml-auto">
                   <ShieldCheck className="w-4 h-4 text-emerald-500" />
                </div>
              </div>

              <button
                onClick={handlePurchase}
                className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm uppercase tracking-widest rounded-xl shadow-lg shadow-emerald-900/20 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
              >
                Confirm Allocation <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* STEP 2: PROCESSING */}
          {step === 'processing' && (
            <div className="py-12 flex flex-col items-center justify-center text-center animate-in fade-in zoom-in-95">
              <div className="relative mb-8">
                {/* Rings */}
                <div className="absolute inset-0 rounded-full border-2 border-emerald-500/20 animate-ping duration-1000" />
                <div className="absolute inset-[-10px] rounded-full border border-emerald-500/10 animate-pulse duration-2000" />
                
                {/* Spinner */}
                <div className="w-20 h-20 rounded-full border-2 border-t-emerald-400 border-r-emerald-500/50 border-b-transparent border-l-transparent animate-spin flex items-center justify-center bg-black/50 backdrop-blur-md">
                   <Loader2 className="w-8 h-8 text-emerald-400 animate-pulse" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2 tracking-tight">Securing Assets</h3>
              <div className="space-y-1">
                 <p className="text-[10px] font-mono text-emerald-500/80 uppercase tracking-widest animate-pulse">Writing to Ledger...</p>
                 <p className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">Block #1928374</p>
              </div>
            </div>
          )}

          {/* STEP 3: SUCCESS */}
          {step === 'success' && (
            <div className="py-4 flex flex-col items-center text-center animate-in zoom-in-95 duration-500">
              <div className="w-24 h-24 bg-emerald-500/10 rounded-full flex items-center justify-center mb-6 border border-emerald-500/20 shadow-[0_0_40px_-10px_rgba(16,185,129,0.3)]">
                <CheckCircle2 className="w-12 h-12 text-emerald-400" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">Retired.</h3>
              <p className="text-slate-400 max-w-xs mx-auto mb-8 text-sm leading-relaxed">
                <span className="text-white font-bold">{quantity} tonnes</span> have been permanently removed from circulation.
              </p>
              
              {/* Receipt Preview */}
              <div className="w-full bg-white/5 border border-white/5 rounded-xl p-4 mb-8 flex items-center gap-4 text-left">
                 <div className="w-10 h-10 bg-slate-800 rounded flex items-center justify-center text-emerald-500">
                    <Leaf className="w-5 h-5" />
                 </div>
                 <div>
                    <p className="text-xs font-bold text-white">Retirement Certificate</p>
                    <p className="text-[10px] font-mono text-slate-500">ID: CERT-{Math.floor(Math.random() * 999999)}</p>
                 </div>
                 <button className="ml-auto text-xs font-bold text-emerald-400 hover:text-emerald-300">
                    Download PDF
                 </button>
              </div>

              <button 
                onClick={onClose}
                className="w-full py-4 bg-white text-black font-bold text-sm uppercase tracking-widest rounded-xl hover:bg-slate-200 transition-colors"
              >
                Return to Dashboard
              </button>
            </div>
          )}
        </div>
        
        {/* Footer Security Badge */}
        <div className="bg-black/40 p-4 text-center border-t border-white/5 backdrop-blur-md">
          <p className="text-[9px] text-slate-600 flex items-center justify-center gap-1.5 uppercase tracking-widest font-bold">
            <ShieldCheck className="w-3 h-3" /> End-to-End Encryption
          </p>
        </div>
      </div>
    </div>
  );
}