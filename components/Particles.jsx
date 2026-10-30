"use client";
import { useEffect, useRef } from "react";
import { useFx } from "./FxProvider";

// Petals, sparks, slashes and stamens that follow the mouse.
export default function Particles() {
  const { fx } = useFx();
  const ref = useRef(null);

  useEffect(() => {
    if (!fx) return;
    const cv = ref.current, ctx = cv.getContext("2d");
    const col = () => (document.documentElement.dataset.theme === "light" ? [220, 38, 38] : [96, 165, 250]);
    let [r, g, b] = col();
    const mo = new MutationObserver(() => { [r, g, b] = col(); });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    const resize = () => { cv.width = innerWidth; cv.height = innerHeight; };
    resize();

    let ps = [], trail = [], last = 0, lx = 0, ly = 0, raf;
    const c = (k, a) => `rgba(${Math.min(r + k, 255)},${Math.min(g + k, 255)},${Math.min(b + k, 255)},${a})`;

    const petal = (x, y, s, rot, a) => {
      ctx.save(); ctx.translate(x, y); ctx.rotate(rot);
      ctx.beginPath(); ctx.moveTo(0, 0);
      ctx.bezierCurveTo(s * 0.3, -s * 0.5, s * 0.5, -s * 1.5, 0, -s * 2);
      ctx.bezierCurveTo(-s * 0.5, -s * 1.5, -s * 0.3, -s * 0.5, 0, 0);
      const gr = ctx.createLinearGradient(0, 0, 0, -s * 2);
      gr.addColorStop(0, c(0, a)); gr.addColorStop(0.6, c(50, a * 0.8)); gr.addColorStop(1, `rgba(255,255,255,${a * 0.2})`);
      ctx.fillStyle = gr; ctx.fill(); ctx.strokeStyle = c(80, a * 0.4); ctx.lineWidth = 0.5; ctx.stroke();
      ctx.restore();
    };
    const stamen = (x, y, s, rot, a) => {
      ctx.save(); ctx.translate(x, y); ctx.rotate(rot);
      ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, -s * 2.5); ctx.strokeStyle = c(0, a * 0.8); ctx.lineWidth = 0.8; ctx.stroke();
      const gr = ctx.createRadialGradient(0, -s * 2.5, 0, 0, -s * 2.5, s * 0.5);
      gr.addColorStop(0, `rgba(255,255,255,${a})`); gr.addColorStop(0.4, c(80, a * 0.8)); gr.addColorStop(1, c(0, 0));
      ctx.beginPath(); ctx.arc(0, -s * 2.5, s * 0.5, 0, 6.283); ctx.fillStyle = gr; ctx.fill();
      ctx.restore();
    };
    const spark = (x, y, s, a) => {
      const gr = ctx.createRadialGradient(x, y, 0, x, y, s * 0.8);
      gr.addColorStop(0, `rgba(255,255,255,${a})`); gr.addColorStop(0.3, c(80, a * 0.9)); gr.addColorStop(1, c(0, 0));
      ctx.beginPath(); ctx.arc(x, y, s * 0.8, 0, 6.283); ctx.fillStyle = gr; ctx.fill();
    };
    const slash = (x, y, s, rot, a) => {
      ctx.save(); ctx.translate(x, y); ctx.rotate(rot);
      const gr = ctx.createLinearGradient(-s * 1.5, 0, s * 1.5, 0);
      gr.addColorStop(0, c(0, 0)); gr.addColorStop(0.3, c(60, a)); gr.addColorStop(0.5, `rgba(255,255,255,${a})`); gr.addColorStop(0.7, c(60, a)); gr.addColorStop(1, c(0, 0));
      ctx.beginPath(); ctx.moveTo(-s * 1.5, 0); ctx.lineTo(s * 1.5, 0); ctx.strokeStyle = gr; ctx.lineWidth = 2; ctx.stroke();
      ctx.restore();
    };

    const move = (e) => {
      const now = performance.now();
      if (now - last < 25) return;
      last = now;
      const dx = e.clientX - lx, dy = e.clientY - ly, fast = Math.hypot(dx, dy) > 25;
      lx = e.clientX; ly = e.clientY;
      trail.push({ x: lx, y: ly, a: 0 });
      if (trail.length > 14) trail.shift();
      for (let i = 0; i < (fast ? 4 : 2); i++) {
        const q = Math.random();
        const type = fast ? (q < 0.35 ? "petal" : q < 0.6 ? "slash" : q < 0.85 ? "spark" : "stamen") : q < 0.6 ? "petal" : "stamen";
        ps.push({
          x: lx + (Math.random() - 0.5) * (fast ? 24 : 10), y: ly + (Math.random() - 0.5) * (fast ? 24 : 10),
          vx: (Math.random() - 0.5) * (fast ? 4.5 : 1.5) + (fast ? dx * 0.08 : 0),
          vy: -Math.random() * (fast ? 4.5 : 2) - 0.8 + (fast ? dy * 0.08 : 0),
          life: Math.random() * (fast ? 35 : 55) + 20, size: Math.random() * (fast ? 11 : 7) + 3,
          type, rot: Math.random() * 6.283, rs: (Math.random() - 0.5) * (fast ? 0.22 : 0.08),
        });
      }
      if (ps.length > 100) ps = ps.slice(-100);
    };

    const loop = () => {
      ctx.clearRect(0, 0, cv.width, cv.height);
      trail = trail.map((p) => ({ ...p, a: p.a + 1 })).filter((p) => p.a < 12);
      for (let i = 1; i < trail.length; i++) {
        const t = i / trail.length;
        ctx.beginPath(); ctx.moveTo(trail[i - 1].x, trail[i - 1].y); ctx.lineTo(trail[i].x, trail[i].y);
        ctx.strokeStyle = c(0, t * 0.2); ctx.lineWidth = t * 2; ctx.lineCap = "round"; ctx.stroke();
      }
      ps = ps.filter((p) => p.life > 0);
      for (const p of ps) {
        const a = p.life > 10 ? 0.85 : (p.life / 10) * 0.85;
        p.x += p.vx; p.y += p.vy; p.vy += 0.05; p.vx *= 0.97; p.rot += p.rs; p.life--;
        if (p.type === "petal") petal(p.x, p.y, p.size, p.rot, a);
        else if (p.type === "stamen") stamen(p.x, p.y, p.size, p.rot, a);
        else if (p.type === "slash") slash(p.x, p.y, p.size, p.rot, a);
        else spark(p.x, p.y, p.size, a);
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("resize", resize);
    loop();
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
      mo.disconnect();
    };
  }, [fx]);

  return fx ? <canvas ref={ref} className="fx-canvas" aria-hidden="true" /> : null;
}
