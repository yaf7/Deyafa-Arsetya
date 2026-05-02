"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Active section detection via IntersectionObserver
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const navLinks = [
    { name: "Home", href: "#home", id: "home" },
    { name: "About", href: "#about", id: "about" },
    { name: "Tech Stack", href: "#tech", id: "tech" },
    { name: "Research", href: "#publications", id: "publications" },
    { name: "Projects", href: "#projects", id: "projects" },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-full z-[999] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        scrolled ? "glass py-4 shadow-[0_10px_30px_rgba(0,0,0,0.5)] border-b border-white/5" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        <motion.a 
           href="#home" 
           className="relative flex items-center gap-3 group perspective-[1000px] z-50"
           whileHover={{ scale: 1.05 }}
           whileTap={{ scale: 0.95 }}
        >
           <motion.div
             animate={{ y: [0, -4, 0] }}
             transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
             className="relative"
           >
              {/* Glowing shadow behind the logo for 3D depth */}
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full opacity-0 group-hover:opacity-60 blur-md transition duration-500" />
              
              {/* Replace with the transparent logo-yafa.png */}
              <Image 
                 src="/logo-yafa.png" 
                 alt="Deyafa Arsetya Logo" 
                 width={56} 
                 height={56} 
                 className="object-contain relative z-10 drop-shadow-[0_0_10px_rgba(168,85,247,0.4)] group-hover:drop-shadow-[0_15px_25px_rgba(168,85,247,0.6)] group-hover:-translate-y-1 transition-all duration-500" 
              />
           </motion.div>
        </motion.a>

        {/* Desktop Nav with Active Indicator */}
        <div className="hidden md:flex gap-8 items-center relative">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-all duration-500 ease-out uppercase tracking-widest relative group py-1 ${
                  isActive ? "text-white" : "text-gray-400 hover:text-white"
                }`}
              >
                {link.name}
                
                {/* Active indicator dot */}
                {isActive && (
                  <motion.div
                    layoutId="activeNavDot"
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-purple-500 rounded-full shadow-[0_0_8px_rgba(168,85,247,0.8)]"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}

                {/* Hover underline (only when not active) */}
                {!isActive && (
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-purple-500/50 transition-all duration-500 group-hover:w-full" />
                )}
              </a>
            );
          })}
        </div>

        {/* Mobile Nav Button */}
        <div className="md:hidden flex items-center">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-300 hover:text-white focus:outline-none relative w-8 h-8 flex items-center justify-center"
          >
            <motion.span
              animate={{ rotate: isMobileMenuOpen ? 45 : 0, y: isMobileMenuOpen ? 0 : -6 }}
              className="absolute w-5 h-[1.5px] bg-current rounded-full"
              transition={{ duration: 0.3 }}
            />
            <motion.span
              animate={{ opacity: isMobileMenuOpen ? 0 : 1, scaleX: isMobileMenuOpen ? 0 : 1 }}
              className="absolute w-5 h-[1.5px] bg-current rounded-full"
              transition={{ duration: 0.2 }}
            />
            <motion.span
              animate={{ rotate: isMobileMenuOpen ? -45 : 0, y: isMobileMenuOpen ? 0 : 6 }}
              className="absolute w-5 h-[1.5px] bg-current rounded-full"
              transition={{ duration: 0.3 }}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden bg-black/95 backdrop-blur-md border-b border-white/10 overflow-hidden relative z-[60]"
          >
            <div className="flex flex-col px-6 py-4 gap-1">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    const targetId = link.href.replace("#", "");
                    setIsMobileMenuOpen(false);
                    
                    // Explicitly scroll to the target after the menu closing starts
                    setTimeout(() => {
                      const element = document.getElementById(targetId);
                      if (element) {
                        const offset = 80; // Offset for fixed navbar
                        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
                        const offsetPosition = elementPosition - offset;

                        window.scrollTo({
                          top: offsetPosition,
                          behavior: "smooth",
                        });
                      }
                    }, 300); // Wait for menu unmount animation to avoid layout shift conflicts
                  }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                  className={`text-sm font-medium transition-colors duration-500 ease-out uppercase tracking-widest py-3 border-b border-white/5 flex items-center gap-3 ${
                    activeSection === link.id 
                      ? "text-purple-400" 
                      : "text-gray-300 hover:text-purple-400"
                  }`}
                >
                  {activeSection === link.id && (
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500 shadow-[0_0_6px_rgba(168,85,247,0.8)]" />
                  )}
                  {link.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
