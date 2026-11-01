// 사진 파일명과 촬영 안내의 단일 원본.
export const photoSlots = [
  {
    name: "group-learning", number: "①", description: "학습 전시물을 체험하는 관람객",
    aspectRatio: "4:3", minimumSize: "1600×1200",
    guidance: "태블릿이나 키오스크를 사용하는 손 또는 뒷모습을 권장합니다. 어린이 얼굴은 동의가 있는 경우에만 사용합니다.",
    alt: { en: "Visitors using an interactive learning exhibit", ko: "학습 전시물의 태블릿이나 키오스크를 사용하는 관람객" },
  },
  {
    name: "group-software", number: "②", description: "현장에서 사용하는 앱·키오스크",
    aspectRatio: "4:3", minimumSize: "1600×1200",
    guidance: "과학관에 설치되어 사용 중인 앱·키오스크 또는 직원용 앱을 사용하는 장면을 담습니다. 어린이는 뒷모습을 권장하며, 얼굴은 동의가 있는 경우에만 사용합니다.",
    alt: { en: "A museum app or kiosk being used on site", ko: "과학관 현장에서 앱이나 키오스크를 사용하는 모습" },
  },
  {
    name: "group-teaching", number: "③", description: "강의·멘토링 현장",
    aspectRatio: "4:3", minimumSize: "1600×1200",
    guidance: "수업이나 멘토링 중인 장면을 담습니다. 학생의 손이나 뒷모습을 권장하며, 어린이 얼굴은 동의가 있는 경우에만 사용합니다.",
    alt: { en: "A teaching or mentoring session", ko: "학생들과 함께하는 강의 또는 멘토링 현장" },
  },
  {
    name: "about-tour", number: "④", description: "이주원의 영어 전시 해설",
    aspectRatio: "4:5", minimumSize: "1600×2000",
    guidance: "이주원이 영어로 전시를 안내하는 세로 사진을 담습니다. 어린이 관람객은 뒷모습을 권장하며, 얼굴은 동의가 있는 경우에만 사용합니다.",
    alt: { en: "Juwon Lee guiding an exhibition tour in English", ko: "영어로 전시 해설을 진행하는 이주원" },
  },
] as const;

export type PhotoName = (typeof photoSlots)[number]["name"];
