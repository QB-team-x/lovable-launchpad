CREATE TABLE public.rooms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  status text NOT NULL DEFAULT 'open',
  state jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.players (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id uuid NOT NULL REFERENCES public.rooms(id) ON DELETE CASCADE,
  nickname text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX players_room_id_idx ON public.players(room_id);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.rooms TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.players TO anon, authenticated;
GRANT ALL ON public.rooms TO service_role;
GRANT ALL ON public.players TO service_role;

ALTER TABLE public.rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.players ENABLE ROW LEVEL SECURITY;

CREATE POLICY "rooms_public_access" ON public.rooms FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "players_public_access" ON public.players FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

ALTER TABLE public.rooms REPLICA IDENTITY FULL;
ALTER TABLE public.players REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.rooms;
ALTER PUBLICATION supabase_realtime ADD TABLE public.players;