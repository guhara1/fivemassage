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
    <div
      className={
        center ? "mx-auto max-w-2xl text-center" : "max-w-3xl"
      }
    >
      {eyebrow && (
        <p className={`eyebrow mb-3 ${center ? "justify-center" : ""}`}>
          {eyebrow}
        </p>
      )}
      <h2 className="text-[1.6rem] font-bold leading-tight tracking-tight text-ivory sm:text-[2rem]">
        {title}
      </h2>
      {desc && (
        <p className="mt-3 text-sm leading-relaxed text-ivory/60 sm:text-base">
          {desc}
        </p>
      )}
    </div>
  );
}
