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

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const mouse = { x: null as number | null, y: null as number | null, radius: 160 };

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      baseRadius: number;
      color: string;
      glowIntensity: number;
    }

    const init = () => {
      const isMobile = window.innerWidth < 768;
      const count = isMobile ? 30 : 90;
      particles = [];

      // Color scheme matching the purple-blue gradient theme
      const colors = [
        "rgba(139, 92, 246, 0.4)", // Purple/Violet
        "rgba(99, 102, 241, 0.4)",  // Indigo
        "rgba(6, 182, 212, 0.4)",   // Cyan
        "rgba(236, 72, 153, 0.35)", // Pink
      ];

      for (let i = 0; i < count; i++) {
        const radius = Math.random() * 2 + 0.8;
        particles.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          radius: radius,
          baseRadius: radius,
          color: colors[Math.floor(Math.random() * colors.length)],
          glowIntensity: Math.random() * 0.5 + 0.5,
        });
      }
    };

    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      init();
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    const draw = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Particle movement
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around boundaries
        if (p.x < 0) p.x = window.innerWidth;
        if (p.x > window.innerWidth) p.x = 0;
        if (p.y < 0) p.y = window.innerHeight;
        if (p.y > window.innerHeight) p.y = 0;

        // Mouse interactions
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius) {
            // Calculate push force (inverse of distance)
            const force = (mouse.radius - dist) / mouse.radius;
            // Gently nudge particle away from mouse
            p.x -= (dx / dist) * force * 1.5;
            p.y -= (dy / dist) * force * 1.5;

            // Grow particle slightly on hover
            p.radius += (p.baseRadius * (1.5 + force) - p.radius) * 0.1;
          } else {
            // Return to original size
            p.radius += (p.baseRadius - p.radius) * 0.1;
          }
        } else {
          // Return to original size
          p.radius += (p.baseRadius - p.radius) * 0.1;
        }

        // Draw particle node
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        
        if (type === "dust") {
          ctx.shadowBlur = 10;
          ctx.shadowColor = p.color;
        }
        
        ctx.fill();
        ctx.shadowBlur = 0; // Reset shadow for lines

        // Draw connecting lines between close particles
        if (type === "constellation") {
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 110) {
              const alpha = ((110 - dist) / 110) * 0.12;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = lineColor.replace(/[\d.]+\)$/, `${alpha})`);
              ctx.lineWidth = 0.6;
              ctx.stroke();
            }
          }

          // Draw connection lines to mouse cursor
          if (mouse.x !== null && mouse.y !== null) {
            const dx = p.x - mouse.x;
            const dy = p.y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < mouse.radius) {
              const alpha = ((mouse.radius - dist) / mouse.radius) * 0.22;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(mouse.x, mouse.y);
              ctx.strokeStyle = lineColor.replace(/[\d.]+\)$/, `${alpha})`);
              ctx.lineWidth = 0.8;
              ctx.stroke();
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
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
