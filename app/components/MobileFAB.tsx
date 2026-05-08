"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail } from "lucide-react";

export default function MobileFAB() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href="mailto:yafaarsetya@gmail.com"
          initial={{ y: 80, opacity: 0, scale: 0.7 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 80, opacity: 0, scale: 0.7 }}
          transition={{ type: "spring", damping: 22, stiffness: 350 }}
          className="fab-contact md:hidden"
          aria-label="Hubungi via Email"
        >
          <Mail size={16} />
          Hubungi
        </motion.a>
      )}
    </AnimatePresence>
  );
}
