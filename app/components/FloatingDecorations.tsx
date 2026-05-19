"use client";

// Pure CSS animation — no framer-motion runtime overhead for simple floating
export default function FloatingDecorations() {
  const elements = [
    { text: "{ }", top: "18%", left: "85%", rotate: 15, delay: "0s", duration: "18s", color: "from-blue-500 to-cyan-500" },
    { text: "JS", top: "35%", left: "5%", rotate: -20, delay: "-4s", duration: "22s", color: "from-yellow-400 to-amber-500" },
    { text: "TS", top: "50%", left: "80%", rotate: 10, delay: "-8s", duration: "20s", color: "from-blue-500 to-indigo-500" },
    { text: "API", top: "65%", left: "10%", rotate: -15, delay: "-2s", duration: "24s", color: "from-emerald-400 to-teal-500" },
    { text: "DB", top: "80%", left: "85%", rotate: 25, delay: "-6s", duration: "26s", color: "from-orange-500 to-red-500" },
    { text: "Git", top: "95%", left: "8%", rotate: -10, delay: "-10s", duration: "21s", color: "from-red-500 to-orange-500" },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[0] block">
      {elements.map((el, i) => (
        <div
          key={i}
          className="absolute flex items-center justify-center glass border border-white/10 w-16 h-16 md:w-32 md:h-32 rounded-full opacity-60 md:opacity-100"
          style={{
            top: el.top,
            left: el.left,
            transform: `rotate(${el.rotate}deg)`,
            animation: `float-decoration ${el.duration} ease-in-out infinite`,
            animationDelay: el.delay,
            willChange: "transform",
            contain: "layout style",
          }}
        >
          <div className={`w-8 h-8 md:w-16 md:h-16 bg-gradient-to-tr ${el.color} rounded-full opacity-50 blur-lg absolute`} />
          <span className="text-xl md:text-4xl font-black text-white/30 select-none drop-shadow-md">{el.text}</span>
        </div>
      ))}
    </div>
  );
}
