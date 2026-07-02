#!/usr/bin/env python3
"""
Portfolio Static Site Generator

Generates bilingual (EN/AR) static HTML files from data/portfolio.json
and Jinja2 templates.

Usage:
    python build.py

Output:
    ./index.html
    ./ar/index.html
"""

import json
import os
import shutil
from datetime import datetime
from pathlib import Path

from jinja2 import Environment, FileSystemLoader, select_autoescape


def localize(data: dict | list, lang: str) -> dict | list:
    """
    Resolve _en / _ar suffixed keys based on the selected language.
    Returns a flattened data structure with language-neutral keys.
    """
    if isinstance(data, dict):
        result = {}
        for key, value in data.items():
            if key.endswith("_en"):
                if lang == "en":
                    result[key[:-3]] = localize(value, lang)
            elif key.endswith("_ar"):
                if lang == "ar":
                    result[key[:-3]] = localize(value, lang)
            else:
                result[key] = localize(value, lang)
        return result
    elif isinstance(data, list):
        return [localize(item, lang) for item in data]
    return data


def load_data() -> dict:
    """Load and return raw portfolio data."""
    with open("data/portfolio.json", "r", encoding="utf-8") as f:
        return json.load(f)


def load_project_data(projects_dir: str = "data/projects") -> list[dict]:
    """Load all project JSON files and return them sorted by ID."""
    projects = []
    path = Path(projects_dir)
    if not path.exists():
        return projects

    for file in sorted(path.glob("*.json")):
        if file.name.startswith("_"):
            continue
        with open(file, "r", encoding="utf-8") as f:
            projects.append(json.load(f))
    return projects


def build_portfolio_project_list(project_jsons: list[dict], manual_list: list[dict]) -> list[dict]:
    """Derive portfolio project cards from project JSONs and append manual entries."""
    auto_pages = {p["id"] for p in project_jsons}
    portfolio_list = []

    # Featured projects first, then alphabetical by id.
    sorted_projects = sorted(project_jsons, key=lambda p: (not p.get("featured", False), p["id"]))

    for project in sorted_projects:
        portfolio_list.append(
            {
                "id": project["id"],
                "title_en": project["brand"]["name_en"],
                "title_ar": project["brand"]["name_ar"],
                "desc_en": project["site"]["description_en"],
                "desc_ar": project["site"]["description_ar"],
                "image": project["brand"]["logo"],
                "category": project.get("category", "mobile"),
                "featured": project.get("featured", False),
                "technologies": project.get("technologies", []),
                "links": {
                    "page": f"/{project['id']}/",
                    "googlePlay": project["links"].get("googlePlay"),
                    "github": project["links"].get("github"),
                    "facebook": project["links"].get("facebook"),
                    "instagram": project["links"].get("instagram"),
                },
            }
        )

    # Preserve any manual entries that do not correspond to a project JSON.
    for manual in manual_list:
        page = manual.get("links", {}).get("page") if isinstance(manual.get("links"), dict) else None
        if page:
            # Extract project id from path like "/meterlog/"
            manual_id = page.strip("/").split("/")[0]
            if manual_id not in auto_pages:
                portfolio_list.append(manual)
        else:
            portfolio_list.append(manual)

    return portfolio_list


def build_site():
    """Render all pages and copy static assets."""
    raw_data = load_data()
    project_jsons = load_project_data()

    # Auto-populate project cards from project JSONs.
    raw_data["projects"]["list"] = build_portfolio_project_list(
        project_jsons, raw_data.get("projects", {}).get("list", [])
    )

    env = Environment(
        loader=FileSystemLoader("templates"),
        autoescape=select_autoescape(["html", "xml"]),
        trim_blocks=True,
        lstrip_blocks=True,
    )

    index_template = env.get_template("index.html")
    resume_template = env.get_template("resume.html")
    current_year = datetime.now().year

    # Navigation labels
    nav_labels = {
        "en": {
            "about": "About",
            "skills": "Skills",
            "projects": "Projects",
            "contact": "Contact",
            "resume": "Resume",
            "experience": "Experience",
            "testimonials": "Testimonials",
            "toggle_theme": "Toggle theme",
            "switch_language": "Switch to Arabic",
            "menu": "Open menu",
            "back_to_site": "Back to Site",
            "print_resume": "Print / Save as PDF",
        },
        "ar": {
            "about": "من أنا",
            "skills": "المهارات",
            "projects": "المشاريع",
            "contact": "تواصل",
            "resume": "السيرة الذاتية",
            "experience": "الخبرات",
            "testimonials": "آراء العملاء",
            "toggle_theme": "تبديل المظهر",
            "switch_language": "Switch to English",
            "menu": "فتح القائمة",
            "back_to_site": "العودة للموقع",
            "print_resume": "طباعة / حفظ كـ PDF",
        },
    }

    other_lang_labels = {
        "en": "العربية",
        "ar": "English",
    }

    for lang in ["en", "ar"]:
        dir_value = "rtl" if lang == "ar" else "ltr"
        other_lang = "ar" if lang == "en" else "en"
        page_path = "/" if lang == "en" else "/ar/"

        localized = localize(raw_data, lang)

        # Keep site-level data separate (URLs, verification codes, etc. are not translated)
        localized["site"] = raw_data.get("site", {})
        localized["settings"] = raw_data.get("settings", {})

        context = {
            "lang": lang,
            "dir": dir_value,
            "other_lang": other_lang,
            "other_lang_label": other_lang_labels[lang],
            "other_page": "/ar/" if lang == "en" else "/",
            "page_path": page_path,
            "current_year": current_year,
            "nav": nav_labels[lang],
            "site_title": localized["site"][f"title_{lang}"],
            "site_description": localized["site"][f"description_{lang}"],
            "site_keywords": localized["site"][f"keywords_{lang}"],
            **localized,
        }

        # Generate homepage
        html = index_template.render(context)
        output_path = Path("index.html") if lang == "en" else Path("ar") / "index.html"
        output_path.parent.mkdir(parents=True, exist_ok=True)
        output_path.write_text(html, encoding="utf-8")
        print(f"Generated: {output_path}")

        # Generate resume page
        resume_html = resume_template.render(context)
        resume_path = Path("resume.html") if lang == "en" else Path("ar") / "resume.html"
        resume_path.parent.mkdir(parents=True, exist_ok=True)
        resume_path.write_text(resume_html, encoding="utf-8")
        print(f"Generated: {resume_path}")

    print("Build complete.")


if __name__ == "__main__":
    build_site()
