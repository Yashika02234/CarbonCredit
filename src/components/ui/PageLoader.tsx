import { Loader2 } from 'lucide-react';

export default function PageLoader() {
  return (
    <div className="flex h-[calc(100vh-80px)] w-full items-center justify-center bg-slate-50">
      <div className="flex flex-col items-center gap-4">
        {/* Animated Spinner */}
        <div className="relative">
          <div className="h-12 w-12 rounded-full border-4 border-slate-200"></div>
          <div className="absolute top-0 h-12 w-12 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent"></div>
        </div>
        <p className="text-sm font-medium text-slate-500 animate-pulse">
          Loading Ecosystem...
        </p>
      </div>
    </div>
  );
}