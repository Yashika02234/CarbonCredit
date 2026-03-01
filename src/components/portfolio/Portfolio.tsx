/* eslint-disable no-irregular-whitespace */
import { useState, useMemo } from "react";
import { usePortfolio } from "@/context/PortfolioContext";
import AddAssetModal from "./AddAssetModal";
import RetireCreditsModal from "./RetireCreditsModal";
import CertificatePDF from "./CertificatePDF";
import { downloadPDF } from "@/utils/downloadPDF";
import ActiveProjectsSection from "./ActiveProjectsSection";



/* =========================
   MAIN COMPONENT
========================= */
export default function Portfolio() {
  const { assets, certificates, retireCredits } = usePortfolio();

  const portfolioValueSeries = useMemo(() => {
    let cumulative = 0;

    return assets.map((a, index) => {
      cumulative += a.quantity * a.price;

      return {
        label: `M${index + 1}`,
        value: cumulative,
      };
    });
  }, [assets]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [retireTarget, setRetireTarget] = useState<{
    projectId: string;
    projectName: string;
    quantity: number;
  } | null>(null);

  const ownedAssets = assets.filter(a => a.status === "owned");

  const totalCredits = assets.reduce((s, a) => s + a.quantity, 0);
  const activeCredits = ownedAssets.reduce((s, a) => s + a.quantity, 0);
  const retiredCredits = certificates.reduce((s, c) => s + c.quantity, 0);

  const portfolioValue = (totalCredits * 12).toLocaleString();

const KPI = ({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) => (
  <div
    className="
      relative group overflow-hidden
      bg-white/80 backdrop-blur
      rounded-2xl px-6 py-7
      ring-1 ring-black/5
      transition-all duration-500
      hover:-translate-y-1 hover:shadow-xl
    "
  >
    {/* SWEEP UP LAYER */}
    <div
      className="
        absolute inset-0
        bg-emerald-950
        translate-y-full
        group-hover:translate-y-0
        transition-transform
        duration-[1600ms]
        ease-[cubic-bezier(0.22,1,0.36,1)]
      "
    />

    {/* CONTENT */}
    <div className="relative z-10">
      <p
        className="
          text-xs uppercase tracking-wide
          text-gray-500 mb-2
          group-hover:text-white/70
          transition-colors duration-700
        "
      >
        {label}
      </p>

      <p
        className={`
          text-3xl font-semibold
          ${accent ? "text-emerald-700" : "text-gray-900"}
          group-hover:text-white
          transition-colors duration-700
        `}
      >
        {value}
      </p>
    </div>

    {/* ACCENT STRIP (OPTIONAL, VERY SUBTLE) */}
    {accent && (
      <div className="absolute left-0 bottom-0 h-1 w-full bg-emerald-600/60" />
    )}
  </div>
);

  /* =========================
     UI
  ========================= */

  return (
    <div className="min-h-screen bg-[#F2F4F6] pt-24 pb-20 text-[#1F2937]">
      <div className="max-w-[1600px] mx-auto">

        {/* ================= HEADER ================= */}
        <header>
          <p className="text-8xl text-gray-500 py-5 font-light tracking-tight">
            Portfolio Overview
          </p>
          
        </header>
       

       <section className="grid grid-cols-1 md:grid-cols-5 gap-8 py-20 px-6 border-t border-gray-200">
  <KPI label="Total credits owned" value={totalCredits.toLocaleString()} />
  <KPI label="Active credits" value={activeCredits.toLocaleString()} accent />
  <KPI label="Retired credits" value={retiredCredits.toLocaleString()} />
  <KPI label="Portfolio value" value={`$${portfolioValue}`} accent />
  <KPI label="CO₂ offset" value={`${retiredCredits.toLocaleString()} tons`} />
</section>

   
       {/* ================= PORTFOLIO VALUE TIMELINE ================= */}
<section className="py-20 px-6 border-t border-gray-200">

  {/* HEADER */}
  <div className="max-w-3xl mb-16">
   <h2 className="text-5xl font-semibold mb-3">
 Growth of your 
  <br/> Climate portfolio
</h2>

    <p className="text-lg text-gray-500 leading-relaxed">
      A chronological view of how your carbon credit portfolio has grown
      through purchases and project participation.
    </p>
  </div>

  {portfolioValueSeries.length === 0 ? (
    <p className="text-sm text-gray-500">
      No portfolio activity yet.
    </p>
  ) : (
    <div className="relative">

      {/* BASE LINE */}
      <div className="absolute left-0 right-0 top-1/2 h-px bg-gray-200" />

      {/* TIMELINE ITEMS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative">
        {portfolioValueSeries.map((point, index) => (
          <div key={index} className="relative">

            {/* DOT */}
            <div className="absolute left-1/2 -translate-x-1/2 top-[46%]">
              <div className="w-3 h-3 rounded-full bg-emerald-600" />
            </div>

            {/* CARD */}
            <div className="mt-16 text-center">
              <p className="text-xs text-gray-500 mb-1">
                {point.label}
              </p>
              <p className="text-lg font-semibold text-emerald-700">
                ${point.value.toLocaleString()}
              </p>
            </div>

          </div>
        ))}
      </div>

    </div>
  )}
</section>

{/* ================= HOW CREDIT RETIREMENT WORKS ================= */}
<section className="w-full bg-[#F6FBF8] py-8">

  <div className="max-w-[1600px]  px-0">

    {/* HEADER */}
    <div className="mb-16">
      <h2 className="text-5xl px-6 font-semibold mb-4 text-[#064E3B]">
        How credit retirement works
      </h2>
      <p className="text-[#064E3B]/70 max-w-3xl px-6 ">
        Retiring credits is the final step that ensures your climate
        impact is permanent, exclusive, and verifiable.
      </p>
    </div>

    {/* ACCORDION */}
    <div className="divide-y divide-emerald-900/10">
      <RetirementItem
        title="What does retiring a credit mean?"
        content="Retiring a carbon credit permanently removes it from circulation, ensuring it cannot be sold, transferred, or reused."
      />
      <RetirementItem
        title="Why retirement is permanent"
        content="Once retired, credits are locked at the registry level to prevent reuse and double counting."
      />
      <RetirementItem
        title="How retirement is verified"
        content="Each retirement is timestamped and linked to registry records, creating a transparent audit trail."
      />
      <RetirementItem
        title="Proof of impact"
        content="A retirement certificate is issued and can be downloaded for audits, ESG reporting, and disclosures."
      />
    </div>

  </div>
</section>

<ActiveProjectsSection ownedAssets={ownedAssets} setRetireTarget={setRetireTarget} />


      


       {/* ================= RETIRED PROJECTS ================= */}
<section className="py-24 border-t border-gray-200">

  <h2 className="text-5xl font-semibold mb-12">
    Retired projects
  </h2>

  <div className="grid md:grid-cols-2 gap-8 px-2">
    {certificates.map(cert => (
      <div
        key={cert.certificateId}
        className="
          relative group overflow-hidden
          bg-white rounded-2xl p-8
          ring-1 ring-black/5
          transition-shadow duration-500
          hover:shadow-xl
        "
      >
        {/* HOVER SWEEP */}
        <div
          className="
            absolute inset-0
            bg-emerald-950
            translate-x-[-100%]
            group-hover:translate-x-0
            transition-transform
            duration-[1600ms]
            ease-[cubic-bezier(0.22,1,0.36,1)]
          "
        />

        {/* CONTENT */}
        <div className="relative z-10 space-y-4">

          {/* HEADER */}
          <div className="flex justify-between items-start">
            <h3
              className="
                font-semibold text-lg
                text-gray-900
                group-hover:text-white
                transition-colors duration-700
              "
            >
              {cert.projectName}
            </h3>

            <span
              className="
                text-xs
                text-gray-500
                group-hover:text-white/70
                transition-colors duration-700
              "
            >
              Retired
            </span>
          </div>

          {/* DETAILS */}
          <div
            className="
              text-sm text-gray-600
              group-hover:text-white/80
              transition-colors duration-700
              space-y-1
            "
          >
            <p>
              Credits retired: <strong>{cert.quantity}</strong>
            </p>
            <p>
              CO₂ offset: {cert.quantity} tCO₂
            </p>
          </div>

          {/* FOOTER */}
          <div className="flex justify-between items-center pt-4 border-t border-black/5 group-hover:border-white/20 transition-colors duration-700">

            <span
              className="
                text-sm font-medium text-emerald-700
                group-hover:text-emerald-300
                transition-colors duration-700
              "
            >
              Permanently retired
            </span>

            <button
              onClick={() =>
                downloadPDF(
                  <CertificatePDF {...cert} />,
                  `${cert.certificateId}.pdf`
                )
              }
              className="
                text-sm font-medium
                text-emerald-700
                group-hover:text-white
                hover:underline
                transition-colors duration-700
              "
            >
              View certificate
            </button>

          </div>
        </div>
      </div>
    ))}
  </div>
</section>

{/* ================= TRANSACTION ACTIVITY LOG ================= */}
<section className="pt-6 py-4 px-7 border-t border-gray-200">

  {/* SECTION HEADER */}
  <div className="mb-10">
    <h2 className="text-5xl font-semibold mb-2">
      Activity log
    </h2>
    <p className="text-sm text-gray-500">
      A complete record of all credit purchases and retirements.
    </p>
  </div>

  {assets.length === 0 && certificates.length === 0 ? (
    <p className="text-sm text-gray-500">
      No activity recorded yet.
    </p>
  ) : (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border-collapse">

        {/* HEADER */}
        <thead className="text-gray-500 border-b">
          <tr>
            <th className="text-left py-3 font-medium">Date</th>
            <th className="text-left py-3 font-medium">Action</th>
            <th className="text-left py-3 font-medium">Project</th>
            <th className="text-right py-3 font-medium">Quantity</th>
            <th className="text-left py-3 font-medium">Status</th>
          </tr>
        </thead>

        {/* BODY */}
        <tbody className="divide-y">

          {assets.map(asset => (
            <tr
              key={`buy-${asset.projectId}`}
              className="hover:bg-gray-50 transition-colors"
            >
              <td className="py-4 text-gray-600">
                {new Date(asset.createdAt || Date.now()).toLocaleDateString()}
              </td>
              <td className="py-4 font-medium">
                Purchased
              </td>
              <td className="py-4">
                {asset.projectName}
              </td>
              <td className="py-4 text-right">
                {asset.quantity.toLocaleString()}
              </td>
              <td className="py-4">
                <span className="text-xs text-emerald-700">
                  Completed
                </span>
              </td>
            </tr>
          ))}

          {certificates.map(cert => (
            <tr
              key={`retire-${cert.certificateId}`}
              className="hover:bg-gray-50 transition-colors"
            >
              <td className="py-4 text-gray-600">
                {new Date(cert.createdAt || Date.now()).toLocaleDateString()}
              </td>
              <td className="py-4 font-medium">
                Retired
              </td>
              <td className="py-4">
                {cert.projectName}
              </td>
              <td className="py-4 text-right">
                {cert.quantity.toLocaleString()}
              </td>
              <td className="py-4">
                <span className="text-xs text-gray-600">
                  Permanently retired
                </span>
              </td>
            </tr>
          ))}

        </tbody>
      </table>
    </div>
  )}
</section>



        
      </div>

      {/* ================= MODALS ================= */}
      <AddAssetModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={() => setIsAddModalOpen(false)}
      />

      {retireTarget && (
        <RetireCreditsModal
          isOpen
          onClose={() => setRetireTarget(null)}
          projectName={retireTarget.projectName}
          ownedQuantity={retireTarget.quantity}
          onConfirm={(qty) => {
            retireCredits(retireTarget.projectId, qty);
            setRetireTarget(null);
          }}
        />
      )}
    </div>
  );
}

