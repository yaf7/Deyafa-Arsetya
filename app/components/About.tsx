"use client";

import { motion } from "framer-motion";
import { GraduationCap, MapPin, Briefcase, Mail } from "lucide-react";
import { useRef } from "react";



export default function About() {
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
            <span className="text-white">Kenali</span>{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">
              Saya
            </span>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-zinc-400 to-emerald-500 rounded-full" />
          </h2>
          <p className="text-white max-w-2xl mx-auto text-lg mt-6">
            Seorang pembelajar dan pengembang berdedikasi yang fokus pada pembangunan solusi digital fungsional dan andal melalui peningkatan berkelanjutan.
          </p>
        </motion.div>



        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          {/* Profile / Image Side (ID Card Theme) */}
          <motion.div
            initial={{ opacity: 0, y: -200, rotate: -15 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ type: "spring", stiffness: 60, damping: 8, mass: 1, delay: 0.1 }}
            viewport={{ once: true, margin: "-50px" }}
            className="md:col-span-5 relative flex justify-center mt-24 md:mt-12 origin-top"
            style={{ perspective: "1000px" }}
          >
            {/* Lanyard Strap */}
            <div className="absolute -top-20 md:-top-72 left-1/2 -translate-x-1/2 w-4 md:w-6 h-24 md:h-72 bg-gradient-to-r from-emerald-900 via-emerald-600 to-emerald-900 z-0 shadow-[0_0_15px_rgba(147,51,234,0.4)] flex justify-center border-x border-emerald-950">
                {/* Stitching detail */}
                <div className="w-[1px] md:w-[2px] h-full bg-white/20 border-l border-black/40 border-dashed" />
            </div>

            {/* The ID Card */}
            <motion.div 
              whileHover={{ rotateY: 10, rotateX: 5 }}
              transition={{ type: "spring", stiffness: 100, damping: 10 }}
              className="relative w-full max-w-[220px] sm:max-w-[260px] md:max-w-[280px] bg-white/5 backdrop-blur-xl rounded-[1.5rem] p-3 md:p-4 shadow-2xl shadow-emerald-900/40 flex flex-col items-center border border-white/20 z-10"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Lanyard Clip */}
              <div className="absolute -top-4 md:-top-5 left-1/2 -translate-x-1/2 w-6 md:w-8 h-8 md:h-10 bg-gradient-to-b from-zinc-200 to-zinc-400 rounded-md z-20 shadow-xl border border-zinc-500 flex flex-col items-center justify-end pb-1 md:pb-1.5">
                 <div className="w-2 md:w-3 h-2 md:h-3 border-2 md:border-[3px] border-zinc-700 rounded-full" />
              </div>

              {/* Hole punch */}
              <div className="w-10 md:w-12 h-2 md:h-2.5 bg-black/60 rounded-full mt-2 md:mt-3 mb-4 md:mb-5 shadow-[inset_0_3px_6px_rgba(0,0,0,0.8)] border border-white/10" />
              
              {/* Profile image container */}
              <div className="w-full aspect-[4/5] rounded-xl overflow-hidden relative shadow-2xl border-4 border-white/10 mb-4 md:mb-5 bg-zinc-900 group" style={{ transform: "translateZ(30px)" }}>
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/30 to-teal-600/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 mix-blend-overlay" />
                <span className="text-4xl md:text-6xl font-black text-white/5 uppercase select-none tracking-tighter absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">DEYAFA</span>
                <img src="/foto-aboutme.png" alt="Deyafa Arsetya Profile" className="w-full h-full object-cover object-top filter grayscale group-hover:grayscale-0 transition-all duration-700 relative z-0 opacity-90" />
              </div>
              
              {/* ID Details */}
              <div className="w-full flex-grow flex flex-col items-center text-center pb-1 md:pb-2" style={{ transform: "translateZ(20px)" }}>
                <h3 className="text-lg sm:text-xl md:text-2xl font-black text-white tracking-wide uppercase whitespace-nowrap">Deyafa Arsetya</h3>
              </div>
            </motion.div>
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
              <span className="text-white">&quot;Membangun Kapabilitas dari Titik Nol.&quot;</span>
            </h3>
            <p className="text-white text-lg leading-relaxed mb-4">
              Perjalanan saya di dunia teknologi tidak dimulai dengan bakat instan, melainkan dari selembar kertas kosong. Mengawali langkah di Manajemen Informatika POLINEMA tanpa latar belakang pemrograman adalah tantangan sekaligus pembuktian dedikasi saya.
            </p>
            <p className="text-white text-base leading-relaxed mb-8">
              Bagi saya, keterbatasan adalah ruang untuk bertumbuh. Melalui disiplin dan ribuan jam eksperimen, saya mentransformasi rasa ingin tahu menjadi kompetensi nyata. Kini, sebagai Web & Mobile Developer, System Analyst, dan Data Analyst berbasis di Kediri, saya berdedikasi menciptakan solusi digital yang presisi dan berdampak. Saya tidak hanya menulis kode; saya merancang solusi digital yang lebih cerdas.
            </p>

            {/* Bento Information Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative">

              {/* Education Card */}
              <div className="bento-card p-6 group">
                <div className="w-10 h-10 rounded-lg bg-teal-500/10 flex items-center justify-center text-teal-400 mb-4 group-hover:scale-110 group-hover:bg-teal-500/20 transition-all duration-500 ease-out">
                  <GraduationCap size={20} />
                </div>
                <h4 className="font-display text-xl font-bold text-white mb-2">Pendidikan</h4>
                <p className="text-sm text-white mb-1">DIII - Manajemen Informatika</p>
                <p className="text-xs text-emerald-400 font-medium">Politeknik Negeri Malang</p>
                <p className="text-xs text-white">Kampus Kediri</p>
              </div>

              {/* Location Card */}
              <div className="bento-card p-6 group">
                <div className="w-10 h-10 rounded-lg bg-zinc-400/10 flex items-center justify-center text-white mb-4 group-hover:scale-110 group-hover:bg-zinc-400/20 transition-all duration-500 ease-out">
                  <MapPin size={20} />
                </div>
                <h4 className="font-display text-xl font-bold text-white mb-2">Lokasi</h4>
                <p className="text-sm text-white mb-1">Kediri, Indonesia</p>
                <p className="text-xs text-white">Siap bekerja remote</p>
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
                  <p className="text-xs text-white uppercase font-bold tracking-widest mb-1">Mari Terhubung</p>
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
