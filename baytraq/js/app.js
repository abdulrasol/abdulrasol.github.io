const translations = {
    ar: {
        pageTitle: 'ميعاد - الصفحة الرئيسية',
        appName: 'بيترك',
        navHome: 'الرئيسية',
        navFeatures: 'المميزات',
        navTestimonials: 'آراء الزبائن',
        navPrivacy: 'سياسة الخصوصية',
        navTerms: 'شروط الخدمة',
        navChangelog: 'سجل التحديثات',
        toggleTheme: 'تبديل المظهر',
        heroBadge: 'تحديث جديد 1.1.0 🚀',
        heroTitle: 'مساحة العمل المتكاملة <br>للمبيعات والإدارة',
        heroSubtitle: '',
        getItOn: 'احصل عليه من',
        downloadOn: 'حمله من',
        featuresTitle: 'مميزات تطبيق ميعاد',
        featuresSubtitle: 'كل ما تحتاجه لإدارة حساباتك في مكان واحد',
        dataTitle: 'لماذا يطلب التطبيق الوصول لحساب Google الخاص بك؟',
        dataDesc1: 'تطبيق ميعاد يضع الخصوصية في المقام الأول. نحن <strong>لا نمتلك أي خوادم (Servers) خارجية</strong> لحفظ بياناتك.',
        dataDesc2: 'لتوفير ميزة المزامنة وضمان عدم ضياع حساباتك، يطلب التطبيق صلاحية Google Drive لإنشاء جداول (Google Sheets) مخفية <strong>داخل حسابك الشخصي أنت فقط</strong>. أنت المالك الوحيد لها.',
        readPrivacy: 'اقرأ سياسة الخصوصية بالكامل',
        testimonialsTitle: 'ماذا يقول عملاؤنا',
        testimonialsSubtitle: 'آراء حقيقية من مستخدمي تطبيق ميعاد',
        footerDesc: 'التطبيق الأسهل والأكثر أماناً لإدارة الديون والاشتراكات لعملك التجاري.',
        quickLinks: 'روابط سريعة',
        contactUs: 'تواصل معنا',
        allRights: 'جميع الحقوق محفوظة.'
    },
    en: {
        pageTitle: 'MEAAD - Home',
        appName: 'Baytraq',
        navHome: 'Home',
        navFeatures: 'Features',
        navTestimonials: 'Testimonials',
        navPrivacy: 'Privacy Policy',
        navTerms: 'Terms of Service',
        navChangelog: 'Changelogs',
        toggleTheme: 'Toggle Theme',
        heroBadge: 'New Update 1.1.0 🚀',
        heroTitle: 'The Ultimate Sales <br>& Management Workspace',
        heroSubtitle: '',
        getItOn: 'GET IT ON',
        downloadOn: 'Download on the',
        featuresTitle: 'MEAAD Features',
        featuresSubtitle: 'Everything you need to manage your accounts in one place',
        dataTitle: 'Why does the app request access to your Google Account?',
        dataDesc1: 'MEAAD puts privacy first. We <strong>do not own any external servers</strong> to store your data.',
        dataDesc2: 'To provide cloud synchronization and ensure your accounts are never lost, the app requests Google Drive access to create a hidden Google Sheet <strong>strictly inside your own personal account</strong>. You are the sole owner.',
        readPrivacy: 'Read full Privacy Policy',
        testimonialsTitle: 'What Our Clients Say',
        testimonialsSubtitle: 'Real reviews from MEAAD users',
        footerDesc: 'The easiest and most secure app to manage debts and subscriptions for your business.',
        quickLinks: 'Quick Links',
        contactUs: 'Contact Us',
        allRights: 'All rights reserved.'
    }
};

