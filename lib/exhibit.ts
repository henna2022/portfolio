// ─────────────────────────────────────────────────────────────────────────────
// 박물관 메타포 레이어. 층 배치, 운영 상태, 층 안내 문구, 도슨트 로봇 대사.
// 프로젝트 본문은 data.ts / data-ko.ts 를 그대로 쓴다. 여기 상태 문구는 전부
// data.ts 의 kicker·overview 문장에서 그대로 옮긴 것이고, 더 좋게 쓰지 않는다.
// ─────────────────────────────────────────────────────────────────────────────
import type { Lang } from "@/components/lang-provider";

export type FloorId = "4F" | "3F" | "2F" | "1F" | "INFO";
export type StatusKind = "on" | "soon" | "closed" | "proto";
type Bi = { en: string; ko: string };

export type Floor = {
  id: FloorId;
  anchor: string; // 섹션 id (옛 #work 링크 호환을 위해 4F 는 work)
  code: string; // 엘리베이터 버튼 글자
  name: Bi; // 층 이름 (안내판)
  short: Bi; // 헤더 버튼에 붙는 짧은 이름
  sub: Bi; // 안내판 한 줄 설명
  title: Bi; // 층 첫머리 제목
  intro: Bi; // 층 첫머리 설명
};

export const floors: Floor[] = [
  {
    id: "4F",
    anchor: "work",
    code: "4",
    // 채용 담당자가 바로 읽게 평이한 이름을 먼저 쓴다 (과학관 실제 4층 기획전시와도 헷갈리지 않게)
    name: { en: "Featured work", ko: "대표 작업" },
    short: { en: "Featured", ko: "대표" },
    sub: { en: "Exhibit, class, IoT platform", ko: "전시물, 수업, IoT 플랫폼" },
    title: { en: "From the museum floor to the classroom", ko: "전시장에서 교실까지" },
    intro: {
      en: "An exhibit tuned from visitor logs, a class commissioned by an education office, and the IoT platform that class grew from.",
      ko: "관람객 기록으로 다듬은 전시물, 교육청이 의뢰한 수업, 그리고 그 수업의 바탕이 된 IoT 플랫폼입니다.",
    },
  },
  {
    id: "3F",
    anchor: "galleries",
    code: "3",
    name: { en: "Museum exhibits", ko: "전시물" },
    short: { en: "Exhibits", ko: "전시물" },
    sub: { en: "Exhibits visitors touch", ko: "관람객이 직접 만지는 전시물" },
    title: { en: "Built for the exhibition floor", ko: "전시장을 위해 만든 작업들" },
    intro: {
      en: "Kiosks, tablet games and phone apps made for the Seoul Robot & AI Science Museum. Each label says whether the work is on view, has closed, or is still waiting to open.",
      ko: "서울로봇인공지능과학관 전시장을 위해 만든 키오스크, 태블릿 게임, 휴대폰 웹앱입니다. 라벨마다 지금 운영 중인지, 운영을 마쳤는지, 아직 현장에 나가기 전인지 적었습니다.",
    },
  },
  {
    id: "2F",
    anchor: "services",
    code: "2",
    name: { en: "Internal systems", ko: "운영 시스템" },
    short: { en: "Systems", ko: "시스템" },
    sub: { en: "Booking, staff, uptime", ko: "예약, 근무, 복구" },
    title: { en: "Systems behind the exhibits", ko: "전시 뒤에서 돌아가는 시스템" },
    intro: {
      en: "Booking for foreign visitors, staff schedules, exhibit recovery, usage counts, document templates, and a course for the museum's own staff.",
      ko: "외국인 예약과 근무 일정, 전시물 복구, 이용 집계, 문서 양식, 그리고 직원 교육까지 맡는 작업들입니다.",
    },
  },
  {
    id: "1F",
    anchor: "archive",
    code: "1",
    name: { en: "Experience & awards", ko: "경력·수상" },
    short: { en: "Career", ko: "경력" },
    sub: { en: "Work, methods, awards, skills", ko: "경력, 검증 방법, 수상, 기술" },
    title: { en: "Experience and record", ko: "경력과 기록" },
    intro: {
      en: "Where I have worked, how I check my work, what it has won, the skills it uses, and who I have taught.",
      ko: "일한 곳, 작업을 검증하는 방법, 받은 상, 쓰는 기술, 그리고 가르친 사람들입니다.",
    },
  },
  {
    id: "INFO",
    anchor: "contact",
    code: "i",
    name: { en: "Contact", ko: "연락" },
    short: { en: "Contact", ko: "연락" },
    sub: { en: "Hiring inquiries, résumé", ko: "채용 문의, 이력서" },
    title: { en: "Contact", ko: "연락" },
    intro: { en: "", ko: "" },
  },
];

