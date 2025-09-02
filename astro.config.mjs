import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

const SITE_URL = 'https://example.com'; // TODO replace with real domain

export default defineConfig({
  site: SITE_URL,
  integrations: [ tailwind({ applyBaseStyles: false }), sitemap() ],
  output: 'static',
  prefetch: true
});
