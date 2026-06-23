const serviceLinks = [
  {
    id: "moving",
    title: "포장이사",
    desc: "검증 업체 3곳 견적 비교\n최대 1,000만원 파손 보상",
    href: "https://moapick.co.kr/24",
    external: true,
    icon: "ri-truck-line",
    gradient: "from-primary-500 to-primary-600",
  },
  {
    id: "rent",
    title: "장기렌트카",
    desc: "전 차종 월 납입금 비교\n보험·정비·세금 포함",
    href: "https://moapick.co.kr/rent",
    external: true,
    icon: "ri-roadster-line",
    gradient: "from-accent-500 to-accent-600",
  },
  {
    id: "internet",
    title: "인터넷가입",
    desc: "통신 3사 최저가 비교\n최대 현금 사은품 안내",
    href: "#internet",
    external: false,
    icon: "ri-wifi-line",
    gradient: "from-secondary-500 to-secondary-600",
  },
  {
    id: "water",
    title: "정수기렌탈",
    desc: "주요 브랜드 월 렌탈 비교\n첫 달 무료 + 사은품 제공",
    href: "#water",
    external: false,
    icon: "ri-drop-line",
    gradient: "from-foreground-500 to-foreground-600",
  },
];
export default function ServiceCTA() {
  return (
    <section id="service-cta" className="scroll-mt-24 py-16 md:py-24 bg-background-100/60 border-y border-background-200">
      <div className="mx-auto max-w-7xl px-4 md:px-8 grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5">
          <span className="inline-flex items-center gap-2 rounded-full bg-accent-100 text-accent-900 px-3 py-1.5 text-xs md:text-sm font-bold whitespace-nowrap">
            <i className="ri-flashlight-fill" />
            빠른 상담 신청
          </span>
          <h2 className="mt-4 font-heading text-3xl md:text-5xl font-extrabold leading-tight text-foreground-950">
            원하는 서비스를
            <br />
            선택하시면
            <br />
            <span className="text-primary-500">10분 안에</span> 연락드려요.
          </h2>
          <p className="mt-4 text-foreground-700 text-sm md:text-base leading-relaxed">
            각 서비스마다 전담 상담사가 배정되어 가장 좋은 조건으로 안내해드립니다. 관심 있는 서비스를 골라주세요.
          </p>
          <div className="mt-8 space-y-4">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 w-9 h-9 flex items-center justify-center rounded-md bg-accent-100 text-accent-800">
                <i className="ri-shield-user-line text-lg" />
              </span>
              <div>
                <p className="font-semibold text-foreground-950">개인정보는 안전하게 보호됩니다</p>
                <p className="text-sm text-foreground-600">
                  상담 목적 외 사용되지 않으며, 동의 없이 제3자에게 제공되지 않습니다.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="mt-0.5 w-9 h-9 flex items-center justify-center rounded-md bg-secondary-100 text-secondary-800">
                <i className="ri-time-line text-lg" />
              </span>
              <div>
                <p className="font-semibold text-foreground-950">상담시간 안내</p>
                <p className="text-sm text-foreground-600">평일 09:00 – 20:00 / 주말·공휴일 10:00 – 18:00</p>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:col-span-7">
          <div className="grid sm:grid-cols-2 gap-4">
            {serviceLinks.map((s) => (
              <a
                key={s.id}
                href={s.href}
                target={s.external ? "_blank" : undefined}
                rel={s.external ? "noopener" : undefined}
                className="group relative rounded-2xl bg-background-50 border border-background-200/80 hover:border-primary-300 p-6 md:p-7 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
              >
                <div className="flex items-center justify-between mb-5">
                  <span
                    className={`w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br ${s.gradient} text-background-50 shadow-sm`}
                  >
                    <i className={`${s.icon} text-xl`} />
                  </span>
                  <span className="w-8 h-8 flex items-center justify-center rounded-full bg-background-100 group-hover:bg-primary-100 text-foreground-500 group-hover:text-primary-600 transition-colors">
                    <i className={s.external ? "ri-arrow-right-up-line" : "ri-arrow-down-line"} />
                  </span>
                </div>
                <h3 className="font-heading text-lg md:text-xl font-bold text-foreground-950">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm text-foreground-600 whitespace-pre-line leading-relaxed">
                  {s.desc}
                </p>
                <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-primary-600 group-hover:text-primary-700 transition-colors">
                  <span className="whitespace-nowrap">무료 견적 신청하기</span>
                  <i className="ri-arrow-right-line transition-transform group-hover:translate-x-0.5" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
