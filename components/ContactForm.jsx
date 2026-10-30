"use client";
import { FiSend } from "react-icons/fi";
import { profile } from "@/lib/content";

// Opens the visitor's email app with the message filled in. Swap for an API route later if you want.
export default function ContactForm() {
  const submit = (e) => {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const subject = encodeURIComponent(`Message from ${d.get("name")}`);
    const body = encodeURIComponent(`${d.get("message")}\n\n${d.get("name")} (${d.get("email")})`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  };
  return (
    <form onSubmit={submit} className="form">
      <div className="form-row">
        <label>Name<input name="name" type="text" placeholder="John Doe" required autoComplete="name" /></label>
        <label>Email<input name="email" type="email" placeholder="john@example.com" required autoComplete="email" /></label>
      </div>
      <label>Message<textarea name="message" rows={6} placeholder="How can I help you?" required /></label>
      <button type="submit" className="send">Send Message <FiSend aria-hidden="true" /></button>
    </form>
  );
}
