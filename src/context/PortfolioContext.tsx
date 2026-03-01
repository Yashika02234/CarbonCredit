import { createContext, useContext, useState, useEffect } from "react";
import { CarbonCredit } from "../lib/types";

/* ---------------- TYPES ---------------- */

type OwnedAsset = {
  projectId: string;
  projectName: string;
  quantity: number;
  price: number;
  vintage: number;
  status: "owned" | "retired";
  createdAt: number;
  image: string;
};

type Certificate = {
  certificateId: string;
  projectId: string;
  projectName: string;
  quantity: number;
  date: string;
  createdAt: number;
};

type PortfolioContextType = {
  assets: OwnedAsset[];
  certificates: Certificate[];
  buyCredits: (project: CarbonCredit, quantity: number) => void;
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

  /* -------- BUY CREDITS -------- */
  const buyCredits = (project: CarbonCredit, quantity: number) => {
    setAssets(prev => {
      const existing = prev.find(a => a.projectId === project.id);

      if (existing) {
        return prev.map(a =>
          a.projectId === project.id
            ? { ...a, quantity: a.quantity + quantity }
            : a
        );
      }

      return [
        ...prev,
        {
          projectId: project.id,
          projectName: project.projectName,
          quantity,
          price: project.pricePerCredit,
          vintage: project.vintage,
          status: "owned",
          createdAt: Date.now(),
          image: project.image,
        },
      ];
    });
  };

  /* -------- RETIRE CREDITS (PARTIAL) -------- */
  const retireCredits = (projectId: string, quantity: number) => {
    setAssets(prevAssets => {
      const asset = prevAssets.find(a => a.projectId === projectId);
      if (!asset || quantity <= 0 || quantity > asset.quantity) {
        return prevAssets;
      }

      // create certificate
      setCertificates(prev => [
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

      // update asset
      return prevAssets.map(a => {
        if (a.projectId !== projectId) return a;

        const remaining = a.quantity - quantity;

        if (remaining === 0) {
          return {
            ...a,
            quantity: 0,
            status: "retired",
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
    localStorage.setItem(
      "portfolio_certificates",
      JSON.stringify(certificates)
    );
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
      value={{ assets, certificates, buyCredits, retireCredits }}
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
