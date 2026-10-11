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
    href: "/projects/canary",
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

// Mind the Noise, the project document. Three movements: the gap, what the
// project does about it, and where the method could go next.
export const mindTheNoiseSections: {
  /** Kept as an authoring key only — the page renders no section headings. */
  label: string;
  body: string;
  points?: string[];
}[] = [
  {
    label: "Hook",
    body: ".00001% of the human brain has been mapped in full detail, according to Harvard and Google scientists Viren Jain and Jeff Lichtman. For reference, the ocean is considered one of the most mysterious and unexplored domains in the world, and has 27% mapped. With this lack of information, we can’t understand some of the most fundamental human operations like consciousness, memory, attention, decision making, emotion, and learning.",
  },
  {
    label: "Solution",
    body: "One of the key solutions to this problem is collecting massive amounts of electroencephalography (EEG) data, which record the brain’s electrical activity through electrodes on the scalp. However, collecting clean EEG readings is incredibly difficult, often only having < 30% clean data per reading, which is why so little of the brain is understood. Mind the Noise sets out to develop novel methods to collect and clean EEG data with the Muse 2 headset.",
  },
  {
    label: "Future Opportunities",
    body: "The methods developed in this research has the potential to:",
    points: [
      "Bridge AI and neuroscience sectors like cognitive neuroscience, clinical neurophysiology, and more, by finally providing models with clean, quality data that can be used in training sets.",
      "Accelerate research across neuroscience, medicine, and psychology by uniquely leveraging one of the most affordable EEG reading technologies, the Muse 2 headset.",
      "Inspire one of the first at-home solutions to diagnosing neurological issues which can currently only be addressed through hospital grade hardware and methods.",
    ],
  },
];

// Zach's team, per the 2026-27 team selection sheet.
export const mindTheNoiseTeam = [
  "Benjamin DeMayo",
  "Samuel Fakhouri",
  "Rushil Ghosh",
  "Namit Jain",
  "Shrinithi Shaurya",
];

// MLA 9 works-cited entries. `locator` is the DOI or URL printed at the end
// of the entry, per MLA; `href` is what it points at.
export type Citation = {
  mla: string;
  locator?: string;
  href?: string;
};

// Mind the Noise, alphabetised by author as MLA requires.
export const mindTheNoiseCitations: Citation[] = [
  {
    mla: "Arpaia, Pasquale, et al. \u201CA Systematic Review of Techniques for Artifact Detection and Artifact Category Identification in Electroencephalography from Wearable Devices.\u201D Sensors, vol. 25, no. 18, 2025, article 5770.",
    locator: "doi.org/10.3390/s25185770",
    href: "/papers/artifact-detection-systematic-review.pdf",
  },
  {
    mla: "Delorme, Arnaud. \u201CAutomated Data Cleaning for the Muse EEG.\u201D 2021 IEEE International Conference on Bioinformatics and Biomedicine (BIBM), IEEE, 2021.",
    locator: "doi.org/10.1109/BIBM52615.2021.9669415",
    href: "/papers/muse-automated-data-cleaning.pdf",
  },
  {
    mla: "Nippon Foundation\u2013GEBCO Seabed 2030 Project. \u201CSeabed 2030 Announces Millions of Square Kilometres of New Seafloor Data on World Hydrography Day.\u201D Seabed 2030, 21 June 2025.",
    locator: "seabed2030.org",
    href: "https://seabed2030.org/2025/06/21/seabed-2030-announces-millions-of-square-kilometers-of-new-seafloor-data-on-world-hydrography-day/",
  },
  {
    mla: "Shapson-Coe, Alexander, et al. \u201CA Petavoxel Fragment of Human Cerebral Cortex Reconstructed at Nanoscale Resolution.\u201D Science, vol. 384, no. 6696, 2024.",
    locator: "doi.org/10.1126/science.adk4858",
    href: "https://doi.org/10.1126/science.adk4858",
  },
  {
    mla: "Witteveen, Jolanda, et al. \u201CComparison of a Pragmatic and Regression Approach for Wearable EEG Signal Quality Assessment.\u201D IEEE Journal of Biomedical and Health Informatics, vol. 24, no. 3, 2020.",
    href: "/papers/wearable-eeg-signal-quality.pdf",
  },
];

// ---------------------------------------------------------------- CANARY

// Marek's team, per the 2026-27 team selection sheet.
export const canaryTeam = [
  "Chace Lai",
  "Dhruv Jadhav",
  "Miles Schulist",
  "Samson Chang",
  "Johan Jijo",
];

