# D‑Essence Wellness (Astro + Tailwind) — Pro v1

- Build **estático** (Vercel-ready), sin React ni MDX.
- **getStaticPaths** para `/services/[slug]`.
- Diseño moderno (Sora, cards 3xl, grid/vignette, sección de Services con fondo distinto).
- **SVG únicos por servicio** (monocromo).
- SEO base + JSON-LD (Home/FAQ), sitemap y robots.

## Quick start
npm i
npm run dev

## Build
npm run build && npm run preview

## Vercel
- Node 18
- Variables (opcional): `PUBLIC_FORMSPREE_ID`
- Cambia `site` en `astro.config.mjs` por tu dominio real.

## Quick Setup Notes (added by ChatGPT)

1. Set your domain in `astro.config.mjs` (already set to https://d-essencewellness.com).
2. In Vercel Project Settings → Environment Variables, add:
   - `PUBLIC_FORMSPREE_ID=...` (from Formspree dashboard)
   - (optional) `PUBLIC_CONTACT_EMAIL=info@d-essencewellness.com`
3. Deploy on Vercel. The appointment form posts to Formspree.
4. Replace `/public/og-default.jpg` if you have a better OG image.
