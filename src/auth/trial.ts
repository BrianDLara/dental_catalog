const TRIAL_START_KEY = "dental_catalog_trial_start";
const TRIAL_DURATION_MS = 24 * 60 * 60 * 1000; // 24 horas

export function getTrialStart(): number | null {
  const raw = localStorage.getItem(TRIAL_START_KEY);
  if (!raw) return null;

  const parsed = Number(raw);
  if (Number.isNaN(parsed)) return null;

  return parsed;
}

export function startTrialIfMissing(): number {
  const existing = getTrialStart();
  if (existing) return existing;

  const now = Date.now();
  localStorage.setItem(TRIAL_START_KEY, String(now));
  return now;
}

export function getTrialEnd(): number | null {
  const start = getTrialStart();
  if (!start) return null;
  return start + TRIAL_DURATION_MS;
}

export function getTrialRemainingMs(): number {
  const end = getTrialEnd();
  if (!end) return 0;
  return Math.max(0, end - Date.now());
}

export function isTrialActive(): boolean {
  return getTrialRemainingMs() > 0;
}

export function formatRemaining(ms: number): string {
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