export const floorById = (id: FloorId) => floors.find((f) => f.id === id)!;

// 이 사이트에서 빼 둔 작품 (2026-10-04 본인 요청). data.ts 는 그대로 두고 화면·상세·사이트맵에서만 뺀다.
export const hiddenSlugs = new Set([
  "raim-floor-guide",
  "education-room-board",
  "robot-ar-tour",
  "ai-ethics-vote",
]);

// 3F: 가로 화면 작품은 벽에, 세로 화면(휴대폰·세로 키오스크) 작품은 진열장에
export const galleryWall = [
  "raimi-language-lab",
  "im-a-restorer",
  "lidar-explainer-kiosk",
  "time-machine-ar",
  "raimi-art-lab",
];
export const galleryCase = ["ai-persona-web", "raim-4cut-studio"];

// 층별 배치. 순서가 곧 화면 순서다.
export const floorPlan: Record<"4F" | "3F" | "2F", string[]> = {
  // 스마트팜이 가장 큰 프로젝트라 맨 위 (본인 요청 2026-10-05)
  "4F": ["smart-farm-education", "mystery-playground-replay", "doctor-green"],
  "3F": [...galleryWall, ...galleryCase],
  "2F": [
    "raim-en",
    "raim-staff-platform",
    "exhibit-auto-recovery",
    "exhibit-stats-hub",
    "document-formatter",
    "staff-ai-class",
  ],
};

// 세로 화면 컷: 베이지 배경을 투명하게 빼고 기기 테두리에 맞춰 자른 것.
// 원본 경로는 data.ts 그대로 두고 화면에서만 바꿔 쓴다.
const imageOverride: Record<string, string> = {
  "/portfolio_images/projects/ai-ethics-vote-en.jpg": "/portfolio_images/projects-tight/ai-ethics-vote-en.webp",
  "/portfolio_images/projects/raim-4cut-studio-en.jpg": "/portfolio_images/projects-tight/raim-4cut-studio-en.webp",
  "/portfolio_images/projects/ai-persona-web.jpg": "/portfolio_images/projects-tight/ai-persona-web.webp",
};
export const displaySrc = (src: string) => imageOverride[src] ?? src;
export const isTight = (src: string) => src in imageOverride;

// 구조도(옛 팔레트 SVG)를 새 팔레트로 다시 칠한 사본
export const flowSrc = (src: string) => src.replace("/flow/", "/flow-reborn/");

export function floorOf(slug: string): FloorId {
  for (const f of ["4F", "3F", "2F"] as const) {
    if (floorPlan[f].includes(slug)) return f;
  }
  return "3F";
}

