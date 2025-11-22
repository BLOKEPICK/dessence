import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.d-essencewellness.com',
  output: 'static',
  trailingSlash: 'always',
  alias: { '@': '/src' },
  integrations: [
    sitemap()
  ]
});
