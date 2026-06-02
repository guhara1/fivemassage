import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { SITE_URLS } from "@/lib/urls";

// /sitemap.xml — 구글·네이버 공용 표준 사이트맵
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return SITE_URLS.map((u) => ({
    url: SITE.url + u.path,
    lastModified: now,
    changeFrequency: u.changefreq,
    priority: u.priority,
  }));
}
