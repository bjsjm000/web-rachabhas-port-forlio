// src/data/resume.ts

// src/data/resume.ts

export const profile = {
  name: "Rachabhas Vongbuntoon",
  headline: "Web Developer • Software Developer • Full-Stack",
  locationNote: "Bangkok, Thailand",
  summary:
    "Full-time Software Developer with experience building enterprise web apps — IoT realtime dashboards, internal automation, and scalable systems. Strong in UI/UX collaboration, database design, and production-grade reliability.",
  current: {
    company: "Turnkey Communication Service PCL",
    role: "Full Time – Software Developer",
    period: "Nov 2022 – Present",
    highlights: [
      "Smart Farm: IoT + MQTT (LoRa/WiFi), realtime dashboards & visualization",
      "RBAC, full CRUD across core modules, notifications (LINE/Discord/Slack)",
      "Automated backend integration tests (300+ cases)",
    ],
  },
  contacts: {
    phone: "+66 81-259-9191",
    email: "jay.rachabhas@gmail.com",
    line: "bjsjm000",
    github: "https://github.com/bjsjm000",
    linkedin: "https://www.linkedin.com/in/rachabhas-vongbuntoon",
  },
  quickStats: [
    { label: "Experience", value: "2022–Now" },
    { label: "Focus", value: "Full-Stack / UI Motion" },
    { label: "Strength", value: "Realtime + Enterprise" },
  ],
} as const;

export const experiences = [
  {
    company: "Turnkey Communication Service PCL",
    role: "Full Time - Software Developer",
    period: "Nov 2022 - Present",
    projects: [
      {
        name: "Smart Farm",
        bullets: [
          "Developed Smart Farm web app for crop management and sensor data collection across multiple locations",
          "Designed UI/UX and user journeys with PM/PO based on business requirements",
          "Designed database architecture for MySQL + MongoDB",
          "Implemented MQTT publish/subscribe routes for IoT devices via LoRa/WiFi",
          "Built real-time monitoring/visualization for sensor data dashboards",
          "Built dashboard + notification system integrating LINE Notify, Discord, and Slack",
          "Implemented device status monitoring (online/offline)",
          "Built RBAC system for roles/permissions and full CRUD modules",
          "Created automated backend integration tests covering 300+ test cases",
          "Processed encrypted sensor payloads (Base64-encoded JSON) and displayed in real time",
        ],
      },
      {
        name: "5G Auto Bus",
        bullets: [
          "Designed UI/UX for web + mobile with vendor based on business requirements",
          "Coordinated development tasks with vendor (web/mobile) and validated features",
          "Created manual test cases (step-by-step) for data collection and gap tracking",
        ],
      },
    ],
  },
  {
    company: "OSD Company Limited",
    role: "Internship",
    period: "Jun 2022 - Aug 2022",
    projects: [
      {
        name: "Debt Collection Ticketing Web App",
        bullets: [
          "Developed web app for debtor list handling and sending info to debt collectors",
          "Implemented CRUD for ticketing services + reporting and debtor due-date levels",
          "Used PHP for Excel sheet design + backend services",
          "Built frontend with React and backend with Node.js (Express.js)",
          "Implemented Windows login authentication with MVC, C#, .NET ASP",
        ],
      },
    ],
  },
  {
    company: "SkillLane Technology PCL",
    role: "Internship - Fullstack Developer (B2B Team)",
    period: "Jan 2022 - May 2022",
    projects: [
      {
        name: "B2B Online Learning Web App",
        bullets: [
          "Developed private online course web application for B2B projects",
          "Used React for frontend, Node.js (Express.js) for backend, MongoDB for database",
        ],
      },
      {
        name: "Web Broadcasting",
        bullets: [
          "Designed UI/UX and user journeys for broadcasting platform",
          "Implemented voice streaming/recording, playlist management, and scheduled playback",
          "Built frontend with Vue.js (TypeScript) and backend with Node.js (Express.js)",
          "Implemented CRUD for broadcasting/content management modules",
          "Enabled real-time streaming and data transmission using Socket.IO",
        ],
      },
    ],
  },
];

