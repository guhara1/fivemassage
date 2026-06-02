import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import ArticleLayout from "@/components/ArticleLayout";
import { POSTS, getPost, categoryTitle, Post } from "@/lib/magazine";

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const post = getPost(params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.metaDescription,
    alternates: { canonical: `/magazine/${post.slug}` },
  };
}

function readingMinutes(post: Post): number {
  const chars = post.blocks.reduce((n, b) => {
    return n + (b.p?.length ?? 0) + (b.h2?.length ?? 0) + (b.ul?.join("").length ?? 0);
  }, post.lead.length);
  return Math.max(1, Math.round(chars / 500));
}

// 관련 글: 같은 카테고리 우선, 부족하면 다른 글로 채움 (최대 3)
function relatedPosts(post: Post): Post[] {
  const same = POSTS.filter(
    (p) => p.slug !== post.slug && p.category === post.category
  );
  const others = POSTS.filter(
    (p) => p.slug !== post.slug && p.category !== post.category
  );
  return [...same, ...others].slice(0, 3);
}

export default function MagazinePostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = getPost(params.slug);
  if (!post) notFound();
  const related = relatedPosts(post);

  return (
    <ArticleLayout
      eyebrow={categoryTitle(post.category)}
      title={post.title}
      lead={post.lead}
      path={`/magazine/${post.slug}`}
      description={post.metaDescription}
      datePublished={post.date}
      readingMinutes={readingMinutes(post)}
      crumbs={[
        { name: "매거진", path: "/magazine" },
        { name: post.title, path: `/magazine/${post.slug}` },
      ]}
      after={
        related.length > 0 && (
          <section className="border-t border-white/5 bg-white/[0.015]">
            <div className="container-page py-14">
              <div className="mx-auto max-w-5xl">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="eyebrow mb-2">MORE</p>
                    <h2 className="text-2xl font-bold tracking-tight">
                      함께 보면 좋은 글
                    </h2>
                  </div>
                  <Link
                    href="/magazine"
                    className="shrink-0 text-sm text-gold hover:underline"
                  >
                    매거진 전체 →
                  </Link>
                </div>
                <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {related.map((r) => (
                    <Link
                      key={r.slug}
                      href={`/magazine/${r.slug}`}
                      className="card card-hover group flex flex-col p-5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold uppercase tracking-wide text-gold">
                          {categoryTitle(r.category)}
                        </span>
                        <time
                          dateTime={r.date}
                          className="text-xs text-ivory/40"
                        >
                          {r.date.replace(/-/g, ".")}
                        </time>
                      </div>
                      <h3 className="mt-3 flex-1 font-bold leading-snug text-ivory group-hover:text-gold">
                        {r.title}
                      </h3>
                      <span className="mt-4 text-sm text-gold">
                        자세히 보기 →
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )
      }
    >
      {post.blocks.map((b, i) => (
        <div key={i}>
          {b.h2 && <h2 id={`b-${i}`}>{b.h2}</h2>}
          {b.p && <p>{b.p}</p>}
          {b.ul && (
            <ul>
              {b.ul.map((li) => (
                <li key={li}>{li}</li>
              ))}
            </ul>
          )}
        </div>
      ))}

      {/* 관련 안내 (정보 → 예약 전환 내부링크) */}
      <div className="callout mt-10">
        <strong>관련 안내</strong>
        <ul className="mt-2">
          {post.related.map((r) => (
            <li key={r.href}>
              <Link href={r.href}>{r.label}</Link>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-sm text-ivory/55">
          위 내용은 일반적인 컨디션 관리 정보이며, 의료행위나 치료를 대신하지
          않습니다. 예약 가능 여부는 전화예약 0508-202-4717로 확인해 주세요.
        </p>
      </div>
    </ArticleLayout>
  );
}
