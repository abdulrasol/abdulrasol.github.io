/**
 * Projects data file.
 *
 * ╔══════════════════════════════════════════════════════════════╗
 * ║  HOW TO ADD A NEW PROJECT:                                  ║
 * ║                                                              ║
 * ║  1. Add a new object to the array below                      ║
 * ║  2. Fill in the fields (see the examples)                    ║
 * ║  3. Put your project image in /static/ folder                ║
 * ║  4. Run: npm run build                                       ║
 * ╚══════════════════════════════════════════════════════════════╝
 *
 * Fields:
 *   title_en      — English title
 *   title_ar      — Arabic title
 *   desc_en       — English description
 *   desc_ar       — Arabic description
 *   image         — Path to image in /static/ (e.g. "/my_app.png")
 *   technologies  — Array of tech names
 *   githubUrl     — GitHub repo URL
 *   liveUrl       — Live demo URL (null if none)
 *   googlePlayUrl — Google Play URL (null if none)
 *   featured      — true to show the "Featured" badge
 *   stars         — GitHub star count
 */

export const projects = [
    {
        title_en: "Madarik: Knowledge Journey",
        title_ar: "مدارك: رحلة المعرفة",
        desc_en: "An engaging and educational quiz game designed to test and expand your knowledge with a focus on Islamic history and culture. Journey through levels, unlock achievements, and compete globally.",
        desc_ar: "لعبة تثقيفية وتعليمية مصممة لاختبار معارفك وتوسيعها مع التركيز على التاريخ والثقافة الإسلامية. سافر عبر المستويات، افتح الإنجازات، ونافس عالمياً.",
        image: "/madarik_banar.png",
        technologies: ["Flutter", "Dart", "Riverpod", "Hive"],
        githubUrl: "https://github.com/abdulrasol/madarik_knowledge_jounrny",
        liveUrl: "/madarik/",
        googlePlayUrl: "#",
        featured: true,
        stars: 0
    },
    {
        title_en: "Store Management",
        title_ar: "إدارة المتجر",
        desc_en: "Store Management App is your all-in-one solution for effortless store management. Track inventory, manage invoices, analyze sales, and stay connected with customers and suppliers.",
        desc_ar: "تطبيق إدارة المتجر هو الحل الشامل لإدارة المتجر بسهولة. تتبع المخزون، إدارة الفواتير، تحليل المبيعات، والبقاء على اتصال مع العملاء والموردين.",
        image: "/app_store_managment.png",
        technologies: ["Flutter", "Dart", "Getx", "ObjectBox"],
        githubUrl: "https://github.com/abdulrasol/store_management",
        liveUrl: null,
        googlePlayUrl: "https://play.google.com/store/apps/details?id=io.github.abdulrasol.store_mangment",
        featured: true,
        stars: 4
    },
    {
        title_en: "Store",
        title_ar: "متجر",
        desc_en: "Front-end store app built with Firebase backend. Free to clone and migrate your ads to run with your needs.",
        desc_ar: "تطبيق متجر للواجهة الأمامية مبني بخدمات Firebase. مجاني للاستنساخ وتعديله حسب احتياجاتك.",
        image: "/placeholder.svg",
        technologies: ["Flutter", "Firebase"],
        githubUrl: "https://github.com/abdulrasol/store",
        liveUrl: null,
        googlePlayUrl: null,
        featured: true,
        stars: 1
    },
    {
        title_en: "Solar Hub",
        title_ar: "مركز الطاقة الشمسية",
        desc_en: "App to design and calculate solar panel systems, share problems and solutions with the community and buying solar equipment.",
        desc_ar: "تطبيق لتصميم وحساب أنظمة الألواح الشمسية، مشاركة المشاكل والحلول مع المجتمع وشراء معدات الطاقة الشمسية.",
        image: "/placeholder.svg",
        technologies: ["Flutter", "Amazon Web Services"],
        githubUrl: "https://github.com/abdulrasol/solar-hub",
        liveUrl: null,
        googlePlayUrl: null,
        featured: true,
        stars: 0
    },
    {
        title_en: "Dot CV Creator",
        title_ar: "منشئ السيرة الذاتية",
        desc_en: "Simple tool to create CV in English and Arabic languages.",
        desc_ar: "أداة بسيطة لإنشاء سيرة ذاتية باللغتين العربية والإنجليزية.",
        image: "/placeholder.svg",
        technologies: ["Flutter Web"],
        githubUrl: "https://github.com/abdulrasol/dot_cv_creator",
        liveUrl: "https://dot-cv.netlify.app",
        googlePlayUrl: null,
        featured: true,
        stars: 0
    },
    {
        title_en: "Dot Weather",
        title_ar: "طقس دوت",
        desc_en: "Simple app to get weather data from API.",
        desc_ar: "تطبيق بسيط للحصول على بيانات الطقس من واجهة برمجة التطبيقات.",
        image: "/placeholder.svg",
        technologies: ["Flutter Desktop"],
        githubUrl: "https://github.com/abdulrasol/dot_weather",
        liveUrl: null,
        googlePlayUrl: null,
        featured: false,
        stars: 0
    },
    {
        title_en: "Simple CV Creator App",
        title_ar: "تطبيق إنشاء سيرة ذاتية بسيط",
        desc_en: "Simple CV Creator App built with Svelte and UIKit CSS. Create and download CVs easily.",
        desc_ar: "تطبيق بسيط لإنشاء السيرة الذاتية مبني بـ Svelte وUIKit CSS. أنشئ سيرتك الذاتية وقم بتحميلها بسهولة.",
        image: "/placeholder.svg",
        technologies: ["Svelte", "UIKit"],
        githubUrl: "https://github.com/abdulrasol/dot.cv-simple-cv-creator",
        liveUrl: "https://dot-cv.vercel.app",
        googlePlayUrl: null,
        featured: false,
        stars: 0
    },
    {
        title_en: "Loly OCR",
        title_ar: "Loly OCR",
        desc_en: "Online app that detects text from images and extracts it to Word or text file. Supports 24 languages with live edit before export.",
        desc_ar: "تطبيق عبر الإنترنت يكتشف النص من الصور ويستخرجه إلى ملف Word أو نص. يدعم 24 لغة مع التحرير المباشر قبل التصدير.",
        image: "/placeholder.svg",
        technologies: ["Python", "Flask", "HTML", "CSS", "JavaScript"],
        githubUrl: "https://github.com/abdulrasol/loly-ocr",
        liveUrl: null,
        googlePlayUrl: null,
        featured: false,
        stars: 0
    },
    {
        title_en: "Spimebook",
        title_ar: "Spimebook",
        desc_en: "A social media web application.",
        desc_ar: "تطبيق تواصل اجتماعي عبر الويب.",
        image: "/placeholder.svg",
        technologies: ["Python", "Django", "HTML", "CSS", "JavaScript"],
        githubUrl: "https://github.com/abdulrasol/spimebook",
        liveUrl: null,
        googlePlayUrl: null,
        featured: false,
        stars: 0
    }
];
