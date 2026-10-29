import type { Metadata } from "next";
import ProjectDocument from "@/components/ProjectDocument";
import {
  socialSimulationCitations,
  socialSimulationPapers,
  socialSimulationSections,
  socialSimulationTeam,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "Social Simulation | CSAI Research",
  description:
    "Agentic orchestration and long-horizon tool-use evaluation. Research led by Namish Mannepalli.",
};

export default function SocialSimulationPage() {
  return (
    <ProjectDocument
      name="Social Simulation"
      summary="Agentic orchestration and long-horizon tool-use evaluation"
      lead="Namish Mannepalli"
      team={socialSimulationTeam}
      term="2026–2027"
      sections={socialSimulationSections}
      papers={socialSimulationPapers}
      citations={socialSimulationCitations}
      artwork={{ src: "/projects/ink/social-simulation-ink.png", width: 564, height: 818 }}
    />
  );
}
