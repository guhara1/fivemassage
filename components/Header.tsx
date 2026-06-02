"use client";

import Link from "next/link";
import { useState } from "react";
import { SITE, REGION_GROUPS, regionHref } from "@/lib/site";

type MenuLink = { label: string; href: string };

const SERVICE_LINKS: MenuLink[] = [
  { label: "출장마사지 안내", href: "/service/visit-massage" },
  { label: "이용절차", href: "/service/process" },
  { label: "요금 안내", href: "/service/price" },
  { label: "예약 전 확인사항", href: "/service/notes" },
];

const MAGAZINE_LINKS: MenuLink[] = [
  { label: "전체", href: "/magazine" },
  { label: "직장인 피로 관리", href: "/magazine#cat-jikjang" },
  { label: "가족·주거공간 케어", href: "/magazine#cat-family" },
  { label: "지역별 웰니스 가이드", href: "/magazine#cat-wellness" },
  { label: "출장마사지 이용 가이드", href: "/magazine#cat-guide" },
  { label: "서비스 안전 가이드", href: "/magazine#cat-safety" },
];

const FAQ_LINKS: MenuLink[] = [
  { label: "예약 FAQ", href: "/faq#booking" },
  { label: "지역 FAQ", href: "/faq#area" },
  { label: "이용 전 확인사항", href: "/service/notes" },
];

const ABOUT_LINKS: MenuLink[] = [
  { label: "파이브 마사지 소개", href: "/about" },
  { label: "사업자 정보", href: "/about#info" },
  { label: "문의", href: "/about#info" },
];

