import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Calendar, ArrowRight } from "lucide-react";

/* ================= ACTIVE PROJECTS ================= */
export function ActiveProjectsSection({
  ownedAssets,
  setRetireTarget,
}: {
  ownedAssets: any[];
  setRetireTarget: (v: any) => void;
}) {
  const [showAllProjects, setShowAllProjects] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  if (ownedAssets.length === 0) {
    return (
      <section className="py-24 my-12 bg-white rounded-[2rem] border border-dashed border-black/10 flex flex-col items-center justify-center text-center px-6">
        <div className="w-16 h-16 bg-neutral-100 rounded-3xl flex items-center justify-center mb-6 shadow-sm border border-black/5">
           <MapPin className="w-6 h-6 text-neutral-400" />
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-neutral-900 mb-2">No Active Projects</h2>
        <p className="text-neutral-500 font-medium max-w-sm">
          You currently don't own any active carbon credits. Visit the marketplace to start building your portfolio.
        </p>
      </section>
    );
  }

  return (
    <section className="py-24">

      {/* HEADER */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="flex items-center gap-4 mb-12"
      >
        <div className="p-3 bg-neutral-100 rounded-2xl border border-black/5 text-neutral-600 shadow-sm">
          <MapPin className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-4xl font-bold tracking-tight">Active Projects</h2>
          <p className="text-neutral-500 font-medium mt-1">Live offset operations currently held in your portfolio.</p>
        </div>
      </motion.div>

      {/* GRID */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {(showAllProjects ? ownedAssets : ownedAssets.slice(0, 3)).map(asset => (
          <motion.div
            variants={itemVariants}
            key={asset.projectId}
            className="group relative bg-white rounded-3xl border border-black/5 overflow-hidden transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl shadow-sm flex flex-col h-full"
          >
            {/* IMAGE with HOVER ZOOM & GRADIENT */}
            <div className="relative h-56 overflow-hidden bg-neutral-100 shrink-0">
              <img
                src={asset.image}
                alt={asset.projectName}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* GRADIENT OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="absolute top-4 right-4">
                <span className="px-3.5 py-1.5 bg-emerald-500 border border-emerald-400 text-white text-[10px] font-bold tracking-widest rounded-xl uppercase shadow-lg backdrop-blur-md">
                   Active Yield
                </span>
              </div>
              
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="font-bold text-xl leading-snug tracking-tight mb-1 line-clamp-1 drop-shadow-md">
                  {asset.projectName}
                </h3>
                <p className="text-white/80 text-xs font-semibold uppercase tracking-widest flex items-center gap-1.5 drop-shadow">
                  <Calendar className="w-3.5 h-3.5" /> Vintage {asset.vintage || "2024"}
                </p>
              </div>
            </div>

            {/* CONTENT */}
            <div className="p-6 md:p-8 flex flex-col flex-1 relative bg-white">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1">Total Held</p>
                  <p className="text-2xl font-bold text-neutral-900 tracking-tight">
                    {asset.quantity.toLocaleString()} <span className="text-neutral-400 text-sm font-medium">tCO₂e</span>
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1">Asset Value</p>
                  <p className="text-lg font-bold text-emerald-700 tracking-tight">
                    ${(asset.quantity * asset.price).toLocaleString()}
                  </p>
                </div>
              </div>

              {/* HOVER-REVEALED CTA */}
              <div className="mt-auto relative h-12 overflow-hidden rounded-xl bg-neutral-50 border border-black/5 group-hover:border-transparent group-hover:bg-emerald-600 transition-colors duration-300">
                <button
                  onClick={() =>
                    setRetireTarget({
                      projectId: asset.projectId,
                      projectName: asset.projectName,
                      quantity: asset.quantity,
                    })
                  }
                  className="absolute inset-0 w-full h-full flex items-center justify-center gap-2 text-sm font-bold text-neutral-500 group-hover:text-white transition-colors duration-300"
                >
                  <span className="group-hover:-translate-x-1 transition-transform duration-300">Manage Asset</span>
                  <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </button>
              </div>

            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* VIEW ALL TOGGLE */}
      {ownedAssets.length > 3 && (
        <motion.div 
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
          className="w-full flex justify-center mt-12"
        >
          <button
            onClick={() => setShowAllProjects(v => !v)}
            className="px-6 py-3 rounded-xl bg-white border border-black/5 text-sm font-bold text-neutral-700 hover:bg-neutral-50 hover:shadow-sm transition-all shadow-sm"
          >
            {showAllProjects ? "Show fewer projects" : `View all ${ownedAssets.length} active projects`}
          </button>
        </motion.div>
      )}
    </section>
  );
}
