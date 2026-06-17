export const cvUrl = new URL(
  "../Copie de Copie de CVResume Rudy.pdf",
  import.meta.url,
).href;

export const profile = {
  name: "Rudy Quinternet",
  role: "Software Engineer",
  location: "Paris, France",
  availability: "Open to relocation and software engineering opportunities",
  email: "rudy.quinternet@gmail.com",
  github: "https://github.com/Radishoux",
  website: "https://rudyquinternet.com",
  headline:
    "Full-stack engineer turning product ideas into reliable web, mobile, and cloud software.",
  summary:
    "I build modern web, mobile, and cloud products with React, Node, TypeScript, Angular, Flutter, AWS, and GCP. I care about clean interfaces, fast feedback loops, and pragmatic engineering that helps teams ship without losing quality.",
  longBio:
    "I am a Paris-based software engineer with six years of experience, including three years in permanent engineering roles. My work has moved across product engineering, enterprise systems, logistics platforms, AI media tooling, test automation, and cloud-backed applications. I enjoy taking a product from rough idea to working software, then making it more reliable with TypeScript, tests, CI/CD, and pragmatic architecture.",
  metrics: [
    { value: "6+", label: "years building software" },
    { value: "3", label: "years in permanent roles" },
    { value: "4", label: "product domains shipped" },
    { value: "FR / EN", label: "plus Dutch in progress" },
  ],
  focusAreas: [
    {
      title: "Product engineering",
      description:
        "Turning ambiguous ideas into useful features, quick demos, and maintainable production code.",
    },
    {
      title: "Full-stack delivery",
      description:
        "React and TypeScript frontends backed by Node, NestJS, Express, databases, and cloud services.",
    },
    {
      title: "Quality systems",
      description:
        "Tests, CI/CD, practical architecture, and team workflows that make shipping feel controlled.",
    },
  ],
  experience: [
    {
      period: "2024 - Today",
      role: "Senior Software Engineer",
      company: "ALTEN",
      description:
        "Building AI-powered video, audio, and text media flows in a modern product team using React, Node, NestJS, Next.js, Jest, AWS, MongoDB, MySQL, Scrum, Kanban, and CI/CD.",
    },
    {
      period: "2023",
      role: "Software Engineer",
      company: "Thales / NATO",
      description:
        "Started in test engineering with Cypress, Jenkins, and Jest, then moved into development on cleared NATO projects using Angular, Java, C#, TypeScript, and hexagonal architecture.",
    },
    {
      period: "2022",
      role: "Software Developer",
      company: "Ceva / CMA CGM",
      description:
        "Developed logistics management tooling with Angular, Node, TypeScript, Flutter, SQL, MongoDB, and AWS inside a large agile team.",
    },
    {
      period: "2018 - 2022",
      role: "Freelance Developer and Trainer",
      company: "Independent",
      description:
        "Built applications, websites, games, scripts, Excel automation, and taught modern development and cloud tools including Shopify, WordPress, Ruby, Python, Node, TypeScript, Java, Flutter, AWS, GCP, and Bash.",
    },
  ],
  principles: [
    "Prototype quickly, then harden what proves useful.",
    "Keep interfaces simple and systems understandable.",
    "Use tests and automation where they reduce real delivery risk.",
    "Choose boring, proven tools unless the problem deserves novelty.",
  ],
  skills: [
    "React",
    "TypeScript",
    "Node",
    "NestJS",
    "Express",
    "Next.js",
    "Angular",
    "Flutter",
    "React Native",
    "AWS",
    "GCP",
    "MongoDB",
    "SQL",
    "Cypress",
    "Jest",
    "CI/CD",
  ],
  languages: ["French", "English", "Learning Dutch"],
  interests: ["Music", "Tech", "Nutrition", "Climbing"],
};

export const projects = [
  {
    name: "Radar",
    type: "Realtime app",
    description:
      "A real-time location and chat app built across Node, React, and React Native.",
    impact: "Explores live user presence, mobile-first UX, and socket-driven product flows.",
    stack: ["Node", "React", "React Native", "Realtime"],
    demoUrl: "https://radishoux.github.io/radar/",
    sourceUrl: "https://github.com/Radishoux/radar",
  },
  {
    name: "GrosRestau",
    type: "Restaurant platform",
    description:
      "A restaurant web application with an Express backend and SQLite data layer.",
    impact: "Focuses on practical business flows, server-rendered data, and simple operations.",
    stack: ["Node", "Express", "SQLite"],
    demoUrl: "https://radishoux.github.io/GrosRestau/",
    sourceUrl: "https://github.com/Radishoux/GrosRestau",
  },
  {
    name: "Mam Street Food",
    type: "Showcase website",
    description:
      "A restaurant showcase website designed for a clean, fast browsing experience.",
    impact: "A lightweight marketing site built around speed, clarity, and responsive browsing.",
    stack: ["Next.js", "React", "Web"],
    demoUrl: "https://radishoux.github.io/mam-street-food/",
    sourceUrl: "https://github.com/Radishoux/mam-street-food",
  },
  {
    name: "Rudy Portfolio",
    type: "Portfolio system",
    description:
      "A personal portfolio foundation built with Next.js and TypeScript.",
    impact: "A previous portfolio iteration focused on typed frontend structure and presentation.",
    stack: ["Next.js", "TypeScript"],
    demoUrl: "https://radishoux.github.io/rudy-portfolio/",
    sourceUrl: "https://github.com/Radishoux/rudy-portfolio",
  },
];
