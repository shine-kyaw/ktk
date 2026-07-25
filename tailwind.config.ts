import type { Config } from "tailwindcss";

// "Cement & Signal" — light, premium industrial system for KTK.
// A soft cement-white ground with white panels and the odd light-blue tint
// gives the site a clean, trustworthy B2B feel with section-to-section
// rhythm. Near-black type. Two saturated voices, spent sparingly: RED is the
// primary accent (CTAs, highlights, the logo red), BLUE is the secondary /
// feature color. A small number of INK (near-black) sections add cinematic
// drama against the light base. Token names are appearance-based, so most
// components flow light automatically.
export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        coal: "#F5F3EF", // page ground — warm cement white
        iron: "#FCFBF9", // panels — faint warm white, one step up
        mist: "#EDF0FA", // light blue-tinted panel (the one cool voice)
        seam: "#E1DDD5", // hairlines / dividers — warm cement gray
        bone: {
          DEFAULT: "#16130E", // near-black warm charcoal type
          dim: "#4C463D", // secondary warm-taupe type
        },
        ash: "#6E6A62", // muted warm stone gray type
        red: {
          DEFAULT: "#ED1C24", // KTK brand red from the official guideline
          deep: "#C4121A",
        },
        blue: {
          DEFAULT: "#2F318D", // KTK brand blue from the official guideline
          deep: "#25266F",
        },
        inst: "#2F318D", // institutional / feature blocks = blue
        ink: "#0C0A08", // warm charcoal-black — dark cinematic sections
        navy: "#1A1D4D", // deep blue — quiet fills
      },
      fontFamily: {
        sans: ["var(--font-archivo)", "system-ui", "sans-serif"],
        display: ['"Archivo Expanded"', "var(--font-archivo)", "system-ui", "sans-serif"],
        mono: ["var(--font-plex-mono)", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        mega: "-0.015em", // expanded display wants air, not crush
      },
      maxWidth: {
        site: "84rem",
      },
    },
  },
  plugins: [],
} satisfies Config;
