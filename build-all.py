#!/usr/bin/env python3
"""
Unified build script for the portfolio and project landing pages.

Runs:
    1. build.py      — main portfolio pages (index + resume, EN/AR)
    2. build-project.py — project landing pages (EN/AR)
    3. sitemap.xml   — dynamic sitemap of all generated pages

Usage:
    python build-all.py
"""

import json
import subprocess
import sys
from datetime import datetime, timezone
from pathlib import Path


def load_json(path: str) -> dict:
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)


def load_projects(projects_dir: str = "data/projects") -> list[dict]:
    projects = []
    for path in sorted(Path(projects_dir).glob("*.json")):
        if path.name.startswith("_"):
            continue
        projects.append(load_json(path))
    return projects


def run_script(script: str) -> None:
    print(f"\n=== Running {script} ===")
    result = subprocess.run([sys.executable, script], cwd=Path(__file__).parent)
    if result.returncode != 0:
        raise RuntimeError(f"{script} failed with exit code {result.returncode}")


def collect_urls(base_url: str, projects: list[dict]) -> list[tuple[str, str]]:
    """Return a list of (url, priority) tuples for the sitemap."""
    urls = [
        (f"{base_url}/", "1.0"),
        (f"{base_url}/ar/", "1.0"),
        (f"{base_url}/resume.html", "0.8"),
        (f"{base_url}/ar/resume.html", "0.8"),
    ]

    for project in projects:
        project_id = project["id"]
        priority = "0.9" if project.get("featured") else "0.8"

        # Index pages
        urls.append((f"{base_url}/{project_id}/", priority))
        urls.append((f"{base_url}/ar/{project_id}/", priority))

        # Optional pages
        if project.get("privacy"):
            urls.append((f"{base_url}/{project_id}/privacy_policy/", "0.6"))
            urls.append((f"{base_url}/ar/{project_id}/privacy_policy/", "0.6"))

        if project.get("terms"):
            urls.append((f"{base_url}/{project_id}/terms.html", "0.6"))
            urls.append((f"{base_url}/ar/{project_id}/terms.html", "0.6"))

        if project.get("changelog"):
            urls.append((f"{base_url}/{project_id}/changelogs.html", "0.6"))
            urls.append((f"{base_url}/ar/{project_id}/changelogs.html", "0.6"))

        if project.get("get_login"):
            urls.append((f"{base_url}/{project_id}/get-login.html", "0.5"))
            urls.append((f"{base_url}/ar/{project_id}/get-login.html", "0.5"))

    return urls


def generate_sitemap(base_url: str, projects: list[dict], output: str = "sitemap.xml") -> None:
    today = datetime.now(timezone.utc).strftime("%Y-%m-%d")
    urls = collect_urls(base_url, projects)

    lines = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ]
    for url, priority in urls:
        lines.extend([
            "  <url>",
            f"    <loc>{url}</loc>",
            f"    <lastmod>{today}</lastmod>",
            f"    <priority>{priority}</priority>",
            "  </url>",
        ])
    lines.append("</urlset>")

    Path(output).write_text("\n".join(lines), encoding="utf-8")
    print(f"\nGenerated: {output} ({len(urls)} URLs)")


def main():
    portfolio = load_json("data/portfolio.json")
    base_url = portfolio.get("site", {}).get("url", "https://abdulrasol.github.io").rstrip("/")

    run_script("build.py")
    run_script("build-project.py")

    projects = load_projects()
    generate_sitemap(base_url, projects)

    print("\n=== All builds complete ===")


if __name__ == "__main__":
    main()
