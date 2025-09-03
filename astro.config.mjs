import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://example.com', // TODO: replace with real domain
  integrations: [tailwind({ applyBaseStyles: false }), sitemap()],
  output: 'static',
  prefetch: true
});
