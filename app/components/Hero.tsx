"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { useLanguage } from "../context/LanguageContext";

const SocialIcon = ({ type }: { type: string }) => {
  switch (type) {
    case "linkedin":
      return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>;
    case "github":
      return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>;
    case "instagram":
      return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>;
    case "email":
      return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>;
    default:
      return null;
  }
};

function MagneticButton({ children, href, className, target, rel }: { children: React.ReactNode; href: string; className?: string; target?: string; rel?: string }) {
  const ref = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
  };

  const handleMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0, 0)";
  };

  return (
    <a
      ref={ref}
      href={href}
      target={target}
      rel={rel}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transition: "transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)" }}
    >
      {children}
    </a>
  );
}

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

// Orbital planet/satellite data
const ORBITING_PLANETS = [
  { size: 12, color: "#a1a1aa", glow: "rgba(161,161,170,0.5)", orbitSize: 155, duration: 8, delay: 0 },
  { size: 16, color: "#10b981", glow: "rgba(16,185,129,0.5)", orbitSize: 175, duration: 12, delay: -3 },
  { size: 10, color: "#06b6d4", glow: "rgba(6,182,212,0.4)", orbitSize: 200, duration: 16, delay: -7 },
  { size: 8, color: "#d4d4d8", glow: "rgba(212,212,216,0.4)", orbitSize: 140, duration: 10, delay: -5 },
  { size: 6, color: "#34d399", glow: "rgba(52,211,153,0.4)", orbitSize: 220, duration: 20, delay: -2 },
  { size: 5, color: "#71717a", glow: "rgba(113,113,122,0.3)", orbitSize: 240, duration: 25, delay: -10 },
];

