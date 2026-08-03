# Online Game Starter

A deliberately empty starter (blank white page) with a working database and realtime
sync already wired up, so you can start coding online multiplayer games immediately.

## Stack

- React 19 + TanStack Start (file-based routing in `src/routes`)
- Tailwind CSS v4 (`src/styles.css`)
- Lovable Cloud (Postgres database, realtime, auth, storage)

## Setup

```bash
bun install     # or: npm install
bun run dev     # http://localhost:8080
```

Environment variables are already generated in `.env`:

- `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY` — browser client
- `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY` — server functions

Never commit secrets or use the service-role key in browser code.

## Database

Two tables, ready for game sessions:

| Table     | Columns                                          |
| --------- | ------------------------------------------------ |
| `rooms`   | `id`, `name`, `status`, `state` (jsonb), `created_at` |
| `players` | `id`, `room_id` → `rooms.id`, `nickname`, `created_at` |

Both have realtime enabled. Access is currently open (no login required) so you can
prototype fast — tighten the row-level rules before shipping anything public.

Schema changes live in `supabase/migrations/`.

## Querying the database

```ts
import { supabase } from "@/integrations/supabase/client";

// Create a room
const { data: room } = await supabase
  .from("rooms")
  .insert({ name: "Room 1" })
  .select()
  .single();

// Join it
await supabase.from("players").insert({ room_id: room!.id, nickname: "p1" });

// Read rooms with their players
const { data } = await supabase.from("rooms").select("*, players(*)");

// Push game state
await supabase.from("rooms").update({ state: { turn: 1 } }).eq("id", room!.id);
```

## Testing online (realtime) sync

Subscribe inside `useEffect` and always remove the channel on unmount:

```ts
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

useEffect(() => {
  const channel = supabase
    .channel("rooms")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "rooms" },
      (payload) => console.log("room changed", payload),
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}, []);
```

To verify it works: open the app in two browser tabs, run an insert/update from one
(via the snippets above or the Cloud data view) and watch the other tab log the event.

## Structure

```
src/
  routes/
    __root.tsx     app shell
    index.tsx      "/" — intentionally blank
  integrations/supabase/   generated clients (do not edit)
  lib/ hooks/      utilities
  styles.css       design tokens
supabase/migrations/       database schema
```

Add new pages as files in `src/routes`. Add server-side logic with
`createServerFn` from `@tanstack/react-start`; put webhooks/public APIs in
`src/routes/api/public/`.
