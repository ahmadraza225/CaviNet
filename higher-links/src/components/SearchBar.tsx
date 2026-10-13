"use client";

import { Search } from "lucide-react";

export function SearchBar({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="relative">
      <Search
        aria-hidden="true"
        className="pointer-events-none absolute left-4 top-1/2 size-[18px] -translate-y-1/2 text-[#555A65]"
        strokeWidth={2}
      />
      <input
        type="search"
        inputMode="search"
        autoComplete="off"
        spellCheck={false}
        aria-label="Search brands or products"
        placeholder="Search brands or products..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-[46px] w-full appearance-none rounded-xl border border-line-strong bg-surface pl-[44px] pr-4 text-base text-ink outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-[#565961] focus:border-brand-ring focus:shadow-[0_0_0_3px_rgba(30,146,94,0.12)] sm:text-[14px] [&::-webkit-search-cancel-button]:appearance-none"
      />
    </div>
  );
}
