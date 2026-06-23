type Service = {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  bullets: string[];
  cta: { label: string; href: string };
  guide: { label: string; href: string };
  image: string;
  alt: string;
  layout: "left" | "right";
};
const services: Service[] = [
  {
    id: "moving",
    tag: "포장이사",
    title: "이삿짐 걱정 없이,\n포장부터 정리까지 한 번에",
    subtitle:
      "검증된 포장이사 업체만 매칭하여 파손 걱정 없는 안심 이사를 도와드립니다. 평균 10분 안에 3곳에서 견적이 도착합니다.",
    bullets: [
      "전국 200+ 검증 업체 즉시 비교",
      "최대 1,000만원 파손 보상 가입 업체만 매칭",
      "사다리·에어컨 이전·청소까지 옵션 한 번에",
    ],
    cta: { label: "포장이사 무료 견적", href: "https://moapick.co.kr/24" },
    guide: { label: "포장이사 가이드 보기", href: "https://moapick.co.kr/24-guide" },
    image:
      "https://readdy.ai/api/search-image?width=1200&height=900&seq=moapick-service-moving-01&orientation=landscape&query=Professional Korean movers in clean uniform wrapping furniture in a bright modern apartment living room with cardboard boxes stacked neatly warm natural sunlight coming through large windows cream warm tones editorial photography soft shadows clean minimal composition",
    alt: "포장이사 안심 매칭",
    layout: "right",
  },
  {
    id: "rent",
    tag: "장기렌트카",
    title: "내 차처럼,\n부담은 절반인 장기렌트",
    subtitle:
      "신차 출고부터 보험·정비까지 모두 포함된 장기렌트. 차종·옵션·계약기간별 월 납입금을 한 화면에서 비교하세요.",
    bullets: [
      "국산·수입 전 차종 실시간 견적 비교",
      "보험·정비·세금까지 월 납입금 한 번에 포함",
      "신용/직장 조건별 무료 사전 심사",
    ],
    cta: { label: "장기렌트 무료 견적", href: "https://moapick.co.kr/rent" },
    guide: { label: "장기렌트 가이드 보기", href: "https://moapick.co.kr/rent-guide" },
    image:
      "https://readdy.ai/api/search-image?width=1200&height=900&seq=moapick-service-rent-01&orientation=landscape&query=Modern glossy white sedan car parked in a bright minimal showroom with warm cream walls and soft golden daylight editorial automotive photography clean composition warm tones no brand logo visible premium product shot soft shadows realistic",
    alt: "장기렌트카 비교",
    layout: "left",
  },
  {
    id: "internet",
    tag: "인터넷가입",
    title: "통신 3사 비교부터\n최대 사은품까지",
    subtitle:
      "KT·SK·LG U+ 인터넷·TV·모바일 결합 상품을 한눈에 비교하고, 모아픽 전용 현금 사은품 혜택을 챙기세요.",
    bullets: [
      "기가 인터넷 + IPTV 결합 최저가 비교",
      "신규/이전/번호이동 모두 최대 사은품 적용",
      "전문 상담사 1:1 맞춤 컨설팅",
    ],
    cta: { label: "인터넷 가입 상담받기", href: "#internet" },
    guide: { label: "인터넷 가입 가이드", href: "#internet" },
    image:
      "https://readdy.ai/api/search-image?width=1200&height=900&seq=moapick-service-internet-01&orientation=landscape&query=Cozy home office desk with a stylish wifi router a laptop and a small IPTV remote on a warm wooden surface cream wall background warm sunlight editorial product photography minimal clean composition soft shadows coral accents",
    alt: "인터넷 가입 비교",
    layout: "right",
  },
  {
    id: "water",
    tag: "정수기렌탈",
    title: "매일 마시는 물,\n월 렌탈로 똑똑하게",
    subtitle:
      "코웨이·청호·SK매직 등 주요 브랜드 정수기 렌탈 조건을 한 페이지에서 비교하고, 관리 서비스까지 동시에 신청하세요.",
    bullets: [
      "주요 브랜드 정수기 월 렌탈료 한 번에 비교",
      "신규 가입 시 첫 달 무료 + 사은품 제공",
      "정기 방문관리·필터교체 자동 예약",
    ],
    cta: { label: "정수기 렌탈 상담받기", href: "#water" },
    guide: { label: "정수기 비교 가이드", href: "#water" },
    image:
      "https://readdy.ai/api/search-image?width=1200&height=900&seq=moapick-service-water-01&orientation=landscape&query=Sleek modern countertop water purifier on a clean bright kitchen counter with a glass of fresh water cream warm kitchen background soft natural daylight editorial product photography minimal clean composition warm tones coral golden accents",
    alt: "정수기 렌탈 비교",
    layout: "left",
  },
];
function ServiceBlock({ s }: { s: Service }) {
  const isLeft = s.layout === "left";
  const isExternal = (href: string) => href.startsWith("http");
  return (
    <article
      id={s.id}
      className="scroll-mt-24 grid lg:grid-cols-12 gap-8 lg:gap-12 items-center"
    >
      <div className={`lg:col-span-6 ${isLeft ? "lg:order-1" : "lg:order-2"}`}>
        <div className="relative rounded-2xl overflow-hidden border border-background-200/80">
          <img
            src={s.image}
            alt={s.alt}
            className="w-full h-[300px] md:h-[420px] object-cover object-top"
          />
        </div>
      </div>
      <div className={`lg:col-span-6 ${isLeft ? "lg:order-2" : "lg:order-1"}`}>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-100 text-primary-700 px-3 py-1 text-xs font-bold whitespace-nowrap">
          <i className="ri-checkbox-blank-circle-fill text-[8px]" />
          {s.tag}
        </span>
        <h3 className="mt-3 font-heading text-2xl md:text-4xl font-extrabold leading-[1.2] text-foreground-950 whitespace-pre-line">
          {s.title}
        </h3>
        <p className="mt-4 text-foreground-700 leading-relaxed text-sm md:text-base">
          {s.subtitle}
        </p>
        <ul className="mt-5 space-y-2.5">
          {s.bullets.map((b) => (
            <li key={b} className="flex items-start gap-2.5 text-sm md:text-base text-foreground-800">
              <span className="mt-0.5 w-5 h-5 flex items-center justify-center rounded-full bg-accent-100 text-accent-800">
                <i className="ri-check-line text-xs" />
              </span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <a
            href={s.cta.href}
            target={isExternal(s.cta.href) ? "_blank" : undefined}
            rel={isExternal(s.cta.href) ? "noopener" : undefined}
            className="inline-flex items-center justify-center gap-1.5 rounded-md bg-primary-500 hover:bg-primary-600 text-background-50 px-5 py-3 text-sm md:text-base font-semibold whitespace-nowrap cursor-pointer transition-colors"
          >
            {s.cta.label}
            <i className="ri-arrow-right-line" />
          </a>
          <a
            href={s.guide.href}
            target={isExternal(s.guide.href) ? "_blank" : undefined}
            rel={isExternal(s.guide.href) ? "noopener nofollow" : undefined}
            className="inline-flex items-center justify-center gap-1.5 rounded-md bg-background-50 hover:bg-background-100 text-foreground-900 border border-background-300/80 px-5 py-3 text-sm md:text-base font-semibold whitespace-nowrap cursor-pointer transition-colors"
          >
            {s.guide.label}
            <i className="ri-book-open-line" />
          </a>
        </div>
      </div>
    </article>
  );
}
export default function ServicesShowcase() {
  return (
    <section className="bg-background-100/60 py-16 md:py-24 border-y border-background-200">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 rounded-full bg-accent-100 text-accent-900 px-3 py-1.5 text-xs md:text-sm font-bold whitespace-nowrap">
            <i className="ri-shining-2-fill text-accent-700" />
            모아픽 핵심 서비스 4가지
          </span>
          <h2 className="mt-4 font-heading text-3xl md:text-5xl font-extrabold leading-tight text-foreground-950">
            한 번 가입으로 끝나는
            <br />
            <span className="text-primary-500">생활 필수 서비스</span>
          </h2>
          <p className="mt-4 text-foreground-700 text-sm md:text-base">
            이사·차·인터넷·정수기까지 — 따로 알아보지 마세요. 모아픽이 한 번에 정리해드립니다.
          </p>
        </div>
        <div className="mt-14 md:mt-20 grid gap-20 md:gap-28">
          {services.map((s) => (
            <ServiceBlock key={s.id} s={s} />
          ))}
        </div>
      </div>
    </section>
  );
}
