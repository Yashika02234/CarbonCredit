// src/lib/mock-data.ts
import { CarbonCredit } from './types';
import { Leaf, Wind, Droplets, TrendingUp } from "lucide-react";

// ==================================================================
// 1. FILTERS & OPTIONS
// ==================================================================

export const projectTypes = [
  'all',
  'Forestry (REDD+)',
  'Renewable Energy',
  'Blue Carbon',
  'Community Projects',
  'Waste Recovery',
  'Tech-Based Removal',
];

export const registryTypes = ['all', 'reward', 'purchase', 'payment'];

export const sortOptions: { [key: string]: string } = {
  trustScore: 'Trust Score',
  vintage: 'Newest (Vintage)',
  availableCredits: 'Available (High)',
  pricePerCredit: 'Price (Low)',
};

export const REGISTRIES = [
  'Verra (VCS)',
  'Gold Standard',
  'Climate Action Reserve',
  'American Carbon Registry',
  'Puro.earth',
] as const;

// ==================================================================
// 2. MARKETPLACE MOCK PROJECTS
// ==================================================================

const baseMockCredits: CarbonCredit[] = [
  {
    id: '1',
    unicId: 'VCS-2891-2023-001',
    projectName: 'Amazon Rainforest Conservation',
    location: 'Acre, Brazil',
    country: 'Brazil',
    registry: 'Verra (VCS)',
    vintage: 2023,
    status: 'active',
    trustScore: 94,
    availableCredits: 12500,
    pricePerCredit: 18.5,
    projectType: 'Forestry (REDD+)',
    image: 'https://images.pexels.com/photos/975771/pexels-photo-975771.jpeg',
  },
  {
    id: '2',
    unicId: 'GS-4512-2022-048',
    projectName: 'Wind Energy Maharashtra',
    location: 'Maharashtra, India',
    country: 'India',
    registry: 'Gold Standard',
    vintage: 2022,
    status: 'active',
    trustScore: 88,
    availableCredits: 8400,
    pricePerCredit: 15.2,
    projectType: 'Renewable Energy',
    image: 'https://images.pexels.com/photos/414837/pexels-photo-414837.jpeg',
  },
  {
    id: '3',
    unicId: 'CAR-1223-2023-092',
    projectName: 'Clean Cookstoves for Kenya',
    location: 'Nairobi Region, Kenya',
    country: 'Kenya',
    registry: 'Climate Action Reserve',
    vintage: 2023,
    status: 'active',
    trustScore: 91,
    availableCredits: 5600,
    pricePerCredit: 12.8,
    projectType: 'Community Projects',
    image: 'https://images.pexels.com/photos/6473875/pexels-photo-6473875.jpeg',
  },
  {
    id: '4',
    unicId: 'VCS-3345-2021-156',
    projectName: 'Sumatra Peatland Restoration',
    location: 'Sumatra, Indonesia',
    country: 'Indonesia',
    registry: 'Verra (VCS)',
    vintage: 2021,
    status: 'retired',
    trustScore: 86,
    availableCredits: 0,
    pricePerCredit: 16.0,
    projectType: 'Blue Carbon',
    image: 'https://images.pexels.com/photos/1179229/pexels-photo-1179229.jpeg',
  },
  {
    id: '5',
    unicId: 'ACR-2876-2023-034',
    projectName: 'Solar Energy Rural Communities',
    location: 'Tamil Nadu, India',
    country: 'India',
    registry: 'American Carbon Registry',
    vintage: 2023,
    status: 'active',
    trustScore: 89,
    availableCredits: 9800,
    pricePerCredit: 14.5,
    projectType: 'Renewable Energy',
    image: 'https://images.pexels.com/photos/433308/pexels-photo-433308.jpeg',
  },
  {
    id: '6',
    unicId: 'GS-5234-2022-071',
    projectName: 'Andean Forest Protection',
    location: 'Cusco, Peru',
    country: 'Peru',
    registry: 'Gold Standard',
    vintage: 2022,
    status: 'active',
    trustScore: 92,
    availableCredits: 7200,
    pricePerCredit: 19.3,
    projectType: 'Forestry (REDD+)',
    image: 'https://images.pexels.com/photos/1179225/pexels-photo-1179225.jpeg',
  },
  {
    id: '7',
    unicId: 'VCS-4123-2023-089',
    projectName: 'Blue Carbon Mangrove Restoration',
    location: 'Delta Region, Vietnam',
    country: 'Vietnam',
    registry: 'Verra (VCS)',
    vintage: 2023,
    status: 'pending',
    trustScore: 78,
    availableCredits: 4500,
    pricePerCredit: 13.7,
    projectType: 'Blue Carbon',
    image: 'https://images.pexels.com/photos/1619299/pexels-photo-1619299.jpeg',
  },
  {
    id: '8',
    unicId: 'CAR-3567-2022-145',
    projectName: 'Oaxaca Biogas Digesters',
    location: 'Oaxaca, Mexico',
    country: 'Mexico',
    registry: 'Climate Action Reserve',
    vintage: 2022,
    status: 'active',
    trustScore: 85,
    availableCredits: 6300,
    pricePerCredit: 11.9,
    projectType: 'Waste Recovery',
    image: 'https://images.pexels.com/photos/2516423/pexels-photo-2516423.jpeg',
  },
  {
    id: '9',
    unicId: 'PURO-9001-2024-001',
    projectName: 'Biochar Carbon Removal',
    location: 'Helsinki, Finland',
    country: 'Finland',
    registry: 'Puro.earth',
    vintage: 2024,
    status: 'active',
    trustScore: 96,
    availableCredits: 2000,
    pricePerCredit: 120.0,
    projectType: 'Tech-Based Removal',
    image: 'https://images.pexels.com/photos/1834400/pexels-photo-1834400.jpeg',
  },
];

