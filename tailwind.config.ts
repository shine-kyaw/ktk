import type { Config } from "tailwindcss";

// "Graphite & Kraft" — dark cinematic industrial system for KTK.
// Coal page ground, iron panels, warm cement-bone type, one molten amber
// accent. Amber is the only saturated voice on the site — spend it sparingly.
export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        coal: "#0B0C0E",
        iron: "#15171C",
        seam: "#232730",
        bone: {
          DEFAULT: "#EDE9E0",
          dim: "#C9C4B8",
        },
        ash: "#9AA0AA",
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
