import SiteFooter from "@/components/SiteFooter";
import ResearchPoster from "@/components/ResearchPoster";
import ProjectStills from "@/components/ProjectStills";
import { projects, previousProjects } from "@/lib/content";

export default function Home() {
  return (
    <>
      {/* The page opens on the run itself. The cover is the first still in
          it rather than a white screen above it, so the mark is drawn over a
          painting and the research stacks straight onto it — the first
          scroll is a cut to the first project, not a departure from a band
          of paper.

          The nav and the mark are not passed in here: the run carries its own
          chrome, pinned above every card, because the mark travels out of the
          cover and into the nav as the first card rises.

          It sits outside the panel below rather than inside it: sticky
          positioning is scoped to its nearest scroll container, and that
          panel clips its own gradient with overflow-hidden, which would make
          every still stick to the panel instead of to the screen and kill
          the stacking outright. */}
      <ProjectStills
        id="projects"
        projects={projects}
        images={{
          eeg: "/projects/mind-the-noise-ocean.jpg",
          canary: "/projects/canary-siren-color.jpg",
          ss: "/projects/social-simulation-march.jpg",
        }}
        cover={{ image: "/projects/cover-orrery.jpg" }}
      />

      {/* Concluded work, on paper. It carries its own white ground rather
          than the painted dark field the run above it is lit on, so the cut
          out of the stills is also the cut out of the season. */}
      <ResearchPoster
        id="previous-projects"
        heading={<>Spring 2025&ndash;2026 Research</>}
        project={previousProjects[0]}
        poster="/projects/adua-poster.jpg"
      />

      <SiteFooter />
    </>
  );
}