// src/data/resume.ts

// src/data/resume.ts
export const projects = [
  {
    id: "smart-farm",
    title: "Smart Farm",
    subtitle: "IoT + Real-time monitoring for multi-location farms",
    company: "Turnkey Communication Service PCL",
    period: "Nov 2022 – Present",
    theme: {
      // TKC/enterprise blue: monochrome/analogous blues for trust & clarity
      bg: "#071A3A",
      fg: "#F7FAFF",
      surface: "rgba(255,255,255,0.10)",
      surface2: "rgba(255,255,255,0.14)",
      border: "rgba(255,255,255,0.18)",
      accent: "#4D8FFF",
      accent2: "#A8D8FF",
      muted: "rgba(255,255,255,0.72)",
    },
    stack: ["Web App", "MySQL", "MongoDB", "MQTT", "Realtime", "RBAC"],
    highlights: [
      "Crop management + sensor data collection across multiple locations",
      "MQTT publish/subscribe routes for IoT devices (LoRa/WiFi)",
      "Real-time dashboards & visualization for sensor data",
      "Notifications integration: LINE Notify, Discord, Slack",
      "Device status monitoring (online/offline) for connectivity tracking",
      "Processed encrypted sensor payloads (Base64 JSON) for realtime dashboards",
    ],
    badges: ["Enterprise", "IoT", "Realtime"],
  },
  {
    id: "5g-auto-bus",
    title: "5G Auto Bus",
    subtitle: "Web & Mobile UX + QA workflow with vendor delivery",
    company: "Turnkey Communication Service PCL",
    period: "Nov 2022 – Present",
    theme: {
      // cyber cyan: analogous blue→cyan, modern/telecom feel
      bg: "#041625",
      fg: "#F3FBFF",
      surface: "rgba(255,255,255,0.10)",
      surface2: "rgba(255,255,255,0.14)",
      border: "rgba(255,255,255,0.18)",
      accent: "#00BCD4",
      accent2: "#B2EBF2",
      muted: "rgba(255,255,255,0.72)",
    },
    stack: ["UI/UX", "Web + Mobile", "Vendor Coordination", "Manual Testcase"],
    highlights: [
      "Designed UI/UX for web and mobile app with vendor",
      "Coordinated development tasks and verified feature correctness",
      "Created step-by-step manual test cases for data collection & gap tracking",
    ],
    badges: ["Product UX", "QA", "Collaboration"],
  },
  {
    id: "ocr-oil-billing",
    title: "OCR Oil Billing",
    subtitle: "Internal automation: OCR invoices + Admin dashboard",
    company: "Internal Process",
    period: "Project",
    theme: {
      // monochrome dark + cold accent for “automation/ops”
      bg: "#0B0F1A",
      fg: "#F7F7FB",
      surface: "rgba(255,255,255,0.08)",
      surface2: "rgba(255,255,255,0.12)",
      border: "rgba(255,255,255,0.16)",
      accent: "#A8EFF4",
      accent2: "#E0E5EC",
      muted: "rgba(255,255,255,0.70)",
    },
    stack: ["Next.js", "NestJS", "OCR", "Google Sheets", "Dashboard"],
    highlights: [
      "Full-stack internal web app for oil billing operations",
      "Admin dashboard + OCR-based invoice handling",
      "Google Sheets integration + database management",
    ],
    badges: ["Automation", "OCR", "Full-Stack"],
  },
  {
    id: "crm-sale",
    title: "CRM for Sale Management",
    subtitle: "Internal enterprise CRM with pipeline + exec dashboards",
    company: "Internal Process",
    period: "Project",
    theme: {
      // slate + green accent: business/dashboard, calm but premium
      bg: "#0B1220",
      fg: "#F6FFFB",
      surface: "rgba(255,255,255,0.09)",
      surface2: "rgba(255,255,255,0.13)",
      border: "rgba(255,255,255,0.17)",
      accent: "#4EBF9B",
      accent2: "#B7E4C7",
      muted: "rgba(255,255,255,0.72)",
    },
    stack: ["CRM", "Dashboards", "Multi-team", "Sales Pipeline"],
    highlights: [
      "Architected scalable internal CRM with multi-team support",
      "Project-based customer tracking",
      "Stage-driven sales pipeline",
      "Executive dashboards for annual & long-term goal monitoring",
    ],
    badges: ["Enterprise", "Architecture", "Dashboard"],
  },
  {
    id: "b2b-learning",
    title: "B2B Online Learning Platform",
    subtitle: "Private course platform for B2B projects",
    company: "SkillLane Technology PCL",
    period: "Jan 2022 – May 2022",
    theme: {
      // soft mint + teal accent: friendly edtech (light theme)
      bg: "#E8F7EE",
      fg: "#0F2E1E",
      surface: "rgba(255,255,255,0.70)",
      surface2: "rgba(255,255,255,0.85)",
      border: "rgba(15,46,30,0.14)",
      accent: "#2DBE7E",
      accent2: "#88C9A7",
      muted: "rgba(15,46,30,0.68)",
    },
    stack: ["React", "Node.js (Express)", "MongoDB"],
    highlights: [
      "Developed private online course web application for B2B usage",
      "React frontend + Express backend + MongoDB database",
    ],
    badges: ["Full-Stack", "B2B", "Product"],
  },
  {
    id: "web-broadcasting",
    title: "Web Broadcasting Platform",
    subtitle: "Voice streaming/recording + realtime data transmission",
    company: "SkillLane Technology PCL",
    period: "Jan 2022 – May 2022",
    theme: {
      // light green-blue family: energetic but soft
      bg: "#DCFCE7",
      fg: "#052E16",
      surface: "rgba(255,255,255,0.70)",
      surface2: "rgba(255,255,255,0.88)",
      border: "rgba(5,46,22,0.14)",
      accent: "#16A34A",
      accent2: "#6FCF97",
      muted: "rgba(5,46,22,0.68)",
    },
    stack: ["Vue (TypeScript)", "Node.js (Express)", "Socket.IO", "CRUD"],
    highlights: [
      "Designed UI/UX and user journeys for broadcasting platform",
      "Voice streaming/recording, playlist management, scheduled playback",
      "Full CRUD for broadcasting & content management modules",
      "Real-time streaming and data transmission via Socket.IO",
    ],
    badges: ["Realtime", "Streaming", "Vue/TS"],
  },
  {
    id: "debt-ticketing",
    title: "Debt Collection Ticketing System",
    subtitle: "Ticketing + reporting + Windows auth workflow",
    company: "OSD Company Limited",
    period: "Jun 2022 – Aug 2022",
    theme: {
      // pastel sky + cerulean accent: clean/reporting feel
      bg: "#EAF5FF",
      fg: "#0B2239",
      surface: "rgba(255,255,255,0.72)",
      surface2: "rgba(255,255,255,0.90)",
      border: "rgba(11,34,57,0.14)",
      accent: "#2F80ED",
      accent2: "#B3DAFF",
      muted: "rgba(11,34,57,0.68)",
    },
    stack: ["React", "Node.js (Express)", "PHP", ".NET MVC"],
    highlights: [
      "Debt collection ticketing web app to handle debtor list and workflows",
      "CRUD services + reporting + debtor due-date level tracking",
      "PHP for Excel sheet design + backend services",
      "Windows login authentication with MVC, C#, .NET",
    ],
    badges: ["Full-Stack", "Auth", "Reporting"],
  },
] as const;



