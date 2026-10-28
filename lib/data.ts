export const person = {
  name: "Juwon Lee",
  hangul: "이주원",
  role: "Education planning & development",
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
  sub: "I plan, deploy and operate them myself on museum floors, in classrooms and on real hardware, and measure how they're used.",
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
  { t: "w", w: "museum" },
  { t: "w", w: "visitors" },
  { t: "w", w: "and" },
  { t: "w", w: "students." },
];

// ─── About ──────────────────────────────────────────────────────────────────
// 좌: 초상 카드(사진·태그라인·이력 요약·다운로드) / 우: 인용문 + 산문(더 보기).
// 산문은 문단 = 조각 배열. `b: true` 인 조각만 굵게 렌더한다.
export type ProseSegment = { text: string; b?: boolean };
export type ProseParagraph = ProseSegment[];
export const about = {
  photo: "/portfolio_images/profile/juwonlee.jpg",
  tagline:
    "I plan education programs, build the AI products behind them from sensor to interface, and keep them running where real users are: exhibition floors, classrooms and hardware in the field.",
  // 카드 하단 요약 — 정체성과 "지금"만 짧게. 나머지 이력은 아래 facts 로 내린다.
  info: [
    {
      icon: "🎓",
      title: "Hankyong National University",
      lines: [
        "Plant Life & Environment",
        "Software Convergence, double major",
      ],
    },
    {
      icon: "🏛️",
      lines: ["Seoul Robot & AI Museum · Education R&D · Developer (current)"],
    },
    { icon: "📍", lines: ["Seoul, KR"] },
  ],
  // '더 보기' 안쪽에 붙는 부차적 이력·자격 (카드가 한 화면을 넘지 않도록 분리)
  facts: [
    {
      k: "Education",
      v: "Hankyong National University (2022–2027.02, expected to complete graduation requirements; graduation deferred)\nRutgers University · Winter Intensive English (2025)\nCheongwon Girls' High School (2019–2022)",
    },
    {
      k: "Languages & Certifications",
      v: "Korean (native) · English (fluent) · TOEIC Speaking AL · OPIc AL",
    },
  ],
  // 인용문 — `em` 로 감싼 조각은 액센트 하이라이트 처리
  quote: [
    { text: "“I " },
    { text: "teach", em: true },
    { text: " with the " },
    { text: "software I build", em: true },
    { text: ".”" },
  ],
  // 앞 2문단은 항상 노출, 나머지는 '더 보기' 안쪽.
  // `b: true` 조각은 굵게 — 훑어봐도 핵심 문장이 먼저 눈에 들어오게 한다.
  prose: [
    [
      { text: "Hi, I'm Juwon Lee, an " },
      { text: "education R&D developer who plans education programs and builds AI into working products", b: true },
      { text: ". On most of my projects I've owned the work " },
      { text: "from planning through deployment", b: true },
      { text: "." },
    ],
    [
      { text: "I specialize in " },
      { text: "web and application development", b: true },
      { text: ". I use Next.js and React for the frontend, and Supabase, Firebase and serverless functions for the backend. I integrate " },
      { text: "AI as a working feature", b: true },
      { text: ", for example an in-browser MobileNet v2 module that students train themselves. The OpenAI image backend I built for Raimi's AI Art Lab generated 14,328 images on the Seoul Robot & AI Museum's exhibition floor from June to August 2026." },
    ],
  ] as ProseParagraph[],
  proseMore: [
    [
      { text: "Of those, " },
      { text: "9,865 were generated in July", b: true },
      { text: " (counted by the app's own backend). My smart-farm platform, Doctor-Green, includes " },
      { text: "ESP32 sensor nodes", b: true },
      { text: "." },
    ],
    [
      { text: "For the smart-farm class the Yangpyeong Education Office commissioned through the museum, I wrote the curriculum and teach it on a lab platform I built from my own Doctor-Green work. I taught it as a demo class to " },
      { text: "5 high-school students in August 2026", b: true },
      { text: ", and it runs with " },
      { text: "a 15-student cohort in October 2026", b: true },
      { text: ". At the museum I guide visitors in Korean and English, and I mentor students week to week." },
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
  imageTall?: string;
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

const allProjects: Project[] = [
  // ── Major projects ──
  {
    slug: "smart-farm-education",
    tier: "major",
    title: "Smart-Farm Education Program",
    category: "Education Program",
    categories: ["AI", "IoT", "Education"],
    kicker: "Museum × Yangpyeong Education Office",
    desc: "A hands-on program where students try IoT smart farming and AI crop diagnosis. The Yangpyeong Education Office commissioned it, and I planned and built it solo, server and web app included. It was taught as a demo class to 5 high-school students in August 2026, ahead of the 15-student cohort in October 2026.",
    year: "2026",
    role: "Solo: planning & development",
    tags: ["TensorFlow.js", "MobileNet v2", "Next.js", "Supabase", "ESP32", "Arduino / C++", "Weather API"],
    href: "https://doctor-green-edu.vercel.app/",
    stat: "15-student cohort · Oct 2026",
    overview:
      "A hands-on education program, commissioned by the Yangpyeong Education Office through the museum, where students work with an IoT smart farm and AI crop diagnosis. **It was taught as a demo class to 5 high-school students in August 2026** and is scheduled to run in **October 2026** for a **cohort of 15 Yangpyeong high-school students**, selected by application.\n\nI planned and built it solo: **a Next.js web app with server API routes on Vercel, and Arduino (C++) firmware for the class's 15 ESP32 student boards (one per student), which write sensor readings straight to Supabase**. Students move through four STEPs (weather, AI vision, IoT and camera) and watch **sensor values change in real time**. In the capstone they code if-then automation rules and run them on the real board. They also **train a model themselves inside the browser** with TensorFlow.js transfer learning on MobileNet v2, so the epoch and loss numbers they watch come from their own run.",
    highlights: [
      "**Taught as a demo class to 5 high-school students in August 2026** on the museum's education floor; the full class is **scheduled for October 2026** with a 15-student cohort of Yangpyeong high-school students, selected by application.",
      "Commissioned by the Yangpyeong Education Office through the museum; **planned and built solo**, server and web app included.",
      "Students **train a model in the browser** with TensorFlow.js transfer learning on MobileNet v2 and read epoch and loss from their own run.",
      "Students watch sensor values from the 15 ESP32 boards **change in real time** in the lab database.",
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
    slug: "raim-en",
    tier: "major",
    title: "RAIM EN: English Tour Booking",
    category: "Web Service · Reservations",
    categories: ["Web", "Ops"],
    kicker: "Seoul Robot & AI Museum · live since October 2026",
    desc: "An English guide and tour-booking site that the museum adopted as its official booking channel for foreign visitors. They book with an email address instead of the Korean mobile identity verification that Seoul's public reservation system requires. Online seats for foreign visitors went from none to 130 a week.",
    year: "2026",
    role: "Solo: planning, development, deployment",
    tags: ["Node.js", "Express", "SQLite", "EJS", "Fly.io"],
    href: "https://visitseoulraim.com",
    image: "/portfolio_images/projects/raim-en-en.jpg",
    stat: "130 online seats a week",
    overview:
      "The museum adopted this site as its official booking channel for foreign visitors. Guided exhibition tours at the museum are booked through Seoul's public reservation system, which requires identity verification with a Korean mobile number, so foreign visitors **could not book online at all** and complaints followed. On this site they book with an email address instead. For launch, the museum opens sessions 1, 3, and 6 of the Korean-guided Permanent Exhibition tour with 10 seats each, plus a Wednesday English-guided session with 10 more, up to 5 people per booking: **130 seats a week** that foreign visitors can now book online, where before they had none.\n\nThe museum decides each month which sessions open online and how many seats they have, and **each request waits for staff approval**. A pending request already holds its seat, so a session cannot be overbooked, and a cancellation returns the seat on its own. Online booking closes the day before the visit, leaving same-day seats to visitors on site. Visitors get a request-received email right away and a confirmation email with a calendar file once staff approve. They look up or cancel with their booking code and email.\n\nIn the admin interface, staff approve requests by session, check bookings, mark visits and no-shows, and view booking and traffic statistics (where visitors came from and time spent on each page). They can export the statistics to Excel. Personal data is deleted automatically 90 days after the visit (no-show records are kept longer), and visit statistics are counted on the server without storing IP addresses.",
    highlights: [
      "Foreign visitors book tours online with an email address instead of the **Korean mobile identity check** the city reservation system requires.",
      "**Adopted as the museum's official booking channel for foreign visitors**: sessions 1, 3, and 6 with 10 seats each plus a Wednesday English-guided session, **130 online seats a week** where foreign visitors previously had none.",
      "Every request waits for **staff approval** within the museum's monthly seat allocation; a pending request already holds its seat, so sessions cannot be overbooked, and cancellations return seats automatically.",
      "An admin interface for staff to approve requests by session, mark visits and no-shows, view booking and traffic statistics, and export them to Excel.",
      "Personal data is deleted automatically 90 days after the visit (no-show records are kept longer), a booking code alone shows only a masked summary, and visit statistics store no IP addresses.",
    ],
    flow: ["Email-only booking form", "Seat held while pending", "Staff approval in admin", "Confirmation email + calendar file"],
  },
  // 규모로는 major 후보(온디바이스 모델 5종·서버리스 API·현장 로그 보정). 승격은 본인이 정한다.
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
      "Doctor-Green is a smart-farm platform that brings crop-disease diagnosis and IoT environment control onto **one screen**. I **planned and built it solo, from sensor to dashboard**.\n\nIt grew out of a VGG16 plant-disease-diagnosis app I built with team MAKENEW, which won the **Excellence Award at the 2024 ICT·SW Women's Start-up Competition**. That model stayed below the 95% accuracy the team had set as its bar for release, so in 2026 I rebuilt the project as a full smart-farm platform and restarted the diagnosis model from the data up.\n\nThe IoT side is built end to end and deployed on Vercel as a live demo. ESP32 sensor nodes post environment data **directly to Supabase over Wi-Fi, with no relay server**. The Next.js dashboard refreshes every 5 seconds, and actuators such as LEDs and fans are controlled from the app.\n\nThe diagnosis model is **still at the data stage**. The training set holds **39.9K image crops** (train 32.2K / val 4,326 / test 3,408) from 5 classes, healthy plus 4 diseases. **Training the crop classifier, ConvNeXt-Tiny or EfficientNetV2-S, is the next step; there are no results yet.**",
    highlights: [
      "**Data flow built end to end**: ESP32 posting directly to Supabase over Wi-Fi → Next.js dashboard on 5-second polling.",
      "**LED and fan control from the app**.",
      "The 2024 prototype, built with team MAKENEW, won the **Excellence Award at the 2024 ICT·SW Women's Start-up Competition**.",
      "Built the training set: **39.9K image crops** (train 32.2K / val 4,326 / test 3,408) across 5 classes (healthy plus 4 diseases).",
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
    kicker: "Seoul Robot & AI Museum · Jun–Aug 2026",
    desc: "A guided prompt builder where visitors create AI artwork with guidance from the museum character Raimi. It ran on the museum floor from June to August 2026, and its backend counted 14,328 generated images, 9,865 of them in July.",
    year: "2026",
    role: "Planning · development · operations",
    tags: ["JavaScript", "OpenAI API", "Vercel Serverless", "Supabase", "Cloudflare R2", "PWA"],
    repo: "https://github.com/henna2022/raim-ai-artstudio",
    image: "/portfolio_images/projects/artlab-mode-en.jpg",
    stat: "14,328 images · Jun–Aug 2026",
    overview:
      "Visitors build a prompt step by step with the museum character Raimi, choosing what they want to draw, and an AI draws it. It ran on the museum floor from June to August 2026, and **the app's own backend recorded 14,328 generated images**: 3,049 from 17 June, 9,865 in July and 1,414 in August.\n\nThe app replaced an off-the-shelf GPT service that would stop responding mid-use and leave the station unusable until staff stepped in. **It has not frozen once since the switch.** The **10-step (+5 advanced) choice-based prompt builder** shows young visitors how a prompt is put together while they play. Every image gets an automatic museum-logo watermark, and visitors download their pictures right away by QR code. Because it runs as a web app, the kiosk could be locked to a single full-screen browser.",
    highlights: [
      "**14,328 images generated from June to August 2026, 9,865 of them in July**, counted by the app's own backend.",
      "**Ended the freezes** of the off-the-shelf GPT service it replaced; none since the switch.",
      "**10-step (+5 advanced) choice-based prompt builder** that teaches visitors of all ages how a prompt is put together.",
      "Every image gets an automatic museum-logo watermark, and visitors download it by QR code.",
      "Running as a web app let the exhibition kiosk be locked to a single full-screen browser.",
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
    desc: "A staff app that puts schedules, rosters, live duty status and notices in one place. About 20 docents and part-time staff use it daily as an internal web app (PWA). I built it solo, from prototype to deployment.",
    year: "2026",
    role: "Solo: planning & development",
    tags: ["React", "Vite", "Firebase / Firestore", "Capacitor"],
    image: "/portfolio_images/projects/raimapp_main.png",
    stat: "20 staff daily",
    overview:
      "An internal app for managing the museum's docents and part-time staff, built to cut down on repetitive on-site work. **About 20 of them use it daily as an internal web app (PWA).**\n\nIt brings a schedule grid organized by date, a staff roster, live duty status and notices into one app, with a PC console for managers. I built it solo, from a single-HTML prototype to a Vite + React app with real-time data on Firebase (Firestore). A Capacitor setup is in place for mobile builds.",
    highlights: [
      "**Used daily by about 20 docents and part-time staff** as an internal web app (PWA).",
      "Schedule grid, roster, duty status and notices in one app, plus a PC console for managers.",
      "**Real-time** roster and duty status backed by Firebase / Firestore.",
      "Planned and built solo, from a single-HTML prototype to a Vite + React app, with a Capacitor setup for mobile builds.",
    ],
    flow: ["React + Vite", "Firebase / Firestore", "Internal web app (PWA)"],
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
    desc: "A puzzle web game where visitors restore traditional Korean patterns themselves, such as dancheong and folk-painting (minhwa) motifs. It runs on 8 exhibition tablets in a once-daily program with about 15 participants per session.",
    year: "2026",
    role: "Development",
    tags: ["JavaScript", "HTML/CSS", "GitHub Pages"],
    href: "https://henna2022.github.io/ai-restoration-exhibit/",
    repo: "https://github.com/henna2022/ai-restoration-exhibit",
    image: "/portfolio_images/restorer1.jpg",
    overview:
      "A puzzle web game where visitors restore traditional Korean patterns themselves, such as dancheong and folk-painting (minhwa) motifs. I planned and built it as exhibition-education content for the museum.\n\nIt runs on **8 exhibition tablets** in a once-daily exhibition-linked program with **around 15 participants per session**. It is built with JavaScript and HTML/CSS, deployed on GitHub Pages, and runs without a server.",
    highlights: [
      "Planned and built as exhibition-education content for the museum.",
      "A game that links the exhibition to hands-on pattern restoration.",
      "Built with JavaScript + HTML/CSS and **runs without a server**.",
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
    desc: "Five touch mini-games that show visitors how language AI learns: tokenization, embeddings, word order, attention, and next-word prediction. They ran on 3 exhibition tablets on the museum floor from June to October 8, 2026.",
    year: "2026",
    role: "Planning · development",
    tags: ["JavaScript", "HTML/CSS", "PWA", "Offline-capable"],
    repo: "https://github.com/henna2022/raim-ai-studio",
    image: "/portfolio_images/projects/langlab-home-en.jpg",
    overview:
      "A game-style web app where visitors find out how language AI learns by playing. With the museum character Raimi, they go through **five touch mini-games**, each covering one NLP concept: **tokenization** (slicing a sentence into pieces), **embeddings** (sorting words by meaning), **word order**, **attention** (spotting the word that matters), and **next-word prediction** with live probability bars.\n\nIt ran on **3 exhibition tablets** from June to October 8, 2026, as an **offline-capable PWA** in Korean and English. Staff tracked per-device usage in a PIN-protected panel and exported reports to Excel.",
    highlights: [
      "**5 touch mini-games**, one per NLP concept: tokenization, embeddings, word order, attention, and next-word prediction with live probability bars.",
      "Visitors play with the museum character Raimi through a stamp-based lesson menu.",
      "**Runs entirely in the browser** on plain JavaScript, with no framework or server.",
      "Works in **Korean and English**.",
      "Ran on **3 exhibition tablets** from June to October 8, 2026, as an **offline-capable PWA** that reset to the start screen after 2 idle minutes.",
      "Staff tracked per-device usage in a PIN-protected panel and exported it to Excel.",
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
  //   desc: "An online metaverse version of the permanent exhibition for visitors who cannot book an on-site slot. It reconstructs the exhibition space and visitor flow and is in development.",
  //   year: "2026",
  //   role: "Solo: planning & development (in progress)",
  //   tags: ["Metaverse", "Web", "3D"],
  //   overview:
  //     "A metaverse version of the permanent exhibition, so visitors who cannot get an on-site booking can still explore it online. It reconstructs the exhibition space and visitor flow and is currently in development.",
  //   highlights: [
  //     "Building an online permanent exhibition for visitors turned away by full bookings.",
  //     "Reconstructing the exhibition space and visitor flow in a metaverse format.",
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
    desc: "A recovery system for a museum AI exhibit, installed in July 2026 and still running unattended. It relaunches the program within a minute of a crash or freeze it can detect, and staff can restart it from a button page on their own phone. Before, every freeze meant a manual restart from one specific machine.",
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
      "A recovery system for MaskBot, a face- and voice-interaction robot exhibit on the museum floor. I installed it on the exhibit machine in July 2026, and it **still runs unattended in daily operation**.\n\nMaskBot's control software would sometimes freeze or exit mid-operation. The only fix was a manual restart through a remote session **from one specific machine**. Visitors could not use the exhibit's voice interaction until a staff member reached that machine.\n\nNow a watchdog checks the program every 20 seconds and relaunches it within a minute when the process dies or its window stops responding. Scheduled restarts also run twice a day. **Any staff member can trigger recovery from their own phone** on a single-button page. Enrolled devices reach it through Tailscale, a WireGuard-based mesh VPN, with no port open to the internet.\n\nOne failure cannot be detected automatically: speech recognition stops while the process stays alive and the window keeps responding. Scheduled restarts and the phone button cover that case. I also wrote a handover document on configuration, logs, routine maintenance, a diagnosis playbook, and known limitations, so the maintenance technician can own the system without me.",
    highlights: [
      "Every freeze or crash needed a manual restart, and it could only be done **from one specific machine**.",
      "A watchdog **relaunches the exhibit program within a minute** of a crash or hang it detects.",
      "**Any staff member can restart the exhibit from their own phone** on a one-button page served from the exhibit machine.",
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
    slug: "mystery-playground-replay",
    tier: "side",
    title: "Mystery Playground RE:PLAY",
    category: "Exhibition Kiosk Game",
    categories: ["AI", "Web", "Education"],
    kicker: "Seoul Robot & AI Museum · 4F special exhibition archive",
    desc: "A ten-mission tablet game that archives the museum's 4th-floor special exhibition. Visitors dance with a 3D robot, steer a robot arm with an open hand, and turn their face into a pixel-art avatar, with every vision model running on the tablet itself.",
    year: "2026",
    role: "Solo: development, field tuning, operations tooling",
    tags: ["JavaScript", "MediaPipe", "Three.js", "PWA", "Vercel Functions", "Supabase"],
    href: "https://replay-exhibit-game.vercel.app",
    image: "/portfolio_images/projects/mystery-playground-replay-en.jpg",
    stat: "10 missions · 5 on-device models",
    overview:
      "This kiosk game archives Mystery Playground RE:PLAY, the museum's 4th-floor special exhibition on entertainment technology. It opens on a floor map redrawn from the real exhibition signage, and each of the **ten missions** matches one zone on that map. Every mission runs the same flow: how to play, the hands-on part, the result, the principle behind it, and a short quiz.\n\nThe camera missions run **five Google MediaPipe models on the tablet**. In Mission 1 a 3D humanoid built with Three.js copies the visitor's dance. In Mission 2 an open hand steers a 3D robot arm, and the composited photo can be taken home by QR. Mission 6 draws a full-body pixel-art avatar of the visitor from a numeric feature record that holds no photo pixels. The app installs on a Galaxy Tab as an offline PWA, including about 51 MB of AI runtime and models.\n\nTablets upload daily mission stats on their own, and staff read them on a token-protected page with CSV export. Avatar logs are deleted after 90 days, and an English mode switches back to Korean after 30 seconds of inactivity for the next visitor.",
    highlights: [
      "**Ten missions on one floor map** redrawn from the exhibition signage, each with the same play, principle and quiz flow.",
      "**Five MediaPipe models run on-device** alongside Three.js, packaged as an offline PWA so the kiosk keeps working without a network.",
      "Mission 6 turns a camera shot into a **pixel-art avatar** from a numeric record that holds no photo pixels.",
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
    kicker: "Seoul Robot & AI Museum · seasonal use since Jun 2026",
    desc: "A photo kiosk where visitors design a four-photo frame with the museum's robots and download the finished photo by QR code. It recorded 1,932 uses on 26 days between June 14 and September 6, 2026.",
    year: "2026",
    role: "Solo: planning, development, operations",
    tags: ["JavaScript", "MediaPipe", "Canvas", "Supabase", "QR", "PWA"],
    href: "https://raim-4cut-studio.vercel.app",
    image: "/portfolio_images/projects/raim-4cut-studio-en.jpg",
    imageTall: "/portfolio_images/projects/raim-4cut-studio-en-tall.jpg",
    stat: "1,932 uses · 26 days",
    overview:
      "RAIM 4-Cut Studio recorded **1,932 uses on 26 days** between June 14 and September 6, 2026. It started as the photo kiosk for the museum's 2nd anniversary and runs on a portrait Galaxy Tab.\n\nVisitors choose a frame color, one of **ten museum robots** and an optional caption, then take six shots on a three-second countdown. A MediaPipe face model on the device marks the top four shots, and the visitor picks the final four. The finished 1080×1620 frame goes to their phone by QR code, and the link expires after two hours.\n\nStaff use a PIN-protected stats page with daily, weekly and monthly counts, robot popularity and frame colors, and can switch seasonal robot versions such as summer and Chuseok without a redeploy. The kiosk blocks long-press menus, zoom, auto-translation and back gestures, and the result screen returns to the start after 30 seconds.",
    highlights: [
      "**1,932 uses recorded on 26 days** between June 14 and September 6, 2026.",
      "The device recommends the best shots using MediaPipe face scores; the visitor selects the final four photos.",
      "Staff switch seasonal robot versions and frame logos from the staff page without a redeploy.",
      "Kiosk guards against long-press, zoom, translation and back gestures, with auto-return to the start screen.",
    ],
  },
  {
    slug: "lidar-explainer-kiosk",
    tier: "side",
    title: "Seeing the Room Through LiDAR",
    category: "Exhibit Explainer Kiosk",
    categories: ["Web", "Education"],
    kicker: "Seoul Robot & AI Museum · LiDAR media art",
    desc: "A touchscreen explainer installed beside the museum's LiDAR media-art room in September 2026. Visitors often asked which AI model was recognizing them, and the kiosk answers in five steps, from raw sensor points to the waves projected on the wall and floor.",
    year: "2026",
    role: "Solo: planning, development, installation",
    tags: ["JavaScript", "Canvas 2D", "PWA", "Blender", "webOS"],
    href: "https://raim-lidar.vercel.app",
    image: "/portfolio_images/projects/lidar-explainer-kiosk-en.jpg",
    overview:
      "This kiosk was installed in September 2026 on a 1920×1080 StanbyME touch screen next to the museum's media-art room. In that room, two LiDAR sensors beside the projector follow visitors: footsteps leave flowing trails on the floor, and a hand swept along the wall leaves a cloud of particles. Visitors often asked which AI model was recognizing them, and the kiosk answers that the input is **a cloud of points**.\n\nA visitor drags people around a simulated room and steps through **Scan, Background subtraction, Find people, Turn into waves and Project onto wall and floor**. A comparison panel sets a camera view, where the face stays in the image, against the LiDAR view, where only points and coordinates remain. After 30 seconds without input the screen switches to an attract mode in which people walk by themselves and the steps cycle. It keeps working offline as a PWA and has a Korean/English toggle.",
    highlights: [
      "**Five-step walkthrough** from sensor points to projected waves, driven by the visitor's own finger.",
      "A camera vs LiDAR panel shows that a camera image keeps the face while LiDAR keeps only points.",
      "**Installed beside the exhibit in September 2026**, followed by a Korean/English toggle.",
      "An offline PWA that runs on the TV's built-in browser, which is older than Chromium 84.",
    ],
  },
  {
    slug: "raim-floor-guide",
    tier: "side",
    title: "Floor-by-Floor QR Guide",
    category: "Mobile Web · Visitor Guide",
    categories: ["Web"],
    kicker: "Seoul Robot & AI Museum · Sep 2026",
    desc: "A mobile web guide in Korean and English that needs no app. Scanning a floor's QR code opens that floor's page, with today's program times and the next session highlighted.",
    year: "2026",
    role: "Solo: planning, content, design, development",
    tags: ["JavaScript", "HTML / CSS", "Vercel", "Python", "QR code"],
    href: "https://raim-guide.vercel.app",
    image: "/portfolio_images/projects/raim-floor-guide-en.jpg",
    stat: "4 floors · KO / EN",
    overview:
      "A mobile web guide for the museum's four floors. Each floor has its own QR code and page (/1f to /4f), so a visitor who scans it lands on **that floor's programs for today**, its exhibits, and facilities. Hours, notices, directions, and booking sit on a separate Info tab.\n\nPast sessions are dimmed and **the next one is highlighted**. Wednesday evening extended sessions appear only on Wednesdays. In English mode, programs run only in Korean are hidden, and booking buttons go to the English booking site (RAIM EN) instead of the city system foreign visitors cannot use.",
    highlights: [
      "**One QR per floor**, each opening its own floor page; a script generates the four QR images and an A4 print sheet.",
      "Past sessions dimmed, **the next one highlighted**, and Wednesday evening sessions shown only on Wednesdays.",
      "**Korean / English toggle** that also hides Korean-only programs and sends booking to the English reservation site.",
      "Runs as two static files on Vercel, with light and dark themes that follow the system setting.",
    ],
  },
  // 라이브 주소가 곧 관리자 화면이라 href·캡처 없이 둔다. 저장소도 비공개.
  {
    slug: "exhibit-stats-hub",
    tier: "side",
    title: "Exhibit Usage Stats Hub",
    category: "Data Collection · Dashboard",
    categories: ["Web", "Ops"],
    kicker: "Seoul Robot & AI Museum · Sep 2026",
    desc: "One dashboard for the daily usage counts of the interactive exhibits I built for the museum. Each exhibit used to record its numbers in a different place, and some lived only inside individual tablets, so there was no way to add them up.",
    year: "2026",
    role: "Solo: design, build, exhibit integration, data migration",
    tags: ["Vercel Functions", "Supabase", "PostgreSQL", "Row Level Security", "JavaScript"],
    stat: "9 exhibits registered",
    overview:
      "A hub where every interactive exhibit I built for the museum reports to one endpoint, so **a single dashboard shows daily totals**. Before it, each exhibit recorded usage its own way: some on a server, some only in each tablet's browser storage, and one not at all. I'm a Restorer! runs on 8 tablets, so a total meant opening an admin screen on every device and adding the numbers by hand.\n\nEach exhibit was connected with a one-line hook, leaving its existing stats code untouched. Tablet exhibits that lose their connection **queue events and send them later**. The database keeps one row per exhibit, day, and event, so a full year from the six exhibits still collecting tops out at 6,570 rows on a free tier.\n\nFor two archived exhibits, I moved their past records into the hub: **14,328 generated images over 47 days** for Raimi's AI Art Lab and 1,932 uses over 26 days for RAIM 4-Cut Studio. The numbers are for internal operations, not official figures.",
    highlights: [
      "**Offline queue in the collector**, so tablet exhibits without a connection keep counting and report later.",
      "**Migrated past records** from two archived exhibits: 14,328 generated images over 47 days (Art Lab) and 1,932 uses over 26 days (4-Cut).",
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
    kicker: "Seoul Robot & AI Museum · 2F education rooms",
    desc: "A read-only tablet board that shows today's timetable and remaining seats for the museum's multipurpose education rooms, refreshed from the booking kiosk's server every 10 seconds.",
    year: "2026",
    role: "Solo: development, tablet setup, handover",
    tags: ["JavaScript", "REST API", "Python", "Android tablet", "Fully Kiosk Browser"],
    image: "/portfolio_images/projects/education-room-board.jpg",
    overview:
      "A tablet board for the museum's 2F education rooms. It shows today's timetable for three multipurpose rooms and **seats left per class** (capacity minus bookings), and greys out slots that have passed. The data comes from the booking kiosk's schedule server, which the board reads but **never writes to**.\n\n**A single Galaxy Tab** runs it, keeping the screen on and starting the board at boot, so no PC has to stay on. If the server cannot be reached, the board shows sample data with a 'waiting for server' badge. I also wrote a **handover document** that walks staff through setting up a new tablet, fixing common failures and maintaining the file.",
    highlights: [
      "Reads the booking server and **never writes to it**.",
      "Refreshes every 10 seconds, calculates seats left per class and marks past slots as closed.",
      "One-tablet deployment with Fully Kiosk Browser: always on, starts at boot, no PC required.",
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
      "This kiosk turns the questions of the Robot & AI Ethics exhibit into a vote on a portrait 1080×1920 touchscreen. It has stood beside the exhibit since September 2026. Four topics (an AI judge, a robot's feelings, disappearing jobs and AI-made art) each pose one either-or question with no right answer yet, illustrated with Raimi and a person side by side. Visitors can **switch any screen between Korean and English** in place.\n\nTo avoid steering answers, both choices share one color, and results for other topics show **only a vote count until you vote on that topic yourself**. The screen returns to the cover when the visitor walks away.\n\nVotes go to an API I added to the exhibit usage hub, which keeps daily per-topic totals in Supabase. **If the network drops, votes queue on the device and upload without duplicates when it reconnects.** The kiosk opens offline after one online visit, and a staff view charts votes by day, week or month with CSV export.",
    highlights: [
      "**Korean/English toggle** that switches the current screen in place, one language per screen.",
      "Same-color choices, with other topics' splits **hidden until you vote on them**, so the kiosk does not steer answers.",
      "Votes are **tallied on a server** and wait on the device while the network is down.",
      "**Opens offline** as a full-screen portrait PWA and resets to the cover when the visitor walks away.",
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
    imageTall: "/portfolio_images/projects/ai-persona-web-tall.jpg",
    overview:
      "AI Persona is a caricature-robot exhibit at the Seoul Robot & AI Museum, where robots draw a visitor's face in lines. I built a companion web app that visitors open on their own phone from a QR code. It finds the face with the camera and **redraws the eyes, nose, mouth and brows as randomized geometric shapes**, and a button reshuffles the combination. The icon above the head follows the visitor's expression: a heart for a smile, an anger mark for a frown, an exclamation mark for surprise and a crown for a neutral face.\n\nAfter the photo, a **30-second animation shows a pen plotter and a Doosan collaborative robot drawing the result**, and the visitor saves the drawing through the phone's share sheet.\n\n**Video and face coordinates never leave the phone.** Face tracking runs in the browser with MediaPipe Face Landmarker, and the only data sent out is an anonymous usage count for the exhibit usage hub I built. I deployed the app on GitHub Pages in September 2026 and designed the A3 QR poster now posted on the exhibit floor.",
    highlights: [
      "Opens on the visitor's phone from a QR code beside the exhibit and redraws their face as randomized geometric shapes.",
      "The icon above the head changes with the visitor's expression: smile, frown, surprise or neutral.",
      "A **30-second animation** of a pen plotter and a Doosan collaborative robot drawing the visitor's result.",
      "**Video and face data stay on the phone**: tracking runs in the browser with MediaPipe Face Landmarker, the camera stops right after capture, and only an anonymous usage count is sent out.",
      "Deployed on GitHub Pages in September 2026, with an A3 QR poster I designed for the exhibit floor.",
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
    desc: "A tablet AR web app for a museum education program: scan a time-machine poster in the exhibition, and a 3D time machine flies in, the museum character Raimi steps out, and a short video and a question to think about follow. It is deployed for 5 spots in the exhibition; marker installation and the first on-site session are still ahead.",
    year: "2026",
    role: "Solo: planning, development",
    tags: ["MindAR", "Three.js", "WebGL", "JavaScript", "PWA", "Headless Chrome"],
    href: "https://raim-jobs.vercel.app",
    image: "/portfolio_images/projects/time-machine-ar.jpg",
    stat: "5 spots · tablet AR",
    overview:
      "First Time in the Future? is an education program that links 5 spots in the permanent exhibition at the Seoul Robot & AI Museum. Each spot gets a time-machine poster. When a child scans it with a tablet, a 3D time machine flies in for six seconds and lands on screen, Raimi steps out to introduce a future scenario, a short video plays, and the stop ends with a question to answer on a paper worksheet. Finding all five time machines completes the tour. I built the app solo as a web app for a landscape Galaxy Tab A9+, using MindAR image tracking and Three.js.\n\nThe app tells the five spots apart by **the color of the time machine's band** on each poster, corrected for exhibit lighting. Every library is self-hosted with an offline cache in case the museum network blocks CDNs.\n\nThe app is deployed with all five videos and scripts in place. **Printing and mounting the markers and the first on-site session are still pending**, so it has not yet run with visitors.",
    highlights: [
      "Tablet AR at 5 exhibition spots: a 3D time machine lands, Raimi introduces a future scenario, and a short video leads to a question for the paper worksheet.",
      "Tells the five spots apart by the color of the time machine's band, corrected for exhibit lighting.",
      "**Offline-capable PWA** with self-hosted MindAR and Three.js, sized to the Galaxy Tab A9+ visible area.",
      "Deployed with all five videos and scripts; marker installation and the first on-site session are still pending.",
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
    desc: "A web tool that rebuilds Word, PowerPoint and Hangul (HWP/HWPX) documents in manual templates I designed for the museum and exports Word, PowerPoint or PDF. Everything runs in the browser, so documents never leave the computer.",
    year: "2026",
    role: "Solo: planning & development",
    tags: ["JavaScript", "mammoth.js", "docx", "PptxGenJS", "JSZip", "GitHub Pages"],
    href: "https://henna2022.github.io/raim-docform/",
    repo: "https://github.com/henna2022/raim-docform",
    image: "/portfolio_images/projects/document-formatter.jpg",
    stat: "4 input formats · 8 templates",
    overview:
      "The museum had settled on a standard layout for its operating manuals, but existing documents came as Word files, slide decks and Hangul files in every style. This tool takes one of those files and lays it out again in the chosen template. There are **four document templates (A to D) and four slide templates (P1 to P4)** for photo-heavy equipment manuals, and the output can be Word, PowerPoint (16:9) or PDF.\n\n**No AI is involved and nothing is uploaded.** It reads DOCX, PPTX, HWPX and legacy binary HWP, keeping merged tables in HWP files intact. In the preview, text can be corrected and photos reordered or replaced, and the PowerPoint file comes out the same as the preview. The output uses Korean line-break settings so lines do not split mid-word.\n\n**The tool is live on GitHub Pages; handing it over for day-to-day staff use is the remaining step.**",
    highlights: [
      "Converts documents entirely in the browser; nothing is uploaded.",
      "Reads **DOCX, PPTX, HWPX and binary HWP**, including merged tables in HWP files.",
      "**Eight templates** (four document layouts and four slide layouts for photo manuals), exported as DOCX, PPTX or PDF.",
      "Editable preview for text and photos, with PowerPoint output that matches it.",
      "Korean line-break settings in DOCX and PPTX output so lines do not break mid-word.",
    ],
  },
  // 볼트 resume: 예정형으로만. 직원 전용(비밀번호 게이트)이라 href·캡처 없이 둔다.
  {
    slug: "staff-ai-class",
    tier: "side",
    title: "RAIM AI Coding Class",
    category: "Staff Training · Practice Site",
    categories: ["Education", "Web"],
    kicker: "Museum staff course · Oct 23 to Dec 23, 2026 (planned)",
    desc: "A ten-session AI and coding course I planned for museum staff, scheduled from October 23 to December 23, 2026, with a practice site where staff sign in, work through hands-on activities and have their results saved.",
    year: "2026",
    role: "Solo: curriculum, materials, practice-site development",
    tags: ["JavaScript", "HTML/CSS", "Supabase", "Google Sheets", "Vercel"],
    stat: "10 sessions · 20 hours",
    overview:
      "I planned a **ten-session, 20-hour course** on AI and coding for museum staff, scheduled on weekday evenings from October 23 to December 23, 2026. Each session is one hour of theory and one hour of solo practice. Five sessions (2, 5, 6, 8 and 9) are AI technology trend studies: a map of generative AI models, agents and tool calling, on-device and small models, physical AI and robot models, and multimodal generation and AI coding. The other five cover what happens inside generative AI and what must never be typed into it, fact-checking and search, how machines learn, the inside of a neural network, and planning AI exhibits around on-device models or server APIs.\n\nThe course runs on a practice site I built for it. Staff sign in with their staff-app ID and a PIN they set themselves, then work through **33 hands-on activities**. **Their results are saved to Supabase**, and an admin view shows each person's progress with CSV export. Session dates and status come from a Google Sheet, so schedule changes need no redeploy.\n\nThe site is deployed, and the first session is on October 23, 2026.",
    highlights: [
      "Planned a **10-session, 20-hour** staff course for October 23 to December 23, 2026: one hour of theory and one hour of solo practice each session, with five sessions given to AI technology trend study.",
      "Practice site with personal sign-in (staff-app ID and a self-set PIN), **33 hands-on activities** and results saved to Supabase.",
      "Admin view of each person's progress by activity, with CSV export.",
      "The practice site is deployed, and the first session is on October 23, 2026.",
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
    desc: "A mobile web prototype for a family stamp tour: visitors point their phone at robot exhibits to collect seven robot parts, compare each with the human body, and assemble a robot of their own. Exhibit recognition runs in the browser.",
    year: "2026",
    role: "Solo: planning, development, evaluation",
    tags: ["TensorFlow.js", "MobileNet", "JavaScript", "Service Worker", "Wake Lock API", "Vercel"],
    href: "https://raim-findmy.vercel.app",
    image: "/portfolio_images/projects/robot-ar-tour.jpg",
    overview:
      "A stamp-tour web app for all ages, built around the robot exhibits of the Seoul Robot & AI Museum. Visitors scan an exhibit with their phone camera to collect one of **seven robot parts** (brain, heart, arm, leg, muscle, joint, eye) from nine exhibits, and each part opens a card comparing it with the human body. The two exhibits that hold several parts, the Alice humanoid and Spot, let the visitor pick one, and the app warns before a pick makes the set impossible to finish. Collecting all seven plays an assembly animation and lets the visitor name, color and save their robot card.\n\nRecognition runs in the browser: TensorFlow.js and a lightweight MobileNet match camera frames against 31 reference photos. If recognition fails, the visitor picks the exhibit from a list, so the tour never dead-ends. To cover unstable museum Wi-Fi, the model and libraries are self-hosted and cached by a **service worker**, and progress stays on the phone with no login.\n\nBecause recognition is not yet reliable enough on its own, I added a staff curator mode that captures more reference photos on site. The prototype was built in June and July 2026; on-device testing is the next step on its roadmap.",
    highlights: [
      "Nine exhibits, seven robot parts, one part per exhibit, with a warning before a choice makes the set impossible to finish.",
      "In-browser exhibit recognition against 31 reference photos, with a pick-from-list fallback so the tour never dead-ends.",
      "Staff curator mode for adding reference photos on site, since recognition is not yet reliable enough on its own.",
      "**Offline-ready**: self-hosted model and libraries, service worker caching, and local progress with no login.",
    ],
  },
];

// 사이트에서 빼 둔 작품 (2026-10-04 본인 요청). 데이터는 남기고 화면·상세·사이트맵에서 뺀다.
// 2026-10-17: 개인용으로 만든 전시물 집계 허브·문서 양식 변환기도 뺌 (본인 요청)
// 2026-10-21: 직원 AI 코딩 수업(staff-ai-class)은 첫 수업 전이라 일단 비공개 (본인 요청)
const hiddenSlugs = new Set(["raim-floor-guide", "education-room-board", "robot-ar-tour", "ai-ethics-vote", "exhibit-stats-hub", "document-formatter", "staff-ai-class"]);
export const projects: Project[] = allProjects.filter((p) => !hiddenSlugs.has(p.slug));

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
    capability: "I build the web and mobile screens people use.",
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
    capability: "I manage the data, storage and deployments behind my apps.",
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
    capability: "I plan education programs and guide exhibitions in Korean and English.",
    items: [
      "Product Planning (PM)",
      "Learning Design",
      "Bilingual Docent (KO·EN)",
    ],
  },
];

export const experience = [
  {
    org: "Seoul Robot & AI Museum (via operator FNJ Co., Ltd.)",
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
      "Build and run the interactive AI education web apps visitors use on the exhibition floor. Raimi's AI Art Lab ran there from June to August 2026 and generated 14,328 images, 9,865 of them in July.",
      "Plan and teach education programs, including the smart-farm class the Yangpyeong Education Office commissioned through the museum. Taught it as a demo class to 5 high-school students in August 2026; the 15-student class is scheduled for October 2026.",
      // 메타버스 전시는 어느 정도 완성되면 다시 추가한다 (data.ts 의 raim-metaverse 주석 블록과 함께)
      "Build internal ops tools, including the staff app that about 20 docents and part-time staff use daily.",
      "Guide exhibitions in Korean and English, and support the multipurpose education rooms.",
      // 출처: 뉴시스 2026-08-23 https://www.newsis.com/view/NISX20260823_0003758707
      // (기사에 본인 실명은 없음 — 행사 규모·주최만 기사로 확인되는 사실이다)
      "Run the Picabot robot-arm drawing studio, a regular 30-minute hands-on AI session for visiting school groups. Led its extended 50-minute class at the KT × Seoul City AI Future Camp in August 2026 (100 elementary students attended; co-hosted by KT, the Seoul Metropolitan Government and Seoul Dobong Police Station).",
    ],
  },
  {
    org: "Ministry of Science and ICT",
    site: "https://www.msit.go.kr/index.do",
    role: "Youth Intern",
    period: "2025.04 - 2025.08",
    points: [
      "Supported improvements to the national Pay-TV service quality evaluation, including its user-satisfaction survey, and drafted Broadcasting Act review materials.",
      "Wrote result reports and trend briefs after attending exhibitions, conferences and seminars.",
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
    period: "2026.09 - Present",
    title: "2026 SW·AI Donghaeng Project",
    role: "Youth mentor for makerthon mentoring and self-directed inquiry (KOFAC program, run by Elice Group)",
    desc: "Coached middle-school students in person at the program's makerthon on October 11, 2026. I also mentor a middle-school class's self-directed inquiry online, with four live sessions scheduled for October 2026, one of them a career-mentoring session I lead on my own.",
    photos: [
      "/portfolio_images/activities/act_aidonghaeng_1.jpg",
      "/portfolio_images/activities/act_aidonghaeng_2.jpg",
    ],
  },
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
    role: "Online learning mentor · Grade-3 math & English · 1x/week · outside work hours",
    desc: "Mentored Grade-3 students online in math and English in Gwangyang City's AI Smart i-Kium program.",
    photos: [],
  },
  {
    period: "2026.02 - Present",
    title: "Geuruteogi Learning Mentoring",
    role: "University mentor · 2x/week, 90 min · outside work hours",
    desc: "One-on-one study mentoring for a Grade-9 student in a university mentoring program.",
    photos: [],
  },
  {
    period: "2025.07",
    title: "Youth SW-Donghaeng Hackathon",
    role: "University mentor · time coaching",
    desc: "Kept youth teams on schedule as a time coach during a one-day software hackathon.",
    photos: [
      "/portfolio_images/activities/2025swpj_1.jpg",
      "/portfolio_images/activities/2025swpj_2.jpg",
      "/portfolio_images/activities/2025swpj_3.jpg",
    ],
  },
  {
    period: "2025.06 - 2025.12",
    title: "CIEE SEOULMATE",
    role: "Seoulmate (exchange-student buddy)",
    desc: "Planned small-group cultural exchange activities with international exchange students and joined CIEE's monthly activities.",
    photos: [],
  },
  {
    period: "2024.09 - 2024.12",
    title: "SW-Donghaeng Project",
    role: "Youth mentor (Future Challenge)",
    desc: "Taught 3 visiting classes at high schools over 3 months and coached students on their physical-computing code.",
    photos: [
      "/portfolio_images/activities/2024swpj_1.jpg",
      "/portfolio_images/activities/2024swpj_2.jpg",
    ],
  },
  {
    period: "2024.07 - 2025.02",
    title: "Hankyong Start-up Club (MAKENEW)",
    role: "Team leader",
    desc: "Led MAKENEW, the start-up club team behind our award-winning plant-disease diagnosis app and the YAKMOA medication-management service.",
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
    title: "2025 GH Youth Build-Up Start-up Competition (GH Corp.)",
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
    title: "2025 Science Museum & Community AI Hackathon (National Science Museum)",
    detail: "Excellence Award (2nd place, finals): AI docent for museum-community co-prosperity",
    result: "Excellence Award",
    role: "PM & Developer",
    topic:
      "An AI docent concept that connects the museum's exhibitions with the local community.",
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
