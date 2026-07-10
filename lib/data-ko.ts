import type { BioWord } from "./data";

// Korean CONTENT overrides. Wherever a Korean original exists in the previous
// portfolio (portfolio_v2/index.html) it is reused verbatim; newer copy with
// no Korean original is translated in the same 합니다체 tone.

export const personKo = {
  // verbatim (portfolio_v2 hero-role)
  role: "AI·로보틱스 교육자 · 풀스택 개발자",
};

export const heroKo = {
  // translated (no Korean original for the current hero copy)
  headline: "AI가 물리 세계와 만나는 지점에서, 인터랙티브 러닝을 만듭니다.",
  sub: "로봇, 센서, 과학관 전시장까지 — 화면 밖으로 나온 AI를 만들고, 그 기술이 어떻게 동작하는지 사람들에게 전합니다.",
};

// translated — mirrors the 3-paragraph structure of the English bio
export const aboutBioKo: BioWord[][] = [
  [
    { w: "안녕하세요,", s: false },
    { w: "아이디어를", s: false },
    { w: "동작하는", s: true },
    { w: "서비스로", s: true },
    { w: "만들고,", s: false },
    { w: "어려운", s: false },
    { w: "기술을", s: false },
    { w: "쉽게", s: true },
    { w: "전하는", s: true },
    { w: "개발자,", s: false },
    { w: "이주원입니다.", s: true },
    { w: "누군가에게", s: false },
    { w: "기술이", s: false },
    { w: "이해되는", s: true },
    { w: "순간을", s: true },
    { w: "가장", s: false },
    { w: "좋아합니다.", s: false },
  ],
  [
    { w: "저는", s: false },
    { w: "소프트웨어가", s: false },
    { w: "화면을", s: false },
    { w: "벗어나는", s: false },
    { w: "지점에", s: false },
    { w: "가장", s: false },
    { w: "끌립니다", s: false },
    { w: "—", s: false },
    { w: "현실", s: false },
    { w: "세계를", s: false },
    { w: "감지하고", s: true },
    { w: "행동하는", s: true },
    { w: "컴퓨터", s: true },
    { w: "비전,", s: true },
    { w: "IoT,", s: true },
    { w: "그리고", s: false },
    { w: "로보틱스입니다.", s: true },
  ],
  [
    { w: "실제", s: true },
    { w: "사람들에게", s: true },
    { w: "닿는", s: true },
    { w: "AI·로보틱스", s: true },
    { w: "제품을", s: true },
    { w: "만들고,", s: false },
    { w: "의미", s: false },
    { w: "있는", s: false },
    { w: "것을", s: false },
    { w: "끝까지", s: true },
    { w: "만들어", s: true },
    { w: "내는", s: true },
    { w: "엔지니어로", s: true },
    { w: "계속", s: false },
    { w: "성장하고", s: false },
    { w: "싶습니다.", s: false },
  ],
];

export const aboutFactsKo = [
  { k: "거점", v: "서울, 대한민국" },
  { k: "학력", v: "한경국립대학교 — 소프트웨어융합 · 식물생명환경" },
  { k: "기타", v: "Rutgers 동계 영어 집중 과정 (2025)" },
  { k: "언어", v: "한국어 · 영어" },
];

export type ProjectKo = {
  category: string;
  kicker: string;
  desc: string;
  role: string;
  overview: string;
  highlights: string[];
};

