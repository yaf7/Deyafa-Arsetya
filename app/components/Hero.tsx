"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Background glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 z-10 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
          <span className="text-sm font-medium text-purple-200 tracking-wide uppercase">Open for Collaboration</span>
        </motion.div>

        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6 relative"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.4 }}
        >
          <span className="block text-white">DEYAFA</span>
          <span className="block gradient-accent bg-clip-text text-transparent transform md:translate-x-12">ARSETYA</span>

          {/* Subtle 3D shadow effect text behind */}
          <span className="absolute -inset-1 text-transparent font-black stroke-1 stroke-white/5 blur-sm -z-10 select-none hidden md:block">
            DEYAFA ARSETYA
          </span>
        </motion.h1>

        <motion.h2
          className="text-xl md:text-2xl text-gray-400 font-light mb-10 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.6 }}
        >
          Web & Mobile Developer
        </motion.h2>

        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.8 }}
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

      {/* Floating 3D-like elements */}
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
        className="absolute bottom-1/4 md:bottom-1/3 left-[5%] md:left-[10%] w-20 h-20 md:w-32 md:h-32 rounded-full glass border border-white/10 flex items-center justify-center z-[0] transform -rotate-12 opacity-60 md:opacity-100"
      >
        <div className="w-10 h-10 md:w-16 md:h-16 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-full opacity-50 blur-lg absolute" />
        <span className="text-2xl md:text-4xl font-black text-white/30 select-none">&lt;/&gt;</span>
      </motion.div>
    </section>
  );
}
