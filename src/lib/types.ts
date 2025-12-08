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