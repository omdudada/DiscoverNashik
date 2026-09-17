import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        orange: {
          50: "#fff7ed",
          600: "#ea580c",
          700: "#c2410c",
        },
      },
    },
  },
  plugins: [],
};
export default config;
