import { useState, Suspense, lazy, useEffect, useCallback } from "react";
import { Loader2 } from "lucide-react";
import { CarbonCredit, ViewState } from "./lib/types";
import { getBatches } from "./lib/api";

import Header from "./components/layout/Header";
import IntroAnimation from "./components/layout/IntroAnimation";
import AuthModal from "./components/layout/AuthModal";
import WorkspaceShell from "./components/workspace/WorkspaceShell";
import { mapBatchToCredit } from "./lib/mappers";

const LandingPage = lazy(() => import("./components/landing/LandingPage"));
const Explorer = lazy(() => import("./components/explorer/Explorer"));
const Portfolio = lazy(() => import("./components/portfolio/Portfolio"));
const AboutPage = lazy(() => import("./components/about/AboutPage"));
const ContactPage = lazy(() => import("./components/contact/ContactPage"));
const ProjectDetail = lazy(() => import("./components/explorer/ProjectDetail"));
const Dashboard = lazy(() => import("./components/dashboard/Dashboard"));
const AnalyzePage = lazy(() => import("./components/analyze/AnalyzePage"));

const PageLoader = () => (
  <div className="h-screen w-full flex items-center justify-center bg-background">
    <Loader2 className="w-10 h-10 text-primary animate-spin" />
  </div>
);



function App() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("signup");
  const [showContact, setShowContact] = useState(false);

  const [currentView, setCurrentView] = useState<ViewState>(() => {
    const savedAuth = localStorage.getItem("offset_isLoggedIn");
    return savedAuth === "true" ? "dashboard" : "landing";
  });

  const [selectedProject, setSelectedProject] = useState<CarbonCredit | null>(null);
  const [projects, setProjects] = useState<CarbonCredit[]>([]);
  const [isProjectsLoading, setIsProjectsLoading] = useState(true);

  const [isLoggedIn, setIsLoggedIn] = useState(
    () => localStorage.getItem("offset_isLoggedIn") === "true"
  );

  const loadProjects = useCallback(async () => {
    try {
      setIsProjectsLoading(true);
      const data = await getBatches();
      const mapped = ((data as any).items || []).map((item: any) => mapBatchToCredit(item));
      setProjects(mapped);

      setSelectedProject((prev) => {
        if (!prev) return prev;
        const updated = mapped.find((p: CarbonCredit) => p.batch_id === prev.batch_id);
        return updated || prev;
      });
    } catch (error) {
      console.error("Failed to load projects", error);
      setProjects([]);
    } finally {
      setIsProjectsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isLoggedIn) return;

    loadProjects();
    const interval = setInterval(loadProjects, 5000);

    return () => clearInterval(interval);
  }, [isLoggedIn, loadProjects]);

  const handleNavigate = (view: ViewState) => {
    if (view === "contact") {
      setShowContact(true);
      return;
    }

    setCurrentView(view);
    setSelectedProject(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleOpenAuth = (mode: "login" | "signup") => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const handleAuthSuccess = () => {
    localStorage.setItem("offset_isLoggedIn", "true");
    setIsLoggedIn(true);
    setIsAuthModalOpen(false);
    handleNavigate("dashboard");
  };

  const handleLogout = () => {
    localStorage.removeItem("offset_isLoggedIn");
    setIsLoggedIn(false);
    setProjects([]);
    setSelectedProject(null);
    handleNavigate("landing");
  };

  const handlePurchaseSuccess = async (
    batchId: string,
    remaining?: number,
    newVersion?: number
  ) => {
    setProjects((prev) =>
      prev.map((p) =>
        p.batch_id === batchId
          ? {
              ...p,
              available_quantity:
                typeof remaining === "number" ? remaining : p.available_quantity,
              availableCredits:
                typeof remaining === "number" ? remaining : p.availableCredits,
              version: typeof newVersion === "number" ? newVersion : p.version,
              status:
                typeof remaining === "number" && remaining <= 0
                  ? "UNAVAILABLE"
                  : p.status,
            }
          : p
      )
    );

    setSelectedProject((prev) => {
      if (!prev || prev.batch_id !== batchId) return prev;
      return {
        ...prev,
        available_quantity:
          typeof remaining === "number" ? remaining : prev.available_quantity,
        availableCredits:
          typeof remaining === "number" ? remaining : prev.availableCredits,
        version: typeof newVersion === "number" ? newVersion : prev.version,
        status:
          typeof remaining === "number" && remaining <= 0
            ? "UNAVAILABLE"
            : prev.status,
      };
    });

    await loadProjects();
  };

  return (
    <IntroAnimation enabled={!isLoggedIn}>
      <div className="min-h-screen bg-background text-foreground font-sans selection:bg-[#30574E]/30">
        <Header
        showContent
        isLoggedIn={isLoggedIn}
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenAuth={handleOpenAuth}
        onLogout={handleLogout}
      />

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
                onBack={() => handleNavigate("marketplace")}
                onPurchaseSuccess={handlePurchaseSuccess}
              />
            ) : (
              <WorkspaceShell
                currentView={currentView}
                onNavigate={handleNavigate}
                dashboard={<Dashboard />}
                marketplace={
                  <Explorer
                    projects={projects}
                    isLoading={isProjectsLoading}
                    onSelectProject={(p: CarbonCredit) => {
                      setSelectedProject(p);
                      window.scrollTo({ top: 0 });
                    }}
                  />
                }
                analyze={<AnalyzePage />}
                portfolio={<Portfolio />}
              />
            )
          ) : currentView === "about" ? (
            <AboutPage />
          ) : (
            <LandingPage onOpenAuth={handleOpenAuth} />
          )}
        </Suspense>
      </main>
      </div>
    </IntroAnimation>
  );
}

export default App;