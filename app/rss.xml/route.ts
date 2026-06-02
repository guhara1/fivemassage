import { SITE } from "@/lib/site";
import { POSTS, categoryTitle } from "@/lib/magazine";

export const dynamic = "force-static";

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// /rss.xml — 매거진 글 RSS 2.0 피드 (색인 발견 보조)
export function GET() {
  const posts = [...POSTS].sort((a, b) => (a.date < b.date ? 1 : -1));
  const lastBuild = new Date().toUTCString();

  const items = posts
    .map((p) => {
      const link = `${SITE.url}/magazine/${p.slug}`;
      const pub = new Date(p.date + "T09:00:00+09:00").toUTCString();
      return (
        `    <item>\n` +
        `      <title>${esc(p.title)}</title>\n` +
        `      <link>${link}</link>\n` +
        `      <guid isPermaLink="true">${link}</guid>\n` +
        `      <category>${esc(categoryTitle(p.category))}</category>\n` +
        `      <pubDate>${pub}</pubDate>\n` +
        `      <description>${esc(p.excerpt)}</description>\n` +
        `    </item>`
      );
    })
    .join("\n");

  const body =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">\n` +
    `  <channel>\n` +
    `    <title>${esc(SITE.name)} 매거진</title>\n` +
    `    <link>${SITE.url}/magazine</link>\n` +
    `    <atom:link href="${SITE.url}/rss.xml" rel="self" type="application/rss+xml" />\n` +
    `    <description>${esc(SITE.areasShort)} 방문 마사지 이용·피로관리 정보 매거진</description>\n` +
    `    <language>ko</language>\n` +
    `    <lastBuildDate>${lastBuild}</lastBuildDate>\n` +
    items +
    `\n  </channel>\n</rss>\n`;

  return new Response(body, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