export const projectsKo: Record<string, ProjectKo> = {
  "doctor-green": {
    category: "AI · IoT 풀스택", // verbatim
    kicker: "스마트팜 플랫폼 · 개인 프로젝트", // translated
    // verbatim (feat-hook)
    desc: "YOLOv8 병해충 진단과 IoT 실시간 제어를 한 화면에 담은 스마트팜.",
    role: "1인 — 기획부터 배포까지", // translated
    // verbatim (md-desc)
    overview:
      "작물 병해충을 영상으로 진단하는 AI 모듈과, 재배 환경을 실시간 계측·제어하는 IoT 디바이스를 단일 웹 플랫폼에서 통합 운용하는 스마트팜 플랫폼입니다. ESP32 센서 노드가 환경 데이터를 수집하면 중계 서버를 거쳐 Supabase에 적재되고, Next.js 웹앱에서 실시간으로 시각화됩니다.",
    // verbatim (md-list)
    highlights: [
      "데이터 흐름: IoT 센싱 → Mac 중계 서버(Flask) → Supabase 적재 → Next.js 웹앱 실시간 시각화",
      "USB 카메라 영상에 YOLOv8을 적용해 작물 병해충 7종 탐지·진단",
      "YOLOv8 1차 학습(50 epoch) mAP50 ≈ 0.95 달성, 2차 YOLOv8l(150 epoch) 고도화 진행 중",
    ],
  },
  "raimi-art-lab": {
    category: "웹앱 · 교육", // translated
    kicker: "서울로봇인공지능과학관 · 전시연계 교육 콘텐츠", // verbatim
    // adapted verbatim (md-desc 1st sentence)
    desc: "과학관 캐릭터 '라이미'와 함께 프롬프트를 단계별로 완성하면 AI가 그림을 생성해 주는 교육용 웹앱입니다.",
    role: "기획 · 개발 · 운영", // translated
    // verbatim (md-desc)
    overview:
      "과학관 캐릭터 '라이미'와 함께 그리고 싶은 그림을 단계별로 골라 프롬프트를 완성하면 AI가 그림을 생성해 주는 교육용 웹앱입니다. 어린이 관람객이 놀이처럼 프롬프트 엔지니어링의 원리를 배우도록 기획·개발해 전시 현장에서 운영하고 있습니다.",
    // verbatim (md-list)
    highlights: [
      "10단계(+심화 5단계) 선택형 프롬프트 빌더로 프롬프트 구성 원리를 놀이처럼 학습하도록 설계",
      "기존 GPT 서비스에서 발생하던 접속 충돌 현상을 자체 웹앱·서버 전환으로 100% 해소",
      "OpenAI 이미지 생성 API 연동 서버리스 백엔드, 생성 이미지에 과학관 로고 워터마크 자동 합성, Cloudflare R2·Supabase 이중 저장",
      "전시 현장에서 평일 평균 142장, 주말 평균 557장의 그림이 생성되며 활발히 운영 중 — 자체 서버로 생성량을 처음으로 수치화",
    ],
  },
  "im-a-restorer": {
    category: "인터랙티브 웹 게임", // translated
    kicker: "전시연계 교육 콘텐츠", // verbatim fragment
    // verbatim (md-desc 1st sentence)
    desc: "관람객이 직접 한국 문화유산을 복원해 보는 인터랙티브 웹 게임입니다.",
    role: "개발", // translated
    // verbatim (md-desc)
    overview:
      "관람객이 직접 한국 문화유산을 복원해 보는 인터랙티브 웹 게임입니다. 과학관 전시 교육 콘텐츠로 기획·개발하여 GitHub Pages에 배포했습니다.",
    highlights: [
      "전시 교육 목적의 인터랙티브 콘텐츠 기획 및 웹 개발", // verbatim
      "전시 연계 교육 콘텐츠로 실제 현장에서 운영", // translated
      "GitHub Pages 배포로 전시장 태블릿에서 바로 실행", // verbatim
    ],
  },
  "raimi-language-lab": {
    category: "언어 학습 웹앱", // translated
    kicker: "음성 AI 체험", // translated
    // verbatim (sq desc)
    desc: "단어와 문장을 듣고 따라 하며 음성 AI를 체험하는 언어 학습 게임 웹앱입니다.",
    role: "기획 · 개발", // translated
    // verbatim (md-desc)
    overview:
      "라이미 캐릭터와 함께 단어와 문장을 듣고 따라 하며 언어와 음성 AI를 체험하는 게임형 학습 웹앱입니다. 브라우저 음성 합성(TTS)을 활용해 별도 서버 없이 동작하도록 설계했습니다.",
    // verbatim (md-list)
    highlights: [
      "단어·문장 학습 게임 흐름(시작–메뉴–게임–완료) 기획 및 개발",
      "브라우저 음성 합성 기반 듣기·말하기 학습 콘텐츠 구성",
      "한·영 지원, PWA로 전시장 태블릿에서 오프라인 구동",
    ],
  },
  "ato-care-robot": {
    category: "AI 헬스케어 · 돌봄 로봇", // verbatim
    kicker: "교감·돌봄 로봇", // verbatim fragment
    // verbatim (feat-hook)
    desc: "혼자 사는 사람 곁에서 눈을 맞추고, 약까지 챙기는 토끼 로봇.",
    role: "1인 — 기획·개발·하드웨어·AI", // translated
    // verbatim (md-desc)
    overview:
      "1인 가구와 고령자를 위한 토끼 모양 정서 교감 로봇입니다. 원형 디스플레이 두 개를 '눈'으로 사용해 표정과 감정을 표현하고, 사람이 다가오거나 쓰다듬으면 센서로 감지해 반응합니다. 회로 설계부터 펌웨어, 3D 프린팅 외형과 극세사 커버 패턴까지 직접 제작했습니다. 여기에 멀티모달 AI로 약을 인식하고 복약을 관리하는 '약모아(YAKMOA)' 기능을 결합해, 정서 교감과 복약 돌봄을 한 몸에서 수행하는 돌봄 로봇으로 확장했습니다.",
    // verbatim (md-list)
    highlights: [
      "ESP32 + 원형 LCD(GC9A01) 2개로 깜빡임·시선 이동 등 눈 표정 애니메이션 구현",
      "PIR 접근 감지, 정전식 터치(쓰다듬기), DFPlayer 사운드, 서보 귀·팔 움직임 통합",
      "3D 프린팅 본체와 극세사 재단 패턴 등 외형 제작까지 전 과정 수행",
      "멀티모달 AI로 약을 인식하고 복약 시간을 관리하는 '약모아(YAKMOA)' 기능을 로봇에 통합 — 정서 교감과 복약 돌봄을 결합",
      "약모아는 디지털 취약계층·장애인을 위한 복약관리 서비스로 기획, GH 청춘 빌드업 창업 공모전 입상(팀 MAKENEW)",
    ],
  },
  "raim-staff-platform": {
    category: "사내 운영 도구", // verbatim fragment
    kicker: "해설사·단기인력 근무 관리", // translated
    // verbatim (sq desc)
    desc: "해설사와 단기인력의 근무 스케줄, 현황, 공지를 한곳에서 관리할 수 있게 만든 직원용 앱입니다.",
    role: "1인 — 기획 · 개발", // translated
    // verbatim (md-desc)
    overview:
      "과학관 해설사와 단기인력의 근무를 관리하는 직원용 플랫폼입니다. 날짜별 근무 스케줄 그리드, 직원 명부, 실시간 근무 현황, 공지사항을 하나의 앱에서 확인할 수 있고, 모바일 내부 배포까지 직접 구축했습니다. 현장의 반복 업무를 줄이기 위해 스스로 문제를 정의하고 만든 프로젝트입니다.",
    // verbatim (md-list)
    highlights: [
      "스케줄 그리드·직원 명부·근무 현황·공지 화면 등 서비스 전체 기획 및 개발",
      "단일 HTML 프로토타입을 Vite + React 구조로 리팩토링, Firebase(Firestore) 연동",
      "Capacitor로 iOS·Android 내부 배포 환경 구성",
    ],
  },
  "smart-farm-education": {
    category: "교육 프로그램", // translated
    kicker: "서울로봇인공지능과학관 × 양평교육청", // verbatim
    // verbatim (sq desc)
    desc: "학생들이 IoT 스마트팜과 YOLO 작물 진단을 직접 다뤄 보는 교육 프로그램으로, 서버와 웹앱 환경까지 직접 구축했습니다.",
    role: "1인 — 기획 · 개발", // translated
    // verbatim (md-desc)
    overview:
      "양평교육청과 협업해 학생들이 스마트팜과 AI 작물 진단을 직접 체험하는 교육 프로그램을 기획하고, 수업에 필요한 서버와 웹앱 환경까지 직접 구축했습니다. 학생들이 데이터가 실시간으로 쌓이고 센서 값이 바뀌는 과정을 눈으로 확인하도록 설계했습니다.",
    // verbatim (md-list)
    highlights: [
      "위치 기반 날씨 API를 연동해 실제 재배 환경과 연결한 수업 콘텐츠 구성",
      "YOLO 모델 학습 과정(epoch 실험, loss 최소화)을 학생 눈높이에서 함께 탐색",
      "가상 서버의 데이터베이스에 센서 값이 실시간으로 적재·변화하는 과정을 직접 확인하도록 구성",
    ],
  },
  "raim-photo-booth": {
    category: "기념 포토부스", // translated
    kicker: "과학관 개관 2주년 행사", // verbatim fragment
    // verbatim (sq desc)
    desc: "관람객이 과학관 로봇들과 네컷 사진을 찍고 QR로 가져가는 기념 포토부스. AI가 가장 잘 나온 컷을 추천해 줍니다.",
    role: "1인 — 기획 · 개발 (진행 중)", // translated
    // verbatim (md-desc)
    overview:
      "'과학관에 다녀간 기념으로 가져갈 것이 없다'는 문제의식에서 출발한 프로젝트입니다. 기념품 숍도 입장권도 없는 과학관에서, 관람객이 전시 로봇들과 함께 네컷 사진을 찍고 QR 코드로 바로 가져갈 수 있게 만들어 '기념'의 경험을 더했습니다.",
    // verbatim (md-list)
    highlights: [
      "관람 경험의 빈틈(기념품 부재)을 문제로 정의하고 포토부스라는 해결책을 직접 기획",
      "과학관 로봇 캐릭터와 함께 찍는 네컷 프레임 제작, QR 코드로 사진 반출",
      "여러 컷 중 가장 잘 나온 사진을 골라 추천하는 AI 알고리즘 적용",
    ],
  },
  "raim-metaverse": {
    category: "전시 접근성 콘텐츠", // verbatim fragment
    kicker: "온라인 상설전시관", // translated
    // verbatim (sq desc)
    desc: "전시를 예약하지 못한 관람객도 온라인으로 둘러볼 수 있도록 상설전시관을 메타버스로 구현하고 있습니다.",
    role: "1인 — 기획 · 개발 (진행 중)", // translated
    // verbatim (md-desc)
    overview:
      "현장 예약이 마감되어 전시를 직접 보지 못하는 관람객도 온라인에서 상설전시관을 둘러볼 수 있도록, 전시 공간을 메타버스로 옮기는 프로젝트입니다. 전시 접근성을 넓히는 것을 목표로 개발하고 있습니다.",
    // verbatim (md-list)
    highlights: [
      "예약 마감으로 관람하지 못하는 관람객을 위한 온라인 상설전시관 구현",
      "전시 접근성 확대를 목표로 공간·동선을 메타버스로 재구성",
    ],
  },
};

