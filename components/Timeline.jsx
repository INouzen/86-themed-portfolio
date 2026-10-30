"use client";
import { useState } from "react";
import { AnimatePresence, motion, MotionConfig } from "motion/react";
import { education } from "@/lib/content";

export default function Timeline() {
  const [i, setI] = useState(0);
  const cur = education.items[i];
  return (
    <MotionConfig reducedMotion="user">
      <div className="timeline" role="group" aria-label="Timeline">
        <div className="years" style={{ gridTemplateColumns: `repeat(${education.items.length}, 1fr)` }}>
          {education.items.map((it, n) => (
            <button key={it.year} className="year" aria-current={n === i ? "true" : undefined} onClick={() => setI(n)}>
              <span className="year-label">{it.year}</span>
              <span className="dot" />
            </button>
          ))}
        </div>
        <div className="detail" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }}>
              <p className="eyebrow">{cur.date}</p>
              <h3>{cur.title}</h3>
              <p className="detail-text">{cur.text}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </MotionConfig>
  );
}
