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
        'sm': '640px',    // Default Tailwind
        'smd': '704px',   // Halfway between sm (640px) and md (768px)
        'md': '768px',    // Default Tailwind
        'mdlg': '896px',  // Halfway between md (768px) and lg (1024px)
        'lg': '1024px',   // Existing
        'lgxl': '1152px', // Halfway between lg (1024px) and xl (1280px)
        'xl': '1280px',   // Existing
        '2xl': '1536px',  // Existing
      }
    },
  },
  plugins: [],
} satisfies Config;