import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        sans: [
          "var(--font-albert-sans)",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        "albert-sans": ["var(--font-albert-sans)", "sans-serif"],
        Albert_Sans: ["var(--font-albert-sans)", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
