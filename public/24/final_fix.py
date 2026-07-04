import re

with open('/home/ubuntu/modu_move/index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. jQuery를 Head 최상단으로 이동 (모든 스크립트 에러 방지)
content = content.replace('<script src="https://code.jquery.com/jquery-1.12.4.min.js"></script>', '')
content = content.replace('<head>', '<head>\n<script src="https://code.jquery.com/jquery-1.12.4.min.js"></script>')

# 2. 아이프레임 영역 중복 jQuery 제거
content = content.replace('<script type="text/javascript" src="https://co10.kr/gate/js/jquery.min.js"></script>', '')

# 3. 스크롤용 ID 추가 (v3에서 누락된 부분)
content = content.replace('<button class="section-1-cta-btn"', '<button class="section-1-cta-btn" id="section-1-cta-btn"')
content = content.replace('<button class="header-cta-btn">', '<button class="header-cta-btn" id="header-cta-btn">')

# 4. 아이프레임 높이 잘림 방지를 위한 스타일 추가
content = content.replace('</style>', '#co10Frm { min-height: 800px; }\n</style>')

# 5. 하단 스크립트 완전 재정비 (슬라이드 복구 및 리사이저 정확히 연결)
# 기존 document.ready 블록을 찾아서 교체
new_ready_script = """
$(document).ready(function() {
    // 아이프레임 리사이저 설정 (사용자님의 ID인 #co10Frm에 정확히 연결)
    if (typeof iFrameResize === 'function') {
        iFrameResize({ 
            autoResize: true, 
            heightCalculationMethod: "grow",
            checkOrigin: false 
        }, '#co10Frm');
    }
    
    // 섹션 4 슬라이드 복구 (V3 원본 설정 그대로)
    if (typeof Swiper === 'function') {
        new Swiper(".section-4-swiper", {
            loop: true,
            slidesPerView: 1,
            spaceBetween: 20,
            navigation: { nextEl: ".custom-next-btn", prevEl: ".custom-prev-btn" },
            pagination: { el: ".custom-pagination", clickable: true },
            breakpoints: { 
                1600: { slidesPerView: 4 } 
            },
            autoplay: { delay: 3000, disableOnInteraction: false }
        });
    }
});
"""

# 기존 스크립트 하단부 정리
content = re.sub(r'\$\(document\)\.ready\(function\(\) \{.*?\}\);', new_ready_script, content, flags=re.DOTALL)

with open('/home/ubuntu/v3_fixed/index.html', 'w', encoding='utf-8') as f:
    f.write(content)
