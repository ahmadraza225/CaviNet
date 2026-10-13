import type { ApplicationInput, Brand } from "./types";

// Client-side data access. The standalone preview build swaps this module for
// preview/shims/api.ts, which serves the same seed data without a server.

export async function fetchBrands(): Promise<Brand[]> {
  const res = await fetch("/api/brands");
  if (!res.ok) throw new Error(`Failed to load brands (${res.status})`);
  return res.json();
}

export async function submitApplication(input: ApplicationInput): Promise<{ ok: true }> {
  const res = await fetch("/api/apply", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error ?? "Something went wrong. Try again in a moment.");
  return { ok: true };
}
