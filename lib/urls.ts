// 사이트 전체 URL 목록 (사이트맵·RSS 공용)
import { AREAS } from "./areas";
import { POSTS } from "./magazine";

export type UrlEntry = {
  path: string;
  changefreq: "weekly" | "monthly" | "daily";
  priority: number;
};

export const SITE_URLS: UrlEntry[] = [
  { path: "/", changefreq: "weekly", priority: 1.0 },
  { path: "/service", changefreq: "monthly", priority: 0.7 },
  { path: "/service/visit-massage", changefreq: "monthly", priority: 0.8 },
  { path: "/service/programs", changefreq: "monthly", priority: 0.7 },
  { path: "/service/price", changefreq: "weekly", priority: 0.9 },
  { path: "/service/process", changefreq: "monthly", priority: 0.7 },
  { path: "/service/notes", changefreq: "monthly", priority: 0.6 },
  { path: "/areas", changefreq: "weekly", priority: 0.8 },
  { path: "/magazine", changefreq: "weekly", priority: 0.7 },
  { path: "/faq", changefreq: "monthly", priority: 0.6 },
  { path: "/about", changefreq: "monthly", priority: 0.5 },
  ...AREAS.map((a) => ({
    path: `/areas/${a.slug}`,
    changefreq: "weekly" as const,
    priority: 0.7,
  })),
  ...POSTS.map((p) => ({
    path: `/magazine/${p.slug}`,
    changefreq: "monthly" as const,
    priority: 0.6,
  })),
];
