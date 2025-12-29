import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import type { Step } from "../lib/data";

interface StepSequenceProps {
  steps: Step[];
}

export function StepSequence({ steps }: StepSequenceProps) {
  return (
    <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
      {steps.map((step, index) => (
        <motion.div 
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
        >
          {/* Icon/Circle */}
          <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-primary text-primary-foreground shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
            <span className="font-bold text-sm">{index + 1}</span>
          </div>
          
          {/* Card */}
          <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-card p-6 rounded-xl border shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-bold text-lg text-primary">{step.title}</h3>
              {index === steps.length - 1 && <CheckCircle2 className="h-5 w-5 text-green-500" />}
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {step.description}
            </p>
            {step.image && (
              <div className="mt-4 rounded-lg overflow-hidden h-32 w-full bg-muted">
                 {/* Placeholder for step image if we had them */}
              </div>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
