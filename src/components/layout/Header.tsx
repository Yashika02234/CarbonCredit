// src/components/layout/Header.tsx
import { useState, useEffect, ButtonHTMLAttributes } from 'react';
import {
  Leaf,
  Menu,
  X,
  User,
  LogOut,
  Command,
  ChevronRight,
  Sun,
  Moon,
} from 'lucide-react';

type ViewState = 'landing' | 'home' | 'marketplace' | 'portfolio' | 'about';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'icon';
  active?: boolean;
}

const NavButton = ({ variant = 'ghost', active, className = '', children, onClick, ...props }: ButtonProps) => {
  const base = "relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 group";
  
  const variants: Record<string, string> = {
    primary: "bg-primary text-primary-foreground hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:scale-105",
    ghost: `hover:bg-muted/50 ${active ? 'text-foreground bg-muted/30' : 'text-muted-foreground hover:text-foreground'}`,
    icon: "p-2 hover:bg-muted/50 text-muted-foreground hover:text-foreground rounded-full aspect-square justify-center",
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} onClick={onClick} {...props}>
      {children}
      {/* Active Dot for Navigation Items */}
      {active && variant === 'ghost' && (
        <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary shadow-[0_0_8px_currentColor]" />
      )}
    </button>
  );
};

interface HeaderProps {
  onOpenAuth: (mode: 'login' | 'signup') => void;
  isLoggedIn: boolean;
  showContent?: boolean;
  currentView?: ViewState;
  onNavigate?: (view: ViewState) => void;
  onLogout?: () => void;