export const skills = {
  programming: [
    "JavaScript",
    "TypeScript",
    "PHP",
    "CSS",
    "HTML",
    "Java",
    "Dart",
    "Swift",
    "Python",
    "C#",
    "C++",
  ],
  frameworks: ["Vue", "React", "React Native", "Nuxt.js", "Express.js", "Bootstrap", "Vuetify", "Vite", "Ant Design"],
  databases: ["MongoDB", "MySQL", "InfluxDB", "PostgreSQL", "DBeaver"],
  tools: ["Bitbucket", "Jira", "GitHub", "GitLab", "GitKraken", "Microsoft Office", "Figma"],
};

// src/data/resume.ts
export const timeline = [
  {
    id: "skilllane",
    company: "SkillLane Technology PCL",
    date: "Jan–May 2022",
    role: "Internship - Fullstack Developer (B2B Team)",
    theme: {
      name: "SkillLane",
      bg: "#E8F7EE",
      fg: "#0F2E1E",
      accent: "#2DBE7E",
      surface: "rgba(255,255,255,0.78)",
      surface2: "rgba(255,255,255,0.92)",
      border: "rgba(15,46,30,0.18)",
      muted: "rgba(15,46,30,0.72)",
    },
    highlights: [
      "B2B private online course web application (React + Express + MongoDB)",
      "Web broadcasting: streaming/recording, playlist, scheduled playback",
      "Real-time streaming & data transmission using Socket.IO",
      "Vue.js (TypeScript) frontend + Node.js (Express.js) backend",
    ],
    tags: ["React", "Vue (TS)", "Node.js", "MongoDB", "Socket.IO"],
  },
  {
    id: "osd",
    company: "OSD Company Limited",
    date: "Jun–Aug 2022",
    role: "Internship",
    theme: {
      name: "TKC",
      bg: "#0B3B8C",
      fg: "#FFFFFF",
      accent: "#7DB7FF",
      surface: "rgba(255,255,255,0.10)",
      surface2: "rgba(255,255,255,0.14)",
      border: "rgba(255,255,255,0.18)",
      muted: "rgba(255,255,255,0.72)",
    },
    highlights: [
      "Debt collection ticketing web app + debtor workflow",
      "CRUD services + reporting + due-date levels",
      "PHP services for Excel sheet design",
      "Windows login auth with MVC, C#, .NET",
    ],
    tags: ["React", "Node.js (Express)", "PHP", ".NET MVC"],
  },
  {
    id: "tkc",
    company: "Turnkey Communication Service PCL",
    date: "Nov 2022–Present",
    role: "Full Time - Software Developer",
    theme: {
    name: "TKC",
    bg: "#0B3B8C",
    fg: "#FFFFFF",
    accent: "#7DB7FF",
    surface: "rgba(255,255,255,0.10)",
    surface2: "rgba(255,255,255,0.14)",
    border: "rgba(255,255,255,0.18)",
    muted: "rgba(255,255,255,0.72)",
    },
    highlights: [
      "Smart Farm: crop management + sensor data multi-location",
      "MQTT pub/sub for IoT (LoRa/WiFi) + device online/offline monitoring",
      "Real-time dashboard + notifications (LINE Notify / Discord / Slack)",
      "RBAC roles/permissions + full CRUD modules",
      "Automated backend integration tests (300+ cases)",
    ],
    tags: ["MySQL", "MongoDB", "MQTT", "Realtime", "RBAC"],
  },
  {
    id: "highlights",
    company: "Project Highlights",
    date: "Internal Systems",
    role: "Automation & Business Tools",
    theme: {
      name: "Highlights",
      bg: "#0A0A0A",
      fg: "#FFFFFF",
      accent: "#FFFFFF",
    },
    highlights: [
      "OCR Oil Billing: Admin dashboard + OCR + Google Sheets integration",
      "CRM for Sale Management: pipeline stages + executive dashboards",
    ],
    tags: ["Next.js", "NestJS", "OCR", "Google Sheets", "CRM"],
  },
] as const;

