"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { FiZap } from "react-icons/fi";

const Ctx = createContext({ fx: false });
export const useFx = () => useContext(Ctx);

// Holds the on/off state for all visual effects and renders the FX switch.
export default function FxProvider({ children }) {
  const [fx, setFx] = useState(true);

  useEffect(() => {
    let saved = null;
    try { saved = localStorage.getItem("fx"); } catch {}
    if (saved) setFx(saved === "on");
    else if (matchMedia("(prefers-reduced-motion: reduce)").matches) setFx(false);
  }, []);

  const flip = () => {
    const next = !fx;
    setFx(next);
    try { localStorage.setItem("fx", next ? "on" : "off"); } catch {}
  };

  return (
    <Ctx.Provider value={{ fx }}>
      {children}
      <button className="fx-toggle" role="switch" aria-checked={fx} onClick={flip}>
        <FiZap aria-hidden="true" /> {fx ? "FX ON" : "FX OFF"}
      </button>
    </Ctx.Provider>
  );
}
