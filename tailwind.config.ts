import type { Config } from "tailwindcss";

// "Graphite & Kraft" — dark cinematic industrial system for KTK.
// Coal page ground, iron panels, warm cement-bone type, one molten amber
// accent. Amber is the only saturated voice on the site — spend it sparingly.
export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // "Graphite & Kraft" — lifted a notch off near-black so the dark
        // industrial mood stays, just lighter. Bump these three tiers
        // together to re-tune overall lightness.
        coal: "#181B21", // page ground
        iron: "#23272F", // panels
        seam: "#373D49", // hairlines / dividers
        bone: {
          DEFAULT: "#F1EEE7",
          dim: "#CFCABF",
        },
        ash: "#A6ACB6",
        amber: {
          DEFAULT: "#F2A900",
          deep: "#C98A00",
        },
        kraft: "#E4DCCB",
      },
      fontFamily: {
        sans: ["var(--font-archivo)", "system-ui", "sans-serif"],
        mono: ["var(--font-plex-mono)", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        mega: "-0.035em",
      },
      maxWidth: {
        site: "84rem",
      },
    },
  },
  plugins: [],
} satisfies Config;
