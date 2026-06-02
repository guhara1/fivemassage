import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0d1b2a",
          deep: "#070f18",
          soft: "#16263a",
          card: "#11203200",
        },
        gold: {
          DEFAULT: "#c8a35a",
          soft: "#e0c389",
          dark: "#a07e3a",
        },
        ivory: {
          DEFAULT: "#f5f1e8",
          soft: "#fbf9f3",
        },
      },
      fontFamily: {
        sans: [
          "var(--font-sans)",
          "Pretendard",
          "system-ui",
          "-apple-system",
          "sans-serif",
        ],
      },
      keyframes: {
        pulseRing: {
          "0%": { boxShadow: "0 0 0 0 rgba(200,163,90,0.55)" },
          "70%": { boxShadow: "0 0 0 16px rgba(200,163,90,0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(200,163,90,0)" },
        },
      },
      animation: {
        pulseRing: "pulseRing 1.6s infinite",
      },
    },
  },
  plugins: [],
};

export default config;
