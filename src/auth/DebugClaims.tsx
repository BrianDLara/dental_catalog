import { useAuth } from "react-oidc-context";

export function DebugClaims() {
  const auth = useAuth();

  if (!auth.user) return null;

  return (
    <pre className="mt-4 max-w-xl overflow-auto rounded-lg bg-black p-4 text-xs text-green-400">
      {JSON.stringify(auth.user.profile, null, 2)}
    </pre>
  );
}
