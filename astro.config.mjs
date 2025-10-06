import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  output: 'static',
  trailingSlash: 'never',          // <— clave para evitar los 404
  build: { format: 'file' },       // mantiene .html limpios (Vercel hace clean URLs)
  alias: {
    '@': fileURLToPath(new URL('./src', import.meta.url)),
  },
});
