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
  }, [auth.isLoading, auth.isAuthenticated, auth.error, auth, loc.pathname, loc.search, loc.hash]);

  if (auth.isLoading) return <div className="p-6">Loading session...</div>;

  if (auth.error) {
    return (
      <div className="p-6">
        <p className="font-semibold">Auth error</p>
        <pre className="mt-2 text-sm opacity-80">{auth.error.message}</pre>
      </div>
    );
  }

  if (!auth.isAuthenticated) return <div className="p-6">Redirecting to sign in...</div>;

  if (loading) return <div className="p-6">Checking access...</div>;

  if (!isPaid) return <Navigate to="/pay" replace />;

  return <>{children}</>;
}
