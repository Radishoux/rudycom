export const cvUrl = new URL(
  "../Copie de Copie de CVResume Rudy.pdf",
  import.meta.url,
).href;

export const profile = {
  name: "Rudy Quinternet",
  role: "Software Engineer",
  location: "Paris, France",
  email: "rudy.quinternet@gmail.com",
  github: "https://github.com/rudyquinternet",
  website: "https://rudyquinternet.com",
  summary:
    "I build modern web, mobile, and cloud products with React, Node, TypeScript, Angular, Flutter, AWS, and GCP. I like practical engineering, clean interfaces, and tools that help teams move faster without losing quality.",
  longBio:
    "I am a Paris-based software engineer with six years of experience, including three years in permanent engineering roles. My work has moved across product engineering, enterprise systems, logistics platforms, AI media tooling, test automation, and cloud-backed applications. I enjoy taking a product from rough idea to working software, then making it more reliable with TypeScript, tests, CI/CD, and pragmatic architecture.",
  highlights: [
    "Senior Software Engineer at ALTEN, building AI-powered media flows with React, Node, NestJS, Next.js, Jest, AWS, MongoDB, and MySQL.",
    "Software Engineer on Thales/NATO projects, moving from Cypress, Jenkins, and Jest testing into Angular, Java, C#, TypeScript, and hexagonal architecture.",
    "Developer for Ceva/CMA CGM logistics tooling with Angular, Node, TypeScript, Flutter, SQL, MongoDB, and AWS.",
    "Freelance developer and trainer across websites, apps, games, automation, cloud, and scripting.",
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
    description:
      "A real-time location and chat app built across Node, React, and React Native.",
    stack: ["Node", "React", "React Native", "Realtime"],
    demoUrl: "https://rudyquinternet.github.io/radar/",
    sourceUrl: "https://github.com/rudyquinternet/radar",
  },
  {
    name: "GrosRestau",
    description:
      "A restaurant web application with an Express backend and SQLite data layer.",
    stack: ["Node", "Express", "SQLite"],
    demoUrl: "https://rudyquinternet.github.io/GrosRestau/",
    sourceUrl: "https://github.com/rudyquinternet/GrosRestau",
  },
  {
    name: "Mam Street Food",
    description:
      "A restaurant showcase website designed for a clean, fast browsing experience.",
    stack: ["Next.js", "React", "Web"],
    demoUrl: "https://rudyquinternet.github.io/mam-street-food/",
    sourceUrl: "https://github.com/rudyquinternet/mam-street-food",
  },
  {
    name: "Rudy Portfolio",
    description:
      "A personal portfolio foundation built with Next.js and TypeScript.",
    stack: ["Next.js", "TypeScript"],
    demoUrl: "https://rudyquinternet.github.io/rudy-portfolio/",
    sourceUrl: "https://github.com/rudyquinternet/rudy-portfolio",
  },
];
