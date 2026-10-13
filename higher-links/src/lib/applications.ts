import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

export type ApplicationRecord = {
  id: string;
  slug: string;
  brand: string;
  name: string;
  email: string;
  createdAt: string;
};

/**
 * Appends an application to a JSON file (APPLICATIONS_FILE, or .data/applications.json).
 * On read-only hosts such as Vercel the write fails, so the record is logged instead.
 */
export async function saveApplication(record: ApplicationRecord) {
  const file =
    process.env.APPLICATIONS_FILE ??
    path.join(/* turbopackIgnore: true */ process.cwd(), ".data", "applications.json");
  try {
    await mkdir(/* turbopackIgnore: true */ path.dirname(file), { recursive: true });
    const existing: ApplicationRecord[] = await readFile(/* turbopackIgnore: true */ file, "utf8")
      .then((text) => JSON.parse(text) as ApplicationRecord[])
      .catch(() => []);
    existing.push(record);
    await writeFile(/* turbopackIgnore: true */ file, JSON.stringify(existing, null, 2));
    return "stored" as const;
  } catch {
    console.log("[apply] new application", JSON.stringify(record));
    return "logged" as const;
  }
}
