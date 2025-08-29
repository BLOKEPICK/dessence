import defaultTheme from 'tailwindcss/defaultTheme';
import plugin from 'tailwindcss/plugin';
import typographyPlugin from '@tailwindcss/typography';

export default {
  content: ['./src/**/*.{astro,html,js,jsx,json,md,mdx,svelte,ts,tsx,vue}'],
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
      fontFamily: {
        sans: ['var(--aw-font-sans, ui-sans-serif)', ...defaultTheme.fontFamily.sans],
        serif: ['var(--aw-font-serif, ui-serif)', ...defaultTheme.fontFamily.serif],
        heading: ['var(--aw-font-heading, ui-sans-serif)', ...defaultTheme.fontFamily.sans],
      },

      animation: {
        fade: 'fadeInUp 1s both',
      },

      keyframes: {
        fadeInUp: {
          '0%': { opacity: 0, transform: 'translateY(2rem)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [
    typographyPlugin,
    plugin(({ addVariant }) => {
      addVariant('intersect', '&:not([no-intersect])');
    }),
  ],
  darkMode: 'class',
};
