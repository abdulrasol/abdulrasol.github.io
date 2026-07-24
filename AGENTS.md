# Meaad Tech — Project Agent Guide

> **For AI Agents / Developers:** This file explains the project architecture so you can add, modify, or extend any section without confusion.

---

## 1. What Is This Project?

A **bilingual (EN/AR) static website** for **Meaad Tech** — a software and solar energy solutions company based in Iraq. The site is generated using **Python + Jinja2** templates and deployed to **GitHub Pages**.

---

## 2. Quick Overview

| Component | Purpose |
|-----------|---------|
| `data/*.json` | All content (company info, team, projects, investments, jobs) |
| `templates/*.html` | Jinja2 templates that get rendered into static HTML |
| `build.py` | Generates the main site (homepage, resume, team, invest, careers) |
| `build-project.py` | Generates individual product landing pages |
| `build-images.py` | Converts PNG/JPG → WebP for performance |
| `static/css/style.css` | All styles (one file) |
| `static/js/main.js` | Theme toggle, mobile nav, scroll effects, contact form |
| `assets/` | Images, screenshots, logos for projects |

---

## 3. Project Structure

```
abdulrasol.github.io/
├── AGENTS.md                 ← You are here
├── README.md                 ← Human quick-start guide
├── data/
│   ├── portfolio.json          ← Main site config (hero, about, skills, contact)
│   ├── company.json            ← Company info (name, services, social)
│   ├── team.json               ← Team members (bio, skills, projects)
│   ├── investments.json        ← Investment opportunities (e.g., Watt)
│   ├── jobs.json               ← Open positions / hiring placeholder
│   └── projects/
│       ├── baytraq.json
│       ├── meaad.json
│       ├── meterlog.json
│       ├── madarik.json
│       ├── store-management.json
│       ├── watt.json           ← Solar energy platform
│       └── sweep.json          ← Mac developer cleaner (Rust/Tauri)
├── templates/
│   ├── base.html               ← Shared layout (header, footer, analytics)
│   ├── index.html              ← Homepage
│   ├── resume.html             ← Founder page (About the Founder)
│   ├── team.html               ← Team listing page
│   ├── team-member.html        ← Individual team member profile
│   ├── invest.html             ← Investment opportunities list
│   ├── invest-detail.html      ← Single investment pitch page
│   ├── careers.html            ← Jobs page
│   ├── product-page.html       ← Reusable product landing template
│   └── project/                ← Old per-project templates
│       ├── base.html
│       ├── index.html
│       ├── privacy.html
│       ├── terms.html
│       ├── changelog.html
│       └── get-login.html
├── static/
│   ├── css/style.css
│   ├── js/
│   │   ├── main.js
│   │   └── webp-loader.js
│   └── images/
│       ├── team/
│       └── projects/
├── assets/                     ← Project assets (logos, screenshots)
├── build.py                    ← Main site generator
├── build-project.py            ← Product page generator
├── build-images.py             ← WebP converter
├── build-all.py                ← Runs all three builders
├── requirements.txt            ← Python deps
├── sitemap.xml                 ← SEO sitemap
├── robots.txt                  ← SEO robots
├── index.html                  ← Generated EN homepage
├── resume.html                 ← Generated EN resume/founder
├── team/
│   └── index.html              ← Generated team page
├── invest/
│   ├── index.html              ← Generated investment list
│   └── watt/                   ← Generated investment detail
├── careers/
│   └── index.html              ← Generated careers page
└── ar/                         ← Generated Arabic pages (mirrors EN)
```

---

## 4. How Data Flows

```
data/*.json  →  build.py  →  templates/*.html  →  *.html
```

### Example:
1. `data/company.json` defines services
2. `templates/index.html` loops over `company.services`
3. `build.py` renders it → `index.html` + `ar/index.html`

---

## 5. Adding a New Section (Common Tasks)

### 5.1 Add a New Team Member

1. Open `data/team.json`
2. Add member object to `members` array:
```json
{
  "id": "ahmed-ali",
  "name_en": "Ahmed Ali",
  "name_ar": "أحمد علي",
  "role_en": "Flutter Developer",
  "role_ar": "مطور Flutter",
  "photo": "/static/images/team/ahmed.jpg",
  "bio_en": "...",
  "bio_ar": "...",
  "skills": ["Flutter", "Dart", "Firebase"],
  "social": { "github": "...", "linkedin": "..." },
  "projects": ["baytraq"],
  "featured": false
}
```
3. Add photo to `static/images/team/`
4. Run `python build.py`

**Page auto-generates at:** `/team/ahmed-ali/index.html` and `/ar/team/ahmed-ali/index.html`

---

### 5.2 Add a New Product/Project

1. Create `data/projects/myapp.json` (copy `_template.json` if exists)
2. Add assets to `assets/myapp/`
3. If product needs a landing page, it will auto-generate via `build-project.py`
4. If you want it on the homepage, add to `data/portfolio.json` → `projects.list`
5. Run `python build-project.py` then `python build.py`

---

### 5.3 Add an Investment Opportunity

1. Open `data/investments.json`
2. Add opportunity to `opportunities` array
3. Make sure `project_id` matches a project in `data/projects/`
4. Run `python build.py`

**Page auto-generates at:** `/invest/myapp/index.html`

---

### 5.4 Add a Job Opening

1. Open `data/jobs.json`
2. Add position to `positions` array
3. Run `python build.py`

---

### 5.5 Add a New Page Type

1. Create template: `templates/my-page.html`
2. Add builder logic to `build.py` (search for `build_site()` function)
3. Add nav link to `templates/base.html`
4. Run `python build.py`

---

## 6. Key Conventions

### Bilingual Content
- All data keys end with `_en` or `_ar`
- `build.py` uses `localize()` to flatten based on current language
- Example: `hero.headline_en` + `hero.headline_ar` → rendered as `hero.headline`

### Images
- Source: PNG/JPG in `assets/` and `static/images/`
- Run `python build-images.py` to generate WebP versions
- HTML uses `<picture>` tag with fallback:
```html
<picture>
  <source srcset="/assets/baytraq/logo.webp" type="image/webp">
  <img src="/assets/baytraq/logo.png" alt="Baytraq" loading="lazy">
</picture>
```

### SEO
- Every page has Open Graph tags
- `sitemap.xml` auto-generated
- Structured Data (JSON-LD) in `templates/base.html`
- Homepage = `Organization`, Products = `SoftwareApplication`, Team = `Person`

### Colors
- Primary: `#36ADA3` (Teal)
- Dark bg: `#0B0F1F`
- Light bg: `#F7F9FC`
- All in CSS variables (`:root`)

---

## 7. Build Commands

```bash
# Install dependencies
pip install -r requirements.txt

# Build everything
python build-all.py

# Or individually:
python build.py           # Main site
python build-project.py   # Product pages
python build-images.py    # WebP conversion

# Serve locally
python -m http.server 8000
```

---

## 8. Contact & Maintainer

- **Company:** Meaad Tech
- **Founder:** AbdulRasol Al-Hilo
- **Email:** abdulrasol.alhilo@gmail.com
- **GitHub:** @abdulrasol

---

*Last updated by AI agent on build day.*
