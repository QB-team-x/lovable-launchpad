import { supabase } from "@/integrations/supabase/client";
import type { Tables, TablesUpdate } from "@/integrations/supabase/types";
import type { Platform } from "@/config/platforms";

export type Profile = Tables<"profiles">;

export type PlatformHandles = Record<Platform, string>;

export async function getProfile(userId: string) {
  const { data } = await supabase.from("profiles").select("*").eq("id", userId).maybeSingle();
  return (data as Profile | null) ?? null;
}

export async function getProfileByHandle(handle: string) {
  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("handle", handle.toLowerCase())
    .maybeSingle();
  return (data as Profile | null) ?? null;
}

export async function getPlatformLinks(profileId: string) {
  const { data } = await supabase
    .from("platform_links")
    .select("platform, handle")
    .eq("profile_id", profileId);
  return data ?? [];
}

export async function updateProfile(userId: string, patch: TablesUpdate<"profiles">) {
  return supabase.from("profiles").update(patch).eq("id", userId);
}

export async function savePlatformHandle(profileId: string, platform: Platform, handle: string) {
  const value = handle.trim().replace(/^@/, "").toLowerCase();
  if (value) {
    return supabase
      .from("platform_links")
      .upsert({ profile_id: profileId, platform, handle: value }, { onConflict: "profile_id,platform" });
  }
  return supabase
    .from("platform_links")
    .delete()
    .eq("profile_id", profileId)
    .eq("platform", platform);
}
