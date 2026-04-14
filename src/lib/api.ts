import { mockCredits } from "./mock-data";

/**
 * CONFIGURATION
 * Update these values via environment variables or direct modification.
 * When USE_MOCK_API is true, the frontend uses localStorage as a local database.
 * When false, it makes real fetch calls to API_BASE.
 */
const API_BASE = import.meta.env.VITE_API_BASE || "/api";
const USE_MOCK_API = import.meta.env.VITE_USE_MOCK_API === "true" || true;

const INVENTORY_STORAGE_KEY = "offset_mock_inventory_v1";
const PURCHASE_CACHE_STORAGE_KEY = "offset_mock_purchase_cache_v1";

// ================= TYPES & INTERFACES =================

export type PurchasePayload =
  | {
      mode: "SPECIFIC_BATCH";
      batch_id: string;
      requested_quantity: number;
      buyer_reference: string;
      idempotency_key: string;
      expected_version: number;
    }
  | {
      mode: "AUTO_ALLOCATE";
      requested_quantity: number;
      filters?: {
        country?: string[];
        methodology?: string[];
        min_vintage?: number;
      };
      buyer_reference: string;
      idempotency_key: string;
    };

export interface PurchaseSuccessResponse {
  purchase_id: string;
  status: "SUCCESS" | "PENDING";
  mode: "SPECIFIC_BATCH" | "AUTO_ALLOCATE";
  batch_id?: string;
  purchased_quantity: number;
  allocated_quantity?: number;
  remaining_available_quantity_after_purchase?: number;
  remaining_available_quantity?: number;
  created_at: string;
  new_version?: number;
  allocations?: { batch_id: string; quantity: number }[];
}

export interface PurchaseErrorResponse {
  error_code:
    | "STALE_INVENTORY"
    | "INSUFFICIENT_INVENTORY"
    | "INVALID_BATCH"
    | "DUPLICATE_REQUEST"
    | string;
  message: string;
  batch_id?: string;
  expected_version?: number;
  current_available_quantity?: number;
  available_quantity?: number;
  current_version?: number;
  updated_at?: string;
  sellable?: boolean;
}

export interface AvailabilityResponse {
  batch_id: string;
  available_quantity: number;
  sold_quantity: number;
  retired_quantity: number;
  version: number;
  updated_at: string;
}

// ================= API CLIENT HELPER =================

/**
 * Standardizes fetch-based API calls with structured error handling.
 * Throws an object matching PurchaseErrorResponse on non-2xx statuses.
 */
async function handleResponse<T>(response: Response): Promise<T> {
  const isJson = response.headers.get("content-type")?.includes("application/json");
  const data = isJson ? await response.json() : null;

  if (!response.ok) {
    const error: PurchaseErrorResponse = {
      error_code: data?.error_code || `HTTP_${response.status}`,
      message: data?.message || response.statusText || "An unexpected network error occurred.",
      ...data,
    };
    throw error;
  }
  return data;
}

