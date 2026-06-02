import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import CallButton, { LinkButton } from "@/components/CallButton";
import SectionTitle from "@/components/SectionTitle";
import Faq from "@/components/Faq";
import Reviews from "@/components/Reviews";
import {
  SITE,
  PROGRAMS,
  PROCESS_STEPS,
  REGION_GROUPS,
  regionHref,
} from "@/lib/site";
import { AREAS, getArea } from "@/lib/areas";
import { postsForArea, categoryTitle } from "@/lib/magazine";
import { JsonLd, breadcrumbLd, faqLd, localBusinessLd } from "@/lib/jsonld";

export function generateStaticParams() {
  return AREAS.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const area = getArea(params.slug);
  if (!area) return {};
  return {
    title: `${area.name} 출장마사지 예약 안내`,
    description: area.metaDescription,
    alternates: { canonical: `/areas/${area.slug}` },
  };
}

const CHECKLIST = [
  ["정확한 주소", "도로명 주소 기준"],
  ["건물명 / 동·호수", "단지·건물 식별"],
  ["주차 또는 출입 방식", "공동현관·주차 동선"],
  ["희망 이용 시간", "조정 가능 시간 폭"],
  ["프로그램 선택", "선호 강도·부위"],
  ["예약자 연락처", "방문 시 연락 가능"],
];

