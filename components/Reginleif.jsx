"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useFx } from "./FxProvider";

const W = 220, H = 140;
const load = (n) => { const i = new Image(); i.src = `/reginleif${n}.png`; return i; };

// A Reginleif sprite that rises from the bottom and crawls along it. Contact page only.
// Needs /public/reginleif2-6.png and reginleif11-14.png; draws nothing if they're missing.
export default function Reginleif() {
  const { fx } = useFx();
  const path = usePathname();
  const on = fx && path === "/contact";
  const ref = useRef(null);

  useEffect(() => {
    if (!on) return;
    const cv = ref.current, ctx = cv.getContext("2d");
    const resize = () => { cv.width = innerWidth; cv.height = innerHeight; };
    resize();
    const crawl = [2, 3, 4, 5, 6].map(load), deploy = [11, 12, 13, 14].map(load);
    let state = "deploy", fi = 0, ft = 0, fc = 0, x = -W, y = innerHeight + H, vx = 1.4, raf;
    const target = () => innerHeight - H - 6;

    const draw = (im, flip, tilt = 0) => {
      if (!im.complete || !im.naturalWidth) return;
      const sc = Math.min(W / im.naturalWidth, H / im.naturalHeight), dw = im.naturalWidth * sc, dh = im.naturalHeight * sc;
      ctx.save(); ctx.translate(x + W / 2, y + H / 2); ctx.rotate(tilt);
      if (flip) ctx.scale(-1, 1);
      ctx.drawImage(im, -dw / 2, H / 2 - dh, dw, dh);
      ctx.restore();
    };

    const loop = () => {
      ctx.clearRect(0, 0, cv.width, cv.height);
      fc++;
      if (state === "deploy") {
        if (++ft >= 8) { ft = 0; if (++fi >= deploy.length) state = "rise"; }
      } else if (state === "rise") {
        y -= 2.5;
        if (y <= target()) { y = target(); state = "crawl"; }
        draw(deploy[deploy.length - 1], vx < 0);
      } else {
        y = target();
        if (++ft >= 7) { ft = 0; fi = (fi + 1) % crawl.length; }
        x += vx;
        if (vx > 0 && x > cv.width) vx = -vx;
        else if (vx < 0 && x < -W) vx = -vx;
        draw(crawl[fi], vx < 0, Math.sin(fc * 0.08) * 0.025);
      }
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("resize", resize);
    loop();
    return () => { window.removeEventListener("resize", resize); cancelAnimationFrame(raf); };
  }, [on]);

  return on ? <canvas ref={ref} className="fx-canvas floor" aria-hidden="true" /> : null;
}
