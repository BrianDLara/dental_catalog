import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

declare global {
  interface Window {
    dataLayer: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
  }
}

// Helper to normalize trailing slash
function normalizePath(
  pathname: string,
  search: string,
  hash: string
): string {
  const withSlash = pathname.endsWith("/") ? pathname : `${pathname}/`;
  return `${withSlash}${search}${hash}`;
}

const GTMPageView: React.FC = () => {
  const location = useLocation();
  const lastPathRef = useRef<string | null>(null); // guard (helps with React 18 Strict Mode in dev)

  useEffect(() => {
    // Ensure dataLayer exists (GTM snippet must be in index.html)
    if (!window.dataLayer) window.dataLayer = [];

    const page_path = normalizePath(
      location.pathname,
      location.search,
      location.hash
    );

    // Prevent duplicate pushes if React re-renders the effect with same path
    if (lastPathRef.current === page_path) return;
    lastPathRef.current = page_path;

    window.dataLayer.push({
      event: "page_view",
      page_path,
      page_title: document.title || undefined,
    });
  }, [location]);

  return null;
};

export default GTMPageView;
