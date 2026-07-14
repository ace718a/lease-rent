import os
import json
import re
from datetime import datetime

try:
from bs4 import BeautifulSoup
except ImportError:
import subprocess
import sys

```
subprocess.check_call([
    sys.executable,
    "-m",
    "pip",
    "install",
    "beautifulsoup4"
])
from bs4 import BeautifulSoup
```

DATA_FILE = "news-data.json"
EXCLUDED_FILES = {"index.html", "template.html"}

def load_existing_dates():
"""
기존 news-data.json에 기록된 기사 날짜를 불러온다.
HTML 파일이 다시 수정되더라도 최초 등록 날짜를 유지하기 위한 용도다.
"""
if not os.path.exists(DATA_FILE):
return {}

```
try:
    with open(DATA_FILE, "r", encoding="utf-8") as f:
        existing_news = json.load(f)

    return {
        item.get("url"): item.get("date")
        for item in existing_news
        if item.get("url") and item.get("date")
    }

except (json.JSONDecodeError, OSError, TypeError) as e:
    print(f"기존 {DATA_FILE}을 읽지 못했습니다: {e}")
    return {}
```

def get_html_files():
"""
뉴스 HTML 파일 목록을 가져온다.
숫자 파일명은 큰 숫자가 먼저 오도록 정렬한다.
예: 11.html, 10.html, 9.html
"""
files = [
filename
for filename in os.listdir(".")
if filename.endswith(".
