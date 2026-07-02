#!/usr/bin/env python3
"""
Project Landing Pages Generator

Generates bilingual (EN/AR) static HTML landing pages for each project
defined in data/projects/*.json.

Usage:
    python build-project.py

Output:
    ./{project}/index.html
    ./{project}/privacy_policy/index.html
    ./{project}/terms.html
    ./{project}/changelogs.html
    ./{project}/get-login.html
    ./ar/{project}/index.html
    ./ar/{project}/privacy_policy/index.html
    ./ar/{project}/terms.html
    ./ar/{project}/changelogs.html
    ./ar/{project}/get-login.html
"""

import json
import os
from datetime import datetime
from pathlib import Path

from jinja2 import Environment, FileSystemLoader, select_autoescape


def localize(data, lang):
    """Resolve _en / _ar suffixed keys based on selected language."""
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


def load_json(path):
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)


def load_projects():
    """Load all project JSON files except the template."""
    projects_dir = Path("data/projects")
    projects = []
    for path in sorted(projects_dir.glob("*.json")):
        if path.name == "_template.json":
            continue
        data = load_json(path)
        data["_source"] = path.name
        projects.append(data)
    return projects


def build_projects():
    portfolio = load_json("data/portfolio.json")
    projects = load_projects()

    env = Environment(
        loader=FileSystemLoader("templates"),
        autoescape=select_autoescape(["html", "xml"]),
        trim_blocks=True,
        lstrip_blocks=True,
    )

    templates = {
        "index": env.get_template("project/index.html"),
        "privacy": env.get_template("project/privacy.html"),
        "terms": env.get_template("project/terms.html"),
        "changelog": env.get_template("project/changelog.html"),
        "get_login": env.get_template("project/get-login.html"),
    }

    current_year = datetime.now().year

    nav_labels = {
        "en": {
            "back_to_portfolio": "← Back to Portfolio",
            "home": "Home",
            "privacy": "Privacy Policy",
            "terms": "Terms of Service",
            "changelog": "Changelog",
            "contact": "Contact",
            "legal": "Legal",
            "all_rights": "All rights reserved.",
            "toggle_theme": "Toggle theme",
            "switch_language": "Switch to Arabic",
            "menu": "Open menu",
            "view_github": "View on GitHub",
            "choose_plan": "Choose Plan",
            "request_purchase": "Request to Purchase",
            "send_request": "Send Request",
            "form_success": "Thank you! Your request has been sent successfully.",
            "form_error": "Something went wrong. Please try again.",
            "last_updated": "Last updated",
            "contact_us": "Contact Us",
            "contact_privacy_text": "If you have any questions, contact us at",
            "version": "Version",
            "latest": "Latest ✨",
            "testimonials": "What Our Users Say",
            "download": "Download",
        },
        "ar": {
            "back_to_portfolio": "العودة للمعرض →",
            "home": "الرئيسية",
            "privacy": "سياسة الخصوصية",
            "terms": "شروط الخدمة",
            "changelog": "سجل التحديثات",
            "contact": "تواصل",
            "legal": "قانوني",
            "all_rights": "جميع الحقوق محفوظة.",
            "toggle_theme": "تبديل المظهر",
            "switch_language": "Switch to English",
            "menu": "فتح القائمة",
            "view_github": "المشروع على GitHub",
            "choose_plan": "اختر الخطة",
            "request_purchase": "طلب شراء",
            "send_request": "إرسال الطلب",
            "form_success": "شكراً! تم إرسال طلبك بنجاح.",
            "form_error": "حدث خطأ ما. يرجى المحاولة مرة أخرى.",
            "last_updated": "آخر تحديث",
            "contact_us": "تواصل معنا",
            "contact_privacy_text": "إذا كان لديك أي أسئلة، تواصل معنا على",
            "version": "الإصدار",
            "latest": "أحدث إصدار ✨",
            "testimonials": "آراء المستخدمين",
            "download": "تحميل",
        },
    }

    other_lang_labels = {"en": "العربية", "ar": "English"}

    contact_form_endpoint = portfolio.get("contact", {}).get("form", {}).get("endpoint", "")
    contact_form_access_key = portfolio.get("contact", {}).get("form", {}).get("access_key", "")
    whatsapp_number = portfolio.get("personal", {}).get("whatsapp", "")
    whatsapp_message_en = portfolio.get("personal", {}).get("whatsapp_message_en", "")
    whatsapp_message_ar = portfolio.get("personal", {}).get("whatsapp_message_ar", "")
    site = portfolio.get("site", {})
    site["google_site_verification"] = portfolio.get("site", {}).get("google_site_verification", "")

    for project in projects:
        project_id = project["id"]

        for lang in ["en", "ar"]:
            dir_value = "rtl" if lang == "ar" else "ltr"
            other_lang = "ar" if lang == "en" else "en"

            localized = localize(project, lang)
            project_site = localize(project["site"], lang)
            # Merge portfolio site (for url/author/verification) with project site metadata.
            localized["site"] = {**site, **project_site}
            localized["settings"] = project.get("settings", {})

            def page_url(page="", is_ar=False):
                lang_prefix = "ar/" if (is_ar or lang == "ar") else ""
                if page:
                    return f"/{lang_prefix}{project_id}/{page}"
                return f"/{lang_prefix}{project_id}/"

            def other_page(page=""):
                other_prefix = "ar/" if lang == "en" else ""
                if page:
                    return f"/{other_prefix}{project_id}/{page}"
                return f"/{other_prefix}{project_id}/"

            def en_url(page=""):
                if page:
                    return f"/{project_id}/{page}"
                return f"/{project_id}/"

            def ar_url(page=""):
                if page:
                    return f"/ar/{project_id}/{page}"
                return f"/ar/{project_id}/"

            base_context = {
                "lang": lang,
                "dir": dir_value,
                "other_lang": other_lang,
                "other_lang_label": other_lang_labels[lang],
                "other_page": other_page,
                "current_year": current_year,
                "nav": nav_labels[lang],
                "site": localized["site"],
                "site_title": localized["site"]["title"],
                "site_description": localized["site"]["description"],
                "site_keywords": localized["site"]["keywords"],
                "whatsapp_number": whatsapp_number,
                "whatsapp_message": whatsapp_message_en if lang == "en" else whatsapp_message_ar,
                "contact_form_endpoint": contact_form_endpoint,
                "contact_form_access_key": contact_form_access_key,
                "analytics": portfolio.get("analytics", {}),
                **localized,
            }

            # Index page
            index_context = {
                **base_context,
                "page_path": page_url(),
                "page_url": page_url(),
                "en_url": en_url(),
                "ar_url": ar_url(),
                "privacy_url": page_url("privacy_policy/"),
                "terms_url": page_url("terms.html"),
                "changelog_url": page_url("changelogs.html"),
                "has_privacy": bool(localized.get("privacy")),
                "has_terms": bool(localized.get("terms")),
                "has_changelog": bool(localized.get("changelog")),
            }
            html = templates["index"].render(index_context)
            output = Path(project_id) / "index.html" if lang == "en" else Path("ar") / project_id / "index.html"
            output.parent.mkdir(parents=True, exist_ok=True)
            output.write_text(html, encoding="utf-8")
            print(f"Generated: {output}")

            # Privacy page
            if localized.get("privacy"):
                privacy_context = {
                    **base_context,
                    "page_path": page_url("privacy_policy/"),
                    "page_url": page_url("privacy_policy/"),
                    "en_url": en_url("privacy_policy/"),
                    "ar_url": ar_url("privacy_policy/"),
                    "privacy_url": page_url("privacy_policy/"),
                    "terms_url": page_url("terms.html"),
                    "changelog_url": page_url("changelogs.html"),
                    "has_privacy": True,
                    "has_terms": bool(localized.get("terms")),
                    "has_changelog": bool(localized.get("changelog")),
                }
                html = templates["privacy"].render(privacy_context)
                output = Path(project_id) / "privacy_policy" / "index.html" if lang == "en" else Path("ar") / project_id / "privacy_policy" / "index.html"
                output.parent.mkdir(parents=True, exist_ok=True)
                output.write_text(html, encoding="utf-8")
                print(f"Generated: {output}")

            # Terms page
            if localized.get("terms"):
                terms_context = {
                    **base_context,
                    "page_path": page_url("terms.html"),
                    "page_url": page_url("terms.html"),
                    "en_url": en_url("terms.html"),
                    "ar_url": ar_url("terms.html"),
                    "privacy_url": page_url("privacy_policy/"),
                    "terms_url": page_url("terms.html"),
                    "changelog_url": page_url("changelogs.html"),
                    "has_privacy": bool(localized.get("privacy")),
                    "has_terms": True,
                    "has_changelog": bool(localized.get("changelog")),
                }
                html = templates["terms"].render(terms_context)
                output = Path(project_id) / "terms.html" if lang == "en" else Path("ar") / project_id / "terms.html"
                output.parent.mkdir(parents=True, exist_ok=True)
                output.write_text(html, encoding="utf-8")
                print(f"Generated: {output}")

            # Changelog page
            if localized.get("changelog"):
                changelog_context = {
                    **base_context,
                    "page_path": page_url("changelogs.html"),
                    "page_url": page_url("changelogs.html"),
                    "en_url": en_url("changelogs.html"),
                    "ar_url": ar_url("changelogs.html"),
                    "privacy_url": page_url("privacy_policy/"),
                    "terms_url": page_url("terms.html"),
                    "changelog_url": page_url("changelogs.html"),
                    "has_privacy": bool(localized.get("privacy")),
                    "has_terms": bool(localized.get("terms")),
                    "has_changelog": True,
                }
                html = templates["changelog"].render(changelog_context)
                output = Path(project_id) / "changelogs.html" if lang == "en" else Path("ar") / project_id / "changelogs.html"
                output.parent.mkdir(parents=True, exist_ok=True)
                output.write_text(html, encoding="utf-8")
                print(f"Generated: {output}")

            # Get-login page
            if localized.get("get_login"):
                get_login_context = {
                    **base_context,
                    "page_path": page_url("get-login.html"),
                    "page_url": page_url("get-login.html"),
                    "en_url": en_url("get-login.html"),
                    "ar_url": ar_url("get-login.html"),
                    "nav": {**nav_labels[lang], "download": nav_labels[lang]["download"]},
                }
                html = templates["get_login"].render(get_login_context)
                output = Path(project_id) / "get-login.html" if lang == "en" else Path("ar") / project_id / "get-login.html"
                output.parent.mkdir(parents=True, exist_ok=True)
                output.write_text(html, encoding="utf-8")
                print(f"Generated: {output}")

    # Create redirect for old MEAAD privacy URL
    create_meaad_redirect()

    print("Project pages build complete.")


def create_meaad_redirect():
    """Redirect old /meaad/privacy.html to /meaad/privacy_policy/index.html"""
    redirect_html = """<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta http-equiv="refresh" content="0; url=./privacy_policy/">
  <title>Redirecting...</title>
</head>
<body>
  <p>Redirecting to <a href="./privacy_policy/">Privacy Policy</a>...</p>
</body>
</html>
"""
    path = Path("meaad/privacy.html")
    if path.exists():
        path.write_text(redirect_html, encoding="utf-8")
        print("Updated: meaad/privacy.html redirect")


if __name__ == "__main__":
    build_projects()
