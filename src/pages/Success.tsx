import { Link } from "react-router-dom";
import { useAuth } from "react-oidc-context";
import { useState } from "react";

export default function Success() {
  const auth = useAuth();
  const [refreshing, setRefreshing] = useState(false);

  const refreshAccess = async () => {
    try {
      setRefreshing(true);
      // Forces token refresh so custom:paid is reloaded
      await auth.removeUser();
      await auth.signinRedirect();
    } catch (e) {
      console.error("Error refreshing session", e);
      setRefreshing(false);
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto max-w-xl px-4 py-16">
        <div className="rounded-2xl border border-border bg-card p-8 shadow-sm text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
            ✓
          </div>

          <h1 className="text-2xl font-bold">¡Pago confirmado!</h1>

          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
            Tu pago fue procesado correctamente y tu acceso de por vida está siendo
            activado.
          </p>

          <p className="mt-2 text-sm text-muted-foreground">
            Si el catálogo aún aparece bloqueado, solo necesitas actualizar tu sesión
            para que el acceso se desbloquee.
          </p>

          <div className="mt-6 space-y-3">
            <button
              onClick={refreshAccess}
              disabled={refreshing}
              className="w-full rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-50 transition"
            >
              {refreshing ? "Actualizando acceso..." : "Actualizar acceso ahora"}
            </button>

            <Link
              to="/"
              className="inline-flex w-full justify-center rounded-lg border border-border px-5 py-3 text-sm font-semibold hover:bg-muted/40 transition"
            >
              Ir al catálogo
            </Link>
          </div>

          <p className="mt-6 text-xs text-muted-foreground">
            Acceso de por vida · Pago único · Sin suscripciones
          </p>
        </div>
      </div>
    </main>
  );
}
