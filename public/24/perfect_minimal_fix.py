import re

# V3 원본 읽기
with open('/home/ubuntu/modu_move/index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. jQuery 로드 위치 이동 (Head 최상단으로)
# 원본의 jQuery 태그 정확히 찾기
jquery_tag = '<script src="https://code.jquery.com/jquery-1.12.4.min.js"></script>'
if jquery_tag in content:
    content = content.replace(jquery_tag, '') # 기존 위치 삭제
    content = content.replace('<head>', '<head>\n' + jquery_tag) # Head 상단 추가

# 2. 아이프레임 교체 및 리사이저 설정
# V3 원본의 아이프레임 블록 (이미 파악된 문자열)
old_iframe_block = """	<div class="formdiv" id="dbdb">
	    <div class="inner">
	        <iframe name="co10Frm" id="co10Frm" scrolling="no" frameborder="0" width="100%" src="https://modu24.kr/frm.php?p_id=zobonpal15"></iframe>
	        <script type="text/javascript" src="https://co10.kr/gate/js/jquery.min.js"></script>
	        <script type="text/javascript" src="https://co10.kr/gate/js/iframeResizer.min.js"></script>
	        <script type="text/javascript">$("#co10Frm").iFrameResize({autoResize: true});</script>
	    </div>
	</div>"""

# 최소한의 수정: 중복 jQuery 제거 및 리사이저 ID/옵션 최적화
new_iframe_block = """	<div class="formdiv" id="dbdb">
	    <div class="inner">
	        <iframe name="co10Frm" id="co10Frm" scrolling="no" frameborder="0" width="100%" src="https://modu24.kr/frm.php?p_id=zobonpal15"></iframe>
	        <script type="text/javascript" src="https://co10.kr/gate/js/iframeResizer.min.js"></script>
	        <script type="text/javascript">
	            $(document).ready(function() {
	                $('#co10Frm').iFrameResize({
	                    log: false,
	                    checkOrigin: false,
	                    heightCalculationMethod: 'lowestElement',
	                    autoResize: true,
	                    minHeight: 1200
	                });
	            });
	        </script>
	    </div>
	</div>"""

content = content.replace(old_iframe_block, new_iframe_block)

# 3. 하단에 잘못된 ID(#ifrCCAl)로 걸려있는 리사이저만 주석 처리 (슬라이드 코드는 절대 건드리지 않음)
content = content.replace("iFrameResize({ autoResize: true, heightCalculationMethod: \"offset\" }, '#ifrCCAl');", 
                          "// iFrameResize({ autoResize: true, heightCalculationMethod: \"offset\" }, '#ifrCCAl');")

# 4. 디자인 복구: 로고 크기 및 여백 강제 고정 (v3 운영 사이트 1:1 대조 결과 반영)
# .header-logo { height: 70px; } -> 54px
content = content.replace('height: 70px;', 'height: 54px !important;')
# .header-logo-wrapper { margin-right: 40px; } -> 20px (v3 대조 결과)
content = content.replace('margin-right: 40px;', 'margin-right: 20px !important;')

# 5. 푸터 글자색 강제 고정 (v3 운영 사이트 대조 결과)
content = content.replace('color: #a0a0a0;', 'color: #a0a0a0 !important;')

# 최종 파일 저장
with open('/home/ubuntu/v3_fixed/index.html', 'w', encoding='utf-8') as f:
    f.write(content)
