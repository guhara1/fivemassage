import { SITE } from "@/lib/site";
import { SITE_URLS } from "@/lib/urls";

// 정적 export에서 파일로 출력
export const dynamic = "force-static";

// /sitemap1.xml — 구글 서치콘솔 제출용 (sitemap.xml과 동일 URL 세트)
export function GET() {
  const now = new Date().toISOString();
  const body =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    SITE_URLS.map(
      (u) =>
        `  <url>\n` +
        `    <loc>${SITE.url}${u.path}</loc>\n` +
        `    <lastmod>${now}</lastmod>\n` +
        `    <changefreq>${u.changefreq}</changefreq>\n` +
        `    <priority>${u.priority.toFixed(1)}</priority>\n` +
        `  </url>`
    ).join("\n") +
    `\n</urlset>\n`;

  return new Response(body, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
