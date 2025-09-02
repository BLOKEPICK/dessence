# D‑Essence Wellness (Astro + Tailwind)

Production-ready landing with **extreme SEO**: per‑service pages (content collections), JSON‑LD (LocalBusiness, Service, FAQPage, Breadcrumbs), XML + HTML sitemaps, robots.txt, and appointment form.

## Quick start
npm i
npm run dev

## Build
npm run build && npm run preview

## Deploy on Vercel
1) Create new Vercel project → Import from this repo/zip.
2) Use Node **18**.
3) (Optional) Env vars:
   - PUBLIC_FORMSPREE_ID → your Formspree form ID
   - PUBLIC_GA_ID → your GA4 id (e.g. G-XXXXXXXX)
4) Update `astro.config.mjs` → `site: 'https://YOUR_DOMAIN'`
5) Redeploy.

## Edit business info
- Address/phone/hours in footer and JSON‑LD at `src/pages/index.astro`.
- Appointment page at `src/pages/appointment.astro`.

## Services
- Edit MDX under `src/content/services/*.mdx` (title, slug, meta, summary).

Notes: Minimal JS; replace `public/og-default.jpg` with a real 1200×630 OG image.
