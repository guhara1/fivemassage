import Link from "next/link";
import { SITE, REGION_GROUPS, regionHref } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-navy-deep">
      <div className="container-page grid gap-10 py-12 md:grid-cols-3">
        <div>
          <p className="text-lg font-bold">
            <span className="text-gold">쓰리</span> 마사지
          </p>
          <p className="mt-3 text-sm leading-relaxed text-ivory/60">
            {SITE.areasShort} 일부 운영지역 중심의 전화예약 방문 마사지 안내
            서비스입니다.
          </p>
          <a
            href={SITE.phoneTel}
            className="mt-4 inline-block text-lg font-bold text-gold"
          >
            {SITE.phoneDisplay}
          </a>
        </div>

        <div>
          <p className="mb-3 text-sm font-semibold text-ivory">가능지역</p>
          <ul className="space-y-2 text-sm text-ivory/60">
            {REGION_GROUPS.map((g) => (
              <li key={g.key}>
                <span className="text-gold/80">{g.title}</span>{" "}
                {g.regions.map((r, i) => (
                  <span key={r.name}>
                    <Link href={regionHref(r)} className="hover:text-ivory">
                      {r.name}
                    </Link>
                    {i < g.regions.length - 1 ? ", " : ""}
                  </span>
                ))}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-3 text-sm font-semibold text-ivory">사업자 정보</p>
          <ul className="space-y-1.5 text-sm text-ivory/60">
            <li>상호: {SITE.name}</li>
            <li>운영사: {SITE.company}</li>
            <li>대표: {SITE.ceo}</li>
            <li>사업자등록번호: {SITE.bizNo}</li>
            <li>주소: {SITE.address}</li>
            <li>전화예약: {SITE.phoneDisplay}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/5 py-5 text-center text-xs text-ivory/40">
        © {new Date().getFullYear()} {SITE.name} · {SITE.company}. 의료행위나 치료
        목적이 아닌 휴식·컨디션 관리를 위한 방문 케어 안내 서비스입니다.
      </div>
    </footer>
  );
}
