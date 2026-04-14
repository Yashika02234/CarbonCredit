import type { CarbonCredit, BatchListItem, BatchDetail } from "./types";

export function mapBatchToCredit(
  item: BatchListItem | BatchDetail
): CarbonCredit {
  return {
    id: item.batch_id,
    batch_id: item.batch_id,
    unicId: item.batch_id,
    projectName: item.project_name,
    location: item.location || item.country || "",
    country: item.country,
    registry: item.registry || "Unknown Registry",
    vintage: item.vintage,
    status: item.status || "SELLABLE",
    trustScore: item.trust_score ?? 80,
    availableCredits: item.available_quantity,
    available_quantity: item.available_quantity,
    total_quantity: item.total_quantity ?? item.available_quantity,
    sold_quantity: "sold_quantity" in item ? item.sold_quantity : 0,
    retired_quantity: "retired_quantity" in item ? item.retired_quantity : 0,
    pricePerCredit: item.price_per_credit ?? 0,
    projectType: item.project_type || item.methodology || "Carbon Project",
    methodology: item.methodology || "ARR",
    updated_at: item.updated_at,
    version: item.version ?? 1,
    image:
      item.image ||
      "https://images.pexels.com/photos/975771/pexels-photo-975771.jpeg",
  };
}