#!/usr/bin/env python3
"""
Meaad Tech Static Site Generator

Generates bilingual (EN/AR) static HTML files from data/*.json
and Jinja2 templates.

Usage:
    python build.py

Output:
    ./index.html
    ./ar/index.html
    ./resume.html
    ./ar/resume.html
    ./team/index.html
    ./ar/team/index.html
    ./team/[member]/index.html
    ./ar/team/[member]/index.html
    ./invest/index.html
    ./ar/invest/index.html
    ./invest/[id]/index.html
    ./ar/invest/[id]/index.html
    ./careers/index.html
    ./ar/careers/index.html
    ./sitemap.xml
"""

import json
import os
from datetime import datetime
from pathlib import Path

from jinja2 import Environment, FileSystemLoader, select_autoescape


def localize(data, lang):
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


def load_json(path):
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)


def load_project_data(projects_dir="data/projects"):
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


def build_portfolio_project_list(project_jsons, manual_list):
    """Derive portfolio project cards from project JSONs and append manual entries."""
    auto_pages = {p["id"] for p in project_jsons}
    portfolio_list = []

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

    for manual in manual_list:
        page = manual.get("links", {}).get("page") if isinstance(manual.get("links"), dict) else None
        if page:
            manual_id = page.strip("/").split("/")[0]
            if manual_id not in auto_pages:
                portfolio_list.append(manual)
        else:
            portfolio_list.append(manual)

    return portfolio_list


def generate_sitemap(pages, site_url):
    """Generate sitemap.xml with all pages."""
    xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
    
    for page in sorted(set(pages)):
        xml += '  <url>\n'
        xml += f'    <loc>{site_url}{page}</loc>\n'
        xml += f'    <lastmod>{datetime.now().strftime("%Y-%m-%d")}</lastmod>\n'
        xml += '    <changefreq>weekly</changefreq>\n'
        xml += '    <priority>0.8</priority>\n'
        xml += '  </url>\n'
    
    xml += '</urlset>'
    return xml


def lang_url(path, lang):
    """Return a URL with the correct language prefix.
    
    Examples:
        lang_url('/team/', 'en') -> '/team/'
        lang_url('/team/', 'ar') -> '/ar/team/'
        lang_url('/', 'ar') -> '/ar/'
    """
    if lang == "ar":
        if path == "/":
            return "/ar/"
        return f"/ar{path}"
    if path == "/ar/":
        return "/"
    if path.startswith("/ar/"):
        return path[3:]
    return path


def other_lang_path(path):
    """Convert a path from one language to the other.
    
    Examples:
        other_lang_path('/team/') -> '/ar/team/'
        other_lang_path('/ar/team/') -> '/team/'
        other_lang_path('/') -> '/ar/'
        other_lang_path('/ar/') -> '/'
    """
    if path == "/":
        return "/ar/"
    if path == "/ar/":
        return "/"
    if path.startswith("/ar/"):
        return path[3:]
    return f"/ar{path}"


