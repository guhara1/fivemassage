import type { Metadata } from "next";
import Link from "next/link";
import CallButton, { LinkButton } from "@/components/CallButton";
import SectionTitle from "@/components/SectionTitle";
import ProgramCard from "@/components/ProgramCard";
import Faq from "@/components/Faq";
import {
  SITE,
  REGION_GROUPS,
  regionHref,
  PROGRAMS,
  FEATURED_PROGRAM_SLUGS,
  PRE_BOOKING_NOTES,
  PROCESS_STEPS,
  MAIN_FAQ,
  AREA_USE_CASES,
} from "@/lib/site";
import {
  JsonLd,
  faqLd,
  serviceLd,
  breadcrumbLd,
  localBusinessLd,
} from "@/lib/jsonld";
import { POSTS, categoryTitle } from "@/lib/magazine";
import { AREAS } from "@/lib/areas";
import { siteAggregateRating, featuredSiteReviews } from "@/lib/reviews";

// 메인페이지에만 검색엔진 소유확인 메타태그 적용
export const metadata: Metadata = {
  verification: {
    google: "-yBpnRHdLeEIFt3DyEwEF2p-oyRGGgGao28i2Lu5X-I",
    other: {
      "naver-site-verification": "b7ea4af5afc4d8bce66b2f870749eb193a8c7e39",
    },
  },
};

const featured = PROGRAMS.filter((p) => FEATURED_PROGRAM_SLUGS.includes(p.slug));

// 전 지역 후기를 합산한 사이트 전체 별점 / 대표 후기 (화면-스키마 공용)
const siteRating = siteAggregateRating();
const siteReviews = featuredSiteReviews(6);

