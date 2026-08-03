import { Button } from "@/components/ui";
import { useI18n } from "@/lib/i18n";

export function LangToggle() {
  const { lang, setLang } = useI18n();
  return (
    <Button
      variant="ghost"
      className="px-3 py-1.5"
      onClick={() => setLang(lang === "ar" ? "en" : "ar")}
    >
      {lang === "ar" ? "EN" : "ع"}
    </Button>
  );
}
