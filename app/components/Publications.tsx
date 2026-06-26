"use client";

import { motion } from "framer-motion";
import { BookOpen, ExternalLink, GraduationCap, Library, Network } from "lucide-react";

export default function Publications() {
  return (
    <section id="publications" className="py-24 relative overflow-hidden bg-transparent">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-zinc-400/25 to-transparent" />
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-teal-900/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-400/10 border border-teal-400/20 text-teal-400 text-xs font-bold uppercase tracking-widest mb-6">
            <BookOpen size={12} /> Riset & Publikasi
          </span>
          <h2 className="font-display text-2xl sm:text-3xl md:text-5xl font-black mb-4 uppercase tracking-wider md:tracking-widest">
            <span className="text-white">Riset</span> <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-teal-600">Akademik</span>
          </h2>
          <p className="text-white max-w-2xl mx-auto text-lg mt-4">
            Mendokumentasikan implementasi teknis dan arsitektur sistem melalui riset akademik serta publikasi ilmiah.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
            viewport={{ once: true }}
            className="lg:col-span-8 group relative"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-teal-400/30 to-emerald-600/30 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
            <div className="relative bento-card p-8 md:p-10 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between mb-6">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-teal-400/30 bg-teal-400/10 text-teal-400 text-xs font-bold uppercase tracking-widest">
                    <BookOpen size={14} /> Router: Jurnal Teknik Informatika & Terapan
                  </div>
                  <span className="text-6xl font-black text-white/5 select-none leading-none">01</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all duration-500 ease-out">
                  Sistem Informasi Modul Registrasi NPWPD Berbasis Laravel pada BPPKAD Kota Kediri
                </h3>
                <p className="text-white mb-8 leading-relaxed">
                  Modul registrasi NPWPD ini dikembangkan dengan framework Laravel untuk BPPKAD Kota Kediri, dirancang secara khusus untuk menyederhanakan alur administrasi dan meningkatkan efisiensi layanan publik daerah.
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {["Framework Laravel", "NPWPD", "Public Service", "System Architecture", "Transparency"].map(keyword => (
                    <span key={keyword} className="bg-white/5 border border-white/10 px-3 py-1 text-xs font-medium text-white rounded-full hover:border-teal-400/30 hover:text-teal-400 transition-colors duration-300">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-auto">
                <a href="https://doi.org/10.62951/router.v3i4.821" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-bold bg-white text-black px-6 py-3 rounded-full hover:bg-teal-400 transition-colors duration-500 ease-out shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.3)] group/btn">
                  Lihat Publikasi DOI <ExternalLink size={16} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-300" />
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
            viewport={{ once: true }}
            className="lg:col-span-4 flex flex-col gap-4"
          >
            <h4 className="text-sm font-black text-white uppercase tracking-widest mb-2 pl-2">Jejak Akademik</h4>
            <a href="https://scholar.google.co.id/scholar?hl=id&as_sdt=0%2C5&q=deyafa+arsetya&btnG=" target="_blank" rel="noopener noreferrer"
              className="bento-card p-6 flex items-center justify-between group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-teal-400/20 flex items-center justify-center text-teal-400 group-hover:scale-110 transition-transform duration-500 ease-out">
                  <GraduationCap size={22} />
                </div>
                <div><h5 className="font-bold text-white text-lg">Google Scholar</h5><p className="text-xs text-white">Sitasi & Karya Ilmiah</p></div>
              </div>
              <ExternalLink size={16} className="text-white group-hover:text-teal-400 group-hover:-translate-y-1 group-hover:translate-x-1 transition-all duration-500 ease-out" />
            </a>
            <a href="https://www.semanticscholar.org/author/Deyafa-Arsetya/2409669148" target="_blank" rel="noopener noreferrer"
              className="bento-card p-6 flex items-center justify-between group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform duration-500 ease-out">
                  <Library size={22} />
                </div>
                <div><h5 className="font-bold text-white text-lg">Semantic Scholar</h5><p className="text-xs text-white">Grafik Riset</p></div>
              </div>
              <ExternalLink size={16} className="text-white group-hover:text-emerald-400 group-hover:-translate-y-1 group-hover:translate-x-1 transition-all duration-500 ease-out" />
            </a>
            <a href="https://www.researchgate.net/scientific-contributions/Deyafa-Arsetya-2339219170" target="_blank" rel="noopener noreferrer"
              className="bento-card p-6 flex items-center justify-between group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 group-hover:scale-110 transition-transform duration-500 ease-out">
                  <Network size={22} />
                </div>
                <div><h5 className="font-bold text-white text-lg">ResearchGate</h5><p className="text-xs text-white">Jaringan Ilmiah</p></div>
              </div>
              <ExternalLink size={16} className="text-white group-hover:text-green-400 group-hover:-translate-y-1 group-hover:translate-x-1 transition-all duration-500 ease-out" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