export default function Hero() {
  const { t } = useLanguage();
  const firstName = "DEYAFA";
  const lastName = "ARSETYA";
  const { displayed, done, started } = useTypingEffect(t("hero.subtitle"), 70, 2200);

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
        className="absolute top-1/4 left-1/4 w-72 h-72 bg-emerald-600/15 rounded-full blur-[70px] pointer-events-none"
      />
      <motion.div
        style={{ x: springX, y: springY }}
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-teal-600/8 rounded-full blur-[80px] pointer-events-none"
      />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />



      {/* ============ MAIN CONTENT — Two Column Layout ============ */}
      <div className="container mx-auto px-6 z-10">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">

          {/* MOBILE ONLY: Small centered photo with mini orbits */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="lg:hidden flex-shrink-0 flex items-center justify-center mt-2"
          >
            <div className="relative w-[160px] h-[160px]">
              {/* Mobile orbit rings */}
              {[70, 88, 106, 124].map((r, i) => (
                <div
                  key={i}
                  className="absolute rounded-full pointer-events-none"
                  style={{
                    width: `${r * 2}px`,
                    height: `${r * 2}px`,
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    border: `1px solid rgba(255,255,255,0.12)`,
                  }}
                />
              ))}
              {/* Mobile orbiting dots — scaled down */}
              {ORBITING_PLANETS.slice(0, 4).map((planet, i) => {
                const mobileOrbit = 70 + i * 18; // 70, 88, 106, 124
                return (
                  <div
                    key={i}
                    className="absolute left-1/2 top-1/2 pointer-events-none"
                    style={{
                      width: `${mobileOrbit * 2}px`,
                      height: `${mobileOrbit * 2}px`,
                      marginLeft: `${-mobileOrbit}px`,
                      marginTop: `${-mobileOrbit}px`,
                      animation: `orbit ${planet.duration}s linear infinite`,
                      animationDelay: `${planet.delay}s`,
                    }}
                  >
                    <div
                      className="rounded-full"
                      style={{
                        width: `${Math.max(planet.size * 0.6, 4)}px`,
                        height: `${Math.max(planet.size * 0.6, 4)}px`,
                        backgroundColor: planet.color,
                        boxShadow: `0 0 ${planet.size}px ${planet.glow}`,
                      }}
                    />
                  </div>
                );
              })}
              {/* Rotating border */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[16px] rounded-full"
                style={{ background: "conic-gradient(from 0deg, #059669, #14b8a6, #06b6d4, #059669)", padding: "2px" }}
              >
                <div className="w-full h-full rounded-full bg-[#0B1120]" />
              </motion.div>
              {/* Photo */}
              <div className="absolute inset-[20px] rounded-full overflow-hidden">
                <Image
                  src="/Foto-Deyafa-Arsetya.jpg"
                  alt="Deyafa Arsetya"
                  fill
                  className="object-cover object-top grayscale hover:grayscale-0 transition-all duration-700"
                  priority
                  sizes="(max-width: 768px) 160px, 0vw"
                />
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
              <span className="text-xs font-medium text-emerald-200 tracking-wide uppercase">{t("hero.available")}</span>
            </motion.div>

            {/* Animated Name — Letter by Letter */}
            <div className="relative mb-6" style={{ perspective: "1000px" }}>
              {/* First name */}
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-none">
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
                className="h-[2px] bg-gradient-to-r from-transparent via-emerald-500 to-transparent mt-4 origin-left"
              />
            </div>

            {/* Typing Effect Subtitle */}
            <motion.p
              className="text-base md:text-xl text-white font-light mb-6 h-8 flex items-center gap-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.8 }}
            >
              <span>{displayed}</span>
              <span
                className={`inline-block w-[2px] h-6 bg-emerald-400 ml-1 ${done ? 'opacity-0' : ''}`}
                style={{ animation: started && !done ? 'typing-cursor 0.7s infinite' : 'none' }}
              />
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-6 mt-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 2.8 }}
            >
              <a
                href="#projects"
                className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-500 ease-out bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:border-emerald-500/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.2)] overflow-hidden"
              >
                <span className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-500 to-transparent transition-all duration-700 ease-out group-hover:h-full group-hover:opacity-10 opacity-0" />
                <span className="relative flex items-center gap-2">
                  {t("hero.viewProjects")} <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-500 ease-out" />
                </span>
              </a>

              {/* Social Buttons */}
              <div className="flex gap-4">
                {[
                  { type: "linkedin", href: "https://www.linkedin.com/in/deyafa-arsetya", label: "LinkedIn" },
                  { type: "github", href: "https://github.com/yaf7", label: "GitHub" },
                  { type: "instagram", href: "https://www.instagram.com/_deyafaarsetya", label: "Instagram" },
                  { type: "email", href: "mailto:yafaarsetya@gmail.com", label: "Email" },
                ].map(({ type, href }) => (
                  <MagneticButton
                    key={type}
                    href={href}
                    target={type !== "email" ? "_blank" : undefined}
                    rel={type !== "email" ? "noopener noreferrer" : undefined}
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-full glass flex items-center justify-center text-white hover:text-white hover:bg-zinc-600/80 border border-white/5 hover:border-zinc-400 transition-colors duration-500 hover:shadow-[0_0_25px_rgba(161,161,170,0.3)]"
                  >
                    <SocialIcon type={type} />
                  </MagneticButton>
                ))}
              </div>
            </motion.div>
          </div>

          {/* RIGHT: Profile Photo with Orbital System — Desktop only */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, x: 60 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            className="relative flex-shrink-0 hidden lg:flex items-center justify-center"
          >
            <div className="relative w-[260px] h-[260px] xl:w-[310px] xl:h-[310px]">

              {/* Orbit ring lines (decorative) */}
              {[140, 155, 175, 200, 220, 240].map((r, i) => (
                <div
                  key={i}
                  className="absolute rounded-full border pointer-events-none"
                  style={{
                    width: `${r * 2}px`,
                    height: `${r * 2}px`,
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    borderColor: `rgba(255,255,255,0.1)`,
                  }}
                />
              ))}

              {/* Orbiting Planets / Satellites */}
              {ORBITING_PLANETS.map((planet, i) => (
                <div
                  key={i}
                  className="absolute left-1/2 top-1/2 pointer-events-none z-[5]"
                  style={{
                    width: `${planet.orbitSize * 2}px`,
                    height: `${planet.orbitSize * 2}px`,
                    marginLeft: `${-planet.orbitSize}px`,
                    marginTop: `${-planet.orbitSize}px`,
                    animation: `orbit ${planet.duration}s linear infinite`,
                    animationDelay: `${planet.delay}s`,
                  }}
                >
                  <div className="relative">
                    <div
                      className="rounded-full"
                      style={{
                        width: `${planet.size}px`,
                        height: `${planet.size}px`,
                        backgroundColor: planet.color,
                        boxShadow: `0 0 ${planet.size * 2}px ${planet.glow}, 0 0 ${planet.size * 4}px ${planet.glow.replace(/[\d.]+\)$/, '0.2)')}`,
                      }}
                    />
                  </div>
                </div>
              ))}

              {/* Rotating gradient border */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full"
                style={{
                  background: "conic-gradient(from 0deg, #059669, #14b8a6, #06b6d4, #059669)",
                  padding: "3px",
                }}
              >
                <div className="w-full h-full rounded-full bg-[#0B1120]" />
              </motion.div>

              {/* Static glow behind photo */}
              <div
                className="absolute inset-0 rounded-full hero-photo-ring"
                style={{ background: "radial-gradient(circle, rgba(5,150,105,0.15) 0%, transparent 70%)" }}
              />

              {/* Actual Photo */}
              <div className="absolute inset-[6px] rounded-full overflow-hidden border-2 border-emerald-500/20">
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
                className="absolute -bottom-5 left-1/2 -translate-x-1/2 glass border border-white/15 px-4 py-2 rounded-full flex items-center gap-2 shadow-xl whitespace-nowrap z-10"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-xs font-bold text-white tracking-wide">{t("hero.availableToWork")}</span>
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
        <span className="text-[10px] uppercase tracking-[0.3em] text-white font-medium">{t("hero.scroll")}</span>
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
