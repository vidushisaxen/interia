// Built using Hyperiux Vault: https://vault.hyperiux.com

"use client";

import { useCallback, useSyncExternalStore } from "react";

export const DESKTOP = "(min-width: 1026px)";
export const TABLET_DOWN = "(max-width: 1025px)";

export function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches === true
  );
}

export function hasFinePointer() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia?.("(hover: hover) and (pointer: fine)")?.matches === true
  );
}

export function useMediaQuery(query: string) {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mediaQuery = window.matchMedia?.(query);
      if (!mediaQuery) return () => {};
      mediaQuery.addEventListener("change", onChange);
      return () => mediaQuery.removeEventListener("change", onChange);
    },
    [query],
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia?.(query)?.matches === true,
    () => false,
  );
}
