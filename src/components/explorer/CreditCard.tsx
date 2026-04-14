import {
  MapPin,
  Calendar,
  Activity,
} from "lucide-react";
import { CarbonCredit } from "../../lib/types";

interface CreditCardProps {
  credit: CarbonCredit;
  onClick: () => void;
}

export function CreditCard({ credit, onClick }: CreditCardProps) {
  const available =
    credit.available_quantity ??
    credit.availableCredits ??
    0;

  const isSellable = credit.status === "SELLABLE" && available > 0;

  return (
    <div
      onClick={onClick}
      className="group bg-white rounded-2xl border border-gray-200 overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative h-44 overflow-hidden">
        <img
          src={credit.image}
          alt={credit.projectName}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <span className="absolute top-3 left-3 px-3 py-1 bg-emerald-600 text-white text-[10px] font-semibold rounded-full uppercase">
          {credit.projectType}
        </span>

        <span
          className={`absolute top-3 right-3 px-3 py-1 text-[10px] font-semibold rounded-full uppercase ${isSellable
              ? "bg-white/90 text-emerald-700"
              : "bg-red-100 text-red-700"
            }`}
        >
          {isSellable ? "Sellable" : "Unavailable"}
        </span>
      </div>

      <div className="p-5 space-y-3">
        <h3 className="text-base font-semibold text-gray-900 line-clamp-2">
          {credit.projectName}
        </h3>

        <div className="flex items-center gap-4 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {credit.country}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {credit.vintage}
          </span>
        </div>

        <div className="text-xs text-gray-600 space-y-1">
          <p>
            <span className="font-medium">Availability:</span>{" "}
            {available.toLocaleString()}
          </p>
          <p>
            <span className="font-medium">Batch ID:</span>{" "}
            {credit.batch_id}
          </p>
        </div>

        <div className="flex justify-between items-center pt-2">
          <p className="text-lg font-bold text-emerald-700">
            ${credit.pricePerCredit.toFixed(2)}
            <span className="text-xs font-medium text-gray-500"> / ton</span>
          </p>

          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Activity className="w-3 h-3" />
            {Math.round(credit.trustScore)}% Trust
          </div>
        </div>

        <div className="flex gap-2 pt-3">
          <button
            type="button"
            className={`flex-1 py-2 rounded-lg text-xs font-semibold transition ${isSellable
                ? "bg-emerald-600 text-white hover:bg-emerald-500"
                : "bg-gray-200 text-gray-500 cursor-not-allowed"
              }`}
          >
            Buy Credits
          </button>
          <button
            type="button"
            className="flex-1 py-2 rounded-lg border border-gray-300 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}