def build_site():
    """Render all pages and copy static assets."""
    raw_data = load_json("data/portfolio.json")
    company_data = load_json("data/company.json")
    team_data = load_json("data/team.json")
    investments_data = load_json("data/investments.json")
    jobs_data = load_json("data/jobs.json")
    project_jsons = load_project_data()

    # Auto-populate project cards from project JSONs
    raw_data["projects"]["list"] = build_portfolio_project_list(
        project_jsons, raw_data.get("projects", {}).get("list", [])
    )

    # Build project lookup dict for templates
    projects_dict = {p["id"]: p for p in project_jsons}

    env = Environment(
        loader=FileSystemLoader("templates"),
        autoescape=select_autoescape(["html", "xml"]),
        trim_blocks=True,
        lstrip_blocks=True,
    )

    templates = {
        "index": env.get_template("index.html"),
        "resume": env.get_template("resume.html"),
        "team": env.get_template("team.html"),
        "team_member": env.get_template("team-member.html"),
        "invest": env.get_template("invest.html"),
        "invest_detail": env.get_template("invest-detail.html"),
        "careers": env.get_template("careers.html"),
    }
    current_year = datetime.now().year

    # Navigation labels
    nav_labels = {
        "en": {
            "home": "Home",
            "about": "About",
            "skills": "Skills",
            "services": "Services",
            "products": "Products",
            "projects": "Products",
            "contact": "Contact",
            "resume": "Founder",
            "experience": "Experience",
            "testimonials": "Testimonials",
            "team": "Team",
            "investors": "Invest",
            "careers": "Careers",
            "toggle_theme": "Toggle theme",
            "switch_language": "Switch to Arabic",
            "menu": "Open menu",
            "back_to_site": "Back to Site",
            "print_resume": "Print / Save as PDF",
        },
        "ar": {
            "home": "الرئيسية",
            "about": "من نحن",
            "skills": "المهارات",
            "services": "خدماتنا",
            "products": "منتجاتنا",
            "projects": "منتجاتنا",
            "contact": "تواصل",
            "resume": "المؤسس",
            "experience": "الخبرات",
            "testimonials": "آراء العملاء",
            "team": "الفريق",
            "investors": "للمستثمرين",
            "careers": "الوظائف",
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

    # Sitemap pages list
    sitemap_pages = ["/", "/resume.html", "/team/", "/invest/", "/careers/"]

    for lang in ["en", "ar"]:
        dir_value = "rtl" if lang == "ar" else "ltr"
        other_lang = "ar" if lang == "en" else "en"
        page_path = "/" if lang == "en" else "/ar/"

        localized = localize(raw_data, lang)
        company_localized = localize(company_data, lang)
        team_localized = localize(team_data, lang)
        investments_localized = localize(investments_data, lang)
        jobs_localized = localize(jobs_data, lang)

        # Keep site-level data separate
        localized["site"] = raw_data.get("site", {})
        localized["settings"] = raw_data.get("settings", {})

        # Helpers passed to templates for language-aware links
        def make_link(path):
            return lang_url(path, lang)

        def make_link_for(path, target_lang):
            return lang_url(path, target_lang)

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
            "company": company_localized,
            "team": team_localized,
            "investments": investments_localized,
            "jobs": jobs_localized,
            "projects_dict": projects_dict,
            "team_dict": {m["id"]: localize(m, lang) for m in team_data.get("members", [])},
            "link": make_link,
            "link_for": make_link_for,
            **localized,
        }

        # Generate homepage
        home_path = "/" if lang == "en" else "/ar/"
        home_ctx = {**context, "page_path": home_path, "other_page": other_lang_path(home_path)}
        html = templates["index"].render(home_ctx)
        output_path = Path("index.html") if lang == "en" else Path("ar") / "index.html"
        output_path.parent.mkdir(parents=True, exist_ok=True)
        output_path.write_text(html, encoding="utf-8")
        print(f"Generated: {output_path}")

        # Generate resume page
        resume_path_str = "/resume.html" if lang == "en" else "/ar/resume.html"
        resume_ctx = {**context, "page_path": resume_path_str, "other_page": other_lang_path(resume_path_str)}
        resume_html = templates["resume"].render(resume_ctx)
        resume_path = Path("resume.html") if lang == "en" else Path("ar") / "resume.html"
        resume_path.parent.mkdir(parents=True, exist_ok=True)
        resume_path.write_text(resume_html, encoding="utf-8")
        print(f"Generated: {resume_path}")

        # Generate team listing page
        team_path_str = "/team/" if lang == "en" else "/ar/team/"
        team_ctx = {**context, "page_path": team_path_str, "other_page": other_lang_path(team_path_str)}
        team_html = templates["team"].render(team_ctx)
        team_path = Path("team") / "index.html" if lang == "en" else Path("ar") / "team" / "index.html"
        team_path.parent.mkdir(parents=True, exist_ok=True)
        team_path.write_text(team_html, encoding="utf-8")
        print(f"Generated: {team_path}")
        sitemap_pages.append(f"/{'ar/' if lang == 'ar' else ''}team/")

        # Generate individual team member pages
        for member in team_data.get("members", []):
            member_path_str = f"/team/{member['id']}/" if lang == "en" else f"/ar/team/{member['id']}/"
            member_ctx = {
                **context,
                "page_path": member_path_str,
                "other_page": other_lang_path(member_path_str),
                "member": localize(member, lang),
            }
            member_html = templates["team_member"].render(member_ctx)
            member_path = Path("team") / member["id"] / "index.html" if lang == "en" else Path("ar") / "team" / member["id"] / "index.html"
            member_path.parent.mkdir(parents=True, exist_ok=True)
            member_path.write_text(member_html, encoding="utf-8")
            print(f"Generated: {member_path}")
            sitemap_pages.append(f"/{'ar/' if lang == 'ar' else ''}team/{member['id']}/")

        # Generate investment listing page
        invest_path_str = "/invest/" if lang == "en" else "/ar/invest/"
        invest_ctx = {**context, "page_path": invest_path_str, "other_page": other_lang_path(invest_path_str)}
        invest_html = templates["invest"].render(invest_ctx)
        invest_path = Path("invest") / "index.html" if lang == "en" else Path("ar") / "invest" / "index.html"
        invest_path.parent.mkdir(parents=True, exist_ok=True)
        invest_path.write_text(invest_html, encoding="utf-8")
        print(f"Generated: {invest_path}")
        sitemap_pages.append(f"/{'ar/' if lang == 'ar' else ''}invest/")

        # Generate individual investment pages
        for opp in investments_data.get("opportunities", []):
            opp_path_str = f"/invest/{opp['id']}/" if lang == "en" else f"/ar/invest/{opp['id']}/"
            opp_localized = localize(opp, lang)
            project_data = projects_dict.get(opp["project_id"])
            opp_ctx = {
                **context,
                "page_path": opp_path_str,
                "other_page": other_lang_path(opp_path_str),
                "opportunity": opp_localized,
                "project_data": localize(project_data, lang) if project_data else None,
            }
            opp_html = templates["invest_detail"].render(opp_ctx)
            opp_path = Path("invest") / opp["id"] / "index.html" if lang == "en" else Path("ar") / "invest" / opp["id"] / "index.html"
            opp_path.parent.mkdir(parents=True, exist_ok=True)
            opp_path.write_text(opp_html, encoding="utf-8")
            print(f"Generated: {opp_path}")
            sitemap_pages.append(f"/{'ar/' if lang == 'ar' else ''}invest/{opp['id']}/")

        # Generate careers page
        careers_path_str = "/careers/" if lang == "en" else "/ar/careers/"
        careers_ctx = {**context, "page_path": careers_path_str, "other_page": other_lang_path(careers_path_str)}
        careers_html = templates["careers"].render(careers_ctx)
        careers_path = Path("careers") / "index.html" if lang == "en" else Path("ar") / "careers" / "index.html"
        careers_path.parent.mkdir(parents=True, exist_ok=True)
        careers_path.write_text(careers_html, encoding="utf-8")
        print(f"Generated: {careers_path}")
        sitemap_pages.append(f"/{'ar/' if lang == 'ar' else ''}careers/")

    # Generate sitemap.xml
    sitemap_xml = generate_sitemap(sitemap_pages, raw_data["site"]["url"])
    Path("sitemap.xml").write_text(sitemap_xml, encoding="utf-8")
    print("Generated: sitemap.xml")

    print("Build complete.")


if __name__ == "__main__":
    build_site()
