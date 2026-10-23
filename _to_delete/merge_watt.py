import json, sys
path = sys.argv[1]
d = json.load(open(path, encoding='utf-8'))

def F(icon, te, ta, de, da):
    return {"icon": icon, "title_en": te, "title_ar": ta, "desc_en": de, "desc_ar": da}

def P(en, ar):
    return {"type": "paragraph", "text_en": en, "text_ar": ar}

def L(en, ar):
    return {"type": "list", "items_en": en, "items_ar": ar}

def S(te, ta, *blocks):
    return {"title_en": te, "title_ar": ta, "blocks": list(blocks)}

# ---------- site / brand / links ----------
d["site"].update({
    "title_en": "Watt: Solar Sizing, Climate Data & Solar Store",
    "title_ar": "واط: حاسبة الطاقة الشمسية وبيانات المناخ ومتجر الطاقة الشمسية",
    "description_en": "Watt sizes your solar system from your real location using PVGIS and NASA climate data, designs PV layouts, and connects you to a solar store and company quotations.",
    "description_ar": "واط تحسب منظومتك الشمسية من موقعك الحقيقي ببيانات PVGIS وناسا، وتصمّم الألواح، وتربطك بمتجر الطاقة الشمسية وعروض أسعار الشركات.",
    "keywords_en": "Watt, Taqati, solar calculator, solar system sizing, PVGIS, off-grid, hybrid inverter, battery sizing, Iraq solar store, Subul Technology, Flutter",
    "keywords_ar": "واط, طاقتي, حاسبة طاقة شمسية, حساب منظومة شمسية, PVGIS, بطاريات, انفرتر هجين, متجر طاقة شمسية العراق, سبل التكنولوجيا, فلاتر",
})
d["brand"].update({
    "tagline_en": "Size, design, and buy your solar system",
    "tagline_ar": "احسب منظومتك الشمسية وصمّمها واشترِ مكوناتها",
    "logo": "/assets/watt/logo.png",
    "favicon": "/assets/watt/logo.png",
})
d["links"]["googlePlay"] = "https://play.google.com/store/apps/details?id=io.github.abdulrasol.watt"
d["links"]["appStore"] = None
d["links"]["support_email"] = "watt@subultech.top"
d["technologies"] = ["Flutter", "Dart", "Firebase", "Riverpod", "PVGIS", "NASA POWER", "Open-Meteo"]

# ---------- hero ----------
h = d["hero"]
h.update({
    "badge_en": "Formerly Taqati · Solar engineering in your pocket",
    "badge_ar": "طاقتي سابقاً · الهندسة الشمسية في جيبك",
    "title_en": "Size your solar system <span class=\"highlight\">from your real location</span>",
    "title_ar": "احسب منظومتك الشمسية <span class=\"highlight\">من موقعك الحقيقي</span>",
    "subtitle_en": "Watt turns your loads and your location into panels, batteries and an inverter, backed by PVGIS and NASA climate data, then connects you to a solar store and company quotations.",
    "subtitle_ar": "واط تحوّل أحمالك وموقعك إلى ألواح وبطاريات وانفرتر، بالاعتماد على بيانات PVGIS وناسا المناخية، ثم تربطك بمتجر الطاقة الشمسية وعروض أسعار الشركات.",
})
h["stats_en"] = [
    {"value": "PVGIS", "label": "Satellite climate data for your site"},
    {"value": "Offline", "label": "Built-in climate grid for Iraq"},
    {"value": "AR + EN", "label": "Arabic and English"},
    {"value": "Free", "label": "Calculators and design tools"},
]
h["stats_ar"] = [
    {"value": "PVGIS", "label": "بيانات مناخية من الأقمار الصناعية لموقعك"},
    {"value": "بدون إنترنت", "label": "شبكة مناخ مضمّنة للعراق"},
    {"value": "عربي + English", "label": "واجهة بالعربية والإنجليزية"},
    {"value": "مجاني", "label": "الحاسبات وأدوات التصميم"},
]

