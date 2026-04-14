// src/components/explorer/ProjectDetail.tsx
import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import PaymentModal from "../payment/PaymentModal";
import {
  ArrowLeft,
  Download,
  Loader2,
  ShieldCheck,
  Leaf,
  BadgeCheck,
  RefreshCw,
  MapPin,
  Calendar,
  Layers3,
  Sparkles,
  AlertTriangle,
} from "lucide-react";

import { CarbonCredit } from "../../lib/types";
import { getBatchDetail, getBatchAvailability } from "../../lib/api";
import { mapBatchToCredit } from "../../lib/mappers";

interface ProjectDetailProps {
  project: CarbonCredit;
  onBack: () => void;
  onPurchaseSuccess?: (
    batchId: string,
    remaining?: number,
    newVersion?: number
  ) => void;
}

const THEME = {
  lightBg: "bg-[#F6FBF8]",
  darkBg: "bg-[#0B1F19]",
  darkCard: "bg-[#112720]",
  lightCard: "bg-white",
  lightMuted: "text-emerald-700/70",
  darkMuted: "text-white/70",
};

// ================= PDF =================
const generateProjectReport = async (project: CarbonCredit) => {
  const element = document.getElementById("official-report-template");
  if (!element) return;

  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
    });

    const imgData = canvas.toDataURL("image/jpeg", 1.0);

    const pdf = new jsPDF();
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${project.projectName.replace(/\s+/g, "_")}.pdf`);
  } catch (err) {
    console.error("PDF failed", err);
  }
};

// ================= REPORT =================
const ReportTemplate = ({ project }: { project: CarbonCredit }) => {
  const credits = project.available_quantity ?? project.availableCredits ?? 0;

  return (
    <div
      id="official-report-template"
      className="absolute -left-[9999px] top-0 w-[794px] min-h-[1123px] bg-white p-10"
    >
      <h1 className="text-2xl font-bold mb-6">Verification Report</h1>

      <p>
        <b>Project:</b> {project.projectName}
      </p>
      <p>
        <b>Location:</b> {project.location}
      </p>
      <p>
        <b>Registry:</b> {project.registry}
      </p>
      <p>
        <b>Vintage:</b> {project.vintage}
      </p>

      <div className="mt-6">
        <p className="text-lg font-bold">{credits.toLocaleString()}</p>
        <p>tCO₂ Offset</p>
      </div>
    </div>
  );
};

// ================= SMALL UI =================
function StatTile({
  label,
  value,
  note,
}: {
  label: string;
  value: string | number;
  note?: string;
}) {
  return (
    <div className="rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-xl p-5">
      <p className="text-[11px] uppercase tracking-[0.18em] text-white/45 mb-2">
        {label}
      </p>
      <p className="text-2xl md:text-3xl font-medium tracking-tight text-white">
        {value}
      </p>
      {note && <p className="text-sm text-white/60 mt-2">{note}</p>}
    </div>
  );
}

function InfoCard({
  title,
  children,
  right,
}: {
  title: string;
  children: React.ReactNode;
  right?: React.ReactNode;
}) {
  return (
    <div className="rounded-[30px] bg-white border border-emerald-900/8 shadow-[0_20px_60px_rgba(6,78,59,0.08)] p-6 md:p-7">
      <div className="flex items-center justify-between gap-4 mb-5">
        <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-[#064E3B]">
          {title}
        </h2>
        {right}
      </div>
      {children}
    </div>
  );
}

function MetaRow({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-6 py-3 border-b border-emerald-900/8 last:border-b-0">
      <span className="text-sm text-emerald-700/65">{label}</span>
      <span className="text-sm font-medium text-[#064E3B] text-right">
        {value}
      </span>
    </div>
  );
}

// ================= MAIN =================
export default function ProjectDetail({
  project,
  onBack,
  onPurchaseSuccess,
}: ProjectDetailProps) {
  const [projectDetail, setProjectDetail] = useState<CarbonCredit>(project);
  const [isDetailLoading, setIsDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState<string | null>(null);

  const [quantity, setQuantity] = useState(1);
  const [quantityInput, setQuantityInput] = useState("1");
  const [quantityError, setQuantityError] = useState("");
  const [inventoryNotice, setInventoryNotice] = useState("");

  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  const overviewRef = useRef<HTMLDivElement>(null);

  const availableCredits =
    projectDetail.available_quantity ?? projectDetail.availableCredits ?? 0;

  const isSellable =
    projectDetail.status === "SELLABLE" && availableCredits > 0;

  const totalCost = useMemo(() => {
    return Number((quantity * (projectDetail.pricePerCredit || 0)).toFixed(2));
  }, [quantity, projectDetail.pricePerCredit]);

  const trustScore = projectDetail.trustScore || 92;

  const validateQuantity = useCallback((value: string, maxAvailable: number) => {
    if (value.trim() === "") {
      return "Please enter a quantity.";
    }

    const parsed = Number(value);

    if (!Number.isFinite(parsed) || !Number.isInteger(parsed)) {
      return "Please enter a valid whole number.";
    }

    if (parsed < 1) {
      return "Quantity must be at least 1.";
    }

    if (maxAvailable <= 0) {
      return "This batch is currently unavailable.";
    }

    if (parsed > maxAvailable) {
      return `Only ${maxAvailable.toLocaleString()} credits are available.`;
    }

    return "";
  }, []);

  const loadProjectDetail = useCallback(async () => {
    try {
      setIsDetailLoading(true);
      setDetailError(null);

      const data = await getBatchDetail(project.batch_id);
      const mapped = mapBatchToCredit(data as any);
      setProjectDetail(mapped);
    } catch (error: any) {
      console.error("Failed to load project detail", error);
      setDetailError(error?.message || "Failed to load latest project details.");
    } finally {
      setIsDetailLoading(false);
    }
  }, [project.batch_id]);

  const refreshAvailability = useCallback(async () => {
    try {
      const data = await getBatchAvailability(project.batch_id);

      let notice = "";

      setProjectDetail((prev) => {
        const prevAvailable =
          prev.available_quantity ?? prev.availableCredits ?? 0;
        const prevVersion = prev.version;

        if (
          prevAvailable !== data.available_quantity ||
          prevVersion !== data.version
        ) {
          notice = `Inventory changed. Available credits updated from ${prevAvailable.toLocaleString()} to ${data.available_quantity.toLocaleString()}. Please review your quantity before continuing.`;
        }

        return {
          ...prev,
          available_quantity: data.available_quantity,
          availableCredits: data.available_quantity,
          sold_quantity: data.sold_quantity,
          retired_quantity: data.retired_quantity,
          version: data.version,
          updated_at: data.updated_at,
          status: data.available_quantity <= 0 ? "UNAVAILABLE" : "SELLABLE",
        };
      });

      if (notice) {
        setInventoryNotice(notice);
      }
    } catch (error) {
      console.error("Failed to refresh availability", error);
    }
  }, [project.batch_id]);

  useEffect(() => {
    setProjectDetail(project);
    setDetailError(null);
  }, [project]);

  useEffect(() => {
    setQuantity(1);
    setQuantityInput("1");
    setQuantityError("");
    setInventoryNotice("");
  }, [project.batch_id]);

  useEffect(() => {
    loadProjectDetail();
  }, [loadProjectDetail]);

  useEffect(() => {
    const interval = setInterval(() => {
      refreshAvailability();
    }, 5000);

    return () => clearInterval(interval);
  }, [refreshAvailability]);

  // Cross-tab sync for localStorage-backed mock inventory
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === "offset_mock_inventory_v1") {
        refreshAvailability();
        loadProjectDetail();
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  }, [refreshAvailability, loadProjectDetail]);

  useEffect(() => {
    const error = validateQuantity(quantityInput, availableCredits);
    setQuantityError(error);

    if (!error) {
      const parsed = Number(quantityInput);
      if (Number.isFinite(parsed) && Number.isInteger(parsed)) {
        setQuantity(parsed);
      }
    }
  }, [quantityInput, availableCredits, validateQuantity]);

  const handleIncrease = () => {
    const next = Math.min(availableCredits, quantity + 1);
    setQuantity(next);
    setQuantityInput(String(next));
    setQuantityError("");
    setInventoryNotice("");
  };

  const handleDecrease = () => {
    const next = Math.max(1, quantity - 1);
    setQuantity(next);
    setQuantityInput(String(next));
    setQuantityError("");
    setInventoryNotice("");
  };

  const handleQuantityInput = (value: string) => {
    setQuantityInput(value);
    setInventoryNotice("");
  };

  const handleQuantityBlur = () => {
    // Keep the user's entered value visible.
    // Do not silently reset or clamp it on blur.
  };

  const handleLocalPurchaseSuccess = async (
    batchId: string,
    remaining?: number,
    newVersion?: number
  ) => {
    setProjectDetail((prev) => {
      if (prev.batch_id !== batchId) return prev;

      return {
        ...prev,
        available_quantity:
          typeof remaining === "number" ? remaining : prev.available_quantity,
        availableCredits:
          typeof remaining === "number" ? remaining : prev.availableCredits,
        version: typeof newVersion === "number" ? newVersion : prev.version,
        status:
          typeof remaining === "number" && remaining <= 0
            ? "UNAVAILABLE"
            : "SELLABLE",
      };
    });

    onPurchaseSuccess?.(batchId, remaining, newVersion);
    await refreshAvailability();
  };

  return (
    <div className={`min-h-screen ${THEME.lightBg} text-[#064E3B]`}>
      <ReportTemplate project={projectDetail} />

      <PaymentModal
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        project={projectDetail}
        quantity={quantity}
        onNavigate={(view) => {
          if (view === "portfolio") {
            onBack();
          }
        }}
        onPurchaseSuccess={handleLocalPurchaseSuccess}
      />

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 pt-4">
        {isDetailLoading && (
          <div className="mb-3 rounded-2xl border border-emerald-900/8 bg-white px-4 py-3 text-sm text-emerald-800 shadow-sm flex items-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            Refreshing latest project data...
          </div>
        )}

        {detailError && (
          <div className="mb-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {detailError}
          </div>
        )}
      </div>

      <section className={`${THEME.darkBg} text-white`}>
        <div
          className="max-w-[1400px] mx-auto px-6 md:px-10 pt-8 pb-12"
          ref={overviewRef}
        >
          <button
            onClick={onBack}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/90 hover:bg-white/10 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-8 items-end">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.18em] text-white/70 mb-5">
                <Sparkles className="w-3.5 h-3.5" />
                Verified Carbon Asset
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight leading-none">
                {projectDetail.projectName}
              </h1>

              <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-white/70">
                <span className="inline-flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {projectDetail.country} · {projectDetail.location}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Vintage {projectDetail.vintage}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Layers3 className="w-4 h-4" />
                  {projectDetail.registry}
                </span>
              </div>

              <p className="mt-8 max-w-2xl text-white/75 leading-relaxed text-sm md:text-base">
                Explore verified project details, track real-time availability,
                and purchase credits through a clean, transparent marketplace
                experience built for climate-focused investing.
              </p>

              <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl">
                <StatTile
                  label="Available credits"
                  value={availableCredits.toLocaleString()}
                  note={isSellable ? "Live inventory" : "Currently unavailable"}
                />
                <StatTile
                  label="Price per credit"
                  value={`$${projectDetail.pricePerCredit}`}
                  note="Current batch pricing"
                />
                <StatTile
                  label="Trust score"
                  value={trustScore}
                  note="Registry-backed confidence"
                />
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 rounded-[36px] bg-emerald-500/10 blur-3xl" />
              <div className="relative overflow-hidden rounded-[36px] border border-white/10 shadow-[0_30px_100px_rgba(0,0,0,0.35)]">
                <img
                  src={projectDetail.image}
                  alt={projectDetail.projectName}
                  className="w-full h-[420px] md:h-[520px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#06120F]/75 via-[#06120F]/15 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-7">
                  <div className="grid grid-cols-3 gap-3">
                    <div className="rounded-2xl border border-white/10 bg-white/10 backdrop-blur-xl p-4">
                      <p className="text-[11px] uppercase tracking-[0.18em] text-white/50">
                        Status
                      </p>
                      <p className="mt-2 text-sm font-medium text-white">
                        {isSellable ? "Sellable" : "Unavailable"}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/10 backdrop-blur-xl p-4">
                      <p className="text-[11px] uppercase tracking-[0.18em] text-white/50">
                        Method
                      </p>
                      <p className="mt-2 text-sm font-medium text-white">
                        {projectDetail.methodology || "Verified"}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/10 backdrop-blur-xl p-4">
                      <p className="text-[11px] uppercase tracking-[0.18em] text-white/50">
                        Version
                      </p>
                      <p className="mt-2 text-sm font-medium text-white">
                        {projectDetail.version ?? "-"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sticky top-0 z-30 border-y border-emerald-900/8 bg-white/80 backdrop-blur-2xl">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-4 flex flex-col lg:flex-row gap-4 lg:gap-6 lg:items-center lg:justify-between">
          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap items-center gap-3 md:gap-4">
              <button
                onClick={handleDecrease}
                disabled={availableCredits <= 0}
                className="w-11 h-11 rounded-full border border-emerald-900/10 bg-[#F8FCFA] text-lg hover:bg-emerald-50 disabled:opacity-40"
              >
                -
              </button>

              <input
                type="number"
                min={1}
                max={availableCredits}
                value={quantityInput}
                onChange={(e) => handleQuantityInput(e.target.value)}
                onBlur={handleQuantityBlur}
                className={`w-24 h-11 rounded-full bg-white text-center font-medium outline-none focus:ring-2 ${
                  quantityError
                    ? "border border-red-300 focus:ring-red-200"
                    : "border border-emerald-900/10 focus:ring-emerald-200"
                }`}
              />

              <button
                onClick={handleIncrease}
                disabled={availableCredits <= 0}
                className="w-11 h-11 rounded-full border border-emerald-900/10 bg-[#F8FCFA] text-lg hover:bg-emerald-50 disabled:opacity-40"
              >
                +
              </button>

              <div className="h-8 w-px bg-emerald-900/10 hidden md:block" />

              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-emerald-700/45">
                  Estimated total
                </p>
                <p className="text-lg font-semibold">${totalCost}</p>
              </div>
            </div>

            {inventoryNotice && (
              <div className="inline-flex items-start gap-2 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
                <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
                <span>{inventoryNotice}</span>
              </div>
            )}

            {quantityError && (
              <p className="text-sm text-red-600">{quantityError}</p>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={refreshAvailability}
              className="inline-flex items-center gap-2 rounded-full border border-emerald-900/10 bg-[#F8FCFA] px-4 py-3 text-sm hover:bg-emerald-50 transition"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh availability
            </button>

            <button
              onClick={() => generateProjectReport(projectDetail)}
              className="inline-flex items-center gap-2 rounded-full border border-emerald-900/10 bg-white px-4 py-3 text-sm hover:bg-emerald-50 transition"
            >
              <Download className="w-4 h-4" />
              Download report
            </button>

            <button
              disabled={!isSellable || !!quantityError}
              onClick={() => setIsPaymentOpen(true)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition ${
                !isSellable || !!quantityError
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-[#0F3D2E] text-white hover:opacity-95 shadow-[0_15px_35px_rgba(6,78,59,0.22)]"
              }`}
            >
              {isSellable ? "Buy Credits" : "Unavailable"}
            </button>
          </div>
        </div>
      </section>

      <section className={THEME.lightBg}>
        <main className="max-w-[1400px] mx-auto px-6 md:px-10 py-10 grid xl:grid-cols-[1.1fr_0.9fr] gap-8">
          <div className="space-y-8">
            <InfoCard
              title="Project Impact"
              right={
                <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
                  <Leaf className="w-4 h-4" />
                  Climate-positive asset
                </div>
              }
            >
              <div className="grid md:grid-cols-3 gap-4">
                <div className="rounded-[24px] bg-[#F8FCFA] border border-emerald-900/8 p-5">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-emerald-700/45">
                    Carbon impact
                  </p>
                  <p className="mt-3 text-3xl font-medium tracking-tight">
                    {availableCredits.toLocaleString()}
                  </p>
                  <p className="text-sm text-emerald-700/65 mt-2">
                    tons CO₂ represented in current availability
                  </p>
                </div>

                <div className="rounded-[24px] bg-[#F8FCFA] border border-emerald-900/8 p-5">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-emerald-700/45">
                    Batch status
                  </p>
                  <p className="mt-3 text-2xl font-medium tracking-tight">
                    {projectDetail.status}
                  </p>
                  <p className="text-sm text-emerald-700/65 mt-2">
                    Updated from latest availability checks
                  </p>
                </div>

                <div className="rounded-[24px] bg-[#F8FCFA] border border-emerald-900/8 p-5">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-emerald-700/45">
                    Inventory version
                  </p>
                  <p className="mt-3 text-3xl font-medium tracking-tight">
                    {projectDetail.version ?? "-"}
                  </p>
                  <p className="text-sm text-emerald-700/65 mt-2">
                    Used to keep purchase flow in sync
                  </p>
                </div>
              </div>

              <p className="mt-6 text-sm md:text-base text-emerald-800/80 leading-relaxed">
                This project detail page gives you a single transparent view of
                project identity, registry-backed metadata, real-time inventory,
                and purchasing access. It is designed to help users evaluate both
                climate impact and transaction readiness before buying credits.
              </p>
            </InfoCard>

            <InfoCard
              title="Why this project stands out"
              right={
                <div className="inline-flex items-center gap-2 rounded-full bg-[#0F3D2E] px-3 py-2 text-sm text-white">
                  <ShieldCheck className="w-4 h-4" />
                  Verified
                </div>
              }
            >
              <div className="grid md:grid-cols-3 gap-4">
                <div className="rounded-[24px] border border-emerald-900/8 p-5">
                  <BadgeCheck className="w-5 h-5 text-emerald-700 mb-4" />
                  <p className="font-medium mb-2">Registry-backed identity</p>
                  <p className="text-sm text-emerald-700/70">
                    Verified metadata including registry, vintage, methodology,
                    and live batch-level inventory.
                  </p>
                </div>

                <div className="rounded-[24px] border border-emerald-900/8 p-5">
                  <RefreshCw className="w-5 h-5 text-emerald-700 mb-4" />
                  <p className="font-medium mb-2">Live availability refresh</p>
                  <p className="text-sm text-emerald-700/70">
                    Availability is refreshed automatically so users can trust
                    the current visible inventory.
                  </p>
                </div>

                <div className="rounded-[24px] border border-emerald-900/8 p-5">
                  <Download className="w-5 h-5 text-emerald-700 mb-4" />
                  <p className="font-medium mb-2">Downloadable reporting</p>
                  <p className="text-sm text-emerald-700/70">
                    PDF verification report generation helps reinforce trust and
                    product transparency.
                  </p>
                </div>
              </div>
            </InfoCard>
          </div>

          <div className="space-y-8">
            <InfoCard title="Project Details">
              <div className="space-y-1">
                <MetaRow label="Registry" value={projectDetail.registry || "-"} />
                <MetaRow label="Vintage" value={projectDetail.vintage || "-"} />
                <MetaRow
                  label="Methodology"
                  value={projectDetail.methodology || "-"}
                />
                <MetaRow label="Country" value={projectDetail.country || "-"} />
                <MetaRow label="Location" value={projectDetail.location || "-"} />
                <MetaRow label="Status" value={projectDetail.status || "-"} />
                <MetaRow
                  label="Available quantity"
                  value={availableCredits.toLocaleString()}
                />
                <MetaRow
                  label="Sold quantity"
                  value={projectDetail.sold_quantity ?? "-"}
                />
                <MetaRow
                  label="Retired quantity"
                  value={projectDetail.retired_quantity ?? "-"}
                />
                <MetaRow label="Version" value={projectDetail.version ?? "-"} />
              </div>
            </InfoCard>

            <InfoCard title="Purchase Summary">
              <div className="rounded-[24px] bg-[#F8FCFA] border border-emerald-900/8 p-5">
                <div className="flex items-center justify-between py-3 border-b border-emerald-900/8">
                  <span className="text-sm text-emerald-700/70">
                    Selected quantity
                  </span>
                  <span className="font-medium">{quantity}</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-emerald-900/8">
                  <span className="text-sm text-emerald-700/70">
                    Price per credit
                  </span>
                  <span className="font-medium">
                    ${projectDetail.pricePerCredit}
                  </span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span className="text-sm text-emerald-700/70">
                    Estimated total
                  </span>
                  <span className="text-xl font-semibold">${totalCost}</span>
                </div>
              </div>

              <div className="mt-5 flex flex-col sm:flex-row gap-3">
                <button
                  disabled={!isSellable || !!quantityError}
                  onClick={() => setIsPaymentOpen(true)}
                  className={`flex-1 px-5 py-3 rounded-full text-sm font-medium transition ${
                    !isSellable || !!quantityError
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-[#0F3D2E] text-white hover:opacity-95"
                  }`}
                >
                  {isSellable ? "Proceed to Purchase" : "Unavailable"}
                </button>

                <button
                  onClick={() => generateProjectReport(projectDetail)}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full border border-emerald-900/10 bg-white text-sm hover:bg-emerald-50 transition"
                >
                  <Download className="w-4 h-4" />
                  Export Report
                </button>
              </div>
            </InfoCard>
          </div>
        </main>
      </section>

      <section className={`${THEME.darkBg} text-white`}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-14">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-xl p-6">
              <p className="text-sm text-white/60 mb-2">Registry confidence</p>
              <p className="text-3xl font-medium">{trustScore}</p>
              <p className="text-sm text-white/65 mt-3">
                Built to give users a quick confidence signal before purchase.
              </p>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-xl p-6">
              <p className="text-sm text-white/60 mb-2">Inventory health</p>
              <p className="text-3xl font-medium">
                {availableCredits > 0 ? "Live" : "Low"}
              </p>
              <p className="text-sm text-white/65 mt-3">
                Availability is synced on interval refresh for better purchase
                accuracy.
              </p>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-xl p-6">
              <p className="text-sm text-white/60 mb-2">Purchase readiness</p>
              <p className="text-3xl font-medium">
                {isSellable ? "Enabled" : "Locked"}
              </p>
              <p className="text-sm text-white/65 mt-3">
                Buying is available only when the project remains sellable and
                in stock.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}