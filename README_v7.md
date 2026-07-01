# 🚀 카슐랭 moapick.co.kr/rent/ 전용 최종 배포 가이드 (v7)

이 버전은 `moapick.co.kr/rent` 하위 경로에서 이미지 깨짐과 API 오류가 발생하는 문제를 **절대 경로 치환** 방식으로 완벽하게 해결한 최종본입니다.

## 📁 저장소 반영 방법
이 압축 파일의 구조를 `moapick` 메인 GitHub 저장소의 **루트(최상단)**에 그대로 덮어쓰기 하세요.

1.  **정적 파일**: `public/rent/` 폴더가 생성되며 그 안에 `index.html`과 `assets_rent/`가 들어갑니다.
2.  **API 함수**: `functions/rent/api/` 폴더가 생성되며 그 안에 `submit.js`와 `admin.js`가 들어갑니다.

## ⚙️ Cloudflare Pages 설정 확인
이미 설정하셨겠지만, 다시 한번 확인해 주세요.
- **Root Directory**: `/` (루트 그대로 유지)
- **Build Output Directory**: `public`
- **환경 변수**: `SUPABASE_URL`, `SUPABASE_KEY`, `REPLY_ALBA_CODE` 등록 확인.
- **KV 바인딩**: `CAR_DB`라는 이름으로 KV 네임스페이스 연결 확인.

## ⚠️ 중요: Worker Route 삭제
이전에 만들었던 `moapick.co.kr/rent*` 관련 **Worker Route는 반드시 삭제**해 주세요. 이제 메인 저장소의 파일들이 그 주소를 직접 담당하게 됩니다.

## 🔗 접속 주소
- **메인 페이지**: `https://moapick.co.kr/rent/`
- **관리자 페이지**: `https://moapick.co.kr/rent/api/admin?pwd=1029qpwo`
