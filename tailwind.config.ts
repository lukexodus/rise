import type { Config } from "tailwindcss";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        '8': '2rem',
        '10': '2.5rem',
        '20': '5rem',
      },
      screens: {
        'lg': '1024px',
        'xl': '1280px',
      }
    },
  },
  plugins: [],
} satisfies Config;