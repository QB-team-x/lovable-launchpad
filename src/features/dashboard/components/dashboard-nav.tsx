import { Link } from "@tanstack/react-router";
import { Brand } from "@/components/layout";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";
import { DASHBOARD_TABS, type DashboardTab } from "@/config/dashboard";

export function DashboardSidebar({ tab }: { tab: DashboardTab }) {
  const { t } = useI18n();
  return (
    <aside className="hidden w-60 shrink-0 border-e border-border p-5 sm:block">
      <Brand />
      <nav className="mt-8 space-y-1">
        {DASHBOARD_TABS.map(({ key, icon: Icon }) => (
          <Link
            key={key}
            to="/dashboard"
            search={{ tab: key }}
            className={cn(
              "flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition-colors",
              tab === key
                ? "bg-primary/15 text-primary"
                : "text-muted-foreground hover:bg-accent hover:text-foreground",
            )}
          >
            <Icon className="h-4 w-4" />
            {t(key)}
          </Link>
        ))}
      </nav>
    </aside>
  );
}

export function DashboardTabsMobile({ tab }: { tab: DashboardTab }) {
  const { t } = useI18n();
  return (
    <div className="mb-5 flex gap-2 overflow-x-auto sm:hidden">
      {DASHBOARD_TABS.map(({ key }) => (
        <Link key={key} to="/dashboard" search={{ tab: key }}>
          <Button variant={tab === key ? "primary" : "ghost"}>{t(key)}</Button>
        </Link>
      ))}
    </div>
  );
}
