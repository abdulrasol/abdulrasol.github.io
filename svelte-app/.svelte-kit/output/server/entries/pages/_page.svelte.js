import { a as attr_class, s as store_get, e as ensure_array_like, u as unsubscribe_stores, b as attr_style, c as stringify, d as attr, h as head } from "../../chunks/index2.js";
import { t, l as locale } from "../../chunks/i18n.js";
import { e as escape_html } from "../../chunks/context.js";
function html(value) {
  var html2 = String(value ?? "");
  var open = "<!---->";
  return open + html2 + "<!---->";
}
function Navigation($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let scrolled = false;
    const navItems = [
      { id: "top", key: "nav.home" },
      { id: "skills", key: "nav.skills" },
      { id: "projects", key: "nav.projects" },
      { id: "contact", key: "nav.contact" }
    ];
    $$renderer2.push(`<nav${attr_class("navbar svelte-ocbj1u", void 0, { "scrolled": scrolled })}><div class="container nav-inner svelte-ocbj1u"><button class="nav-logo svelte-ocbj1u"><img src="/logo.png" alt="logo" width="28" height="28" class="svelte-ocbj1u"/> <span class="text-gradient">${escape_html(t("nav.title", store_get($$store_subs ??= {}, "$locale", locale)))}</span></button> <div class="nav-links svelte-ocbj1u"><button class="lang-toggle svelte-ocbj1u">${escape_html(store_get($$store_subs ??= {}, "$locale", locale) === "en" ? "عربي" : "English")}</button> <!--[-->`);
    const each_array = ensure_array_like(navItems);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let item = each_array[$$index];
      $$renderer2.push(`<button class="nav-link svelte-ocbj1u">${escape_html(t(item.key, store_get($$store_subs ??= {}, "$locale", locale)))}</button>`);
    }
    $$renderer2.push(`<!--]--></div> <button class="hamburger svelte-ocbj1u" aria-label="Menu">`);
    {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`);
    }
    $$renderer2.push(`<!--]--></button></div> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></nav>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
