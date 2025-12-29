import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "../components/ui/card";
import { Button } from "../components/ui/button";
import type { Procedure } from "../lib/data";

interface ProcedureCardProps {
  procedure: Procedure;
}

export function ProcedureCard({ procedure }: ProcedureCardProps) {
  const Icon = procedure.icon;

  return (
    <Link to={`/procedure/${procedure.id}`}>
      <Card
        className="
          group cursor-pointer overflow-hidden h-full flex flex-col
          bg-foreground text-gray-900
          border border-gray-200
          shadow-md hover:shadow-xl
          transition-all
        "
      >
        <div className="relative h-72 w-full overflow-hidden bg-gray-100">
          <img
            src={procedure.image}
            alt={procedure.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

          <div className="absolute bottom-3 left-3 text-white">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-white/15 backdrop-blur-md rounded-full ring-1 ring-white/20">
                <Icon className="h-4 w-4 text-white" />
              </div>
              <span className="font-medium text-sm">{procedure.duration}</span>
            </div>
          </div>
        </div>

        <CardHeader className="pb-2">
          <h3 className="text-xl font-bold tracking-tight text-gray-900 group-hover:text-blue-700 transition-colors">
            {procedure.title}
          </h3>
        </CardHeader>

        <CardContent className="pb-4 flex-grow">
          <p className="text-gray-600 text-sm line-clamp-3">
            {procedure.shortDescription}
          </p>
        </CardContent>

        <CardFooter className="pt-0 mt-auto">
          <Button
            variant="ghost"
            className="
              w-full justify-between
              text-blue-700 hover:text-blue-800
              hover:bg-blue-50
              pl-0 hover:pl-2
              transition-all
            "
          >
            Ver Detalles
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
