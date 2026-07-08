
import os
import re

files_to_update = [
    '1.html', '2.html', '3.html', '4.html', '5.html', 
    '6.html', '7.html', 'sabongsosul.html', 'sabonkt1.html'
]

css_link = '<link rel="stylesheet" href="style.css">\n'

for filename in files_to_update:
    path = os.path.join('/home/ubuntu/news_project', filename)
    if os.path.exists(path):
        with open(path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # 기존 스타일 태그 제거 (디자인 통일을 위해)
        content = re.sub(r'<style>.*?</style>', '', content, flags=re.DOTALL)
        
        # <head> 태그 바로 뒤에 CSS 링크 삽입
        if '<head>' in content:
            new_content = content.replace('<head>', f'<head>\n    {css_link}')
        else:
            new_content = css_link + content

        # 헤더 삽입 (기존 헤더가 있다면 교체, 없으면 body 시작점에 삽입)
        header_html = '''
    <header>
        <div class="container">
            <a href="index.html" class="logo">
                <img src="logo.png" alt="MOAPICK">
            </a>
        </div>
    </header>
'''
        if '<body>' in new_content:
            new_content = new_content.replace('<body>', f'<body>\n{header_html}')
        else:
            new_content = header_html + new_content
            
        with open(path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {filename}")
