"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, MotionConfig } from "motion/react";

const ALERTS = [
  "LEGION CONTACT DETECTED // SECTOR 86",
  "JUGGERNAUT UNIT ONLINE // PROCESSOR: UNDERTAKER",
  "PARA-RAID LINK ESTABLISHED // SPEARHEAD SQ.",
  "WARNING: AMEISE-CLASS UNITS APPROACHING",
  "SHEPHERD SIGNAL INTERCEPTED // STAY ALERT",
];

// Decorative status bar, hidden from screen readers.
export default function Ticker() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % ALERTS.length), 3500);
    return () => clearInterval(t);
  }, []);
  return (
    <MotionConfig reducedMotion="user">
      <div className="ticker" aria-hidden="true">
        <span className="ticker-tag">⚠ LEGION ALERT</span>
        <span className="ticker-sep" />
        <AnimatePresence mode="wait">
          <motion.span key={i} className="ticker-msg" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.3 }}>
            {ALERTS[i]}
          </motion.span>
        </AnimatePresence>
        <span className="ticker-unit">UNIT: JUGGERNAUT-01 <i className="pulse" /></span>
      </div>
    </MotionConfig>
  );
}
