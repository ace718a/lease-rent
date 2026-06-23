import { useState } from "react";
type FaqItem = {
  q: string;
  a: string;
};
const faqs: FaqItem[] = [
  {
    q: "모아픽 서비스는 정말 무료인가요?",
    a: "네, 모아픽의 모든 견적 비교와 상담은 100% 무료입니다. 신청 후 별도의 가입비나 수수료가 청구되지 않으며, 최종 계약은 본인이 직접 비교 후 결정하시면 됩니다.",
  },
  {
    q: "한 번에 여러 서비스를 같이 신청해도 되나요?",
    a: "물론입니다. 이사하면서 인터넷·정수기 이전이 필요하신 경우, 견적 신청 시 관심 서비스를 모두 선택해주시면 담당 상담사가 한 번에 정리해드립니다.",
  },
  {
    q: "상담 전화는 언제 오나요?",
    a: "신청 접수 후 평균 10분 이내로 담당 상담사가 연락드립니다. 평일은 09:00–20:00, 주말·공휴일은 10:00–18:00에 운영됩니다.",
  },
  {
    q: "포장이사 업체는 어떻게 선정되나요?",
    a: "모아픽은 사업자등록·보험가입·실제 운영 이력·이용 후기 등을 자체 기준으로 검수한 업체만 매칭합니다. 파손 보상 가입 업체만 노출되어 안심하고 이용하실 수 있습니다.",
  },
  {
    q: "장기렌트 심사에서 떨어진 적이 있는데도 가능할까요?",
    a: "차종·계약 기간·보증인 조건에 따라 통과 가능성이 달라집니다. 모아픽 상담사가 무료 사전 심사를 통해 가장 가능성 높은 조건을 안내해드립니다.",
  },
  {
    q: "신청 후 마음에 들지 않으면 취소할 수 있나요?",
    a: "네, 견적 신청 단계에서는 언제든 취소 가능합니다. 실제 계약 이전까지는 비용이 발생하지 않으며, 상담 거절도 자유롭게 하실 수 있습니다.",
  },
];
export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="py-16 md:py-24 bg-background-100/60 border-y border-background-200">
      <div className="mx-auto max-w-5xl px-4 md:px-8">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-secondary-100 text-secondary-900 px-3 py-1.5 text-xs md:text-sm font-bold whitespace-nowrap">
            <i className="ri-question-answer-fill text-secondary-700" />
            자주 묻는 질문
          </span>
          <h2 className="mt-4 font-heading text-3xl md:text-5xl font-extrabold text-foreground-950 leading-tight">
            궁금했던 점, 미리 정리했어요.
          </h2>
        </div>
        <div className="mt-10 rounded-2xl bg-background-50 border border-background-200 divide-y divide-background-200">
          {faqs.map((item, idx) => {
            const isOpen = open === idx;
            return (
              <div key={item.q}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between gap-4 px-5 md:px-6 py-5 text-left cursor-pointer"
                >
                  <span className="flex items-start gap-3">
                    <span className="mt-0.5 w-6 h-6 flex items-center justify-center rounded-full bg-primary-500 text-background-50 text-xs font-bold">
                      Q
                    </span>
                    <span className="font-semibold text-foreground-950 text-base md:text-lg">
                      {item.q}
                    </span>
                  </span>
                  <i className={"ri-arrow-down-s-line text-2xl text-foreground-500 transition-transform shrink-0" + (isOpen ? " rotate-180 text-primary-500" : "")} />
                </button>
                {isOpen && (
                  <div className="px-5 md:px-6 pb-6 pt-0">
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 w-6 h-6 flex items-center justify-center rounded-full bg-accent-100 text-accent-800 text-xs font-bold">
                        A
                      </span>
                      <p className="text-foreground-700 text-sm md:text-base leading-relaxed">
                        {item.a}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
