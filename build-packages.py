#!/usr/bin/env python3
import json
import os
from pathlib import Path
from datetime import datetime
import markdown
from jinja2 import Environment, FileSystemLoader, select_autoescape

DOC_TITLES = {
    "FROSTED_THEME.md": "🎨 Central Theme Tokens (FrostedThemeData)",
    "GLASS_SURFACES.md": "🔬 Shared Glass Rendering Architecture",
    "PERFORMANCE_ANALYSIS.md": "📊 Performance Analysis & Benchmarks",
}

def find_package_source_dir(package_id):
    candidates = [
        Path(f"_{package_id}"),
        Path("_frost_kit"),
        Path(f"../../flutter/{package_id}"),
        Path("../../flutter/frosted_ui_kit"),
        Path(f"../flutter/{package_id}"),
        Path("../flutter/frosted_ui_kit"),
        Path(f"../{package_id}"),
        Path("/Users/rasol/DevsTools/codes/flutter/frosted_ui_kit"),
    ]
    for c in candidates:
        if c.exists() and (c / "pubspec.yaml").exists():
            return c
    return None

def extract_version_from_pubspec(pkg_dir):
    pubspec = pkg_dir / "pubspec.yaml"
    if pubspec.exists():
        for line in pubspec.read_text(encoding="utf-8").splitlines():
            if line.startswith("version:"):
                return line.split(":", 1)[1].strip()
    return None

def assemble_markdown_from_docs(pkg_dir, preferred_sources=None):
    doc_dir = pkg_dir / "doc"
    if not doc_dir.exists():
        return None
    
    # Automatically discover all *.md files inside doc/
    all_files = {p.name: p for p in doc_dir.glob("*.md")}
    if not all_files:
        return None

    ordered_files = []
    # Primary catalog first
    if "FROSTED_UI_KIT.md" in all_files:
        ordered_files.append("FROSTED_UI_KIT.md")
    
    # Then preferred sources if provided
    if preferred_sources:
        for name in preferred_sources:
            if name in all_files and name not in ordered_files:
                ordered_files.append(name)
                
    # Then any remaining .md files in alphabetical order
    for name in sorted(all_files.keys()):
        if name not in ordered_files:
            ordered_files.append(name)
            
    sections = []
    for name in ordered_files:
        file_path = all_files[name]
        content = file_path.read_text(encoding="utf-8").strip()
        if not content:
            continue
        
        # Primary catalog keeps its original layout
        if name == "FROSTED_UI_KIT.md":
            sections.append(content)
        else:
            # Adjust headings for secondary doc sections
            title = DOC_TITLES.get(name)
            lines = content.splitlines()
            adjusted = []
            in_code = False
            first_h1_handled = False
            for line in lines:
                if line.startswith("```"):
                    in_code = not in_code
                if not in_code and line.startswith("#"):
                    if not first_h1_handled and line.startswith("# "):
                        clean_title = title if title else line.lstrip("#").strip()
                        adjusted.append(f"## {clean_title}")
                        first_h1_handled = True
                        continue
                    # Bump existing subheadings down by 1 level
                    adjusted.append("#" + line)
                    continue
                adjusted.append(line)
            
            section_md = "\n".join(adjusted)
            sections.append(f"\n\n---\n\n{section_md}")
            
    return "\n\n".join(sections) if sections else None

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

        # Check if source package repository exists to auto-sync docs and version
        pkg_dir = find_package_source_dir(package_id)
        if pkg_dir:
            print(f"[{package_id}] Found source package repo at: {pkg_dir}")
            auto_version = extract_version_from_pubspec(pkg_dir)
            if auto_version:
                data["version"] = auto_version
                print(f"[{package_id}] Synced version from pubspec.yaml: v{auto_version}")
                
            preferred_sources = data.get("doc_sources")
            assembled_md = assemble_markdown_from_docs(pkg_dir, preferred_sources)
            if assembled_md:
                print(f"[{package_id}] Assembled docs from all files in {pkg_dir}/doc")
                if "content_file" in data:
                    Path(data["content_file"]).write_text(assembled_md, encoding="utf-8")
            
            # Persist json changes so disk file stays up to date
            path.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
        
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
