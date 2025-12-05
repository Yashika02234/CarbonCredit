import React, { useState, useEffect, FormEvent } from 'react';
import { Leaf, X, User, Mail, Lock } from 'lucide-react';

const Button = ({ className = '', children, ...props }: any) => (
  <button className={`inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none h-10 px-4 py-2 bg-emerald-600 text-white hover:bg-emerald-500 shadow-lg shadow-emerald-900/20 ${className}`} {...props}>{children}</button>
);
const Input = ({ className = '', ...props }: any) => (
  <input className={`flex h-10 w-full rounded-lg border border-slate-700 bg-slate-900/50 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 disabled:cursor-not-allowed disabled:opacity-50 ${className}`} {...props} />
);

interface AuthModalProps {
  isOpen: boolean;
  initialMode: 'login' | 'signup';
  onClose: () => void;
  onSuccess: () => void;
}

export default function AuthModal({ isOpen, initialMode, onClose, onSuccess }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  
  useEffect(() => {
    if (isOpen) setMode(initialMode);
  }, [isOpen, initialMode]);

  if (!isOpen) return null;

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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity" onClick={onClose} />
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl shadow-black animate-in fade-in zoom-in-95 duration-200">
        <button onClick={onClose} className="absolute right-4 top-4 text-slate-400 hover:text-white z-10 p-2 hover:bg-white/5 rounded-full transition-colors"><X className="h-5 w-5" /></button>
        <div className="relative p-8">
          <div className="mb-8 text-center">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 mb-4 border border-emerald-500/20"><Leaf className="h-6 w-6" /></div>
            <h2 className="text-2xl font-bold text-white mb-2">{mode === 'login' ? 'Welcome Back' : 'Create Account'}</h2>
            <p className="text-sm text-slate-400">
              {mode === 'login' 
                ? 'Enter your credentials to access your portfolio.' 
                : 'Join the platform to start offsetting carbon.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300 uppercase tracking-wider">Full Name</label>
                <div className="relative"><User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" /><Input placeholder="John Doe" className="pl-10 bg-slate-800/50 border-slate-700 focus:border-emerald-500" required /></div>
              </div>
            )}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300 uppercase tracking-wider">Email</label>
              <div className="relative"><Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" /><Input type="email" placeholder="name@example.com" className="pl-10 bg-slate-800/50 border-slate-700 focus:border-emerald-500" required /></div>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300 uppercase tracking-wider">Password</label>
              <div className="relative"><Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" /><Input type="password" placeholder="••••••••" className="pl-10 bg-slate-800/50 border-slate-700 focus:border-emerald-500" required /></div>
            </div>
            <Button type="submit" className="w-full mt-6 text-base py-6 font-bold shadow-lg shadow-emerald-900/20">{mode === 'login' ? 'Log In' : 'Create Account'}</Button>
          </form>
          <div className="mt-6 text-center text-sm text-slate-400 flex items-center justify-center gap-2">
            {mode === 'login' ? "Don't have an account?" : "Already have an account?"}
            <button onClick={toggleMode} className="text-emerald-400 hover:text-emerald-300 font-semibold underline-offset-4 hover:underline">{mode === 'login' ? 'Sign up' : 'Log in'}</button>
          </div>
        </div>
      </div>
    </div>
  );
}