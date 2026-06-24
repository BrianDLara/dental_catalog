import { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { useEntitlement } from "../auth/useEntitlement";

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

export default function GlobalTrialBanner() {
  const { loading, isPaid, trialActive, trialEndsAt } = useEntitlement();
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const interval = window.setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => window.clearInterval(interval);
  }, []);

  const remaining = trialEndsAt ? getRemainingMs(trialEndsAt, now) : 0;

  if (loading || isPaid || !trialActive || !trialEndsAt) return null;

  return (
    <div className="w-full bg-amber-500 text-black text-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-4 py-2">
        <Clock className="h-4 w-4" />
        <span className="font-medium">
          Tu prueba gratis termina en{" "}
          <span className="font-bold">{formatRemaining(remaining)}</span>
        </span>
      </div>
    </div>
  );
}