"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { BrandGrid, Spinner } from "@/components/BrandGrid";
import dynamic from "next/dynamic";
import { FilterBar } from "@/components/FilterBar";
import { SearchBar } from "@/components/SearchBar";
import { fetchBrands } from "@/lib/api";

// The modal (and Radix Dialog) loads after first paint; it is only needed once a brand is opened.
const BrandModal = dynamic(() => import("@/components/BrandModal").then((m) => m.BrandModal), {
  ssr: false,
});
import { filterBrands, isCategory, isSort } from "@/lib/filters";
import type { Brand, CategoryKey, SortKey } from "@/lib/types";

function useDebounced<T>(value: T, ms: number) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), ms);
    return () => clearTimeout(t);
  }, [value, ms]);
  return debounced;
}

function CountLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      aria-live="polite"
      className="mt-[21px] text-[10.5px] font-medium uppercase leading-4 tracking-[0.08em] text-ink-label"
    >
      {children}
    </p>
  );
}

/** Server-rendered placeholder that matches the loading state exactly. */
export function DirectoryFallback() {
  return (
    <section aria-label="Brands" className="pt-10">
      <SearchBar value="" onChange={() => {}} />
      <div className="mt-3">
        <FilterBar category={null} sort="featured" onCategory={() => {}} onSort={() => {}} />
      </div>
      <CountLabel>Loading...</CountLabel>
      {/* Reserve a screen of height so the footer doesn't jump when the grid arrives. */}
      <div className="mt-[19.5px] min-h-screen">
        <Spinner />
      </div>
      <div className="h-16" />
    </section>
  );
}

export function Directory() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [brands, setBrands] = useState<Brand[] | null>(null);
  const [error, setError] = useState(false);
  const [query, setQuery] = useState(() => searchParams.get("q") ?? "");
  const debouncedQuery = useDebounced(query, 150);

  const categoryParam = searchParams.get("category");
  const sortParam = searchParams.get("sort");
  const category: CategoryKey | null = isCategory(categoryParam) ? categoryParam : null;
  const sort: SortKey = isSort(sortParam) ? sortParam : "featured";
  const brandSlug = searchParams.get("brand");

  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    let active = true;
    fetchBrands()
      .then((data) => active && setBrands(data))
      .catch(() => active && setError(true));
    return () => {
      active = false;
    };
  }, [attempt]);
  const retry = () => {
    setError(false);
    setAttempt((n) => n + 1);
  };

  const setParams = useCallback(
    (patch: Record<string, string | null>) => {
      const next = new URLSearchParams(searchParams.toString());
      for (const [key, value] of Object.entries(patch)) {
        if (value) next.set(key, value);
        else next.delete(key);
      }
      const qs = next.toString();
      if (qs === searchParams.toString()) return;
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [router, pathname, searchParams],
  );

  // Mirror the debounced search into ?q= so filtered views are shareable.
  useEffect(() => {
    const current = searchParams.get("q") ?? "";
    if (debouncedQuery.trim() !== current) setParams({ q: debouncedQuery.trim() || null });
    // Only the debounced input should push to the URL; reacting to searchParams here would
    // overwrite an incoming ?q= (e.g. browser back) with stale input.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuery]);

  const visible = useMemo(
    () => (brands ? filterBrands(brands, { q: debouncedQuery, category, sort }) : []),
    [brands, debouncedQuery, category, sort],
  );
  const selected = (brandSlug && brands?.find((b) => b.slug === brandSlug)) || null;

  const label = !brands
    ? error
      ? "Couldn't load brands"
      : "Loading..."
    : `${visible.length} ${visible.length === 1 ? "brand" : "brands"}`;

  return (
    <section aria-label="Brands" className="pt-10">
      <SearchBar value={query} onChange={setQuery} />
      <div className="mt-3">
        <FilterBar
          category={category}
          sort={sort}
          onCategory={(value) => setParams({ category: value })}
          onSort={(value) => setParams({ sort: value === "featured" ? null : value })}
        />
      </div>
      <CountLabel>{label}</CountLabel>

      <div className={brands ? "mt-[19.5px]" : "mt-[19.5px] min-h-screen"}>
        {!brands && !error && <Spinner />}
        {error && (
          <div className="py-16 text-center text-[15px] text-ink-muted">
            Check your connection and{" "}
            <button
              type="button"
              onClick={retry}
              className="focus-ring font-semibold text-brand underline-offset-4 hover:underline"
            >
              try again
            </button>
            .
          </div>
        )}
        {brands && visible.length > 0 && (
          <BrandGrid brands={visible} onOpen={(b) => setParams({ brand: b.slug })} />
        )}
        {brands && visible.length === 0 && (
          <div className="flex flex-col items-center gap-2 py-20 text-center">
            <p className="text-[15px] text-ink-muted">
              {debouncedQuery.trim()
                ? `No brands match "${debouncedQuery.trim()}"`
                : "No brands in this category yet"}
            </p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setParams({ q: null, category: null });
              }}
              className="focus-ring text-sm font-semibold text-brand underline-offset-4 hover:underline"
            >
              {debouncedQuery.trim() ? "Clear search" : "Show all brands"}
            </button>
          </div>
        )}
      </div>

      <div className="h-16" />
      {brands && <BrandModal brand={selected} onClose={() => setParams({ brand: null })} />}
    </section>
  );
}
