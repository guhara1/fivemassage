import type { Metadata } from "next";
import Link from "next/link";
import CallButton, { LinkButton } from "@/components/CallButton";
import Faq from "@/components/Faq";
import { SITE } from "@/lib/site";
import { JsonLd, faqLd, breadcrumbLd } from "@/lib/jsonld";

const PATH = "/faq";
const DESC =
  "파이브 마사지 자주 묻는 질문입니다. 예약 방법·당일 예약 등 예약 FAQ와 가능지역·이동 등 지역 FAQ를 나누어 안내합니다.";

export const metadata: Metadata = {
  title: "자주 묻는 질문(FAQ)",
  description: DESC,
  alternates: { canonical: PATH },
};

// 예약 관련 FAQ (#booking)
const BOOKING_FAQS = [
  {
    q: "출장마사지 예약은 어떻게 하나요?",
    a: "예약은 전화 상담으로 진행합니다. 전화예약 0508-202-4717로 희망 시간과 위치, 프로그램을 알려 주시면 가능 여부를 확인해 드립니다. 자동 즉시 예약은 운영하지 않습니다.",
  },
  {
    q: "당일 예약도 가능한가요?",
    a: "당일 예약은 그날의 일정과 이동 상황에 따라 가능 여부가 달라집니다. 가능한 경우도 있으니 전화로 먼저 확인해 주세요.",
  },
  {
    q: "예약을 변경하거나 취소하려면 어떻게 하나요?",
    a: "일정이 바뀌면 가급적 빠르게 전화로 알려 주세요. 방문형 서비스는 이동과 일정 조율이 함께 이루어지므로, 일찍 알려 주실수록 원활하게 안내가 가능합니다.",
  },
  {
    q: "어떤 프로그램이 있나요?",
    a: "타이 건식, 아로마 오일, 시그니처 오일, VVIP 전신케어, 한국인 스웨디시, 남성 스웨디시를 안내합니다. 건식과 오일 중 선호 방식과 강도에 따라 선택하시면 됩니다.",
  },
  {
    q: "강도는 조절할 수 있나요?",
    a: "네, 예약 시 선호 강도와 평소 피로를 느끼는 부위를 알려 주시면 그에 맞춰 안내해 드립니다. 진행 중에도 불편하면 언제든 말씀해 주시면 조율합니다.",
  },
  {
    q: "어떤 목적의 서비스인가요?",
    a: "파이브 마사지는 휴식과 컨디션 관리를 위한 건전한 방문 마사지 예약 안내 서비스입니다. 의료행위나 치료 목적이 아니며, 불건전한 목적의 문의는 받지 않습니다.",
  },
];

// 지역 관련 FAQ (#area)
const AREA_FAQS = [
  {
    q: "현재 가능한 지역은 어디인가요?",
    a: "수원, 동탄, 오산, 용인, 분당 일부 운영지역을 중심으로 안내하고 있습니다. 같은 도시 안에서도 위치와 시간대에 따라 가능 여부가 달라질 수 있어 전화로 확인이 필요합니다.",
  },
  {
    q: "운영지역 외 지역도 방문하나요?",
    a: "운영지역은 수원·동탄·오산·용인·분당 일부 권역으로 한정합니다. 이동 시간을 현실적으로 관리해 예약하신 시간을 지키기 위한 운영 방식입니다.",
  },
  {
    q: "같은 도시인데 위치에 따라 달라지나요?",
    a: "네, 생활권이 넓은 지역은 위치와 예약 시간에 따라 이동 시간이 달라져 가능 여부가 변동될 수 있습니다. 정확한 주소를 기준으로 안내해 드립니다.",
  },
  {
    q: "가격은 지역마다 다른가요?",
    a: "기본 프로그램 가격은 가격표 기준으로 동일하게 안내되며, 지역에 따라 달라지지 않습니다. 자세한 내용은 예약 시 확인해 주세요.",
  },
];

export default function FaqPage() {
  return (
    <>
      <JsonLd
        data={[
          faqLd([...BOOKING_FAQS, ...AREA_FAQS]),
          breadcrumbLd([
            { name: "홈", path: "/" },
            { name: "자주 묻는 질문", path: PATH },
          ]),
        ]}
      />

      <section className="border-b border-white/5">
        <div className="container-page py-12 sm:py-16">
          <nav className="mb-5 text-xs text-ivory/40">
            <Link href="/" className="hover:text-ivory">홈</Link>
            <span className="mx-1.5">/</span>
            <span className="text-ivory/70">자주 묻는 질문</span>
          </nav>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            FAQ
          </p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            자주 묻는 질문
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-ivory/70">
            예약과 지역에 대해 자주 묻는 질문을 모았습니다. 찾으시는 내용이 없다면
            전화예약 {SITE.phoneDisplay}로 문의해 주세요.
          </p>
          <div className="mt-7 flex flex-wrap gap-2">
            <a href="#booking" className="rounded-full border border-white/10 px-3 py-1.5 text-sm text-ivory/80 hover:border-gold/50 hover:text-ivory">예약 FAQ</a>
            <a href="#area" className="rounded-full border border-white/10 px-3 py-1.5 text-sm text-ivory/80 hover:border-gold/50 hover:text-ivory">지역 FAQ</a>
            <Link href="/service/notes" className="rounded-full border border-white/10 px-3 py-1.5 text-sm text-ivory/80 hover:border-gold/50 hover:text-ivory">이용 전 확인사항</Link>
          </div>
        </div>
      </section>

      <section id="booking" className="container-page scroll-mt-20 py-12">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-6 text-2xl font-bold tracking-tight">예약 FAQ</h2>
          <Faq items={BOOKING_FAQS} />
        </div>
      </section>

      <section id="area" className="border-t border-white/5 bg-white/[0.015]">
        <div className="container-page scroll-mt-20 py-12">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-6 text-2xl font-bold tracking-tight">지역 FAQ</h2>
            <Faq items={AREA_FAQS} />
            <div className="mt-8 flex flex-wrap gap-3">
              <CallButton />
              <LinkButton href="/areas">가능지역 보기</LinkButton>
              <LinkButton href="/service/notes">예약 전 확인사항</LinkButton>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
