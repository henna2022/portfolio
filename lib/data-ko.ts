import type { BioWord } from "./data";

// Korean CONTENT overrides. Wherever a Korean original exists in the previous
// portfolio (portfolio_v2/index.html) it is reused verbatim; newer copy with
// no Korean original is translated in the same 합니다체 tone.

export const personKo = {
  // verbatim (portfolio_v2 hero-role)
  role: "AI·로보틱스 교육자 · 풀스택 개발자",
};

export const heroKo = {
  // Rewritten as natural Korean (not a literal translation of the EN copy).
  headline: "AI를 현실로 꺼내, 직접 만지며 배우는 경험을 만듭니다.",
  sub: "로봇, 센서, 과학관 전시장. 화면 밖에서 움직이는 AI를 만들고, 그 원리를 누구나 이해하기 쉽게 전합니다.",
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
    { w: "화면", s: true },
    { w: "밖으로", s: true },
    { w: "나오는", s: true },
    { w: "순간에", s: false },
    { w: "가장", s: false },
    { w: "끌립니다.", s: false },
    { w: "세상을", s: false },
    { w: "감지하고", s: true },
    { w: "반응하는", s: true },
    { w: "컴퓨터", s: true },
    { w: "비전,", s: true },
    { w: "IoT,", s: true },
    { w: "그리고", s: false },
    { w: "로보틱스입니다.", s: true },
  ],
  [
    { w: "사람들이", s: true },
    { w: "실제로", s: true },
    { w: "쓰는", s: true },
    { w: "AI·로보틱스", s: true },
    { w: "제품을", s: true },
    { w: "연구·개발하며,", s: false },
    { w: "필요한", s: false },
    { w: "것을", s: false },
    { w: "끝까지", s: true },
    { w: "완성해", s: true },
    { w: "내는", s: true },
    { w: "엔지니어로", s: true },
    { w: "성장하고", s: false },
    { w: "싶습니다.", s: false },
  ],
];

export const aboutFactsKo = [
  { k: "활동 지역", v: "서울, 대한민국" },
  {
    k: "학력",
    v: "청원여자고등학교 (2019 — 2022)\n한경국립대학교 식물생명환경(농학사) · 소프트웨어융합(공학사) 복수전공 (2022 — 현재)",
  },
  { k: "기타", v: "Rutgers 동계 영어 집중 과정 (2025)" },
  { k: "언어 · 자격", v: "한국어 (모국어) · 영어 (유창) · TOEIC Speaking AL · OPIc AL" },
];

// About 섹션 '더 보기' 내용 — data.ts `aboutMore`의 한국어판.
export const aboutMoreKo = {
  languages: [
    "TOEIC Speaking AL",
    "OPIc AL",
    "한국어 (모국어) · 영어 (유창)",
  ],
  education: [
    "한경국립대학교 소프트웨어융합전공(공학사) · 식물생명환경전공(농학사) 복수전공",
    "Rutgers University 동계 영어 집중 과정 (2025)",
  ],
  interests:
    "저는 소프트웨어가 화면 밖으로 나오는 순간에 가장 끌립니다. 세상을 감지하고 반응하는 컴퓨터 비전, IoT, 그리고 로보틱스입니다. 사람들이 실제로 쓰는 AI·로보틱스 제품을 연구·개발하며, 필요한 것을 끝까지 완성해 내는 엔지니어로 성장하는 것이 목표입니다.",
};

export type ProjectKo = {
  title: string;
  category: string;
  kicker: string;
  desc: string;
  role: string;
  overview: string;
  highlights: string[];
};

