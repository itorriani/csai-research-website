import type { Metadata } from "next";
import ProjectDocument from "@/components/ProjectDocument";
import {
  aduaCitations,
  aduaPapers,
  aduaSections,
  aduaTeam,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "ADUA | CSAI Research",
  description:
    "Out-of-distribution autonomous navigation. Research led by Ivan Torriani.",
};

export default function AduaPage() {
  return (
    <ProjectDocument
      name="ADUA"
      summary="Out-of-distribution autonomous navigation"
      lead="Ivan Torriani"
      team={aduaTeam}
      term="2025–2026"
      sections={aduaSections}
      papers={aduaPapers}
      citations={aduaCitations}
    />
  );
}
