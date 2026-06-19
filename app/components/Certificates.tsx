"use client";

import { motion } from "framer-motion";
import { Award, ExternalLink, X } from "lucide-react";
import React, { useState } from "react";

const CERTIFICATES = [
  {
    title: "Full-Stack Developer Internship: NPWPD Registration Information System (BPPKAD Kota Kediri)",
    issuer: "BPPKAD Kota Kediri",
    date: "Juni – Agustus 2025",
    image: "/sertifikat/deyafa_sertifikat.jpg",
    link: "#",
  },
  {
    title: "Certificate of Course Completion: Operating Systems Basics",
    issuer: "Cisco Networking Academy",
    date: "Mei 2024",
    image: "/sertifikat/Cisco-Networking.png",
    link: "#",
  },
  {
    title: "Certificate of Completion: Belajar Membuat Aplikasi Web dengan React",
    issuer: "Dicoding Indonesia × DBS Foundation",
    date: "Juni 2026",
    image: "/sertifikat/Belajar-Membuat-Aplikasi-Web-dengan-React.pdf",
    link: "https://www.dicoding.com/certificates/1OP8RM32LZQK",
  },
  {
    title: "Certificate of Completion: Belajar Membuat Front-End Web untuk Pemula",
    issuer: "Dicoding Indonesia × DBS Foundation",
    date: "Mei 2026",
    image: "/sertifikat/Belajar-Membuat-Front-End-Web-untuk-Pemula.pdf",
    link: "https://www.dicoding.com/certificates/0LZ0YM693X65",
  },
  {
    title: "Certificate of Completion: Belajar Dasar Pemrograman JavaScript",
    issuer: "Dicoding Indonesia × DBS Foundation",
    date: "Mei 2026",
    image: "/sertifikat/Belajar-Dasar-Pemrograman-JavaScript.pdf",
    link: "https://www.dicoding.com/certificates/07Z67M0V2PQR",
  },
  {
    title: "Certificate of Completion: Belajar Dasar Pemrograman Web",
    issuer: "Dicoding Indonesia × DBS Foundation",
    date: "Mei 2026",
    image: "/sertifikat/Belajar-Dasar-Pemrograman-Web.pdf",
    link: "https://www.dicoding.com/certificates/QLZ99G117Z5D",
  },
  {
    title: "Certificate of Completion: Memulai Pemrograman dengan Python",
    issuer: "Dicoding Indonesia x Pijak Flash Class",
    date: "Juni 2026",
    image: "/sertifikat/sertifikat_python.pdf",
    link: "https://www.dicoding.com/certificates/GRX5W1LWKZ0M",
  },
  {
    title: "Certificate of Participation: Zero Day Defense (SOC War Room)",
    issuer: "Jadi Hacker",
    date: "Maret 2026",
    image: "/sertifikat/(Bulk 2) sertifikat soc war room-25-1.png",
    link: "#",
  },
  {
    title: "Certificate of Completion: Introduction to Financial Literacy",
    issuer: "Dicoding Indonesia × DBS Foundation",
    date: "Mei 2026",
    image: "/sertifikat/Introduction-to-Financial-Literacy.pdf",
    link: "https://www.dicoding.com/certificates/07Z67MLDJPQR",
  },
  {
    title: "Certificate of Completion: Python Programming",
    issuer: "SpecialSkill Indonesia",
    date: "Mei 2026",
    image: "/sertifikat/sertifikat-specialskill.png",
    link: "https://specialskill.id/certificate?cert_hash=4e7d3c57cf6b12bc",
  }
];

