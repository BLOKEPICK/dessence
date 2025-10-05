import { defineConfig } from 'astro/config';

// If you use integrations (e.g., tailwind), include them here.
// This config is intentionally minimal and safe for Vercel.
export default defineConfig({
  output: 'static',
  build: {
    format: 'file'
  },
});
