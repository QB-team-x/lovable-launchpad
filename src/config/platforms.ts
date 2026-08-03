/** Streaming platforms a user can link to their profile. */
export const PLATFORMS = ["youtube", "kick", "tiktok"] as const;

export type Platform = (typeof PLATFORMS)[number];
