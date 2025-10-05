# D‑Essence Patch (2025-10-05T02:32:04)

Este paquete contiene **archivos de reemplazo** listos para usar con tu proyecto Astro + Tailwind.

## Archivos incluidos

- `src/layouts/BaseLayout.astro` — Layout global con **Header (desktop + mobile drawer CSS-only)** y **Footer**, e **import de `globals.css`**.
- `src/pages/index.astro` — Home limpio usando el layout global y con **SEO** en el frontmatter.
- `src/styles/globals.css` — Incluye `@tailwind base; @tailwind components; @tailwind utilities;` y utilidades comunes.
- `tailwind.config.cjs` — Config mínimo que escanea `src/**/*`.
- `postcss.config.cjs` — PostCSS con Tailwind + Autoprefixer.
- `astro.config.mjs` — Config mínima segura para Vercel.

## Cómo aplicar

1. Copia el contenido del zip sobre tu repo (respaldando antes).
2. Asegúrate de tener en `package.json`:
   ```json
   {
     "devDependencies": {
       "tailwindcss": "^3.4.0",
       "autoprefixer": "^10.4.0",
       "postcss": "^8.4.0",
       "astro": "^4.0.0"
     }
   }
   ```
3. Ejecuta:
   ```bash
   npm i
   npm run build
   npm run preview
   ```
4. Sube a Vercel.

## Notas

- El header móvil usa un **input peer** para abrir/cerrar el drawer (sin JS) y evitar stacking/scroll issues.
- Si tienes otros estilos globales, fusiónalos con `src/styles/globals.css`.
