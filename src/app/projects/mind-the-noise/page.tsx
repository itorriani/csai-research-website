import type { Metadata } from "next";
import ProjectDocument from "@/components/ProjectDocument";
import {
  mindTheNoiseCitations,
  mindTheNoisePapers,
  mindTheNoiseSections,
  mindTheNoiseTeam,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "Mind the Noise | CSAI Research",
  description:
    "Artifact detection and clean-data retention in Muse 2 EEG. Research led by Zach Goldwyn.",
};

export default function MindTheNoisePage() {
  return (
    <ProjectDocument
      name="Mind the Noise"
      summary="Artifact detection and clean-data retention in Muse 2 EEG"
      lead="Zach Goldwyn"
      team={mindTheNoiseTeam}
      term="2026–2027"
      sections={mindTheNoiseSections}
      papers={mindTheNoisePapers}
      citations={mindTheNoiseCitations}
      artwork={{ src: "/projects/ink/mind-the-noise-ink.png", width: 1200, height: 1500 }}
    />
  );
}
