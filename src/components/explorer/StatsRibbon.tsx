export default function StatsRibbon() {
  return (
    <div className="w-full  ">
      <div className="relative w-full  bg-gradient-to-r from-[#EEF5E8] via-[#F4F8EF] to-[#EEF5E8] py-12 shadow-sm">

        {/* Decorative gradient texture */}
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_top_left,#dfead8,transparent_60%),radial-gradient(circle_at_bottom_right,#dfead8,transparent_60%)] opacity-40" />

        <div className="relative grid grid-cols-3 items-center text-center max-w-[1600px] mx-auto px-10">

          {/* STAT 1 */}
          <div className="space-y-1">
            <p className="text-2xl font-semibold text-[#2F4A40]">
              1,250,000+
            </p>
            <p className="text-xs tracking-wide text-[#5C6F63] uppercase">
              Tons of CO₂ Offset
            </p>
          </div>

          {/* DIVIDERS */}
          <div className="absolute left-1/3 top-1/2 -translate-y-1/2 h-10 w-px bg-[#C7D6CB]" />
          <div className="absolute left-2/3 top-1/2 -translate-y-1/2 h-10 w-px bg-[#C7D6CB]" />

          {/* STAT 2 */}
          <div className="space-y-1">
            <p className="text-2xl font-semibold text-[#2F4A40]">
              300+
            </p>
            <p className="text-xs tracking-wide text-[#5C6F63] uppercase">
              Verified Projects
            </p>
          </div>

          {/* STAT 3 */}
          <div className="space-y-1">
            <p className="text-2xl font-semibold text-[#2F4A40]">
              75+
            </p>
            <p className="text-xs tracking-wide text-[#5C6F63] uppercase">
              Countries Supported
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
