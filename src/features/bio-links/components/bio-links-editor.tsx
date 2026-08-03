import { useCallback, useEffect, useState, type FormEvent } from "react";
import { Button, Card, Field, Input } from "@/components/ui";
import { useI18n } from "@/lib/i18n";
import {
  addBioLink,
  deleteBioLink,
  listBioLinks,
  swapBioLinkOrder,
  updateBioLink,
  type BioLink,
} from "../api";

export function BioLinksEditor({ userId }: { userId: string }) {
  const { t } = useI18n();
  const [links, setLinks] = useState<BioLink[]>([]);
  const [label, setLabel] = useState("");
  const [url, setUrl] = useState("");

  const load = useCallback(async () => setLinks(await listBioLinks(userId)), [userId]);

  useEffect(() => {
    load();
  }, [load]);

  const add = async (e: FormEvent) => {
    e.preventDefault();
    await addBioLink(userId, { label, url, sort_order: links.length });
    setLabel("");
    setUrl("");
    load();
  };

  const move = async (index: number, dir: -1 | 1) => {
    const a = links[index];
    const b = links[index + dir];
    if (!a || !b) return;
    await swapBioLinkOrder(a, b);
    load();
  };

  const patch = async (id: string, values: Partial<BioLink>) => {
    setLinks((prev) => prev.map((l) => (l.id === id ? { ...l, ...values } : l)));
    await updateBioLink(id, values);
  };

  const remove = async (id: string) => {
    await deleteBioLink(id);
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
              <Input value={l.label} onChange={(e) => patch(l.id, { label: e.target.value })} />
            </Field>
          </div>
          <div className="min-w-36 flex-1">
            <Field label={t("url")}>
              <Input value={l.url} onChange={(e) => patch(l.id, { url: e.target.value })} />
            </Field>
          </div>
          <Button variant="ghost" onClick={() => move(i, -1)} aria-label={t("up")}>
            ↑
          </Button>
          <Button variant="ghost" onClick={() => move(i, 1)} aria-label={t("down")}>
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
