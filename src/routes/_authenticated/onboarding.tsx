import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Brand, LangToggle } from "@/components/ui";
import { ProfileForm } from "@/components/profile-form";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/_authenticated/onboarding")({
  head: () => ({
    meta: [
      { title: "إعداد حساب صانع المحتوى — qbLive" },
      { name: "description", content: "أكمل إعداد ملفك: الاسم، الصورة، النبذة، وحسابات المنصات." },
      { property: "og:title", content: "إعداد حساب صانع المحتوى — qbLive" },
      { property: "og:description", content: "أكمل إعداد ملفك على qbLive." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Onboarding,
});

function Onboarding() {
  const { user } = Route.useRouteContext();
  const { t } = useI18n();
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-background">
      <header className="mx-auto flex max-w-2xl items-center justify-between px-5 py-5">
        <Brand />
        <LangToggle />
      </header>
      <div className="mx-auto max-w-2xl space-y-5 px-5 pb-16">
        <h1 className="text-2xl font-bold text-foreground">{t("onboarding")}</h1>
        <ProfileForm userId={user.id} onSaved={() => navigate({ to: "/dashboard" })} />
      </div>
    </main>
  );
}
