"use client";

import { motion } from "framer-motion";
import { Lock, X, Award, Download } from "lucide-react";
import React, { useState } from "react";

const PROJECTS = [
  {
    title: "Sistem Registrasi NPWPD – BPPKAD Kota Kediri",
    description: "Implementasi modul pendaftaran pajak daerah berbasis Laravel untuk BPPKAD Kota Kediri. Menghadirkan solusi digital yang mempercepat alur administrasi publik secara transparan, aman, dan terstruktur.",
    tags: ["Laravel", "PHP", "Alpine.js", "MySQL", "Vite"],
    image: "/gambar-project/npwpd_bppkad.png",
    github: null,
    certificate: "/sertifikat/deyafa_sertifikat.jpeg"
  },
  {
    title: "YFScanner – Pemindai Dokumen Mobile Android",
    description: "Aplikasi pemindai dokumen berbasis Android yang dikembangkan dengan Kotlin. Dirancang untuk memudahkan digitalisasi dokumen fisik ke dalam format digital secara cepat, ringan, dan efisien langsung dari perangkat mobile.",
    tags: ["Kotlin", "Android", "CameraX", "Mobile"],
    image: "/gambar-project/yfscanner.jpeg",
    github: "https://github.com/yaf7/YFScanner",
    download: "https://github.com/yaf7/YFScanner/releases/tag/v1.0.0"
  },
  {
    title: "Sistem Informasi Manajemen Donasi – LAZISNU",
    description: "Sistem Informasi Manajemen donasi berbasis Laravel untuk LAZISNU, dilengkapi dengan implementasi simulasi Xendit Payment Gateway untuk otomatisasi verifikasi pembayaran.",
    tags: ["Laravel", "PHP", "MySQL", "Xendit"],
    image: "/gambar-project/lazisnu.png",
    github: "https://github.com/yaf7/SIM-LAZISNU"
  },
  {
    title: "Sistem Informasi Reservasi Meeting Room – Amaze Hotel",
    description: "Sistem manajemen reservasi ruang pertemuan berbasis Laravel untuk Amaze Hotel Kediri. Terintegrasi dengan Midtrans Payment Gateway (Sandbox) untuk otomatisasi transaksi dan dilengkapi fitur kustomisasi paket meeting serta menu buffet secara real-time.",
    tags: ["Laravel", "PHP", "MySQL", "Midtrans"],
    image: "/gambar-project/amaze-hotel.png",
    github: "https://github.com/yaf7/deyafaarsetya-amaze-hotel-meeting-room"
  },
  {
    title: "Griya Karsa: Sistem Pemetaan Infrastruktur FTTH Berbasis GIS",
    description: "Sistem Informasi Geografis (GIS) berbasis Web untuk pemetaan infrastruktur FTTH, manajemen titik ODP/ODC, dan monitoring layanan internet pada proyek Griya Karsa.",
    tags: ["Laravel", "PHP", "GIS", "FTTH", "Mapping", "LeafletJS", "MySQL"],
    image: "/gambar-project/griya-karsa.png",
    github: "https://github.com/yaf7/griya-karsa-ftth-mapping"
  },
  {
    title: "NextGen Photobooth: Kreator Kolase & Strip Foto Instan",
    description: "Platform photobooth digital yang menghadirkan pengalaman studio foto. Buat strip foto estetik dengan filter real-time dan ekspor kualitas tinggi dalam hitungan detik.",
    tags: ["Next.js", "React", "Tailwind CSS", "Framer Motion", "Canvas API"],
    image: "/gambar-project/nextgen-photobooth.png",
    github: "https://github.com/yaf7/NextGen-Photobooth"
  }
];

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

