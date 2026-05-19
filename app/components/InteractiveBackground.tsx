"use client";

import { useEffect, useRef } from "react";

interface InteractiveBackgroundProps {
  type?: "constellation" | "dust";
  particleColor?: string;
  lineColor?: string;
}

export default function InteractiveBackground({
  type = "constellation",
  lineColor = "rgba(99, 102, 241, 0.15)", // Indigo fallback
}: InteractiveBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const mouse = { x: null as number | null, y: null as number | null, radius: 140 };
    let isVisible = true;

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      baseRadius: number;
      color: string;
    }

    const init = () => {
      const isMobile = window.innerWidth < 768;
      const count = isMobile ? 20 : 50; // Reduced from 30/90
      particles = [];

      const colors = [
        "rgba(139, 92, 246, 0.35)",
        "rgba(99, 102, 241, 0.35)",
        "rgba(6, 182, 212, 0.35)",
        "rgba(236, 72, 153, 0.3)",
      ];

      for (let i = 0; i < count; i++) {
        const radius = Math.random() * 1.8 + 0.8;
        particles.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          radius: radius,
          baseRadius: radius,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2); // Cap DPR at 2
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      init();
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Throttled mouse handler
    let mouseThrottleTimer: ReturnType<typeof setTimeout> | null = null;
    const handleMouseMove = (e: MouseEvent) => {
      if (mouseThrottleTimer) return;
      mouseThrottleTimer = setTimeout(() => { mouseThrottleTimer = null; }, 32); // ~30fps mouse tracking
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    // Pause when tab is hidden
    const handleVisibility = () => {
      isVisible = !document.hidden;
      if (isVisible) {
        animationFrameId = requestAnimationFrame(draw);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("visibilitychange", handleVisibility);

    const CONNECTION_DIST = 90; // Reduced from 110
    const CONNECTION_DIST_SQ = CONNECTION_DIST * CONNECTION_DIST;

    const draw = () => {
      if (!isVisible) return;

      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      // Update particle positions
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        // Mouse interaction (simplified)
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const distSq = dx * dx + dy * dy;
          const rSq = mouse.radius * mouse.radius;

          if (distSq < rSq) {
            const dist = Math.sqrt(distSq);
            const force = (mouse.radius - dist) / mouse.radius;
            p.x -= (dx / dist) * force * 1.2;
            p.y -= (dy / dist) * force * 1.2;
            p.radius += (p.baseRadius * 1.3 - p.radius) * 0.08;
          } else {
            p.radius += (p.baseRadius - p.radius) * 0.06;
          }
        } else {
          p.radius += (p.baseRadius - p.radius) * 0.06;
        }

        // Draw particle as simple filled rect (faster than arc)
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x - p.radius, p.y - p.radius, p.radius * 2, p.radius * 2);
      }

      // Draw connections — batch all lines into one path per color
      if (type === "constellation") {
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const distSq = dx * dx + dy * dy;

            if (distSq < CONNECTION_DIST_SQ) {
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
            }
          }
        }
        ctx.strokeStyle = lineColor.replace(/[\d.]+\)$/, `0.08)`);
        ctx.stroke();

        // Mouse cursor connections — single path
        if (mouse.x !== null && mouse.y !== null) {
          ctx.beginPath();
          for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            const dx = p.x - mouse.x;
            const dy = p.y - mouse.y;
            const distSq = dx * dx + dy * dy;

            if (distSq < mouse.radius * mouse.radius) {
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(mouse.x, mouse.y);
            }
          }
          ctx.strokeStyle = lineColor.replace(/[\d.]+\)$/, `0.12)`);
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("visibilitychange", handleVisibility);
      cancelAnimationFrame(animationFrameId);
    };
  }, [type, lineColor]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[0] w-full h-full mix-blend-screen"
    />
  );
}
