import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function StarRating({ value, className }: { value: number; className?: string }) {
  const filled = Math.round(value);
  return (
    <span className={cn("flex items-center gap-px", className)} aria-hidden="true">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={cn(
            "size-[11px]",
            i < filled ? "fill-star-bright text-star-bright" : "fill-star-empty text-star-empty",
          )}
          strokeWidth={1}
        />
      ))}
    </span>
  );
}
