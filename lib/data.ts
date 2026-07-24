export const person = {
  name: "Juwon Lee",
  hangul: "이주원",
  role: "AI & Robotics Educator · Full-Stack Developer",
  email: "juwonlee211@gmail.com",
  github: "https://github.com/henna2022",
  githubHandle: "henna2022",
  linkedin: "https://www.linkedin.com/in/juwon-lee-677b702b3/",
  photo: "/portfolio_images/profile/juwonlee.jpg",
  // 헤더 아바타·푸터용 저용량 썸네일 (원본은 About 섹션에서만 사용)
  photoSm: "/portfolio_images/profile/juwonlee-sm.jpg",
  resume: "/files/Juwon_Lee_Resume_EN.pdf",
  cv: "/files/Juwon_Lee_CV_EN.pdf",
};

export const sections = [
  { id: "top", label: "Home" },
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "skills", label: "Stack" },
  { id: "experience", label: "Experience" },
  { id: "activities", label: "Activities" },
  { id: "awards", label: "Awards" },
  { id: "contact", label: "Contact" },
];

export const hero = {
  badge: "AI · Robotics · Web",
  headline: "Building interactive learning where AI meets the physical world.",
  sub: "I build AI that steps off the screen, onto robots, sensors, and museum floors, and teach people how it works.",
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
      { w: "feel", s: true }, { w: "simple.", s: true },
      { w: "The", s: false }, { w: "moment", s: false }, { w: "it", s: false },
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
      { w: "I", s: false }, { w: "want", s: false }, { w: "to", s: false },
      { w: "research", s: false }, { w: "and", s: false }, { w: "develop", s: false },
      { w: "AI", s: true }, { w: "&", s: true }, { w: "robotics", s: true }, { w: "products", s: true },
      { w: "that", s: false }, { w: "reach", s: true }, { w: "real", s: true }, { w: "people,", s: true },
      { w: "and", s: false }, { w: "keep", s: false }, { w: "growing", s: false }, { w: "as", s: false }, { w: "an", s: false },
      { w: "engineer", s: true },
      { w: "who", s: false }, { w: "ships", s: true }, { w: "what", s: true }, { w: "matters.", s: true },
    ],
  ] as BioWord[][],
  facts: [
    { k: "Based in", v: "Seoul, KR" },
    {
      k: "Education",
      v: "Cheongwon Girls' High School (2019 - 2022)\nHankyong National University: Plant Life & Environment (B.S.) · SW Convergence (B.Eng.), double major (2022 - present)\nRutgers University: Winter Intensive English (2025)",
    },
    {
      k: "Languages & Certifications",
      v: "Korean (native) · English (fluent) · TOEIC Speaking AL · OPIc AL",
    },
  ],
};

