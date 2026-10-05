import type { Config } from "tailwindcss";

// 새 디자인은 대부분 app/globals.css 의 컴포넌트 클래스로 그린다.
// 여기 토큰은 개인정보·에러 페이지가 쓰는 옛 이름을 새 팔레트에 연결해 둔 것.
const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "rgb(var(--cream) / <alpha-value>)",
        sand: "rgb(var(--sand) / <alpha-value>)",
        "sand-deep": "rgb(var(--sand-deep) / <alpha-value>)",
        ink: "rgb(var(--ink) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        lime: "rgb(var(--signal) / <alpha-value>)",
        "lime-ink": "rgb(var(--on-signal) / <alpha-value>)",
      },
      fontFamily: {
        display: ["var(--font-archivo)", "Pretendard Variable", "sans-serif"],
        sans: ["Pretendard Variable", "Pretendard", "system-ui", "sans-serif"],
      },
      borderRadius: { "4xl": "2rem" },
      maxWidth: { shell: "1080px" },
    },
  },
  plugins: [],
};

export default config;
