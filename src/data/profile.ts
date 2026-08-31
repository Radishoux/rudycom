export type SkillGroup = {
  title: string;
  items: string[];
};

export const profile = {
  name: "Rudy Quinternet",
  role: "Senior Software Engineer",
  location: "Driebergen-Zeist, Netherlands",
  commute: "15 minutes from Utrecht Centraal by train",
  availability: "Available from 1 September 2026",
  workAuthorization: "EU citizen, no visa sponsorship required",
  lookingFor:
    "Backend or full-stack software engineering roles in Utrecht and the surrounding area.",
  email: "rudy.quinternet@gmail.com",
  github: "https://github.com/Radishoux",
  linkedin: "https://www.linkedin.com/in/rudy-quinternet/",
  headline: {
    before: "Backend-leaning full-stack engineer building ",
    highlight: "reliable",
    after: " web, mobile, and cloud software.",
  },
  summary:
    "I build and harden backend services and the interfaces on top of them, mostly in TypeScript, Node and Java, backed by AWS. I care about clean APIs, fast feedback loops, and pragmatic engineering that lets a team ship without losing quality.",
  longBio:
    "I am a software engineer based near Driebergen-Zeist in the Netherlands, with eight years of experience and four of them in permanent engineering roles. My work has moved across AI media tooling, defence and NATO systems, logistics platforms, and cloud-backed products, and I have gradually settled into a backend orientation while staying comfortable across the whole stack. What holds my attention now is concurrency, throughput, and the parts of a system that decide whether it holds up under load.",
  metrics: [
    { value: "8", label: "years building software" },
    { value: "4", label: "years in permanent roles" },
    { value: "5", label: "product domains shipped" },
    { value: "FR / EN / NL", label: "French, English, learning Dutch" },
  ],
  focusAreas: [
    {
      title: "Backend systems",
      description:
        "Consistent APIs in TypeScript and Java, with an eye on concurrency, throughput, and the real cost of every call.",
    },
    {
      title: "Full-stack delivery",
      description:
        "React and TypeScript frontends over Node, NestJS and Express services, REST or GraphQL, deployed to AWS and GCP.",
    },
    {
      title: "Quality systems",
      description:
        "Tests, CI/CD and practical architecture that make shipping feel controlled rather than lucky.",
    },
  ],
  experience: [
    {
      period: "Apr 2025 - Sep 2026",
      role: "Senior Software Engineer",
      company: "Capgemini Engineering",
      description:
        "Full-stack work with a strong backend orientation, at an advanced level of technical autonomy. Focused on multithreading, concurrency and code optimisation: how far a system can be pushed on efficiency, scalability and throughput. Studying Rust, Go and generative AI alongside the day job, and supporting colleagues across the TypeScript ecosystem.",
      stack: ["TypeScript", "Java", "Node", "Concurrency", "GenAI"],
    },
    {
      period: "Jan 2024 - Nov 2024",
      role: "Senior Full-stack Software Engineer",
      company: "ALTEN",
      description:
        "Built a web application generating video, audio and text streams with AI for medical training and remote consultation. Designed and implemented the Virtual Patients system, sold to hospitals in France, which lets doctors train against simulated patient interactions. Established the automated testing framework in Jest and wired it into GitHub Actions so deployments to AWS could go out with confidence.",
      stack: ["React", "NestJS", "Next.js", "MongoDB", "AWS", "Jest", "GPT", "Mistral"],
    },
    {
      period: "Jan 2023 - Dec 2023",
      role: "Senior Full-stack Software Engineer",
      company: "Thales",
      description:
        "Started in test engineering with Cypress, Jest and Jenkins, holding the line on reliability across deployments. After security clearance, moved into development on the NCOP team building military-grade software for NATO. Worked in hexagonal architecture with asynchronous and functional patterns, keeping automated testing central to the CI/CD pipeline.",
      stack: ["Angular", "TypeScript", "Node", "Java", "C#", "Cypress", "Jenkins"],
    },
    {
      period: "Jan 2022 - Dec 2022",
      role: "Medior Full-stack Software Engineer",
      company: "CMA CGM",
      description:
        "Built container logistics monitoring for a large Scrum and Kanban team: a Node and Angular web application plus its Flutter mobile adaptation. Everything shipped through GitLab CI, which is where pipelines stopped being someone else's problem. The role grew outward into full-stack, DevOps and backend work, which is where microservices and cloud infrastructure first got their hooks in.",
      stack: ["Angular", "Node", "Flutter", "AWS", "Docker", "Kubernetes", "GitLab CI", "MongoDB"],
    },
    {
      period: "Jun 2018 - Dec 2021",
      role: "Freelance Developer and Trainer",
      company: "Independent",
      description:
        "Applications, websites, games, scripts and Excel automation for restaurants, startups, hospitals and schools, including GraphQL APIs and a handful of React Native apps. Also taught web development and best practices to engineering students, often in night classes for the ones who needed the extra time.",
      stack: ["Node", "TypeScript", "GraphQL", "React Native", "Python", "Ruby", "Flutter", "AWS", "GCP", "WordPress"],
    },
  ],
  education: [
    {
      year: "2022",
      title: "Master, Computer Engineering",
      institution: "Epitech, Paris",
    },
    {
      year: "2017",
      title: "Baccalaureat STI2D, Sciences",
      institution: "France",
    },
  ],
  certifications: [
    {
      year: "2024",
      title: "OCA, Oracle Certified Associate",
      institution: "Oracle",
    },
  ],
  principles: [
    "Prototype quickly, then harden what proves useful.",
    "Keep interfaces simple and systems understandable.",
    "Use tests and automation where they reduce real delivery risk.",
    "Choose boring, proven tools unless the problem deserves novelty.",
  ],
  languages: [
    { name: "French", level: "Native" },
    { name: "English", level: "Fluent" },
    { name: "Dutch", level: "Learning" },
  ],
  writing: {
    platform: "Wattpad",
    url: "https://www.wattpad.com/user/magenta_rudy",
    currentWork: "Bloody kid",
    // Flip to false to render the writing card without an outbound link.
    enabled: true,
  },
  personal: [
    {
      title: "Climbing and bouldering",
      description:
        "Most of my week outside work happens on a wall. Bouldering rewards the same thing engineering does: reading a problem properly before committing to it, then failing on it enough times to actually understand it. A project that finally goes after two weeks is a very specific kind of satisfaction.",
    },
    {
      title: "Writing",
      description:
        "I write fiction. It sits closer to engineering than people expect, in that both are mostly structure, revision, and cutting the part you were most attached to. I am currently serialising Bloody kid, which opens with two priests finding a baby on the church steps in the middle of a Paris winter.",
      linkLabel: "Read Bloody kid on Wattpad",
    },
    {
      title: "Learning Dutch",
      description:
        "I am taking lessons with the goal of reaching a functional level, not a certificate. Living and working here in English only ever gets you so far, and I would rather be able to hold the room than translate it.",
    },
    {
      title: "Music and nutrition",
      description:
        "Two long-running interests that keep the rest working. Music is what I put on to think, and paying attention to nutrition is what stops a hard training week turning into a bad one.",
    },
  ],
};

