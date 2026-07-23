import type { Locale } from "./locale";

// Static UI strings, keyed per locale. Content (projects, bio, …) lives in
// lib/data.ts (EN) and lib/data-ko.ts (KO overrides).
export const dict = {
  en: {
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

    infoFocus: "Focus",
    infoStack: "Stack",
    infoCurrently: "Currently",
    infoFocusText:
      "AI education, robotics, and full-stack products that reach real users.",
    infoCurrentlyText:
      "AI & Robotics Educator @ Seoul Robot & AI Science Museum",
  },

  ko: {
    nav: {
      top: "홈",
      about: "소개",
      work: "프로젝트",
      skills: "스택",
      experience: "경력",
      activities: "활동",
      awards: "수상",
      contact: "연락처",
    } as Record<string, string>,

    resume: "이력서",
    cv: "CV",

    viewWork: "대표 프로젝트 보기",
    readProfile: "소개 읽기",

    seeMore: "더 보기",
    seeLess: "접기",

    // Section headlines stay in English in KO mode (design decision);
    // body copy and hints below them are Korean.
    workHeading: "A compact index of recent work.",
    filterAll: "전체",
    view: "보기",
    viewProject: "프로젝트 보기 →",
    newsArticle: "관련 기사 ↗",

    sideProjectsHeading: "Side & toy projects",
    sideProjectsSub: "본업 곁에서 만든 작은 실험들입니다.",

    skillsHeading: "My tech stack.",
    swipeHint: "← 스와이프 / 드래그 →",
    stackHint: "실제로 하는 일을 기준으로 묶었습니다.",

    deckButton: "아키텍처 기술서 (PDF)",

    experienceHeading: "Experience",
    activitiesHeading: "Activities",
    awardsHeading: "Awards",
    comingSoon: "준비 중",

    contactHeading: "Let's build something worth learning from.",
    getInTouch: "연락하기",
    footerCopyright: "© 2026 이주원",

    allWork: "전체 프로젝트",
    year: "연도",
    role: "역할",
    focus: "포커스",
    highlights: "주요 내용",
    stack: "기술 스택",
    architecture: "아키텍처",
    architectureSub: "화면과 역할, 데이터 흐름으로 본 앱의 구조입니다.",
    previous: "← 이전",
    next: "다음 →",
    live: "라이브",
    github: "GitHub",

    infoFocus: "포커스",
    infoStack: "스택",
    infoCurrently: "현재",
    infoFocusText: "실제 사용자에게 닿는 AI 교육, 로보틱스, 풀스택 제품.",
    infoCurrentlyText: "서울로봇인공지능과학관 · AI·로보틱스 교육자",
  },
} satisfies Record<Locale, unknown>;

export type UiStrings = (typeof dict)["en"];