# ---------- problem / solution ----------
sec = d["sections"]
sec["problem_en"].update({
    "title": "Solar sizing should not be guesswork",
    "subtitle": "Wrong sizing wastes money and wears out batteries early.",
    "body": "Iraq has strong sun but long power outages, and most buyers size their system from rules of thumb. Without real irradiance and temperature data, systems end up too small, too expensive, or hard on the batteries. Prices and specifications are also scattered across the market.",
    "items": [
        {"icon": "❌", "text": "Rule-of-thumb sizing that ignores your real location and worst months"},
        {"icon": "❌", "text": "Batteries sized on the wrong load and worn out early"},
        {"icon": "❌", "text": "Hard to get reliable sun and temperature data for your site"},
        {"icon": "❌", "text": "Prices and specifications are hard to compare across suppliers"},
    ],
})
sec["problem_ar"].update({
    "title": "حساب المنظومة الشمسية يجب ألا يكون تخميناً",
    "subtitle": "الحساب الخاطئ يضيّع المال ويُتلف البطاريات مبكراً.",
    "body": "العراق غني بالشمس لكن انقطاع الكهرباء طويل، ومعظم المشترين يحسبون منظومتهم بالتقدير. وبدون بيانات إشعاع وحرارة حقيقية تصبح المنظومة أصغر من اللازم أو أغلى منه أو مرهقة للبطاريات. كما أن الأسعار والمواصفات متفرقة في السوق.",
    "items": [
        {"icon": "❌", "text": "حساب بالتقدير لا يراعي موقعك الحقيقي وأسوأ أشهر السنة"},
        {"icon": "❌", "text": "بطاريات تُحسب على حمل خاطئ وتتلف مبكراً"},
        {"icon": "❌", "text": "صعوبة الحصول على بيانات شمس وحرارة موثوقة لموقعك"},
        {"icon": "❌", "text": "صعوبة مقارنة الأسعار والمواصفات بين الموردين"},
    ],
})
sec["solution_en"].update({
    "title": "Watt: from your loads to a system you can buy",
    "subtitle": "Calculate, check, design, then request quotes or shop in one app.",
    "items": [
        {"icon": "🧮", "title": "Location-based calculator", "desc": "Panels, battery bank, inverter and charger sized from your appliances and the real monthly sun at your site."},
        {"icon": "🛰️", "title": "Trusted climate data", "desc": "PVGIS first, NASA POWER as backup, and a built-in grid for Iraq that works without internet. Every result shows its data source."},
        {"icon": "🔋", "title": "Outage-aware batteries", "desc": "Battery size follows the load you keep during an outage, with startup surge, and a chart of how long the system lasts."},
        {"icon": "📐", "title": "PV system designer", "desc": "Lay out panels on your roof, design the mounting structure, and export your design."},
        {"icon": "🛒", "title": "Watt Store and quotations", "desc": "Browse products from verified companies and technicians, request quotations, and compare offers."},
        {"icon": "🩺", "title": "System health check", "desc": "Audit any system, including one you added manually, and see exactly what is under- or over-sized."},
    ],
})
sec["solution_ar"].update({
    "title": "واط: من أحمالك إلى منظومة تستطيع شراءها",
    "subtitle": "احسب وافحص وصمّم ثم اطلب عروض الأسعار أو تسوّق في تطبيق واحد.",
    "items": [
        {"icon": "🧮", "title": "حاسبة حسب موقعك", "desc": "الألواح وبنك البطاريات والانفرتر والشاحن تُحسب من أجهزتك وشمس موقعك الشهرية الفعلية."},
        {"icon": "🛰️", "title": "بيانات مناخية موثوقة", "desc": "PVGIS أولاً وناسا POWER احتياطاً، وشبكة مضمّنة للعراق تعمل بلا إنترنت. وكل نتيجة تعرض مصدر بياناتها."},
        {"icon": "🔋", "title": "بطاريات تراعي الانقطاع", "desc": "حجم البطارية يتبع الحمل الذي تُبقيه وقت الانقطاع مع تيار البدء، ومخطط يوضح كم تصمد المنظومة."},
        {"icon": "📐", "title": "مصمم منظومات PV", "desc": "وزّع الألواح على سطحك، وصمّم هيكل التثبيت، وصدّر تصميمك."},
        {"icon": "🛒", "title": "متجر واط وعروض الأسعار", "desc": "تصفّح منتجات شركات وفنيين موثقين، واطلب عروض أسعار وقارن بينها."},
        {"icon": "🩺", "title": "فحص صحة المنظومة", "desc": "افحص أي منظومة حتى المضافة يدوياً، وشاهد بالضبط ما هو أصغر أو أكبر من اللازم."},
    ],
})

