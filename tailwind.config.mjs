import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx,svelte,vue}"],
  theme: {
    extend: {
      colors: {
        cream: {
          50: "#FFF8ED",
          100: "#F5EEE4",
          200: "#E6DFD5",
        },
        terracotta: {
          400: "#CF5F0A",
          500: "#B45309",
          600: "#944407",
        },
        primary: { DEFAULT: "#7A3E12" },
        accent: { DEFAULT: "#B45309" },
        sage: { 400: "#8FA888", 500: "#6F8B6A", 600: "#566F52" },
        rose: { deep: "#1A1A2E" },
        ink: {
          900: "#0B1120",
          700: "#334155",
          500: "#64748B",
        },
      },
      maxWidth: {
        prose: "68ch",
      },
            typography: {
        DEFAULT: { css: { maxWidth: "68ch" } },
        ink: { css: { color: "#4A4340" } },
      },
      fontFamily: {
        display: ['Libre Baskerville', "Georgia", "serif"],
        sans: ['Nunito Sans', "system-ui", "sans-serif"],
        body: ['Nunito Sans', "sans-serif"],
        mono: ['JetBrains Mono', "monospace"],
      },
    },
  },
  plugins: [typography],
};
