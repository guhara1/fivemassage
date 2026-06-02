import Link from "next/link";
import { SITE } from "@/lib/site";

type Props = {
  variant?: "gold" | "outline";
  className?: string;
  label?: string;
};

// 전화예약 CTA. 클릭 시 tel: 연결.
export default function CallButton({
  variant = "gold",
  className = "",
  label,
}: Props) {
  const base =
    "tap rounded-full px-6 text-base font-semibold transition-colors";
  const styles =
    variant === "gold"
      ? "bg-gold text-navy-deep hover:bg-gold-soft"
      : "border border-gold/60 text-gold hover:bg-gold/10";
  return (
    <a href={SITE.phoneTel} className={`${base} ${styles} ${className}`}>
      {label ?? `전화예약 ${SITE.phoneDisplay}`}
    </a>
  );
}

export function LinkButton({
  href,
  children,
  variant = "outline",
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "gold" | "outline";
  className?: string;
}) {
  const base =
    "tap rounded-full px-6 text-base font-semibold transition-colors";
  const styles =
    variant === "gold"
      ? "bg-gold text-navy-deep hover:bg-gold-soft"
      : "border border-ivory/30 text-ivory hover:bg-ivory/10";
  return (
    <Link href={href} className={`${base} ${styles} ${className}`}>
      {children}
    </Link>
  );
}
