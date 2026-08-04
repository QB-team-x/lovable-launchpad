import { createFileRoute, Link } from "@tanstack/react-router";
import { Brand, LangToggle } from "@/components/layout";
import { Button } from "@/components/ui";
import { useI18n } from "@/lib/i18n";
import { useAuth } from "@/features/auth";
import { useChatSource } from "@/features/live-chat";
import { LandingHero, CurtainSection } from "@/features/landing";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "qbLive — ألعاب دردشة تفاعلية للبث المباشر" },
      {
        name: "description",
        content:
          "منصة qbLive: ألعاب دردشة تفاعلية، بطولات، وصفحة روابط لصنّاع المحتوى على يوتيوب وكيك وتيك توك.",
      },
      { property: "og:title", content: "qbLive — ألعاب دردشة تفاعلية للبث المباشر" },
      {
        property: "og:description",
        content: "ألعاب تفاعلية وبطولات وصفحة روابط لصنّاع البث المباشر.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Landing,
});

function Landing() {
  const { t } = useI18n();
  const { user } = useAuth();
  const { source } = useChatSource();

  return (
    <main className="min-h-screen bg-background">
      <header className="sticky top-0 z-20 border-b border-border/50 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <Brand />
          <div className="flex items-center gap-2">
            <LangToggle />
            {user ? (
              <Link to="/dashboard">
                <Button>{t("nav_dashboard")}</Button>
              </Link>
            ) : (
              <>
                <Link to="/auth" search={{ mode: "login" }}>
                  <Button variant="ghost">{t("nav_login")}</Button>
                </Link>
                <Link to="/auth" search={{ mode: "signup" }}>
                  <Button>{t("nav_start")}</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      <div className="sticky top-0 z-0">
        <LandingHero source={source} />
      </div>
      <div className="relative z-10">
        <CurtainSection />
      </div>

    </main>
  );
}
