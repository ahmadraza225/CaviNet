"use client";

import { BadgeCheck, Link2, Store, Wallet, UserPlus } from "lucide-react";
import type { ReactNode } from "react";
import {
  Dialog,
  DialogClose,
  DialogCloseButton,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";

type Item = { icon: ReactNode; title: string; body: string };

function InfoDialog({
  open,
  onOpenChange,
  title,
  description,
  items,
  numbered,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  items: Item[];
  numbered?: boolean;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <div className="flex items-start gap-3 p-6 pb-2">
          <div className="min-w-0 flex-1">
            <DialogTitle className="text-[17.5px] font-bold leading-[22px] text-ink">
              {title}
            </DialogTitle>
            <DialogDescription className="mt-1.5 text-sm leading-5 text-ink-muted">
              {description}
            </DialogDescription>
          </div>
          <DialogCloseButton />
        </div>
        <ol className="flex flex-col gap-1 overflow-y-auto px-6 pb-6 pt-3">
          {items.map((item, i) => (
            <li key={item.title} className="flex gap-3.5 rounded-2xl p-3 odd:bg-[#F7F8FA]">
              <span className="relative grid size-10 shrink-0 place-items-center rounded-xl bg-brand-soft text-brand">
                {item.icon}
                {numbered && (
                  <span className="absolute -right-1.5 -top-1.5 grid size-5 place-items-center rounded-full bg-brand text-[11px] font-bold text-white ring-2 ring-white">
                    {i + 1}
                  </span>
                )}
              </span>
              <div className="min-w-0 pt-0.5">
                <h3 className="text-[15px] font-semibold leading-5 text-ink">{item.title}</h3>
                <p className="mt-1 text-sm leading-5 text-ink-muted">{item.body}</p>
              </div>
            </li>
          ))}
        </ol>
        <DialogFooter>
          <DialogClose className="focus-ring flex h-12 w-full items-center justify-center rounded-[14px] bg-brand text-base font-semibold text-white shadow-cta transition-colors hover:bg-brand-hover">
            Got it
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function HelpDialog(props: { open: boolean; onOpenChange: (open: boolean) => void }) {
  return (
    <InfoDialog
      {...props}
      numbered
      title="How it works"
      description="Earn more on the products you already post, in three steps."
      items={[
        {
          icon: <Store className="size-5" strokeWidth={2} />,
          title: "Pick a brand",
          body: "Browse the directory and open a brand to see its higher-commission product links.",
        },
        {
          icon: <UserPlus className="size-5" strokeWidth={2} />,
          title: "Join its campaign",
          body: "Tap Join Campaign and send a short application. The brand sees it as soon as you submit.",
        },
        {
          icon: <Link2 className="size-5" strokeWidth={2} />,
          title: "Add the links to your showcase",
          body: "Once you're approved, add the higher-commission product links to your TikTok Shop showcase and post as usual.",
        },
      ]}
    />
  );
}

export function OfficialLinksDialog(props: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <InfoDialog
      {...props}
      title="Official TikTok Shop links"
      description="Every link here comes from the brand's own TikTok Shop affiliate program."
      items={[
        {
          icon: <BadgeCheck className="size-5" strokeWidth={2} />,
          title: "Created by the brand",
          body: "Brands publish these higher-rate links through TikTok Shop's affiliate tools. Nothing is resold or redirected.",
        },
        {
          icon: <Wallet className="size-5" strokeWidth={2} />,
          title: "Paid directly by TikTok",
          body: "Commission goes straight to your TikTok Shop affiliate account on TikTok's normal payout schedule.",
        },
        {
          icon: <UserPlus className="size-5" strokeWidth={2} />,
          title: "Free to join",
          body: "Higher Links never touches your earnings. Joining a campaign costs nothing.",
        },
      ]}
    />
  );
}
