"use client";

import React, { useState, useEffect } from 'react';
import ScorpioConstellation from './ScorpioConstellation';
import FloatingDecorations from './FloatingDecorations';
import CursorGlow from './CursorGlow';
import { Zap, ZapOff } from 'lucide-react';

export default function EffectsManager() {
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('animationsEnabled');
    if (saved === 'false') {
      setAnimationsEnabled(false);
    }
  }, []);

  const toggleAnimations = () => {
    const newVal = !animationsEnabled;
    setAnimationsEnabled(newVal);
    localStorage.setItem('animationsEnabled', String(newVal));
  };

  // Jangan render efek atau tombol sebelum komponen mount untuk menghindari hydration mismatch
  if (!mounted) return null;

  return (
    <>
      {animationsEnabled && (
        <>
          <ScorpioConstellation />
          <FloatingDecorations />
          <CursorGlow />
        </>
      )}
      
      {/* Toggle Button for Performance Optimization */}
      <button 
        onClick={toggleAnimations}
        className="fixed bottom-6 left-6 z-[100] bg-black/60 backdrop-blur-xl border border-white/10 p-3.5 rounded-full text-gray-400 hover:text-amber-400 hover:bg-white/10 transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.5)] group flex items-center justify-center overflow-hidden"
        title={animationsEnabled ? "Matikan Efek Visual (Mode Performa)" : "Nyalakan Efek Visual"}
      >
        {animationsEnabled ? (
          <Zap size={20} className="drop-shadow-[0_0_10px_rgba(251,191,36,0.5)]" />
        ) : (
          <ZapOff size={20} />
        )}
        
        {/* Tooltip on hover */}
        <span className="absolute left-full ml-4 whitespace-nowrap text-xs font-bold bg-black/80 text-white px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-white/10">
          {animationsEnabled ? "Matikan Efek (Performa)" : "Nyalakan Efek (Visual)"}
        </span>
      </button>
    </>
  );
}
