// Edit this file. Every page reads from here.
export const profile = {
  firstName: "Liam",
  lastName: "Felipe",
  title: "Web & Game Developer",
  roles: ["Web Developer.", "Game Developer.", "BSIT Student.", "The Undertaker."],
  unit: "UNIT: SPEARHEAD // NOUZEN",
  bio: "2nd Year BSIT Student from AMA Computer College Fairview.",
  tagline: "“I want to keep moving forward.”",
  email: "liamfelipe7212005@gmail.com",
  github: { label: "github.com/INouzen", href: "https://github.com/INouzen" },
  linkedin: { label: "linkedin.com/in/liam-felipe", href: "https://www.linkedin.com/in/liam-felipe-a79a72365/" },
};

export const quotes = {
  about: "“Even so, I will keep moving forward.” — Shinei Nouzen",
  projects: "“We are not tools of the government, or anyone else.” — Shinei Nouzen",
};

export const about = {
  headline: { before: "Web and ", accent: "game", after: " development, one sortie at a time." },
  // Wrap words in **double asterisks** to make them bold.
  paragraphs: [
    "My name is Liam Felipe, a 20-year-old **Information Technology** student at AMA Computer College Fairview. I am passionate about technology and am actively pursuing knowledge in both **web application development** and **game development**, with the goal of building a career in either field.",
    "Outside of academics, I enjoy assembling **Gunpla** and model kits, which has strengthened my attention to detail and patience. I am driven to complete my studies and establish myself in a professional environment where I can continuously grow and contribute to the field of technology.",
  ],
  stats: [
    { label: "Status", value: "ACTIVE" },
    { label: "Year", value: "2ND" },
    { label: "Track", value: "WEB + GAME" },
  ],
  stack: ["Next.js", "React", "Luau", "Blender"],
};

export const projects = [
  { title: "Luau Scripting", media: "/project1.mp4", type: "video", missionId: "OP-001", status: "COMPLETE", unit: "JUGGERNAUT-01", classification: "LUAU SCRIPTING" },
  { title: "Roblox 3D Modeling", media: "/project2.mp4", type: "video", missionId: "OP-002", status: "COMPLETE", unit: "JUGGERNAUT-02", classification: "3D MODELING" },
  { title: "Blender 3D Modeling", media: "/project3.png", type: "image", missionId: "OP-003", status: "ONGOING", unit: "JUGGERNAUT-03", classification: "3D MODELING" },
];

export const education = {
  title: "Education",
  intro: "Where I’ve trained so far.",
  items: [
    { year: "2015", date: "2015 — 2024", title: "Senior High School — STEM", text: "Mater Carmeli School of Novaliches, Fr. Francisco Palau St., Sacred Heart Village, Novaliches, Quezon City, Philippines." },
    { year: "2024", date: "2024 — Present", title: "BS in Information Technology", text: "AMA Computer College Fairview, Bristol St. cor. Regalado Avenue, Fairview, Novaliches, Quezon City, Philippines." },
  ],
};

export const contact = {
  intro: "Currently available for projects and collaboration.",
  status: "Available",
  statusNote: "Open for web and game projects.",
  response: "24–48 hrs",
};