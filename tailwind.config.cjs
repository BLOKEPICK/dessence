/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}'],
  theme: {
    extend: {
      colors: { ink: '#111111', muted: '#6b7280', line: '#e5e7eb' },
      fontFamily: { sans: ['Inter','ui-sans-serif','system-ui'], display: ['Playfair Display','serif'] },
      borderRadius: { '2xl': '1rem' }
    }
  },
  plugins: []
};
