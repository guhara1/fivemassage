import Link from "next/link";
import CallButton, { LinkButton } from "@/components/CallButton";
import { SITE } from "@/lib/site";
import { JsonLd, articleLd, breadcrumbLd } from "@/lib/jsonld";

type Crumb = { name: string; path: string };

export default function ArticleLayout({
  eyebrow,
  title,
  lead,
  path,
  description,
  crumbs,
  children,
  toc,
  datePublished,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  path: string;
  description: string;
  crumbs: Crumb[];
  children: React.ReactNode;
  toc?: { id: string; label: string }[];
  datePublished?: string;
}) {
  const breadcrumb: Crumb[] = [{ name: "홈", path: "/" }, ...crumbs];

  return (
    <>
      <JsonLd
        data={[
          articleLd({
            title,
            description,
            path,
            dateModified: SITE.updated,
            datePublished,
          }),
          breadcrumbLd(breadcrumb),
        ]}
      />

      {/* 헤더 */}
      <section className="border-b border-white/5">
        <div className="container-page py-12 sm:py-16">
          <nav className="mb-5 text-xs text-ivory/40" aria-label="breadcrumb">
            {breadcrumb.map((c, i) => (
              <span key={c.path}>
                {i > 0 && <span className="mx-1.5">/</span>}
                {i < breadcrumb.length - 1 ? (
                  <Link href={c.path} className="hover:text-ivory">
                    {c.name}
                  </Link>
                ) : (
                  <span className="text-ivory/70">{c.name}</span>
                )}
              </span>
            ))}
          </nav>

          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            {eyebrow}
          </p>
          <h1 className="max-w-3xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-ivory/70">
            {lead}
          </p>

          {/* E-E-A-T 바이라인 */}
          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-ivory/45">
            <span>
              작성·감수{" "}
              <span className="text-ivory/70">
                {SITE.name} 운영팀 ({SITE.company})
              </span>
            </span>
            {datePublished && (
              <span>
                발행{" "}
                <time dateTime={datePublished}>
                  {datePublished.replace(/-/g, ".")}
                </time>
              </span>
            )}
            <span>최종 점검 {SITE.updated}</span>
            <Link href="/about" className="text-gold/80 hover:text-gold">
              운영 정보 보기
            </Link>
          </div>

          <div className="mt-7">
            <CallButton />
          </div>
        </div>
      </section>

      {/* 본문 */}
      <article className="container-page py-12">
        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[1fr_15rem]">
          <div className="prose">{children}</div>

          {/* 목차 + 사이드 CTA */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-6">
              {toc && toc.length > 0 && (
                <nav className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-gold">
                    목차
                  </p>
                  <ul className="space-y-2 text-sm">
                    {toc.map((t) => (
                      <li key={t.id}>
                        <a
                          href={`#${t.id}`}
                          className="text-ivory/60 hover:text-ivory"
                        >
                          {t.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              )}
              <div className="rounded-2xl border border-gold/30 bg-gold/[0.06] p-5 text-center">
                <p className="text-sm text-ivory/75">예약 가능 여부 문의</p>
                <a
                  href={SITE.phoneTel}
                  className="mt-2 block text-lg font-bold text-gold"
                >
                  {SITE.phoneDisplay}
                </a>
              </div>
            </div>
          </aside>
        </div>
      </article>

      {/* 하단 CTA */}
      <section className="border-t border-white/5 bg-gradient-to-b from-white/[0.03] to-transparent">
        <div className="container-page py-12 text-center">
          <p className="text-lg font-semibold text-ivory">
            예약 가능 지역과 시간은 전화로 확인해 주세요
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <CallButton />
            <LinkButton href="/service/price">가격표 보기</LinkButton>
            <LinkButton href="/areas">가능지역 보기</LinkButton>
          </div>
        </div>
      </section>
    </>
  );
}