async function apiClient<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE}${path}`;
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  const response = await fetch(url, { ...options, headers });
  return handleResponse<T>(response);
}

// ================= MOCK API EXECUTOR =================
// (Contains all localStorage-based legacy logic)

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const mockApi = {
  getInventory: () => {
    if (typeof window === "undefined") return mockCredits;
    const raw = window.localStorage.getItem(INVENTORY_STORAGE_KEY);
    return raw ? JSON.parse(raw) : mockCredits;
  },

  saveInventory: (inv: any[]) => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(INVENTORY_STORAGE_KEY, JSON.stringify(inv));
  },

  getPurchaseCache: () => {
    if (typeof window === "undefined") return {};
    const raw = window.localStorage.getItem(PURCHASE_CACHE_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  },

  saveToPurchaseCache: (key: string, val: any) => {
    if (typeof window === "undefined") return;
    const cache = mockApi.getPurchaseCache();
    cache[key] = val;
    window.localStorage.setItem(PURCHASE_CACHE_STORAGE_KEY, JSON.stringify(cache));
  },

  mapListItem: (item: any) => ({
    batch_id: item.batch_id,
    project_name: item.projectName,
    country: item.country,
    methodology: item.methodology,
    vintage: item.vintage,
    total_quantity: item.total_quantity,
    available_quantity: item.available_quantity,
    updated_at: item.updated_at,
    version: item.version,
    price_per_credit: item.pricePerCredit,
    registry: item.registry,
    trust_score: item.trustScore,
    image: item.image,
    project_type: item.projectType,
    location: item.location,
    status: item.status,
  }),

  mapDetail: (item: any) => ({
    ...mockApi.mapListItem(item),
    sold_quantity: item.sold_quantity,
    retired_quantity: item.retired_quantity,
  }),
};

// Initialize mock storage if needed
if (USE_MOCK_API && typeof window !== "undefined") {
  if (!window.localStorage.getItem(INVENTORY_STORAGE_KEY)) {
    mockApi.saveInventory(mockCredits);
  }
}

// ================= EXPORTED INTERFACE =================

export async function getBatches() {
  if (!USE_MOCK_API) {
    return apiClient("/v1/batches");
  }

  await delay(300);
  const inventory = mockApi.getInventory();
  return {
    items: inventory.map(mockApi.mapListItem),
    total: inventory.length,
  };
}

export async function getBatchDetail(batchId: string) {
  if (!USE_MOCK_API) {
    return apiClient(`/v1/batches/${batchId}`);
  }

  await delay(250);
  const inventory = mockApi.getInventory();
  const batch = inventory.find((it: any) => it.batch_id === batchId || it.id === batchId);

  if (!batch) {
    throw {
      error_code: "INVALID_BATCH",
      message: "Batch does not exist or is not sellable.",
      sellable: false,
    } as PurchaseErrorResponse;
  }

  return mockApi.mapDetail(batch);
}

export async function getBatchAvailability(batchId: string): Promise<AvailabilityResponse> {
  if (!USE_MOCK_API) {
    return apiClient(`/v1/batches/${batchId}/availability`);
  }

  await delay(200);
  const inventory = mockApi.getInventory();
  const batch = inventory.find((it: any) => it.batch_id === batchId || it.id === batchId);

  if (!batch) {
    throw {
      error_code: "INVALID_BATCH",
      message: "Batch does not exist.",
    } as PurchaseErrorResponse;
  }

  return {
    batch_id: batch.batch_id,
    available_quantity: batch.available_quantity,
    sold_quantity: batch.sold_quantity,
    retired_quantity: batch.retired_quantity,
    version: batch.version,
    updated_at: batch.updated_at,
  };
}

export async function createPurchase(payload: PurchasePayload): Promise<PurchaseSuccessResponse> {
  if (!USE_MOCK_API) {
    return apiClient("/v1/purchases", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  }

  await delay(800);
  
  // Check Idempotency Cache
  const cache = mockApi.getPurchaseCache();
  if (cache[payload.idempotency_key]) {
    return cache[payload.idempotency_key];
  }

  const inventory = mockApi.getInventory();

  if (payload.mode === "SPECIFIC_BATCH") {
    const batchIndex = inventory.findIndex((it: any) => it.batch_id === payload.batch_id);
    const batch = inventory[batchIndex];

    if (!batch || batch.status !== "SELLABLE") {
      throw {
        error_code: "INVALID_BATCH",
        message: "Batch unavailable.",
      } as PurchaseErrorResponse;
    }

    if (payload.expected_version !== batch.version) {
      throw {
        error_code: "STALE_INVENTORY",
        message: "Inventory changed.",
        current_version: batch.version,
        current_available_quantity: batch.available_quantity,
      } as PurchaseErrorResponse;
    }

    if (payload.requested_quantity > batch.available_quantity) {
      throw {
        error_code: "INSUFFICIENT_INVENTORY",
        message: "Insufficient credits.",
        available_quantity: batch.available_quantity,
      } as PurchaseErrorResponse;
    }

    // Process Transaction
    const remaining = batch.available_quantity - payload.requested_quantity;
    const newVersion = batch.version + 1;

    batch.available_quantity = remaining;
    batch.sold_quantity += payload.requested_quantity;
    batch.version = newVersion;
    batch.status = remaining <= 0 ? "UNAVAILABLE" : "SELLABLE";

    mockApi.saveInventory(inventory);

    const response: PurchaseSuccessResponse = {
      purchase_id: `PUR-${Date.now()}`,
      status: "SUCCESS",
      mode: "SPECIFIC_BATCH",
      batch_id: batch.batch_id,
      purchased_quantity: payload.requested_quantity,
      remaining_available_quantity_after_purchase: remaining,
      created_at: new Date().toISOString(),
      new_version: newVersion,
    };

    mockApi.saveToPurchaseCache(payload.idempotency_key, response);
    return response;
  }

  // AUTO_ALLOCATE (Simplified Mock)
  // ... similar logic as before but grouped under mock ...
  throw { error_code: "METHOD_NOT_IMPLEMENTED", message: "Auto-allocate is complex for simple mock." };
}