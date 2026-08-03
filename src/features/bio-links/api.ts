import { supabase } from "@/integrations/supabase/client";

export type BioLink = { id: string; label: string; url: string; sort_order: number };

export async function listBioLinks(profileId: string) {
  const { data } = await supabase
    .from("bio_links")
    .select("id, label, url, sort_order")
    .eq("profile_id", profileId)
    .order("sort_order");
  return (data ?? []) as BioLink[];
}

export async function addBioLink(profileId: string, link: Omit<BioLink, "id">) {
  return supabase.from("bio_links").insert({ profile_id: profileId, ...link });
}

export async function updateBioLink(id: string, patch: Partial<BioLink>) {
  return supabase.from("bio_links").update(patch).eq("id", id);
}

export async function deleteBioLink(id: string) {
  return supabase.from("bio_links").delete().eq("id", id);
}

export async function swapBioLinkOrder(a: BioLink, b: BioLink) {
  return Promise.all([
    updateBioLink(a.id, { sort_order: b.sort_order }),
    updateBioLink(b.id, { sort_order: a.sort_order }),
  ]);
}
