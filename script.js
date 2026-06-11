// ============================================
//   Cox's Hub Blood (CH Blood) - Main Script
// ============================================

// --- Config ---
const botToken = '7651123120:AAHyx5hWbbA5zguNTNjFmlS-0hDsQKievp4';
const chatId   = '6662565190';
let currentLanguage = 'bn';

// --- DOM ---
const heroTitleEl       = document.querySelector('.title');
const registerBtn       = document.getElementById('registerBtn');
const formSection       = document.getElementById('formSection');
const donorForm         = document.getElementById('donorForm');
const submitBtn         = document.getElementById('submitBtn');
const lastDonationInput = document.getElementById('last_donation');
const eligibilityMeter  = document.getElementById('eligibilityMeter');
const eligibilityText   = document.getElementById('eligibilityText');
const thankYouPopup     = document.getElementById('thankYouPopup');
const closePopup        = document.getElementById('closePopup');
const languageToggle    = document.getElementById('languageToggle');
const loadingScreen     = document.getElementById('loadingScreen');
const formContainer     = document.getElementById('formContainer');
const heroSection       = document.getElementById('hero');
const counterSection    = document.getElementById('counterSection');
const impactSection     = document.getElementById('impactSection');
const faqSection        = document.getElementById('faqSection');
const faqItems          = document.querySelectorAll('.faq-item');
const themeToggle       = document.getElementById('themeToggle');
const themeIcon         = document.getElementById('themeIcon');
const navHamburger      = document.getElementById('navHamburger');
const mobileMenu        = document.getElementById('mobileMenu');
const mainNav           = document.getElementById('mainNav');
const emergencyBanner   = document.getElementById('emergencyBanner');
const emergencyClose    = document.getElementById('emergencyClose');
const searchDonorBtn    = document.getElementById('searchDonorBtn');
const resultsGrid       = document.getElementById('resultsGrid');
const noResults         = document.getElementById('noResults');
const viewCertBtn       = document.getElementById('viewCertBtn');
const certificatePopup  = document.getElementById('certificatePopup');
const certCloseBtn      = document.getElementById('certCloseBtn');
const certDownloadBtn   = document.getElementById('certDownloadBtn');
const certShareBtn      = document.getElementById('certShareBtn');
const campsGrid         = document.getElementById('campsGrid');

