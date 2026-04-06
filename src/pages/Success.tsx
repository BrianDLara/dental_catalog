import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "react-oidc-context";
import { useEffect, useState } from "react";
import { CheckCircle2, Sparkles, ArrowRight } from "lucide-react";
import { useEntitlement } from "../auth/useEntitlement";

export default function Success() {
  const auth = useAuth();
  const navigate = useNavigate();
  const { isPaid, refreshEntitlement } = useEntitlement();

  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let cancelled = false;

    const interval = setInterval(async () => {
      if (cancelled) return;

      try {
        await refreshEntitlement();
      } catch (e) {
        console.error("Polling error:", e);
      }
    }, 1000);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [refreshEntitlement]);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (isPaid) {
      const timer = setTimeout(() => {
        navigate("/?welcome=1");
      }, 1800);

      return () => clearTimeout(timer);
    }
  }, [isPaid, navigate]);

  const refreshAccess = async () => {
    try {
      await auth.removeUser();
      await auth.signinRedirect({ state: { from: "/" } });
    } catch (e) {
      console.error("Manual refresh failed:", e);
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto max-w-xl px-4 py-16">
        <div className="rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
            {isPaid ? <CheckCircle2 className="h-8 w-8" /> : <Sparkles className="h-8 w-8" />}
          </div>

          <h1 className="text-2xl font-bold">
            {isPaid ? "¡Bienvenido al acceso completo!" : "¡Pago confirmado!"}
          </h1>

          {isPaid ? (
            <>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Tu acceso de por vida ya está activo. Ya puedes explorar todo el catálogo sin límites.
              </p>

              <div className="mt-6 rounded-2xl border border-primary/20 bg-primary/5 p-5 text-left">
                <p className="text-sm font-semibold text-foreground">
                  Ya tienes disponible:
                </p>

                <div className="mt-3 grid gap-2">
                  {[
                    "Todos los procedimientos desbloqueados",
                    "Acceso desde celular y computadora",
                    "Actualizaciones incluidas",
                    "Acceso permanente con un solo pago",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <p className="mt-4 text-sm text-muted-foreground">
                Redirigiendo al catálogo...
              </p>
            </>
          ) : (
            <>
              <p className="mt-3 text-sm text-muted-foreground">
                Estamos activando tu acceso...
              </p>

              <p className="mt-2 text-xs text-muted-foreground">
                Esto puede tomar unos segundos ({seconds}s)
              </p>

              <div className="mt-6 flex justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
              </div>
            </>
          )}

          <div className="mt-6 space-y-3">
            {isPaid ? (
              <>
                <Link
                  to="/?welcome=1"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
                >
                  Ir al catálogo
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  to="/procedure/limpieza"
                  className="inline-flex w-full justify-center rounded-lg border border-border px-5 py-3 text-sm font-semibold transition hover:bg-muted/40"
                >
                  Ver un procedimiento ahora
                </Link>
              </>
            ) : seconds > 5 ? (
              <button
                onClick={refreshAccess}
                className="w-full rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
              >
                Actualizar acceso manualmente
              </button>
            ) : null}

            {!isPaid && (
              <Link
                to="/"
                className="inline-flex w-full justify-center rounded-lg border border-border px-5 py-3 text-sm font-semibold transition hover:bg-muted/40"
              >
                Ir al catálogo
              </Link>
            )}
          </div>

          <p className="mt-6 text-xs text-muted-foreground">
            Acceso de por vida · Pago único · Sin suscripciones
          </p>
        </div>
      </div>
    </main>
  );
}