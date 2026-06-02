import type { Metadata } from "next";
import Link from "next/link";
import CallButton, { LinkButton } from "@/components/CallButton";
import Faq from "@/components/Faq";
import { SITE } from "@/lib/site";
import { JsonLd, faqLd, breadcrumbLd } from "@/lib/jsonld";

const PATH = "/faq";
const DESC =
  "파이브 마사지 자주 묻는 질문입니다. 출장마사지 예약 방법, 가능지역, 당일 예약, 가격, 방문 전 준비, 취소·변경 등 자주 묻는 내용을 모았습니다.";

export const metadata: Metadata = {
  title: "자주 묻는 질문(FAQ)",
  description: DESC,
  alternates: { canonical: PATH },
};

// 화면에 표시되는 질문과 FAQPage 구조화 데이터를 동일하게 유지한다.
const FAQS = [
  {
    q: "출장마사지 예약은 어떻게 하나요?",
    a: "예약은 전화 상담으로 진행합니다. 전화예약 0508-202-4717로 희망 시간과 위치, 프로그램을 알려 주시면 가능 여부를 확인해 드립니다. 자동 즉시 예약은 운영하지 않습니다.",
  },
  {
    q: "현재 가능한 지역은 어디인가요?",
    a: "수원, 동탄, 오산, 용인, 분당 일부 운영지역을 중심으로 안내하고 있습니다. 같은 도시 안에서도 위치와 시간대에 따라 가능 여부가 달라질 수 있어 전화로 확인이 필요합니다.",
  },
  {
    q: "당일 예약도 가능한가요?",
    a: "당일 예약은 그날의 일정과 이동 상황에 따라 가능 여부가 달라집니다. 가능한 경우도 있으니 전화로 먼저 확인해 주세요. 일정이 정해졌다면 미리 문의하시는 편이 안전합니다.",
  },
  {
    q: "가격은 어디서 확인할 수 있나요?",
    a: "프로그램별 이용 시간과 금액은 가격표 페이지에서 확인할 수 있습니다. 지역에 따라 기본 프로그램 가격이 달라지지는 않으며, 자세한 내용은 예약 시 안내해 드립니다.",
  },
  {
    q: "어떤 프로그램이 있나요?",
    a: "타이 건식, 아로마 오일, 시그니처 오일, VVIP 전신케어, 한국인 스웨디시, 남성 스웨디시를 안내합니다. 건식과 오일 중 선호 방식과 강도에 따라 선택하시면 됩니다.",
  },
  {
    q: "방문 전 무엇을 준비해야 하나요?",
    a: "정확한 주소와 건물 출입 방식, 주차 가능 여부, 희망 시간, 선택 프로그램을 미리 확인해 주세요. 오일 케어는 진행 후 가볍게 씻을 수 있는 환경을 확인해 두시면 좋습니다.",
  },
  {
    q: "예약을 변경하거나 취소하려면 어떻게 하나요?",
    a: "일정이 바뀌면 가급적 빠르게 전화로 알려 주세요. 방문형 서비스는 이동과 일정 조율이 함께 이루어지므로, 일찍 알려 주실수록 원활하게 안내가 가능합니다.",
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

export default function FaqPage() {
  return (
    <>
      <JsonLd
        data={[
          faqLd(FAQS),
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
            예약과 이용에 대해 자주 묻는 질문을 모았습니다. 찾으시는 내용이 없다면
            전화예약 {SITE.phoneDisplay}로 문의해 주세요.
          </p>
          <div className="mt-7">
            <CallButton />
          </div>
        </div>
      </section>

      <section className="container-page py-12">
        <div className="mx-auto max-w-3xl">
          <Faq items={FAQS} />
          <div className="mt-8 flex flex-wrap gap-3">
            <CallButton />
            <LinkButton href="/service/price">가격표 보기</LinkButton>
            <LinkButton href="/areas">가능지역 보기</LinkButton>
          </div>
        </div>
      </section>
    </>
  );
}
