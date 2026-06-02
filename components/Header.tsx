"use client";

import Link from "next/link";
import { useState } from "react";
import { SITE, REGION_GROUPS, regionHref } from "@/lib/site";

const SERVICE_LINKS = [
  { label: "출장마사지 안내", href: "/#service" },
  { label: "프로그램 안내", href: "/#service" },
  { label: "가격표", href: "/service/price" },
  { label: "이용절차", href: "/#process" },
  { label: "예약 전 확인사항", href: "/#notes" },
];

export default function Header() {
  const [open, setOpen] = useState(false); // 모바일 메뉴
  const [openGroup, setOpenGroup] = useState<string | null>(null); // 모바일 권역 아코디언

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-navy-deep/90 backdrop-blur supports-[backdrop-filter]:bg-navy-deep/75">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 font-bold tracking-tight">
          <span className="text-gold">쓰리</span>
          <span className="text-ivory">마사지</span>
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
            <div className="grid w-[34rem] grid-cols-2 gap-x-6 gap-y-3 p-4">
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
                          {r.name} 출장마사지
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </DropNav>

          <NavLink href="/areas">가능지역</NavLink>
          <NavLink href="/#faq">FAQ</NavLink>
          <NavLink href="/#company">회사소개</NavLink>

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
        <div className="border-t border-white/5 bg-navy-deep lg:hidden">
          <nav className="container-page space-y-1 py-4">
            <MobileSection title="서비스 안내">
              {SERVICE_LINKS.map((l) => (
                <MobileLink key={l.label} href={l.href} onClick={() => setOpen(false)}>
                  {l.label}
                </MobileLink>
              ))}
            </MobileSection>

            {/* 지역안내 — 권역별 아코디언 */}
            <div className="rounded-lg bg-white/[0.03]">
              <p className="px-3 pt-3 text-xs font-semibold uppercase tracking-wide text-gold">
                지역안내
              </p>
              {REGION_GROUPS.map((g) => (
                <div key={g.key} className="px-1">
                  <button
                    onClick={() =>
                      setOpenGroup((cur) => (cur === g.key ? null : g.key))
                    }
                    className="tap w-full justify-between px-2 text-left text-sm font-medium text-ivory"
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
                            onClick={() => setOpen(false)}
                            className="block rounded px-4 py-2 text-sm text-ivory/75 hover:bg-white/5"
                          >
                            {r.name} 출장마사지
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>

            <MobileLink href="/areas" onClick={() => setOpen(false)}>
              가능지역 전체보기
            </MobileLink>
            <MobileLink href="/#faq" onClick={() => setOpen(false)}>
              FAQ
            </MobileLink>
            <MobileLink href="/#company" onClick={() => setOpen(false)}>
              회사소개
            </MobileLink>
          </nav>
        </div>
      )}
    </header>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="rounded-md px-3 py-2 text-sm font-medium text-ivory/80 hover:text-ivory"
    >
      {children}
    </Link>
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
