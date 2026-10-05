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
  { id: "work", label: "Projects" },
  { id: "skills", label: "Stack" },
  { id: "experience", label: "Work Experience" },
  { id: "activities", label: "Activities" },
  { id: "awards", label: "Awards" },
  { id: "contact", label: "Contact" },
];

export const hero = {
  badge: "AI · Robotics · Web",
  headline: "Building AI products that run where people are.",
  sub: "I plan, ship, and run them end to end, on museum floors, in classrooms, and on real hardware, and measure how they're used.",
};

// ─── Statement ──────────────────────────────────────────────────────────────
// 히어로 3D 씬 바로 아래 오는 sticky 선언문. 스크롤 진행도에 따라 단어가 하나씩
// 점등되고, `pill`(반전 필) 한 단어만 앵커로 남긴다.
export type StatementToken = { t: "w"; w: string; pill?: boolean };

export const statement: StatementToken[] = [
  { t: "w", w: "I" },
  { t: "w", w: "build", pill: true },
  { t: "w", w: "software" },
  { t: "w", w: "that" },
  { t: "w", w: "puts" },
  { t: "w", w: "AI" },
  { t: "w", w: "to" },
  { t: "w", w: "work" },
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
    "AI product engineer. I build AI into working products end to end, from sensor to shipped interface, and keep them running where real users are: exhibition floors, classrooms, and hardware in the field.",
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
      lines: ["Seoul Robot & AI Science Museum · Education R&D · Developer (current)"],
    },
    { icon: "📍", lines: ["Seoul, KR"] },
  ],
  // '더 보기' 안쪽에 붙는 부차적 이력·자격 (카드가 한 화면을 넘지 않도록 분리)
  facts: [
    {
      k: "Education",
      v: "Hankyong National University (2022–2027 expected)\nRutgers University · Winter Intensive English (2025)\nCheongwon Girls' High School (2019–2022)",
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
      { text: "product engineer who builds AI into working products, from the data pipeline to the deployed interface", b: true },
      { text: ". I care most about the moment an idea becomes something people actually use, and understand. On most of my projects I've owned the work " },
      { text: "from planning through deployment", b: true },
      { text: "." },
    ],
    [
      { text: "My core is " },
      { text: "web and application development", b: true },
      { text: ": Next.js and React on the front, with Supabase, Firebase and serverless functions behind them. I wire " },
      { text: "AI in as a working component rather than a demo", b: true },
      { text: ", from an in-browser MobileNet v2 transfer-learning module students train themselves to an OpenAI image backend that watermarks and stores everything it generates." },
    ],
  ] as ProseParagraph[],
  proseMore: [
    [
      { text: "That software mostly lands in places people stand in. At the Seoul Robot & AI Science Museum my Art Lab ran on the exhibition floor from June to August 2026, and its own backend counted " },
      { text: "14,328 generated images, 9,865 of them in July", b: true },
      { text: ". Doctor-Green reaches down to " },
      { text: "ESP32 sensor nodes", b: true },
      { text: "." },
    ],
    [
      { text: "The other half of the job is " },
      { text: "making it understood", b: true },
      { text: ". The Yangpyeong Education Office commissioned my smart-farm program, curriculum, server, and web app, which I taught as a demo class to 5 high-school students in August 2026 and which runs with a 15-student cohort in October 2026; at the museum I guide visitors in Korean and English, and I mentor students week to week. " },
      { text: "Building something and explaining it well are the same job to me", b: true },
      { text: ": both come down to making a complex system make sense." },
    ],
    [
      { text: "That intersection is my lane. I'll keep " },
      { text: "shipping AI products that run in production, and measuring whether they work", b: true },
      { text: "." },
    ],
  ] as ProseParagraph[],
};

export type Project = {
  slug: string;
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
  // 현재 어떤 컴포넌트에서도 렌더링되지 않음 — 노출을 되살릴 때 단위 포함 표기 유지
  stat?: string;
  overview: string;
  highlights: string[];
  flow?: string[];
  flowImage?: { light: string; dark: string };
  gallery?: string[];
  // 갤러리 이미지 경로 → 대체 텍스트. 자동 생성 alt 로는 설명이 안 되는 것만 적는다.
  galleryAlts?: Record<string, string>;
};

