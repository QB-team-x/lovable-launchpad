import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { Gamepad2, Trophy, Store, LinkIcon, LogOut, User } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Brand, Button, Card, Field, Input, LangToggle } from "@/components/ui";
import { useI18n, type Key } from "@/lib/i18n";
import { cn } from "@/lib/utils";

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
  component: Dashboard;
});

const TABS = [
  { key: "links", icon: LinkIcon },
  { key: "games", icon: Gamepad2 },
  { key: "tournaments", icon: Trophy },
  { key: "store", icon: Store },
] as const;

function Dashboard() {
  const { tab } = Route.useSearch();
  const { user } = Route.useRouteContext();
  const { t } = useI18n();
  const navigate = useNavigate();
  const [handle, setHandle] = useState<string | null>(null);

  useEffect(() => {
    supabase
      .from("profiles")
      .select("handle")
      .eq("id", user.id)
      .maybeSingle()
      .then(({ data }) => setHandle(data?.handle ?? null));
  }, [user.id]);

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="hidden w-60 shrink-0 border-e border-border p-5 sm:block">
        <Brand />
        <nav className="mt-8 space-y-1">
          {TABS.map(({ key, icon: Icon }) => (
            <Link
              key={key}
              to="/dashboard"
              search={{ tab: key }}
              className={cn(
                "flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition-colors",
                tab === key
                  ? "bg-primary/15 text-primary"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground",
              )}
            >
              <Icon className="h-4 w-4" />
              {t(key as Key)}
            </Link>
          ))}
        </nav>
      </aside>

      <main className="flex-1 p-5">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-2">
          <h1 className="text-xl font-bold text-foreground">{t(tab as Key)}</h1>
          <div className="flex items-center gap-2">
            {handle && (
              <Link to="/u/$handle" params={{ handle }}>
                <Button variant="ghost">{t("public_page")}</Button>
              </Link>
            )}
            <Link to="/profile">
              <Button variant="ghost">
                <User className="h-4 w-4" />
              </Button>
            </Link>
            <LangToggle />
            <Button
              variant="ghost"
              onClick={async () => {
                await supabase.auth.signOut();
                navigate({ to: "/" });
              }}
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="sm:hidden mb-5 flex gap-2 overflow-x-auto">
          {TABS.map(({ key }) => (
            <Link key={key} to="/dashboard" search={{ tab: key }}>
              <Button variant={tab === key ? "primary" : "ghost"}>{t(key as Key)}</Button>
            </Link>
          ))}
        </div>

        {tab === "links" ? <BioLinksEditor userId={user.id} /> : <ComingSoon />}
      </main>
    </div>
  );
}

function ComingSoon() {
  const { t } = useI18n();
  return (
    <Card className="flex flex-col items-center justify-center py-20 text-center">
      <span className="text-3xl">🚧</span>
      <h2 className="mt-3 text-lg font-bold text-foreground">{t("soon")}</h2>
      <p className="mt-1 text-sm text-muted-foreground">{t("soon_d")}</p>
    </Card>
  );
}

type BioLink = { id: string; label: string; url: string; sort_order: number };

function BioLinksEditor({ userId }: { userId: string }) {
  const { t } = useI18n();
  const [links, setLinks] = useState<BioLink[]>([]);
  const [label, setLabel] = useState("");
  const [url, setUrl] = useState("");

  const load = async () => {
    const { data } = await supabase
      .from("bio_links")
      .select("id, label, url, sort_order")
      .eq("profile_id", userId)
      .order("sort_order");
    setLinks(data ?? []);
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const add = async (e: React.FormEvent) => {
    e.preventDefault();
    await supabase.from("bio_links").insert({
      profile_id: userId,
      label,
      url,
      sort_order: links.length,
    });
    setLabel("");
    setUrl("");
    load();
  };

  const move = async (index: number, dir: -1 | 1) => {
    const target = index + dir;
    if (target < 0 || target >= links.length) return;
    const a = links[index];
    const b = links[target];
    await Promise.all([
      supabase.from("bio_links").update({ sort_order: target }).eq("id", a.id),
      supabase.from("bio_links").update({ sort_order: index }).eq("id", b.id),
    ]);
    load();
  };

  const update = async (id: string, patch: Partial<BioLink>) => {
    setLinks((prev) => prev.map((l) => (l.id === id ? { ...l, ...patch } : l)));
    await supabase.from("bio_links").update(patch).eq("id", id);
  };

  const remove = async (id: string) => {
    await supabase.from("bio_links").delete().eq("id", id);
    load();
  };

  return (
    <div className="max-w-2xl space-y-4">
      <Card>
        <form onSubmit={add} className="flex flex-wrap items-end gap-3">
          <div className="min-w-40 flex-1">
            <Field label={t("label")}>
              <Input value={label} onChange={(e) => setLabel(e.target.value)} required />
            </Field>
          </div>
          <div className="min-w-40 flex-1">
            <Field label={t("url")}>
              <Input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://..."
                required
              />
            </Field>
          </div>
          <Button type="submit">{t("add_link")}</Button>
        </form>
      </Card>

      {links.length === 0 && <p className="text-sm text-muted-foreground">{t("no_links")}</p>}

      {links.map((l, i) => (
        <Card key={l.id} className="flex flex-wrap items-end gap-3">
          <div className="min-w-36 flex-1">
            <Field label={t("label")}>
              <Input value={l.label} onChange={(e) => update(l.id, { label: e.target.value })} />
            </Field>
          </div>
          <div className="min-w-36 flex-1">
            <Field label={t("url")}>
              <Input value={l.url} onChange={(e) => update(l.id, { url: e.target.value })} />
            </Field>
          </div>
          <Button variant="ghost" onClick={() => move(i, -1)}>
            ↑
          </Button>
          <Button variant="ghost" onClick={() => move(i, 1)}>
            ↓
          </Button>
          <Button variant="danger" onClick={() => remove(l.id)}>
            {t("delete")}
          </Button>
        </Card>
      ))}
    </div>
  );
}
