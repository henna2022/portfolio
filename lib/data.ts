export const person = {
  name: "Juwon Lee",
  hangul: "이주원",
  role: "AI & Robotics Educator · Full-Stack Developer",
  email: "juwonlee211@gmail.com",
  github: "https://github.com/henna2022",
  githubHandle: "henna2022",
  linkedin: "https://www.linkedin.com/in/juwon-lee-677b702b3/",
  status: "Available",
  photo: "/portfolio_images/profile/juwonlee.jpg",
  resume: "/resume.pdf",
  cv: "/cv.pdf",
};

export const nav = [
  { label: "About", href: "/#about" },
  { label: "Work", href: "/#work" },
  { label: "Contact", href: "/#contact" },
];

export const hero = {
  badge: "AI · Robotics · Web",
  headline: "Building interactive learning where AI meets the physical world.",
  sub: "I'd rather show you than tell you — and I love the moment something finally clicks.",
};

export type BioWord = { w: string; s: boolean };

export const about = {
  photo: "/portfolio_images/profile/juwonlee.jpg",
  bio: [
    [
      { w: "Hi,", s: false }, { w: "I'm", s: false }, { w: "Juwon", s: true }, { w: "Lee.", s: true },
      { w: "I", s: false }, { w: "turn", s: false }, { w: "ideas", s: false }, { w: "into", s: false },
      { w: "working", s: true }, { w: "products", s: true },
      { w: "and", s: false }, { w: "make", s: false }, { w: "hard", s: false }, { w: "technology", s: false },
      { w: "feel", s: true }, { w: "simple", s: true },
      { w: "—", s: false }, { w: "the", s: false }, { w: "moment", s: false }, { w: "it", s: false },
      { w: "clicks", s: true }, { w: "for", s: false }, { w: "someone", s: false },
      { w: "is", s: false }, { w: "what", s: false }, { w: "I", s: false }, { w: "chase.", s: false },
    ],
    [
      { w: "I'm", s: false }, { w: "most", s: false }, { w: "drawn", s: false }, { w: "to", s: false },
      { w: "where", s: false }, { w: "software", s: false }, { w: "leaves", s: false }, { w: "the", s: false }, { w: "screen:", s: false },
      { w: "computer", s: true }, { w: "vision,", s: true }, { w: "IoT,", s: true },
      { w: "and", s: false }, { w: "robotics", s: true },
      { w: "that", s: false }, { w: "sense", s: true }, { w: "and", s: true }, { w: "act", s: true },
      { w: "in", s: false }, { w: "the", s: false }, { w: "real", s: false }, { w: "world.", s: false },
    ],
    [
      { w: "I", s: false }, { w: "want", s: false }, { w: "to", s: false }, { w: "build", s: false },
      { w: "AI", s: true }, { w: "&", s: true }, { w: "robotics", s: true }, { w: "products", s: true },
      { w: "that", s: false }, { w: "reach", s: true }, { w: "real", s: true }, { w: "people,", s: true },
      { w: "and", s: false }, { w: "keep", s: false }, { w: "growing", s: false }, { w: "as", s: false }, { w: "an", s: false },
      { w: "engineer", s: true },
      { w: "who", s: false }, { w: "ships", s: true }, { w: "what", s: true }, { w: "matters.", s: true },
    ],
  ] as BioWord[][],
  facts: [
    { k: "Based in", v: "Seoul, KR" },
    { k: "Education", v: "Hankyong National University — SW Convergence & Plant Life" },
    { k: "Also", v: "Rutgers Winter Intensive English (2025)" },
    { k: "Languages", v: "Korean · English" },
  ],
};

export type Project = {
  slug: string;
  n: string;
  title: string;
  category: string;
  kicker: string;
  desc: string;
  year: string;
  role: string;
  tags: string[];
  href?: string;
  repo?: string;
  image?: string;
  imageFit?: "cover" | "contain";
  stat?: string;
  overview: string;
  highlights: string[];
  flow?: string[];
  flowImage?: { light: string; dark: string };
  gallery?: string[];
};