function Check() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4 shrink-0" aria-hidden>
      <path
        d="M5 10.5l3.2 3.2L15 6.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function AreaPage({ params }: { params: { slug: string } }) {
  const area = getArea(params.slug);
  if (!area) notFound();

  const sameGroup = REGION_GROUPS.find((g) =>
    g.regions.some((r) => r.slug === area.slug)
  );
  const related = sameGroup?.regions.filter((r) => r.name !== area.name) ?? [];
  const guidePosts = postsForArea(area.slug);

  return (
    <>
      <JsonLd
        data={[
          localBusinessLd(),
          faqLd(area.faq),
          breadcrumbLd([
            { name: "홈", path: "/" },
            { name: "가능지역", path: "/areas" },
            { name: area.name, path: `/areas/${area.slug}` },
          ]),
        ]}
      />

      {/* ── 히어로 ── */}
      <header className="hero-glow relative overflow-hidden border-b border-white/5">
        {/* 배경 워터마크 지역명 */}
        <span
          aria-hidden
          className="pointer-events-none absolute -right-2 -top-6 select-none text-[7rem] font-black leading-none text-white/[0.03] sm:text-[12rem]"
        >
          {area.name}
        </span>

        <div className="container-page relative py-14 sm:py-20">
          <nav className="mb-6 flex items-center text-xs text-ivory/40">
            <Link href="/" className="hover:text-ivory">홈</Link>
            <span className="mx-1.5 text-ivory/20">/</span>
            <Link href="/areas" className="hover:text-ivory">가능지역</Link>
            <span className="mx-1.5 text-ivory/20">/</span>
            <span className="text-ivory/70">{area.name}</span>
          </nav>

          <div className="mb-5 flex flex-wrap gap-2">
            <span className="chip-gold">📍 {area.group}</span>
            <span className="chip">방문형 케어</span>
            <span className="chip">전화예약</span>
          </div>

          <h1 className="text-[2rem] font-bold leading-[1.2] tracking-tight sm:text-[3rem]">
            <span className="text-gold">{area.name}</span> 출장마사지
            <br className="hidden sm:block" /> 예약 안내
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-ivory/65 sm:text-lg">
            {area.intro}
          </p>

          {/* 빠른 정보 */}
          <dl className="mt-8 grid max-w-xl grid-cols-3 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] text-center">
            {[
              ["운영권역", area.group],
              ["예약 방식", "전화 상담"],
              ["전화예약", SITE.phoneDisplay],
            ].map(([k, v]) => (
              <div key={k} className="bg-navy-deep/40 px-2 py-4">
                <dt className="text-[0.7rem] uppercase tracking-wide text-ivory/40">
                  {k}
                </dt>
                <dd className="mt-1 text-sm font-semibold text-ivory/90">
                  {v}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 flex flex-wrap gap-3">
            <CallButton />
            <LinkButton href="/service/price">가격표 보기</LinkButton>
          </div>
        </div>
      </header>

      {/* ── 생활권 안내 ── */}
      <section className="container-page py-14">
        <SectionTitle
          eyebrow="AREA"
          title={`${area.name} 방문 마사지 가능지역 안내`}
        />
        <p className="mt-5 max-w-3xl border-l-2 border-gold/50 pl-5 text-base leading-[1.9] text-ivory/80 sm:text-lg">
          {area.lifestyle}
        </p>
      </section>

      {/* ── 지역 특화 방문 메모 ── */}
      <section className="border-y border-white/5 bg-white/[0.015]">
        <div className="container-page py-14">
          <div className="grid gap-8 lg:grid-cols-[18rem_1fr]">
            <SectionTitle
              eyebrow="LOCAL NOTE"
              title={`${area.name} 방문,\n이런 점이 다릅니다`}
            />
            <div className="card p-6 sm:p-8">
              <p className="text-base leading-[1.95] text-ivory/80">
                {area.localGuide}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 예약 전 확인사항 ── */}
      <section className="container-page py-14">
        <SectionTitle
          eyebrow="CHECKLIST"
          title={`${area.name}에서 예약 전 확인해야 할 점`}
          desc={area.checklistNote}
        />
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CHECKLIST.map(([c, sub]) => (
            <li key={c} className="card flex items-start gap-3 p-5">
              <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gold/15 text-gold">
                <Check />
              </span>
              <span>
                <span className="block font-semibold text-ivory/90">{c}</span>
                <span className="mt-0.5 block text-xs text-ivory/50">{sub}</span>
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* ── 이용 가능한 프로그램 ── */}
      <section className="border-y border-white/5 bg-white/[0.015]">
        <div className="container-page py-14">
          <SectionTitle
            eyebrow="PROGRAM"
            title="이용 가능한 프로그램"
            desc={`${area.name} 지역에서는 주요 프로그램을 전화예약으로 확인할 수 있습니다. 시간별 금액은 가격표에서 확인하세요.`}
          />
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {PROGRAMS.map((p) => (
              <div key={p.slug} className="card flex items-center gap-3 p-4">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-gold/10 text-xs font-bold text-gold">
                  {p.name.slice(0, 1)}
                </span>
                <span>
                  <span className="block text-sm font-semibold text-ivory/90">
                    {p.name}
                  </span>
                  <span className="block text-[0.7rem] uppercase tracking-wide text-ivory/40">
                    {p.category}
                  </span>
                </span>
              </div>
            ))}
          </div>
          <div className="mt-7 flex flex-wrap gap-3">
            <LinkButton href="/service/price" variant="gold">
              전체 가격표 보기
            </LinkButton>
            <CallButton variant="outline" />
          </div>
        </div>
      </section>

      {/* ── 예약 절차 (타임라인) ── */}
      <section className="container-page py-14">
        <SectionTitle eyebrow="PROCESS" title="예약 절차" />
        <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {PROCESS_STEPS.map((s, i) => (
            <li key={s.title} className="card relative p-5">
              <span className="grid h-9 w-9 place-items-center rounded-full border border-gold/40 text-sm font-bold text-gold">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="mt-3 font-semibold text-ivory">{s.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-ivory/55">
                {s.desc}
              </p>
              {i < PROCESS_STEPS.length - 1 && (
                <span className="absolute right-3 top-7 hidden text-gold/30 lg:block">
                  →
                </span>
              )}
            </li>
          ))}
        </ol>
      </section>

      {/* ── 추천 이용 상황 ── */}
      <section className="border-y border-white/5 bg-white/[0.015]">
        <div className="container-page py-14">
          <SectionTitle
            eyebrow="USE CASE"
            title={`${area.name} 지역 추천 이용 상황`}
          />
          <p className="mt-5 max-w-3xl text-base leading-[1.95] text-ivory/80 sm:text-lg">
            {area.useCase}
          </p>
        </div>
      </section>

      {/* ── 이용 후기 ── */}
      <section className="container-page py-14">
        <SectionTitle
          eyebrow="REVIEW"
          title={`${area.name} 이용 후기`}
          desc="실제 이용 상황을 바탕으로 한 후기 예시입니다."
        />
        <div className="mt-8">
          <Reviews areaName={area.name} reviews={area.reviews} />
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="border-y border-white/5 bg-white/[0.015]">
        <div className="container-page py-14">
          <SectionTitle
            eyebrow="FAQ"
            title={`${area.name} 출장마사지 자주 묻는 질문`}
          />
          <div className="mx-auto mt-8 max-w-3xl">
            <Faq items={area.faq} />
          </div>
        </div>
      </section>

      {/* ── 관련 매거진 ── */}
      <section className="container-page py-14">
        <SectionTitle
          eyebrow="MAGAZINE"
          title="관련 매거진"
          desc="예약 안내가 아닌, 생활상황에 맞춘 피로 관리·이용 정보입니다."
        />
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {guidePosts.map((p) => (
            <Link
              key={p.slug}
              href={`/magazine/${p.slug}`}
              className="card card-hover group flex flex-col p-5"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wide text-gold">
                  {categoryTitle(p.category)}
                </span>
                <time dateTime={p.date} className="text-xs text-ivory/40">
                  {p.date.replace(/-/g, ".")}
                </time>
              </div>
              <h3 className="mt-3 flex-1 font-bold leading-snug text-ivory group-hover:text-gold">
                {p.title}
              </h3>
              <span className="mt-4 text-sm text-gold">자세히 보기 →</span>
            </Link>
          ))}
        </div>
        <p className="mt-4 text-sm">
          <Link href="/magazine" className="text-gold hover:underline">
            매거진 전체보기 →
          </Link>
        </p>
      </section>

      {/* ── 관련 지역 ── */}
      <section className="border-t border-white/5 py-14">
        <div className="container-page">
        <SectionTitle eyebrow="NEARBY" title={`${area.group} 인근 운영지역`} />
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((r) => (
            <Link
              key={r.name}
              href={regionHref(r)}
              className="card card-hover group flex items-center justify-between p-4"
            >
              <span className="flex items-center gap-3">
                <span className="text-gold/70">📍</span>
                <span>
                  <span className="block font-semibold text-ivory/90 group-hover:text-gold">
                    {r.name}
                  </span>
                  <span className="block text-xs text-ivory/40">
                    {area.group}
                  </span>
                </span>
              </span>
              <span className="text-gold transition group-hover:translate-x-0.5">
                →
              </span>
            </Link>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-gold">
          <Link href="/service/price" className="hover:underline">가격표 보기 →</Link>
          <Link href="/service/process" className="hover:underline">이용절차 보기 →</Link>
          <Link href="/service/visit-massage" className="hover:underline">출장마사지 안내 →</Link>
          <Link href="/areas" className="hover:underline">전체 가능지역 보기 →</Link>
          <Link href="/faq" className="hover:underline">자주 묻는 질문 →</Link>
        </div>
        </div>
      </section>

      {/* ── 하단 CTA ── */}
      <section className="border-t border-white/5">
        <div className="container-page py-14">
          <div className="hero-glow relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent px-6 py-12 text-center sm:px-10">
            <h2 className="relative text-2xl font-bold tracking-tight sm:text-3xl">
              {area.name} 출장마사지 예약 문의
            </h2>
            <p className="relative mt-3 text-ivory/60">
              전화예약 {SITE.phoneDisplay} · 지금 가능지역과 예약 시간을 확인해
              보세요.
            </p>
            <div className="relative mt-8 flex flex-wrap justify-center gap-3">
              <CallButton />
              <LinkButton href="/service/price">가격표 보기</LinkButton>
              <LinkButton href="/areas">가능지역 전체보기</LinkButton>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
