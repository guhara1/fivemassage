import type { Metadata } from "next";
import Link from "next/link";
import CallButton from "@/components/CallButton";
import SectionTitle from "@/components/SectionTitle";
import { JsonLd, breadcrumbLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "서비스 안내",
  description:
    "파이브 마사지 방문 마사지 서비스 안내입니다. 출장마사지 소개, 프로그램, 가격표, 이용절차, 예약 전 확인사항을 한 곳에서 확인하세요.",
  alternates: { canonical: "/service" },
};

const ITEMS = [
  {
    href: "/service/visit-massage",
    title: "출장마사지 안내",
    desc: "방문형 마사지란 무엇이고 파이브 마사지가 어떻게 운영되는지 안내합니다.",
  },
  {
    href: "/service/programs",
    title: "프로그램 안내",
    desc: "타이 건식부터 스웨디시까지, 프로그램별 특징과 선택 기준을 설명합니다.",
  },
  {
    href: "/service/price",
    title: "가격표",
    desc: "프로그램별 이용 시간과 금액을 카드형 가격표로 확인할 수 있습니다.",
  },
  {
    href: "/service/process",
    title: "이용절차",
    desc: "전화 문의부터 방문까지, 예약이 진행되는 단계를 자세히 안내합니다.",
  },
  {
    href: "/service/notes",
    title: "예약 전 확인사항",
    desc: "원활한 방문을 위해 예약 전 준비하고 확인해야 할 점을 정리했습니다.",
  },
];

export default function ServicePage() {
  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: "홈", path: "/" },
          { name: "서비스 안내", path: "/service" },
        ])}
      />
      <section className="border-b border-white/5">
        <div className="container-page py-12 sm:py-16">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            SERVICE
          </p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            서비스 안내
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-ivory/70">
            파이브 마사지의 방문 마사지 서비스를 항목별로 안내합니다. 아래에서
            필요한 내용을 선택해 자세히 확인하세요.
          </p>
          <div className="mt-7">
            <CallButton />
          </div>
        </div>
      </section>

      <section className="container-page py-12">
        <SectionTitle title="안내 항목" eyebrow="MENU" />
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map((it) => (
            <Link
              key={it.href}
              href={it.href}
              className="group rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition hover:border-gold/50"
            >
              <h2 className="text-lg font-bold text-ivory group-hover:text-gold">
                {it.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-ivory/60">
                {it.desc}
              </p>
              <span className="mt-4 inline-block text-sm text-gold">
                자세히 보기 →
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