// ============================================
//   TRANSLATIONS
// ============================================
const translations = {
    en: {
        title: "Be a Blood <span>Hero</span>",
        heroBadge: "🩸 Cox's Bazar Blood Donor Network",
        subtitle: "One blood donation can save thousands of lives.",
        registerButton: "Register Now",
        findDonorBtn: "Find Donor 🔍",
        scrollText: "Scroll Down",
        navImpact: "Why Donate?",
        navSearch: "Find Donor",
        navRegister: "Register",
        navCamps: "Camps",
        navFaq: "FAQ",
        emergencyLabel: "URGENT:",
        emergencyMsg: "Cox's Bazar Sadar Hospital urgently needs <strong>O+</strong> blood! Contact now.",
        counterText: "Blood Donor Heroes",
        counterLives: "Lives Saved",
        counterCamps: "Camps Held",
        impactTitle: "Why is Blood Donation Important?",
        impactFact1: "can save up to 3 lives.",
        impactFact2: "someone needs blood.",
        impactFact3: "can be a life-saving hero.",
        searchTitle: "Find a Blood Donor",
        searchSubtitle: "Search by blood group and area to find a nearby donor",
        searchBloodLabel: "Blood Group",
        searchAllGroups: "All Groups",
        searchAreaLabel: "Area",
        searchAllAreas: "All Areas",
        areaSadar: "Cox's Bazar Sadar",
        areaTek: "Teknaf",
        areaUk: "Ukhia",
        areaRamu: "Ramu",
        areaChak: "Chakaria",
        areaPek: "Pekua",
        areaMoh: "Moheshkhali",
        areaKut: "Kutubdia",
        searchBtn: "🔍 Search",
        noResultsMsg: "No donors found at this time. Be the first to register!",
        formTitle: "Donor Registration Form",
        nameLabel: "Full Name",
        currentAddressLabel: "Current Address",
        permanentAddressLabel: "Permanent Address (Optional)",
        phone1Label: "Emergency Number 1",
        phone2Label: "Emergency Number 2 (Optional)",
        voiceInputTitle: "Voice Input",
        bloodGroupPlaceholder: "Select Your Blood Group",
        bloodGroupLabel: "",
        lastDonationLabel: "Last Donation Date",
        eligibilityLabel: "Donation Eligibility",
        eligibilityDateSelect: "Select Date",
        eligibilityDaysRemaining: "days remaining",
        eligibilityEligible: "Eligible to Donate!",
        healthIssuesLabel: "Health Issues (if any)",
        submitButton: "Submit Now",
        campTitle: "Upcoming Blood Donation Camps",
        campSubtitle: "List of upcoming blood donation camps in Cox's Bazar",
        campRegisterBtn: "Register for Camp",
        testimonialTitle: "Donor Experiences",
        testimonialSubtitle: "From those who saved lives",
        t1text: "The joy of donating blood is unmatched. A little courage can save a life.",
        t1name: "Rafiqul Islam",
        t1bg: "Blood Group: O+",
        t2text: "When my mother needed surgery, Cox's Hub Blood (CH Blood) was there for us.",
        t2name: "Sumaiya Akter",
        t2bg: "Blood Group: A+",
        t3text: "I donate every three months. It has become my routine. You can too!",
        t3name: "Kamal Hossain",
        t3bg: "Blood Group: B+",
        certTitle: "Blood Donor Hero Certificate",
        certOrg: "COX'S HUB BLOOD | CH BLOOD",
        certThis: "This certificate is awarded to",
        certMsg: "You are a proud Blood Donor Hero! Thank you sincerely for this noble initiative.",
        certDownload: "📥 Download Certificate",
        certShare: "📤 Share",
        viewCert: "🏅 View Certificate",
        thankYouTitle: "Thank You!",
        thankYouMessage: "Your info has been submitted. You are now a blood donor hero!",
        thankYouMessage2: "You may be contacted in case of emergency.",
        sharePrompt: "Inspire your friends:",
        closePopup: "Okay",
        faqTitle: "Frequently Asked Questions",
        faqQ1: "Who can donate blood?",
        faqA1: "Generally, any healthy adult between 18–60 years old, weighing 45kg or more, can donate. You shouldn't have Hepatitis B/C, AIDS, and should not have donated in the last 4 months.",
        faqQ2: "How often can I donate?",
        faqA2: "Healthy men can donate every 3 months; healthy women every 4 months.",
        faqQ3: "Are there any side effects?",
        faqA3: "Blood donation is safe. You may feel slight weakness temporarily, which resolves with rest and fluids.",
        faqQ4: "Any special preparation needed?",
        faqA4: "Get enough sleep, eat a healthy meal before donating, and drink plenty of water.",
        footerText1: "One donation, a new life.",
        footerOwner: "🎀  Muslim Uddin MK  🎀",
        loadingText: "♥ Loading ♥..."
    },
    bn: {
        title: "রক্তদাতা <span>হিরো</span> হোন",
        heroBadge: "🩸 কক্সবাজার রক্তদাতা নেটওয়ার্ক",
        subtitle: "একটি রক্তদান হাজার জীবন বাঁচাতে পারে।",
        registerButton: "রেজিস্টার করুন",
        findDonorBtn: "ডোনার খুঁজুন 🔍",
        scrollText: "স্ক্রল করুন",
        navImpact: "কেন রক্তদান?",
        navSearch: "ডোনার খুঁজুন",
        navRegister: "রেজিস্টার",
        navCamps: "ক্যাম্প",
        navFaq: "FAQ",
        emergencyLabel: "জরুরি প্রয়োজন:",
        emergencyMsg: "কক্সবাজার সদর হাসপাতালে <strong>O+</strong> রক্তের জরুরি প্রয়োজন! এখনই যোগাযোগ করুন।",
        counterText: "জন রক্তদাতা হিরো",
        counterLives: "জীবন বাঁচানো হয়েছে",
        counterCamps: "টি ক্যাম্প অনুষ্ঠিত",
        impactTitle: "রক্তদান কেন গুরুত্বপূর্ণ?",
        impactFact1: "৩টি জীবন বাঁচাতে পারে।",
        impactFact2: "কারো না কারো রক্তের প্রয়োজন হয়।",
        impactFact3: "একজন জীবন রক্ষাকারী হিরো হতে।",
        searchTitle: "রক্তদাতা খুঁজুন",
        searchSubtitle: "রক্তের গ্রুপ ও এলাকা দিয়ে নিকটস্থ ডোনার খুঁজুন",
        searchBloodLabel: "রক্তের গ্রুপ",
        searchAllGroups: "সব গ্রুপ",
        searchAreaLabel: "এলাকা",
        searchAllAreas: "সব এলাকা",
        areaSadar: "কক্সবাজার সদর",
        areaTek: "টেকনাফ",
        areaUk: "উখিয়া",
        areaRamu: "রামু",
        areaChak: "চকরিয়া",
        areaPek: "পেকুয়া",
        areaMoh: "মহেশখালী",
        areaKut: "কুতুবদিয়া",
        searchBtn: "🔍 খুঁজুন",
        noResultsMsg: "এই মুহূর্তে কোনো ডোনার পাওয়া যায়নি। আপনি নিজে রেজিস্ট্রেশন করুন!",
        formTitle: "রক্তদাতা তথ্য ফর্ম",
        nameLabel: "পূর্ণ নাম",
        currentAddressLabel: "বর্তমান ঠিকানা",
        permanentAddressLabel: "স্থায়ী ঠিকানা (ঐচ্ছিক)",
        phone1Label: "জরুরি নম্বর ১",
        phone2Label: "জরুরি নম্বর ২ (ঐচ্ছিক)",
        voiceInputTitle: "ভয়েস ইনপুট",
        bloodGroupPlaceholder: "আপনার রক্তের গ্রুপ নির্বাচন করুন",
        bloodGroupLabel: "",
        lastDonationLabel: "শেষ রক্তদানের তারিখ",
        eligibilityLabel: "রক্তদানের উপযুক্ততা",
        eligibilityDateSelect: "তারিখ সিলেক্ট করুন",
        eligibilityDaysRemaining: "দিন বাকি",
        eligibilityEligible: "রক্তদানের জন্য উপযুক্ত!",
        healthIssuesLabel: "শারীরিক সমস্যা (যদি থাকে)",
        submitButton: "সাবমিট করুন",
        campTitle: "আসন্ন রক্তদান ক্যাম্প",
        campSubtitle: "কক্সবাজারে আসন্ন রক্তদান ক্যাম্পের তালিকা",
        campRegisterBtn: "ক্যাম্পে রেজিস্টার করুন",
        testimonialTitle: "ডোনারদের অভিজ্ঞতা",
        testimonialSubtitle: "তাদের কথা যারা জীবন বাঁচিয়েছেন",
        t1text: "রক্তদান করে যে আনন্দ পেয়েছি, তা অন্য কিছুতে পাইনি। একটু সাহস করলে একটি জীবন বাঁচানো যায়।",
        t1name: "রফিকুল ইসলাম",
        t1bg: "রক্তের গ্রুপ: O+",
        t2text: "আমার মা-র অপারেশনের সময় রক্তের প্রয়োজন হয়েছিল। Cox's Hub Blood তখন আমাদের পাশে ছিল।",
        t2name: "সুমাইয়া আক্তার",
        t2bg: "রক্তের গ্রুপ: A+",
        t3text: "প্রতি তিন মাসে একবার রক্ত দিই। এটা আমার নিয়ম হয়ে গেছে। আপনিও পারেন!",
        t3name: "কামাল হোসেন",
        t3bg: "রক্তের গ্রুপ: B+",
        certTitle: "রক্তদাতা হিরো সার্টিফিকেট",
        certOrg: "COX'S HUB BLOOD | CH BLOOD",
        certThis: "এই সার্টিফিকেট প্রদান করা হচ্ছে",
        certMsg: "আপনি একজন গর্বিত রক্তদাতা হিরো! আপনার এই মহৎ উদ্যোগের জন্য আন্তরিক ধন্যবাদ।",
        certDownload: "📥 সার্টিফিকেট ডাউনলোড করুন",
        certShare: "📤 শেয়ার করুন",
        viewCert: "🏅 সার্টিফিকেট দেখুন",
        thankYouTitle: "ধন্যবাদ!",
        thankYouMessage: "আপনার তথ্য সফলভাবে জমা হয়েছে। আপনি এখন একজন রক্তদাতা হিরো!",
        thankYouMessage2: "জরুরি প্রয়োজনে আপনার সাথে যোগাযোগ করা হতে পারে।",
        sharePrompt: "আপনার বন্ধুদের অনুপ্রাণিত করুন:",
        closePopup: "ঠিক আছে",
        faqTitle: "সাধারণ জিজ্ঞাসা",
        faqQ1: "কারা রক্ত দিতে পারবেন?",
        faqA1: "সাধারণত ১৮ থেকে ৬০ বছর বয়সী যেকোন সুস্থ মানুষ, যাদের ওজন ৪৫ কেজি বা তার বেশি, তারা রক্ত দিতে পারবেন।",
        faqQ2: "কতদিন পর পর রক্ত দেওয়া যায়?",
        faqA2: "একজন সুস্থ পুরুষ প্রতি ৩ মাস পর পর এবং একজন সুস্থ মহিলা প্রতি ৪ মাস পর পর রক্তদান করতে পারেন।",
        faqQ3: "রক্ত দিলে কি শারীরিক কোনো অসুবিধা হয়?",
        faqA3: "রক্তদান একটি নিরাপদ প্রক্রিয়া। সাময়িকভাবে হালকা দুর্বলতা বা ঝিমুনি লাগতে পারে, যা পর্যাপ্ত বিশ্রাম ও তরল গ্রহণে ঠিক হয়ে যায়।",
        faqQ4: "রক্তদানের আগে কি বিশেষ প্রস্তুতির প্রয়োজন?",
        faqA4: "রাতে পর্যাপ্ত ঘুম ও সকালে স্বাস্থ্যকর নাস্তা করুন। খালি পেটে রক্তদান করবেন না।",
        footerText1: "একটি রক্তদান, একটি নতুন জীবন।",
        footerOwner: "🎀  মুসলিম উদ্দিন এমকে  🎀",
        loadingText: "♥ Loading ♥..."
    }
};

