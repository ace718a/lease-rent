const reasons = [
  {
    icon: "ri-shield-check-line",
    title: "검증된 파트너만 매칭",
    desc: "이사·렌트·인터넷·정수기 — 자체 심사를 통과한 업체만 모아픽에 연결됩니다.",
    tone: "primary" as const,
  },
  {
    icon: "ri-price-tag-3-line",
    title: "최저가 비교, 추가 비용 0원",
    desc: "여러 곳을 따로 알아볼 필요 없이 한 페이지에서 최저가 견적을 받아보세요.",
    tone: "accent" as const,
  },
  {
    icon: "ri-customer-service-2-line",
    title: "1:1 전문 상담사 배정",
    desc: "신청 즉시 담당 상담사가 배정되어 가장 합리적인 조건을 직접 안내해드립니다.",
    tone: "secondary" as const,
  },
  {
    icon: "ri-gift-2-line",
    title: "모아픽 전용 사은품",
    desc: "통신·정수기·이사 신청 시 현금/상품권 등 모아픽 전용 사은품 혜택을 제공합니다.",
    tone: "primary" as const,
  },
];
const stats = [
  { value: "37,000+", label: "누적 매칭 건수" },
  { value: "4.9", label: "평균 만족도 (5점 만점)" },
  { value: "10분", label: "평균 견적 도착 시간" },
  { value: "200+", label: "검증 파트너사" },
];
const partners = [
  "현대캐피탈",
  "KB캐피탈",
  "코웨이",
  "청호나이스",
  "SK매직",
  "KT",
  "SK브로드밴드",
  "LG U+",
  "옐로우캡",
  "통일이사",
  "한진이사",
  "포스트이사",
];
export default function WhyMoapick() {
  return (
    <section className="py-16 md:py-24 bg-background-50">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full bg-secondary-100 text-secondary-900 px-3 py-1.5 text-xs md:text-sm font-bold whitespace-nowrap">
              <i className="ri-medal-2-fill text-secondary-700" />
              왜 모아픽인가요?
            </span>
            <h2 className="mt-4 font-heading text-3xl md:text-5xl font-extrabold leading-tight text-foreground-950">
              조건은 가장 좋게,
              <br />
              과정은 가장 간단하게.
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-foreground-700 text-sm md:text-base leading-relaxed">
              모아픽은 단순한 비교 사이트가 아닙니다. 직접 검증한 파트너만 연결하고, 신청부터 사후관리까지 책임집니다.
            </p>
          </div>
        </div>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {reasons.map((r) => {
            const bg =
              r.tone === "primary"
                ? "bg-primary-100 text-primary-700"
                : r.tone === "accent"
                ? "bg-accent-100 text-accent-800"
                : "bg-secondary-100 text-secondary-800";
            return (
              <div
                key={r.title}
                className="rounded-xl bg-background-50 border border-background-200/80 p-5 md:p-6 hover:border-primary-300 transition-colors"
              >
                <span className={`w-11 h-11 flex items-center justify-center rounded-md ${bg}`}>
                  <i className={`${r.icon} text-xl`} />
                </span>
                <h3 className="mt-4 font-heading font-bold text-foreground-950 text-base md:text-lg">
                  {r.title}
                </h3>
                <p className="mt-2 text-sm text-foreground-700 leading-relaxed">{r.desc}</p>
              </div>
            );
          })}
        </div>
        <div className="mt-12 rounded-2xl bg-foreground-950 text-background-50 p-8 md:p-10">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-heading text-3xl md:text-5xl font-extrabold text-accent-400">
                  {s.value}
                </p>
                <p className="mt-2 text-sm text-background-200">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-12">
          <p className="text-center text-xs md:text-sm font-semibold text-foreground-500 tracking-widest uppercase">
            함께하는 파트너
          </p>
          <div className="mt-5 overflow-hidden">
            <div className="mp-marquee-track flex gap-10 whitespace-nowrap">
              {[...partners, ...partners].map((p, i) => (
                <span
                  key={`${p}-${i}`}
                  className="text-foreground-500 font-heading font-bold text-lg md:text-xl tracking-tight"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
