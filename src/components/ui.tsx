import type { ReactNode, ButtonHTMLAttributes, InputHTMLAttributes } from "react";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";
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

export function Button({
  className,
  variant = "primary",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "ghost" | "danger" }) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition-colors disabled:opacity-50",
        variant === "primary" && "bg-primary text-primary-foreground hover:bg-primary/90",
        variant === "ghost" && "border border-border text-foreground hover:bg-accent",
        variant === "danger" && "text-destructive hover:bg-destructive/10",
        className,
      )}
      {...props}
    />
  );
}

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "w-full rounded-xl border border-border bg-card px-3 py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary",
        className,
      )}
      {...props}
    />
  );
}

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block space-y-1.5">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}

export function Card({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className={cn("rounded-2xl border border-border bg-card p-5", className)}>{children}</div>
  );
}

export function LangToggle() {
  const { lang, setLang } = useI18n();
  return (
    <Button variant="ghost" className="px-3 py-1.5" onClick={() => setLang(lang === "ar" ? "en" : "ar")}>
      {lang === "ar" ? "EN" : "ع"}
    </Button>
  );
}
