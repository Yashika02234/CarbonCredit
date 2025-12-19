/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from "react";
import * as THREE from "three";

// ---------------------------------------------------------
// 1) AURORA GRADIENT BACKGROUND
// ---------------------------------------------------------
export const AuroraWave: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,255,180,0.35),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,rgba(0,200,255,0.40),transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_80%,rgba(0,160,255,0.25),transparent_80%)]" />
      <div className="absolute inset-0 backdrop-blur-[90px]" />
    </div>
  );
};

// ---------------------------------------------------------
// 2) CURSOR TRAIL
// ---------------------------------------------------------
export const CursorTrail: React.FC = () => {
  useEffect(() => {
    const dots: HTMLElement[] = [];
    const dotCount = 18;

    for (let i = 0; i < dotCount; i++) {
      const d = document.createElement("div");
      d.style.position = "fixed";
      d.style.width = "10px";
      d.style.height = "10px";
      d.style.borderRadius = "50%";
      d.style.background = "rgba(0,255,200,0.45)";
      d.style.pointerEvents = "none";
      d.style.zIndex = "9999";
      d.style.transition = "transform 0.15s ease-out, opacity 0.3s";
      d.style.opacity = "0";
      document.body.appendChild(d);
      dots.push(d);
    }

    const moveDots = (e: MouseEvent) => {
      dots.forEach((dot, i) => {
        setTimeout(() => {
          dot.style.opacity = "1";
          dot.style.transform = `translate(${e.clientX - 5}px, ${
            e.clientY - 5
          }px) scale(${1 - i * 0.05})`;
          dot.style.opacity = `${1 - i * 0.05}`;
        }, i * 12);
      });
    };

    window.addEventListener("mousemove", moveDots);

    return () => {
      window.removeEventListener("mousemove", moveDots);
      dots.forEach((d) => d.remove());
    };
  }, []);

  return null;
};

// ---------------------------------------------------------
// 3) HEATMAP HOVER CARD (Wrap your cards with this)
// ---------------------------------------------------------
export const HeatmapHoverCard: React.FC<{ children: any; className?: string }> = ({
  children,
  className = "",
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    el.addEventListener("mousemove", (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      el.style.setProperty("--x", `${x}px`);
      el.style.setProperty("--y", `${y}px`);
    });
  }, []);

  return (
    <div
      ref={cardRef}
      className={`relative rounded-3xl overflow-hidden transition-all duration-300 ${className}`}
      style={{
        background:
          "radial-gradient(circle at var(--x) var(--y), rgba(0,255,200,0.25), rgba(0,0,0,0) 60%)",
      }}
    >
      {children}
    </div>
  );
};

// ---------------------------------------------------------
// 4) SCROLL REVEAL (Fade + Rise)
// ---------------------------------------------------------
export const ScrollReveal: React.FC<{
  children: any;
  delay?: number;
}> = ({ children, delay = 0 }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = `all 0.9s cubic-bezier(0.22,1,0.36,1) ${delay}ms`;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.style.opacity = "1";
            el.style.transform = "translateY(0px)";
          }
        });
      },
      { threshold: 0.25 }
    );

    obs.observe(el);

    return () => obs.disconnect();
  }, [delay]);

  return <div ref={ref}>{children}</div>;
};

// ---------------------------------------------------------
// 5) SECTION PROGRESS INDICATORS
// ---------------------------------------------------------
export const SectionIndicators: React.FC<{ sections: string[] }> = ({
  sections,
}) => {
  const [active, setActive] = React.useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) {
          const index = sections.indexOf(visible.target.id);
          if (index !== -1) setActive(index);
        }
      },
      { threshold: 0.5 }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      el && observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 z-[999] flex flex-col gap-3">
      {sections.map((_, i) => (
        <div
          key={i}
          className={`w-3 h-3 rounded-full transition-all ${
            i === active
              ? "bg-emerald-400 scale-125"
              : "bg-emerald-300/30 hover:bg-emerald-300/60"
          }`}
        />
      ))}
    </div>
  );
};

// ---------------------------------------------------------
// 6) PARALLAX HERO WRAPPER
// ---------------------------------------------------------
export const ParallaxHero: React.FC<{
  children: any;
  strength?: number;
}> = ({ children, strength = 0.12 }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const move = () => {
      const y = window.scrollY * strength;
      el.style.transform = `translateY(${y}px)`;
    };

    window.addEventListener("scroll", move, { passive: true });
    return () => window.removeEventListener("scroll", move);
  }, [strength]);

  return <div ref={ref}>{children}</div>;
};

// ---------------------------------------------------------
// 7) SCROLL SYNCED PARTICLES
// ---------------------------------------------------------
export const ScrollSyncedParticles = () => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: any[] = [];

    for (let i = 0; i < 85; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 3 + 1,
        s: Math.random() * 0.6 + 0.2,
      });
    }

    const update = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const scroll = window.scrollY * 0.05;

      particles.forEach((p) => {
        p.y += p.s + scroll * 0.01;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.fillStyle = "rgba(0,255,200,0.4)";
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(update);
    };
    update();

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);

    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <canvas
      ref={ref}
      className="pointer-events-none fixed inset-0 z-[2] opacity-50"
    />
  );
};

// ---------------------------------------------------------
// 8) 3D GLOBE (Realistic Earth, High Quality)
// ---------------------------------------------------------
export const Mini3DGlobe: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const width = 500;
    const height = 500;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 2000);
    camera.position.z = 3.2;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    // Real Earth textures
    const textureLoader = new THREE.TextureLoader();
    const earthTexture = textureLoader.load(
      "https://raw.githubusercontent.com/johan/world.geo.json/master/assets/earthmap4k.jpg"
    );
    const bumpMap = textureLoader.load(
      "https://raw.githubusercontent.com/ofrohn/d3-celestial/master/data/gray.jpg"
    );

    const geometry = new THREE.SphereGeometry(1, 96, 96);
    const material = new THREE.MeshPhongMaterial({
      map: earthTexture,
      bumpMap: bumpMap,
      bumpScale: 0.04,
      shininess: 12,
    });

    const earth = new THREE.Mesh(geometry, material);
    scene.add(earth);

    // Lighting
    const ambient = new THREE.AmbientLight(0xffffff, 0.55);
    const directional = new THREE.DirectionalLight(0xffffff, 1.25);
    directional.position.set(5, 3, 5);
    scene.add(ambient, directional);

    // Animate
    const animate = () => {
      earth.rotation.y += 0.0018;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    return () => {
      renderer.dispose();
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="w-[500px] h-[500px]" />;
};
