"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Lock, Eye, X, Award, Download } from "lucide-react";
import React, { useState } from "react";

const PROJECTS = [
  {
    title: "Sistem Registrasi NPWPD – BPPKAD Kota Kediri",
    description: "Implementasi modul pendaftaran pajak daerah berbasis Laravel untuk BPPKAD Kota Kediri. Menghadirkan solusi digital yang mempercepat alur administrasi publik secara transparan, aman, dan terstruktur.",
    tags: ["Laravel", "PHP", "Alpine.js", "MySQL", "Vite"],
    image: "/dokumen-project-npwpd/bppkad_1.png",
    github: null,
    certificate: "/dokumen-project-npwpd/sertifikat/deyafa_sertifikat.jpeg",
    device: "desktop",
    presentation: "stitched",
    viewDesign: [
      "/dokumen-project-npwpd/bppkad_1.png",
      "/dokumen-project-npwpd/bppkad_2.png",
      "/dokumen-project-npwpd/bppkad_3.png",
      "/dokumen-project-npwpd/bppkad_4.png",
      "/dokumen-project-npwpd/bppkad_5.png",
      "/dokumen-project-npwpd/bppkad_6.png",
      "/dokumen-project-npwpd/bppkad_7.png",
      "/dokumen-project-npwpd/bppkad_8.png",
    ]
  },
  {
    title: "YFScanner – Android Document Mobile Scanner",
    description: "Aplikasi pemindai dokumen berbasis Android yang dikembangkan dengan Kotlin. Dirancang untuk memudahkan digitalisasi dokumen fisik ke dalam format digital secara cepat, ringan, dan efisien langsung dari perangkat mobile.",
    tags: ["Kotlin", "Android", "CameraX", "Mobile"],
    image: "/yfscanner/yfscanner1.jpeg",
    github: "https://github.com/yaf7/YFScanner",
    download: "https://github.com/yaf7/YFScanner/releases/tag/v1.0.0",
    device: "mobile",
    presentation: "separated",
    viewDesign: [
      "/yfscanner/yfscanner1.jpeg",
      "/yfscanner/yfscanner2.jpeg",
      "/yfscanner/yfscanner3.jpeg",
      "/yfscanner/yfscanner4.jpeg",
      "/yfscanner/yfscanner5.jpeg",
      "/yfscanner/yfscanner6.jpeg",
      "/yfscanner/yfscanner7.jpeg",
      "/yfscanner/yfscanner8.jpeg",
    ]
  },
  {
    title: "Sistem Informasi Manajemen Donasi – LAZISNU",
    description: "Sistem Informasi Manajemen donasi berbasis Laravel untuk LAZISNU, dilengkapi dengan implementasi simulasi Xendit Payment Gateway untuk otomatisasi verifikasi pembayaran.",
    tags: ["Laravel", "PHP", "MySQL", "Xendit"],
    image: "/sim-lazisnu/lazisnu1.png",
    github: "https://github.com/yaf7/SIM-LAZISNU",
    device: "desktop",
    presentation: "separated",
    viewDesign: [
      "/sim-lazisnu/lazisnu1.png",
      "/sim-lazisnu/lazisnu2.png",
      "/sim-lazisnu/lazisnu3.png",
      "/sim-lazisnu/lazisnu4.png",
      "/sim-lazisnu/lazisnu5.png",
      "/sim-lazisnu/lazisnu6.png",
      "/sim-lazisnu/lazisnu7.png",
      "/sim-lazisnu/lazisnu8.png",
      "/sim-lazisnu/lazisnu9.png",
      "/sim-lazisnu/lazisnu10.png"
    ]
  },
  {
    title: "Sistem Informasi Reservasi Meeting Room – Amaze Hotel",
    description: "Sistem manajemen reservasi ruang pertemuan berbasis Laravel untuk Amaze Hotel Kediri. Terintegrasi dengan Midtrans Payment Gateway (Sandbox) untuk otomatisasi transaksi dan dilengkapi fitur kustomisasi paket meeting serta menu buffet secara real-time.",
    tags: ["Laravel", "PHP", "MySQL", "Midtrans"],
    image: "/Reservasi-Meeting-Room-Amaze-Hotel/tampilan-luar-project-meeting-room.png",
    comingSoon: true,
    device: "desktop",
    presentation: "separated"
  }
];

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