# ---------- features (full, grouped) ----------
d["features"] = {
    "title_en": "Everything Watt does",
    "title_ar": "كل ما تقدّمه واط",
    "subtitle_en": "Calculators, climate data, design tools, a solar store, and quotations in one app for homeowners, technicians, and companies.",
    "subtitle_ar": "حاسبات وبيانات مناخية وأدوات تصميم ومتجر وعروض أسعار في تطبيق واحد للمستخدمين والفنيين والشركات.",
    "groups": [
        {"title_en": "Solar system calculator", "title_ar": "حاسبة المنظومة الشمسية", "items": [
            F("🧮", "System wizard", "معالج حساب المنظومة",
              "Step by step: your loads, location and preferences give panels, battery bank, inverter and charger. Supports off-grid and hybrid systems.",
              "خطوة بخطوة: أحمالك وموقعك وتفضيلاتك تعطي الألواح وبنك البطاريات والانفرتر والشاحن. تدعم المنظومات المستقلة والهجينة."),
            F("⚡", "Fast calculator", "الحاسبة السريعة",
              "A quick estimate on the same sizing engine as the full wizard, with AC voltage, battery type and a live performance panel.",
              "تقدير سريع على نفس محرك الحساب الكامل، مع اختيار جهد التيار المتناوب ونوع البطارية ولوحة أداء مباشرة."),
            F("🔌", "Detailed appliances mode", "وضع الأجهزة التفصيلي",
              "A catalog of 20 common appliances fills power, duty cycle and startup surge for you, and you choose which ones stay on backup.",
              "كتالوج بـ20 جهازاً شائعاً يعبّئ القدرة ونسبة التشغيل وتيار البدء، وتختار أنت الأجهزة التي تبقى على الاحتياط."),
            F("📍", "Sized for your location", "حساب حسب موقعك",
              "Uses the real monthly sun at your site, finds the best tilt and direction automatically, and designs for the average of the three worst months by default.",
              "يعتمد شمس موقعك الشهرية الفعلية، ويحسب أفضل ميل واتجاه تلقائياً، ويصمّم افتراضياً على متوسط أسوأ ثلاثة أشهر."),
            F("🔋", "Outage survival", "صمود المنظومة وقت الانقطاع",
              "See for every start hour how long the system lasts on sun and battery alone, with the worst and best periods and a load sensitivity table.",
              "اعرف لكل ساعة بدء كم تصمد المنظومة على الشمس والبطارية فقط، مع أسوأ وأقوى الفترات وجدول حساسية للحمل."),
            F("📈", "Multi-day simulation", "محاكاة عدة أيام",
              "Battery charge over consecutive days with real charging efficiency and your charger current, shown in a clear chart.",
              "شحن البطارية على أيام متتالية بكفاءة شحن حقيقية وتيار شاحنك، مع مخطط واضح."),
            F("🩺", "System health check", "فحص صحة المنظومة",
              "An engineering audit that flags weak chargers, undersized inverters or batteries and unrealistic assumptions, for calculated and manually added systems.",
              "تدقيق هندسي يكشف الشاحن الضعيف والانفرتر أو البطاريات الصغيرة والافتراضات غير الواقعية، للمنظومات المحسوبة والمضافة يدوياً."),
            F("💾", "Saved systems", "المنظومات المحفوظة",
              "Save calculations, reopen and edit them, or add an existing system manually and compare it with the recommended one.",
              "احفظ حساباتك وافتحها وعدّلها، أو أضف منظومة قائمة يدوياً وقارنها بالمنظومة الموصى بها."),
        ]},
        {"title_en": "Engineering tools", "title_ar": "الأدوات الهندسية", "items": [
            F("☀️", "Panel calculator", "حاسبة الألواح", "Panel count and array layout for a target power.", "عدد الألواح وتوزيعها لقدرة مطلوبة."),
            F("🔋", "Battery calculators", "حاسبات البطاريات", "Battery capacity, runtime and number of batteries for your load.", "سعة البطارية وزمن التشغيل وعدد البطاريات لحملك."),
            F("🔁", "Inverter calculator", "حاسبة الانفرتر", "Choose an inverter size from your loads and startup surge.", "اختيار قدرة الانفرتر من أحمالك وتيار البدء."),
            F("🧵", "Wire calculator", "حاسبة الأسلاك", "Wire size and voltage drop for your current and distance.", "مقطع السلك وهبوط الجهد لتيارك ومسافتك."),
            F("💧", "Solar pump calculator", "حاسبة مضخات الماء", "Size a solar water-pumping system.", "حساب منظومة شمسية لضخ المياه."),
            F("🧭", "Direction and tilt", "الاتجاه والميل", "Best panel direction and tilt for your location and season.", "أفضل اتجاه وميل للألواح لموقعك وموسمك."),
        ]},
        {"title_en": "Design", "title_ar": "التصميم", "items": [
            F("📐", "PV system designer", "مصمم منظومات PV", "Design the array step by step and export your design, including a technical sketch.", "صمّم المصفوفة خطوة بخطوة وصدّر تصميمك مع مخطط فني."),
            F("🏠", "Roof simulator", "محاكي السطح", "Place panels on a roof and see how many fit.", "ضع الألواح على السطح وشاهد كم لوحاً يتسع."),
            F("🏗️", "Mounting structure design", "تصميم هيكل التثبيت", "Pick the location on a map, optimize the seasonal tilt, and get a clear drawing of the structure.", "اختر الموقع على الخريطة، وحسّن الميل الموسمي، واحصل على رسم واضح للهيكل."),
        ]},
        {"title_en": "Climate data and weather", "title_ar": "البيانات المناخية والطقس", "items": [
            F("🛰️", "PVGIS satellite data", "بيانات PVGIS من الأقمار الصناعية", "Monthly and hourly sun and temperature for any coordinates.", "شمس وحرارة شهرية وساعية لأي إحداثيات."),
            F("🌐", "NASA POWER backup", "ناسا POWER احتياطاً", "If PVGIS is unreachable, Watt switches to NASA data and tells you.", "إن تعذّر الوصول إلى PVGIS تنتقل واط إلى بيانات ناسا وتخبرك بذلك."),
            F("📶", "Offline grid for Iraq", "شبكة بيانات للعراق بدون إنترنت", "A built-in climate grid lets you size systems in Iraq with no connection.", "شبكة مناخ مضمّنة تتيح حساب المنظومات داخل العراق بلا اتصال."),
            F("🏷️", "Data source badges", "شارات مصدر البيانات", "Each result shows where its numbers came from, and a data sources page explains each one.", "كل نتيجة تعرض مصدر أرقامها، وصفحة مصادر البيانات تشرح كل مصدر."),
            F("⛅", "Solar outlook on the home screen", "توقع الشمس في الرئيسية", "Today's solar production outlook for your city at a glance.", "توقع إنتاج الشمس اليوم لمدينتك بنظرة واحدة."),
        ]},
        {"title_en": "Watt Store and quotations", "title_ar": "متجر واط وعروض الأسعار", "items": [
            F("🛒", "Watt Store", "متجر واط", "Browse products by category, offers, trusted brands and top vendors, with search and vendor profiles.", "تصفّح المنتجات حسب الصنف والعروض والبراندات الموثوقة وأبرز البائعين، مع بحث وصفحات للبائعين."),
            F("🛍️", "Cart and checkout", "السلة وإتمام الطلب", "A separate cart per seller, delivery zones, and a full order history with tracking.", "سلة منفصلة لكل بائع، ومناطق توصيل، وسجل طلبات كامل مع تتبّع."),
            F("🏪", "Sell as a company or technician", "البيع كشركة أو فني", "Add products with options, wholesale price tiers, stock and an optional brand, and manage incoming orders.", "أضف منتجات بخيارات وشرائح أسعار جملة ومخزون وبراند اختياري، وأدر الطلبات الواردة."),
            F("📋", "Quotation requests", "طلبات عروض الأسعار", "Send a request from your calculated system and compare offers from several companies.", "أرسل طلباً من منظومتك المحسوبة وقارن عروض عدة شركات."),
            F("🏷️", "Brands and catalog", "البراندات والكتالوج", "Approved brands and categories, including mounting structures and accessories, with brand suggestions from users.", "براندات وأصناف معتمدة منها هياكل التثبيت والملحقات، مع اقتراح براندات من المستخدمين."),
            F("🏢", "Company profile and dashboard", "ملف الشركة ولوحة التحكم", "Register your company and manage its offers, products and orders.", "سجّل شركتك وأدر عروضها ومنتجاتها وطلباتها."),
        ]},
        {"title_en": "Account and app", "title_ar": "الحساب والتطبيق", "items": [
            F("🔐", "Google and Apple sign-in", "الدخول بجوجل وآبل", "No password to remember, and you can delete your account inside the app.", "بلا كلمة مرور تحفظها، ويمكنك حذف حسابك من داخل التطبيق."),
            F("👤", "Account types", "أنواع الحسابات", "User, technician and company accounts, each with the screens it needs.", "حساب مستخدم وفني وشركة، لكل منها الشاشات التي يحتاجها."),
            F("💱", "Your country's prices", "أسعار بلدك", "Estimated cost in your country's currency, shown only when prices are published for it.", "كلفة تقديرية بعملة بلدك تظهر فقط عند نشر أسعار له."),
            F("🔔", "Notifications you control", "إشعارات تتحكم بها", "Orders, offers and updates, with settings to switch off what you do not want.", "طلبات وعروض وتحديثات، مع إعدادات لإيقاف ما لا تريده."),
            F("🌍", "Arabic and English", "عربي وإنجليزي", "Full right-to-left Arabic and English, with light and dark themes.", "عربي كامل من اليمين لليسار وإنجليزي، مع مظهر فاتح وداكن."),
            F("🧭", "Guided tours and feedback", "جولات إرشادية وملاحظات", "Interactive tours for new users, a feedback form, and update prompts.", "جولات تفاعلية للمستخدمين الجدد ونموذج ملاحظات وتنبيه بالتحديثات."),
        ]},
    ],
}
d["features"].pop("items", None)

