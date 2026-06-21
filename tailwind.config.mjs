import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx,svelte,vue}"],
  theme: {
    extend: {
      colors: {
        cream: {
          50: "#FFFBEB",
          100: "#FEF3C7",
          200: "#FDE68A",
        },
        navy: {
          DEFAULT: "#B45309",
          600: "#B45309",
          700: "#92400E",
        },
        terracotta: {
          400: "#FDE68A",
          500: "#059669",
          600: "#047857",
        },
        primary: { DEFAULT: "#B45309" },
        accent: { DEFAULT: "#059669" },
        sage: { 400: "#8FA888", 500: "#6F8B6A", 600: "#566F52" },
        rose: { deep: "#0B1120" },
        ink: {
          900: "#451A03",
          700: "#92400E",
          500: "#B45309",
        },
      },
      maxWidth: {
        prose: "68ch",
        site: "72rem",
      },
      typography: {
        DEFAULT: { css: { maxWidth: "68ch" } },
        ink: { css: { color: "#334155" } },
      },
      fontFamily: {
        display: ["Playfair Display", "Georgia", "serif"],
        sans: ["Nunito Sans", "system-ui", "sans-serif"],
        body: ["Nunito Sans", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [typography],
};