// Parallel to lib/data.ts `experience` (same order). All verbatim from
// portfolio_v2/index.html 경력 tab.
export const experienceKo: { org: string; role: string; points: string[] }[] = [
  {
    org: "서울로봇인공지능과학관",
    role: "교육 콘텐츠 기획·개발",
    points: [
      "'AI 그림 연구소', 'AI 언어 연구소' 같은 인터랙티브 교육 웹앱을 직접 개발해 전시 현장에서 운영함 — AI 그림 연구소는 평일 평균 142장, 주말 평균 557장이 생성될 만큼 활발히 쓰이고 있음",
      "양평교육청과 협업해 스마트팜 교육 프로그램을 기획하고, 위치기반 날씨 API와 YOLO 학습을 포함한 서버·웹앱 환경까지 직접 구축함",
      "근무 스케줄·현황 관리 앱, 2주년 AI 네컷 포토부스, 상설전시관 메타버스 등 운영·전시 콘텐츠를 직접 만들며 현장의 문제를 스스로 해결함",
      "상설·기획 전시를 한국어와 영어로 해설하고, 다목적 교육장 운영도 지원함",
    ],
  },
  {
    org: "셀렉트스타",
    role: "데이터 컨트리뷰터 & QA",
    points: [
      "AI 모델 학습·평가에 쓰이는 복합 3-hop 추론 Q&A 데이터셋을 구축하고 라벨링 품질을 검수함",
      "정확도를 유지하면서 팀 평균의 2.5배에 달하는 데이터 처리량을 기록함",
    ],
  },
  {
    org: "과학기술정보통신부",
    role: "청년인턴",
    points: [
      "유료방송 실태조사를 개편하고 방송법 검토 자료를 작성해, 2분기 지역 커머스채널 승인에 기여함",
      "부처가 주최한 전시·컨퍼런스 11회를 현장 취재해 보고서와 이슈 브리핑으로 정리함",
    ],
  },
];