// 3D Tilt Card Component Using Framer Motion
const TiltCard = ({ project, onOpenGallery, onOpenCertificate }: { project: typeof PROJECTS[0] | any, onOpenGallery: (images: string[]) => void, onOpenCertificate?: (url: string) => void }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full rounded-2xl h-[450px] group cursor-pointer"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <div
        className="absolute inset-0 rounded-2xl bg-black border border-white/10 overflow-hidden shadow-2xl glass-card transition-colors duration-500 group-hover:border-purple-500/50"
        style={{ transform: "translateZ(50px)" }} // Card base
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent z-10" />
        <img src={project.image} alt={project.title} className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700 blur-[2px] group-hover:blur-0" />

        {/* Content Floating Above */}
        <div className="absolute inset-0 z-20 p-8 flex flex-col justify-end" style={{ transform: "translateZ(80px)" }}>
          {project.comingSoon && (
            <div className="absolute top-6 right-6">
              <div className="relative group/badge">
                <div className="absolute inset-0 bg-amber-500/20 blur-xl rounded-full group-hover/badge:bg-amber-500/30 transition-colors duration-500 ease-out" />
                <span className="relative flex items-center gap-2 text-xs font-black uppercase tracking-widest text-amber-300 bg-black/50 border border-amber-500/30 px-4 py-2 rounded-full backdrop-blur-md shadow-[0_0_20px_rgba(245,158,11,0.2)]">
                  <Lock size={14} className="text-amber-400" /> Coming Soon
                </span>
              </div>
            </div>
          )}
          <h3 className="text-3xl font-black text-white mb-3 tracking-wide drop-shadow-lg">{project.title}</h3>
          <p className="text-gray-300 mb-6 drop-shadow-md text-sm leading-relaxed line-clamp-3">{project.description}</p>

          <div className="flex flex-wrap gap-3 mb-6">
            {project.tags.map((tag: string) => (
              <span key={tag} className="px-3 py-1 text-xs font-bold bg-white/10 backdrop-blur-md rounded-full text-purple-200 border border-purple-500/20 shadow-sm">
                {tag}
              </span>
            ))}
          </div>

          {!project.comingSoon && (
            <div className="flex gap-4 items-center flex-wrap">
              {project.viewDesign && (
                <button
                  onClick={() => {
                    if (Array.isArray(project.viewDesign)) {
                      onOpenGallery(project.viewDesign);
                    } else {
                      window.open(project.viewDesign as string, "_blank");
                    }
                  }}
                  className="flex items-center gap-2 text-sm font-bold bg-white text-black px-4 py-2 rounded-full hover:bg-purple-100 transition-colors duration-500 ease-out shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                >
                  <Eye size={16} /> View Design
                </button>
              )}
              {project.certificate && (
                <button
                  onClick={() => onOpenCertificate?.(project.certificate as string)}
                  className="flex items-center gap-2 text-sm font-bold bg-gradient-to-r from-yellow-400 to-amber-600 text-black px-4 py-2 rounded-full hover:from-yellow-300 hover:to-amber-500 transition-colors duration-500 ease-out shadow-[0_0_20px_rgba(245,158,11,0.3)]"
                >
                  <Award size={16} /> Certificate
                </button>
              )}
              {project.github ? (
                <a href={project.github} className="flex items-center gap-2 text-sm font-bold text-white bg-white/10 hover:bg-white/20 border border-white/20 px-4 py-2 rounded-full transition-colors duration-500 ease-out backdrop-blur-sm">
                  <GithubIcon /> Code
                </a>
              ) : (
                <span className="flex items-center gap-2 text-sm font-bold text-gray-400 bg-white/5 border border-white/5 px-4 py-2 rounded-full backdrop-blur-sm cursor-not-allowed">
                  <Lock size={16} /> Private Source
                </span>
              )}
              {project.download && (
                <a href={project.download} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-bold bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-full hover:from-blue-400 hover:to-indigo-500 transition-colors duration-500 ease-out shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                  <Download size={16} /> Download App
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<typeof PROJECTS[0] | null>(null);
  const [selectedCertificate, setSelectedCertificate] = useState<string | null>(null);

  // Lock body scroll when modal is open
  React.useEffect(() => {
    if (selectedProject || selectedCertificate) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [selectedProject, selectedCertificate]);

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
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-4 uppercase tracking-widest text-white">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-600">Projects</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A collection of my digital projects
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 perspective-[1000px] max-w-6xl mx-auto">
          {PROJECTS.map((project, i) => (
            <TiltCard
              key={project.title}
              project={project}
              onOpenGallery={() => setSelectedProject(project as any)}
              onOpenCertificate={project.certificate ? () => setSelectedCertificate(project.certificate as string) : undefined}
            />
          ))}
        </div>
      </div>

      {/* Enhanced Gallery Modal */}
      {selectedProject && Array.isArray(selectedProject.viewDesign) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[999] bg-black/90 backdrop-blur-xl flex justify-center items-start overflow-y-auto p-4 sm:p-8"
        >
          <div className="w-full max-w-5xl relative mt-4 mb-20">
            {/* Glowing Background Glow behind the modal */}
            <div className="absolute -inset-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-[2rem] opacity-20 blur-2xl z-0" />

            {/* Main Modal Container */}
            <div className="relative z-10 w-full bg-[#0a0a0a] rounded-2xl overflow-hidden border border-white/10 shadow-2xl flex flex-col">

              {/* Sticky Header: Mac Style Window Controls */}
              <div className="sticky top-0 z-[100] w-full bg-[#111111]/80 backdrop-blur-md border-b border-white/5 p-4 flex items-center justify-between">
                {/* Mac Controls */}
                <div className="flex gap-2 items-center w-1/4">
                  <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.5)]"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                </div>

                {/* Title */}
                <div className="flex-1 text-center">
                  <h3 className="text-white font-bold text-sm tracking-widest uppercase opacity-80 decoration-white">
                    {selectedProject.title} Gallery
                  </h3>
                </div>

                {/* Close Button */}
                <div className="w-1/4 flex justify-end">
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 p-2 rounded-full transition-all duration-500 ease-out"
                    title="Close Gallery"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* Modal Content Info */}
              <div className="p-8 md:p-12 pb-8 bg-gradient-to-b from-[#111] to-[#0a0a0a] border-b border-white/5">
                <h2 className="text-3xl font-black text-white mb-4">{selectedProject.title}</h2>
                <p className="text-gray-400 mb-6 max-w-3xl leading-relaxed text-lg">{selectedProject.description}</p>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 text-xs font-bold bg-purple-500/10 text-purple-300 border border-purple-500/20 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Refined Aesthetic Image Gallery */}
              <div className="w-full relative bg-[#070707] flex flex-col items-center gap-20 p-8 md:p-24 pb-40 overflow-hidden">
                {/* Background ambient light for the gallery */}
                <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-[20%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none" />

                {(() => {
                  const isMobileWidth = selectedProject.device === "mobile";
                  const contentWidth = isMobileWidth ? "max-w-sm md:max-w-md" : "max-w-2xl";
                  const showStitched = selectedProject.presentation === "stitched";

                  return (
                    <>
                      {/* Stitched Intro Section (Images 1, 2, 3) inside a Browser Window */}
                      {showStitched && (
                        <motion.div
                          initial={{ y: 50, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 1.2, ease: "easeOut" }}
                          className={`w-full ${contentWidth} flex flex-col rounded-xl md:rounded-[20px] overflow-hidden shadow-[0_0_80px_rgba(168,85,247,0.15)] bg-black ring-1 ring-white/10 relative z-10`}
                        >
                          {/* Aesthetic Header */}
                          <div className="w-full bg-[#0d0d0d] flex items-center px-5 py-3 border-b border-white/10">
                            <div className="flex gap-2 opacity-80">
                              <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]"></div>
                              <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.5)]"></div>
                              <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>
                            </div>
                            <div className="flex-1 flex justify-center">
                              {/* Minimalist Address Bar */}
                              <div className="bg-white/5 w-24 md:w-32 h-5 md:h-6 rounded-lg border border-white/5 flex items-center justify-center opacity-50">
                                <Lock size={10} className="text-gray-400" />
                              </div>
                            </div>
                            <div className="flex gap-2 opacity-0 w-12"></div>
                          </div>

                          {/* Stitched Images */}
                          <div className="w-full flex flex-col bg-black">
                            {(selectedProject.viewDesign as string[]).slice(0, 3).map((img, idx) => (
                              <img
                                key={idx}
                                src={img}
                                alt={`${selectedProject.title} stitched design part ${idx + 1}`}
                                className="w-full h-auto block m-0 p-0 border-none select-none pointer-events-none opacity-90 hover:opacity-100 transition-opacity duration-700"
                                loading={idx === 0 ? "eager" : "lazy"}
                              />
                            ))}
                          </div>
                        </motion.div>
                      )}

                      {/* Display Canvas Frames (All if separated, or Remaining if stitched) */}
                      {((selectedProject.viewDesign as string[]).length > 3 || !showStitched) && (
                        <div className={`flex flex-col items-center gap-16 w-full ${contentWidth} ${!showStitched ? 'mt-0' : 'mt-16'} relative z-10`}>
                          
                          {/* Gapped Image Display Inside Canvas Frames */}
                          {(selectedProject.viewDesign as string[]).slice(showStitched ? 3 : 0).map((img, idx) => (
                            <motion.div
                              initial={{ opacity: 0, y: 30 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true, margin: "-100px" }}
                              transition={{ duration: 1.2, ease: "easeOut" }}
                              key={idx}
                              className="w-full rounded-[24px] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.6)] border border-white/5 group relative bg-black ring-1 ring-white/10"
                            >
                              {/* Canvas / Mount Padding */}
                              <div className="p-3 md:p-5 bg-gradient-to-b from-white/5 to-transparent">
                                <img
                                  src={img}
                                  alt={`${selectedProject.title} screen ${idx + (!showStitched ? 1 : 4)}`}
                                  className="w-full h-auto block rounded-xl ring-1 ring-black/50 transform group-hover:scale-[1.01] transition-transform duration-700 select-none pointer-events-none opacity-90 group-hover:opacity-100"
                                  loading="lazy"
                                />
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </>
                  );
                })()}

              </div>
            </div>
          </div>
        </motion.div>
      )}

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
