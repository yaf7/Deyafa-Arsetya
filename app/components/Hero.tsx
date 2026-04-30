"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useEffect, useState, useRef } from "react";

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

      <div className="container mx-auto px-6 z-10 text-center flex flex-col items-center">
        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
          className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 mb-10"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          <span className="text-sm font-medium text-emerald-200 tracking-wide uppercase">Open for Collaboration</span>
        </motion.div>

        {/* Animated Name — Letter by Letter */}
        <div className="relative mb-6" style={{ perspective: "1000px" }}>
          {/* First name */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-none">
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
            <span className="block md:translate-x-8">
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
        <motion.h2
          className="text-lg md:text-2xl text-gray-400 font-light mb-8 md:mb-12 max-w-2xl mx-auto h-8 flex items-center justify-center gap-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.8 }}
        >
          <span>{displayed}</span>
          <span 
            className={`inline-block w-[2px] h-6 bg-purple-400 ml-1 ${done ? 'opacity-0' : ''}`}
            style={{ animation: started && !done ? 'typing-cursor 0.7s infinite' : 'none' }}
          />
        </motion.h2>

        {/* CTA Button */}
        <motion.div
          className="flex justify-center mb-16 md:mb-20"
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

      {/* Floating 3D-like elements — react to mouse */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ x: springX, y: springY }}
        className="absolute top-[15%] md:top-1/4 right-[5%] md:right-[10%] w-20 h-20 md:w-32 md:h-32 rounded-full glass border border-white/10 flex items-center justify-center z-[0] transform rotate-12 opacity-60 md:opacity-100"
      >
        <div className="w-10 h-10 md:w-16 md:h-16 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full opacity-50 blur-lg absolute" />
        <span className="text-2xl md:text-4xl font-black text-white/30 select-none">UI</span>
      </motion.div>

      <motion.div
        animate={{
          y: [0, 30, 0],
          rotate: [0, -10, 0],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ x: springX, y: springY }}
        className="absolute bottom-1/4 md:bottom-1/3 left-[5%] md:left-[10%] w-20 h-20 md:w-32 md:h-32 rounded-full glass border border-white/10 flex items-center justify-center z-[0] transform -rotate-12 opacity-60 md:opacity-100"
      >
        <div className="w-10 h-10 md:w-16 md:h-16 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-full opacity-50 blur-lg absolute" />
        <span className="text-2xl md:text-4xl font-black text-white/30 select-none">&lt;/&gt;</span>
      </motion.div>

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
