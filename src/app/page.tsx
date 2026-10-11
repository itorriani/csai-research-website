import HeroNav from "@/components/HeroNav";
import SiteFooter from "@/components/SiteFooter";
import ProjectPostcards from "@/components/ProjectPostcards";
import ResearchBackdrop from "@/components/ResearchBackdrop";
import { projects, previousProjects } from "@/lib/content";

export default function Home() {
  return (
    <>
      {/* The first screenful is white and empty but for the nav — the research
          index below it keeps the tones it always had. */}
      <header className="flex min-h-screen flex-col bg-white">
        <HeroNav tone="light" />

        {/* Scroll cue */}
        <div className="mt-auto flex flex-col items-center pb-12 text-ink/40">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            className="h-5 w-5"
            aria-hidden="true"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>
      </header>

      {/* Current and previous research share one surface: the field is
          painted once here so the gradient runs through both panels instead
          of stopping at the seam between them. The extra top padding is
          headroom for the hero fade, so the first heading lands past it. */}
      <div className="relative isolate overflow-hidden bg-[#050509] pt-24 sm:pt-32">
        <ResearchBackdrop />

        <ProjectPostcards
          id="projects"
          heading={<>2026&ndash;2027 Research</>}
          projects={projects}
        />

        <ProjectPostcards
          id="previous-projects"
          heading="Previous Research"
          projects={previousProjects}
          tightTop
          rule
        />
      </div>

      <SiteFooter />
    </>
  );
}
