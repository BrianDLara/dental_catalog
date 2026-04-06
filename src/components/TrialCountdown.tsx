import { useEffect, useMemo, useState } from "react";
import { Clock } from "lucide-react";

function formatRemaining(ms: number): string {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return [
    String(hours).padStart(2, "0"),
    String(minutes).padStart(2, "0"),
    String(seconds).padStart(2, "0"),
  ].join(":");
}

function getRemainingMs(trialEndsAt: string): number {
  const end = Date.parse(trialEndsAt);
  if (Number.isNaN(end)) return 0;
  return Math.max(0, end - Date.now());
}

export default function TrialCountdown({
  trialEndsAt,
}: {
  trialEndsAt: string;
}) {
  const [remaining, setRemaining] = useState(() =>
    getRemainingMs(trialEndsAt)
  );

  useEffect(() => {
    setRemaining(getRemainingMs(trialEndsAt));

    const interval = window.setInterval(() => {
      setRemaining(getRemainingMs(trialEndsAt));
    }, 1000);

    return () => window.clearInterval(interval);
  }, [trialEndsAt]);

  const active = useMemo(() => remaining > 0, [remaining]);

  if (!active) return null;

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
        Al terminar tu prueba, podrás acceder a todos los procedimientos sin límites con un solo pago, sin mensualidades.
      </p>
    </div>
  );
}