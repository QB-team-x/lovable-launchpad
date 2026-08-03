import { createFileRoute, Link } from "@tanstack/react-router";
import { Brand, LangToggle } from "@/components/layout";
import { Button, Card } from "@/components/ui";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";
import { useAuth } from "@/features/auth";
import { ChatAccountBar, LiveChatPanel, useChatSource } from "@/features/live-chat";

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
  const { t, lang } = useI18n();
  const { user } = useAuth();
  const { source, changeSource } = useChatSource();

  // The chat column stays on the physical right in both reading directions.
  const rightColumn = lang === "ar" ? "lg:order-first" : "lg:order-last";
  const mainColumn = lang === "ar" ? "lg:order-last" : "lg:order-first";

  return (
    <main className="min-h-screen bg-background">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
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
      </header>

      <div className="mx-auto max-w-6xl px-5 pb-24">
        <ChatAccountBar source={source} onSourceChange={changeSource} />

        <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-start">
          <div className={cn("min-w-0 flex-1", mainColumn)}>
            <section className="mx-auto max-w-3xl py-14 text-center">
              <h1 className="text-4xl font-extrabold leading-tight text-foreground sm:text-5xl">
                {t("hero_title")}
              </h1>
              <p className="mx-auto mt-5 max-w-xl text-base text-muted-foreground">
                {t("hero_sub")}
              </p>
              <Link to="/auth" search={{ mode: "signup" }} className="mt-8 inline-block">
                <Button className="px-7 py-3 text-base">{t("cta")}</Button>
              </Link>
            </section>

            <section className="grid gap-4 sm:grid-cols-3">
              {(
                [
                  ["feat_games", "feat_games_d"],
                  ["feat_tour", "feat_tour_d"],
                  ["feat_bio", "feat_bio_d"],
                ] as const
              ).map(([title, desc]) => (
                <Card key={title}>
                  <h2 className="text-lg font-bold text-foreground">{t(title)}</h2>
                  <p className="mt-2 text-sm text-muted-foreground">{t(desc)}</p>
                </Card>
              ))}
            </section>
          </div>

          <LiveChatPanel
            source={source}
            className={cn(
              "h-[560px] w-full shrink-0 lg:sticky lg:top-6 lg:w-[340px]",
              rightColumn,
            )}
          />
        </div>
      </div>
    </main>
  );
}
