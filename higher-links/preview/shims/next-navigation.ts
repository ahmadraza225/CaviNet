import { useMemo, useSyncExternalStore } from "react";

// Minimal stand-in for next/navigation: query params live in memory and are
// mirrored to the address bar when the host allows it.

function initialSearch() {
  try {
    return window.location.search;
  } catch {
    return "";
  }
}

let search = new URLSearchParams(initialSearch()).toString();
const listeners = new Set<() => void>();

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

const getSnapshot = () => search;

function navigate(url: string) {
  const q = url.includes("?") ? url.slice(url.indexOf("?") + 1) : "";
  search = new URLSearchParams(q).toString();
  try {
    window.history.replaceState(
      window.history.state,
      "",
      search ? `?${search}` : window.location.pathname,
    );
  } catch {
    // Sandboxed frames may refuse history writes; in-memory state still works.
  }
  listeners.forEach((l) => l());
}

/** Preview-only: drop one query param (used to close the brand modal when leaving the directory). */
export function clearParam(key: string) {
  const next = new URLSearchParams(search);
  next.delete(key);
  const qs = next.toString();
  navigate(qs ? `/?${qs}` : "/");
}

export function useSearchParams() {
  const s = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
  return useMemo(() => new URLSearchParams(s), [s]);
}

export function usePathname() {
  return "/";
}

export function useRouter() {
  return useMemo(
    () => ({
      replace: (url: string) => navigate(url),
      push: (url: string) => navigate(url),
      back: () => window.history.back(),
      refresh: () => {},
      prefetch: () => {},
    }),
    [],
  );
}

export function notFound(): never {
  throw new Error("Not found");
}
