/** @type {import('tailwindcss').Config} */

function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgb(var(${variableName}) / ${opacityValue})`;
    }
    return `rgb(var(${variableName}))`;
  };
}

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        bg: withOpacity("--bg"),
        background: withOpacity("--background"),
        surface: withOpacity("--surface"),
        "surface-elevated": withOpacity("--surface-elevated"),
        "surface-dim": withOpacity("--surface-dim"),
        "surface-bright": withOpacity("--surface-bright"),
        "surface-container": withOpacity("--surface-container"),
        "surface-container-high": withOpacity("--surface-container-high"),
        "surface-container-highest": withOpacity("--surface-container-highest"),
        "surface-container-low": withOpacity("--surface-container-low"),
        "surface-container-lowest": withOpacity("--surface-container-lowest"),
        "on-surface": withOpacity("--on-surface"),
        "on-surface-variant": withOpacity("--on-surface-variant"),
        "inverse-surface": withOpacity("--inverse-surface"),
        "inverse-on-surface": withOpacity("--inverse-on-surface"),
        "on-background": withOpacity("--on-background"),
        line: withOpacity("--line"),
        "line-subtle": withOpacity("--line-subtle"),
        ink: withOpacity("--ink"),
        mute: withOpacity("--mute"),
        "text-primary": withOpacity("--text-primary"),
        "text-muted": withOpacity("--text-muted"),
        primary: withOpacity("--primary"),
        "primary-container": withOpacity("--primary-container"),
        "on-primary-container": withOpacity("--on-primary-container"),
        "inverse-primary": "#0057ce",
        secondary: withOpacity("--secondary"),
        "secondary-container": withOpacity("--secondary-container"),
        "on-secondary-container": withOpacity("--on-secondary-container"),
        "status-ok": withOpacity("--status-ok"),
        "status-warn": withOpacity("--status-warn"),
        "status-err": withOpacity("--status-err"),
        accent: withOpacity("--accent"),
        ok: withOpacity("--ok"),
        warn: withOpacity("--warn"),
        err: withOpacity("--err"),
      },
      spacing: {
        gutter: "1.5rem",
        "gutter-sm": "1rem",
        margin: "2rem",
        "margin-sm": "1rem",
        "space-xs": "0.25rem",
        "space-sm": "0.5rem",
        "space-md": "1rem",
        "space-lg": "1.5rem",
        "space-xl": "2.5rem",
      },
      fontFamily: {
        arabic: ["Cairo", "sans-serif"],
        sans: ["Inter", "Poppins", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
        "headline-xl": ["Space Grotesk", "Cairo", "sans-serif"],
        "headline-lg": ["Space Grotesk", "Cairo", "sans-serif"],
        "headline-md": ["Space Grotesk", "Cairo", "sans-serif"],
        "title-lg": ["Cairo", "Inter", "sans-serif"],
        "title-md": ["Cairo", "Inter", "sans-serif"],
        "body-lg": ["Cairo", "Inter", "sans-serif"],
        "body-md": ["Cairo", "Inter", "sans-serif"],
        "body-sm": ["Cairo", "Inter", "sans-serif"],
        "label-md": ["JetBrains Mono", "monospace"],
        "label-sm": ["JetBrains Mono", "monospace"],
        "code-block": ["JetBrains Mono", "monospace"],
      },
      boxShadow: {
        glow: "0 0 25px -5px rgba(13, 110, 253, 0.45)",
        "glow-accent": "0 0 25px -5px rgba(0, 195, 255, 0.45)",
        card: "var(--card-shadow, 0 0 20px -4px rgba(0, 195, 255, 0.15))",
        modal: "var(--modal-shadow, 0 0 40px -8px rgba(13, 110, 253, 0.35))",
      },
      borderRadius: {
        DEFAULT: "10px",
        card: "14px",
      }
    },
  },
  plugins: [],
};
