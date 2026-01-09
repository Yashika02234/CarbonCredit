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

/* =======================
   THEME HOOK
======================= */
function useTheme(): boolean {
  const [isDark, setIsDark] = useState(
    typeof document !== 'undefined'
      ? document.documentElement.classList.contains('dark')
      : false
  );

  useEffect(() => {
    const el = document.documentElement;
    const observer = new MutationObserver(() =>
      setIsDark(el.classList.contains('dark'))
    );
    observer.observe(el, { attributes: true });
    return () => observer.disconnect();
  }, []);

  return isDark;
}

/* =======================
   UI HELPERS
======================= */
const Button = ({ children, className = '', ...props }: any) => (
  <button
    className={`group w-full h-12 rounded-lg bg-primary text-primary-foreground
      font-bold text-sm uppercase tracking-wider flex items-center justify-center
      hover:bg-primary/90 transition-all ${className}`}
    {...props}
  >
    {children}
    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
  </button>
);

const Input = ({ icon: Icon, isDark, ...props }: any) => (
  <div className="relative">
    <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-70" />
    <input
      {...props}
      className={`w-full h-12 pl-10 pr-3 rounded-lg border text-sm outline-none
        ${isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-input'}
        focus:ring-2 focus:ring-primary/30`}
    />
  </div>
);

/* =======================
   PROPS
======================= */
interface AuthModalProps {
  isOpen: boolean;
  initialMode: 'login' | 'signup';
  onClose: () => void;
  onSuccess: () => void;
}

/* =======================
   MAIN COMPONENT
======================= */
export default function AuthModal({
  isOpen,
  initialMode,
  onClose,
  onSuccess,
}: AuthModalProps) {
  const isDark = useTheme();

  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [isClosing, setIsClosing] = useState(false);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setIsClosing(false);
    }
  }, [isOpen, initialMode]);

  if (!isOpen && !isClosing) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // ✅ Save username
    if (mode === 'signup') {
      localStorage.setItem(
        'offset_user_name',
        fullName.trim() || 'User'
      );
    } else {
      const existing = localStorage.getItem('offset_user_name');
      if (!existing) {
        localStorage.setItem('offset_user_name', 'User');
      }
    }

    setTimeout(() => onSuccess(), 400);
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 200);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60" onClick={handleClose} />

      <div
        className={`relative w-full max-w-4xl h-[560px] rounded-3xl overflow-hidden flex shadow-2xl
        ${isDark ? 'bg-slate-900 text-white' : 'bg-white text-foreground'}`}
      >
        {/* ================= LEFT PANEL ================= */}
        <div className="hidden md:flex w-1/2 p-10 flex-col justify-between border-r">
          <div>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest mb-5 opacity-80">
              <Activity className="w-4 h-4" />
              Live Network
            </div>

            <h2 className="text-3xl font-semibold mb-3">
              Data-driven <span className="text-primary">climate impact</span>
            </h2>

            <p className="text-sm opacity-80 max-w-sm">
              Verify, trade and retire carbon credits with transparency.
            </p>
          </div>

          {/* ✅ Globe USED here */}
          <div className="bg-white/5 rounded-2xl p-4 border mt-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs uppercase opacity-70">Global average</p>
                  <p className="text-sm font-semibold">Carbon price</p>
                </div>
              </div>
              <span className="text-xs text-emerald-400 font-mono">+2.4%</span>
            </div>

            <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full w-2/3 bg-primary rounded-full" />
            </div>
          </div>
        </div>

        {/* ================= RIGHT PANEL ================= */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center relative">
          <button
            onClick={handleClose}
            className="absolute top-5 right-5 opacity-70 hover:opacity-100"
          >
            <X />
          </button>

          <div className="max-w-xs mx-auto w-full">
            <div className="text-center mb-8">
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-primary/15 flex items-center justify-center">
                <Leaf className="w-6 h-6 text-primary" />
              </div>

              <h3 className="text-2xl font-semibold">
                {mode === 'login' ? 'Welcome back' : 'Create account'}
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'signup' && (
                <Input
                  icon={User}
                  placeholder="Full name"
                  value={fullName}
                  onChange={(e: any) => setFullName(e.target.value)}
                  required
                  isDark={isDark}
                />
              )}

              <Input
                icon={Mail}
                placeholder="Email"
                value={email}
                onChange={(e: any) => setEmail(e.target.value)}
                required
                isDark={isDark}
              />

              <Input
                icon={Lock}
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e: any) => setPassword(e.target.value)}
                required
                isDark={isDark}
              />

              <Button type="submit">
                {mode === 'login' ? 'Sign in' : 'Create account'}
              </Button>
            </form>

            <p className="text-xs text-center mt-6 opacity-70">
              {mode === 'login' ? 'No account?' : 'Already have an account?'}
              <button
                onClick={() =>
                  setMode(mode === 'login' ? 'signup' : 'login')
                }
                className="ml-2 font-semibold underline"
              >
                {mode === 'login' ? 'Sign up' : 'Log in'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
