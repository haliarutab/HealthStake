import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        // --------------------------
        // BRAND COLORS (Navbar + UI)
        // --------------------------
        brand: {
          blue: "#007BFF",         // Navbar blue
          blueHover: "#0046CC",    // Hover blue
          grayText: "#6B7280",     // Navigation text
          border: "#E5E7EB",       // Navbar border
        },

        // --------------------------
        // PRIMARY SET (your list)
        // --------------------------
        primary: "#007BFF",
        primaryLight: "#4DA3FF",
        primaryDark: "#005FCC",
        primaryDarker: "#0056B3",

        // --------------------------
        // NEUTRAL / TEXT COLORS
        // --------------------------
        heading: "#1A1A1A",
        paragraph: "#4A4A4A",
        muted: "#6B7280",
        lightGray: "#F5F7FA",
        border: "#E5E7EB",

        // --------------------------
        // ACCENTS
        // --------------------------
        accentBlue: "#0056D6",
        accentSky: "#00A7FF",
        accentGreen: "#16A34A",

        // --------------------------
        // BACKGROUND COLORS
        // --------------------------
        background: "#FFFFFF",
        sectionBg: "#F0F7FF",
        softBlue: "#EAF3FF",

        // --------------------------
        // STATS COLOR SET
        // --------------------------
        statBlue: "#1E90FF",
        statPurple: "#6A5ACD",
        statGreen: "#3CB371",
      },

      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
