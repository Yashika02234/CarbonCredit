import { useState } from "react";
import { X } from "lucide-react";

interface RetireCreditsModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectName: string;
  ownedQuantity: number;
  onConfirm: (quantity: number) => void;
}

export default function RetireCreditsModal({
  isOpen,
  onClose,
  projectName,
  ownedQuantity,
  onConfirm,
}: RetireCreditsModalProps) {
  const [quantity, setQuantity] = useState<number>(1);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (quantity <= 0) {
      setError("Quantity must be greater than 0");
      return;
    }
    if (quantity > ownedQuantity) {
      setError("Cannot retire more than owned credits");
      return;
    }

    onConfirm(quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-background border rounded-2xl shadow-xl p-6 animate-in zoom-in-95">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">
            Retire Credits
          </h2>
          <button onClick={onClose}>
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Content */}
        <p className="text-sm mb-4">
          Project: <span className="font-semibold">{projectName}</span>
        </p>

        <p className="text-xs text-muted-foreground mb-2">
          Available: {ownedQuantity} tCO₂e
        </p>

        <input
          type="number"
          min={1}
          max={ownedQuantity}
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="w-full px-4 py-2 border rounded-xl mb-2"
        />

        {error && (
          <p className="text-xs text-red-500 mb-2">{error}</p>
        )}

        {/* Actions */}
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-sm border"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 rounded-xl text-sm font-bold bg-emerald-500 text-emerald-950"
          >
            Retire
          </button>
        </div>
      </div>
    </div>
  );
}
