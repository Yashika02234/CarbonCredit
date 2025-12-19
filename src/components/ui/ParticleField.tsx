import { useEffect, useRef } from "react";

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let particles: any[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 3 + 1,
        dx: Math.random() * 0.6 - 0.3,
        dy: Math.random() * 0.6 - 0.3,
        t: Math.random(),
        type: Math.random() > 0.5 ? "leaf" : "orb",
      });
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        ctx.beginPath();
        if (p.type === "leaf") {
          ctx.fillStyle = `rgba(76, 161, 141, ${0.15 + Math.sin(p.t) * 0.15})`;
          ctx.ellipse(p.x, p.y, p.r * 1.4, p.r, Math.PI / 4, 0, 2 * Math.PI);
        } else {
          ctx.fillStyle = `rgba(0, 255, 255, ${
            0.1 + Math.cos(p.t) * 0.1
          })`;
          ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
        }
        ctx.fill();

        p.x += p.dx;
        p.y += p.dy;
        p.t += 0.01;

        if (p.x < 0) p.x = canvas.width;
        if (p.y < 0) p.y = canvas.height;
        if (p.x > canvas.width) p.x = 0;
        if (p.y > canvas.height) p.y = 0;
      });

      requestAnimationFrame(draw);
    }

    draw();

    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[1]"
    />
  );
}
