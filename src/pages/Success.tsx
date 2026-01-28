import { Link } from "react-router-dom";

export default function Success() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto max-w-xl px-4 py-12">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm text-center">
          <h1 className="text-2xl font-bold">¡Pago confirmado!</h1>
          <p className="mt-2 text-muted-foreground">
            Tu acceso se está activando. Si entras y aún aparece bloqueado, cierra sesión y vuelve a iniciar.
          </p>
          <Link
            to="/"
            className="mt-6 inline-flex rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 transition"
          >
            Ir al catálogo
          </Link>
        </div>
      </div>
    </main>
  );
}
