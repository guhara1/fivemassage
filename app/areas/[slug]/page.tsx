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
  "정확한 주소",
  "건물명 / 동·호수",
  "주차 또는 출입 방식",
  "희망 이용 시간",
  "프로그램 선택",
  "예약자 연락처",
];

export default function AreaPage({ params }: { params: { slug: string } }) {
  const area = getArea(params.slug);
  if (!area) notFound();

  // 같은 권역 내 다른 지역 (자기 자신 제외)
  const sameGroup = REGION_GROUPS.find((g) =>
    g.regions.some((r) => r.slug === area.slug)
  );
  const related =
    sameGroup?.regions.filter((r) => r.name !== area.name) ?? [];

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

      {/* H1 + 첫 문단 + 상단 CTA */}
      <section className="border-b border-white/5">
        <div className="container-page py-14 sm:py-20">
          <nav className="mb-4 text-xs text-ivory/40">
            <Link href="/" className="hover:text-ivory">홈</Link>
            <span className="mx-1.5">/</span>
            <Link href="/areas" className="hover:text-ivory">가능지역</Link>
            <span className="mx-1.5">/</span>
            <span className="text-ivory/70">{area.name}</span>
          </nav>
          <p className="mb-3 text-sm font-semibold tracking-wide text-gold">
            {area.group}
          </p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {area.name} 출장마사지 예약 안내
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-ivory/70">
            {area.intro}
          </p>
          <div className="mt-7">
            <CallButton />
          </div>
        </div>
      </section>

      {/* 생활권 안내 */}
      <section className="container-page py-12">
        <SectionTitle title={`${area.name} 방문 마사지 가능지역 안내`} />
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-ivory/75">
          {area.lifestyle}
        </p>
      </section>

      {/* 예약 전 확인사항 */}
      <section className="border-y border-white/5 bg-white/[0.015]">
        <div className="container-page py-12">
          <SectionTitle title={`${area.name}에서 예약 전 확인해야 할 점`} />
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-ivory/60">
            {area.checklistNote}
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {CHECKLIST.map((c) => (
              <li
                key={c}
                className="flex gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4 text-sm text-ivory/75"
              >
                <span className="text-gold">✓</span>
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 이용 가능한 프로그램 (요약 + 가격표 링크) */}
      <section className="container-page py-12">
        <SectionTitle
          title="이용 가능한 프로그램"
          desc={`${area.name} 지역에서는 주요 프로그램을 전화예약으로 확인할 수 있습니다. 시간별 금액은 가격표 페이지에서 확인하세요.`}
        />
        <div className="mt-6 flex flex-wrap gap-2">
          {PROGRAMS.map((p) => (
            <span
              key={p.slug}
              className="rounded-full border border-white/10 px-3 py-1.5 text-sm text-ivory/80"
            >
              {p.name}
            </span>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <LinkButton href="/service/price" variant="gold">
            가격표 보기
          </LinkButton>
          <CallButton variant="outline" />
        </div>
      </section>

      {/* 예약 절차 */}
      <section className="border-y border-white/5 bg-white/[0.015]">
        <div className="container-page py-12">
          <SectionTitle title="예약 절차" />
          <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
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

      {/* 추천 이용 상황 */}
      <section className="container-page py-12">
        <SectionTitle title={`${area.name} 지역 추천 이용 상황`} />
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-ivory/75">
          {area.useCase}
        </p>
      </section>

      {/* 이용 후기 */}
      <section className="border-y border-white/5 bg-white/[0.015]">
        <div className="container-page py-12">
          <SectionTitle
            title={`${area.name} 이용 후기`}
            eyebrow="REVIEW"
            desc="실제 이용 상황을 바탕으로 한 후기 예시입니다."
          />
          <div className="mt-6">
            <Reviews areaName={area.name} reviews={area.reviews} />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container-page py-12">
        <SectionTitle title={`${area.name} 출장마사지 자주 묻는 질문`} />
        <div className="mt-6">
          <Faq items={area.faq} />
        </div>
      </section>

      {/* 관련 지역 + 내부링크 */}
      <section className="container-page py-12">
        <SectionTitle title={`${area.group} 인근 운영지역`} />
        <div className="mt-5 flex flex-wrap gap-2">
          {related.map((r) => (
            <Link
              key={r.name}
              href={regionHref(r)}
              className="rounded-full border border-white/10 px-3 py-1.5 text-sm text-ivory/80 hover:border-gold/50 hover:text-ivory"
            >
              {r.name}
            </Link>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-4 text-sm text-gold">
          <Link href="/service/price" className="hover:underline">가격표 보기 →</Link>
          <Link href="/areas" className="hover:underline">전체 가능지역 보기 →</Link>
          <Link href="/faq" className="hover:underline">자주 묻는 질문 →</Link>
        </div>
      </section>

      {/* 하단 CTA */}
      <section className="border-t border-white/5 bg-gradient-to-b from-white/[0.03] to-transparent">
        <div className="container-page py-14 text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">
            {area.name} 출장마사지 예약 문의
          </h2>
          <p className="mt-3 text-ivory/65">
            전화예약: {SITE.phoneDisplay} · 지금 가능지역과 예약 시간을 확인해
            보세요.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <CallButton />
            <LinkButton href="/service/price">가격표 보기</LinkButton>
            <LinkButton href="/areas">가능지역 전체보기</LinkButton>
          </div>
        </div>
      </section>
    </>
  );
}
