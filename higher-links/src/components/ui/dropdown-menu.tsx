"use client";

import * as Menu from "@radix-ui/react-dropdown-menu";
import { Check } from "lucide-react";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

export const DropdownMenu = Menu.Root;
export const DropdownMenuTrigger = Menu.Trigger;
export const DropdownMenuRadioGroup = Menu.RadioGroup;

export function DropdownMenuContent({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof Menu.Content>) {
  return (
    <Menu.Portal>
      <Menu.Content
        sideOffset={8}
        align="start"
        collisionPadding={16}
        className={cn(
          "z-50 min-w-[220px] overflow-hidden rounded-xl border border-line bg-surface p-1.5 shadow-menu outline-none data-[state=open]:animate-menu-in",
          className,
        )}
        {...props}
      />
    </Menu.Portal>
  );
}

export function DropdownMenuLabel({ children }: { children: React.ReactNode }) {
  return (
    <Menu.Label className="px-3 pb-1 pt-1.5 text-[11px] font-medium uppercase tracking-[0.08em] text-ink-label">
      {children}
    </Menu.Label>
  );
}

export function DropdownMenuRadioItem({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<typeof Menu.RadioItem>) {
  return (
    <Menu.RadioItem
      className={cn(
        "relative flex cursor-pointer select-none items-center justify-between gap-6 rounded-lg px-3 py-2 text-sm text-ink outline-none transition-colors data-[highlighted]:bg-chip data-[state=checked]:font-semibold",
        className,
      )}
      {...props}
    >
      {children}
      <Menu.ItemIndicator>
        <Check className="size-4 text-brand" strokeWidth={2.5} />
      </Menu.ItemIndicator>
    </Menu.RadioItem>
  );
}