# ---------- FAQ ----------
d["faq"] = {
    "title_en": "Frequently asked questions", "title_ar": "الأسئلة الشائعة",
    "subtitle_en": "Short answers about Watt.", "subtitle_ar": "إجابات قصيرة عن واط.",
    "items": [
        {"question_en": "Is Watt the same app as Taqati?", "question_ar": "هل واط هي نفس تطبيق طاقتي؟",
         "answer_en": "Yes. Taqati was renamed Watt. Your account and saved systems continue in the same app, and old Taqati links redirect to this page.",
         "answer_ar": "نعم. طاقتي أصبح اسمها واط. حسابك ومنظومتك المحفوظة تستمر في نفس التطبيق، وروابط طاقتي القديمة تُحوَّل إلى هذه الصفحة."},
        {"question_en": "Is Watt free?", "question_ar": "هل واط مجانية؟",
         "answer_en": "The calculators and design tools are free. Prices of products in the store are set by the sellers.",
         "answer_ar": "الحاسبات وأدوات التصميم مجانية. وأسعار منتجات المتجر يحددها البائعون."},
        {"question_en": "Which countries does Watt support?", "question_ar": "ما الدول التي تدعمها واط؟",
         "answer_en": "The calculators work anywhere using PVGIS or NASA data. Iraq also has a built-in offline grid. Price estimates and store features appear for countries where they are available.",
         "answer_ar": "الحاسبات تعمل في أي مكان ببيانات PVGIS أو ناسا، وللعراق شبكة مضمّنة تعمل بلا إنترنت. وتقديرات الأسعار وميزات المتجر تظهر في البلدان التي تتوفر فيها."},
        {"question_en": "Where do the solar numbers come from?", "question_ar": "من أين تأتي أرقام الشمس؟",
         "answer_en": "From PVGIS (European Commission, JRC) first, then NASA POWER if PVGIS is unreachable, and a built-in grid for Iraq when you are offline. Each result shows its source.",
         "answer_ar": "من PVGIS (المفوضية الأوروبية، JRC) أولاً، ثم ناسا POWER إن تعذّر الوصول إليه، وشبكة مضمّنة للعراق عند عدم وجود إنترنت. وكل نتيجة تعرض مصدرها."},
        {"question_en": "Can I rely on the results to buy equipment?", "question_ar": "هل أعتمد على النتائج لشراء المعدات؟",
         "answer_en": "Results are engineering estimates for planning. Confirm the final design and safety items such as wiring and breakers with a qualified technician before installing.",
         "answer_ar": "النتائج تقديرات هندسية للتخطيط. أكّد التصميم النهائي وبنود السلامة كالأسلاك والقواطع مع فني مختص قبل التركيب."},
        {"question_en": "Does Watt need my location?", "question_ar": "هل تحتاج واط إلى موقعي؟",
         "answer_en": "Only if you allow it, to fetch the sun at your site. You can also pick a place on the map or skip it and get a clearly labelled general estimate.",
         "answer_ar": "فقط إن سمحت بذلك، لجلب شمس موقعك. ويمكنك اختيار مكان على الخريطة أو تخطّيه والحصول على تقدير عام موسوم بوضوح."},
        {"question_en": "How do I delete my account?", "question_ar": "كيف أحذف حسابي؟",
         "answer_en": "From your account page inside the app, or by following the steps on the account deletion page.",
         "answer_ar": "من صفحة حسابك داخل التطبيق، أو باتباع الخطوات في صفحة حذف الحساب."},
    ],
}

