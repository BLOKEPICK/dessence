/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,md,mdx,js,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          black: "#0B0B0B",
          white: "#FFFFFF",
          gray: "#F3F4F6",
          darkgray: "#1F2937"
        }
      },
      fontFamily: {
        sans: ['ui-sans-serif','system-ui','-apple-system','Segoe UI','Roboto','Inter','Helvetica Neue','Arial','Noto Sans','sans-serif']
      },
      boxShadow: {
        soft: "0 10px 30px rgba(0,0,0,0.06)"
      }
    }
  },
  plugins: []
};
