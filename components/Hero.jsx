"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { FiMail, FiArrowRight } from "react-icons/fi";
import { profile } from "@/lib/content";

function Line({ text }) {
  return (
    <span className="line" aria-hidden="true">
      {[...text].map((c, i) => <span className="char" key={i}>{c}</span>)}
    </span>
  );
}

function Typewriter() {
  const roles = profile.roles;
  const [r, setR] = useState(0);
  const [text, setText] = useState("");
  const [del, setDel] = useState(false);
  const [still, setStill] = useState(false);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { setStill(true); setText(roles[0]); }
  }, []);

  useEffect(() => {
    if (still) return;
    const cur = roles[r];
    let t;
    if (!del && text.length < cur.length) t = setTimeout(() => setText(cur.slice(0, text.length + 1)), 80);
    else if (!del) t = setTimeout(() => setDel(true), 1800);
    else if (text.length > 0) t = setTimeout(() => setText(cur.slice(0, text.length - 1)), 40);
    else { setDel(false); setR((n) => (n + 1) % roles.length); }
    return () => clearTimeout(t);
  }, [text, del, r, still]);

  return (
    <p className="roles">
      <span className="sr">{roles.join(" ")}</span>
      <span aria-hidden="true">{text}<span className="blink">█</span></span>
    </p>
  );
}

export default function Hero() {
  const root = useRef(null);
  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.timeline({ defaults: { ease: "expo.out" } })
        .from(".unit-label", { opacity: 0, x: -20, duration: 0.6 })
        .from(".avatar", { scale: 0, duration: 0.8, ease: "back.out(1.7)" }, "<0.1")
        .from(".callsign", { opacity: 0, y: 8, duration: 0.6 }, "<0.15")
        .from(".char", { yPercent: 110, duration: 1.3, stagger: 0.035 }, "<0.1")
        .from(".rule, .bio, .cta, .tagline", { opacity: 0, y: 12, duration: 0.7, stagger: 0.1 }, "-=0.8");
    }, root);
    return () => mm.revert();
  }, []);

  return (
    <main className="hero" ref={root}>
      <div className="unit-label">{profile.unit}</div>
      <div className="avatar"><img src="/me.jpg" alt="Liam Felipe" /></div>
      <p className="callsign tag">// CALLSIGN: UNDERTAKER</p>
      <h1 aria-label={`${profile.firstName} ${profile.lastName}`}>
        <Line text={profile.firstName} />
        <Line text={profile.lastName} />
      </h1>
      <Typewriter />
      <div className="rule" />
      <p className="bio">{profile.bio}</p>
      <div className="cta">
        <Link href="/contact" className="btn btn-fill"><FiMail aria-hidden="true" /> Get in touch</Link>
        <Link href="/projects" className="btn btn-line">View projects <FiArrowRight aria-hidden="true" /></Link>
      </div>
      <p className="tagline">{profile.tagline}</p>
    </main>
  );
}