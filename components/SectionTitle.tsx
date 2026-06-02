export default function SectionTitle({
  eyebrow,
  title,
  desc,
  center,
}: {
  eyebrow?: string;
  title: string;
  desc?: string;
  center?: boolean;
}) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && (
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
          {eyebrow}
        </p>
      )}
      <h2 className="text-2xl font-bold tracking-tight text-ivory sm:text-3xl">
        {title}
      </h2>
      {desc && (
        <p className="mt-3 text-sm leading-relaxed text-ivory/65 sm:text-base">
          {desc}
        </p>
      )}
    </div>
  );
}