export default function Header({ logoSrc }: { logoSrc?: string | null }) {
  const [open, setOpen] = useState(false); // 모바일 메뉴
  const [openGroup, setOpenGroup] = useState<string | null>(null); // 모바일 권역 아코디언
  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-navy-deep/90 backdrop-blur supports-[backdrop-filter]:bg-navy-deep/75">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 font-bold tracking-tight" aria-label="파이브 마사지 홈">
          {logoSrc ? (
            // public/ 에 로고 파일이 있으면 빌드 시 이미지로 표시 (없으면 텍스트)
            // eslint-disable-next-line @next/next/no-img-element
            <img src={logoSrc} alt="파이브 마사지" className="h-9 w-auto" />
          ) : (
            <>
              <span className="text-gold">파이브</span>
              <span className="text-ivory">마사지</span>
            </>
          )}
        </Link>

        {/* PC 메뉴 */}
        <nav className="hidden items-center gap-1 lg:flex">
          <DropNav label="서비스 안내">
            {SERVICE_LINKS.map((l) => (
              <DropLink key={l.label} href={l.href}>
                {l.label}
              </DropLink>
            ))}
          </DropNav>

          <DropNav label="지역안내">
            <div className="w-[34rem] p-4">
              <Link
                href="/areas"
                className="mb-3 block rounded px-2 py-1 text-sm font-semibold text-gold hover:bg-white/5"
              >
                가능지역 전체보기 →
              </Link>
              <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                {REGION_GROUPS.map((g) => (
                  <div key={g.key}>
                    <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-gold">
                      {g.title}
                    </p>
                    <ul className="space-y-0.5">
                      {g.regions.map((r) => (
                        <li key={r.name}>
                          <Link
                            href={regionHref(r)}
                            className="block rounded px-2 py-1 text-sm text-ivory/80 hover:bg-white/5 hover:text-ivory"
                          >
                            {r.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </DropNav>

          <DropNav label="매거진">
            {MAGAZINE_LINKS.map((l) => (
              <DropLink key={l.label} href={l.href}>
                {l.label}
              </DropLink>
            ))}
          </DropNav>

          <DropNav label="FAQ">
            {FAQ_LINKS.map((l) => (
              <DropLink key={l.label} href={l.href}>
                {l.label}
              </DropLink>
            ))}
          </DropNav>

          <DropNav label="회사소개">
            {ABOUT_LINKS.map((l) => (
              <DropLink key={l.label} href={l.href}>
                {l.label}
              </DropLink>
            ))}
          </DropNav>

          <a
            href={SITE.phoneTel}
            className="ml-2 tap rounded-full bg-gold px-5 text-sm font-semibold text-navy-deep hover:bg-gold-soft"
          >
            전화예약 {SITE.phoneDisplay}
          </a>
        </nav>

        {/* 모바일: 전화 + 햄버거 */}
        <div className="flex items-center gap-2 lg:hidden">
          <a
            href={SITE.phoneTel}
            className="tap rounded-full bg-gold px-4 text-sm font-semibold text-navy-deep"
            aria-label="전화예약"
          >
            전화예약
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            className="tap w-12 rounded-md text-ivory"
            aria-label="메뉴 열기"
            aria-expanded={open}
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* 모바일 메뉴 패널 */}
      {open && (
        <div className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-white/5 bg-navy-deep lg:hidden">
          <nav className="container-page space-y-2 py-4">
            <MobileSection title="서비스 안내">
              {SERVICE_LINKS.map((l) => (
                <MobileLink key={l.label} href={l.href} onClick={close}>
                  {l.label}
                </MobileLink>
              ))}
            </MobileSection>

            {/* 지역안내 — 권역별 아코디언 */}
            <div className="rounded-lg bg-white/[0.03] p-1">
              <p className="px-3 pt-2 text-xs font-semibold uppercase tracking-wide text-gold">
                지역안내
              </p>
              <MobileLink href="/areas" onClick={close}>
                가능지역 전체보기
              </MobileLink>
              {REGION_GROUPS.map((g) => (
                <div key={g.key}>
                  <button
                    onClick={() =>
                      setOpenGroup((cur) => (cur === g.key ? null : g.key))
                    }
                    className="tap w-full justify-between px-4 text-left text-sm font-medium text-ivory"
                    aria-expanded={openGroup === g.key}
                  >
                    <span>{g.title}</span>
                    <span className="text-gold">
                      {openGroup === g.key ? "−" : "+"}
                    </span>
                  </button>
                  {openGroup === g.key && (
                    <ul className="pb-2">
                      {g.regions.map((r) => (
                        <li key={r.name}>
                          <Link
                            href={regionHref(r)}
                            onClick={close}
                            className="block rounded px-6 py-2 text-sm text-ivory/75 hover:bg-white/5"
                          >
                            {r.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>

            <MobileSection title="매거진">
              {MAGAZINE_LINKS.map((l) => (
                <MobileLink key={l.label} href={l.href} onClick={close}>
                  {l.label}
                </MobileLink>
              ))}
            </MobileSection>

            <MobileSection title="FAQ">
              {FAQ_LINKS.map((l) => (
                <MobileLink key={l.label} href={l.href} onClick={close}>
                  {l.label}
                </MobileLink>
              ))}
            </MobileSection>

            <MobileSection title="회사소개">
              {ABOUT_LINKS.map((l) => (
                <MobileLink key={l.label} href={l.href} onClick={close}>
                  {l.label}
                </MobileLink>
              ))}
            </MobileSection>
          </nav>
        </div>
      )}
    </header>
  );
}

function DropNav({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="group relative">
      <button className="rounded-md px-3 py-2 text-sm font-medium text-ivory/80 hover:text-ivory">
        {label}
      </button>
      <div className="invisible absolute left-0 top-full z-50 min-w-[12rem] translate-y-1 rounded-xl border border-white/10 bg-navy shadow-2xl opacity-0 transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
        <div className="py-2">{children}</div>
      </div>
    </div>
  );
}

function DropLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="block px-4 py-2 text-sm text-ivory/80 hover:bg-white/5 hover:text-ivory"
    >
      {children}
    </Link>
  );
}

function MobileSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg bg-white/[0.03] p-1">
      <p className="px-3 pt-2 text-xs font-semibold uppercase tracking-wide text-gold">
        {title}
      </p>
      <div className="pb-1">{children}</div>
    </div>
  );
}

function MobileLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="block rounded px-4 py-2.5 text-sm text-ivory/80 hover:bg-white/5"
    >
      {children}
    </Link>
  );
}
