export interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  status: 'completed' | 'upcoming';
}


export interface CarbonCredit {
  id: string;
  projectName: string;
  pricePerCredit: number;
  location: string;
  vintage: number;
  registry: string;
  trustScore: number;
  availableCredits: number;
  status: string;
  projectType: string; // 'Forestry' | 'Renewable' | 'Blue Carbon' | 'Community' | ...
  unicId: string;
  country: string;
  image: string;
}

export interface CertificateAsset {
    id: string;
    project: string;
    amount: string;
    date: string;
    image: string;
    type: string;
    color: string;
    status: string;
    trustScore: number; // For PDF/UI display
    riskFlags: string[]; // For PDF/UI display
}

// Interface for data passed to the Annual Report PDF Template
export interface ReportData {
    reportDate: string;
    company: string;
    netOffset: string;
    portfolioValue: string;
    retirementRatio: string;
    assets: { id: string, project: string, amount: string, type: string, date: string }[];
    breakdown: { type: string, percentage: string }[];
    sdgs: { num: string, label: string }[];
}