export type Project = {
  slug: string;
  n: string;
  tier: "major" | "side";
  title: string;
  category: string;
  categories: string[];
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
  // ── Major projects ──
  {
    slug: "doctor-green",
    n: "01",
    tier: "major",
    title: "Doctor-Green",
    category: "AI · IoT Full-stack",
    categories: ["AI", "IoT", "Web"],
    kicker: "Smart-farm platform · solo project",
    desc: "A smart-farm platform unifying YOLOv8 crop-disease diagnosis with live IoT environment monitoring and control. Built solo end to end, from ESP32 sensor nodes to the deployed Next.js dashboard.",
    year: "2024 - 2026",
    role: "Solo: planning to deployment",
    tags: ["Next.js 16", "TypeScript", "Supabase", "Flask", "ESP32", "YOLOv8", "Roboflow"],
    href: "https://doctor-green-nine.vercel.app/",
    repo: "https://github.com/henna2022/doctor-green",
    image: "/portfolio_images/projects/doctorgreen_app.png",
    imageFit: "contain",
    stat: "End-to-end solo",
    overview:
      "Doctor-Green is a smart-farm platform that unifies an AI module diagnosing crop disease from camera video with IoT devices that measure and control the growing environment, all operated on a single web platform, so diagnosis and environment control live on one screen. I planned and built the whole pipeline solo, from sensor to dashboard.\n\nIt grew out of the VGG16 plant-disease-diagnosis app that won the Excellence Award at the 2024 ICT·SW Women's Start-up Competition, and was rebuilt in 2026 as a full smart-farm platform on YOLOv8.\n\nESP32 sensor nodes collect environment data, relay it through a Mac-based Flask server into Supabase, and a Next.js web app visualizes it live. From the same app, actuators such as LEDs and fans are controlled in real time through Supabase Realtime subscriptions. For diagnosis, YOLOv8 runs on USB-camera video to detect and diagnose 7 crop-disease classes.\n\nTraining uses the Roboflow strawberry-disease-detection-dataset v4 with an augmentation strategy for class imbalance; the first run (50 epochs) reached mAP50 ≈ 0.95, and a second YOLOv8l run (150 epochs) is in progress to push accuracy further. The web app is deployed on Vercel as a live demo.",
    highlights: [
      "Data flow built end to end: IoT sensing → Mac relay server (Flask) → Supabase → real-time Next.js visualization.",
      "YOLOv8 on USB-camera video detects and diagnoses 7 crop-disease classes.",
      "Real-time actuator control (LED, fan) from the web app via Supabase Realtime subscriptions.",
      "First training (50 epochs) reached mAP50 ≈ 0.95; second YOLOv8l training (150 epochs) in progress.",
      "Used the Roboflow strawberry-disease-detection-dataset v4 with an augmentation strategy for class imbalance.",
      "Next.js 16 + TypeScript + Tailwind web app deployed on Vercel as a live demo.",
    ],
    flow: ["ESP32 sensors", "Flask relay", "Supabase", "Next.js dashboard"],
    flowImage: {
      light: "/portfolio_images/flow/doctor-green-flow-light.svg",
      dark: "/portfolio_images/flow/doctor-green-flow-dark.svg",
    },
    gallery: [
      "/portfolio_images/projects/doctorgreen_app.png",
      "/portfolio_images/logo/logo_doctorgreen.png",
    ],
  },
  {
    slug: "raimi-art-lab",
    n: "02",
    tier: "major",
    title: "Raimi's AI Art Lab",
    category: "Web App · Education",
    categories: ["AI", "Web", "Education"],
    kicker: "Live @ Seoul Robot & AI Science Museum",
    desc: "A guided prompt builder where visitors co-create AI artwork with the museum character Raimi. Running live at the museum, it generates an average of 142 images on weekdays and 557 on weekends.",
    year: "2026",
    role: "Planning · development · operations",
    tags: ["JavaScript", "OpenAI API", "Vercel Serverless", "Supabase", "Cloudflare R2", "PWA"],
    repo: "https://github.com/henna2022/raim-ai-artstudio",
    image: "/portfolio_images/projects/ai-studio-1.jpg",
    stat: "140+/day",
    overview:
      "Visitors compose a prompt step by step with the museum character Raimi, choosing what they want to draw, and an AI generates the artwork. Designed so young visitors learn the principles of prompt engineering through play, with a 10-step (+5 advanced) choice-based prompt builder that shows how a prompt is put together.\n\nThe off-the-shelf GPT service used before suffered repeated connection conflicts on the exhibition floor. Moving to a custom web app and serverless backend eliminated 100% of those conflicts; the backend calls the OpenAI image-generation API, auto-watermarks every image with the museum logo, and dual-stores results on Cloudflare R2 and Supabase. Visitors take their creations home instantly via QR code, and shipping it as a web app locked the exhibition kiosk down from other apps.\n\nIt now runs live at the museum, generating an average of 142 images on weekdays and 557 on weekends. It is the first service at the museum whose generation volume could be quantified, through its own backend.",
    highlights: [
      "10-step (+5 advanced) choice-based prompt builder that teaches prompt composition through play, designed for all-ages museum visitors.",
      "Eliminated 100% of the connection conflicts of the prior off-the-shelf GPT service by moving to a custom web app and backend.",
      "Serverless backend on the OpenAI image-generation API, deployed on Vercel.",
      "Auto-watermarks every image with the museum logo and dual-stores on Cloudflare R2 and Supabase.",
      "QR-code takeaway for visitors' creations; shipping as a web app locked the exhibition kiosk down from other apps.",
      "142 images generated on an average weekday and 557 on weekends: the first museum service to quantify generation volume via a custom backend.",
    ],
    flow: ["10-step prompt builder", "OpenAI API", "Auto-watermark", "R2 + Supabase"],
    flowImage: {
      light: "/portfolio_images/flow/raimi-art-lab-flow-light.svg",
      dark: "/portfolio_images/flow/raimi-art-lab-flow-dark.svg",
    },
    gallery: [
      "/portfolio_images/projects/ai-studio-1.jpg",
      "/portfolio_images/projects/ai-studio-2.jpg",
      "/portfolio_images/projects/ai-studio-3.jpg",
    ],
  },
  {
    slug: "ato-care-robot",
    n: "03",
    tier: "major",
    title: "ATO Care Robot",
    category: "AI Healthcare · Care Robot",
    categories: ["AI", "Robotics"],
    kicker: "Companion & medication-care robot",
    desc: "A rabbit-shaped companion robot that makes eye contact and minds your meds. Built end to end, from circuits and firmware to a 3D-printed body and the YAKMOA multimodal medication-care service.",
    year: "2026",
    role: "Robot: solo build · YAKMOA service: 2-person team (PM & Dev)",
    tags: ["ESP32", "Arduino/C++", "GC9A01 LCD", "Servo / PIR / Touch", "3D Printing", "Multimodal AI"],
    stat: "GH Prize",
    overview:
      "ATO is a rabbit-shaped emotional companion robot for single-person households and seniors. Two round displays act as expressive 'eyes' that show emotion, and sensors detect when someone approaches or pets it, triggering reactions.\n\nAn ESP32 drives the dual GC9A01 round LCDs for eye-expression animations such as blinking and gaze shifts, integrated with PIR proximity detection, capacitive petting touch, DFPlayer audio, and servo-driven ear and arm motion. The build covers the entire process: circuit design, firmware, a 3D-printed body, and microfiber cover sewing patterns.\n\nOn top of this, ATO integrates YAKMOA, a multimodal-AI feature that recognizes medicines and manages dose schedules, extending the robot from companionship into medication care. YAKMOA was designed as a medication-management service for digitally vulnerable users and people with disabilities, and won a prize at the GH Youth Build-Up Start-up Competition. The robot itself was built solo end to end; the YAKMOA service was planned and commercialized as the 2-person team MAKENEW, where I was PM & developer. The robot is currently a Phase 1 prototype, with medication care being integrated.",
    highlights: [
      "Eye-expression animations (blinking, gaze) on dual GC9A01 round LCDs driven by an ESP32.",
      "Integrated PIR proximity detection, capacitive petting touch, DFPlayer audio, and servo ear/arm motion.",
      "Robot built 100% solo across the entire process: circuit design, firmware, a 3D-printed body, and microfiber sewing patterns.",
      "Integrated YAKMOA (multimodal-AI medicine recognition and dose management), combining companionship with medication care in one robot.",
      "YAKMOA designed as a medication-management service for digitally vulnerable users and people with disabilities; won a prize at the GH Youth Build-Up Start-up Competition (team MAKENEW).",
      "For the YAKMOA service, worked as the 2-person team MAKENEW: as PM & developer, led service planning, user research, and authored the business plan & pitch deck.",
      "Currently a Phase 1 prototype, integrating medication care.",
    ],
    flow: ["Sensors (PIR / touch)", "ESP32 / Arduino", "Servo + LCD expression", "YAKMOA multimodal AI"],
    flowImage: {
      light: "/portfolio_images/flow/ato-care-robot-flow-light.svg",
      dark: "/portfolio_images/flow/ato-care-robot-flow-dark.svg",
    },
  },
  {
    slug: "raim-staff-platform",
    n: "04",
    tier: "major",
    title: "SEOUL RAIM Staff Platform",
    category: "Internal Operations Tool",
    categories: ["Web"],
    kicker: "Docent & part-timer management",
    desc: "A staff app bringing schedules, rosters, live duty status, and notices together in one place, used daily by ~20 docents and part-time staff. A self-initiated project born from a real operational pain point, built from prototype to internal mobile distribution.",
    year: "2026",
    role: "Solo: planning & development",
    tags: ["React", "Vite", "Firebase / Firestore", "Capacitor"],
    image: "/portfolio_images/projects/raimapp_main.png",
    imageFit: "contain",
    stat: "20 staff daily",
    overview:
      "An internal platform for managing the museum's docents and part-time workers: a self-initiated project where I defined a real operational pain point (repetitive on-site work) and built the answer myself. It brings a per-date schedule grid, staff roster, live duty status, and notices together in a single app.\n\nIt started as a single-HTML prototype and was refactored into a structured Vite + React codebase backed by Firebase (Firestore) for real-time data. The full screen flow was planned and built end to end: login and role-based routing into bottom tabs (home · notices · schedule · status · my page · admin), plus a manager PC console and shared modals.\n\nPackaged with Capacitor for internal iOS / Android distribution, it is currently running as an internal test distribution, used daily by around 20 docents and part-time staff.",
    highlights: [
      "Planned and built the entire service: schedule grid, roster, duty status, and notice screens.",
      "Refactored a single-HTML prototype into a maintainable Vite + React codebase.",
      "Real-time roster and duty status backed by Firebase / Firestore.",
      "Designed the full screen flow: login/role routing → bottom tabs (home · notices · schedule · status · my page · admin) → manager PC console and shared modals.",
      "Set up internal iOS / Android distribution with Capacitor, used daily by ~20 docents and part-time staff.",
      "A self-initiated internal project, started by defining a real operational problem on-site.",
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
    n: "05",
    tier: "major",
    title: "Smart-Farm Education Program",
    category: "Education Program",
    categories: ["AI", "IoT", "Education"],
    kicker: "Museum × Yangpyeong Education Office",
    desc: "A hands-on program where students experience IoT smart farming and AI crop diagnosis. Commissioned by Yangpyeong Education Office; planned and built solo (full server and web-app environment) and taught to a 15-student high-school cohort.",
    year: "2026",
    role: "Solo: planning & development",
    tags: ["YOLO", "Weather API", "Server", "Web App", "IoT"],
    repo: "https://github.com/henna2022/smartfarm-device",
    stat: "15-student cohort",
    overview:
      "A hands-on education program commissioned by the Yangpyeong Education Office through the museum, where students experience an IoT smart farm and AI crop diagnosis first-hand. I planned the program and built everything it needed solo (the full server and web-app environment), designed so students watch data accumulate and sensor values change in real time, with their own eyes. It ran as a class for a cohort of 15 Yangpyeong high-school students, selected by application.\n\nA class runs as a guided flow: students enter the virtual lab, pick a room at the hub, and move through four STEPs (weather, AI vision, IoT, and camera), watching data load into a virtual Supabase before finishing with 'my app complete' and a live hardware demo. A location-based weather API ties the lessons to real growing conditions, and the YOLO training process (epoch experiments, loss reduction) is explored together at the students' level.\n\nThe program was delivered as a museum × education-office commission: an exhibition-linked education case planned, built, and operated end to end by one person.",
    highlights: [
      "Integrated a location-based weather API to tie lessons to real growing conditions.",
      "Explored the YOLO training process (epoch experiments, loss reduction) at the students' level.",
      "Students watch sensor values load and change in real time in a virtual server's database.",
      "Designed the class flow: open lab → room-picker hub → 4 STEPs (weather · AI vision · IoT · camera) → virtual Supabase → app complete → live demo.",
      "Commissioned by the Yangpyeong Education Office through the museum; planned and built solo, including the full server and web-app environment.",
      "Delivered as a class to a 15-student cohort of Yangpyeong high-school students, selected by application.",
    ],
    flow: ["IoT sensors", "Weather API", "Server", "Student web app"],
    flowImage: {
      light: "/portfolio_images/flow/smart-farm-education-flow-light.svg",
      dark: "/portfolio_images/flow/smart-farm-education-flow-dark.svg",
    },
  },

  // ── Side & toy projects ──
  {
    slug: "im-a-restorer",
    n: "01",
    tier: "side",
    title: "I'm a Restorer!",
    category: "Interactive Web Game",
    categories: ["Web", "Education"],
    kicker: "Exhibition-linked education content",
    desc: "An interactive web game where visitors restore Korean cultural heritage themselves. Runs on 8 exhibition tablets in a once-daily program with ~15 participants per session.",
    year: "2026",
    role: "Development",
    tags: ["JavaScript", "HTML/CSS", "GitHub Pages"],
    href: "https://henna2022.github.io/ai-restoration-exhibit/",
    repo: "https://github.com/henna2022/ai-restoration-exhibit",
    image: "/portfolio_images/restorer1.jpg",
    overview:
      "An interactive web game where visitors restore Korean cultural heritage themselves, planned and built as museum exhibition-education content, so visitors don't just look at the exhibition but experience the restoration process hands-on.\n\nImplemented lightly in JavaScript and HTML/CSS and deployed on GitHub Pages, it runs on 8 exhibition tablets as part of a once-daily exhibition-linked program with around 15 participants per session.",
    highlights: [
      "Planned and developed interactive content for exhibition education.",
      "Game format that connects the exhibition with hands-on heritage restoration.",
      "Light JavaScript + HTML/CSS implementation that runs without a server.",
      "Deployed via GitHub Pages to run directly on 8 exhibition tablets.",
      "Operating live in a once-daily exhibition-linked program with ~15 participants per session.",
    ],
    gallery: [
      "/portfolio_images/restorer1.jpg",
      "/portfolio_images/restorer2.jpg",
    ],
  },
  {
    slug: "raimi-language-lab",
    n: "02",
    tier: "side",
    title: "Raimi's AI Language Lab",
    category: "Language-learning Web App",
    categories: ["AI", "Web", "Education"],
    kicker: "Speech AI experience",
    desc: "A game-based speech experience where visitors listen and repeat words and sentences with Raimi. Runs entirely in the browser on speech synthesis, no server required.",
    year: "2026",
    role: "Planning · development",
    tags: ["Web Speech API", "PWA", "HTML/CSS", "KO / EN"],
    repo: "https://github.com/henna2022/raim-ai-studio",
    image: "/portfolio_images/projects/langlab1.jpg",
    overview:
      "A game-style learning web app where visitors listen to and repeat words and sentences with the Raimi character, experiencing language and speech AI. It is designed so visitors explore how AI learns language, through play.\n\nThe full game flow (start, menu, play, completion) was planned and built on browser speech synthesis (TTS), so the app runs without any server. It supports both Korean and English, and ships as a PWA for offline use on the 3 exhibition tablets it runs on.",
    highlights: [
      "Designed and built the full game flow: start, menu, play, completion.",
      "Listening & speaking content powered by browser speech synthesis (TTS).",
      "Runs entirely in the browser with no server required.",
      "Bilingual Korean / English support.",
      "Ships as a PWA for offline use on the 3 exhibition tablets.",
    ],
    flow: ["Web Speech API", "Browser TTS", "Offline PWA"],
    flowImage: {
      light: "/portfolio_images/flow/raimi-language-lab-flow-light.svg",
      dark: "/portfolio_images/flow/raimi-language-lab-flow-dark.svg",
    },
    gallery: ["/portfolio_images/projects/langlab1.jpg"],
  },
  {
    slug: "raim-photo-booth",
    n: "03",
    tier: "side",
    title: "RAIM AI Photo Booth",
    category: "Keepsake Photo Booth",
    categories: ["AI", "Web"],
    kicker: "Museum 2nd anniversary",
    desc: "A four-cut photo booth where visitors shoot with the museum robots and take photos home via QR. An AI algorithm recommends the best-looking shot among the takes.",
    year: "2026",
    role: "Solo: planning & development (in progress)",
    tags: ["JavaScript", "AI image selection", "QR", "Web App"],
    repo: "https://github.com/henna2022/raim-4cut-studio",
    overview:
      "Born from a simple problem: visitors had nothing to take home from the museum. With no gift shop and no ticket stub, this booth lets people take four-cut photos with the exhibition robots and grab them instantly via QR code, adding a sense of keepsake to the visit.\n\nThe four-cut frames feature the museum's robot characters, and an AI algorithm picks and recommends the best-looking shot among the takes. It is being developed for the museum's 2nd-anniversary event.",
    highlights: [
      "Defined a gap in the visit experience (no keepsake) as the problem and designed the photo booth as the answer.",
      "Built four-cut frames featuring the museum's robot characters.",
      "QR-code delivery so visitors take their photos home instantly.",
      "Applied an AI algorithm that picks and recommends the best-looking shot among the takes.",
      "In development for the museum's 2nd-anniversary event.",
    ],
    flow: ["Capture 4 cuts", "AI best-shot selection", "QR delivery"],
    flowImage: {
      light: "/portfolio_images/flow/raim-photo-booth-flow-light.svg",
      dark: "/portfolio_images/flow/raim-photo-booth-flow-dark.svg",
    },
  },
  {
    slug: "raim-metaverse",
    n: "04",
    tier: "side",
    title: "RAIM Metaverse",
    category: "Exhibition Accessibility",
    categories: ["Web"],
    kicker: "Online exhibition twin",
    desc: "An online metaverse version of the permanent exhibition for visitors who cannot book an on-site slot. Reconstructs the space and visitor flow to widen access to the exhibition.",
    year: "2026",
    role: "Solo: planning & development (in progress)",
    tags: ["Metaverse", "Web", "3D"],
    overview:
      "A project that moves the permanent exhibition into a metaverse, so visitors who cannot get an on-site booking can still explore it online.\n\nIt reconstructs the exhibition space and visitor flow in a metaverse format, aiming to let anyone experience the exhibition without a reservation. It is currently in development with the goal of widening access to the exhibition.",
    highlights: [
      "Building an online permanent exhibition for visitors turned away by full bookings.",
      "Reconstructing the exhibition space and visitor flow in a metaverse format.",
      "Aims to let anyone experience the exhibition online, without a reservation.",
      "In development as exhibition-accessibility content.",
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export type SkillGroup = {
  key: string;
  title: string;
  capability: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    key: "ai",
    title: "AI & Computer Vision",
    capability: "I train, evaluate, and ship vision models end to end.",
    items: ["Python", "YOLOv8", "VGG16 · CNN", "Roboflow", "Data QA"],
  },
  {
    key: "web",
    title: "Full-stack Web",
    capability: "I build and operate real services people use daily.",
    items: [
      "Next.js",
      "React",
      "TypeScript",
      "JavaScript",
      "Supabase",
      "Firebase",
      "Flask",
      "Tailwind",
      "Vercel",
    ],
  },
  {
    key: "hw",
    title: "Hardware · IoT · Robotics",
    capability: "I connect sensors and machines to the web.",
    items: ["ESP32", "MicroPython", "Arduino · C++", "Sensors", "3D Printing"],
  },
  {
    key: "edu",
    title: "Planning & Education",
    capability: "I turn complex tech into experiences anyone can learn.",
    items: [
      "SW Planning",
      "Learning Design",
      "Bilingual Docent (KO·EN)",
      "Notion",
      "Slack",
    ],
  },
];

export const experience = [
  {
    org: "Seoul Robot & AI Science Museum",
    role: "Education Content Planner & Developer",
    period: "2026.03 - Present",
    gallery: ["/portfolio_images/experience/docent_1.JPG"],
    points: [
      "Build and run interactive AI education web apps used live by museum visitors.",
      "Planned and built a smart-farm education program commissioned by Yangpyeong Education Office (full server and web-app setup), delivered to a 15-student high-school cohort.",
      "Shipped internal ops and exhibition tools: staff scheduler, AI photo booth, and a metaverse exhibit.",
      "Guide exhibitions bilingually (KO / EN) and support multipurpose education rooms.",
    ],
  },
  {
    org: "Select Star",
    role: "Data Contributor & QA",
    period: "2025.11 - 2026.01",
    points: [
      "Built complex 3-hop reasoning Q&A datasets for AI model training and evaluation.",
      "Sustained 2.5× the team's average throughput while holding accuracy.",
    ],
  },
  {
    org: "Ministry of Science and ICT",
    role: "Youth Intern",
    period: "2025.04 - 2025.07",
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
  desc: string;
  photos: string[];
};

export const activities: Activity[] = [
  {
    period: "2026.07 - Present",
    title: "KB LA School (Middle School)",
    role: "Middle-school mentor (online)",
    desc: "Dedicated online mentoring for middle-school students in the KB LA School program.",
    photos: [],
  },
  {
    period: "2026.03 - Present",
    title: "Gwangyang AI Smart i-Kium",
    role: "Instructor · Grade-3 math & English",
    desc: "Teaching Grade-3 math and English classes in Gwangyang City's AI Smart i-Kium program.",
    photos: [],
  },
  {
    period: "2026.02 - Present",
    title: "Geuruteogi Learning Mentoring 'Gachi-Edu'",
    role: "University mentor for youth learning (6th cohort)",
    desc: "A university mentoring program where I coach teenagers on study habits and self-directed learning, tailored to each mentee's level.",
    photos: ["/portfolio_images/activities/act_geuruteogi.jpg"],
  },
  {
    period: "2025.07",
    title: "Youth SW-Donghaeng Hackathon",
    role: "University mentor · planning & development",
    desc: "Mentored youth teams through a software hackathon as a university mentor, guiding both planning and development from idea to working demo.",
    photos: [
      "/portfolio_images/activities/2025swpj_1.jpg",
      "/portfolio_images/activities/2025swpj_2.jpg",
      "/portfolio_images/activities/2025swpj_3.jpg",
    ],
  },
  {
    period: "2025.06 - 2025.12",
    title: "CIEE SEOULMATE",
    role: "Mentor for international students",
    desc: "One-on-one mentoring in Korean language and culture for international students, plus planning cross-cultural exchange programs between Korean and international students.",
    photos: ["/portfolio_images/activities/act_ciee.jpg"],
  },
  {
    period: "2024.09 - 2024.12",
    title: "SW-Donghaeng Project",
    role: "Youth mentor for semester-long student projects",
    desc: "A semester-long mentorship where students identified real social problems around them and solved them with SW/AI, guided end-to-end from idea to final deliverable.",
    photos: [
      "/portfolio_images/activities/2024swpj_1.jpg",
      "/portfolio_images/activities/2024swpj_2.jpg",
    ],
  },
  {
    period: "2024.07 - 2025.02",
    title: "Hankyong Start-up Club (MAKENEW)",
    role: "Team leader",
    desc: "Led team MAKENEW as team leader, the start-up club team behind our award-winning plant-disease diagnosis app and the YAKMOA medication-care service.",
    photos: [
      "/portfolio_images/activities/act_makenew1.jpg",
      "/portfolio_images/activities/act_makenew2.jpg",
      "/portfolio_images/activities/act_makenew3.jpg",
    ],
  },
  {
    period: "2024.07 - 2024.08",
    title: "LS Dream Science Class, 20th",
    role: "Lead instructor for an elementary science program",
    desc: "Lead instructor for an elementary science program, designing and running hands-on experiments for kids.",
    photos: [
      "/portfolio_images/activities/act_ls1.jpg",
      "/portfolio_images/activities/act_ls2.jpg",
      "/portfolio_images/activities/act_ls3.jpg",
    ],
  },
  {
    period: "2024.03 - 2026.02",
    title: "KB LA School",
    role: "High-school mentor · math & chemistry (online)",
    desc: "Two years as a dedicated online high-school mentor (Grade-11 Math I & Chemistry in 2024, Grade-10 Math in 2025), with mentees reaching top and perfect scores.",
    photos: [],
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
  relatedSlug?: string;
  news?: string; // external press coverage
};

export const awards: Award[] = [
  {
    year: "2026",
    title: "GH Youth Build-Up Start-up Competition",
    detail: "Prize: YAKMOA medication-management service (team MAKENEW)",
    result: "Prize winner",
    role: "PM & Developer",
    topic:
      "YAKMOA, a multimodal-AI medication-management service for digitally vulnerable users, built on the ATO care robot.",
    photos: [],
    relatedSlug: "ato-care-robot",
  },
  {
    year: "2024",
    title: "ICT·SW Women's Start-up Competition",
    detail: "Excellence Award (우수상): VGG16 plant-disease diagnosis app",
    result: "Excellence Award",
    role: "PM & Developer",
    topic:
      "A plant-disease diagnosis app powered by a VGG16 image classifier, the predecessor of Doctor-Green (Korea IT Businesswomen's Association).",
    photos: [],
    relatedSlug: "doctor-green",
  },
  {
    year: "2025",
    title: "Science Museum & Community AI Hackathon",
    detail: "2nd place: AI docent for museum-community co-prosperity",
    result: "2nd place",
    role: "PM & Developer",
    topic:
      "An AI docent concept for museum-community co-prosperity, connecting exhibitions with the local community.",
    news: "https://www.ttlnews.com/news/articleView.html?idxno=3030969",
    photos: [
      "/portfolio_images/awards/award2_science_museum_1.jpg",
      "/portfolio_images/awards/award2_science_museum_2.png",
    ],
  },
  {
    year: "2024",
    title: "Chungnam Generative AI Start-up Idea Competition",
    detail: "Encouragement Award (장려상): Ministry of Science and ICT",
    result: "Encouragement Award",
    role: "PM & Developer",
    topic:
      "The 2024 VGG16 version of Doctor-Green (a plant-disease diagnosis app), pitched as a generative/AI start-up idea, hosted by the Ministry of Science and ICT.",
    photos: [
      "/portfolio_images/awards/award4_chungnam_1.jpg",
      "/portfolio_images/awards/award4_chungnam_2.jpg",
    ],
    relatedSlug: "doctor-green",
  },
  {
    year: "2024",
    title: "HKNU StarUP&GO Audition",
    detail: "Excellence Award (우수상): start-up competition",
    result: "Excellence Award",
    role: "PM & Developer",
    topic:
      "Pitched the plant-disease diagnosis app that later grew into Doctor-Green, at Hankyong National University's start-up audition.",
    photos: ["/portfolio_images/awards/hknu_photo.jpg"],
    relatedSlug: "doctor-green",
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
