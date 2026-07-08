"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="relative bg-transparent border-t border-white/5 py-16 md:py-28 overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-emerald-900/10 blur-[100px] pointer-events-none" />
      
      {/* Animated gradient line at top */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true }}
        className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-zinc-400/40 to-transparent origin-left"
      />

      <div className="container mx-auto px-6 md:px-12 relative z-10 flex flex-col items-center">
        {/* Animated Gradient CTA Text */}
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          viewport={{ once: true }}
          className="font-display text-2xl md:text-5xl lg:text-6xl font-black mb-4 tracking-wider md:tracking-widest text-center leading-tight"
        >
          <span className="text-white">{t("footer.line1")}</span>
          <br />
          <span className="text-white">{t("footer.line2")}</span>
          <span className="gradient-text-animated">{t("footer.line3")}</span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-white text-sm md:text-base mb-12 tracking-wider"
        >
          {t("footer.subtitle")}
        </motion.p>



        {/* Divider */}
        <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8" />

        {/* Footer bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center text-sm text-white font-medium tracking-wide uppercase flex flex-col items-center gap-1"
        >
          <p>Deyafa Arsetya</p>
          <p className="text-xs text-white">© {new Date().getFullYear()}</p>
        </motion.div>
      </div>
    </footer>
  );
}
