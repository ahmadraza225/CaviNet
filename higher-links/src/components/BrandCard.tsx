import { Star } from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";
import type { Brand } from "@/lib/types";
import { cn, pluralize } from "@/lib/utils";

export function CommissionBadge({ brand, className }: { brand: Brand; className?: string }) {
  if (brand.comingSoon) {
    return (
      <span
        className={cn(
          "rounded-full bg-soon-bg px-[8.75px] py-[2px] text-[10.5px] font-medium leading-[14.5px] text-soon-ink",
          className,
        )}
      >
        Coming soon
      </span>
    );
  }
  if (brand.commission == null) return null;
  return (
    <span
      className={cn(
        "rounded-full bg-brand-soft px-[8.75px] py-[2px] text-[10.5px] font-semibold leading-[14.5px] text-brand-ink",
        className,
      )}
    >
      Up to {brand.commission}%
    </span>
  );
}

export function BrandCard({
  brand,
  onOpen,
  priority,
}: {
  brand: Brand;
  onOpen: (brand: Brand) => void;
  priority?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={() => onOpen(brand)}
      aria-haspopup="dialog"
      className={cn(
        "focus-ring relative flex h-[186px] w-full flex-col items-center rounded-2xl border bg-surface px-3 pb-4 pt-[24.5px] text-center transition-[border-color,box-shadow] duration-150 sm:px-4",
        brand.hot
          ? "border-hot-line shadow-hot"
          : "border-line hover:border-brand-ring hover:shadow-card-hover",
      )}
    >
      {brand.hot && (
        <span
          aria-hidden="true"
          className="absolute right-[8px] top-[11px] text-[15px] leading-none"
        >
          🔥
        </span>
      )}
      <span className="flex min-h-14 w-full flex-1 items-center justify-center">
        <BrandLogo brand={brand} size={56} priority={priority} />
      </span>
      <span className="mt-3 line-clamp-1 max-w-full text-[14px] font-semibold leading-5 text-ink">
        {brand.name}
      </span>
      <CommissionBadge brand={brand} className="mt-1.5" />
      <span className="mt-[7px] flex items-center gap-[3.5px] text-[10.5px] leading-[14px]">
        <Star aria-hidden="true" className="size-[10.5px] fill-star text-star" strokeWidth={1} />
        <span className="font-semibold text-ink-strong">{brand.rating.toFixed(1)}</span>
        {brand.links > 0 && (
          <span className="text-[#A8A9AE]">
            <span aria-hidden="true">·</span> {pluralize(brand.links, "link")}
          </span>
        )}
      </span>
    </button>
  );
}
