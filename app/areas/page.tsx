import type { Metadata } from "next";
import Link from "next/link";
import CallButton from "@/components/CallButton";
import SectionTitle from "@/components/SectionTitle";
import { SITE, REGION_GROUPS, regionHref } from "@/lib/site";
import { JsonLd, breadcrumbLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "가능지역 안내",
  description:
    "파이브 마사지 방문 마사지 가능지역을 권역별로 안내합니다. 수원권, 동탄·오산권, 용인권, 분당권 운영지역을 확인하고 전화로 예약 가능 여부를 문의하세요.",
  alternates: { canonical: "/areas" },
};

export default function AreasPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: "홈", path: "/" },
          { name: "가능지역", path: "/areas" },
        ])}
      />

      <section className="border-b border-white/5">
        <div className="container-page py-14 sm:py-20">
          <p className="mb-3 text-sm font-semibold tracking-wide text-gold">
            SERVICE AREA
          </p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            파이브 마사지 가능지역 안내
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-ivory/70">
            파이브 마사지는 {SITE.areasShort} 일부 권역을 중심으로 방문 마사지
            예약을 안내합니다. 세부 위치와 예약 가능 여부는 전화예약 시 확인해
            주세요.
          </p>
          <div className="mt-7">
            <CallButton />
          </div>
        </div>
      </section>

      <section className="container-page py-14">
        <div className="grid gap-5 sm:grid-cols-2">
          {REGION_GROUPS.map((g) => (
            <div
              key={g.key}
              className="rounded-2xl border border-white/10 bg-white/[0.02] p-6"
            >
              <h2 className="text-lg font-bold text-gold">{g.title}</h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {g.regions.map((r) => (
                  <li key={r.name}>
                    <Link
                      href={regionHref(r)}
                      className="inline-block rounded-full border border-white/10 px-3 py-1.5 text-sm text-ivory/80 hover:border-gold/50 hover:text-ivory"
                    >
                      {r.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm text-ivory/50">
          * 세부 동네는 권역 대표 지역 페이지에서 함께 안내합니다. 정확한 가능
          여부는 전화로 확인해 주세요.
        </p>
      </section>
    </>
  );
}
