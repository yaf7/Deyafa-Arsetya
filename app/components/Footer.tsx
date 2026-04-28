"use client";

import { motion } from "framer-motion";

const SocialIcon = ({ type }: { type: string }) => {
  switch (type) {
    case "github":
      return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>;
    case "linkedin":
      return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>;
    case "instagram":
      return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>;
    case "email":
      return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>;
    default:
      return null;
  }
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-transparent border-t border-white/5 py-12 md:py-24 overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-purple-900/10 blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10 flex flex-col items-center">
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-black mb-8 text-white tracking-widest text-center"
        >
          LET'S BUILD SOMETHING <span className="text-purple-500">GREAT</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex gap-6 mb-12"
        >
          {["github", "linkedin", "instagram", "email"].map((type) => {
            const links: Record<string, string> = {
              github: "https://github.com/yaf7",
              linkedin: "#",
              instagram: "https://www.instagram.com/yffaarz?igsh=bWM0NHFta3BsNnJ3",
              email: "mailto:yafaarsetya@gmail.com"
            };
            
            return (
              <a
                key={type}
                href={links[type]}
                target={type !== "email" ? "_blank" : undefined}
                rel={type !== "email" ? "noopener noreferrer" : undefined}
                className="w-12 h-12 rounded-full glass flex items-center justify-center text-gray-400 hover:text-white hover:bg-purple-600 border border-white/5 hover:border-purple-500 transition-all duration-300 hover:scale-110"
              >
                <SocialIcon type={type} />
              </a>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center text-sm text-gray-600 font-medium tracking-wide uppercase"
        >
          <p>Deyafa Arsetya</p>
        </motion.div>
      </div>
    </footer>
  );
}
