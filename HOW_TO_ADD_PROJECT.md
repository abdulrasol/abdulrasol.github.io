# كيفية إضافة مشروع جديد | How to Add a New Project

## الخطوات | Steps

### 1. أضف صورة المشروع | Add Project Image
ضع صورة المشروع في مجلد `svelte-app/static/`:
```bash
cp /path/to/your/image.png svelte-app/static/my_project.png
```

### 2. عدّل ملف المشاريع | Edit Projects File
افتح الملف `svelte-app/src/lib/data/projects.js` وأضف كائن جديد في المصفوفة:

```js
{
  title_en: "My New App",           // العنوان بالإنجليزية
  title_ar: "تطبيقي الجديد",        // العنوان بالعربية
  desc_en: "English description",   // الوصف بالإنجليزية
  desc_ar: "الوصف بالعربية",        // الوصف بالعربية
  image: "/my_project.png",         // مسار الصورة (من مجلد static)
  technologies: ["Flutter", "Dart"],
  githubUrl: "https://github.com/abdulrasol/my-repo",
  liveUrl: null,                     // أو رابط العرض المباشر
  googlePlayUrl: null,               // أو رابط Google Play
  featured: true,                    // true = يظهر شارة "مميز"
  stars: 0
}
```

> **ملاحظة:** أضف المشروع في بداية المصفوفة ليظهر أولاً، أو في النهاية ليظهر أخيراً.

### 3. ابنِ الموقع | Build
```bash
cd svelte-app
./node_modules/.bin/vite build
```

### 4. انسخ ملفات البناء | Deploy to Root
```bash
cd ..
cp svelte-app/build/index.html .
cp -r svelte-app/build/_app .
cp svelte-app/build/*.png .
cp svelte-app/build/*.svg .
```

### 5. ادفع للـ GitHub | Push
```bash
git add .
git commit -m "Add new project: My New App"
git push origin master
```

---

## أمر سريع (الكل مرة واحدة) | Quick One-Liner

```bash
cd svelte-app && ./node_modules/.bin/vite build && cd .. && cp svelte-app/build/index.html . && cp -r svelte-app/build/_app . && cp svelte-app/build/*.png . && cp svelte-app/build/*.svg . && git add . && git commit -m "Update portfolio" && git push origin master
```
