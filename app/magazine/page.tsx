import type { Metadata } from "next";
import Link from "next/link";
import CallButton from "@/components/CallButton";
import { JsonLd, breadcrumbLd } from "@/lib/jsonld";
import { MAG_CATEGORIES, postsByCategory } from "@/lib/magazine";

const PATH = "/magazine";

export const metadata: Metadata = {
  title: "매거진",
  description:
    "파이브 마사지 매거진입니다. 직장인 피로 관리, 가족·주거공간 케어, 지역별 웰니스, 이용 가이드, 서비스 안전 등 생활상황 중심의 정보 콘텐츠를 제공합니다.",
  alternates: { canonical: PATH },
};

export default function MagazinePage() {
  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: "홈", path: "/" },
          { name: "매거진", path: PATH },
        ])}
      />

      <section className="border-b border-white/5">
        <div className="container-page py-12 sm:py-16">
          <nav className="mb-5 text-xs text-ivory/40">
            <Link href="/" className="hover:text-ivory">홈</Link>
            <span className="mx-1.5">/</span>
            <span className="text-ivory/70">매거진</span>
          </nav>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            MAGAZINE
          </p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            파이브 마사지 매거진
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-ivory/70">
            예약 안내가 아닌, 생활상황에 맞춘 피로 관리와 이용 정보를 다루는
            콘텐츠입니다. 관심 있는 주제를 선택해 확인하세요.
          </p>

          {/* 카테고리 빠른 이동 */}
          <div className="mt-7 flex flex-wrap gap-2">
            {MAG_CATEGORIES.map((c) => (
              <a
                key={c.slug}
                href={`#cat-${c.slug}`}
                className="rounded-full border border-white/10 px-3 py-1.5 text-sm text-ivory/80 hover:border-gold/50 hover:text-ivory"
              >
                {c.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      {MAG_CATEGORIES.map((c) => {
        const posts = postsByCategory(c.slug);
        if (posts.length === 0) return null;
        return (
          <section
            key={c.slug}
            id={`cat-${c.slug}`}
            className="container-page scroll-mt-20 border-b border-white/5 py-12"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              {c.title}
            </p>
            <h2 className="mt-1 text-2xl font-bold tracking-tight">{c.title}</h2>
            <p className="mt-2 max-w-2xl text-sm text-ivory/60">{c.desc}</p>

            <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((p) => (
                <Link
                  key={p.slug}
                  href={`/magazine/${p.slug}`}
                  className="group flex flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition hover:border-gold/50"
                >
                  <span className="text-xs font-semibold uppercase tracking-wide text-gold">
                    {c.title}
                  </span>
                  <h3 className="mt-2 font-bold leading-snug text-ivory group-hover:text-gold">
                    {p.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ivory/60">
                    {p.excerpt}
                  </p>
                  <span className="mt-4 text-sm text-gold">자세히 보기 →</span>
                </Link>
              ))}
            </div>
          </section>
        );
      })}

      <section className="container-page py-12 text-center">
        <p className="text-lg font-semibold text-ivory">
          예약 가능 지역과 시간은 전화로 확인해 주세요
        </p>
        <div className="mt-6 flex justify-center">
          <CallButton />
        </div>
      </section>
    </>
  );
}
