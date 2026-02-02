import { useState } from "react";
import { Search, Sparkles } from "lucide-react";
import { Input } from "../components/ui/input";
import { procedures, heroImage } from "../lib/data";
import { ProcedureCard } from "../components/procedure-card";
import { motion } from "framer-motion";

export default function Home() {
  const [search, setSearch] = useState("");

  const filteredProcedures = procedures.filter(p => 
    p.title.toLowerCase().includes(search.toLowerCase()) || 
    p.shortDescription.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="Dental Office" 
            className="w-full h-full object-cover"
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6">
              <Sparkles className="h-4 w-4 text-yellow-300" />
              <span className="text-sm font-medium tracking-wide">Guía Visual Interactiva</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              Entiende tu <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200">
                Salud Dental
              </span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-8">
             Explicaciones visuales, claras y profesionales para comprender tus tratamientos sin complicaciones
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search & Grid */}
      <section className="container mx-auto px-4 -mt-8 relative z-20 pb-20">
        <div className="bg-white bg-card p-4 rounded-xl shadow-lg border mb-12 flex items-center gap-4 max-w-2xl mx-auto">
          <Search className="h-5 w-5 text-muted-foreground ml-2" />
          <Input 
            placeholder="Buscar tratamiento (ej. Resina, Implante...)" 
            className="border-none shadow-none text-lg focus-visible:ring-0 bg-transparent text-background"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
          <div className="text-center py-20 text-muted-foreground">
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
