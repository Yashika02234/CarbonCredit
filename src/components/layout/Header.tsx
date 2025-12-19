import { useState, useEffect, ButtonHTMLAttributes } from 'react';
import { Menu, X, User, LogOut, ChevronRight } from 'lucide-react';

type ViewState = 'landing' | 'home' | 'marketplace' | 'portfolio' | 'about' | 'contact';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'icon';
  active?: boolean;
}

const NavButton = ({
  variant = 'ghost',
  active,
  className = '',
  children,
  onClick,
  ...props
}: ButtonProps) => {
  const base =
    'relative px-5 py-2 rounded-2xl text-sm font-medium transition-all duration-300 flex items-center gap-2';

  const variants: Record<string, string> = {
    primary: 'bg-white text-[#30574E] hover:scale-105',
    ghost: `
      text-white/90
      hover:text-white
      hover:bg-white/10
      ${active ? 'text-white font-semibold' : ''}
    `,
    icon:
      'p-2 hover:bg-white/10 text-white/80 hover:text-white rounded-full aspect-square justify-center',
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
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
}

export default function Header({
  showContent = true,
  isLoggedIn,
  currentView = 'home',
  onNavigate = () => {},
  onOpenAuth,
  onLogout,
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
      {/* FLOATING HEADER */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-500 ${
          showContent ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        } ${scrolled ? 'pt-4' : 'pt-4 md:pt-6'}`}
      >
        <header
          className={`
            relative flex items-center justify-between
            bg-[#30574E] text-white
            transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]
            ${
              scrolled
                ? 'w-[95%] md:w-[800px] rounded-2xl py-3 px-6 shadow-lg'
                : 'w-[95%] md:w-[1480px] rounded-2xl py-2 px-12 shadow-xl'
            }
          `}
        >
          {/* LEFT: BRAND */}
          <div
            className="text-xl font-medium tracking-wide cursor-pointer"
            onClick={() => handleNav('landing')}
          >
            Offset
          </div>

          {/* RIGHT: NAV + ACTIONS */}
          <div className="hidden md:flex items-center gap-2">
            {!isLoggedIn && (
              <>
                <NavButton active={currentView === 'home'} onClick={() => handleNav('home')}>
                  Home
                </NavButton>
                <NavButton active={currentView === 'about'} onClick={() => handleNav('about')}>
                  About
                </NavButton>
                <NavButton active={currentView === 'contact'} onClick={() => handleNav('contact')}>
                  Contact
                </NavButton>

                <NavButton onClick={() => onOpenAuth('login')}>
                  Log in
                </NavButton>

                <NavButton variant="primary" onClick={() => onOpenAuth('signup')}>
                  Get Started
                  <ChevronRight className="w-3 h-3" />
                </NavButton>
              </>
            )}

            {isLoggedIn && (
              <>
                <NavButton active={currentView === 'home'} onClick={() => handleNav('home')}>
                  Home
                </NavButton>
                <NavButton active={currentView === 'marketplace'} onClick={() => handleNav('marketplace')}>
                  Marketplace
                </NavButton>
                <NavButton active={currentView === 'portfolio'} onClick={() => handleNav('portfolio')}>
                  Portfolio
                </NavButton>

                <div
                  className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center cursor-pointer"
                  onClick={() => handleNav('portfolio')}
                >
                  <User className="w-4 h-4 text-white" />
                </div>

                {onLogout && (
                  <NavButton variant="icon" onClick={onLogout}>
                    <LogOut className="w-4 h-4" />
                  </NavButton>
                )}
              </>
            )}
          </div>

          {/* MOBILE MENU ICON */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-white/80 hover:text-white"
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </header>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`fixed inset-0 z-40 bg-[#30574E] transition-all duration-500 flex flex-col justify-center items-center gap-8 ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col gap-6 text-center">
          <button onClick={() => handleNav('home')} className="text-2xl font-semibold text-white">
            Home
          </button>
          <button onClick={() => handleNav('about')} className="text-2xl font-semibold text-white">
            About
          </button>
          <button onClick={() => handleNav('contact')} className="text-2xl font-semibold text-white">
            Contact
          </button>
          <button onClick={() => onOpenAuth('login')} className="text-2xl font-semibold text-white">
            Log In
          </button>
          <button onClick={() => onOpenAuth('signup')} className="text-2xl font-semibold text-white">
            Get Started
          </button>
        </div>

        <button
          onClick={() => setIsMenuOpen(false)}
          className="absolute bottom-10 p-4 rounded-full bg-white/20 text-white"
        >
          <X className="w-6 h-6" />
        </button>
      </div>
    </>
  );
}
