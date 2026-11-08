// 상세 페이지 「시스템 구조」 도식 데이터. 예전 SVG(public/portfolio_images/flow-reborn)의 글을
// 그대로 옮기고 국문을 붙였다. 사실·숫자는 SVG·data.ts 와 같아야 한다(portfolio-claim-accuracy).
// mode: "flow" 는 노드 사이에 화살표, "set" 은 나란히 놓인 항목.

export type Text2 = { en: string; ko: string };
export type FlowNode = { label: Text2; sub?: Text2; accent?: boolean };
export type FlowGroup = { title: Text2; mode: "flow" | "set"; nodes: FlowNode[]; note?: Text2 };
export type FlowDiagram = { groups: FlowGroup[]; note?: Text2 };

const t = (en: string, ko: string): Text2 => ({ en, ko });

export const flows: Record<string, FlowDiagram> = {
  "smart-farm-education": {
    groups: [
      {
        title: t("IoT live-data pipeline", "IoT 실시간 데이터 흐름"),
        mode: "flow",
        nodes: [
          { label: t("ESP32 boards × 15", "ESP32 보드 15대"), sub: t("Temp · humidity · soil", "온도 · 습도 · 흙 수분") },
          { label: t("Arduino C++ firmware", "Arduino C++ 펌웨어"), sub: t("Wi-Fi direct POST", "Wi-Fi로 바로 전송") },
          { label: t("Supabase", "Supabase"), sub: t("Practice DB · no relay server", "실습 DB · 중계 서버 없음") },
          { label: t("Student web app", "학생용 웹앱"), sub: t("Next.js on Vercel · live values · LED, fan and pump control", "Vercel의 Next.js · 실시간 값 · LED⁠·⁠팬⁠·⁠펌프 제어"), accent: true },
        ],
      },
      {
        title: t("Weather · location-based lesson data", "날씨 · 지역별 수업 데이터"),
        mode: "flow",
        nodes: [
          { label: t("KMA weather API", "기상청 날씨 API"), sub: t("Live observations by location", "지역별 실시간 관측값") },
          { label: t("Server API route", "서버 API 경로"), sub: t("Runs on Vercel · API key stays on the server", "Vercel에서 실행 · API 키는 서버에만") },
        ],
      },
      {
        title: t("AI vision · in-browser transfer learning", "AI 비전 · 브라우저 전이학습"),
        mode: "flow",
        nodes: [
          { label: t("Transfer learning", "전이학습"), sub: t("TensorFlow.js + MobileNet v2", "TensorFlow.js + MobileNet v2") },
          { label: t("Holdout test", "시험 평가"), sub: t("Photos kept out of training", "학습에 쓰지 않은 사진") },
          { label: t("Camera check", "카메라 판정"), sub: t("On a real leaf", "실제 잎으로") },
        ],
        note: t("Training runs inside the browser, and each room keeps its own trained model.", "학습은 브라우저 안에서 돌고, 방마다 학습한 모델을 따로 둡니다."),
      },
    ],
  },

  "raim-en": {
    groups: [
      {
        title: t("Booking", "예약 흐름"),
        mode: "flow",
        nodes: [
          { label: t("Email booking", "이메일로 예약 신청"), sub: t("No Korean phone needed", "한국 휴대폰 없이"), accent: true },
          { label: t("Seat held on request", "신청과 함께 좌석 확보") },
          { label: t("Staff approval or instant confirmation", "직원 승인 또는 즉시 확정") },
          { label: t("Confirmation email", "확정 메일"), sub: t("With a calendar file", "캘린더 파일 첨부") },
        ],
      },
    ],
  },

  "doctor-green": {
    groups: [
      {
        title: t("IoT live-data pipeline", "IoT 실시간 데이터 흐름"),
        mode: "flow",
        nodes: [
          { label: t("ESP32 sensor nodes", "ESP32 센서 노드"), sub: t("Temp · humidity · soil", "온도 · 습도 · 흙 수분") },
          { label: t("Wi-Fi direct POST", "Wi-Fi로 바로 전송"), sub: t("No relay server", "중계 서버 없음") },
          { label: t("Supabase", "Supabase"), sub: t("Live sensor DB", "실시간 센서 DB") },
          { label: t("Next.js dashboard", "Next.js 대시보드"), sub: t("5s polling · live charts · desired-state control", "5초 갱신 · 실시간 차트 · 목표 상태 제어"), accent: true },
        ],
      },
      {
        title: t("AI crop diagnosis · rebuilding from the data stage", "AI 작물 진단 · 데이터 단계부터 다시 만드는 중"),
        mode: "flow",
        nodes: [
          { label: t("AI Hub 71451", "AI Hub 71451"), sub: t("Strawberry disease photos", "딸기 병해 사진") },
          { label: t("39,889 image crops", "크롭 이미지 39,889장"), sub: t("Group-aware stratified split", "그룹 단위 층화 분할") },
          { label: t("Crop classifier", "크롭 분류기"), sub: t("Next step", "다음 단계") },
        ],
        note: t(
          "5 classes (healthy + 4 diseases) · train 32,155 / val 4,326 / test 3,408. Next: train ConvNeXt-Tiny or EfficientNetV2-S on the crops. No results yet.",
          "5클래스(정상 + 병해 4종) · 학습 32,155 / 검증 4,326 / 시험 3,408. 다음 단계는 ConvNeXt-Tiny 또는 EfficientNetV2-S 학습이며 아직 결과는 없습니다.",
        ),
      },
      {
        title: t("Deployment", "배포"),
        mode: "set",
        nodes: [
          { label: t("Vercel web app", "Vercel 웹앱") },
          { label: t("AI Hub dataset", "AI Hub 데이터셋") },
          { label: t("Solo project", "개인 프로젝트") },
        ],
      },
    ],
  },

  "raimi-art-lab": {
    groups: [
      {
        title: t("Start", "시작"),
        mode: "flow",
        nodes: [
          { label: t("App launch", "앱 실행"), sub: t("URL load · kiosk", "주소 열기 · 키오스크") },
          { label: t("Intro", "소개"), sub: t("Meet Raimi · start", "라이미 인사 · 시작") },
          { label: t("Home", "홈"), sub: t("Pick blocks or chat", "블록 또는 대화 고르기") },
        ],
      },
      {
        title: t("Two ways to build the prompt", "프롬프트를 만드는 두 가지 방법"),
        mode: "set",
        nodes: [
          { label: t("Build with blocks", "블록으로 만들기"), sub: t("10 steps + 5 advanced", "10단계 + 심화 5단계") },
          { label: t("Build by chatting", "대화로 만들기"), sub: t("With Raimi · up to 8 turns", "라이미와 최대 8번") },
        ],
      },
      {
        title: t("Generate · result", "생성 · 결과"),
        mode: "flow",
        nodes: [
          { label: t("Generating art", "그림 생성"), sub: t("O/X quiz while waiting", "기다리는 동안 O/X 퀴즈") },
          { label: t("Result", "결과"), sub: t("Image + QR code takeaway", "그림 + QR 코드로 가져가기"), accent: true },
        ],
        note: t("On failure the app shows a review screen and retries; after a result, visitors can make another.", "실패하면 확인 화면을 거쳐 다시 시도하고, 결과 뒤에는 다시 만들 수 있습니다."),
      },
      {
        title: t("On every screen", "모든 화면 공통"),
        mode: "set",
        nodes: [
          { label: t("Back to intro", "처음 화면으로"), sub: t("After 3 minutes idle", "3분 동안 입력이 없을 때") },
          { label: t("KO/EN language toggle", "한⁠·⁠영 전환") },
          { label: t("Home button", "홈 버튼") },
          { label: t("Admin stats", "관리자 통계"), sub: t("Usage stats · export", "사용 통계 · 내보내기") },
        ],
      },
    ],
  },

  "raim-staff-platform": {
    groups: [
      {
        title: t("Sign-in", "진입"),
        mode: "flow",
        nodes: [
          { label: t("Login", "로그인"), sub: t("ID · password", "아이디 · 비밀번호") },
          { label: t("Data loading", "데이터 불러오기"), sub: t("Skeleton screen", "스켈레톤 화면") },
          { label: t("Role routing", "권한별 화면"), sub: t("Screen by permission", "권한에 맞는 화면") },
        ],
        note: t("First login requires a password reset.", "첫 로그인 때는 비밀번호를 다시 정해야 합니다."),
      },
      {
        title: t("Roles", "역할"),
        mode: "set",
        nodes: [
          { label: t("Docent", "해설사"), sub: t("Full access", "전체 이용") },
          { label: t("Part-time", "단기인력"), sub: t("Personal · status", "개인 · 현황") },
          { label: t("Technician", "기술 담당"), sub: t("Edit exhibits", "전시물 수정") },
          { label: t("Manager", "매니저"), sub: t("Full + admin · PC", "전체 + 관리 · PC") },
        ],
      },
      {
        title: t("Mobile app · bottom navigation", "모바일 앱 · 아래 메뉴"),
        mode: "set",
        nodes: [
          { label: t("Home", "홈"), sub: t("Current shift · today's timeline", "지금 근무 · 오늘 일정"), accent: true },
          { label: t("Notices", "공지"), sub: t("Tag filters · must-read", "태그 필터 · 필독") },
          { label: t("Schedule", "스케줄"), sub: t("Personal · full · monthly", "개인 · 전체 · 월간") },
          { label: t("Status", "현황"), sub: t("Today's exhibits by floor", "층별 오늘 전시물") },
          { label: t("My info", "내 정보"), sub: t("Profile · leave · passwords", "프로필 · 휴가 · 비밀번호") },
        ],
      },
      {
        title: t("Manager only", "매니저 전용"),
        mode: "set",
        nodes: [
          { label: t("Admin menu", "관리 메뉴"), sub: t("Staff · exhibits · notices · AI schedule draft", "직원 · 전시물 · 공지 · AI 스케줄 초안") },
          { label: t("PC console", "PC 콘솔"), sub: t("Dashboard · shifts · notices · stats", "대시보드 · 근무 편집 · 공지 · 통계") },
        ],
      },
      {
        title: t("Shared sheets", "공통 시트"),
        mode: "set",
        nodes: [
          { label: t("Exhibit issue report", "전시물 고장 신고"), sub: t("Fault history · mark resolved", "고장 이력 · 해결 표시") },
          { label: t("Assign shift", "근무 배정") },
          { label: t("Leave record", "휴가 기록") },
          { label: t("Change password", "비밀번호 변경") },
        ],
      },
    ],
  },

  "raimi-language-lab": {
    groups: [
      {
        title: t("Play and collect stamps", "놀면서 도장 모으기"),
        mode: "flow",
        nodes: [
          { label: t("Intro", "소개"), sub: t("Raimi greets the visitor", "라이미가 관람객을 맞음") },
          { label: t("Lesson menu", "레슨 메뉴"), sub: t("5 lesson cards · stamps · KO/EN", "레슨 카드 5장 · 도장 · 한/영") },
          { label: t("Play", "놀이"), sub: t("5 NLP touch mini-games", "NLP 터치 미니게임 5종") },
          { label: t("Stamp", "도장"), sub: t("One per lesson", "레슨마다 하나") },
          { label: t("Complete", "완료"), sub: t("All 5 stamps · confetti", "도장 5개 · 축하 효과"), accent: true },
        ],
        note: t("Concepts: tokens · embeddings · attention", "다루는 개념: 토큰 · 임베딩 · 어텐션"),
      },
      {
        title: t("Exhibition deployment · fully client-side", "전시 배포 · 브라우저에서만 동작"),
        mode: "set",
        nodes: [
          { label: t("No backend · no server", "백엔드 · 서버 없음") },
          { label: t("Offline-capable PWA", "오프라인 PWA") },
          { label: t("Exhibition tablet ready", "전시 태블릿용") },
        ],
      },
    ],
  },

  "exhibit-auto-recovery": {
    groups: [
      {
        title: t("Staff phone to exhibit", "직원 휴대폰에서 전시물까지"),
        mode: "flow",
        nodes: [
          { label: t("Staff phone", "직원 휴대폰"), sub: t("Recovery page · tap, then confirm", "복구 페이지 · 누른 뒤 확인") },
          { label: t("Mesh VPN", "메시 VPN"), sub: t("Encrypted tunnel", "암호화된 연결") },
          { label: t("Recovery endpoint", "복구 엔드포인트"), sub: t("Serves the button page", "버튼 페이지 제공") },
          { label: t("Restart service", "재시작 서비스"), sub: t("Stop → wait → relaunch", "중지 → 대기 → 재실행"), accent: true },
          { label: t("Exhibit program", "전시 프로그램"), sub: t("Face and voice interaction", "얼굴⁠·⁠음성 인터랙션") },
        ],
      },
      {
        title: t("Automatic triggers on the exhibit machine", "전시 컴퓨터에서 자동으로"),
        mode: "set",
        nodes: [
          { label: t("Watchdog", "워치독"), sub: t("Polls every 20 s", "20초마다 확인") },
          { label: t("Scheduler", "예약 재시작"), sub: t("Preventive, twice daily", "하루 2회 예방") },
        ],
        note: t("Both call the same restart service.", "둘 다 같은 재시작 서비스를 부릅니다."),
      },
    ],
    note: t(
      "Speech recognition can stop silently while the process stays healthy, so the phone button and scheduled restarts cover it.",
      "프로세스는 멀쩡한데 음성 인식만 멈추는 장애는 감지할 수 없어, 휴대폰 버튼과 예약 재시작이 맡습니다.",
    ),
  },
};
