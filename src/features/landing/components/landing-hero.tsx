import { Link } from "@tanstack/react-router";
import { Play, Sparkles, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui";
import { AssembleLogo } from "@/components/layout";
import { useI18n } from "@/lib/i18n";
import { LiveChatPanel } from "@/features/live-chat";

const PLATFORMS = ["YouTube", "TikTok", "Kick", "Twitch"];

/** Full-height hero: assembling logo, badge, headline, dual CTA, platform chips and a live chat preview. */
export function LandingHero({ source }: { source: string }) {
  const { t } = useI18n();

  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 end-[-10%] h-[520px] w-[520px] rounded-full bg-primary/25 blur-[140px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[-15%] start-[-10%] h-[420px] w-[420px] rounded-full bg-secondary/15 blur-[150px]"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 lg:grid-cols-2 lg:py-24">
        <div className="text-center lg:text-start">
          {/* ── الشعار المتجمّع ── */}
          <div className="relative mb-8 flex justify-center lg:justify-start">
            <div
              aria-hidden
              className="pointer-events-none absolute h-[150px] w-[220px] rounded-full bg-primary/30 blur-[65px]"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute h-[168px] w-[208px] rounded-[2rem] border-2 border-dashed border-primary/20"
            />
            <AssembleLogo size={196} className="relative" />
          </div>

          <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            {t("landing_badge")}
          </span>

          <h1 className="mt-6 text-4xl font-extrabold leading-[1.15] text-foreground sm:text-6xl">
            {t("hero_title")}
          </h1>
          <p className="mt-5 max-w-lg text-base text-muted-foreground max-lg:mx-auto">
            {t("hero_sub")}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <Link to="/auth" search={{ mode: "signup" }}>
              <Button className="gap-2 px-7 py-3 text-base">
                <Play className="h-4 w-4" />
                {t("cta")}
              </Button>
            </Link>
            <Link to="/auth" search={{ mode: "login" }}>
              <Button variant="ghost" className="gap-2 px-7 py-3 text-base">
                {t("nav_login")}
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="mt-7 flex flex-wrap justify-center gap-2 lg:justify-start">
            {PLATFORMS.map((p) => (
              <span
                key={p}
                className="rounded-full border border-border bg-card/70 px-3.5 py-1.5 text-xs font-semibold text-muted-foreground"
              >
                {p}
              </span>
            ))}
          </div>
        </div>

        <LiveChatPanel
          source={source}
          className="h-[460px] w-full bg-card/70 shadow-2xl shadow-primary/10 backdrop-blur-xl"
        />
      </div>
    </section>
  );
}
