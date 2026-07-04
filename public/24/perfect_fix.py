import os

path = '/home/ubuntu/v3_fixed/index.html'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. jQuery 위치를 Head 최상단으로 (에러 방지)
if '<script src="https://code.jquery.com/jquery-1.12.4.min.js"></script>' in content:
    content = content.replace('<script src="https://code.jquery.com/jquery-1.12.4.min.js"></script>', '')
    content = content.replace('<head>', '<head>\n<script src="https://code.jquery.com/jquery-1.12.4.min.js"></script>')

# 2. 로고 크기 및 여백 수정 (v3와 1:1 대조)
# 운영 사이트 로고는 header-logo 클래스에 height: 50px 정도로 보임. 
content = content.replace('.header-logo {\n  /* layout */\n  width: auto;\n  height: 70px;', '.header-logo {\n  /* layout */\n  width: auto;\n  height: 50px;')

# 3. 헤더 패턴 배경 복구 (섹션 1)
# v3 원본 CSS를 참고하여 배경 이미지 경로와 패턴 설정을 강제함
pattern_style = """
.section-1 {
    background-image: url("./background_image.png");
    background-repeat: no-repeat;
    background-position: center top;
    background-size: cover;
}
@media screen and (max-width: 860px) {
    .section-1 {
        background-image: url("./background_image_mobile.png");
    }
}
"""
if '</style>' in content:
    content = content.replace('</style>', pattern_style + '\n</style>')

# 4. 아이프레임 높이 및 리사이저 수정
# ID를 co10Frm으로 확실히 고정하고, 잘리지 않도록 min-height와 리사이저 옵션 조정
content = content.replace("iFrameResize({ \n	            autoResize: true, \n	            heightCalculationMethod: \"grow\",\n	            checkOrigin: false \n	        }, '#co10Frm');", 
                          "iFrameResize({ autoResize: true, heightCalculationMethod: 'lowestElement', checkOrigin: false }, '#co10Frm');")
content = content.replace("#co10Frm { min-height: 800px; }", "#co10Frm { min-height: 1200px; width: 100%; border: none; }")

# 5. 슬라이드(Swiper) 초기화 코드 복구 (원본과 100% 일치)
# 이전 수정에서 꼬였을 가능성이 큰 Swiper 초기화 부분을 원본 로직으로 교체
swiper_fix = """
$(document).ready(function() {
    // 아이프레임 리사이저
    if (typeof iFrameResize === 'function') {
        iFrameResize({ 
            autoResize: true, 
            heightCalculationMethod: 'lowestElement', 
            checkOrigin: false 
        }, '#co10Frm');
    }
    
    // 섹션 4 슬라이드 복구
    if (typeof Swiper === 'function') {
        new Swiper(".section-4-swiper", {
            loop: true,
            slidesPerView: 1,
            spaceBetween: 20,
            centeredSlides: false,
            navigation: { 
                nextEl: ".custom-next-btn", 
                prevEl: ".custom-prev-btn" 
            },
            pagination: { 
                el: ".custom-pagination", 
                clickable: true 
            },
            breakpoints: { 
                860: { slidesPerView: 2 },
                1200: { slidesPerView: 3 },
                1600: { slidesPerView: 4 } 
            },
            autoplay: { 
                delay: 3000, 
                disableOnInteraction: false 
            }
        });
    }
});
"""
# 기존의 잘못된 초기화 블록을 찾아서 교체 (정규식 대신 단순 문자열 교체 시도)
import re
content = re.sub(r'\$\(document\)\.ready\(function\(\) \{\s+// 아이프레임 리사이저 설정.*?\}\);', swiper_fix, content, flags=re.DOTALL)

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)
