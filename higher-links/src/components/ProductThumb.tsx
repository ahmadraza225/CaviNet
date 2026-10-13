import { ShoppingBag } from "lucide-react";
import type { Product } from "@/lib/types";

/** Product image, or a tile tinted with the brand colour when no image is available. */
export function ProductThumb({ product, accent }: { product: Product; accent?: string }) {
  if (product.image) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- product images come from arbitrary shop CDNs
      <img
        src={product.image}
        alt=""
        width={56}
        height={56}
        loading="lazy"
        className="size-14 shrink-0 rounded-xl border border-line object-cover"
      />
    );
  }
  const color = accent ?? "#1E925E";
  return (
    <span
      aria-hidden="true"
      className="grid size-14 shrink-0 place-items-center rounded-xl border border-line"
      style={{ background: `color-mix(in srgb, ${color} 12%, white)`, color }}
    >
      <ShoppingBag className="size-6" strokeWidth={1.75} />
    </span>
  );
}
