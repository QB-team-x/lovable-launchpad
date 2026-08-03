
DROP TABLE IF EXISTS public.players;
DROP TABLE IF EXISTS public.rooms;

CREATE TYPE public.app_role AS ENUM ('creator', 'viewer');
CREATE TYPE public.stream_platform AS ENUM ('youtube', 'kick', 'tiktok');

CREATE TABLE public.profiles (
  id uuid PRIMARY KEY,
  role public.app_role NOT NULL DEFAULT 'viewer',
  handle text UNIQUE,
  display_name text,
  avatar_url text,
  bio text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.profiles TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "profiles_public_read" ON public.profiles FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "profiles_insert_own" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_update_own" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_delete_own" ON public.profiles FOR DELETE TO authenticated USING (auth.uid() = id);

CREATE TABLE public.platform_links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  platform public.stream_platform NOT NULL,
  handle text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (profile_id, platform)
);
CREATE INDEX platform_links_handle_idx ON public.platform_links (platform, lower(handle));
GRANT SELECT ON public.platform_links TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.platform_links TO authenticated;
GRANT ALL ON public.platform_links TO service_role;
ALTER TABLE public.platform_links ENABLE ROW LEVEL SECURITY;
CREATE POLICY "platform_links_public_read" ON public.platform_links FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "platform_links_insert_own" ON public.platform_links FOR INSERT TO authenticated WITH CHECK (auth.uid() = profile_id);
CREATE POLICY "platform_links_update_own" ON public.platform_links FOR UPDATE TO authenticated USING (auth.uid() = profile_id) WITH CHECK (auth.uid() = profile_id);
CREATE POLICY "platform_links_delete_own" ON public.platform_links FOR DELETE TO authenticated USING (auth.uid() = profile_id);

CREATE TABLE public.bio_links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  label text NOT NULL,
  url text NOT NULL,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX bio_links_profile_idx ON public.bio_links (profile_id, sort_order);
GRANT SELECT ON public.bio_links TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.bio_links TO authenticated;
GRANT ALL ON public.bio_links TO service_role;
ALTER TABLE public.bio_links ENABLE ROW LEVEL SECURITY;
CREATE POLICY "bio_links_public_read" ON public.bio_links FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "bio_links_insert_own" ON public.bio_links FOR INSERT TO authenticated WITH CHECK (auth.uid() = profile_id);
CREATE POLICY "bio_links_update_own" ON public.bio_links FOR UPDATE TO authenticated USING (auth.uid() = profile_id) WITH CHECK (auth.uid() = profile_id);
CREATE POLICY "bio_links_delete_own" ON public.bio_links FOR DELETE TO authenticated USING (auth.uid() = profile_id);

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

CREATE TRIGGER profiles_set_updated_at BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, role, display_name, handle)
  VALUES (
    NEW.id,
    COALESCE((NEW.raw_user_meta_data ->> 'role')::public.app_role, 'viewer'),
    NEW.raw_user_meta_data ->> 'display_name',
    NULLIF(lower(NEW.raw_user_meta_data ->> 'handle'), '')
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END; $$;

CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
