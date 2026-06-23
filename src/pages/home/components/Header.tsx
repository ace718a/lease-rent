import { useEffect, useState } from "react";
const navItems = [
  { label: "포장이사", href: "#moving" },
  { label: "장기렌트", href: "#rent" },
  { label: "인터넷가입", href: "#internet" },
  { label: "정수기렌탈", href: "#water" },
  { label: "생활꿀팁", href: "#info" },
  { label: "뉴스", href: "#news" },
];
export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={[
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background-50/95 backdrop-blur border-b border-background-200/70"
          : "bg-transparent",
      ].join(" ")}
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8 h-16 md:h-20 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2 cursor-pointer">
          <span
            className={[
              "w-9 h-9 rounded-md flex items-center justify-center font-heading text-background-50",
              "bg-primary-500",
            ].join(" ")}
          >
            <i className="ri-checkbox-circle-fill text-xl" />
          </span>
          <span className="font-heading text-lg md:text-xl font-bold tracking-tight text-foreground-950">
            MOAPICK<span className="text-primary-500">.</span>
          </span>
        </a>
        <nav className="hidden lg:flex items-center gap-7">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-foreground-700 hover:text-primary-600 transition-colors cursor-pointer whitespace-nowrap"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-3">
          <a
            href="#service-cta"
            className="inline-flex items-center gap-1.5 rounded-md bg-primary-500 hover:bg-primary-600 text-background-50 px-4 py-2 text-sm font-semibold whitespace-nowrap cursor-pointer transition-colors"
          >
            무료 견적
            <i className="ri-arrow-right-line" />
          </a>
        </div>
        <button
          aria-label="메뉴 열기"
          className="md:hidden w-10 h-10 flex items-center justify-center rounded-md text-foreground-900 cursor-pointer"
          onClick={() => setOpen((v) => !v)}
        >
          <i className={open ? "ri-close-line text-2xl" : "ri-menu-line text-2xl"} />
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-background-50 border-t border-background-200">
          <div className="px-4 py-4 grid gap-2">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block px-2 py-2 text-foreground-800 font-medium rounded-md hover:bg-background-100 cursor-pointer"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#service-cta"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded-md bg-primary-500 text-background-50 px-4 py-2.5 text-sm font-semibold whitespace-nowrap cursor-pointer"
            >
              무료 견적 받기
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
