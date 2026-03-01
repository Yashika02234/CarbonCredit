import { useState, useEffect, ButtonHTMLAttributes } from 'react';
import { Menu, X, User, LogOut, ChevronRight } from 'lucide-react';

import type { ViewState } from '../../lib/types';

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
    primary: `
      bg-emerald-800 
      text-white 
      hover:bg-emerald-900 
      hover:scale-105
    `,
    ghost: `
      transition-colors duration-300
      ${active ? 'font-semibold' : ''}
    `,
    icon:
      'p-2 hover:bg-black/10 text-black/70 hover:text-black rounded-full aspect-square justify-center',
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
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = (view: ViewState) => {
    onNavigate(view);
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* FLOATING HEADER CONTAINER */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
        ${showContent ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}
        ${scrolled ? 'pt-4' : 'pt-8'}
      `}
      >
        <header
          className={`
            relative flex items-center justify-between
            transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
            backdrop-blur-xl

            ${
              scrolled
                ? `
                  bg-white/95
                  shadow-2xl
                  w-[96%] md:w-[1200px]
                  py-3 px-10
                  rounded-2xl
                  scale-[0.97]
                  text-[#0f172a]
                `
                : `
                  bg-transparent
                  w-[98%] md:w-[1580px]
                  py-6 px-16
                  rounded-[28px]
                  scale-100
                  text-white
                `
            }
          `}
        >
          {/* LEFT: BRAND */}
          <div
            className={`text-3xl font-semibold tracking-[0.3em] cursor-pointer select-none transition-colors duration-500 ${
              scrolled ? 'text-[#0f172a]' : 'text-white'
            }`}
            onClick={() => handleNav('landing')}
          >
            OFFSET
          </div>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center gap-2">
            {!isLoggedIn && (
              <>
                <NavButton
                  className={`${scrolled ? 'text-gray-800 hover:bg-black/5' : 'text-white hover:bg-white/10'}`}
                  active={currentView === 'home'}
                  onClick={() => handleNav('home')}
                >
                  Home
                </NavButton>

                <NavButton
                  className={`${scrolled ? 'text-gray-800 hover:bg-black/5' : 'text-white hover:bg-white/10'}`}
                  active={currentView === 'about'}
                  onClick={() => handleNav('about')}
                >
                  About
                </NavButton>

                <NavButton
                  className={`${scrolled ? 'text-gray-800 hover:bg-black/5' : 'text-white hover:bg-white/10'}`}
                  active={currentView === 'contact'}
                  onClick={() => handleNav('contact')}
                >
                  Contact
                </NavButton>

                <NavButton
                  className={`${scrolled ? 'text-gray-800 hover:bg-black/5' : 'text-white hover:bg-white/10'}`}
                  onClick={() => onOpenAuth('login')}
                >
                  Log in
                </NavButton>

                <NavButton variant="primary" onClick={() => onOpenAuth('signup')}>
                  Sign Up
                  <ChevronRight className="w-5 h-5" />
                </NavButton>
              </>
            )}

            {isLoggedIn && (
              <>
                <NavButton
                  className={`${scrolled ? 'text-gray-800 hover:bg-black/5' : 'text-white hover:bg-white/10'}`}
                  active={currentView === 'home'}
                  onClick={() => handleNav('home')}
                >
                  Home
                </NavButton>

                <NavButton
                  className={`${scrolled ? 'text-gray-800 hover:bg-black/5' : 'text-white hover:bg-white/10'}`}
                  active={currentView === 'marketplace'}
                  onClick={() => handleNav('marketplace')}
                >
                  Marketplace
                </NavButton>

                <NavButton
                  className={`${scrolled ? 'text-gray-800 hover:bg-black/5' : 'text-white hover:bg-white/10'}`}
                  active={currentView === 'portfolio'}
                  onClick={() => handleNav('portfolio')}
                >
                  Portfolio
                </NavButton>

                <div
                  className={`h-8 w-8 rounded-full flex items-center justify-center cursor-pointer ${
                    scrolled ? 'bg-black/10' : 'bg-white/20'
                  }`}
                  onClick={() => handleNav('dashboard')}
                >
                  <User className={`w-4 h-4 ${scrolled ? 'text-black' : 'text-white'}`} />
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
            className={`md:hidden p-2 transition-colors ${
              scrolled ? 'text-black/70 hover:text-black' : 'text-white/80 hover:text-white'
            }`}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </header>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`fixed inset-0 z-40 bg-emerald-900 transition-all duration-500 flex flex-col justify-center items-center gap-8 ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col gap-6 text-center">
          {!isLoggedIn && (
            <>
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
                Sign Up
              </button>
            </>
          )}

          {isLoggedIn && (
            <>
              <button onClick={() => handleNav('home')} className="text-2xl font-semibold text-white">
                Home
              </button>
              <button onClick={() => handleNav('marketplace')} className="text-2xl font-semibold text-white">
                Marketplace
              </button>
              <button onClick={() => handleNav('portfolio')} className="text-2xl font-semibold text-white">
                Portfolio
              </button>
              <button onClick={() => handleNav('dashboard')} className="text-2xl font-semibold text-white">
                Dashboard
              </button>
              {onLogout && (
                <button onClick={onLogout} className="text-2xl font-semibold text-white">
                  Logout
                </button>
              )}
            </>
          )}
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