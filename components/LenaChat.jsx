"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, MotionConfig } from "motion/react";
import { FiX, FiSend, FiMinus } from "react-icons/fi";

const GREETING = "I am Colonel Vladilena Milizé of the San Magnolia Republic. It’s an honor to assist you.";

export default function LenaChat() {
  const [open, setOpen] = useState(false);
  const [min, setMin] = useState(false);
  const [msgs, setMsgs] = useState([{ role: "assistant", content: GREETING }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [imgOk, setImgOk] = useState(true);
  const end = useRef(null), field = useRef(null);

  useEffect(() => { end.current?.scrollIntoView({ block: "end" }); }, [msgs, loading, open, min]);
  useEffect(() => { if (open && !min) field.current?.focus(); }, [open, min]);
  useEffect(() => {
    if (!open) return;
    const key = (e) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [open]);

  const send = async (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;
    const next = [...msgs, { role: "user", content: text }];
    setMsgs(next); setInput(""); setLoading(true);
    try {
      const res = await fetch("/api/lena", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ messages: next }) });
      const data = await res.json();
      setMsgs((m) => [...m, { role: "assistant", content: data.reply || "...The signal was disrupted." }]);
    } catch {
      setMsgs((m) => [...m, { role: "assistant", content: "...The signal was disrupted." }]);
    } finally { setLoading(false); }
  };

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence>
        {!open && (
          <motion.button key="open" className="lena-open" onClick={() => setOpen(true)}
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}>
            <span className="live" aria-hidden="true" /> PARA-RAID // HANDLER ONE
          </motion.button>
        )}
        {open && (
          <motion.section key="win" className="lena" role="dialog" aria-label="Chat with Handler One"
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 30 }} transition={{ type: "spring", stiffness: 300, damping: 30 }}>
            <header className="lena-head">
              <div className="lena-who">
                <span className="lena-avatar">
                  {imgOk ? <img src="/lena.jpg" alt="" onError={() => setImgOk(false)} /> : "LM"}
                </span>
                <span>
                  <strong>Vladilena Milizé</strong>
                  <small><span className="live" aria-hidden="true" /> Handler One // Para-RAID active</small>
                </span>
              </div>
              <div className="lena-actions">
                <button onClick={() => setMin(!min)} aria-label={min ? "Expand chat" : "Minimize chat"}><FiMinus /></button>
                <button onClick={() => setOpen(false)} aria-label="Close chat"><FiX /></button>
              </div>
            </header>
            {!min && (
              <>
                <div className="lena-log" role="log" aria-live="polite">
                  <p className="lena-sys">// PARA-RAID NEURAL LINK ESTABLISHED //</p>
                  {msgs.map((m, i) => (
                    <div key={i} className={`lena-row ${m.role}`}>
                      <div className="lena-bubble">
                        <small>{m.role === "user" ? "Undertaker" : "Handler One"}</small>
                        {m.content}
                      </div>
                    </div>
                  ))}
                  {loading && <div className="lena-row assistant"><div className="lena-bubble"><small>Handler One</small>…</div></div>}
                  <div ref={end} />
                </div>
                <form className="lena-form" onSubmit={send}>
                  <label className="sr" htmlFor="lena-input">Message</label>
                  <input id="lena-input" ref={field} value={input} onChange={(e) => setInput(e.target.value)} placeholder="Speak, Processor..." maxLength={500} autoComplete="off" />
                  <button type="submit" disabled={loading || !input.trim()} aria-label="Send"><FiSend /></button>
                </form>
              </>
            )}
          </motion.section>
        )}
      </AnimatePresence>
    </MotionConfig>
  );
}
