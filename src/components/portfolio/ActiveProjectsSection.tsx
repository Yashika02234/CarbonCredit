/* ================= ACTIVE PROJECTS ================= */
import { useState } from "react";

export function ActiveProjectsSection({
  ownedAssets,
  setRetireTarget,
}: {
  ownedAssets: any[];
  setRetireTarget: (v: any) => void;
}) {
  const [showAllProjects, setShowAllProjects] = useState(false);

  return (
    <section className="py-24 px-6 border-t border-gray-200">

      {/* HEADER */}
      <h2 className="text-5xl font-semibold mb-12">
        Active projects
      </h2>

      {/* GRID */}
      <div className="grid md:grid-cols-3 gap-8">
        {(showAllProjects ? ownedAssets : ownedAssets.slice(0, 3)).map(asset => (
          <div
            key={asset.projectId}
            className="
              group relative overflow-hidden
              bg-white rounded-2xl
              ring-1 ring-black/5
              transition-all duration-500
              hover:-translate-y-1 hover:shadow-xl
            "
          >
            {/* IMAGE */}
            <div className="relative h-40 overflow-hidden">
              <img
                src={asset.image}
                alt={asset.projectName}
                className="
                  w-full h-full object-cover
                  transition-transform duration-[1200ms]
                  group-hover:scale-105
                "
              />

              {/* SOFT EMERALD OVERLAY */}
              <div
                className="
                  absolute inset-0
                  bg-emerald-900/0
                  group-hover:bg-emerald-900/10
                  transition-colors duration-[1200ms]
                "
              />
            </div>

            {/* CONTENT */}
            <div className="p-6 space-y-3">
              <div className="flex justify-between items-center">
                <h3
                  className="
                    font-semibold
                    transition-colors duration-500
                    group-hover:text-emerald-700
                  "
                >
                  {asset.projectName}
                </h3>
                <span className="text-xs text-emerald-700">
                  Active
                </span>
              </div>

              <div className="text-sm text-gray-600 space-y-1">
                <p>
                  Credits held:{" "}
                  <strong>{asset.quantity.toLocaleString()}</strong>
                </p>
                <p>Vintage: {asset.vintage}</p>
                <p>Standard: VCS</p>
              </div>

              <div className="flex justify-between items-center pt-4 border-t">
                <span className="text-emerald-700 font-semibold">
                  ${(asset.quantity * asset.price).toLocaleString()}
                </span>

                <button
                  onClick={() =>
                    setRetireTarget({
                      projectId: asset.projectId,
                      projectName: asset.projectName,
                      quantity: asset.quantity,
                    })
                  }
                  className="text-sm font-medium text-emerald-700 hover:underline"
                >
                  Retire credits
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* VIEW ALL TOGGLE */}
      {ownedAssets.length > 3 && (
        <div className="w-full flex justify-center mt-14">
          <button
            onClick={() => setShowAllProjects(v => !v)}
            className="text-sm font-medium text-emerald-700 hover:underline"
          >
            {showAllProjects ? "Show fewer projects" : "View all projects"}
          </button>
        </div>
      )}
    </section>
  );
}