export const skillGroups: SkillGroup[] = [
  { title: "Backend", items: ["Node", "NestJS", "Express", "GraphQL", "Java", "Kotlin"] },
  {
    title: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Angular", "Tailwind"],
  },
  { title: "Mobile", items: ["Flutter", "React Native"] },
  {
    title: "Cloud and infra",
    items: ["AWS", "GCP", "Docker", "Kubernetes", "Serverless"],
  },
  { title: "Data", items: ["SQL", "PostgreSQL", "MongoDB"] },
  {
    title: "Quality",
    items: ["Jest", "Cypress", "CI/CD", "GitHub Actions", "GitLab CI", "Jenkins"],
  },
  { title: "Exploring", items: ["Rust", "Go", "LLMs"] },
];

export const allSkills = skillGroups.flatMap((group) => group.items);

export type Project = {
  name: string;
  type: string;
  description: string;
  impact: string;
  stack: string[];
  demoUrl?: string;
  sourceUrl?: string;
  note?: string;
};

export const projects: Project[] = [
  {
    name: "Dragoarbre",
    type: "Interactive planner",
    description:
      "A bilingual breeding tree and planner for Dofus mounts: three species, 306 colours and ten generations, drawn as a pan-and-zoom SVG graph.",
    impact:
      "Turns any target colour into a costed plan of matings and wild captures, with the whole plan shareable in the URL.",
    stack: ["React 19", "TypeScript", "Vite", "Tailwind", "i18next"],
    demoUrl: "https://radishoux.github.io/dragoarbre/",
    sourceUrl: "https://github.com/Radishoux/dragoarbre",
  },
  {
    name: "Mam Street Food",
    type: "Showcase website",
    description:
      "A street food restaurant site built for a clean, fast browsing experience, grown out of an earlier restaurant platform I built and then rebuilt from scratch.",
    impact:
      "A lightweight marketing site where the whole point is speed, clarity, and getting out of the visitor's way.",
    stack: ["Next.js", "React", "Vercel"],
    demoUrl: "https://mam-street-food.vercel.app/",
    sourceUrl: "https://github.com/Radishoux/mam-street-food",
  },
  {
    name: "Ramy",
    type: "Game and AI",
    description:
      "Online French rummy in React and Bun, with an AI that can fill a full table of two to six players.",
    impact:
      "The interesting part is the opponent: making the AI read a hand well enough to be worth playing against, without being unbeatable.",
    stack: ["React", "Bun", "TypeScript"],
    sourceUrl: "https://github.com/Radishoux/Ramy",
  },
  {
    name: "Pixelguess",
    type: "Mobile game",
    description:
      "A Flutter guessing game built around progressive pixelation: the image resolves a little further with every wrong answer.",
    impact:
      "Feature-complete at v1, including a pixelation service that had to be reworked to survive Flutter web.",
    stack: ["Flutter", "Dart"],
    note: "Source not yet public",
  },
  {
    name: "Rudy Portfolio",
    type: "Portfolio system",
    description: "A personal portfolio foundation built with Next.js and TypeScript.",
    impact:
      "An earlier portfolio iteration, focused on typed frontend structure and presentation.",
    stack: ["Next.js", "TypeScript"],
    demoUrl: "https://radishoux.github.io/rudy-portfolio/",
    sourceUrl: "https://github.com/Radishoux/rudy-portfolio",
  },
];
