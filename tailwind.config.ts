import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green: "#003B0A",
          deep: "#002B08",
          white: "#FFFFFF",
          offWhite: "#F5F5F0",
          charcoal: "#111111",
          softGray: "#E5E5E5",
          muted: "#737373"
        }
      },
      boxShadow: {
        soft: "0 18px 60px rgba(17, 17, 17, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
