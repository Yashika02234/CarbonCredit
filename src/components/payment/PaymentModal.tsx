import React, { useState, useEffect } from 'react';
import { X, CreditCard, CheckCircle2, Lock, Loader2, Leaf, ArrowRight, ShieldCheck } from 'lucide-react';
import { CarbonCredit } from '../../lib/types';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: CarbonCredit;
  quantity: number;
}

export default function PaymentModal({ isOpen, onClose, project, quantity }: PaymentModalProps) {
  const [step, setStep] = useState<'review' | 'payment' | 'processing' | 'success'>('review');
  const totalCost = (quantity * project.pricePerCredit).toFixed(2);

  // Reset state when opening
  useEffect(() => {
    if (isOpen) setStep('review');
  }, [isOpen]);

  const handlePayment = () => {
    setStep('processing');
    // Simulate API call
    setTimeout(() => {
      setStep('success');
    }, 3000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop with blur */}
      <div 
        className="absolute inset-0 bg-[#020617]/90 backdrop-blur-md transition-opacity duration-500" 
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-white/10 bg-[#0B0C15] shadow-2xl shadow-emerald-900/20 animate-in fade-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/5 p-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Leaf className="h-4 w-4" />
            </div>
            <span className="font-bold text-white">Offset Checkout</span>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6">
          
          {/* STEP 1: REVIEW ORDER */}
          {step === 'review' && (
            <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
              <div className="rounded-2xl bg-slate-900/50 border border-white/5 p-4 flex gap-4 items-start">
                <img src={project.image} alt="Project" className="w-20 h-20 rounded-lg object-cover opacity-80" />
                <div>
                  <h3 className="font-bold text-white text-lg">{project.projectName}</h3>
                  <p className="text-xs text-slate-400 font-mono mt-1">{project.unicId}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20">
                      Vintage {project.vintage}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm text-slate-400">
                  <span>Quantity</span>
                  <span className="text-white font-mono">{quantity} tonnes</span>
                </div>
                <div className="flex justify-between text-sm text-slate-400">
                  <span>Price per credit</span>
                  <span className="text-white font-mono">${project.pricePerCredit}</span>
                </div>
                <div className="h-px w-full bg-white/10" />
                <div className="flex justify-between items-end">
                  <span className="text-sm font-medium text-white">Total Due</span>
                  <span className="text-2xl font-bold text-emerald-400">${totalCost}</span>
                </div>
              </div>

              <button 
                onClick={() => setStep('payment')}
                className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-[0_0_20px_-5px_rgba(16,185,129,0.4)] transition-all flex items-center justify-center gap-2 group"
              >
                Proceed to Payment
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          )}

          {/* STEP 2: PAYMENT FORM (Mock Stripe) */}
          {step === 'payment' && (
            <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
               <div className="text-center">
                 <h3 className="text-xl font-bold text-white mb-1">Payment Method</h3>
                 <p className="text-xs text-slate-400">Secured by Stripe Encryption</p>
               </div>

               <div className="space-y-4">
                 <div className="space-y-1.5">
                   <label className="text-xs font-medium text-slate-400 uppercase">Card Number</label>
                   <div className="relative">
                     <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                     <input type="text" placeholder="0000 0000 0000 0000" className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors font-mono" />
                   </div>
                 </div>
                 
                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-400 uppercase">Expiry</label>
                      <input type="text" placeholder="MM/YY" className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors font-mono" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-400 uppercase">CVC</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-3 w-3 text-slate-500" />
                        <input type="text" placeholder="123" className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors font-mono" />
                      </div>
                    </div>
                 </div>
               </div>

               <button 
                onClick={handlePayment}
                className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg transition-all"
              >
                Pay ${totalCost}
              </button>
            </div>
          )}

          {/* STEP 3: PROCESSING (Animation) */}
          {step === 'processing' && (
            <div className="py-12 flex flex-col items-center justify-center text-center animate-in fade-in duration-500">
               <div className="relative mb-6">
                 <div className="absolute inset-0 rounded-full border-2 border-emerald-500/20 animate-ping" />
                 <div className="relative h-16 w-16 rounded-full border-2 border-t-emerald-500 border-r-emerald-500 border-b-transparent border-l-transparent animate-spin flex items-center justify-center">
                 </div>
                 <div className="absolute inset-0 flex items-center justify-center">
                    <ShieldCheck className="h-6 w-6 text-emerald-400" />
                 </div>
               </div>
               <h3 className="text-xl font-bold text-white mb-2">Processing Transaction</h3>
               <p className="text-slate-400 text-sm animate-pulse">Verifying on the Blockchain...</p>
            </div>
          )}

          {/* STEP 4: SUCCESS (Certificate) */}
          {step === 'success' && (
            <div className="text-center animate-in zoom-in-95 duration-500">
               <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 mb-6 shadow-[0_0_30px_rgba(16,185,129,0.4)]">
                 <CheckCircle2 className="h-8 w-8" />
               </div>
               
               <h2 className="text-2xl font-bold text-white mb-2">Retirement Confirmed!</h2>
               <p className="text-slate-400 text-sm mb-8">You have successfully offset {quantity} tonnes of Carbon.</p>

               {/* Digital Certificate Card */}
               <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-800 to-slate-950 border border-emerald-500/30 p-6 text-left shadow-2xl">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-[50px] pointer-events-none" />
                 <div className="flex justify-between items-start mb-8">
                   <div className="flex items-center gap-2">
                      <Leaf className="h-5 w-5 text-emerald-400" />
                      <span className="font-bold text-white tracking-tight">Offset Certificate</span>
                   </div>
                   <span className="text-[10px] font-mono text-slate-500 border border-slate-700 px-2 py-1 rounded">#{Math.floor(Math.random() * 1000000)}</span>
                 </div>
                 
                 <div className="space-y-4 mb-8">
                    <div>
                      <p className="text-[10px] uppercase text-slate-500 tracking-wider">Issued To</p>
                      <p className="text-white font-medium">Guest User</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase text-slate-500 tracking-wider">Project</p>
                      <p className="text-white font-medium">{project.projectName}</p>
                    </div>
                    <div className="flex gap-8">
                      <div>
                        <p className="text-[10px] uppercase text-slate-500 tracking-wider">Amount</p>
                        <p className="text-emerald-400 font-bold text-lg">{quantity} tCO2e</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase text-slate-500 tracking-wider">Date</p>
                        <p className="text-white font-medium">{new Date().toLocaleDateString()}</p>
                      </div>
                    </div>
                 </div>
                 
                 <div className="pt-4 border-t border-white/10 flex justify-between items-center">
                   <span className="text-[10px] text-slate-600">Verified by {project.registry}</span>
                   <ShieldCheck className="h-4 w-4 text-emerald-500/50" />
                 </div>
               </div>

               <button 
                 onClick={onClose}
                 className="mt-8 text-sm text-slate-400 hover:text-white underline underline-offset-4 transition-colors"
               >
                 Close & Return to Explorer
               </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}