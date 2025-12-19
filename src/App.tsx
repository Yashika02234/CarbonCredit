import { useState, useEffect, Suspense, lazy } from 'react';
import { Loader2 } from 'lucide-react';
import { CarbonCredit } from './lib/types';

// --- IMPORTS ---
import Header from './components/layout/Header';
import AuthModal from './components/layout/AuthModal';

// --- LAZY IMPORTS ---
const LandingPage = lazy(() => import('./components/landing/LandingPage'));
const HomePage = lazy(() => import('./components/home/HomePage'));
const Explorer = lazy(() => import('./components/explorer/Explorer'));
const Portfolio = lazy(() => import('./components/portfolio/Portfolio'));
const AboutPage = lazy(() => import('./components/about/AboutPage'));
const ContactPage = lazy(() => import('./components/contact/ContactPage'));
const ProjectDetail = lazy(
  () => import('./components/explorer/ProjectDetail')
);

// ✅ ADD contact here
export type ViewState =
  | 'landing'
  | 'home'
  | 'marketplace'
  | 'portfolio'
  | 'about'
  | 'contact';

// --- LOADING SPINNER ---
const PageLoader = () => (
  <div className="h-screen w-full flex items-center justify-center bg-background">
    <Loader2 className="w-10 h-10 text-primary animate-spin" />
  </div>
);

function App() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('signup');

  const [showContact, setShowContact] = useState(false);

  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const stored = localStorage.getItem('offset_theme');
    return stored === 'dark' ? 'dark' : 'light';
  });

  const [currentView, setCurrentView] = useState<ViewState>(() => {
    const savedAuth = localStorage.getItem('offset_isLoggedIn');
    return savedAuth === 'true' ? 'home' : 'landing';
  });

  const [selectedProject, setSelectedProject] =
    useState<CarbonCredit | null>(null);

  const [isLoggedIn, setIsLoggedIn] = useState(
    () => localStorage.getItem('offset_isLoggedIn') === 'true'
  );

  // Apply Theme
  useEffect(() => {
    const root = document.documentElement;
    theme === 'dark'
      ? root.classList.add('dark')
      : root.classList.remove('dark');
    localStorage.setItem('offset_theme', theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));

  // ✅ UPDATED NAVIGATION HANDLER
  const handleNavigate = (view: ViewState) => {
    if (view === 'contact') {
      setShowContact(true);
      return;
    }

    setCurrentView(view);
    setSelectedProject(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenAuth = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const handleAuthSuccess = () => {
    localStorage.setItem('offset_isLoggedIn', 'true');
    setIsLoggedIn(true);
    setIsAuthModalOpen(false);
    handleNavigate('home');
  };

  const handleLogout = () => {
    localStorage.removeItem('offset_isLoggedIn');
    setIsLoggedIn(false);
    handleNavigate('landing');
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Header
        showContent
        isLoggedIn={isLoggedIn}
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenAuth={handleOpenAuth}
        onLogout={handleLogout}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* AUTH MODAL */}
      {isAuthModalOpen && (
        <Suspense fallback={null}>
          <AuthModal
            isOpen={isAuthModalOpen}
            initialMode={authMode}
            onClose={() => setIsAuthModalOpen(false)}
            onSuccess={handleAuthSuccess}
          />
        </Suspense>
      )}

      {/* CONTACT MODAL */}
      {showContact && (
        <Suspense fallback={null}>
          <ContactPage onClose={() => setShowContact(false)} />
        </Suspense>
      )}

      {/* MAIN CONTENT */}
      <main>
        <Suspense fallback={<PageLoader />}>
          {isLoggedIn ? (
            selectedProject ? (
              <ProjectDetail
                project={selectedProject}
                onBack={() => handleNavigate('marketplace')}
              />
            ) : (
              <>
                {currentView === 'home' && (
                  <HomePage onNavigate={handleNavigate} />
                )}
                {currentView === 'marketplace' && (
                  <Explorer
                    onSelectProject={(p: CarbonCredit) => {
                      setSelectedProject(p);
                      window.scrollTo(0, 0);
                    }}
                  />
                )}
                {currentView === 'portfolio' && <Portfolio />}
                {currentView === 'about' && <AboutPage />}
                {currentView === 'landing' && (
                  <HomePage onNavigate={handleNavigate} />
                )}
              </>
            )
          ) : currentView === 'about' ? (
            <AboutPage />
          ) : (
            <LandingPage onOpenAuth={handleOpenAuth} />
          )}
        </Suspense>
      </main>
    </div>
  );
}

export default App;
