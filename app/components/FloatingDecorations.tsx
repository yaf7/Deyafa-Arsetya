"use client";

import { motion } from "framer-motion";

export default function FloatingDecorations() {
  const elements = [
    { text: "{ }", top: "18%", left: "85%", rotate: 15, delay: 0, color: "from-blue-500 to-cyan-500" },
    { text: "JS", top: "35%", left: "5%", rotate: -20, delay: 1, color: "from-yellow-400 to-amber-500" },
    { text: "TS", top: "50%", left: "80%", rotate: 10, delay: 2, color: "from-blue-500 to-indigo-500" },
    { text: "API", top: "65%", left: "10%", rotate: -15, delay: 0.5, color: "from-emerald-400 to-teal-500" },
    { text: "DB", top: "80%", left: "85%", rotate: 25, delay: 1.5, color: "from-orange-500 to-red-500" },
    { text: "Git", top: "95%", left: "8%", rotate: -10, delay: 2.5, color: "from-red-500 to-orange-500" },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[0] block">
      {elements.map((el, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -30, 0],
            rotate: [el.rotate, el.rotate + 10, el.rotate],
          }}
          transition={{
            duration: 15 + (i * 2), // Smooth, very slow floating
            repeat: Infinity,
            ease: "easeInOut",
            delay: el.delay,
          }}
          className="absolute flex items-center justify-center glass border border-white/10 w-16 h-16 md:w-32 md:h-32 rounded-full opacity-60 md:opacity-100"
          style={{ top: el.top, left: el.left }}
        >
          <div className={`w-8 h-8 md:w-16 md:h-16 bg-gradient-to-tr ${el.color} rounded-full opacity-50 blur-lg absolute`} />
          <span className="text-xl md:text-4xl font-black text-white/30 select-none drop-shadow-md">{el.text}</span>
        </motion.div>
      ))}
    </div>
  );
}
