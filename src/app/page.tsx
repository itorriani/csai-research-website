import HeroVideo from "@/components/HeroVideo";
import HeroNav from "@/components/HeroNav";
import SiteFooter from "@/components/SiteFooter";
import ProjectIndex from "@/components/ProjectIndex";
import { projects, previousProjects } from "@/lib/content";

export default function Home() {
  return (
    <>
      <HeroVideo>
        <HeroNav />

        {/* Scroll cue */}
        <div className="mt-auto flex flex-col items-center pb-12 text-white">
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
      </HeroVideo>

      <ProjectIndex
        id="projects"
        heading={<>2026&ndash;2027 Research</>}
        projects={projects}
      />

      <ProjectIndex
        id="previous-projects"
        heading="Previous Research"
        projects={previousProjects}
        tone="light"
      />

      <SiteFooter />
    </>
  );
}
