import { createContext, useContext, useState, useEffect } from "react";
import { CarbonCredit } from "../lib/types";

/* ---------------- TYPES ---------------- */

type OwnedAsset = {
  projectId: string;
  batchId: string;
  projectName: string;
  quantity: number;
  price: number;
  vintage: number;
  status: "owned" | "retired";
  createdAt: number;
  image: string;
  purchaseId?: string;
};

type Certificate = {
  certificateId: string;
  projectId: string;
  projectName: string;
  quantity: number;
  date: string;
  createdAt: number;
};

type RegisterPurchaseInput = {
  project: CarbonCredit;
  quantity: number;
  purchaseId?: string;
};

type PortfolioContextType = {
  assets: OwnedAsset[];
  certificates: Certificate[];
  registerPurchase: (input: RegisterPurchaseInput) => void;
  retireCredits: (projectId: string, quantity: number) => void;
};

/* ---------------- CONTEXT ---------------- */

const PortfolioContext = createContext<PortfolioContextType | null>(null);

/* ---------------- PROVIDER ---------------- */

export function PortfolioProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [assets, setAssets] = useState<OwnedAsset[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);

  /* -------- REGISTER SUCCESSFUL PURCHASE -------- */
  const registerPurchase = ({
    project,
    quantity,
    purchaseId,
  }: RegisterPurchaseInput) => {
    const projectId = project.id;
    const batchId = project.batch_id || project.unicId || project.id;

    setAssets((prev) => {
      const existing = prev.find((a) => a.batchId === batchId && a.status === "owned");

      if (existing) {
        return prev.map((a) =>
          a.batchId === batchId && a.status === "owned"
            ? {
                ...a,
                quantity: a.quantity + quantity,
                purchaseId: purchaseId || a.purchaseId,
              }
            : a
        );
      }

      return [
        ...prev,
        {
          projectId,
          batchId,
          projectName: project.projectName,
          quantity,
          price: project.pricePerCredit,
          vintage: project.vintage,
          status: "owned",
          createdAt: Date.now(),
          image: project.image,
          purchaseId,
        },
      ];
    });
  };

  /* -------- RETIRE CREDITS -------- */
  const retireCredits = (projectId: string, quantity: number) => {
    setAssets((prevAssets) => {
      const asset = prevAssets.find(
        (a) => a.projectId === projectId && a.status === "owned"
      );

      if (!asset || quantity <= 0 || quantity > asset.quantity) {
        return prevAssets;
      }

      setCertificates((prev) => [
        ...prev,
        {
          certificateId: `CERT-${Date.now()}`,
          projectId,
          projectName: asset.projectName,
          quantity,
          date: new Date().toLocaleDateString(),
          createdAt: Date.now(),
        },
      ]);

      return prevAssets
        .map((a) => {
          if (a.projectId !== projectId || a.status !== "owned") return a;

          const remaining = a.quantity - quantity;

          if (remaining === 0) {
            return {
              ...a,
              quantity: 0,
              status: "retired" as const,
            };
          }

          return {
            ...a,
            quantity: remaining,
          };
        });
    });
  };

  /* -------- PERSISTENCE -------- */
  useEffect(() => {
    localStorage.setItem("portfolio_assets", JSON.stringify(assets));
    localStorage.setItem("portfolio_certificates", JSON.stringify(certificates));
  }, [assets, certificates]);

  useEffect(() => {
    const savedAssets = localStorage.getItem("portfolio_assets");
    const savedCerts = localStorage.getItem("portfolio_certificates");

    if (savedAssets) {
      const parsed = JSON.parse(savedAssets);
      setAssets(
        parsed.map((a: any) => ({
          ...a,
          createdAt: a.createdAt ?? Date.now(),
          batchId: a.batchId ?? a.projectId,
        }))
      );
    }

    if (savedCerts) {
      const parsed = JSON.parse(savedCerts);
      setCertificates(
        parsed.map((c: any) => ({
          ...c,
          createdAt: c.createdAt ?? Date.now(),
        }))
      );
    }
  }, []);

  return (
    <PortfolioContext.Provider
      value={{ assets, certificates, registerPurchase, retireCredits }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

/* ---------------- HOOK ---------------- */

export function usePortfolio() {
  const ctx = useContext(PortfolioContext);
  if (!ctx) {
    throw new Error("usePortfolio must be used inside PortfolioProvider");
  }
  return ctx;
}