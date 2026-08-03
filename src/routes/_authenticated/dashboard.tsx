import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { LogOut, User } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Brand, LangToggle } from "@/components/layout";
import { Button } from "@/components/ui";
import { useI18n } from "@/lib/i18n";
import { getProfile } from "@/features/profile";
import { BioLinksEditor } from "@/features/bio-links";
import { ComingSoon, DashboardSidebar, DashboardTabsMobile } from "@/features/dashboard";

export const Route = createFileRoute("/_authenticated/dashboard")({
  validateSearch: z.object({
    tab: z.enum(["games", "tournaments", "store", "links"]).default("links"),
  }),
  head: () => ({
    meta: [
      { title: "لوحة تحكم صانع المحتوى — qbLive" },
      { name: "description", content: "أدر ألعابك وبطولاتك وروابط صفحتك العامة من مكان واحد." },
      { property: "og:title", content: "لوحة تحكم صانع المحتوى — qbLive" },
      { property: "og:description", content: "أدر حسابك على qbLive." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const { tab } = Route.useSearch();
  const { user } = Route.useRouteContext();
  const { t } = useI18n();
  const navigate = useNavigate();
  const [handle, setHandle] = useState<string | null>(null);

  useEffect(() => {
    getProfile(user.id).then((p) => setHandle(p?.handle ?? null));
  }, [user.id]);

  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar tab={tab} />

      <main className="flex-1 p-5">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <Brand className="sm:hidden" />
            <h1 className="hidden text-xl font-bold text-foreground sm:block">{t(tab)}</h1>
          </div>
          <div className="flex items-center gap-2">
            {handle && (
              <Link to="/u/$handle" params={{ handle }}>
                <Button variant="ghost">{t("public_page")}</Button>
              </Link>
            )}
            <Link to="/profile">
              <Button variant="ghost" aria-label={t("my_profile")}>
                <User className="h-4 w-4" />
              </Button>
            </Link>
            <LangToggle />
            <Button
              variant="ghost"
              aria-label={t("nav_logout")}
              onClick={async () => {
                await supabase.auth.signOut();
                navigate({ to: "/" });
              }}
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <DashboardTabsMobile tab={tab} />

        {tab === "links" ? <BioLinksEditor userId={user.id} /> : <ComingSoon />}
      </main>
    </div>
  );
}