// ============================================
//   API CONFIG
// ============================================
// Vercel-এ deploy করলে same origin থেকে call হবে
const API_BASE = '/api';

function isDonorEligible(lastDonationDateStr) {
    if (!lastDonationDateStr) return false;
    const last  = new Date(lastDonationDateStr);
    const today = new Date();
    last.setHours(0,0,0,0); today.setHours(0,0,0,0);
    return Math.floor((today - last) / 86400000) >= 120;
}

// ============================================
//   UTILITY
// ============================================
function debounce(func, wait = 15, immediate = true) {
    let timeout;
    return function () {
        const ctx = this, args = arguments;
        const later = () => { timeout = null; if (!immediate) func.apply(ctx, args); };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(ctx, args);
    };
}

// ============================================
//   DARK MODE
// ============================================
function initTheme() {
    const saved = localStorage.getItem('coxsTheme') || 'light';
    applyTheme(saved);
}

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('coxsTheme', theme);
    if (themeIcon) themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
}

function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    applyTheme(current === 'dark' ? 'light' : 'dark');
}

// ============================================
//   NAVBAR — scroll effect & hamburger
// ============================================
function setupNavbar() {
    // Scroll shadow
    window.addEventListener('scroll', () => {
        if (mainNav) mainNav.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });

    // Hamburger toggle
    if (navHamburger && mobileMenu) {
        navHamburger.addEventListener('click', () => {
            const open = mobileMenu.classList.toggle('open');
            navHamburger.classList.toggle('active', open);
            navHamburger.setAttribute('aria-expanded', String(open));
            mobileMenu.setAttribute('aria-hidden', String(!open));
        });

        // Close on link click
        mobileMenu.querySelectorAll('.mobile-nav-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('open');
                navHamburger.classList.remove('active');
                navHamburger.setAttribute('aria-expanded', 'false');
                mobileMenu.setAttribute('aria-hidden', 'true');
            });
        });
    }

    // Active link highlight on scroll
    const sections = document.querySelectorAll('section[id], div[id]');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.toggle(
                        'active-nav',
                        link.getAttribute('href') === '#' + entry.target.id
                    );
                });
            }
        });
    }, { rootMargin: '-40% 0px -55% 0px' });
    sections.forEach(s => observer.observe(s));
}

// ============================================
//   EMERGENCY BANNER
// ============================================
function setupEmergencyBanner() {
    if (!emergencyBanner || !emergencyClose) return;
    // Hide if dismissed this session
    if (sessionStorage.getItem('emergencyDismissed')) {
        emergencyBanner.classList.add('hidden');
        adjustBodyPadding();
        return;
    }
    adjustBodyPadding();
    emergencyClose.addEventListener('click', () => {
        emergencyBanner.classList.add('hidden');
        sessionStorage.setItem('emergencyDismissed', '1');
        adjustBodyPadding();
    });
}

