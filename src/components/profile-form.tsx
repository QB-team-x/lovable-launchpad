import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button, Card, Field, Input } from "@/components/ui";
import { useI18n } from "@/lib/i18n";

const PLATFORMS = ["youtube", "kick", "tiktok"] as const;
type Platform = (typeof PLATFORMS)[number];

export function ProfileForm({ userId, onSaved }: { userId: string; onSaved?: () => void }) {
  const { t } = useI18n();
  const [displayName, setDisplayName] = useState("");
  const [handle, setHandle] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [bio, setBio] = useState("");
  const [handles, setHandles] = useState<Record<Platform, string>>({
    youtube: "",
    kick: "",
    tiktok: "",
  });
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const [{ data: p }, { data: links }] = await Promise.all([
        supabase.from("profiles").select("*").eq("id", userId).maybeSingle(),
        supabase.from("platform_links").select("platform, handle").eq("profile_id", userId),
      ]);
      if (p) {
        setDisplayName(p.display_name ?? "");
        setHandle(p.handle ?? "");
        setAvatarUrl(p.avatar_url ?? "");
        setBio(p.bio ?? "");
      }
      if (links) {
        setHandles((prev) => {
          const next = { ...prev };
          for (const l of links) next[l.platform as Platform] = l.handle;
          return next;
        });
      }
    })();
  }, [userId]);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setMsg(null);

    const { error } = await supabase
      .from("profiles")
      .update({
        display_name: displayName,
        handle: handle.trim().toLowerCase() || null,
        avatar_url: avatarUrl || null,
        bio: bio || null,
      })
      .eq("id", userId);

    if (error) {
      setBusy(false);
      return setMsg(error.message);
    }

    for (const p of PLATFORMS) {
      const value = handles[p].trim().replace(/^@/, "").toLowerCase();
      if (value) {
        await supabase
          .from("platform_links")
          .upsert({ profile_id: userId, platform: p, handle: value }, { onConflict: "profile_id,platform" });
      } else {
        await supabase.from("platform_links").delete().eq("profile_id", userId).eq("platform", p);
      }
    }

    setBusy(false);
    setMsg(t("saved"));
    onSaved?.();
  };

  return (
    <form onSubmit={save} className="space-y-4">
      <Card className="space-y-4">
        <Field label={t("display_name")}>
          <Input value={displayName} onChange={(e) => setDisplayName(e.target.value)} required />
        </Field>
        <Field label={t("handle")}>
          <Input value={handle} onChange={(e) => setHandle(e.target.value)} placeholder="qbstreamer" />
        </Field>
        <Field label={t("avatar")}>
          <Input value={avatarUrl} onChange={(e) => setAvatarUrl(e.target.value)} placeholder="https://..." />
        </Field>
        <Field label={t("bio")}>
          <Input value={bio} onChange={(e) => setBio(e.target.value)} />
        </Field>
      </Card>

      <Card className="space-y-4">
        <h2 className="text-sm font-bold text-foreground">{t("platforms")}</h2>
        {PLATFORMS.map((p) => (
          <Field key={p} label={p}>
            <Input
              value={handles[p]}
              onChange={(e) => setHandles({ ...handles, [p]: e.target.value })}
              placeholder="@username"
            />
          </Field>
        ))}
      </Card>

      {msg && <p className="text-sm text-primary">{msg}</p>}
      <Button type="submit" disabled={busy}>
        {t("save")}
      </Button>
    </form>
  );
}
