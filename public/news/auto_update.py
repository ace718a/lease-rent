import os
import json
import re
import subprocess
from datetime import datetime, timezone, timedelta

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

KST = timezone(timedelta(hours=9))


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


def clean_text(text):
    """
    줄바꿈과 여러 개의 공백을 하나로 정리한다.
    """

    return re.sub(r"\s+", " ", text).strip()


def normalize_date(year, month, day):
    """
    날짜를 YYYY.MM.DD 형식으로 통일한다.
    잘못된 날짜라면 None을 반환한다.
    """

    try:
        parsed_date = datetime(
            int(year),
            int(month),
            int(day)
        )

        return parsed_date.strftime("%Y.%m.%d")

    except ValueError:
        return None


def get_html_published_date(soup):
    """
    HTML에 직접 작성된 입력 날짜를 가져온다.

    지원 형식:
    입력: 2026.07.20
    입력 : 2026-07-20
    입력: 2026/07/20

    또는:
    <meta property="article:published_time"
          content="2026-07-20">
    """

    meta_selectors = [
        ("property", "article:published_time"),
        ("name", "article:published_time"),
        ("name", "date"),
        ("name", "publish_date"),
        ("name", "published_time")
    ]

    for attribute, value in meta_selectors:
        meta_tag = soup.find("meta", attrs={attribute: value})

        if not meta_tag:
            continue

        content = meta_tag.get("content", "").strip()

        date_match = re.search(
            r"(\d{4})[.\-/](\d{1,2})[.\-/](\d{1,2})",
            content
        )

        if date_match:
            normalized = normalize_date(
                date_match.group(1),
                date_match.group(2),
                date_match.group(3)
            )

            if normalized:
                return normalized

    page_text = clean_text(
        soup.get_text(" ", strip=True)
    )

    input_date_match = re.search(
        r"입력\s*[:：]?\s*"
        r"(\d{4})[.\-/](\d{1,2})[.\-/](\d{1,2})",
        page_text
    )

    if input_date_match:
        normalized = normalize_date(
            input_date_match.group(1),
            input_date_match.group(2),
            input_date_match.group(3)
        )

        if normalized:
            return normalized

    return None


