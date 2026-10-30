"use client";
import { useEffect, useState } from "react";

// Corner triangles that retract while scrolling.
export default function Corners() {
  const [s, setS] = useState(false);
  useEffect(() => {
    let t;
    const f = () => { setS(true); clearTimeout(t); t = setTimeout(() => setS(false), 800); };
    window.addEventListener("scroll", f, { passive: true });
    return () => { window.removeEventListener("scroll", f); clearTimeout(t); };
  }, []);
  return (
    <>
      <div className={`corner tl${s ? " off" : ""}`} aria-hidden="true" />
      <div className={`corner br${s ? " off" : ""}`} aria-hidden="true" />
    </>
  );
}