function adjustBodyPadding() {
    const navH   = mainNav   ? mainNav.offsetHeight   : 68;
    const banH   = (emergencyBanner && !emergencyBanner.classList.contains('hidden'))
                   ? emergencyBanner.offsetHeight : 0;
    document.body.style.paddingTop = (navH + banH) + 'px';
}

// ============================================
//   LANGUAGE
// ============================================
function updateLanguage(lang) {
    document.documentElement.lang = lang;
    currentLanguage = lang;
    if (languageToggle) languageToggle.textContent = lang === 'bn' ? 'EN' : 'BN';

    // H1 with inner span
    if (heroTitleEl) heroTitleEl.innerHTML = translations[lang].title;

    document.querySelectorAll('[data-lang-key]:not(.title)').forEach(el => {
        const key = el.getAttribute('data-lang-key');
        const val = translations[lang]?.[key];
        if (val === undefined) return;

        if (key === 'voiceInputTitle') {
            el.setAttribute('title', val);
        } else if (key === 'registerButton') {
            el.innerHTML = val + ' <span class="pulse">→</span>';
        } else if (key === 'submitButton') {
            const sp = el.querySelector('span[data-lang-key="submitButton"]');
            if (sp) sp.textContent = val;
            else el.textContent = val;
        } else if (el.tagName === 'OPTION' && el.disabled) {
            el.textContent = val;
        } else if (key === 'emergencyMsg') {
            el.innerHTML = val; // allow <strong>
        } else {
            el.textContent = val;
        }
    });

    updateEligibility();
    renderCamps();

    if (window.speechRecognitionInstancePhone1)
        window.speechRecognitionInstancePhone1.lang = lang === 'bn' ? 'bn-BD' : 'en-US';
    if (window.speechRecognitionInstancePhone2)
        window.speechRecognitionInstancePhone2.lang = lang === 'bn' ? 'bn-BD' : 'en-US';
}

// ============================================
//   NOTICES — Homepage থেকে load
// ============================================
async function loadActiveNotices() {
    try {
        const res  = await fetch(`${API_BASE}/notices`);
        const data = await res.json();
        if (!data.success || !data.notices?.length) return;

        const banner   = document.getElementById('emergencyBanner');
        const textEl   = document.getElementById('emergencyText');
        if (!banner || !textEl) return;

        // Show first active notice in emergency banner
        const notice = data.notices[0];
        const typeIcon = { info:'ℹ️', warning:'⚠️', danger:'🚨', success:'✅' };
        const icon = typeIcon[notice.type] || '📢';

        textEl.innerHTML = `<strong>${icon} ${notice.title}:</strong> ${notice.message}`;

        // Color by type
        const colors = {
            info:    'linear-gradient(90deg,#0077cc,#0099ff,#0077cc)',
            warning: 'linear-gradient(90deg,#cc8800,#ffaa00,#cc8800)',
            danger:  'linear-gradient(90deg,#c1121f,#e63946,#c1121f)',
            success: 'linear-gradient(90deg,#1a7a40,#28a745,#1a7a40)',
        };
        banner.style.background = colors[notice.type] || colors.danger;
        banner.classList.remove('hidden');
        adjustBodyPadding();

        // If multiple notices, add a ticker for the rest
        if (data.notices.length > 1) {
            let idx = 0;
            setInterval(() => {
                idx = (idx + 1) % data.notices.length;
                const n = data.notices[idx];
                const ic = typeIcon[n.type] || '📢';
                textEl.innerHTML = `<strong>${ic} ${n.title}:</strong> ${n.message}`;
                banner.style.background = colors[n.type] || colors.danger;
            }, 6000);
        }
    } catch (_) { /* notices optional, fail silently */ }
}
function setupDonorSearch() {
    if (!searchDonorBtn) return;
    searchDonorBtn.addEventListener('click', runSearch);
    document.getElementById('searchBloodGroup')?.addEventListener('keydown', e => { if (e.key === 'Enter') runSearch(); });
    document.getElementById('searchArea')?.addEventListener('keydown',       e => { if (e.key === 'Enter') runSearch(); });
}

async function runSearch() {
    const blood = document.getElementById('searchBloodGroup')?.value || '';
    const area  = document.getElementById('searchArea')?.value        || '';

    // Loading state
    if (resultsGrid) {
        resultsGrid.innerHTML = `
            <div class="search-loading" style="grid-column:1/-1;text-align:center;padding:40px;color:var(--light-gray);">
                <div class="submit-spinner" style="display:inline-block;opacity:1;position:static;transform:none;
                    border-color:rgba(230,57,70,0.3);border-top-color:var(--blood-red);width:32px;height:32px;"></div>
                <p style="margin-top:12px;font-size:0.95rem;">খোঁজা হচ্ছে...</p>
            </div>`;
    }
    noResults?.classList.add('hidden');

    try {
        const params = new URLSearchParams();
        if (blood) params.set('blood', blood);
        if (area)  params.set('area',  area);

        const res  = await fetch(`${API_BASE}/search?${params.toString()}`);
        const json = await res.json();

        if (!json.success) throw new Error(json.message);
        renderDonorResults(json.donors || []);

    } catch (err) {
        if (resultsGrid) resultsGrid.innerHTML = '';
        if (noResults) {
            noResults.textContent = currentLanguage === 'bn'
                ? '⚠️ ডেটা লোড করতে সমস্যা হয়েছে। পুনরায় চেষ্টা করুন।'
                : '⚠️ Failed to load data. Please try again.';
            noResults.classList.remove('hidden');
        }
        console.error('Search error:', err.message);
    }
}

