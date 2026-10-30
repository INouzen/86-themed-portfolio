import { SiReact, SiNextdotjs, SiTailwindcss, SiTypescript, SiFigma, SiLua, SiBlender, SiGithub } from "react-icons/si";
import { about, quotes } from "@/lib/content";

export const metadata = { title: "About" };

const icons = [
  [SiReact, "React"], [SiNextdotjs, "Next.js"], [SiTailwindcss, "Tailwind CSS"], [SiTypescript, "TypeScript"],
  [SiLua, "Lua"], [SiBlender, "Blender"], [SiFigma, "Figma"], [SiGithub, "GitHub"],
];

function Rich({ text }) {
  return text.split("**").map((t, i) => (i % 2 ? <strong key={i}>{t}</strong> : t));
}

export default function About() {
  const h = about.headline;
  return (
    <main className="page">
      <p className="tag center">// PERSONNEL FILE</p>
      <h1 className="page-title center">About Me</h1>
      <div className="two">
        <div>
          <h2 className="lead">{h.before}<span className="accent">{h.accent}</span>{h.after}</h2>
          {about.paragraphs.map((p, i) => <p className="body" key={i}><Rich text={p} /></p>)}
        </div>
        <aside className="card">
          <h3 className="eyebrow accent-text">Personnel file</h3>
          <dl className="stats">
            {about.stats.map((s) => <div key={s.label}><dt>{s.label}</dt><dd>{s.value}</dd></div>)}
          </dl>
          <h3 className="eyebrow accent-text" style={{ marginTop: "2.5rem" }}>Primary stack</h3>
          <ul className="pills">{about.stack.map((s) => <li key={s}>{s}</li>)}</ul>
        </aside>
      </div>
      <ul className="icon-grid" aria-label="Tools I use">
        {icons.map(([Icon, name]) => <li key={name}><Icon size={40} aria-hidden="true" /><span className="sr">{name}</span></li>)}
      </ul>
      <p className="quote center">{quotes.about}</p>
    </main>
  );
}
