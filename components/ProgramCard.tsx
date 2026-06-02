import { Program, formatKRW } from "@/lib/site";

// 다크 프리미엄 카드형 가격표. VVIP 등 best 프로그램에 BEST 배지.
export default function ProgramCard({ program }: { program: Program }) {
  return (
    <div
      className={`relative flex flex-col rounded-2xl border bg-gradient-to-b from-white/[0.04] to-transparent p-6 ${
        program.best ? "border-gold/70 shadow-lg shadow-gold/10" : "border-white/10"
      }`}
    >
      {program.best && (
        <span className="absolute -top-3 right-5 rounded-full bg-gold px-3 py-1 text-xs font-bold text-navy-deep">
          BEST
        </span>
      )}
      <p className="text-xs font-semibold uppercase tracking-wide text-gold">
        {program.category}
      </p>
      <h3 className="mt-1 text-xl font-bold text-ivory">{program.name}</h3>
      <p className="mt-2 text-sm leading-relaxed text-ivory/60">{program.desc}</p>

      <ul className="mt-5 space-y-2 border-t border-white/10 pt-4">
        {program.prices.map((p) => (
          <li
            key={p.duration}
            className="flex items-center justify-between text-sm"
          >
            <span className="text-ivory/70">{p.duration}</span>
            <span className="text-right font-semibold text-ivory">
              {formatKRW(p.price)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
