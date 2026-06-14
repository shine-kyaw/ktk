import type { Config } from "tailwindcss";

// "Graphite & Kraft" — dark cinematic industrial system for KTK.
// Coal page ground, iron panels, warm cement-bone type, one molten amber
// accent. Amber is the only saturated voice on the site — spend it sparingly.
export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // KTK brand system — a blue-slate dark ramp (nods to the logo's
        // navy) with the brand RED as the single accent and NAVY reserved
        // for the emblem. Lighter and more gradual than before: the three
        // ground tiers sit close together and let hairlines do the work.
        coal: "#1E2531", // page ground
        iron: "#283143", // panels (one gentle step up)
        seam: "#3C4759", // hairlines / dividers
        bone: {
          DEFAULT: "#EFF2F7",
          dim: "#C6CCD8",
        },
        ash: "#98A1B2",
        red: {
          DEFAULT: "#E8463A", // brand red, warmed for screen legibility
          deep: "#C2392C", // hovers / bold blocks
        },
        navy: {
          DEFAULT: "#2F56C9", // emblem + rare secondary accent
          deep: "#1E3A8A",
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
