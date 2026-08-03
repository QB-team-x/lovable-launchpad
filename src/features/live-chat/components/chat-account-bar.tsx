import { useEffect, useState, type FormEvent } from "react";
import { Youtube } from "lucide-react";
import { Button, Input } from "@/components/ui";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";

/** Top bar of the live section: shows the connected account and lets visitors switch it. */
export function ChatAccountBar({
  source,
  onSourceChange,
  className,
}: {
  source: string;
  onSourceChange: (next: string) => void;
  className?: string;
}) {
  const { t } = useI18n();
  const [draft, setDraft] = useState(source);

  useEffect(() => setDraft(source), [source]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    onSourceChange(draft);
  };

  return (
    <form
      onSubmit={submit}
      className={cn(
        "flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border bg-card px-5 py-4",
        className,
      )}
    >
      <div className="flex min-w-0 items-center gap-3">
        <Youtube className="h-6 w-6 shrink-0 text-destructive" />
        <div className="min-w-0">
          <p className="text-xs font-medium text-muted-foreground">
            {t("chat_account")}
          </p>
          <p className="truncate text-lg font-bold text-foreground" dir="ltr">
            {source}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="@channel"
          aria-label={t("chat_account")}
          dir="ltr"
          className="w-52"
        />
        <Button type="submit">{t("chat_apply")}</Button>
      </div>
    </form>
  );
}
