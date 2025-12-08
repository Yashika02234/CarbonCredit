import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Loader2 } from 'lucide-react';
import { CarbonCredit } from './lib/types';

// --- IMPORTS (Connecting your existing files) ---
import Header from './components/layout/Header';
import AuthModal from './components/layout/AuthModal';

// --- LAZY IMPORTS (Performance) ---
// These load only when needed, making the app "Fast as Hell"
const LandingPage = lazy(() => import('./components/landing/LandingPage'));
const HomePage = lazy(() => import('./components/home/HomePage'));
const Explorer = lazy(() => import('./components/explorer/Explorer'));
const Portfolio = lazy(() => import('./components/portfolio/Portfolio'));
const AboutPage = lazy(() => import('./components/about/AboutPage'));
const ProjectDetail = lazy(() => import('./components/explorer/ProjectDetail'));

export type ViewState = 'landing' | 'home' | 'marketplace' | 'portfolio' | 'about';

// --- LOADING SPINNER ---
const PageLoader = () => (
  <div className="h-screen w-full flex items-center justify-center bg-[#020617]">
    <Loader2 className="w-10 h-10 text-emerald-500 animate-spin" />
  </div>
);

function App() {
  // --- STATE MANAGEMENT ---
  const [showContent, setShowContent] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('signup');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  
  // Navigation
  const [currentView, setCurrentView] = useState<ViewState>('landing');
  const [selectedProject, setSelectedProject] = useState<CarbonCredit | null>(null);

  // --- EFFECTS ---
  
  // 1. Fade-in on load
  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // 2. Theme Toggle Class
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // --- ACTIONS ---

  const handleNavigate = (view: ViewState) => {
    setCurrentView(view);
    setSelectedProject(null); // Clear detail view if switching tabs
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenAuth = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const handleAuthSuccess = () => {
    setIsLoggedIn(true);
    setIsAuthModalOpen(false);
    handleNavigate('home'); // Go to Dashboard on login
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    handleNavigate('landing'); // Go to Landing on logout
  };

  return (
    <div className={`min-h-screen font-sans selection:bg-emerald-500/30 transition-colors duration-300 ${theme === 'dark' ? 'bg-[#020617] text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      
      {/* 1. HEADER (Navigation Controller) */}
      <Header
        showContent={showContent}
        isLoggedIn={isLoggedIn}
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenAuth={handleOpenAuth}
        onLogout={handleLogout}
        theme={theme}
        onToggleTheme={() => setTheme(prev => prev === 'dark' ? 'light' : 'dark')}
      />

      {/* 2. AUTH MODAL (Global Overlay) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        initialMode={authMode}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
      />

      {/* 3. MAIN CONTENT ROUTER */}
      <main className={`transition-opacity duration-700 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
        <Suspense fallback={<PageLoader />}>
          {isLoggedIn ? (
            <>
              {selectedProject ? (
                // Show Detail View if a project is selected
                <ProjectDetail 
                  project={selectedProject} 
                  onBack={() => handleNavigate('marketplace')} 
                />
              ) : (
                // Otherwise show the active Tab
                <>
                  {currentView === 'home' && <HomePage onNavigate={handleNavigate} />}
                  
                  {currentView === 'marketplace' && (
                    <Explorer onSelectProject={(p: CarbonCredit) => {
                      setSelectedProject(p);
                      window.scrollTo(0, 0);
                    }} />
                  )}
                  
                  {currentView === 'portfolio' && <Portfolio />}
                  
                  {currentView === 'about' && <AboutPage />}
                  
                  {/* Fallback */}
                  {currentView === 'landing' && <HomePage onNavigate={handleNavigate} />}
                </>
              )}
            </>
          ) : (
            // Logged Out Views
            currentView === 'about' ? (
               <AboutPage />
            ) : (
               <LandingPage onOpenAuth={handleOpenAuth} />
            )
          )}
        </Suspense>
      </main>
    </div>
  );
}

export default App;