// 운영 상태. 근거 문장은 data.ts 해당 항목의 kicker/overview.
export const status: Record<string, { kind: StatusKind } & Bi> = {
  "smart-farm-education": { kind: "soon", en: "Demo class Aug 2026 · 15-student cohort Oct 2026", ko: "2026년 8월 데모 수업 · 10월 15명 본 수업" },
  "doctor-green": { kind: "soon", en: "Live demo · classifier in progress", ko: "데모 공개 · 진단 모델 개발 중" },
  "raimi-art-lab": { kind: "closed", en: "Ran Jun–Aug 2026", ko: "2026년 6~8월 운영" },
  "mystery-playground-replay": { kind: "on", en: "On view", ko: "운영 중" },
  "lidar-explainer-kiosk": { kind: "on", en: "On view since Sep 2026", ko: "2026년 9월부터 운영" },
  "ai-ethics-vote": { kind: "on", en: "On view since Sep 2026", ko: "2026년 9월부터 운영" },
  "im-a-restorer": { kind: "on", en: "Running · once-daily program", ko: "운영 중 · 매일 1회" },
  "raimi-language-lab": { kind: "on", en: "On view · 3 tablets", ko: "운영 중 · 태블릿 3대" },
  "raim-4cut-studio": { kind: "closed", en: "Ran Jun–Sep 2026", ko: "2026년 6~9월 운영" },
  "ai-persona-web": { kind: "on", en: "Online · QR at the exhibit", ko: "공개 중 · 전시물 옆 QR" },
  "time-machine-ar": { kind: "soon", en: "Deployed · on-site launch pending", ko: "배포 완료 · 현장 운영 전" },
  "robot-ar-tour": { kind: "proto", en: "Prototype", ko: "프로토타입" },
  // 본인 확인 2026-10-05: 서버를 아직 열지 않음 (일반 공개 전)
  "raim-en": { kind: "soon", en: "Built · public launch pending", ko: "구축 완료 · 공개 전" },
  "raim-staff-platform": { kind: "on", en: "In daily use · ~20 staff", ko: "직원 약 20명이 매일 사용" },
  "exhibit-auto-recovery": { kind: "on", en: "Running unattended", ko: "무인 운영 중" },
  "exhibit-stats-hub": { kind: "on", en: "In operation", ko: "운영 중" },
  "raim-floor-guide": { kind: "on", en: "Online", ko: "공개 중" },
  "education-room-board": { kind: "on", en: "In operation", ko: "운영 중" },
  "document-formatter": { kind: "soon", en: "Online · handover pending", ko: "공개 중 · 인수인계 전" },
  "staff-ai-class": { kind: "soon", en: "First session Oct 7, 2026", ko: "2026년 10월 7일 첫 수업" },
};

// 기획전 두 작품의 큰 숫자. 전부 data.ts 본문에 있는 수치만.
export const figures: Record<string, Array<{ v: string; vKo?: string } & Bi>> = {
  "mystery-playground-replay": [
    { v: "10", en: "missions on one floor map", ko: "한 장의 층 지도 위 미션" },
    { v: "5", en: "MediaPipe models running on the tablet", ko: "태블릿 안에서 도는 MediaPipe 모델" },
    { v: "128", en: "visitor logs used to fix avatar rules", ko: "아바타 규칙 수정에 쓴 관람객 기록" },
  ],
  "smart-farm-education": [
    { v: "16", en: "ESP32 boards for students", ko: "학생용 ESP32 보드" },
    { v: "4", en: "lesson steps: weather, AI vision, IoT, camera", ko: "수업 단계 (날씨 · AI 비전 · IoT · 카메라)" },
  ],
  "doctor-green": [
    { v: "39.9K", vKo: "39,889", en: "image crops in the training set", ko: "학습용 크롭 이미지" },
    { v: "5", en: "classes, healthy plus 4 diseases", ko: "클래스 (정상 + 병해 4종)" },
  ],
};

// 대문 아래 한 줄 요약 (전부 data.ts·data-ko.ts 에 이미 있는 사실)
export const glance: Array<{ k: Bi; v: Bi }> = [
  {
    k: { en: "Degree", ko: "학력" },
    v: {
      en: "Hankyong National University, Plant Life & Environment (B.Ag.) + Software Convergence (B.Eng.) double major, graduating Feb 2027",
      ko: "한경국립대학교 식물생명환경전공(농학사) · 소프트웨어융합전공(공학사) 복수전공, 2027년 2월 졸업 예정",
    },
  },
  {
    k: { en: "Languages", ko: "언어" },
    v: {
      en: "Korean (native) · English (fluent, OPIc AL, TOEIC Speaking AL)",
      ko: "한국어(모국어) · 영어(유창, OPIc AL · 토익스피킹 AL)",
    },
  },
];

// 대문 첫 줄: 실제 직함과 소속 (data.ts experience[0] 그대로). 고용 형태는 본인 요청으로 쓰지 않는다 (2026-10-05)
export const jobLine: { title: Bi; meta: Bi } = {
  title: {
    en: "Education R&D · Developer, Seoul Robot & AI Science Museum",
    ko: "서울로봇인공지능과학관 교육 R&D · 개발자",
  },
  meta: { en: "Since 2026.03", ko: "2026.03~" },
};

