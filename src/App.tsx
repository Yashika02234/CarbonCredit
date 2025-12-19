import { useState, Suspense, lazy } from 'react';
import { Loader2 } from 'lucide-react';
import { CarbonCredit, ViewState } from './lib/types';

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
const ProjectDetail = lazy(() => import('./components/explorer/ProjectDetail'));

// ViewState is imported from ./lib/types

const PageLoader = () => (
  <div className="h-screen w-full flex items-center justify-center bg-background">
    <Loader2 className="w-10 h-10 text-primary animate-spin" />
  </div>
);

function App() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('signup');
  const [showContact, setShowContact] = useState(false);

  const [currentView, setCurrentView] = useState<ViewState>(() => {
    const savedAuth = localStorage.getItem('offset_isLoggedIn');
    return savedAuth === 'true' ? 'home' : 'landing';
  });

  const [selectedProject, setSelectedProject] = useState<CarbonCredit | null>(null);

  const [isLoggedIn, setIsLoggedIn] = useState(
    () => localStorage.getItem('offset_isLoggedIn') === 'true'
  );

  // --- ACTIONS ---
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
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-[#30574E]/30">
      <Header
        showContent={true}
        isLoggedIn={isLoggedIn}
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenAuth={handleOpenAuth}
        onLogout={handleLogout}
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
                {currentView === 'home' && <HomePage onNavigate={handleNavigate} />}
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
                {/* Fallback for landing view when logged in */}
                {currentView === 'landing' && <HomePage onNavigate={handleNavigate} />}
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