// statuses aligned with Explorer filters (lowercase)
const STATUSES = ['active', 'retired', 'pending'] as const;

// tweak helper (keeps values in a nice range)
const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));

export const mockCredits: CarbonCredit[] = Array.from(
  { length: 10000 }, 
  (_, idx) => {
    const base = baseMockCredits[idx % baseMockCredits.length];

    const status = STATUSES[idx % STATUSES.length];

    const vintage = 2021 + (idx % 4); // 2021–2024 loop
    const priceJitter = ((idx % 7) - 3) * 0.4; // -1.2 .. +1.2
    const trustJitter = (idx % 9) - 4; // -4 .. +4

    const pricePerCredit = clamp(
      base.pricePerCredit + priceJitter,
      5,
      200,
    );

    const trustScore = clamp(
      base.trustScore + trustJitter,
      70,
      99,
    );

    const availableCredits =
      base.availableCredits + (idx % 500) * 10; // some scaling

    // make IDs + UNIC IDs unique-ish but readable
    const series = Math.floor(idx / baseMockCredits.length)
      .toString()
      .padStart(3, '0');

    const id = `${base.id}-${series}-${idx}`;
    const unicPrefix = base.unicId.split('-')[0]; // e.g. "VCS", "GS"
    const unicId = `${unicPrefix}-${vintage}-${series}-${String(idx).padStart(
      4,
      '0',
    )}`;

    return {
      ...base,
      id,
      unicId,
      status,
      vintage,
      pricePerCredit,
      trustScore,
      availableCredits,
    };
  },
);

// ==================================================================
// 3. DASHBOARD ACTIVITY DATA (THIS IS WHAT WAS MISSING)
// ==================================================================

export const ACTIVITY_DATA = [
  { 
    id: "CRT-01", 
    project: "Forest Conservation", 
    amount: 1650, 
    type: "Forestry", 
    icon: Leaf, 
    bg: "bg-[#749A74]" 
  },
  { 
    id: "CRT-02", 
    project: "Wind Farm", 
    amount: 12000, 
    type: "Renewable", 
    icon: Wind, 
    bg: "bg-[#8FA3AD]" 
  },
  { 
    id: "CRT-03", 
    project: "Mangrove Restoration", 
    amount: 80000, 
    type: "Blue Carbon", 
    icon: Droplets, 
    bg: "bg-[#7FA3C4]" 
  },
  { 
    id: "CRT-04", 
    project: "Clean Cookstoves", 
    amount: 400, 
    type: "Community", 
    icon: TrendingUp, 
    bg: "bg-orange-400" 
  },
];

// ==================================================================
// 4. CHART LOGIC HELPER
// ==================================================================

export const getChartData = (viewMode: string, currentMonthLabel: string) => {
  switch (viewMode) {
    case "Month to View":
      return [
        { label: "Week 1", h: "40%" },
        { label: "Week 2", h: "60%" },
        { label: "Week 3", h: "30%" },
        { label: "Week 4", h: "85%" },
      ];
    case "Week to View":
      return [
        { label: "Mon", h: "20%" },
        { label: "Tue", h: "45%" },
        { label: "Wed", h: "30%" },
        { label: "Thu", h: "70%" },
        { label: "Fri", h: "55%" },
        { label: "Sat", h: "90%" },
        { label: "Sun", h: "40%" },
      ];
    case "Year to View":
    default:
      return [
        { label: "Jan", h: "20%" },
        { label: "Feb", h: "30%" },
        { label: "Mar", h: "50%" },
        { label: "Apr", h: "75%" },
        { label: "May", h: "70%" },
        { label: "Jun", h: "65%" },
        { label: currentMonthLabel, h: "90%" }, 
      ];
  }
};