import { createFileRoute, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Brand, Card, LangToggle } from "@/components/ui";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/u/$handle")({
  head: ({ params }) => ({
    meta: [
      { title: `@${params.handle} — qbLive` },
      { name: "description", content: `صفحة ${params.handle} على qbLive: روابط وحسابات البث.` },
      { property: "og:title", content: `@${params.handle} — qbLive` },
      { property: "og:description", content: `روابط وحسابات ${params.handle} في مكان واحد.` },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: PublicPage,
  notFoundComponent: () => <Empty />,
  errorComponent: () => <Empty />,
});

function Empty() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background">
      <p className="text-sm text-muted-foreground">404</p>
    </main>
  );
}

function PublicPage() {
  const { handle } = Route.useParams();
  const { t } = useI18n();

  const { data, isLoading } = useQuery({
    queryKey: ["public-profile", handle],
    queryFn: async () => {
      const { data: profile } = await supabase
        .from("profiles")
        .select("id, display_name, avatar_url, bio, handle")
        .eq("handle", handle.toLowerCase())
        .maybeSingle();
      if (!profile) throw notFound();
      const [{ data: links }, { data: platforms }] = await Promise.all([
        supabase
          .from("bio_links")
          .select("id, label, url")
          .eq("profile_id", profile.id)
          .order("sort_order"),
        supabase.from("platform_links").select("platform, handle").eq("profile_id", profile.id),
      ]);
      return { profile, links: links ?? [], platforms: platforms ?? [] };
    },
  });

  if (isLoading)
    return (
      <main className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-sm text-muted-foreground">{t("loading")}</p>
      </main>
    );

  if (!data) return <Empty />;

  const { profile, links, platforms } = data;

  return (
    <main className="min-h-screen bg-background">
      <header className="mx-auto flex max-w-xl items-center justify-between px-5 py-5">
        <Brand />
        <LangToggle />
      </header>

      <div className="mx-auto max-w-xl px-5 pb-20 text-center">
        {profile.avatar_url ? (
          <img
            src={profile.avatar_url}
            alt={profile.display_name ?? handle}
            width={96}
            height={96}
            className="mx-auto h-24 w-24 rounded-full border-2 border-primary object-cover"
          />
        ) : (
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border-2 border-primary text-2xl font-bold text-primary">
            {(profile.display_name ?? handle).slice(0, 2)}
          </div>
        )}
        <h1 className="mt-4 text-2xl font-extrabold text-foreground">
          {profile.display_name ?? handle}
        </h1>
        <p className="text-sm text-muted-foreground">@{profile.handle}</p>
        {profile.bio && <p className="mt-3 text-sm text-foreground/80">{profile.bio}</p>}

        {platforms.length > 0 && (
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {platforms.map((p) => (
              <span
                key={p.platform}
                className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
              >
                {p.platform}: @{p.handle}
              </span>
            ))}
          </div>
        )}

        <div className="mt-8 space-y-3">
          {links.length === 0 && <p className="text-sm text-muted-foreground">{t("no_links")}</p>}
          {links.map((l) => (
            <a key={l.id} href={l.url} target="_blank" rel="noopener noreferrer" className="block">
              <Card className="bg-card font-semibold text-foreground transition-colors hover:border-primary hover:text-primary">
                {l.label}
              </Card>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
