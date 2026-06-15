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
        coal: "#F4F5F7", // page ground — soft cement white
        iron: "#FFFFFF", // white panels — one step up
        mist: "#EEF1FB", // light blue-tinted panel
        seam: "#DCE0E7", // hairlines / dividers
        bone: {
          DEFAULT: "#0E1116", // near-black type
          dim: "#454C58", // secondary type
        },
        ash: "#6B7280", // muted grey type
        red: {
          DEFAULT: "#FC1303", // primary accent
          deep: "#C70F02",
        },
        blue: {
          DEFAULT: "#3B41ED", // secondary / feature accent
          deep: "#2D32CC",
        },
        inst: "#3B41ED", // institutional / feature blocks = blue
        ink: "#0B0D12", // dark cinematic sections
        navy: "#1A1D4D", // deep blue — quiet fills
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
