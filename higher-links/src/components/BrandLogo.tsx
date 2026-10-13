import Image from "next/image";
import type { Brand } from "@/lib/types";
import { cn } from "@/lib/utils";

/**
 * Renders the brand's logo asset as-is. Each asset carries its own shape
 * (rounded tile, circle or bare wordmark), so no mask is applied here.
 */
export function BrandLogo({
  brand,
  size,
  alt = "",
  priority,
  className,
}: {
  brand: Pick<Brand, "logo" | "name">;
  size: number;
  alt?: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <Image
      src={brand.logo}
      alt={alt}
      width={size}
      height={size}
      sizes={`${size}px`}
      priority={priority}
      className={cn("object-contain", className)}
      style={{ width: size, height: size }}
    />
  );
}