export const projectsKo: Record<string, ProjectKo> = {
  "doctor-green": {
    title: "닥터그린 (Doctor-Green)",
    category: "AI · IoT 풀스택", // verbatim
    kicker: "스마트팜 플랫폼 · 개인 프로젝트", // translated
    // verbatim (feat-hook) + extension
    desc: "YOLOv8 병해충 진단과 IoT 실시간 제어를 한 화면에 담은 스마트팜 플랫폼입니다. 센서 노드부터 웹 대시보드 배포까지 전 과정을 혼자 기획하고 만들었습니다.",
    role: "기획부터 배포까지 1인 개발", // translated
    // base verbatim (md-desc), extended with md-list facts
    overview:
      "작물 병해충을 영상으로 진단하는 AI 모듈과, 재배 환경을 실시간 계측·제어하는 IoT 디바이스를 단일 웹 플랫폼에서 통합 운용하는 스마트팜 플랫폼입니다. 병해 진단과 환경 제어가 한 화면에서 이어지도록, 센서부터 대시보드까지 전 과정을 혼자 기획하고 개발했습니다.\n\nESP32 센서 노드가 환경 데이터를 수집하면 Mac 중계 서버(Flask)를 거쳐 Supabase에 적재되고, Next.js 웹앱에서 실시간으로 시각화됩니다. 웹앱에서는 LED·팬 같은 액추에이터를 Supabase Realtime 구독으로 실시간 제어할 수 있고, 진단 모듈은 USB 카메라 영상에 YOLOv8을 적용해 작물 병해충 7종을 탐지·진단합니다.\n\n학습에는 Roboflow strawberry-disease-detection-dataset v4를 활용하고 클래스 불균형에 대응하는 증강 전략을 적용해, 1차 학습(50 epoch)에서 mAP50 ≈ 0.95를 달성했습니다. 현재 YOLOv8l 기반 2차 학습(150 epoch)으로 정확도를 고도화하고 있으며, 웹앱은 Vercel에 배포되어 운영 중입니다.",
    // verbatim (md-list) + status
    highlights: [
      "데이터 흐름: IoT 센싱 → Mac 중계 서버(Flask) → Supabase 적재 → Next.js 웹앱 실시간 시각화. 센서부터 화면까지 전 구간을 직접 설계",
      "USB 카메라 영상에 YOLOv8을 적용해 작물 병해충 7종 탐지·진단",
      "웹앱에서 LED·팬 등 액추에이터를 Supabase Realtime 구독으로 실시간 제어",
      "YOLOv8 1차 학습(50 epoch) mAP50 ≈ 0.95 달성, 2차 YOLOv8l(150 epoch) 고도화 진행 중",
      "Roboflow strawberry-disease-detection-dataset v4 활용, 클래스 불균형 대응 증강 전략 적용",
      "Next.js 16 + TypeScript + Tailwind 웹앱을 Vercel에 배포해 운영 중",
    ],
  },
  "raimi-art-lab": {
    title: "라이미의 AI 그림 연구소",
    category: "웹앱 · 교육", // translated
    kicker: "서울로봇인공지능과학관 · 전시연계 교육 콘텐츠", // verbatim
    // adapted verbatim (md-desc 1st sentence) + ops metric
    desc: "과학관 캐릭터 '라이미'와 함께 프롬프트를 단계별로 완성하면 AI가 그림을 생성해 주는 교육용 웹앱입니다. 전시 현장에서 평일 평균 142장, 주말 평균 557장이 생성될 만큼 활발히 운영되고 있습니다.",
    role: "기획 · 개발 · 운영", // translated
    // base verbatim (md-desc), extended with md-list facts
    overview:
      "과학관 캐릭터 '라이미'와 함께 그리고 싶은 그림을 단계별로 골라 프롬프트를 완성하면 AI가 그림을 생성해 주는 교육용 웹앱입니다. 어린이 관람객이 놀이처럼 프롬프트 엔지니어링의 원리를 배우도록 기획했으며, 10단계(+심화 5단계) 선택형 프롬프트 빌더로 프롬프트가 어떻게 구성되는지 자연스럽게 익히게 됩니다.\n\n기존에 쓰던 GPT 기반 서비스는 전시 현장에서 접속 충돌이 반복되는 문제가 있었습니다. 이를 자체 웹앱과 서버로 전환해 100% 해소했고, OpenAI 이미지 생성 API를 연동한 서버리스 백엔드에서 생성 이미지에 과학관 로고 워터마크를 자동 합성한 뒤 Cloudflare R2와 Supabase에 이중 저장합니다. 관람객은 완성한 그림을 QR 코드로 바로 가져갈 수 있고, 웹앱화로 전시 키오스크의 타 앱 접근을 전면 차단했습니다.\n\n현재 과학관 전시장에서 운영 중이며, 평일 평균 142장·주말 평균 557장의 그림이 생성될 만큼 활발히 쓰이고 있습니다. 자체 서버로 생성량을 처음으로 수치화한 과학관 첫 서비스이기도 합니다.",
    // verbatim (md-list)
    highlights: [
      "10단계(+심화 5단계) 선택형 프롬프트 빌더로 프롬프트 구성 원리를 놀이처럼 학습하도록 설계",
      "기존 GPT 서비스에서 발생하던 접속 충돌 현상을 자체 웹앱·서버 전환으로 100% 해소",
      "OpenAI 이미지 생성 API 연동 서버리스 백엔드 구축 (Vercel)",
      "생성 이미지에 과학관 로고 워터마크 자동 합성, Cloudflare R2·Supabase 이중 저장",
      "관람객이 만든 결과물은 QR 코드로 바로 가져갈 수 있게 하고, 웹앱화로 전시 키오스크의 타 앱 접근 전면 차단",
      "전시 현장에서 평일 평균 142장, 주말 평균 557장 생성. 자체 서버로 생성량을 처음으로 수치화한 과학관 첫 서비스",
    ],
  },
  "ato-care-robot": {
    title: "아토(ATO) 돌봄 로봇",
    category: "AI 헬스케어 · 돌봄 로봇", // verbatim
    kicker: "교감·돌봄 로봇", // verbatim fragment
    // verbatim (feat-hook) + extension
    desc: "혼자 사는 사람 곁에서 눈을 맞추고, 약까지 챙기는 토끼 로봇입니다. 회로 설계부터 펌웨어, 3D 프린팅 외형, 멀티모달 AI 복약관리 '약모아'까지 직접 만들었습니다.",
    role: "기획부터 하드웨어·AI까지 1인 개발", // translated
    // verbatim (md-desc), split & extended with md-list facts
    overview:
      "1인 가구와 고령자를 위한 토끼 모양 정서 교감 로봇입니다. 원형 디스플레이 두 개를 '눈'으로 사용해 표정과 감정을 표현하고, 사람이 다가오거나 쓰다듬으면 센서로 감지해 반응합니다.\n\nESP32와 원형 LCD(GC9A01) 두 개로 깜빡임·시선 이동 같은 눈 표정 애니메이션을 구현하고, PIR 접근 감지·정전식 터치(쓰다듬기)·DFPlayer 사운드·서보 귀·팔 움직임을 통합했습니다. 회로 설계부터 펌웨어, 3D 프린팅 본체와 극세사 커버 재단 패턴까지 외형 제작 전 과정을 직접 수행했습니다.\n\n여기에 멀티모달 AI로 약을 인식하고 복약을 관리하는 '약모아(YAKMOA)' 기능을 결합해, 정서 교감과 복약 돌봄을 한 몸에서 수행하는 돌봄 로봇으로 확장했습니다. 약모아는 디지털 취약계층과 장애인을 위한 복약관리 서비스로 기획해 GH 청춘 빌드업 창업 공모전에서 입상했으며(팀 MAKENEW), 현재 복약관리 통합을 설계하는 Phase 1 프로토타입 단계입니다.",
    // verbatim (md-list) + awards-tab facts
    highlights: [
      "ESP32 + 원형 LCD(GC9A01) 2개로 깜빡임·시선 이동 등 눈 표정 애니메이션 구현",
      "PIR 접근 감지, 정전식 터치(쓰다듬기), DFPlayer 사운드, 서보 귀·팔 움직임 통합",
      "회로 설계부터 펌웨어, 3D 프린팅 본체와 극세사 재단 패턴까지 외형 제작 전 과정 수행",
      "멀티모달 AI로 약을 인식하고 복약 시간을 관리하는 '약모아(YAKMOA)' 기능을 로봇에 통합해 정서 교감과 복약 돌봄을 결합",
      "약모아는 디지털 취약계층·장애인을 위한 복약관리 서비스로 기획, GH 청춘 빌드업 창업 공모전 입상(팀 MAKENEW)",
      "MAKENEW 팀(2인)으로 참가해 서비스 기획과 사용자 조사, 사업계획서·소개자료 작성을 주도",
      "현재 복약관리 통합을 설계하는 Phase 1 프로토타입 단계",
    ],
  },
  "raim-staff-platform": {
    title: "RAIM 직원 근무 플랫폼",
    category: "사내 운영 도구", // verbatim fragment
    kicker: "해설사·단기인력 근무 관리", // translated
    // verbatim (sq desc) + extension
    desc: "해설사와 단기인력의 근무 스케줄, 현황, 공지를 한곳에서 관리할 수 있게 만든 직원용 앱입니다. 현장의 반복 업무를 줄이기 위해 스스로 문제를 정의하고, 기획부터 모바일 내부 배포까지 직접 만들었습니다.",
    role: "1인 기획·개발", // translated
    // base verbatim (md-desc), extended with md-list + flow-cap facts
    overview:
      "과학관 해설사와 단기인력의 근무를 관리하는 직원용 플랫폼입니다. 현장의 반복 업무를 줄이기 위해 스스로 문제를 정의하고 만든 프로젝트로, 날짜별 근무 스케줄 그리드, 직원 명부, 실시간 근무 현황, 공지사항을 하나의 앱에서 확인할 수 있습니다.\n\n단일 HTML 프로토타입으로 시작해 Vite + React 구조로 리팩토링하고 Firebase(Firestore)를 연동해 실시간 데이터를 처리합니다. 화면 흐름은 로그인·권한 분기에서 시작해 하단 탭(홈·공지·스케줄·현황·내정보·관리)으로 이어지고, 매니저용 PC 콘솔과 공통 모달까지 서비스 전체를 직접 기획·개발했습니다.\n\nCapacitor로 iOS·Android 내부 배포 환경까지 구성해, 현재 내부 테스트 배포 단계로 운영하고 있습니다.",
    // verbatim (md-list) + flow-cap + context
    highlights: [
      "스케줄 그리드·직원 명부·근무 현황·공지 화면 등 서비스 전체 기획 및 개발",
      "단일 HTML 프로토타입을 Vite + React 구조로 리팩토링해 유지보수 가능한 코드베이스로 전환",
      "Firebase(Firestore) 연동으로 근무 현황·명부를 실시간 반영",
      "로그인·권한 분기 → 하단 탭(홈·공지·스케줄·현황·내정보·관리) → 매니저 PC 콘솔·공통 모달까지 전체 화면 흐름 설계",
      "Capacitor로 iOS·Android 내부 배포 환경 구성",
      "현장의 반복 업무를 줄이기 위해 스스로 문제를 정의하고 시작한 사내 프로젝트",
    ],
  },
  "smart-farm-education": {
    title: "스마트팜 교육 프로그램",
    category: "교육 프로그램", // translated
    kicker: "서울로봇인공지능과학관 × 양평교육청", // verbatim
    // verbatim (sq desc) split into 2 sentences
    desc: "학생들이 IoT 스마트팜과 YOLO 작물 진단을 직접 다뤄 보는 교육 프로그램입니다. 양평교육청과 협업해 수업에 필요한 서버와 웹앱 환경까지 직접 구축했습니다.",
    role: "1인 기획·개발", // translated
    // base verbatim (md-desc), extended with flow-cap + md-list facts
    overview:
      "양평교육청과 협업해 학생들이 스마트팜과 AI 작물 진단을 직접 체험하는 교육 프로그램을 기획하고, 수업에 필요한 서버와 웹앱 환경까지 직접 구축했습니다. 학생들이 데이터가 실시간으로 쌓이고 센서 값이 바뀌는 과정을 눈으로 확인하도록 설계했습니다.\n\n수업은 실습실 접속에서 시작해 방 선택 허브를 거쳐 날씨·AI 비전·IoT·카메라 4개 STEP으로 이어지고, 가상 Supabase에 데이터가 적재되는 과정을 지나 '내 앱 완성'과 실물 시연으로 마무리됩니다. 위치 기반 날씨 API를 연동해 실제 재배 환경과 연결한 수업 콘텐츠를 구성하고, YOLO 모델 학습 과정(epoch 실험, loss 최소화)을 학생 눈높이에서 함께 탐색합니다.\n\n과학관과 지역 교육청이 협업한 전시연계 교육 사례로, 교육 프로그램으로 실제 운영했습니다.",
    // verbatim (md-list) + flow-cap
    highlights: [
      "위치 기반 날씨 API를 연동해 실제 재배 환경과 연결한 수업 콘텐츠 구성",
      "YOLO 모델 학습 과정(epoch 실험, loss 최소화)을 학생 눈높이에서 함께 탐색",
      "가상 서버의 데이터베이스에 센서 값이 실시간으로 적재·변화하는 과정을 직접 확인하도록 구성",
      "실습실 접속 → 방 선택 허브 → 4개 STEP(날씨·AI 비전·IoT·카메라) → 가상 Supabase 적재 → 내 앱 완성 → 실물 시연으로 이어지는 수업 흐름 설계",
      "수업에 필요한 서버·웹앱 환경을 직접 구축해 교육 프로그램으로 운영",
    ],
  },
  "im-a-restorer": {
    title: "나도 복원가!",
    category: "인터랙티브 웹 게임", // translated
    kicker: "전시연계 교육 콘텐츠", // verbatim fragment
    // verbatim (md-desc 1st sentence) + extension
    desc: "관람객이 직접 한국 문화유산을 복원해 보는 인터랙티브 웹 게임입니다. 과학관 전시연계 교육 콘텐츠로 기획·개발해 실제 현장에서 운영하고 있습니다.",
    role: "개발", // translated
    // base verbatim (md-desc), extended
    overview:
      "관람객이 직접 한국 문화유산을 복원해 보는 인터랙티브 웹 게임입니다. 전시를 보는 데서 그치지 않고 복원 과정을 손으로 체험하도록, 과학관 전시 교육 콘텐츠로 기획·개발했습니다.\n\nJavaScript와 HTML/CSS로 가볍게 구현해 GitHub Pages에 배포했고, 전시장 태블릿에서 바로 실행되도록 구성했습니다. 전시 연계 교육 콘텐츠로 실제 현장에서 운영하고 있습니다.",
    highlights: [
      "전시 교육 목적의 인터랙티브 콘텐츠 기획 및 웹 개발", // verbatim
      "한국 문화유산 복원을 직접 체험하는 게임 형식으로 전시와 연결",
      "JavaScript·HTML/CSS 기반의 가벼운 구현으로 별도 서버 없이 동작",
      "GitHub Pages 배포로 전시장 태블릿에서 바로 실행", // verbatim
      "전시 연계 교육 콘텐츠로 실제 현장에서 운영", // translated
    ],
  },
  "raimi-language-lab": {
    title: "라이미의 AI 언어 연구소",
    category: "언어 학습 웹앱", // translated
    kicker: "음성 AI 체험", // translated
    // verbatim (sq desc) + extension
    desc: "라이미 캐릭터와 함께 단어와 문장을 듣고 따라 하며 음성 AI를 체험하는 언어 학습 게임 웹앱입니다. 브라우저 음성 합성으로 별도 서버 없이 동작합니다.",
    role: "기획 · 개발", // translated
    // base verbatim (md-desc), extended with md-list facts
    overview:
      "라이미 캐릭터와 함께 단어와 문장을 듣고 따라 하며 언어와 음성 AI를 체험하는 게임형 학습 웹앱입니다. AI가 언어를 배우는 원리를 관람객이 놀이처럼 경험하도록 기획했습니다.\n\n시작·메뉴·게임·완료로 이어지는 학습 게임 흐름을 기획·개발하고, 브라우저 음성 합성(TTS)을 활용해 별도 서버 없이 동작하도록 설계했습니다. 한국어와 영어를 모두 지원하며, PWA로 만들어 전시장 태블릿에서 오프라인으로 구동됩니다.",
    // verbatim (md-list), split
    highlights: [
      "단어·문장 학습 게임 흐름(시작·메뉴·게임·완료) 기획 및 개발",
      "브라우저 음성 합성(TTS) 기반 듣기·말하기 학습 콘텐츠 구성",
      "별도 서버 없이 브라우저만으로 동작하는 구조로 설계",
      "한국어·영어 이중 언어 지원",
      "PWA로 전시장 태블릿에서 오프라인 구동",
    ],
  },
  "raim-photo-booth": {
    title: "RAIM AI 네컷 포토부스",
    category: "기념 포토부스", // translated
    kicker: "과학관 개관 2주년 행사", // verbatim fragment
    // verbatim (sq desc)
    desc: "관람객이 과학관 로봇들과 네컷 사진을 찍고 QR로 가져가는 기념 포토부스입니다. AI가 여러 컷 중 가장 잘 나온 사진을 골라 추천해 줍니다.",
    role: "1인 기획·개발 (진행 중)", // translated
    // base verbatim (md-desc), extended with md-list facts
    overview:
      "'과학관에 다녀간 기념으로 가져갈 것이 없다'는 문제의식에서 출발한 프로젝트입니다. 기념품 숍도 입장권도 없는 과학관에서, 관람객이 전시 로봇들과 함께 네컷 사진을 찍고 QR 코드로 바로 가져갈 수 있게 만들어 '기념'의 경험을 더했습니다.\n\n과학관 로봇 캐릭터와 함께 찍는 네컷 프레임을 제작하고, 여러 컷 중 가장 잘 나온 사진을 골라 추천하는 AI 알고리즘을 적용했습니다. 개관 2주년 행사를 목표로 개발을 진행하고 있습니다.",
    // verbatim (md-list) + status
    highlights: [
      "관람 경험의 빈틈(기념품 부재)을 문제로 정의하고 포토부스라는 해결책을 직접 기획",
      "과학관 로봇 캐릭터와 함께 찍는 네컷 프레임 제작",
      "QR 코드로 사진을 바로 가져가는 흐름 구성",
      "여러 컷 중 가장 잘 나온 사진을 골라 추천하는 AI 알고리즘 적용",
      "개관 2주년 행사를 목표로 개발 진행 중",
    ],
  },
  "raim-metaverse": {
    title: "RAIM 메타버스",
    category: "전시 접근성 콘텐츠", // verbatim fragment
    kicker: "온라인 상설전시관", // translated
    // verbatim (sq desc) + extension
    desc: "전시를 예약하지 못한 관람객도 온라인으로 둘러볼 수 있도록 상설전시관을 메타버스로 구현하고 있습니다. 전시 접근성을 넓히는 것이 목표입니다.",
    role: "1인 기획·개발 (진행 중)", // translated
    // base verbatim (md-desc), split
    overview:
      "현장 예약이 마감되어 전시를 직접 보지 못하는 관람객도 온라인에서 상설전시관을 둘러볼 수 있도록, 전시 공간을 메타버스로 옮기는 프로젝트입니다.\n\n전시 공간과 관람 동선을 메타버스 형식으로 재구성해, 예약 없이도 누구나 전시를 경험할 수 있게 하는 것을 목표로 개발하고 있습니다.",
    // verbatim (md-list) + status
    highlights: [
      "예약 마감으로 관람하지 못하는 관람객을 위한 온라인 상설전시관 구현",
      "전시 접근성 확대를 목표로 공간·동선을 메타버스로 재구성",
      "예약 없이 누구나 온라인으로 전시를 경험하는 것이 목표",
      "전시 접근성 콘텐츠로 개발 진행 중",
    ],
  },
};

