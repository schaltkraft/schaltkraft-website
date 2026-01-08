import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: "#F18A5B",
        },
        surface: {
          warm: "#B8AFAE",
        }
      },
      borderRadius: {
        pill: "9999px",
        super: "2rem",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        heading: ["var(--font-montserrat)", "sans-serif"],
      },
      animation: {
        marquee: "marquee var(--duration, 40s) linear infinite",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-100% - var(--gap)))" },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
export default config;
