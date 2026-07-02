# Abdulrasol Portfolio

A bilingual (English/Arabic), SEO-friendly personal portfolio and resume built with a Python static site generator.

---

## Quick Start

### Local Development

```bash
# 1. Install dependencies
pip install -r requirements.txt

# 2. Build the site
python build.py

# 3. Serve locally
python -m http.server 8000

# 4. Open http://localhost:8000
```

### Edit Your Content

All content lives in **`data/portfolio.json`**. Edit this file to update:

- Personal info (name, email, WhatsApp, social links)
- Hero text
- About section
- Skills
- Work experience
- Projects
- Testimonials
- Contact form settings

After editing, run `python build.py` to regenerate the HTML files.

---

## Project Structure

```
.
├── data/
│   └── portfolio.json          # All site content
├── templates/
│   ├── base.html               # Shared page layout
│   ├── index.html              # Homepage template
│   └── resume.html             # Resume/print page template
├── static/
│   ├── css/
│   │   └── style.css           # Design system
│   ├── js/
│   │   └── main.js             # Theme, language, mobile menu, animations
│   └── images/
│       └── profile.svg         # Replace with your photo
├── .github/workflows/
│   └── deploy.yml              # GitHub Actions deployment
├── build.py                    # Site generator
├── requirements.txt            # Python dependencies
├── index.html                  # Generated English homepage
├── resume.html                 # Generated English resume page
├── ar/
│   ├── index.html              # Generated Arabic homepage
│   └── resume.html             # Generated Arabic resume page
├── 404.html                    # Custom 404 page
├── sitemap.xml                 # SEO sitemap
├── robots.txt                  # SEO robots file
└── README.md                   # This file
```

---

## Deployment

This site deploys automatically to GitHub Pages via GitHub Actions.

1. Push changes to the `master` branch.
2. GitHub Actions runs `python build.py` and deploys the result.
3. Your site goes live at `https://abdulrasol.github.io`.

**Important:** Make sure GitHub Pages is configured to use GitHub Actions as the source in your repository settings.

---

## Add Your Photo

1. Add your professional photo to `static/images/`.
2. Update `data/portfolio.json`:

```json
"personal": {
  "photo": "/static/images/your-photo.jpg"
}
```

3. Run `python build.py`.

---

## Set Up Contact Form

The contact form uses [Web3Forms](https://web3forms.com/) (free, no signup required, 1000 submissions/month).

1. Get your access key from [web3forms.com](https://web3forms.com/).
2. Update `data/portfolio.json`:

```json
"contact": {
  "form": {
    "access_key": "YOUR_ACCESS_KEY_HERE"
  }
}
```

3. Run `python build.py`.

---

## Download Resume / CV

The site includes a dedicated resume page at `/resume.html` (and `/ar/resume.html`).

1. Click Download Resume on the homepage.
2. On the resume page, click Print / Save as PDF.
3. Use your browser's print dialog to save as PDF.

The resume page always stays in sync with `data/portfolio.json`.

---

## Add a New Project

1. Add project image to `assets/{project}/` or `static/images/projects/`.
2. Open `data/portfolio.json`.
3. Add a new object to `projects.list`:

```json
{
  "title_en": "My New App",
  "title_ar": "تطبيقي الجديد",
  "desc_en": "Short English description",
  "desc_ar": "وصف قصير بالعربية",
  "image": "/assets/myapp/logo.png",
  "category": "mobile",
  "featured": false,
  "technologies": ["Flutter", "Dart"],
  "links": {
    "page": "/myapp/",
    "googlePlay": null,
    "github": "https://github.com/abdulrasol/myapp",
    "facebook": null,
    "instagram": null
  }
}
```

4. Run `python build.py`.

---

## Language Support

- English: `/` and `/resume.html`
- Arabic: `/ar/` and `/ar/resume.html`

The default language is set in `data/portfolio.json` under `settings.default_lang`.

---

## Need Help?

If you see any issues after editing, run `python build.py` again and refresh your browser. Make sure your JSON is valid.

---

# معرض عبدالرسول الشخصي

موقع شخصي ثنائي اللغة (إنجليزي/عربي) وصديق لمحركات البحث، مبني بمولد مواقع ساكنة باستخدام Python.

---

## البدء السريع

```bash
# 1. تثبيت المتطلبات
pip install -r requirements.txt

# 2. بناء الموقع
python build.py

# 3. تشغيل محلي
python -m http.server 8000

# 4. افتح http://localhost:8000
```

### تعديل المحتوى

كل المحتوى موجود في **`data/portfolio.json`**. عدل هذا الملف لتحديث:

- المعلومات الشخصية
- نص الهيرو
- قسم من أنا
- المهارات
- الخبرات العملية
- المشاريع
- آراء العملاء
- إعدادات نموذج التواصل

بعد التعديل، شغل `python build.py` لإعادة توليد ملفات HTML.

---

## النشر

الموقع ينشر تلقائياً على GitHub Pages عبر GitHub Actions.

1. ادفع التغييرات إلى فرع `master`.
2. يقوم GitHub Actions بتشغيل `python build.py` ونشر النتيجة.
3. الموقع يعمل على `https://abdulrasol.github.io`.

**ملاحظة:** تأكد من ضبط GitHub Pages لاستخدام GitHub Actions كمصدر في إعدادات المستودع.

---

## إضافة صورتك الشخصية

1. ضع صورتك في `static/images/`.
2. حدث `data/portfolio.json`:

```json
"personal": {
  "photo": "/static/images/your-photo.jpg"
}
```

3. شغل `python build.py`.

---

## إعداد نموذج التواصل

نموذج التواصل يستخدم [Web3Forms](https://web3forms.com/) (مجاني، لا يحتاج تسجيل، 1000 رسالة/شهر).

1. احصل على مفتاح الوصول من [web3forms.com](https://web3forms.com/).
2. حدث `data/portfolio.json`:

```json
"contact": {
  "form": {
    "access_key": "YOUR_ACCESS_KEY_HERE"
  }
}
```

3. شغل `python build.py`.

---

## تحميل السيرة الذاتية

الموقع يحتوي على صفحة سيرة ذاتية في `/resume.html` و `/ar/resume.html`.

1. اضغط على تحميل السيرة الذاتية من الصفحة الرئيسية.
2. في صفحة السيرة، اضغط طباعة / حفظ كـ PDF.
3. استخدم خاصية الطباعة في المتصفح لحفظ الملف PDF.

---

## إضافة مشروع جديد

1. أضف صورة المشروع إلى `assets/{project}/`.
2. افتح `data/portfolio.json`.
3. أضف كائن جديد إلى `projects.list`.
4. شغل `python build.py`.