# ---------- changelog ----------
d["changelog"] = {
    "title_en": "Changelog", "title_ar": "سجل التحديثات",
    "items": [
        {"version": "1.5.0", "date_en": "October 2026", "date_ar": "أكتوبر 2026", "tag_en": "Latest ✨", "tag_ar": "أحدث إصدار ✨",
         "changes_en": ["Built-in climate grid for Iraq, so you can size a system with no internet",
                        "The calculator now sizes from your real location, with automatic best tilt and direction",
                        "Battery sizing follows the load you keep during an outage, with a 20-appliance catalog",
                        "Outage survival panel and a clearer battery charge chart",
                        "Per-country electricity assumptions and prices",
                        "Notification settings you control, and stronger order security in the store"],
         "changes_ar": ["شبكة مناخ مضمّنة للعراق لحساب المنظومة بدون إنترنت",
                        "الحاسبة تحسب الآن من موقعك الحقيقي مع أفضل ميل واتجاه تلقائياً",
                        "حجم البطارية يتبع الحمل الذي تُبقيه وقت الانقطاع مع كتالوج 20 جهازاً",
                        "لوحة صمود المنظومة وقت الانقطاع ومخطط شحن بطارية أوضح",
                        "افتراضات كهرباء وأسعار خاصة بكل بلد",
                        "إعدادات إشعارات تتحكم بها، وتحصين أكبر لطلبات المتجر"]},
        {"version": "1.4.1", "date_en": "October 2026", "date_ar": "أكتوبر 2026",
         "changes_en": ["Launched Watt Store for verified companies and technicians, with cart, checkout, delivery zones and order tracking",
                        "Product options that change the price, and optional brand",
                        "Automatic update checks"],
         "changes_ar": ["إطلاق متجر واط للشركات والفنيين الموثقين مع السلة والدفع وإتمام الطلب ومناطق التوصيل وتتبّع الطلبات",
                        "خيارات منتجات تغيّر السعر، والبراند اختياري",
                        "فحص تلقائي للتحديثات"]},
        {"version": "1.4", "date_en": "October 2026", "date_ar": "أكتوبر 2026",
         "changes_en": ["Products catalog for registered companies and technicians",
                        "In-app permanent account deletion for Apple and Google sign-in",
                        "Fast calculator on the real sizing engine, with major accuracy fixes for batteries and panels",
                        "More realistic multi-day system simulation and a system health check for any system"],
         "changes_ar": ["كتالوج منتجات للشركات والفنيين المسجلين",
                        "حذف الحساب نهائياً من داخل التطبيق لحسابات آبل وجوجل",
                        "الحاسبة السريعة على محرك الحساب الحقيقي مع إصلاحات دقة كبيرة للبطاريات والألواح",
                        "محاكاة أكثر واقعية لعدة أيام وفحص صحة لأي منظومة"]},
        {"version": "1.2", "date_en": "September 2026", "date_ar": "سبتمبر 2026",
         "changes_en": ["Taqati is now Watt, with new logo and branding",
                        "PV structure designer with map location and seasonal tilt",
                        "User roles, interactive tours and an About screen"],
         "changes_ar": ["طاقتي أصبحت واط بشعار وهوية جديدين",
                        "مصمم هيكل PV مع اختيار الموقع من الخريطة والميل الموسمي",
                        "أنواع حسابات وجولات تفاعلية وشاشة حول التطبيق"]},
    ],
}

