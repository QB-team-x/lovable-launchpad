import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import logo from "@/assets/qblive-logo.png";

export function Brand({ className }: { className?: string }) {
  return (
    <Link to="/" className={cn("flex items-center gap-2", className)}>
      <img src={logo} alt="qbLive" width={36} height={36} className="h-9 w-9" />
      <span className="text-xl font-extrabold tracking-tight text-foreground">
        qb<span className="text-primary">Live</span>
      </span>
    </Link>
  );
}
