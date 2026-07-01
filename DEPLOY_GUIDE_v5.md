# 🚀 moapick.co.kr/rent 배포 가이드 (v5 - 루트 디렉토리 유지 방식)

GitHub 저장소 루트에 다른 페이지들이 이미 있는 경우, 본 프로젝트를 다음과 같은 구조로 배치하여 배포하세요.

### 1. GitHub 저장소 파일 구조
압축 파일의 구조를 그대로 GitHub 저장소 루트에 합치시면 됩니다.

```
github-repo-root/
├── public/
│   └── rent/
│       ├── index.html
│       └── assets_rent/ (이미지, CSS 등)
└── functions/
    └── rent/
        └── api/
            ├── submit.js (상담 신청 API)
            └── admin.js (관리자 페이지 API)
```

### 2. 작동 원리
*   **접속 주소**: `moapick.co.kr/rent` (Cloudflare가 `public/rent/index.html`을 자동으로 찾아줍니다.)
*   **API 주소**: `moapick.co.kr/rent/api/submit`
    *   `index.html`에서 `api/submit`이라는 상대 경로로 호출합니다.
    *   Cloudflare Pages는 `functions/rent/api/submit.js` 파일을 자동으로 `/rent/api/submit` 경로의 API로 연결해 줍니다.

### 3. Cloudflare Pages 설정
기존 설정을 그대로 유지하시면 됩니다. (Root Directory를 수정할 필요가 없습니다.)

*   **Root directory**: `/` (또는 기존 설정값)
*   **Build command**: (기존 설정 유지)
*   **Build output directory**: `public` (기존에 루트 페이지들이 있는 폴더)

### 4. 주의사항
*   `functions` 폴더가 이미 루트에 있다면, 그 안에 `rent` 폴더를 새로 만들고 내용을 추가해 주시면 됩니다.
*   환경 변수(`SUPABASE_URL`, `SUPABASE_KEY`)가 Cloudflare Pages 설정에 등록되어 있는지 다시 한번 확인해 주세요.
