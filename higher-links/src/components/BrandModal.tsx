"use client";

import { Clock, Copy, Link, UserPlus } from "lucide-react";
import { useState } from "react";
import { BrandLogo } from "@/components/BrandLogo";
import { ProductThumb } from "@/components/ProductThumb";
import { StarRating } from "@/components/StarRating";
import { copyText, toast } from "@/components/Toast";
import {
  Dialog,
  DialogCloseButton,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Brand, Product } from "@/lib/types";
import { campaignHref, pluralize } from "@/lib/utils";

export function brandShareUrl(slug: string) {
  const url = new URL(window.location.href);
  url.search = "";
  url.hash = "";
  url.searchParams.set("brand", slug);
  return url.toString();
}

function ProductRow({ product, accent }: { product: Product; accent?: string }) {
  return (
    <li className="flex items-center gap-3 py-3">
      <ProductThumb product={product} accent={accent} />
      <div className="min-w-0 flex-1">
        <p className="line-clamp-2 text-sm font-medium leading-5 text-ink">{product.name}</p>
        <div className="mt-1 flex items-center gap-2 text-[13px]">
          {product.commission != null && (
            <span className="rounded-full bg-brand-soft px-2 py-px text-[12px] font-semibold leading-[15px] text-brand-ink">
              Up to {product.commission}%
            </span>
          )}
          {product.price && <span className="text-ink-muted">{product.price}</span>}
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-1.5">
        <button
          type="button"
          aria-label={`Copy link for ${product.name}`}
          onClick={async () =>
            toast((await copyText(product.url)) ? "Link copied" : "Couldn't copy the link")
          }
          className="focus-ring grid size-8 place-items-center rounded-full bg-chip text-[#575B65] transition-colors hover:bg-[#E6E7EC] hover:text-ink"
        >
          <Copy className="size-[14px]" strokeWidth={2} />
        </button>
        <a
          href={product.url}
          target="_blank"
          rel="noopener noreferrer"
          className="focus-ring inline-flex h-8 items-center rounded-full bg-brand-soft px-3 text-[13px] font-semibold text-brand transition-colors hover:bg-[#D7EEE3]"
        >
          Get link
        </a>
      </div>
    </li>
  );
}

export function BrandModal({ brand, onClose }: { brand: Brand | null; onClose: () => void }) {
  // Keep rendering the last brand while the close animation runs.
  const [last, setLast] = useState<Brand | null>(brand);
  if (brand && brand !== last) setLast(brand);
  const shown = brand ?? last;

  const share = async () => {
    if (!shown) return;
    const ok = await copyText(brandShareUrl(shown.slug));
    toast(ok ? "Link copied" : "Couldn't copy the link");
  };

  return (
    <Dialog open={!!brand} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        {shown && (
          <>
            <div className="flex items-center gap-3 px-4 pb-[21px] pt-6 sm:px-6">
              <BrandLogo brand={shown} size={40} className="shrink-0" />
              <div className="min-w-0 flex-1">
                <DialogTitle className="truncate text-[17.5px] font-bold leading-[22px] text-ink">
                  {shown.name}
                </DialogTitle>
                <DialogDescription asChild>
                  <div className="mt-[6.5px] flex items-center gap-1.5 text-[10.5px] leading-[14px]">
                    <StarRating value={shown.rating} />
                    <span className="sr-only">Rated {shown.rating.toFixed(1)} out of 5,</span>
                    <span aria-hidden="true" className="font-semibold text-[#3F4045]">
                      {shown.rating.toFixed(1)}
                    </span>
                    {shown.reviews != null && (
                      <span className="text-ink-muted">
                        <span aria-hidden="true">· </span>
                        {shown.reviews.toLocaleString("en-US")} reviews
                      </span>
                    )}
                  </div>
                </DialogDescription>
              </div>
              <div className="flex shrink-0 items-center gap-[7px]">
                <button
                  type="button"
                  onClick={share}
                  aria-label="Share"
                  className="focus-ring inline-flex h-[31.5px] items-center gap-[5px] rounded-full bg-chip px-[9px] text-[12px] font-medium text-[#575B65] transition-colors hover:bg-[#E6E7EC] hover:text-ink"
                >
                  <Link aria-hidden="true" className="size-[12.25px]" strokeWidth={2} />
                  Share
                </button>
                <DialogCloseButton />
              </div>
            </div>

            {shown.products.length === 0 ? (
              <div className="flex flex-1 flex-col items-center px-6 pb-[72px] pt-[62px]">
                <span className="grid size-14 place-items-center rounded-2xl bg-chip">
                  <Clock
                    aria-hidden="true"
                    className="size-[26px] text-[#BEC1C8]"
                    strokeWidth={1.75}
                  />
                </span>
                <p className="mt-[8.5px] text-[14px] leading-[21px] text-ink-muted">
                  Products coming soon
                </p>
              </div>
            ) : (
              <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 pb-3 sm:max-h-[55vh]">
                <p className="text-[12px] font-medium uppercase tracking-[0.08em] text-ink-label">
                  {pluralize(shown.links, "product link")}
                </p>
                <ul role="list" className="divide-y divide-line">
                  {shown.products.map((p) => (
                    <ProductRow key={p.id} product={p} accent={shown.accent} />
                  ))}
                </ul>
                {shown.links > shown.products.length && (
                  <p className="pb-2 pt-1 text-[13px] text-ink-faint">
                    Join the campaign to unlock all {shown.links} links.
                  </p>
                )}
              </div>
            )}

            <DialogFooter>
              <a
                href={campaignHref(shown)}
                target="_blank"
                rel="noopener"
                className="focus-ring flex h-12 w-full items-center justify-center gap-[7px] rounded-[14px] bg-brand text-[14px] font-semibold text-white shadow-cta transition-colors hover:bg-brand-hover"
              >
                <UserPlus aria-hidden="true" className="size-4" strokeWidth={2} />
                Join Campaign
              </a>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
