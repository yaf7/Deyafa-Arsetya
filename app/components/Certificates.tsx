"use client";

import { motion } from "framer-motion";
import { Award, ExternalLink, X } from "lucide-react";
import React, { useState } from "react";

// Kumpulan sertifikat diluar project
const CERTIFICATES = [
  {
    title: "Sertifikat Kompetensi - Junior Web Developer",
    issuer: "BNSP / Kominfo",
    date: "2023",
    image: "/placeholder-cert.jpg", // Ganti dengan path gambar sertifikat yang asli
    link: "#", // Ganti dengan link verifikasi/credential jika ada
  },
  {
    title: "Sertifikat Kelulusan - Belajar Dasar Pemrograman Web",
    issuer: "Dicoding Indonesia",
    date: "2023",
    image: "/placeholder-cert.jpg", // Ganti dengan path gambar sertifikat yang asli
    link: "#",
  },
  // Tambahkan data sertifikat lainnya di sini
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
          <h2 className="font-display text-2xl sm:text-3xl md:text-5xl font-black mb-4 uppercase tracking-wider md:tracking-widest text-white">
            Lisensi & <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-600">Sertifikasi</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Validasi keahlian, pencapaian, dan lisensi profesional yang telah saya raih
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
              
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-amber-500/20 transition-all duration-300">
                  <Award size={24} />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-white mb-2 leading-tight group-hover:text-amber-300 transition-colors">
                  {cert.title}
                </h3>
                <p className="text-gray-400 text-sm mb-6 font-medium">
                  {cert.issuer} <span className="text-gray-600 mx-2">•</span> {cert.date}
                </p>
                
                <div className="flex gap-3">
                  <button 
                    className="text-xs md:text-sm font-bold text-white bg-white/5 border border-white/10 px-4 py-2.5 rounded-lg hover:bg-white/10 transition-all active:scale-95"
                    onClick={(e) => { e.stopPropagation(); setSelectedCert(cert.image); }}
                  >
                    Lihat Gambar
                  </button>
                  {cert.link !== "#" && (
                    <a 
                      href={cert.link} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="text-xs md:text-sm font-bold text-amber-400 bg-amber-400/10 border border-amber-400/20 px-4 py-2.5 rounded-lg hover:bg-amber-400/20 transition-all flex items-center gap-2 active:scale-95" 
                      onClick={e => e.stopPropagation()}
                    >
                      Kredensial <ExternalLink size={14}/>
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
            className="relative max-w-4xl w-full flex flex-col items-end gap-4" 
            onClick={e => e.stopPropagation()}
          >
            <button 
              className="text-gray-400 hover:text-white bg-white/5 hover:bg-red-500 border border-white/10 p-3 rounded-full transition-all shadow-lg" 
              onClick={() => setSelectedCert(null)}
              title="Tutup (Esc)"
            >
               <X size={20} />
            </button>
            <div className="w-full rounded-xl overflow-hidden border border-white/10 shadow-[0_0_100px_rgba(245,158,11,0.15)] bg-black/50">
               {/* Gunakan tag img standar atau div placeholder */}
               <img src={selectedCert} alt="Sertifikat Detail" className="w-full h-auto object-contain min-h-[300px] max-h-[80vh] flex items-center justify-center bg-[#111] text-gray-500 italic" />
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
