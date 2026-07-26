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