// 운영·이용 기록 4개. 숫자는 data.ts 본문 그대로, 누르면 출처(작품 또는 경력)로 간다.
// src 가 없으면 출처 이름은 그 작품 제목.
export const proof: Array<{ v: string; vKo?: string; slug?: string; href?: string; src?: Bi } & Bi> = [
  { v: "14,328", vKo: "14,328장", slug: "raimi-art-lab", en: "AI images generated, June to August 2026 (July alone: 9,865)", ko: "2026년 6~8월 AI 생성 이미지 (7월 한 달 9,865장)" },
  { v: "1,932", slug: "raim-4cut-studio", en: "photo-kiosk uses recorded on 26 days, June to September 2026", ko: "2026년 6~9월, 이용 기록이 있는 26일 동안 포토 키오스크 이용 횟수" },
  { v: "~20", vKo: "약 20명", slug: "raim-staff-platform", en: "docents and part-time staff using the staff app daily", ko: "근무 앱을 매일 쓰는 해설사·단기인력" },
  { v: "100", vKo: "100명", href: "#experience", src: { en: "KT × Seoul City AI Future Camp", ko: "KT·서울시 AI 미래 캠프" }, en: "camp students in Aug 2026; I taught the camp's 50-minute Picabot class", ko: "규모 캠프(2026년 8월)에서 피카봇 50분 확장 수업 담당" },
];

// 작품 페이지 핵심 사실 묶음 (highlights 번호, EN·KO 같은 순서). 없는 작품은 한 목록 그대로.
// 닥터그린 2번(AI Hub 다운로드 문장)은 일부러 뺐다: 공공기관 독자에게 '우회'로 읽힌다. 본문(overview)에는 남아 있다.
export const factGroups: Record<string, Array<{ h: Bi; idx: number[] }>> = {
  "exhibit-auto-recovery": [
    { h: { en: "Problem", ko: "문제" }, idx: [0] },
    { h: { en: "Approach", ko: "접근" }, idx: [1, 2, 4] },
    { h: { en: "Known limits", ko: "한계와 대응" }, idx: [3] },
    { h: { en: "Handover", ko: "인수인계" }, idx: [5] },
  ],
  "doctor-green": [
    { h: { en: "Running today", ko: "지금 돌아가는 것" }, idx: [0, 1, 5] },
    { h: { en: "Data method", ko: "데이터 구축 방법" }, idx: [3] },
    { h: { en: "Not done yet", ko: "아직 남은 일" }, idx: [4] },
  ],
  "time-machine-ar": [
    { h: { en: "Approach", ko: "접근" }, idx: [0] },
    { h: { en: "Diagnosis", ko: "원인 진단" }, idx: [1] },
    { h: { en: "Test method", ko: "시험 방법" }, idx: [2] },
    { h: { en: "Operations", ko: "운영" }, idx: [3, 4] },
  ],
  "mystery-playground-replay": [
    { h: { en: "What it is", ko: "무엇인가" }, idx: [0, 1, 2] },
    { h: { en: "Evidence from the floor", ko: "현장 데이터로 고친 것" }, idx: [3] },
    { h: { en: "Operations", ko: "운영" }, idx: [4] },
  ],
};

// 카드마다 보여 줄 근거 한 줄 = 그 작품 highlights 의 몇 번째 문장 (EN·KO 같은 순서)
export const cardLine: Record<string, number> = {
  "raimi-language-lab": 4,
  "im-a-restorer": 4,
  "lidar-explainer-kiosk": 2,
  "time-machine-ar": 0,
  "raimi-art-lab": 0,
  "ai-persona-web": 3,
  "raim-4cut-studio": 1,
  "raim-en": 4,
  "raim-staff-platform": 2,
  "exhibit-auto-recovery": 1,
  "exhibit-stats-hub": 1,
  "document-formatter": 1,
  "staff-ai-class": 0,
};