# ---------- privacy ----------
CONTACT = "watt@subultech.top"
d["privacy"] = {
    "last_updated": "2026-10-23",
    "email": CONTACT,
    "sections": [
        S("1. Introduction", "1. مقدمة",
          P("This policy explains what Watt (formerly Taqati) collects, why, and the choices you have. Watt is published by AbdulRasol Al-Hilo (Subul Technology). By using the app you agree to this policy.",
            "توضح هذه السياسة ما الذي تجمعه واط (طاقتي سابقاً) ولماذا وما خياراتك. تنشر واط بواسطة عبدالرسول الحلو (سبل التكنولوجيا). باستخدامك للتطبيق فإنك توافق على هذه السياسة.")),
        S("2. Information we collect", "2. المعلومات التي نجمعها",
          P("Account. You sign in with Google or Apple. We receive your name, email address and profile picture from the provider. We never see your Google or Apple password.",
            "الحساب. تسجّل الدخول بحساب جوجل أو آبل، فنستلم اسمك وبريدك الإلكتروني وصورتك من المزوّد. لا نرى أبداً كلمة مرور جوجل أو آبل."),
          P("Profile. Phone number, country and city, account type (user, technician or company) and, optionally, a picture.",
            "الملف الشخصي. رقم الهاتف والبلد والمدينة ونوع الحساب (مستخدم أو فني أو شركة) وصورة اختيارية."),
          P("Your calculations. Appliances, loads, settings and the systems you save or add manually.",
            "حساباتك. الأجهزة والأحمال والإعدادات والمنظومات التي تحفظها أو تضيفها يدوياً."),
          P("Location. Only if you allow it. Your coordinates, or a place you pick on the map, are used to get sun and weather data for your site.",
            "الموقع. فقط إن سمحت به. تُستخدم إحداثياتك أو المكان الذي تختاره على الخريطة لجلب بيانات الشمس والطقس لموقعك."),
          P("Company and store content. Company name, description, address, logo, products, prices, images, quotation requests, offers, carts and orders, including the delivery details you enter at checkout.",
            "بيانات الشركة والمتجر. اسم الشركة ووصفها وعنوانها وشعارها والمنتجات والأسعار والصور وطلبات العروض والعروض والسلال والطلبات، ومنها بيانات التوصيل التي تدخلها عند إتمام الطلب."),
          P("Feedback and support. Your message, optional phone number and optional image.",
            "الملاحظات والدعم. رسالتك ورقم هاتف اختياري وصورة اختيارية."),
          P("Device and usage. A notification token, app version, platform (Android, iOS or web), language, and anonymous usage statistics from Firebase Analytics.",
            "الجهاز والاستخدام. رمز الإشعارات وإصدار التطبيق والمنصة (أندرويد أو iOS أو ويب) واللغة، وإحصاءات استخدام مجهولة من Firebase Analytics."),
          P("On your device. Settings, session state and cached climate data are stored locally so the app works faster and offline.",
            "على جهازك. تُخزَّن الإعدادات وحالة الجلسة وبيانات المناخ المؤقتة محلياً ليعمل التطبيق أسرع وبدون إنترنت.")),
        S("3. How we use it", "3. كيف نستخدمها",
          L(["Run your account and keep you signed in",
             "Calculate and save your systems and fetch climate data for your site",
             "Operate the store, quotations and orders between buyers and sellers",
             "Send notifications you have not switched off",
             "Answer feedback and support requests",
             "Keep the app secure, prevent abuse and improve reliability",
             "Meet legal obligations"],
            ["تشغيل حسابك وإبقاؤك مسجّلاً",
             "حساب منظوماتك وحفظها وجلب البيانات المناخية لموقعك",
             "تشغيل المتجر وعروض الأسعار والطلبات بين المشترين والبائعين",
             "إرسال الإشعارات التي لم توقفها",
             "الرد على الملاحظات وطلبات الدعم",
             "حماية التطبيق ومنع إساءة الاستخدام وتحسين الموثوقية",
             "الوفاء بالالتزامات القانونية"])),
        S("4. Services that process your data", "4. الخدمات التي تعالج بياناتك",
          P("Watt relies on the following services. They receive only what they need to work.",
            "تعتمد واط على الخدمات التالية، وهي تستلم فقط ما تحتاجه للعمل."),
          L(["Firebase (Google): sign-in, database, notifications, remote settings and analytics.",
             "Google Sign-In and Sign in with Apple: to verify your identity.",
             "PVGIS (European Commission, Joint Research Centre): receives the coordinates and system settings you request, to return solar data. Requests may pass through a Cloudflare proxy operated by us to make them more reliable. The proxy keeps a temporary cache of the climate response and does not link it to your account.",
             "NASA POWER: receives coordinates to return climate data when PVGIS is unavailable.",
             "Open-Meteo: receives coordinates to return weather and the solar outlook.",
             "OpenStreetMap services (map tiles and place search): receive the area you view and the place names you search.",
             "Our image and file storage: stores pictures you upload, such as product images and logos."],
            ["Firebase (جوجل): تسجيل الدخول وقاعدة البيانات والإشعارات والإعدادات عن بُعد والتحليلات.",
             "تسجيل الدخول بجوجل وآبل: للتحقق من هويتك.",
             "PVGIS (المفوضية الأوروبية، مركز البحوث المشترك): يستلم الإحداثيات وإعدادات المنظومة التي تطلبها ليعيد بيانات الشمس. وقد تمر الطلبات عبر وسيط Cloudflare نشغّله نحن لزيادة الموثوقية. يحتفظ الوسيط بنسخة مؤقتة من استجابة المناخ ولا يربطها بحسابك.",
             "ناسا POWER: يستلم الإحداثيات ليعيد بيانات المناخ عند تعذّر PVGIS.",
             "Open-Meteo: يستلم الإحداثيات ليعيد الطقس وتوقع الشمس.",
             "خدمات OpenStreetMap (مربعات الخريطة والبحث عن الأماكن): تستلم المنطقة التي تعرضها وأسماء الأماكن التي تبحث عنها.",
             "تخزين الصور والملفات لدينا: يحفظ الصور التي ترفعها مثل صور المنتجات والشعارات."])),
        S("5. Sharing", "5. المشاركة",
          P("We do not sell your personal data and we do not use it for third-party advertising.",
            "لا نبيع بياناتك الشخصية ولا نستخدمها لإعلانات أطراف ثالثة."),
          L(["Sellers and buyers: when you place an order or request a quotation, the other party sees the details needed to complete it, such as your name, phone number and delivery address.",
             "Public content: a company profile, its products and its offers are visible to other users.",
             "Service providers listed in section 4.",
             "Authorities, when the law requires it, and to investigate fraud, abuse or security incidents."],
            ["البائعون والمشترون: عند تقديم طلب أو طلب عرض سعر يرى الطرف الآخر التفاصيل اللازمة لإتمامه مثل اسمك ورقم هاتفك وعنوان التوصيل.",
             "المحتوى العام: ملف الشركة ومنتجاتها وعروضها تظهر للمستخدمين الآخرين.",
             "مزودو الخدمات المذكورون في البند 4.",
             "الجهات الرسمية عندما يوجب القانون ذلك، وللتحقيق في الاحتيال أو إساءة الاستخدام أو الحوادث الأمنية."])),
        S("6. Permissions", "6. الأذونات",
          L(["Location: to fetch solar data for where you are. Optional.",
             "Camera: to take pictures and scan codes. Optional.",
             "Photos: to choose pictures to upload. Optional.",
             "Notifications: to send order, offer and update alerts. Optional.",
             "Network: required for online features."],
            ["الموقع: لجلب بيانات الشمس لمكانك. اختياري.",
             "الكاميرا: لالتقاط الصور ومسح الرموز. اختياري.",
             "الصور: لاختيار الصور المراد رفعها. اختياري.",
             "الإشعارات: لتنبيهات الطلبات والعروض والتحديثات. اختياري.",
             "الشبكة: مطلوبة للميزات التي تعمل عبر الإنترنت."]),
          P("You can change permissions in your device settings. Without a permission, the related feature may not work.",
            "يمكنك تغيير الأذونات من إعدادات جهازك. وبدون الإذن قد لا تعمل الميزة المرتبطة به.")),
        S("7. Account deletion and retention", "7. حذف الحساب والاحتفاظ بالبيانات",
          P("You can delete your account permanently from your account page in the app. You confirm with Google or Apple again, and your cloud and local data are removed. You can also follow the steps on the account deletion page, or write to us.",
            "يمكنك حذف حسابك نهائياً من صفحة حسابك في التطبيق. تؤكد العملية بحساب جوجل أو آبل مرة أخرى، وتُزال بياناتك السحابية والمحلية. ويمكنك أيضاً اتباع الخطوات في صفحة حذف الحساب أو مراسلتنا."),
          P("We keep data only as long as needed to provide the service. Some records, such as completed orders, may be kept for the period required to resolve disputes, prevent fraud or meet legal duties, and are then removed or anonymized.",
            "نحتفظ بالبيانات فقط للمدة اللازمة لتقديم الخدمة. وقد تُحفظ بعض السجلات مثل الطلبات المكتملة للمدة اللازمة لحل النزاعات ومنع الاحتيال أو الوفاء بالواجبات القانونية، ثم تُحذف أو تُجهَّل.")),
        S("8. Security", "8. الأمان",
          P("We use reasonable technical and organizational measures, including access rules on the database and encrypted connections. No system is perfectly secure, so we cannot guarantee absolute security.",
            "نستخدم تدابير تقنية وتنظيمية معقولة منها قواعد صلاحيات على قاعدة البيانات واتصالات مشفّرة. لا يوجد نظام آمن تماماً، لذلك لا نستطيع ضمان أمان مطلق.")),
        S("9. Children", "9. الأطفال",
          P("Watt is not directed to children under 13. If you believe a child has given us personal data, contact us and we will remove it.",
            "واط غير موجهة للأطفال دون 13 سنة. إن كنت تعتقد أن طفلاً زوّدنا ببيانات شخصية فتواصل معنا وسنحذفها.")),
        S("10. Your rights", "10. حقوقك",
          P("Depending on where you live, you may ask to access, correct or delete your data, or object to some processing. Write to us and we will reply within a reasonable time.",
            "بحسب مكان إقامتك قد يحق لك طلب الاطلاع على بياناتك أو تصحيحها أو حذفها أو الاعتراض على بعض المعالجة. راسلنا وسنرد خلال مدة معقولة.")),
        S("11. Changes", "11. التغييرات",
          P("We may update this policy. The date at the top shows the latest version. If a change is significant we will tell you in the app.",
            "قد نحدّث هذه السياسة، ويبيّن التاريخ في أعلاها آخر نسخة. وإذا كان التغيير جوهرياً سنخبرك داخل التطبيق.")),
    ],
}

