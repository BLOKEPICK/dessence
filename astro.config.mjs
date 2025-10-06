import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  trailingSlash: 'always', // genera /about-us/index.html, /our-approach/index.html, etc.
  alias: {
    '@': '/src',
  },
});
