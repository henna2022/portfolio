// 한국어 버전 on/off 스위치. false 면 KO/EN 토글이 사라지고 항상 EN 으로 고정된다.
export const KO_ENABLED = true;

// Static UI strings (English-only). Content lives in lib/data.ts.
export const ui = {
  nav: {
    top: "Home",
    about: "About",
    work: "Projects",
    skills: "Stack",
    experience: "Work Experience",
    activities: "Activities",
    awards: "Awards",
    contact: "Contact",
  } as Record<string, string>,

  resume: "Resume",
  cv: "CV",

  viewWork: "View selected work",
  readProfile: "Read profile",

  seeMore: "See more",
  seeLess: "See less",

  workHeading: "Projects",
  filterAll: "All",
  view: "View",
  viewProject: "View project →",
  newsArticle: "Press coverage ↗",

  sideProjectsHeading: "Side & toy projects",
  sideProjectsSub: "Smaller experiments built along the way.",

  skillsHeading: "Tech Stack",
  swipeHint: "← swipe / drag →",
  stackHint: "Grouped by what I actually do.",

  deckButton: "Architecture deck (PDF)",

  experienceHeading: "Work Experience",
  activitiesHeading: "Activities",
  awardsHeading: "Awards",
  comingSoon: "Coming soon",

  contactHeading: "Let's build something worth learning from.",
  availability: "Open to commissions and collaborations on AI education programs — curriculum, web app, and hardware, built end to end.",
  getInTouch: "Get in touch",
  footerCopyright: "© 2026 Juwon Lee",
  privacyNotice: "This site keeps anonymous visit statistics.",
  privacyLink: "Privacy",

  allWork: "All work",
  year: "Year",
  role: "Role",
  focus: "Focus",
  highlights: "Highlights",
  stack: "Stack",
  architecture: "Architecture",
  architectureSub: "How the app is structured: screens, roles, and data flow.",
  previous: "← Previous",
  next: "Next →",
  live: "Live",
  github: "GitHub",
};

export type UiStrings = typeof ui;

// 한국어 UI 문자열 — 구조는 ui 와 1:1. 내용 번역은 lib/data-ko.ts 에 있다.
export const uiKo: UiStrings = {
  // 섹션 라벨은 KO 모드에서도 영어를 유지한다 (EN 라벨 + KO 본문 스타일)
  nav: {
    top: "Home",
    about: "About",
    work: "Projects",
    skills: "Stack",
    experience: "Work Experience",
    activities: "Activities",
    awards: "Awards",
    contact: "Contact",
  } as Record<string, string>,

  resume: "이력서",
  cv: "CV",

  viewWork: "프로젝트 보기",
  readProfile: "소개 보기",

  seeMore: "더 보기",
  seeLess: "접기",

  workHeading: "프로젝트",
  filterAll: "All",
  view: "보기",
  viewProject: "프로젝트 보기 →",
  newsArticle: "언론 보도 ↗",

  sideProjectsHeading: "Side & toy projects",
  sideProjectsSub: "작업 틈틈이 만든 작은 실험들.",

  skillsHeading: "기술 스택",
  swipeHint: "← 스와이프 / 드래그 →",
  stackHint: "실제로 하는 일 기준으로 묶었습니다.",

  deckButton: "아키텍처 덱 (PDF)",

  experienceHeading: "경력",
  activitiesHeading: "활동",
  awardsHeading: "수상",
  comingSoon: "준비 중",

  contactHeading: "서로 배울 수 있는 것을 함께 만들어요.",
  availability: "AI 교육 프로그램 제작 외주·협업을 받고 있습니다 — 커리큘럼·웹앱·하드웨어까지 한 번에.",
  getInTouch: "연락하기",
  footerCopyright: "© 2026 이주원",
  privacyNotice: "이 사이트는 익명 방문 통계를 수집합니다.",
  privacyLink: "개인정보 안내",

  allWork: "전체 프로젝트",
  year: "연도",
  role: "역할",
  focus: "분야",
  highlights: "주요 성과",
  stack: "기술 스택",
  architecture: "시스템 구조",
  architectureSub: "화면 · 역할 · 데이터 흐름으로 보는 앱 구조.",
  previous: "← 이전",
  next: "다음 →",
  live: "라이브",
  github: "GitHub",
};
