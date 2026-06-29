// 지역페이지 이용 후기 (예시).
// 화면 표시 후기·별점은 lib/reviews 의 buildReviews 로 생성하며,
// 동일 데이터를 JSON-LD(Review/AggregateRating)에도 사용해 화면-스키마 일치를 보장한다.
import { buildReviews, aggregateRating } from "@/lib/reviews";

export default function Reviews({
  areaName,
  reviews,
}: {
  areaName: string;
  reviews: string[];
}) {
  const built = buildReviews(areaName, reviews);
  const rating = aggregateRating(built);
  return (
    <div>
      {/* 평균 별점 요약 (AggregateRating 표시값과 일치) */}
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <span className="text-2xl font-bold text-gold">
          ★ {rating.ratingValue.toFixed(1)}
        </span>
        <span className="text-sm text-ivory/50">
          / 5.0 · 후기 {rating.reviewCount}건 기준
        </span>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {built.map(({ name, tag, stars, text }, i) => {
          return (
            <figure key={i} className="card flex h-full flex-col p-5">
              <div className="flex items-center justify-between">
                <span aria-label={`별점 ${stars}점`} className="tracking-tight text-gold">
                  {"★".repeat(stars)}
                  <span className="text-ivory/15">{"★".repeat(5 - stars)}</span>
                </span>
                <span className="rounded-full bg-white/5 px-2 py-0.5 text-[11px] text-ivory/45">
                  {tag}
                </span>
              </div>
              <blockquote className="relative mt-4 flex-1 text-sm leading-relaxed text-ivory/75">
                <span className="absolute -left-1 -top-3 text-2xl leading-none text-gold/25">
                  &ldquo;
                </span>
                {text}
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-2 border-t border-white/5 pt-4 text-xs text-ivory/50">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-gold/15 text-[0.7rem] font-bold text-gold">
                  {name.slice(0, 1)}
                </span>
                <span>
                  {name} · {areaName} 방문
                </span>
              </figcaption>
            </figure>
          );
        })}
      </div>
      <p className="mt-4 text-xs text-ivory/35">
        * 위 후기는 서비스 안내를 위한 예시이며, 실제 이용 고객의 동의를 받은
        후기로 교체될 예정입니다.
      </p>
    </div>
  );
}
