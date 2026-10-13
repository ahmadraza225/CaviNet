import { randomUUID } from "node:crypto";
import { getBrand } from "@/data/brands";
import { saveApplication } from "@/lib/applications";
import { EMAIL_RE } from "@/lib/utils";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  const slug = typeof body?.slug === "string" ? body.slug : "";
  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const email = typeof body?.email === "string" ? body.email.trim() : "";

  const brand = getBrand(slug);
  if (!brand) return Response.json({ error: "This campaign doesn't exist." }, { status: 404 });
  if (!name || name.length > 120)
    return Response.json({ error: "Enter your full name." }, { status: 400 });
  if (!EMAIL_RE.test(email) || email.length > 254)
    return Response.json({ error: "Enter a valid email address." }, { status: 400 });

  const result = await saveApplication({
    id: randomUUID(),
    slug,
    brand: brand.name,
    name,
    email,
    createdAt: new Date().toISOString(),
  });
  return Response.json({ ok: true, result });
}
