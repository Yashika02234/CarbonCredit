import { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import { CarbonCredit } from '../lib/types'; // Assuming this exists based on your code

interface DataContextType {
  projects: CarbonCredit[];
  isLoading: boolean;
  refreshData: () => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<CarbonCredit[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // --- CACHING LOGIC ---
  // This useEffect runs only ONCE when the app starts.
  // It fetches data and stores it in the 'projects' state.
  useEffect(() => {
    const loadData = async () => {
      try {
        // Simulate server fetch - Replace this with your actual API call
        // const res = await fetch('/api/projects');
        // const data = await res.json();
        
        // Mocking delay to show off the caching speed later
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock data - Replace with real data
        const mockData: CarbonCredit[] = Array.from({ length: 10 }).map((_, i) => ({
          id: `p-${i}`,
          title: `Project ${i}`,
          price: 20 + i,
          location: 'Brazil',
          // ... add other required fields from your CarbonCredit type
        } as CarbonCredit));

        setProjects(mockData);
      } catch (error) {
        console.error("Failed to load data", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const refreshData = async () => {
    setIsLoading(true);
    // Re-fetch logic here
    setIsLoading(false);
  };

  const value = useMemo(() => ({ projects, isLoading, refreshData }), [projects, isLoading]);

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within DataProvider');
  return context;
};