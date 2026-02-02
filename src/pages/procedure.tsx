// src/pages/ProcedurePage.tsx
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Clock,
  Activity,
  Check,
  Info,
  ShieldAlert,
  Stethoscope,
  Sparkles,
  HelpCircle,
  Shield,
  ChevronDown,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { StepSequence } from "../components/step-sequence";
import { BeforeAfter } from "../components/before-after";
import { motion } from "framer-motion";

import { procedures } from "../lib/data";
import type { Procedure as ProcedureType } from "../lib/data";

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-foreground text-2xl font-bold mb-6 flex items-center gap-2">
      <span className="w-1 h-8 bg-primary rounded-full" />
      {children}
    </h2>
  );
}

function DropdownSection({
  title,
  defaultOpen = false,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  return (
    <details
      open={defaultOpen}
      className="group rounded-2xl border bg-card shadow-sm overflow-hidden"
    >
      <summary className="list-none cursor-pointer select-none px-5 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-1 h-6 bg-primary rounded-full" />
          <h3 className="text-foreground text-lg font-bold">{title}</h3>
        </div>
        <ChevronDown className="h-5 w-5 text-muted-foreground transition-transform group-open:rotate-180" />
      </summary>

      <div className="px-5 pb-5 pt-4 border-t bg-background/40">{children}</div>
    </details>
  );
}

function BulletCard({
  icon,
  title,
  items,
  tone = "default",
}: {
  icon?: React.ReactNode;
  title: string;
  items: string[];
  tone?: "default" | "warn" | "success";
}) {
  const badge =
    tone === "warn"
      ? "bg-card border-red-400"
      : tone === "success"
      ? "bg-card border-emerald-200"
      : "bg-card border";

  const dot =
    tone === "warn"
      ? "text-amber-700"
      : tone === "success"
      ? "bg-card text-emerald-700"
      : "bg-secondary text-foreground";

  return (
    <div className={`rounded-2xl border p-5 shadow-sm ${badge}`}>
      <div className="flex items-center gap-2 mb-4">
        <div className="text-primary">{icon}</div>
        <h3 className="text-lg font-bold text-foreground">{title}</h3>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        {items.map((t, i) => (
          <div key={i} className="flex items-start gap-3 p-3 rounded-xl border bg-background/60">
            <div className={`mt-1 p-1 rounded-full ${dot}`}>
              <Check className="h-3 w-3" />
            </div>
            <span className="font-medium text-foreground">{t}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ProcedurePage() {
  const { id } = useParams<{ id: string }>();
  const procedure: ProcedureType | undefined = procedures.find((p) => p.id === id);

  if (!procedure) {
    return (
      <div className="min-h-screen bg-background p-6">
        <Link to="/">
          <Button variant="secondary" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Volver
          </Button>
        </Link>

        <div className="mt-8 rounded-xl border bg-card p-6">
          <h1 className="text-2xl font-bold">Procedimiento no encontrado</h1>
          <p className="text-muted-foreground mt-2">
            No existe un procedimiento con este id:
            <span className="ml-2 font-mono">{String(id)}</span>
          </p>
        </div>
      </div>
    );
  }

  const enabled = procedure.sectionsEnabled ?? {};
  const show = (key: keyof NonNullable<ProcedureType["sectionsEnabled"]>, fallback = true) =>
    enabled[key] ?? fallback;

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header Image */}
      <div className="relative h-[40vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background z-10" />
        <img
          src={procedure.image}
          alt={procedure.title}
          className="w-full h-full object-cover object-[50%_45%]"
        />

        {/* Navigation */}
        <div className="absolute top-4 left-4 z-20">
          <Link to="/">
            <Button
              variant="secondary"
              size="sm"
              className="gap-2 shadow-lg backdrop-blur-md bg-background/80 hover:bg-background"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver
            </Button>
          </Link>
        </div>

        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 w-full p-6 z-20">
          <div className="container mx-auto max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider">
                  Tratamiento
                </span>
                <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-background/80 backdrop-blur text-foreground text-xs font-medium border">
                  <Clock className="h-3 w-3" />
                  {procedure.duration}
                </span>
                {procedure.longevity && show("longevity") && (
                  <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-background/80 backdrop-blur text-foreground text-xs font-medium border">
                    <Shield className="h-3 w-3" />
                    {procedure.longevity}
                  </span>
                )}
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2 drop-shadow-sm">
                {procedure.title}
              </h1>

              <p className="text-muted-foreground text-base md:text-lg max-w-2xl">
                {procedure.shortDescription}
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-3xl px-4 mt-8">
        {/* Intro + Quick Facts */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <p className="text-xl text-muted-foreground leading-relaxed">{procedure.fullDescription}</p>

          <div className="grid sm:grid-cols-2 gap-4 mt-8">
            <div className="bg-secondary/90 p-4 rounded-xl border border-secondary">
              <div className="flex items-center gap-2 mb-2 text-primary font-bold">
                <Activity className="h-5 w-5" />
                Dolor / Molestia
              </div>
              <p className="text-muted-foreground">
                Nivel: <span className="font-semibold text-foreground">{procedure.painLevel}</span>
              </p>
            </div>

            <div className="bg-secondary/90 p-4 rounded-xl border border-secondary">
              <div className="flex items-center gap-2 mb-2 text-primary font-bold">
                <Clock className="h-5 w-5" />
                Tiempo
              </div>
              <p className="text-muted-foreground">
                Duración: <span className="font-semibold text-foreground">{procedure.duration}</span>
              </p>
            </div>

            {procedure.anesthesia && show("anesthesia") && (
              <div className="bg-secondary/90 p-4 rounded-xl border border-secondary sm:col-span-1">
                <div className="flex items-center gap-2 mb-2 text-primary font-bold">
                  <Stethoscope className="h-5 w-5" />
                  Anestesia
                </div>
                <p className="text-muted-foreground">
                  <span className="font-semibold text-foreground">{procedure.anesthesia}</span>
                </p>
              </div>
            )}

            {procedure.recoveryTime && show("recoveryTime") && (
              <div className="bg-secondary/90 p-4 rounded-xl border border-secondary sm:col-span-1">
                <div className="flex items-center gap-2 mb-2 text-primary font-bold">
                  <Info className="h-5 w-5" />
                  Recuperación
                </div>
                <p className="text-muted-foreground">
                  <span className="font-semibold text-foreground">{procedure.recoveryTime}</span>
                </p>
              </div>
            )}
          </div>
        </motion.section>

        {/* Before / After (NOT dropdown) */}
        {procedure.beforeImage && procedure.afterImage && show("beforeAfter") && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <SectionTitle>Antes y Después</SectionTitle>
            <div className="bg-secondary p-6 rounded-2xl border shadow-sm">
              <BeforeAfter beforeImage={procedure.beforeImage} afterImage={procedure.afterImage} />
            </div>
          </motion.section>
        )}

        {/* Dropdown stack */}
        <div className="space-y-4">
          {/* Benefits */}
          {show("benefits") && (
            <motion.section
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <DropdownSection title="Beneficios" defaultOpen>
                <div className="grid sm:grid-cols-2 gap-4">
                  {procedure.benefits.map((benefit, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 p-4 bg-card rounded-lg border shadow-sm"
                    >
                      <div className="mt-1 p-1 bg-green-100 text-green-600 rounded-full">
                        <Check className="h-3 w-3" />
                      </div>
                      <span className="font-medium text-foreground">{benefit}</span>
                    </div>
                  ))}
                </div>
              </DropdownSection>
            </motion.section>
          )}
           {/* Steps */}
          {show("steps") && (
            <motion.section
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <DropdownSection title="Paso a Paso">
                <StepSequence steps={procedure.steps} />
              </DropdownSection>
            </motion.section>
          )}
          
          {/* Qué puedes esperar */}
          {((procedure.results?.length && show("results")) ||
            (procedure.recommendedFor?.length && show("recommendedFor")) ||
            (procedure.notRecommendedFor?.length && show("notRecommendedFor"))) && (
            <motion.section
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <DropdownSection title="Qué puedes esperar">
                <div className="space-y-4">
                  {procedure.results?.length && show("results") && (
                    <div className="!text-black">
                      <BulletCard
                        icon={<Sparkles className="h-5 w-5 text-primary" />}
                        title="Resultados esperados"
                        items={procedure.results}
                        tone="success"
                      />
                    </div>
                  )}

                  <div className="grid sm:grid-cols-2 gap-4">
                    {procedure.recommendedFor?.length && show("recommendedFor") && (
                      <BulletCard
                        icon={<Check className="h-5 w-5" />}
                        title="Recomendado para"
                        items={procedure.recommendedFor}
                        tone="success"
                      />
                    )}

                    {procedure.notRecommendedFor?.length && show("notRecommendedFor") && (
                      <BulletCard
                        icon={<ShieldAlert className="h-5 w-5" />}
                        title="Puede no ser ideal si…"
                        items={procedure.notRecommendedFor}
                        tone="warn"
                      />
                    )}
                  </div>
                </div>
              </DropdownSection>
            </motion.section>
          )}

          {/* Consideraciones */}
          {procedure.considerations?.length && show("considerations") && (
            <motion.section
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <DropdownSection title="Consideraciones">
                <ul className="space-y-3">
                  {procedure.considerations.map((c, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="p-1 rounded-full bg-amber-100 text-amber-700">
                        <Info className="h-4 w-4" />
                      </div>
                      <span className="text-foreground font-medium">{c}</span>
                    </li>
                  ))}
                </ul>
              </DropdownSection>
            </motion.section>
          )}

          {/* Alternativas */}
          {procedure.alternatives?.length && show("alternatives") && (
            <motion.section
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <DropdownSection title="Alternativas">
                <div className="grid sm:grid-cols-2 gap-4">
                  {procedure.alternatives.map((a, i) => (
                    <div key={i} className="rounded-2xl border bg-card p-5 shadow-sm">
                      <h3 className="text-lg font-bold text-foreground">{a.title}</h3>
                      <p className="text-muted-foreground mt-2">{a.description}</p>
                    </div>
                  ))}
                </div>
              </DropdownSection>
            </motion.section>
          )}

          {/* After care */}
          {procedure.afterCare?.length && show("afterCare") && (
            <motion.section
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <DropdownSection title="Cuidados después del tratamiento">
                <div className="grid sm:grid-cols-2 gap-3">
                  {procedure.afterCare.map((t, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-xl border bg-background/60">
                      <div className="mt-1 p-1 rounded-full bg-secondary text-foreground">
                        <Check className="h-3 w-3" />
                      </div>
                      <span className="font-medium text-foreground">{t}</span>
                    </div>
                  ))}
                </div>
              </DropdownSection>
            </motion.section>
          )}

          {/* Technology */}
          {procedure.technology?.length && show("technology") && (
            <motion.section
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <DropdownSection title="Tecnología y materiales">
                <ul className="space-y-3">
                  {procedure.technology.map((t, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="mt-1 p-1 rounded-full bg-primary/10 text-primary">
                        <Stethoscope className="h-4 w-4" />
                      </div>
                      <span className="text-foreground font-medium">{t}</span>
                    </li>
                  ))}
                </ul>
              </DropdownSection>
            </motion.section>
          )}

          {/* Urgency */}
          {procedure.urgency && show("urgency") && (
            <motion.section
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <DropdownSection title={procedure.urgency.title}>
                <div className="rounded-2xl border bg-amber-50 border-amber-200 p-5">
                  <p className="text-background font-medium">{procedure.urgency.description}</p>
                </div>
              </DropdownSection>
            </motion.section>
          )}

          {/* FAQ */}
          {procedure.faq?.length && show("faq") && (
            <motion.section
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <DropdownSection title="Preguntas frecuentes">
                <div className="space-y-3">
                  {procedure.faq.map((f, i) => (
                    <div key={i} className="rounded-2xl border bg-card p-5 shadow-sm">
                      <div className="flex items-start gap-3">
                        <div className="mt-1 p-1 rounded-full bg-secondary text-foreground">
                          <HelpCircle className="h-4 w-4" />
                        </div>
                        <div>
                          <h3 className="font-bold text-foreground">{f.question}</h3>
                          <p className="text-muted-foreground mt-1">{f.answer}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </DropdownSection>
            </motion.section>
          )}
        </div>
      </div>
    </div>
  );
}
