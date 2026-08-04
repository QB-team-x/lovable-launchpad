#!/usr/bin/env node
/**
 * يضبط إعدادات المصادقة في Supabase عبر Management API:
 *   - Site URL و قائمة الروابط المسموح بها  -> يوقف التحويل إلى نطاق lovable القديم
 *   - قالب وعنوان رسالة تأكيد التسجيل        -> يستبدل القالب الافتراضي بهوية qbLive
 *
 * لماذا سكربت؟ لأن هذه الإعدادات تعيش في خادم Supabase لا في الكود،
 * ولا يمكن تغييرها بمفتاح publishable الموجود في .env.
 *
 * الاستخدام:
 *   1) أنشئ توكن من https://supabase.com/dashboard/account/tokens
 *   2) $env:SUPABASE_ACCESS_TOKEN = "sbp_..."      (PowerShell)
 *      export SUPABASE_ACCESS_TOKEN="sbp_..."      (bash)
 *   3) node scripts/apply-auth-settings.mjs            # تطبيق
 *      node scripts/apply-auth-settings.mjs --dry-run  # عرض ما سيُرسل فقط
 */

import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const PROJECT_REF = "fzhhxgxdzbgtievrizhe";
const SITE_URL = "https://lovable-launchpad-woad.vercel.app";
const TEMPLATE = resolve(ROOT, "supabase/templates/confirm-signup.html");

const dryRun = process.argv.includes("--dry-run");
const token = process.env["SUPABASE_ACCESS_TOKEN"];

if (!token && !dryRun) {
  console.error(
    "SUPABASE_ACCESS_TOKEN غير موجود.\n" +
      "أنشئ توكن من https://supabase.com/dashboard/account/tokens ثم:\n" +
      '  PowerShell : $env:SUPABASE_ACCESS_TOKEN = "sbp_..."\n' +
      '  bash       : export SUPABASE_ACCESS_TOKEN="sbp_..."',
  );
  process.exit(1);
}

const body = {
  site_url: SITE_URL,
  // Management API يتوقع سلسلة مفصولة بفواصل، لا مصفوفة.
  uri_allow_list: [`${SITE_URL}`, `${SITE_URL}/**`, "http://localhost:8080/**"].join(","),
  mailer_subjects_confirmation: "أكّد بريدك في qbLive",
  mailer_templates_confirmation_content: readFileSync(TEMPLATE, "utf8"),
};

console.log(`project        : ${PROJECT_REF}`);
console.log(`site_url       : ${body.site_url}`);
console.log(`uri_allow_list : ${body.uri_allow_list}`);
console.log(`subject        : ${body.mailer_subjects_confirmation}`);
console.log(`template       : ${TEMPLATE} (${body.mailer_templates_confirmation_content.length} bytes)`);

if (dryRun) {
  console.log("\n--dry-run: لم يُرسل شيء.");
  process.exit(0);
}

const res = await fetch(`https://api.supabase.com/v1/projects/${PROJECT_REF}/config/auth`, {
  method: "PATCH",
  headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
  body: JSON.stringify(body),
});

const text = await res.text();
if (!res.ok) {
  console.error(`\nفشل (HTTP ${res.status}):\n${text}`);
  process.exit(1);
}

console.log("\nتم التطبيق. جرّب التسجيل ببريد جديد للتأكد.");
