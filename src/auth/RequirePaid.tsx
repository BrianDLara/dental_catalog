import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "react-oidc-context";
import { useEntitlement } from "./useEntitlement";
import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

export function RequirePaid({ children }: { children: ReactNode }) {
  const auth = useAuth();
  const loc = useLocation();
  const { loading, isPaid } = useEntitlement();

  const redirectingRef = useRef(false);

  useEffect(() => {
    if (redirectingRef.current) return;

    if (!auth.isLoading && !auth.isAuthenticated && !auth.error) {
      redirectingRef.current = true;
      auth.signinRedirect({
        state: { from: loc.pathname + loc.search + loc.hash },
      });
    }
  }, [
    auth.isLoading,
    auth.isAuthenticated,
    auth.error,
    auth,
    loc.pathname,
    loc.search,
    loc.hash,
  ]);

  const isResolvingAuth =
    auth.isLoading ||
    (!auth.isAuthenticated && !auth.error && redirectingRef.current);

  //Full-page placeholder while auth is resolving
  if (isResolvingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-muted-foreground text-sm">
            Verificando tu sesión…
          </p>
        </div>
      </div>
    );
  }

  //Auth error
  if (auth.error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-6">
        <div className="max-w-md rounded-xl border bg-card p-6">
          <p className="font-semibold text-foreground">Error de autenticación</p>
          <pre className="mt-3 text-sm text-muted-foreground whitespace-pre-wrap">
            {auth.error.message}
          </pre>
        </div>
      </div>
    );
  }

  //Entitlement still loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground text-sm">
          Verificando acceso…
        </p>
      </div>
    );
  }

  //Logged in but not paid
  if (!isPaid) {
    return <Navigate to="/pay" replace />;
  }

  //Authenticated + paid
  return <>{children}</>;
}