export default function Home() {
  return (
    <>
      <JsonLd
        data={[
          serviceLd(PROGRAMS),
          localBusinessLd({ rating: siteRating, reviews: siteReviews }),
          faqLd(MAIN_FAQ),
          breadcrumbLd([{ name: "홈", path: "/" }]),
        ]}
      />

      {/* 1. 히어로 */}
      <section className="relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_70%_0%,rgba(200,163,90,0.14),transparent)]" />
        <div className="container-page relative py-16 sm:py-24">
          <p className="mb-3 text-sm font-semibold tracking-wide text-gold">
            방문 마사지 예약 안내
          </p>
          <h1 className="max-w-3xl text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
            {SITE.areasShort} 출장마사지 예약 안내
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-ivory/70 sm:text-lg">
            파이브 마사지는 수원, 동탄, 오산, 용인, 분당 일부 운영지역을 중심으로
            전화예약 가능한 방문 마사지 서비스를 안내합니다. 가능지역과 예약 가능
            시간은 전화로 확인해 주세요.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <CallButton />
            <LinkButton href="#areas">가능지역 확인</LinkButton>
            <LinkButton href="/service/price">가격표 보기</LinkButton>
          </div>
        </div>
      </section>

      {/* 2. 운영지역 빠른 선택 */}
      <section id="areas" className="container-page py-16">
        <SectionTitle
          eyebrow="SERVICE AREA"
          title="파이브 마사지 운영지역 안내"
          desc="아래 지역을 중심으로 방문 마사지 예약을 안내합니다. 세부 위치와 예약 가능 여부는 전화예약 시 확인해 주세요."
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {REGION_GROUPS.map((g) => (
            <div
              key={g.key}
              className="rounded-2xl border border-white/10 bg-white/[0.02] p-5"
            >
              <p className="text-sm font-bold text-gold">{g.title}</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {g.regions.map((r) => (
                  <li key={r.name}>
                    <Link
                      href={regionHref(r)}
                      className="inline-block rounded-full border border-white/10 px-3 py-1 text-sm text-ivory/80 hover:border-gold/50 hover:text-ivory"
                    >
                      {r.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-ivory/50">
          <Link href="/areas" className="text-gold hover:underline">
            가능지역 전체보기 →
          </Link>
        </p>
      </section>

      {/* 3. 서비스 프로그램 안내 */}
      <section id="service" className="border-y border-white/5 bg-white/[0.015]">
        <div className="container-page py-16">
          <SectionTitle
            eyebrow="PROGRAM"
            title="방문 마사지 프로그램 안내"
            desc="컨디션과 이용 목적에 따라 선택할 수 있는 방문 마사지 프로그램입니다. 전체 금액은 가격표에서 확인하세요."
          />
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {PROGRAMS.map((p) => (
              <div
                key={p.slug}
                className="rounded-2xl border border-white/10 bg-white/[0.02] p-5"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-gold">
                  {p.category}
                </p>
                <h3 className="mt-1 text-lg font-bold text-ivory">{p.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ivory/60">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <LinkButton href="/service/price" variant="gold">
              전체 가격표 보기
            </LinkButton>
          </div>
        </div>
      </section>

      {/* 4. 가격표 미리보기 (대표 3개) */}
      <section className="container-page py-16">
        <SectionTitle
          eyebrow="PRICE"
          title="프로그램 가격 미리보기"
          desc="대표 프로그램 가격을 안내합니다. 전체 프로그램과 시간별 금액은 가격표 페이지에서 확인하세요."
        />
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <ProgramCard key={p.slug} program={p} />
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <LinkButton href="/service/price" variant="gold">
            전체 가격표 보기
          </LinkButton>
          <CallButton variant="outline" />
        </div>
      </section>

      {/* 5. 이용 절차 */}
      <section id="process" className="border-y border-white/5 bg-white/[0.015]">
        <div className="container-page py-16">
          <SectionTitle
            eyebrow="PROCESS"
            title="출장마사지 예약 절차"
            desc="전화 문의부터 방문까지, 간단한 절차로 예약을 진행합니다."
          />
          <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {PROCESS_STEPS.map((s, i) => (
              <li
                key={s.title}
                className="rounded-2xl border border-white/10 bg-white/[0.02] p-5"
              >
                <span className="text-2xl font-bold text-gold">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-2 font-semibold text-ivory">{s.title}</p>
                <p className="mt-1 text-sm text-ivory/60">{s.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 6. 예약 전 확인사항 */}
      <section id="notes" className="container-page py-16">
        <SectionTitle eyebrow="NOTICE" title="예약 전 확인해 주세요" />
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {PRE_BOOKING_NOTES.map((n) => (
            <li
              key={n}
              className="flex gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4 text-sm text-ivory/75"
            >
              <span className="text-gold">✓</span>
              <span>{n}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* 7. 지역별 추천 이용 상황 */}
      <section className="border-y border-white/5 bg-white/[0.015]">
        <div className="container-page py-16">
          <SectionTitle
            eyebrow="USE CASE"
            title="지역별 이용 상황 안내"
            desc="권역별로 자주 문의 주시는 이용 상황을 정리했습니다."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {AREA_USE_CASES.map((u) => (
              <div
                key={u.group}
                className="rounded-2xl border border-white/10 bg-white/[0.02] p-5"
              >
                <p className="font-bold text-gold">{u.group}</p>
                <p className="mt-2 text-sm leading-relaxed text-ivory/70">
                  {u.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. 신뢰 안내 (상세 사업자 정보는 푸터/회사소개 페이지에) */}
      <section id="company" className="container-page py-16">
        <div className="flex flex-col items-start justify-between gap-5 rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:flex-row sm:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              COMPANY
            </p>
            <p className="mt-2 text-lg font-bold text-ivory">
              {SITE.name} · {SITE.company}
            </p>
            <p className="mt-1 text-sm text-ivory/60">
              휴식·컨디션 관리를 위한 건전한 방문 마사지 안내 서비스입니다. 운영
              주체와 사업자 정보를 투명하게 공개합니다.
            </p>
          </div>
          <LinkButton href="/about">회사소개 보기</LinkButton>
        </div>
      </section>

      {/* 9. 매거진 — 정보성 중심 (지역명 반복 회피) */}
      <section className="border-y border-white/5 bg-white/[0.015]">
        <div className="container-page py-16">
          <SectionTitle
            eyebrow="MAGAZINE"
            title="파이브 마사지 매거진"
            desc="예약 안내가 아닌, 생활상황에 맞춘 피로 관리와 이용 정보를 다룹니다."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {POSTS.slice(0, 6).map((p) => (
              <Link
                key={p.slug}
                href={`/magazine/${p.slug}`}
                className="group flex flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition hover:border-gold/50"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wide text-gold">
                    {categoryTitle(p.category)}
                  </span>
                  <time dateTime={p.date} className="text-xs text-ivory/40">
                    {p.date.replace(/-/g, ".")}
                  </time>
                </div>
                <p className="mt-2 font-medium leading-relaxed text-ivory/90 group-hover:text-gold">
                  {p.title}
                </p>
                <span className="mt-3 text-xs text-gold">자세히 보기 →</span>
              </Link>
            ))}
          </div>
          <div className="mt-6">
            <LinkButton href="/magazine">매거진 전체보기</LinkButton>
          </div>
        </div>
      </section>

      {/* 9-1. 이용 후기 (별점·점수 — AggregateRating 표시값과 일치) */}
      <section id="reviews" className="container-page py-16">
        <SectionTitle
          eyebrow="REVIEW"
          title="파이브 마사지 이용 후기"
          desc="수원·동탄·오산·용인·분당 운영지역에서 접수된 이용 후기 예시입니다."
        />
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <span className="text-3xl font-bold text-gold">
            ★ {siteRating.ratingValue.toFixed(1)}
          </span>
          <span className="text-sm text-ivory/55">
            / 5.0 · 후기 {siteRating.reviewCount}건 기준
          </span>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {siteReviews.map((r, i) => (
            <figure key={i} className="card flex h-full flex-col p-5">
              <div className="flex items-center justify-between">
                <span
                  aria-label={`별점 ${r.stars}점`}
                  className="tracking-tight text-gold"
                >
                  {"★".repeat(r.stars)}
                  <span className="text-ivory/15">{"★".repeat(5 - r.stars)}</span>
                </span>
                <span className="rounded-full bg-white/5 px-2 py-0.5 text-[11px] text-ivory/45">
                  {r.tag}
                </span>
              </div>
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-ivory/75">
                {r.text}
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-2 border-t border-white/5 pt-4 text-xs text-ivory/50">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-gold/15 text-[0.7rem] font-bold text-gold">
                  {r.name.slice(0, 1)}
                </span>
                <span>{r.name} 고객</span>
              </figcaption>
            </figure>
          ))}
        </div>
        <p className="mt-4 text-xs text-ivory/35">
          * 위 후기는 서비스 안내를 위한 예시이며, 실제 이용 고객의 동의를 받은
          후기로 교체될 예정입니다.
        </p>
      </section>

      {/* 9-2. 전 지역 롱테일 내부링크 (메인 → 모든 지역페이지) */}
      <section className="border-y border-white/5 bg-white/[0.015]">
        <div className="container-page py-16">
          <SectionTitle
            eyebrow="AREA INDEX"
            title="지역별 출장마사지 예약 바로가기"
            desc="아래에서 원하는 지역의 방문 마사지 예약 안내 페이지로 바로 이동할 수 있습니다."
          />
          <div className="mt-8 space-y-6">
            {REGION_GROUPS.map((g) => (
              <div key={g.key}>
                <p className="text-sm font-bold text-gold">{g.title}</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {g.regions.map((r) => (
                    <li key={r.slug}>
                      <Link
                        href={regionHref(r)}
                        className="inline-block rounded-full border border-white/10 px-3 py-1 text-sm text-ivory/80 transition hover:border-gold/50 hover:text-ivory"
                      >
                        {r.name} 출장마사지 예약
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-ivory/50">
            전체 {AREAS.length}개 운영지역 ·{" "}
            <Link href="/areas" className="text-gold hover:underline">
              가능지역 전체보기 →
            </Link>
          </p>
        </div>
      </section>

      {/* 10. FAQ */}
      <section id="faq" className="container-page py-16">
        <SectionTitle eyebrow="FAQ" title="자주 묻는 질문" />
        <div className="mt-8">
          <Faq items={MAIN_FAQ} />
        </div>
      </section>

      {/* 11. 하단 CTA */}
      <section className="border-t border-white/5 bg-gradient-to-b from-white/[0.03] to-transparent">
        <div className="container-page py-16 text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">
            지금 가능한 지역과 예약 시간을 확인해 보세요
          </h2>
          <p className="mt-3 text-ivory/65">
            전화예약: {SITE.phoneDisplay}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <CallButton />
            <LinkButton href="/service/price">가격표 보기</LinkButton>
            <LinkButton href="/areas">지역안내 보기</LinkButton>
          </div>
        </div>
      </section>
    </>
  );
}
