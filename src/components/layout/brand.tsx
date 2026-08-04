import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { AssembleLogo } from "./assemble-logo";

export function Brand({ className }: { className?: string }) {
  return (
    <Link to="/" className={cn("flex items-center gap-2.5", className)}>
      {/* الشعار الآن SVG بدل صورة PNG بحجم 767 كيلوبايت */}
      <AssembleLogo size={44} animated={false} className="shrink-0" />
      <span className="text-xl font-extrabold tracking-tight text-foreground">
        qb<span className="text-primary">Live</span>
      </span>
    </Link>
  );
}
