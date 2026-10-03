// All copy below is PLACEHOLDER content. Replace with real journal data.

export type Article = {
  id: string;
  category: string;
  date: string;
  title: string;
  excerpt: string;
};

export const articles: Article[] = [
  {
    id: "placeholder-001",
    category: "Placeholder Category",
    date: "07/15/2026",
    title:
      "Placeholder headline describing a notable finding from a recent study",
    excerpt:
      "Author and colleagues report a placeholder summary of the work, the population or dataset studied, and the headline result. This paragraph stands in for the short editorial blurb that accompanies each featured article on the homepage.",
  },
  {
    id: "placeholder-002",
    category: "Placeholder Category",
    date: "06/18/2026",
    title: "Placeholder headline for a methods paper evaluating an approach",
    excerpt:
      "Author and colleagues systematically evaluate the effectiveness of several placeholder methods under varied conditions. The study achieves placeholder performance while highlighting limits influenced by sample size and measurement resolution.",
  },
  {
    id: "placeholder-003",
    category: "Placeholder Category",
    date: "06/02/2026",
    title: "Placeholder headline summarising results from a multi-site cohort",
    excerpt:
      "A placeholder description of the cohort, the duration of follow-up, and the primary outcome measured. Secondary findings are summarised in a second clause to approximate the length of a real homepage blurb.",
  },
  {
    id: "placeholder-004",
    category: "Placeholder Category",
    date: "05/27/2026",
    title: "Placeholder headline on a comparative analysis of two frameworks",
    excerpt:
      "Author and colleagues compare two placeholder frameworks across a shared benchmark, reporting where each performs well and where the differences fall inside the margin of error.",
  },
  {
    id: "placeholder-005",
    category: "Placeholder Category",
    date: "05/11/2026",
    title: "Placeholder headline describing a new open dataset release",
    excerpt:
      "A placeholder account of how the dataset was collected, what it contains, how it is licensed, and the kinds of downstream research it is intended to support.",
  },
  {
    id: "placeholder-006",
    category: "Placeholder Category",
    date: "04/29/2026",
    title: "Placeholder headline for a systematic review of the literature",
    excerpt:
      "Author and colleagues screen a placeholder number of records and synthesise the subset meeting inclusion criteria, reporting consistent effects alongside notable sources of heterogeneity.",
  },
];

export const heroNavLeft = [
  { label: "Highlights", href: "#" },
  { label: "Browse", href: "#" },
  { label: "Collections", href: "#" },
  { label: "Archive", href: "#" },
];

export const heroNavRight = [
  { label: "About", href: "/about" },
  { label: "Editorial Board", href: "#" },
  { label: "Submit", href: "#" },
  { label: "Login", href: "#" },
];

export const footerColumns = [
  {
    heading: "For Authors",
    links: ["Submission Guidelines", "Editorial Policies", "Author Resources"],
  },
  {
    heading: "About",
    links: ["Who We Are", "Editorial Board", "Application", "Contact Us"],
  },
  {
    heading: "Connect",
    links: ["LinkedIn", "Social"],
  },
];

export const aboutIntro =
  "CSAI Research was created to give one of the most professional research experiences for undergraduates at California Polytechnic State University, San Luis Obispo.";

export const aboutLead = "Our organization is driven by three core values:";

export const coreValues = [
  {
    term: "Impact",
    body: "We want to solve problems that haven’t been solved before. We value researchers who are ambitious, idealistic, and even unrealistic with what they can achieve. We want to give those people a platform and resources to create their most far-fetched discovery yet.",
  },
  {
    term: "Rigor",
    body: "We uphold real professional standards for our research papers. Submissions adhere to established frameworks, specifically NeurIPS and IEEE. Submissions also gain credibility through a peer-reviewed process from domain experts from industry, faculty, and more.",
  },
  {
    term: "Aesthetics",
    body: "“It is the intersection of technology and the liberal arts, guided by a human touch, that makes its products meaningful.” AI’s ability to generate almost anything quickly is convenient, but it feels inhumane compared to something that was made with effort, passion, and care. Researchers here recognize that technology alone can’t enrich people’s lives.",
  },
];

// Project index on the homepage. Summaries for CANARY and SS are technical
// PLACEHOLDERS pending real abstracts.
/** Which animated backdrop fades up behind a row on hover. */
export type ProjectEffect = "threads" | "glitch" | "particles" | "ripple";

export type Project = {
  id: string;
  name: string;
  summary: string;
  pi: string;
  effect: ProjectEffect;
};

export const projects: Project[] = [
  {
    id: "eeg",
    name: "MIND THE NOISE",
    summary:
      "Artifact detection and clean-data retention in Muse 2 EEG",
    pi: "Zach Goldwyn",
    // Drifting signal traces, reading as EEG channels.
    effect: "threads",
  },
  {
    id: "canary",
    name: "CANARY",
    summary:
      "Adversarial prompt-injection detection across LLM tool-use pipelines",
    pi: "Marek Seablom-Michel",
    // Characters corrupting in place — a prompt under injection.
    effect: "glitch",
  },
  {
    id: "ss",
    name: "SOCIAL SIMULATION",
    summary: "Agentic orchestration and long-horizon tool-use evaluation",
    pi: "Namish Mannepalli",
    // A drifting swarm, one mote per agent.
    effect: "particles",
  },
];

// Concluded work, shown in the inverted panel beneath the current index.
export const previousProjects: Project[] = [
  {
    id: "adua",
    name: "ADUA",
    summary: "Out of distribution autonomous navigation",
    pi: "Ivan Torriani",
    // An occupancy grid rippling out from the pointer.
    effect: "ripple",
  },
];
