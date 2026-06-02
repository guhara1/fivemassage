import { SITE } from "@/lib/site";

// 우측 하단 floating 전화 버튼 (pulse 애니메이션).
// 모바일 하단바와 겹치지 않도록 bottom 여백을 충분히 둔다.
export default function FloatingCall() {
  return (
    <a
      href={SITE.phoneTel}
      aria-label={`전화예약 ${SITE.phoneDisplay}`}
      className="fixed right-4 z-50 flex h-14 items-center gap-2 rounded-full bg-gold px-4 font-bold text-navy-deep shadow-xl animate-pulseRing bottom-[calc(env(safe-area-inset-bottom)+5.5rem)] lg:bottom-6"
    >
      <span className="text-xl leading-none">📞</span>
      <span className="hidden text-sm sm:inline">전화예약</span>
    </a>
  );
}
