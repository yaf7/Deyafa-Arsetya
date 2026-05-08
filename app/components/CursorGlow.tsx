"use client";

import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glow = glowRef.current;
    const inner = innerRef.current;
    if (!glow) return;

    let animFrame: number;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let innerX = 0;
    let innerY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const animate = () => {
      // Outer glow — slow, lazy follow
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      glow.style.left = `${currentX}px`;
      glow.style.top = `${currentY}px`;

      // Inner glow — faster, snappier follow
      if (inner) {
        innerX += (targetX - innerX) * 0.18;
        innerY += (targetY - innerY) * 0.18;
        inner.style.left = `${innerX}px`;
        inner.style.top = `${innerY}px`;
      }

      animFrame = requestAnimationFrame(animate);
    };

    // Check if it's likely a touch device
    const isTouchDevice = window.matchMedia("(hover: none)").matches;
    if (!isTouchDevice) {
      window.addEventListener("mousemove", handleMouseMove);
      animFrame = requestAnimationFrame(animate);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
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
