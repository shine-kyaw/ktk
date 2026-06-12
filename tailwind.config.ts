import type { Config } from "tailwindcss";

// "Light Shift" design system — white canvas, ink text, brand red as the
// primary interactive force, institutional blue reserved for hover/focus.
export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        canvas: "#FFFFFF",
        panel: "#F1F5F9",
        ink: {
          DEFAULT: "#0E1116",
          soft: "#3F4754",
          mute: "#8A93A1",
        },
        red: {
          DEFAULT: "#C8102E",
          soft: "#A60D26",
        },
        blue: "#003B5C",
        hair: {
          DEFAULT: "#E2E8F0",
          strong: "#CBD5E1",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-plex-mono)", "ui-monospace", "monospace"],
      },
      boxShadow: {
        lift: "0 12px 32px -12px rgb(14 17 22 / 0.18)",
      },
    },
  },
  plugins: [],
} satisfies Config;
