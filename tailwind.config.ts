import type { Config } from "tailwindcss";

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
        // Accent (kept token name "lime" for compatibility; value is the point color).
        lime: "#3B82F6",
        "lime-ink": "#FFFFFF",
      },
      fontFamily: {
        display: ['"General Sans"', "sans-serif"],
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
      },
      borderRadius: {
        "4xl": "2rem",
      },
      maxWidth: {
        shell: "1080px",
      },
    },
  },
  plugins: [],
};

export default config;
