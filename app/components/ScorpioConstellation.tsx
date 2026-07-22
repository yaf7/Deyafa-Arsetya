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
  astronomicalName?: string;
}

interface ScorpioParticle {
  nodeA: number;
  nodeB: number;
  t: number;      // interpolation along the line (0 to 1)
  offsetX: number; // perpendicular offset
  offsetY: number; // parallel offset
  size: number;
  alpha: number;
  twinkleSpeed: number;
  color: string;
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
    let scorpioParticles: ScorpioParticle[] = [];
    let isVisible = true;
    const mouse = { x: null as number | null, y: null as number | null, active: false };
    const targetMouseOffset = { x: 0, y: 0 };
    const currentMouseOffset = { x: 0, y: 0 };

    // Persistent state for smooth turning and walking physics
    let currentRotation = null as number | null;
    let gaitPhase = 0;
    let lastTime = 0;

    // Threat state
    let isThreatened = false;
    let threatWeight = 0;

    // State machine for lifelike scorpion behavior
    let scorpionX = 0;
    let scorpionY = 0;
    let targetWanderX = 0;
    let targetWanderY = 0;
    let behaviorState: "IDLE" | "WALKING" = "IDLE";
    let stateTime = 0;
    let stateDuration = 2000;
    let walkingWeight = 0;
    let prevWalkX = 0;
    let prevWalkY = 0;

    // Sting animation state
    let stingTime = 0;
    let stingActive = false;
    let lastStingTime = 0;
    const stingDuration = 900; // 900ms sting duration

    const legStates = [
      // Left Legs (L1, L2, L3, L4) — All clustered at prosoma
      { baseNode: 13, kneeNode: 17, footNode: 18, side: -1, phaseOffset: 0, rx: -125, ry: -75, krx: -70, kry: -85, planted: false, worldX: 0, worldY: 0, plantX: 0, plantY: 0, startX: 0, startY: 0 },
      { baseNode: 13, kneeNode: 19, footNode: 20, side: -1, phaseOffset: Math.PI * 0.5, rx: -140, ry: -30, krx: -80, kry: -45, planted: false, worldX: 0, worldY: 0, plantX: 0, plantY: 0, startX: 0, startY: 0 },
      { baseNode: 14, kneeNode: 21, footNode: 22, side: -1, phaseOffset: Math.PI, rx: -140, ry: 15, krx: -80, kry: -5, planted: false, worldX: 0, worldY: 0, plantX: 0, plantY: 0, startX: 0, startY: 0 },
      { baseNode: 14, kneeNode: 23, footNode: 24, side: -1, phaseOffset: Math.PI * 1.5, rx: -125, ry: 55, krx: -70, kry: 30, planted: false, worldX: 0, worldY: 0, plantX: 0, plantY: 0, startX: 0, startY: 0 },
      // Right Legs (R1, R2, R3, R4) — All clustered at prosoma
      { baseNode: 13, kneeNode: 25, footNode: 26, side: 1, phaseOffset: Math.PI, rx: 125, ry: -75, krx: 70, kry: -85, planted: false, worldX: 0, worldY: 0, plantX: 0, plantY: 0, startX: 0, startY: 0 },
      { baseNode: 13, kneeNode: 27, footNode: 28, side: 1, phaseOffset: Math.PI * 1.5, rx: 140, ry: -30, krx: 80, kry: -45, planted: false, worldX: 0, worldY: 0, plantX: 0, plantY: 0, startX: 0, startY: 0 },
      { baseNode: 14, kneeNode: 29, footNode: 30, side: 1, phaseOffset: 0, rx: 140, ry: 15, krx: 80, kry: -5, planted: false, worldX: 0, worldY: 0, plantX: 0, plantY: 0, startX: 0, startY: 0 },
      { baseNode: 14, kneeNode: 31, footNode: 32, side: 1, phaseOffset: Math.PI * 0.5, rx: 125, ry: 55, krx: 70, kry: 30, planted: false, worldX: 0, worldY: 0, plantX: 0, plantY: 0, startX: 0, startY: 0 },
    ];

