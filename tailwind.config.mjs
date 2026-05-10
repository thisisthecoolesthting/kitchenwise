import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx,svelte,vue}"],
  theme: {
    extend: {
      colors: {
        cream: {
          50: "#FFF8EA",
          100: "#FFF8EA",
          200: "#F6E9C9",
        },
        terracotta: {
          400: "#C97B5C",
          500: "#C97B5C",
          600: "#5E6B3B",
        },
        primary: { DEFAULT: "#C97B5C" },
        accent: { DEFAULT: "#F6E9C9" },
        sage: { 400: "#F6E9C9", 500: "#8B7C67", 600: "#5E6B3B" },
        rose: { deep: "#1F1A14" },
        ink: {
          900: "#1F1A14",
          700: "#8B7C67",
          500: "#8B7C67",
        },
      },
      maxWidth: {
        prose: "68ch",
      },
      typography: {
        DEFAULT: { css: { maxWidth: "68ch" } },
        ink: { css: { color: "#8B7C67" } },
      },
      fontFamily: {
        display: ['Lora', "Georgia", "serif"],
        sans: ['Inter', "system-ui", "sans-serif"],
        body: ['Inter', "sans-serif"],
        mono: ['JetBrains Mono', "monospace"],
      },
    },
  },
  plugins: [typography],
};
