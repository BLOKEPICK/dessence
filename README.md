# D‑Essence Wellness (Astro + Tailwind) — Fix v2

- Removed `slug` from content schema and frontmatter (Astro reserves it).
- Updated code to use `entry.slug` instead of `entry.data.slug`.
- No React imports. No MDX.

Deploy tips:
1) Replace `site` in `astro.config.mjs` with your real domain.
2) Add `PUBLIC_FORMSPREE_ID` in env if using Formspree.
3) `npm i && npm run build` should pass locally and on Vercel.
