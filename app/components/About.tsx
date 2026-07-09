"use client";

import { motion } from "framer-motion";
import { GraduationCap, MapPin, Briefcase, Mail } from "lucide-react";
import { useRef } from "react";
import { useLanguage } from "../context/LanguageContext";

export default function About() {
  const { t } = useLanguage();
  return (
    <section id="about" className="py-24 relative overflow-hidden bg-transparent">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-2xl sm:text-3xl md:text-5xl font-black mb-4 uppercase tracking-wider relative inline-block">
            <span className="text-white">{t("about.title1")}</span>{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">
              {t("about.title2")}
            </span>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-zinc-400 to-emerald-500 rounded-full" />
          </h2>
          <p className="text-white max-w-2xl mx-auto text-lg mt-6">
            {t("about.desc")}
          </p>
        </motion.div>



        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          {/* Profile / Image Side (Elegant Glass Badge Theme with Aesthetic Lanyard) */}
          <motion.div
            initial={{ opacity: 0, y: -100, rotateZ: -20, rotateX: 30 }}
            whileInView={{ opacity: 1, y: 0, rotateZ: 0, rotateX: 0 }}
            transition={{ type: "spring", stiffness: 45, damping: 6, mass: 1.2, delay: 0.1 }}
            viewport={{ once: true, margin: "-50px" }}
            className="md:col-span-5 relative flex justify-center mt-24 md:mt-12 origin-top will-change-transform"
            style={{ perspective: "1000px" }}
          >
            {/* Relaxed Draped Lanyard (Curves to the left to avoid text) */}
            <div className="absolute bottom-[calc(100%-20px)] md:bottom-[calc(100%-24px)] left-1/2 -translate-x-1/2 w-[400px] md:w-[600px] h-[300px] md:h-[450px] z-0 pointer-events-none">
              <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMax slice" className="w-full h-full overflow-visible">
                <defs>
                  <pattern id="woven" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                    <rect width="6" height="6" fill="#064e3b" />
                    <line x1="0" y1="0" x2="0" y2="6" stroke="#022c22" strokeWidth="2.5" />
                    <line x1="0" y1="0" x2="6" y2="0" stroke="#022c22" strokeWidth="1" opacity="0.6" />
                  </pattern>
                  <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="2" dy="10" stdDeviation="8" floodColor="#000" floodOpacity="0.8"/>
                  </filter>
                  <linearGradient id="metalGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3f3f46" />
                    <stop offset="20%" stopColor="#e4e4e7" />
                    <stop offset="50%" stopColor="#ffffff" />
                    <stop offset="80%" stopColor="#a1a1aa" />
                    <stop offset="100%" stopColor="#27272a" />
                  </linearGradient>
                </defs>

                {/* SINGLE CONTINUOUS LOOP STRAP (Joined together, stretched long) */}
                <g filter="url(#shadow)">
                  {/* Edge border */}
                  <path d="M 195,260 C 50,290 -60,250 -60,180 C -60,110 50,230 205,260" fill="none" stroke="#011a14" strokeWidth="20" strokeLinecap="round" strokeLinejoin="round" />
                  {/* Stitching */}
                  <path d="M 195,260 C 50,290 -60,250 -60,180 C -60,110 50,230 205,260" fill="none" stroke="#34d399" strokeWidth="16" strokeDasharray="3 4" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
                  {/* Inner Woven Fabric */}
                  <path d="M 195,260 C 50,290 -60,250 -60,180 C -60,110 50,230 205,260" fill="none" stroke="url(#woven)" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" />
                  {/* Center fold/highlight */}
                  <path d="M 195,260 C 50,290 -60,250 -60,180 C -60,110 50,230 205,260" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.08" />
                </g>

                {/* METAL CRIMP BINDER */}
                <g filter="url(#shadow)">
                  <rect x="180" y="250" width="40" height="30" rx="5" fill="url(#metalGrad)" />
                  <rect x="180" y="250" width="40" height="30" rx="5" fill="none" stroke="#71717a" strokeWidth="1" />
                  <line x1="184" y1="255" x2="216" y2="255" stroke="#fff" strokeOpacity="0.8" strokeWidth="1" />
                  <line x1="184" y1="258" x2="216" y2="258" stroke="#000" strokeOpacity="0.2" strokeWidth="1" />
                  <line x1="184" y1="275" x2="216" y2="275" stroke="#000" strokeOpacity="0.5" strokeWidth="1" />
                  <circle cx="200" cy="268" r="3.5" fill="#18181b" />
                  <circle cx="200" cy="268" r="4.5" fill="none" stroke="#52525b" strokeWidth="1" />
                </g>
              </svg>
            </div>

            {/* Titanium Ring / Connector */}
            <div className="absolute -top-5 md:-top-6 left-1/2 -translate-x-1/2 w-8 md:w-10 h-10 md:h-12 border-[4px] md:border-[5px] border-zinc-300 rounded-full z-20 shadow-[0_10px_20px_rgba(0,0,0,0.5),inset_0_2px_4px_rgba(255,255,255,0.8)] bg-transparent" style={{ transform: "translateZ(10px) rotateX(20deg)" }} />

            {/* The Elegant Glass Card */}
            <motion.div 
              whileHover={{ rotateY: 10, rotateX: 5, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              className="relative w-full max-w-[260px] md:max-w-[300px] bg-white/5 backdrop-blur-xl rounded-[2rem] p-5 pt-7 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/20 flex flex-col items-center z-10 group overflow-hidden mt-3 will-change-transform"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Pill-shaped Hole cutout for the ring */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-10 h-2 bg-[#0B1120] rounded-full shadow-[inset_0_2px_5px_rgba(0,0,0,0.8)] border border-white/10 z-20" />

              {/* Subtle ambient glow inside the card */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-transparent to-teal-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0" />
              
              {/* Profile image container */}
              <div className="w-full aspect-[4/5] rounded-2xl overflow-hidden relative shadow-2xl mb-6 bg-zinc-900 border border-white/10 z-10" style={{ transform: "translateZ(30px)" }}>
                {/* Hover overlay color */}
                <div className="absolute inset-0 bg-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay z-10" />
                <img src="/foto-aboutme.png" alt="Deyafa Arsetya Profile" className="w-full h-full object-cover object-top filter grayscale group-hover:grayscale-0 transition-all duration-700 relative z-0 scale-105 group-hover:scale-100" />
              </div>
              
              {/* Details Container */}
              <div className="w-full flex flex-col items-start text-left z-10" style={{ transform: "translateZ(20px)" }}>
                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-none mb-1 group-hover:text-emerald-300 transition-colors duration-500">
                  Deyafa<br/>Arsetya
                </h3>
                <p className="text-sm text-zinc-400 font-medium group-hover:text-teal-400 transition-colors duration-500">Developer & Analyst</p>
                
                {/* Decorative Line */}
                <div className="mt-5 flex gap-1.5 opacity-50 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="w-10 h-1.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full" />
                  <span className="w-2 h-1.5 bg-teal-500 rounded-full" />
                  <span className="w-2 h-1.5 bg-teal-500/50 rounded-full" />
                </div>
              </div>

              {/* Glass Reflection (Top Corner) */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/20 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-20 pointer-events-none" />
            </motion.div>

            {/* Floating particles behind the card for depth */}
            <div className="absolute top-10 -left-4 w-12 h-12 bg-emerald-500/20 blur-xl rounded-full pointer-events-none" />
            <div className="absolute bottom-10 -right-4 w-16 h-16 bg-teal-500/20 blur-xl rounded-full pointer-events-none" />
          </motion.div>

          {/* Details Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true }}
            className="md:col-span-7 flex flex-col justify-center"
          >
            <h3 className="font-display text-3xl md:text-4xl font-bold mb-6 leading-tight">
              <span className="text-white">{t("about.quote")}</span>
            </h3>
            <p className="text-white text-lg leading-relaxed mb-4">
              {t("about.p1")}
            </p>
            <p className="text-white text-base leading-relaxed mb-8">
              {t("about.p2")}
            </p>

            {/* Bento Information Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative">

              {/* Education Card */}
              <div className="bento-card p-6 group">
                <div className="w-10 h-10 rounded-lg bg-teal-500/10 flex items-center justify-center text-teal-400 mb-4 group-hover:scale-110 group-hover:bg-teal-500/20 transition-all duration-500 ease-out">
                  <GraduationCap size={20} />
                </div>
                <h4 className="font-display text-xl font-bold text-white mb-2">{t("about.edu")}</h4>
                <p className="text-sm text-white mb-1">{t("about.eduSub")}</p>
                <p className="text-xs text-emerald-400 font-medium">Politeknik Negeri Malang</p>
                <p className="text-xs text-white">Kampus Kediri</p>
              </div>

              {/* Location Card */}
              <div className="bento-card p-6 group">
                <div className="w-10 h-10 rounded-lg bg-zinc-400/10 flex items-center justify-center text-white mb-4 group-hover:scale-110 group-hover:bg-zinc-400/20 transition-all duration-500 ease-out">
                  <MapPin size={20} />
                </div>
                <h4 className="font-display text-xl font-bold text-white mb-2">{t("about.loc")}</h4>
                <p className="text-sm text-white mb-1">{t("about.locSub")}</p>
                <p className="text-xs text-white">{t("about.locSub2")}</p>
              </div>

              {/* Contact Email in Card Format */}
              <a
                href="mailto:yafaarsetya@gmail.com"
                className="bento-card p-6 group sm:col-span-2 flex items-center gap-5 cursor-pointer"
              >
                <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/30 group-hover:scale-110 group-hover:shadow-emerald-500/50 transition-all duration-500 ease-out">
                  <Mail size={22} />
                </div>
                <div>
                  <p className="text-xs text-white uppercase font-bold tracking-widest mb-1">{t("about.contact")}</p>
                  <p className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors duration-500 ease-out">yafaarsetya@gmail.com</p>
                </div>
                {/* Arrow indicator */}
                <div className="ml-auto text-white group-hover:text-emerald-400 group-hover:translate-x-1 transition-all duration-500">
                  →
                </div>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
