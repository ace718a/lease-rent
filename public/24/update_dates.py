import re
from datetime import datetime, timedelta
import random

# 파일 읽기
with open('/home/ubuntu/v3_fixed/index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 현재 날짜 (2026-07-04)
base_date = datetime(2026, 7, 4)

def generate_recent_date():
    # 1일에서 60일 전 사이의 랜덤한 날짜 생성
    days_ago = random.randint(1, 60)
    new_date = base_date - timedelta(days=days_ago)
    return new_date.strftime('%Y. %m. %d')

# 날짜 패턴 찾기 (예: 2024. 11. 14)
date_pattern = r'\d{4}\. \d{2}\. \d{2}'

# 모든 날짜를 최근 날짜로 교체
def replace_date(match):
    return generate_recent_date()

new_content = re.sub(date_pattern, replace_date, content)

# 파일 저장
with open('/home/ubuntu/v3_fixed/index.html', 'w', encoding='utf-8') as f:
    f.write(new_content)
