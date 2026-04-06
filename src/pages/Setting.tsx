import { useAuth } from "react-oidc-context";
import { cognitoLogout } from "../auth/logout";

export default function Settings() {
  const auth = useAuth();

  const email = (auth.user?.profile as any)?.email as string | undefined;

  const handleLogout = async () => {
    try {
      // Clear local session
      await auth.removeUser();
    } finally {
      // Always hit Cognito logout
      setTimeout(() => cognitoLogout(), 0);
    }
  };

  if (auth.isLoading) return <div className="p-6">Cargando…</div>;
  if (!auth.isAuthenticated)
    return <div className="p-6">Por favor, inicia sesión.</div>;

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-xl space-y-6">
        <div className="rounded-xl border bg-card p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-xl font-semibold text-foreground">
                Configuración
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Información de tu cuenta.
              </p>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center justify-center rounded-lg border border-border bg-[#597EBF] px-4 py-2 text-sm font-medium hover:bg-red-800 hover:text-white transition"
            >
              Cerrar sesión
            </button>
          </div>

          <div className="mt-4 space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Correo</span>
              <span className="text-foreground">{email ?? "—"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
