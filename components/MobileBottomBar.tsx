import Link from "next/link";
import { SITE } from "@/lib/site";

// 모바일 하단 고정 네비게이션 + 전화예약. safe-area 반영.
export default function MobileBottomBar() {
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-navy-deep/95 backdrop-blur lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      aria-label="모바일 하단 메뉴"
    >
      <div className="grid grid-cols-4">
        <BarItem href="/" label="홈" icon="🏠" />
        <BarItem href="/areas" label="가능지역" icon="📍" />
        <BarItem href="/service/price" label="가격표" icon="💳" />
        <a
          href={SITE.phoneTel}
          className="tap flex-col gap-0.5 bg-gold text-navy-deep"
          aria-label="전화예약"
        >
          <span className="text-base leading-none">📞</span>
          <span className="text-[11px] font-bold leading-none">전화예약</span>
        </a>
      </div>
    </nav>
  );
}

function BarItem({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: string;
}) {
  return (
    <Link
      href={href}
      className="tap flex-col gap-0.5 text-ivory/70 hover:text-ivory"
    >
      <span className="text-base leading-none">{icon}</span>
      <span className="text-[11px] leading-none">{label}</span>
    </Link>
  );
}
