import React, { useState, useEffect, FormEvent } from 'react';
import {
  Leaf,
  X,
  User,
  Mail,
  Lock,
  ArrowRight,
  Globe,
  Activity,
} from 'lucide-react';

// --- STYLED COMPONENTS ---

const Button = ({ className = '', children, ...props }: any) => (
  <button
    className={`group relative flex items-center justify-center w-full h-12 rounded-lg 
    bg-primary text-primary-foreground font-bold text-sm uppercase tracking-wider 
    hover:bg-primary/90 transition-all shadow-[0_10px_30px_rgba(63,138,116,0.35)]
    disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    {...props}
  >
    {children}
    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
  </button>
);

const Input = ({ icon: Icon, className = '', ...props }: any) => (
  <div className="relative group">
    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
      <Icon className="w-4 h-4" />
    </div>
    <input
      className={`flex h-12 w-full rounded-lg border border-input bg-white px-10 py-2 text-sm 
      text-foreground placeholder:text-muted-foreground/80 
      focus:outline-none focus:border-primary/70 focus:ring-2 focus:ring-primary/25 
      transition-all ${className}`}
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

export default function AuthModal({
  isOpen,
  initialMode,
  onClose,
  onSuccess,
}: AuthModalProps) {
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
    setTimeout(onClose, 200);
  };

  if (!isOpen && !isClosing) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setTimeout(() => {
      onSuccess();
    }, 500);
  };

  const toggleMode = () => {
    setMode((prev) => (prev === 'login' ? 'signup' : 'login'));
  };

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-opacity duration-300 
      ${isClosing ? 'opacity-0' : 'opacity-100'}`}
    >
      {/* Backdrop – dark, so modal pops */}
      <div
        className="absolute inset-0 bg-black/60"
        onClick={handleClose}
      />

      {/* Modal Container – solid white card */}
      <div
        className="relative w-full max-w-4xl h-[560px] bg-white rounded-3xl border border-border 
        shadow-2xl overflow-hidden flex animate-in zoom-in-95 duration-300"
      >
        {/* --- LEFT SIDE: VISUAL (Hidden on Mobile) --- */}
        <div className="hidden md:flex w-1/2 flex-col justify-between p-10 bg-gradient-to-br from-emerald-50 via-sky-50 to-emerald-50 border-r border-border">
          {/* Top text */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/15 border border-primary/30 text-primary text-[11px] font-mono uppercase tracking-[0.2em] mb-5">
              <Activity className="w-3 h-3" />
              Live Network
            </div>
            <h2 className="text-3xl font-semibold text-foreground mb-3 leading-tight">
              Data-driven{' '}
              <span className="text-primary">climate impact.</span>
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              Join 500+ enterprises using Offset to verify, trade, and retire
              carbon credits with satellite precision and transparent markets.
            </p>
          </div>

          {/* Small image + stat card, not full background */}
          <div className="mt-8 flex flex-col gap-4">
            <div className="h-28 rounded-2xl overflow-hidden border border-border">
              <img
                src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop"
                alt="Satellite"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="bg-white border border-border rounded-2xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-primary/12 flex items-center justify-center text-primary">
                    <Globe className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-muted-foreground uppercase tracking-wider">
                      Global average
                    </div>
                    <div className="text-xs font-semibold text-foreground">
                      Carbon price
                    </div>
                  </div>
                </div>
                <div className="text-xs font-mono text-emerald-700">
                  +2.4%
                </div>
              </div>
              <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full w-2/3 bg-primary rounded-full" />
              </div>
              <div className="flex justify-between mt-2 text-[10px] font-mono text-muted-foreground">
                <span>$15.20</span>
                <span>$32.50</span>
              </div>
            </div>
          </div>
        </div>

        {/* --- RIGHT SIDE: FORM --- */}
        <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col justify-center relative bg-white">
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-5 right-5 p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="max-w-xs mx-auto w-full">
            {/* Header */}
            <div className="mb-8 text-center">
              <div className="inline-flex justify-center items-center w-12 h-12 rounded-xl bg-primary/12 border border-primary/30 mb-5">
                <Leaf className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold text-foreground mb-1.5">
                {mode === 'login' ? 'Welcome back' : 'Create account'}
              </h3>
              <p className="text-sm text-muted-foreground">
                {mode === 'login'
                  ? 'Access your climate portfolio.'
                  : 'Start your journey to net zero.'}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'signup' && (
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-semibold ml-1">
                    Full name
                  </label>
                  <Input icon={User} type="text" placeholder="Jane Doe" required />
                </div>
              )}

              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-semibold ml-1">
                  Email
                </label>
                <Input
                  icon={Mail}
                  type="email"
                  placeholder="jane@company.com"
                  required
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between ml-1 items-center">
                  <label className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-semibold">
                    Password
                  </label>
                  {mode === 'login' && (
                    <button
                      type="button"
                      className="text-[10px] text-primary hover:text-primary/80 font-medium"
                    >
                      Forgot?
                    </button>
                  )}
                </div>
                <Input
                  icon={Lock}
                  type="password"
                  placeholder="••••••••"
                  required
                />
              </div>

              <Button type="submit" className="mt-5">
                {mode === 'login' ? 'Sign in' : 'Create account'}
              </Button>
            </form>

            {/* Footer Toggle */}
            <div className="mt-7 text-center">
              <p className="text-xs text-muted-foreground">
                {mode === 'login'
                  ? "Don't have an account?"
                  : 'Already have an account?'}
                <button
                  onClick={toggleMode}
                  className="ml-2 text-primary hover:text-primary/80 font-semibold hover:underline transition-all"
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
