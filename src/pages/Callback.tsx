import { useEffect } from "react";
import { useAuth } from "react-oidc-context";
import { useNavigate } from "react-router-dom";

export default function Callback() {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.isLoading) return;
    if (auth.error) return;

    if (auth.isAuthenticated) {
      // ✅ state comes back as whatever you set in signinRedirect({ state: "..." })
      const returnTo =
        (auth.user?.state as string | undefined) && typeof auth.user?.state === "string"
          ? (auth.user.state as string)
          : "/";

      // Basic safety: only allow internal redirects
      const safeReturnTo = returnTo.startsWith("/") ? returnTo : "/";

      navigate(safeReturnTo, { replace: true });
    }
  }, [auth.isLoading, auth.isAuthenticated, auth.error, auth.user, navigate]);

  if (auth.isLoading) return <div className="p-6">Signing you in...</div>;
  if (auth.error) return <div className="p-6">Error: {auth.error.message}</div>;

  // If we're not loading and not authed, something went wrong
  return <div className="p-6">Finishing sign-in...</div>;
}
