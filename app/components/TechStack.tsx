"use client";

import { motion } from "framer-motion";

const STACK = [
  { name: "HTML5", icon: "html5/html5-original.svg" },
  { name: "CSS3", icon: "css3/css3-original.svg" },
  { name: "JavaScript", icon: "javascript/javascript-original.svg" },
  { name: "PHP", icon: "php/php-original.svg" },
  { name: "Kotlin", icon: "kotlin/kotlin-original.svg" },
  { name: "Laravel", icon: "laravel/laravel-original.svg" },
  { name: "React", icon: "react/react-original.svg" },
  { name: "Next.js", icon: "nextjs/nextjs-original.svg" }, // Usually nextjs uses original line or plain wordmark
  { name: "Bootstrap", icon: "bootstrap/bootstrap-original.svg" },
  { name: "Vite", icon: "vitejs/vitejs-original.svg" },
  { name: "MySQL", icon: "mysql/mysql-original.svg" },
  { name: "Firebase", icon: "firebase/firebase-plain.svg" },
  { name: "Supabase", icon: "supabase/supabase-original.svg" },
  { name: "NPM", icon: "npm/npm-original-wordmark.svg" },
  { name: "Git", icon: "git/git-original.svg" },
];

const DEVICON_BASE = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/";

export default function TechStack() {
  return (
    <section id="tech" className="py-24 relative bg-[#0a0a0a]">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-purple-900/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 z-10 relative">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
           viewport={{ once: true }}
           className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-4 uppercase tracking-widest text-white">
            Tech <span className="text-purple-500">Stack</span>
          </h2>
          <p className="text-gray-400">Tools and technologies framing my digital architecture.</p>
        </motion.div>

        {/* CSS Auto-scroll Marquee Container */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-8 max-w-5xl mx-auto">
          {STACK.map((tech, i) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ y: -10, rotate: [0, -5, 5, 0], scale: 1.1 }}
              className="w-24 h-24 md:w-32 md:h-32 glass-card rounded-2xl flex flex-col items-center justify-center gap-3 cursor-pointer group"
            >
              {/* Fix Next.js and plain SVG colors via filter if needed, else raw SVG */}
               <img 
                  src={`${DEVICON_BASE}${tech.icon}`} 
                  alt={tech.name} 
                  className={`w-10 h-10 md:w-14 md:h-14 transition-all duration-300 ${tech.name === "Next.js" ? "filter invert" : ""}`} 
               />
               <span className="text-xs md:text-sm font-bold text-gray-400 group-hover:text-purple-400 group-hover:glow-text transition-colors">
                  {tech.name}
               </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
