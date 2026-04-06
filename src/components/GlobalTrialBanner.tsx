import { useEffect, useState } from "react";
import { useAuth } from "react-oidc-context";
import { Clock } from "lucide-react";
import {
  formatRemaining,
  getTrialRemainingMs,
  isTrialActive,
} from "../auth/trial";

export default function GlobalTrialBanner() {
  const auth = useAuth();
  const [remaining, setRemaining] = useState(() =>
    getTrialRemainingMs()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining(getTrialRemainingMs());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Only show if logged in, NOT paid, and trial active
  const profile = auth.user?.profile as Record<string, any> | undefined;
  const paid =
    profile?.["custom:paid"] === "true" ||
    profile?.["custom:paid"] === true ||
    profile?.paid === "true" ||
    profile?.paid === true;

  if (!auth.isAuthenticated || paid || !isTrialActive()) return null;

  return (
    <div className="w-full bg-amber-500 text-black text-sm">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-center gap-2">
        <Clock className="h-4 w-4" />
        <span className="font-medium">
          Tu prueba gratis termina en{" "}
          <span className="font-bold">
            {formatRemaining(remaining)}
          </span>
        </span>
      </div>
    </div>
  );
}