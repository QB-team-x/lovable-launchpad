import { Card } from "@/components/ui";
import { useI18n } from "@/lib/i18n";

/** Placeholder used by dashboard sections that are not built yet. */
export function ComingSoon() {
  const { t } = useI18n();
  return (
    <Card className="flex flex-col items-center justify-center py-20 text-center">
      <span className="text-3xl">🚧</span>
      <h2 className="mt-3 text-lg font-bold text-foreground">{t("soon")}</h2>
      <p className="mt-1 text-sm text-muted-foreground">{t("soon_d")}</p>
    </Card>
  );
}
