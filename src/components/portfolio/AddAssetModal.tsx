/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-irregular-whitespace */
// src/components/portfolio/AddAssetModal.tsx

import React, { useState } from 'react';
import { X, Upload, CheckCircle2, Loader2, FileText, ShieldCheck, Database } from 'lucide-react';
import { CarbonCredit } from '../../lib/types';

interface AddAssetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (asset: CarbonCredit) => void;
}

export default function AddAssetModal({ isOpen, onClose, onAdd }: AddAssetModalProps) {
  // FIX: Renamed to '_step' to prevent TS6133 warning (unused variable)
  const [_step, setStep] = useState(1); 
  const [isVerifying, setIsVerifying] = useState(false);
  const [formData, setFormData] = useState({
    registry: 'Verra',
    serialNumber: '',
    project: '',
    amount: '',
    vintage: '2023'
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    
    // Simulate Registry Verification API Call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mocking the imported asset data
    const newAsset: CarbonCredit = {
      id: `EXT-${Math.floor(Math.random() * 10000)}`,
      projectName: formData.project || "Rimba Raya Peatland Conservation", // Default if empty for demo
      pricePerCredit: 18.50, // Estimated market value
      availableCredits: Number(formData.amount),
      location: "Kalimantan",
      country: "Indonesia",
      vintage: Number(formData.vintage),
      registry: formData.registry,
      trustScore: 99,
      status: "Active",
      projectType: "Forestry",
      unicId: formData.serialNumber || `VCS-${Math.floor(Math.random() * 100000)}-2023`,
      image: "https://images.unsplash.com/photo-1516214104703-d870798883c5?auto=format&fit=crop&q=80&w=1000"
    };

    onAdd(newAsset);
    setIsVerifying(false);
    setStep(1); // Reset for next time
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[#050505]/90 backdrop-blur-md" onClick={onClose} />
      
      <div className="relative w-full max-w-lg bg-[#0A0A0A] border border-white/10 rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/5 bg-white/[0.02]">
          <div className="flex items-center gap-3">
             <div className="p-2 bg-emerald-500/10 rounded-lg border border-emerald-500/20 text-emerald-400">
                <Database className="w-4 h-4" />
             </div>
             <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Import Assets</h3>
                <p className="text-[10px] text-slate-500 font-mono">Bridge credits from external registries</p>
             </div>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          
          {/* Registry Selection */}
          <div className="space-y-3">
            <label className="text-[10px] uppercase text-slate-500 font-bold tracking-widest">Source Registry</label>
            <div className="grid grid-cols-2 gap-3">
              {['Verra', 'Gold Standard'].map(r => (
                <button
                  type="button"
                  key={r}
                  onClick={() => setFormData({ ...formData, registry: r })}
                  className={`p-4 rounded-xl border text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                    formData.registry === r 
                      ? 'bg-emerald-600/20 border-emerald-500 text-emerald-400' 
                      : 'bg-black border-white/10 text-slate-400 hover:border-white/30 hover:text-white'
                  }`}
                >
                  {formData.registry === r && <CheckCircle2 className="w-3.5 h-3.5" />}
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* Serial Number Input */}
          <div className="space-y-2">
            <label className="text-[10px] uppercase text-slate-500 font-bold tracking-widest">Batch Serial Number</label>
            <div className="relative group">
              <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-emerald-500 transition-colors" />
              <input 
                required
                className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-emerald-500/50 transition-all font-mono placeholder:text-slate-700"
                placeholder="XXXX-XXXX-XXXX-XXXX"
                value={formData.serialNumber}
                onChange={e => setFormData({...formData, serialNumber: e.target.value})}
              />
            </div>
            <p className="text-[10px] text-slate-500 pl-1">Enter the unique serial ID provided by the registry.</p>
          </div>

          {/* Details Row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] uppercase text-slate-500 font-bold tracking-widest">Quantity (tCO2e)</label>
              <input 
                type="number"
                required
                className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-emerald-500/50 transition-all font-mono"
                placeholder="0"
                value={formData.amount}
                onChange={e => setFormData({...formData, amount: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase text-slate-500 font-bold tracking-widest">Vintage Year</label>
              <input 
                type="text"
                className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-emerald-500/50 transition-all font-mono"
                placeholder="2023"
                value={formData.vintage}
                onChange={e => setFormData({...formData, vintage: e.target.value})}
              />
            </div>
          </div>

          {/* Upload Box (Visual) */}
          <div className="border border-dashed border-white/10 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:bg-white/5 transition-colors cursor-pointer group">
             <div className="p-3 bg-white/5 rounded-full mb-3 group-hover:bg-white/10 transition-colors">
                <Upload className="w-5 h-5 text-slate-400 group-hover:text-white" />
             </div>
             <p className="text-xs text-slate-300 font-medium">Upload Retirement Proof</p>
             <p className="text-[10px] text-slate-500 mt-1">PDF or CSV (Max 5MB)</p>
          </div>

          <button 
            type="submit" 
            disabled={isVerifying}
            className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isVerifying ? <Loader2 className="w-5 h-5 animate-spin" /> : <ShieldCheck className="w-5 h-5" />}
            {isVerifying ? "Verifying On-Chain..." : "Verify & Import Asset"}
          </button>

        </form>
      </div>
    </div>
  );
}