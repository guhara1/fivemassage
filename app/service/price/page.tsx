import type { Metadata } from "next";
import CallButton, { LinkButton } from "@/components/CallButton";
import SectionTitle from "@/components/SectionTitle";
import ProgramCard from "@/components/ProgramCard";
import { SITE, PROGRAMS, PRE_BOOKING_NOTES } from "@/lib/site";
import { JsonLd, serviceLd, breadcrumbLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "마사지 가격표 및 프로그램 안내",
  description:
    "쓰리 마사지의 타이 건식, 아로마 오일, 시그니처 오일, VVIP 전신케어, 스웨디시 프로그램 가격을 안내합니다. 수원·동탄·오산·용인·분당 운영지역 예약은 전화로 확인하세요.",
  alternates: { canonical: "/service/price" },
};

export default function PricePage() {
  return (
    <>
      <JsonLd
        data={[
          serviceLd(PROGRAMS),
          breadcrumbLd([
            { name: "홈", path: "/" },
            { name: "가격표", path: "/service/price" },
          ]),
        ]}
      />

      <section className="border-b border-white/5">
        <div className="container-page py-14 sm:py-20">
          <p className="mb-3 text-sm font-semibold tracking-wide text-gold">
            PRICE
          </p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            쓰리 마사지 프로그램 및 가격 안내
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-ivory/70">
            쓰리 마사지는 수원, 동탄, 오산, 용인, 분당 일부 운영지역을 중심으로
            방문 마사지 예약을 안내합니다. 프로그램별 이용 시간과 금액을 확인하신
            뒤, 정확한 가능 지역과 예약 시간은 전화로 문의해 주세요.
          </p>
          <div className="mt-7">
            <CallButton />
          </div>
        </div>
      </section>

      {/* 가격표 카드 그리드: 모바일 1열 / 태블릿 2열 / 데스크톱 3열 */}
      <section className="container-page py-14">
        <SectionTitle title="프로그램 가격표" eyebrow="PROGRAM" />
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {PROGRAMS.map((p) => (
            <ProgramCard key={p.slug} program={p} />
          ))}
        </div>
      </section>

      {/* 예약 전 확인사항 */}
      <section className="border-t border-white/5 bg-white/[0.015]">
        <div className="container-page py-14">
          <SectionTitle title="예약 전 확인사항" eyebrow="NOTICE" />
          <ul className="mt-6 space-y-3">
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
          <div className="mt-8 flex flex-wrap gap-3">
            <CallButton />
            <LinkButton href="/areas">가능지역 보기</LinkButton>
          </div>
        </div>
      </section>
    </>
  );
}