function renderDonorResults(donors) {
    if (!resultsGrid || !noResults) return;
    resultsGrid.innerHTML = '';

    if (donors.length === 0) {
        noResults.classList.remove('hidden');
        return;
    }
    noResults.classList.add('hidden');

    const areaLabels = {
        sadar: { bn: 'কক্সবাজার সদর', en: "Cox's Bazar Sadar" },
        teknaf: { bn: 'টেকনাফ', en: 'Teknaf' },
        ukhia:  { bn: 'উখিয়া', en: 'Ukhia' },
        ramu:   { bn: 'রামু', en: 'Ramu' },
        chakaria:    { bn: 'চকরিয়া', en: 'Chakaria' },
        pekua:       { bn: 'পেকুয়া', en: 'Pekua' },
        moheshkhali: { bn: 'মহেশখালী', en: 'Moheshkhali' },
        kutubdia:    { bn: 'কুতুবদিয়া', en: 'Kutubdia' },
    };

    donors.forEach((donor, i) => {
        const eligible  = isDonorEligible(donor.lastDonation);
        const areaLabel = areaLabels[donor.area]?.[currentLanguage] || donor.area;
        const eligibleLabelBn = eligible ? '✅ উপযুক্ত' : '⏳ অপেক্ষমান';
        const eligibleLabelEn = eligible ? '✅ Eligible'  : '⏳ Waiting';
        const eligibleLabel   = currentLanguage === 'bn' ? eligibleLabelBn : eligibleLabelEn;
        const addrLabel = currentLanguage === 'bn' ? 'এলাকা' : 'Area';
        const phoneLabel = currentLanguage === 'bn' ? 'নম্বর' : 'Phone';

        const card = document.createElement('div');
        card.className = 'donor-card';
        card.style.animationDelay = `${i * 60}ms`;
        card.innerHTML = `
            <div class="donor-card-top">
                <span class="donor-name">${donor.name}</span>
                <span class="donor-blood-badge">${donor.blood}</span>
            </div>
            <p class="donor-info">📍 ${addrLabel}: <span>${areaLabel}</span></p>
            <p class="donor-info">📞 ${phoneLabel}: <span>${donor.phone}</span></p>
            <span class="donor-eligible ${eligible ? 'yes' : 'no'}">${eligibleLabel}</span>
        `;
        resultsGrid.appendChild(card);
    });
}

// ============================================
//   DONATION CAMPS
// ============================================
const campData = [
    {
        day: '25', month: { bn: 'জুন ২০২৬', en: 'Jun 2026' },
        name: { bn: 'কক্সবাজার সদর রক্তদান ক্যাম্প', en: "Cox's Bazar Sadar Blood Donation Camp" },
        venue: { bn: 'কক্সবাজার সদর হাসপাতাল', en: "Cox's Bazar Sadar Hospital" },
        time: { bn: 'সকাল ৯টা – বিকাল ৪টা', en: '9:00 AM – 4:00 PM' },
    },
    {
        day: '05', month: { bn: 'জুলাই ২০২৬', en: 'Jul 2026' },
        name: { bn: 'টেকনাফ স্বেচ্ছা রক্তদান ক্যাম্প', en: 'Teknaf Voluntary Blood Donation Camp' },
        venue: { bn: 'টেকনাফ উপজেলা স্বাস্থ্য কমপ্লেক্স', en: 'Teknaf Upazila Health Complex' },
        time: { bn: 'সকাল ১০টা – বিকাল ৩টা', en: '10:00 AM – 3:00 PM' },
    },
    {
        day: '18', month: { bn: 'জুলাই ২০২৬', en: 'Jul 2026' },
        name: { bn: 'রামু যুব রক্তদান উৎসব', en: 'Ramu Youth Blood Donation Festival' },
        venue: { bn: 'রামু উপজেলা পরিষদ', en: 'Ramu Upazila Council' },
        time: { bn: 'সকাল ৯টা – দুপুর ২টা', en: '9:00 AM – 2:00 PM' },
    },
];

function renderCamps() {
    if (!campsGrid) return;
    campsGrid.innerHTML = '';
    const lang = currentLanguage;
    const registerLabel = translations[lang].campRegisterBtn;

    campData.forEach(camp => {
        const card = document.createElement('div');
        card.className = 'camp-card';
        card.innerHTML = `
            <div class="camp-date-badge">
                <div class="camp-date-day">${camp.day}</div>
                <div class="camp-date-month">${camp.month[lang]}</div>
            </div>
            <div class="camp-body">
                <h3 class="camp-name">${camp.name[lang]}</h3>
                <p class="camp-meta">📍 <span>${camp.venue[lang]}</span></p>
                <p class="camp-meta">🕐 <span>${camp.time[lang]}</span></p>
                <a href="#formSection" class="camp-register-btn">${registerLabel}</a>
            </div>
        `;
        campsGrid.appendChild(card);
    });
}

// ============================================
//   ELIGIBILITY METER
// ============================================
function updateEligibility() {
    if (!lastDonationInput || !eligibilityText || !eligibilityMeter) return;
    if (!lastDonationInput.value) {
        eligibilityText.textContent = translations[currentLanguage].eligibilityDateSelect;
        eligibilityMeter.style.width = '0%';
        eligibilityMeter.style.backgroundColor = 'var(--light-gray)';
        return;
    }
    const donation = new Date(lastDonationInput.value);
    const today    = new Date();
    donation.setHours(0,0,0,0); today.setHours(0,0,0,0);
    const diffDays = Math.max(0, Math.floor((today - donation) / 86400000));
    const required = 120;
    const pct      = Math.min(100, (diffDays / required) * 100);
    eligibilityMeter.style.width = `${pct}%`;
    // Update progressbar aria
    const container = document.querySelector('.eligibility-meter-container');
    if (container) container.setAttribute('aria-valuenow', Math.round(pct));
    if (pct < 100) {
        eligibilityText.textContent = `${required - diffDays} ${translations[currentLanguage].eligibilityDaysRemaining}`;
        eligibilityMeter.style.backgroundColor = 'var(--warning-yellow)';
    } else {
        eligibilityText.textContent = translations[currentLanguage].eligibilityEligible;
        eligibilityMeter.style.backgroundColor = 'var(--success-green)';
    }
}

