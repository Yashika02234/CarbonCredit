import { useRef } from "react";

export default function TiltCard({ children }: { children: React.ReactNode }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // T2 → Medium 3D tilt
    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;

    card.style.transform = `
      perspective(900px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale(1.04)
    `;
  };

  const resetTilt = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform =
      "perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)";
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetTilt}
      className="
        transition-all duration-300
        bg-white/10 backdrop-blur-xl rounded-3xl
        border border-white/20 shadow-xl
        hover:shadow-emerald-500/30
        cursor-pointer
      "
      style={{
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
    >
      {children}
    </div>
  );
}
