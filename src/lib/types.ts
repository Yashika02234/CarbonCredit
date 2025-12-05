export interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  status: 'completed' | 'upcoming';
}


export interface CarbonCredit {
  id: string;
  unicId: string;
  projectName: string;
  location: string;
  country: string;
  registry: string;
  vintage: number;
  status: 'active' | 'retired' | 'pending';
  trustScore: number;
  availableCredits: number;
  pricePerCredit: number;
  projectType: string;
  image: string;
  description?: string; // Extended description
  timeline?: TimelineEvent[]; // New timeline data
}
