"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";

// Typing effect hook
function useTypingEffect(text: string, speed = 80, startDelay = 1800) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const delayTimer = setTimeout(() => setStarted(true), startDelay);
    return () => clearTimeout(delayTimer);
  }, [startDelay]);

  useEffect(() => {
    if (!started) return;
    if (displayed.length < text.length) {
      const timer = setTimeout(() => {
        setDisplayed(text.slice(0, displayed.length + 1));
      }, speed);
      return () => clearTimeout(timer);
    }
  }, [displayed, text, speed, started]);

  return { displayed, done: displayed.length === text.length, started };
}

// Letter animation variants
const letterVariants = {
  hidden: { opacity: 0, y: 40, rotateX: -90 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      delay: 0.3 + i * 0.05,
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
};

// Floating tech badge data
const TECH_BADGES = [
  {
    name: "React",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
    color: "#61DAFB",
    glow: "rgba(97,218,251,0.35)",
    pos: "top-[10%] right-[1%] md:top-[10%] md:right-[2%]",
    delay: 0,
    duration: 11,
    spin: true,
  },
  {
    name: "Laravel",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg",
    color: "#FF2D20",
    glow: "rgba(255,45,32,0.35)",
    pos: "bottom-[22%] right-[1%] md:bottom-[20%] md:right-[2%]",
    delay: 2,
    duration: 14,
    spin: false,
  },
  {
    name: "Kotlin",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kotlin/kotlin-original.svg",
    color: "#7F52FF",
    glow: "rgba(127,82,255,0.35)",
    pos: "bottom-[8%] left-[1%] md:bottom-[12%] md:left-[2%]",
    delay: 4,
    duration: 13,
    spin: false,
  },
  {
    name: "Next.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
    color: "#ffffff",
    glow: "rgba(255,255,255,0.2)",
    pos: "top-[10%] left-[1%] md:top-[12%] md:left-[2%]",
    delay: 1,
    duration: 16,
    spin: false,
  },
];

export default function Hero() {
  const firstName = "DEYAFA";
  const lastName = "ARSETYA";
  const { displayed, done, started } = useTypingEffect("Web & Mobile Developer", 70, 2200);

  // Mouse parallax for floating elements
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 30;
      const y = (e.clientY / window.innerHeight - 0.5) * 30;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [mouseX, mouseY]);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Aurora Background */}
      <div className="aurora-bg" />

      {/* Additional floating gradient orbs */}
      <motion.div
        style={{ x: springX, y: springY }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] pointer-events-none"
      />
      <motion.div
        style={{ x: springX, y: springY }}
        className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none"
      />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Floating Tech Badges */}
      {TECH_BADGES.map((badge) => (
        <motion.div
          key={badge.name}
          animate={{ y: [0, -18, 0], rotate: [0, badge.spin ? 360 : 4, badge.spin ? 720 : 0] }}
          transition={{
            duration: badge.duration,
            repeat: Infinity,
            ease: badge.spin ? "linear" : "easeInOut",
            delay: badge.delay,
          }}
          style={{ x: springX, y: springY }}
          className={`absolute ${badge.pos} z-[5] opacity-75 md:opacity-90`}
        >
          <div
            className="flex flex-col items-center gap-1.5 p-3 md:p-4 rounded-2xl glass border border-white/10 backdrop-blur-md shadow-xl"
            style={{ boxShadow: `0 8px 32px ${badge.glow}, 0 0 0 1px rgba(255,255,255,0.05)` }}
          >
            <div className="relative">
              <div
                className="absolute inset-0 rounded-full blur-xl opacity-60"
                style={{ backgroundColor: badge.color }}
              />
              <img
                src={badge.icon}
                alt={badge.name}
                className={`w-7 h-7 md:w-10 md:h-10 relative z-10 ${badge.name === "Next.js" ? "filter invert" : ""}`}
              />
            </div>
            <span
              className="text-[9px] md:text-[11px] font-black uppercase tracking-widest"
              style={{ color: badge.color }}
            >
              {badge.name}
            </span>
          </div>
        </motion.div>
      ))}

      {/* ============ MAIN CONTENT — Two Column Layout ============ */}
      <div className="container mx-auto px-6 z-10">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">

          {/* MOBILE ONLY: Small centered photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="lg:hidden flex-shrink-0 flex items-center justify-center mt-2"
          >
            <div className="relative w-[120px] h-[120px]">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full"
                style={{ background: "conic-gradient(from 0deg, #7c3aed, #4f46e5, #06b6d4, #7c3aed)", padding: "2px" }}
              >
                <div className="w-full h-full rounded-full bg-[#0B1120]" />
              </motion.div>
              <div className="absolute inset-[4px] rounded-full overflow-hidden">
                <img src="/Foto-Deyafa-Arsetya.jpg" alt="Deyafa Arsetya" className="w-full h-full object-cover object-top grayscale hover:grayscale-0 transition-all duration-700" />
              </div>
            </div>
          </motion.div>

          {/* LEFT: Text Content */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left flex-1 min-w-0">
            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 mb-6"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="text-xs font-medium text-emerald-200 tracking-wide uppercase">Open for Collaboration</span>
            </motion.div>

            {/* Animated Name — Letter by Letter */}
            <div className="relative mb-6" style={{ perspective: "1000px" }}>
              {/* First name */}
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-none">
                <span className="block mb-1">
                  {firstName.split("").map((letter, i) => (
                    <motion.span
                      key={`first-${i}`}
                      custom={i}
                      variants={letterVariants}
                      initial="hidden"
                      animate="visible"
                      className="inline-block text-white"
                      style={{ transformOrigin: "bottom" }}
                    >
                      {letter}
                    </motion.span>
                  ))}
                </span>

                {/* Last name with gradient */}
                <span className="block lg:translate-x-2">
                  {lastName.split("").map((letter, i) => (
                    <motion.span
                      key={`last-${i}`}
                      custom={i + firstName.length}
                      variants={letterVariants}
                      initial="hidden"
                      animate="visible"
                      className="inline-block gradient-accent bg-clip-text text-transparent"
                      style={{ transformOrigin: "bottom" }}
                    >
                      {letter}
                    </motion.span>
                  ))}
                </span>
              </h1>

              {/* Decorative animated line under name */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1.2, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent mt-4 origin-left"
              />
            </div>

            {/* Typing Effect Subtitle */}
            <motion.p
              className="text-base md:text-xl text-gray-400 font-light mb-6 h-8 flex items-center gap-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.8 }}
            >
              <span>{displayed}</span>
              <span
                className={`inline-block w-[2px] h-6 bg-purple-400 ml-1 ${done ? 'opacity-0' : ''}`}
                style={{ animation: started && !done ? 'typing-cursor 0.7s infinite' : 'none' }}
              />
            </motion.p>

            {/* CTA Button */}
            <motion.div
              className="flex justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 2.8 }}
            >
              <a
                href="#projects"
                className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-500 ease-out bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.2)] overflow-hidden"
              >
                <span className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent transition-all duration-700 ease-out group-hover:h-full group-hover:opacity-10 opacity-0" />
                <span className="relative flex items-center gap-2">
                  View Projects <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-500 ease-out" />
                </span>
              </a>
            </motion.div>
          </div>

          {/* RIGHT: Profile Photo — Desktop only */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, x: 60 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            className="relative flex-shrink-0 hidden lg:flex items-center justify-center"
          >
            {/* Outer glowing ring */}
            <div className="relative w-[260px] h-[260px] xl:w-[310px] xl:h-[310px]">
              {/* Rotating gradient border */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full"
                style={{
                  background: "conic-gradient(from 0deg, #7c3aed, #4f46e5, #06b6d4, #7c3aed)",
                  padding: "3px",
                }}
              >
                <div className="w-full h-full rounded-full bg-[#0B1120]" />
              </motion.div>

              {/* Static glow behind photo */}
              <div
                className="absolute inset-0 rounded-full hero-photo-ring"
                style={{ background: "radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)" }}
              />

              {/* Actual Photo */}
              <div className="absolute inset-[6px] rounded-full overflow-hidden border-2 border-purple-500/20">
                <Image
                  src="/Foto-Deyafa-Arsetya.jpg"
                  alt="Deyafa Arsetya"
                  fill
                  className="object-cover object-top grayscale hover:grayscale-0 transition-all duration-700 scale-110"
                  priority
                />
              </div>

              {/* Floating status chip */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-5 left-1/2 -translate-x-1/2 glass border border-white/15 px-4 py-2 rounded-full flex items-center gap-2 shadow-xl whitespace-nowrap"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-xs font-bold text-white tracking-wide">Available for Work</span>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-gray-500 font-medium">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border border-white/20 flex justify-center pt-1.5"
        >
          <motion.div className="w-1 h-1.5 bg-white/40 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
