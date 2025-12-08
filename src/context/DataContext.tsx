import { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import { CarbonCredit } from '../lib/types';

interface DataContextType {
  projects: CarbonCredit[];
  userBalance: string;
  isLoading: boolean;
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
  refreshData: () => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// --- MOCK DATA GENERATOR ---
const PROJECT_TYPES = ['Forestry', 'Renewable', 'Blue Carbon', 'Community', 'Solar', 'Wind', 'Agriculture', 'Waste'];
const STATUSES = ['Active', 'Selling Fast', 'Coming Soon', 'Sold Out'];
const COUNTRIES = ['Brazil', 'Indonesia', 'India', 'USA', 'Philippines', 'Kenya', 'Peru'];

const MOCK_PROJECTS: CarbonCredit[] = Array.from({ length: 100 }).map((_, i) => {
  const type = PROJECT_TYPES[i % PROJECT_TYPES.length];
  return {
    id: `c-${i}`,
    projectName: `Amazon Reforestation Project ${i + 1}`,
    pricePerCredit: 15 + Math.random() * 20,
    location: 'Amazonas',
    country: COUNTRIES[i % COUNTRIES.length],
    vintage: 2020 + (i % 4),
    registry: i % 2 === 0 ? 'Verra' : 'Gold Standard',
    trustScore: i === 0 ? 99.5 : 85 + Math.floor(Math.random() * 15),
    availableCredits: 1000 + i * 100,
    status: STATUSES[i % STATUSES.length],
    projectType: type,
    unicId: `UNI-${i}-BRA`,
    image: `https://source.unsplash.com/random/800x600?nature,forest&sig=${i}`
  };
});

export function DataProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<CarbonCredit[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userBalance, setUserBalance] = useState("0 CO2e");

  useEffect(() => {
    const initData = async () => {
      await new Promise(resolve => setTimeout(resolve, 800));
      setProjects(MOCK_PROJECTS);
      setIsLoading(false);
    };
    initData();
  }, []);

  const login = () => {
    setIsLoggedIn(true);
    setUserBalance("2,450 CO2e");
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserBalance("0 CO2e");
  };

  const refreshData = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    setProjects(MOCK_PROJECTS);
    setIsLoading(false);
  };

  const value = useMemo(() => ({
    projects, userBalance, isLoading, isLoggedIn, login, logout, refreshData
  }), [projects, userBalance, isLoading, isLoggedIn]);

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) throw new Error('useData must be used within a DataProvider');
  return context;
};