/** Public read-only YouTube live chat reader — no API key required. */
export const LIVE_CHAT_ENDPOINT =
  "https://live-chat-reader.lovable.app/api/public/chat";

/** Channel handle used until the visitor picks another account. */
export const DEFAULT_CHAT_SOURCE = "@XDreemB52";

export const CHAT_SOURCE_STORAGE_KEY = "qblive-chat-source";

/** The API allows 200ms, but a calmer floor keeps the landing page light. */
export const MIN_POLL_MS = 1500;

/** Backoff after a failed request. */
export const RETRY_POLL_MS = 5000;

/** Older messages are dropped so the panel never grows without bound. */
export const MAX_CHAT_MESSAGES = 80;
