import { useAuth } from "react-oidc-context";
import { useState } from "react";

export default function Pay() {
  const auth = useAuth();
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const handleCheckout = async () => {
    setLoading(true);
    setErr(null);

    try {
      const idToken = auth.user?.id_token;
      if (!idToken) throw new Error("Missing ID token. Please sign in again.");

      const res = await fetch(import.meta.env.VITE_API_BASE_URL + "/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({
          // optional: you can send a return path if you want
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to create checkout session.");
      }

      const data = (await res.json()) as { url: string };
      window.location.href = data.url;
    } catch (e: any) {
      setErr(e?.message ?? "Something went wrong.");
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto max-w-xl px-4 py-12">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h1 className="text-2xl font-bold">Acceso de por Vida</h1>
          <p className="mt-2 text-muted-foreground">
            Desbloquea el catálogo completo con pago único. Acceso ilimitado.
          </p>

          <div className="mt-6 rounded-xl border border-border/60 bg-muted/30 p-4">
            <div className="flex items-center justify-between">
              <span className="font-semibold">Catálogo Dental – Acceso de por Vida</span>
              <span className="font-bold">$20 USD</span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              Pago único. Sin mensualidades.
            </p>
          </div>

          {err && (
            <div className="mt-4 rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-sm">
              {err}
            </div>
          )}

          <button
            onClick={handleCheckout}
            disabled={loading}
            className="mt-6 w-full rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-50 transition"
          >
            {loading ? "Redirigiendo a pago..." : "Pagar con Stripe"}
          </button>

          <p className="mt-3 text-xs text-muted-foreground">
            Serás redirigido a Stripe para completar el pago.
          </p>
        </div>
      </div>
    </main>
  );
}
