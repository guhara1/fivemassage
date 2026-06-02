// 지역페이지 이용 후기 (예시).
// 주의: 아래 후기는 디자인용 예시이며, 실제 고객 동의 후기로 교체해야 합니다.
// 가짜 후기 패널티를 피하기 위해 Review/AggregateRating 구조화 데이터는 의도적으로 넣지 않습니다.

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
const STARS = [5, 5, 4, 5, 5, 4];

function seedFrom(s: string): number {
  let n = 0;
  for (let i = 0; i < s.length; i++) n = (n + s.charCodeAt(i)) % 997;
  return n;
}

export default function Reviews({
  areaName,
  reviews,
}: {
  areaName: string;
  reviews: string[];
}) {
  const seed = seedFrom(areaName);
  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {reviews.slice(0, 6).map((text, i) => {
          const name = NAMES[(seed + i) % NAMES.length];
          const tag = TAGS[i % TAGS.length];
          const stars = STARS[i % STARS.length];
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