// ============================================
//   SOCIAL SHARING
// ============================================
function setupSharingLinks() {
    const url       = window.location.href;
    const textBn    = `আমি এইমাত্র ${url} -এ একজন রক্তদাতা হিরো হিসেবে রেজিস্টার করেছি! #রক্তদাতা #CHBlood #CoxsHubBlood`;
    const textEn    = `I just registered as a blood donor hero on ${url}! #BloodDonor #CHBlood #CoxsHubBlood`;
    const shareText = currentLanguage === 'bn' ? textBn : textEn;
    const shareTitle = currentLanguage === 'bn' ? 'আমি একজন রক্তদাতা হিরো!' : "I'm a Blood Donor Hero!";

    const fb = document.getElementById('shareFacebook');
    const tw = document.getElementById('shareTwitter');
    const wa = document.getElementById('shareWhatsApp');
    if (fb) fb.href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(shareText)}`;
    if (tw) tw.href = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(shareTitle)}`;
    if (wa) wa.href = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
}

// ============================================
//   VOICE INPUT
// ============================================
function setupVoiceInput() {
    if (!('webkitSpeechRecognition' in window)) {
        document.querySelectorAll('.voice-input-btn').forEach(b => b.style.display = 'none');
        return;
    }
    const create = (btnId, inputId, instanceKey) => {
        const rec   = new window.webkitSpeechRecognition();
        const btn   = document.getElementById(btnId);
        const input = document.getElementById(inputId);
        if (!btn || !input) return;
        rec.lang = currentLanguage === 'bn' ? 'bn-BD' : 'en-US';
        rec.continuous = false; rec.interimResults = false;
        window[instanceKey] = rec;
        btn.addEventListener('click', () => {
            rec.lang = currentLanguage === 'bn' ? 'bn-BD' : 'en-US';
            try { rec.start(); btn.classList.add('listening'); } catch (_) { btn.classList.remove('listening'); }
        });
        rec.onresult = e => {
            input.value = e.results[0][0].transcript.replace(/\s+/g, '');
            input.dispatchEvent(new Event('input', { bubbles: true }));
            input.dispatchEvent(new Event('blur',  { bubbles: true }));
        };
        rec.onerror = rec.onend = () => btn.classList.remove('listening');
    };
    create('voiceBtn1', 'phone1', 'speechRecognitionInstancePhone1');
    create('voiceBtn2', 'phone2', 'speechRecognitionInstancePhone2');
}

// ============================================
//   COUNTER ANIMATION
// ============================================
function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-count-to'), 10);
    if (isNaN(target) || el.classList.contains('animated')) return;
    el.classList.add('animated');
    let current = 0;
    const inc      = Math.max(1, Math.floor(target / 100));
    const stepTime = Math.max(10, Math.floor(1800 / (target / inc)));
    const timer = setInterval(() => {
        current += inc;
        if (current >= target) { current = target; clearInterval(timer); }
        el.textContent = current;
    }, stepTime);
}

// ============================================
//   INTERSECTION OBSERVER
// ============================================
function setupIntersectionObserver() {
    const targets = document.querySelectorAll(
        '.fact-card, .form-container, .counter-section, .impact-section, .faq-section, .fade-section'
    );
    if (!targets.length) return;

    const obs = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            if (el.classList.contains('fact-card')) {
                const siblings = Array.from(el.parentNode.children).filter(c => c.classList.contains('fact-card'));
                el.style.transitionDelay = `${siblings.indexOf(el) * 150}ms`;
            } else {
                el.style.transitionDelay = '0ms';
            }
            el.classList.add('is-visible');
            if (el.id === 'counterSection') {
                el.querySelectorAll('.counter-number').forEach(animateCounter);
            }
            observer.unobserve(el);
        });
    }, { rootMargin: '0px 0px -70px 0px', threshold: 0.1 });

    targets.forEach(el => obs.observe(el));
}

// ============================================
//   FORM VALIDATION
// ============================================
function validateInput(input, mark = true) {
    const group = input.closest('.input-group');
    if (!group) return false;
    const icon = group.querySelector('.validation-icon');
    if (mark && icon) group.classList.add('validated');

    const badSelect  = input.tagName === 'SELECT' && input.required && input.value === '';
    const emptyReq   = input.required && input.value.trim() === '';
    const badPattern = input.pattern && !input.checkValidity() && input.value.trim() !== '';
    const valid      = !badSelect && !emptyReq && !badPattern && input.checkValidity();
    const optEmpty   = !input.required && input.value.trim() === '';

    if (valid || optEmpty) {
        if (icon) { group.classList.add('valid');   group.classList.remove('invalid'); }
    } else {
        if (icon) { group.classList.add('invalid'); group.classList.remove('valid'); }
    }
    return valid || optEmpty;
}

function setupValidation() {
    if (!donorForm) return;
    donorForm.querySelectorAll('input[required], select[required], input[pattern]').forEach(input => {
        let icon = input.parentNode.querySelector('.validation-icon');
        if (!icon) {
            icon = document.createElement('span');
            icon.className = 'validation-icon';
            const vBtn = input.parentNode.querySelector('.voice-input-btn');
            vBtn ? input.parentNode.insertBefore(icon, vBtn) : input.parentNode.appendChild(icon);
        }
        input.addEventListener('blur',  () => validateInput(input));
        input.addEventListener('input', debounce(() => validateInput(input), 400, false));
        input.addEventListener('focus', () => input.closest('.input-group')?.classList.remove('valid','invalid','validated'));
    });
}

function clearValidation() {
    donorForm?.querySelectorAll('.input-group').forEach(g => g.classList.remove('validated','valid','invalid'));
}

