import { useCallback, useEffect, useState } from "react";
import {
  CHAT_SOURCE_STORAGE_KEY,
  DEFAULT_CHAT_SOURCE,
} from "@/config/live-chat";

/** The YouTube account whose chat is shown, remembered across visits. */
export function useChatSource() {
  const [source, setSource] = useState(DEFAULT_CHAT_SOURCE);

  useEffect(() => {
    const stored = window.localStorage.getItem(CHAT_SOURCE_STORAGE_KEY);
    if (stored) setSource(stored);
  }, []);

  const changeSource = useCallback((next: string) => {
    const value = next.trim();
    if (!value) return;
    setSource(value);
    window.localStorage.setItem(CHAT_SOURCE_STORAGE_KEY, value);
  }, []);

  return { source, changeSource };
}
