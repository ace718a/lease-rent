#!/usr/bin/env python3
"""Generate the deployed sitemap from public HTML files in this repository."""

from __future__ import annotations

import fnmatch
import os
import subprocess
import xml.etree.ElementTree as ET
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path, PurePosixPath
from urllib.parse import quote


BASE_URL = "https://moapick.co.kr"
REPOSITORY_ROOT = Path(__file__).resolve().parents[1]
PUBLIC_ROOT = REPOSITORY_ROOT / "public"
SITEMAP_PATH = PUBLIC_ROOT / "sitemap.xml"
ROBOTS_PATH = PUBLIC_ROOT / "robots.txt"
PUBLIC_DIRECTORIES = ("24-guide", "rent-guide", "info", "news")
EXCLUDED_NAME_PARTS = ("backup", "test", "template", "old", "copy")


@dataclass(frozen=True)
class SitemapEntry:
    url: str
    last_modified: str


def is_hidden(path: Path) -> bool:
    return any(part.startswith(".") for part in path.parts)


def is_excluded_file(path: Path) -> bool:
    name = path.name.casefold()
    return (
        name == "404.html"
        or any(word in name for word in EXCLUDED_NAME_PARTS)
        or is_hidden(path)
        or ".github" in path.parts
        or "img" in (part.casefold() for part in path.parts)
    )


def candidate_files() -> list[Path]:
    candidates = list(REPOSITORY_ROOT.glob("*.html"))
    for directory in PUBLIC_DIRECTORIES:
        folder = PUBLIC_ROOT / directory
        if folder.is_dir():
            candidates.extend(folder.glob("*.html"))
    return sorted(
        {path.resolve() for path in candidates if not is_excluded_file(path.relative_to(REPOSITORY_ROOT))},
        key=lambda path: path.as_posix().casefold(),
    )


def deployed_path(path: Path) -> str:
    relative = path.relative_to(PUBLIC_ROOT) if path.is_relative_to(PUBLIC_ROOT) else path.relative_to(REPOSITORY_ROOT)
    posix = PurePosixPath(relative.as_posix())
    if posix.name.casefold() == "index.html":
        parent = posix.parent.as_posix()
        return "/" if parent == "." else f"/{parent}/"
    return f"/{posix.as_posix()}"


def robots_disallow_rules() -> list[str]:
    if not ROBOTS_PATH.exists():
        return []

    rules: list[str] = []
    applies = False
    for raw_line in ROBOTS_PATH.read_text(encoding="utf-8-sig").splitlines():
        line = raw_line.split("#", 1)[0].strip()
        if not line or ":" not in line:
            continue
        field, value = (part.strip() for part in line.split(":", 1))
        field = field.casefold()
        if field == "user-agent":
            applies = value == "*"
        elif field == "disallow" and applies and value:
            rules.append(value)
    return rules


def is_disallowed(url_path: str, rules: list[str]) -> bool:
    for rule in rules:
        pattern = rule
        if pattern.endswith("$"):
            if fnmatch.fnmatchcase(url_path, pattern[:-1]):
                return True
        elif "*" in pattern:
            if fnmatch.fnmatchcase(url_path, f"{pattern}*"):
                return True
        elif url_path.startswith(pattern):
            return True
    return False


def last_modified(path: Path) -> str:
    relative = path.relative_to(REPOSITORY_ROOT)
    try:
        result = subprocess.run(
            ["git", "log", "-1", "--format=%cs", "--", relative.as_posix()],
            cwd=REPOSITORY_ROOT,
            check=True,
            capture_output=True,
            text=True,
        )
        date = result.stdout.strip()
        if date:
            return date
    except (FileNotFoundError, subprocess.CalledProcessError):
        pass
    return datetime.fromtimestamp(path.stat().st_mtime, tz=timezone.utc).date().isoformat()


def build_entries() -> tuple[list[SitemapEntry], list[Path]]:
    rules = robots_disallow_rules()
    entries: dict[str, SitemapEntry] = {}
    excluded: list[Path] = []
    for path in candidate_files():
        url_path = deployed_path(path)
        if is_disallowed(url_path, rules):
            excluded.append(path)
            continue
        encoded_path = quote(url_path, safe="/-._~")
        url = f"{BASE_URL}{encoded_path}"
        entries[url] = SitemapEntry(url=url, last_modified=last_modified(path))
    return sorted(entries.values(), key=lambda entry: entry.url), excluded


def write_sitemap(entries: list[SitemapEntry]) -> None:
    ET.register_namespace("", "http://www.sitemaps.org/schemas/sitemap/0.9")
    namespace = "http://www.sitemaps.org/schemas/sitemap/0.9"
    urlset = ET.Element(f"{{{namespace}}}urlset")
    for entry in entries:
        url = ET.SubElement(urlset, f"{{{namespace}}}url")
        ET.SubElement(url, f"{{{namespace}}}loc").text = entry.url
        ET.SubElement(url, f"{{{namespace}}}lastmod").text = entry.last_modified
    ET.indent(urlset, space="  ")
    content = ET.tostring(urlset, encoding="unicode", xml_declaration=True) + "\n"
    SITEMAP_PATH.write_text(content, encoding="utf-8", newline="\n")


def main() -> None:
    entries, robots_excluded = build_entries()
    write_sitemap(entries)
    print(f"Generated {SITEMAP_PATH.relative_to(REPOSITORY_ROOT)} with {len(entries)} URLs.")
    for path in robots_excluded:
        print(f"Excluded by robots.txt: {path.relative_to(REPOSITORY_ROOT).as_posix()}")


if __name__ == "__main__":
    main()
