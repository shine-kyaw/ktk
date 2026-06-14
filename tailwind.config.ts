import type { Config } from "tailwindcss";

// "Graphite & Kraft" — dark cinematic industrial system for KTK.
// Coal page ground, iron panels, warm cement-bone type, one molten amber
// accent. Amber is the only saturated voice on the site — spend it sparingly.
export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // KTK brand system — a NAVY + SLATE "trust" foundation (calm,
        // neutral, institutional) with the logo's RED as a disciplined
        // accent and INSTITUTIONAL blue for credibility blocks. Gradual,
        // cool, premium-without-luxury. No green, no gold.
        coal: "#0E2236", // navy page ground
        iron: "#173049", // panels — one gentle step up
        seam: "#33465D", // slate hairlines / dividers
        bone: {
          DEFAULT: "#EBEFF5", // cool near-white
          dim: "#BFC8D5",
        },
        ash: "#8893A4", // slate, muted text
        red: {
          DEFAULT: "#E2483B", // logo red — the single warm accent
          deep: "#C2392C",
        },
        inst: "#003B5C", // institutional blue — credibility blocks
        navy: "#0A2540", // deepest navy — emblem, deep fills
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