// 검증 색인: 이미 쓴 문장을 방법별로 모은다. keys 가 있으면 그 작품 본문(overview)에서
// 해당 문장을 그대로 가져오고, 없으면 highlights[idx] 를 쓴다. 숫자·주장은 새로 만들지 않는다.
export const methods: Array<{
  type: Bi;
  slug?: string;
  idx: number;
  exp?: number;
  keys?: { en: string[]; ko: string[] };
}> = [
  {
    type: { en: "Field-data analysis", ko: "현장 데이터 분석" },
    slug: "mystery-playground-replay",
    idx: 3,
    keys: { en: ["128 visitor logs", "45% of cases"], ko: ["128건", "은발 45%"] },
  },
  {
    type: { en: "Controlled recognition test", ko: "인식 통제 시험" },
    slug: "time-machine-ar",
    idx: 2,
    keys: { en: ["4 of 5 trials"], ko: ["시험 도구로 재 보니", "5건 중 4건"] },
  },
  { type: { en: "End-to-end test harness", ko: "엔드투엔드 시험 장치" }, slug: "time-machine-ar", idx: 2 },
  { type: { en: "Split grouped by source photo", ko: "원본 사진 단위 데이터 분할" }, slug: "doctor-green", idx: 3 },
  { type: { en: "Source check for every sentence", ko: "문장마다 출처 확인" }, slug: "lidar-explainer-kiosk", idx: 4 },
];

// 작품 페이지 벽 라벨 '협업·사용자' 줄. 각 작품 본문에 이미 있는 사실만 (없으면 줄을 안 그린다)
export const withWhom: Record<string, Bi> = {
  "smart-farm-education": { en: "Commissioned by the Yangpyeong Education Office through the museum", ko: "과학관 × 양평교육청 위탁 사업" },
  "exhibit-auto-recovery": { en: "Handover document written for the museum's maintenance technician", ko: "유지보수 담당자용 인수인계 문서 작성" },
  "raim-en": { en: "Built for museum staff to manage bookings in a shared Google Sheet ledger", ko: "직원이 구글 시트 공용 장부로 예약을 관리하도록 설계" },
  "raim-staff-platform": { en: "Used daily by about 20 docents and part-time staff", ko: "해설사·단기인력 약 20명이 매일 사용" },
  "raim-4cut-studio": { en: "Staff read usage and switch seasonal robots on a PIN-protected page", ko: "직원이 PIN 화면에서 이용 수 확인, 시즌 로봇 전환" },
  "raimi-language-lab": { en: "Staff track per-device usage in a PIN-gated panel with Excel export", ko: "직원이 PIN 운영 패널에서 기기별 이용 현황 확인, 엑셀 내보내기" },
};

// 기관 승인을 받은 시스템 (본인 확인 2026-10-05). 작품 페이지 벽 라벨에 한 줄
export const approved = new Set(["exhibit-auto-recovery", "raim-en", "raim-staff-platform"]);

// 기술 그룹 순서: 실제로 배포한 스택부터 (data.ts skillGroups 의 key)
export const skillOrder = ["front", "back", "ai", "data", "hw", "edu"];

// 교육·멘토링 중 먼저 보여 줄 항목 (activities 순서 기준), 나머지는 접는다
export const featuredActivities = [3, 5, 7];

export const statusLegend: Array<{ kind: StatusKind } & Bi> = [
  { kind: "on", en: "On view / in use", ko: "운영 중" },
  { kind: "soon", en: "Opening or in progress", ko: "예정 · 진행 중" },
  { kind: "closed", en: "Closed", ko: "운영 종료" },
];

// 화면 문구 (새 디자인 전용). 기존 lib/i18n.ts 의 ui 는 에러·개인정보 페이지가 계속 쓴다.
const siteEn = {
  floorGuide: "Floor Guide",
  floorGuideOther: "층별 안내",
  role: "Education planning & development",
  introduction: "Introduction",
  introductionOther: "들어가며",
  readMore: "Read more",
  readLess: "Show less",
  enterRoom: "Read case study",
  viewObject: "Case study",
  live: "Open site",
  github: "GitHub",
  year: "Year",
  medium: "Stack",
  credit: "Role",
  withWhom: "Partners & users",
  approval: "Approval",
  approvedBy: "Approved by the museum",
  category: "Category",
  context: "Context",
  statusLabel: "Status",
  docentNote: "Overview",
  keyFacts: "Key facts",
  howItConnects: "How it connects",
  moreInRoom: "In this room",
  prevObject: "Previous",
  nextObject: "Next",
  backToFloor: "Back to",
  directory: "Directory",
  works: (n: number) => `${n} works`,
  displayCase: "Display case",
  displayCaseOther: "진열장",
  chronology: "Experience",
  chronologyOther: "경력",
  learning: "Teaching & mentoring",
  learningOther: "교육 · 멘토링",
  awards: "Awards",
  awardsOther: "수상",
  materials: "Skills",
  materialsOther: "기술",
  methods: "How I check my work",
  methodsIntro: "Sentences quoted from each case study.",
  otherTeaching: "Other teaching and mentoring",
  cvForMore: "Full list in the CV",
  proofTitle: "In use, by the numbers",
  careerTitle: "Career",
  fullExperience: "Full experience",
  moreTeaching: (n: number) => `Show ${n} more teaching and mentoring roles`,
  awardGroup: "Plant-disease diagnosis app (origin of Doctor-Green): 3 awards in 2024",
  datasetCaption: "Dataset built so far",
  resumePdf: "Résumé (PDF)",
  contactCta: "Contact",
  press: "Press coverage",
  coverage: "Coverage",
  related: "Related work",
  downloads: "Downloads",
  resumeEn: "Résumé, 1 page (EN)",
  resumeKo: "Résumé, 1 page (KO)",
  cvEn: "CV, 3 pages (EN)",
  cvKo: "CV, 3 pages (KO)",
  resume: "Résumé",
  email: "Email",
  close: "Close",
  photo: "Photo",
  of: "of",
  langSwitch: "한국어로 보기",
  themeSwitch: "Switch color theme",
  skipToContent: "Skip to content",
  elevator: "Floors",
  youAreHere: "You are here",
  lobby: "Lobby",
};
export type SiteStrings = typeof siteEn;

