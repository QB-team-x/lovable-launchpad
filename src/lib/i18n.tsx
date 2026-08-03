import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "ar" | "en";

const dict = {
  ar: {
    brand: "Live",
    nav_login: "تسجيل الدخول",
    nav_start: "ابدأ الآن",
    nav_dashboard: "لوحة التحكم",
    nav_logout: "خروج",
    hero_title: "ألعاب تفاعلية مباشرة مع جمهورك",
    hero_sub:
      "qbLive يمنح صنّاع البث على يوتيوب وكيك وتيك توك ألعاب دردشة تفاعلية، بطولات، وصفحة روابط أنيقة يشاركونها مع متابعيهم.",
    feat_games: "ألعاب الدردشة",
    feat_games_d: "جمهورك يلعب من الشات مباشرة أثناء البث.",
    feat_tour: "البطولات",
    feat_tour_d: "نظّم بطولات بين مشاهديك وتابع النتائج.",
    feat_bio: "صفحة الروابط",
    feat_bio_d: "صفحة عامة أنيقة تجمع كل روابطك في مكان واحد.",
    cta: "ابدأ مجاناً",
    signup: "إنشاء حساب",
    login: "تسجيل الدخول",
    email: "البريد الإلكتروني",
    password: "كلمة المرور",
    role: "نوع الحساب",
    creator: "صانع محتوى",
    creator_d: "أنا أبث مباشرة",
    viewer: "مشاهد",
    viewer_d: "أشاهد وألعب",
    have_account: "لديك حساب؟ سجّل الدخول",
    no_account: "ليس لديك حساب؟ أنشئ واحداً",
    onboarding: "إعداد حسابك",
    display_name: "الاسم المعروض",
    handle: "المعرّف العام",
    avatar: "رابط الصورة",
    bio: "نبذة قصيرة",
    platforms: "حسابات المنصات",
    save: "حفظ",
    saved: "تم الحفظ",
    games: "الألعاب",
    tournaments: "البطولات",
    store: "متجر الأفاتار",
    links: "محرر الروابط",
    soon: "قريباً",
    soon_d: "هذا القسم قيد التطوير وسيكون متاحاً قريباً.",
    add_link: "إضافة رابط",
    label: "العنوان",
    url: "الرابط",
    up: "أعلى",
    down: "أسفل",
    delete: "حذف",
    public_page: "صفحتي العامة",
    my_profile: "ملفي الشخصي",
    not_found: "لم يتم العثور على هذه الصفحة",
    loading: "جاري التحميل...",
    no_links: "لا توجد روابط بعد.",
  },
  en: {
    brand: "Live",
    nav_login: "Log in",
    nav_start: "Get started",
    nav_dashboard: "Dashboard",
    nav_logout: "Log out",
    hero_title: "Interactive live games with your audience",
    hero_sub:
      "qbLive gives YouTube, Kick and TikTok streamers interactive chat games, tournaments, and a polished link-in-bio page.",
    feat_games: "Chat games",
    feat_games_d: "Your viewers play straight from the live chat.",
    feat_tour: "Tournaments",
    feat_tour_d: "Run brackets between your viewers and track results.",
    feat_bio: "Link in bio",
    feat_bio_d: "A clean public page with all your links in one place.",
    cta: "Get started free",
    signup: "Sign up",
    login: "Log in",
    email: "Email",
    password: "Password",
    role: "Account type",
    creator: "Creator",
    creator_d: "I'm a streamer",
    viewer: "Viewer",
    viewer_d: "I watch and play",
    have_account: "Already have an account? Log in",
    no_account: "No account yet? Sign up",
    onboarding: "Set up your account",
    display_name: "Display name",
    handle: "Public handle",
    avatar: "Avatar URL",
    bio: "Short bio",
    platforms: "Platform accounts",
    save: "Save",
    saved: "Saved",
    games: "Games",
    tournaments: "Tournaments",
    store: "Avatar store",
    links: "Link-in-bio editor",
    soon: "Coming soon",
    soon_d: "This section is under construction and will be available soon.",
    add_link: "Add link",
    label: "Label",
    url: "URL",
    up: "Up",
    down: "Down",
    delete: "Delete",
    public_page: "My public page",
    my_profile: "My profile",
    not_found: "This page was not found",
    loading: "Loading...",
    no_links: "No links yet.",
  },
} as const;

export type Key = keyof (typeof dict)["ar"];

const Ctx = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: (k: Key) => string }>({
  lang: "ar",
  setLang: () => {},
  t: (k) => dict.ar[k],
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("ar");

  useEffect(() => {
    const stored = window.localStorage.getItem("qblive-lang");
    if (stored === "en" || stored === "ar") setLang(stored);
  }, []);

  useEffect(() => {
    window.localStorage.setItem("qblive-lang", lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  return (
    <Ctx.Provider value={{ lang, setLang, t: (k) => dict[lang][k] }}>{children}</Ctx.Provider>
  );
}

export const useI18n = () => useContext(Ctx);
