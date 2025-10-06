import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  trailingSlash: 'always', // ← clave para evitar 404 en estático
  // ...lo demás de tu config
});
