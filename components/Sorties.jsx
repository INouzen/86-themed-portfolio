"use client";
import { useState } from "react";
import { AnimatePresence, motion, MotionConfig } from "motion/react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { projects } from "@/lib/content";

export default function Sorties() {
  const [i, setI] = useState(0);
  const p = projects[i];
  const n = projects.length;
  const go = (d) => setI((i + d + n) % n);

  return (
    <MotionConfig reducedMotion="user">
      <div className="sortie" role="region" aria-roledescription="carousel" aria-label="Projects"
        onKeyDown={(e) => { if (e.key === "ArrowLeft") go(-1); if (e.key === "ArrowRight") go(1); }}>
        <dl className="mission" aria-live="polite">
          {[["Mission", p.missionId], ["Unit", p.unit], ["Class", p.classification]].map(([k, v]) => (
            <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
          ))}
          <div><dt>Status</dt><dd><i className="pulse" /> {p.status}</dd></div>
        </dl>

        <div className="frame">
          <i className="br-c a" /><i className="br-c b" /><i className="br-c c" /><i className="br-c d" />
          <AnimatePresence mode="wait">
            <motion.div key={i} className="slide" role="group" aria-roledescription="slide" aria-label={`${i + 1} of ${n}`}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
              {p.type === "video"
                ? <video src={p.media} autoPlay loop muted playsInline aria-label={p.title} />
                : <img src={p.media} alt={p.title} />}
              <div className="cap">
                <p className="tag">// OPERATION</p>
                <h3>{p.title}</h3>
              </div>
            </motion.div>
          </AnimatePresence>
          <button className="nav-btn prev" onClick={() => go(-1)} aria-label="Previous project"><FiChevronLeft size={20} /></button>
          <button className="nav-btn next" onClick={() => go(1)} aria-label="Next project"><FiChevronRight size={20} /></button>
        </div>

        <ul className="units">
          {projects.map((q, n2) => (
            <li key={q.unit}>
              <button className="unit" aria-current={n2 === i ? "true" : undefined} onClick={() => setI(n2)}>
                <i className="pulse" /> {q.unit}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </MotionConfig>
  );
}
