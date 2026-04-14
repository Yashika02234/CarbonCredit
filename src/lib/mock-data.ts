// src/lib/mock-data.ts
import { CarbonCredit } from "./types";
import { Leaf, Wind, Droplets, TrendingUp } from "lucide-react";

// ==================================================================
// 1. FILTERS & OPTIONS
// ==================================================================

export const projectTypes = [
  "all",
  "Forestry (REDD+)",
  "Renewable Energy",
  "Blue Carbon",
  "Community Projects",
  "Waste Recovery",
  "Tech-Based Removal",
];

export const registryTypes = ["all", "reward", "purchase", "payment"];

export const sortOptions: { [key: string]: string } = {
  trustScore: "Trust Score",
  vintage: "Newest (Vintage)",
  availableCredits: "Available (High)",
  pricePerCredit: "Price (Low)",
};

export const REGISTRIES = [
  "Verra (VCS)",
  "Gold Standard",
  "Climate Action Reserve",
  "American Carbon Registry",
  "Puro.earth",
] as const;

// ==================================================================
// 2. MARKETPLACE MOCK PROJECTS
// ==================================================================

const baseMockCredits: CarbonCredit[] = [
  {
    id: "1",
    batch_id: "B1",
    unicId: "B1",
    projectName: "Amazon Rainforest Conservation",
    location: "Acre, Brazil",
    country: "Brazil",
    registry: "Verra (VCS)",
    vintage: 2023,
    status: "SELLABLE",
    trustScore: 94,
    availableCredits: 12500,
    available_quantity: 12500,
    total_quantity: 14000,
    sold_quantity: 1500,
    retired_quantity: 0,
    pricePerCredit: 18.5,
    projectType: "Forestry (REDD+)",
    methodology: "ARR",
    updated_at: "2026-03-17T20:10:00Z",
    version: 12,
    image: "https://images.pexels.com/photos/975771/pexels-photo-975771.jpeg",
  },
  {
    id: "2",
    batch_id: "B2",
    unicId: "B2",
    projectName: "Wind Energy Maharashtra",
    location: "Maharashtra, India",
    country: "India",
    registry: "Gold Standard",
    vintage: 2022,
    status: "SELLABLE",
    trustScore: 88,
    availableCredits: 8400,
    available_quantity: 8400,
    total_quantity: 10000,
    sold_quantity: 1600,
    retired_quantity: 0,
    pricePerCredit: 15.2,
    projectType: "Renewable Energy",
    methodology: "RENEWABLE",
    updated_at: "2026-03-17T20:10:00Z",
    version: 8,
    image: "https://images.pexels.com/photos/414837/pexels-photo-414837.jpeg",
  },
  {
    id: "3",
    batch_id: "B3",
    unicId: "B3",
    projectName: "Clean Cookstoves for Kenya",
    location: "Nairobi Region, Kenya",
    country: "Kenya",
    registry: "Climate Action Reserve",
    vintage: 2023,
    status: "SELLABLE",
    trustScore: 91,
    availableCredits: 5600,
    available_quantity: 5600,
    total_quantity: 6200,
    sold_quantity: 600,
    retired_quantity: 0,
    pricePerCredit: 12.8,
    projectType: "Community Projects",
    methodology: "COMMUNITY",
    updated_at: "2026-03-17T20:10:00Z",
    version: 10,
    image: "https://images.pexels.com/photos/6473875/pexels-photo-6473875.jpeg",
  },
  {
    id: "4",
    batch_id: "B4",
    unicId: "B4",
    projectName: "Sumatra Peatland Restoration",
    location: "Sumatra, Indonesia",
    country: "Indonesia",
    registry: "Verra (VCS)",
    vintage: 2021,
    status: "UNAVAILABLE",
    trustScore: 86,
    availableCredits: 0,
    available_quantity: 0,
    total_quantity: 9000,
    sold_quantity: 7000,
    retired_quantity: 2000,
    pricePerCredit: 16.0,
    projectType: "Blue Carbon",
    methodology: "ARR",
    updated_at: "2026-03-17T20:10:00Z",
    version: 14,
    image: "https://images.pexels.com/photos/1179229/pexels-photo-1179229.jpeg",
  },
  {
    id: "5",
    batch_id: "B5",
    unicId: "B5",
    projectName: "Solar Energy Rural Communities",
    location: "Tamil Nadu, India",
    country: "India",
    registry: "American Carbon Registry",
    vintage: 2023,
    status: "SELLABLE",
    trustScore: 89,
    availableCredits: 9800,
    available_quantity: 9800,
    total_quantity: 11000,
    sold_quantity: 1200,
    retired_quantity: 0,
    pricePerCredit: 14.5,
    projectType: "Renewable Energy",
    methodology: "RENEWABLE",
    updated_at: "2026-03-17T20:10:00Z",
    version: 11,
    image: "https://images.pexels.com/photos/433308/pexels-photo-433308.jpeg",
  },
  {
    id: "6",
    batch_id: "B6",
    unicId: "B6",
    projectName: "Andean Forest Protection",
    location: "Cusco, Peru",
    country: "Peru",
    registry: "Gold Standard",
    vintage: 2022,
    status: "SELLABLE",
    trustScore: 92,
    availableCredits: 7200,
    available_quantity: 7200,
    total_quantity: 8100,
    sold_quantity: 900,
    retired_quantity: 0,
    pricePerCredit: 19.3,
    projectType: "Forestry (REDD+)",
    methodology: "ARR",
    updated_at: "2026-03-17T20:10:00Z",
    version: 9,
    image: "https://images.pexels.com/photos/1179225/pexels-photo-1179225.jpeg",
  },
  {
    id: "7",
    batch_id: "B7",
    unicId: "B7",
    projectName: "Blue Carbon Mangrove Restoration",
    location: "Delta Region, Vietnam",
    country: "Vietnam",
    registry: "Verra (VCS)",
    vintage: 2023,
    status: "SELLABLE",
    trustScore: 78,
    availableCredits: 4500,
    available_quantity: 4500,
    total_quantity: 5000,
    sold_quantity: 500,
    retired_quantity: 0,
    pricePerCredit: 13.7,
    projectType: "Blue Carbon",
    methodology: "ARR",
    updated_at: "2026-03-17T20:10:00Z",
    version: 6,
    image: "https://images.pexels.com/photos/1619299/pexels-photo-1619299.jpeg",
  },
  {
    id: "8",
    batch_id: "B8",
    unicId: "B8",
    projectName: "Oaxaca Biogas Digesters",
    location: "Oaxaca, Mexico",
    country: "Mexico",
    registry: "Climate Action Reserve",
    vintage: 2022,
    status: "SELLABLE",
    trustScore: 85,
    availableCredits: 6300,
    available_quantity: 6300,
    total_quantity: 7000,
    sold_quantity: 700,
    retired_quantity: 0,
    pricePerCredit: 11.9,
    projectType: "Waste Recovery",
    methodology: "WASTE",
    updated_at: "2026-03-17T20:10:00Z",
    version: 7,
    image: "https://images.pexels.com/photos/2516423/pexels-photo-2516423.jpeg",
  },
  {
    id: "9",
    batch_id: "B9",
    unicId: "B9",
    projectName: "Biochar Carbon Removal",
    location: "Helsinki, Finland",
    country: "Finland",
    registry: "Puro.earth",
    vintage: 2024,
    status: "SELLABLE",
    trustScore: 96,
    availableCredits: 2000,
    available_quantity: 2000,
    total_quantity: 2400,
    sold_quantity: 400,
    retired_quantity: 0,
    pricePerCredit: 120.0,
    projectType: "Tech-Based Removal",
    methodology: "CDR",
    updated_at: "2026-03-17T20:10:00Z",
    version: 5,
    image: "https://images.pexels.com/photos/1834400/pexels-photo-1834400.jpeg",
  },
];

// Use only unique base projects for clean testing.
export const mockCredits: CarbonCredit[] = baseMockCredits.map((item) => ({
  ...item,
}));

// ==================================================================
// 3. DASHBOARD ACTIVITY DATA
// ==================================================================

export const ACTIVITY_DATA = [
  {
    id: "CRT-01",
    project: "Forest Conservation",
    amount: 1650,
    type: "Forestry",
    icon: Leaf,
    bg: "bg-[#749A74]",
  },
  {
    id: "CRT-02",
    project: "Wind Farm",
    amount: 12000,
    type: "Renewable",
    icon: Wind,
    bg: "bg-[#8FA3AD]",
  },
  {
    id: "CRT-03",
    project: "Mangrove Restoration",
    amount: 80000,
    type: "Blue Carbon",
    icon: Droplets,
    bg: "bg-[#7FA3C4]",
  },
  {
    id: "CRT-04",
    project: "Clean Cookstoves",
    amount: 400,
    type: "Community",
    icon: TrendingUp,
    bg: "bg-orange-400",
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