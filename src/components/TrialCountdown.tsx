import { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { formatRemaining, getTrialRemainingMs, isTrialActive } from "../auth/trial";

export default function TrialCountdown() {
  const [remaining, setRemaining] = useState(() => getTrialRemainingMs());

  useEffect(() => {
    const interval = window.setInterval(() => {
      setRemaining(getTrialRemainingMs());
    }, 1000);

    return () => window.clearInterval(interval);
  }, []);

  if (!isTrialActive()) return null;

  return (
    <div className="mb-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-amber-900">
      <div className="flex items-center gap-2">
        <Clock className="h-4 w-4" />
        <p className="text-sm font-medium">
          Tu prueba gratis termina en{" "}
          <span className="font-bold">{formatRemaining(remaining)}</span>
        </p>
      </div>

      <p className="mt-1 text-xs text-amber-800/80">
        Cuando termine, podrás desbloquear el catálogo completo con el pago único.
      </p>
    </div>
  );
}