const siteKo: SiteStrings = {
  ...siteEn,
  floorGuide: "층별 안내",
  floorGuideOther: "Floor Guide",
  role: "교육 기획 · 개발",
  introduction: "들어가며",
  introductionOther: "Introduction",
  readMore: "더 읽기",
  readLess: "접기",
  enterRoom: "자세히 보기",
  viewObject: "자세히",
  live: "사이트 열기",
  year: "연도",
  medium: "사용 기술",
  credit: "맡은 일",
  withWhom: "협업·사용자",
  approval: "승인",
  approvedBy: "과학관 승인",
  category: "분류",
  context: "개요",
  statusLabel: "상태",
  docentNote: "프로젝트 소개",
  keyFacts: "핵심 사실",
  howItConnects: "연결 구조",
  moreInRoom: "이 전시실의 사진",
  prevObject: "이전",
  nextObject: "다음",
  backToFloor: "돌아가기:",
  directory: "층별 안내",
  works: (n: number) => `작품 ${n}점`,
  displayCase: "진열장",
  displayCaseOther: "Display case",
  chronology: "경력",
  chronologyOther: "Experience",
  learning: "교육 · 멘토링",
  learningOther: "Teaching & mentoring",
  awards: "수상",
  awardsOther: "Awards",
  materials: "기술",
  materialsOther: "Skills",
  methods: "검증 방법",
  methodsIntro: "각 작업 본문에서 옮긴 문장입니다.",
  otherTeaching: "그 밖의 교육·멘토링",
  cvForMore: "전체 목록은 경력기술서에",
  proofTitle: "운영·이용 기록",
  careerTitle: "경력",
  fullExperience: "경력 전체 보기",
  moreTeaching: (n: number) => `교육·멘토링 ${n}건 더 보기`,
  awardGroup: "식물 병해 진단 앱 (닥터그린의 출발점): 2024년 3개 대회 수상",
  datasetCaption: "지금까지 만든 데이터셋",
  resumePdf: "이력서 (PDF)",
  contactCta: "연락하기",
  press: "언론 보도",
  coverage: "보도",
  related: "관련 작업",
  downloads: "내려받기",
  resumeEn: "이력서 1쪽 (영문)",
  resumeKo: "이력서 1쪽 (국문)",
  cvEn: "경력기술서 3쪽 (영문)",
  cvKo: "경력기술서 3쪽 (국문)",
  resume: "이력서",
  email: "이메일",
  close: "닫기",
  photo: "사진",
  of: "/",
  langSwitch: "View in English",
  themeSwitch: "화면 테마 바꾸기",
  skipToContent: "본문으로 건너뛰기",
  elevator: "층",
  youAreHere: "현재 위치",
  lobby: "로비",
};

export const siteStrings = (lang: Lang) => (lang === "ko" ? siteKo : siteEn);
export const bi = (lang: Lang, v: Bi) => (lang === "ko" ? v.ko : v.en);
export const biOther = (lang: Lang, v: Bi) => (lang === "ko" ? v.en : v.ko);
