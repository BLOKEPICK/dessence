/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0A0A0A',
        muted: '#6b7280',
        line: '#e5e7eb'
      },
      fontFamily: {
        sans: ['Sora', 'ui-sans-serif', 'system-ui'],
        display: ['Sora', 'ui-sans-serif', 'system-ui']
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        'full': '9999px'
      },
      boxShadow: {
        soft: '0 10px 30px -12px rgba(0,0,0,.15)'
      },
      keyframes: {
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-4px)' } }
      },
      animation: {
        float: 'float 6s ease-in-out infinite'
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography')
  ]
};
