"use client";
import { useEffect, useRef } from "react";

// Crosshair cursor. Only on devices with a precise pointer; rotation is off for reduced motion.
export default function Cursor() {
  const wrap = useRef(null), ring = useRef(null), dot = useRef(null);
  useEffect(() => {
    if (!matchMedia("(pointer: fine)").matches) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.documentElement.classList.add("has-cursor");
    let mx = 0, my = 0, rx = 0, ry = 0, rot = 0, raf;
    const move = (e) => {
      mx = e.clientX; my = e.clientY;
      wrap.current.style.opacity = 1;
      dot.current.style.transform = `translate(${mx}px, ${my}px)`;
    };
    const tick = () => {
      rx += (mx - rx) * 0.25; ry += (my - ry) * 0.25;
      if (!reduce) rot += 0.8;
      ring.current.style.transform = `translate(${rx}px, ${ry}px) rotate(${rot}deg)`;
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("mousemove", move);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);
  return (
    <div className="cursor" ref={wrap} aria-hidden="true">
      <svg ref={ring} className="cursor-ring" viewBox="0 0 40 40" fill="none" stroke="currentColor">
        <circle cx="20" cy="20" r="14" strokeWidth="1" opacity=".8" />
        <path d="M20 2v8M20 30v8M2 20h8M30 20h8" strokeWidth="1.5" />
        <circle cx="20" cy="20" r="2" fill="currentColor" opacity=".6" />
      </svg>
      <div ref={dot} className="cursor-dot" />
    </div>
  );
}