export const canarySections: {
  /** Kept as an authoring key only — the page renders no section headings. */
  label: string;
  body: string;
  points?: string[];
}[] = [
  {
    label: "Hook",
    body: "Prompt injection involves an attacker who hides instructions in content an AI receives, which can make the agent do malicious activity; it’s rated as the #1 risk on OWASP for AI applications, and in a large-scale public red-teaming competition every one of the 13 frontier models tested \u2014 Claude, ChatGPT, and Gemini among them \u2014 was successfully exploited. With Gartner projecting a 700% rise in enterprise applications carrying task-specific AI agents, if prompt injection can’t be properly addressed, corporations can be exploited, critical infrastructure can be penetrated, and technological development will slow down.",
  },
  {
    label: "Solution",
    body: "Addressing prompt injection can be divided into two paths: gaining awareness of possible attacks and creating software to help systems defend against attacks that have already been made. CANARY sets out to create measurement tools to help companies test their systems against prompt injection, bring light to unique attacks, and defend against them.",
  },
  {
    label: "Future Opportunities",
    body: "The methods developed in this research can:",
    points: [
      "Protect the next generation of AI-assisted software development in large industries and startups by creating new protection against prompt injection attacks.",
      "Provide vital infrastructure to industries by advancing measurement strategies to more accurately benchmark models.",
      "Prepare the growing amount of agents embedded into people’s emails, phonebooks, and lives by discovering new prompt injection attacks that could take place.",
    ],
  },
];

export const canaryPapers: Paper[] = [
  {
    slug: "indirect-prompt-injection-realworld",
    title:
      "Not What You’ve Signed Up For: Compromising Real-World LLM-Integrated Applications with Indirect Prompt Injection",
    authors: "Greshake, Abdelnabi, Mishra, et al.",
    venue: "ACM AISec, 2023",
    width: 935,
    height: 1210,
  },
  {
    slug: "formalizing-benchmarking-prompt-injection",
    title: "Formalizing and Benchmarking Prompt Injection Attacks and Defenses",
    authors: "Liu, Jia, Geng, Jia, Gong",
    venue: "USENIX Security, 2024",
    width: 935,
    height: 1210,
  },
  {
    slug: "agentdojo-prompt-injection-benchmark",
    title:
      "AgentDojo: A Dynamic Environment to Evaluate Prompt Injection Attacks and Defenses for LLM Agents",
    authors: "Debenedetti, Zhang, Balunović, et al.",
    venue: "NeurIPS Datasets & Benchmarks, 2024",
    width: 935,
    height: 1210,
  },
];

// Canary, alphabetised by author as MLA requires.
export const canaryCitations: Citation[] = [
  {
    mla: "Debenedetti, Edoardo, et al. \u201CAgentDojo: A Dynamic Environment to Evaluate Prompt Injection Attacks and Defenses for LLM Agents.\u201D Advances in Neural Information Processing Systems 37, Datasets and Benchmarks Track, 2024.",
    href: "/papers/agentdojo-prompt-injection-benchmark.pdf",
  },
  {
    mla: "Dziemian, Mateusz, et al. \u201CHow Vulnerable Are AI Agents to Indirect Prompt Injections? Insights from a Large-Scale Public Competition.\u201D arXiv, 2026.",
    locator: "arxiv.org/abs/2603.15714",
    href: "https://arxiv.org/abs/2603.15714",
  },
  {
    mla: "Gartner, Inc. \u201CGartner Predicts 40% of Enterprise Apps Will Feature Task-Specific AI Agents by 2026, Up from Less Than 5% in 2025.\u201D Gartner Newsroom, 26 Aug. 2025.",
    locator: "gartner.com",
    href: "https://www.gartner.com/en/newsroom/press-releases/2025-08-26-gartner-predicts-40-percent-of-enterprise-apps-will-feature-task-specific-ai-agents-by-2026-up-from-less-than-5-percent-in-2025",
  },
  {
    mla: "Greshake, Kai, et al. \u201CNot What You\u2019ve Signed Up For: Compromising Real-World LLM-Integrated Applications with Indirect Prompt Injection.\u201D Proceedings of the 16th ACM Workshop on Artificial Intelligence and Security, Association for Computing Machinery, 2023.",
    href: "/papers/indirect-prompt-injection-realworld.pdf",
  },
  {
    mla: "Liu, Yupei, et al. \u201CFormalizing and Benchmarking Prompt Injection Attacks and Defenses.\u201D Proceedings of the 33rd USENIX Security Symposium, USENIX Association, 2024.",
    href: "/papers/formalizing-benchmarking-prompt-injection.pdf",
  },
  {
    mla: "OWASP GenAI Security Project. \u201CLLM01:2025 Prompt Injection.\u201D OWASP Top 10 for Large Language Model Applications, 2025.",
    locator: "genai.owasp.org",
    href: "https://genai.owasp.org/llmrisk/llm01-prompt-injection/",
  },
];