export const projects: Project[] = [
  {
    slug: "doctor-green",
    n: "01",
    title: "Doctor-Green",
    category: "AI · IoT Full-stack",
    kicker: "Smart-farm platform · solo project",
    desc: "A smart-farm platform unifying YOLOv8 crop-disease diagnosis with live IoT environment monitoring.",
    year: "2026",
    role: "Solo — planning to deployment",
    tags: ["Next.js 16", "TypeScript", "Supabase", "Flask", "ESP32", "YOLOv8", "Roboflow"],
    href: "https://doctor-green-nine.vercel.app/",
    image: "/portfolio_images/logo/logo_doctorgreen.png",
    imageFit: "contain",
    stat: "mAP 0.95",
    overview:
      "Doctor-Green diagnoses crop disease from camera video with an AI module while IoT devices measure and control the growing environment — all unified in a single web platform, from sensor to screen.",
    highlights: [
      "ESP32 sensor nodes collect environment data, relayed through a Flask server into Supabase and visualized live in a Next.js dashboard.",
      "YOLOv8 runs on USB-camera video to detect 7 crop-disease classes; first training (50 epochs) reached mAP50 ≈ 0.95.",
      "Second training (YOLOv8l, 150 epochs) in progress to push accuracy further.",
    ],
    flow: ["ESP32 sensors", "Flask relay", "Supabase", "Next.js dashboard"],
    flowImage: {
      light: "/portfolio_images/flow/doctor-green-flow-light.png",
      dark: "/portfolio_images/flow/doctor-green-flow-dark.png",
    },
    gallery: ["/portfolio_images/logo/logo_doctorgreen.png"],
  },
  {
    slug: "raimi-art-lab",
    n: "02",
    title: "Raimi's AI Art Lab",
    category: "Web App · Education",
    kicker: "Live @ Seoul Robot & AI Science Museum",
    desc: "A guided prompt builder where visitors co-create AI artwork with the character Raimi.",
    year: "2026",
    role: "Planning · development · operations",
    tags: ["JavaScript", "OpenAI API", "Vercel Serverless", "Supabase", "Cloudflare R2", "PWA"],
    image: "/portfolio_images/projects/artstudio1.jpg",
    stat: "140+/day",
    overview:
      "Visitors build a prompt step by step with the character Raimi, then AI generates their artwork. Running live at the museum, it produces 140+ images daily (550+ on weekends).",
    highlights: [
      "10-step (+5 advanced) choice-based prompt builder designed for all-ages museum visitors.",
      "Eliminated 100% of the connection conflicts that plagued the prior off-the-shelf service by moving to a custom backend.",
      "Auto-watermarks every image with the museum logo and dual-stores on Cloudflare R2 and Supabase.",
      "First service at the museum to quantify generation volume through a custom backend.",
    ],
    flow: ["10-step prompt builder", "OpenAI API", "Auto-watermark", "R2 + Supabase"],
    flowImage: {
      light: "/portfolio_images/flow/raimi-art-lab-flow-light.svg",
      dark: "/portfolio_images/flow/raimi-art-lab-flow-dark.svg",
    },
    gallery: [
      "/portfolio_images/projects/artstudio1.jpg",
      "/portfolio_images/projects/artstudio2.jpg",
    ],
  },
  {
    slug: "im-a-restorer",
    n: "03",
    title: "I'm a Restorer!",
    category: "Interactive Web Game",
    kicker: "Exhibition-linked education content",
    desc: "An interactive game where visitors restore Korean cultural heritage.",
    year: "2025",
    role: "Development",
    tags: ["JavaScript", "HTML/CSS", "GitHub Pages"],
    href: "https://henna2022.github.io/ai-restoration-exhibit/",
    repo: "https://github.com/henna2022/ai-restoration-exhibit",
    image: "/portfolio_images/restorer1.jpg",
    overview:
      "Visitors restore Korean cultural heritage through an interactive web game, used as exhibition-linked education content at the museum. Deployed and operational.",
    highlights: [
      "Hands-on restoration gameplay that ties directly to the physical exhibition.",
      "Used as live exhibition-linked education content.",
      "Shipped and hosted on GitHub Pages.",
    ],
    gallery: [
      "/portfolio_images/restorer1.jpg",
      "/portfolio_images/restorer2.jpg",
    ],
  },
  {
    slug: "raimi-language-lab",
    n: "04",
    title: "Raimi's AI Language Lab",
    category: "Language-learning Web App",
    kicker: "Speech AI experience",
    desc: "A game-based speech experience where visitors listen and repeat words with Raimi.",
    year: "2026",
    role: "Planning · development",
    tags: ["Web Speech API", "PWA", "HTML/CSS", "KO / EN"],
    image: "/portfolio_images/projects/langlab1.jpg",
    overview:
      "Visitors listen to and repeat words and sentences with the Raimi character in a game-based speech experience — fully browser-based and offline-ready for exhibition tablets.",
    highlights: [
      "Browser-native speech synthesis with no server required.",
      "Bilingual Korean / English support.",
      "Designed for offline tablet use at exhibitions.",
    ],
    flow: ["Web Speech API", "Browser TTS", "Offline PWA"],
    gallery: ["/portfolio_images/projects/langlab1.jpg"],
  },
  {
    slug: "ato-care-robot",
    n: "05",
    title: "ATO — Care Robot",
    category: "AI Healthcare · Care Robot",
    kicker: "Companion & medication-care robot",
    desc: "A rabbit-shaped companion robot extended with the YAKMOA multimodal medication-care service.",
    year: "2026",
    role: "Solo — planning, development, hardware & AI",
    tags: ["ESP32", "Arduino/C++", "GC9A01 LCD", "Servo / PIR / Touch", "3D Printing", "Multimodal AI"],
    stat: "Award",
    overview:
      "ATO is a rabbit-shaped emotional companion robot for single-person households and seniors, extended with a multimodal AI medication-management service, YAKMOA, for digitally vulnerable users.",
    highlights: [
      "Dual round-LCD eyes with expression animations (blinking, gaze).",
      "PIR proximity detection, capacitive touch (petting), DFPlayer audio, and servo ear/arm motion.",
      "Full build including a 3D-printed body and microfiber sewing.",
      "YAKMOA integration for medicine recognition and dose management.",
      "Won a prize at the GH Youth Build-Up Start-up Competition (team MAKENEW).",
    ],
    flow: ["Sensors (PIR / touch)", "ESP32 / Arduino", "Servo + LCD expression", "YAKMOA multimodal AI"],
  },
  {
    slug: "raim-staff-platform",
    n: "06",
    title: "SEOUL RAIM Staff Platform",
    category: "Internal Operations Tool",
    kicker: "Docent & part-timer management",
    desc: "A staff app for scheduling, rosters, live duty status, and notices.",
    year: "2026",
    role: "Solo — planning & development",
    tags: ["React", "Vite", "Firebase / Firestore", "Capacitor"],
    image: "/portfolio_images/projects/raimapp_main.png",
    imageFit: "contain",
    overview:
      "An internal app for managing docents and part-time workers — schedules, roster, live duty status, and notices — refactored from a single-HTML prototype into a maintainable Vite + React app.",
    highlights: [
      "Refactored a single-HTML prototype into a structured Vite + React codebase.",
      "Real-time roster and duty status backed by Firebase / Firestore.",
      "Packaged with Capacitor for iOS / Android internal distribution.",
    ],
    flow: ["React + Vite", "Firebase / Firestore", "Capacitor", "iOS / Android internal"],
    flowImage: {
      light: "/portfolio_images/flow/raim-staff-platform-flow-light.svg",
      dark: "/portfolio_images/flow/raim-staff-platform-flow-dark.svg",
    },
    gallery: ["/portfolio_images/projects/raimapp_main.png"],
  },
  {
    slug: "smart-farm-education",
    n: "07",
    title: "Smart-Farm Education Program",
    category: "Education Program",
    kicker: "Museum × Yangpyeong Education Office",
    desc: "A hands-on program where students experience IoT smart farming and AI crop diagnosis.",
    year: "2026",
    role: "Solo — planning & development",
    tags: ["YOLO", "Weather API", "Server", "Web App", "IoT"],
    overview:
      "A hands-on education program, co-designed with Yangpyeong Education Office, where students experience an IoT smart farm and AI crop diagnosis with a full server and web-app environment.",
    highlights: [
      "Integrated a location-based weather API to tie lessons to real growing conditions.",
      "Explores YOLO training at a student level — epoch experiments and loss reduction.",
      "Students watch sensor values load and change in real time in a virtual database.",
    ],
    flow: ["IoT sensors", "Weather API", "Server", "Student web app"],
  },
  {
    slug: "raim-photo-booth",
    n: "08",
    title: "RAIM AI Photo Booth",
    category: "Keepsake Photo Booth",
    kicker: "Museum 2nd anniversary",
    desc: "A four-cut photo booth with museum robots; AI recommends the best shot.",
    year: "2026",
    role: "Solo — planning & development (in progress)",
    tags: ["JavaScript", "AI image selection", "QR", "Web App"],
    overview:
      "Visitors take four-cut photos with the museum robots and grab them via QR code, while an AI algorithm recommends the best-looking shot. Built for the museum's 2nd-anniversary event.",
    highlights: [
      "Solves the 'no keepsake' problem for visitors.",
      "Four-cut frames feature the museum robot characters.",
      "AI selects the best-looking shot among the takes.",
    ],
    flow: ["Capture 4 cuts", "AI best-shot selection", "QR delivery"],
  },
  {
    slug: "raim-metaverse",
    n: "09",
    title: "RAIM Metaverse",
    category: "Exhibition Accessibility",
    kicker: "Online exhibition twin",
    desc: "An online metaverse version of the permanent exhibition.",
    year: "2026",
    role: "Solo — planning & development (in progress)",
    tags: ["Metaverse", "Web", "3D"],
    overview:
      "An online metaverse version of the permanent exhibition for visitors who cannot book an on-site slot — expanding access by reconstructing the space and visitor flow in a metaverse format.",
    highlights: [
      "Expands exhibition access beyond limited on-site bookings.",
      "Reconstructs the exhibition space and visitor flow in a metaverse format.",
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export const skills = [
  "Python",
  "YOLOv8",
  "VGG16 / CNN",
  "Next.js",
  "React",
  "TypeScript",
  "JavaScript",
  "Java",
  "Supabase",
  "Firebase",
  "Flask",
  "ESP32 / MicroPython",
  "Tailwind",
  "Git",
  "Learning Design",
];

export const experience = [
  {
    org: "Seoul Robot & AI Science Museum",
    role: "Education Content Planner & Developer",
    period: "2026.03 — Present",
    gallery: ["/portfolio_images/experience/docent_1.JPG"],
    points: [
      "Build and run interactive AI education web apps used live by museum visitors.",
      "Co-designed a smart-farm education program with Yangpyeong Education Office, including full server and web-app setup.",
      "Shipped internal ops and exhibition tools — staff scheduler, AI photo booth, and a metaverse exhibit.",
      "Guide exhibitions bilingually (KO / EN) and support multipurpose education rooms.",
    ],
  },
  {
    org: "Select Star",
    role: "Data Contributor & QA",
    period: "2025.11 — 2026.01",
    points: [
      "Built complex 3-hop reasoning Q&A datasets for AI model training and evaluation.",
      "Sustained 2.5× the team's average throughput while holding accuracy.",
    ],
  },
  {
    org: "Ministry of Science and ICT",
    role: "Youth Intern",
    period: "2025.04 — 2025.07",
    points: [
      "Redesigned the national Pay-TV survey and drafted Broadcasting Act review materials.",
      "Covered 11 ministry exhibitions and conferences; authored reports and issue briefs.",
    ],
  },
];

export type Activity = {
  period: string;
  title: string;
  role: string;
};

export const activities: Activity[] = [
  {
    period: "2026.02 — Present",
    title: "Geuruteogi Learning Mentoring 'Gachi-Edu'",
    role: "University mentor for youth learning",
  },
  {
    period: "2025.07 — Present",
    title: "Youth SW-Donghaeng Hackathon",
    role: "University mentor · planning & development",
  },
  {
    period: "2025.06 — 2025.12",
    title: "CIEE SEOULMATE",
    role: "Mentor for international students",
  },
  {
    period: "2024.09 — 2024.12",
    title: "SW-Donghaeng Project",
    role: "Youth mentor for semester-long student projects",
  },
  {
    period: "2024.07 — 2025.02",
    title: "Hankyong Start-up Club (MAKENEW)",
    role: "Team leader",
  },
  {
    period: "2024.07 — 2024.08",
    title: "LS Dream Science Class, 20th",
    role: "Lead instructor for an elementary science program",
  },
  {
    period: "2024.03 — 2026.02",
    title: "KB LA School",
    role: "High-school mentor · math & chemistry (online)",
  },
];

export type Award = {
  year: string;
  title: string;
  detail: string;
  result: string;
  role: string;
  topic: string;
  photos: string[];
};

export const awards: Award[] = [
  {
    year: "2026",
    title: "GH Youth Build-Up Start-up Competition",
    detail: "Prize — YAKMOA medication-management service (team MAKENEW)",
    result: "Prize winner",
    role: "PM & Developer",
    topic:
      "YAKMOA, a multimodal-AI medication-management service for digitally vulnerable users, built on the ATO care robot.",
    photos: ["/portfolio_images/awards/award1_gh.jpg"],
  },
  {
    year: "2025",
    title: "Science Museum & Community AI Hackathon",
    detail: "2nd place — AI docent for museum–community co-prosperity",
    result: "2nd place",
    role: "PM & Developer",
    topic:
      "An AI docent concept for museum–community co-prosperity, connecting exhibitions with the local community.",
    photos: [
      "/portfolio_images/awards/award2_science_museum_1.jpg",
      "/portfolio_images/awards/award2_science_museum_2.png",
    ],
  },
  {
    year: "2024",
    title: "ICT·SW Women's Start-up Competition",
    detail: "3rd place — VGG16 plant-disease diagnosis app",
    result: "3rd place",
    role: "PM & Developer",
    topic:
      "A plant-disease diagnosis app powered by a VGG16 image classifier (Korea IT Businesswomen's Association).",
    photos: ["/portfolio_images/awards/award3_ict_sw.png"],
  },
  {
    year: "2024",
    title: "Chungnam Generative AI Start-up Idea Competition",
    detail: "3rd place — Ministry of Science and ICT",
    result: "3rd place",
    role: "PM & Developer",
    topic:
      "A generative-AI tech start-up idea, hosted by the Ministry of Science and ICT.",
    photos: [
      "/portfolio_images/awards/award4_chungnam_1.jpg",
      "/portfolio_images/awards/award4_chungnam_2.jpg",
    ],
  },
  {
    year: "2024",
    title: "HKNU StarUP&GO Audition",
    detail: "3rd place — start-up competition",
    result: "3rd place",
    role: "PM & Developer",
    topic: "An early-stage start-up pitch audition at Hankyong National University.",
    photos: [
      "/portfolio_images/awards/hknu_photo.jpg",
      "/portfolio_images/awards/hknu_startup.png",
    ],
  },
];

export const marqueeWords = [
  "AI EDUCATION",
  "ROBOTICS",
  "FULL-STACK",
  "COMPUTER VISION",
  "IoT",
  "INTERACTIVE LEARNING",
];
