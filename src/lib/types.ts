export interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  status: "completed" | "upcoming";
}

export interface CarbonCredit {
  id: string;
  batch_id: string;
  projectName: string;
  pricePerCredit: number;
  location: string;
  vintage: number;
  registry: string;
  trustScore: number;
  availableCredits: number;
  status: "SELLABLE" | "UNAVAILABLE" | string;
  projectType: string;
  unicId: string;
  country: string;
  image: string;

  methodology: string;
  total_quantity: number;
  sold_quantity: number;
  retired_quantity: number;
  available_quantity: number;
  updated_at: string;
  version: number;
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
  trustScore: number;
  riskFlags: string[];
}

export interface ReportData {
  reportDate: string;
  company: string;
  netOffset: string;
  portfolioValue: string;
  retirementRatio: string;
  assets: { id: string; project: string; amount: string; type: string; date: string }[];
  breakdown: { type: string; percentage: string }[];
  sdgs: { num: string; label: string }[];
}


export type ViewState =
  | "landing"
  | "marketplace"
  | "portfolio"
  | "about"
  | "contact"
  | "dashboard"
  | "analyze";

  // ================= API TYPES =================

// Batch (list item)
export interface BatchListItem {
  batch_id: string;
  project_name: string;
  country: string;
  methodology: string;
  vintage: number;
  total_quantity: number;
  available_quantity: number;
  updated_at: string;
  version: number;

  // optional extra fields (your mock adds these)
  price_per_credit?: number;
  registry?: string;
  trust_score?: number;
  image?: string;
  project_type?: string;
  location?: string;
  status?: string;
}

// Batch list response
export interface GetBatchesResponse {
  items: BatchListItem[];
  total: number;
}

// Batch detail
export interface BatchDetail {
  batch_id: string;
  project_name: string;
  country: string;
  methodology: string;
  vintage: number;
  total_quantity: number;
  sold_quantity: number;
  retired_quantity: number;
  available_quantity: number;
  status: string;
  updated_at: string;
  version: number;

  price_per_credit?: number;
  registry?: string;
  trust_score?: number;
  image?: string;
  project_type?: string;
  location?: string;
}

// Availability
export interface BatchAvailability {
  batch_id: string;
  available_quantity: number;
  sold_quantity: number;
  retired_quantity: number;
  version: number;
  updated_at: string;
}
// Purchase success (specific batch)
export interface SpecificBatchPurchaseResponse {
  purchase_id: string;
  status: "SUCCESS";
  mode: "SPECIFIC_BATCH";
  batch_id: string;
  purchased_quantity: number;
  remaining_available_quantity_after_purchase: number;
  created_at: string;
  new_version: number;
}

// Allocation item
export interface Allocation {
  batch_id: string;
  quantity: number;
}

// Auto allocate response
export interface AutoAllocatePurchaseResponse {
  purchase_id: string;
  mode: "AUTO_ALLOCATE";
  requested_quantity: number;
  allocated_quantity: number;
  allocations: Allocation[];
  status: "SUCCESS";
  updated_at: string;
}

// Combined purchase response
export type PurchaseResponse =
  | SpecificBatchPurchaseResponse
  | AutoAllocatePurchaseResponse;

export interface ApiError {
  error_code:
    | "INSUFFICIENT_INVENTORY"
    | "STALE_INVENTORY"
    | "INVALID_BATCH"
    | "DUPLICATE_REQUEST";
  message: string;

  batch_id?: string;
  requested_quantity?: number;
  current_available_quantity?: number;
  available_quantity?: number;
  current_version?: number;
  expected_version?: number;
  updated_at?: string;
}