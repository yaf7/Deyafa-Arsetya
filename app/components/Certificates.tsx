"use client";

import { motion } from "framer-motion";
import { Award, ExternalLink, X, ShieldCheck } from "lucide-react";
import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";

/* ─── Featured BNSP Certificate ─── */
const FEATURED_CERT = {
  title: "Sertifikat Kompetensi: Pemrograman Software Komputer",
  issuer: "Badan Nasional Sertifikasi Profesi (BNSP)",
  date: "Oktober 2025",
  description:
    "Sertifikasi profesi resmi dari pemerintah Republik Indonesia yang memvalidasi kompetensi di bidang Teknologi Informasi — Pemrograman Software Komputer. Dikeluarkan melalui LSP Politeknik Negeri Malang.",
  images: ["/sertifikat/BNSP/bnsp.jpeg"],
  link: "#",
};

/* ─── Other Certificates ─── */
const CERTIFICATES = [
  {
    title: "Full-Stack Developer Internship: NPWPD Registration Information System (BPPKAD Kota Kediri)",
    issuer: "BPPKAD Kota Kediri",
    date: "Juni – Agustus 2025",
    images: ["/sertifikat/deyafa_sertifikat.jpg"],
    link: "#",
  },
  {
    title: "Certificate of Course Completion: Operating Systems Basics",
    issuer: "Cisco Networking Academy",
    date: "Mei 2024",
    images: ["/sertifikat/Cisco-Networking.png"],
    link: "#",
  },
  {
    title: "Certificate of Completion: Belajar Membuat Aplikasi Web dengan React",
    issuer: "Dicoding Indonesia × DBS Foundation",
    date: "Juni 2026",
    images: [
      "/sertifikat/Certificate of Completion Belajar Membuat Aplikasi Web dengan React/Belajar-Membuat-Aplikasi-Web-dengan-React-1.png",
      "/sertifikat/Certificate of Completion Belajar Membuat Aplikasi Web dengan React/Belajar-Membuat-Aplikasi-Web-dengan-React-2.png"
    ],
    link: "https://www.dicoding.com/certificates/1OP8RM32LZQK",
  },
  {
    title: "Certificate of Completion: Belajar Membuat Front-End Web untuk Pemula",
    issuer: "Dicoding Indonesia × DBS Foundation",
    date: "Mei 2026",
    images: [
      "/sertifikat/Certificate of Completion Belajar Membuat Front-End Web untuk Pemula/Belajar-Membuat-Front-End-Web-untuk-Pemula-1.png",
      "/sertifikat/Certificate of Completion Belajar Membuat Front-End Web untuk Pemula/Belajar-Membuat-Front-End-Web-untuk-Pemula-2.png"
    ],
    link: "https://www.dicoding.com/certificates/0LZ0YM693X65",
  },
  {
    title: "Certificate of Completion: Belajar Fundamental Front-End Web Development",
    issuer: "Dicoding Indonesia × DBS Foundation",
    date: "Juli 2026",
    images: [
      "/sertifikat/Certificate of Completion Belajar Fundamental Front-End Web Development/Belajar-Fundamental-Front-End-Web-Development-1.png",
      "/sertifikat/Certificate of Completion Belajar Fundamental Front-End Web Development/Belajar-Fundamental-Front-End-Web-Development-2.png",
      "/sertifikat/Certificate of Completion Belajar Fundamental Front-End Web Development/Belajar-Fundamental-Front-End-Web-Development-3.png"
    ],
    link: "https://www.dicoding.com/certificates/2VX30DEO4XYQ",
  },
  {
    title: "Certificate of Completion: Belajar Dasar Pemrograman JavaScript",
    issuer: "Dicoding Indonesia × DBS Foundation",
    date: "Mei 2026",
    images: [
      "/sertifikat/Certificate of Completion Belajar Dasar Pemrograman JavaScript/Belajar-Dasar-Pemrograman-JavaScript-1.png",
      "/sertifikat/Certificate of Completion Belajar Dasar Pemrograman JavaScript/Belajar-Dasar-Pemrograman-JavaScript-2.png",
      "/sertifikat/Certificate of Completion Belajar Dasar Pemrograman JavaScript/Belajar-Dasar-Pemrograman-JavaScript-3.png"
    ],
    link: "https://www.dicoding.com/certificates/07Z67M0V2PQR",
  },
  {
    title: "Certificate of Completion: Belajar Dasar Pemrograman Web",
    issuer: "Dicoding Indonesia × DBS Foundation",
    date: "Mei 2026",
    images: [
      "/sertifikat/Certificate of Completion Belajar Dasar Pemrograman Web/Belajar-Dasar-Pemrograman-Web-1.png",
      "/sertifikat/Certificate of Completion Belajar Dasar Pemrograman Web/Belajar-Dasar-Pemrograman-Web-2.png",
      "/sertifikat/Certificate of Completion Belajar Dasar Pemrograman Web/Belajar-Dasar-Pemrograman-Web-3.png"
    ],
    link: "https://www.dicoding.com/certificates/QLZ99G117Z5D",
  },
  {
    title: "Certificate of Completion: Memulai Pemrograman dengan Python",
    issuer: "Dicoding Indonesia x Pijak Flash Class",
    date: "Juni 2026",
    images: [
      "/sertifikat/Certificate of Completion Memulai Pemrograman dengan Python/sertifikat_python-1.png",
      "/sertifikat/Certificate of Completion Memulai Pemrograman dengan Python/sertifikat_python-2.png",
      "/sertifikat/Certificate of Completion Memulai Pemrograman dengan Python/sertifikat_python-3.png"
    ],
    link: "https://www.dicoding.com/certificates/GRX5W1LWKZ0M",
  },
  {
    title: "Certificate of Participation: Zero Day Defense (SOC War Room)",
    issuer: "Jadi Hacker",
    date: "Maret 2026",
    images: ["/sertifikat/(Bulk 2) sertifikat soc war room-25-1.png"],
    link: "#",
  },
  {
    title: "Certificate of Completion: Introduction to Financial Literacy",
    issuer: "Dicoding Indonesia × DBS Foundation",
    date: "Mei 2026",
    images: [
      "/sertifikat/Certificate of Completion Introduction to Financial Literacy/Introduction-to-Financial-Literacy-1.png",
      "/sertifikat/Certificate of Completion Introduction to Financial Literacy/Introduction-to-Financial-Literacy-2.png",
      "/sertifikat/Certificate of Completion Introduction to Financial Literacy/Introduction-to-Financial-Literacy-3.png"
    ],
    link: "https://www.dicoding.com/certificates/07Z67MLDJPQR",
  },
  {
    title: "Certificate of Completion: Python Programming",
    issuer: "SpecialSkill Indonesia",
    date: "Mei 2026",
    images: ["/sertifikat/sertifikat-specialskill.png"],
    link: "https://specialskill.id/certificate?cert_hash=4e7d3c57cf6b12bc",
  }
];

