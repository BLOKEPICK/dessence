import type { APIRoute } from 'astro';
const SITE = 'https://dessencewellness.com';
const services = ["specialty-treatments","waxing","facials","spider-vein-treatment","vitamin-injections","prp-platelet-rich-plasma","nefertiti-neck","neurotoxins","skinvive","skincare","teeth-whitening","filler-dissolving","juvederm-fillers","smooth-pdo-threads","microneedling","aerolase","chemical-peels"];
const routes = ['/', '/services', '/about', '/contact', ...services.map(s => `/services/${s}`)];
export const GET: APIRoute = () => {
  const urls = routes.map((path) => `  <url><loc>${SITE}${path}</loc><changefreq>weekly</changefreq><priority>${path==='/'? '1.0':'0.7'}</priority></url>`).join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
  return new Response(xml, { status: 200, headers: { 'Content-Type': 'application/xml; charset=UTF-8' } });
};
