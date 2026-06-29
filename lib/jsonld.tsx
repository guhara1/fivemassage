import { SITE } from "./site";
import type { BuiltReview, Rating } from "./reviews";

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

// 별점·후기를 JSON-LD(AggregateRating / Review)로 변환.
// ⚠️ 화면에 실제로 보이는 후기/별점과 동일한 값이어야 하며(lib/reviews 공용),
// 예시 후기 단계에서는 가짜 후기 정책 위반 위험이 있으므로 실제 후기로 교체 후 운용해야 한다.
function ratingLd(rating: Rating) {
  return {
    "@type": "AggregateRating",
    ratingValue: rating.ratingValue,
    reviewCount: rating.reviewCount,
    bestRating: rating.bestRating,
    worstRating: rating.worstRating,
  };
}

function reviewLd(reviews: BuiltReview[], itemName: string) {
  return reviews.map((r) => ({
    "@type": "Review",
    author: { "@type": "Person", name: r.name },
    reviewRating: {
      "@type": "Rating",
      ratingValue: r.stars,
      bestRating: 5,
      worstRating: 1,
    },
    reviewBody: r.text,
    itemReviewed: { "@type": "HealthAndBeautyBusiness", name: itemName },
  }));
}

export function localBusinessLd(opts?: {
  areaName?: string; // 지역페이지면 해당 지역명
  rating?: Rating; // 별점 요약
  reviews?: BuiltReview[]; // 개별 후기
}) {
  const name = opts?.areaName
    ? `${SITE.name} ${opts.areaName}`
    : SITE.name;
  const base: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "HealthAndBeautyBusiness",
    name,
    url: SITE.url,
    telephone: SITE.phoneDisplay,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address,
      addressCountry: "KR",
    },
    areaServed: opts?.areaName
      ? [opts.areaName]
      : ["수원", "동탄", "오산", "용인", "분당"],
    description: opts?.areaName
      ? `파이브 마사지는 ${opts.areaName} 일부 운영지역 중심의 전화예약 방문 마사지 안내 서비스입니다.`
      : "파이브 마사지는 수원·동탄·오산·용인·분당 일부 운영지역 중심의 전화예약 방문 마사지 안내 서비스입니다.",
  };
  if (opts?.rating && opts.rating.reviewCount > 0) {
    base.aggregateRating = ratingLd(opts.rating);
  }
  if (opts?.reviews && opts.reviews.length > 0) {
    base.review = reviewLd(opts.reviews, name);
  }
  return base;
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
