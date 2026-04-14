import { useState, useEffect, ChangeEvent, useMemo, useRef } from "react";
import type { ReactNode } from "react";
import { usePortfolio } from "../../context/PortfolioContext";
import {
  X,
  Loader2,
  CheckCircle2,
  Lock,
  CreditCard,
  Smartphone,
} from "lucide-react";
import { CarbonCredit } from "../../lib/types";
import { createPurchase, getBatchAvailability } from "../../lib/api";
import type { 
  PurchaseSuccessResponse, 
  PurchaseErrorResponse, 
  AvailabilityResponse 
} from "../../lib/api";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: CarbonCredit;
  quantity: number;
  onNavigate: (
    view: "portfolio" | "marketplace" | "home" | "dashboard"
  ) => void;
  onPurchaseSuccess?: (
    batchId: string,
    remaining?: number,
    newVersion?: number
  ) => void;
}

type Step = "review" | "processing" | "success";
type PaymentMethod = "card" | "upi";

type PaymentForm = {
  email: string;
  country: string;
  cardName: string;
  cardNumber: string;
  expiry: string;
  cvc: string;
  upiId: string;
};



const initialForm: PaymentForm = {
  email: "",
  country: "India",
  cardName: "",
  cardNumber: "",
  expiry: "",
  cvc: "",
  upiId: "",
};

