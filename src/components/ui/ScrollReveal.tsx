import { useEffect, useRef } from "react";

export default function ScrollReveal({
  children,
  animation = "fade-up",
  delay = 0,
}: any) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.filter = "blur(6px)";
    el.style.transition = "all 0.9s cubic-bezier(0.16, 1, 0.3, 1)";

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.style.opacity = "1";
            el.style.transform = "translateY(0px)";
            el.style.filter = "blur(0px)";
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}
