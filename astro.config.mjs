import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  output: 'static',
  build: { format: 'file' },
  trailingSlash: 'always',
  alias: {
    '@': fileURLToPath(new URL('./src', import.meta.url)),
  },
});