def get_git_created_date(filename):
    """
    Git 기록에서 해당 HTML 파일이 최초로 추가된 날짜를 가져온다.

    Git 커밋 시간이 UTC 또는 해외 시간으로 기록됐더라도
    한국시간으로 변환한 뒤 날짜를 반환한다.
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

            if created_datetime.tzinfo is None:
                created_datetime = created_datetime.replace(
                    tzinfo=timezone.utc
                )

            created_datetime_kst = created_datetime.astimezone(KST)

            return created_datetime_kst.strftime("%Y.%m.%d")

    except Exception as error:
        print(
            f"Git 최초 등록 날짜를 가져오지 못했습니다 "
            f"({filename}): {error}"
        )

    return None


def load_existing_dates():
    """
    기존 news-data.json에 저장된 날짜를 불러온다.
    HTML에 입력 날짜가 없는 기존 기사의 날짜를 유지한다.
    """

    if not os.path.exists(DATA_FILE):
        return {}

    try:
        with open(
            DATA_FILE,
            "r",
            encoding="utf-8"
        ) as file:
            existing_news = json.load(file)

        return {
            item.get("url"): item.get("date")
            for item in existing_news
            if item.get("url") and item.get("date")
        }

    except Exception as error:
        print(f"기존 날짜 데이터 읽기 실패: {error}")
        return {}


def make_absolute_image_url(src):
    """
    상대 이미지 경로를 모아픽 절대 주소로 변경한다.

    img/example.png
    → https://moapick.co.kr/news/img/example.png
    """

    src = src.strip()

    if not src:
        return ""

    if src.startswith(("http://", "https://")):
        return src

    if src.startswith("/"):
        return f"https://moapick.co.kr{src}"

    return (
        "https://moapick.co.kr/news/"
        + src.lstrip("./")
    )


def extract_info(filename, existing_dates):
    with open(
        filename,
        "r",
        encoding="utf-8"
    ) as file:
        soup = BeautifulSoup(
            file.read(),
            "html.parser"
        )

    title = filename

    if soup.title:
        title = clean_text(
            soup.title.get_text()
        )

        title = title.replace(
            "| 모아픽 뉴스룸",
            ""
        ).strip()

    h1 = soup.find("h1")

    if h1:
        title = clean_text(
            h1.get_text()
        )

    summary = ""

    hero = soup.find(
        class_=re.compile(r"hero", re.I)
    )

    if hero:
        hero_paragraph = hero.find("p")

        if hero_paragraph:
            summary = clean_text(
                hero_paragraph.get_text()
            )[:150]

    if not summary:
        summary_box = soup.find(
            class_=re.compile(
                r"summary|핵심.?요약",
                re.I
            )
        )

        if summary_box:
            summary = clean_text(
                summary_box.get_text()
            )[:150]

    if not summary:
        meta_description = soup.find(
            "meta",
            attrs={"name": "description"}
        )

        if meta_description:
            summary = clean_text(
                meta_description.get(
                    "content",
                    ""
                )
            )[:150]

    if not summary:
        paragraphs = soup.find_all("p")

        for paragraph in paragraphs:
            text = clean_text(
                paragraph.get_text()
            )

            # 입력 날짜나 사진 설명은 요약에서 제외
            if text.startswith("입력"):
                continue

            if len(text) > 20:
                summary = text[:150]
                break

    category = "뉴스"

    category_element = soup.find(
        class_=re.compile(
            r"category",
            re.I
        )
    )

    if category_element:
        category = clean_text(
            category_element.get_text()
        )

    image = ""

    og_image = soup.find(
        "meta",
        attrs={"property": "og:image"}
    )

    if og_image:
        image = og_image.get(
            "content",
            ""
        ).strip()

    if not image:
        for img in soup.find_all("img"):
            src = img.get("src", "").strip()

            if (
                src
                and "logo" not in src.lower()
                and not src.startswith("data:")
            ):
                image = make_absolute_image_url(src)

                print(
                    f"Found image for {filename}: "
                    f"{image}"
                )

                break

    if not image:
        image = (
            "https://images.unsplash.com/"
            "photo-1504711434969-e33886168f5c"
            "?q=80&w=800&auto=format&fit=crop"
        )

    # 1순위: HTML 본문 또는 메타태그에 직접 적힌 날짜
    date = get_html_published_date(soup)

    if date:
        print(
            f"HTML 입력 날짜 사용 "
            f"({filename}): {date}"
        )

    # 2순위: 기존 news-data.json 날짜 유지
    if not date:
        date = existing_dates.get(filename)

        if date:
            print(
                f"기존 JSON 날짜 유지 "
                f"({filename}): {date}"
            )

    # 3순위: Git 최초 등록 날짜를 한국시간으로 변환
    if not date:
        date = get_git_created_date(filename)

        if date:
            print(
                f"Git 최초 등록 날짜 사용 "
                f"({filename}): {date}"
            )

    # 4순위: 모든 날짜 정보가 없으면 한국시간 오늘 날짜
    if not date:
        date = datetime.now(KST).strftime(
            "%Y.%m.%d"
        )

        print(
            f"한국시간 오늘 날짜 사용 "
            f"({filename}): {date}"
        )

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
            print(
                f"Error processing "
                f"{filename}: {error}"
            )

    with open(
        DATA_FILE,
        "w",
        encoding="utf-8"
    ) as file:
        json.dump(
            news_list,
            file,
            ensure_ascii=False,
            indent=4
        )

    print(
        f"Successfully updated "
        f"{DATA_FILE} with "
        f"{len(news_list)} items."
    )


if __name__ == "__main__":
    main()
