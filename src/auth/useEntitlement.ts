import { useAuth } from "react-oidc-context";
import { useCallback, useEffect, useState } from "react";

type EntitlementState = {
  loading: boolean;
  isPaid: boolean;
  trialActive: boolean;
  trialStartedAt: string | null;
  trialEndsAt: string | null;
};

type EntitlementResponse = {
  isPaid?: boolean;
  trialActive?: boolean;
  trialStartedAt?: string | null;
  trialEndsAt?: string | null;
};

export function useEntitlement() {
  const auth = useAuth();

  const [state, setState] = useState<EntitlementState>({
    loading: true,
    isPaid: false,
    trialActive: false,
    trialStartedAt: null,
    trialEndsAt: null,
  });

  const refreshEntitlement = useCallback(async () => {
    if (auth.isLoading) {
      return;
    }

    if (!auth.isAuthenticated || !auth.user?.access_token) {
      setState({
        loading: false,
        isPaid: false,
        trialActive: false,
        trialStartedAt: null,
        trialEndsAt: null,
      });
      return;
    }

    setState((prev) => ({ ...prev, loading: true }));

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE}/entitlement`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${auth.user.access_token}`,
        },
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "No se pudo verificar el acceso.");
      }

      const data = (await res.json()) as EntitlementResponse;

      setState({
        loading: false,
        isPaid: !!data.isPaid,
        trialActive: !!data.trialActive,
        trialStartedAt: data.trialStartedAt ?? null,
        trialEndsAt: data.trialEndsAt ?? null,
      });
    } catch (error) {
      console.error("entitlement fetch error:", error);
      setState({
        loading: false,
        isPaid: false,
        trialActive: false,
        trialStartedAt: null,
        trialEndsAt: null,
      });
    }
  }, [auth.isAuthenticated, auth.isLoading, auth.user?.access_token]);

  useEffect(() => {
    void refreshEntitlement();
  }, [refreshEntitlement]);

  return {
    ...state,
    refreshEntitlement,
  };
}