import type { Metadata } from "next";
import ArticleLayout from "@/components/ArticleLayout";
import { SITE } from "@/lib/site";
import { JsonLd, organizationLd, localBusinessLd } from "@/lib/jsonld";

const PATH = "/about";
const DESC =
  "파이브 마사지 회사소개입니다. 운영 주체와 운영 원칙, 콘텐츠 작성 기준, 사업자 정보와 연락처를 투명하게 안내합니다. 휴식과 컨디션 관리를 위한 건전한 방문 마사지 안내 서비스입니다.";

export const metadata: Metadata = {
  title: "회사소개",
  description: DESC,
  alternates: { canonical: PATH },
};

const INFO: [string, string][] = [
  ["상호", SITE.name],
  ["운영사", SITE.company],
  ["대표", SITE.ceo],
  ["사업자등록번호", SITE.bizNo],
  ["주소", SITE.address],
  ["전화예약", SITE.phoneDisplay],
  ["운영지역", "수원, 동탄, 오산, 용인, 분당 일부 권역"],
  ["서비스 성격", "휴식·컨디션 관리를 위한 건전한 방문 마사지 예약 안내"],
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={[organizationLd(), localBusinessLd()]} />
      <ArticleLayout
        eyebrow="ABOUT"
        title="회사소개"
        lead="파이브 마사지는 수원·동탄·오산·용인·분당 일부 운영지역에서 전화예약 기반의 방문 마사지를 안내하는 서비스입니다. 누가, 어떻게, 왜 운영하는지 투명하게 밝히고, 정확한 안내를 가장 중요한 원칙으로 삼습니다."
        path={PATH}
        description={DESC}
        crumbs={[{ name: "회사소개", path: PATH }]}
        toc={[
          { id: "who", label: "운영 주체" },
          { id: "how", label: "운영 방식" },
          { id: "why", label: "운영 이유" },
          { id: "policy", label: "콘텐츠 기준" },
          { id: "privacy", label: "예약 정보 취급" },
          { id: "info", label: "사업자 정보" },
        ]}
      >
        <h2 id="who">누가 운영하나요</h2>
        <p>
          파이브 마사지는 <strong>{SITE.company}</strong>가 운영하는 방문 마사지
          예약 안내 서비스입니다. 대표는 {SITE.ceo}이며, 사업자등록번호
          {" "}
          {SITE.bizNo}로 등록된 사업자입니다. 본 사이트의 모든 안내 콘텐츠는
          파이브 마사지 운영팀이 직접 작성하고 점검합니다. 운영 주체와 연락처를
          명확히 공개하는 것은 방문형 서비스를 안심하고 이용하실 수 있도록 하기
          위한 기본이라고 생각합니다.
        </p>

        <h2 id="how">어떻게 운영하나요</h2>
        <p>
          모든 예약은 전화 상담으로 진행합니다. 방문형 서비스는 위치와 시간에
          따라 실제 가능 여부가 달라지기 때문에, 전화로 조건을 함께 확인하는
          방식이 가장 정확합니다. 운영지역은 수원, 동탄, 오산, 용인, 분당 일부
          권역으로 한정하며, 이동 시간을 현실적으로 관리해 예약하신 시간을 지키는
          것을 우선합니다.
        </p>
        <ul>
          <li>전화예약을 통한 사전 상담으로 가능 여부를 확인합니다.</li>
          <li>운영 가능한 지역만 안내하고, 무리한 전 지역 약속을 하지 않습니다.</li>
          <li>선호 강도와 부위를 반영해 프로그램을 안내합니다.</li>
        </ul>

        <h2 id="why">왜 이렇게 운영하나요</h2>
        <p>
          방문형 서비스에서 가장 큰 불편은 ‘된다고 했는데 실제로는 안 되는’
          상황입니다. 파이브 마사지는 과장된 약속 대신 실제 가능한 범위를 정확히
          안내하는 편이 결과적으로 신뢰를 만든다고 봅니다. 그래서 운영지역을
          한정하고, 예약 단계에서 조건을 꼼꼼히 확인하며, 가능 여부를 솔직하게
          안내합니다.
        </p>
        <p>
          운영지역을 넓게 표시하면 검색에는 유리해 보일 수 있습니다. 하지만 실제로
          방문이 어려운 지역까지 ‘가능’이라고 안내하면, 결국 예약하신 분의 시간을
          허비하게 만듭니다. 저희는 그 방식이 단기적인 노출보다 더 큰 손해라고
          판단했습니다. 그래서 가능한 지역을 분명히 하고, 그 안에서 약속한 시간을
          지키는 데 집중합니다. 이것이 방문형 서비스에서 신뢰를 쌓는 가장 확실한
          방법이라고 생각합니다.
        </p>

        <h2 id="policy">콘텐츠 작성 기준</h2>
        <p>
          본 사이트의 지역 안내와 이용 안내는 실제 운영 기준과 자주 받는 문의를
          바탕으로 작성합니다. 검색 노출만을 위해 같은 문장을 지역명만 바꿔
          반복하거나, 근거 없는 효과를 주장하는 표현은 사용하지 않습니다. 정보가
          바뀌면 콘텐츠도 함께 갱신하며, 최종 점검일을 각 페이지에 표기합니다.
        </p>
        <ul>
          <li>의료·치료 효과를 보장하는 표현을 쓰지 않습니다.</li>
          <li>지역명만 바꾼 복제형 글을 양산하지 않습니다.</li>
          <li>실제 운영 가능 범위와 안내 내용을 일치시킵니다.</li>
        </ul>

        <h2 id="privacy">예약 정보는 이렇게 다룹니다</h2>
        <p>
          예약 과정에서 받는 주소, 연락처, 희망 시간 같은 정보는 예약 안내와
          방문 진행이라는 목적에만 사용합니다. 방문형 서비스 특성상 정확한 위치와
          연락처가 필요하지만, 이는 약속된 일정을 지키기 위한 범위 안에서만
          활용합니다. 불필요하게 정보를 요구하거나, 안내와 무관한 용도로
          사용하지 않는 것을 원칙으로 합니다.
        </p>
        <p>
          문의는 전화로 받는 것을 기본으로 합니다. 통화가 어려운 시간에 연락을
          주셨다면, 확인 후 가능한 시간에 안내해 드립니다. 예약과 관련해 바뀌는
          내용이 있으면 빠르게 공유해 주시는 것이 서로에게 가장 정확한 방법입니다.
        </p>

        <h2 id="info">사업자 정보 및 연락처</h2>
        <div className="mt-2 grid gap-x-8 gap-y-3 rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:grid-cols-2">
          {INFO.map(([k, v]) => (
            <div key={k} className="flex gap-3 text-sm">
              <span className="w-32 shrink-0 text-ivory/45">{k}</span>
              <span className="text-ivory/90">{v}</span>
            </div>
          ))}
        </div>
        <p className="callout">
          파이브 마사지는 휴식과 컨디션 관리를 위한 건전한 방문 케어 안내
          서비스이며, 의료행위나 치료 목적의 서비스가 아닙니다. 예약 가능 여부는
          전화예약 {SITE.phoneDisplay}로 확인해 주세요.
        </p>
      </ArticleLayout>
    </>
  );
}
