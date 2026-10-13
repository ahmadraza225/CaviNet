import { brands } from "@/data/brands";
import type { ApplicationInput, Brand } from "@/lib/types";
import { EMAIL_RE } from "@/lib/utils";

// Serverless stand-in for src/lib/api.ts. A short delay keeps the real
// loading state (LOADING..., spinner) visible, as on the live site.

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function fetchBrands(): Promise<Brand[]> {
  await wait(650);
  return structuredClone(brands);
}

export async function submitApplication(input: ApplicationInput): Promise<{ ok: true }> {
  await wait(600);
  if (!input.name.trim()) throw new Error("Enter your full name.");
  if (!EMAIL_RE.test(input.email)) throw new Error("Enter a valid email address.");
  try {
    const key = "higher-links:applications";
    const list = JSON.parse(localStorage.getItem(key) ?? "[]");
    list.push({ ...input, createdAt: new Date().toISOString() });
    localStorage.setItem(key, JSON.stringify(list));
  } catch {
    // Storage can be unavailable (private mode, sandbox); the form still succeeds.
  }
  return { ok: true };
}
