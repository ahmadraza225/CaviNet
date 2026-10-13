"use client";

import { ChevronDown, Filter, ListFilter } from "lucide-react";
import type { ReactNode } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CATEGORIES, SORTS } from "@/lib/filters";
import type { CategoryKey, SortKey } from "@/lib/types";
import { cn } from "@/lib/utils";

function Chip({ icon, label, active }: { icon: ReactNode; label: string; active: boolean }) {
  return (
    <DropdownMenuTrigger
      className={cn(
        "focus-ring inline-flex h-[34px] items-center gap-[9px] rounded-full border pl-4 pr-[15px] text-[12px] font-semibold transition-colors data-[state=open]:border-[#C9CBD2]",
        active
          ? "border-brand-pill-line bg-brand-soft text-brand hover:border-brand-ring"
          : "border-chip-line bg-chip text-chip-ink hover:border-[#C9CBD2] hover:bg-[#EAEBF0]",
      )}
    >
      <span className={cn("shrink-0", active ? "text-brand" : "text-[#7F8493]")}>{icon}</span>
      {label}
      <ChevronDown aria-hidden="true" className="-ml-px size-[15px] shrink-0" strokeWidth={2} />
    </DropdownMenuTrigger>
  );
}

export function FilterBar({
  category,
  sort,
  onCategory,
  onSort,
}: {
  category: CategoryKey | null;
  sort: SortKey;
  onCategory: (value: CategoryKey | null) => void;
  onSort: (value: SortKey) => void;
}) {
  const categoryLabel = category ? CATEGORIES.find((c) => c.key === category)?.label : undefined;
  const sortLabel = sort !== "featured" ? SORTS.find((s) => s.key === sort)?.label : undefined;

  return (
    <div className="flex flex-wrap gap-2">
      <DropdownMenu modal={false}>
        <Chip
          active={!!category}
          label={categoryLabel ?? "Category"}
          icon={<Filter aria-hidden="true" className="size-[15px]" strokeWidth={2} />}
        />
        <DropdownMenuContent aria-label="Category">
          <DropdownMenuLabel>Category</DropdownMenuLabel>
          <DropdownMenuRadioGroup
            value={category ?? "all"}
            onValueChange={(v) => onCategory(v === "all" ? null : (v as CategoryKey))}
          >
            {CATEGORIES.map((c) => (
              <DropdownMenuRadioItem key={c.key} value={c.key}>
                {c.label}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu modal={false}>
        <Chip
          active={!!sortLabel}
          label={sortLabel ?? "Sort by"}
          icon={<ListFilter aria-hidden="true" className="size-[15px]" strokeWidth={2} />}
        />
        <DropdownMenuContent aria-label="Sort by">
          <DropdownMenuLabel>Sort by</DropdownMenuLabel>
          <DropdownMenuRadioGroup value={sort} onValueChange={(v) => onSort(v as SortKey)}>
            {SORTS.map((s) => (
              <DropdownMenuRadioItem key={s.key} value={s.key}>
                {s.label}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
