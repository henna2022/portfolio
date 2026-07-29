export const person = {
  name: "Juwon Lee",
  hangul: "이주원",
  role: "AI Product Engineer",
  email: "hello@juwonlee.dev",
  github: "https://github.com/henna2022",
  githubHandle: "henna2022",
  linkedin: "https://www.linkedin.com/in/juwon-lee-677b702b3/",
  photo: "/portfolio_images/profile/juwonlee.jpg",
  // 헤더 아바타·푸터용 저용량 썸네일 (원본은 About 섹션에서만 사용)
  photoSm: "/portfolio_images/profile/juwonlee-sm.jpg",
  resume: "/files/Juwon_Lee_Resume_EN.pdf",
  cv: "/files/Juwon_Lee_CV_EN.pdf",
  // 국문 버전 — About 섹션의 기존 Resume/CV 버튼 옆에 보조 링크로만 노출
  resumeKo: "/files/Juwon_Lee_Resume_KO.pdf",
  cvKo: "/files/Juwon_Lee_CV_KO.pdf",
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
  headline: "Building end-to-end systems where AI meets the physical world.",
  sub: "I build AI that steps off the screen, onto robots, sensors, and museum floors, and teach people how it works.",
};

// ─── Statement ──────────────────────────────────────────────────────────────
// 히어로 3D 씬 바로 아래 오는 sticky 선언문. 스크롤 진행도에 따라 단어가 하나씩
// 점등되고, `pill`(반전 필)·`italic`(세리프 이탤릭)·`chip`(아토 얼굴)이 포인트.
export type StatementToken =
  | { t: "w"; w: string; pill?: boolean; italic?: boolean }
  | { t: "chip" };

export const statement: StatementToken[] = [
  { t: "w", w: "I" },
  { t: "w", w: "build", pill: true },
  { t: "w", w: "software" },
  { t: "w", w: "that" },
  { t: "w", w: "puts" },
  { t: "chip" },
  { t: "w", w: "AI" },
  { t: "w", w: "to" },
  { t: "w", w: "work", italic: true },
  { t: "w", w: "for" },
  { t: "w", w: "real" },
  { t: "w", w: "people." },
];

