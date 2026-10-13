import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}", "./preview/**/*.{ts,tsx,html}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        ink: {
          DEFAULT: "var(--ink)",
          strong: "var(--ink-strong)",
          muted: "var(--ink-muted)",
          faint: "var(--ink-faint)",
          label: "var(--ink-label)",
        },
        line: {
          DEFAULT: "var(--border)",
          strong: "var(--border-strong)",
          divider: "var(--divider)",
        },
        chip: {
          DEFAULT: "var(--chip-bg)",
          line: "var(--chip-border)",
          ink: "var(--chip-ink)",
        },
        brand: {
          DEFAULT: "var(--brand)",
          hover: "var(--brand-hover)",
          soft: "var(--brand-soft)",
          ink: "var(--brand-ink)",
          ring: "var(--brand-ring)",
          "pill-bg": "var(--brand-pill-bg)",
          "pill-line": "var(--brand-pill-border)",
        },
        hot: {
          line: "var(--hot-border)",
        },
        star: {
          DEFAULT: "var(--star)",
          bright: "var(--star-bright)",
          empty: "var(--star-empty)",
        },
        soon: {
          bg: "var(--soon-bg)",
          ink: "var(--soon-ink)",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        dm: ["var(--font-dm-sans)", "DM Sans", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(22, 25, 36, 0.03)",
        "card-hover": "0 1px 0 0 var(--brand-ring), 0 6px 18px rgba(30, 146, 94, 0.08)",
        hot: "0 0 20px 0 rgba(255, 145, 80, 0.55)",
        action: "0 4px 14px rgba(30, 146, 94, 0.15)",
        cta: "0 6px 18px rgba(30, 146, 94, 0.25)",
        menu: "0 12px 32px -8px rgba(22, 25, 36, 0.18), 0 2px 6px rgba(22, 25, 36, 0.06)",
        modal: "0 24px 64px -12px rgba(22, 25, 36, 0.25), 0 2px 8px rgba(22, 25, 36, 0.06)",
      },
      keyframes: {
        "overlay-in": { from: { opacity: "0" }, to: { opacity: "1" } },
        "overlay-out": { from: { opacity: "1" }, to: { opacity: "0" } },
        "dialog-in": {
          from: { opacity: "0", transform: "translate(-50%, -50%) scale(0.96)" },
          to: { opacity: "1", transform: "translate(-50%, -50%) scale(1)" },
        },
        "dialog-out": {
          from: { opacity: "1", transform: "translate(-50%, -50%) scale(1)" },
          to: { opacity: "0", transform: "translate(-50%, -50%) scale(0.96)" },
        },
        "sheet-in": { from: { transform: "translateY(100%)" }, to: { transform: "translateY(0)" } },
        "sheet-out": {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(100%)" },
        },
        "card-in": { from: { opacity: "0" }, to: { opacity: "1" } },
        "hero-in": { from: { opacity: "0.3" }, to: { opacity: "1" } },
        "menu-in": {
          from: { opacity: "0", transform: "translateY(-4px) scale(0.98)" },
          to: { opacity: "1", transform: "translateY(0) scale(1)" },
        },
      },
      animation: {
        "overlay-in": "overlay-in 180ms ease-out",
        "overlay-out": "overlay-out 150ms ease-in forwards",
        "dialog-in": "dialog-in 180ms cubic-bezier(0.16, 1, 0.3, 1)",
        "dialog-out": "dialog-out 140ms ease-in forwards",
        "sheet-in": "sheet-in 260ms cubic-bezier(0.16, 1, 0.3, 1)",
        "sheet-out": "sheet-out 180ms ease-in forwards",
        "menu-in": "menu-in 140ms cubic-bezier(0.16, 1, 0.3, 1)",
        "card-in": "card-in 300ms ease-out both",
        "hero-in": "hero-in 400ms ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
