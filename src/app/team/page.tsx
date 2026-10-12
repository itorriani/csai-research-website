import type { Metadata } from "next";
import DocumentPage from "@/components/DocumentPage";
import MemberCard from "@/components/MemberCard";
import {
  directors,
  previousProjects,
  projects,
  teamsByProject,
  type Project,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "Team | CSAI Research",
  description:
    "The CSAI Research Division: its directors, and the researchers on each year's team.",
};

const HEADING = "doc-heading text-[20px] leading-[1.3] text-black";
const GRID = "mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2";

// Everyone on a year's projects, in one list rather than split by project.
// Leads come first; anyone on two projects appears once, and leading one of
// them outranks being on the other.
function rosterFor(group: Project[]) {
  const seen = new Map<string, string>();

  for (const project of group) {
    seen.set(project.pi, "Research Lead");
  }
  for (const project of group) {
    for (const name of teamsByProject[project.id] ?? []) {
      if (!seen.has(name)) seen.set(name, "Research Team");
    }
  }

  return [...seen].map(([name, title]) => ({ name, title }));
}

export default function TeamPage() {
  const current = rosterFor(projects);
  const previous = rosterFor(previousProjects);

  return (
    <DocumentPage title="Team">
      <h2 className={`${HEADING} mt-12`}>Directors</h2>
      <ul className={GRID}>
        {directors.map((d) => (
          <li key={d.name}>
            <MemberCard name={d.name} title={d.title} />
          </li>
        ))}
      </ul>

      <h2 className={`${HEADING} mt-16`}>2026&ndash;2027 Research Team</h2>
      <ul className={GRID}>
        {current.map((m) => (
          <li key={m.name}>
            <MemberCard name={m.name} title={m.title} />
          </li>
        ))}
      </ul>

      <h2 className={`${HEADING} mt-16`}>2025&ndash;2026 Research Team</h2>
      <ul className={GRID}>
        {previous.map((m) => (
          <li key={m.name}>
            <MemberCard name={m.name} title={m.title} />
          </li>
        ))}
      </ul>
    </DocumentPage>
  );
}
