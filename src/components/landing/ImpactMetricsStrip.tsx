/* ================= IMPACT METRICS STRIP ================= */
export default function ImpactMetricsStrip() {
  return (
    <section className="relative z-20 -mt-28 px-6 lg:px-0">
      <div className="max-w-[2400px] mx-auto">

        <div
          data-reveal="up"
          className="
            grid grid-cols-2 md:grid-cols-4
            gap-6
            bg-white/95 backdrop-blur-md
            border border-black/5
            rounded-[28px]
            shadow-[0_30px_80px_rgba(0,0,0,0.12)]
            p-10 md:p-14
          "
        >

          {[
            {
              value: "2.4M+",
              label: "Credits Evaluated",
              sub: "Across verified registries",
            },
            {
              value: "38",
              label: "Active Projects",
              sub: "Multi-region coverage",
            },
            {
              value: "12",
              label: "Standards Supported",
              sub: "Global methodologies",
            },
            {
              value: "99.2%",
              label: "Data Traceability",
              sub: "Audit-ready records",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="
                group
                relative
                overflow-hidden
                rounded-xl
                px-4 py-4
                text-center md:text-left
                transition-all duration-500
              "
            >
              {/* Hover sweep background */}
              <span
                className="
                  absolute inset-0
                  bg-gradient-to-r
                  from-[#0F3D33]
                  to-[#1E6B5C]
                  translate-x-[-100%]
                  group-hover:translate-x-0
                  transition-transform duration-500 ease-out
                  z-0
                "
              />

              {/* Content */}
              <div className="relative z-10">
                <p
                  className="
                    text-3xl md:text-4xl font-semibold
                    text-[#30574E]
                    group-hover:text-white
                    transition-colors duration-300
                    mb-2
                    tracking-tight
                  "
                >
                  {item.value}
                </p>

                <p
                  className="
                    text-sm font-medium
                    text-gray-900
                    group-hover:text-white
                    transition-colors duration-300
                    mb-1
                  "
                >
                  {item.label}
                </p>

                <p
                  className="
                    text-xs
                    text-gray-500
                    group-hover:text-white/80
                    transition-colors duration-300
                  "
                >
                  {item.sub}
                </p>
              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}