/* =========================
   SMALL COMPONENTS
========================= */

function RetirementItem({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative group overflow-hidden">

      {/* HOVER SWEEP LAYER */}
      <div
        className="
          absolute inset-0
          bg-emerald-950
          translate-x-[-100%]
          group-hover:translate-x-0
          transition-transform
          duration-[1400ms]
          ease-[cubic-bezier(0.22,1,0.36,1)]
        "
      />

      {/* CONTENT */}
      <div className="relative z-10 px-6">

        {/* HEADER */}
        <button
          onClick={() => setOpen(v => !v)}
          className="w-full flex justify-between items-center py-8 text-left"
        >
          <span
            className="
              text-lg font-medium
              text-[#064E3B]
              group-hover:text-white
              transition-colors duration-700
            "
          >
            {title}
          </span>

          <span
            className={`
              text-2xl
              text-[#064E3B]/60
              group-hover:text-white
              transition-all duration-700
              ${open ? "rotate-45" : "rotate-0"}
            `}
          >
            +
          </span>
        </button>

        {/* BODY */}
        <div
          className={`
            grid transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
            ${open ? "grid-rows-[1fr] opacity-100 pb-8" : "grid-rows-[0fr] opacity-0"}
          `}
        >
          <div
            className="
              overflow-hidden
              text-[#064E3B]/70
              group-hover:text-white/80
              transition-colors duration-700
              max-w-4xl
            "
          >
            {content}
          </div>
        </div>

      </div>
    </div>
  );
}
