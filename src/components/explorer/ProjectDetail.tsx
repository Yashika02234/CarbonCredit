import React, { useState } from 'react';
import { ArrowLeft, MapPin, Shield, Calendar, Leaf, Activity } from 'lucide-react';
import { CarbonCredit } from '../../lib/types';
import PaymentModal from '../payment/PaymentModal'; // Import the new modal

interface ProjectDetailProps {
  project: CarbonCredit;
  onBack: () => void;
}

const StatCard = ({ label, value, sub }: { label: string, value: string | number, sub?: string }) => (
  <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl backdrop-blur-md relative overflow-hidden group hover:border-emerald-500/30 transition-colors">
    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    <div className="relative z-10">
      <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">{label}</p>
      <p className="text-3xl font-bold text-white mb-1">{value}</p>
      {sub && <p className="text-emerald-400 text-sm">{sub}</p>}
    </div>
  </div>
);

export default function ProjectDetail({ project, onBack }: ProjectDetailProps) {
  // --- Local State for Purchase ---
  const [quantity, setQuantity] = useState<number>(10); // Default quantity
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  const estimatedCost = (quantity * project.pricePerCredit).toFixed(2);

  return (
    <div className="min-h-screen bg-[#050505] text-slate-200 animate-in fade-in slide-in-from-bottom-4 duration-500 pt-20">
      
      {/* --- Payment Modal Integration --- */}
      <PaymentModal 
        isOpen={isPaymentOpen} 
        onClose={() => setIsPaymentOpen(false)} 
        project={project}
        quantity={quantity}
      />

      {/* --- 1. HERO SECTION --- */}
      <div className="relative h-[50vh] w-full overflow-hidden">
        <img src={project.image} alt={project.projectName} className="absolute inset-0 w-full h-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent" />
        
        <div className="absolute inset-0 flex flex-col justify-end pb-12 px-6">
          <div className="max-w-7xl mx-auto w-full">
            <button 
              onClick={onBack}
              className="flex items-center gap-2 text-slate-400 hover:text-white mb-8 group transition-colors w-fit"
            >
              <div className="p-2 rounded-full bg-white/5 group-hover:bg-white/10 border border-white/10 transition-all">
                <ArrowLeft className="h-5 w-5" />
              </div>
              <span className="text-sm font-medium">Back to Explorer</span>
            </button>

            <div className="flex flex-col md:flex-row items-end gap-6 md:gap-12">
              <div className="flex-1">
                 <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 uppercase tracking-wide">
                      {project.projectType}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${project.status === 'active' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/20' : 'bg-slate-500/20 text-slate-400 border-slate-500/20'}`}>
                      {project.status}
                    </span>
                 </div>
                 <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">{project.projectName}</h1>
                 <div className="flex flex-wrap gap-6 text-sm text-slate-400">
                    <span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-emerald-500" /> {project.location}, {project.country}</span>
                    <span className="flex items-center gap-2"><Shield className="h-4 w-4 text-emerald-500" /> {project.registry}</span>
                    <span className="flex items-center gap-2"><Calendar className="h-4 w-4 text-emerald-500" /> Vintage {project.vintage}</span>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- 2. CONTENT --- */}
      <div className="max-w-7xl mx-auto px-6 pb-24 grid lg:grid-cols-3 gap-12 -mt-10 relative z-10">
        
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
           <div className="prose prose-invert max-w-none">
             <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
               <Leaf className="h-5 w-5 text-emerald-500" /> Project Overview
             </h3>
             <p className="text-slate-400 leading-relaxed text-lg">
               This project focuses on sustainable development and carbon reduction. By implementing rigorous standards and working closely with local communities, it ensures high-integrity credits that deliver real climate action.
             </p>
           </div>

           <div className="grid sm:grid-cols-3 gap-4">
              <StatCard label="Available Credits" value={project.availableCredits.toLocaleString()} sub="Tonnes" />
              <StatCard label="Price per Credit" value={`$${project.pricePerCredit}`} />
              <StatCard label="Project ID" value={project.unicId} />
           </div>
           
           <div>
             <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
               <Activity className="h-5 w-5 text-emerald-500" /> Verification Timeline
             </h3>
             <div className="space-y-6 border-l-2 border-slate-800 pl-6 ml-2">
               <div className="relative">
                 <div className="absolute -left-[33px] top-1 h-4 w-4 rounded-full bg-emerald-500 border-4 border-[#050505]" />
                 <h4 className="text-lg font-semibold text-white">Verification Complete</h4>
                 <p className="text-slate-400 text-sm">Independent audit successfully completed.</p>
               </div>
               <div className="relative">
                 <div className="absolute -left-[33px] top-1 h-4 w-4 rounded-full bg-slate-800 border-4 border-[#050505]" />
                 <h4 className="text-lg font-semibold text-slate-300">Project Registered</h4>
                 <p className="text-slate-400 text-sm">Officially registered with the standard body.</p>
               </div>
             </div>
           </div>
        </div>

        {/* Right Column: Buy Action */}
        <div className="lg:col-span-1">
           <div className="sticky top-24 bg-slate-900/80 backdrop-blur-xl border border-slate-700 p-6 rounded-2xl shadow-2xl">
              <div className="flex justify-between items-end mb-6">
                 <div>
                   <p className="text-slate-400 text-sm mb-1">Current Price</p>
                   <p className="text-4xl font-bold text-white">${project.pricePerCredit}</p>
                 </div>
              </div>
              
              {/* Quantity Input */}
              <div className="mb-6 p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="flex justify-between text-sm text-slate-400 mb-2">
                    <span>Quantity (Tonnes)</span>
                    <span>Min: 1</span>
                  </div>
                  <input 
                    type="number" 
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 0))}
                    className="w-full bg-transparent text-white font-mono text-2xl outline-none border-b border-slate-700 focus:border-emerald-500 pb-2 transition-colors" 
                  />
              </div>

              <div className="flex justify-between text-sm text-slate-400 mb-6 px-1">
                   <span>Total Cost</span>
                   <span className="text-white font-bold text-lg">${estimatedCost}</span>
              </div>

              <button 
                onClick={() => setIsPaymentOpen(true)}
                className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-[0_0_20px_-5px_rgba(16,185,129,0.4)] transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                Purchase & Retire
              </button>
              <p className="text-xs text-center text-slate-500 mt-4 flex items-center justify-center gap-1">
                <Shield className="h-3 w-3" /> Secured by Blockchain Technology
              </p>
           </div>
        </div>

      </div>
    </div>
  );
}