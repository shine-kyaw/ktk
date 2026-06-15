import type { Config } from "tailwindcss";

// "Ink & Signal" — high-contrast black/white industrial system for KTK.
// Pure black ground, near-black panels, white type. Two saturated voices:
// RED is the primary accent (CTAs, highlights, the logo red), BLUE is the
// secondary structural color (feature blocks, glows, technical accents).
// Black + white carry ~90% of the surface; red and blue are spent sparingly.
export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        coal: "#000000", // black page ground
        iron: "#121214", // panels — one step up from black
        seam: "#2A2A30", // hairlines / dividers
        bone: {
          DEFAULT: "#FFFFFF", // white type
          dim: "#C9CAD2", // dimmed white
        },
        ash: "#85868F", // muted grey text
        red: {
          DEFAULT: "#FC1303", // primary accent
          deep: "#C70F02",
        },
        blue: {
          DEFAULT: "#3B41ED", // secondary structural accent
          deep: "#2D32CC",
        },
        inst: "#3B41ED", // institutional / feature blocks = blue
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
