
import os
import json
import re
from datetime import datetime
try:
    from bs4 import BeautifulSoup
except ImportError:
    import subprocess
    import sys
    subprocess.check_call([sys.executable, "-m", "pip", "install", "beautifulsoup4"])
    from bs4 import BeautifulSoup

def get_html_files():
    # index.html과 template.html을 제외한 모든 html 파일 목록 가져오기
    exclude = ['index.html', 'template.html']
    files = [f for f in os.listdir('.') if f.endswith('.html') and f not in exclude]
    # 파일 수정 시간 순으로 정렬 (최신순)
    files.sort(key=lambda x: os.path.getmtime(x), reverse=True)
    return files

def extract_info(filename):
    with open(filename, 'r', encoding='utf-8') as f:
        soup = BeautifulSoup(f.read(), 'html.parser')
    
    # 제목 추출: h1 우선, 없으면 title
    title = ""
    h1 = soup.find('h1')
    if h1:
        title = h1.get_text().strip()
    else:
        title = soup.title.get_text().replace('| 모아픽 뉴스룸', '').strip() if soup.title else filename

    # 요약 추출: summary-box 클래스 우선, 없으면 첫 번째 p 태그
    summary = ""
    summary_box = soup.find(class_=re.compile(r'summary|핵심 요약', re.I))
    if summary_box:
        summary = summary_box.get_text().strip()[:150] # 너무 길면 자름
    else:
        p_tags = soup.find_all('p')
        for p in p_tags:
            text = p.get_text().strip()
            if len(text) > 20: # 너무 짧은 문장은 제외
                summary = text[:150]
                break
    
    # 날짜 추출: meta 태그나 본문 내 날짜 형식 검색, 없으면 파일 수정일
    date = ""
    meta_date = soup.find(class_=re.compile(r'meta|date', re.I))
    if meta_date:
        date_match = re.search(r'\d{4}\.\d{2}\.\d{2}', meta_date.get_text())
        if date_match:
            date = date_match.group()
    
    if not date:
        mtime = os.path.getmtime(filename)
        date = datetime.fromtimestamp(mtime).strftime('%Y.%m.%d')

    # 카테고리 추출: category 클래스 우선
    category = "뉴스"
    cat_el = soup.find(class_=re.compile(r'category', re.I))
    if cat_el:
        category = cat_el.get_text().strip()

    # 이미지 추출: 첫 번째 img 태그 (로고 제외)
    image = ""
    imgs = soup.find_all('img')
    for img in imgs:
        src = img.get('src', '')
        if 'logo' not in src.lower() and src:
            image = src
            break
    
    # 이미지가 없으면 주제별 기본 이미지 매칭 (랜덤성 부여 가능)
    if not image:
        placeholders = [
            "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1495020689067-958852a7765e?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1585829365234-781fcd04c83e?q=80&w=800&auto=format&fit=crop"
        ]
        import random
        image = random.choice(placeholders)

    return {
        "url": filename,
        "title": title,
        "summary": summary,
        "date": date,
        "category": category,
        "image": image
    }

def main():
    files = get_html_files()
    news_list = []
    
    for f in files:
        try:
            info = extract_info(f)
            news_list.append(info)
            print(f"Processed: {f}")
        except Exception as e:
            print(f"Error processing {f}: {e}")
    
    # JSON 저장
    with open('news-data.json', 'w', encoding='utf-8') as f:
        json.dump(news_list, f, ensure_ascii=False, indent=4)
    
    print(f"\nSuccessfully updated news-data.json with {len(news_list)} articles.")

if __name__ == "__main__":
    main()
