const translations = {
    ar: {
        pageTitle: 'ميعاد - الصفحة الرئيسية',
        appName: 'مدارك',
        navHome: 'الرئيسية',
        navFeatures: 'المميزات',
        navTestimonials: 'آراء الزبائن',
        navPrivacy: 'سياسة الخصوصية',
        navTerms: 'شروط الخدمة',
        navChangelog: 'سجل التحديثات',
        toggleTheme: 'تبديل المظهر',
        heroBadge: 'تحديث جديد 1.1.0 🚀',
        heroTitle: 'تطبيقك الأمثل لإدارة <br><span class="highlight">الديون والأقساط</span>',
        heroSubtitle: 'يسمح ميعاد للشركات والأفراد بتتبع الاشتراكات الشهرية، الأقساط الدورية، والديون المتراكمة بكل سهولة وسلاسة.',
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
        appName: 'Madarik',
        navHome: 'Home',
        navFeatures: 'Features',
        navTestimonials: 'Testimonials',
        navPrivacy: 'Privacy Policy',
        navTerms: 'Terms of Service',
        navChangelog: 'Changelogs',
        toggleTheme: 'Toggle Theme',
        heroBadge: 'New Update 1.1.0 🚀',
        heroTitle: 'Your ultimate app for managing <br><span class="highlight">Debts & Installments</span>',
        heroSubtitle: 'MEAAD allows businesses and individuals to track monthly subscriptions, periodic installments, and accumulated debts seamlessly.',
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
                { icon: 'fas fa-bell', color: '#3b82f6', title: 'إشعارات ذكية', desc: 'تذكير تلقائي بمواعيد الدفع والأقساط لك وللزبون لتجنب التأخير.' },
                { icon: 'fas fa-file-pdf', color: '#ef4444', title: 'تقارير PDF', desc: 'توليد تقارير مالية مفصلة واحترافية بصيغة PDF بضغطة زر.' },
                { icon: 'fas fa-qrcode', color: '#10b981', title: 'بوابة رقمية بالـ QR', desc: 'يستطيع الزبون مسح الكود الخاص به لمتابعة رصيده وتحديثاته.' },
                { icon: 'fas fa-cloud', color: '#8b5cf6', title: 'مزامنة آمنة', desc: 'بياناتك محفوظة بشكل آمن في حسابك الشخصي على Google Drive.' },
                { icon: 'fas fa-fingerprint', color: '#f59e0b', title: 'قفل التطبيق', desc: 'حماية التطبيق بالبصمة أو رمز المرور لضمان خصوصية حساباتك.' },
                { icon: 'fas fa-wifi', color: '#06b6d4', title: 'يعمل بدون إنترنت', desc: 'أضف زبائنك وحساباتك حتى بدون إنترنت، وستتم المزامنة لاحقاً.' }
            ],
            featuresEn: [
                { icon: 'fas fa-bell', color: '#3b82f6', title: 'Smart Notifications', desc: 'Automatic reminders for due dates to avoid any delays.' },
                { icon: 'fas fa-file-pdf', color: '#ef4444', title: 'PDF Reports', desc: 'Generate detailed and professional financial PDF reports with one click.' },
                { icon: 'fas fa-qrcode', color: '#10b981', title: 'Digital QR Portal', desc: 'Customers can scan their QR code to track their balance instantly.' },
                { icon: 'fas fa-cloud', color: '#8b5cf6', title: 'Secure Sync', desc: 'Data is safely stored in your own personal Google Drive account.' },
                { icon: 'fas fa-fingerprint', color: '#f59e0b', title: 'App Lock', desc: 'Protect the app with Biometrics or Passcode to secure your accounts.' },
                { icon: 'fas fa-wifi', color: '#06b6d4', title: 'Offline Mode', desc: 'Add accounts offline, and it will sync automatically later.' }
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
            localStorage.setItem('madarik_lang', this.lang);
            document.title = this.t.pageTitle;
        },
        toggleTheme() {
            this.isDarkMode = !this.isDarkMode;
            localStorage.setItem('madarik_theme', this.isDarkMode ? 'dark' : 'light');
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
            const savedLang = localStorage.getItem('madarik_lang');
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
            const savedTheme = localStorage.getItem('madarik_theme');
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
            if (!localStorage.getItem('madarik_theme')) {
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
