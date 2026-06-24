import { useEffect, useState } from "react";
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

function getRemainingMs(trialEndsAt: string, now: number): number {
  const end = Date.parse(trialEndsAt);
  if (Number.isNaN(end)) return 0;
  return Math.max(0, end - now);
}

export default function TrialCountdown({
  trialEndsAt,
}: {
  trialEndsAt: string;
}) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const interval = window.setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => window.clearInterval(interval);
  }, []);

  const remaining = getRemainingMs(trialEndsAt, now);
  const active = remaining > 0;

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
        Al terminar tu prueba, podrás acceder a todos los procedimientos sin
        límites con un solo pago, sin mensualidades.
      </p>
    </div>
  );
}