// Optimized, static Project Card Component with high-end CSS transitions
const ProjectCard = ({ project, onOpenCertificate, index = 0 }: { project: typeof PROJECTS[0] | any, onOpenCertificate?: (url: string) => void, index?: number }) => {
  return (
    <motion.div
      className="relative w-full rounded-2xl min-h-[480px] h-auto md:h-[450px] group overflow-hidden border border-white/10 bg-[#08080a] shadow-2xl transition-all duration-500 ease-out hover:border-purple-500/40 hover:shadow-[0_20px_50px_rgba(168,85,247,0.15)] hover:-translate-y-1.5"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.1 }}
      viewport={{ once: true, margin: "-80px" }}
    >
      {/* Glowing Top Border Accent */}
      <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-30" />

      {/* Card Background Image & Gradient Overlays */}
      <div className="absolute inset-0 z-0">
        {/* Subtle Ambient Vignette/Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/85 to-transparent z-10 transition-all duration-500 group-hover:via-black/75" />
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover opacity-50 group-hover:scale-105 group-hover:opacity-65 transition-all duration-700 ease-out blur-[1px] group-hover:blur-0"
        />
      </div>

      {/* Content Container */}
      <div className="absolute inset-0 z-20 p-6 md:p-8 flex flex-col justify-end">
        {/* Big Editorial Index Number */}
        <span className="absolute top-6 left-8 text-7xl font-black text-white/[0.03] select-none leading-none tracking-tighter transition-all duration-500 group-hover:text-purple-500/5 group-hover:scale-105">
          {String(index + 1).padStart(2, '0')}
        </span>

        {project.comingSoon && (
          <div className="absolute top-6 right-6">
            <div className="relative group/badge">
              <div className="absolute inset-0 bg-amber-500/20 blur-xl rounded-full group-hover/badge:bg-amber-500/30 transition-colors duration-500 ease-out" />
              <span className="relative flex items-center gap-2 text-xs font-black uppercase tracking-widest text-amber-300 bg-black/50 border border-amber-500/30 px-4 py-2 rounded-full backdrop-blur-md shadow-[0_0_20px_rgba(245,158,11,0.2)]">
                <Lock size={14} className="text-amber-400" /> Segera Hadir
              </span>
            </div>
          </div>
        )}

        <h3 className="text-2xl md:text-3xl font-black text-white mb-3 tracking-wide drop-shadow-lg group-hover:text-purple-300 transition-colors duration-300">
          {project.title}
        </h3>

        <p className="text-gray-300 mb-6 drop-shadow-md text-sm leading-relaxed max-w-xl">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2.5 mb-6">
          {project.tags.map((tag: string) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs font-bold bg-white/5 backdrop-blur-md rounded-full text-purple-200 border border-white/10 shadow-sm transition-all duration-300 group-hover:border-purple-500/30 group-hover:bg-purple-500/5"
            >
              {tag}
            </span>
          ))}
        </div>

        {!project.comingSoon && (
          <div className="flex gap-4 items-center flex-wrap">
            {project.certificate && (
              <button
                onClick={() => onOpenCertificate?.(project.certificate as string)}
                className="flex items-center gap-2 text-sm font-bold bg-gradient-to-r from-yellow-400 to-amber-600 text-black px-4 py-2 rounded-full hover:from-yellow-300 hover:to-amber-500 transition-all duration-300 ease-out shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:shadow-[0_0_30px_rgba(245,158,11,0.5)] active:scale-95"
              >
                <Award size={16} /> Sertifikat
              </button>
            )}
            {project.github ? (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-bold text-white bg-white/10 hover:bg-white/20 border border-white/20 px-4 py-2 rounded-full transition-all duration-300 ease-out backdrop-blur-sm hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] active:scale-95"
              >
                <GithubIcon /> Code
              </a>
            ) : (
              <span className="flex items-center gap-2 text-sm font-bold text-gray-400 bg-white/5 border border-white/5 px-4 py-2 rounded-full backdrop-blur-sm cursor-not-allowed">
                <Lock size={16} /> Sumber Privat
              </span>
            )}
            {project.download && (
              <a
                href={project.download}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-bold bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-full hover:from-blue-400 hover:to-indigo-500 transition-all duration-300 ease-out shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] active:scale-95"
              >
                <Download size={16} /> Unduh Aplikasi
              </a>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [selectedCertificate, setSelectedCertificate] = useState<string | null>(null);

  // Lock body scroll when modal is open
  React.useEffect(() => {
    if (selectedCertificate) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [selectedCertificate]);

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute left-0 top-1/4 w-[500px] h-[500px] bg-indigo-900/10 rounded-full blur-[150px] -z-10" />
      <div className="absolute right-0 bottom-1/4 w-[400px] h-[400px] bg-purple-900/10 rounded-full blur-[150px] -z-10" />

      <div className="container mx-auto px-6 md:px-12 z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-20 md:mb-16"
        >
          <h2 className="font-display text-2xl sm:text-3xl md:text-5xl font-black mb-4 uppercase tracking-wider md:tracking-widest text-white">
            Proyek <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-600">Pilihan</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Kumpulan karya dan proyek digital pilihan yang telah saya bangun
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {PROJECTS.map((project, i) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={i}
              onOpenCertificate={project.certificate ? () => setSelectedCertificate(project.certificate as string) : undefined}
            />
          ))}
        </div>
      </div>

      {/* Certificate Modal */}
      {selectedCertificate && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[999] bg-[#050505]/80 backdrop-blur-xl flex justify-center items-center p-4 sm:p-8"
          onClick={() => setSelectedCertificate(null)}
        >
          {/* Animated Glowing Background Orbs */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.2 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none mix-blend-screen"
          />

          <motion.div
            initial={{ scale: 0.9, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            transition={{ type: "spring", damping: 25, stiffness: 400 }}
            className="w-full max-w-4xl relative rounded-xl overflow-hidden shadow-[0_0_150px_rgba(245,158,11,0.2)] border border-amber-500/20 p-2 bg-gradient-to-br from-[#1a1a1a]/90 via-[#0a0a0a]/90 to-amber-900/10 backdrop-blur-md"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedCertificate(null)}
              className="absolute top-4 right-4 z-[1001] w-10 h-10 bg-black/50 hover:bg-red-500 text-white rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-500 ease-out shadow-lg"
            >
              <X size={20} />
            </button>
            <div className="rounded-lg overflow-hidden border border-white/5 relative">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent z-10" />
              <img src={selectedCertificate} alt="Certificate" className="w-full h-auto block" />
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
