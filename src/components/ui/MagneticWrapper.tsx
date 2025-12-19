import { useRef } from "react";

export default function MagneticWrapper({ children, strength = 40 }) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: any) => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);

    el.style.transform = `translate(${x / strength}px, ${y / strength}px)`;
  };

  const reset = () => {
    const el = ref.current;
    if (el) el.style.transform = "translate(0px, 0px)";
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      className="transition-transform duration-300 ease-out inline-block"
    >
      {children}
    </div>
  );
}
