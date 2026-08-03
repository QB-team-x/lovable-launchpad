# qbLive — الأساس / Foundation

منصة **qbLive** لصنّاع البث المباشر (YouTube / Kick / TikTok): ألعاب دردشة تفاعلية، بطولات، وصفحة روابط عامة.
هذه المرحلة تحتوي على الأساس فقط: قاعدة البيانات، المصادقة، لوحة التحكم، محرر الروابط، والصفحة العامة.

## التشغيل / Run

```bash
npm install
npm run dev      # http://localhost:8080
npm run build
```

المتغيرات البيئية موجودة في `.env` ومُدارة تلقائياً عبر Lovable Cloud (لا تعدّلها يدوياً).

## الصفحات / Pages

| المسار | الوصف |
| --- | --- |
| `/` | الصفحة التعريفية |
| `/auth?mode=signup\|login` | إنشاء حساب / تسجيل دخول (اختيار الدور: creator أو viewer) |
| `/onboarding` | إعداد حساب صانع المحتوى (يتطلب تسجيل دخول) |
| `/dashboard?tab=links\|games\|tournaments\|store` | لوحة التحكم — قسم الروابط فعّال، والبقية "قريباً" |
| `/profile` | ملف المشاهد (الاسم، الصورة، حسابات المنصات) |
| `/u/$handle` | الصفحة العامة القابلة للمشاركة |

## قاعدة البيانات / Database

- **profiles**: `id` (= معرف المستخدم في auth)، `role` (`creator` \| `viewer`)، `handle` (فريد)، `display_name`، `avatar_url`، `bio`.
- **platform_links**: `profile_id`، `platform` (`youtube` \| `kick` \| `tiktok`)، `handle` (مخزّن بحروف صغيرة بدون `@` لمطابقة رسائل الشات لاحقاً). فريد لكل (profile, platform).
- **bio_links**: `profile_id`، `label`، `url`، `sort_order`.

يُنشأ صف `profiles` تلقائياً عند التسجيل عبر trigger على `auth.users`.

### الصلاحيات (RLS)

- القراءة: مفتوحة للجميع (مطلوبة للصفحة العامة `/u/$handle`).
- الإضافة/التعديل/الحذف: لصاحب الصف فقط (`auth.uid()`).

## الاستعلام من الكود / Querying

```ts
import { supabase } from "@/integrations/supabase/client";

// قراءة عامة
const { data } = await supabase
  .from("profiles")
  .select("id, display_name, avatar_url, bio")
  .eq("handle", "qbstreamer")
  .maybeSingle();

// كتابة (تتطلب تسجيل دخول)
await supabase.from("bio_links").insert({
  profile_id: user.id,
  label: "Discord",
  url: "https://discord.gg/...",
  sort_order: 0,
});
```

## اختبار الجلب العام / Testing public fetch

```bash
curl "$VITE_SUPABASE_URL/rest/v1/profiles?select=handle,display_name" \
  -H "apikey: $VITE_SUPABASE_PUBLISHABLE_KEY"
```

يجب أن يعيد الصفوف بدون تسجيل دخول، بينما محاولة الكتابة بنفس المفتاح تُرفض بواسطة RLS.

## اللغة / Language

العربية هي اللغة الأساسية مع تخطيط RTL، وزر تبديل إلى الإنجليزية في الترويسة. النصوص في `src/lib/i18n.tsx`.

## خارج النطاق حالياً / Out of scope

محرك ألعاب الدردشة، نظام البطولات، ومتجر الأفاتار — ستُبنى في مراحل لاحقة.

---

## هيكلة المشروع (مهم للتوسّع)

```text
src/
  components/        مكوّنات مشتركة عامة فقط
    ui/              عناصر واجهة أساسية (Button, Input, Field, Card)
    layout/          عناصر الهيكل العام (Brand, LangToggle)
  config/            ثوابت التطبيق (platforms.ts, dashboard.ts)
  features/          كل ميزة في مجلد مستقل
    auth/            hooks/use-auth.ts
    profile/         api.ts + components/
    bio-links/       api.ts + components/
    dashboard/       components/ (Coming soon + التنقّل)
  lib/               أدوات عامة (i18n/, utils.ts)
    i18n/            المزوّد + locales/ar.ts + locales/en.ts
  routes/            صفحات TanStack Router فقط (رقيقة، بدون منطق)
  integrations/      عميل Lovable Cloud (مولّد تلقائياً — لا يُعدّل)
```

### قواعد الإضافة مستقبلاً
1. أي ميزة جديدة (ألعاب، بطولات، متجر أفاتار) = مجلد جديد داخل `src/features/<feature>/`
   يحتوي على `api.ts` (كل استعلامات قاعدة البيانات) و`components/` و`index.ts` للتصدير.
2. ملفات `src/routes/*` تبقى رقيقة: تعريف الراوت + `head()` + استدعاء مكوّن الميزة.
3. لا استعلامات Supabase داخل ملفات الراوت أو المكوّنات — فقط عبر `api.ts` الخاص بالميزة.
4. النصوص كلها تُضاف إلى `src/lib/i18n/locales/ar.ts` و`en.ts` (المفاتيح متطابقة إجبارياً بالأنواع).
5. الألوان دائماً عبر توكنات `src/styles.css` (`bg-primary`, `text-foreground`…) وليس ألوان مباشرة.
