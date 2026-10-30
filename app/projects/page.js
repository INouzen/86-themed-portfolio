import Sorties from "@/components/Sorties";
import { quotes } from "@/lib/content";

export const metadata = { title: "Projects" };

export default function Projects() {
  return (
    <main className="page">
      <div className="head">
        <div>
          <p className="tag">// JUGGERNAUT SORTIE RECORDS</p>
          <h1 className="page-title">Personal projects</h1>
        </div>
        <p className="body">Spearhead Squadron, Sector 86. Clearance: Level-3.</p>
      </div>
      <Sorties />
      <p className="quote">{quotes.projects}</p>
    </main>
  );
}
