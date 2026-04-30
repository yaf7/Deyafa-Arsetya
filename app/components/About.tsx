"use client";

import { motion, useInView } from "framer-motion";
import { GraduationCap, MapPin, Briefcase, Mail, Code2, FolderGit2 } from "lucide-react";
import { useRef, useEffect, useState } from "react";

// Animated counter hook
function useCounter(target: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);

  return { count, ref };
}

export default function About() {
  const stat1 = useCounter(4, 1500);
  const stat2 = useCounter(2, 1500);
  const stat3 = useCounter(1, 1500);

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-transparent">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-4 uppercase tracking-wider relative inline-block">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-600">Me</span>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 bg-purple-600 rounded-full" />
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg mt-6">
            A dedicated learner and developer focused on building functional, reliable digital solutions through continuous improvement.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          {/* Profile / Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            viewport={{ once: true }}
            className="md:col-span-5 relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl blur opacity-30 group-hover:opacity-70 transition duration-500" />
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden glass border border-white/10 flex items-center justify-center p-1 bg-black/40">
              {/* Profile image */}
              <div className="w-full h-full bg-zinc-900 rounded-xl overflow-hidden relative group-hover:scale-[1.02] transition-transform duration-500 flex items-center justify-center">
                <span className="text-9xl font-black text-white/5 uppercase select-none tracking-tighter absolute">DEYAFA</span>
                <img src="/Foto-Deyafa-Arsetya.jpg" alt="Deyafa Arsetya Profile" className="w-full h-full object-cover object-top filter grayscale hover:grayscale-0 transition-all duration-700 blend-luminosity opacity-80" />
              </div>
            </div>
            {/* 3D floating badge */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 right-2 md:-right-6 glass border border-white/20 p-3 md:p-4 rounded-2xl shadow-2xl bg-black/80 flex items-center gap-3 md:gap-4 max-w-[280px] md:max-w-none"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-purple-600/20 flex items-center justify-center text-purple-400 flex-shrink-0">
                <Briefcase size={20} className="md:w-6 md:h-6" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] md:text-xs text-gray-400 uppercase font-bold tracking-wider">Experience</p>
                <p className="font-bold text-white text-sm md:text-lg truncate">Web & Mobile Developer</p>
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
            <h3 className="text-3xl md:text-4xl font-bold mb-6 text-white leading-tight">
              &quot;Membangun Kapabilitas dari Titik Nol.&quot;
            </h3>
            <p className="text-gray-400 text-lg leading-relaxed mb-4">
              Perjalanan saya di dunia teknologi tidak dimulai dengan bakat instan, melainkan dari selembar kertas kosong. Mengawali langkah di Manajemen Informatika POLINEMA tanpa latar belakang pemrograman adalah tantangan sekaligus pembuktian dedikasi saya.
            </p>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              Bagi saya, keterbatasan adalah ruang untuk bertumbuh. Melalui disiplin dan ribuan jam eksperimen, saya mentransformasi rasa ingin tahu menjadi kompetensi nyata. Kini, sebagai Web & Mobile Developer berbasis di Kediri, saya berdedikasi menciptakan solusi digital yang presisi dan berdampak. Saya tidak hanya menulis kode; saya merancang solusi digital yang lebih cerdas.
            </p>


            {/* Bento Information Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative">

              {/* Education Card */}
              <div className="bento-card p-6 group">
                <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-4 group-hover:scale-110 group-hover:bg-indigo-500/20 transition-all duration-500 ease-out">
                  <GraduationCap size={20} />
                </div>
                <h4 className="text-xl font-bold text-white mb-2">Education</h4>
                <p className="text-sm text-gray-400 mb-1">DIII - Manajemen Informatika</p>
                <p className="text-xs text-purple-400 font-medium">Politeknik Negeri Malang</p>
                <p className="text-xs text-gray-500">Kampus Kediri</p>
              </div>

              {/* Location Card */}
              <div className="bento-card p-6 group">
                <div className="w-10 h-10 rounded-lg bg-pink-500/10 flex items-center justify-center text-pink-400 mb-4 group-hover:scale-110 group-hover:bg-pink-500/20 transition-all duration-500 ease-out">
                  <MapPin size={20} />
                </div>
                <h4 className="text-xl font-bold text-white mb-2">Location</h4>
                <p className="text-sm text-gray-400 mb-1">Kediri, Indonesia</p>
                <p className="text-xs text-gray-500">Available remotely</p>
              </div>

              {/* Contact Email in Card Format */}
              <div className="bento-card p-6 group sm:col-span-2 flex items-center gap-5 cursor-pointer">
                <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center text-white shadow-lg shadow-purple-500/30 group-hover:scale-110 group-hover:shadow-purple-500/50 transition-all duration-500 ease-out">
                  <Mail size={22} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold tracking-widest mb-1">Let&apos;s Connect</p>
                  <p className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors duration-500 ease-out">yafaarsetya@gmail.com</p>
                </div>
                {/* Arrow indicator */}
                <div className="ml-auto text-gray-600 group-hover:text-purple-400 group-hover:translate-x-1 transition-all duration-500">
                  →
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
