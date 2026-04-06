import { useMemo, useState } from "react";
import { Search, Sparkles, CheckCircle2, ArrowRight, X } from "lucide-react";
import { useSearchParams, Link } from "react-router-dom";
import { Input } from "../components/ui/input";
import { procedures, heroImage } from "../lib/data";
import { ProcedureCard } from "../components/procedure-card";
import { motion } from "framer-motion";
import { useEntitlement } from "../auth/useEntitlement";

export default function Home() {
  const [search, setSearch] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const { isPaid } = useEntitlement();

  const showWelcome = searchParams.get("welcome") === "1" && isPaid;

  const filteredProcedures = useMemo(() => {
    return procedures.filter(
      (p) =>
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.shortDescription.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const featuredProcedure = procedures[0];

  const dismissWelcome = () => {
    const next = new URLSearchParams(searchParams);
    next.delete("welcome");
    setSearchParams(next, { replace: true });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative flex h-[50vh] items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Dental Office"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/40 mix-blend-multiply" />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-md">
              <Sparkles className="h-4 w-4 text-yellow-300" />
              <span className="text-sm font-medium tracking-wide">
                Guía Visual Interactiva
              </span>
            </div>

            <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl">
              Entiende tu <br className="hidden md:block" />
              <span className="bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                Salud Dental
              </span>
            </h1>

            <p className="mx-auto mb-8 max-w-2xl text-lg text-white/80 md:text-xl">
              Explicaciones visuales, claras y profesionales para comprender tus
              tratamientos sin complicaciones
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search & Grid */}
      <section className="relative z-20 container mx-auto -mt-8 px-4 pb-20">
        {showWelcome && (
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="mx-auto mb-6 max-w-4xl overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/10 via-background to-primary/5 shadow-lg"
          >
            <div className="flex items-start justify-between gap-4 p-5 sm:p-6">
              <div className="min-w-0">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-primary">
                  <CheckCircle2 className="h-4 w-4" />
                  <span className="text-xs font-semibold uppercase tracking-wide">
                    Acceso activado
                  </span>
                </div>

                <h2 className="text-xl font-bold text-foreground sm:text-2xl">
                  ¡Bienvenido! Ya tienes acceso completo al catálogo
                </h2>

                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                  Ya puedes explorar todos los procedimientos, revisar explicaciones
                  visuales y usar la guía completa sin límites.
                </p>

                <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                  {featuredProcedure && (
                    <Link
                      to={`/procedure/${featuredProcedure.id}`}
                      className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
                    >
                      Empezar ahora
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  )}

                  <button
                    onClick={() => {
                      const searchBox = document.getElementById("procedure-search");
                      searchBox?.scrollIntoView({ behavior: "smooth", block: "center" });
                      const input = document.getElementById("procedure-search-input") as HTMLInputElement | null;
                      input?.focus();
                    }}
                    className="inline-flex items-center justify-center rounded-lg border border-border px-5 py-3 text-sm font-semibold transition hover:bg-muted/40"
                  >
                    Buscar un tratamiento
                  </button>
                </div>
              </div>

              <button
                onClick={dismissWelcome}
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-muted hover:text-foreground"
                aria-label="Cerrar bienvenida"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}

        <div
          id="procedure-search"
          className="mx-auto mb-12 flex max-w-2xl items-center gap-4 rounded-xl border bg-white bg-card p-4 shadow-lg"
        >
          <Search className="ml-2 h-5 w-5 text-muted-foreground" />
          <Input
            id="procedure-search-input"
            placeholder="Buscar tratamiento (ej. Resina, Implante...)"
            className="border-none bg-transparent text-lg text-background shadow-none focus-visible:ring-0"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProcedures.map((procedure, index) => (
            <motion.div
              key={procedure.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ProcedureCard procedure={procedure} />
            </motion.div>
          ))}
        </div>

        {filteredProcedures.length === 0 && (
          <div className="py-20 text-center text-muted-foreground">
            <p className="text-xl">No encontramos tratamientos con ese nombre.</p>
            <button
              onClick={() => setSearch("")}
              className="mt-4 text-primary hover:underline"
            >
              Ver todos los tratamientos
            </button>
          </div>
        )}
      </section>
    </div>
  );
}