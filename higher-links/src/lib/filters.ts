import type { Brand, CategoryKey, SortKey } from "./types";

export const CATEGORIES: { key: CategoryKey | "all"; label: string }[] = [
  { key: "all", label: "All categories" },
  { key: "skincare", label: "Skincare" },
  { key: "makeup", label: "Makeup" },
  { key: "supplements", label: "Supplements & Health" },
  { key: "hair-body", label: "Hair & Body" },
  { key: "fashion", label: "Fashion" },
  { key: "food-drink", label: "Food & Drink" },
  { key: "home", label: "Home & Pets" },
];

export const SORTS: { key: SortKey; label: string }[] = [
  { key: "featured", label: "Featured" },
  { key: "commission", label: "Highest commission" },
  { key: "links", label: "Most links" },
  { key: "rating", label: "Top rated" },
  { key: "az", label: "A–Z" },
];

export function isCategory(value: string | null): value is CategoryKey {
  return !!value && CATEGORIES.some((c) => c.key === value && c.key !== "all");
}

export function isSort(value: string | null): value is SortKey {
  return !!value && SORTS.some((s) => s.key === value);
}

export function categoryLabel(key: CategoryKey) {
  return CATEGORIES.find((c) => c.key === key)?.label ?? key;
}

export function filterBrands(
  brands: Brand[],
  { q, category, sort }: { q: string; category: CategoryKey | null; sort: SortKey },
) {
  const needle = q.trim().toLowerCase();
  let out = brands.filter((b) => {
    if (category && b.category !== category) return false;
    if (!needle) return true;
    return (
      b.name.toLowerCase().includes(needle) ||
      categoryLabel(b.category).toLowerCase().includes(needle) ||
      b.products.some((p) => p.name.toLowerCase().includes(needle))
    );
  });

  // Array.prototype.sort is stable, so ties keep the featured order.
  switch (sort) {
    case "commission":
      out = [...out].sort((a, b) => (b.commission ?? -1) - (a.commission ?? -1));
      break;
    case "links":
      out = [...out].sort((a, b) => b.links - a.links);
      break;
    case "rating":
      out = [...out].sort((a, b) => b.rating - a.rating);
      break;
    case "az":
      out = [...out].sort((a, b) => a.name.localeCompare(b.name, "en", { sensitivity: "base" }));
      break;
  }
  return out;
}
