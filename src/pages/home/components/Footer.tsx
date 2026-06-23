const linkGroups = [
  {
    title: "포장이사",
    items: [
      { label: "포장이사 무료 견적", href: "https://moapick.co.kr/24" },
      { label: "포장이사 가이드", href: "https://moapick.co.kr/24-guide" },
    ],
  },
  {
    title: "장기렌트",
    items: [
      { label: "장기렌트 무료 견적", href: "https://moapick.co.kr/rent" },
      { label: "장기렌트 가이드", href: "https://moapick.co.kr/rent-guide" },
    ],
  },
  {
    title: "콘텐츠",
    items: [
      { label: "생활꿀팁", href: "https://moapick.co.kr/info" },
      { label: "모아픽 뉴스룸", href: "https://moapick.co.kr/news" },
    ],
  },
  {
    title: "고객지원",
    items: [
      { label: "자주 묻는 질문", href: "#faq" },
      { label: "무료 견적 신청", href: "#service-cta" },
    ],
  },
];
export default function Footer() {
  return (
    <footer className="bg-secondary-900 text-secondary-100">
      <div className="mx-auto max-w-7xl px-4 md:px-8 py-14 md:py-16 grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5">
          <a href="#top" className="flex items-center gap-2 cursor-pointer">
            <span className="w-9 h-9 rounded-md bg-primary-500 flex items-center justify-center text-background-50">
              <i className="ri-checkbox-circle-fill text-xl" />
            </span>
            <span className="font-heading text-xl font-bold text-background-50">
              MOAPICK<span className="text-primary-400">.</span>
            </span>
          </a>
          <p className="mt-4 text-sm leading-relaxed text-secondary-200 max-w-md">
            모아픽은 포장이사·장기렌트카·인터넷가입·정수기렌탈을 한 페이지에서 비교·신청할 수 있는 생활 서비스 허브입니다. 검증된 파트너만 매칭하여, 가장 합리적인 조건을 찾아드립니다.
          </p>
          <div className="mt-5 flex items-center gap-3">
            <a
              href="https://moapick.co.kr"
              target="_blank"
              rel="noopener"
              className="w-10 h-10 flex items-center justify-center rounded-md bg-secondary-800 hover:bg-primary-500 text-background-50 cursor-pointer transition-colors"
              aria-label="공식 사이트"
            >
              <i className="ri-global-line text-lg" />
            </a>
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center rounded-md bg-secondary-800 hover:bg-primary-500 text-background-50 cursor-pointer transition-colors"
              aria-label="블로그"
            >
              <i className="ri-quill-pen-line text-lg" />
            </a>
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center rounded-md bg-secondary-800 hover:bg-primary-500 text-background-50 cursor-pointer transition-colors"
              aria-label="인스타그램"
            >
              <i className="ri-instagram-line text-lg" />
            </a>
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center rounded-md bg-secondary-800 hover:bg-primary-500 text-background-50 cursor-pointer transition-colors"
              aria-label="유튜브"
            >
              <i className="ri-youtube-line text-lg" />
            </a>
          </div>
        </div>
        <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-4 gap-6">
          {linkGroups.map((g) => (
            <div key={g.title}>
              <p className="font-heading font-bold text-background-50">{g.title}</p>
              <ul className="mt-3 space-y-2">
                {g.items.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noopener nofollow" : undefined}
                      className="text-sm text-secondary-200 hover:text-background-50 transition-colors whitespace-nowrap cursor-pointer"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-secondary-800">
        <div className="mx-auto max-w-7xl px-4 md:px-8 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-secondary-300">
          <p>© 2025 MOAPICK. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
