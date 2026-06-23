const quickServices = [
  {
    title: "포장이사",
    desc: "검증된 업체에서\n무료 최저가 견적",
    href: "https://moapick.co.kr/24",
    icon: "ri-truck-line",
    seq: "moapick-hero-card-moving-01",
  },
  {
    title: "장기렌트카",
    desc: "전 차종 비교\n월 납입금 한눈에",
    href: "https://moapick.co.kr/rent",
    icon: "ri-roadster-line",
    seq: "moapick-hero-card-rent-01",
  },
  {
    title: "인터넷가입",
    desc: "통신 3사 최대\n현금 사은품 안내",
    href: "#internet",
    icon: "ri-wifi-line",
    seq: "moapick-hero-card-internet-01",
  },
  {
    title: "정수기렌탈",
    desc: "월 렌탈료부터\n관리 서비스까지",
    href: "#water",
    icon: "ri-drop-line",
    seq: "moapick-hero-card-water-01",
  },
];
export default function Hero() {
  return (
    <section
      id="top"
      className="relative pt-28 md:pt-36 pb-16 md:pb-24 overflow-hidden bg-background-50"
    >
      <div
        aria-hidden
        className="absolute -top-32 -right-24 w-[480px] h-[480px] rounded-full bg-primary-100/70 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute -bottom-32 -left-32 w-[520px] h-[520px] rounded-full bg-accent-100/70 blur-3xl"
      />
      <div className="relative mx-auto max-w-7xl px-4 md:px-8 grid lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7 mp-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full bg-secondary-100 text-secondary-900 px-3 py-1.5 text-xs md:text-sm font-semibold whitespace-nowrap">
            <i className="ri-shield-check-fill text-secondary-700" />
            대한민국 생활 서비스 비교 플랫폼
          </span>
          <h1 className="mt-5 font-heading text-3xl md:text-5xl lg:text-6xl leading-[1.15] font-extrabold tracking-tight text-foreground-950">
            한 번에 모아서,
            <br />
            <span className="text-primary-500">가장 합리적으로</span>
            <br />
            골라 쓰는 생활.
          </h1>
          <p className="mt-5 text-base md:text-lg text-foreground-700 leading-relaxed max-w-xl">
            포장이사·장기렌트카·인터넷가입·정수기렌탈을 한 페이지에서 비교하고
            신청하세요. 검증된 파트너사와 함께, 모아픽이 가장 좋은 조건을 찾아드립니다.
          </p>
          <div className="mt-7 flex flex-col sm:flex-row gap-3">
            <a
              href="#service-cta"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-primary-500 hover:bg-primary-600 text-background-50 px-6 py-3.5 text-sm md:text-base font-semibold whitespace-nowrap cursor-pointer transition-colors"
            >
              <i className="ri-edit-2-line" />
              30초 무료 견적 받기
            </a>
            <a
              href="#services"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-background-50 hover:bg-background-100 text-foreground-900 border border-background-300/80 px-6 py-3.5 text-sm md:text-base font-semibold whitespace-nowrap cursor-pointer transition-colors"
            >
              서비스 둘러보기
              <i className="ri-arrow-right-line" />
            </a>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3 text-sm text-foreground-700">
            <div className="flex items-center gap-2 whitespace-nowrap">
              <i className="ri-star-fill text-accent-500" />
              <strong className="text-foreground-950">4.9</strong>/5 고객 평점
            </div>
            <div className="flex items-center gap-2 whitespace-nowrap">
              <i className="ri-user-smile-line text-primary-500" />
              누적 매칭 <strong className="text-foreground-950">37,000+</strong>건
            </div>
            <div className="flex items-center gap-2 whitespace-nowrap">
              <i className="ri-shield-keyhole-line text-secondary-600" />
              본사 검수 파트너만 매칭
            </div>
          </div>
        </div>
        <div className="lg:col-span-5">
          <div className="relative rounded-2xl overflow-hidden border border-background-200">
            <img
              src="https://readdy.ai/api/search-image?width=900&height=900&seq=moapick-hero-main-2026-01&orientation=squarish&query=Stylized editorial illustration of a cheerful Korean family moving into a new sunny apartment with cardboard boxes a small car a water purifier and a wifi router floating softly around them on a warm cream coral gold pastel background clean minimal composition soft natural light warm tones friendly mood high detail product editorial photography style"
              alt="모아픽 - 생활 서비스 한곳에"
              className="w-full h-[420px] m
