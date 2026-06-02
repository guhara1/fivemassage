import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import ArticleLayout from "@/components/ArticleLayout";
import { POSTS, getPost, categoryTitle } from "@/lib/magazine";

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

export default function MagazinePostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = getPost(params.slug);
  if (!post) notFound();

  return (
    <ArticleLayout
      eyebrow={categoryTitle(post.category)}
      title={post.title}
      lead={post.lead}
      path={`/magazine/${post.slug}`}
      description={post.metaDescription}
      crumbs={[
        { name: "매거진", path: "/magazine" },
        { name: post.title, path: `/magazine/${post.slug}` },
      ]}
    >
      {post.blocks.map((b, i) => (
        <div key={i}>
          {b.h2 && <h2>{b.h2}</h2>}
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
      <div className="callout">
        <strong>관련 안내</strong>
        <ul className="mt-2">
          {post.related.map((r) => (
            <li key={r.href}>
              <Link href={r.href}>{r.label}</Link>
            </li>
          ))}
        </ul>
        <p className="mt-3">
          위 내용은 일반적인 컨디션 관리 정보이며, 의료행위나 치료를 대신하지
          않습니다. 예약 가능 여부는 전화예약 0508-202-4717로 확인해 주세요.
        </p>
      </div>
    </ArticleLayout>
  );
}
