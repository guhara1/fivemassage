import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileBottomBar from "@/components/MobileBottomBar";
import FloatingCall from "@/components/FloatingCall";
import { SITE } from "@/lib/site";
import { JsonLd, organizationLd, localBusinessLd, websiteLd } from "@/lib/jsonld";

// 빌드 시점에 public/ 에 로고 파일이 있을 때만 이미지 로고를 사용한다.
// (파일이 없으면 깨진 이미지 대신 텍스트 로고로 표시)
function resolveLogo(): string | null {
  const pub = path.join(process.cwd(), "public");
  for (const name of ["logo.svg", "logo.png", "logo.webp", "logo.jpg"]) {
    if (fs.existsSync(path.join(pub, name))) return "/" + name;
  }
  return null;
}


export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.areasShort} 출장마사지 예약 안내 | ${SITE.name}`,
    template: `%s | ${SITE.name}`,
  },
  description: `${SITE.name}는 수원, 동탄, 오산, 용인, 분당 일부 운영지역 중심의 방문 마사지 전화예약 서비스를 안내합니다. 가격표, 이용절차, 가능지역을 확인하고 ${SITE.phoneDisplay}로 예약 가능 여부를 문의하세요.`,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: `${SITE.areasShort} 출장마사지 예약 안내 | ${SITE.name}`,
    description: `${SITE.name}는 수원·동탄·오산·용인·분당 일부 운영지역 중심의 방문 마사지 전화예약 서비스를 안내합니다.`,
    locale: "ko_KR",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const logoSrc = resolveLogo();
  return (
    <html lang="ko">
      <body className="min-h-screen">
        <JsonLd data={[organizationLd(), localBusinessLd(), websiteLd()]} />
        <Header logoSrc={logoSrc} />
        <main>{children}</main>
        <Footer logoSrc={logoSrc} />
        <MobileBottomBar />
        <FloatingCall />
      </body>
    </html>
  );
}
