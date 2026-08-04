/**
 * الموقع الرسمي. كل الروابط الخارجية (تأكيد البريد، استعادة كلمة المرور،
 * الـ OG، صفحات المستخدمين) يجب أن تشير إلى هذا النطاق وليس إلى نطاق lovable القديم.
 */
export const SITE_URL = "https://lovable-launchpad-woad.vercel.app";

/**
 * النطاقات القديمة التي تُحوَّل تلقائياً إلى `SITE_URL`.
 * تُطابَق على الاسم نفسه أو على أي نطاق فرعي منه.
 */
const LEGACY_HOSTS = [
  "lovable.app",
  "lovableproject.com",
  "lovable.dev",
] as const;

/** هل هذا المضيف نطاق lovable قديم يجب تحويله؟ */
export function isLegacyHost(hostname: string): boolean {
  const host = hostname.toLowerCase().split(":")[0] ?? "";
  return LEGACY_HOSTS.some(
    (legacy) => host === legacy || host.endsWith(`.${legacy}`),
  );
}

/**
 * يبني رابط التحويل مع الحفاظ على المسار والاستعلام،
 * أو يعيد `null` إذا لم يكن المضيف نطاقاً قديماً.
 *
 * الجزء بعد `#` لا يصل إلى الخادم أصلاً، لكن المتصفّح ينقله تلقائياً
 * إلى الوجهة عند التحويل — وهو ما يحفظ توكِن الجلسة القادم من Supabase.
 */
export function buildCanonicalRedirect(requestUrl: string): string | null {
  const url = new URL(requestUrl);
  if (!isLegacyHost(url.hostname)) return null;
  return `${SITE_URL}${url.pathname}${url.search}`;
}

/**
 * شبكة أمان تعمل في المتصفّح: تلتقط الحالات التي تصل فيها الصفحة من CDN
 * أو من نسخة قديمة مخزّنة دون المرور بخادمنا.
 *
 * تتخطّى التحويل داخل الـ iframe حتى تبقى معاينة Lovable في المحرّر صالحة للعمل.
 */
export const CANONICAL_REDIRECT_SCRIPT = `(function(){try{
if(window.top!==window.self)return;
var h=location.hostname.toLowerCase(),d=${JSON.stringify(LEGACY_HOSTS)};
for(var i=0;i<d.length;i++){if(h===d[i]||h.slice(-d[i].length-1)==="."+d[i]){
location.replace(${JSON.stringify(SITE_URL)}+location.pathname+location.search+location.hash);return;}}
}catch(e){}})();`;