// ─── About ──────────────────────────────────────────────────────────────────
// 좌: 초상 카드(사진·태그라인·이력 요약·다운로드) / 우: 인용문 + 산문(더 보기).
// 산문은 문단 = 조각 배열. `b: true` 인 조각만 굵게 렌더한다.
export type ProseSegment = { text: string; b?: boolean };
export type ProseParagraph = ProseSegment[];
export const about = {
  photo: "/portfolio_images/profile/juwonlee.jpg",
  tagline:
    "AI product engineer. I build end to end, from sensor to shipped interface, so intelligence can perceive and act in the physical world.",
  // 카드 하단 요약 — 정체성과 "지금"만 짧게. 나머지 이력은 아래 facts 로 내린다.
  info: [
    {
      icon: "🎓",
      title: "Hankyong National University",
      lines: [
        "Plant Life & Environment (B.Ag.)",
        "Software Convergence (B.Eng.), double major",
      ],
    },
    {
      icon: "🏛️",
      lines: ["Seoul Robot & AI Science Museum · Education Content (current)"],
    },
    { icon: "📍", lines: ["Seoul, KR"] },
  ],
  // '더 보기' 안쪽에 붙는 부차적 이력·자격 (카드가 한 화면을 넘지 않도록 분리)
  facts: [
    {
      k: "Education",
      v: "Hankyong National University (2022 – 2027 expected)\nRutgers University · Winter Intensive English (2025)\nCheongwon Girls' High School (2019 – 2022)",
    },
    {
      k: "Languages & Certifications",
      v: "Korean (native) · English (fluent) · TOEIC Speaking AL · OPIc AL",
    },
  ],
  // 인용문 — `em` 로 감싼 조각은 액센트 하이라이트 처리
  quote: [
    { text: "“I turn ideas into " },
    { text: "software that ships", em: true },
    { text: ", and I care just as much about making it " },
    { text: "understood", em: true },
    { text: ".”" },
  ],
  // 앞 2문단은 항상 노출, 나머지는 '더 보기' 안쪽.
  // `b: true` 조각은 굵게 — 훑어봐도 핵심 문장이 먼저 눈에 들어오게 한다.
  prose: [
    [
      { text: "Hi, I'm Juwon Lee, a " },
      { text: "software developer", b: true },
      { text: " who cares most about the moment an idea becomes something people actually use. On every project so far I've owned the work " },
      { text: "from planning through deployment", b: true },
      { text: "." },
    ],
    [
      { text: "My core is " },
      { text: "web and application development", b: true },
      { text: ": Next.js and React on the front, with Supabase, Firebase and serverless functions behind them. I wire " },
      { text: "AI in as a working component rather than a demo", b: true },
      { text: ", from a YOLOv8 diagnosis pipeline to an OpenAI image backend that watermarks and stores everything it generates." },
    ],
  ] as ProseParagraph[],
  proseMore: [
    [
      { text: "That software mostly lands in places people stand in. At the Seoul Robot & AI Science Museum my Art Lab runs live on the exhibition floor, generating " },
      { text: "over 3,000 images a month", b: true },
      { text: ", the first service there whose volume could be measured through its own backend. Doctor-Green reaches down to " },
      { text: "ESP32 sensor nodes", b: true },
      { text: ", and with ATO I took it all the way to the hardware: firmware, servos, and an LCD face." },
    ],
    [
      { text: "I also spend a lot of my time " },
      { text: "teaching, and I want to keep doing it", b: true },
      { text: ". I planned and built a smart-farm program for the Yangpyeong Education Office, due to run with a 15-student cohort, I meet museum visitors in Korean and English, and I mentor students. " },
      { text: "Building something and explaining it well are the same job to me", b: true },
      { text: ": both come down to making a complex system make sense." },
    ],
    [
      { text: "I've only just crossed the starting line, but I'll keep " },
      { text: "shipping software that solves real problems", b: true },
      { text: ", and getting a little better at it every day." },
    ],
  ] as ProseParagraph[],
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
    slug: "smart-farm-education",
    n: "01",
    tier: "major",
    title: "Smart-Farm Education Program",
    category: "Education Program",
    categories: ["AI", "IoT", "Education"],
    kicker: "Museum × Yangpyeong Education Office",
    desc: "A hands-on program where students experience IoT smart farming and AI crop diagnosis. Commissioned by Yangpyeong Education Office; planned and built solo (full server and web-app environment), with the AI model being refined ahead of classes for a 15-student high-school cohort.",
    year: "2026",
    role: "Solo: planning & development",
    tags: ["YOLO", "Weather API", "Server", "Web App", "IoT"],
    repo: "https://github.com/henna2022/smartfarm-device",
    stat: "15-student cohort (planned)",
    overview:
      "A hands-on education program commissioned by the Yangpyeong Education Office through the museum, where students experience an IoT smart farm and AI crop diagnosis first-hand. I planned the program and built everything it needed solo (**the full server and web-app environment**), designed so students watch data accumulate and **sensor values change in real time**, with their own eyes. The AI model is currently being refined; the program is planned to run as a class for a **cohort of 15 Yangpyeong high-school students**, selected by application.\n\nA class runs as a guided flow: students enter the virtual lab, pick a room at the hub, and move through four STEPs (weather, AI vision, IoT, and camera), watching data load into a virtual Supabase before finishing with 'my app complete' and a live hardware demo. A location-based weather API ties the lessons to real growing conditions, and the YOLO training process (epoch experiments, loss reduction) is explored together at the students' level.\n\nThe program is a museum × education-office commission: an exhibition-linked education case **planned and built end to end by one person**.",
    highlights: [
      "Integrated a **location-based weather API** to tie lessons to real growing conditions.",
      "Explored the **YOLO training process** (epoch experiments, loss reduction) at the students' level.",
      "Students watch sensor values **load and change in real time** in a virtual server's database.",
      "Designed the class flow: open lab → room-picker hub → 4 STEPs (weather · AI vision · IoT · camera) → virtual Supabase → app complete → live demo.",
      "Commissioned by the Yangpyeong Education Office through the museum; **planned and built solo**, including the full server and web-app environment.",
      "Planned to run as a class for a **15-student cohort** of Yangpyeong high-school students, selected by application.",
    ],
    flow: ["IoT sensors", "Weather API", "Server", "Student web app"],
    flowImage: {
      light: "/portfolio_images/flow/smart-farm-education-flow-light.svg",
      dark: "/portfolio_images/flow/smart-farm-education-flow-dark.svg",
    },
    image: "/portfolio_images/projects/smartfarm-edu-weather.jpg",
    gallery: [
      "/portfolio_images/projects/smartfarm-edu-hub.jpg",
      "/portfolio_images/projects/smartfarm-edu-weather.jpg",
      "/portfolio_images/projects/smartfarm-edu-yolo.jpg",
      "/portfolio_images/projects/smartfarm-edu-sensor.jpg",
      "/portfolio_images/projects/smartfarm-edu-camera.jpg",
      "/portfolio_images/projects/smartfarm-edu-app.jpg",
    ],
  },
  {
    slug: "doctor-green",
    n: "02",
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
    stat: "End-to-end solo",
    overview:
      "Doctor-Green is a smart-farm platform that unifies an AI module diagnosing crop disease from camera video with IoT devices that measure and control the growing environment, all operated on a **single web platform**, so diagnosis and environment control live on one screen. I **planned and built the whole pipeline solo, from sensor to dashboard**.\n\nIt grew out of the VGG16 plant-disease-diagnosis app that won the **Excellence Award at the 2024 ICT·SW Women's Start-up Competition**, and was rebuilt in 2026 as a full smart-farm platform on YOLOv8.\n\nESP32 sensor nodes collect environment data, relay it through a Mac-based Flask server into Supabase, and a Next.js web app visualizes it live. From the same app, actuators such as LEDs and fans are controlled in real time through Supabase Realtime subscriptions. For diagnosis, YOLOv8 runs on USB-camera video to detect and diagnose **7 crop-disease classes**.\n\nTraining uses the Roboflow strawberry-disease-detection-dataset v4 with an augmentation strategy for class imbalance; the first run (50 epochs) reached **mAP50 ≈ 0.95**, and a second YOLOv8l run (150 epochs) is in progress to push accuracy further. The web app is deployed on Vercel as a live demo.",
    highlights: [
      "**Data flow built end to end**: IoT sensing → Mac relay server (Flask) → Supabase → real-time Next.js visualization.",
      "YOLOv8 on USB-camera video detects and diagnoses **7 crop-disease classes**.",
      "**Real-time actuator control** (LED, fan) from the web app via Supabase Realtime subscriptions.",
      "First training (50 epochs) reached **mAP50 ≈ 0.95**; second YOLOv8l training (150 epochs) in progress.",
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
    slug: "raim-staff-platform",
    n: "03",
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
    stat: "20 staff daily",
    overview:
      "An internal platform for managing the museum's docents and part-time workers: a **self-initiated project** where I defined a real operational pain point (repetitive on-site work) and built the answer myself. It brings a per-date schedule grid, staff roster, live duty status, and notices together in a single app.\n\nIt started as a single-HTML prototype and was **refactored into a structured Vite + React codebase** backed by Firebase (Firestore) for real-time data. The full screen flow was planned and built end to end: login and role-based routing into bottom tabs (home · notices · schedule · status · my page · admin), plus a manager PC console and shared modals.\n\nPackaged with Capacitor for internal iOS / Android distribution, it is currently running as an internal test distribution, **used daily by around 20 docents and part-time staff**.",
    highlights: [
      "**Planned and built the entire service**: schedule grid, roster, duty status, and notice screens.",
      "Refactored a single-HTML prototype into a **maintainable Vite + React codebase**.",
      "**Real-time** roster and duty status backed by Firebase / Firestore.",
      "Designed the full screen flow: login/role routing → bottom tabs (home · notices · schedule · status · my page · admin) → manager PC console and shared modals.",
      "Set up internal iOS / Android distribution with Capacitor, **used daily by ~20 docents and part-time staff**.",
      "A **self-initiated** internal project, started by defining a real operational problem on-site.",
    ],
    flow: ["React + Vite", "Firebase / Firestore", "Capacitor", "iOS / Android internal"],
    flowImage: {
      light: "/portfolio_images/flow/raim-staff-platform-flow-light.svg",
      dark: "/portfolio_images/flow/raim-staff-platform-flow-dark.svg",
    },
    gallery: ["/portfolio_images/projects/raimapp_main.png"],
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
      "An interactive web game where visitors restore Korean cultural heritage themselves, planned and built as museum exhibition-education content, so visitors don't just look at the exhibition but experience the restoration process hands-on.\n\nImplemented lightly in JavaScript and HTML/CSS and deployed on GitHub Pages, it runs on **8 exhibition tablets** as part of a once-daily exhibition-linked program with **around 15 participants per session**.",
    highlights: [
      "Planned and developed interactive content for exhibition education.",
      "Game format that connects the exhibition with hands-on heritage restoration.",
      "Light JavaScript + HTML/CSS implementation that **runs without a server**.",
      "Deployed via GitHub Pages to run directly on **8 exhibition tablets**.",
      "**Operating live** in a once-daily exhibition-linked program with **~15 participants per session**.",
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
    image: "/portfolio_images/projects/langlab-home.jpg",
    overview:
      "A game-style learning web app where visitors listen to and repeat words and sentences with the Raimi character, experiencing language and speech AI. It is designed so visitors explore how AI learns language, through play.\n\nThe full game flow (start, menu, play, completion) was planned and built on browser speech synthesis (TTS), so the app **runs without any server**. It supports **both Korean and English**, and ships as a **PWA for offline use** on the 3 exhibition tablets it runs on.",
    highlights: [
      "Designed and built the full game flow: start, menu, play, completion.",
      "Listening & speaking content powered by browser speech synthesis (TTS).",
      "**Runs entirely in the browser** with no server required.",
      "**Bilingual Korean / English** support.",
      "Ships as a **PWA for offline use** on the **3 exhibition tablets**.",
    ],
    flow: ["Web Speech API", "Browser TTS", "Offline PWA"],
    flowImage: {
      light: "/portfolio_images/flow/raimi-language-lab-flow-light.svg",
      dark: "/portfolio_images/flow/raimi-language-lab-flow-dark.svg",
    },
    gallery: [
      "/portfolio_images/projects/langlab-home.jpg",
      "/portfolio_images/projects/langlab-intro.jpg",
      "/portfolio_images/projects/langlab-token.jpg",
    ],
  },
  // 포트폴리오에서 임시 제외 (RAIM AI Photo Booth) — 되살릴 때 주석을 풀고
  // 아래 side 프로젝트 번호를 04, 05, 06 으로 한 칸씩 밀어 되돌린다.
  // {
  //   slug: "raim-photo-booth",
  //   n: "03",
  //   tier: "side",
  //   title: "RAIM AI Photo Booth",
  //   category: "Keepsake Photo Booth",
  //   categories: ["AI", "Web"],
  //   kicker: "Museum 2nd anniversary",
  //   desc: "A four-cut photo booth where visitors shoot with the museum robots and take photos home via QR. An AI algorithm recommends the best-looking shot among the takes.",
  //   year: "2026",
  //   role: "Solo: planning & development (in progress)",
  //   tags: ["JavaScript", "AI image selection", "QR", "Web App"],
  //   repo: "https://github.com/henna2022/raim-4cut-studio",
  //   overview:
  //     "Born from a simple problem: visitors had nothing to take home from the museum. With no gift shop and no ticket stub, this booth lets people take **four-cut photos with the exhibition robots** and grab them **instantly via QR code**, adding a sense of keepsake to the visit.\n\nThe four-cut frames feature the museum's robot characters, and an **AI algorithm picks and recommends the best-looking shot** among the takes. It is being developed for the **museum's 2nd-anniversary event**.",
  //   highlights: [
  //     "**Defined a gap in the visit experience** (no keepsake) as the problem and designed the photo booth as the answer.",
  //     "Built four-cut frames featuring the museum's robot characters.",
  //     "**QR-code delivery** so visitors take their photos home instantly.",
  //     "Applied an **AI algorithm that picks and recommends the best-looking shot** among the takes.",
  //     "In development for the museum's 2nd-anniversary event.",
  //   ],
  //   flow: ["Capture 4 cuts", "AI best-shot selection", "QR delivery"],
  //   flowImage: {
  //     light: "/portfolio_images/flow/raim-photo-booth-flow-light.svg",
  //     dark: "/portfolio_images/flow/raim-photo-booth-flow-dark.svg",
  //   },
  // },
  // 포트폴리오에서 임시 제외 (RAIM Metaverse) — 되살릴 때 주석을 풀고
  // 아래 side 프로젝트 번호를 04, 05, 06 으로 한 칸씩 밀어 되돌린다.
  // {
  //   slug: "raim-metaverse",
  //   n: "03",
  //   tier: "side",
  //   title: "RAIM Metaverse",
  //   category: "Exhibition Accessibility",
  //   categories: ["Web"],
  //   kicker: "Online exhibition twin",
  //   desc: "An online metaverse version of the permanent exhibition for visitors who cannot book an on-site slot. Reconstructs the space and visitor flow to widen access to the exhibition.",
  //   year: "2026",
  //   role: "Solo: planning & development (in progress)",
  //   tags: ["Metaverse", "Web", "3D"],
  //   overview:
  //     "A project that moves the permanent exhibition into a metaverse, so visitors who cannot get an on-site booking can still explore it online.\n\nIt reconstructs the exhibition space and visitor flow in a metaverse format, aiming to let anyone experience the exhibition without a reservation. It is currently in development with the goal of widening access to the exhibition.",
  //   highlights: [
  //     "Building an online permanent exhibition for visitors turned away by full bookings.",
  //     "Reconstructing the exhibition space and visitor flow in a metaverse format.",
  //     "Aims to let anyone experience the exhibition online, without a reservation.",
  //     "In development as exhibition-accessibility content.",
  //   ],
  // },
  {
    slug: "raimi-art-lab",
    n: "03",
    tier: "side",
    title: "Raimi's AI Art Lab",
    category: "Web App · Education",
    categories: ["AI", "Web", "Education"],
    kicker: "Live @ Seoul Robot & AI Science Museum",
    desc: "A guided prompt builder where visitors co-create AI artwork with the museum character Raimi. Running live at the museum, it generates over 3,000 images a month.",
    year: "2026",
    role: "Planning · development · operations",
    tags: ["JavaScript", "OpenAI API", "Vercel Serverless", "Supabase", "Cloudflare R2", "PWA"],
    repo: "https://github.com/henna2022/raim-ai-artstudio",
    image: "/portfolio_images/projects/artlab-mode.jpg",
    stat: "3,000+/month",
    overview:
      "Visitors compose a prompt step by step with the museum character Raimi, choosing what they want to draw, and an AI generates the artwork. Designed so young visitors learn the principles of prompt engineering through play, with a **10-step (+5 advanced) choice-based prompt builder** that shows how a prompt is put together.\n\nThe off-the-shelf GPT service used before suffered repeated connection conflicts on the exhibition floor. Moving to a custom web app and serverless backend **eliminated 100% of those conflicts**; the backend calls the OpenAI image-generation API, auto-watermarks every image with the museum logo, and dual-stores results on Cloudflare R2 and Supabase. Visitors take their creations home instantly via QR code, and shipping it as a web app locked the exhibition kiosk down from other apps.\n\nIt now runs live at the museum, generating **over 3,000 images a month** (3,049 in June 2026). It is the **first service at the museum whose generation volume could be quantified**, through its own backend.",
    highlights: [
      "**10-step (+5 advanced) choice-based prompt builder** that teaches prompt composition through play, designed for all-ages museum visitors.",
      "**Eliminated 100% of the connection conflicts** of the prior off-the-shelf GPT service by moving to a custom web app and backend.",
      "Serverless backend on the OpenAI image-generation API, deployed on Vercel.",
      "**Auto-watermarks** every image with the museum logo and **dual-stores on Cloudflare R2 and Supabase**.",
      "QR-code takeaway for visitors' creations; shipping as a web app locked the exhibition kiosk down from other apps.",
      "**Over 3,000 images generated a month**: the **first museum service to quantify generation volume** via a custom backend.",
    ],
    flow: ["10-step prompt builder", "OpenAI API", "Auto-watermark", "R2 + Supabase"],
    flowImage: {
      light: "/portfolio_images/flow/raimi-art-lab-flow-light.svg",
      dark: "/portfolio_images/flow/raimi-art-lab-flow-dark.svg",
    },
    gallery: [
      "/portfolio_images/projects/artlab-home.jpg",
      "/portfolio_images/projects/artlab-mode.jpg",
      "/portfolio_images/projects/artlab-builder.jpg",
      // 전시장 실사용 컷 — 프롬프트 고르는 중, 그리고 완성 후 QR 저장
      "/portfolio_images/projects/artlab-onsite-prompt.jpg",
      "/portfolio_images/projects/artlab-onsite-result.jpg",
    ],
  },
  {
    slug: "ato-care-robot",
    n: "04",
    tier: "side",
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
      "ATO is a rabbit-shaped emotional companion robot for single-person households and seniors. Two round displays act as expressive 'eyes' that show emotion, and sensors detect when someone approaches or pets it, triggering reactions.\n\nAn ESP32 drives the dual GC9A01 round LCDs for eye-expression animations such as blinking and gaze shifts, integrated with PIR proximity detection, capacitive petting touch, DFPlayer audio, and servo-driven ear and arm motion. The build covers the **entire process: circuit design, firmware, a 3D-printed body, and microfiber cover sewing patterns**.\n\nOn top of this, ATO integrates YAKMOA, a multimodal-AI feature that recognizes medicines and manages dose schedules, extending the robot from companionship into medication care. YAKMOA was designed as a medication-management service for digitally vulnerable users and people with disabilities, and **won a prize at the GH Youth Build-Up Start-up Competition**. The robot itself was **built solo end to end**; the YAKMOA service was planned and commercialized as the 2-person team MAKENEW, where I was PM & developer. The robot is currently a **Phase 1 prototype**, with medication care being integrated.",
    highlights: [
      "Eye-expression animations (blinking, gaze) on dual GC9A01 round LCDs driven by an ESP32.",
      "Integrated PIR proximity detection, capacitive petting touch, DFPlayer audio, and servo ear/arm motion.",
      "Robot built **100% solo** across the entire process: circuit design, firmware, a 3D-printed body, and microfiber sewing patterns.",
      "Integrated **YAKMOA** (multimodal-AI medicine recognition and dose management), **combining companionship with medication care in one robot**.",
      "YAKMOA designed as a medication-management service for digitally vulnerable users and people with disabilities; **won a prize at the GH Youth Build-Up Start-up Competition** (team MAKENEW).",
      "For the YAKMOA service, worked as the 2-person team MAKENEW: as **PM & developer**, led service planning, user research, and authored the business plan & pitch deck.",
      "Currently a **Phase 1 prototype**, integrating medication care.",
    ],
    flow: ["Sensors (PIR / touch)", "ESP32 / Arduino", "Servo + LCD expression", "YAKMOA multimodal AI"],
    flowImage: {
      light: "/portfolio_images/flow/ato-care-robot-flow-light.svg",
      dark: "/portfolio_images/flow/ato-care-robot-flow-dark.svg",
    },
  },
  {
    slug: "exhibit-auto-recovery",
    n: "05",
    tier: "side",
    title: "Exhibit Auto-Recovery",
    category: "Ops Automation · Reliability",
    categories: ["Ops", "Web"],
    kicker: "Exhibit uptime · self-initiated",
    desc: "A recovery system for a museum AI exhibit that used to need one specific person, at one specific machine, every time it froze. It now restarts itself within seconds of a detectable failure, and any staff member can recover it from their own phone in a single tap.",
    year: "2026",
    role: "Solo: diagnosis, build, rollout, handover",
    tags: [
      "PowerShell",
      "Windows Task Scheduler",
      "HTTP service",
      "Tailscale",
      "WireGuard",
    ],
    repo: "https://github.com/henna2022/maskbot-restart",
    stat: "1 operator → all staff",
    overview:
      "MaskBot is a face- and voice-interaction robot exhibit on the museum floor. Its control software would intermittently freeze or exit mid-operation, and the only remedy was a manual restart, which in practice **only one person could perform, at one specific machine**, through a remote session. Every failure became a wait: find the person, get them to the machine, walk through the remote login. Meanwhile visitors stood in front of an exhibit that could not hear them.\n\nI took this on after performing that manual restart one too many times. The key observation was that the fix itself was trivial, closing a window and reopening it, and that the entire cost lived in who was permitted to perform it and how long it took them to get there. So the goal was never to make the restart smarter. It was to **remove the human bottleneck around it**.\n\nThe result runs in three layers on the exhibit machine. A watchdog **polls the program every 20 seconds** and restarts it when the process has died or its window stops responding, with a two-stage confirmation so a momentarily busy UI is not killed by mistake, and a back-off after repeated failures so a deeper hardware fault does not become a restart loop. Scheduled restarts run twice daily as preventive maintenance. And a small HTTP service serves a **single-button page**, so **any staff member can trigger recovery from their own phone**.\n\nThat third layer exists because of a limit I could not engineer away. The most common failure leaves the process alive and the window responsive while speech recognition silently stops working, and no health signal available to me distinguishes that from a healthy exhibit. Rather than paper over it, I designed around it: the automated layers handle every failure a machine can detect, and the human layer covers the one it cannot.\n\nReaching the exhibit machine from a personal phone was a separate problem, as staff devices had no route to it. I used Tailscale, a WireGuard-based mesh VPN, so enrolled devices reach the service over an encrypted peer-to-peer tunnel with no inbound port exposed; access stays limited to devices inside that private network.\n\nThe system now **runs unattended in daily operation**. I also wrote a handover document covering configuration, logs, routine maintenance, a diagnosis playbook, and the system's documented limitations, so the maintenance technician can own it without me.",
    highlights: [
      "**Reframed the problem**: the restart was trivial; the real cost was that **only one person, at one machine**, was able to perform it.",
      "Watchdog **restarts the exhibit within seconds** of a crash or hang, with two-stage confirmation against false positives and back-off to prevent restart loops on deeper faults.",
      "**One-tap recovery page** served from the exhibit machine, turning an escalation into something **any staff member can do from their own phone**.",
      "**Designed around an undetectable failure mode**: when speech recognition dies silently, automation cannot tell, so scheduled restarts and the manual button cover what the watchdog structurally cannot.",
      "**Encrypted mesh VPN** (Tailscale / WireGuard) gives enrolled devices access **without exposing any inbound port**.",
      "Shipped with a **maintenance handover document**: configuration, logs, diagnosis playbook, and known limitations.",
    ],
    flow: ["Watchdog + schedule", "Restart service", "Mesh VPN", "Staff phone"],
    flowImage: {
      light: "/portfolio_images/flow/exhibit-auto-recovery-flow-light.svg",
      dark: "/portfolio_images/flow/exhibit-auto-recovery-flow-dark.svg",
    },
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

// 여기 적는 항목은 전부 위 프로젝트에서 실제로 쓴 것만 둔다.
// 다 적으면 41개가 되어 훑기가 어려워지므로, 그 기술이 없으면 프로젝트를
// 설명할 수 없는 것만 남긴다 (누구나 쓰는 협업 도구, 한 번만 쓴 브라우저
// API 등은 뺀다). 6개 그룹 = 2열 그리드 3행.
export const skillGroups: SkillGroup[] = [
  {
    key: "ai",
    title: "AI & Computer Vision",
    capability: "I train, evaluate, and ship vision models end to end.",
    items: [
      "Python",
      "YOLOv8",
      "VGG16 · CNN",
      "OpenAI API",
      "Multimodal AI",
    ],
  },
  {
    // 모델을 만드는 일과 데이터를 만드는 일은 성격이 달라 따로 둔다.
    // 근거: Select Star 의 ETRI VQA 데이터셋 구축·검수, Doctor-Green 의
    // 클래스 불균형 보정용 증강 전략 (Roboflow 도 여기로 옮겼다).
    key: "data",
    title: "Data & Datasets",
    capability: "I build and check the datasets models learn from.",
    items: [
      "VQA Datasets",
      "Dataset QA",
      "Annotation Guidelines",
      "Roboflow",
    ],
  },
  {
    key: "front",
    title: "Frontend & App",
    capability: "I build the interfaces people actually touch, web and mobile.",
    items: [
      "Next.js",
      "React",
      "TypeScript",
      "JavaScript",
      "Tailwind",
      "PWA",
      "Capacitor",
    ],
  },
  {
    // Ops 를 따로 두기엔 항목이 4개뿐이라 인프라 쪽으로 합쳤다.
    // Auto-Recovery 의 원격 접근(Tailscale)은 남기고 나머지는 뺀다.
    key: "back",
    title: "Backend, Infra & Ops",
    capability: "I run the data, storage, and deploys behind them.",
    items: [
      "Supabase",
      "Firebase / Firestore",
      "Flask",
      "Serverless Functions",
      "Cloudflare R2",
      "Vercel",
      "Tailscale · WireGuard",
    ],
  },
  {
    key: "hw",
    title: "Hardware · IoT · Robotics",
    capability: "I connect sensors and machines to the web.",
    items: [
      "ESP32",
      "MicroPython",
      "Arduino · C++",
      "Sensors",
      "3D Printing",
    ],
  },
  {
    key: "edu",
    title: "Planning & Education",
    capability: "I turn complex tech into experiences anyone can learn.",
    items: [
      "SW Planning",
      "Learning Design",
      "Bilingual Docent (KO·EN)",
    ],
  },
];

export const experience = [
  {
    org: "Seoul Robot & AI Science Museum",
    site: "https://science.seoul.go.kr/RAIM/index.do",
    role: "Education R&D · Developer",
    period: "2026.03 - Present · Full-time",
    gallery: [
      "/portfolio_images/experience/docent_1.JPG",
      "/portfolio_images/experience/docent_2.jpg",
      "/portfolio_images/experience/docent_3.jpg",
    ],
    points: [
      "Research, build, and run the interactive AI education web apps visitors use live on the exhibition floor; the Art Lab alone generates over 3,000 images a month.",
      "Design education programs end to end: a smart-farm curriculum commissioned by Yangpyeong Education Office, built with its full server and web-app stack, with classes upcoming for a 15-student high-school cohort.",
      // 메타버스 전시는 어느 정도 완성되면 다시 추가한다 (data.ts 의 raim-metaverse 주석 블록과 함께)
      // 포토부스가 재개되면 "a staff scheduler and an AI photo booth."로 되돌린다 (data.ts 의 raim-photo-booth 주석 블록과 함께)
      "Ship the internal ops tooling behind them, such as the staff scheduler.",
      "Guide exhibitions bilingually (KO / EN) and support the multipurpose education rooms.",
    ],
  },
  {
    org: "Select Star",
    site: "https://selectstar.ai/",
    role: "Data Contributor & QA",
    period: "2025.11 - 2026.01 · Project contract",
    points: [
      "Built and reviewed visual question-answering (VQA) datasets for LLM training on an ETRI (Electronics and Telecommunications Research Institute) project, including complex 3-hop reasoning Q&A sets.",
      "Checked each question–response pair against the project's correction guidelines for grammatical and semantic accuracy, and rewrote the assistant answers that did not follow logically from the user's question.",
      "Sustained 2.5× the team's average throughput while holding accuracy.",
    ],
  },
  {
    org: "Ministry of Science and ICT",
    site: "https://www.msit.go.kr/index.do",
    role: "Youth Intern",
    period: "2025.04 - 2025.08",
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
    role: "Middle-school mentor (online) · 2x/week, 80 min",
    desc: "Dedicated online mentoring for middle-school students in the KB LA School program.",
    photos: [],
  },
  {
    period: "2026.03 - Present",
    title: "Gwangyang AI Smart i-Kium",
    role: "Instructor · Grade-3 math & English · 1x/week",
    desc: "Teaching Grade-3 math and English classes in Gwangyang City's AI Smart i-Kium program.",
    photos: [],
  },
  {
    period: "2026.02 - Present",
    title: "Geuruteogi Learning Mentoring 'Gachi-Edu'",
    role: "University mentor for youth learning (6th cohort) · 2x/week, 90 min",
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

// 최신순으로 적어 둔다. 화면 정렬은 Awards 컴포넌트가 따로 한다
// (2열 그리드라 사진 있는 카드끼리 같은 행에 와야 높이가 맞는다).
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
];

export const marqueeWords = [
  "AI EDUCATION",
  "ROBOTICS",
  "FULL-STACK",
  "COMPUTER VISION",
  "IoT",
  "INTERACTIVE LEARNING",
];
