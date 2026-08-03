import { Gamepad2, LinkIcon, Store, Trophy } from "lucide-react";
import type { Key } from "@/lib/i18n";

export const DASHBOARD_TABS = [
  { key: "links", icon: LinkIcon },
  { key: "games", icon: Gamepad2 },
  { key: "tournaments", icon: Trophy },
  { key: "store", icon: Store },
] as const satisfies ReadonlyArray<{ key: Key; icon: unknown }>;

export type DashboardTab = (typeof DASHBOARD_TABS)[number]["key"];
