import Link from "next/link";
import CallButton from "@/components/CallButton";

export default function NotFound() {
  return (
    <section className="container-page flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="text-5xl font-bold text-gold">404</p>
      <h1 className="mt-4 text-2xl font-bold">페이지를 찾을 수 없습니다</h1>
      <p className="mt-3 text-ivory/65">
        주소가 변경되었거나 존재하지 않는 페이지입니다.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="tap rounded-full border border-ivory/30 px-6 font-semibold text-ivory hover:bg-ivory/10"
        >
          홈으로
        </Link>
        <CallButton />
      </div>
    </section>
  );
}
