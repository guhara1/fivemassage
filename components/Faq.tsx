// JS 없이 동작하는 접근성 친화 FAQ (details/summary)
export default function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="space-y-3">
      {items.map((f) => (
        <details
          key={f.q}
          className="card group overflow-hidden open:border-gold/30"
        >
          <summary className="tap cursor-pointer list-none justify-between gap-4 px-5 text-left text-base font-medium text-ivory">
            <span className="flex items-start gap-3">
              <span className="mt-0.5 text-sm font-bold text-gold/70">Q</span>
              <span>{f.q}</span>
            </span>
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-white/15 text-gold transition group-open:rotate-45 group-open:border-gold/50">
              +
            </span>
          </summary>
          <div className="flex gap-3 px-5 pb-5 text-sm leading-relaxed text-ivory/70">
            <span className="mt-0.5 text-sm font-bold text-ivory/30">A</span>
            <p>{f.a}</p>
          </div>
        </details>
      ))}
    </div>
  );
}