function generateIdempotencyKey() {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `purchase-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export default function PaymentModal({
  isOpen,
  onClose,
  project,
  quantity,
  onNavigate,
  onPurchaseSuccess,
}: PaymentModalProps) {
  const [step, setStep] = useState<Step>("review");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");
  const [form, setForm] = useState<PaymentForm>(initialForm);
  const [errors, setErrors] = useState<Partial<PaymentForm>>({});
  const [submitError, setSubmitError] = useState("");
  const [successData, setSuccessData] = useState<PurchaseSuccessResponse | null>(null);
  const [idempotencyKey, setIdempotencyKey] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isInvalidBatch, setIsInvalidBatch] = useState(false);
  const lastAttemptParams = useRef<{
    batchId: string;
    quantity: number;
    expectedVersion: number;
  } | null>(null);

  const { registerPurchase } = usePortfolio();

  useEffect(() => {
    if (isOpen) {
      setStep("review");
      setPaymentMethod("card");
      setForm(initialForm);
      setErrors({});
      setSubmitError("");
      setSuccessData(null);
      setIdempotencyKey("");
      setIsInvalidBatch(false);
      lastAttemptParams.current = null;
    }
  }, [isOpen]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const batchId = getBatchId(project);
  const batchVersion = getBatchVersion(project);
  const currentAvailable =
    project.available_quantity ?? project.availableCredits ?? 0;

  const subtotal = useMemo(
    () => project.pricePerCredit * quantity,
    [project.pricePerCredit, quantity]
  );
  const platformFee = useMemo(() => subtotal * 0.01, [subtotal]);
  const totalDue = useMemo(() => subtotal + platformFee, [subtotal, platformFee]);

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, "").slice(0, 16);
    return cleaned.replace(/(.{4})/g, "$1 ").trim();
  };

  const formatExpiry = (value: string) => {
    const cleaned = value.replace(/\D/g, "").slice(0, 4);
    if (cleaned.length <= 2) return cleaned;
    return `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
  };

  const formatCvc = (value: string) => value.replace(/\D/g, "").slice(0, 4);

  const getCardType = (number: string) => {
    const cleaned = number.replace(/\s/g, "");
    if (/^4/.test(cleaned)) return "Visa";
    if (/^5[1-5]/.test(cleaned)) return "Mastercard";
    if (/^3[47]/.test(cleaned)) return "Amex";
    if (/^6/.test(cleaned)) return "RuPay";
    return "Card";
  };

  const isValidUpi = (upi: string) =>
    /^[a-zA-Z0-9._-]{2,}@[a-zA-Z]{2,}$/.test(upi);

  const validate = () => {
    const nextErrors: Partial<PaymentForm> = {};

    if (!form.email.trim()) {
      nextErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      nextErrors.email = "Enter a valid email";
    }

    if (!form.country.trim()) {
      nextErrors.country = "Country is required";
    }

    if (paymentMethod === "card") {
      if (!form.cardName.trim()) nextErrors.cardName = "Name is required";
      if (form.cardNumber.replace(/\s/g, "").length !== 16) {
        nextErrors.cardNumber = "Enter valid card number";
      }
      if (!/^\d{2}\/\d{2}$/.test(form.expiry)) {
        nextErrors.expiry = "Use MM/YY";
      }
      if (form.cvc.length < 3) {
        nextErrors.cvc = "Enter valid CVC";
      }
    }

    if (paymentMethod === "upi") {
      if (!form.upiId.trim()) {
        nextErrors.upiId = "UPI ID is required";
      } else if (!isValidUpi(form.upiId.trim())) {
        nextErrors.upiId = "Enter a valid UPI ID";
      }
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const isCardValid =
    form.cardName.trim().length > 0 &&
    form.cardNumber.replace(/\s/g, "").length === 16 &&
    /^\d{2}\/\d{2}$/.test(form.expiry) &&
    form.cvc.length >= 3;

  const isFormValid =
    /\S+@\S+\.\S+/.test(form.email) &&
    form.country.trim().length > 0 &&
    (paymentMethod === "card" ? isCardValid : isValidUpi(form.upiId.trim()));

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    let nextValue = value;
    if (name === "cardNumber") nextValue = formatCardNumber(value);
    if (name === "expiry") nextValue = formatExpiry(value);
    if (name === "cvc") nextValue = formatCvc(value);

    setForm((prev) => ({ ...prev, [name]: nextValue }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setSubmitError("");
  };

  const handlePurchase = async () => {
    if (isSubmitting) return;
    if (!validate()) return;

    if (!batchId) {
      setSubmitError("Batch ID is missing for this project.");
      return;
    }

    if (currentAvailable <= 0) {
      setSubmitError("This batch is no longer available.");
      return;
    }

    if (quantity > currentAvailable) {
      setSubmitError(`Only ${currentAvailable} credits are currently available.`);
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      // 1. Get latest availability to ensure we have the correct version
      const latestAvailability: AvailabilityResponse =
        await getBatchAvailability(batchId);

      const expectedVersion =
        typeof latestAvailability.version === "number"
          ? latestAvailability.version
          : batchVersion;

      if (typeof expectedVersion !== "number") {
        setSubmitError(
          "Batch version is missing. Refresh batch details and try again."
        );
        setIsSubmitting(false);
        return;
      }

      // 2. Inventory check
      if (quantity > latestAvailability.available_quantity) {
        setSubmitError(
          `Only ${latestAvailability.available_quantity} credits are currently available.`
        );
        onPurchaseSuccess?.(
          batchId,
          latestAvailability.available_quantity,
          latestAvailability.version
        );
        setIsSubmitting(false);
        return;
      }

      // 3. Idempotency Key Management (Intent-based)
      const currentParams = {
        batchId,
        quantity,
        expectedVersion,
      };

      const paramsChanged =
        !lastAttemptParams.current ||
        lastAttemptParams.current.batchId !== currentParams.batchId ||
        lastAttemptParams.current.quantity !== currentParams.quantity ||
        lastAttemptParams.current.expectedVersion !==
          currentParams.expectedVersion;

      let activeKey = idempotencyKey;
      if (paramsChanged || !activeKey) {
        activeKey = generateIdempotencyKey();
        setIdempotencyKey(activeKey);
        lastAttemptParams.current = currentParams;
      }

      // 4. Move to processing step for the API call
      setStep("processing");

      // 5. Execute Purchase
      const response: PurchaseSuccessResponse = await createPurchase({
        mode: "SPECIFIC_BATCH",
        batch_id: batchId,
        requested_quantity: quantity,
        buyer_reference: form.email.trim(),
        idempotency_key: activeKey,
        expected_version: expectedVersion,
      });

      // 6. Handle Success
      registerPurchase({
        project: {
          ...project,
          available_quantity:
            response.remaining_available_quantity_after_purchase ??
            response.remaining_available_quantity ??
            project.available_quantity,
          availableCredits:
            response.remaining_available_quantity_after_purchase ??
            response.remaining_available_quantity ??
            project.availableCredits,
          version: response.new_version ?? project.version,
        },
        quantity,
        purchaseId: response.purchase_id,
      });

      onPurchaseSuccess?.(
        batchId,
        response.remaining_available_quantity_after_purchase ??
          response.remaining_available_quantity,
        response.new_version
      );

      setSuccessData(response);
      setStep("success");
    } catch (error: any) {
      const err: PurchaseErrorResponse = error || {};

      // Handle DUPLICATE_REQUEST as SUCCESS
      if (err.error_code === "DUPLICATE_REQUEST") {
        setSuccessData({
          purchase_id: "ALREADY_PROCESSED",
          status: "SUCCESS",
          mode: "SPECIFIC_BATCH",
          purchased_quantity: quantity,
          created_at: new Date().toISOString(),
        });
        setStep("success");
        return;
      }

      // Return to review step for other errors
      setStep("review");

      if (err.error_code === "STALE_INVENTORY") {
        const hasCurrentData =
          typeof err.current_available_quantity === "number" &&
          typeof err.current_version === "number";

        if (hasCurrentData) {
          // Immediate UI update from error response
          onPurchaseSuccess?.(
            batchId,
            err.current_available_quantity,
            err.current_version
          );
        } else {
          // Fallback refresh call
          try {
            const latest = await getBatchAvailability(batchId);
            onPurchaseSuccess?.(
              batchId,
              latest.available_quantity,
              latest.version
            );
          } catch (e) {
            console.error("Failed to refresh availability after stale inventory error", e);
          }
        }

        setSubmitError(
          `Inventory changed. Please review the updated availability before retrying.${
            typeof err.current_available_quantity === "number"
              ? ` Available now: ${err.current_available_quantity}.`
              : ""
          }`
        );
      } else if (err.error_code === "INSUFFICIENT_INVENTORY") {
        const available =
          err.current_available_quantity ?? err.available_quantity;
        
        // Propagate current version if provided to stay aligned with latest state
        if (typeof available === "number") {
          onPurchaseSuccess?.(batchId, available, err.current_version);
        }

        setSubmitError(
          typeof available === "number"
            ? `Only ${available} credits are currently available. Please update your requested quantity.`
            : err.message || "Requested quantity is higher than current availability."
        );
      } else if (err.error_code === "INVALID_BATCH") {
        setIsInvalidBatch(true);
        setSubmitError("This batch is no longer available for purchase. Please return to the explorer.");
      } else {
        // Unknown / Generic Fallback
        setSubmitError(
          err.message || "Something went wrong while processing your purchase. Please try again."
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const purchasedQty =
    successData?.purchased_quantity ??
    successData?.allocated_quantity ??
    quantity;

  const remainingQty =
    successData?.remaining_available_quantity_after_purchase ??
    successData?.remaining_available_quantity;
    

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl rounded-3xl bg-white shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 z-10 rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
        >
          <X className="h-5 w-5" />
        </button>

        {step === "review" && (
          <div className="grid max-h-[90vh] overflow-y-auto lg:grid-cols-[0.95fr_1.05fr]">
            <div className="border-b border-slate-200 p-6 lg:border-b-0 lg:border-r lg:p-8">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
                Order summary
              </p>

              <div className="mt-6">
                <h2 className="text-3xl font-semibold text-slate-900">
                  ${totalDue.toFixed(2)}
                </h2>
                <p className="mt-2 text-sm text-slate-500">
                  Secure checkout for carbon credit purchase
                </p>
              </div>

              <div className="mt-8 rounded-2xl border border-slate-200 p-5">
                <p className="text-base font-semibold text-slate-900">
                  {project.projectName}
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  {quantity} credit{quantity > 1 ? "s" : ""} • Vintage{" "}
                  {project.vintage}
                </p>

                <div className="mt-5 space-y-3 border-t border-slate-200 pt-5">
                  <SummaryRow
                    label="Subtotal"
                    value={`$${subtotal.toFixed(2)}`}
                  />
                  <SummaryRow
                    label="Platform fee"
                    value={`$${platformFee.toFixed(2)}`}
                  />
                  <SummaryRow
                    label="Project ID"
                    value={batchId || project.unicId || "N/A"}
                    mono
                  />
                  <SummaryRow
                    label="Inventory version"
                    value={
                      typeof batchVersion === "number"
                        ? String(batchVersion)
                        : "N/A"
                    }
                    mono
                  />
                  <SummaryRow
                    label="Available now"
                    value={String(currentAvailable)}
                  />
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-slate-200 pt-5">
                  <span className="text-sm font-medium text-slate-700">
                    Total
                  </span>
                  <span className="text-xl font-semibold text-slate-900">
                    ${totalDue.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-2 text-sm text-slate-500">
                <Lock className="h-4 w-4" />
                Encrypted payment flow
              </div>
            </div>

            <div className="p-6 lg:p-8">
              <div className="mx-auto max-w-md">
                <h3 className="text-2xl font-semibold text-slate-900">
                  Payment
                </h3>
                <p className="mt-2 text-sm text-slate-500">
                  Choose a payment method and complete your purchase.
                </p>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <MethodButton
                    active={paymentMethod === "card"}
                    onClick={() => setPaymentMethod("card")}
                    icon={<CreditCard className="h-4 w-4" />}
                    title="Card"
                  />
                  <MethodButton
                    active={paymentMethod === "upi"}
                    onClick={() => setPaymentMethod("upi")}
                    icon={<Smartphone className="h-4 w-4" />}
                    title="UPI"
                  />
                </div>

                <div className="mt-6 space-y-4">
                  <Field
                    label="Email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="yashika@example.com"
                    error={errors.email}
                  />

                  <SelectField
                    label="Country"
                    name="country"
                    value={form.country}
                    onChange={handleChange}
                    error={errors.country}
                    options={[
                      "India",
                      "United States",
                      "United Kingdom",
                      "Germany",
                    ]}
                  />

                  {paymentMethod === "card" && (
                    <div className="space-y-4">
                      <Field
                        label="Name on card"
                        name="cardName"
                        value={form.cardName}
                        onChange={handleChange}
                        placeholder="Yashika Agrawal"
                        error={errors.cardName}
                      />

                      <Field
                        label="Card number"
                        name="cardNumber"
                        value={form.cardNumber}
                        onChange={handleChange}
                        placeholder="1234 1234 1234 1234"
                        error={errors.cardNumber}
                        rightSlot={
                          <span className="text-xs text-slate-500">
                            {getCardType(form.cardNumber)}
                          </span>
                        }
                      />

                      <div className="grid grid-cols-2 gap-4">
                        <Field
                          label="Expiry"
                          name="expiry"
                          value={form.expiry}
                          onChange={handleChange}
                          placeholder="MM/YY"
                          error={errors.expiry}
                        />
                        <Field
                          label="CVC"
                          name="cvc"
                          value={form.cvc}
                          onChange={handleChange}
                          placeholder="***"
                          error={errors.cvc}
                          type="password"
                        />
                      </div>
                    </div>
                  )}

                  {paymentMethod === "upi" && (
                    <div className="space-y-4">
                      <Field
                        label="UPI ID"
                        name="upiId"
                        value={form.upiId}
                        onChange={handleChange}
                        placeholder="yashika@paytm"
                        error={errors.upiId}
                      />

                      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-500">
                        Supports Google Pay, PhonePe, Paytm, BHIM and other
                        UPI apps.
                      </div>
                    </div>
                  )}

                  {submitError && (
                    <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                      {submitError}
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={handlePurchase}
                    disabled={!isFormValid || currentAvailable <= 0 || isSubmitting || isInvalidBatch}
                    className={`mt-2 w-full flex items-center justify-center gap-2 rounded-2xl py-3.5 text-sm font-semibold transition ${
                      isFormValid && currentAvailable > 0 && !isSubmitting && !isInvalidBatch
                        ? "bg-slate-900 text-white hover:bg-slate-800"
                        : "cursor-not-allowed bg-slate-200 text-slate-400"
                    }`}
                  >
                    {isSubmitting && <Loader2 className="h-4 w-4 animate-spin text-slate-400" />}
                    {currentAvailable > 0
                      ? isSubmitting ? "Processing..." : `Pay $${totalDue.toFixed(2)}`
                      : "Unavailable"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === "processing" && (
          <div className="flex min-h-[520px] flex-col items-center justify-center px-6 text-center">
            <div className="mb-5 rounded-full bg-slate-100 p-4">
              <Loader2 className="h-8 w-8 animate-spin text-slate-700" />
            </div>
            <h3 className="text-2xl font-semibold text-slate-900">
              Processing payment
            </h3>
            <p className="mt-2 max-w-sm text-sm text-slate-500">
              Please wait while we confirm your transaction.
            </p>
          </div>
        )}

        {step === "success" && (
          <div className="flex min-h-[520px] flex-col items-center justify-center px-6 text-center">
            <div className="mb-5 rounded-full bg-emerald-50 p-4">
              <CheckCircle2 className="h-8 w-8 text-emerald-600" />
            </div>
            <h3 className="text-2xl font-semibold text-slate-900">
              Payment successful
            </h3>
            <p className="mt-2 max-w-sm text-sm text-slate-500">
              Your purchase was completed successfully.
            </p>

            <div className="mt-6 rounded-2xl border border-slate-200 px-5 py-4 text-left">
              <p className="font-medium text-slate-900">
                {project.projectName}
              </p>
              <p className="mt-1 text-sm text-slate-500">
                {purchasedQty} credit{purchasedQty > 1 ? "s" : ""} purchased
              </p>

              {successData?.purchase_id === "ALREADY_PROCESSED" && (
                <div className="mt-4 rounded-xl bg-emerald-50 p-3 text-xs font-medium text-emerald-700 border border-emerald-100 italic">
                  Transaction already processed successfully.
                </div>
              )}

              {successData?.purchase_id && (
                <p className="mt-3 text-sm text-slate-500">
                  Purchase ID:{" "}
                  <span className="font-mono text-slate-900">
                    {successData.purchase_id}
                  </span>
                </p>
              )}

              {typeof remainingQty === "number" && (
                <p className="mt-2 text-sm text-slate-500">
                  Remaining availability:{" "}
                  <span className="font-semibold text-slate-900">
                    {remainingQty}
                  </span>
                </p>
              )}

              <p className="mt-3 text-sm font-semibold text-slate-900">
                Total paid: ${totalDue.toFixed(2)}
              </p>
            </div>

            <button
              onClick={() => {
                onClose();
                onNavigate("portfolio");
              }}
              className="mt-6 rounded-2xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              View Portfolio
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function getBatchId(project: CarbonCredit): string {
  const p = project as CarbonCredit & {
    batch_id?: string;
    id?: string;
    unicId?: string;
  };

  return p.batch_id || p.unicId || p.id || "";
}

function getBatchVersion(project: CarbonCredit): number | undefined {
  const p = project as CarbonCredit & {
    version?: number;
  };

  return p.version;
}

function SummaryRow({
  label,
  value,
  mono = false,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4 text-sm">
      <span className="text-slate-500">{label}</span>
      <span
        className={`text-slate-900 ${mono ? "font-mono text-xs" : "font-medium"}`}
      >
        {value}
      </span>
    </div>
  );
}

type FieldProps = {
  label: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
  type?: string;
  rightSlot?: ReactNode;
};

function Field({
  label,
  name,
  value,
  onChange,
  placeholder,
  error,
  type = "text",
  rightSlot,
}: FieldProps) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </label>

      <div
        className={`flex items-center rounded-2xl border px-4 py-3 ${
          error
            ? "border-red-300 bg-red-50"
            : "border-slate-200 bg-white focus-within:border-slate-400"
        }`}
      >
        <input
          name={name}
          value={value}
          onChange={onChange}
          type={type}
          placeholder={placeholder}
          className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
        />
        {rightSlot && <div className="ml-3 shrink-0">{rightSlot}</div>}
      </div>

      {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
    </div>
  );
}

type SelectFieldProps = {
  label: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  error?: string;
  options: string[];
};

function SelectField({
  label,
  name,
  value,
  onChange,
  error,
  options,
}: SelectFieldProps) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </label>

      <select
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full rounded-2xl border px-4 py-3 text-sm outline-none ${
          error
            ? "border-red-300 bg-red-50 text-slate-900"
            : "border-slate-200 bg-white text-slate-900 focus:border-slate-400"
        }`}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
    </div>
  );
}

type MethodButtonProps = {
  active: boolean;
  onClick: () => void;
  icon: ReactNode;
  title: string;
};

function MethodButton({ active, onClick, icon, title }: MethodButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-2xl border px-4 py-3 transition ${
        active
          ? "border-slate-900 bg-slate-900 text-white"
          : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
      }`}
    >
      <div className="flex items-center justify-center gap-2">
        {icon}
        <span className="text-sm font-medium">{title}</span>
      </div>
    </button>
  );
}