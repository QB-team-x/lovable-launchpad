import { useEffect, useRef } from "react";
import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";
import type { ChatMessage } from "../api";
import { useLiveChat } from "../hooks/use-live-chat";

/** Live YouTube chat column. */
export function LiveChatPanel({
  source,
  className,
}: {
  source: string;
  className?: string;
}) {
  const { t } = useI18n();
  const { messages, online, loading, error } = useLiveChat(source);
  const scroller = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scroller.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages]);

  return (
    <aside
      className={cn(
        "flex flex-col overflow-hidden rounded-2xl border border-border bg-card",
        className,
      )}
    >
      <header className="flex items-center justify-between gap-2 border-b border-border px-4 py-3">
        <div className="flex items-center gap-2">
          <MessageCircle className="h-4 w-4 text-primary" />
          <span className="text-sm font-bold text-foreground">
            {t("chat_title")}
          </span>
        </div>
        <span
          className={cn(
            "flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold",
            online
              ? "bg-primary/15 text-primary"
              : "bg-muted text-muted-foreground",
          )}
        >
          <span
            className={cn(
              "h-1.5 w-1.5 rounded-full",
              online ? "animate-pulse bg-primary" : "bg-muted-foreground",
            )}
          />
          {online ? t("chat_live") : t("chat_offline")}
        </span>
      </header>

      <div
        ref={scroller}
        className="min-h-0 flex-1 space-y-3 overflow-y-auto p-4"
      >
        {messages.map((m) => (
          <ChatRow key={m.id} message={m} />
        ))}

        {messages.length === 0 && (
          <p className="pt-6 text-center text-sm text-muted-foreground">
            {loading ? t("loading") : error ? t("chat_error") : t("chat_empty")}
          </p>
        )}
      </div>
    </aside>
  );
}

function ChatRow({ message }: { message: ChatMessage }) {
  const parts = message.parts?.length
    ? message.parts
    : [{ type: "text" as const, text: message.message, url: null }];

  return (
    <div className="flex items-start gap-2" dir="ltr">
      {message.avatar && (
        <img
          src={message.avatar}
          alt=""
          loading="lazy"
          className="mt-0.5 h-6 w-6 shrink-0 rounded-full object-cover"
        />
      )}
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-secondary">
            {message.author}
          </span>
          {message.amount && (
            <span className="rounded-md bg-primary/15 px-1.5 py-0.5 text-[11px] font-bold text-primary">
              {message.amount}
            </span>
          )}
        </div>
        <p className="break-words text-sm text-foreground">
          {parts.map((part, i) =>
            part.type === "emoji" && part.url ? (
              <img
                key={i}
                src={part.url}
                alt={part.text}
                className="inline-block h-5 w-5 align-text-bottom"
              />
            ) : (
              <span key={i}>{part.text}</span>
            ),
          )}
        </p>
        {message.image && (
          <img
            src={message.image.url}
            alt={message.image.alt}
            loading="lazy"
            className="mt-1.5 max-h-28 rounded-lg"
          />
        )}
      </div>
    </div>
  );
}
