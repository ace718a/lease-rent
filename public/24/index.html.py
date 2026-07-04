import re

with open('/home/ubuntu/modu_move/index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. jQuery 로드 순서 조정 (최상단으로 이동)
# 기존 4843행 근처의 jQuery 로드 코드 제거
content = content.replace('<script src="https://code.jquery.com/jquery-1.12.4.min.js"></script>', '')

# Head 상단에 jQuery 추가
content = content.replace('<head>', '<head>\n<script src="https://code.jquery.com/jquery-1.12.4.min.js"></script>')

# 2. 아이프레임 영역 중복 jQuery 및 잘못된 스크립트 제거
# 4669행 근처의 중복 jQuery 로드 제거
content = content.replace('<script type="text/javascript" src="https://co10.kr/gate/js/jquery.min.js"></script>', '')

# 3. 스크롤 이벤트를 위한 ID 누락 수정 (header-cta-btn, section-1-cta-btn)
# 히어로 버튼에 ID 추가
content = content.replace('<button class="section-1-cta-btn"', '<button class="section-1-cta-btn" id="section-1-cta-btn"')
# 헤더 버튼에 ID 추가
content = content.replace('<button class="header-cta-btn">', '<button class="header-cta-btn" id="header-cta-btn">')

# 4. 아이프레임 리사이저 중복 및 충돌 해결
# 6152행 근처의 잘못된 리사이저 초기화 제거
content = re.sub(r'iFrameResize\(.*?\)', '', content)

# 5. 최종 리사이저 스크립트 하나로 통합 (아이프레임 바로 아래)
resizer_script = """
<script type="text/javascript" src="https://co10.kr/gate/js/iframeResizer.min.js"></script>
<script type="text/javascript">
    $(document).ready(function() {
        if (typeof iFrameResize === 'function') {
            iFrameResize({log:false, checkOrigin:false}, '#co10Frm');
        }
    });
</script>
"""
content = content.replace('$("#co10Frm").iFrameResize({autoResize: true});', resizer_script)

with open('/home/ubuntu/v3_fixed/index.html', 'w', encoding='utf-8') as f:
    f.write(content)
