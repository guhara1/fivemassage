// 파이브 마사지 사이트 공통 데이터

export const SITE = {
  name: "파이브 마사지",
  company: "YH LAB",
  ceo: "김유환",
  bizNo: "815-26-00585",
  address: "경기도 파주시 청석로 268",
  phoneDisplay: "0508-202-4717",
  phoneTel: "tel:05082024717",
  // 운영 도메인
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://5massage.xyz",
  areasShort: "수원·동탄·오산·용인·분당",
  // 콘텐츠 최종 점검일 (구조화 데이터 dateModified / 바이라인 표기용)
  updated: "2026-06-02",
};

// 권역별 지역. 모든 지역이 자체 상세 페이지(slug)를 가진다.
export type Region = {
  name: string;
  slug: string;
};

export type RegionGroup = {
  key: string;
  title: string;
  regions: Region[];
};

export const REGION_GROUPS: RegionGroup[] = [
  {
    key: "suwon",
    title: "수원권",
    regions: [
      { name: "수원", slug: "suwon" },
      { name: "영통", slug: "yeongtong" },
      { name: "수원역", slug: "suwon-station" },
      { name: "인계동", slug: "ingye-dong" },
      { name: "구운동", slug: "guun-dong" },
    ],
  },
  {
    key: "dongtan-osan",
    title: "동탄·오산권",
    regions: [
      { name: "동탄", slug: "dongtan" },
      { name: "오산", slug: "osan" },
      { name: "궐동", slug: "gwol-dong" },
    ],
  },
  {
    key: "yongin",
    title: "용인권",
    regions: [
      { name: "용인", slug: "yongin" },
      { name: "처인구", slug: "cheoin-gu" },
      { name: "수지", slug: "suji" },
      { name: "포곡", slug: "pogok" },
      { name: "신갈", slug: "singal" },
      { name: "기흥", slug: "giheung" },
      { name: "동백", slug: "dongbaek" },
    ],
  },
  {
    key: "bundang",
    title: "분당권",
    regions: [
      { name: "분당", slug: "bundang" },
      { name: "미금역", slug: "migeum-station" },
      { name: "수내역", slug: "sunae-station" },
      { name: "정자역", slug: "jeongja-station" },
      { name: "서현역", slug: "seohyeon-station" },
    ],
  },
];

// 메뉴/카드에서 지역 링크 목적지 계산
export function regionHref(region: Region): string {
  return `/areas/${region.slug}`;
}

// ---- 프로그램 / 가격 ----
export type Program = {
  slug: string;
  name: string;
  category: string; // 예: "DRY · 건식"
  desc: string;
  prices: { duration: string; price: number }[];
  best?: boolean;
};

export const PROGRAMS: Program[] = [
  {
    slug: "thai-dry",
    name: "타이 건식",
    category: "DRY · 건식",
    desc: "옷 위에서 진행되는 건식 케어. 깊은 압과 관절 가동 범위 중심의 관리로 일상 속 긴장을 완화하는 기본 프로그램.",
    prices: [
      { duration: "60분", price: 80000 },
      { duration: "90분", price: 100000 },
      { duration: "120분", price: 120000 },
    ],
  },
  {
    slug: "aroma-oil",
    name: "아로마 오일",
    category: "WET · 오일",
    desc: "아로마 오일을 활용한 부드러운 케어. 편안한 휴식감과 촉촉한 오일 케어를 원하는 고객에게 적합한 프로그램.",
    prices: [
      { duration: "60분", price: 90000 },
      { duration: "90분", price: 110000 },
      { duration: "120분", price: 130000 },
    ],
  },
  {
    slug: "signature-oil",
    name: "시그니처 오일",
    category: "SIGNATURE · 오일",
    desc: "파이브 마사지의 대표 오일 케어. 강도보다 흐름과 안정감에 집중한 프리미엄 휴식 프로그램.",
    prices: [
      { duration: "60분", price: 100000 },
      { duration: "90분", price: 120000 },
      { duration: "120분", price: 140000 },
    ],
  },
  {
    slug: "vvip-fullbody",
    name: "VVIP 전신케어",
    category: "VVIP · 풀바디",
    desc: "건식과 오일 케어가 함께 구성된 프리미엄 전신 프로그램. 발끝부터 두피까지 여유롭게 관리받고 싶은 고객에게 적합.",
    best: true,
    prices: [
      { duration: "60분", price: 110000 },
      { duration: "90분", price: 130000 },
      { duration: "120분", price: 150000 },
      { duration: "150분", price: 180000 },
    ],
  },
  {
    slug: "korean-swedish",
    name: "한국인 스웨디시",
    category: "KOREAN · 관리사 지정",
    desc: "한국인 관리사 지정 프로그램. 섬세한 강도 조절과 편안한 의사소통을 중요하게 생각하는 고객에게 적합.",
    prices: [
      { duration: "60분", price: 150000 },
      { duration: "90분", price: 190000 },
    ],
  },
  {
    slug: "men-swedish",
    name: "남성 스웨디시",
    category: "MEN · 남성 전용",
    desc: "남성 고객을 위한 전용 프로그램. 예약 전 컨디션과 선호 강도를 확인한 뒤 편안한 이용을 돕는 프로그램.",
    prices: [
      { duration: "60분", price: 100000 },
      { duration: "90분", price: 130000 },
      { duration: "120분", price: 160000 },
    ],
  },
];

