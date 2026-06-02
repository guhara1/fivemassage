import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { AREAS } from "@/lib/areas";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = ["/", "/service/price", "/areas"].map((path) => ({
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

  return [...staticRoutes, ...areaRoutes];
}
