import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

// 구글(Googlebot)·네이버(Yeti) 포함 전 검색엔진 전체 허용 + 사이트맵 명시
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: "Googlebot", allow: "/" },
      { userAgent: "Yeti", allow: "/" }, // 네이버 검색로봇
      { userAgent: "Daum", allow: "/" }, // 다음
      { userAgent: "bingbot", allow: "/" },
    ],
    sitemap: [`${SITE.url}/sitemap.xml`, `${SITE.url}/sitemap1.xml`],
    host: SITE.url,
  };
}
