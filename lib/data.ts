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
  sub: "I plan, ship, and run them end to end — on museum floors, in classrooms, and on real hardware — and measure how they're used.",
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
    "AI product engineer. I build ML-backed products end to end — from sensor to shipped interface — and keep them running where real users are: exhibition floors, classrooms, and hardware in the field.",
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
      v: "Hankyong National University (2022 – 2027 expected · completing the degree while working full-time)\nRutgers University · Winter Intensive English (2025)\nCheongwon Girls' High School (2019 – 2022)",
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
      { text: "product engineer who takes ML from dataset to deployed interface", b: true },
      { text: ". I care most about the moment an idea becomes something people actually use — and understand. On most of my projects I've owned the work " },
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
      { text: "That software mostly lands in places people stand in. At the Seoul Robot & AI Science Museum my Art Lab runs live on the exhibition floor, generating " },
      { text: "3,049 images in June 2026 and over 8,000 in July", b: true },
      { text: ", with volume measured through its own backend. Doctor-Green reaches down to " },
      { text: "ESP32 sensor nodes", b: true },
      { text: ", and with ATO I took it all the way to the hardware: firmware, servos, and an LCD face." },
    ],
    [
      { text: "The other half of the job is " },
      { text: "making it understood", b: true },
      { text: ". The Yangpyeong Education Office commissioned my smart-farm program — curriculum, server, and web app — which runs with a 15-student cohort in October 2026; at the museum I guide visitors in Korean and English, and I mentor students week to week. " },
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
    n: "01",
    tier: "major",
    title: "Smart-Farm Education Program",
    category: "Education Program",
    categories: ["AI", "IoT", "Education"],
    kicker: "Museum × Yangpyeong Education Office",
    desc: "A hands-on program where students experience IoT smart farming and AI crop diagnosis. Commissioned by Yangpyeong Education Office; planned and built solo (full server and web-app environment), still in development ahead of classes for a 15-student high-school cohort in October 2026.",
    year: "2026",
    role: "Solo: planning & development",
    tags: ["TensorFlow.js", "MobileNet v2", "Weather API", "Flask", "MicroPython", "Supabase", "IoT"],
    href: "https://doctor-green-edu.vercel.app/",
    repo: "https://github.com/henna2022/smartfarm-device",
    stat: "15-student cohort · Oct 2026",
    overview:
      "A hands-on education program commissioned by the Yangpyeong Education Office through the museum, where students experience an IoT smart farm and AI crop diagnosis first-hand. I planned the program and built everything it needed solo — **a Python/Flask server, MicroPython firmware on the sensor devices, and the web app** — designed so students watch data accumulate and **sensor values change in real time**, with their own eyes. The program is **still in development**, scheduled to run in **October 2026** as a class for a **cohort of 15 Yangpyeong high-school students**, selected by application.\n\nA class runs as a guided flow: students enter the virtual lab, pick a room at the hub, and move through four STEPs (weather, AI vision, IoT, and camera), watching data load into the lab's Supabase database before finishing with 'my app complete' and a live hardware demo. A location-based weather API ties the lessons to real growing conditions, and students **train a model themselves inside the browser** — transfer learning with TensorFlow.js on a self-hosted MobileNet v2 feature extractor — so the epoch and loss numbers they watch are the real values from their own run.\n\nThe program is a museum × education-office commission: an exhibition-linked education case **planned and built end to end by one person**.",
    highlights: [
      "Integrated a **location-based weather API** to tie lessons to real growing conditions.",
      "Students run **real transfer learning in the browser** — TensorFlow.js on a self-hosted MobileNet v2 — and read epoch and loss straight off their own training run.",
      "Students watch sensor values **load and change in real time** in the lab server's database.",
      "Designed the class flow: open lab → room-picker hub → 4 STEPs (weather · AI vision · IoT · camera) → Supabase → app complete → live demo.",
      "Commissioned by the Yangpyeong Education Office through the museum; **planned and built solo**, including the full server and web-app environment.",
      "**Scheduled for October 2026**: a class for a 15-student cohort of Yangpyeong high-school students, selected by application. Currently in development.",
    ],
    flow: ["IoT sensors", "Weather API", "Server", "Student web app"],
    flowImage: {
      light: "/portfolio_images/flow/smart-farm-education-flow-light.svg",
      dark: "/portfolio_images/flow/smart-farm-education-flow-dark.svg",
    },
    image: "/portfolio_images/projects/smartfarm-edu-weather-en.jpg",
    gallery: [
      "/portfolio_images/projects/smartfarm-edu-hub-en.jpg",
      "/portfolio_images/projects/smartfarm-edu-weather-en.jpg",
      "/portfolio_images/projects/smartfarm-edu-vision-en.jpg",
      "/portfolio_images/projects/smartfarm-edu-sensor-en.jpg",
      "/portfolio_images/projects/smartfarm-edu-camera-en.jpg",
      "/portfolio_images/projects/smartfarm-edu-app-en.jpg",
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
    desc: "A smart-farm platform pairing live IoT environment monitoring and control with a crop-disease diagnosis model I'm rebuilding from the data up. Built solo end to end, from ESP32 sensor nodes to the deployed Next.js dashboard.",
    year: "2024 - 2026",
    role: "2024 prototype: team MAKENEW (PM & dev) · 2026 rebuild: solo, planning to deployment",
    tags: ["Next.js 16", "TypeScript", "Supabase", "ESP32", "Python", "Vercel"],
    href: "https://doctor-green-nine.vercel.app/",
    repo: "https://github.com/henna2022/doctor-green",
    image: "/portfolio_images/projects/doctorgreen_app.png",
    stat: "End-to-end solo",
    overview:
      "Doctor-Green is a smart-farm platform that brings crop-disease diagnosis and IoT environment control onto a **single web platform**, so both live on one screen. I **planned and built the whole pipeline solo, from sensor to dashboard**.\n\nIt grew out of a VGG16 plant-disease-diagnosis app I built with team MAKENEW, which won the **Excellence Award at the 2024 ICT·SW Women's Start-up Competition**. That model never reached usable accuracy, so in 2026 I rebuilt the project as a full smart-farm platform and restarted the diagnosis model from the data up.\n\nThe IoT half runs today. ESP32 sensor nodes post environment data **directly to Supabase over Wi-Fi — no relay server** — and a Next.js web app visualizes it with 5-second polling. Actuators such as LEDs and fans are controlled through a **desired-state pattern**: the app only writes the target state, the ESP32 polls it and drives the hardware, and optimistic UI absorbs the round-trip delay. It is deployed on Vercel as a live demo.\n\nThe diagnosis model is **still at the data stage**. AI Hub blocks downloads from non-Korean IPs, so I wrote a Windows-side downloader that calls their API directly, merges the split archives, restores Korean filenames, and converts the JSON labels to YOLO-format boxes. From 5 disease classes × 1,000 images I extracted **39,889 lesion crops** (train 32,155 / val 4,326 / test 3,408) using a **group-aware stratified split**, so crops from the same source photo never straddle train and validation. **Training the crop classifier — ConvNeXt-Tiny or EfficientNetV2-S — is the next step; there are no results yet.**",
    highlights: [
      "**Data flow built end to end**: ESP32 posting directly to Supabase over Wi-Fi → Next.js dashboard on 5-second polling.",
      "**Desired-state actuator control** (LED, fan): the app writes target state, the device polls and applies it, optimistic UI covers the latency.",
      "Worked around AI Hub's non-Korean-IP download block with a **Windows-side downloader I wrote**: direct API calls, split-archive merge, Korean filename restore, and JSON → YOLO-format label conversion.",
      "Built the training set myself: **39,889 lesion crops** (train 32,155 / val 4,326 / test 3,408) across 5 disease classes, with a **group-aware stratified split** so crops from one photo never cross the train/validation boundary.",
      "**Classifier training is the next step** (ConvNeXt-Tiny / EfficientNetV2-S). The 2024 VGG16 attempt never reached usable accuracy, so the model is being rebuilt from the data up.",
      "Next.js 16 + TypeScript + Tailwind web app deployed on Vercel as a live demo.",
    ],
    flow: ["ESP32 direct POST", "Supabase", "Next.js · 5s polling", "Desired-state control"],
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
    n: "01",
    tier: "side",
    title: "Raimi's AI Art Lab",
    category: "Web App · Education",
    categories: ["AI", "Web", "Education"],
    kicker: "Live @ Seoul Robot & AI Science Museum",
    desc: "A guided prompt builder where visitors co-create AI artwork with the museum character Raimi. Running live at the museum, it generated 3,049 images in June 2026 and over 8,000 in July.",
    year: "2026",
    role: "Planning · development · operations",
    tags: ["JavaScript", "OpenAI API", "Vercel Serverless", "Supabase", "Cloudflare R2", "PWA"],
    repo: "https://github.com/henna2022/raim-ai-artstudio",
    image: "/portfolio_images/projects/artlab-mode-en.jpg",
    stat: "3,049 → 8,000+ images/mo",
    overview:
      "Visitors compose a prompt step by step with the museum character Raimi, choosing what they want to draw, and an AI generates the artwork. Designed so young visitors learn the principles of prompt engineering through play, with a **10-step (+5 advanced) choice-based prompt builder** that shows how a prompt is put together.\n\nThe off-the-shelf GPT service used before would stop responding for no identifiable reason while visitors were using it. This is a hands-on exhibit, so a frozen screen meant the station sat unusable until staff intervened. After moving to a custom web app and serverless backend, **it has not frozen once**; the backend calls the OpenAI image-generation API, auto-watermarks every image with the museum logo, stores images on Cloudflare R2, and keeps generation metadata and stats in Supabase. Visitors take their creations home instantly via QR code, and because it runs as a web app, the exhibition kiosk could be locked down to a single full-screen browser.\n\nIt now runs live at the museum: **3,049 images in June 2026, rising above 8,000 in July**, the museum's peak season — with **generation volume measured in the app's own backend**.",
    highlights: [
      "**10-step (+5 advanced) choice-based prompt builder** that teaches prompt composition through play, designed for all-ages museum visitors.",
      "**Ended the unexplained freezes** of the prior off-the-shelf GPT service by moving to a custom web app and backend — none since the switch.",
      "Serverless backend on the OpenAI image-generation API, deployed on Vercel.",
      "**Auto-watermarks** every image with the museum logo, storing **images on Cloudflare R2 and generation stats in Supabase**.",
      "QR-code takeaway for visitors' creations; running as a web app let the exhibition kiosk be locked to a single full-screen browser.",
      "**3,049 images in June 2026, rising above 8,000 in July** (the museum's peak season), with **generation volume measured in the app's own backend**.",
    ],
    flow: ["10-step prompt builder", "OpenAI API", "Auto-watermark", "R2 + Supabase"],
    flowImage: {
      light: "/portfolio_images/flow/raimi-art-lab-flow-light.svg",
      dark: "/portfolio_images/flow/raimi-art-lab-flow-dark.svg",
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
        "Art Lab admin dashboard: daily image generation over the last 30 days (30 June – 28 July 2026), peaking above 700 in a single day.",
    },
  },
  {
    slug: "raim-staff-platform",
    n: "02",
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
    n: "03",
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
    n: "04",
    tier: "side",
    title: "Raimi's AI Language Lab",
    category: "Language-AI Education Game",
    categories: ["Web", "Education"],
    kicker: "Hands-on NLP mini-games",
    desc: "Five touch mini-games where visitors experience how language AI learns — tokenization, embeddings, word order, attention, and next-word prediction. Runs entirely in the browser, no server required.",
    year: "2026",
    role: "Planning · development",
    tags: ["JavaScript", "HTML/CSS", "PWA", "Offline-first"],
    repo: "https://github.com/henna2022/raim-ai-studio",
    image: "/portfolio_images/projects/langlab-home-en.jpg",
    overview:
      "A game-style web app where visitors explore how a language AI actually learns — by playing. With the museum character Raimi they work through **five touch mini-games**, each built on a real NLP concept: **tokenization** (slicing a sentence into pieces), **embeddings** (sorting words by meaning), **word order**, **attention** (spotting the word that matters), and **next-word prediction** with live probability bars.\n\nThe full flow (start, stamp-based lesson menu, play, completion) is plain JavaScript with no framework and **no server**; it supports **both Korean and English** (with browser auto-translate blocked so the exhibition copy stays intact) and ships as an **offline-first PWA** on the 3 exhibition tablets it runs on. Kiosk behavior is handled in-app: after 2 idle minutes it resets to the start screen for the next visitor.\n\nA hidden, PIN-gated staff panel tracks per-device usage and exports reports to Excel through a **dependency-free .xlsx writer**, with a Node regression test covering the stats logic.",
    highlights: [
      "**5 NLP concepts as touch mini-games**: tokenization, embeddings, word order, attention, and next-word prediction with live probability bars.",
      "Designed and built the full game flow: start, stamp-based lesson menu, play, completion.",
      "**Runs entirely in the browser** — plain JavaScript, no framework, no server.",
      "**Bilingual Korean / English**, with browser auto-translate blocked for exhibition reliability.",
      "**Offline-first PWA** on the **3 exhibition tablets**, with a 2-minute idle reset for kiosk turnover.",
      "PIN-gated staff stats panel with a **dependency-free Excel (.xlsx) export**, covered by a Node regression test.",
    ],
    flow: ["5 NLP mini-games", "Plain JS · no server", "Offline PWA kiosk"],
    flowImage: {
      light: "/portfolio_images/flow/raimi-language-lab-flow-light.svg",
      dark: "/portfolio_images/flow/raimi-language-lab-flow-dark.svg",
    },
    gallery: [
      "/portfolio_images/projects/langlab-home-en.jpg",
      "/portfolio_images/projects/langlab-intro-en.jpg",
      "/portfolio_images/projects/langlab-token-en.jpg",
    ],
  },
  // 포트폴리오에서 임시 제외 (RAIM AI Photo Booth) — 되살릴 때 주석을 풀고
  // 되살릴 때 side 프로젝트 번호를 다시 매긴다.
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
    slug: "ato-care-robot",
    n: "05",
    tier: "side",
    title: "ATO Care Robot",
    category: "AI Healthcare · Care Robot",
    categories: ["AI", "Robotics"],
    kicker: "Companion & medication-care robot",
    desc: "A rabbit-shaped companion robot with animated LCD eyes that react to touch and to someone approaching. Built end to end, from circuits and firmware to a 3D-printed body, and currently being extended with YAKMOA, a medication-care service.",
    year: "2026",
    role: "Robot: solo build · YAKMOA service: 2-person team (PM & Dev)",
    tags: ["ESP32", "Arduino / C++", "GC9A01 LCD", "Servo / PIR / Touch", "3D Printing"],
    stat: "GH start-up prize",
    overview:
      "ATO is a rabbit-shaped emotional companion robot for single-person households and seniors. Two round displays act as expressive 'eyes' that show emotion, and sensors detect when someone approaches or pets it, triggering reactions.\n\nAn ESP32 drives the dual GC9A01 round LCDs for eye-expression animations such as blinking and gaze shifts, integrated with PIR proximity detection, capacitive petting touch, DFPlayer audio, and servo-driven ear and arm motion. The build covers the **entire process: circuit design, firmware, a 3D-printed body, and microfiber cover sewing patterns**.\n\nOn top of this, ATO is being extended with YAKMOA, an AI feature designed to recognize medicines and manage dose schedules, taking the robot from companionship into medication care. YAKMOA was designed as a medication-management service for digitally vulnerable users and people with disabilities, and **won a prize at the GH Youth Build-Up Start-up Competition**. The robot itself was **built solo end to end**; the YAKMOA service was planned and commercialized as the 2-person team MAKENEW, where I was PM & developer. The robot is currently a **Phase 1 prototype**, with medication care being integrated.",
    highlights: [
      "Eye-expression animations (blinking, gaze) on dual GC9A01 round LCDs driven by an ESP32.",
      "Integrated PIR proximity detection, capacitive petting touch, DFPlayer audio, and servo ear/arm motion.",
      "Robot built **100% solo** across the entire process: circuit design, firmware, a 3D-printed body, and microfiber sewing patterns.",
      "Integrating **YAKMOA** (AI medicine recognition and dose management) to **combine companionship with medication care in one robot** — integration in progress.",
      "YAKMOA designed as a medication-management service for digitally vulnerable users and people with disabilities; **won a prize at the GH Youth Build-Up Start-up Competition** (team MAKENEW).",
      "For the YAKMOA service, worked as the 2-person team MAKENEW: as **PM & developer**, led service planning, user research, and authored the business plan & pitch deck.",
      "Currently a **Phase 1 prototype**, integrating medication care.",
    ],
    flow: ["Sensors (PIR / touch)", "ESP32 / Arduino", "Servo + LCD expression", "YAKMOA medication care"],
    flowImage: {
      light: "/portfolio_images/flow/ato-care-robot-flow-light.svg",
      dark: "/portfolio_images/flow/ato-care-robot-flow-dark.svg",
    },
  },
  {
    slug: "exhibit-auto-recovery",
    n: "06",
    tier: "side",
    title: "Exhibit Auto-Recovery",
    category: "Ops Automation · Reliability",
    categories: ["Ops", "Web"],
    kicker: "Exhibit uptime · self-initiated",
    desc: "A recovery system for a museum AI exhibit that used to need one specific person, at one specific machine, every time it froze. It now restarts itself within a minute of a detectable failure, and any staff member can recover it from their own phone in a single tap.",
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
      "Watchdog **restarts the exhibit within a minute** of a crash or hang, with two-stage confirmation against false positives and back-off to prevent restart loops on deeper faults.",
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
      "3D Printing",
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
    period: "2026.03 - Present · Full-time",
    gallery: [
      "/portfolio_images/experience/docent_1.JPG",
      "/portfolio_images/experience/docent_2.jpg",
      "/portfolio_images/experience/docent_3.jpg",
    ],
    points: [
      "Research, build, and run the interactive AI education web apps visitors use live on the exhibition floor; the Art Lab alone went from 3,049 images in June 2026 to over 8,000 in July.",
      "Design education programs end to end: a smart-farm curriculum commissioned by Yangpyeong Education Office, built with its full server and web-app stack, with classes upcoming for a 15-student high-school cohort.",
      // 메타버스 전시는 어느 정도 완성되면 다시 추가한다 (data.ts 의 raim-metaverse 주석 블록과 함께)
      // 포토부스가 재개되면 "a staff scheduler and an AI photo booth."로 되돌린다 (data.ts 의 raim-photo-booth 주석 블록과 함께)
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
    role: "Middle-school mentor · 2x/week, 80 min · outside work hours",
    desc: "Dedicated mentoring for middle-school students in the KB LA School program.",
    photos: [],
  },
  {
    period: "2026.03 - Present",
    title: "Gwangyang AI Smart i-Kium",
    role: "Instructor · Grade-3 math & English · 1x/week · outside work hours",
    desc: "Teaching Grade-3 math and English classes in Gwangyang City's AI Smart i-Kium program.",
    photos: [],
  },
  {
    period: "2026.02 - Present",
    title: "Geuruteogi Learning Mentoring",
    role: "University mentor · 2x/week, 90 min · outside work hours",
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
    // 시상식 화면 — 함께 입선한 다른 팀의 대표자 실명은 가려서 올린다
    // (본인 것이 아닌 개인정보를 공개 사이트에 싣지 않기 위해)
    photos: ["/portfolio_images/awards/gh_buildup_prize.jpg"],
    relatedSlug: "ato-care-robot",
  },
  {
    // 2025.09~10 공백(대회 준비 기간) 설명은 이력서/CV 타임라인에서 다룬다.
    year: "2025",
    title: "Science Museum & Community AI Hackathon",
    detail: "2nd place (finals): AI docent for museum-community co-prosperity",
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
    detail: "Encouragement Award (장려상): VGG16 plant-disease diagnosis app",
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
