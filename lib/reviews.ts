// 지역페이지 이용 후기(예시)의 단일 출처(single source of truth).
// 화면에 보이는 후기·별점과 구조화 데이터(Review/AggregateRating)를 반드시 동일하게 유지하기 위해
// 후기 표시 컴포넌트와 JSON-LD 빌더가 모두 이 모듈을 사용한다.
//
// ⚠️ 주의: 아래 후기 본문(area.reviews)은 디자인용 예시입니다.
// 실제 검색 리치결과 노출 전, 반드시 고객 동의를 받은 실제 후기로 교체해야
// 구글/네이버의 가짜 후기 정책 위반을 피할 수 있습니다.

const NAMES = [
  "김○○", "이○○", "박○○", "최○○", "정○○", "강○○",
  "윤○○", "장○○", "조○○", "임○○", "한○○", "오○○",
];

const TAGS = [
  "타이 건식 60분",
  "아로마 오일 90분",
  "시그니처 오일 90분",
  "VVIP 전신케어 120분",
  "타이 건식 90분",
  "아로마 오일 60분",
];

// 후기별 별점(1~5). 화면 표시와 AggregateRating 계산에 공통 사용.
const STARS = [5, 5, 4, 5, 5, 4];

function seedFrom(s: string): number {
  let n = 0;
  for (let i = 0; i < s.length; i++) n = (n + s.charCodeAt(i)) % 997;
  return n;
}

export type BuiltReview = {
  name: string; // 작성자(마스킹)
  tag: string; // 이용 프로그램
  stars: number; // 별점 1~5
  text: string; // 후기 본문
};

// 지역명 + 후기 텍스트로 화면/스키마 공용 후기 목록 생성(최대 6개).
export function buildReviews(areaName: string, reviews: string[]): BuiltReview[] {
  const seed = seedFrom(areaName);
  return reviews.slice(0, 6).map((text, i) => ({
    name: NAMES[(seed + i) % NAMES.length],
    tag: TAGS[i % TAGS.length],
    stars: STARS[i % STARS.length],
    text,
  }));
}

export type Rating = {
  ratingValue: number; // 평균 별점(소수 첫째자리)
  reviewCount: number; // 후기 수
  bestRating: number;
  worstRating: number;
};

// 후기 목록으로 AggregateRating 값 계산.
export function aggregateRating(built: BuiltReview[]): Rating {
  const reviewCount = built.length;
  const sum = built.reduce((acc, r) => acc + r.stars, 0);
  const ratingValue = reviewCount
    ? Math.round((sum / reviewCount) * 10) / 10
    : 0;
  return { ratingValue, reviewCount, bestRating: 5, worstRating: 1 };
}

// ── 메인페이지용: 전 지역 후기 종합 ──
// areas.ts 는 reviews.ts 를 import 하지 않으므로 순환참조가 없다.
import { AREAS } from "./areas";

// 전 지역 후기를 합산한 사이트 전체 평균 별점/후기 수.
export function siteAggregateRating(): Rating {
  const all = AREAS.flatMap((a) => buildReviews(a.name, a.reviews));
  return aggregateRating(all);
}

// 메인페이지에 노출할 대표 후기 n개(지역을 분산해 선별).
export function featuredSiteReviews(n = 6): BuiltReview[] {
  const out: BuiltReview[] = [];
  for (const a of AREAS) {
    const built = buildReviews(a.name, a.reviews);
    if (built[0]) out.push({ ...built[0], tag: `${a.name} · ${built[0].tag}` });
    if (out.length >= n) break;
  }
  return out;
}
