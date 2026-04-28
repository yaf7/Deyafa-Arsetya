"use client";

import { motion } from "framer-motion";
import { BookOpen, ExternalLink, GraduationCap, Library, Network } from "lucide-react";

export default function Publications() {
  return (
    <section id="publications" className="py-24 relative overflow-hidden bg-black/80">
      {/* Decorative ambient background */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-indigo-900/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-4 uppercase tracking-widest text-white">
            Academic <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600">Research</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg mt-4">
            Documenting technical implementations and system architectures through academic research and scientific publications.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Publication Highlight */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="lg:col-span-8 group relative"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/30 to-purple-600/30 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
            <div className="relative glass-card p-8 md:p-10 rounded-2xl border border-white/5 group-hover:border-white/10 transition-colors h-full flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 mb-6 text-blue-300 text-xs font-bold uppercase tracking-widest">
                  <BookOpen size={14} /> Router: Jurnal Teknik Informatika & Terapan
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all">
                  Sistem Informasi Modul Registrasi NPWPD Berbasis Laravel pada BPPKAD Kota Kediri
                </h3>
                <p className="text-gray-400 mb-8 leading-relaxed">
                  The NPWPD registration module was developed using the Laravel framework for BPPKAD Kediri City, specifically engineered to streamline administrative workflows and enhance the quality of local public services.
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {["Framework Laravel", "NPWPD", "Public Service", "System Architecture", "Transparency"].map(keyword => (
                    <span key={keyword} className="bg-white/5 border border-white/10 px-3 py-1 text-xs font-medium text-gray-300 rounded-full">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-auto">
                <a
                  href="https://doi.org/10.62951/router.v3i4.821"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-bold bg-white text-black px-6 py-3 rounded-full hover:bg-blue-50 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.3)]"
                >
                  View DOI Publication <ExternalLink size={16} />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Academic Profiles */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="lg:col-span-4 flex flex-col gap-4"
          >
            <h4 className="text-sm font-black text-gray-500 uppercase tracking-widest mb-2 pl-2">Academic Footprint</h4>

            <a
              href="https://scholar.google.co.id/scholar?hl=id&as_sdt=0%2C5&q=deyafa+arsetya&btnG="
              target="_blank"
              rel="noopener noreferrer"
              className="glass p-6 rounded-2xl flex items-center justify-between border border-white/5 hover:border-blue-500/50 hover:bg-white/5 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                  <GraduationCap size={22} />
                </div>
                <div>
                  <h5 className="font-bold text-white text-lg">Google Scholar</h5>
                  <p className="text-xs text-gray-400">Citations & Papers</p>
                </div>
              </div>
              <ExternalLink size={16} className="text-gray-600 group-hover:text-blue-400 group-hover:-translate-y-1 group-hover:translate-x-1 transition-all" />
            </a>

            <a
              href="https://www.semanticscholar.org/author/Deyafa-Arsetya/2409669148"
              target="_blank"
              rel="noopener noreferrer"
              className="glass p-6 rounded-2xl flex items-center justify-between border border-white/5 hover:border-purple-500/50 hover:bg-white/5 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                  <Library size={22} />
                </div>
                <div>
                  <h5 className="font-bold text-white text-lg">Semantic Scholar</h5>
                  <p className="text-xs text-gray-400">Research Graph</p>
                </div>
              </div>
              <ExternalLink size={16} className="text-gray-600 group-hover:text-purple-400 group-hover:-translate-y-1 group-hover:translate-x-1 transition-all" />
            </a>

            <a
              href="https://www.researchgate.net/scientific-contributions/Deyafa-Arsetya-2339219170"
              target="_blank"
              rel="noopener noreferrer"
              className="glass p-6 rounded-2xl flex items-center justify-between border border-white/5 hover:border-green-500/50 hover:bg-white/5 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 group-hover:scale-110 transition-transform">
                  <Network size={22} />
                </div>
                <div>
                  <h5 className="font-bold text-white text-lg">ResearchGate</h5>
                  <p className="text-xs text-gray-400">Scientific Network</p>
                </div>
              </div>
              <ExternalLink size={16} className="text-gray-600 group-hover:text-green-400 group-hover:-translate-y-1 group-hover:translate-x-1 transition-all" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
