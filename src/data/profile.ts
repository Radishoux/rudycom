export type SkillGroup = {
  title: string;
  description: string;
  items: string[];
  professional: boolean;
};

export const profile = {
  name: "Rudy Quinternet",
  role: "Senior Software Engineer",
  specialism: "Backend & full-stack",
  location: "Driebergen-Zeist, Netherlands",
  commute: "15 minutes from Utrecht Centraal by train",
  availability: "Available now",
  workAuthorization: "EU citizen, no visa sponsorship required",
  lookingFor: "Looking for a backend or full-stack role in the Utrecht region.",
  email: "rudy.quinternet@gmail.com",
  phone: "+31 6 27108005",
  website: "https://radishoux.github.io/rudycom/",
  github: "https://github.com/Radishoux",
  linkedin: "https://www.linkedin.com/in/rudy-quinternet/",
  headline: {
    before: "Software engineer. ",
    highlight: "Backend focus.",
    after: " Full-stack perspective.",
  },
  summary:
    "Software engineer since 2018, from freelance React websites to logistics, defence and conversational AI. I work mainly with TypeScript, Node.js and Java, alongside React and Angular. My experience spans development, testing, delivery and teaching.",
  longBio:
    "I started freelancing in 2018, building React websites for restaurants. Since then, I have worked across logistics at GEFCO (now CEVA, part of CMA CGM Group), defence at Thales, conversational AI at Pitchboy through ALTEN, and client assignments through Capgemini in the Netherlands. I have also taught at Epitech and in companies including Oxyl. I enjoy moving between backend work, the interfaces it supports and the testing that makes it dependable.",
  metrics: [
    { value: "2018", label: "started freelance development" },
    { value: "2022", label: "first permanent engineering role" },
    { value: "2025", label: "moved to the Netherlands" },
    { value: "FR / EN", label: "native French, fluent English" },
  ],
  focusAreas: [
    {
      title: "Backend & full-stack",
      description:
        "TypeScript and Node.js services, Java development, and the React and Angular interfaces around them. Experience in logistics, defence and healthcare training.",
    },
    {
      title: "Quality & delivery",
      description:
        "Client audits, QA, test integration and DevOps assignments, alongside application development and AWS delivery.",
    },
    {
      title: "Teaching & learning",
      description:
        "Teaching at Epitech and Oxyl, learning new tools through personal projects, and continuing to improve my Dutch.",
    },
  ],
  experience: [
    {
      period: "1 Apr 2025 - 1 Sep 2026",
      role: "Senior Product Software Engineer",
      company: "Capgemini Engineering",
      context: "Netherlands | Client assignments including Thales, IKEA and ENGIE",
      bullets: [
        "Joined for a Thales Netherlands assignment before moving to engagements for other Capgemini clients.",
        "Carried out technical audits, QA, test integration and DevOps work, mainly with Node.js and TypeScript, with Java and Python on some assignments.",
      ],
      stack: ["TypeScript", "Node.js", "Java", "Python", "QA", "DevOps"],
    },
    {
      period: "2024",
      role: "Senior Product Software Engineer",
      company: "ALTEN",
      context: "France | Client: Pitchboy, conversational AI for healthcare training",
      bullets: [
        "Developed visual conversational agents for hospital training: first with React and Node.js / TypeScript, then a NestJS version sold to CHU Nice.",
        "Used AWS hosting, Jest tests and GitHub Actions for CI/CD.",
      ],
      stack: ["React", "TypeScript", "Node.js", "NestJS", "AWS", "Jest", "GitHub Actions"],
    },
    {
      period: "2023",
      role: "Software Engineer",
      company: "Thales",
      context: "France | NCOP team, defence software for NATO",
      bullets: [
        "Developed defence software with Java, Angular and Node.js / TypeScript; completed a software delivery during the NCOP assignment in 2023.",
        "Contributed to test automation with Cypress and Jest within Jenkins delivery workflows.",
      ],
      stack: ["Java", "Angular", "TypeScript", "Node.js", "Cypress", "Jest", "Jenkins"],
    },
    {
      period: "2022",
      role: "Full-stack Software Engineer",
      company: "GEFCO / CEVA",
      context: "France | Logistics, now part of CMA CGM Group",
      bullets: [
        "Joined GEFCO in my first permanent engineering role in 2022. GEFCO was acquired by CMA CGM and later integrated into CEVA.",
        "Worked across a Node.js / TypeScript backend, Angular web frontend and Flutter mobile app, with Bitbucket CI/CD and occasional AWS tasks.",
      ],
      stack: ["TypeScript", "Node.js", "Angular", "Flutter", "Bitbucket", "AWS"],
    },
    {
      period: "2018 - 2021; later teaching assignments",
      role: "Freelance Developer & Trainer",
      company: "Independent",
      context: "France | React websites and technical teaching",
      bullets: [
        "Started freelance development in July 2018, building React websites for restaurants, including QR-linked sites during the pandemic.",
        "Returned to freelance teaching between later assignments, giving classes at Epitech and in companies including Oxyl.",
      ],
      stack: ["React", "Web development", "Teaching"],
    },
  ],
  education: [
    { year: "2022", title: "Computer Engineering", institution: "Epitech, Paris" },
  ],
  certifications: [
    { year: "2024", title: "Oracle Certified Associate (OCA)", institution: "Oracle" },
  ],
  principles: [
    "Understand the problem and the existing system before changing it.",
    "Make technical choices that the next engineer can understand.",
    "Share knowledge through teaching and practical explanations.",
    "Use AI tools openly and take responsibility for the result.",
  ],
  languages: [
    { name: "French", level: "Native" },
    { name: "English", level: "Fluent" },
    { name: "Dutch", level: "Basic, actively learning" },
  ],
  aiDisclosure:
    "This website was built with OpenAI Codex. My recent personal projects also use AI coding tools. They are a space to explore technology and discuss engineering decisions, separate from the professional assignments above.",
  learning:
    "Continuing to learn Rust and modern Java techniques, and improving my Dutch.",
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
  {
    title: "Professional development",
    description: "Used across the client and employment work above.",
    items: ["TypeScript", "Node.js", "NestJS", "Java", "React", "Angular", "Flutter", "Python"],
    professional: true,
  },
  {
    title: "Professional delivery & quality",
    description: "Tools used in application delivery, testing and client assignments.",
    items: ["AWS", "Bitbucket", "GitHub Actions", "Jenkins", "Jest", "Cypress", "QA", "CI/CD"],
    professional: true,
  },
  {
    title: "Personal projects",
    description: "Recent hands-on work, including the PixelGuess backend and mobile demo.",
    items: ["NestJS", "GraphQL", "PostgreSQL", "Prisma", "React Native", "Expo", "Next.js", "Bun"],
    professional: false,
  },
  {
    title: "Continuing learning",
    description: "Self-directed study and experimentation.",
    items: ["Rust", "Modern Java", "AI coding tools"],
    professional: false,
  },
];

export const professionalSkills = skillGroups
  .filter((group) => group.professional)
  .flatMap((group) => group.items);

export type Project = {
  name: string;
  type: string;
  cv?: boolean;
  description: string;
  impact: string;
  stack: string[];
  demoUrl?: string;
  sourceUrl?: string;
  note?: string;
};

export const projects: Project[] = [
  {
    name: "PixelGuess API & mobile",
    type: "Personal project | AI-assisted development",
    cv: true,
    description:
      "A painting-recognition game with a NestJS GraphQL API, PostgreSQL / Prisma and an Expo / React Native client.",
    impact:
      "Explores server-controlled game state, authenticated image access and transaction retries, with regression tests for concurrency and answer disclosure.",
    stack: ["NestJS", "TypeScript", "GraphQL", "PostgreSQL", "Prisma", "React Native"],
    note: "Personal demo available to discuss. Separate project from the earlier Flutter prototype.",
  },
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
    name: "PixelGuess - Flutter prototype",
    type: "Earlier personal prototype",
    description:
      "A Flutter guessing game built around progressive pixelation: the image resolves a little further with every wrong answer.",
    impact:
      "Explores progressive image reveals in Flutter. The separate API and React Native project is featured above.",
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
