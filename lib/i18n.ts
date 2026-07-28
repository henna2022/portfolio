// Static UI strings (English-only). Content lives in lib/data.ts.
export const ui = {
  nav: {
    top: "Home",
    about: "About",
    work: "Work",
    skills: "Stack",
    experience: "Experience",
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

  workHeading: "A compact index of recent work.",
  filterAll: "All",
  view: "View",
  viewProject: "View project →",
  newsArticle: "Press coverage ↗",

  sideProjectsHeading: "Side & toy projects",
  sideProjectsSub: "Smaller experiments built along the way.",

  skillsHeading: "My tech stack.",
  swipeHint: "← swipe / drag →",
  stackHint: "Grouped by what I actually do.",

  deckButton: "Architecture deck (PDF)",

  experienceHeading: "Experience",
  activitiesHeading: "Activities",
  awardsHeading: "Awards",
  comingSoon: "Coming soon",

  contactHeading: "Let's build something worth learning from.",
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
  nav: {
    top: "홈",
    about: "소개",
    work: "프로젝트",
    skills: "기술 스택",
    experience: "경력",
    activities: "활동",
    awards: "수상",
    contact: "연락",
  } as Record<string, string>,

  resume: "이력서",
  cv: "CV",

  viewWork: "프로젝트 보기",
  readProfile: "소개 보기",

  seeMore: "더 보기",
  seeLess: "접기",

  workHeading: "최근 작업을 간추려 모았습니다.",
  filterAll: "전체",
  view: "보기",
  viewProject: "프로젝트 보기 →",
  newsArticle: "언론 보도 ↗",

  sideProjectsHeading: "사이드 · 토이 프로젝트",
  sideProjectsSub: "작업 틈틈이 만든 작은 실험들.",

  skillsHeading: "기술 스택.",
  swipeHint: "← 스와이프 / 드래그 →",
  stackHint: "실제로 하는 일 기준으로 묶었습니다.",

  deckButton: "아키텍처 덱 (PDF)",

  experienceHeading: "경력",
  activitiesHeading: "활동",
  awardsHeading: "수상",
  comingSoon: "준비 중",

  contactHeading: "서로 배울 수 있는 것을 함께 만들어요.",
  getInTouch: "연락하기",
  footerCopyright: "© 2026 이주원",
  privacyNotice: "이 사이트는 익명 방문 통계를 수집합니다.",
  privacyLink: "개인정보 안내",

  allWork: "전체 프로젝트",
  year: "연도",
  role: "역할",
  focus: "포커스",
  highlights: "하이라이트",
  stack: "스택",
  architecture: "아키텍처",
  architectureSub: "화면 · 역할 · 데이터 흐름으로 보는 앱 구조.",
  previous: "← 이전",
  next: "다음 →",
  live: "라이브",
  github: "GitHub",
};
