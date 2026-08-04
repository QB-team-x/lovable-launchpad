import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Gamepad2, Trophy, Link2 } from "lucide-react";
import { Button } from "@/components/ui";
import { useI18n } from "@/lib/i18n";
import { useAuth } from "@/features/auth";

const FEATURES = [
  { icon: Gamepad2, title: "feat_games", desc: "feat_games_d" },
  { icon: Trophy, title: "feat_tour", desc: "feat_tour_d" },
  { icon: Link2, title: "feat_bio", desc: "feat_bio_d" },
] as const;

/**
 * A frosted "curtain" panel that slides up smoothly as the visitor scrolls,
 * covering the hero with the product explanation and features.
 */
export function CurtainSection() {
  const { t } = useI18n();
  const { user } = useAuth();
  const track = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const el = track.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const p = total > 0 ? (0 - rect.top) / total : 0;
      setProgress(Math.min(1, Math.max(0, p)));
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const shift = (1 - progress) * 100;

  return (
    <div ref={track} className="relative h-[220vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div
          style={{
            transform: `translate3d(0, ${shift}%, 0)`,
            opacity: 0.25 + progress * 0.75,
          }}
          className="flex h-full flex-col justify-center rounded-t-[2.5rem] border-t border-border bg-background/60 px-5 backdrop-blur-2xl transition-[opacity] duration-300 will-change-transform"
        >
          <div className="mx-auto w-full max-w-4xl text-center">
            <h2 className="text-3xl font-extrabold text-foreground sm:text-5xl">
              {t("curtain_title")}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground">
              {t("curtain_sub")}
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {FEATURES.map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="rounded-2xl border border-border bg-card/60 p-5 text-start backdrop-blur-md"
                >
                  <Icon className="h-6 w-6 text-primary" />
                  <h3 className="mt-3 text-lg font-bold text-foreground">{t(title)}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{t(desc)}</p>
                </div>
              ))}
            </div>

            <div className="mt-10">
              {user ? (
                <Link to="/dashboard">
                  <Button className="px-8 py-3 text-base">{t("cta_games")}</Button>
                </Link>
              ) : (
                <Link to="/auth" search={{ mode: "signup" }}>
                  <Button className="px-8 py-3 text-base">{t("cta")}</Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
