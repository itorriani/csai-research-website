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
  { label: "About", href: "/about" },
  { label: "Collections", href: "/collections" },
];

export const heroNavRight = [
  { label: "Editorial Board", href: "#" },
  { label: "Join", href: "#" },
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
export type Project = {
  id: string;
  name: string;
  summary: string;
  pi: string;
  /** Shown only on the postcards, where the caption runs as a paragraph. */
  lab?: string;
  location?: string;
  term?: string;
  /** Project page, where one exists; rows without it stay inert. */
  href?: string;
};

export const projects: Project[] = [
  {
    id: "eeg",
    name: "MIND THE NOISE",
    summary:
      "Artifact detection and clean-data retention in Muse 2 EEG",
    pi: "Zach Goldwyn",
    lab: "Neural Signals Group",
    location: "Cal Poly, San Luis Obispo, California",
    term: "2026–2027",
    href: "/projects/mind-the-noise",
  },
  {
    id: "canary",
    name: "CANARY",
    summary:
      "Adversarial prompt-injection detection across LLM tool-use pipelines",
    pi: "Marek Seablom-Michel",
    lab: "Model Safety Group",
    location: "Cal Poly, San Luis Obispo, California",
    term: "2026–2027",
  },
  {
    id: "ss",
    name: "SOCIAL SIMULATION",
    summary: "Agentic orchestration and long-horizon tool-use evaluation",
    pi: "Namish Mannepalli",
    lab: "Multi-Agent Systems Group",
    location: "Cal Poly, San Luis Obispo, California",
    term: "2026–2027",
  },
];

// Concluded work, shown in the inverted panel beneath the current index.
export const previousProjects: Project[] = [
  {
    id: "adua",
    name: "ADUA",
    summary: "Out of distribution autonomous navigation",
    pi: "Ivan Torriani",
    lab: "Autonomy Group",
    location: "Cal Poly, San Luis Obispo, California",
    term: "2025–2026",
  },
];

// ---------------------------------------------------------------------------
// MIND THE NOISE — project page
// ---------------------------------------------------------------------------

export const mindTheNoiseGap =
  "Current EEG cleaning methods can often get rid of important information, leading to lower quality data. Experiments within the dataset confirm that > 50% of good data is thrown away, with percentages often exceeding 70 or 80 percent. This confirms the quality of EEG data collection.";

export type Paper = {
  /** Served from /public/papers; the .png beside it is the page-one render. */
  slug: string;
  title: string;
  authors: string;
  venue: string;
  /** Natural size of the page-one render, for next/image. */
  width: number;
  height: number;
};

export const mindTheNoisePapers: Paper[] = [
  {
    slug: "muse-automated-data-cleaning",
    title: "Automated Data Cleaning for the Muse EEG",
    authors: "Arnaud Delorme",
    venue: "IEEE BIBM, 2021",
    width: 935,
    height: 1210,
  },
  {
    slug: "wearable-eeg-signal-quality",
    title:
      "Comparison of a Pragmatic and Regression Approach for Wearable EEG Signal Quality Assessment",
    authors: "Witteveen, Pradhapan, Mihajlović",
    venue: "IEEE J. Biomed. Health Inform., 2020",
    width: 908,
    height: 1210,
  },
  {
    slug: "artifact-detection-systematic-review",
    title:
      "A Systematic Review of Techniques for Artifact Detection and Artifact Category Identification in Electroencephalography from Wearable Devices",
    authors: "Arpaia, De Luca, Di Marino, et al.",
    venue: "Systematic Review",
    width: 910,
    height: 1287,
  },
];

// Reading notes on the three papers above, in the order they should be read.
// The third is a PLACEHOLDER pending Zach's notes on the systematic review.
export const mindTheNoiseNotes = [
  "In general, the paper is saying that it’s possible for the MUSE headset to filter noise events and gather artifacts. This is a foundational assumption for the entire research project, as the Muse 2 will be the only device used for collecting and cleaning EEG data. It’s also important to mention that Muse 2 is one of the cheapest options for EEG collection, and that a paper proving its usefulness is vital for the project to be taken seriously.",
  "To be considered before paper 1. It points out that current wearable headsets have very noisy data compared to clinical EEG data collection methods, and that wearable headset methods are largely undeveloped. Some of the reasons they mention are uncontrolled environments, where people are on the move, etc…",
  "PLACEHOLDER. Reading notes on the systematic review go here — what the review covers, which artifact-detection families it surveys, and where its taxonomy lines up with the two papers above. Replace this paragraph with the real summary.",
];

export const mindTheNoisePivots = [
  {
    label: "Pivot 3",
    body: "Neuroscience is a field behind because they can’t use AI. Achieving more accuracy could be beneficial.",
    grade: "Fair",
  },
  {
    label: "Pivot 1",
    body: "MUSE headset is cheaper to use, healthcare could be aided, research accessibility.",
    grade: "Fair",
  },
  {
    label: "Pivot 2",
    body: "Neurological issues might be too far fetched. ADHD or other stuff can be associated with alpha waves, it could address some stuff.",
    grade: "Fair",
  },
];
