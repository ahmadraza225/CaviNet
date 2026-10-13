"use client";

import { CircleHelp } from "lucide-react";
import { useState } from "react";
import { DiscordIcon } from "@/components/icons/DiscordIcon";
import dynamic from "next/dynamic";
import { DISCORD_URL } from "@/lib/config";

const HelpDialog = dynamic(() => import("@/components/InfoDialog").then((m) => m.HelpDialog), {
  ssr: false,
});

const actionClass =
  "grid size-9 place-items-center rounded-full border border-line bg-surface text-[#4B4F58] transition-[border-color,color,box-shadow] duration-150 hover:border-brand-ring hover:text-brand hover:shadow-action focus-ring sm:size-10";

export function TopActions() {
  const [helpOpen, setHelpOpen] = useState(false);
  const [helpMounted, setHelpMounted] = useState(false);
  return (
    <>
      <div className="fixed right-4 top-4 z-40 flex gap-2 sm:right-6 sm:top-6">
        <button
          type="button"
          aria-label="Help"
          className={actionClass}
          onClick={() => {
            setHelpMounted(true);
            setHelpOpen(true);
          }}
        >
          <CircleHelp className="size-[17px]" strokeWidth={2} />
        </button>
        <a
          href={DISCORD_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Join our Discord"
          className={actionClass}
        >
          <DiscordIcon className="size-[19px]" />
        </a>
      </div>
      {helpMounted && <HelpDialog open={helpOpen} onOpenChange={setHelpOpen} />}
    </>
  );
}
