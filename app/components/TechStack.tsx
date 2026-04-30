"use client";

import { motion } from "framer-motion";

const STACK_ROW1 = [
  { name: "HTML5", icon: "html5/html5-original.svg", color: "#E34F26" },
  { name: "CSS3", icon: "css3/css3-original.svg", color: "#1572B6" },
  { name: "JavaScript", icon: "javascript/javascript-original.svg", color: "#F7DF1E" },
  { name: "PHP", icon: "php/php-original.svg", color: "#777BB4" },
  { name: "Kotlin", icon: "kotlin/kotlin-original.svg", color: "#7F52FF" },
  { name: "Laravel", icon: "laravel/laravel-original.svg", color: "#FF2D20" },
  { name: "React", icon: "react/react-original.svg", color: "#61DAFB" },
  { name: "Next.js", icon: "nextjs/nextjs-original.svg", color: "#ffffff" },
];

const STACK_ROW2 = [
  { name: "Bootstrap", icon: "bootstrap/bootstrap-original.svg", color: "#7952B3" },
  { name: "Vite", icon: "vitejs/vitejs-original.svg", color: "#646CFF" },
  { name: "MySQL", icon: "mysql/mysql-original.svg", color: "#4479A1" },
  { name: "Firebase", icon: "firebase/firebase-plain.svg", color: "#FFCA28" },
  { name: "Supabase", icon: "supabase/supabase-original.svg", color: "#3ECF8E" },
  { name: "NPM", icon: "npm/npm-original-wordmark.svg", color: "#CB3837" },
  { name: "Git", icon: "git/git-original.svg", color: "#F05032" },
];

const DEVICON_BASE = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/";

function MarqueeRow({ items, reverse = false }: { items: typeof STACK_ROW1; reverse?: boolean }) {
  // Duplicate items for seamless loop
  const doubled = [...items, ...items, ...items, ...items];

  return (
    <div className="marquee-container w-full">
      <div className={reverse ? "marquee-track-reverse" : "marquee-track"}>
        {doubled.map((tech, i) => (
          <div
            key={`${tech.name}-${i}`}
            className="flex-shrink-0 group relative"
          >
            <div
              className="flex items-center gap-3 md:gap-4 px-4 md:px-6 py-3 md:py-4 rounded-2xl border border-white/5 bg-white/[0.03] hover:bg-white/[0.08] hover:border-white/15 transition-all duration-500 cursor-pointer"
              style={{
                boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
              }}
            >
              {/* Icon glow effect on hover */}
              <div className="relative">
                <div
                  className="absolute inset-0 rounded-full blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"
                  style={{ backgroundColor: tech.color }}
                />
                <img
                  src={`${DEVICON_BASE}${tech.icon}`}
                  alt={tech.name}
                  className={`w-8 h-8 md:w-12 md:h-12 relative z-10 transition-transform duration-500 group-hover:scale-110 ${tech.name === "Next.js" ? "filter invert" : ""}`}
                />
              </div>
              <span className="text-sm md:text-base font-semibold text-gray-400 group-hover:text-white transition-colors duration-500 whitespace-nowrap">
                {tech.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TechStack() {
  return (
    <section id="tech" className="py-24 relative bg-transparent overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-purple-900/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 z-10 relative mb-16">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 1.2, ease: "easeOut" }}
           viewport={{ once: true }}
           className="text-center mb-4"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-4 uppercase tracking-widest text-white">
            Tech <span className="text-purple-500">Stack</span>
          </h2>
          <p className="text-gray-400">Tools and technologies framing my digital architecture.</p>
        </motion.div>
      </div>

      {/* Marquee rows - full width, no container constraint */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        viewport={{ once: true }}
        className="flex flex-col gap-6 w-full"
      >
        <MarqueeRow items={STACK_ROW1} />
        <MarqueeRow items={STACK_ROW2} reverse />
      </motion.div>
    </section>
  );
}