export default function Certificates() {
  const [selectedCert, setSelectedCert] = useState<string | null>(null);

  // Mengunci scroll layar utama ketika gambar sertifikat dibuka
  React.useEffect(() => {
    if (selectedCert) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [selectedCert]);

  return (
    <section id="certificates" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-2xl sm:text-3xl md:text-5xl font-black mb-4 uppercase tracking-wider md:tracking-widest">
            <span className="text-white">Sertifikat &</span> <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-600">Pencapaian</span>
          </h2>
          <p className="text-white max-w-2xl mx-auto">
            Dokumentasi pelatihan, partisipasi, dan validasi keahlian yang telah saya pelajari.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {CERTIFICATES.map((cert, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-black/40 border border-white/10 rounded-2xl p-6 hover:border-amber-500/40 hover:shadow-[0_10px_30px_rgba(245,158,11,0.1)] transition-all group cursor-pointer backdrop-blur-sm relative overflow-hidden"
              onClick={() => setSelectedCert(cert.image)}
            >
              {/* Highlight background saat hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10 flex flex-col h-full">
                {/* Thumbnail */}
                <div className="relative w-full h-40 sm:h-48 rounded-xl overflow-hidden mb-5 bg-white/5 border border-white/10 group-hover:border-amber-500/30 transition-all">
                  {cert.image.endsWith('.pdf') ? (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-900/80 text-amber-500/50 group-hover:text-amber-400/80 transition-colors">
                      <Award size={48} className="mb-2" />
                      <span className="text-xs font-bold tracking-widest uppercase">Dokumen PDF</span>
                    </div>
                  ) : (
                    <img 
                      src={cert.image} 
                      alt={cert.title} 
                      className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out opacity-80 group-hover:opacity-100"
                    />
                  )}
                  {/* Overlay untuk memperjelas thumbnail */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-transparent to-transparent opacity-80" />
                </div>

                <h3 className="text-lg md:text-xl font-bold text-white mb-2 leading-tight group-hover:text-amber-300 transition-colors">
                  {cert.title}
                </h3>
                <p className="text-white text-sm mb-6 font-medium">
                  {cert.issuer} <span className="text-white mx-2">•</span> {cert.date}
                </p>

                <div className="flex gap-3 mt-auto pt-4">
                  <button
                    className="text-xs md:text-sm font-bold text-white bg-white/5 border border-white/10 px-4 py-2.5 rounded-lg hover:bg-white/10 transition-all active:scale-95 flex-1"
                    onClick={(e) => { e.stopPropagation(); setSelectedCert(cert.image); }}
                  >
                    Lihat
                  </button>
                  {cert.link !== "#" && (
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs md:text-sm font-bold text-amber-400 bg-amber-400/10 border border-amber-400/20 px-4 py-2.5 rounded-lg hover:bg-amber-400/20 transition-all flex items-center justify-center gap-2 active:scale-95 flex-1"
                      onClick={e => e.stopPropagation()}
                    >
                      Kredensial <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Gambar Modal Fullscreen */}
      {selectedCert && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-xl flex justify-center items-center p-4 sm:p-8"
          onClick={() => setSelectedCert(null)}
        >
          {/* Background Ambient Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[100px] pointer-events-none mix-blend-screen" />

          <motion.div
            initial={{ scale: 0.9, y: 30 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 400 }}
            className="relative max-w-4xl w-full flex flex-col gap-4"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center w-full">
              {selectedCert.endsWith(".pdf") ? (
                <a 
                  href={selectedCert} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-amber-500/20 text-amber-400 border border-amber-500/50 hover:bg-amber-500 hover:text-black px-4 py-2 rounded-lg font-bold transition-all text-sm flex items-center gap-2 shadow-lg"
                >
                  Buka PDF <ExternalLink size={16} />
                </a>
              ) : (
                <div />
              )}
              <button
                className="text-white hover:text-white bg-white/5 hover:bg-red-500 border border-white/10 p-3 rounded-full transition-all shadow-lg"
                onClick={() => setSelectedCert(null)}
                title="Tutup (Esc)"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="w-full rounded-xl overflow-hidden border border-white/10 shadow-[0_0_100px_rgba(245,158,11,0.15)] bg-[#111]">
              {selectedCert.endsWith(".pdf") ? (
                <object data={selectedCert} type="application/pdf" className="w-full h-[80vh] min-h-[500px] bg-white">
                  <div className="flex flex-col items-center justify-center h-full min-h-[500px] p-6 text-center text-white">
                    <p className="mb-4 font-medium">Browser HP Anda mungkin tidak mendukung pratinjau PDF langsung.</p>
                    <a href={selectedCert} target="_blank" rel="noopener noreferrer" className="bg-amber-500 text-black px-6 py-3 rounded-lg font-bold hover:bg-amber-400 transition-colors flex items-center gap-2 mx-auto w-max">
                      Unduh / Buka PDF <ExternalLink size={18} />
                    </a>
                  </div>
                </object>
              ) : (
                <img src={selectedCert} alt="Sertifikat Detail" className="w-full h-auto object-contain min-h-[300px] max-h-[80vh] flex items-center justify-center bg-[#111] text-white italic" />
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
