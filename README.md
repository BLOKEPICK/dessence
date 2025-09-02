# D‑Essence Wellness (Astro + Tailwind) — Fixed Build

This build removes the React-based Vercel Analytics import and uses **.md** content files to avoid @astrojs/mdx peer dependency warnings.

## Quick start
npm i
npm run dev

## Build
npm run build && npm run preview

## Deploy on Vercel
1) Import this project.
2) Node **18**.
3) (Optional) Env vars:
   - PUBLIC_FORMSPREE_ID → your Formspree form ID
   - PUBLIC_GA_ID → your GA4 id (e.g. G-XXXXXXXX)
4) Update `astro.config.mjs` → `site: 'https://YOUR_DOMAIN'`

## Notes
- If you want Vercel Analytics later, use the Astro/HTML snippet from Vercel docs (no React import).
- Services live in `src/content/services/*.md`.
