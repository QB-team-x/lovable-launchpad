import { createFileRoute } from "@tanstack/react-router";
import { Brand, LangToggle } from "@/components/ui";
import { ProfileForm } from "@/components/profile-form";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/_authenticated/profile")({
  head: () => ({
    meta: [
      { title: "ملفي الشخصي — qbLive" },
      { name: "description", content: "عدّل اسمك وصورتك واربط حساباتك على منصات البث." },
      { property: "og:title", content: "ملفي الشخصي — qbLive" },
      { property: "og:description", content: "عدّل ملفك الشخصي على qbLive." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  const { user } = Route.useRouteContext();
  const { t } = useI18n();

  return (
    <main className="min-h-screen bg-background">
      <header className="mx-auto flex max-w-2xl items-center justify-between px-5 py-5">
        <Brand />
        <LangToggle />
      </header>
      <div className="mx-auto max-w-2xl space-y-5 px-5 pb-16">
        <h1 className="text-2xl font-bold text-foreground">{t("my_profile")}</h1>
        <ProfileForm userId={user.id} />
      </div>
    </main>
  );
}
