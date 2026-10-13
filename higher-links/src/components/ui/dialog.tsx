"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

// shadcn/ui-style Dialog, restyled to the reference: blurred backdrop, 24px
// radius panel on desktop, bottom sheet below 640px.

export const Dialog = DialogPrimitive.Root;
export const DialogTitle = DialogPrimitive.Title;
export const DialogDescription = DialogPrimitive.Description;
export const DialogClose = DialogPrimitive.Close;

export function DialogContent({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<typeof DialogPrimitive.Content>) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-[var(--overlay)] backdrop-blur-[6px] data-[state=closed]:animate-overlay-out data-[state=open]:animate-overlay-in" />
      <DialogPrimitive.Content
        // Focus the panel itself on open so pointer users don't see a ring on the first button;
        // Tab still moves straight into the dialog's controls.
        onOpenAutoFocus={(e) => {
          e.preventDefault();
          (e.currentTarget as HTMLElement | null)?.focus();
        }}
        className={cn(
          "fixed inset-x-0 bottom-0 z-50 flex max-h-[92dvh] flex-col overflow-hidden rounded-t-[22px] bg-surface shadow-modal outline-none",
          "data-[state=closed]:animate-sheet-out data-[state=open]:animate-sheet-in",
          "sm:inset-x-auto sm:bottom-auto sm:left-1/2 sm:top-1/2 sm:max-h-[min(720px,calc(100dvh-48px))] sm:w-[calc(100%-32px)] sm:max-w-[510px] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-[22px]",
          "sm:data-[state=closed]:animate-dialog-out sm:data-[state=open]:animate-dialog-in",
          className,
        )}
        {...props}
      >
        {children}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}

export function DialogCloseButton({ className }: { className?: string }) {
  return (
    <DialogPrimitive.Close
      aria-label="Close"
      className={cn(
        "focus-ring grid size-[31.5px] shrink-0 place-items-center rounded-full bg-chip text-[#545B67] transition-colors hover:bg-[#E6E7EC] hover:text-ink",
        className,
      )}
    >
      <X className="size-4" strokeWidth={2} />
    </DialogPrimitive.Close>
  );
}

export function DialogFooter({ children }: { children: ReactNode }) {
  return (
    <div className="border-t border-line-divider px-4 pb-[max(16px,env(safe-area-inset-bottom))] pt-4 sm:px-6">
      {children}
    </div>
  );
}
