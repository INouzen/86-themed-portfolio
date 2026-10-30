import { FiArrowUpRight } from "react-icons/fi";
import ContactForm from "@/components/ContactForm";
import { profile, contact } from "@/lib/content";

export const metadata = { title: "Contact" };

export default function Contact() {
  const links = [
    { label: "Email", text: profile.email, href: `mailto:${profile.email}` },
    { label: "GitHub", text: profile.github.label, href: profile.github.href },
    { label: "LinkedIn", text: profile.linkedin.label, href: profile.linkedin.href },
  ];
  return (
    <main className="page">
      <div className="head">
        <div>
          <p className="tag">// OPEN CHANNEL</p>
          <h1 className="page-title">Open <span className="accent block">channel.</span></h1>
        </div>
        <p className="body">{contact.intro}</p>
      </div>
      <div className="contact-grid">
        <div>
          <ContactForm />
          <ul className="link-rows">
            {links.map((l) => (
              <li key={l.label}>
                <a href={l.href}>
                  <span><span className="eyebrow">{l.label}</span><span className="link-text">{l.text}</span></span>
                  <FiArrowUpRight size={20} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <aside className="card loc">
          <p className="eyebrow"><span className="live" aria-hidden="true" /> Status</p>
          <p className="loc-city">{contact.status}</p>
          <p className="muted">{contact.statusNote}</p>
          <hr />
          <p className="eyebrow">Response time</p>
          <p className="loc-city">{contact.response}</p>
        </aside>
      </div>
    </main>
  );
}
