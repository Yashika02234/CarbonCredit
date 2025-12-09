import { useState, useEffect, FormEvent } from 'react';
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

// --- THEME HOOK (watches <html> for "dark" class) ---
function useTheme(): boolean {
  const [isDark, setIsDark] = useState<boolean>(() =>
    typeof document !== 'undefined'
      ? document.documentElement.classList.contains('dark')
      : false,
  );

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const el = document.documentElement;
    const mo = new MutationObserver(() => {
      setIsDark(el.classList.contains('dark'));
    });
    mo.observe(el, { attributes: true, attributeFilter: ['class'] });
    return () => mo.disconnect();
  }, []);

  return isDark;
}

// --- STYLED COMPONENTS (dark-aware) ---
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

const Input = ({ icon: Icon, className = '', isDark, ...props }: any) => (
  <div className="relative group">
    <div className={`absolute left-3 top-1/2 -translate-y-1/2 ${isDark ? 'text-slate-400' : 'text-muted-foreground'} group-focus-within:text-primary transition-colors`}>
      <Icon className="w-4 h-4" />
    </div>
    <input
      className={`flex h-12 w-full rounded-lg border px-10 py-2 text-sm placeholder:text-muted-foreground/80 focus:outline-none focus:ring-2 focus:ring-primary/25 transition-all ${className}
        ${isDark ? 'bg-slate-800 border-slate-700 text-slate-100' : 'bg-white border-input text-foreground'}`}
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
  const isDark = useTheme();
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
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-opacity duration-300 ${isClosing ? 'opacity-0' : 'opacity-100'}`}
      aria-modal="true"
      role="dialog"
    >
      {/* Backdrop */}
      <div
        className={`absolute inset-0 ${isDark ? 'bg-black/70' : 'bg-black/60'}`}
        onClick={handleClose}
      />

      {/* Modal Container */}
      <div
        className={`relative w-full max-w-4xl h-[560px] rounded-3xl overflow-hidden flex animate-in zoom-in-95 duration-300 shadow-2xl
          ${isDark ? 'bg-slate-900 border border-slate-700 text-slate-200' : 'bg-white border border-border text-foreground'}`}
      >
        {/* --- LEFT SIDE: VISUAL (Hidden on Mobile) --- */}
        <div className={`hidden md:flex w-1/2 flex-col justify-between p-10 border-r ${isDark ? 'border-slate-800' : 'border-border'}`} style={{ background: isDark ? 'linear-gradient(180deg,#05231a, #06343a)' : undefined }}>
          <div>
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${isDark ? 'bg-emerald-900/20 text-emerald-300 border-emerald-800/30' : 'bg-primary/15 text-primary border border-primary/30'} text-[11px] font-mono uppercase tracking-[0.2em] mb-5`}>
              <Activity className="w-3 h-3" />
              Live Network
            </div>

            <h2 className={`text-3xl font-semibold mb-3 leading-tight ${isDark ? 'text-slate-100' : 'text-foreground'}`}>
              Data-driven{' '}
              <span className={`${isDark ? 'text-emerald-300' : 'text-primary'}`}>climate impact.</span>
            </h2>

            <p className={`${isDark ? 'text-slate-300' : 'text-muted-foreground'} text-sm leading-relaxed max-w-sm`}>
              Join 500+ enterprises using Offset to verify, trade, and retire
              carbon credits with satellite precision and transparent markets.
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-4">
            <div className="h-28 rounded-2xl overflow-hidden border" style={{ borderColor: isDark ? 'rgba(255,255,255,0.03)' : undefined }}>
              <img
                src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop"
                alt="Satellite"
                className="w-full h-full object-cover"
              />
            </div>

            <div className={`${isDark ? 'bg-slate-800 border-slate-700 text-slate-200' : 'bg-white border-border text-foreground'} rounded-2xl p-4 shadow-sm`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className={`${isDark ? 'w-8 h-8 rounded-lg bg-emerald-800 text-emerald-200' : 'w-8 h-8 rounded-lg bg-primary/12 text-primary'} flex items-center justify-center`}>
                    <Globe className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider" style={{ color: isDark ? 'rgba(255,255,255,0.65)' : undefined }}>
                      Global average
                    </div>
                    <div className={`${isDark ? 'text-slate-100' : 'text-foreground'} text-xs font-semibold`}>
                      Carbon price
                    </div>
                  </div>
                </div>
                <div className="text-xs font-mono text-emerald-500">+2.4%</div>
              </div>

              <div className="h-1.5 w-full rounded-full overflow-hidden bg-slate-700/40">
                <div className="h-full w-2/3 bg-primary rounded-full" />
              </div>

              <div className="flex justify-between mt-2 text-[10px] font-mono" style={{ color: isDark ? 'rgba(255,255,255,0.6)' : undefined }}>
                <span>$15.20</span>
                <span>$32.50</span>
              </div>
            </div>
          </div>
        </div>

        {/* --- RIGHT SIDE: FORM --- */}
        <div className={`${isDark ? 'bg-slate-900' : 'bg-white'} w-full md:w-1/2 p-8 md:p-10 flex flex-col justify-center relative`}>
          {/* Close Button */}
          <button
            onClick={handleClose}
            className={`absolute top-5 right-5 p-2 rounded-full transition-colors ${isDark ? 'text-slate-300 hover:text-white hover:bg-slate-800' : 'text-muted-foreground hover:text-foreground hover:bg-slate-100'}`}
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="max-w-xs mx-auto w-full">
            {/* Header */}
            <div className="mb-8 text-center">
              <div className={`inline-flex justify-center items-center w-12 h-12 rounded-xl mb-5 ${isDark ? 'bg-emerald-900/10 border border-emerald-800/30' : 'bg-primary/12 border border-primary/30'}`}>
                <Leaf className={`w-6 h-6 ${isDark ? 'text-emerald-300' : 'text-primary'}`} />
              </div>

              <h3 className={`text-2xl font-semibold mb-1.5 ${isDark ? 'text-slate-100' : 'text-foreground'}`}>
                {mode === 'login' ? 'Welcome back' : 'Create account'}
              </h3>

              <p className={`${isDark ? 'text-slate-300' : 'text-muted-foreground'} text-sm`}>
                {mode === 'login'
                  ? 'Access your climate portfolio.'
                  : 'Start your journey to net zero.'}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'signup' && (
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-[0.18em] font-semibold ml-1" style={{ color: isDark ? 'rgba(255,255,255,0.65)' : undefined }}>
                    Full name
                  </label>
                  <Input icon={User} type="text" placeholder="Jane Doe" required isDark={isDark} />
                </div>
              )}

              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-[0.18em] font-semibold ml-1" style={{ color: isDark ? 'rgba(255,255,255,0.65)' : undefined }}>
                  Email
                </label>
                <Input icon={Mail} type="email" placeholder="jane@company.com" required isDark={isDark} />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between ml-1 items-center">
                  <label className="text-[10px] uppercase tracking-[0.18em] font-semibold" style={{ color: isDark ? 'rgba(255,255,255,0.65)' : undefined }}>
                    Password
                  </label>
                  {mode === 'login' && (
                    <button
                      type="button"
                      className="text-[10px] hover:underline font-medium"
                      style={{ color: isDark ? '#7DD3FC' : undefined }}
                    >
                      Forgot?
                    </button>
                  )}
                </div>
                <Input icon={Lock} type="password" placeholder="••••••••" required isDark={isDark} />
              </div>

              <Button type="submit" className="mt-5">
                {mode === 'login' ? 'Sign in' : 'Create account'}
              </Button>
            </form>

            {/* Footer Toggle */}
            <div className="mt-7 text-center">
              <p className={`${isDark ? 'text-slate-300' : 'text-xs text-muted-foreground'}`}>
                {mode === 'login'
                  ? "Don't have an account?"
                  : 'Already have an account?'}
                <button
                  onClick={toggleMode}
                  className="ml-2 font-semibold hover:underline"
                  style={{ color: isDark ? '#7DD3FC' : undefined }}
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
