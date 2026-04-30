"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const SocialIcon = ({ type }: { type: string }) => {
  switch (type) {
    case "github":
      return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>;
    case "instagram":
      return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>;
    case "email":
      return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>;
    default:
      return null;
  }
};

// Magnetic button component
function MagneticButton({ children, href, className, target, rel }: { children: React.ReactNode; href: string; className?: string; target?: string; rel?: string }) {
  const ref = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
  };

  const handleMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0, 0)";
  };

  return (
    <a
      ref={ref}
      href={href}
      target={target}
      rel={rel}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transition: "transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)" }}
    >
      {children}
    </a>
  );
}

export default function Footer() {
  return (
    <footer className="relative bg-transparent border-t border-white/5 py-16 md:py-28 overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-purple-900/10 blur-[100px] pointer-events-none" />
      
      {/* Animated gradient line at top */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true }}
        className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/40 to-transparent origin-left"
      />

      <div className="container mx-auto px-6 md:px-12 relative z-10 flex flex-col items-center">
        {/* Animated Gradient CTA Text */}
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-2xl md:text-5xl lg:text-6xl font-black mb-4 tracking-wider md:tracking-widest text-center leading-tight"
        >
          <span className="text-white">LET&apos;S BUILD</span>
          <br />
          <span className="text-white">SOMETHING </span>
          <span className="gradient-text-animated">GREAT</span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-gray-500 text-sm md:text-base mb-12 tracking-wider"
        >
          Got a project? Let&apos;s talk.
        </motion.p>

        {/* Magnetic Social Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true }}
          className="flex gap-5 mb-16"
        >
          {[
            { type: "github", href: "https://github.com/yaf7", label: "GitHub" },
            { type: "instagram", href: "https://www.instagram.com/yffaarz?igsh=bWM0NHFta3BsNnJ3", label: "Instagram" },
            { type: "email", href: "mailto:yafaarsetya@gmail.com", label: "Email" },
          ].map(({ type, href, label }) => (
            <MagneticButton
              key={type}
              href={href}
              target={type !== "email" ? "_blank" : undefined}
              rel={type !== "email" ? "noopener noreferrer" : undefined}
              className="w-14 h-14 rounded-full glass flex items-center justify-center text-gray-400 hover:text-white hover:bg-purple-600/80 border border-white/5 hover:border-purple-500 transition-colors duration-500 hover:shadow-[0_0_25px_rgba(168,85,247,0.3)]"
            >
              <SocialIcon type={type} />
            </MagneticButton>
          ))}
        </motion.div>

        {/* Divider */}
        <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8" />

        {/* Footer bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center text-sm text-gray-600 font-medium tracking-wide uppercase flex flex-col items-center gap-1"
        >
          <p>Deyafa Arsetya</p>
          <p className="text-xs text-gray-700">© {new Date().getFullYear()}</p>
        </motion.div>
      </div>
    </footer>
  );
}