export type ActivityKo = { title: string; role: string; desc: string };

// Keyed by the English activity title in lib/data.ts.
// desc sentences are verbatim from activities-ko.md.
export const activitiesKo: Record<string, ActivityKo> = {
  "Geuruteogi Learning Mentoring 'Gachi-Edu'": {
    title: "그루터기 학습멘토링 '같이에듀'",
    role: "대학생 멘토 6기",
    desc: "대학생 멘토로 참여해 청소년 대상 학습 멘토링을 진행함. 멘티 눈높이에 맞춘 지도로 학습 습관과 자기주도 학습을 도움.",
  },
  "Youth SW-Donghaeng Hackathon": {
    title: "2025 청소년 SW 동행 해커톤",
    role: "대학생 멘토 (기획·개발 부문)",
    desc: "청소년 참가자의 아이디어가 실제로 구동되는 SW로 완성되도록, 기획 구체화부터 개발 아키텍처까지 프로젝트 전 과정을 멘토링함. 참가자의 수준에 맞춘 코딩 피드백과 디버깅 지원으로, 제한된 시간 안에 팀들이 MVP를 완성하도록 도움. 아이디어 충돌이나 기술적 한계로 막힌 팀의 소통을 중재하고 역할 분담을 조정해 완수율을 끌어올림.",
  },
  "CIEE SEOULMATE": {
    title: "CIEE SEOULMATE",
    role: "외국인 유학생 멘토",
    desc: "외국인 유학생이 한국 생활에 잘 적응하도록 한국어와 문화를 일대일로 멘토링함. 한국 학생과 유학생이 서로를 이해할 수 있는 교류 프로그램을 기획해 운영함.",
  },
  "SW-Donghaeng Project": {
    title: "2024 SW 동행 프로젝트",
    role: "청년 멘토",
    desc: "청소년이 주변의 사회 문제를 직접 발굴하고 SW/AI로 해결해 나가는 한 학기 과정을 처음부터 끝까지 밀착 지도함. 코딩이 낯선 학생에게 기초 알고리즘과 데이터 활용법을 가르치며, 논리적으로 문제를 풀어 가는 습관을 길러 줌. 아이디어가 실제 결과물로 이어지도록 꾸준히 피드백하고, 학생들이 끝까지 완주할 수 있게 동기부여를 아끼지 않음.",
  },
  "Hankyong Start-up Club (MAKENEW)": {
    title: "한경국립대 창업동아리",
    role: "팀 리더, MAKENEW",
    desc: "VGG16 기반 식물 병해 진단 앱 개발을 기획부터 프로토타입까지 총괄함. 개발·마케팅·디자인 세 서브팀을 하나의 제품 목표로 조율하며 이끎. 전국 단위 창업경진대회에서 기술과 사업성을 직접 발표함.",
  },
  "LS Dream Science Class, 20th": {
    title: "LS 드림사이언스클래스 20기",
    role: "LS그룹 & 초록우산 · 멘토",
    desc: "초등학생을 위한 한 달간의 과학 프로그램 'LS 드림사이언스'를 메인 강사로 진행함. 아이들이 과학을 손으로 직접 느낄 수 있도록 실험과 시연을 기획해 운영함.",
  },
  "KB LA School": {
    title: "KB LA SCHOOL 고등 전담멘토단",
    role: "KB 국민은행 · 멘토",
    desc: "2024년에는 고2 수학1·화학, 2025년에는 고1 수학을 온라인으로 담당해 지도함. 꾸준한 피드백으로 만점을 받은 학생이 나올 만큼 성적 향상을 이끎.",
  },
};