// 메인페이지 미리보기용 대표 프로그램
export const FEATURED_PROGRAM_SLUGS = ["thai-dry", "aroma-oil", "vvip-fullbody"];

export function formatKRW(n: number): string {
  return n.toLocaleString("ko-KR") + "원";
}

// ---- 예약 전 확인사항 ----
export const PRE_BOOKING_NOTES = [
  "위 금액은 프로그램과 이용 시간 기준 안내 금액입니다.",
  "지역별 이동 가능 여부와 예약 가능 시간은 전화예약 시 확인해 주세요.",
  "운영지역은 수원, 동탄, 오산, 용인, 분당 일부 권역으로 한정됩니다.",
  "불건전한 목적의 문의는 받지 않습니다.",
  "의료행위나 치료 목적의 서비스가 아니며, 휴식과 컨디션 관리를 위한 방문 케어 안내입니다.",
];

// ---- 이용 절차 ----
export const PROCESS_STEPS = [
  { title: "전화 문의", desc: "0508-202-4717로 예약 가능 여부를 문의합니다." },
  { title: "지역 확인", desc: "방문 가능 지역과 이동 시간을 확인합니다." },
  { title: "프로그램 선택", desc: "컨디션과 목적에 맞는 프로그램을 선택합니다." },
  { title: "시간 확정", desc: "방문 가능한 예약 시간을 확정합니다." },
  { title: "방문 안내", desc: "확정된 일정에 맞춰 방문 안내를 진행합니다." },
];

// ---- 메인 FAQ ----
export const MAIN_FAQ = [
  {
    q: "출장마사지 예약은 어떻게 하나요?",
    a: "전화예약을 통해 지역, 시간, 프로그램을 확인한 뒤 예약을 진행합니다.",
  },
  {
    q: "현재 가능한 지역은 어디인가요?",
    a: "수원, 동탄, 오산, 용인, 분당 일부 운영지역을 중심으로 안내하고 있습니다.",
  },
  {
    q: "당일 예약도 가능한가요?",
    a: "당일 예약은 상황에 따라 달라질 수 있으므로 전화로 확인해 주세요.",
  },
  {
    q: "가격은 어디서 확인할 수 있나요?",
    a: "가격표 페이지에서 프로그램별 금액을 확인할 수 있습니다.",
  },
  {
    q: "방문 전 준비할 것이 있나요?",
    a: "정확한 주소, 출입 방식, 주차 여부, 희망 시간을 미리 확인해 주세요.",
  },
  {
    q: "어떤 목적의 서비스인가요?",
    a: "파이브 마사지는 휴식과 컨디션 관리를 위한 건전한 방문 마사지 예약 안내 서비스입니다.",
  },
];

// ---- 지역별 추천 이용 상황 (메인 노출용) ----
export const AREA_USE_CASES = [
  { group: "수원권", text: "서울 출퇴근, 오피스 근무, 주말 휴식" },
  { group: "동탄·오산권", text: "신도시 거주, 가족 단위, 퇴근 후 피로 관리" },
  { group: "용인권", text: "넓은 생활권, 주거지 중심, 주말 예약 문의" },
  { group: "분당권", text: "직장인, 역세권, 퇴근 후 컨디션 관리" },
];