function Hero($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    $$renderer2.push(`<section class="hero svelte-1q37ri0"><div class="hero-bg svelte-1q37ri0"><div class="orb orb-1 animate-float svelte-1q37ri0"></div> <div class="orb orb-2 animate-float svelte-1q37ri0" style="animation-delay: 1s"></div> <div class="orb orb-3 animate-float svelte-1q37ri0" style="animation-delay: 2s"></div></div> <div class="container hero-content svelte-1q37ri0"><div class="hero-icons animate-fade-in svelte-1q37ri0"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg> <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg></div> <h1 class="text-gradient animate-fade-in svelte-1q37ri0" style="animation-delay:.1s">${escape_html(t("hero.title", store_get($$store_subs ??= {}, "$locale", locale)))}</h1> <h2 class="hero-subtitle animate-fade-in svelte-1q37ri0" style="animation-delay:.2s">${escape_html(t("hero.subtitle", store_get($$store_subs ??= {}, "$locale", locale)))}</h2> <p class="hero-desc animate-fade-in svelte-1q37ri0" style="animation-delay:.3s">${escape_html(t("hero.description", store_get($$store_subs ??= {}, "$locale", locale)))}</p> <div class="hero-actions animate-fade-in svelte-1q37ri0" style="animation-delay:.4s"><button class="btn btn-primary">${escape_html(t("hero.viewWork", store_get($$store_subs ??= {}, "$locale", locale)))}</button> <button class="btn btn-outline">${escape_html(t("hero.getInTouch", store_get($$store_subs ??= {}, "$locale", locale)))}</button></div> <button class="scroll-down animate-bounce-gentle svelte-1q37ri0" aria-label="Scroll down"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--fg-muted)" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg></button></div></section>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
function Skills($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    const skills = [
      { icon: "code", key: "flutterDev", level: 95 },
      { icon: "phone", key: "mobileUI", level: 90 },
      { icon: "database", key: "stateManagement", level: 85 },
      { icon: "cloud", key: "firebase", level: 88 },
      { icon: "palette", key: "materialDesign", level: 92 },
      { icon: "zap", key: "performance", level: 80 }
    ];
    const icons = {
      code: '<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>',
      phone: '<rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>',
      database: '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>',
      cloud: '<path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>',
      palette: '<circle cx="13.5" cy="6.5" r="1.5"/><circle cx="17.5" cy="10.5" r="1.5"/><circle cx="8.5" cy="7.5" r="1.5"/><circle cx="6.5" cy="12.5" r="1.5"/><path d="M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10c.55 0 1-.45 1-1v-1a1 1 0 0 1 1-1h1.5c2.76 0 5-2.24 5-5 0-5-4.49-9-9.5-9z"/>',
      zap: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>'
    };
    $$renderer2.push(`<section id="skills" class="svelte-1f1pl16"><div class="container"><div class="section-header"><h2 class="text-gradient">${escape_html(t("skills.title", store_get($$store_subs ??= {}, "$locale", locale)))}</h2> <p class="svelte-1f1pl16">${escape_html(t("skills.subtitle", store_get($$store_subs ??= {}, "$locale", locale)))}</p></div> <div class="skills-grid svelte-1f1pl16"><!--[-->`);
    const each_array = ensure_array_like(skills);
    for (let i = 0, $$length = each_array.length; i < $$length; i++) {
      let skill = each_array[i];
      $$renderer2.push(`<div class="card skill-card animate-fade-in svelte-1f1pl16"${attr_style(`animation-delay: ${stringify(i * 100)}ms`)}><div class="skill-icon svelte-1f1pl16"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2">${html(icons[skill.icon])}</svg></div> <h3 class="svelte-1f1pl16">${escape_html(t(`skills.${skill.key}.title`, store_get($$store_subs ??= {}, "$locale", locale)))}</h3> <p class="svelte-1f1pl16">${escape_html(t(`skills.${skill.key}.description`, store_get($$store_subs ??= {}, "$locale", locale)))}</p> <div class="skill-bar-meta svelte-1f1pl16"><span>${escape_html(t("skills.proficiency", store_get($$store_subs ??= {}, "$locale", locale)))}</span> <span class="skill-pct svelte-1f1pl16">${escape_html(skill.level)}%</span></div> <div class="skill-bar-track"><div class="skill-bar-fill"${attr_style(`width: ${stringify(skill.level)}%`)}></div></div></div>`);
    }
    $$renderer2.push(`<!--]--></div></div></section>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
const projects = [
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
function Projects($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    $$renderer2.push(`<section id="projects" class="projects-section svelte-1tes396"><div class="container"><div class="section-header"><h2 class="text-gradient">${escape_html(t("projects.title", store_get($$store_subs ??= {}, "$locale", locale)))}</h2> <p>${escape_html(t("projects.subtitle", store_get($$store_subs ??= {}, "$locale", locale)))}</p></div> <div class="projects-grid svelte-1tes396"><!--[-->`);
    const each_array = ensure_array_like(projects);
    for (let i = 0, $$length = each_array.length; i < $$length; i++) {
      let project = each_array[i];
      $$renderer2.push(`<div class="card project-card animate-fade-in svelte-1tes396"${attr_style(`animation-delay: ${stringify(i * 120)}ms`)}><img${attr("src", project.image)}${attr("alt", store_get($$store_subs ??= {}, "$locale", locale) === "ar" ? project.title_ar : project.title_en)} class="project-img svelte-1tes396" loading="lazy"/> <div class="project-body svelte-1tes396"><div class="project-header"><div class="project-title-row svelte-1tes396">`);
      if (project.featured) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<svg width="18" height="18" viewBox="0 0 24 24" fill="var(--primary)" stroke="var(--primary)" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> <h3 class="svelte-1tes396">${escape_html(store_get($$store_subs ??= {}, "$locale", locale) === "ar" ? project.title_ar : project.title_en)}</h3> `);
      if (project.featured) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<span class="badge badge-primary">${escape_html(t("projects.featured", store_get($$store_subs ??= {}, "$locale", locale)))}</span>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div> <p class="project-desc svelte-1tes396">${escape_html(store_get($$store_subs ??= {}, "$locale", locale) === "ar" ? project.desc_ar : project.desc_en)}</p></div> <div class="project-techs svelte-1tes396"><!--[-->`);
      const each_array_1 = ensure_array_like(project.technologies);
      for (let $$index = 0, $$length2 = each_array_1.length; $$index < $$length2; $$index++) {
        let tech = each_array_1[$$index];
        $$renderer2.push(`<span class="badge">${escape_html(tech)}</span>`);
      }
      $$renderer2.push(`<!--]--></div> <div class="project-stats svelte-1tes396"><span class="stat svelte-1tes396"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg> ${escape_html(project.stars)} ${escape_html(t("projects.stars", store_get($$store_subs ??= {}, "$locale", locale)))}</span></div> <div class="project-actions svelte-1tes396"><a${attr("href", project.githubUrl)} class="btn btn-ghost btn-sm"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path></svg> ${escape_html(t("projects.code", store_get($$store_subs ??= {}, "$locale", locale)))}</a> `);
      if (project.liveUrl) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<a${attr("href", project.liveUrl)} class="btn btn-primary btn-sm"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg> ${escape_html(project.liveUrl.includes("/madarik") ? t("projects.landingPage", store_get($$store_subs ??= {}, "$locale", locale)) : t("projects.liveDemo", store_get($$store_subs ??= {}, "$locale", locale)))}</a>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> `);
      if (project.googlePlayUrl) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<a${attr("href", project.googlePlayUrl)} class="btn btn-green btn-sm"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg> ${escape_html(t("projects.googlePlay", store_get($$store_subs ??= {}, "$locale", locale)))}</a>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div></div></div>`);
    }
    $$renderer2.push(`<!--]--></div></div></section>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
function Contact($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    $$renderer2.push(`<section id="contact" class="svelte-wt4tt0"><div class="container"><div class="section-header"><h2 class="text-gradient">${escape_html(t("contact.title", store_get($$store_subs ??= {}, "$locale", locale)))}</h2> <p class="svelte-wt4tt0">${escape_html(t("contact.subtitle", store_get($$store_subs ??= {}, "$locale", locale)))}</p></div> <div class="contact-grid svelte-wt4tt0"><div class="card contact-card svelte-wt4tt0"><div class="contact-icon svelte-wt4tt0"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg></div> <div><h3 class="svelte-wt4tt0">${escape_html(t("contact.email", store_get($$store_subs ??= {}, "$locale", locale)))}</h3> <a href="mailto:abdulrsol97@gmail.com" class="svelte-wt4tt0">abdulrsol97@gmail.com</a></div></div> <div class="card contact-card svelte-wt4tt0"><div class="contact-icon svelte-wt4tt0"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg></div> <div><h3 class="svelte-wt4tt0">${escape_html(t("contact.whatsapp", store_get($$store_subs ??= {}, "$locale", locale)))}</h3> <a href="https://wa.me/9647813639721" class="svelte-wt4tt0">+964 781 363 9721</a></div></div> <div class="card contact-card svelte-wt4tt0"><div class="contact-icon svelte-wt4tt0"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg></div> <div><h3 class="svelte-wt4tt0">${escape_html(t("contact.location", store_get($$store_subs ??= {}, "$locale", locale)))}</h3> <p class="svelte-wt4tt0">${escape_html(t("contact.locationText", store_get($$store_subs ??= {}, "$locale", locale)))}</p></div></div> <div class="card contact-card svelte-wt4tt0"><div class="contact-icon svelte-wt4tt0"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg></div> <div><h3 class="svelte-wt4tt0">${escape_html(t("contact.availability", store_get($$store_subs ??= {}, "$locale", locale)))}</h3> <p class="svelte-wt4tt0">${escape_html(t("contact.availabilityText", store_get($$store_subs ??= {}, "$locale", locale)))}</p></div></div></div> <div class="card cta-card svelte-wt4tt0"><h3 class="svelte-wt4tt0">${escape_html(t("contact.ctaTitle", store_get($$store_subs ??= {}, "$locale", locale)))}</h3> <p class="svelte-wt4tt0">${escape_html(t("contact.ctaDescription", store_get($$store_subs ??= {}, "$locale", locale)))}</p> <a href="mailto:abdulrsol97@gmail.com" class="btn btn-primary svelte-wt4tt0"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg> ${escape_html(t("contact.sendMessage", store_get($$store_subs ??= {}, "$locale", locale)))}</a> <div class="social-links svelte-wt4tt0"><a href="https://github.com/abdulrasol" aria-label="GitHub" class="svelte-wt4tt0"><svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path></svg></a> <a href="https://linkedin.com/in/abdulrasoolal-hilo" aria-label="LinkedIn" class="svelte-wt4tt0"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg></a> <a href="https://instagram.com/abdulrasol.dev" aria-label="Instagram" class="svelte-wt4tt0"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></a></div></div></div></section>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
function Footer($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    const year = (/* @__PURE__ */ new Date()).getFullYear();
    $$renderer2.push(`<footer class="svelte-jz8lnl"><p>${escape_html(t("footer.copyright", store_get($$store_subs ??= {}, "$locale", locale)).replace("{year}", year))}</p></footer>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
function _page($$renderer) {
  head("1uha8ag", $$renderer, ($$renderer2) => {
    $$renderer2.title(($$renderer3) => {
      $$renderer3.push(`<title>AbdulRasol Al-Hilo — Software Engineer</title>`);
    });
  });
  Navigation($$renderer);
  $$renderer.push(`<!----> <main>`);
  Hero($$renderer);
  $$renderer.push(`<!----> `);
  Skills($$renderer);
  $$renderer.push(`<!----> `);
  Projects($$renderer);
  $$renderer.push(`<!----> `);
  Contact($$renderer);
  $$renderer.push(`<!----></main> `);
  Footer($$renderer);
  $$renderer.push(`<!---->`);
}
export {
  _page as default
};
