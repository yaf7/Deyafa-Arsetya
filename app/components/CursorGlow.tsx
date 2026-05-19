"use client";

import { useEffect, useRef, useCallback } from "react";

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glow = glowRef.current;
    const inner = innerRef.current;
    if (!glow) return;

    // Check if it's likely a touch device — skip everything
    const isTouchDevice = window.matchMedia("(hover: none)").matches;
    if (isTouchDevice) return;

    let animFrame: number;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let innerX = 0;
    let innerY = 0;
    let isVisible = true;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const handleVisibility = () => {
      isVisible = !document.hidden;
      if (isVisible) animFrame = requestAnimationFrame(animate);
    };

    const animate = () => {
      if (!isVisible) return;

      // Use transform instead of left/top — avoids layout thrashing
      currentX += (targetX - currentX) * 0.07;
      currentY += (targetY - currentY) * 0.07;
      glow.style.transform = `translate3d(${currentX - 250}px, ${currentY - 250}px, 0)`;

      if (inner) {
        innerX += (targetX - innerX) * 0.15;
        innerY += (targetY - innerY) * 0.15;
        inner.style.transform = `translate3d(${innerX - 60}px, ${innerY - 60}px, 0)`;
      }

      animFrame = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("visibilitychange", handleVisibility);
    animFrame = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("visibilitychange", handleVisibility);
      cancelAnimationFrame(animFrame);
    };
  }, []);

  return (
    <>
      <div ref={glowRef} className="cursor-glow hidden md:block" />
      <div ref={innerRef} className="cursor-glow-inner hidden md:block" />
    </>
  );
}
