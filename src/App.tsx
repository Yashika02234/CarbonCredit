import React, { useState, useEffect } from 'react';
import Header from './components/layout/Header';
import AuthModal from './components/layout/AuthModal';
import Explorer from './components/explorer/Explorer';
import LandingPage from './components/landing/LandingPage';
import ProjectDetail from './components/explorer/ProjectDetail';
import Portfolio from './components/portfolio/Portfolio';
import HomePage from './components/home/HomePage';
import AboutPage from './components/about/AboutPage';
import { CarbonCredit } from './lib/types';

export type ViewState = 'landing' | 'home' | 'marketplace' | 'portfolio' | 'about';

function App() {
  const [showContent, setShowContent] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('signup');

  // Navigation State
  const [currentView, setCurrentView] = useState<ViewState>('landing');
  const [selectedProject, setSelectedProject] = useState<CarbonCredit | null>(
    null,
  );

  useEffect(() => {
    const contentTimer = setTimeout(() => {
      setShowContent(true);
    }, 1500);
    return () => clearTimeout(contentTimer);
  }, []);

  // --- Auth Handlers ---
  const handleOpenAuth = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const handleAuthSuccess = () => {
    setIsLoggedIn(true);
    setIsAuthModalOpen(false);
    setCurrentView('home'); // After login, go to Home dashboard
    window.scrollTo(0, 0);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setSelectedProject(null);
    setCurrentView('landing');
    window.scrollTo(0, 0);
  };

  // --- Navigation Handlers ---
  const handleNavigate = (view: ViewState) => {
    setCurrentView(view);
    setSelectedProject(null);
    window.scrollTo(0, 0);
  };

  const handleSelectProject = (project: CarbonCredit) => {
    setSelectedProject(project);
    window.scrollTo(0, 0);
  };

  const handleBackToExplorer = () => {
    setSelectedProject(null);
    setCurrentView('marketplace');
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500/30">
      <Header
        showContent={showContent}
        isLoggedIn={isLoggedIn}
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenAuth={handleOpenAuth}
        onLogout={handleLogout}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        initialMode={authMode}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
      />

      <main
        className={`fade-in-content ${
          showContent ? 'opacity-100' : 'opacity-0'
        } transition-opacity duration-1000`}
      >
        {isLoggedIn ? (
          <>
            {selectedProject ? (
              <ProjectDetail project={selectedProject} onBack={handleBackToExplorer} />
            ) : (
              <>
                {currentView === 'home' && (
                  <HomePage onNavigate={handleNavigate} />
                )}

                {currentView === 'marketplace' && (
                  <Explorer onSelectProject={handleSelectProject} />
                )}

                {currentView === 'portfolio' && <Portfolio />}

                {currentView === 'about' && <AboutPage />}

                {/* Fallback: if somehow still 'landing' but logged in, show Home */}
                {currentView === 'landing' && (
                  <HomePage onNavigate={handleNavigate} />
                )}
              </>
            )}
          </>
        ) : (
          <LandingPage onOpenAuth={handleOpenAuth} isLoggedIn={false} />
        )}
      </main>
    </div>
  );
}

export default App;
