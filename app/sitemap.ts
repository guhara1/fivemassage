import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { AREAS } from "@/lib/areas";
import { POSTS } from "@/lib/magazine";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = [
    "/",
    "/service",
    "/service/visit-massage",
    "/service/programs",
    "/service/price",
    "/service/process",
    "/service/notes",
    "/areas",
    "/magazine",
    "/faq",
    "/about",
  ].map((path) => ({
    url: SITE.url + path,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "/" ? 1 : 0.8,
  }));

  const areaRoutes = AREAS.map((a) => ({
    url: `${SITE.url}/areas/${a.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const magRoutes = POSTS.map((p) => ({
    url: `${SITE.url}/magazine/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...areaRoutes, ...magRoutes];
}
