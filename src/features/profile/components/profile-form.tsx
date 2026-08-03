import { useEffect, useState, type FormEvent } from "react";
import { Button, Card, Field, Input } from "@/components/ui";
import { useI18n } from "@/lib/i18n";
import { PLATFORMS, type Platform } from "@/config/platforms";
import {
  getPlatformLinks,
  getProfile,
  savePlatformHandle,
  updateProfile,
  type PlatformHandles,
} from "../api";

export function ProfileForm({ userId, onSaved }: { userId: string; onSaved?: () => void }) {
  const { t } = useI18n();
  const [displayName, setDisplayName] = useState("");
  const [handle, setHandle] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [bio, setBio] = useState("");
  const [handles, setHandles] = useState<PlatformHandles>({ youtube: "", kick: "", tiktok: "" });
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const [profile, links] = await Promise.all([getProfile(userId), getPlatformLinks(userId)]);
      if (profile) {
        setDisplayName(profile.display_name ?? "");
        setHandle(profile.handle ?? "");
        setAvatarUrl(profile.avatar_url ?? "");
        setBio(profile.bio ?? "");
      }
      setHandles((prev) => {
        const next = { ...prev };
        for (const l of links) next[l.platform as Platform] = l.handle;
        return next;
      });
    })();
  }, [userId]);

  const save = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setMsg(null);

    await updateProfile(userId, {
      display_name: displayName,
      handle: handle.trim().toLowerCase() || null,
      avatar_url: avatarUrl || null,
      bio: bio || null,
    });

    for (const p of PLATFORMS) await savePlatformHandle(userId, p, handles[p]);

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