  // Theme props (new / required for toggle)
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

export default function Header({
  showContent = true,
  isLoggedIn,
  currentView = 'home',
  onNavigate = () => {},
  onOpenAuth,
  onLogout,
  theme,
  onToggleTheme,
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Scroll Detection for minimizing/styling
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = (view: ViewState) => {
    onNavigate(view);
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* --- THE FLOATING COMMAND BAR --- */}
      <div 
        className={`fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-500 ${
          showContent ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        } ${scrolled ? 'pt-4' : 'pt-6 md:pt-8'}`}
      >
        <header 
          className={`
            relative flex items-center justify-between 
            bg-background/60 backdrop-blur-xl border border-border/50 
            shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)]
            transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]
            ${scrolled 
              ? 'w-[95%] md:w-[600px] rounded-2xl py-2 px-3' 
              : 'w-[95%] md:w-[1200px] rounded-full py-3 px-6'
            }
          `}
        >
          {/* 1. Left: Identity */}
          <div className="flex items-center gap-4">
            <div 
              className="flex items-center gap-2 cursor-pointer group" 
              onClick={() => handleNav('landing')}
            >
              <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                <Leaf className="w-4 h-4 transition-transform group-hover:rotate-45" />
                {/* Online Indicator */}
                <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
              </div>
              <span className={`font-bold tracking-tight transition-all duration-300 ${scrolled ? 'w-0 opacity-0 overflow-hidden' : 'w-auto opacity-100'}`}>
                Offset
              </span>
            </div>

            {/* Separator (Desktop Only) */}
            <div className={`h-4 w-px bg-border hidden md:block transition-opacity ${scrolled ? 'opacity-0' : 'opacity-100'}`} />

            {/* Desktop Navigation */}
            {isLoggedIn && (
              <nav className={`hidden md:flex items-center gap-1 transition-all duration-300 ${scrolled ? 'opacity-0 pointer-events-none absolute' : 'opacity-100'}`}>
                {['home', 'marketplace', 'portfolio', 'about'].map((view) => (
                  <NavButton 
                    key={view} 
                    active={currentView === view} 
                    onClick={() => handleNav(view as ViewState)}
                  >
                    {view.charAt(0).toUpperCase() + view.slice(1)}
                  </NavButton>
                ))}
              </nav>
            )}
          </div>

          {/* 2. Middle: Dynamic Island Content (Visible ONLY when Scrolled) */}
          <div className={`absolute left-1/2 -translate-x-1/2 flex items-center gap-4 transition-all duration-500 ${scrolled ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'}`}>
             {isLoggedIn ? (
               <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                 <Command className="w-3 h-3" />
                
               </div>
             ) : (
                <span className="text-sm mr-20 font-semibold text-foreground">Offset Platform</span>
             )}
          </div>


          {/* 3. Right: Actions */}
          <div className="flex items-center gap-2">
            
            {/* THEME TOGGLE - visible for both logged-in and logged-out states */}
            <button
              onClick={onToggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              className="inline-flex items-center justify-center w-9 h-9  rounded-md border border-border bg-card hover:shadow-sm transition-all"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-amber-400" />
              ) : (
                <Moon className="w-5 h-5 text-slate-700" />
              )}
            </button>

            {isLoggedIn ? (
              <>
                <div className={`hidden md:flex flex-col items-end mr-2 transition-all duration-300 ${scrolled ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100 w-auto'}`}>
                  <span className="text-[9px] uppercase tracking-widest text-muted-foreground font-bold">Balance</span>
                  <span className="text-xs font-mono text-primary">2,450 CO2e</span>
                </div>

                <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-primary to-blue-500 p-[1px] cursor-pointer" onClick={() => handleNav('portfolio')}>
                   <div className="h-full w-full rounded-full bg-background flex items-center justify-center hover:bg-transparent transition-colors group">
                      <User className="w-4 h-4 text-primary group-hover:text-white" />
                   </div>
                </div>

                {onLogout && (
                  <NavButton variant="icon" onClick={onLogout} className="hidden md:flex" title="Sign Out">
                    <LogOut className="w-4 h-4" />
                  </NavButton>
                )}

                {/* Mobile Menu Trigger */}
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 text-muted-foreground hover:text-foreground">
                  {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <NavButton variant="ghost" onClick={() => onOpenAuth('login')} className={scrolled ? 'hidden sm:flex' : ''}>
                  Log in
                </NavButton>
                <NavButton variant="primary" onClick={() => onOpenAuth('signup')}>
                  <span>Get Started</span>
                  <ChevronRight className="w-3 h-3" />
                </NavButton>
              </div>
            )}
          </div>
        </header>
      </div>

      {/* --- MOBILE MENU OVERLAY (Fullscreen Blur) --- */}
      <div 
        className={`fixed inset-0 z-40 bg-background/95 backdrop-blur-2xl transition-all duration-500 flex flex-col justify-center items-center gap-8 ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col gap-6 w-full max-w-xs text-center">
          {isLoggedIn ? (
             <>
                <button onClick={() => handleNav('home')} className="text-2xl font-bold text-foreground hover:text-primary transition-colors">Home</button>
                <button onClick={() => handleNav('marketplace')} className="text-2xl font-bold text-foreground hover:text-primary transition-colors">Marketplace</button>
                <button onClick={() => handleNav('portfolio')} className="text-2xl font-bold text-foreground hover:text-primary transition-colors">Portfolio</button>
                <button onClick={() => handleNav('about')} className="text-2xl font-bold text-foreground hover:text-primary transition-colors">About</button>
                <div className="h-px w-full bg-border my-4" />
                <button onClick={onLogout} className="text-lg font-medium text-red-500 flex items-center justify-center gap-2">
                   <LogOut className="w-5 h-5" /> Sign Out
                </button>
             </>
          ) : (
             <>
                <button onClick={() => { onOpenAuth('login'); setIsMenuOpen(false); }} className="text-2xl font-bold text-foreground hover:text-primary transition-colors">Log In</button>
                <button onClick={() => { onOpenAuth('signup'); setIsMenuOpen(false); }} className="text-2xl font-bold text-primary">Get Started</button>
             </>
          )}
        </div>
        
        {/* Close Button at Bottom */}
        <button 
          onClick={() => setIsMenuOpen(false)}
          className="absolute bottom-10 p-4 rounded-full bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground transition-all"
        >
          <X className="w-6 h-6" />
        </button>
      </div>
    </>
  );
}
