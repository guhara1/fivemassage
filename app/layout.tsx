import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileBottomBar from "@/components/MobileBottomBar";
import FloatingCall from "@/components/FloatingCall";
import { SITE } from "@/lib/site";
import { JsonLd, organizationLd, localBusinessLd, websiteLd } from "@/lib/jsonld";

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
  return (
    <html lang="ko">
      <body className="min-h-screen">
        <JsonLd data={[organizationLd(), localBusinessLd(), websiteLd()]} />
        <Header />
        <main>{children}</main>
        <Footer />
        <MobileBottomBar />
        <FloatingCall />
      </body>
    </html>
  );
}
