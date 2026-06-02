// JS 없이 동작하는 접근성 친화 FAQ (details/summary)
export default function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-white/10 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
      {items.map((f) => (
        <details key={f.q} className="group">
          <summary className="tap cursor-pointer list-none justify-between px-5 text-left text-base font-medium text-ivory">
            <span>{f.q}</span>
            <span className="ml-4 text-gold transition group-open:rotate-45">
              +
            </span>
          </summary>
          <p className="px-5 pb-5 text-sm leading-relaxed text-ivory/70">
            {f.a}
          </p>
        </details>
      ))}
    </div>
  );
}
