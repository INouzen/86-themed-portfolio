import Timeline from "@/components/Timeline";
import { education } from "@/lib/content";

export const metadata = { title: "Education" };

export default function Education() {
  return (
    <main className="page">
      <div className="head">
        <div>
          <p className="tag">// PERSONNEL LOG: EDUCATION</p>
          <h1 className="page-title">{education.title}</h1>
        </div>
        <p className="body">{education.intro}</p>
      </div>
      <Timeline />
    </main>
  );
}
