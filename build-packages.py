#!/usr/bin/env python3
import json
import os
from pathlib import Path
from datetime import datetime
import markdown
from jinja2 import Environment, FileSystemLoader, select_autoescape

def localize(data, lang="en"):
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

def build_packages():
    portfolio = json.loads(Path("data/portfolio.json").read_text(encoding="utf-8"))
    company = json.loads(Path("data/company.json").read_text(encoding="utf-8"))
    site = portfolio.get("site", {})
    
    env = Environment(
        loader=FileSystemLoader("templates"),
        autoescape=select_autoescape(["html", "xml"]),
        trim_blocks=True,
        lstrip_blocks=True,
    )
    template = env.get_template("package.html")
    
    packages_dir = Path("data/packages")
    if not packages_dir.exists():
        print("No packages found.")
        return
        
    for path in packages_dir.glob("*.json"):
        if path.name.startswith("_"):
            continue
            
        data = json.loads(path.read_text(encoding="utf-8"))
        package_id = data["id"]
        
        md_content = ""
        md_toc = ""
        
        if "content_file" in data:
            md_path = Path(data["content_file"])
            if md_path.exists():
                md_text = md_path.read_text(encoding="utf-8")
                md = markdown.Markdown(extensions=['fenced_code', 'tables', 'toc'])
                md_content = md.convert(md_text)
                md_toc = md.toc
                
        # Only build English version for docs
        localized = localize(data, "en")
        company_localized = localize(company, "en")
        
        context = {
            "lang": "en",
            "dir": "ltr",
            "site_title": localized.get("name", ""),
            "site_description": localized.get("description", ""),
            "site": site,
            "company": company_localized,
            "personal": portfolio.get("personal", {}),
            "footer": portfolio.get("footer", {}),
            "current_year": 2026,
            "content_html": md_content,
            "toc_html": md_toc,
            "page_name": "package",
            **localized
        }
        
        html = template.render(context)
        out_dir = Path(f"packages/{package_id}")
        out_dir.mkdir(parents=True, exist_ok=True)
        out_path = out_dir / "index.html"
        out_path.write_text(html, encoding="utf-8")
        print(f"Generated: {out_path}")
        
        # Append to sitemap.xml
        sitemap_path = Path("sitemap.xml")
        if sitemap_path.exists():
            sitemap_content = sitemap_path.read_text(encoding="utf-8")
            site_url = site.get("url", "https://abdulrasol.github.io").rstrip("/")
            url_block = f"""  <url>
    <loc>{site_url}/packages/{package_id}/</loc>
    <lastmod>{datetime.now().strftime("%Y-%m-%d")}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>"""
            sitemap_content = sitemap_content.replace("</urlset>", url_block)
            sitemap_path.write_text(sitemap_content, encoding="utf-8")

if __name__ == "__main__":
    build_packages()
