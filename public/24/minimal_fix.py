import re

# V3 원본 읽기
with open('/home/ubuntu/modu_move/index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. jQuery 로드 위치 이동 (Head 최상단으로)
jquery_tag = '<script src="https://code.jquery.com/jquery-1.12.4.min.js"></script>'
content = content.replace(jquery_tag, '') # 기존 위치 삭제
content = content.replace('<head>', '<head>\n' + jquery_tag) # Head 상단 추가

# 2. 아이프레임 블록 교체 (사용자 제공 코드로)
# 기존 블록 찾기
old_iframe_block = """	<div class="formdiv" id="dbdb">
	    <div class="inner">
	        <iframe name="co10Frm" id="co10Frm" scrolling="no" frameborder="0" width="100%" src="https://modu24.kr/frm.php?p_id=zobonpal15"></iframe>
	        <script type="text/javascript" src="https://co10.kr/gate/js/jquery.min.js"></script>
	        <script type="text/javascript" src="https://co10.kr/gate/js/iframeResizer.min.js"></script>
	        <script type="text/javascript">$("#co10Frm").iFrameResize({autoResize: true});</script>
	    </div>
	</div>"""

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
	                    initCallback: function(iframe) {
	                        console.log('IFrame initialized');
	                    }
	                });
	            });
	        </script>
	    </div>
	</div>"""

content = content.replace(old_iframe_block, new_iframe_block)

# 3. 하단에 잘못된 ID(#ifrCCAl)로 걸려있는 리사이저 수정
content = content.replace("iFrameResize({ autoResize: true, heightCalculationMethod: \"offset\" }, '#ifrCCAl');", 
                          "// iFrameResize({ autoResize: true, heightCalculationMethod: \"offset\" }, '#ifrCCAl');")

# 4. CTA 버튼 ID 추가 (V3 원본에 누락된 경우 대비)
content = content.replace('id="header-menu-1"', 'id="header-menu-1"') # 이미 있으면 유지
if 'id="section-1-cta-btn"' not in content:
    content = content.replace('class="section-1-cta-btn"', 'id="section-1-cta-btn" class="section-1-cta-btn"')
if 'id="header-cta-btn"' not in content:
    content = content.replace('class="header-cta-btn"', 'id="header-cta-btn" class="header-cta-btn"')
if 'id="apply-form"' not in content:
    content = content.replace('class="section-5-form-wrapper"', 'id="apply-form" class="section-5-form-wrapper"')

# 최종 파일 저장
with open('/home/ubuntu/v3_fixed/index.html', 'w', encoding='utf-8') as f:
    f.write(content)
