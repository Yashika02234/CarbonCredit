import type { ReactNode } from "react";
import type { ViewState } from "../../lib/types";

interface WorkspaceShellProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  dashboard: ReactNode;
  marketplace: ReactNode;
  portfolio: ReactNode;
}

const views: ViewState[] = ["dashboard", "marketplace", "portfolio"];

export default function WorkspaceShell({
  currentView,
  onNavigate,
  dashboard,
  marketplace,
  portfolio,
}: WorkspaceShellProps) {
  const getPanelClass = (view: ViewState) => {
    const currentIndex = views.indexOf(currentView);
    const viewIndex = views.indexOf(view);

    if (viewIndex === currentIndex) {
      return "translate-x-0 opacity-100 relative pointer-events-auto z-10";
    }

    if (viewIndex < currentIndex) {
      return "-translate-x-full opacity-0 absolute inset-0 pointer-events-none z-0";
    }

    return "translate-x-full opacity-0 absolute inset-0 pointer-events-none z-0";
  };

  return (
    <div className="relative bg-background text-foreground">
      <div className="relative overflow-hidden">
        <section
          className={`w-full transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${getPanelClass(
            "dashboard"
          )}`}
        >
          {dashboard}
        </section>

        <section
          className={`w-full transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${getPanelClass(
            "marketplace"
          )}`}
        >
          {marketplace}
        </section>

        <section
          className={`w-full transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${getPanelClass(
            "portfolio"
          )}`}
        >
          {portfolio}
        </section>
      </div>

      <div className="fixed bottom-6 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
        {views.map((view) => (
          <button
            key={view}
            onClick={() => onNavigate(view)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              currentView === view
                ? "w-10 bg-white"
                : "w-2.5 bg-white/40 hover:bg-white/70"
            }`}
            aria-label={`Go to ${view}`}
          />
        ))}
      </div>
    </div>
  );
}