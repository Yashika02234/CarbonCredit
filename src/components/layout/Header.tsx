import React, { ButtonHTMLAttributes } from 'react';
import { Leaf, Menu, User } from 'lucide-react';

type ViewState = 'landing' | 'home' | 'marketplace' | 'portfolio' | 'about';

type ButtonVariant = 'default' | 'ghost' | 'outline' | 'glow' | 'glass';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const Button = ({
  variant = 'default',
  className = '',
  children,
  onClick,
  ...props
}: ButtonProps) => {
  const variants: Record<ButtonVariant, string> = {
    default:
      'bg-emerald-600 text-white hover:bg-emerald-500 shadow-lg shadow-emerald-900/20',
    ghost: 'hover:bg-white/10 text-slate-300 hover:text-white',
    outline:
      'border border-slate-700 bg-transparent hover:bg-slate-800 text-slate-300',
    glow:
      'bg-emerald-500/10 text-emerald-400 border border-emerald-500/50 hover:bg-emerald-500/20 hover:shadow-[0_0_15px_rgba(16,185,129,0.3)]',
    glass:
      'bg-white/5 text-slate-100 border border-emerald-500/40 shadow-[0_0_18px_rgba(16,185,129,0.35)]',
  };

  return (
    <button
      className={`inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all h-10 px-4 py-2 ${variants[variant]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

interface HeaderProps {
  showContent: boolean;
  isLoggedIn: boolean;
  currentView?: ViewState;
  onNavigate: (view: ViewState) => void;
  onOpenAuth: (mode: 'login' | 'signup') => void;
  onLogout: () => void;
}

export default function Header({
  showContent,
  isLoggedIn,
  currentView,
  onNavigate,
  onOpenAuth,
  onLogout,
}: HeaderProps) {
  const handleHomeClick = () => {
    if (isLoggedIn) {
      onNavigate('home');
    } else {
      // For logged-out users, Home = scroll to top of landing
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const scrollToSection = (id: string) => {
    if (!isLoggedIn || currentView === 'landing') {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // If user is logged in but currently not on landing,
      // navigate to landing first, then scroll.
      onNavigate('landing');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <>
      {/* Floating animated logo on landing */}
      <div className="animated-logo-container">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 shadow-lg shadow-emerald-900/50 ml-7">
            <Leaf className="h-6 w-6 text-white" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-white">
            Offset
          </span>
        </div>
      </div>

      {/* Main header */}
      <header
        className={`fixed top-0 w-full z-40 border-b border-white/5 bg-slate-950/80 backdrop-blur-xl transition-opacity duration-1000 ${
          showContent ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <div className="flex items-center gap-12">
              {/* Invisible logo so layout aligns with floating one */}
              <div
                className="flex items-center gap-3 opacity-0 cursor-pointer"
                aria-hidden="true"
                onClick={handleHomeClick}
              >
                <div className="h-10 w-10" />
                <span className="text-2xl font-bold">Offset</span>
              </div>

              <nav className="hidden md:flex items-center gap-2">
                {/* Home */}
                <Button
                  variant={
                    currentView === 'home' || (!isLoggedIn && currentView === 'landing')
                      ? 'outline'
                      : 'ghost'
                  }
                  onClick={handleHomeClick}
                  className={
                    currentView === 'home'
                      ? 'text-emerald-400 border-emerald-500/30'
                      : ''
                  }
                >
                  Home
                </Button>

                {isLoggedIn ? (
                  <>
                    <Button
                      variant={currentView === 'marketplace' ? 'outline' : 'ghost'}
                      onClick={() => onNavigate('marketplace')}
                      className={
                        currentView === 'marketplace'
                          ? 'text-emerald-400 border-emerald-500/30'
                          : ''
                      }
                    >
                      Marketplace
                    </Button>

                    <Button
                      variant={currentView === 'portfolio' ? 'outline' : 'ghost'}
                      onClick={() => onNavigate('portfolio')}
                      className={
                        currentView === 'portfolio'
                          ? 'text-emerald-400 border-emerald-500/30'
                          : ''
                      }
                    >
                      Portfolio
                    </Button>
                  </>
                ) : (
                  <Button variant="ghost" onClick={() => scrollToSection('mission')}>
                    Mission
                  </Button>
                )}

                {/* About page navigation */}
                <Button
                  variant={currentView === 'about' ? 'glass' : 'ghost'}
                  onClick={() => onNavigate('about')}
                  className={
                    currentView === 'about'
                      ? 'text-emerald-400 border-emerald-500/30'
                      : ''
                  }
                >
                  About
                </Button>
              </nav>
            </div>

            <div className="flex items-center gap-4">
              {isLoggedIn ? (
                <>
                  <div className="hidden md:flex flex-col items-end mr-2">
                    <span className="text-xs text-slate-400">Balance</span>
                    <span className="text-sm font-mono text-emerald-400">
                      2,450 CO2e
                    </span>
                  </div>

                  {/* User icon -> Portfolio */}
                  <Button
                    variant="ghost"
                    onClick={() => onNavigate('portfolio')}
                    className={`rounded-full border border-white/15 w-15 p-0 flex items-center justify-center hover:bg-emerald-500/10 hover:border-emerald-500/50 ${
                      currentView === 'portfolio'
                        ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400'
                        : ''
                    }`}
                  >
                    <User className="h-5 w-6" />
                  </Button>

                  <Button
                    variant="outline"
                    onClick={onLogout}
                    className="hidden sm:flex"
                  >
                    Disconnect
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    className="hidden sm:flex"
                    onClick={() => onOpenAuth('login')}
                  >
                    Sign In
                  </Button>
                </>
              )}

              {/* Mobile menu */}
              <Button
                variant="ghost"
                className="md:hidden w-10 p-0 flex items-center justify-center"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
