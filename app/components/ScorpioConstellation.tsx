"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  twinkleSpeed: number;
  depth: number; // For parallax
}

interface ScorpioStar {
  name: string;
  scientificName: string;
  rx: number; // relative x from center
  ry: number; // relative y from center
  size: number;
  color: string;
  glowColor: string;
  isHeart?: boolean;
  info?: string;
}

export default function ScorpioConstellation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let stars: Star[] = [];
    const mouse = { x: null as number | null, y: null as number | null, active: false };
    const targetMouseOffset = { x: 0, y: 0 };
    const currentMouseOffset = { x: 0, y: 0 };

    // Stars forming the Scorpio shape
    const scorpioStars: ScorpioStar[] = [
      { name: "Acrab", scientificName: "Beta1 Scorpii", rx: -100, ry: -190, size: 4.5, color: "#e0f2fe", glowColor: "rgba(56, 189, 248, 0.4)", info: "Double star in claw" },
      { name: "Dschubba", scientificName: "Delta Scorpii", rx: -60, ry: -150, size: 5.0, color: "#f0f9ff", glowColor: "rgba(14, 165, 233, 0.5)", info: "Head of the Scorpion" },
      { name: "Fang", scientificName: "Pi Scorpii", rx: -90, ry: -110, size: 3.8, color: "#bae6fd", glowColor: "rgba(56, 189, 248, 0.3)", info: "Binary star system" },
      { name: "Alniyat North", scientificName: "Sigma Scorpii", rx: -30, ry: -80, size: 4.0, color: "#e0f2fe", glowColor: "rgba(99, 102, 241, 0.4)", info: "The Outpost of the Heart" },
      { name: "Antares", scientificName: "Alpha Scorpii", rx: 10, ry: -30, size: 7.5, color: "#f59e0b", glowColor: "rgba(239, 68, 68, 0.65)", isHeart: true, info: "Red Supergiant, Heart of Scorpio" },
      { name: "Alniyat South", scientificName: "Tau Scorpii", rx: 40, ry: 30, size: 4.0, color: "#e0f2fe", glowColor: "rgba(99, 102, 241, 0.4)", info: "Hot main-sequence star" },
      { name: "Larawag", scientificName: "Epsilon Scorpii", rx: 70, ry: 100, size: 4.8, color: "#f0f9ff", glowColor: "rgba(14, 165, 233, 0.4)", info: "Orange giant star" },
      { name: "Mu1 Scorpii", scientificName: "Mu1 Scorpii", rx: 85, ry: 160, size: 3.5, color: "#bae6fd", glowColor: "rgba(56, 189, 248, 0.3)", info: "Eclipsing binary star" },
      { name: "Zeta2 Scorpii", scientificName: "Zeta2 Scorpii", rx: 70, ry: 220, size: 3.8, color: "#e0f2fe", glowColor: "rgba(56, 189, 248, 0.35)", info: "Orange K-type star" },
      { name: "Eta Scorpii", rx: 30, ry: 270, scientificName: "Eta Scorpii", size: 4.2, color: "#f0f9ff", glowColor: "rgba(14, 165, 233, 0.4)", info: "Yellow-white subgiant" },
      { name: "Sargas", scientificName: "Theta Scorpii", rx: -30, ry: 290, size: 5.2, color: "#fef08a", glowColor: "rgba(234, 179, 8, 0.45)", info: "Bright giant, 270 ly away" },
      { name: "Girtab", scientificName: "Kappa Scorpii", rx: -90, ry: 270, size: 4.5, color: "#bae6fd", glowColor: "rgba(56, 189, 248, 0.4)", info: "Spectroscopic binary" },
      { name: "Shaula", scientificName: "Lambda Scorpii", rx: -125, ry: 210, size: 6.0, color: "#22d3ee", glowColor: "rgba(6, 182, 212, 0.6)", info: "Stinger, 2nd brightest in Scorpio" },
      { name: "Lesath", scientificName: "Upsilon Scorpii", rx: -95, ry: 175, size: 4.2, color: "#e0f2fe", glowColor: "rgba(14, 165, 233, 0.45)", info: "The Cat's Eye Star" }
    ];

    // Constellation lines mapping indices of scorpioStars
    const scorpioLines = [
      [0, 1], // Acrab -> Dschubba
      [1, 2], // Dschubba -> Fang
      [1, 3], // Dschubba -> Alniyat North
      [3, 4], // Alniyat North -> Antares
      [4, 5], // Antares -> Alniyat South
      [5, 6], // Alniyat South -> Larawag
      [6, 7], // Larawag -> Mu1
      [7, 8], // Mu1 -> Zeta2
      [8, 9], // Zeta2 -> Eta
      [9, 10], // Eta -> Sargas
      [10, 11], // Sargas -> Girtab
      [11, 12], // Girtab -> Shaula
      [12, 13], // Shaula -> Lesath
      [13, 10]  // Lesath -> Sargas (forms the sting loop)
    ];

    const initBackgroundStars = (width: number, height: number) => {
      stars = [];
      const isMobile = width < 768;
      const starCount = isMobile ? 60 : 150;

      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 1.2 + 0.3,
          alpha: Math.random() * 0.6 + 0.2,
          twinkleSpeed: (Math.random() * 0.008 + 0.002) * (Math.random() < 0.5 ? 1 : -1),
          depth: Math.random() * 0.4 + 0.1, // Parallax depth layer
        });
      }
    };

    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      initBackgroundStars(width, height);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;

      // Parallax target offsets based on cursor distance from center
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      targetMouseOffset.x = (e.clientX - centerX) * 0.07;
      targetMouseOffset.y = (e.clientY - centerY) * 0.07;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
      mouse.active = false;
      targetMouseOffset.x = 0;
      targetMouseOffset.y = 0;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    const draw = (time: number) => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      // Smooth interpolation for mouse offset (lag effect for premium feel)
      currentMouseOffset.x += (targetMouseOffset.x - currentMouseOffset.x) * 0.05;
      currentMouseOffset.y += (targetMouseOffset.y - currentMouseOffset.y) * 0.05;

      // 1. Draw Twinkling Background Stars
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];

        // Twinkle update
        s.alpha += s.twinkleSpeed;
        if (s.alpha > 0.8 || s.alpha < 0.15) {
          s.twinkleSpeed = -s.twinkleSpeed;
        }

        // Star position with parallax shift
        let sx = s.x - currentMouseOffset.x * s.depth;
        let sy = s.y - currentMouseOffset.y * s.depth;

        // Wrap around edge checks
        if (sx < 0) sx += window.innerWidth;
        if (sx > window.innerWidth) sx -= window.innerWidth;
        if (sy < 0) sy += window.innerHeight;
        if (sy > window.innerHeight) sy -= window.innerHeight;

        // Drawing a small square rect is much faster than arc() circles for background stars
        ctx.fillStyle = `rgba(224, 242, 254, ${s.alpha})`;
        ctx.fillRect(sx - s.radius, sy - s.radius, s.radius * 2, s.radius * 2);
      }

      // 2. Position & Scale Scorpio Constellation
      const isMobile = window.innerWidth < 768;
      
      // Right side on desktop, center on mobile
      const centerX = isMobile ? window.innerWidth * 0.5 : window.innerWidth * 0.72;
      const centerY = isMobile ? window.innerHeight * 0.52 : window.innerHeight * 0.48;
      const scale = isMobile ? 0.75 : 1.05;

      // Constellation position with stronger parallax shift (depth 1.0)
      const constellationOffsetX = currentMouseOffset.x * 0.45;
      const constellationOffsetY = currentMouseOffset.y * 0.45;

      // Map Scorpio stars to screen space
      const screenStars = scorpioStars.map(s => ({
        ...s,
        x: centerX + s.rx * scale - constellationOffsetX,
        y: centerY + s.ry * scale - constellationOffsetY,
        glowRadius: s.size * (s.isHeart ? 3.5 : 2.5) + Math.sin(time * 0.003 + s.rx) * 2,
      }));

      // 3. Draw Connecting Lines (Flat colors instead of dynamic gradients inside loop to prevent memory thrashing)
      const pulseOpacity = 0.12 + Math.sin(time * 0.0015) * 0.04;
      
      for (const line of scorpioLines) {
        const p1 = screenStars[line[0]];
        const p2 = screenStars[line[1]];

        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        
        ctx.strokeStyle = (p1.isHeart || p2.isHeart)
          ? `rgba(239, 68, 68, ${pulseOpacity + 0.08})`
          : `rgba(99, 102, 241, ${pulseOpacity})`;
          
        ctx.lineWidth = 1.0;
        ctx.stroke();
      }

      // 4. Draw Stars & Check Hover Interactions
      let hoveredStarIndex: number | null = null;
      let minDistance = 55; // hover distance trigger

      if (mouse.x !== null && mouse.y !== null) {
        for (let i = 0; i < screenStars.length; i++) {
          const s = screenStars[i];
          const dx = mouse.x - s.x;
          const dy = mouse.y - s.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < minDistance) {
            minDistance = dist;
            hoveredStarIndex = i;
          }
        }
      }

      screenStars.forEach((s, idx) => {
        const isHovered = hoveredStarIndex === idx;

        // Draw radial glow backing
        const radGrad = ctx.createRadialGradient(s.x, s.y, s.size * 0.2, s.x, s.y, s.glowRadius * (isHovered ? 1.8 : 1));
        radGrad.addColorStop(0, s.glowColor);
        radGrad.addColorStop(0.3, s.glowColor);
        radGrad.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.glowRadius * (isHovered ? 1.8 : 1), 0, Math.PI * 2);
        ctx.fillStyle = radGrad;
        ctx.fill();

        // Draw solid center star
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size * (isHovered ? 1.4 : 1), 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.fill();

        // Draw small cross flares on Antares and Shaula (bright stars)
        if (s.isHeart || s.size >= 5.5 || isHovered) {
          ctx.beginPath();
          ctx.strokeStyle = s.color;
          ctx.lineWidth = 0.8;
          
          const flareSize = s.size * (isHovered ? 2.5 : 1.8) + Math.sin(time * 0.005) * 1.5;
          // Horizontal flare
          ctx.moveTo(s.x - flareSize, s.y);
          ctx.lineTo(s.x + flareSize, s.y);
          // Vertical flare
          ctx.moveTo(s.x, s.y - flareSize);
          ctx.lineTo(s.x, s.y + flareSize);
          ctx.stroke();
        }
      });

      // 5. Draw Sci-Fi Space HUD Overlay for hovered star
      if (hoveredStarIndex !== null) {
        const s = screenStars[hoveredStarIndex];
        
        // Draw HUD Target Box/Circle
        ctx.beginPath();
        ctx.arc(s.x, s.y, 16, 0, Math.PI * 2);
        ctx.strokeStyle = s.isHeart ? "rgba(239, 68, 68, 0.45)" : "rgba(34, 211, 238, 0.45)";
        ctx.lineWidth = 1.0;
        ctx.stroke();

        // Dashed ticks inside
        ctx.beginPath();
        ctx.setLineDash([2, 4]);
        ctx.arc(s.x, s.y, 22, 0, Math.PI * 2);
        ctx.strokeStyle = s.isHeart ? "rgba(239, 68, 68, 0.3)" : "rgba(34, 211, 238, 0.3)";
        ctx.stroke();
        ctx.setLineDash([]); // Reset dash

        // Draw pointer leader line
        const textOffsetX = s.rx > 0 ? 32 : -180;
        const textOffsetY = s.ry > 0 ? 32 : -32;
        
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x + (s.rx > 0 ? 20 : -20), s.y + (s.ry > 0 ? 20 : -20));
        ctx.lineTo(s.x + textOffsetX, s.y + (s.ry > 0 ? 20 : -20));
        ctx.strokeStyle = s.isHeart ? "rgba(239, 68, 68, 0.4)" : "rgba(34, 211, 238, 0.4)";
        ctx.lineWidth = 0.8;
        ctx.stroke();

        // Render Star Information HUD Text
        const titleText = `${s.name.toUpperCase()}`;
        const sciText = `${s.scientificName}`;
        const infoText = s.info || "";

        ctx.font = "bold 11px Courier New, monospace";
        ctx.fillStyle = s.isHeart ? "#fca5a5" : "#67e8f9";
        ctx.fillText(titleText, s.x + textOffsetX + (s.rx > 0 ? 5 : -5), s.y + (s.ry > 0 ? 16 : -24));

        ctx.font = "9px Courier New, monospace";
        ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
        ctx.fillText(sciText, s.x + textOffsetX + (s.rx > 0 ? 5 : -5), s.y + (s.ry > 0 ? 28 : -14));
        ctx.fillText(infoText, s.x + textOffsetX + (s.rx > 0 ? 5 : -5), s.y + (s.ry > 0 ? 40 : -4));
        
        // Simple pointer line to mouse
        if (mouse.x !== null && mouse.y !== null) {
          ctx.beginPath();
          ctx.setLineDash([3, 3]);
          ctx.moveTo(s.x, s.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
          ctx.lineWidth = 0.8;
          ctx.stroke();
          ctx.setLineDash([]);
        }
      }
    };

    let start = 0;
    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      draw(timestamp);
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[0] w-full h-full select-none overflow-hidden">
      {/* Dynamic Scorpio Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full mix-blend-screen opacity-75"
      />
      {/* Background ambient star clusters glow (subtle radial lights) */}
      <div className="absolute inset-0 bg-radial-gradient pointer-events-none z-[-1]" />
    </div>
  );
}
