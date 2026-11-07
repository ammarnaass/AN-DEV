/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        line: "var(--line)",
        ink: "var(--ink)",
        mute: "var(--mute)",
        primary: "var(--primary)",
        accent: "var(--accent)",
        ok: "var(--ok)",
        warn: "var(--warn)",
        err: "var(--err)",
      },
      fontFamily: {
        arabic: ["Cairo", "sans-serif"],
        sans: ["Inter", "Poppins", "sans-serif"],
        mono: ["monospace"],
      },
      boxShadow: {
        glow: "0 0 25px -5px rgba(13, 110, 253, 0.45)",
        "glow-accent": "0 0 25px -5px rgba(0, 195, 255, 0.45)",
      },
      borderRadius: {
        DEFAULT: "10px",
        card: "14px",
      }
    },
  },
  plugins: [],
};

