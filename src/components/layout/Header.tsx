import { useState, useEffect, ButtonHTMLAttributes } from "react";
import { Menu, X, User, LogOut } from "lucide-react";
import type { ViewState } from "../../lib/types";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost" | "icon";
  active?: boolean;
}

const NavButton = ({
  variant = "ghost",
  active,
  className = "",
  children,
  onClick,
  ...props
}: ButtonProps) => {
  const base =
    "relative px-5 py-2 rounded-2xl text-sm font-medium transition-all duration-300 flex items-center gap-2";

  const variants: Record<string, string> = {
    primary: `
      bg-white
      text-emerald-900
      hover:bg-gray-100
      hover:scale-105
    `,
    ghost: `
      transition-colors duration-300
      ${active ? "font-semibold" : ""}
    `,
    icon:
      "p-2 hover:bg-white/20 text-white hover:text-white rounded-full aspect-square justify-center",
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
  onOpenAuth: (mode: "login" | "signup") => void;
  isLoggedIn: boolean;
  showContent?: boolean;
  currentView?: ViewState;
  onNavigate?: (view: ViewState) => void;
  onLogout?: () => void;
}

const workspaceTabs: ViewState[] = ["dashboard", "marketplace", "portfolio"];

export default function Header({
  showContent = true,
  isLoggedIn,
  currentView = "landing",
  onNavigate = () => {},
  onOpenAuth,
  onLogout,
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNav = (view: ViewState) => {
    onNavigate(view);
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* LOGGED OUT HEADER */}
      {!isLoggedIn && (
        <div
          className={`fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
          ${showContent ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}
          ${scrolled ? "pt-4" : "pt-8"}
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
                    bg-emerald-900/95
                    shadow-2xl
                    w-[96%] md:w-[1200px]
                    py-3 px-8
                    rounded-2xl
                    scale-[0.97]
                    text-white
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
            <div
              className="text-3xl font-semibold tracking-[0.3em] cursor-pointer select-none text-white"
              onClick={() => handleNav("landing")}
            >
              OFFSET
            </div>

            <div className="hidden md:flex items-center gap-2">
              <NavButton
                className="text-white hover:bg-white/10"
                active={currentView === "landing"}
                onClick={() => handleNav("landing")}
              >
                Home
              </NavButton>

              <NavButton
                className="text-white hover:bg-white/10"
                active={currentView === "about"}
                onClick={() => handleNav("about")}
              >
                About
              </NavButton>

              <NavButton
                className="text-white hover:bg-white/10"
                active={currentView === "contact"}
                onClick={() => handleNav("contact")}
              >
                Contact
              </NavButton>

              <NavButton
                className="text-white hover:bg-white/10"
                onClick={() => onOpenAuth("login")}
              >
                Log in
              </NavButton>

              <NavButton variant="primary" onClick={() => onOpenAuth("signup")}>
                Sign Up
              </NavButton>
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 transition-colors text-white/80 hover:text-white"
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </header>
        </div>
      )}

      {/* LOGGED IN HEADER */}
      {isLoggedIn && (
        <div className="relative z-40 w-full border-b border-white/10 bg-emerald-900 text-white">
          <header className="w-full px-6 md:px-10 lg:px-14 py-5">
            <div className="flex items-center justify-between gap-6">
              <div
                className="text-3xl font-semibold tracking-[0.3em] cursor-pointer select-none text-white shrink-0"
                onClick={() => handleNav("dashboard")}
              >
                OFFSET
              </div>

              <div className="hidden md:flex items-center gap-4">
                <div className="flex items-center rounded-full bg-white/10 p-1 border border-white/10">
                  {workspaceTabs.map((tab) => {
                    const isActive = currentView === tab;

                    return (
                      <button
                        key={tab}
                        onClick={() => handleNav(tab)}
                        className={`px-5 py-2 rounded-full text-sm font-medium capitalize transition-all duration-300 ${
                          isActive
                            ? "bg-white text-emerald-900 shadow-sm"
                            : "text-white/80 hover:text-white"
                        }`}
                      >
                        {tab}
                      </button>
                    );
                  })}
                </div>

                <button
                  className="h-10 w-10 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 transition"
                  onClick={() => handleNav("dashboard")}
                >
                  <User className="w-4 h-4 text-white" />
                </button>

                {onLogout && (
                  <button
                    onClick={onLogout}
                    className="h-10 w-10 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                )}
              </div>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 transition-colors text-white/80 hover:text-white"
              >
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </header>
        </div>
      )}

      {/* MOBILE MENU */}
      <div
        className={`fixed inset-0 z-50 bg-emerald-950 transition-all duration-500 flex flex-col justify-center items-center gap-8 ${
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col gap-6 text-center">
          {!isLoggedIn ? (
            <>
              <button
                onClick={() => handleNav("landing")}
                className="text-2xl font-semibold text-white"
              >
                Home
              </button>
              <button
                onClick={() => handleNav("about")}
                className="text-2xl font-semibold text-white"
              >
                About
              </button>
              <button
                onClick={() => handleNav("contact")}
                className="text-2xl font-semibold text-white"
              >
                Contact
              </button>
              <button
                onClick={() => onOpenAuth("login")}
                className="text-2xl font-semibold text-white"
              >
                Log In
              </button>
              <button
                onClick={() => onOpenAuth("signup")}
                className="text-2xl font-semibold text-white"
              >
                Sign Up
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => handleNav("dashboard")}
                className="text-2xl font-semibold text-white capitalize"
              >
                Dashboard
              </button>
              <button
                onClick={() => handleNav("marketplace")}
                className="text-2xl font-semibold text-white capitalize"
              >
                Marketplace
              </button>
              <button
                onClick={() => handleNav("portfolio")}
                className="text-2xl font-semibold text-white capitalize"
              >
                Portfolio
              </button>
              {onLogout && (
                <button
                  onClick={onLogout}
                  className="text-2xl font-semibold text-white"
                >
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