    // ===== REALISTIC SCORPION ANIMAL SHAPE SKELETON =====
    const scorpioStars: ScorpioStar[] = [
      // ── LEFT CLAW (Indices 0 - 5) — Shorter, wider pincer shape ──
      { name: "Mobile Weapon (Outer)", scientificName: "Kotlin Native Drive", astronomicalName: "Dschubba (δ Sco)", rx: -175, ry: -230, size: 5.5, color: "#fbbf24", glowColor: "rgba(245, 158, 11, 0.45)", info: "Membangun aplikasi Android native yang responsif, modern, dan berkinerja tinggi." },
      { name: "Mobile Weapon (Inner)", scientificName: "Android SDK & Jetpack", rx: -120, ry: -225, size: 3.5, color: "#fbbf24", glowColor: "rgba(245, 158, 11, 0.45)", info: "Implementasi komponen UI modern, manajemen memori, dan arsitektur aplikasi mobile yang clean." },
      { name: "Mobile Palm", scientificName: "API Integration Module", rx: -140, ry: -200, size: 3.5, color: "#fbbf24", glowColor: "rgba(245, 158, 11, 0.45)", info: "Menghubungkan aplikasi mobile dengan endpoint RESTful API dan sinkronisasi data secara real-time." },
      { name: "L-Arm Elbow", scientificName: "Mobile State Management", rx: -120, ry: -160, size: 3.5, color: "#fbbf24", glowColor: "rgba(245, 158, 11, 0.3)", info: "Mengelola aliran data (data flow) yang asinkronus dan efisien di sisi client mobile." },
      { name: "L-Arm Femur", scientificName: "App Release Pipeline", rx: -65, ry: -135, size: 3.5, color: "#fbbf24", glowColor: "rgba(245, 158, 11, 0.3)", info: "Manajemen rilis aplikasi, pembuatan build APK/Bundle, dan distribusi source code." },
      { name: "L-Arm Base", scientificName: "Mobile Base Connection", rx: -25, ry: -100, size: 3.0, color: "#fbbf24", glowColor: "rgba(245, 158, 11, 0.2)" },

      // ── RIGHT CLAW (Indices 6 - 11) — Shorter, wider pincer shape ──
      { name: "Web Weapon (Outer)", scientificName: "PHP & Laravel Framework", astronomicalName: "Acrab (β Sco)", rx: 175, ry: -230, size: 5.5, color: "#fbbf24", glowColor: "rgba(245, 158, 11, 0.45)", info: "Arsitektur backend yang kokoh, pembuatan RESTful API, dan sistem autentikasi yang aman." },
      { name: "Web Weapon (Inner)", scientificName: "React & Next.js Engine", rx: 120, ry: -225, size: 3.5, color: "#fbbf24", glowColor: "rgba(245, 158, 11, 0.45)", info: "Pembuatan antarmuka web interaktif, berkinerja tinggi, dan ramah terhadap optimasi SEO." },
      { name: "Web Palm", scientificName: "Database Layer (MySQL)", rx: 140, ry: -200, size: 3.5, color: "#fbbf24", glowColor: "rgba(245, 158, 11, 0.45)", info: "Perancangan skema database relasional, optimasi query, dan manajemen integritas data." },
      { name: "R-Arm Elbow", scientificName: "Full-Stack Integration", rx: 120, ry: -160, size: 3.5, color: "#fbbf24", glowColor: "rgba(245, 158, 11, 0.3)", info: "Menjembatani logika database backend dengan tampilan frontend secara dinamis dan seamless." },
      { name: "R-Arm Femur", scientificName: "Web Deployment Module", rx: 65, ry: -135, size: 3.5, color: "#fbbf24", glowColor: "rgba(245, 158, 11, 0.3)", info: "Proses deployment aplikasi web ke server produksi, manajemen hosting, dan konfigurasi domain." },
      { name: "R-Arm Base", scientificName: "Web Base Connection", rx: 25, ry: -100, size: 3.0, color: "#fbbf24", glowColor: "rgba(245, 158, 11, 0.2)" },

      // ── BODY SPINE (Indices 12 - 16) — Teardrop shape ──
      { name: "Main Sensor", scientificName: "Management Informatics", astronomicalName: "Wei (ε Sco)", rx: 0, ry: -100, size: 6.0, color: "#fbbf24", glowColor: "rgba(245, 158, 11, 0.55)", info: "Menghubungkan kebutuhan manajemen bisnis atau instansi dengan solusi teknis pemrograman." },
      { name: "Carapace Center", scientificName: "Systems Architect", rx: 0, ry: -55, size: 3.5, color: "#fbbf24", glowColor: "rgba(245, 158, 11, 0.45)", info: "Merancang alur logika program yang bersih (clean code), efisien, dan terstruktur." },
      { name: "Deyafa Arsetya", scientificName: "Alpha Core (Web & Mobile Developer | System Analyst | Data Analyst)", astronomicalName: "Antares (α Sco)", rx: 0, ry: -5, size: 10.0, color: "#f97316", glowColor: "rgba(249, 115, 22, 0.8)", isHeart: true, info: "Pusat pengendali seluruh sistem portofolio. Fokus pada pengembangan Web & Mobile, Analisis Sistem, dan Data." },
      { name: "Analytics Module", scientificName: "Python 3 & Data Processing", rx: 0, ry: 50, size: 3.5, color: "#fbbf24", glowColor: "rgba(245, 158, 11, 0.45)", info: "Sub-prosesor untuk mengolah data, analisis logika matematika, dan visualisasi informasi terstruktur." },
      { name: "Tail Connection", scientificName: "Core Base", rx: 0, ry: 100, size: 3.5, color: "#fbbf24", glowColor: "rgba(245, 158, 11, 0.4)", info: "Pangkal penghubung antara tubuh utama dengan sistem ekor kalajengking." },

      // ── LEFT LEGS (Indices 17 - 24) — All clustered at prosoma ──
      { name: "Knee L1", scientificName: "JS/TS Knee Joint", rx: -70, ry: -85, size: 0, color: "transparent", glowColor: "transparent" },
      { name: "Stabilizer L1", scientificName: "JavaScript / TypeScript", rx: -125, ry: -75, size: 0, color: "transparent", glowColor: "transparent" },
      { name: "Knee L2", scientificName: "HTML/CSS Knee Joint", rx: -80, ry: -45, size: 0, color: "transparent", glowColor: "transparent" },
      { name: "Stabilizer L2", scientificName: "HTML5 & CSS3 Structure", rx: -140, ry: -30, size: 0, color: "transparent", glowColor: "transparent" },
      { name: "Knee L3", scientificName: "Git Knee Joint", rx: -80, ry: -5, size: 0, color: "transparent", glowColor: "transparent" },
      { name: "Stabilizer L3", scientificName: "Version Control (Git)", rx: -140, ry: 15, size: 0, color: "transparent", glowColor: "transparent" },
      { name: "Knee L4", scientificName: "UI/UX Knee Joint", rx: -70, ry: 30, size: 0, color: "transparent", glowColor: "transparent" },
      { name: "Stabilizer L4", scientificName: "UI/UX Frameworks", rx: -125, ry: 55, size: 0, color: "transparent", glowColor: "transparent" },

      // ── RIGHT LEGS (Indices 25 - 32) — All clustered at prosoma ──
      { name: "Knee R1", scientificName: "SEO Knee Joint", rx: 70, ry: -85, size: 0, color: "transparent", glowColor: "transparent" },
      { name: "Engine R1", scientificName: "SEO Optimization Node", rx: 125, ry: -75, size: 0, color: "transparent", glowColor: "transparent" },
      { name: "Knee R2", scientificName: "Algo Knee Joint", rx: 80, ry: -45, size: 0, color: "transparent", glowColor: "transparent" },
      { name: "Engine R2", scientificName: "Algorithmic Logic", rx: 140, ry: -30, size: 0, color: "transparent", glowColor: "transparent" },
      { name: "Knee R3", scientificName: "Compat Knee Joint", rx: 80, ry: -5, size: 0, color: "transparent", glowColor: "transparent" },
      { name: "Engine R3", scientificName: "Cross-Device Compatibility", rx: 140, ry: 15, size: 0, color: "transparent", glowColor: "transparent" },
      { name: "Knee R4", scientificName: "PM Knee Joint", rx: 70, ry: 30, size: 0, color: "transparent", glowColor: "transparent" },
      { name: "Engine R4", scientificName: "Package Management", rx: 125, ry: 55, size: 0, color: "transparent", glowColor: "transparent" },

      // ── TAIL & STINGER (Indices 33 - 40) — More vertical J-curve ──
      { name: "Workflow Node 1", scientificName: "Problem Analysis", astronomicalName: "Lesath (υ Sco)", rx: 10, ry: 145, size: 5.0, color: "#fbbf24", glowColor: "rgba(245, 158, 11, 0.45)", info: "Tahap awal menganalisis kebutuhan sistem dan menerjemahkannya ke dalam rencana arsitektur kode." },
      { name: "Workflow Node 2", scientificName: "UI/UX Translation", rx: 30, ry: 195, size: 3.5, color: "#fbbf24", glowColor: "rgba(245, 158, 11, 0.45)", info: "Mengubah konsep desain visual menjadi komponen kode frontend web atau mobile yang interaktif." },
      { name: "Workflow Node 3", scientificName: "Backend Integration", rx: 65, ry: 240, size: 3.5, color: "#fbbf24", glowColor: "rgba(245, 158, 11, 0.45)", info: "Membangun API, mengelola database, dan memastikan keamanan data di sisi server." },
      { name: "Workflow Node 4", scientificName: "Testing & QA", rx: 115, ry: 265, size: 3.5, color: "#fbbf24", glowColor: "rgba(245, 158, 11, 0.5)", info: "Melakukan pengujian fitur (debugging) untuk memastikan aplikasi bebas dari error sebelum dirilis." },
      { name: "Workflow Node 5", scientificName: "Deployment Ready", rx: 155, ry: 255, size: 3.5, color: "#fbbf24", glowColor: "rgba(245, 158, 11, 0.45)", info: "Menyiapkan build final aplikasi web maupun mobile untuk diunggah ke server produksi atau platform distribusi." },
      { name: "Workflow Node 6", scientificName: "Scalability Planning", rx: 175, ry: 210, size: 3.5, color: "#fbbf24", glowColor: "rgba(245, 158, 11, 0.45)", info: "Memastikan kode program ditulis dengan standar yang rapi agar mudah dirawat dan dikembangkan ke depan." },
      { name: "Pre-Sting Valve", scientificName: "Performance Optimization", rx: 165, ry: 150, size: 3.5, color: "#fbbf24", glowColor: "rgba(245, 158, 11, 0.5)", info: "Optimasi kecepatan load halaman web dan efisiensi penggunaan memori pada aplikasi mobile." },
      { name: "Shaula (THE STINGER)", scientificName: "Production-Ready Standard", astronomicalName: "Shaula (λ Sco)", rx: 130, ry: 105, size: 7.0, color: "#f97316", glowColor: "rgba(249, 115, 22, 0.75)", info: "Sengatan Utama: Menghasilkan produk digital berupa aplikasi Web & Mobile yang siap pakai, stabil, dan solutif!" },
    ];

