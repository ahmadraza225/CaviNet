import { brands } from "@/data/brands";

export const dynamic = "force-static";

export function GET() {
  return Response.json(brands, {
    headers: { "Cache-Control": "public, max-age=60, stale-while-revalidate=600" },
  });
}
