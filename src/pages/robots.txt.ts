export const prerender = true;

export async function GET() {
  const isProd = (import.meta.env.VERCEL_ENV === 'production' || import.meta.env.MODE === 'production');
  const body = isProd
    ? `User-agent: *\nAllow: /\nSitemap: https://d-essencewellness.com/sitemap-index.xml`
    : `User-agent: *\nDisallow: /`;
  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' }
  });
}