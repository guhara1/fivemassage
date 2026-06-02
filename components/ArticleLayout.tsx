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
  readingMinutes,
  after,
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
  readingMinutes?: number;
  after?: React.ReactNode;
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

      {/* ── 히어로 ── */}
      <header className="hero-glow relative overflow-hidden border-b border-white/5">
        <div className="container-page relative py-12 sm:py-16">
          <nav
            className="mb-6 flex flex-wrap items-center text-xs text-ivory/40"
            aria-label="breadcrumb"
          >
            {breadcrumb.map((c, i) => (
              <span key={c.path} className="flex items-center">
                {i > 0 && <span className="mx-1.5 text-ivory/20">/</span>}
                {i < breadcrumb.length - 1 ? (
                  <Link href={c.path} className="hover:text-ivory">
                    {c.name}
                  </Link>
                ) : (
                  <span className="max-w-[60vw] truncate text-ivory/70 sm:max-w-none">
                    {c.name}
                  </span>
                )}
              </span>
            ))}
          </nav>

          <div className="chip-gold mb-5">{eyebrow}</div>

          <h1 className="max-w-3xl text-[1.75rem] font-bold leading-[1.25] tracking-tight sm:text-[2.6rem] sm:leading-[1.2]">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-ivory/65 sm:text-lg">
            {lead}
          </p>

          {/* 메타 (저자 · 발행 · 읽는시간) */}
          <div className="mt-7 flex flex-wrap items-center gap-y-3 text-xs text-ivory/50">
            <span className="flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-gold/15 text-sm font-bold text-gold">
                파
              </span>
              <span>
                <span className="block text-ivory/80">
                  {SITE.name} 운영팀
                </span>
                <span className="block text-[0.7rem] text-ivory/40">
                  작성·감수 · {SITE.company}
                </span>
              </span>
            </span>
            <span className="mx-4 hidden h-6 w-px bg-white/10 sm:block" />
            {datePublished && (
              <span className="dot-sep first:before:hidden">
                발행{" "}
                <time dateTime={datePublished}>
                  {datePublished.replace(/-/g, ".")}
                </time>
              </span>
            )}
            {readingMinutes && (
              <span className="dot-sep">읽는 시간 {readingMinutes}분</span>
            )}
            <span className="dot-sep">최종 점검 {SITE.updated}</span>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <CallButton />
            <LinkButton href="/about">운영 정보</LinkButton>
          </div>
        </div>
      </header>

      {/* ── 본문 ── */}
      <div className="container-page py-12 sm:py-14">
        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[minmax(0,1fr)_16rem]">
          <article className="prose min-w-0">{children}</article>

          {/* 사이드 (목차 + CTA) */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-5">
              {toc && toc.length > 0 && (
                <nav className="card p-5">
                  <p className="eyebrow mb-3">목차</p>
                  <ul className="space-y-1 border-l border-white/10 pl-3 text-sm">
                    {toc.map((t) => (
                      <li key={t.id}>
                        <a
                          href={`#${t.id}`}
                          className="block rounded py-1 text-ivory/55 transition hover:text-gold"
                        >
                          {t.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              )}
              <div className="rounded-2xl border border-gold/30 bg-gradient-to-b from-gold/[0.12] to-gold/[0.02] p-5 text-center">
                <p className="text-sm text-ivory/75">예약 가능 여부 문의</p>
                <a
                  href={SITE.phoneTel}
                  className="mt-1 block text-xl font-bold tracking-tight text-gold"
                >
                  {SITE.phoneDisplay}
                </a>
                <a
                  href={SITE.phoneTel}
                  className="tap mt-3 w-full rounded-full bg-gold text-sm font-semibold text-navy-deep hover:bg-gold-soft"
                >
                  전화예약하기
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* ── 추가 영역 (관련 글 등) ── */}
      {after}

      {/* ── 하단 CTA ── */}
      <section className="border-t border-white/5">
        <div className="container-page py-14">
          <div className="hero-glow relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent px-6 py-12 text-center sm:px-10">
            <h2 className="relative text-2xl font-bold tracking-tight sm:text-3xl">
              예약 가능 지역과 시간은 전화로 확인해 주세요
            </h2>
            <p className="relative mt-3 text-ivory/60">
              {SITE.name}는 {SITE.areasShort} 일부 운영지역 중심의 방문 마사지를
              안내합니다.
            </p>
            <div className="relative mt-8 flex flex-wrap justify-center gap-3">
              <CallButton />
              <LinkButton href="/service/price">가격표 보기</LinkButton>
              <LinkButton href="/areas">가능지역 보기</LinkButton>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