export const projects: Project[] = [
  // ── Major projects ──
  {
    slug: "smart-farm-education",
    tier: "major",
    title: "Smart-Farm Education Program",
    category: "Education Program",
    categories: ["AI", "IoT", "Education"],
    kicker: "Museum × Yangpyeong Education Office",
    desc: "A hands-on program where students experience IoT smart farming and AI crop diagnosis. Commissioned by Yangpyeong Education Office; planned and built solo (full server and web-app environment), now finished and taught as a demo class to 5 high-school students in August 2026, ahead of the 15-student cohort in October 2026.",
    year: "2026",
    role: "Solo: planning & development",
    tags: ["TensorFlow.js", "MobileNet v2", "Next.js", "Supabase", "ESP32", "Arduino / C++", "Weather API"],
    href: "https://doctor-green-edu.vercel.app/",
    stat: "15-student cohort · Oct 2026",
    overview:
      "A hands-on education program commissioned by the Yangpyeong Education Office through the museum, where students experience an IoT smart farm and AI crop diagnosis first-hand. I planned the program and built everything it needed solo, **a Next.js web app with server API routes on Vercel, and Arduino (C++) firmware for the 16 ESP32 student boards, which write sensor readings straight to Supabase**. I designed it so students watch data accumulate and **sensor values change in real time**, with their own eyes. The first prototype ran on a Python/Flask relay and MicroPython firmware. The program is **finished and was taught as a demo class to 5 high-school students in August 2026**, and is scheduled to run in **October 2026** as a class for a **cohort of 15 Yangpyeong high-school students**, selected by application.\n\nA class runs as a guided flow: students enter the virtual lab, pick a room at the hub, and move through four STEPs (weather, AI vision, IoT, and camera), watching data load into the lab's Supabase database. Once all four are connected, a capstone opens where students code if-then automation rules, test them in a simulator and run them on the real board, followed by a closing quiz. A location-based weather API ties the lessons to real growing conditions, and students **train a model themselves inside the browser**, transfer learning with TensorFlow.js on a self-hosted MobileNet v2 feature extractor, so the epoch and loss numbers they watch are the real values from their own run.\n\nThe program is a museum × education-office commission: an exhibition-linked education case **planned and built end to end by one person**.",
    highlights: [
      "Integrated a **location-based weather API** to tie lessons to real growing conditions.",
      "Students run **real transfer learning in the browser**, TensorFlow.js on a self-hosted MobileNet v2, and read epoch and loss straight off their own training run.",
      "Students watch sensor values **load and change in real time** in the lab server's database.",
      "Designed the class flow: room-picker hub → 4 STEPs (weather · AI vision · IoT · camera) → capstone (automation rules, simulator, real board) → closing quiz.",
      "Commissioned by the Yangpyeong Education Office through the museum; **planned and built solo**, including the full server and web-app environment.",
      "**Built, and taught as a demo class to 5 high-school students in August 2026** on the museum's education floor; the full class is **scheduled for October 2026** with a 15-student cohort of Yangpyeong high-school students, selected by application.",
    ],
    flow: ["ESP32 boards", "Supabase", "Weather API", "Student web app"],
    flowImage: {
      light: "/portfolio_images/flow-reborn/smart-farm-education-flow-light.svg",
      dark: "/portfolio_images/flow-reborn/smart-farm-education-flow-dark.svg",
    },
    image: "/portfolio_images/projects/smartfarm-edu-weather-en.jpg",
    gallery: [
      // 데모 수업 현장 — 학생 얼굴은 게시 전 마스킹했다
      "/portfolio_images/projects/smartfarm-edu-class.jpg",
      "/portfolio_images/projects/smartfarm-edu-hub-en.jpg",
      "/portfolio_images/projects/smartfarm-edu-weather-en.jpg",
      "/portfolio_images/projects/smartfarm-edu-vision-en.jpg",
      "/portfolio_images/projects/smartfarm-edu-sensor-en.jpg",
      "/portfolio_images/projects/smartfarm-edu-camera-en.jpg",
      "/portfolio_images/projects/smartfarm-edu-app-en.jpg",
    ],
    galleryAlts: {
      "/portfolio_images/projects/smartfarm-edu-class.jpg":
        "Demo class in August 2026 on the museum's education floor: students watch their own in-browser model training reach 87.5% accuracy, each with a mini smart-farm sensor rig beside them.",
    },
  },
  {
    slug: "doctor-green",
    tier: "major",
    title: "Doctor-Green",
    category: "AI · IoT Full-stack",
    categories: ["AI", "IoT", "Web"],
    kicker: "Smart-farm platform · solo project",
    desc: "A smart-farm platform pairing live IoT environment monitoring and control with a crop-disease diagnosis model I'm rebuilding from the data up. Built solo end to end, from ESP32 sensor nodes to the deployed Next.js dashboard.",
    year: "2024 - 2026",
    role: "2024 prototype: team MAKENEW (PM & dev) · 2026 rebuild: solo, planning to deployment",
    tags: ["Next.js 16", "TypeScript", "Supabase", "ESP32", "Python", "Vercel"],
    href: "https://doctor-green-nine.vercel.app/",
    repo: "https://github.com/henna2022/doctor-green",
    image: "/portfolio_images/projects/doctorgreen_app.png",
    stat: "End-to-end solo",
    overview:
      "Doctor-Green is a smart-farm platform that brings crop-disease diagnosis and IoT environment control onto a **single web platform**, so both live on one screen. I **planned and built the whole pipeline solo, from sensor to dashboard**.\n\nIt grew out of a VGG16 plant-disease-diagnosis app I built with team MAKENEW, which won the **Excellence Award at the 2024 ICT·SW Women's Start-up Competition**. That model stayed below the 95% accuracy the team had set as its bar for release, so in 2026 I rebuilt the project as a full smart-farm platform and restarted the diagnosis model from the data up.\n\nThe IoT half runs today. ESP32 sensor nodes post environment data **directly to Supabase over Wi-Fi, no relay server**, and a Next.js web app visualizes it with 5-second polling. Actuators such as LEDs and fans are controlled through a **desired-state pattern**: the app only writes the target state, the ESP32 polls it and drives the hardware, and optimistic UI absorbs the round-trip delay. It is deployed on Vercel as a live demo.\n\nThe diagnosis model is **still at the data stage**. AI Hub blocks downloads from non-Korean IPs, so I wrote a Windows-side downloader that calls their API directly, merges the split archives, restores Korean filenames, and converts the JSON labels to YOLO-format boxes. From 5 classes (healthy plus 4 diseases) × 1,000 images I extracted **39.9K image crops** (train 32.2K / val 4,326 / test 3,408) using a **group-aware stratified split**, so crops from the same source photo never straddle train and validation. **Training the crop classifier, ConvNeXt-Tiny or EfficientNetV2-S, is the next step; there are no results yet.**",
    highlights: [
      "**Data flow built end to end**: ESP32 posting directly to Supabase over Wi-Fi → Next.js dashboard on 5-second polling.",
      "**Desired-state actuator control** (LED, fan): the app writes target state, the device polls and applies it, optimistic UI covers the latency.",
      "Worked around AI Hub's non-Korean-IP download block with a **Windows-side downloader I wrote**: direct API calls, split-archive merge, Korean filename restore, and JSON → YOLO-format label conversion.",
      "Built the training set myself: **39.9K image crops** (train 32.2K / val 4,326 / test 3,408) across 5 classes (healthy plus 4 diseases), with a **group-aware stratified split** so crops from one photo never cross the train/validation boundary.",
      "**Classifier training is the next step** (ConvNeXt-Tiny / EfficientNetV2-S). The 2024 VGG16 model stayed below the team's 95% release bar, so the model is being rebuilt from the data up.",
      "Next.js 16 + TypeScript + Tailwind web app deployed on Vercel as a live demo.",
    ],
    flow: ["ESP32 direct POST", "Supabase", "Next.js · 5s polling", "Desired-state control"],
    flowImage: {
      light: "/portfolio_images/flow-reborn/doctor-green-flow-light.svg",
      dark: "/portfolio_images/flow-reborn/doctor-green-flow-dark.svg",
    },
    gallery: [
      "/portfolio_images/projects/doctorgreen_app.png",
    ],
  },
  {
    slug: "raimi-art-lab",
    tier: "side",
    title: "Raimi's AI Art Lab",
    category: "Web App · Education",
    categories: ["AI", "Web", "Education"],
    kicker: "Seoul Robot & AI Science Museum · Jun–Aug 2026",
    desc: "A guided prompt builder where visitors co-create AI artwork with the museum character Raimi. It ran on the museum floor from June to August 2026, and its backend counted 14,328 generated images, 9,865 of them in July.",
    year: "2026",
    role: "Planning · development · operations",
    tags: ["JavaScript", "OpenAI API", "Vercel Serverless", "Supabase", "Cloudflare R2", "PWA"],
    repo: "https://github.com/henna2022/raim-ai-artstudio",
    image: "/portfolio_images/projects/artlab-mode-en.jpg",
    stat: "14,328 images · Jun–Aug 2026",
    overview:
      "Visitors compose a prompt step by step with the museum character Raimi, choosing what they want to draw, and an AI generates the artwork. Designed so young visitors learn the principles of prompt engineering through play, with a **10-step (+5 advanced) choice-based prompt builder** that shows how a prompt is put together.\n\nThe off-the-shelf GPT service used before would stop responding while visitors were using it. This is a hands-on exhibit, so a frozen screen meant the station sat unusable until staff intervened. After moving to a custom web app and serverless backend, **it has not frozen once**; the backend calls the OpenAI image-generation API, auto-watermarks every image with the museum logo, stores images on Cloudflare R2, and keeps generation metadata and stats in Supabase. Visitors take their creations home instantly via QR code, and because it runs as a web app, the exhibition kiosk could be locked down to a single full-screen browser.\n\nIt ran on the museum floor from June to August 2026, and **the app's own backend recorded 14,328 generated images**: 3,049 from 17 June, 9,865 in July and 1,414 in August. One image is one successful generation; blocked or failed requests are not counted.",
    highlights: [
      "**10-step (+5 advanced) choice-based prompt builder** that teaches prompt composition through play, designed for all-ages museum visitors.",
      "**Ended the freezes** of the prior off-the-shelf GPT service by moving to a custom web app and backend, none since the switch.",
      "Serverless backend on the OpenAI image-generation API, deployed on Vercel.",
      "**Auto-watermarks** every image with the museum logo, storing **images on Cloudflare R2 and generation stats in Supabase**.",
      "QR-code takeaway for visitors' creations; running as a web app let the exhibition kiosk be locked to a single full-screen browser.",
      "**14,328 images generated from June to August 2026, 9,865 of them in July**, with **generation volume measured in the app's own backend**.",
    ],
    flow: ["10-step prompt builder", "OpenAI API", "Auto-watermark", "R2 + Supabase"],
    flowImage: {
      light: "/portfolio_images/flow-reborn/raimi-art-lab-flow-light.svg",
      dark: "/portfolio_images/flow-reborn/raimi-art-lab-flow-dark.svg",
    },
    gallery: [
      "/portfolio_images/projects/artlab-home-en.jpg",
      "/portfolio_images/projects/artlab-mode-en.jpg",
      "/portfolio_images/projects/artlab-builder-en.jpg",
      // 전시장 실사용 컷 — 프롬프트 고르는 중, 그리고 완성 후 QR 저장
      "/portfolio_images/projects/artlab-onsite-prompt.jpg",
      "/portfolio_images/projects/artlab-onsite-result.jpg",
      "/portfolio_images/projects/artlab-usage-chart.png",
    ],
    galleryAlts: {
      "/portfolio_images/projects/artlab-usage-chart.png":
        "Art Lab admin dashboard: daily image generation over the last 30 days (30 June–29 July 2026), peaking above 700 in a single day.",
    },
  },
  {
    slug: "raim-staff-platform",
    tier: "side",
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
      "An internal platform for managing the museum's docents and part-time workers: a **self-initiated project** where I defined a real operational pain point (repetitive on-site work) and built the answer myself. It brings a per-date schedule grid, staff roster, live duty status, and notices together in a single app.\n\nIt started as a single-HTML prototype and was **refactored into a structured Vite + React codebase** backed by Firebase (Firestore) for real-time data. The full screen flow was planned and built end to end: login and role-based routing into bottom tabs (home · notices · schedule · status · my page · admin), plus a manager PC console and shared modals.\n\nPackaged with Capacitor for internal mobile distribution, it is currently running as an internal test distribution, **used daily by around 20 docents and part-time staff**.",
    highlights: [
      "**Planned and built the entire service**: schedule grid, roster, duty status, and notice screens.",
      "Refactored a single-HTML prototype into a **maintainable Vite + React codebase**.",
      "**Real-time** roster and duty status backed by Firebase / Firestore.",
      "Designed the full screen flow: login/role routing → bottom tabs (home · notices · schedule · status · my page · admin) → manager PC console and shared modals.",
      "Set up internal mobile distribution with Capacitor, **used daily by ~20 docents and part-time staff**.",
      "A **self-initiated** internal project, started by defining a real operational problem on-site.",
    ],
    flow: ["React + Vite", "Firebase / Firestore", "Capacitor", "Internal mobile build"],
    flowImage: {
      light: "/portfolio_images/flow-reborn/raim-staff-platform-flow-light.svg",
      dark: "/portfolio_images/flow-reborn/raim-staff-platform-flow-dark.svg",
    },
    gallery: ["/portfolio_images/projects/raimapp_main.png"],
  },

  // ── Side & toy projects ──
  {
    slug: "im-a-restorer",
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
    tier: "side",
    title: "Raimi's AI Language Lab",
    category: "Language-AI Education Game",
    categories: ["Web", "Education"],
    kicker: "Hands-on NLP mini-games",
    desc: "Five touch mini-games where visitors experience how language AI learns, tokenization, embeddings, word order, attention, and next-word prediction. Runs entirely in the browser, no server required.",
    year: "2026",
    role: "Planning · development",
    tags: ["JavaScript", "HTML/CSS", "PWA", "Offline-first"],
    repo: "https://github.com/henna2022/raim-ai-studio",
    image: "/portfolio_images/projects/langlab-home-en.jpg",
    overview:
      "A game-style web app where visitors explore how a language AI actually learns, by playing. With the museum character Raimi they work through **five touch mini-games**, each built on a real NLP concept: **tokenization** (slicing a sentence into pieces), **embeddings** (sorting words by meaning), **word order**, **attention** (spotting the word that matters), and **next-word prediction** with live probability bars.\n\nThe full flow (start, stamp-based lesson menu, play, completion) is plain JavaScript with no framework and **no server**; it supports **both Korean and English** (with browser auto-translate blocked so the exhibition copy stays intact) and ships as an **offline-first PWA** on the 3 exhibition tablets it runs on. Kiosk behavior is handled in-app: after 2 idle minutes it resets to the start screen for the next visitor.\n\nA hidden, PIN-gated staff panel tracks per-device usage and exports reports to Excel through a **dependency-free .xlsx writer**, with a Node regression test covering the stats logic.",
    highlights: [
      "**5 NLP concepts as touch mini-games**: tokenization, embeddings, word order, attention, and next-word prediction with live probability bars.",
      "Designed and built the full game flow: start, stamp-based lesson menu, play, completion.",
      "**Runs entirely in the browser**, plain JavaScript, no framework, no server.",
      "**Bilingual Korean / English**, with browser auto-translate blocked for exhibition reliability.",
      "**Offline-first PWA** on the **3 exhibition tablets**, with a 2-minute idle reset for kiosk turnover.",
      "PIN-gated staff stats panel with a **dependency-free Excel (.xlsx) export**, covered by a Node regression test.",
    ],
    flow: ["5 NLP mini-games", "Plain JS · no server", "Offline PWA kiosk"],
    flowImage: {
      light: "/portfolio_images/flow-reborn/raimi-language-lab-flow-light.svg",
      dark: "/portfolio_images/flow-reborn/raimi-language-lab-flow-dark.svg",
    },
    gallery: [
      "/portfolio_images/projects/langlab-home-en.jpg",
      "/portfolio_images/projects/langlab-intro-en.jpg",
      "/portfolio_images/projects/langlab-token-en.jpg",
    ],
  },
  // 포트폴리오에서 임시 제외 (RAIM Metaverse) — 되살릴 때 주석을 풀고
  // 되살릴 때 side 프로젝트 번호를 다시 매긴다.
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
    slug: "exhibit-auto-recovery",
    tier: "side",
    title: "Exhibit Auto-Recovery",
    category: "Ops Automation · Reliability",
    categories: ["Ops", "Web"],
    kicker: "Exhibit uptime · self-initiated",
    desc: "A recovery system for a museum AI exhibit that could only be restarted by hand from one specific machine every time it froze. It checks the program every 20 seconds, relaunches it within a minute of a crash or freeze it can detect, and lets staff restart it from a button page on their own phone.",
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
    stat: "1 machine → any staff phone",
    overview:
      "MaskBot is a face- and voice-interaction robot exhibit on the museum floor. Its control software would intermittently freeze or exit mid-operation, and the only remedy was a manual restart, which could only be done **from one specific machine**, through a remote session. Every failure became a wait: get someone to that machine and walk through the remote login. Meanwhile visitors stood in front of an exhibit that could not hear them.\n\nI took this on after performing that manual restart one too many times. The key observation was that the fix itself was trivial, closing a window and reopening it, and that the entire cost lived in where it could be done from and how long it took to get someone there. So the goal was never to make the restart smarter. It was to **remove the single-machine bottleneck around it**.\n\nThe result runs in three layers on the exhibit machine. A watchdog **polls the program every 20 seconds** and restarts it when the process has died or its window stops responding, with a two-stage confirmation so a momentarily busy UI is not killed by mistake, and a five-minute pause after three restarts in a row, so a deeper hardware fault does not turn into nonstop restarts. Scheduled restarts run twice daily as preventive maintenance. And a small HTTP service serves a **single-button page**, so **any staff member can trigger recovery from their own phone**.\n\nThat third layer exists because of a limit I could not engineer away. One failure mode leaves the process alive and the window responsive while speech recognition silently stops working, and no health signal available to me distinguishes that from a healthy exhibit. Rather than paper over it, I designed around it: the automated layers handle every failure a machine can detect, and the human layer covers the one it cannot.\n\nReaching the exhibit machine from a personal phone was a separate problem, as staff devices had no route to it. I used Tailscale, a WireGuard-based mesh VPN, so enrolled devices reach the service over an encrypted tunnel without any port opened to the internet.\n\nI **installed it on the exhibit machine in July 2026, and it still runs unattended in daily operation**. I also wrote a handover document covering configuration, logs, routine maintenance, a diagnosis playbook, and the system's documented limitations, so the maintenance technician can own it without me.",
    highlights: [
      "**Reframed the problem**: the restart was trivial; the real cost was that it could only be done **from one machine**.",
      "Watchdog **relaunches the exhibit program within a minute** of a crash or hang it detects, with a two-stage check against false positives and a five-minute pause after three restarts in a row.",
      "**One-button recovery page** served from the exhibit machine, turning an escalation into something **any staff member can do from their own phone**.",
      "**Designed around an undetectable failure mode**: when speech recognition dies silently, automation cannot tell, so scheduled restarts and the manual button cover what the watchdog structurally cannot.",
      "**Encrypted mesh VPN** (Tailscale / WireGuard) lets enrolled devices reach the page **without opening any port to the internet**.",
      "Shipped with a **maintenance handover document**: configuration, logs, diagnosis playbook, and known limitations.",
    ],
    flow: ["Watchdog + schedule", "Restart service", "Mesh VPN", "Staff phone"],
    flowImage: {
      light: "/portfolio_images/flow-reborn/exhibit-auto-recovery-flow-light.svg",
      dark: "/portfolio_images/flow-reborn/exhibit-auto-recovery-flow-dark.svg",
    },
  },
  // ── 과학관에서 만든 것 (2026-10 추가): 운영 중 → 배포·설치 전 → 준비 중 → 프로토타입 순 ──
  // 규모로는 major 후보(서버·DB·인증·자동 테스트). 승격은 본인이 정한다.
  // repo 는 공개 저장소지만 README 에 개발용 기본 관리자 계정이 있어 걸지 않는다.
  {
    slug: "raim-en",
    tier: "side",
    title: "RAIM EN: English Tour Booking",
    category: "Web Service · Reservations",
    categories: ["Web", "Ops"],
    kicker: "Seoul Robot & AI Science Museum · public launch pending",
    desc: "An English guide and tour-booking site for the museum's foreign visitors. Seoul's public reservation system requires Korean mobile identity verification, which kept foreign visitors from booking online, so I made it possible to book with an email address instead of a Korean phone number.",
    year: "2026",
    role: "Solo: planning, development, deployment",
    tags: ["Node.js", "Express", "SQLite", "EJS", "Google Apps Script", "Fly.io"],
    href: "https://raim-en.fly.dev",
    image: "/portfolio_images/projects/raim-en-en.jpg",
    stat: "287 automated tests",
    overview:
      "Guided exhibition tours at the museum are booked through Seoul's public reservation system, which requires identity verification with a Korean mobile number. Foreign visitors **could not book online at all**; they could only try on the day, and complaints followed. I built an English site that covers visit information and gives them a booking path that uses an email address instead of a Korean phone number.\n\nThe first version worked by approval: a visitor applied, staff blocked the seats in the city system, then confirmed. In August 2026 the museum set a monthly allocation of sessions and seats for online booking, and I rebuilt the site so it opens only those allocated sessions and seat counts. Within an allocated month a booking is **confirmed instantly against live remaining seats**, and a cancellation returns the seat on its own. Visitors look up, change, or cancel with their booking code and email; the code alone shows only a masked summary.\n\nFor staff there is an admin with individual accounts, a persistent session store, login lockout, and CSRF protection, and the public form has rate limiting and a honeypot. Reservations also mirror to a Google Sheet that works as a **shared ledger**: through Apps Script, staff can approve or decline from a dropdown, approval goes through only when the seat-blocked checkbox is ticked, and bulk edits over 20 rows are rejected. Personal data is deleted automatically 90 days after the visit (no-show records are kept longer), and visit statistics are counted on the server without storing IP addresses.\n\nThe codebase has **287 automated tests** (node:test). In October 2026 hosting moved from Render's free tier, where every redeploy wiped the SQLite database and its data had to be restored from the sheet, to Fly.io with a persistent volume.",
    highlights: [
      "Built online tour booking for foreign visitors, who were shut out by the **Korean mobile identity check** the city reservation system requires.",
      "**Monthly allocation with instant confirmation** replaced the first approval flow: bookings confirm against live remaining seats, and cancellations return seats automatically.",
      "**Google Sheet as a shared ledger**: staff approve or decline from a dropdown via Apps Script, with guards against unblocked seats, mass edits, and duplicate emails.",
      "**Privacy by default**: personal data deleted 90 days after the visit (longer for no-shows), masked lookup by booking code alone, visit statistics without storing IP addresses.",
      "**287 automated tests** covering booking, admin auth, CSRF, rate limiting, and sheet sync.",
    ],
  },
  // 규모로는 major 후보(온디바이스 모델 5종·서버리스 API·현장 로그 보정). 승격은 본인이 정한다.
  {
    slug: "mystery-playground-replay",
    tier: "side",
    title: "Mystery Playground RE:PLAY",
    category: "Exhibition Kiosk Game",
    categories: ["AI", "Web", "Education"],
    kicker: "Seoul Robot & AI Science Museum · 4F special exhibition archive",
    desc: "A ten-mission tablet game that archives the museum's 4th-floor special exhibition. Visitors dance with a 3D robot, steer a robot arm with an open hand, and turn their face into a pixel-art avatar, with every vision model running on the tablet itself.",
    year: "2026",
    role: "Solo: development, field tuning, operations tooling",
    tags: ["JavaScript", "MediaPipe", "Three.js", "PWA", "Vercel Functions", "Supabase"],
    href: "https://replay-exhibit-game.vercel.app",
    image: "/portfolio_images/projects/mystery-playground-replay-en.jpg",
    stat: "10 missions · 5 on-device models",
    overview:
      "This kiosk game archives Mystery Playground RE:PLAY, the museum's 4th-floor special exhibition on entertainment technology. It opens on a floor map redrawn from the real exhibition signage, and each of the **ten missions** matches one zone on that map. Every mission runs the same flow: how to play, the hands-on part, the result, the principle behind it, and a short quiz.\n\nThe camera missions run **five Google MediaPipe models on the tablet**. In Mission 1 a 3D humanoid built with Three.js copies the visitor's dance from pose landmarks. In Mission 2 an open hand steers a 3D robot arm, and the composited photo can be taken home by QR. In Mission 6 the app reads 478 face landmarks and hair, skin and clothing masks, reduces them to a numeric feature record that holds no photo pixels, and draws a full-body pixel-art avatar from it. The app, models and fonts install on a Galaxy Tab as an offline PWA of about 51 MB.\n\nAfter launch the tablets sent numbers-only logs, with no photos. The first **128 visitor logs** showed that lighting was not the problem. Visitors wearing hats or headbands were drawn with silver hair in 45% of cases, a beard in 35% and curly hair in 35%, against 12%, 3% and 0% for those without. I changed the color, beard and curl rules for accessories and checked the change against a frozen eight-image benchmark and the feature-extraction regression tests.\n\nOperations are built in. Tablets upload daily mission stats on their own, staff read them on a token-protected page with CSV export, avatar logs are deleted after 90 days, and an English mode switches back to Korean after 30 seconds of inactivity for the next visitor.",
    highlights: [
      "**Ten missions on one floor map** redrawn from the exhibition signage, each with the same play, principle and quiz flow.",
      "**Five MediaPipe models run on-device** alongside Three.js, packaged as an offline PWA so the kiosk keeps working without a network.",
      "Mission 6 turns a camera shot into a **pixel-art avatar** through a feature record that keeps face measurement separate from drawing.",
      "**Tuned from field data**: 128 numbers-only logs traced misread avatars to hats and headbands, and the fix was checked against a frozen benchmark.",
      "Self-reporting tablets, a token-protected stats page with CSV export, 90-day log expiry and a KO/EN toggle that resets for the next visitor.",
    ],
  },
  // 옛 raim-photo-booth 주석 블록을 대체. 옛 flow SVG(raim-photo-booth-flow-*.svg)는
  // "4컷 촬영·AI가 골라 줌"으로 사실과 달라 쓰지 않는다. 저장소는 비공개라 repo 없음.
  {
    slug: "raim-4cut-studio",
    tier: "side",
    title: "RAIM 4-Cut Studio",
    category: "Photo Kiosk",
    categories: ["AI", "Web"],
    kicker: "Seoul Robot & AI Science Museum · Jun–Sep 2026",
    desc: "A four-cut photo kiosk where visitors design a frame with the museum's robots and take the finished photo home by QR. It recorded 1,932 uses on 26 days between June and September 2026.",
    year: "2026",
    role: "Solo: planning, development, operations",
    tags: ["JavaScript", "MediaPipe", "Canvas", "Supabase", "QR", "PWA"],
    href: "https://raim-4cut-studio.vercel.app",
    image: "/portfolio_images/projects/raim-4cut-studio-en.jpg",
    stat: "1,932 uses · 26 days",
    overview:
      "RAIM 4-Cut Studio started as the photo kiosk for the museum's 2nd anniversary and runs on a portrait Galaxy Tab. Visitors choose a frame color, one of **ten museum robots** and an optional caption, take six shots on a three-second countdown, pick four, and scan a QR code to save the 1080×1620 frame to their phone. It recorded **1,932 uses on 26 days** between June 14 and September 6, 2026.\n\nShot recommendation runs on the device. A MediaPipe face model scores each shot on sharpness, face presence, open eyes and smile, and the top four are **highlighted, not auto-selected**, so the visitor makes the final pick. The QR link expires after two hours. Its center label was sized by test: at 30% of the code's width, all 12 URL lengths decoded at three scales with jsQR.\n\nStaff use a PIN-protected stats page with daily, weekly and monthly counts, robot popularity and frame colors, and can switch seasonal robot versions such as summer and Chuseok without a redeploy. Kiosk guards block long-press menus, zoom, auto-translation and back gestures, and the result screen returns to the start after 30 seconds.",
    highlights: [
      "**1,932 uses recorded on 26 days** between June and September 2026.",
      "**On-device best-shot recommendation** from MediaPipe face scores; the visitor still picks the four cuts.",
      "QR center label sized by test: 12 of 12 URL lengths decoded at three scales with jsQR.",
      "Seasonal robot versions and frame logos switched from the staff page, no redeploy needed.",
      "Kiosk guards against long-press, zoom, translation and back gestures, with auto-return to the start screen.",
    ],
  },
  {
    slug: "lidar-explainer-kiosk",
    tier: "side",
    title: "Seeing the Room Through LiDAR",
    category: "Exhibit Explainer Kiosk",
    categories: ["Web", "Education"],
    kicker: "Seoul Robot & AI Science Museum · LiDAR media art",
    desc: "A self-touch explainer installed beside the museum's LiDAR media-art room. Visitors drag people around a simulated room and follow the same scene through five steps, from raw sensor points to the waves projected on the wall and floor.",
    year: "2026",
    role: "Solo: planning, development, fact-checking, installation",
    tags: ["JavaScript", "Canvas 2D", "PWA", "Blender", "webOS"],
    href: "https://raim-lidar.vercel.app",
    image: "/portfolio_images/projects/lidar-explainer-kiosk-en.jpg",
    overview:
      "In the museum's media-art room, two LiDAR sensors beside the projector follow visitors: footsteps leave flowing trails on the floor, and a hand swept along the wall leaves a cloud of particles. Visitors often asked which AI model was recognizing them. This kiosk, a 1920×1080 StanbyME touch screen next to the installation, answers that the input is **not a photo but a cloud of points**.\n\nA visitor drags people around a simulated room and steps through **Scan, Background subtraction, Find people, Turn into waves and Project onto wall and floor**. A comparison panel sets a camera view, where the face stays in the image, against the LiDAR view, where only points and coordinates remain. After 30 seconds without input the screen switches to an attract mode in which people walk by themselves and the steps cycle.\n\nThe TV's built-in browser is older than Chromium 84, so the page is one HTML file with **no runtime libraries**, ES5 JavaScript and none of the newer CSS shorthands. It installs as a PWA and keeps working offline. The walking figures are sprite sheets I rendered in Blender from a licensed 3D model, and the particle budget drops from 2,400 to as low as 500 when the TV cannot keep up.\n\nEvery sentence on screen had to rest on a staff-confirmed fact, the exhibit panel, a verifiable technical fact, or what the screen itself does. Model names and claims about how the sensor software classifies people were removed after repeated cross-checks. The kiosk was installed beside the exhibit in September 2026, and a Korean/English toggle followed.",
    highlights: [
      "**Five-step walkthrough** from sensor points to projected waves, driven by the visitor's own finger.",
      "A camera vs LiDAR panel built on the one difference that holds: a camera image keeps the face, LiDAR keeps only points.",
      "**One HTML file, zero runtime libraries**, written for a pre-Chromium-84 TV browser and cached as an offline PWA.",
      "Walking sprites rendered in Blender, 8 directions × 16 frames, with a script that rebuilds them.",
      "**A source rule for every sentence** on screen, unverifiable claims removed; installed on site in September 2026.",
    ],
  },
  {
    slug: "raim-floor-guide",
    tier: "side",
    title: "Floor-by-Floor QR Guide",
    category: "Mobile Web · Visitor Guide",
    categories: ["Web"],
    kicker: "Seoul Robot & AI Science Museum · Sep 2026",
    desc: "A mobile web guide where scanning a floor's QR code opens that floor first. No app to install; Korean and English, with today's program times and the next session highlighted.",
    year: "2026",
    role: "Solo: planning, content, design, development",
    tags: ["JavaScript", "HTML / CSS", "Vercel", "Python", "QR code"],
    href: "https://raim-guide.vercel.app",
    image: "/portfolio_images/projects/raim-floor-guide-en.jpg",
    stat: "4 floors · KO / EN",
    overview:
      "A mobile web guide for the museum's four floors. Each floor has its own QR code and page (/1f to /4f), so a visitor who scans it lands on **that floor's programs for today**, its exhibits, and facilities. Hours, notices, directions, and booking sit on a separate Info tab. Session times were transcribed from the posters on site and exhibit details from the museum's official website, all kept in one data file.\n\nPast sessions are dimmed and **the next one is highlighted**; Wednesday evening extended sessions switch on only on Wednesdays. Closures are listed by date instead of assuming every Monday, because the museum opens on Mondays that fall on substitute holidays.\n\nIn English mode, programs run only in Korean are hidden, and booking buttons go to the English booking site (RAIM EN) instead of the city system foreign visitors cannot use. A live feed of the second-floor education room was **held back on purpose**: its kiosk server sits on the internal network without HTTPS or authentication, so a visitor's phone cannot reach it. Rather than open that server up, I documented the relay it would need.",
    highlights: [
      "**One QR per floor**, each opening its own floor page; a script generates the four QR images and an A4 print sheet.",
      "**Timetable logic**: past sessions dimmed, the next one highlighted, Wednesday evening sessions shown only on Wednesdays.",
      "**Korean / English toggle** that also hides Korean-only programs and sends booking to the English reservation site.",
      "**No build, no server**: two static files on Vercel, with light and dark themes following the system setting.",
      "Held back a live feed from an internal-network kiosk server and documented the relay it would need, instead of exposing that server.",
    ],
  },
  // 라이브 주소가 곧 관리자 화면이라 href·캡처 없이 둔다. 저장소도 비공개.
  {
    slug: "exhibit-stats-hub",
    tier: "side",
    title: "Exhibit Usage Stats Hub",
    category: "Data Collection · Dashboard",
    categories: ["Web", "Ops"],
    kicker: "Seoul Robot & AI Science Museum · Sep 2026",
    desc: "One dashboard for the daily usage counts of the interactive exhibits I built for the museum. Each exhibit used to record its numbers in a different place, and some lived only inside individual tablets, so there was no way to add them up.",
    year: "2026",
    role: "Solo: design, build, exhibit integration, data migration",
    tags: ["Vercel Functions", "Supabase", "PostgreSQL", "Row Level Security", "JavaScript"],
    stat: "8 exhibits registered",
    overview:
      "Each interactive exhibit I built for the museum recorded usage its own way: some on a server, some only in each tablet's browser storage, and one not at all. I'm a Restorer! runs on 8 tablets, so a total meant opening an admin screen on every device and adding the numbers by hand. I built a hub where every exhibit reports to one endpoint and **a single dashboard shows daily totals**.\n\nThe database keeps **one row per exhibit, day, and event** instead of one per use, and increments it atomically in a single SQL statement, so a full year from the six exhibits still collecting tops out at 6,570 rows on a free tier. Row-level security is on with no public policies: only serverless functions read and write, using a service key that never reaches the browser. On the exhibit side, a drop-in collector script **queues events while offline** and sends them later, since Raimi's AI Language Lab runs as an offline-first app on tablets and must keep working without internet.\n\nEach exhibit was connected with a one-line hook, leaving its existing stats code untouched. For the two exhibits whose run had ended, I moved their past records into the hub: **14,328 generated images over 47 days** for Raimi's AI Art Lab and 1,932 uses over 26 days for RAIM 4-Cut Studio. Because the collect endpoint has to be public, it accepts only registered exhibits and caps every request, and the documentation states that the numbers are for internal operations, not official figures.",
    highlights: [
      "**Daily counter schema**: one row per exhibit, day, and event, incremented atomically in SQL, at most 6,570 rows a year from the six exhibits still collecting.",
      "**Offline queue in the collector**, so tablet exhibits without a connection keep counting and report later.",
      "**Service key stays on the server**: row-level security with no public policies; only serverless functions touch the table.",
      "**Migrated past records** from two finished exhibits: 14,328 generated images over 47 days (Art Lab) and 1,932 uses over 26 days (4-Cut).",
      "Limits on the public collect endpoint (exhibit allowlist, finished exhibits refused, 200 rows per request, 5,000 per row, no future dates), with the remaining gap documented.",
    ],
    flow: ["Exhibit + collect.js", "POST /api/collect", "Supabase daily counters", "Dashboard"],
  },
  // 내부망 전용이라 공개 주소 없음. 이미지는 샘플 데이터 미리보기(board-example.html) 캡처.
  {
    slug: "education-room-board",
    tier: "side",
    title: "Today's Classes Board",
    category: "Internal Display · Ops",
    categories: ["Ops", "Web"],
    kicker: "Seoul Robot & AI Science Museum · 2F education rooms",
    desc: "A read-only tablet board that shows today's timetable and remaining seats for the museum's multipurpose education rooms, refreshed from the booking kiosk's server every 10 seconds.",
    year: "2026",
    role: "Solo: development, tablet setup, handover",
    tags: ["JavaScript", "REST API", "Python", "Android tablet", "Fully Kiosk Browser"],
    image: "/portfolio_images/projects/education-room-board.jpg",
    overview:
      "Class bookings for the museum's 2F education rooms are taken at a kiosk and stored on the kiosk's schedule server. This board **reads that server's API and never writes to it**. It lays out today's timetable for three multipurpose rooms, computes remaining seats as capacity minus bookings, and greys out slots that have passed.\n\nIt runs on **a single Galaxy Tab**. A local HTTP server app serves one HTML file, and Fully Kiosk Browser shows it full-screen, keeps the screen on and starts it at boot, so no PC has to stay on. The font is embedded so the board renders without internet, and when the server cannot be reached it shows sample data with a 'waiting for server' badge. A Python proxy version for PCs passes read requests only and blocks update and delete paths.\n\nI also wrote a **handover document** that walks staff through setting up a new tablet, fixing common failures and maintaining the file.",
    highlights: [
      "**Read-only by design**: GET requests only, and the PC proxy blocks every write path.",
      "Refreshes every 10 seconds, calculates seats left per class and marks past slots as closed.",
      "One-tablet deployment with Fully Kiosk Browser: always on, starts at boot, no PC required.",
      "Embedded font and a sample-data fallback keep the screen readable offline.",
      "Handover document covering setup, troubleshooting and maintenance.",
    ],
  },
  // 볼트 resume: 예정형으로만. 서버 표 수는 외부 표가 섞일 수 있어 쓰지 않는다.
  // 그림 4장은 AI 도구로 만든 것이라 직접 그렸다고 쓰지 않는다.
  {
    slug: "ai-ethics-vote",
    tier: "side",
    title: "Robot & AI Ethics Vote",
    category: "Exhibit Kiosk · PWA",
    categories: ["Web", "Education"],
    kicker: "Robot & AI Ethics exhibit · in use since Sep 2026",
    desc: "A voting kiosk for the museum's Robot & AI Ethics exhibit: visitors pick one of four questions with no right answer, vote between two positions, and see how others voted. Built as an offline-capable PWA in Korean and English, with votes tallied on a server.",
    year: "2026",
    role: "Solo: planning, development, deployment",
    tags: ["JavaScript", "PWA", "Service Worker", "Supabase", "Vercel", "i18n"],
    href: "https://raim-ethics-vote.vercel.app",
    image: "/portfolio_images/projects/ai-ethics-vote-en.jpg",
    stat: "4 topics · KO/EN",
    overview:
      "The Robot & AI Ethics exhibit raises questions that have no right answer yet. This kiosk turns them into a vote on a portrait 1080×1920 touchscreen meant to stand beside the exhibit. Four topics, an AI judge, a robot's feelings, disappearing jobs and AI-made art, each pose one either-or question with an illustration that puts Raimi and a person side by side. Visitors can **switch any screen between Korean and English** in place.\n\nI designed the flow so it does not steer answers. Both choices share one color, and results for other topics show **only a vote count until you vote on that topic yourself**. The screen returns to the cover when the visitor walks away, and taps in the first 0.45 seconds after a screen change are ignored, so a double tap cannot cast a vote nobody chose.\n\nVotes live on a server, not just the device. The kiosk posts each vote to an API I added to the exhibit usage hub, which keeps daily per-topic totals in Supabase. **If the network drops, votes queue on the device and upload without duplicates when it reconnects.** A service worker precaches the page, fonts and images, so the kiosk opens offline after one online visit, and a staff view charts votes by day, week or month with CSV export. The kiosk has stood beside the exhibit since September 2026.",
    highlights: [
      "**Korean/English toggle** that switches the current screen in place, one language per screen.",
      "**Neutral by design**: same-color choices, other topics' splits hidden until you vote on them, illustrations pairing Raimi with a person.",
      "**Server tally with an offline queue**: votes go to a Supabase-backed API and wait on the device while the network is down.",
      "**Offline-capable PWA** with precached fonts and images, a full-screen portrait manifest and idle reset for walk-up use.",
      "Staff view with daily, weekly and monthly charts and CSV export.",
    ],
  },
  // 볼트 resume: 확인 필요(현장 QR 부착·운영 여부 미확인). 배포 사실만 쓴다.
  {
    slug: "ai-persona-web",
    tier: "side",
    title: "AI Persona Companion App",
    category: "Computer Vision · Exhibit Web App",
    categories: ["AI", "Web"],
    kicker: "Caricature-robot exhibit · visitor phone app",
    desc: "A phone web app for AI Persona, the museum's caricature-robot exhibit, opened from a QR code posted beside it. The visitor's own phone redraws their face in shapes the way the robots beside them do, with all face processing kept inside the browser.",
    year: "2026",
    role: "Solo: planning, development, deployment",
    tags: ["MediaPipe Face Landmarker", "JavaScript", "Canvas 2D", "Web Share API", "GitHub Pages"],
    href: "https://henna2022.github.io/ai-persona/",
    repo: "https://github.com/henna2022/ai-persona",
    image: "/portfolio_images/projects/ai-persona-web.jpg",
    overview:
      "AI Persona is a caricature-robot exhibit at the Seoul Robot & AI Science Museum, where robots draw a visitor's face in lines. I built a companion web app that visitors open on their own phone from a QR code: the camera finds their face, and **the eyes, nose, mouth and brows are redrawn as randomized geometric shapes**, with a button that reshuffles the combination.\n\nFace tracking runs entirely in the browser with **MediaPipe Face Landmarker**, on the GPU first and on the CPU when the GPU path fails. Its expression scores choose the icon above the head: a smile gets a heart, a frown an anger mark, an open mouth with raised brows an exclamation mark, and a neutral face a crown. The thresholds sit in one table, and a debug readout shows the live scores so they can be tuned on site.\n\nAfter the photo, the camera shuts off and a **30-second animation shows a pen plotter and a Doosan collaborative robot drawing the result**. The animation replays strokes recorded from the same draw calls that render the final image, so what the robots draw is exactly what the visitor keeps; with reduced motion turned on, only the finished frame is shown. The drawing saves through the phone's share sheet.\n\n**Video and face coordinates never leave the phone.** The only outbound data is a single usage count sent to the exhibit usage hub I built, queued while offline and carrying no device ID or cookies. The app is one HTML file with no build step, deployed on GitHub Pages in September 2026, and I designed the A3 QR poster now posted on the exhibit floor.",
    highlights: [
      "**In-browser face tracking** with MediaPipe Face Landmarker, GPU first with a CPU fallback; no image is uploaded.",
      "**Expression to icon** from blendshape scores (smile, frown, surprise, neutral), with thresholds kept in one table and a live debug readout for on-site tuning.",
      "**30-second robot-drawing animation** that replays the final image's own strokes, recorded from the same draw calls, with a reduced-motion fallback.",
      "**Privacy by design**: the camera stops right after capture, and only an anonymous usage count leaves the device, queued when offline.",
      "Single HTML file with no build step, deployed on GitHub Pages.",
    ],
  },
  // 볼트 resume: 예정형으로만. 마커 부착·첫 현장 운영 전이라 운영했다고 쓰지 않는다.
  // 규모로는 major 후보(현장 운영 뒤). 3D 모델은 AI 도구로 만든 것이라 직접 제작했다고 쓰지 않는다.
  {
    slug: "time-machine-ar",
    tier: "side",
    title: "First Time in the Future? Time-Machine AR",
    category: "AR Web App · Education",
    categories: ["Web", "Education"],
    kicker: "Exhibition-linked program · deployed, on-site launch pending",
    desc: "A tablet AR web app for a museum education program: scan the time-machine poster beside an exhibit, and a 3D time machine flies in, the museum character Raimi steps out, and a short video and a question to think about follow. It is deployed for five exhibits; marker installation and the first on-site session are still ahead.",
    year: "2026",
    role: "Solo: planning, development, testing",
    tags: ["MindAR", "Three.js", "WebGL", "JavaScript", "PWA", "Headless Chrome"],
    href: "https://raim-jobs.vercel.app",
    image: "/portfolio_images/projects/time-machine-ar.jpg",
    stat: "5 exhibits · tablet AR",
    overview:
      "First Time in the Future? is an education program that links five permanent exhibits at the Seoul Robot & AI Science Museum. Each exhibit gets a time-machine poster. When a child scans it with a tablet, a 3D time machine flies in for six seconds and lands on screen, Raimi steps out to introduce a future scenario, a short video plays, and the stop ends with a question to answer on a paper worksheet. Finding all five time machines completes the tour. I built the app solo as a web app for a landscape Galaxy Tab A9+, using MindAR image tracking and Three.js.\n\nRecognition was the hard part. Measured with my own test harness, **MindAR could not tell the five posters apart**: in grayscale they are almost the same picture, and a file trained on all five matched the first poster in 4 of 5 trials. So the app trains on one poster and **identifies the exhibit from the color of the time machine's band**, averaging 16 sample points over several frames after removing the room's lighting tint with gray reference points on the same poster. That correction fixed yellow and purple being read as blue under exhibit lighting. I also found that MindAR builds its grayscale image with different formulas at training and run time, which let screen moiré wipe out detection, and patched one line of the runtime shader to match.\n\nThe development PC has no camera, so I built **an end-to-end harness that replaces the app's camera with a simulated printout stream** and runs the real recognition path in headless Chrome: five colors, blur, size, repeated scans, occlusion, hand shake and color casts. Tablet field tests drove the remaining fixes: one tracking instance is reused across scans (repeated scans had been exhausting the tablet's WebGL contexts), the scene is pinned to the screen after landing so it does not shake with the hand, and every library is self-hosted with an offline cache in case the museum network blocks CDNs.\n\nThe app is deployed with all five videos and scripts in place. **Printing and mounting the markers and the first on-site session are still pending**, so it has not yet run with visitors.",
    highlights: [
      "**Band-color classification**: MindAR could not separate five near-identical posters, so the app trains on one and identifies the exhibit by band color, with lighting correction from gray reference points.",
      "**Patched MindAR's runtime grayscale formula** to match training, restoring detection under screen moiré.",
      "**Fake-camera end-to-end harness** runs the real recognition path in headless Chrome on a PC with no camera.",
      "One tracking instance reused across scans, so repeated scans no longer exhaust the tablet's WebGL contexts.",
      "**Offline-capable PWA** with self-hosted MindAR and Three.js, sized to the Galaxy Tab A9+ visible area.",
    ],
  },
  // 볼트 resume: 예정형으로만. 담당자에게 넘겨 실제 업무에 쓰기 전.
  {
    slug: "document-formatter",
    tier: "side",
    title: "Document Template Converter",
    category: "Internal Tool · Document Conversion",
    categories: ["Web", "Ops"],
    kicker: "In-browser conversion · nothing uploaded",
    desc: "A web tool that rebuilds Word, PowerPoint and Hangul (HWP/HWPX) documents in the museum's standard manual templates and exports Word, PowerPoint or PDF. Everything runs in the browser, so documents never leave the computer.",
    year: "2026",
    role: "Solo: planning & development",
    tags: ["JavaScript", "mammoth.js", "docx", "PptxGenJS", "JSZip", "GitHub Pages"],
    href: "https://henna2022.github.io/raim-docform/",
    repo: "https://github.com/henna2022/raim-docform",
    image: "/portfolio_images/projects/document-formatter.jpg",
    stat: "4 input formats · 8 templates",
    overview:
      "The museum had settled on a standard layout for its operating manuals, but existing documents came as Word files, slide decks and Hangul files in every style. This tool takes one of those files and lays it out again in the chosen template. There are **four document templates (A to D) and four slide templates (P1 to P4)** for photo-heavy equipment manuals, and the output can be Word, PowerPoint (16:9) or PDF.\n\n**No AI is involved and nothing is uploaded.** The reader turns DOCX (mammoth.js), PPTX and HWPX (JSZip and their XML) and legacy binary HWP (compound-file parsing plus raw-deflate streams) into one shared block structure. The writer renders that structure as a live preview, DOCX (docx), PPTX (PptxGenJS) or a print-ready PDF. A single slide-layout function drives both the preview and the PowerPoint output, so the file matches what is on screen.\n\nReal files raised their own problems. HWP table cells carry row and column addresses that have to be decoded to rebuild merged tables, white margins baked into source photos are trimmed automatically, and the output uses Korean line-break settings so lines do not split mid-word. The preview is editable: click text to fix it, or drag photos to reorder or replace them. **The tool is live on GitHub Pages; handing it over for day-to-day staff use is the remaining step.**",
    highlights: [
      "**Runs entirely in the browser**: documents are converted locally and never uploaded.",
      "Reads **DOCX, PPTX, HWPX and binary HWP**, rebuilding merged tables from HWP cell records.",
      "**Eight templates**: four document layouts and four slide layouts for photo manuals, exported as DOCX, PPTX or PDF.",
      "One layout function shared by the preview and the PowerPoint writer, with an editable preview for text and photos.",
      "Korean line-break settings in DOCX and PPTX output so lines do not break mid-word.",
    ],
  },
  // 볼트 resume: 예정형으로만. 직원 전용(비밀번호 게이트)이라 href·캡처 없이 둔다.
  {
    slug: "staff-ai-class",
    tier: "side",
    title: "RAIM AI Coding Class",
    category: "Staff Training · Course Hub",
    categories: ["Education", "Web"],
    kicker: "Museum staff course · starts Oct 2026",
    desc: "A seven-session AI and coding course I planned for museum staff, starting in October 2026, with a course hub that reads session status, summaries and slide links from a Google Sheet.",
    year: "2026",
    role: "Solo: curriculum, materials, hub development",
    tags: ["JavaScript", "HTML/CSS", "Google Sheets", "CSV", "Vercel"],
    stat: "7 sessions · 14 hours",
    overview:
      "I planned a **seven-session, 14-hour course** on AI basics, coding and current AI trends for museum staff, scheduled on weekday evenings from October to November 2026. Each session is one hour of theory and one hour of solo practice with a finished example, step-by-step tasks and an answer sheet. It runs from how LLMs work and what must never be typed into them, through prompting and RAG, training and bias, computer vision and how the museum's own exhibits work, to a first Python program, an exhibit guide page built with AI, and AI trends and ethics.\n\nThe course hub is a static site with no server. **Session dates, status, summaries and slide links come from a Google Sheet published as CSV**, so updating the course means editing the sheet rather than redeploying. I wrote a small CSV parser that keeps quoted commas and line breaks in long summaries, with a Node test. A 22-term vocabulary worksheet on the hub is self-scored, and **answers stay in each person's browser**.\n\nThe hub is deployed, and the first session is on October 7, 2026.",
    highlights: [
      "Planned a **7-session, 14-hour** staff course: one hour of theory and one hour of solo practice each session.",
      "**Google Sheet as the content source**: a published CSV drives session status and summaries with no redeploys.",
      "CSV parser for quoted commas and multi-line cells, covered by a Node test.",
      "Self-scored 22-term worksheet that keeps answers on the device only.",
    ],
  },
  // 기록(볼트 노트) 없음, 현장 검증 전 프로토타입. 정확도 수치는 쓰지 않는다. 저장소 비공개.
  {
    slug: "robot-ar-tour",
    tier: "side",
    title: "Build-Your-Robot AR Tour",
    category: "Computer Vision · Mobile Web Prototype",
    categories: ["AI", "Web"],
    kicker: "Exhibit stamp tour · museum assignment · prototype",
    desc: "A mobile web prototype for a family stamp tour: visitors point their phone at robot exhibits to collect seven robot parts, compare each with the human body, and assemble a robot of their own. Exhibit recognition runs in the browser, checked with an evaluation harness I built.",
    year: "2026",
    role: "Solo: planning, development, evaluation",
    tags: ["TensorFlow.js", "MobileNet", "JavaScript", "Service Worker", "Wake Lock API", "Vercel"],
    href: "https://raim-findmy.vercel.app",
    image: "/portfolio_images/projects/robot-ar-tour.jpg",
    overview:
      "A stamp-tour web app for all ages, built around the robot exhibits of the Seoul Robot & AI Science Museum. Visitors scan an exhibit with their phone camera to collect one of **seven robot parts** (brain, heart, arm, leg, muscle, joint, eye) from nine exhibits, and each part opens a card comparing it with the human body. The two exhibits that hold several parts, the Alice humanoid and Spot, let the visitor pick one, and a **bipartite-matching check** warns before a pick makes the set impossible to finish. Collecting all seven plays an assembly animation and lets the visitor name, color and save their robot card.\n\nRecognition runs in the browser with TensorFlow.js. A lightweight MobileNet turns each camera frame into an embedding, which is scored against 31 reference photos by cosine similarity, and an exhibit is confirmed only after consecutive frames clear a confidence gate. If the model, the camera or the confidence fails, the app falls back to picking the exhibit from a list, so the tour never dead-ends.\n\nI built an **evaluation harness** instead of trusting a single number. An early leave-one-out result turned out to be inflated by near-duplicate photos, and re-measured with augmented images, recognition is not yet reliable enough on its own. The fix is more reference photos, so I added a staff curator mode that captures training and display images on site.\n\nTo cover unstable museum Wi-Fi, the model and libraries are self-hosted and a **service worker** serves app code network-first and model files cache-first. Progress stays in local storage with no login, and the Wake Lock API keeps the screen on while scanning. Built as a prototype in June and July 2026; on-device testing is the next step on its roadmap.",
    highlights: [
      "**Stamp-tour logic**: nine exhibits, seven parts, one part per exhibit, with a bipartite-matching check that warns before a choice blocks completion.",
      "**In-browser recognition**: MobileNet embeddings scored by cosine similarity against 31 reference photos, confirmed over consecutive frames, with a list fallback.",
      "**Measured, not assumed**: my own harness caught an accuracy figure inflated by near-duplicate photos, which led to an on-site curator mode for more reference images.",
      "**Offline-ready**: self-hosted model and libraries, service worker caching, and local progress with no login.",
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

// 여기 적는 항목은 전부 위 프로젝트에서 실제로 쓴 것만 둔다.
// 다 적으면 41개가 되어 훑기가 어려워지므로, 그 기술이 없으면 프로젝트를
// 설명할 수 없는 것만 남긴다 (누구나 쓰는 협업 도구, 한 번만 쓴 브라우저
// API 등은 뺀다). 6개 그룹 = 2열 그리드 3행.
export const skillGroups: SkillGroup[] = [
  {
    key: "ai",
    title: "AI & Computer Vision",
    capability: "I build the data pipelines and in-browser training that vision models need, and wire AI APIs into shipped products.",
    items: [
      "Python",
      "TensorFlow.js",
      "MobileNet v2",
      "VGG16 / CNN",
      "OpenAI API",
    ],
  },
  {
    // 모델을 만드는 일과 데이터를 만드는 일은 성격이 달라 따로 둔다.
    // 근거: Select Star 의 ETRI VQA 데이터셋 구축·검수, Doctor-Green 의
    // AI Hub 다운로더·라벨 변환과 그룹 인식 층화 분할(크롭 39,889장).
    key: "data",
    title: "Data & Datasets",
    capability: "I build and check the datasets models learn from.",
    items: [
      "VQA Datasets",
      "Dataset QA",
      "AI Hub",
      "Stratified Splits",
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
      "Tailscale / WireGuard",
    ],
  },
  {
    key: "hw",
    title: "Hardware · IoT · Robotics",
    capability: "I connect sensors and machines to the web.",
    items: [
      "ESP32",
      "MicroPython",
      "Arduino / C++",
      "Sensors",
    ],
  },
  {
    key: "edu",
    title: "Planning & Education",
    capability: "I turn complex tech into experiences anyone can learn.",
    items: [
      "Product Planning (PM)",
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
    period: "2026.03 - Present",
    // 행사 보도 링크(본인 실명은 기사에 없음). 사진은 뉴스1 저작물이라 싣지 않고 링크만 건다.
    press: { label: "AI Future Camp coverage (News1)", href: "https://www.news1.kr/photos/8067724" },
    gallery: [
      "/portfolio_images/experience/docent_1.JPG",
      "/portfolio_images/experience/docent_2.jpg",
      "/portfolio_images/experience/docent_3.jpg",
    ],
    points: [
      "Research, build, and run the interactive AI education web apps visitors use live on the exhibition floor; the Art Lab ran there from June to August 2026 and generated 14,328 images, 9,865 of them in July.",
      "Design education programs end to end: a smart-farm curriculum commissioned by Yangpyeong Education Office, built with its full server and web-app stack, taught as a demo class to 5 high-school students in August 2026, with the 15-student cohort class scheduled for October 2026.",
      // 메타버스 전시는 어느 정도 완성되면 다시 추가한다 (data.ts 의 raim-metaverse 주석 블록과 함께)
      "Ship the internal ops tooling behind them, such as the staff scheduler.",
      "Guide exhibitions bilingually (KO / EN) and support the multipurpose education rooms.",
      // 출처: 뉴시스 2026-08-23 https://www.newsis.com/view/NISX20260823_0003758707
      // (기사에 본인 실명은 없음 — 행사 규모·주최만 기사로 확인되는 사실이다)
      "Run the Picabot robot-arm drawing studio, a regular 30-minute hands-on AI session for visiting school groups; led its extended 50-minute class for the 100-student KT × Seoul City AI Future Camp in August 2026, co-hosted with KT, the Seoul Metropolitan Government, and Seoul Dobong Police Station.",
    ],
  },
  {
    org: "Select Star",
    site: "https://selectstar.ai/",
    role: "VQA Dataset Builder & QA Reviewer",
    period: "2025.11 - 2026.01 · Project contract",
    points: [
      "Built and reviewed visual question-answering (VQA) datasets for LLM training on an ETRI (Electronics and Telecommunications Research Institute) project, including complex 3-hop reasoning Q&A sets.",
      "Checked each question–response pair against the project's correction guidelines for grammatical and semantic accuracy, and rewrote the assistant answers that did not follow logically from the user's question.",
      "Sustained about 2.5× the team's average throughput while holding accuracy.",
    ],
  },
  {
    org: "Ministry of Science and ICT",
    site: "https://www.msit.go.kr/index.do",
    role: "Youth Intern",
    period: "2025.04 - 2025.08",
    points: [
      "Supported the revision of the national Pay-TV survey and drafted Broadcasting Act review materials.",
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
  // 화면 캡처처럼 잘리면 안 되는 이미지는 "contain" (기본은 사진용 "cover")
  photoFit?: "cover" | "contain";
};

export const activities: Activity[] = [
  {
    period: "2026.07 - Present",
    title: "KB LA School (Middle School)",
    role: "Middle-school mentor · 2x/week, 80 min · outside work hours",
    desc: "Dedicated mentoring for middle-school students in the KB LA School program.",
    photos: [],
  },
  {
    period: "2026.03 - 2026.08",
    title: "Gwangyang AI Smart i-Kium",
    role: "Instructor · Grade-3 math & English · 1x/week · outside work hours",
    desc: "Taught Grade-3 math and English classes in Gwangyang City's AI Smart i-Kium program.",
    photos: [],
  },
  {
    period: "2026.02 - Present",
    title: "Geuruteogi Learning Mentoring",
    role: "University mentor · 2x/week, 90 min · outside work hours",
    desc: "A university mentoring program where I coach teenagers on study habits and self-directed learning, tailored to each mentee's level.",
    photos: [],
  },
  {
    period: "2025.07",
    title: "Youth SW-Donghaeng Hackathon",
    role: "University mentor · time coaching",
    desc: "Served as a university mentor on time coaching, keeping youth teams on schedule through a one-day software hackathon.",
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
    photos: [],
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
    photos: [],
  },
  {
    period: "2024.06 - 2024.08",
    title: "LS Dream Science Class, 20th",
    role: "University mentor · elementary science experiments",
    desc: "Ran hands-on science experiments for elementary students as a university mentor.",
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
    photoFit: "contain",
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
      "YAKMOA, a medication-management service for digitally vulnerable users.",
    // 시상식 화면 — 함께 입선한 다른 팀의 대표자 실명은 가려서 올린다
    // (본인 것이 아닌 개인정보를 공개 사이트에 싣지 않기 위해)
    photos: ["/portfolio_images/awards/gh_buildup_prize.jpg"],
  },
  {
    // 2025.09~10 공백(대회 준비 기간) 설명은 이력서/CV 타임라인에서 다룬다.
    year: "2025",
    title: "Science Museum & Community AI Hackathon",
    detail: "Excellence Award (2nd place, finals): AI docent for museum-community co-prosperity",
    result: "Excellence Award",
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
    title: "2024 Chungnam Generative AI Technology Start-up Idea Competition",
    detail: "Encouragement Award (장려상): VGG16 plant-disease diagnosis app",
    result: "Encouragement Award",
    role: "PM & Developer",
    topic:
      "The 2024 VGG16 version of Doctor-Green (a plant-disease diagnosis app), pitched as a generative-AI start-up idea. Hosted by the Ministry of Science and ICT, the National IT Industry Promotion Agency (NIPA) and Chungnam Techno Park; organized by Sun Moon University.",
    photos: [
      "/portfolio_images/awards/award4_chungnam_1.jpg",
      "/portfolio_images/awards/award4_chungnam_2.jpg",
    ],
    relatedSlug: "doctor-green",
  },
  {
    year: "2024",
    title: "HKNU HK StartUP&GO Audition",
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
