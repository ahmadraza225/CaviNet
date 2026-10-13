import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ApplyView } from "@/components/ApplyView";
import { brands, getBrand } from "@/data/brands";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return brands.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const brand = getBrand((await params).slug);
  if (!brand) return {};
  return {
    title: `${brand.campaignTitle ?? brand.name} · Apply`,
    description: `Apply to join the ${brand.name} creator campaign.`,
  };
}

export default async function ApplyPage({ params }: Params) {
  const brand = getBrand((await params).slug);
  if (!brand) notFound();
  return <ApplyView brand={brand} />;
}
