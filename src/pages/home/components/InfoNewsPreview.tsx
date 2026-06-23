type Card = {
  category: string;
  title: string;
  excerpt: string;
  meta: string;
  href: string;
  image: string;
  tone: "primary" | "accent" | "secondary";
};
const tips: Card[] = [
  {
    category: "생활꿀팁",
    title: "이사 한 달 전부터 챙겨야 할 체크리스트 12가지",
    excerpt: "예약·짐 정리·주소이전까지, 빠뜨리기 쉬운 순서를 한 장으로 정리했습니다.",
    meta: "2025.04.18 · 5분 분량",
    href: "https://moapick.co.kr/info",
    image: "https://readdy.ai/api/search-image?width=900&height=600&seq=moapick-tip-checklist-01&orientation=landscape&query=Cozy%20bright%20Korean%20living%20room%20with%20a%20person%20holding%20a%20clipboard%20checklist%20while%20stacking%20moving%20boxes%20warm%20cream%20wall%20background%20natural%20daylight%20editorial%20lifestyle%20photography%20soft%20shadows%20clean%20minimal%20coral%20golden%20accents",
    tone: "primary",
  },
  {
    category: "생활꿀팁",
    title: "장기렌트 vs 리스 vs 할부, 한눈에 비교하기",
    excerpt: "월 납입금만 보고 결정하면 손해입니다. 회계·세무 측면까지 정리해드려요.",
    meta: "2025.04.10 · 7분 분량",
    href: "https://moapick.co.kr/info",
    image: "https://readdy.ai/api/search-image?width=900&height=600&seq=moapick-tip-rent-compare-02&orientation=landscape&query=Stylish%20warm%20home%20office%20desk%20with%20a%20notebook%20small%20car%20toy%20a%20calculator%20and%20coffee%20mug%20on%20a%20wooden%20surface%20cream%20wall%20background%20warm%20daylight%20editorial%20product%20photography%20clean%20minimal%20composition%20coral%20golden%20accents",
    tone: "accent",
  },
  {
    category: "생활꿀팁",
    title: "인터넷·IPTV 결합, 진짜 아끼는 조합은 따로 있다",
    excerpt: "통신 3사 결합 조건을 가족 구성과 시청 습관별로 매칭하는 방법.",
    meta: "2025.04.03 · 4분 분량",
    href: "https://moapick.co.kr/info",
    image: "https://readdy.ai/api/search-image?width=900&height=600&seq=moapick-tip-iptv-03&orientation=landscape&query=Modern%20cozy%20Korean%20family%20living%20room%20with%20a%20large%20wall%20mounted%20smart%20TV%20a%20stylish%20wifi%20router%20a%20warm%20beige%20sofa%20and%20warm%20daylight%20editorial%20interior%20photography%20clean%20minimal%20composition%20cream%20coral%20golden%20accents",
    tone: "secondary",
  },
];
const news: Card[] = [
  {
    category: "뉴스",
    title: "2025년 이사 성수기, 평균 견적 7.2% 상승…미리 예약이 답",
    excerpt: "한국이사협회 분기 리포트 분석 — 4·5월 예약은 3월 안에 마무리하는 것이 유리합니다.",
    meta: "2025.04.21 · 모아픽 뉴스룸",
    href: "https://moapick.co.kr/news",
    image: "https://readdy.ai/api/search-image?width=900&height=600&seq=moapick-news-moving-spring-04&orientation=landscape&query=Editorial%20documentary%20photo%20of%20cardboard%20moving%20boxes%20stacked%20in%20a%20bright%20Korean%20apartment%20entrance%20with%20a%20small%20cherry%20blossom%20visible%20through%20the%20window%20warm%20cream%20background%20natural%20daylight%20soft%20shadows%20clean%20minimal%20composition",
    tone: "primary",
  },
  {
    category: "뉴스",
    title: "전기차 장기렌트 수요 급증, 보조금 정책은 어떻게 달라지나",
    excerpt: "2025 환경부 전기차 보조금 개편안을 장기렌트 관점에서 정리했습니다.",
    meta: "2025.04.15 · 모아픽 뉴스룸",
    href: "https://moapick.co.kr/news",
    image: "https://readdy.ai/api/search-image?width=900&height=600&seq=moapick-news-ev-rent-05&orientation=landscape&query=Modern%20electric%20car%20parked%20at%20a%20clean%20minimalist%20charging%20station%20with%20warm%20golden%20sunset%20light%20cream%20concrete%20background%20editorial%20automotive%20photography%20no%20brand%20logo%20visible%20clean%20composition%20coral%20golden%20accents",
    tone: "accent",
  },
  {
    category: "뉴스",
    title: "정수기 위생 등급제 도입 논의, 소비자에게 미치는 영향",
    excerpt: "방문관리 주기와 필터 교체 기준이 어떻게 달라질지 핵심만 정리합니다.",
    meta: "2025.04.07 · 모아픽 뉴스룸",
    href: "https://moapick.co.kr/news",
    image: "https://readdy.ai/api/search-image?width=900&height=600&seq=moapick-news-water-grade-06&orientation=landscape&query=Modern%20stylish%20countertop%20water%20purifier%20with%20a%20transparent%20glass%20of%20water%20on%20a%20clean%20kitchen%20counter%20cream%20wall%20background%20warm%20daylight%20editorial%20product%20photography%20clean%20minimal%20composition%20soft%20shadows%20coral%20accents",
    tone: "secondary",
  },
];
function CardItem({ card }: { card: Card }) {
  const badge =
    card.tone === "primary"
      ? "bg-primary-100 text-primary-700"
      : card.tone === "accent"
        ? "bg-accent-100 text-accent-800"
        : "bg-secondary-100 text-secondary-800";
  return (
    <a
      href={card.href}
      target="_blank"
      rel="noopener"
      className="group rounded-xl overflow-hidden bg-background-50 border border-background-200/80 hover:border-primary-300 transition-colors cursor-pointer flex flex-col"
    >
      <div className="w-full h-44 md:h-48 overflow-hidden">
        <img
          src={card.image}
          alt={card.title}
          title={card.title}
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <span className={"self-start inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold whitespace-nowrap " + badge}>
          {card.category}
        </span>
        <h4 className="mt-3 font-heading font-bold text-foreground-950 text-base md:text-lg leading-snug">
          <a href={card.href} target="_blank" rel="noopener nofollow" className="hover:text-primary-600 transition-colors">
            {card.title}
          </a>
        </h4>
        <p className="mt-2 text-sm text-foreground-600 leading-relaxed flex-1">{card.excerpt}</p>
        <p className="mt-4 text-xs text-foreground-500 whitespace-nowrap">{card.meta}</p>
      </div>
    </a>
  );
}
function Block({
  id,
  badge,
  title,
  desc,
  viewMore,
  cards,
}: {
  id: string;
  badge: string;
  title: string;
  desc: string;
  viewMore: { label: string; href: string };
  cards: Card[];
}) {
  return (
    <div id={id} className="scroll-mt-24">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-accent-100 text-accent-900 px-3 py-1.5 text-xs md:text-sm font-bold whitespace-nowrap">
            <i className="ri-magic-line text-accent-700" />
            {badge}
          </span>
          <h3 className="mt-3 font-heading text-2xl md:text-4xl font-extrabold text-foreground-950 leading-tight">
            {title}
          </h3>
          <p className="mt-2 text-foreground-700 text-sm md:text-base">{desc}</p>
        </div>
        <a
          href={viewMore.href}
          target="_blank"
          rel="noopener"
          className="inline-flex items-center justify-center gap-1.5 rounded-md bg-background-50 hover:bg-background-100 text-foreground-900 border border-background-300/80 px-4 py-2.5 text-sm font-semibold whitespace-nowrap cursor-pointer transition-colors"
        >
          {viewMore.label}
          <i className="ri-arrow-right-line" />
        </a>
      </div>
      <div className="mt-6 grid md:grid-cols-3 gap-5">
        {cards.map((c) => (
          <CardItem key={c.title} card={c} />
        ))}
      </div>
    </div>
  );
}
export default function InfoNewsPreview() {
  return (
    <section className="py-16 md:py-24 bg-background-50">
      <div className="mx-auto max-w-7xl px-4 md:px-8 grid gap-16 md:gap-20">
        <Block
          id="info"
          badge="모아픽 생활꿀팁"
          title="알면 진짜 아끼는 생활정보"
          desc="이사·자동차·통신·건강까지 — 매주 새 글이 올라옵니다."
          viewMore={{ label: "전체 글 보기", href: "https://moapick.co.kr/info" }}
          cards={tips}
        />
        <Block
          id="news"
          badge="모아픽 뉴스룸"
          title="요즘 생활 이슈, 모아픽이 정리합니다"
          desc="이사·렌트·통신·정수기 관련 정책과 트렌드를 한곳에서."
          viewMore={{ label: "전체 뉴스 보기", href: "https://moapick.co.kr/news" }}
          cards={news}
        />
      </div>
    </section>
  );
}
