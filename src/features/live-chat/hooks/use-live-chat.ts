import { useEffect, useState } from "react";
import {
  MAX_CHAT_MESSAGES,
  MIN_POLL_MS,
  RETRY_POLL_MS,
} from "@/config/live-chat";
import { fetchLiveChat, type ChatMessage } from "../api";

export type LiveChatState = {
  messages: ChatMessage[];
  online: boolean;
  videoId: string | null;
  loading: boolean;
  error: boolean;
};

const EMPTY: LiveChatState = {
  messages: [],
  online: false,
  videoId: null,
  loading: true,
  error: false,
};

/** Polls the public live chat reader for `source` and keeps a rolling buffer of messages. */
export function useLiveChat(source: string): LiveChatState {
  const [state, setState] = useState<LiveChatState>(EMPTY);

  useEffect(() => {
    if (!source) return;

    const controller = new AbortController();
    let timer: ReturnType<typeof setTimeout>;
    let continuation: string | undefined;
    let stopped = false;

    setState(EMPTY);

    const schedule = (ms: number) => {
      if (!stopped) timer = setTimeout(poll, Math.max(ms, MIN_POLL_MS));
    };

    const poll = async () => {
      try {
        const data = await fetchLiveChat(
          source,
          continuation,
          controller.signal,
        );
        if (stopped) return;
        continuation = data.continuation ?? undefined;
        setState((prev) => ({
          messages: appendMessages(prev.messages, data.messages ?? []),
          online: data.online,
          videoId: data.videoId ?? null,
          loading: false,
          error: false,
        }));
        schedule(data.pollAfterMs ?? MIN_POLL_MS);
      } catch {
        if (stopped) return;
        setState((prev) => ({ ...prev, loading: false, error: true }));
        schedule(RETRY_POLL_MS);
      }
    };

    poll();

    return () => {
      stopped = true;
      controller.abort();
      clearTimeout(timer);
    };
  }, [source]);

  return state;
}

/** Appends only unseen messages, returning the previous array when nothing changed. */
function appendMessages(prev: ChatMessage[], incoming: ChatMessage[]) {
  if (incoming.length === 0) return prev;
  const seen = new Set(prev.map((m) => m.id));
  const fresh = incoming.filter((m) => !seen.has(m.id));
  if (fresh.length === 0) return prev;
  return [...prev, ...fresh].slice(-MAX_CHAT_MESSAGES);
}
