import type { Metadata } from "next";
import ProjectDocument from "@/components/ProjectDocument";
import {
  canaryCitations,
  canaryPapers,
  canarySections,
  canaryTeam,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "Canary | CSAI Research",
  description:
    "Adversarial prompt-injection detection across LLM tool-use pipelines. Research led by Marek Seablom-Michel.",
};

export default function CanaryPage() {
  return (
    <ProjectDocument
      name="Canary"
      summary="Adversarial prompt-injection detection across LLM tool-use pipelines"
      lead="Marek Seablom-Michel"
      team={canaryTeam}
      term="2026–2027"
      sections={canarySections}
      papers={canaryPapers}
      citations={canaryCitations}
      artwork={{ src: "/projects/ink/canary-ink.png", width: 486, height: 640 }}
    />
  );
}
