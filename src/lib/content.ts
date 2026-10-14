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
  { label: "Team", href: "/team" },
  { label: "Policies", href: "/editorial-policies" },
];

// A link without an href is still a placeholder; the footer renders it as
// plain text rather than a dead anchor.
export const footerColumns: {
  heading: string;
  links: { label: string; href?: string }[];
}[] = [
  {
    heading: "For Authors",
    links: [{ label: "Editorial Policies", href: "/editorial-policies" }],
  },
  {
    heading: "About",
    links: [
      { label: "Who We Are", href: "/about" },
      { label: "Team", href: "/team" },
      { label: "Application", href: "/application" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  {
    heading: "Connect",
    links: [
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/company/cs-ai-cal-poly/",
      },
      {
        label: "Instagram",
        href: "https://www.instagram.com/calpolycsai/",
      },
    ],
  },
];

// ---------------------------------------------------------------- CONTACT

// Where the contact sheet's messages are addressed.
export const contactEmail = "sotivantorriani@gmail.com";

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
    summary: "Artifact detection and clean-data retention in Muse 2 EEG",
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
    href: "/projects/social-simulation",
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
    href: "/projects/adua",
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
  /** Shown when the plate is opened. A few sentences, no more. */
  blurb?: string;
};

export const mindTheNoisePapers: Paper[] = [
  {
    slug: "muse-automated-data-cleaning",
    title: "Automated Data Cleaning for the Muse EEG",
    authors: "Arnaud Delorme",
    venue: "IEEE BIBM, 2021",
    width: 935,
    height: 1210,
    blurb:
      "Presents an automated pipeline for removing artifacts from EEG recorded on the Muse, a consumer headset with four dry electrodes. Reports that noise events can be filtered and usable signal recovered from hardware costing a fraction of a clinical rig, and evaluates the cleaned output against standard measures.",
  },
  {
    slug: "wearable-eeg-signal-quality",
    title:
      "Comparison of a Pragmatic and Regression Approach for Wearable EEG Signal Quality Assessment",
    authors: "Witteveen, Pradhapan, Mihajlović",
    venue: "IEEE J. Biomed. Health Inform., 2020",
    width: 908,
    height: 1210,
    blurb:
      "Compares two ways of scoring the quality of EEG recorded on wearable devices: a pragmatic rule-based approach and a regression model. Finds wearable recordings substantially noisier than clinical ones, attributes the gap to uncontrolled environments and subject motion, and reports that quality-assessment methods for such data remain underdeveloped.",
  },
  {
    slug: "artifact-detection-systematic-review",
    title:
      "A Systematic Review of Techniques for Artifact Detection and Artifact Category Identification in Electroencephalography from Wearable Devices",
    authors: "Arpaia, De Luca, Di Marino, et al.",
    venue: "Systematic Review",
    width: 910,
    height: 1287,
    blurb:
      "Surveys published techniques for detecting artifacts in EEG from wearable devices and for identifying which category each artifact belongs to. Groups the methods into families, sets out a taxonomy spanning ocular, muscular, cardiac and motion artifacts, and compares the evidence reported for each approach.",
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
    body: "Prompt injection involves an attacker who hides instructions in content an AI receives, which can make the agent do malicious activity; it’s rated as the #1 risk on OWASP for AI applications, and work presented at NeurIPS finds that even top-tier models \u2014 Claude, ChatGPT, and Gemini among them \u2014 are deceived by simple, low-effort human-written injections, which partially succeed in up to 86% of cases. With Gartner projecting a 700% rise in enterprise applications carrying task-specific AI agents, if prompt injection can’t be properly addressed, corporations can be exploited, critical infrastructure can be penetrated, and technological development will slow down.",
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
    slug: "wasp-web-agent-security",
    title:
      "WASP: Benchmarking Web Agent Security Against Prompt Injection Attacks",
    authors: "Evtimov, Zharmagambetov, Guo, et al.",
    venue: "NeurIPS Datasets & Benchmarks, 2025",
    width: 935,
    height: 1210,
    blurb:
      "Introduces a benchmark that measures how web agents behave under prompt injection across complete tasks rather than single steps. Finds that leading models with advanced reasoning are deceived by simple, low-effort, human-written injections, with attacks partially succeeding in up to 86% of cases. Separates partial success from full success, noting that agents frequently fail to carry the attacker’s goal through to completion.",
  },
  {
    slug: "prompt-injection-threat-landscape",
    title:
      "The Landscape of Prompt Injection Threats in LLM Agents: From Taxonomy to Analysis",
    authors: "Wang, Li, Xiang, et al.",
    venue: "arXiv, 2026",
    width: 935,
    height: 1210,
    blurb:
      "Reviews 78 papers published through October 2025 and organises them into a taxonomy of prompt injection attacks and defenses against LLM agents. Covers optimisation-based attacks, which are stealthy but require many queries or white-box access; detection defenses, which add the overhead of a second model; and isolation approaches that separate control instructions from data.",
  },
  {
    slug: "evaluating-ipi-defenses",
    title:
      "Evaluating Indirect Prompt Injection Defenses in Tool-Using LLM Agents: Security, Utility, and Replication",
    authors: "Khan, AlKhanbashi, Mohamed",
    venue: "Computers, 2026",
    width: 910,
    height: 1287,
    blurb:
      "Evaluates four indirect prompt injection defenses against an undefended control across three models on the AgentDojo banking benchmark. Reports attack success rate alongside benign utility and utility under attack, so that defenses which suppress injections by degrading the agent are distinguishable from those that do not. Includes a replication of prior reported results.",
  },
];

// Canary, alphabetised by author as MLA requires.
export const canaryCitations: Citation[] = [
  {
    mla: "Evtimov, Ivan, et al. \u201CWASP: Benchmarking Web Agent Security Against Prompt Injection Attacks.\u201D Advances in Neural Information Processing Systems 39, Datasets and Benchmarks Track, 2025.",
    href: "/papers/wasp-web-agent-security.pdf",
  },
  {
    mla: "Gartner, Inc. \u201CGartner Predicts 40% of Enterprise Apps Will Feature Task-Specific AI Agents by 2026, Up from Less Than 5% in 2025.\u201D Gartner Newsroom, 26 Aug. 2025.",
    locator: "gartner.com",
    href: "https://www.gartner.com/en/newsroom/press-releases/2025-08-26-gartner-predicts-40-percent-of-enterprise-apps-will-feature-task-specific-ai-agents-by-2026-up-from-less-than-5-percent-in-2025",
  },
  {
    mla: "Khan, Adil, Khaled AlKhanbashi, and Azza Mohamed. \u201CEvaluating Indirect Prompt Injection Defenses in Tool-Using LLM Agents: Security, Utility, and Replication.\u201D Computers, vol. 15, no. 9, 2026, article 570.",
    locator: "doi.org/10.3390/computers15090570",
    href: "/papers/evaluating-ipi-defenses.pdf",
  },
  {
    mla: "OWASP GenAI Security Project. \u201CLLM01:2025 Prompt Injection.\u201D OWASP Top 10 for Large Language Model Applications, 2025.",
    locator: "genai.owasp.org",
    href: "https://genai.owasp.org/llmrisk/llm01-prompt-injection/",
  },
  {
    mla: "Wang, Peiran, et al. \u201CThe Landscape of Prompt Injection Threats in LLM Agents: From Taxonomy to Analysis.\u201D arXiv, 2026.",
    locator: "arxiv.org/abs/2602.10453",
    href: "/papers/prompt-injection-threat-landscape.pdf",
  },
];

// ------------------------------------------------------- SOCIAL SIMULATION

// Namish's team, per the 2026-27 team selection sheet.
export const socialSimulationTeam = [
  "Jonah Depaz",
  "Shreevatson Babu Sreegeetha",
  "Taiki Jeffers",
  "Robert Tigau",
  "Vishal Murali Kannan",
  "Saurish Suman",
];

export const socialSimulationSections: {
  /** Kept as an authoring key only — the page renders no section headings. */
  label: string;
  body: string;
  points?: string[];
}[] = [
  {
    label: "Hook",
    body: "96% of companies surveyed across more than 260 organisations run a form of beta-testing, where customers are given early access to a product to test it before an official launch. Part of the strength of beta-testing comes from the diversity of the customers; in work by senior researchers Margaret Burnett and Anita Sarma, viewing the same product through different cognitive frames surfaced inclusivity issues in over half of the interactions evaluated, more than 90% of which were later confirmed against independent empirical data. As more and more companies try to leverage AI agents to simulate this beta-testing, they struggle to emulate unique personalities and therefore cannot evaluate products effectively.",
  },
  {
    label: "Solution",
    body: "Social Simulation addresses this problem in three ways: finding novel ways to simulate realistic personalities, incorporating new cognitive perspectives that haven’t been considered, and visualising the process in intuitive ways. This includes using real, existing personas like actors and hosts instead of text-based prompts, and experimenting with ideating unique personas like impatience and radicalism.",
  },
  {
    label: "Future Opportunities",
    body: "The methods developed in this research have the potential to:",
    points: [
      "Simulate beta-testing with larger scale, diversity, and accuracy than current methods can achieve.",
      "Create novel visualisations that make agentic beta-testing intuitive to all clients, especially considering the modern atmosphere of non-technical developers.",
      "Discover unique friction points in applications by leveraging unexplored cognitive perspectives.",
    ],
  },
];

export const socialSimulationPapers: Paper[] = [
  {
    slug: "gendermag-ten-teams",
    title:
      "Engineering Gender-Inclusivity into Software: Ten Teams’ Tales from the Trenches",
    authors: "Hilderbrand, Perdriau, Letaw, et al.",
    venue: "ICSE, 2020",
    width: 935,
    height: 1210,
    blurb:
      "Reports ten industry teams applying GenderMag, a cognitive walkthrough method that evaluates software through several problem-solving styles rather than one. The teams identified inclusivity issues in over half the interactions they examined, and a companion lab study confirmed more than 90% of the issues surfaced this way against independent empirical data.",
  },
  {
    slug: "generative-agents-simulacra",
    title: "Generative Agents: Interactive Simulacra of Human Behavior",
    authors: "Park, O’Brien, Cai, et al.",
    venue: "ACM UIST, 2023",
    width: 935,
    height: 1210,
    blurb:
      "Introduces agents that store experience in a memory stream, periodically reflect on it to form higher-level inferences, and plan ahead, then runs twenty-five of them in a sandboxed town. Shows that believable individual and emergent social behaviour can be generated rather than scripted, and ablates memory, reflection and planning to measure what each contributes.",
  },
  {
    slug: "generative-agents-1000-people",
    title:
      "LLM Agents Grounded in Self-Reports Enable General-Purpose Simulation of Individuals",
    authors: "Park, Zou, Kamphorst, et al.",
    venue: "arXiv, 2024",
    width: 935,
    height: 1210,
    blurb:
      "Builds agents from two-hour interview transcripts with 1,052 real individuals, then tests whether each agent reproduces its subject’s answers on the General Social Survey, Big Five personality measures, and economic games. Reports that interview-grounded agents predict those responses more accurately than agents given demographic descriptions alone.",
  },
];

// Social Simulation, alphabetised by author as MLA requires.
export const socialSimulationCitations: Citation[] = [
  {
    mla: "Centercode. “Beta Testing Industry Survey Report 2016.” Centercode, 2016. Survey of 338 respondents across more than 260 companies; 96% run customer validation tests before release.",
    locator: "centercode.com",
    href: "https://www2.centercode.com/industry-survey-report-2016.html",
  },
  {
    mla: "Hilderbrand, Claudia, et al. “Engineering Gender-Inclusivity into Software: Ten Teams’ Tales from the Trenches.” Proceedings of the 42nd International Conference on Software Engineering, Association for Computing Machinery, 2020.",
    href: "/papers/gendermag-ten-teams.pdf",
  },
  {
    mla: "Park, Joon Sung, et al. “Generative Agents: Interactive Simulacra of Human Behavior.” Proceedings of the 36th Annual ACM Symposium on User Interface Software and Technology, Association for Computing Machinery, 2023.",
    href: "/papers/generative-agents-simulacra.pdf",
  },
  {
    mla: "Park, Joon Sung, et al. “LLM Agents Grounded in Self-Reports Enable General-Purpose Simulation of Individuals.” arXiv, 2024.",
    locator: "arxiv.org/abs/2411.10109",
    href: "https://arxiv.org/abs/2411.10109",
  },
];

// ------------------------------------------------------------------- ADUA

// Ivan's team, listed as on the other three sheets.
export const aduaTeam = [
  "Ceyanna Badyal",
  "Saurish Suman",
  "Vinayak Kohli",
  "Zach Goldwyn",
];

export const aduaSections: {
  /** Kept as an authoring key only — the page renders no section headings. */
  label: string;
  body: string;
  points?: string[];
}[] = [
  {
    label: "Hook",
    body: "On December 20th, 2025, San Francisco’s power outage shut off traffic and street lights, causing the city’s Waymo’s to stall more than 1,500 times in one night; the normal daily rate was reported by SF officials at 4, making this abnormal Saturday night 375 times worse. Autonomous vehicles struggle when they are put in unfamiliar and rare situations they haven’t been trained on, in this case, a city without traffic lights. The biggest gap between modern deprecated autonomy and full autonomy is the ability for a model, like a self-driving model, to be able to make logical decisions even in situations it hasn’t been trained on.",
  },
  {
    label: "Outcome",
    body: "ADUA developed two main methods to address autonomy in unknown domains. Firstly, a bi-model consensus that used a low-confidence threshold alongside open-world model detectors to recognise unknown objects. Secondly, an original use of colour blocks and frame-palette tracking to check unknown objects cheaply, without a heavy meta-learning model. Together these resulted in a 93%-accurate pipeline.",
  },
  {
    label: "Methods",
    body: "ADUA set out to experiment with three main methods that could address autonomy in unknown domains using modern meta-learning models. Firstly, a bi-model consensus between an open-set model, which can detect almost all objects in the normal driving scenario, and an object-agnostic model, which can detect any object in general, to detect unknown objects. Secondly, a stripped-down version of the initial pipeline which, instead of leveraging the heavy object-agnostic model, replaces it with a lighter and unique method that uses sudden colour-palette shifts in frames to indicate unknown objects. Finally, a bi-model consensus between an open-set model and a conceptual scene-understanding model, which can add logical context to whatever situation a model is in.",
  },
  {
    label: "Future Opportunities",
    body: "This research has the potential to:",
    points: [
      "Explore and promote the field of meta-learning, which remains one of the most important logical leaps of artificial intelligence that haven’t been made yet.",
      "Expand autonomous machines to edge devices and cheaper hardware, promoting accessibility within self-driving use cases like humanitarian aid and precision agriculture.",
      "Explore the age-old question of how a model actually operates beyond the black box, which researchers at Anthropic, Google, and elsewhere are currently working on.",
    ],
  },
];

export const aduaPapers: Paper[] = [
  {
    slug: "open-world-object-detection",
    title: "Towards Open World Object Detection",
    authors: "Joseph, Khan, Khan, Balasubramanian",
    venue: "CVPR, 2021",
    width: 935,
    height: 1210,
    blurb:
      "Formalises open world object detection, in which a detector must label objects it was never trained on as unknown rather than forcing them into a known class, then learn them incrementally once labels become available. Proposes ORE, a contrastive-clustering approach with an energy-based unknown identifier, and a protocol for evaluating detectors under these conditions.",
  },
  {
    slug: "segment-anything",
    title: "Segment Anything",
    authors: "Kirillov, Mintun, Ravi, et al.",
    venue: "arXiv, 2023",
    width: 935,
    height: 1210,
    blurb:
      "Presents a promptable segmentation model trained on roughly 1.1 billion masks across 11 million images. Given a point, box, or rough mask as a prompt, it returns a segmentation for essentially any object without assigning it a class, and transfers zero-shot to tasks it was not trained for.",
  },
  {
    slug: "anomaly-segmentation-benchmark",
    title: "SegmentMeIfYouCan: A Benchmark for Anomaly Segmentation",
    authors: "Chan, Lis, Uhlemeyer, et al.",
    venue: "NeurIPS Datasets & Benchmarks, 2021",
    width: 935,
    height: 1210,
    blurb:
      "Introduces two benchmarks for anomaly segmentation in street scenes, one for road obstacles and one for general anomalous objects, with pixel-level labels for things outside the training taxonomy. Defines metrics that score how well a model localises objects it has no class for rather than how well it labels known classes.",
  },
];

// ADUA, alphabetised by author as MLA requires.
export const aduaCitations: Citation[] = [
  {
    mla: "Chan, Robin, et al. “SegmentMeIfYouCan: A Benchmark for Anomaly Segmentation.” Advances in Neural Information Processing Systems 35, Datasets and Benchmarks Track, 2021.",
    href: "/papers/anomaly-segmentation-benchmark.pdf",
  },
  {
    mla: "Joseph, K. J., et al. “Towards Open World Object Detection.” Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition, IEEE, 2021.",
    href: "/papers/open-world-object-detection.pdf",
  },
  {
    mla: "Kirillov, Alexander, et al. “Segment Anything.” arXiv, 2023.",
    locator: "arxiv.org/abs/2304.02643",
    href: "/papers/segment-anything.pdf",
  },
];

// ------------------------------------------------- EDITORIAL POLICIES

export const editorialPolicy = [
  "To produce the most credible and professional research, the CSAI Research Division follows the NeurIPS and IEEE guidelines and policies. NeurIPS, founded in 1987, has produced some of the most influential papers in the AI/ML revolution like AlexNet and GANs, receives over 20,000 submissions annually, and is ranked #7 among academic publications worldwide. Similarly, IEEE is one of the most impactful AI journals, producing nearly a third of the world’s computational research, and is one of the largest computing organisations in the world with over 450,000 members worldwide.",
  "We use IEEE’s official guidelines to organise our research into claims, limitations, and further sections. Then we use the official NeurIPS Paper Checklist Guidelines, used by the actual NeurIPS panel, to ensure CSAI Research papers meet certain ethical, credibility, and significance standards. By strictly following these standards, our research has the potential to be not only impressive for a college club, but impressive enough for national consideration.",
];

export type PolicyDoc = {
  /** The issuing body's own mark, shown beside the house mark. */
  logo: string;
  logoHeight: string;
  /** Set on the sheet itself, as a wordmark. */
  wordmark: string;
  /** The single word under it: CHECKLIST, STRUCTURE. */
  label: string;
  title: string;
  blurb: string;
  href: string;
};

export const editorialPolicyDocs: PolicyDoc[] = [
  {
    logo: "/neurips-logo.svg",
    logoHeight: "h-[6cqw]",
    wordmark: "NeurIPS",
    label: "Checklist",
    title: "NeurIPS Paper Checklist Guidelines",
    blurb:
      "The checklist NeurIPS requires authors to complete at submission. It asks that every claim in the abstract be matched to evidence in the paper, that limitations be stated rather than omitted, and that questions on ethics, reproducibility and societal impact be answered in writing.",
    href: "https://neurips.cc/public/guides/PaperChecklist",
  },
  {
    logo: "/ieee-logo.svg",
    logoHeight: "h-[3.4cqw]",
    wordmark: "IEEE",
    label: "Structure",
    title: "Structure Your Paper, IEEE Author Center",
    blurb:
      "IEEE guidance on how a technical paper is assembled: what belongs in the abstract and introduction, how methods and results are kept separate, and where limitations and further work are placed.",
    href: "https://conferences.ieeeauthorcenter.ieee.org/write-your-paper/structure-your-paper/",
  },
];

// ----------------------------------------------------------------- TEAM

// The three names on the About sheet, carried here rather than retyped.
// The About sheet reads "Director and Associate Directors of Research" over
// the three in this order, which is where the split below comes from.
export const directors: { name: string; title: string }[] = [
  { name: "Ivan Torriani", title: "Director of Research" },
  { name: "Trace Macias", title: "Associate Director of Research" },
  { name: "Marek Seablom-Michel", title: "Associate Director of Research" },
];

// Each project's roster, keyed to the project ids in `projects` and
// `previousProjects` so the page stays in step with the index.
export const teamsByProject: Record<string, string[]> = {
  eeg: mindTheNoiseTeam,
  canary: canaryTeam,
  ss: socialSimulationTeam,
  adua: aduaTeam,
};