    const scorpioLines = [
      // Left Pedipalp
      [12, 5], [5, 4], [4, 3], [3, 2], [2, 0], [2, 1],
      // Right Pedipalp
      [12, 11], [11, 10], [10, 9], [9, 8], [8, 6], [8, 7],
      // Body
      [12, 13], [13, 14], [14, 15], [15, 16],
      // Left Legs
      [13, 17], [17, 18],
      [13, 19], [19, 20],
      [14, 21], [21, 22],
      [14, 23], [23, 24],
      // Right Legs
      [13, 25], [25, 26],
      [13, 27], [27, 28],
      [14, 29], [29, 30],
      [14, 31], [31, 32],
      // Tail
      [16, 33], [33, 34], [34, 35], [35, 36], [36, 37], [37, 38], [38, 39], [39, 40]
    ];

    const initBackgroundStars = (width: number, height: number) => {
      stars = [];
      const isMobile = width < 768;
      const starCount = isMobile ? 40 : 100;

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

    const initScorpioParticles = () => {
      scorpioParticles = [];
      const isMobile = window.innerWidth < 768;
      const densityMultiplier = isMobile ? 0.3 : 0.7;
      
      const generateParticlesForSegment = (
        nodeA: number,
        nodeB: number,
        count: number,
        maxOffset: number,
        colorType: 'gold' | 'blue' = 'gold'
      ) => {
        const adjustedCount = Math.max(1, Math.floor(count * densityMultiplier));
        for (let i = 0; i < adjustedCount; i++) {
          const t = Math.random();
          const angle = Math.random() * Math.PI * 2;
          const dist = Math.random() * maxOffset;
          // Perpendicular offset in rotated space
          const offsetX = Math.cos(angle) * dist;
          // Parallel offset along the segment
          const offsetY = Math.sin(angle) * dist * 0.5;

          const size = Math.random() * 0.8 + 0.3; // Tiny star dust particles
          const baseAlpha = Math.random() * 0.6 + 0.3;
          const twinkleSpeed = (Math.random() * 0.008 + 0.004) * (Math.random() < 0.5 ? 1 : -1);

          const color = colorType === 'gold' 
            ? `rgba(253, 224, 71, ` // Yellow gold dust
            : `rgba(186, 230, 253, `; // Cyan/blue dust

          scorpioParticles.push({
            nodeA,
            nodeB,
            t,
            offsetX,
            offsetY,
            size,
            alpha: baseAlpha,
            twinkleSpeed,
            color
          });
        }
      };

      // Left Claw (Fingers, Palm, Arms - widened to match powerful pedipalps)
      generateParticlesForSegment(12, 5, 20, 10, 'gold');
      generateParticlesForSegment(5, 4, 25, 12, 'gold');
      generateParticlesForSegment(4, 3, 30, 15, 'gold');
      generateParticlesForSegment(3, 2, 40, 18, 'gold');
      generateParticlesForSegment(2, 0, 30, 12, 'blue');
      generateParticlesForSegment(2, 1, 30, 12, 'blue');
 
      // Right Claw (Fingers, Palm, Arms)
      generateParticlesForSegment(12, 11, 20, 10, 'gold');
      generateParticlesForSegment(11, 10, 25, 12, 'gold');
      generateParticlesForSegment(10, 9, 30, 15, 'gold');
      generateParticlesForSegment(9, 8, 40, 18, 'gold');
      generateParticlesForSegment(8, 6, 30, 12, 'blue');
      generateParticlesForSegment(8, 7, 30, 12, 'blue');
 
      // Body (Thick oval, dense star cluster - widened to match a real scorpion mesosoma)
      generateParticlesForSegment(12, 13, 130, 36, 'gold');
      generateParticlesForSegment(13, 14, 170, 46, 'gold');
      generateParticlesForSegment(14, 15, 170, 44, 'gold');
      generateParticlesForSegment(15, 16, 130, 32, 'gold');

      // Left Legs (Jointed, thin distinct outlines)
      generateParticlesForSegment(13, 17, 35, 6, 'blue');
      generateParticlesForSegment(17, 18, 45, 5, 'gold');
      generateParticlesForSegment(13, 19, 35, 6, 'blue');
      generateParticlesForSegment(19, 20, 45, 5, 'gold');
      generateParticlesForSegment(14, 21, 35, 6, 'blue');
      generateParticlesForSegment(21, 22, 45, 5, 'gold');
      generateParticlesForSegment(14, 23, 35, 6, 'blue');
      generateParticlesForSegment(23, 24, 45, 5, 'gold');

      // Right Legs (Jointed, thin distinct outlines)
      generateParticlesForSegment(13, 25, 35, 6, 'blue');
      generateParticlesForSegment(25, 26, 45, 5, 'gold');
      generateParticlesForSegment(13, 27, 35, 6, 'blue');
      generateParticlesForSegment(27, 28, 45, 5, 'gold');
      generateParticlesForSegment(14, 29, 35, 6, 'blue');
      generateParticlesForSegment(29, 30, 45, 5, 'gold');
      generateParticlesForSegment(14, 31, 35, 6, 'blue');
      generateParticlesForSegment(31, 32, 45, 5, 'gold');

      // Tail (Segmented tube wrapping the J-Spine)
      generateParticlesForSegment(16, 33, 25, 14, 'gold');
      generateParticlesForSegment(33, 34, 25, 13, 'gold');
      generateParticlesForSegment(34, 35, 25, 12, 'gold');
      generateParticlesForSegment(35, 36, 25, 11, 'gold');
      generateParticlesForSegment(36, 37, 30, 9, 'gold');
      generateParticlesForSegment(37, 38, 30, 8, 'gold');
      generateParticlesForSegment(38, 39, 30, 7, 'gold');
      generateParticlesForSegment(39, 40, 35, 6, 'gold');
    };

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
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
    initScorpioParticles();
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

      // Use native canvas composite for glowing blend instead of CSS mix-blend-screen (huge performance boost)
      ctx.globalCompositeOperation = "lighter";

      // Smooth parallax offset
      currentMouseOffset.x += (targetMouseOffset.x - currentMouseOffset.x) * 0.04;
      currentMouseOffset.y += (targetMouseOffset.y - currentMouseOffset.y) * 0.04;

      // 1. Background Stars
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

      // 2. Scorpio Constellation Layout
      const isMobile = w < 768;
      const baseX = isMobile ? w * 0.5 : w * 0.68;
      const baseY = isMobile ? h * 0.5 : h * 0.48;
      const scale = isMobile ? 0.55 : 0.85;
      const constellationOffsetX = 0; // Disabled parallax movement
      const constellationOffsetY = 0; // Disabled parallax movement

      // Calculate delta time
      if (lastTime === 0) lastTime = time;
      const dt = time - lastTime;
      lastTime = time;

      // Trigger sting occasionally (e.g. random chance after 7 seconds)
      const timeSinceLastSting = time - lastStingTime;
      if (!stingActive && timeSinceLastSting > 7000 && Math.random() < 0.005) {
        stingActive = true;
        stingTime = 0;
        lastStingTime = time;
      }

      if (stingActive) {
        stingTime += dt;
        if (stingTime >= stingDuration) {
          stingActive = false;
          stingTime = 0;
        }
      }

      // State Machine for Lifelike Scorpion Movement
      stateTime += dt;

      // Mouse detection for interactive behavior:
      const cx = baseX + scorpionX - constellationOffsetX;
      const cy = baseY + scorpionY - constellationOffsetY;
      
      let mouseDist = 9999;
      let angleToMouse = 0;
      if (mouse.x !== null && mouse.y !== null) {
        const dxMouse = mouse.x - cx;
        const dyMouse = mouse.y - cy;
        mouseDist = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        angleToMouse = Math.atan2(dyMouse, dxMouse);
      }

      // Threat logic
      isThreatened = mouse.active && mouseDist < 350;
      threatWeight += ((isThreatened ? 1 : 0) - threatWeight) * 0.1;

      // State machine logic
      if (behaviorState === "IDLE") {
        // Target walking weight goes to 0 (smoothly stand)
        walkingWeight += (0 - walkingWeight) * 0.12;
        
        // Face the mouse if it's active and close
        const desiredHeading = currentRotation;
        // (Rotation to face mouse DISABLED by user request)

        if (desiredHeading !== null && currentRotation !== null) {
          let diff = desiredHeading - currentRotation;
          diff = Math.atan2(Math.sin(diff), Math.cos(diff));
          currentRotation += diff * 0.05;
        }

        // Trigger a new walk when the idle timer expires
        if (stateTime >= stateDuration) {
          behaviorState = "WALKING";
          stateTime = 0;
          stateDuration = 1500 + Math.random() * 3000; // Walk for 1.5 to 4.5s
          
          // Wander target (walk relative to current position)
          const wanderAngle = Math.random() * Math.PI * 2;
          const wanderDist = 150 + Math.random() * 300;
          targetWanderX = scorpionX + Math.cos(wanderAngle) * wanderDist;
          targetWanderY = scorpionY + Math.sin(wanderAngle) * wanderDist;
          
          // Clamp target to stay within screen boundaries
          const maxWanderRangeX = isMobile ? w * 0.4 : w * 0.45;
          const maxWanderRangeY = isMobile ? h * 0.4 : h * 0.45;
          targetWanderX = Math.max(-maxWanderRangeX, Math.min(maxWanderRangeX, targetWanderX));
          targetWanderY = Math.max(-maxWanderRangeY, Math.min(maxWanderRangeY, targetWanderY));
        }
      } else if (behaviorState === "WALKING") {
        // Target walking weight goes to 1
        walkingWeight += (1 - walkingWeight) * 0.1;

        // Move towards target position
        const dxWander = targetWanderX - scorpionX;
        const dyWander = targetWanderY - scorpionY;
        const distToTarget = Math.sqrt(dxWander * dxWander + dyWander * dyWander);

        // Scurrying logic: burst and micro-pause
        let speedMultiplier = isMobile ? 0.065 : 0.11;
        const scurryCycle = stateTime % 300;
        if (scurryCycle > 200) {
          speedMultiplier = 0.01; // micro-pause
        } else {
          speedMultiplier *= 1.8; // burst speed
        }
        
        // If threatened during a walk, we let it keep walking (DISABLED stopping by user request)
        // Threat only affects the animation now, not the movement state.

        const moveStep = speedMultiplier * dt;

        if (distToTarget > 6 && stateTime < stateDuration) {
          scorpionX += (dxWander / distToTarget) * moveStep;
          scorpionY += (dyWander / distToTarget) * moveStep;

          const walkingHeading = Math.atan2(dyWander, dxWander) + Math.PI / 2;
          if (currentRotation === null) {
            currentRotation = walkingHeading;
          } else {
            let diff = walkingHeading - currentRotation;
            diff = Math.atan2(Math.sin(diff), Math.cos(diff));
            currentRotation += diff * 0.15; // Snappy turns while scurrying
          }
        } else {
          behaviorState = "IDLE";
          stateTime = 0;
          stateDuration = 1000 + Math.random() * 3000; // Idle for 1 to 4 seconds
        }
      }

      const rotationAngle = currentRotation !== null ? currentRotation : 0;
      const walkX = scorpionX;
      const walkY = scorpionY;

      // Calculate speed for leg gait phase
      const dxFrame = scorpionX - prevWalkX;
      const dyFrame = scorpionY - prevWalkY;
      const speed = Math.sqrt(dxFrame * dxFrame + dyFrame * dyFrame);
      prevWalkX = scorpionX;
      prevWalkY = scorpionY;

      const gaitSpeedFactor = isMobile ? 0.28 : 0.18;
      gaitPhase += speed * gaitSpeedFactor;
      
      const bodyBob = Math.sin(gaitPhase * 2) * 2 * walkingWeight;

      // Pre-compute per-star animation offsets for non-leg components
      const animX: number[] = new Array(scorpioStars.length).fill(0);
      const animY: number[] = new Array(scorpioStars.length).fill(0);

      // Claws: realistic pinch & sway (independent searching when idle, threat pose when threatened)
      const clawTimePhase = time * 0.0015;
      
      // Independent search cycles (different speeds for left and right)
      const leftSearch = Math.sin(clawTimePhase * 0.8) * (1 - walkingWeight) * (1 - threatWeight);
      const rightSearch = Math.sin(clawTimePhase * 1.1 + Math.PI) * (1 - walkingWeight) * (1 - threatWeight);

      // Left Pedipalp: 0, 1, 2, 3, 4, 5
      for (let i = 0; i <= 5; i++) {
        const clawPhase = Math.sin(clawTimePhase + i * 0.15) + Math.sin(gaitPhase * 0.3);
        
        // Threat pose: open arms wide (negative X) and pull back (positive Y)
        const threatOffsetX = -15 * scale * threatWeight;
        const threatOffsetY = 10 * scale * threatWeight;
        
        animX[i] = clawPhase * -3 * scale + leftSearch * -5 * scale + threatOffsetX;
        animY[i] = Math.cos(clawTimePhase * 0.8 + i * 0.1) * 2 * scale + leftSearch * -8 * scale + threatOffsetY;
      }
      const leftFingerPinch = (Math.sin(clawTimePhase * 2.0) * 1.5 + Math.sin(gaitPhase * 0.8) * 1.0) * scale;
      animX[0] += leftFingerPinch;
      animX[1] -= leftFingerPinch;

      // Right Pedipalp: 6, 7, 8, 9, 10, 11
      for (let i = 6; i <= 11; i++) {
        const clawPhase = Math.sin(clawTimePhase + (i - 6) * 0.15) + Math.sin(gaitPhase * 0.3);
        
        // Threat pose: open arms wide (positive X) and pull back (positive Y)
        const threatOffsetX = 15 * scale * threatWeight;
        const threatOffsetY = 10 * scale * threatWeight;
        
        animX[i] = clawPhase * 3 * scale + rightSearch * 5 * scale + threatOffsetX;
        animY[i] = Math.cos(clawTimePhase * 0.8 + (i - 6) * 0.1) * 2 * scale + rightSearch * -8 * scale + threatOffsetY;
      }
      const rightFingerPinch = (Math.sin(clawTimePhase * 2.0) * 1.5 + Math.sin(gaitPhase * 0.8) * 1.0) * scale;
      animX[6] -= rightFingerPinch;
      animX[7] += rightFingerPinch;

      // Body Spine: 12, 13, 14, 15, 16
      for (let i = 12; i <= 16; i++) {
        animY[i] = bodyBob;
      }

      // Tail & Stinger sway & strike (Indices 33 - 40)
      const stingTargetsX = [0, -10, -25, -70, -135, -180, -200, -195];
      const stingTargetsY = [0, -55, -145, -230, -275, -290, -295, -315];

      for (let i = 33; i <= 40; i++) {
        const tailIdx = i - 33;
        
        // Normal sway based on time and walking gait
        const tailPhase = (time * 0.0014) + (gaitPhase * 0.25) - tailIdx * 0.35;
        const tailAmplitude = 2.5 + tailIdx * 2.5;
        const swayX = Math.sin(tailPhase) * tailAmplitude * scale;
        const swayY = Math.cos(tailPhase * 0.5) * (tailIdx * 0.8) * scale + bodyBob;

        let stingOffsetX = 0;
        let stingOffsetY = 0;
        let swayWeight = 1.0;

        // Threat curl (curl tail up and forward)
        const threatCurlX = stingTargetsX[tailIdx] * 0.6 * threatWeight * scale;
        const threatCurlY = stingTargetsY[tailIdx] * 0.6 * threatWeight * scale;

        if (stingActive) {
          const t = stingTime / stingDuration;
          let M = 0;
          if (t < 0.3) {
            const tWind = t / 0.3;
            M = -Math.sin(tWind * Math.PI) * 0.08;
            swayWeight = 1.0 - (tWind * 0.5);
          } else if (t < 0.5) {
            const tThrust = (t - 0.3) / 0.2;
            const ease = Math.sin(tThrust * Math.PI / 2);
            M = -0.08 * (1 - ease) + 1.1 * ease;
            swayWeight = 0.5 * (1 - ease);
          } else {
            const tRetract = (t - 0.5) / 0.5;
            const ease = Math.pow(1 - tRetract, 2);
            M = 1.1 * ease;
            swayWeight = 1.0 - (0.5 * ease);
          }
          stingOffsetX = stingTargetsX[tailIdx] * M * scale;
          stingOffsetY = stingTargetsY[tailIdx] * M * scale;
        }

        animX[i] = swayX * swayWeight + stingOffsetX + threatCurlX;
        animY[i] = swayY * swayWeight + stingOffsetY + threatCurlY;
      }

      // Pre-compute final screen positions with 2D rotation matrix
      const screenX: number[] = [];
      const screenY: number[] = [];
      const screenGlow: number[] = [];
      const sinTime = Math.sin(time * 0.003);
      const cosR = Math.cos(rotationAngle);
      const sinR = Math.sin(rotationAngle);

      for (let i = 0; i < scorpioStars.length; i++) {
        // Skip leg joints during this pre-compute loop (we will calculate them procedurally next)
        if (i >= 17 && i <= 32) continue;

        const s = scorpioStars[i];

        // Animated local coordinates relative to center
        const localX = (s.rx + animX[i]) * scale;
        const localY = (s.ry + animY[i]) * scale;

        // Apply rotation
        const rotX = localX * cosR - localY * sinR;
        const rotY = localX * sinR + localY * cosR;

        screenX[i] = baseX + rotX + walkX - constellationOffsetX;
        screenY[i] = baseY + rotY + walkY - constellationOffsetY;
        screenGlow[i] = s.size * (s.isHeart ? 3.2 : 2.2) + sinTime * 1.5;
      }

      // Procedural Leg Simulation: Ground-planted Stance & Swing Phases with Anatomical Joint Bending
      legStates.forEach((leg) => {
        // 1. Get the world position of the body base node
        const bx = screenX[leg.baseNode];
        const by = screenY[leg.baseNode];

        // Body center for local space conversions
        const cx = baseX + walkX - constellationOffsetX;
        const cy = baseY + walkY - constellationOffsetY;

        // 2. Calculate the "home position" of the foot in world space
        const homeLocalX = leg.rx * scale;
        const homeLocalY = leg.ry * scale;
        const homeRotX = homeLocalX * cosR - homeLocalY * sinR;
        const homeRotY = homeLocalX * sinR + homeLocalY * cosR;

        // Add a tiny organic breathing/twitching movement to the home position when standing idle
        const idleTwitch = Math.sin(time * 0.0015 + leg.phaseOffset) * 1.5 * scale * (1 - walkingWeight);
        const homeX = cx + homeRotX + cosR * idleTwitch * leg.side;
        const homeY = cy + homeRotY + sinR * idleTwitch * leg.side;

        // Calculate the rotated natural rest knee position
        const kneeLocalX = leg.krx * scale;
        const kneeLocalY = leg.kry * scale;
        const kneeRotX = kneeLocalX * cosR - kneeLocalY * sinR;
        const kneeRotY = kneeLocalX * sinR + kneeLocalY * cosR;
        const restKneeX = cx + kneeRotX;
        const restKneeY = cy + kneeRotY;

        // Initialize positions if first run
        if (leg.worldX === 0 || leg.worldY === 0) {
          leg.worldX = homeX;
          leg.worldY = homeY;
          leg.plantX = homeX;
          leg.plantY = homeY;
          leg.startX = homeX;
          leg.startY = homeY;
        }

        // 3. Determine the phase of this leg
        const phi = gaitPhase + leg.phaseOffset;
        const normP = ((phi % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);

        const isStance = normP < Math.PI;
        const t = (normP - Math.PI) / Math.PI;

        let stepWorldX = leg.worldX;
        let stepWorldY = leg.worldY;

        if (isStance) {
          // Stance Phase: The foot stays planted on the ground
          if (!leg.planted) {
            // Transition from swing to stance: plant the foot!
            leg.planted = true;
            const dxHome = homeX - leg.worldX;
            const dyHome = homeY - leg.worldY;
            const distHome = Math.sqrt(dxHome * dxHome + dyHome * dyHome);
            
            if (distHome > 35 * scale) {
              leg.plantX = homeX;
              leg.plantY = homeY;
            } else {
              leg.plantX = leg.worldX;
              leg.plantY = leg.worldY;
            }
          }
          
          stepWorldX = leg.plantX;
          stepWorldY = leg.plantY;

          // Drag effect: if the body moves too far, the foot must slide to not overstretch
          const dxHome = homeX - stepWorldX;
          const dyHome = homeY - stepWorldY;
          const distHome = Math.sqrt(dxHome * dxHome + dyHome * dyHome);
          const maxStretch = 30 * scale;
          if (distHome > maxStretch) {
            const pull = (distHome - maxStretch) / distHome;
            stepWorldX += dxHome * pull;
            stepWorldY += dyHome * pull;
            leg.plantX = stepWorldX;
            leg.plantY = stepWorldY;
          }
        } else {
          // Swing Phase: The foot lifts and steps forward to a new target
          if (leg.planted) {
            // Transition from stance to swing: record start position
            leg.planted = false;
            leg.startX = leg.worldX;
            leg.startY = leg.worldY;
          }

          // Calculate dynamic step target in world space based on velocity
          const vx = dxFrame;
          const vy = dyFrame;
          const strideMultiplier = 6.0;

          const targetX = homeX + vx * strideMultiplier;
          const targetY = homeY + vy * strideMultiplier;
          
          // Snappy easing function (easeOutQuint)
          const easeOutQuint = 1 - Math.pow(1 - t, 5);
          
          // Interpolate to the target position with snappy easing
          stepWorldX = leg.startX + (targetX - leg.startX) * easeOutQuint;
          stepWorldY = leg.startY + (targetY - leg.startY) * easeOutQuint;

          // Add vertical lift (lift leg outwards) - peaked curve for snap
          const liftHeight = 15 * scale * Math.sin(t * Math.PI);
          // Outward lift direction based on current body rotation
          stepWorldX += cosR * liftHeight * leg.side;
          stepWorldY += sinR * liftHeight * leg.side;
        }

        // Blend between walking procedural step and stationary home position based on walkingWeight
        leg.worldX = stepWorldX * walkingWeight + homeX * (1 - walkingWeight);
        leg.worldY = stepWorldY * walkingWeight + homeY * (1 - walkingWeight);

        // Convert the foot's world position back to body-local coordinates
        const lx = (leg.worldX - cx) * cosR + (leg.worldY - cy) * sinR;
        const ly = -(leg.worldX - cx) * sinR + (leg.worldY - cy) * cosR;

        // Apply strict anatomical boundaries (clamping) in body space
        const clampedLx = leg.side === -1 
          ? Math.max(-170 * scale, Math.min(-45 * scale, lx)) 
          : Math.max(45 * scale, Math.min(170 * scale, lx));
        
        // Prevent legs from overlapping along the Y axis of the body
        const clampedLy = Math.max((leg.ry - 20) * scale, Math.min((leg.ry + 20) * scale, ly));

        // Convert clamped local coordinates back to world coordinates
        leg.worldX = cx + clampedLx * cosR - clampedLy * sinR;
        leg.worldY = cy + clampedLx * sinR + clampedLy * cosR;

        // If in stance, sync the planted position to the clamped coordinates to prevent snapping
        if (isStance) {
          leg.plantX = leg.worldX;
          leg.plantY = leg.worldY;
        }

        // 4. Anatomical Knee Bending:
        // Adjust the natural knee position by half of the foot's deviation from its ideal home position
        const footDeviationX = leg.worldX - homeX;
        const footDeviationY = leg.worldY - homeY;
        const kneeX = restKneeX + footDeviationX * 0.5;
        const kneeY = restKneeY + footDeviationY * 0.5;

        // 5. Store the final screen positions for rendering
        screenX[leg.footNode] = leg.worldX;
        screenY[leg.footNode] = leg.worldY;
        screenX[leg.kneeNode] = kneeX;
        screenY[leg.kneeNode] = kneeY;

        screenGlow[leg.footNode] = 0;
        screenGlow[leg.kneeNode] = 0;
      });

      // 3. Draw Stardust Particles (Outlining claws, body, legs, and tail)
      for (let i = 0; i < scorpioParticles.length; i++) {
        const p = scorpioParticles[i];
        p.alpha += p.twinkleSpeed;
        if (p.alpha > 0.9 || p.alpha < 0.2) {
          p.twinkleSpeed = -p.twinkleSpeed;
        }

        const pA_x = screenX[p.nodeA];
        const pA_y = screenY[p.nodeA];
        const pB_x = screenX[p.nodeB];
        const pB_y = screenY[p.nodeB];

        const baseX = pA_x + p.t * (pB_x - pA_x);
        const baseY = pA_y + p.t * (pB_y - pA_y);

        const dx = pB_x - pA_x;
        const dy = pB_y - pA_y;
        const len = Math.sqrt(dx * dx + dy * dy) || 1;
        const ux = dx / len;
        const uy = dy / len;
        const px = -uy;
        const py = ux;

        const finalX = baseX + p.offsetX * px + p.offsetY * ux;
        const finalY = baseY + p.offsetX * py + p.offsetY * uy;

        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.fillRect(finalX - p.size, finalY - p.size, p.size * 2, p.size * 2);
      }

      // 4. Draw Constellation lines (skipping legs)
      const pulseOpacity = 0.15 + Math.sin(time * 0.0015) * 0.04;

      // Regular lines (Spine and Claws)
      ctx.beginPath();
      ctx.lineWidth = 1.0;
      for (const line of scorpioLines) {
        const i0 = line[0], i1 = line[1];
        // Skip drawing lines for leg joint indices
        if ((i0 >= 17 && i0 <= 32) || (i1 >= 17 && i1 <= 32)) continue;
        if (scorpioStars[i0].isHeart || scorpioStars[i1].isHeart) continue;

        ctx.moveTo(screenX[i0], screenY[i0]);
        ctx.lineTo(screenX[i1], screenY[i1]);
      }
      ctx.strokeStyle = `rgba(245, 158, 11, ${pulseOpacity})`; // Gold amber
      ctx.stroke();

      // Leg lines (Faint to make them clearer but not overpowering)
      ctx.beginPath();
      ctx.lineWidth = 0.8;
      for (const line of scorpioLines) {
        const i0 = line[0], i1 = line[1];
        if ((i0 >= 17 && i0 <= 32) || (i1 >= 17 && i1 <= 32)) {
          ctx.moveTo(screenX[i0], screenY[i0]);
          ctx.lineTo(screenX[i1], screenY[i1]);
        }
      }
      ctx.strokeStyle = `rgba(186, 230, 253, ${pulseOpacity + 0.15})`; // Light cyan/blue
      ctx.stroke();

      // Heart-connected lines (Antares highlighted)
      ctx.beginPath();
      ctx.lineWidth = 1.2;
      for (const line of scorpioLines) {
        const i0 = line[0], i1 = line[1];
        if ((i0 >= 17 && i0 <= 32) || (i1 >= 17 && i1 <= 32)) continue;
        if (!scorpioStars[i0].isHeart && !scorpioStars[i1].isHeart) continue;

        ctx.moveTo(screenX[i0], screenY[i0]);
        ctx.lineTo(screenX[i1], screenY[i1]);
      }
      ctx.strokeStyle = `rgba(249, 115, 22, ${pulseOpacity + 0.12})`; // Warm orange-red J-Spine
      ctx.stroke();

      // 5. Draw Constellation Star Cores and Flares (skipping invisible legs)
      let hoveredStarIndex: number | null = null;
      let minDistance = 55;

      if (mouse.x !== null && mouse.y !== null) {
        for (let i = 0; i < scorpioStars.length; i++) {
          if (i >= 17 && i <= 32) continue; // Skip invisible legs

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
        if (i >= 17 && i <= 32) continue; // Skip invisible legs

        const s = scorpioStars[i];
        const sx = screenX[i];
        const sy = screenY[i];
        const isHovered = hoveredStarIndex === i;
        
        // Scintillation (twinkling) effect
        const scintPhase = i * 2.5;
        const scintSpeed = 0.002 + (i % 5) * 0.001;
        // Make smaller stars twinkle more aggressively
        const scintAmp = s.size < 5.0 ? 0.4 : 0.15;
        const scintillation = 1.0 - (Math.sin(time * scintSpeed + scintPhase) * scintAmp);

        let glowR = screenGlow[i] * (isHovered ? 1.8 : 1) * scintillation;

        // Extra glow on stinger during active sting
        if (i === 40 && stingActive) {
          const t = stingTime / stingDuration;
          const pulse = t < 0.5 ? (t / 0.5) : (1 - (t - 0.5) / 0.5);
          glowR += pulse * 18 * scale;
        }

        // Antares Nebula Glow (Special effect for the heart)
        if (s.isHeart) {
           const nebulaSize = s.size * 6.0 * scale * (1.0 + Math.sin(time * 0.001) * 0.1); // Breathing nebula
           const nebulaGrad = ctx.createRadialGradient(sx, sy, 0, sx, sy, nebulaSize);
           nebulaGrad.addColorStop(0, "rgba(239, 68, 68, 0.4)"); // Deep red center
           nebulaGrad.addColorStop(0.5, "rgba(249, 115, 22, 0.15)"); // Orange mid
           nebulaGrad.addColorStop(1, "rgba(0, 0, 0, 0)"); // Fade to black
           
           ctx.beginPath();
           ctx.arc(sx, sy, nebulaSize, 0, Math.PI * 2);
           ctx.fillStyle = nebulaGrad;
           ctx.fill();
        }

        // Radial glow
        const radGrad = ctx.createRadialGradient(sx, sy, s.size * 0.2, sx, sy, glowR);
        radGrad.addColorStop(0, i === 40 && stingActive ? "#f97316" : s.glowColor);
        radGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.beginPath();
        ctx.arc(sx, sy, glowR, 0, Math.PI * 2);
        ctx.fillStyle = radGrad;
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(sx, sy, s.size * (isHovered ? 1.3 : 1) * scintillation, 0, Math.PI * 2);
        ctx.fillStyle = i === 40 && stingActive ? "#ff8c3a" : s.color;
        ctx.fill();

        // Flares on major stars
        if (s.isHeart || s.size >= 5.0) {
          let flareSize = s.size * 1.6 + Math.sin(time * 0.004) * 1.2;
          if (i === 40 && stingActive) {
            const t = stingTime / stingDuration;
            const pulse = t < 0.5 ? (t / 0.5) : (1 - (t - 0.5) / 0.5);
            flareSize += pulse * 10 * scale;
          }
          ctx.beginPath();
          ctx.strokeStyle = i === 40 && stingActive ? "#ff8c3a" : s.color;
          ctx.lineWidth = 0.7;
          ctx.moveTo(sx - flareSize, sy);
          ctx.lineTo(sx + flareSize, sy);
          ctx.moveTo(sx, sy - flareSize);
          ctx.lineTo(sx, sy + flareSize);
          ctx.stroke();
        }
      }

      // 6. HUD display on hover
      if (hoveredStarIndex !== null) {
        const s = scorpioStars[hoveredStarIndex];
        const sx = screenX[hoveredStarIndex];
        const sy = screenY[hoveredStarIndex];

        ctx.beginPath();
        ctx.arc(sx, sy, 16, 0, Math.PI * 2);
        ctx.strokeStyle = s.isHeart ? "rgba(239, 68, 68, 0.45)" : "rgba(245, 158, 11, 0.45)";
        ctx.lineWidth = 1.0;
        ctx.stroke();

        ctx.beginPath();
        ctx.setLineDash([2, 4]);
        ctx.arc(sx, sy, 22, 0, Math.PI * 2);
        ctx.strokeStyle = s.isHeart ? "rgba(239, 68, 68, 0.3)" : "rgba(245, 158, 11, 0.3)";
        ctx.stroke();
        ctx.setLineDash([]);

        const centerScreenX = baseX + walkX - constellationOffsetX;
        const isOnRightSide = sx > centerScreenX;
        const textOffsetX = isOnRightSide ? 32 : -180;

        const centerScreenY = baseY + walkY - constellationOffsetY;
        const isOnBottomHalf = sy > centerScreenY;
        const signY = isOnBottomHalf ? 1 : -1;

        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.lineTo(sx + (isOnRightSide ? 20 : -20), sy + (signY * 20));
        ctx.lineTo(sx + textOffsetX, sy + (signY * 20));
        ctx.strokeStyle = s.isHeart ? "rgba(239, 68, 68, 0.4)" : "rgba(245, 158, 11, 0.4)";
        ctx.lineWidth = 0.8;
        ctx.stroke();

        ctx.font = "bold 11px Courier New, monospace";
        ctx.fillStyle = s.isHeart ? "#fca5a5" : "#fef08a";
        ctx.fillText(s.name.toUpperCase(), sx + textOffsetX + (isOnRightSide ? 5 : -5), sy + (signY * 16));

        let currentYOffset = 28;

        if (s.astronomicalName) {
          ctx.font = "italic 10px Courier New, monospace";
          ctx.fillStyle = s.isHeart ? "#ef4444" : "#fbbf24"; // Red for Antares, Gold for others
          ctx.fillText(`★ ${s.astronomicalName}`, sx + textOffsetX + (isOnRightSide ? 5 : -5), sy + (signY * currentYOffset));
          currentYOffset += 12;
        }

        ctx.font = "9px Courier New, monospace";
        ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
        ctx.fillText(s.scientificName, sx + textOffsetX + (isOnRightSide ? 5 : -5), sy + (signY * currentYOffset));
        
        // info is too long to display without wrapping, so just skip it or keep it simple
        // the original code just did ctx.fillText(s.info) which would overflow, 
        // we'll leave it as original but adjusted Y offset
        if (s.info) {
          currentYOffset += 12;
          ctx.fillText(s.info.substring(0, 30) + "...", sx + textOffsetX + (isOnRightSide ? 5 : -5), sy + (signY * currentYOffset));
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
         className="w-full h-full opacity-80"
      />
    </div>
  );
}
