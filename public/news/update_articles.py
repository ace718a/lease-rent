
import os
import re
from bs4 import BeautifulSoup

def update_html(file_path, news_info):
    if not os.path.exists(file_path):
        return

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    soup = BeautifulSoup(content, 'html.parser')
    
    # 제목 추출 (기존 title 또는 h1)
    title = news_info['title']
    category = news_info['category']
    date = news_info['date']

    # 본문 내용 추출 (기존 .card 내부 또는 p 태그들)
    # 1-7.html, sabongsosul, sabonkt1 등 구조가 다르므로 범용적으로 추출
    body_content = ""
    
    # 1. summary-box (기존 .summary 또는 특정 div)
    summary_div = soup.find(class_=re.compile(r'summary|핵심 요약', re.I))
    summary_html = ""
    if summary_div:
        summary_html = f'<div class="summary-box">{summary_div.decode_contents()}</div>'
    
    # 2. 메인 본문 (h2, p 태그들)
    main_elements = soup.find_all(['h2', 'p', 'ul', 'div'], class_=lambda x: x != 'hero' and x != 'meta')
    
    # 불필요한 요소 필터링 (헤더, 푸터 등)
    filtered_elements = []
    for el in main_elements:
        # hero, meta, header, footer 내부 요소 제외
        if el.find_parent(['header', 'footer']) or 'hero' in str(el.get('class', [])) or 'meta' in str(el.get('class', [])):
            continue
        # 이미 처리한 summary 제외
        if summary_div and (el == summary_div or summary_div in el.parents):
            continue
        # 중복된 p 태그 (카드 내부) 방지
        if el.name == 'p' and el.find_parent(class_='card'):
            continue
        
        # card 클래스인 경우 그 내부 내용을 가져옴
        if 'card' in str(el.get('class', [])):
            filtered_elements.append(el.decode_contents())
        elif el.name in ['h2', 'p', 'ul']:
            filtered_elements.append(str(el))

    body_content = summary_html + "\n".join(filtered_elements)

    # 관련 글 섹션 생성 (현재 기사 제외 3개 랜덤 추출)
    import random
    other_news = [n for n in news_data if n['url'] != news_info['url']]
    related_items = random.sample(other_news, min(3, len(other_news)))
    
    related_html = '<div class="related-posts"><h2>함께 보면 좋은 글</h2><div class="related-grid">'
    for item in related_items:
        related_html += f'''
        <a href="{item['url']}" class="related-card">
            <img src="{item['image']}" alt="{item['title']}">
            <div class="related-card-content">
                <h4>{item['title']}</h4>
            </div>
        </a>'''
    related_html += '</div></div>'

    # 새로운 템플릿 적용
    new_html = f"""<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title} | 모아픽 뉴스룸</title>
    <link rel="stylesheet" href="style.css">
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700;900&display=swap" rel="stylesheet">
</head>
<body>
    <header>
        <div class="container">
            <a href="index.html" class="logo">MOAPICK.</a>
        </div>
    </header>

    <main class="container article-page">
        <article>
            <div class="article-header">
                <span class="category">{category}</span>
                <h1>{title}</h1>
                <div class="meta">발행일: {date} | 모아픽 뉴스룸</div>
            </div>

            <div class="article-body">
                {body_content}
                {related_html}
            </div>
        </article>
        
        <div style="text-align: center; margin-top: 40px;">
            <a href="index.html" style="color: #ff7e67; text-decoration: none; font-weight: bold;">← 목록으로 돌아가기</a>
        </div>
    </main>

    <footer>
        <div class="container">
            <p>&copy; 2026 MOAPICK. All Rights Reserved.</p>
        </div>
    </footer>
</body>
</html>"""

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_html)

# JSON 데이터 로드
import json
with open('news-data.json', 'r', encoding='utf-8') as f:
    news_data = json.load(f)

for item in news_data:
    print(f"Updating {item['url']}...")
    update_html(item['url'], item)