const app = Vue.createApp({
    data() {
        return {
            lang: 'ar',
            isDarkMode: false,
            isScrolled: false,
            mobileMenuOpen: false,
            
            // Edit your App download links here manually
            links: {
                googlePlay: 'https://play.google.com/store/apps/details?id=io.github.abdulrasol.meaad',
                appStore: '' // Add link here when available
            },

            // Arrays for Features and Testimonials
            featuresAr: [
                { icon: '🛒', title: 'نقطة البيع', desc: 'واجهة ثنائية اللغة محسّنة للإجراءات السريعة مع مسح الباركود/QR المدمج، ونافذة كاميرا مرنة لتجنب التداخل، وسلة مشتريات متعددة وسريعة.' },
                { icon: '📦', title: 'إدارة المخزون', desc: 'تتبع المخزون بالوقت الفعلي مع خصم تلقائي للمبيعات، وتنبيهات انخفاض المخزون بالألوان، ودعم المنتجات والخدمات، وربط الموردين.' },
                { icon: '📄', title: 'فواتير متقدمة', desc: 'إنشاء فواتير مخصصة بخصومات متنوعة، وتتبع حالة الدفع (مدفوعة، غير مدفوعة، جزئية)، والاطلاع على سجل التعديلات، وطباعة PDF مع شعار المتجر.' },
                { icon: '📈', title: 'لوحة تحكم التحليلات', desc: 'مؤشرات مالية فورية للمبيعات، صافي وإجمالي الأرباح، المصروفات، والديون مع فلاتر للفترات الزمنية ورسوم بيانية لأكثر المنتجات مبيعاً.' },
                { icon: '💸', title: 'تتبع المصروفات', desc: 'تسجيل المصروفات لمرة واحدة (إيجار، لوجستيات، رواتب) وإعداد قوالب مصروفات دورية مع احتساب تلقائي للمستحقات والتنبيهات.' },
                { icon: '🏛️', title: 'الديون والائتمان', desc: 'حسابات جارية لأرصدة العملاء، وتسجيل تلقائي للديون والائتمان بالفواتير، ومحرك قاعدة بيانات يقوم تلقائياً بإصلاح اختلافات المزامنة.' },
                { icon: '🌍', title: 'المزامنة السحابية', desc: 'مزامنة سحابية سلسة ومتعددة المتاجر مدعومة بقواعد Firestore الآمنة وتسجيل الدخول المجهول الاحتياطي لحماية بياناتك.' },
                { icon: '📶', title: 'المزامنة المحلية بدون إنترنت', desc: 'هيكلية رئيسي/تابِع للشبكة المحلية عبر Wi-Fi باستخدام WebSockets، وتخزين SQLite محلي مع معالجة تعارض المزامنة بالطوابع الزمنية.' },
                { icon: '🔍', title: 'قارئ الأسعار', desc: 'محطة مخصصة للعملاء للبحث ومسح المنتجات لمعرفة الأسعار، مع وضع عدم الاتصال الذي يستعلم من نسخة قاعدة البيانات المحلية عند انقطاع الشبكة.' },
                { icon: '👥', title: 'إدارة الموظفين والصلاحيات', desc: 'التحكم في الوصول بناءً على الأدوار (مدير، محاسب، كاشير، موظف) مع حماية الشاشات وتسجيل دخول آمن برمز PIN أو رمز الاستجابة السريعة.' },
                { icon: '🛠️', title: 'حزمة الأدوات والتخصيص', desc: 'نسخ احتياطي واستعادة بصيغة JSON، دعم 12 لغة مدمجة، تخصيص الهوية التجارية (تفاصيل المتجر، العملة، الكسور العشرية) ومظهر داكن/فاتح.' }
            ],
            featuresEn: [
                { icon: '🛒', title: 'Point of Sale (POS)', desc: 'Bilingual interface optimized for quick actions with integrated camera/QR scanning, collapsible scanner feed to avoid layout overflows, and express multi-cart system.' },
                { icon: '📦', title: 'Inventory Management', desc: 'Real-time stock tracking with auto-deductions on sales, color-coded low stock alerts, support for physical products & service items, and supplier/vendor linking.' },
                { icon: '📄', title: 'Advanced Invoicing', desc: 'Create custom invoices with item/invoice-level discounts, track paid/unpaid/partial states, view mutation history, and print formatted PDFs with store logos.' },
                { icon: '📈', title: 'Insights Dashboard', desc: 'Real-time metrics showing Total Sales, Net/Gross Profits, Expenses, and Debts with multi-period filters (Week, Month, Year) and top-sellers charts.' },
                { icon: '💸', title: 'Expense Tracking', desc: 'Log one-time expenses (Rent, Logistics, Salaries) and set up recurring expense templates with automated due calculation and alerts.' },
                { icon: '🏛️', title: 'Debt & Credit Management', desc: 'Running customer ledger balances, automatic debit/credit posting on invoices, and a self-healing database engine that auto-repairs sync anomalies.' },
                { icon: '🌍', title: 'Real-Time Cloud Sync', desc: 'Seamless multi-tenant synchronization powered by Cloud Firestore with secure custom rules and anonymous authentication fallbacks.' },
                { icon: '📶', title: 'Local LAN Sync (Offline-First)', desc: 'Master-Slave LAN architecture over Wi-Fi using shelf WebSockets, Drift SQLite local storage, and Last-Write-Wins (LWW) conflict resolution.' },
                { icon: '🔍', title: 'Price Checker (Kiosk Mode)', desc: 'Dedicated station for customer membership kiosk scanning, with offline fallback mode querying local replica database if connection drops.' },
                { icon: '👥', title: 'Staff Roles (RBAC)', desc: 'Role-Based Access Control (Admin, Manager, Cashier, Staff, PriceViewer) with screen guarding and secure PIN or QR-code logins.' },
                { icon: '🛠️', title: 'Utility & Customization Suite', desc: 'JSON Backup/Restore, 12 built-in languages, custom branding (company details, decimal limits, currency symbols), and fully responsive Light/Dark theme support.' }
            ],

            testimonialsAr: [
                { name: 'أحمد علي', role: 'صاحب سوبر ماركت', rating: 5, text: 'التطبيق سهل عليّ الكثير من الحسابات الدفترية، وأفضل ميزة هي الأمان وحفظ البيانات في درايف.' },
                { name: 'محمد قاسم', role: 'تاجر جملة', rating: 5, text: 'التقارير والإشعارات الذكية خلتني ما أنسى أي ديون. تطبيق يستحق 5 نجوم.' }
            ],
            testimonialsEn: [
                { name: 'Ahmed Ali', role: 'Supermarket Owner', rating: 5, text: 'The app made bookkeeping so much easier, and the best feature is data security in Drive.' },
                { name: 'Mohamed Qasim', role: 'Wholesaler', rating: 5, text: 'Reports and smart notifications ensure I never miss a debt. Deserves 5 stars.' }
            ]
        }
    },
    computed: {
        t() {
            return translations[this.lang];
        },
        dir() {
            return this.lang === 'ar' ? 'rtl' : 'ltr';
        },
        featuresList() {
            return this.lang === 'ar' ? this.featuresAr : this.featuresEn;
        },
        testimonialsList() {
            return this.lang === 'ar' ? this.testimonialsAr : this.testimonialsEn;
        }
    },
    methods: {
        toggleLanguage() {
            this.lang = this.lang === 'ar' ? 'en' : 'ar';
            localStorage.setItem('baytraq_lang', this.lang);
            document.title = this.t.pageTitle;
        },
        toggleTheme() {
            this.isDarkMode = !this.isDarkMode;
            localStorage.setItem('baytraq_theme', this.isDarkMode ? 'dark' : 'light');
            if (this.isDarkMode) {
                document.body.classList.add('dark-mode');
            } else {
                document.body.classList.remove('dark-mode');
            }
        },
        handleScroll() {
            this.isScrolled = window.scrollY > 20;
        },
        initLanguage() {
            // First check local storage
            const savedLang = localStorage.getItem('baytraq_lang');
            const urlParams = new URLSearchParams(window.location.search);
            const urlLang = urlParams.get('lang');
            
            if (urlLang === 'en' || urlLang === 'ar') {
                this.lang = urlLang;
            } else if (savedLang) {
                this.lang = savedLang;
            } else {
                // Auto detect browser language
                const browserLang = navigator.language || navigator.userLanguage;
                if (browserLang.toLowerCase().includes('ar')) {
                    this.lang = 'ar';
                } else {
                    this.lang = 'en';
                }
            }
            document.title = this.t.pageTitle;
        },
        initTheme() {
            const savedTheme = localStorage.getItem('baytraq_theme');
            if (savedTheme) {
                this.isDarkMode = savedTheme === 'dark';
            } else {
                // Auto detect system theme
                this.isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
            }
            if (this.isDarkMode) {
                document.body.classList.add('dark-mode');
            } else {
                document.body.classList.remove('dark-mode');
            }
        }
    },
    mounted() {
        this.initLanguage();
        this.initTheme();
        window.addEventListener('scroll', this.handleScroll);
        
        // Listen to system theme changes dynamically
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
            if (!localStorage.getItem('baytraq_theme')) {
                this.isDarkMode = e.matches;
                if (this.isDarkMode) {
                    document.body.classList.add('dark-mode');
                } else {
                    document.body.classList.remove('dark-mode');
                }
            }
        });
    },
    unmounted() {
        window.removeEventListener('scroll', this.handleScroll);
    }
});

app.mount('#app');
