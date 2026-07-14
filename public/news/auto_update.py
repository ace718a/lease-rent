import os
import json
import re
import subprocess
from datetime import datetime

try:
    from bs4 import BeautifulSoup
except ImportError:
    import sys

    subprocess.check_call([
        sys.executable,
        "-m",
        "pip",
        "install",
        "beautifulsoup4"
    ])

    from bs4 import BeautifulSoup


DATA_FILE = "news-data.json"
EXCLUDED_FILES = {"index.html", "template.html"}


def get_html_files():
    """
    뉴스 HTML 파일만 가져온다.
    숫자 파일명은 숫자가 큰 순서로 정렬한다.
    """

    files = [
        filename
        for filename in os.listdir(".")
        if filename.endswith(".html")
        and filename not in EXCLUDED_FILES
    ]

    def sort_key(filename):
        numbers = re.findall(r"\d+", filename)

        if numbers:
            return 1, int(numbers[0])

        return 0, 0

    files.sort(key=sort_key, reverse=True)

    return files


def get_git_created_date(filename):
    """
    Git 기록에서 해당 HTML 파일이 최초로 추가된 날짜를 가져온다.

    현재 작업 위치는 public/news이므로
    Git 명령에는 저장소 루트 기준 경로를 사용한다.
    """

    repository_path = f"public/news/{filename}"

    try:
        result = subprocess.run(
            [
                "git",
                "log",
                "--follow",
                "--diff-filter=A",
                "--format=%aI",
                "--reverse",
                "--",
                repository_path
            ],
            cwd="../..",
            capture_output=True,
            text=True,
            check=True
        )

        dates = [
            line.strip()
            for line in result.stdout.splitlines()
            if line.strip()
        ]

        if dates:
            created_datetime = datetime.fromisoformat(
                dates[0].replace("Z", "+00:00")
            )

            return created_datetime.strftime("%Y.%m.%d")

    except Exception as error:
        print(
            f"Git 최초 등록 날짜를 가져오지 못했습니다 "
            f"({filename}): {error}"
        )

    return None


def load_existing_dates():
    """
    Git 기록을 찾지 못했을 경우를 대비해
    기존 news-data.json 날짜를 불러온다.
    """

    if not os.path.exists(DATA_FILE):
        return {}

    try:
        with open(DATA_FILE, "r", encoding="utf-8") as file:
            existing_news = json.load(file)

        return {
            item.get("url"): item.get("date")
            for item in existing_news
            if item.get("url") and item.get("date")
        }

    except Exception as error:
        print(f"기존 날짜 데이터 읽기 실패: {error}")
        return {}


def clean_text(text):
    """
    줄바꿈과 여러 개의 공백을 하나로 정리한다.
    """

    return re.sub(r"\s+", " ", text).strip()


def extract_info(filename, existing_dates):
    with open(filename, "r", encoding="utf-8") as file:
        soup = BeautifulSoup(file.read(), "html.parser")

    title = filename

    if soup.title:
        title = soup.title.get_text()
        title = title.replace("| 모아픽 뉴스룸", "").strip()

    h1 = soup.find("h1")

    if h1:
        title = clean_text(h1.get_text())

    summary = ""

    hero = soup.find(class_=re.compile(r"hero", re.I))

    if hero:
        hero_paragraph = hero.find("p")

        if hero_paragraph:
            summary = clean_text(hero_paragraph.get_text())[:150]

    if not summary:
        summary_box = soup.find(
            class_=re.compile(r"summary|핵심.?요약", re.I)
        )

        if summary_box:
            summary = clean_text(summary_box.get_text())[:150]

    if not summary:
        paragraphs = soup.find_all("p")

        for paragraph in paragraphs:
            text = clean_text(paragraph.get_text())

            if len(text) > 20:
                summary = text[:150]
                break

    category = "뉴스"

    category_element = soup.find(
        class_=re.compile(r"category", re.I)
    )

    if category_element:
        category = clean_text(category_element.get_text())

    image = ""

    for img in soup.find_all("img"):
        src = img.get("src", "").strip()

        if (
            src
            and "logo" not in src.lower()
            and not src.startswith("data:")
        ):
            image = src
            print(f"Found image for {filename}: {image}")
            break

    if not image:
        image = (
            "https://images.unsplash.com/"
            "photo-1504711434969-e33886168f5c"
            "?q=80&w=800&auto=format&fit=crop"
        )

    # 가장 우선적으로 Git의 최초 추가 날짜 사용
    date = get_git_created_date(filename)

    # Git 기록이 없으면 기존 JSON 날짜 유지
    if not date:
        date = existing_dates.get(filename)

    # 둘 다 없으면 새 기사로 보고 오늘 날짜 입력
    if not date:
        date = datetime.now().strftime("%Y.%m.%d")

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
    existing_dates = load_existing_dates()

    news_list = []

    for filename in files:
        try:
            article_info = extract_info(
                filename,
                existing_dates
            )

            news_list.append(article_info)

        except Exception as error:
            print(f"Error processing {filename}: {error}")

    with open(DATA_FILE, "w", encoding="utf-8") as file:
        json.dump(
            news_list,
            file,
            ensure_ascii=False,
            indent=4
        )

    print(
        f"Successfully updated {DATA_FILE} "
        f"with {len(news_list)} items."
    )


if __name__ == "__main__":
    main()
