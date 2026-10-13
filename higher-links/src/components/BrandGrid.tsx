import { BrandCard } from "@/components/BrandCard";
import type { Brand } from "@/lib/types";

// Cards fade in with a short stagger. This is a CSS animation rather than 53
// framer-motion nodes, which keeps hydration cheap on phones.
export function BrandGrid({ brands, onOpen }: { brands: Brand[]; onOpen: (brand: Brand) => void }) {
  return (
    <ul role="list" className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
      {brands.map((brand, i) => (
        <li
          key={brand.slug}
          className="animate-card-in"
          style={{ animationDelay: `${Math.min(i * 12, 360)}ms` }}
        >
          <BrandCard brand={brand} onOpen={onOpen} priority={i < 8} />
        </li>
      ))}
    </ul>
  );
}

export function Spinner() {
  return (
    <div role="status" className="flex justify-center pt-[104px]">
      <span className="size-5 animate-spin rounded-full border-2 border-[#E2E3E8] border-t-[#9CA0A8]" />
      <span className="sr-only">Loading brands</span>
    </div>
  );
}
