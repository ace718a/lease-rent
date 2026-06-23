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
    excerpt:
      "예약·짐 정리·주소이전까지, 빠뜨리기 쉬운 순서를 한 장으로 정리했습니다.",
    meta: "2025.04.18 · 5분 분량",
    href: "https://moapick.co.kr/info",
    image:
