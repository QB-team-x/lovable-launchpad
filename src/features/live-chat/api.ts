import { LIVE_CHAT_ENDPOINT } from "@/config/live-chat";

export type ChatPart = {
  type: "text" | "emoji";
  text: string;
  url: string | null;
};

export type ChatMessage = {
  id: string;
  author: string;
  avatar: string | null;
  message: string;
  parts: ChatPart[] | null;
  image: { url: string; alt: string } | null;
  amount: string | null;
  timestamp: string;
  type: string;
};

export type ChatResponse = {
  online: boolean;
  source: string;
  videoId: string | null;
  messages: ChatMessage[];
  continuation: string | null;
  pollAfterMs: number;
};

/**
 * Reads a slice of a YouTube live chat. Pass the `continuation` token from the
 * previous response to receive only the messages posted since that call.
 */
export async function fetchLiveChat(
  source: string,
  continuation?: string,
  signal?: AbortSignal,
) {
  const params = new URLSearchParams({ source });
  if (continuation) params.set("continuation", continuation);

  const res = await fetch(`${LIVE_CHAT_ENDPOINT}?${params.toString()}`, {
    signal: signal ?? null,
  });
  if (!res.ok) throw new Error(`live chat request failed with ${res.status}`);

  return (await res.json()) as ChatResponse;
}
