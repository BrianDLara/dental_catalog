import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Clock, Activity, Check } from "lucide-react";
import { Button } from "../components/ui/button";
import { StepSequence } from "../components/step-sequence";
import { BeforeAfter } from "../components/before-after";
import { motion } from "framer-motion";

import { procedures } from "../lib/data";
import type { Procedure as ProcedureType } from "../lib/data";

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

  return (
    <div className="min-h-screen bg-background pb-20 text-black">
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
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider">
                  Tratamiento
                </span>
                <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-background/80 backdrop-blur text-foreground text-xs font-medium border">
                  <Clock className="h-3 w-3" />
                  {procedure.duration}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2 drop-shadow-sm">
                {procedure.title}
              </h1>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-3xl px-4 mt-8">
        {/* Intro */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <p className="text-xl text-muted-foreground leading-relaxed">
            {procedure.fullDescription}
          </p>

          <div className="grid grid-cols-2 gap-4 mt-8">
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
          </div>
        </motion.section>

        {/* Before / After */}
        {procedure.beforeImage && procedure.afterImage && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-foreground text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="w-1 h-8 bg-primary rounded-full" />
              Antes y Después
            </h2>
            <div className="bg-secondary p-6 rounded-2xl border shadow-sm">
              <BeforeAfter beforeImage={procedure.beforeImage} afterImage={procedure.afterImage} />
            </div>
          </motion.section>
        )}

        {/* Benefits */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-foreground text-2xl font-bold mb-6 flex items-center gap-2">
            <span className="w-1 h-8 bg-primary rounded-full" />
            Beneficios
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {procedure.benefits.map((benefit, i) => (
              <div key={i} className="flex items-start gap-3 p-4 bg-card rounded-lg border shadow-sm">
                <div className="mt-1 p-1 bg-green-100 text-green-600 rounded-full">
                  <Check className="h-3 w-3" />
                </div>
                <span className="font-medium text-foreground">{benefit}</span>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Steps */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-foreground text-2xl font-bold mb-8 flex items-center gap-2">
            <span className="w-1 h-8 bg-primary rounded-full" />
            Paso a Paso
          </h2>
          <StepSequence steps={procedure.steps} />
        </motion.section>
      </div>
    </div>
  );
}
