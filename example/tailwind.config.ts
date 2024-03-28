import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    fontFamily: {
      sans: ["Pretendard", "-apple-system", "sans-serif"],
      "toss-face": ["var(--font-toss-face)", "Pretendard", "-apple-system", "sans-serif"],
    },
    screens: {
      tablet: "640px",
    },
  },
  plugins: [],
};
export default config;
