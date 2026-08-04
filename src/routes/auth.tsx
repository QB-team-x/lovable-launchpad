import { useState } from "react";
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { z } from "zod";
import { SITE_URL } from "@/config/site";
import { supabase } from "@/integrations/supabase/client";
import { Brand, LangToggle } from "@/components/layout";
import { Button, Card, Field, Input } from "@/components/ui";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/auth")({
  validateSearch: z.object({ mode: z.enum(["login", "signup"]).default("signup") }),
  head: () => ({
    meta: [
      { title: "الدخول إلى qbLive" },
      { name: "description", content: "أنشئ حساب qbLive أو سجّل الدخول كصانع محتوى أو مشاهد." },
      { property: "og:title", content: "الدخول إلى qbLive" },
      { property: "og:description", content: "أنشئ حساب qbLive أو سجّل الدخول." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const { mode } = Route.useSearch();
  const { t } = useI18n();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"creator" | "viewer">("creator");
  const [msg, setMsg] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setMsg(null);
    if (mode === "signup") {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        // النطاق الرسمي وليس window.location.origin — وإلا عاد رابط التأكيد
        // إلى النطاق الذي سجّل منه المستخدم (lovable.app القديم مثلاً).
        options: { emailRedirectTo: SITE_URL, data: { role } },
      });
      setBusy(false);
      if (error) return setMsg(error.message);
      if (!data.session) return setMsg("تحقق من بريدك الإلكتروني لتأكيد الحساب / Check your email");
      navigate({ to: role === "creator" ? "/onboarding" : "/profile" });
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      setBusy(false);
      if (error) return setMsg(error.message);
      navigate({ to: "/dashboard" });
    }
  };

  return (
    <main className="min-h-screen bg-background">
      <header className="mx-auto flex max-w-5xl items-center justify-between px-5 py-5">
        <Brand />
        <LangToggle />
      </header>
      <div className="mx-auto max-w-md px-5 py-12">
        <Card className="space-y-5">
          <h1 className="text-2xl font-bold text-foreground">
            {mode === "signup" ? t("signup") : t("login")}
          </h1>
          <form onSubmit={submit} className="space-y-4">
            <Field label={t("email")}>
              <Input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            </Field>
            <Field label={t("password")}>
              <Input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Field>

            {mode === "signup" && (
              <div className="space-y-2">
                <span className="text-xs font-medium text-muted-foreground">{t("role")}</span>
                <div className="grid grid-cols-2 gap-2">
                  {(["creator", "viewer"] as const).map((r) => (
                    <button
                      type="button"
                      key={r}
                      onClick={() => setRole(r)}
                      className={`rounded-xl border p-3 text-start transition-colors ${
                        role === r ? "border-primary bg-primary/10" : "border-border bg-card"
                      }`}
                    >
                      <div className="text-sm font-bold text-foreground">{t(r)}</div>
                      <div className="text-xs text-muted-foreground">{t(`${r}_d` as const)}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {msg && <p className="text-sm text-destructive">{msg}</p>}
            <Button type="submit" disabled={busy} className="w-full">
              {mode === "signup" ? t("signup") : t("login")}
            </Button>
          </form>

          <Link
            to="/auth"
            search={{ mode: mode === "signup" ? "login" : "signup" }}
            className="block text-center text-xs text-muted-foreground hover:text-foreground"
          >
            {mode === "signup" ? t("have_account") : t("no_account")}
          </Link>
        </Card>
      </div>
    </main>
  );
}
