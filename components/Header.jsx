"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, MotionConfig } from "motion/react";

const items = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/education", label: "Education" },
  { href: "/contact", label: "Contact" },
];

function ThemeToggle() {
  const [theme, setTheme] = useState("dark");
  useEffect(() => setTheme(document.documentElement.dataset.theme || "dark"), []);
  const flip = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch {}
  };
  return (
    <button className="switch" role="switch" aria-checked={theme === "dark"} aria-label="Dark mode" onClick={flip}>
      <span className="knob" />
    </button>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  const wrap = useRef(null);
  const btn = useRef(null);

  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    if (!open) return;
    const key = (e) => { if (e.key === "Escape") { setOpen(false); btn.current?.focus(); } };
    const click = (e) => { if (!wrap.current?.contains(e.target)) setOpen(false); };
    window.addEventListener("keydown", key);
    window.addEventListener("pointerdown", click);
    return () => { window.removeEventListener("keydown", key); window.removeEventListener("pointerdown", click); };
  }, [open]);

  return (
    <MotionConfig reducedMotion="user">
      <header className="header">
        <div className="menu-wrap" ref={wrap}>
          <button ref={btn} className="burger" aria-expanded={open} aria-controls="site-menu" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(!open)}>
            <motion.span className="bar" style={{ top: 0 }} animate={{ y: open ? 8 : 0, rotate: open ? 45 : 0 }} />
            <motion.span className="bar" style={{ top: 8 }} animate={{ opacity: open ? 0 : 1 }} />
            <motion.span className="bar" style={{ top: 16 }} animate={{ y: open ? -8 : 0, rotate: open ? -45 : 0 }} />
          </button>
          <AnimatePresence>
            {open && (
              <motion.nav id="site-menu" className="dropdown" aria-label="Main"
                initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}>
                <ul>
                  {items.map((it) => (
                    <li key={it.href}>
                      <Link href={it.href} aria-current={path === it.href ? "page" : undefined}>{it.label}</Link>
                    </li>
                  ))}
                </ul>
              </motion.nav>
            )}
          </AnimatePresence>
        </div>
        <ThemeToggle />
      </header>
    </MotionConfig>
  );
}
