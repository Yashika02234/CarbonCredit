import React, { useState, useEffect, FormEvent } from 'react';
import { Leaf, X, User, Mail, Lock, ArrowRight, Globe, Activity } from 'lucide-react';

// --- STYLED COMPONENTS ---

const Button = ({ className = '', children, ...props }: any) => (
  <button 
    className={`group relative flex items-center justify-center w-full h-12 rounded-lg bg-emerald-500 text-black font-bold text-sm uppercase tracking-wider hover:bg-emerald-400 transition-all shadow-[0_0_20px_-5px_rgba(16,185,129,0.4)] hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.6)] disabled:opacity-50 disabled:cursor-not-allowed ${className}`} 
    {...props}
  >
    {children}
    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
  </button>
);

const Input = ({ icon: Icon, className = '', ...props }: any) => (
  <div className="relative group">
    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-400 transition-colors">
      <Icon className="w-4 h-4" />
    </div>
    <input 
      className={`flex h-12 w-full rounded-lg border border-white/10 bg-black/20 px-10 py-2 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500/50 focus:bg-emerald-500/5 transition-all ${className}`} 
      {...props} 
    />
  </div>
);

// --- MAIN COMPONENT ---

interface AuthModalProps {
  isOpen: boolean;
  initialMode: 'login' | 'signup';
  onClose: () => void;
  onSuccess: () => void;
}

export default function AuthModal({ isOpen, initialMode, onClose, onSuccess }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [isClosing, setIsClosing] = useState(false);
  
  useEffect(() => {
    if (isOpen) {
        setMode(initialMode);
        setIsClosing(false);
    }
  }, [isOpen, initialMode]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 200); // Allow animation to finish
  };

  if (!isOpen && !isClosing) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setTimeout(() => {
      onSuccess();
    }, 500);
  };

  const toggleMode = () => {
    setMode(mode === 'login' ? 'signup' : 'login');
  };

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-opacity duration-300 ${isClosing ? 'opacity-0' : 'opacity-100'}`}>
      
      {/* Backdrop with Blur */}
      <div 
        className="absolute inset-0 bg-[#050505]/80 backdrop-blur-md" 
        onClick={handleClose}
      />

      {/* Modal Container (Split Layout) */}
      <div className="relative w-full max-w-4xl h-[600px] bg-[#0A0A0A] border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex animate-in zoom-in-95 duration-300">
        
        {/* --- LEFT SIDE: VISUAL (Hidden on Mobile) --- */}
        <div className="hidden md:flex w-1/2 relative flex-col justify-between p-12 overflow-hidden bg-slate-900">
           {/* Background Effects */}
           <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')] bg-cover bg-center opacity-30 grayscale mix-blend-luminosity" />
           <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
           <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0A0A0A]" />
           
           {/* Content Overlay */}
           <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono uppercase tracking-widest mb-6">
                <Activity className="w-3 h-3" /> Live Network
              </div>
              <h2 className="text-4xl font-bold text-white mb-4 leading-tight">
                Data-Driven <br /> <span className="text-emerald-400">Impact.</span>
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                Join 500+ enterprises using Offset to verify, trade, and retire carbon credits with satellite precision.
              </p>
           </div>

           {/* Floating Data Card */}
           <div className="relative z-10 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 mt-auto w-full max-w-[280px]">
              <div className="flex items-center justify-between mb-4">
                 <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                       <Globe className="w-4 h-4" />
                    </div>
                    <div>
                       <div className="text-[10px] text-slate-400 uppercase tracking-wider">Global Average</div>
                       <div className="text-xs font-bold text-white">Carbon Price</div>
                    </div>
                 </div>
                 <div className="text-emerald-400 text-xs font-mono">+2.4%</div>
              </div>
              <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                 <div className="h-full w-2/3 bg-emerald-500 rounded-full" />
              </div>
              <div className="flex justify-between mt-2 text-[10px] font-mono text-slate-500">
                 <span>$15.20</span>
                 <span>$32.50</span>
              </div>
           </div>
        </div>

        {/* --- RIGHT SIDE: FORM --- */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center relative bg-[#0A0A0A]">
           
           {/* Close Button */}
           <button 
             onClick={handleClose} 
             className="absolute top-6 right-6 p-2 rounded-full text-slate-500 hover:text-white hover:bg-white/5 transition-colors"
           >
             <X className="w-5 h-5" />
           </button>

           <div className="max-w-xs mx-auto w-full">
              {/* Header */}
              <div className="mb-10 text-center">
                 <div className="inline-flex justify-center items-center w-12 h-12 rounded-xl bg-white/5 border border-white/10 mb-6">
                    <Leaf className="w-6 h-6 text-emerald-400" />
                 </div>
                 <h3 className="text-2xl font-bold text-white mb-2">
                    {mode === 'login' ? 'Welcome Back' : 'Create Account'}
                 </h3>
                 <p className="text-sm text-slate-400">
                    {mode === 'login' ? 'Access your climate portfolio' : 'Start your journey to net zero'}
                 </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                 {mode === 'signup' && (
                    <div className="space-y-1">
                       <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold ml-1">Full Name</label>
                       <Input icon={User} type="text" placeholder="Jane Doe" required />
                    </div>
                 )}
                 
                 <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold ml-1">Email</label>
                    <Input icon={Mail} type="email" placeholder="jane@company.com" required />
                 </div>

                 <div className="space-y-1">
                    <div className="flex justify-between ml-1">
                       <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Password</label>
                       {mode === 'login' && <button type="button" className="text-[10px] text-emerald-400 hover:text-emerald-300">Forgot?</button>}
                    </div>
                    <Input icon={Lock} type="password" placeholder="••••••••" required />
                 </div>

                 <Button type="submit" className="mt-6">
                    {mode === 'login' ? 'Sign In' : 'Create Account'}
                 </Button>
              </form>

              {/* Footer Toggle */}
              <div className="mt-8 text-center">
                 <p className="text-xs text-slate-500">
                    {mode === 'login' ? "Don't have an account?" : "Already have an account?"}
                    <button 
                       onClick={toggleMode} 
                       className="ml-2 text-emerald-400 hover:text-emerald-300 font-bold hover:underline transition-all"
                    >
                       {mode === 'login' ? 'Sign up' : 'Log in'}
                    </button>
                 </p>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
}