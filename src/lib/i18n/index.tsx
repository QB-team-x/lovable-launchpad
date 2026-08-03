import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { ar } from "./locales/ar";
import { en } from "./locales/en";

export type Lang = "ar" | "en";
export type Key = keyof typeof ar;

const dictionaries: Record<Lang, Record<Key, string>> = { ar, en };

const STORAGE_KEY = "qblive-lang";
const DEFAULT_LANG: Lang = "ar";

type I18nValue = { lang: Lang; setLang: (l: Lang) => void; t: (k: Key) => string };

const I18nContext = createContext<I18nValue>({
  lang: DEFAULT_LANG,
  setLang: () => {},
  t: (k) => ar[k],
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(DEFAULT_LANG);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "en" || stored === "ar") setLang(stored);
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  const value = useMemo<I18nValue>(
    () => ({ lang, setLang, t: (k) => dictionaries[lang][k] }),
    [lang],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export const useI18n = () => useContext(I18nContext);
