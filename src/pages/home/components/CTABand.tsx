export default function CTABand() {
  return (
    <section className="relative overflow-hidden bg-foreground-950 text-background-50 py-16 md:py-24">
      <div
        aria-hidden
        className="absolute -top-32 -left-20 w-[480px] h-[480px] rounded-full bg-primary-500/30 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute -bottom-32 -right-20 w-[520px] h-[520px] rounded-full bg-accent-500/20 blur-3xl"
      />
      <div className="relative mx-auto max-w-5xl px-4 md:px-8 text-center">
        <h2 className="mt-5 font-heading text-3xl md:text-5xl font-extrabold leading-tight">
          이사·렌트·인터넷·정수기,
          <br />
          <span className="text-accent-400">모아픽이 정리해드릴게요.</span>
        </h2>
        <p className="mt-4 text-background-200 text-sm md:text-base">
          관심 있는 항목만 골라보세요. 30초면 충분합니다.
        </p>
        <div className="mt-7 flex flex-col sm:flex-row justify-center gap-3">
          <a
            href="#service-cta"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-primary-500 hover:bg-primary-600 text-background-50 px-6 py-3.5 text-sm md:text-base font-semibold whitespace-nowrap cursor-pointer transition-colors"
          >
            <i className="ri-edit-2-line" />
            지금 무료 견적 받기
          </a>
        </div>
      </div>
    </section>
  );
}
