import { useAuth } from "react-oidc-context";
import { useState } from "react";
import { Button } from "../components/ui/button";
import { Check, Lock } from "lucide-react";

export default function Pay() {
  const auth = useAuth();
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const handleCheckout = async () => {
    if (loading) return;
    setLoading(true);
    setErr(null);

    try {
      const accessToken = auth.user?.access_token;
      if (!accessToken) throw new Error("Tu sesión expiró. Inicia sesión de nuevo.");

      const res = await fetch(import.meta.env.VITE_API_BASE + "/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({}),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "No se pudo iniciar el pago.");
      }

      const data = (await res.json()) as { url: string };
      window.location.href = data.url;
    } catch (e: any) {
      setErr(e?.message ?? "Ocurrió un error.");
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Mobile-safe padding (notch) + comfortable vertical rhythm */}
      <div className="mx-auto w-full max-w-xl px-4 pt-10 pb-28 sm:pb-12 sm:pt-14">
        <div className="rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-sm">
          {/* Header */}
          <div className="flex items-start gap-3">
            <div className="mt-0.5 rounded-xl border bg-background/60 p-2">
              <Lock className="h-5 w-5 text-primary" />
            </div>
            <div className="min-w-0">
              <h1 className="text-2xl sm:text-3xl font-bold leading-tight">
                Acceso de por vida
              </h1>
              <p className="mt-2 text-sm sm:text-base text-muted-foreground">
                Desbloquea el catálogo completo con un pago único. Acceso ilimitado.
              </p>
            </div>
          </div>

          {/* Offer Card */}
          <div className="mt-6 rounded-2xl border border-border/60 bg-muted/30 p-4 sm:p-5">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <p className="font-semibold leading-snug">
                  Guía Visual Dental – Acceso de por vida
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Pago único. Sin mensualidades.
                </p>
              </div>

              {/* Price pill */}
              <div className="self-start sm:self-auto rounded-xl border bg-background px-3 py-2">
                <p className="text-sm text-muted-foreground leading-none">Precio</p>
                <p className="text-lg font-bold leading-tight">$20 USD</p>
              </div>
            </div>

            {/* Value bullets (mobile-friendly) */}
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {[
                "Acceso inmediato",
                "Contenido completo",
                "Actualizaciones incluidas",
                "Acceso desde celular y PC",
              ].map((t) => (
                <div key={t} className="flex items-start gap-2">
                  <div className="mt-0.5 rounded-full bg-emerald-100 p-1 text-emerald-700">
                    <Check className="h-3.5 w-3.5" />
                  </div>
                  <p className="text-sm text-foreground">{t}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Error */}
          {err && (
            <div className="mt-4 rounded-xl border border-destructive/40 bg-destructive/10 p-4 text-sm">
              {err}
            </div>
          )}

          {/* Desktop CTA (inside card) */}
          <div className="mt-6 hidden sm:block">
            <Button
              onClick={handleCheckout}
              disabled={loading}
              className="w-full h-11 text-base"
            >
              {loading ? "Abriendo Stripe..." : "Pagar con Stripe"}
            </Button>

            <p className="mt-3 text-xs text-muted-foreground">
              Serás redirigido a Stripe para completar el pago de forma segura.
            </p>
          </div>
        </div>
      </div>

      {/* Mobile sticky CTA (thumb-friendly) */}
      <div className="sm:hidden fixed inset-x-0 bottom-0 z-50 border-t bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/70">
        <div className="mx-auto max-w-xl px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3">
          <Button
            onClick={handleCheckout}
            disabled={loading}
            className="w-full h-12 text-base"
          >
            {loading ? "Abriendo Stripe..." : "Pagar $20 USD con Stripe"}
          </Button>
          <p className="mt-2 text-[11px] leading-snug text-muted-foreground">
            Serás redirigido a Stripe para completar el pago.
          </p>
        </div>
      </div>
    </main>
  );
}
