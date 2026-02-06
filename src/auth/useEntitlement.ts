import { useAuth } from "react-oidc-context";
import { useMemo } from "react";

export function useEntitlement() {
  const auth = useAuth();

  const isPaid = useMemo(() => {
    const profile = auth.user?.profile as Record<string, any> | undefined;
    const v = profile?.["custom:paid"] ?? profile?.["paid"];
    return v === "true" || v === true;
  }, [auth.user]);

  return { loading: auth.isLoading, isPaid };
}
