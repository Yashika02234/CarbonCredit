import { useEffect, useRef, useState } from 'react';

/* ================= IMPACT METRICS STRIP ================= */

function useCountUpDown(target: number, active: boolean, duration = 1200) {
  const [value, setValue] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    let startTime: number | null = null;
    const startValue = value;
    const endValue = active ? target : 0;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const current = Math.floor(
        startValue + (endValue - startValue) * progress
      );
      setValue(current);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    cancelAnimationFrame(rafRef.current!);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [active, target]);

  return value;
}

export default function ImpactMetricsStrip() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  // Intersection Observer (bi-directional)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      { threshold: 0.35 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  const metrics = [
    {
      value: 5,
      display: (v: number) => `${v}+`,
      label: "Regulations Tracked",
      sub: "CBAM, EU ETS, CCTS, CSRD & more",
    },
    {
      value: 6,
      display: (v: number) => `${v}`,
      label: "Target Industries",
      sub: "Steel, Cement, Aluminum & more",
    },
    {
      value: 99,
      display: (v: number) => `${v}.9%`,
      label: "Audit Trail Uptime",
      sub: "Enterprise-grade reliability",
    },
    {
      value: 100,
      display: (v: number) => `${v}%`,
      label: "Compliance-Native",
      sub: "Built for mandatory reporting",
    },
  ];

  return (
    <section className="relative z-20 -mt-28 px-6 lg:px-0">
      <div className="max-w-[2400px] mx-auto">
        <div
          ref={ref}
          data-reveal="up"
          className="
            grid grid-cols-2 md:grid-cols-4
            gap-6
            bg-white/95 backdrop-blur-md
            border border-black/5
            rounded-none              /* sharp rectangle */
            shadow-[0_30px_80px_rgba(0,0,0,0.12)]
            p-10 md:p-14
          "
        >
          {metrics.map((item) => {
            const count = useCountUpDown(item.value, visible, 1200);

            return (
              <div
                key={item.label}
                className="
                  group
                  relative
                  overflow-hidden
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
                    {item.display(count)}
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
            );
          })}
        </div>
      </div>
    </section>
  );
}