export type AwardKo = {
  title: string;
  result: string;
  role: string;
  topic: string;
};

// Keyed by the English award title in lib/data.ts.
export const awardsKo: Record<string, AwardKo> = {
  "GH Youth Build-Up Start-up Competition": {
    title: "경기주택도시공사 GH 청춘 빌드업 창업 공모전", // verbatim
    result: "입상", // verbatim
    role: "기획 & 개발",
    // adapted verbatim
    topic:
      "아토 돌봄 로봇을 기반으로, 디지털 취약계층과 장애인을 위한 멀티모달 AI 약 관리 서비스 '약모아(YAKMOA)'를 기획·개발.",
  },
  "Science Museum & Community AI Hackathon": {
    title: "국립중앙과학관 & 과학관-지역연계 AI 해커톤", // verbatim
    result: "2위", // verbatim
    role: "기획 & 개발",
    // adapted verbatim
    topic:
      "연 100만 명이 찾는 과학관을 플랫폼 삼아 지역 기업의 브랜드 스토리를 과학문화 콘텐츠로 풀어내는, 지역과 과학관을 잇는 AI 도슨트.",
  },
  "ICT·SW Women's Start-up Competition": {
    title: "2024 ICT·SW 여성 창업 공모전", // verbatim
    result: "우수상",
    role: "기획 & 개발",
    // adapted verbatim
    topic:
      "VGG16 이미지 분류 모델 기반 식물 질병 진단 앱 — 한국IT여성기업인협회 주관.",
  },
  "Chungnam Generative AI Start-up Idea Competition": {
    title: "충남 생성형 AI 기술 창업 아이디어 경진대회", // verbatim
    result: "장려상",
    role: "기획 & 개발",
    topic: "과학기술정보통신부가 주최한 생성형 AI 기술 창업 아이디어.", // translated
  },
  "HKNU StarUP&GO Audition": {
    title: "한경국립대 HK StarUP&GO Audition 창업경진대회", // verbatim
    result: "우수상",
    role: "기획 & 개발",
    topic: "한경국립대학교 초기 단계 창업 피칭 오디션.", // translated
  },
};