# ---------- terms ----------
d["terms"] = {
    "last_updated": "2026-10-23",
    "sections": [
        S("1. Acceptance", "1. القبول",
          P("These terms govern your use of Watt (formerly Taqati), published by AbdulRasol Al-Hilo (Subul Technology). By using the app you accept them. If you do not accept them, do not use the app.",
            "تحكم هذه الشروط استخدامك لواط (طاقتي سابقاً) التي ينشرها عبدالرسول الحلو (سبل التكنولوجيا). باستخدامك للتطبيق فإنك تقبلها، وإن لم تقبلها فلا تستخدمه.")),
        S("2. What Watt provides", "2. ما تقدمه واط",
          P("Watt provides solar calculators, climate data, design tools, a marketplace where companies and technicians list products, and a quotation service. Features may change, and some depend on your country.",
            "تقدم واط حاسبات شمسية وبيانات مناخية وأدوات تصميم وسوقاً تعرض فيه الشركات والفنيون منتجاتهم وخدمة عروض أسعار. وقد تتغير الميزات وبعضها يعتمد على بلدك.")),
        S("3. Estimates, not engineering approval", "3. تقديرات وليست اعتماداً هندسياً",
          P("Results are estimates for planning. They depend on the data you enter and on third-party climate data, which can differ from real conditions. They do not replace a site survey or a qualified engineer.",
            "النتائج تقديرات للتخطيط، وتعتمد على ما تدخله وعلى بيانات مناخية من أطراف ثالثة قد تختلف عن الواقع. ولا تغني عن المعاينة الميدانية أو المهندس المختص."),
          P("Before installation, have a qualified technician confirm the design and the safety items, including wire sizes, fuses, breakers, earthing and battery protection. You are responsible for decisions and purchases you make using the results.",
            "قبل التركيب اجعل فنياً مختصاً يؤكد التصميم وبنود السلامة ومنها مقاطع الأسلاك والفيوزات والقواطع والتأريض وحماية البطاريات. وأنت مسؤول عن قراراتك ومشترياتك المبنية على النتائج.")),
        S("4. Your account", "4. حسابك",
          P("You sign in with Google or Apple and must give accurate information. You are responsible for activity on your account. Tell us if you suspect unauthorized use.",
            "تسجّل الدخول بحساب جوجل أو آبل وعليك تقديم معلومات صحيحة. وأنت مسؤول عن النشاط على حسابك. أبلغنا إن اشتبهت باستخدام غير مصرّح به."),
          P("You can delete your account at any time from the app.",
            "يمكنك حذف حسابك في أي وقت من التطبيق.")),
        S("5. Marketplace and quotations", "5. المتجر وعروض الأسعار",
          P("Watt is a platform that connects buyers with sellers. Sellers are independent companies and technicians. Each seller is responsible for its products, prices, availability, delivery, warranty and invoices. Watt is not a party to the sale and does not guarantee the quality of products or work.",
            "واط منصة تربط المشترين بالبائعين. والبائعون شركات وفنيون مستقلون، وكل بائع مسؤول عن منتجاته وأسعاره وتوفرها وتوصيلها وضمانها وفواتيرها. واط ليست طرفاً في البيع ولا تضمن جودة المنتجات أو العمل."),
          P("Watt does not currently process payments. Payment and delivery terms are agreed directly between buyer and seller. Prices may be out of date, and a quotation or order is binding only as agreed between the two parties.",
            "لا تعالج واط حالياً أي مدفوعات. وتُتفق شروط الدفع والتوصيل مباشرة بين المشتري والبائع. وقد تكون الأسعار غير محدّثة، ولا يلزم عرض السعر أو الطلب إلا بما اتفق عليه الطرفان.")),
        S("6. Content you add", "6. المحتوى الذي تضيفه",
          P("You keep ownership of what you add, such as products, images and descriptions, and you allow Watt to store and show it as part of the service. You confirm that you have the right to add it and that it is accurate.",
            "تحتفظ بملكية ما تضيفه مثل المنتجات والصور والأوصاف، وتسمح لواط بتخزينه وعرضه ضمن الخدمة. وتؤكد أن لك الحق في إضافته وأنه صحيح.")),
        S("7. Acceptable use", "7. الاستخدام المقبول",
          L(["Do not add false, misleading, illegal or infringing content or listings",
             "Do not impersonate others or misuse another person's data",
             "Do not try to break, overload, scrape or reverse-engineer the service",
             "Do not use the service for fraud or to harm others"],
            ["لا تضف محتوى أو منتجات كاذبة أو مضللة أو غير قانونية أو منتهكة للحقوق",
             "لا تنتحل شخصية غيرك ولا تسئ استخدام بيانات الآخرين",
             "لا تحاول اختراق الخدمة أو إرهاقها أو سحب بياناتها أو فكّ هندستها",
             "لا تستخدم الخدمة للاحتيال أو لإيذاء الآخرين"]),
          P("We may remove content or suspend accounts that break these rules.",
            "يجوز لنا حذف المحتوى أو تعليق الحسابات المخالفة لهذه القواعد.")),
        S("8. Third-party data and services", "8. بيانات وخدمات الأطراف الثالثة",
          P("Watt uses data and services from others, including PVGIS (European Commission, Joint Research Centre), NASA POWER, Open-Meteo, OpenStreetMap, Firebase and Google or Apple sign-in. They are provided under their own terms and may be unavailable or change. Watt shows the source of climate data next to the results.",
            "تستخدم واط بيانات وخدمات من آخرين منها PVGIS (المفوضية الأوروبية، مركز البحوث المشترك) وناسا POWER وOpen-Meteo وOpenStreetMap وFirebase وتسجيل الدخول بجوجل أو آبل. وهي مقدمة بشروطها الخاصة وقد تتوقف أو تتغير. وتعرض واط مصدر البيانات المناخية بجانب النتائج.")),
        S("9. Intellectual property", "9. الملكية الفكرية",
          P("The Watt name, logo, design and code belong to their owner, except third-party data and open-source components, which stay under their own licenses. You may not copy or resell the app or its content without permission.",
            "اسم واط وشعارها وتصميمها وبرمجتها ملك لصاحبها، عدا بيانات الأطراف الثالثة والمكونات مفتوحة المصدر فتبقى تحت تراخيصها. ولا يجوز نسخ التطبيق أو محتواه أو إعادة بيعه دون إذن.")),
        S("10. Disclaimer and liability", "10. إخلاء المسؤولية",
          P("Watt is provided as is and as available, without guarantees of accuracy, uninterrupted service or fitness for a purpose. To the extent allowed by law, we are not liable for indirect or consequential loss, for losses from decisions made using the results, or for the acts of sellers and other users. Nothing here limits liability that cannot be limited by law.",
            "تُقدَّم واط كما هي وحسب التوفر دون ضمان للدقة أو استمرار الخدمة أو الملاءمة لغرض معين. وبالقدر الذي يسمح به القانون لا نتحمل المسؤولية عن الخسائر غير المباشرة أو التبعية أو الناتجة عن قرارات مبنية على النتائج أو عن تصرفات البائعين والمستخدمين الآخرين. ولا يحدّ شيء هنا من مسؤولية لا يجوز تحديدها قانوناً.")),
        S("11. Changes and termination", "11. التعديل والإنهاء",
          P("We may change these terms or the service. If you keep using the app after a change, you accept the new terms. We may suspend or end access if you break these terms.",
            "قد نعدّل هذه الشروط أو الخدمة، واستمرارك في استخدام التطبيق بعد التعديل يعني قبولك للشروط الجديدة. ويجوز لنا تعليق الوصول أو إنهاؤه عند مخالفة هذه الشروط.")),
        S("12. Governing law and contact", "12. القانون الواجب والتواصل",
          P("These terms are governed by the laws of Iraq, unless your local consumer law says otherwise. For questions write to watt@subultech.top.",
            "تخضع هذه الشروط لقوانين جمهورية العراق ما لم يقض قانون حماية المستهلك المحلي لديك بغير ذلك. للاستفسار راسلنا على watt@subultech.top.")),
    ],
}

json.dump(d, open(path, 'w', encoding='utf-8'), ensure_ascii=False, indent=2)
open(path, 'a').write("\n")
print("ok")