// ============================================
//   FAQ ACCORDION
// ============================================
function setupFAQ() {
    faqItems.forEach(item => {
        const q = item.querySelector('.faq-question');
        const a = item.querySelector('.faq-answer');
        if (!q || !a) return;
        q.setAttribute('aria-expanded', 'false');
        a.setAttribute('aria-hidden', 'true');
        const toggle = () => {
            const active = item.classList.contains('active');
            faqItems.forEach(other => {
                if (other !== item && other.classList.contains('active')) {
                    other.classList.remove('active');
                    other.querySelector('.faq-question')?.setAttribute('aria-expanded', 'false');
                    other.querySelector('.faq-answer')?.setAttribute('aria-hidden', 'true');
                }
            });
            item.classList.toggle('active');
            q.setAttribute('aria-expanded', String(!active));
            a.setAttribute('aria-hidden', String(active));
        };
        q.addEventListener('click', toggle);
        q.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); } });
    });
}

// ============================================
//   HERO PARALLAX
// ============================================
function setupParallax() {
    const hearts = document.querySelectorAll('.animated-heart');
    if (!hearts.length || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let rafId = null;
    heroSection?.addEventListener('mousemove', e => {
        if (!rafId) rafId = requestAnimationFrame(() => {
            const r  = heroSection.getBoundingClientRect();
            const cx = r.left + r.width / 2 + window.scrollX;
            const cy = r.top  + r.height/ 2 + window.scrollY;
            const x  = (e.pageX - cx) / (r.width  / 2);
            const y  = (e.pageY - cy) / (r.height / 2);
            hearts.forEach(h => {
                const d = parseFloat(h.getAttribute('data-parallax-depth') || 0.2);
                h.style.transform = `translate(${-x*18*d}px,${-y*18*d}px)`;
            });
            rafId = null;
        });
    });
    heroSection?.addEventListener('mouseleave', () => {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = null;
        hearts.forEach(h => (h.style.transform = 'translate(0,0)'));
    });
}

// ============================================
//   DONOR CERTIFICATE
// ============================================
let lastRegisteredDonor = { name: '—', blood: '—' };

function showCertificate(donorName, bloodGroup) {
    const nameEl  = document.getElementById('certDonorName');
    const badgeEl = document.getElementById('certBloodBadge');
    const dateEl  = document.getElementById('certDate');
    if (nameEl)  nameEl.textContent  = donorName  || '—';
    if (badgeEl) badgeEl.textContent = bloodGroup || '—';
    if (dateEl)  dateEl.textContent  = new Date().toLocaleDateString(
        currentLanguage === 'bn' ? 'bn-BD' : 'en-GB',
        { year: 'numeric', month: 'long', day: 'numeric' }
    );
    if (certificatePopup) {
        certificatePopup.classList.add('active');
        certificatePopup.setAttribute('aria-hidden', 'false');
    }
}

function setupCertificate() {
    // View cert from thank-you popup
    viewCertBtn?.addEventListener('click', () => {
        thankYouPopup?.classList.remove('active');
        showCertificate(lastRegisteredDonor.name, lastRegisteredDonor.blood);
    });

    // Close certificate
    certCloseBtn?.addEventListener('click', closeCertificate);
    certificatePopup?.addEventListener('click', e => {
        if (e.target === certificatePopup) closeCertificate();
    });

    // Download (canvas-based screenshot via print dialog fallback)
    certDownloadBtn?.addEventListener('click', () => {
        const card   = document.getElementById('certificateCard');
        const name   = document.getElementById('certDonorName')?.textContent || 'Donor';
        // Try html2canvas if available, else fallback to print
        if (window.html2canvas) {
            window.html2canvas(card, { scale: 2, useCORS: true }).then(canvas => {
                const link      = document.createElement('a');
                link.download   = `CHBlood_Certificate_${name}.png`;
                link.href       = canvas.toDataURL('image/png');
                link.click();
            });
        } else {
            // Fallback: open print dialog
            window.print();
        }
    });

    // Share certificate
    certShareBtn?.addEventListener('click', () => {
        const name   = document.getElementById('certDonorName')?.textContent || '';
        const blood  = document.getElementById('certBloodBadge')?.textContent || '';
        const text   = currentLanguage === 'bn'
            ? `আমি ${name} — একজন গর্বিত রক্তদাতা হিরো (${blood})! 🩸 Cox's Hub Blood (CH Blood) | ${window.location.href}`
            : `I'm ${name} — a proud Blood Donor Hero (${blood})! 🩸 Cox's Hub Blood (CH Blood) | ${window.location.href}`;
        if (navigator.share) {
            navigator.share({ title: "Cox's Hub Blood | CH Blood Certificate", text }).catch(() => {});
        } else {
            const wa = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
            window.open(wa, '_blank', 'noopener');
        }
    });
}

function closeCertificate() {
    if (certificatePopup) {
        certificatePopup.classList.remove('active');
        certificatePopup.setAttribute('aria-hidden', 'true');
    }
}

// ============================================
//   FORM SUBMISSION
// ============================================
async function handleFormSubmit(e) {
    e.preventDefault();
    let valid = true, firstInvalid = null;
    donorForm.querySelectorAll('input[required], select[required], input[pattern]').forEach(input => {
        if (!validateInput(input, true) && valid) { valid = false; firstInvalid = input; }
    });
    if (!valid) {
        firstInvalid?.focus();
        firstInvalid?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        submitBtn.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => (submitBtn.style.animation = ''), 500);
        return;
    }

    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    // Confetti 🎉
    try {
        confetti({ particleCount: 100, spread: 70, angle: 90, origin: { y: 0.6 },
            colors: ['#e63946','#f1faee','#a8dadc','#457b9d','#1d3557'] });
        confetti({ angle: 60 + Math.random()*60, spread: 60 + Math.random()*20,
            particleCount: 40 + Math.random()*30, origin: { y: 0.6 },
            colors: ['#e63946','#ff758f','#c1121f'], scalar: 0.7 + Math.random()*0.7 });
    } catch (_) { /* ignore */ }

    const fd             = new FormData(donorForm);
    const name           = fd.get('name')             || '';
    const blood          = fd.get('blood_group')      || '';
    const currentAddr    = fd.get('current_address')  || '';
    const permanentAddr  = fd.get('permanent_address')|| '';
    const phone1         = fd.get('phone1')           || '';
    const phone2         = fd.get('phone2')           || '';
    const lastDonation   = fd.get('last_donation')    || '';
    const healthIssues   = fd.get('health_issues')    || '';

    lastRegisteredDonor = { name, blood };

    try {
        // ── 1. MongoDB এ save ──────────────────────────
        const mongoRes = await fetch(`${API_BASE}/donors`, {
            method:  'POST',
            headers: { 'Content-Type': 'application/json' },
            body:    JSON.stringify({
                name, blood, area: 'sadar',
                phone: phone1, lastDonation,
                currentAddress: currentAddr,
                permanentAddress: permanentAddr,
                healthIssues,
            }),
        }).then(r => r.json());

        if (!mongoRes.success) throw new Error(mongoRes.message || 'DB error');

        // ── 2. Telegram notification (fire & forget) ───
        const msg = `
🩸 *New Blood Donor — Cox's Hub Blood* 🩸
-------------------------------------------
👤 *Name:* ${name}
🩸 *Blood Group:* ${blood || '_Not Selected_'}
🏠 *Current Addr:* ${currentAddr}
📍 *Permanent Addr:* ${permanentAddr || '_N/A_'}
📞 *Phone 1:* \`${phone1}\`
📞 *Phone 2:* ${phone2 ? `\`${phone2}\`` : '_N/A_'}
🗓️ *Last Donation:* ${lastDonation ? new Date(lastDonation).toLocaleDateString('en-GB') : '_N/A_'}
🩺 *Health Issues:* ${healthIssues || '_None_'}
-------------------------------------------
_${new Date().toLocaleString('en-GB', { dateStyle: 'short', timeStyle: 'short' })}_
        `.trim();

        fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method:  'POST',
            headers: { 'Content-Type': 'application/json' },
            body:    JSON.stringify({ chat_id: chatId, text: msg, parse_mode: 'Markdown' }),
        }).catch(() => {}); // Telegram failure should not block UX

        // ── Success ─────────────────────────────────────
        if (thankYouPopup) {
            thankYouPopup.classList.add('active');
            thankYouPopup.setAttribute('aria-hidden', 'false');
        }
        setupSharingLinks();
        donorForm.reset();
        clearValidation();
        updateEligibility();

    } catch (err) {
        alert(
            currentLanguage === 'bn'
                ? `সাবমিট করতে সমস্যা হয়েছে: ${err.message}। আবার চেষ্টা করুন।`
                : `Submission failed: ${err.message}. Please try again.`
        );
    } finally {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
    }
}

// ============================================
//   INITIAL VISIBILITY CHECK
// ============================================
function checkInitialVisibility() {
    const checkEl = el => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom >= 0 && !el.classList.contains('is-visible')) {
            el.classList.add('is-visible');
            if (el.id === 'counterSection') {
                el.querySelectorAll('.counter-number').forEach(animateCounter);
            }
        }
    };
    [counterSection, impactSection, faqSection, formContainer].forEach(checkEl);
    document.querySelectorAll('.fact-card, .fade-section').forEach(checkEl);
}

// ============================================
//   INIT
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Loading screen
    const hideLoader  = () => loadingScreen?.classList.add('hidden');
    const startTime   = Date.now();
    window.addEventListener('load', () => {
        setTimeout(hideLoader, Math.max(0, 1000 - (Date.now() - startTime)));
    });
    setTimeout(hideLoader, 4000);

    // Theme
    initTheme();
    themeToggle?.addEventListener('click', toggleTheme);

    // Navbar
    setupNavbar();

    // Emergency banner
    setupEmergencyBanner();

    // Language
    updateLanguage(currentLanguage);
    languageToggle?.addEventListener('click', () =>
        updateLanguage(currentLanguage === 'bn' ? 'en' : 'bn')
    );

    // Footer year
    const yearEl = document.getElementById('currentYear');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Date max
    try { if (lastDonationInput) lastDonationInput.max = new Date().toISOString().split('T')[0]; } catch (_) {}

    // All features
    updateEligibility();
    setupIntersectionObserver();
    setupValidation();
    setupVoiceInput();
    setupFAQ();
    setupParallax();
    setupDonorSearch();
    renderCamps();
    setupCertificate();
    loadActiveNotices();

    // Event listeners
    registerBtn?.addEventListener('click', e => {
        e.preventDefault();
        formSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    lastDonationInput?.addEventListener('change', updateEligibility);
    donorForm?.addEventListener('submit', handleFormSubmit);

    closePopup?.addEventListener('click', () => {
        thankYouPopup?.classList.remove('active');
        thankYouPopup?.setAttribute('aria-hidden', 'true');
    });
    thankYouPopup?.addEventListener('click', e => {
        if (e.target === thankYouPopup) {
            thankYouPopup.classList.remove('active');
            thankYouPopup.setAttribute('aria-hidden', 'true');
        }
    });

    // Close mobile menu on outside click
    document.addEventListener('click', e => {
        if (mobileMenu?.classList.contains('open') &&
            !mainNav?.contains(e.target)) {
            mobileMenu.classList.remove('open');
            navHamburger?.classList.remove('active');
            navHamburger?.setAttribute('aria-expanded', 'false');
            mobileMenu.setAttribute('aria-hidden', 'true');
        }
    });

    // Initial visibility
    checkInitialVisibility();

    // Re-adjust padding on resize
    window.addEventListener('resize', adjustBodyPadding, { passive: true });
});