export default function Certificates() {
  const [selectedCert, setSelectedCert] = useState<string[] | null>(null);
  const { t } = useLanguage();

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
            <span className="text-white">{t("certificates.title1")}</span> <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-600">{t("certificates.title2")}</span>
          </h2>
          <p className="text-white max-w-2xl mx-auto">
            {t("certificates.desc")}
          </p>
        </motion.div>

        {/* ═══════════════════════════════════════════════
            ★ FEATURED BNSP CERTIFICATE — HERO CARD ★
        ═══════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto mb-10"
        >
          <div
            className="relative rounded-2xl p-[2px] cursor-pointer group"
            onClick={() => setSelectedCert(FEATURED_CERT.images)}
            style={{
              background: "linear-gradient(135deg, #f59e0b, #d97706, #fbbf24, #f59e0b)",
              backgroundSize: "300% 300%",
              animation: "bnsp-border-glow 4s ease-in-out infinite",
            }}
          >
            {/* Outer ambient glow */}
            <div className="absolute -inset-1 rounded-2xl opacity-40 group-hover:opacity-70 blur-xl transition-opacity duration-700"
              style={{ background: "linear-gradient(135deg, #f59e0b, #d97706, #fbbf24)" }}
            />

            {/* Inner card */}
            <div className="relative bg-[#0c0f1a] rounded-2xl overflow-hidden">
              {/* Shimmer overlay */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-20"
                style={{
                  background: "linear-gradient(105deg, transparent 40%, rgba(251,191,36,0.08) 45%, rgba(251,191,36,0.15) 50%, rgba(251,191,36,0.08) 55%, transparent 60%)",
                  backgroundSize: "200% 100%",
                  animation: "bnsp-shimmer 2.5s ease-in-out infinite",
                }}
              />

              <div className="flex flex-col md:flex-row">
                {/* Certificate Image */}
                <div className="md:w-[45%] relative overflow-hidden">
                  <div className="aspect-[4/3] md:aspect-auto md:h-full relative">
                    <img
                      src={FEATURED_CERT.images[0]}
                      alt={FEATURED_CERT.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-out"
                    />
                    {/* Gradient fade to content */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#0c0f1a] hidden md:block" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0c0f1a] via-transparent to-transparent md:hidden" />
                  </div>
                </div>

                {/* Content */}
                <div className="md:w-[55%] p-6 sm:p-8 md:p-10 flex flex-col justify-center relative z-10">
                  {/* Badge */}
                  <div className="flex items-center gap-2 mb-5">
                    <span
                      className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest text-amber-900"
                      style={{ background: "linear-gradient(135deg, #fbbf24, #f59e0b)" }}
                    >
                      <ShieldCheck size={14} strokeWidth={3} />
                      {t("certificates.bnsp_certified")}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-amber-400 bg-amber-400/10 border border-amber-400/20">
                      <Award size={12} />
                      {t("certificates.professional_certification")}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl md:text-3xl font-black text-white mb-3 leading-tight group-hover:text-amber-200 transition-colors duration-500">
                    {FEATURED_CERT.title}
                  </h3>

                  <p className="text-white/70 text-sm sm:text-base leading-relaxed mb-6">
                    {FEATURED_CERT.description}
                  </p>

                  <div className="flex items-center gap-3 text-sm text-amber-400 font-semibold mb-6">
                    <span>{FEATURED_CERT.issuer}</span>
                    <span className="w-1 h-1 rounded-full bg-amber-400" />
                    <span>{FEATURED_CERT.date}</span>
                  </div>

                  {/* Validity info */}
                  <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-amber-500/5 border border-amber-500/15 mb-6">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs text-white/60">{t("certificates.valid_3_years")}</span>
                    <span className="text-xs text-white/40 mx-1">•</span>
                    <span className="text-xs text-white/60">No. Reg. TIK.383.13810.2025</span>
                  </div>

                  <button
                    className="self-start text-sm font-bold text-amber-900 px-6 py-3 rounded-xl transition-all active:scale-95 hover:shadow-lg hover:shadow-amber-500/20"
                    style={{ background: "linear-gradient(135deg, #fbbf24, #f59e0b)" }}
                    onClick={(e) => { e.stopPropagation(); setSelectedCert(FEATURED_CERT.images); }}
                  >
                    {t("certificates.view_cert")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ═══════════════════════════════════════════════
            Regular Certificate Grid
        ═══════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {CERTIFICATES.map((cert, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-black/40 border border-white/10 rounded-2xl p-6 hover:border-amber-500/40 hover:shadow-[0_10px_30px_rgba(245,158,11,0.1)] transition-all group cursor-pointer backdrop-blur-sm relative overflow-hidden"
              onClick={() => setSelectedCert(cert.images)}
            >
              {/* Highlight background saat hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10 flex flex-col h-full">
                {/* Thumbnail */}
                <div className="relative w-full h-40 sm:h-48 rounded-xl overflow-hidden mb-5 bg-white/5 border border-white/10 group-hover:border-amber-500/30 transition-all">
                  <img 
                    src={cert.images[0]} 
                    alt={cert.title} 
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out opacity-80 group-hover:opacity-100"
                  />
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
                    onClick={(e) => { e.stopPropagation(); setSelectedCert(cert.images); }}
                  >
                    {t("certificates.view")}
                  </button>
                  {cert.link !== "#" && (
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs md:text-sm font-bold text-amber-400 bg-amber-400/10 border border-amber-400/20 px-4 py-2.5 rounded-lg hover:bg-amber-400/20 transition-all flex items-center justify-center gap-2 active:scale-95 flex-1"
                      onClick={e => e.stopPropagation()}
                    >
                      {t("certificates.credential")} <ExternalLink size={14} />
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
              <div />
              <button
                className="text-white hover:text-white bg-white/5 hover:bg-red-500 border border-white/10 p-3 rounded-full transition-all shadow-lg"
                onClick={() => setSelectedCert(null)}
                title="Tutup (Esc)"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="w-full max-h-[80vh] overflow-y-auto rounded-xl border border-white/10 shadow-[0_0_100px_rgba(245,158,11,0.15)] bg-[#111] flex flex-col scrollbar-thin scrollbar-thumb-amber-500/50 scrollbar-track-transparent">
              {selectedCert.map((img, idx) => (
                <div key={idx} className="w-full border-b border-white/10 last:border-b-0 flex-shrink-0 flex items-center justify-center bg-[#111] min-h-[300px]">
                  <img src={img} alt={`Sertifikat Detail ${idx + 1}`} className="w-full h-auto object-contain text-white italic" />
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Keyframe animations for BNSP featured card */}
      <style jsx>{`
        @keyframes bnsp-border-glow {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes bnsp-shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </section>
  );
}