// data.ts `skillGroups`와 같은 key로 매칭되는 한국어 제목·역량 문구.
export const skillGroupsKo: Record<string, { title: string; capability: string }> = {
  ai: {
    title: "AI · 컴퓨터 비전",
    capability: "비전 모델을 학습부터 배포까지 직접 다룹니다.",
  },
  web: {
    title: "풀스택 웹",
    capability: "실사용자가 매일 쓰는 서비스를 만들고 운영합니다.",
  },
  hw: {
    title: "하드웨어 · IoT · 로보틱스",
    capability: "센서와 기계를 웹에 연결합니다.",
  },
  edu: {
    title: "기획 · 교육",
    capability: "어려운 기술을 누구나 배울 수 있는 경험으로 바꿉니다.",
  },
};

// Parallel to lib/data.ts `experience` (same order). All verbatim from
// portfolio_v2/index.html 경력 tab.
export const experienceKo: { org: string; role: string; points: string[] }[] = [
  {
    org: "서울로봇인공지능과학관",
    role: "교육 콘텐츠 기획·개발",
    points: [
      "'AI 그림 연구소', 'AI 언어 연구소' 같은 인터랙티브 교육 웹앱을 직접 개발해 전시 현장에서 운영함. AI 그림 연구소는 평일 평균 142장, 주말 평균 557장이 생성될 만큼 활발히 쓰이고 있음",
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
  "KB LA School (Middle School)": {
    title: "KB LA SCHOOL 중등 멘토",
    role: "KB 국민은행 · 멘토",
    desc: "KB LA SCHOOL 중등 멘토로 학생을 온라인으로 전담 지도함.",
  },
  "Gwangyang AI Smart i-Kium": {
    title: "광양시 AI스마트아이키움",
    role: "초3 수학·영어 강사",
    desc: "광양시 AI스마트아이키움에서 초등학교 3학년 수학·영어 수업을 맡아 진행함.",
  },
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
    desc: "청소년이 주변의 사회 문제를 직접 발굴하고 SW/AI로 해결해 나가는 한 학기 과정을 처음부터 끝까지 밀착 지도함. 코딩이 낯선 학생에게 기초 알고리즘과 데이터 활용법을 가르치고, 아이디어가 최종 결과물로 이어지는 전 과정을 함께함.",
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
      "VGG16 이미지 분류 모델 기반 식물 질병 진단 앱 (한국IT여성기업인협회 주관).",
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
