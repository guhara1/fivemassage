import { SITE } from "./site";

// 페이지에 실제로 보이는 내용과 일치시키는 것을 전제로 한 구조화 데이터 빌더.

export function organizationLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    legalName: SITE.company,
    url: SITE.url,
    telephone: SITE.phoneDisplay,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address,
      addressCountry: "KR",
    },
  };
}

export function localBusinessLd() {
  return {
    "@context": "https://schema.org",
    "@type": "HealthAndBeautyBusiness",
    name: SITE.name,
    url: SITE.url,
    telephone: SITE.phoneDisplay,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address,
      addressCountry: "KR",
    },
    areaServed: ["수원", "동탄", "오산", "용인", "분당"],
    description:
      "파이브 마사지는 수원·동탄·오산·용인·분당 일부 운영지역 중심의 전화예약 방문 마사지 안내 서비스입니다.",
  };
}

export function websiteLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.url,
  };
}

// 가격 정보를 포함한 Service (가격표 페이지의 표시 내용과 일치)
export function serviceLd(
  programs: { name: string; desc: string; prices: { duration: string; price: number }[] }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "방문 마사지 예약 안내",
    provider: { "@type": "Organization", name: SITE.name },
    areaServed: ["수원", "동탄", "오산", "용인", "분당"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "파이브 마사지 프로그램",
      itemListElement: programs.map((p) => ({
        "@type": "Offer",
        name: p.name,
        description: p.desc,
        priceCurrency: "KRW",
        priceSpecification: p.prices.map((pr) => ({
          "@type": "UnitPriceSpecification",
          price: pr.price,
          priceCurrency: "KRW",
          referenceQuantity: {
            "@type": "QuantitativeValue",
            value: parseInt(pr.duration, 10),
            unitCode: "MIN",
          },
        })),
      })),
    },
  };
}

export function faqLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function articleLd({
  title,
  description,
  path,
  dateModified,
  datePublished,
}: {
  title: string;
  description: string;
  path: string;
  dateModified: string;
  datePublished?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    inLanguage: "ko-KR",
    mainEntityOfPage: { "@type": "WebPage", "@id": SITE.url + path },
    author: { "@type": "Organization", name: SITE.name },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      legalName: SITE.company,
    },
    datePublished: datePublished ?? dateModified,
    dateModified,
  };
}

// 목록 페이지(가능지역·매거진)용 ItemList
export function itemListLd(
  name: string,
  items: { name: string; path: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    numberOfItems: items.length,
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      url: SITE.url + it.path,
    })),
  };
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: SITE.url + it.path,
    })),
  };
}

export function JsonLd({ data }: { data: object | object[] }) {
  const arr = Array.isArray(data) ? data : [data];
  return (
    <>
      {arr.map((d, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(d) }}
        />
      ))}
    </>
  );
}
