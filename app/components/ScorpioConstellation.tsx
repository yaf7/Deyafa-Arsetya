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

    // ===== REALISTIC SCORPION ANIMAL SHAPE SKELETON =====
    const scorpioStars: ScorpioStar[] = [
      // ── LEFT CLAW (Indices 0 - 5) ──
      { name: "Mobile Weapon (Outer)", scientificName: "Kotlin Native Drive", rx: -195, ry: -275, size: 4.5, color: "#fbbf24", glowColor: "rgba(245, 158, 11, 0.45)", info: "Membangun aplikasi Android native yang responsif, modern, dan berkinerja tinggi." },
      { name: "Mobile Weapon (Inner)", scientificName: "Android SDK & Jetpack", rx: -140, ry: -270, size: 4.5, color: "#fbbf24", glowColor: "rgba(245, 158, 11, 0.45)", info: "Implementasi komponen UI modern, manajemen memori, dan arsitektur aplikasi mobile yang clean." },
      { name: "Mobile Palm", scientificName: "API Integration Module", rx: -160, ry: -240, size: 4.5, color: "#fbbf24", glowColor: "rgba(245, 158, 11, 0.45)", info: "Menghubungkan aplikasi mobile dengan endpoint RESTful API dan sinkronisasi data secara real-time." },
      { name: "L-Arm Elbow", scientificName: "Mobile State Management", rx: -140, ry: -180, size: 3.5, color: "#fbbf24", glowColor: "rgba(245, 158, 11, 0.3)", info: "Mengelola aliran data (data flow) yang asinkronus dan efisien di sisi client mobile." },
      { name: "L-Arm Femur", scientificName: "App Release Pipeline", rx: -75, ry: -150, size: 4.0, color: "#fbbf24", glowColor: "rgba(245, 158, 11, 0.3)", info: "Manajemen rilis aplikasi, pembuatan build APK/Bundle, dan distribusi source code." },
      { name: "L-Arm Base", scientificName: "Mobile Base Connection", rx: -25, ry: -100, size: 3.0, color: "#fbbf24", glowColor: "rgba(245, 158, 11, 0.2)" },

      // ── RIGHT CLAW (Indices 6 - 11) ──
      { name: "Web Weapon (Outer)", scientificName: "PHP & Laravel Framework", rx: 195, ry: -275, size: 4.5, color: "#fbbf24", glowColor: "rgba(245, 158, 11, 0.45)", info: "Arsitektur backend yang kokoh, pembuatan RESTful API, dan sistem autentikasi yang aman." },
      { name: "Web Weapon (Inner)", scientificName: "React & Next.js Engine", rx: 140, ry: -270, size: 4.5, color: "#fbbf24", glowColor: "rgba(245, 158, 11, 0.45)", info: "Pembuatan antarmuka web interaktif, berkinerja tinggi, dan ramah terhadap optimasi SEO." },
      { name: "Web Palm", scientificName: "Database Layer (MySQL)", rx: 160, ry: -240, size: 4.5, color: "#fbbf24", glowColor: "rgba(245, 158, 11, 0.45)", info: "Perancangan skema database relasional, optimasi query, dan manajemen integritas data." },
      { name: "R-Arm Elbow", scientificName: "Full-Stack Integration", rx: 140, ry: -180, size: 3.5, color: "#fbbf24", glowColor: "rgba(245, 158, 11, 0.3)", info: "Menjembatani logika database backend dengan tampilan frontend secara dinamis dan seamless." },
      { name: "R-Arm Femur", scientificName: "Web Deployment Module", rx: 75, ry: -150, size: 4.0, color: "#fbbf24", glowColor: "rgba(245, 158, 11, 0.3)", info: "Proses deployment aplikasi web ke server produksi, manajemen hosting, dan konfigurasi domain." },
      { name: "R-Arm Base", scientificName: "Web Base Connection", rx: 25, ry: -100, size: 3.0, color: "#fbbf24", glowColor: "rgba(245, 158, 11, 0.2)" },

      // ── BODY SPINE (Indices 12 - 16) ──
      { name: "Main Sensor", scientificName: "Management Informatics", rx: 0, ry: -110, size: 5.5, color: "#fbbf24", glowColor: "rgba(245, 158, 11, 0.55)", info: "Menghubungkan kebutuhan manajemen bisnis atau instansi dengan solusi teknis pemrograman." },
      { name: "Carapace Center", scientificName: "Systems Architect", rx: 0, ry: -65, size: 5.0, color: "#fbbf24", glowColor: "rgba(245, 158, 11, 0.45)", info: "Merancang alur logika program yang bersih (clean code), efisien, dan terstruktur." },
      { name: "Deyafa Arsetya", scientificName: "Alpha Core (Full-Stack Developer)", rx: 0, ry: -15, size: 8.5, color: "#f97316", glowColor: "rgba(249, 115, 22, 0.8)", isHeart: true, info: "Pusat pengendali seluruh sistem portofolio. Fokus pada pengembangan Web & Mobile." },
      { name: "Analytics Module", scientificName: "Python 3 & Data Processing", rx: 0, ry: 45, size: 5.0, color: "#fbbf24", glowColor: "rgba(245, 158, 11, 0.45)", info: "Sub-prosesor untuk mengolah data, analisis logika matematika, dan visualisasi informasi terstruktur." },
      { name: "Tail Connection", scientificName: "Core Base", rx: 0, ry: 110, size: 4.5, color: "#fbbf24", glowColor: "rgba(245, 158, 11, 0.4)", info: "Pangkal penghubung antara tubuh utama dengan sistem ekor kalajengking." },

      // ── LEFT LEGS (Indices 17 - 24, Faint/Invisible Skeleton) ──
      { name: "Knee L1", scientificName: "JS/TS Knee Joint", rx: -75, ry: -95, size: 0, color: "transparent", glowColor: "transparent" },
      { name: "Stabilizer L1", scientificName: "JavaScript / TypeScript", rx: -130, ry: -80, size: 0, color: "transparent", glowColor: "transparent" },
      { name: "Knee L2", scientificName: "HTML/CSS Knee Joint", rx: -85, ry: -50, size: 0, color: "transparent", glowColor: "transparent" },
      { name: "Stabilizer L2", scientificName: "HTML5 & CSS3 Structure", rx: -145, ry: -35, size: 0, color: "transparent", glowColor: "transparent" },
      { name: "Knee L3", scientificName: "Git Knee Joint", rx: -85, ry: 0, size: 0, color: "transparent", glowColor: "transparent" },
      { name: "Stabilizer L3", scientificName: "Version Control (Git)", rx: -145, ry: 20, size: 0, color: "transparent", glowColor: "transparent" },
      { name: "Knee L4", scientificName: "UI/UX Knee Joint", rx: -75, ry: 45, size: 0, color: "transparent", glowColor: "transparent" },
      { name: "Stabilizer L4", scientificName: "UI/UX Frameworks", rx: -130, ry: 75, size: 0, color: "transparent", glowColor: "transparent" },

      // ── RIGHT LEGS (Indices 25 - 32, Faint/Invisible Skeleton) ──
      { name: "Knee R1", scientificName: "SEO Knee Joint", rx: 75, ry: -95, size: 0, color: "transparent", glowColor: "transparent" },
      { name: "Engine R1", scientificName: "SEO Optimization Node", rx: 130, ry: -80, size: 0, color: "transparent", glowColor: "transparent" },
      { name: "Knee R2", scientificName: "Algo Knee Joint", rx: 85, ry: -50, size: 0, color: "transparent", glowColor: "transparent" },
      { name: "Engine R2", scientificName: "Algorithmic Logic", rx: 145, ry: -35, size: 0, color: "transparent", glowColor: "transparent" },
      { name: "Knee R3", scientificName: "Compat Knee Joint", rx: 85, ry: 0, size: 0, color: "transparent", glowColor: "transparent" },
      { name: "Engine R3", scientificName: "Cross-Device Compatibility", rx: 145, ry: 20, size: 0, color: "transparent", glowColor: "transparent" },
      { name: "Knee R4", scientificName: "PM Knee Joint", rx: 75, ry: 45, size: 0, color: "transparent", glowColor: "transparent" },
      { name: "Engine R4", scientificName: "Package Management", rx: 130, ry: 75, size: 0, color: "transparent", glowColor: "transparent" },

      // ── TAIL & STINGER (Indices 33 - 40) ──
      { name: "Workflow Node 1", scientificName: "Problem Analysis", rx: 15, ry: 155, size: 4.5, color: "#fbbf24", glowColor: "rgba(245, 158, 11, 0.45)", info: "Tahap awal menganalisis kebutuhan sistem dan menerjemahkannya ke dalam rencana arsitektur kode." },
      { name: "Workflow Node 2", scientificName: "UI/UX Translation", rx: 50, ry: 205, size: 4.5, color: "#fbbf24", glowColor: "rgba(245, 158, 11, 0.45)", info: "Mengubah konsep desain visual menjadi komponen kode frontend web atau mobile yang interaktif." },
      { name: "Workflow Node 3", scientificName: "Backend Integration", rx: 100, ry: 245, size: 4.5, color: "#fbbf24", glowColor: "rgba(245, 158, 11, 0.45)", info: "Membangun API, mengelola database, dan memastikan keamanan data di sisi server." },
      { name: "Workflow Node 4", scientificName: "Testing & QA", rx: 160, ry: 260, size: 5.0, color: "#fbbf24", glowColor: "rgba(245, 158, 11, 0.5)", info: "Melakukan pengujian fitur (debugging) untuk memastikan aplikasi bebas dari error sebelum dirilis." },
      { name: "Workflow Node 5", scientificName: "Deployment Ready", rx: 215, ry: 235, size: 4.5, color: "#fbbf24", glowColor: "rgba(245, 158, 11, 0.45)", info: "Menyiapkan build final aplikasi web maupun mobile untuk diunggah ke server produksi atau platform distribusi." },
      { name: "Workflow Node 6", scientificName: "Scalability Planning", rx: 240, ry: 180, size: 4.5, color: "#fbbf24", glowColor: "rgba(245, 158, 11, 0.45)", info: "Memastikan kode program ditulis dengan standar yang rapi agar mudah dirawat dan dikembangkan ke depan." },
      { name: "Pre-Sting Valve", scientificName: "Performance Optimization", rx: 230, ry: 125, size: 4.8, color: "#fbbf24", glowColor: "rgba(245, 158, 11, 0.5)", info: "Optimasi kecepatan load halaman web dan efisiensi penggunaan memori pada aplikasi mobile." },
      { name: "Shaula (THE STINGER)", scientificName: "Production-Ready Standard", rx: 195, ry: 95, size: 6.5, color: "#f97316", glowColor: "rgba(249, 115, 22, 0.75)", info: "Sengatan Utama: Menghasilkan produk digital berupa aplikasi Web & Mobile yang siap pakai, stabil, dan solutif!" },
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
      [15, 21], [21, 22],
      [16, 23], [23, 24],
      // Right Legs
      [13, 25], [25, 26],
      [13, 27], [27, 28],
      [15, 29], [29, 30],
      [16, 31], [31, 32],
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
      
      const generateParticlesForSegment = (
        nodeA: number,
        nodeB: number,
        count: number,
        maxOffset: number,
        colorType: 'gold' | 'blue' = 'gold'
      ) => {
        for (let i = 0; i < count; i++) {
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

      // Left Claw (Fingers, Palm, Arms)
      generateParticlesForSegment(12, 5, 15, 7, 'gold');
      generateParticlesForSegment(5, 4, 18, 9, 'gold');
      generateParticlesForSegment(4, 3, 20, 11, 'gold');
      generateParticlesForSegment(3, 2, 28, 13, 'gold');
      generateParticlesForSegment(2, 0, 22, 9, 'blue');
      generateParticlesForSegment(2, 1, 22, 9, 'blue');

      // Right Claw (Fingers, Palm, Arms)
      generateParticlesForSegment(12, 11, 15, 7, 'gold');
      generateParticlesForSegment(11, 10, 18, 9, 'gold');
      generateParticlesForSegment(10, 9, 20, 11, 'gold');
      generateParticlesForSegment(9, 8, 28, 13, 'gold');
      generateParticlesForSegment(8, 6, 22, 9, 'blue');
      generateParticlesForSegment(8, 7, 22, 9, 'blue');

      // Body (Thick oval, dense star cluster)
      generateParticlesForSegment(12, 13, 60, 20, 'gold');
      generateParticlesForSegment(13, 14, 80, 25, 'gold');
      generateParticlesForSegment(14, 15, 80, 23, 'gold');
      generateParticlesForSegment(15, 16, 60, 18, 'gold');

      // Left Legs (Jointed, thin distinct outlines)
      generateParticlesForSegment(13, 17, 12, 5, 'blue');
      generateParticlesForSegment(17, 18, 16, 4, 'gold');
      generateParticlesForSegment(13, 19, 12, 5, 'blue');
      generateParticlesForSegment(19, 20, 16, 4, 'gold');
      generateParticlesForSegment(15, 21, 12, 5, 'blue');
      generateParticlesForSegment(21, 22, 16, 4, 'gold');
      generateParticlesForSegment(16, 23, 12, 5, 'blue');
      generateParticlesForSegment(23, 24, 16, 4, 'gold');

      // Right Legs (Jointed, thin distinct outlines)
      generateParticlesForSegment(13, 25, 12, 5, 'blue');
      generateParticlesForSegment(25, 26, 16, 4, 'gold');
      generateParticlesForSegment(13, 27, 12, 5, 'blue');
      generateParticlesForSegment(27, 28, 16, 4, 'gold');
      generateParticlesForSegment(15, 29, 12, 5, 'blue');
      generateParticlesForSegment(29, 30, 16, 4, 'gold');
      generateParticlesForSegment(16, 31, 12, 5, 'blue');
      generateParticlesForSegment(31, 32, 16, 4, 'gold');

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
      const constellationOffsetX = currentMouseOffset.x * 0.4;
      const constellationOffsetY = currentMouseOffset.y * 0.4;

      // Walking Wandering
      const walkSpeed = 0.00018;
      const wanderRangeX = isMobile ? 60 : 180;
      const wanderRangeY = isMobile ? 40 : 120;

      const getWanderPos = (t: number) => {
        const x = Math.sin(t * walkSpeed) * (wanderRangeX * 0.6)
          + Math.sin(t * walkSpeed * 1.7 + 1.2) * (wanderRangeX * 0.3)
          + Math.sin(t * walkSpeed * 0.3) * (wanderRangeX * 0.1);
        const y = Math.cos(t * walkSpeed * 0.8) * (wanderRangeY * 0.6)
          + Math.cos(t * walkSpeed * 1.3 + 0.7) * (wanderRangeY * 0.3)
          + Math.sin(t * walkSpeed * 0.4) * (wanderRangeY * 0.1);
        return { x, y };
      };

      const posCurrent = getWanderPos(time);
      const posNext = getWanderPos(time + 100);
      const dx = posNext.x - posCurrent.x;
      const dy = posNext.y - posCurrent.y;
      const heading = Math.atan2(dy, dx);
      // Face the direction of travel
      const rotationAngle = heading + Math.PI / 2;

      const walkX = posCurrent.x;
      const walkY = posCurrent.y;

      // Walking Gait Cycle
      const gaitSpeed = 0.0025;
      const gaitPhase = time * gaitSpeed;
      const bodyBob = Math.sin(gaitPhase * 2) * 2;

      // Helper for realistic gait offsets (stance vs swing phases)
      const getWalkOffsets = (p: number, side: number) => {
        const stride = 14; // Y-axis stride (walking direction)
        const lift = 8;    // X-axis joint lift
        const normP = ((p % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);

        let footX = 0;
        let footY = 0;
        let kneeX = 0;
        let kneeY = 0;

        if (normP < Math.PI) {
          // Stance phase (foot pushes backward on the ground)
          const t = normP / Math.PI;
          footY = -stride + 2 * stride * t;
          footX = 0;

          kneeY = footY * 0.5;
          kneeX = 0;
        } else {
          // Swing phase (foot lifts and steps forward)
          const t = (normP - Math.PI) / Math.PI;
          footY = stride - 2 * stride * t;

          const arc = Math.sin(t * Math.PI);
          footX = -side * (arc * lift * 0.6); // Foot pulls slightly inward in 2D
          footY += -arc * 2;

          kneeX = side * (arc * lift * 1.4);  // Knee bends outward dramatically
          kneeY = footY * 0.5 - arc * 3;
        }

        return { footX, footY, kneeX, kneeY };
      };

      // Pre-compute per-star animation offsets
      const animX: number[] = new Array(scorpioStars.length).fill(0);
      const animY: number[] = new Array(scorpioStars.length).fill(0);

      // Claws: realistic pinch & sway
      // Left Pedipalp: 0, 1, 2, 3, 4, 5
      for (let i = 0; i <= 5; i++) {
        const clawPhase = Math.sin(gaitPhase * 0.5 + i * 0.1);
        animX[i] = clawPhase * -3;
        animY[i] = Math.sin(gaitPhase * 0.5 + i * 0.1) * 2;
      }
      const leftFingerPinch = Math.sin(gaitPhase * 1.5) * 2;
      animX[0] += leftFingerPinch;
      animX[1] -= leftFingerPinch;

      // Right Pedipalp: 6, 7, 8, 9, 10, 11
      for (let i = 6; i <= 11; i++) {
        const clawPhase = Math.sin(gaitPhase * 0.5 + (i - 6) * 0.1);
        animX[i] = clawPhase * 3;
        animY[i] = Math.sin(gaitPhase * 0.5 + (i - 6) * 0.1) * 2;
      }
      const rightFingerPinch = Math.sin(gaitPhase * 1.5) * 2;
      animX[6] -= rightFingerPinch;
      animX[7] += rightFingerPinch;

      // Body Spine: 12, 13, 14, 15, 16
      for (let i = 12; i <= 16; i++) {
        animY[i] = bodyBob;
      }

      // Left Legs (Indices 17 - 24): metachronal wave sequence
      // L1
      const l1 = getWalkOffsets(gaitPhase, -1);
      animX[17] = l1.kneeX; animY[17] = l1.kneeY + bodyBob;
      animX[18] = l1.footX; animY[18] = l1.footY;

      // L2
      const l2 = getWalkOffsets(gaitPhase + Math.PI * 0.5, -1);
      animX[19] = l2.kneeX; animY[19] = l2.kneeY + bodyBob;
      animX[20] = l2.footX; animY[20] = l2.footY;

      // L3
      const l3 = getWalkOffsets(gaitPhase + Math.PI, -1);
      animX[21] = l3.kneeX; animY[21] = l3.kneeY + bodyBob;
      animX[22] = l3.footX; animY[22] = l3.footY;

      // L4
      const l4 = getWalkOffsets(gaitPhase + Math.PI * 1.5, -1);
      animX[23] = l4.kneeX; animY[23] = l4.kneeY + bodyBob;
      animX[24] = l4.footX; animY[24] = l4.footY;

      // Right Legs (Indices 25 - 32): offset to alternate with left legs
      // R1
      const r1 = getWalkOffsets(gaitPhase + Math.PI, 1);
      animX[25] = r1.kneeX; animY[25] = r1.kneeY + bodyBob;
      animX[26] = r1.footX; animY[26] = r1.footY;

      // R2
      const r2 = getWalkOffsets(gaitPhase + Math.PI * 1.5, 1);
      animX[27] = r2.kneeX; animY[27] = r2.kneeY + bodyBob;
      animX[28] = r2.footX; animY[28] = r2.footY;

      // R3
      const r3 = getWalkOffsets(gaitPhase, 1);
      animX[29] = r3.kneeX; animY[29] = r3.kneeY + bodyBob;
      animX[30] = r3.footX; animY[30] = r3.footY;

      // R4
      const r4 = getWalkOffsets(gaitPhase + Math.PI * 0.5, 1);
      animX[31] = r4.kneeX; animY[31] = r4.kneeY + bodyBob;
      animX[32] = r4.footX; animY[32] = r4.footY;

      // Tail & Stinger sway (Indices 33 - 40)
      for (let i = 33; i <= 40; i++) {
        const tailIdx = i - 33;
        const tailPhase = gaitPhase * 0.5 - tailIdx * 0.3;
        const tailAmplitude = 2.0 + tailIdx * 2.0;
        animX[i] = Math.sin(tailPhase) * tailAmplitude;
        animY[i] = Math.cos(tailPhase * 0.4) * (tailIdx * 0.6) + bodyBob;
      }

      // Pre-compute final screen positions with 2D rotation matrix
      const screenX: number[] = [];
      const screenY: number[] = [];
      const screenGlow: number[] = [];
      const sinTime = Math.sin(time * 0.003);
      const cosR = Math.cos(rotationAngle);
      const sinR = Math.sin(rotationAngle);

      for (let i = 0; i < scorpioStars.length; i++) {
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
        const glowR = screenGlow[i] * (isHovered ? 1.8 : 1);

        // Radial glow
        const radGrad = ctx.createRadialGradient(sx, sy, s.size * 0.2, sx, sy, glowR);
        radGrad.addColorStop(0, s.glowColor);
        radGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.beginPath();
        ctx.arc(sx, sy, glowR, 0, Math.PI * 2);
        ctx.fillStyle = radGrad;
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(sx, sy, s.size * (isHovered ? 1.3 : 1), 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.fill();

        // Flares on major stars
        if (s.isHeart || s.size >= 5.0) {
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

        ctx.font = "9px Courier New, monospace";
        ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
        ctx.fillText(s.scientificName, sx + textOffsetX + (isOnRightSide ? 5 : -5), sy + (signY * 28));
        if (s.info) {
          ctx.fillText(s.info, sx + textOffsetX + (isOnRightSide ? 5 : -5), sy + (signY * 40));
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
