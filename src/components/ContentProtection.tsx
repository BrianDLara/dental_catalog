import { useEffect } from "react";

export default function ContentProtection() {
  useEffect(() => {
    const preventContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    const preventDragStart = (e: DragEvent) => {
  const target = e.target as HTMLElement | null;
  if (!target) return;

  // ✅ allow slider to work
  if (target.closest(".no-protection")) return;

  const isImage =
    target.tagName === "IMG" ||
    !!target.closest("img");

  if (isImage) {
    e.preventDefault();
  }
};

    const preventCopyActions = (e: ClipboardEvent) => {
  const target = e.target as HTMLElement | null;

  // ✅ allow interaction in slider
  if (target?.closest(".no-protection")) return;

  const selection = window.getSelection()?.toString().trim() ?? "";
  if (!selection) return;

  e.preventDefault();
};

    const preventKeyShortcuts = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();

      const blocked =
        (e.ctrlKey || e.metaKey) &&
        (key === "c" || key === "x" || key === "s" || key === "a" || key === "p");

      if (blocked) {
        e.preventDefault();
      }
    };

    document.addEventListener("contextmenu", preventContextMenu);
    document.addEventListener("dragstart", preventDragStart);
    document.addEventListener("copy", preventCopyActions);
    document.addEventListener("cut", preventCopyActions);
    document.addEventListener("keydown", preventKeyShortcuts);

    return () => {
      document.removeEventListener("contextmenu", preventContextMenu);
      document.removeEventListener("dragstart", preventDragStart);
      document.removeEventListener("copy", preventCopyActions);
      document.removeEventListener("cut", preventCopyActions);
      document.removeEventListener("keydown", preventKeyShortcuts);
    };
  }, []);

  return null;
}