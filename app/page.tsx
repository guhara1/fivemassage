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
import { JsonLd, faqLd, serviceLd, breadcrumbLd } from "@/lib/jsonld";

const featured = PROGRAMS.filter((p) => FEATURED_PROGRAM_SLUGS.includes(p.slug));

export default function Home() {
  return (
    <>
      <JsonLd
        data={[
          serviceLd(PROGRAMS),
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
            쓰리 마사지는 수원, 동탄, 오산, 용인, 분당 일부 운영지역을 중심으로
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
          title="쓰리 마사지 운영지역 안내"
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

      {/* 8. 사업자 신뢰 정보 */}
      <section id="company" className="container-page py-16">
        <SectionTitle eyebrow="COMPANY" title="쓰리 마사지 사업자 안내" />
        <div className="mt-6 grid gap-x-8 gap-y-3 rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:grid-cols-2">
          {[
            ["상호", SITE.name],
            ["운영사", SITE.company],
            ["대표", SITE.ceo],
            ["사업자등록번호", SITE.bizNo],
            ["주소", SITE.address],
            ["전화예약", SITE.phoneDisplay],
            ["운영지역", "수원, 동탄, 오산, 용인, 분당 일부 권역"],
          ].map(([k, v]) => (
            <div key={k} className="flex gap-3 text-sm">
              <span className="w-28 shrink-0 text-ivory/50">{k}</span>
              <span className="text-ivory/90">{v}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 9. 매거진 — 정보성 중심 (지역명 반복 회피) */}
      <section className="border-y border-white/5 bg-white/[0.015]">
        <div className="container-page py-16">
          <SectionTitle
            eyebrow="MAGAZINE"
            title="쓰리 마사지 매거진"
            desc="예약과 컨디션 관리에 도움이 되는 정보성 콘텐츠를 준비하고 있습니다."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "출장마사지 처음 이용 전 확인해야 할 7가지",
              "방문 마사지 예약은 어떻게 진행될까? 전화예약 절차 안내",
              "피로관리 목적의 방문 마사지, 어떤 기준으로 선택할까?",
              "마사지 이용 전 준비하면 좋은 공간과 시간 체크리스트",
              "모바일에서 빠르게 전화예약하는 방법",
              "건전한 방문 마사지 서비스를 구분하는 기준",
            ].map((t) => (
              <div
                key={t}
                className="rounded-2xl border border-white/10 bg-white/[0.02] p-5"
              >
                <span className="text-xs font-semibold uppercase tracking-wide text-gold">
                  GUIDE
                </span>
                <p className="mt-2 font-medium leading-relaxed text-ivory/90">
                  {t}
                </p>
                <p className="mt-3 text-xs text-ivory/40">준비 중</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-ivory/40">
            * 매거진은 지역명을 반복하는 양산형 글 대신, 생활상황·피로관리 중심의
            정보성 콘텐츠로 운영합니다.
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
