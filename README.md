# Portfolio starter (Next.js + GSAP + Motion + Satoshi)

1. `npm install`
2. Download Satoshi from https://www.fontshare.com/fonts/satoshi and copy
   `Satoshi-Variable.woff2` into `app/fonts/`
3. Edit `lib/content.js` (name, tagline, about, timeline, contact details)
4. `npm run dev`, then open http://localhost:3000

Pages: `/`, `/about`, `/projects`, `/education`, `/contact`. Put me.jpg, project1.mp4, project2.png, project3.png in `public/`.
- `components/Hero.jsx`: GSAP intro (skipped for reduced motion)
- `components/Header.jsx`: hamburger dropdown + dark/light switch (Motion)
- `components/Timeline.jsx`: clickable year timeline (Motion)
- `components/ContactForm.jsx`: opens the visitor's email app (no backend needed)
Headings use JetBrains Mono via next/font/google (needs internet on first build).
