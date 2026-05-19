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

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let stars: Star[] = [];
    let isVisible = true;
    const mouse = { x: null as number | null, y: null as number | null, active: false };
    const targetMouseOffset = { x: 0, y: 0 };
    const currentMouseOffset = { x: 0, y: 0 };

    // ===== REALISTIC SCORPION ANIMAL SHAPE (top-down view) =====
    // ===== SCORPION DEVELOPER CHARACTER SHAPE (top-down view) =====
    const scorpioStars: ScorpioStar[] = [
      // ── LEFT CLAW: MOBILE DEVELOPMENT (Senjata Mobile) ──
      { name: "Mobile Weapon (Outer)", scientificName: "Kotlin Native Drive", rx: -195, ry: -265, size: 3.8, color: "#bae6fd", glowColor: "rgba(56, 189, 248, 0.4)", info: "Membangun aplikasi Android native yang responsif, modern, dan berkinerja tinggi." },
      { name: "Mobile Weapon (Inner)", scientificName: "Android SDK & Jetpack", rx: -140, ry: -255, size: 3.8, color: "#bae6fd", glowColor: "rgba(56, 189, 248, 0.4)", info: "Implementasi komponen UI modern, manajemen memori, dan arsitektur aplikasi mobile yang clean." },
      { name: "Mobile Hinge", scientificName: "API Integration Module", rx: -160, ry: -215, size: 4.2, color: "#7dd3fc", glowColor: "rgba(56, 189, 248, 0.35)", info: "Menghubungkan aplikasi mobile dengan endpoint RESTful API dan sinkronisasi data secara real-time." },
      { name: "L-Arm Connector", scientificName: "Mobile State Management", rx: -125, ry: -170, size: 3.5, color: "#7dd3fc", glowColor: "rgba(56, 189, 248, 0.3)", info: "Mengelola aliran data (data flow) yang asinkronus dan efisien di sisi client mobile." },
      { name: "L-Arm Base", scientificName: "App Release Pipeline", rx: -85, ry: -125, size: 4.0, color: "#f0f9ff", glowColor: "rgba(14, 165, 233, 0.45)", info: "Manajemen rilis aplikasi, pembuatan build APK/Bundle, dan distribusi source code." },

      // ── RIGHT CLAW: WEB DEVELOPMENT (Senjata Web Full-Stack) ──
      { name: "Web Weapon (Outer)", scientificName: "PHP & Laravel Framework", rx: 195, ry: -265, size: 3.8, color: "#bae6fd", glowColor: "rgba(56, 189, 248, 0.4)", info: "Arsitektur backend yang kokoh, pembuatan RESTful API, dan sistem autentikasi yang aman." },
      { name: "Web Weapon (Inner)", scientificName: "React & Next.js Engine", rx: 140, ry: -255, size: 3.8, color: "#bae6fd", glowColor: "rgba(56, 189, 248, 0.4)", info: "Pembuatan antarmuka web interaktif, berkinerja tinggi, dan ramah terhadap optimasi SEO." },
      { name: "Web Hinge", scientificName: "Database Layer (MySQL)", rx: 160, ry: -215, size: 4.2, color: "#7dd3fc", glowColor: "rgba(56, 189, 248, 0.35)", info: "Perancangan skema database relasional, optimasi query, dan manajemen integritas data." },
      { name: "R-Arm Connector", scientificName: "Full-Stack Integration", rx: 125, ry: -170, size: 3.5, color: "#7dd3fc", glowColor: "rgba(56, 189, 248, 0.3)", info: "Menjembatani logika database backend dengan tampilan frontend secara dinamis dan seamless." },
      { name: "R-Arm Base", scientificName: "Web Deployment Module", rx: 85, ry: -125, size: 4.0, color: "#f0f9ff", glowColor: "rgba(14, 165, 233, 0.45)", info: "Proses deployment aplikasi web ke server produksi, manajemen hosting, dan konfigurasi domain." },

      // ── BODY: THE CORE RUNTIME (Pusat Kendali Sistem) ──
      { name: "Main Sensor", scientificName: "Management Informatics", rx: 0, ry: -95, size: 5.2, color: "#f0f9ff", glowColor: "rgba(14, 165, 233, 0.5)", info: "Menghubungkan kebutuhan manajemen bisnis atau instansi dengan solusi teknis pemrograman." },
      { name: "Core Processor", scientificName: "Systems Architect", rx: 0, ry: -35, size: 4.8, color: "#e0f2fe", glowColor: "rgba(99, 102, 241, 0.4)", info: "Merancang alur logika program yang bersih (clean code), efisien, dan terstruktur." },
      { name: "Deyafa Arsetya", scientificName: "Alpha Core (Full-Stack Developer)", rx: 0, ry: 30, size: 7.5, color: "#f59e0b", glowColor: "rgba(239, 68, 68, 0.65)", isHeart: true, info: "Pusat pengendali seluruh sistem portofolio. Fokus pada pengembangan Web & Mobile." },
      { name: "Analytics Module", scientificName: "Python 3 & Data Processing", rx: 0, ry: 95, size: 4.5, color: "#e0f2fe", glowColor: "rgba(99, 102, 241, 0.4)", info: "Sub-prosesor untuk mengolah data, analisis logika matematika, dan visualisasi informasi terstruktur." },

      // ── LEFT LEGS: STABILIZERS (Fondasi Pemrograman Dasar) ──
      { name: "Stabilizer L1", scientificName: "JavaScript / TypeScript", rx: -115, ry: -75, size: 2.5, color: "#93c5fd", glowColor: "rgba(56, 189, 248, 0.22)", info: "Logika dasar penggerak interaktivitas web modern dan validasi data di sisi klien." },
      { name: "Stabilizer L2", scientificName: "HTML5 & CSS3 Structure", rx: -130, ry: -20, size: 2.5, color: "#93c5fd", glowColor: "rgba(56, 189, 248, 0.22)", info: "Fondasi struktural halaman web dan implementasi desain visual yang responsif." },
      { name: "Stabilizer L3", scientificName: "Version Control (Git)", rx: -130, ry: 50, size: 2.5, color: "#93c5fd", glowColor: "rgba(56, 189, 248, 0.22)", info: "Pelacakan perubahan kode, manajemen branch, dan kolaborasi tim via GitHub." },
      { name: "Stabilizer L4", scientificName: "UI/UX Frameworks", rx: -115, ry: 105, size: 2.5, color: "#93c5fd", glowColor: "rgba(56, 189, 248, 0.22)", info: "Pemanfaatan framework CSS seperti Tailwind untuk mempercepat pembangunan antarmuka." },

      // ── RIGHT LEGS: SUPPORTING ENGINES (Sistem Pendukung) ──
      { name: "Engine R1", scientificName: "SEO Optimization Node", rx: 115, ry: -75, size: 2.5, color: "#93c5fd", glowColor: "rgba(56, 189, 248, 0.22)", info: "Optimasi performa dan metadata agar aplikasi web mudah ditemukan di mesin pencari Google." },
      { name: "Engine R2", scientificName: "Algorithmic Logic", rx: 130, ry: -20, size: 2.5, color: "#93c5fd", glowColor: "rgba(56, 189, 248, 0.22)", info: "Penerapan algoritma yang efisien untuk menyelesaikan masalah komputasi dan struktur data." },
      { name: "Engine R3", scientificName: "Cross-Device Compatibility", rx: 130, ry: 50, size: 2.5, color: "#93c5fd", glowColor: "rgba(56, 189, 248, 0.22)", info: "Memastikan aplikasi web dan mobile berjalan stabil di berbagai ukuran layar dan perangkat." },
      { name: "Engine R4", scientificName: "Package Management", rx: 115, ry: 105, size: 2.5, color: "#93c5fd", glowColor: "rgba(56, 189, 248, 0.22)", info: "Pengelolaan dependensi, pustaka (library), dan modul proyek menggunakan Composer serta NPM." },

      // ── TAIL & STINGER: DEVELOPMENT LIFE CYCLE (Alur Kerja Developer) ──
      { name: "Workflow Node 1", scientificName: "Problem Analysis", rx: 15, ry: 155, size: 4.0, color: "#f0f9ff", glowColor: "rgba(14, 165, 233, 0.4)", info: "Tahap awal menganalisis kebutuhan sistem dan menerjemahkannya ke dalam rencana arsitektur kode." },
      { name: "Workflow Node 2", scientificName: "UI/UX Translation", rx: 50, ry: 205, size: 3.8, color: "#e0f2fe", glowColor: "rgba(56, 189, 248, 0.35)", info: "Mengubah konsep desain visual menjadi komponen kode frontend web atau mobile yang interaktif." },
      { name: "Workflow Node 3", scientificName: "Backend Integration", rx: 100, ry: 245, size: 3.8, color: "#e0f2fe", glowColor: "rgba(56, 189, 248, 0.35)", info: "Membangun API, mengelola database, dan memastikan keamanan data di sisi server." },
      { name: "Workflow Node 4", scientificName: "Testing & QA", rx: 160, ry: 260, size: 4.5, color: "#fef08a", glowColor: "rgba(234, 179, 8, 0.45)", info: "Melakukan pengujian fitur (debugging) untuk memastikan aplikasi bebas dari error sebelum dirilis." },
      { name: "Workflow Node 5", scientificName: "Deployment Ready", rx: 210, ry: 240, size: 4.0, color: "#e0f2fe", glowColor: "rgba(56, 189, 248, 0.4)", info: "Menyiapkan build final aplikasi web maupun mobile untuk diunggah ke server produksi atau platform distribusi." },
      { name: "Workflow Node 6", scientificName: "Scalability Planning", rx: 240, ry: 195, size: 4.0, color: "#e0f2fe", glowColor: "rgba(14, 165, 233, 0.4)", info: "Memastikan kode program ditulis dengan standar yang rapi agar mudah dirawat dan dikembangkan ke depan." },
      { name: "Pre-Sting Valve", scientificName: "Performance Optimization", rx: 248, ry: 140, size: 4.2, color: "#e0f2fe", glowColor: "rgba(14, 165, 233, 0.45)", info: "Optimasi kecepatan load halaman web dan efisiensi penggunaan memori pada aplikasi mobile." },

      // ── THE STINGER: ULTIMATE IMPACT (Dampak Akhir) ──
      { name: "Shaula (THE STINGER)", scientificName: "Production-Ready Standard", rx: 235, ry: 85, size: 6.5, color: "#22d3ee", glowColor: "rgba(6, 182, 212, 0.65)", info: "Sengatan Utama: Menghasilkan produk digital berupa aplikasi Web & Mobile yang siap pakai, stabil, dan solutif!" },
    ];

    const scorpioLines = [
      [0, 2], [1, 2], [2, 3], [3, 4], [4, 10],
      [5, 7], [6, 7], [7, 8], [8, 9], [9, 10],
      [10, 11], [11, 12], [12, 13],
      [10, 14], [11, 15], [12, 16], [13, 17],
      [10, 18], [11, 19], [12, 20], [13, 21],
      [13, 22], [22, 23], [23, 24], [24, 25], [25, 26], [26, 27], [27, 28], [28, 29],
    ];

    const initBackgroundStars = (width: number, height: number) => {
      stars = [];
      const isMobile = width < 768;
      const starCount = isMobile ? 40 : 100; // Reduced from 60/150

      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 1.0 + 0.3,
          alpha: Math.random() * 0.5 + 0.2,
          twinkleSpeed: (Math.random() * 0.006 + 0.002) * (Math.random() < 0.5 ? 1 : -1),
          depth: Math.random() * 0.3 + 0.1,
        });
      }
    };

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2); // Cap DPR
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      initBackgroundStars(width, height);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Throttled mouse handler
    let mouseThrottleTimer: ReturnType<typeof setTimeout> | null = null;
    const handleMouseMove = (e: MouseEvent) => {
      if (mouseThrottleTimer) return;
      mouseThrottleTimer = setTimeout(() => { mouseThrottleTimer = null; }, 32);

      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;

      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      targetMouseOffset.x = (e.clientX - centerX) * 0.06;
      targetMouseOffset.y = (e.clientY - centerY) * 0.06;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
      mouse.active = false;
      targetMouseOffset.x = 0;
      targetMouseOffset.y = 0;
    };

    const handleVisibility = () => {
      isVisible = !document.hidden;
      if (isVisible) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("visibilitychange", handleVisibility);

    const draw = (time: number) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      // Smooth parallax offset
      currentMouseOffset.x += (targetMouseOffset.x - currentMouseOffset.x) * 0.04;
      currentMouseOffset.y += (targetMouseOffset.y - currentMouseOffset.y) * 0.04;

      // 1. Background Stars — draw as simple rects (faster)
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        s.alpha += s.twinkleSpeed;
        if (s.alpha > 0.7 || s.alpha < 0.15) s.twinkleSpeed = -s.twinkleSpeed;

        let sx = s.x - currentMouseOffset.x * s.depth;
        let sy = s.y - currentMouseOffset.y * s.depth;
        if (sx < 0) sx += w; if (sx > w) sx -= w;
        if (sy < 0) sy += h; if (sy > h) sy -= h;

        ctx.fillStyle = `rgba(224, 242, 254, ${s.alpha})`;
        ctx.fillRect(sx - s.radius, sy - s.radius, s.radius * 2, s.radius * 2);
      }

      // 2. Scorpio Constellation — WALKING ANIMATION
      const isMobile = w < 768;
      const baseX = isMobile ? w * 0.5 : w * 0.68;
      const baseY = isMobile ? h * 0.5 : h * 0.48;
      const scale = isMobile ? 0.55 : 0.85;
      const constellationOffsetX = currentMouseOffset.x * 0.4;
      const constellationOffsetY = currentMouseOffset.y * 0.4;

      // ── Walking Path (Lissajous wandering) ──
      // Compound sine waves create organic, non-repeating wandering
      const walkSpeed = 0.00015;
      const walkX = Math.sin(time * walkSpeed) * 50
        + Math.sin(time * walkSpeed * 1.7 + 1.2) * 25
        + Math.sin(time * walkSpeed * 0.3) * 15;
      const walkY = Math.cos(time * walkSpeed * 0.8) * 35
        + Math.cos(time * walkSpeed * 1.3 + 0.7) * 18;

      // ── Walking Gait Cycle ──
      const gaitSpeed = 0.0025; // Controls how fast the legs move
      const gaitPhase = time * gaitSpeed;
      const bodyBob = Math.sin(gaitPhase * 2) * 2; // Body bounces at 2x leg frequency

      // Pre-compute per-star animation offsets
      const animX: number[] = new Array(scorpioStars.length).fill(0);
      const animY: number[] = new Array(scorpioStars.length).fill(0);

      // Claws: subtle breathing / opening-closing
      for (let i = 0; i <= 4; i++) { // Left claw
        const clawPhase = Math.sin(gaitPhase * 0.4 + i * 0.2);
        animX[i] = clawPhase * -4; // Opens outward (left = negative X)
        animY[i] = Math.sin(gaitPhase * 0.6) * 2;
      }
      for (let i = 5; i <= 9; i++) { // Right claw
        const clawPhase = Math.sin(gaitPhase * 0.4 + (i - 5) * 0.2);
        animX[i] = clawPhase * 4; // Opens outward (right = positive X)
        animY[i] = Math.sin(gaitPhase * 0.6) * 2;
      }

      // Body: vertical bobbing
      for (let i = 10; i <= 13; i++) {
        animY[i] = bodyBob;
      }

      // Left Legs (14-17): alternating pairs
      // L1, L3 move together; L2, L4 move together (opposite phase)
      const legStride = 10; // How far legs swing forward/back
      const legLift = 5;    // How much legs lift up
      animX[14] = Math.sin(gaitPhase) * legStride;
      animY[14] = -Math.abs(Math.sin(gaitPhase)) * legLift;
      animX[15] = Math.sin(gaitPhase + Math.PI) * legStride;
      animY[15] = -Math.abs(Math.sin(gaitPhase + Math.PI)) * legLift;
      animX[16] = Math.sin(gaitPhase) * legStride;
      animY[16] = -Math.abs(Math.sin(gaitPhase)) * legLift;
      animX[17] = Math.sin(gaitPhase + Math.PI) * legStride;
      animY[17] = -Math.abs(Math.sin(gaitPhase + Math.PI)) * legLift;

      // Right Legs (18-21): opposite phase to left legs (real walking gait)
      animX[18] = Math.sin(gaitPhase + Math.PI) * legStride;
      animY[18] = -Math.abs(Math.sin(gaitPhase + Math.PI)) * legLift;
      animX[19] = Math.sin(gaitPhase) * legStride;
      animY[19] = -Math.abs(Math.sin(gaitPhase)) * legLift;
      animX[20] = Math.sin(gaitPhase + Math.PI) * legStride;
      animY[20] = -Math.abs(Math.sin(gaitPhase + Math.PI)) * legLift;
      animX[21] = Math.sin(gaitPhase) * legStride;
      animY[21] = -Math.abs(Math.sin(gaitPhase)) * legLift;

      // Tail (22-29): cascading wave sway — wave propagates with increasing amplitude
      for (let i = 22; i <= 29; i++) {
        const tailIdx = i - 22; // 0 to 7
        const tailPhase = gaitPhase * 0.6 - tailIdx * 0.35; // Wave propagates along tail
        const tailAmplitude = 2 + tailIdx * 2.5; // Increases toward stinger
        animX[i] = Math.sin(tailPhase) * tailAmplitude;
        animY[i] = Math.cos(tailPhase * 0.5) * (tailIdx * 0.8); // Slight vertical undulation
      }

      // Pre-compute final screen positions (base + walk + animation + parallax)
      const screenX: number[] = [];
      const screenY: number[] = [];
      const screenGlow: number[] = [];
      const sinTime = Math.sin(time * 0.003);

      for (let i = 0; i < scorpioStars.length; i++) {
        const s = scorpioStars[i];
        screenX[i] = baseX + (s.rx + animX[i]) * scale + walkX - constellationOffsetX;
        screenY[i] = baseY + (s.ry + animY[i]) * scale + walkY - constellationOffsetY;
        screenGlow[i] = s.size * (s.isHeart ? 3.0 : 2.0) + sinTime * 1.5;
      }

      // 3. Draw lines — batched into single path
      const pulseOpacity = 0.12 + Math.sin(time * 0.0015) * 0.04;

      // Regular lines
      ctx.beginPath();
      ctx.lineWidth = 0.8;
      for (const line of scorpioLines) {
        const i0 = line[0], i1 = line[1];
        if (scorpioStars[i0].isHeart || scorpioStars[i1].isHeart) continue;
        ctx.moveTo(screenX[i0], screenY[i0]);
        ctx.lineTo(screenX[i1], screenY[i1]);
      }
      ctx.strokeStyle = `rgba(99, 102, 241, ${pulseOpacity})`;
      ctx.stroke();

      // Heart-connected lines
      ctx.beginPath();
      for (const line of scorpioLines) {
        const i0 = line[0], i1 = line[1];
        if (!scorpioStars[i0].isHeart && !scorpioStars[i1].isHeart) continue;
        ctx.moveTo(screenX[i0], screenY[i0]);
        ctx.lineTo(screenX[i1], screenY[i1]);
      }
      ctx.strokeStyle = `rgba(239, 68, 68, ${pulseOpacity + 0.08})`;
      ctx.stroke();

      // 4. Draw Stars — simplified (no radial gradients for non-hovered)
      let hoveredStarIndex: number | null = null;
      let minDistance = 55;

      if (mouse.x !== null && mouse.y !== null) {
        for (let i = 0; i < scorpioStars.length; i++) {
          const dx = mouse.x - screenX[i];
          const dy = mouse.y - screenY[i];
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < minDistance) {
            minDistance = dist;
            hoveredStarIndex = i;
          }
        }
      }

      for (let i = 0; i < scorpioStars.length; i++) {
        const s = scorpioStars[i];
        const sx = screenX[i];
        const sy = screenY[i];
        const isHovered = hoveredStarIndex === i;
        const glowR = screenGlow[i] * (isHovered ? 1.6 : 1);

        // Simple glow — only for bright stars or hovered ones (perf optimization)
        if (s.isHeart || s.size >= 5.0 || isHovered) {
          const radGrad = ctx.createRadialGradient(sx, sy, s.size * 0.2, sx, sy, glowR);
          radGrad.addColorStop(0, s.glowColor);
          radGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
          ctx.beginPath();
          ctx.arc(sx, sy, glowR, 0, Math.PI * 2);
          ctx.fillStyle = radGrad;
          ctx.fill();
        }

        // Star core — use rect for small stars, arc for large
        if (s.size < 4) {
          const r = s.size * (isHovered ? 1.3 : 1);
          ctx.fillStyle = s.color;
          ctx.fillRect(sx - r, sy - r, r * 2, r * 2);
        } else {
          ctx.beginPath();
          ctx.arc(sx, sy, s.size * (isHovered ? 1.3 : 1), 0, Math.PI * 2);
          ctx.fillStyle = s.color;
          ctx.fill();
        }

        // Cross flares on major stars
        if (s.isHeart || s.size >= 5.5) {
          const flareSize = s.size * 1.6 + Math.sin(time * 0.004) * 1.2;
          ctx.beginPath();
          ctx.strokeStyle = s.color;
          ctx.lineWidth = 0.7;
          ctx.moveTo(sx - flareSize, sy);
          ctx.lineTo(sx + flareSize, sy);
          ctx.moveTo(sx, sy - flareSize);
          ctx.lineTo(sx, sy + flareSize);
          ctx.stroke();
        }
      }

      // 5. HUD for hovered star (only when actually hovering)
      if (hoveredStarIndex !== null) {
        const s = scorpioStars[hoveredStarIndex];
        const sx = screenX[hoveredStarIndex];
        const sy = screenY[hoveredStarIndex];

        // Target circle
        ctx.beginPath();
        ctx.arc(sx, sy, 16, 0, Math.PI * 2);
        ctx.strokeStyle = s.isHeart ? "rgba(239, 68, 68, 0.45)" : "rgba(34, 211, 238, 0.45)";
        ctx.lineWidth = 1.0;
        ctx.stroke();

        // Dashed outer
        ctx.beginPath();
        ctx.setLineDash([2, 4]);
        ctx.arc(sx, sy, 22, 0, Math.PI * 2);
        ctx.strokeStyle = s.isHeart ? "rgba(239, 68, 68, 0.3)" : "rgba(34, 211, 238, 0.3)";
        ctx.stroke();
        ctx.setLineDash([]);

        // Leader line
        const textOffsetX = s.rx > 0 ? 32 : -180;
        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.lineTo(sx + (s.rx > 0 ? 20 : -20), sy + (s.ry > 0 ? 20 : -20));
        ctx.lineTo(sx + textOffsetX, sy + (s.ry > 0 ? 20 : -20));
        ctx.strokeStyle = s.isHeart ? "rgba(239, 68, 68, 0.4)" : "rgba(34, 211, 238, 0.4)";
        ctx.lineWidth = 0.8;
        ctx.stroke();

        // HUD Text
        ctx.font = "bold 11px Courier New, monospace";
        ctx.fillStyle = s.isHeart ? "#fca5a5" : "#67e8f9";
        ctx.fillText(s.name.toUpperCase(), sx + textOffsetX + (s.rx > 0 ? 5 : -5), sy + (s.ry > 0 ? 16 : -24));

        ctx.font = "9px Courier New, monospace";
        ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
        ctx.fillText(s.scientificName, sx + textOffsetX + (s.rx > 0 ? 5 : -5), sy + (s.ry > 0 ? 28 : -14));
        if (s.info) {
          ctx.fillText(s.info, sx + textOffsetX + (s.rx > 0 ? 5 : -5), sy + (s.ry > 0 ? 40 : -4));
        }
      }
    };

    const animate = (timestamp: number) => {
      if (!isVisible) return;
      draw(timestamp);
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("visibilitychange", handleVisibility);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[0] w-full h-full select-none overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-full mix-blend-screen opacity-75"
      />
    </div>
  );
}
