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
    exclude = ['index.html', 'template.html']
    files = [f for f in os.listdir('.') if f.endswith('.html') and f not in exclude]
    
    # 정렬 로직 개선: 숫자로 된 파일명(1.html, 2.html)은 숫자가 클수록 최신으로 간주
    def sort_key(filename):
        numbers = re.findall(r'\d+', filename)
        if numbers:
            return (int(numbers[0]), os.path.getmtime(filename))
        return (0, os.path.getmtime(filename))
    
    files.sort(key=sort_key, reverse=True)
    return files

def extract_info(filename):
    with open(filename, 'r', encoding='utf-8') as f:
        soup = BeautifulSoup(f.read(), 'html.parser')
    
    title = soup.title.get_text().replace('| 모아픽 뉴스룸', '').strip() if soup.title else filename
    h1 = soup.find('h1')
    if h1: title = h1.get_text().strip()

    summary = ""
    summary_box = soup.find(class_=re.compile(r'summary|핵심 요약', re.I))
    if summary_box:
        summary = summary_box.get_text().strip()[:150]
    else:
        p_tags = soup.find_all('p')
        for p in p_tags:
            text = p.get_text().strip()
            if len(text) > 20:
                summary = text[:150]
                break
    
    date = datetime.fromtimestamp(os.path.getmtime(filename)).strftime('%Y.%m.%d')
    
    category = "뉴스"
    cat_el = soup.find(class_=re.compile(r'category', re.I))
    if cat_el: category = cat_el.get_text().strip()

    # 이미지 추출 로직 강화
    image = ""
    imgs = soup.find_all('img')
    for img in imgs:
        src = img.get('src', '')
        # 로고가 아니고, 유효한 경로인 경우 선택
        if src and 'logo' not in src.lower() and not src.startswith('data:'):
            image = src
            print(f"Found image for {filename}: {image}")
            break
    
    if not image:
        # 이미지가 없을 때의 기본 이미지
        image = "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=800&auto=format&fit=crop"

    return {
        "url": filename,
        "title": title,
        "summary": summary,
        "date": date,
        "category": category,
        "image": image
    }

def main( ):
    files = get_html_files()
    news_list = []
    for f in files:
        try:
            info = extract_info(f)
            news_list.append(info)
        except Exception as e:
            print(f"Error {f}: {e}")
    
    with open('news-data.json', 'w', encoding='utf-8') as f:
        json.dump(news_list, f, ensure_ascii=False, indent=4)
    print(f"Successfully updated news-data.json with {len(news_list)} items.")

if __name__ == "__main__":
    main()
