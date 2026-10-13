"use client";

import { ChevronRight, CircleCheck } from "lucide-react";
import { useState } from "react";
import { CountUp } from "@/components/CountUp";
import dynamic from "next/dynamic";
import { LogoMark } from "@/components/icons/LogoMark";

const OfficialLinksDialog = dynamic(
  () => import("@/components/InfoDialog").then((m) => m.OfficialLinksDialog),
  { ssr: false },
);

export function Hero() {
  const [officialOpen, setOfficialOpen] = useState(false);
  const [officialMounted, setOfficialMounted] = useState(false);
  return (
    <header className="flex animate-hero-in flex-col items-center px-4 pt-[55px] text-center sm:px-6">
      <LogoMark className="h-[37.5px] w-[34px]" title="Higher Links" />
      <p className="mt-[27px] text-[40px] font-extrabold leading-none tracking-[-0.03em] text-brand sm:text-[48px]">
        <CountUp />
      </p>
      <h1 className="mt-[-1px] text-balance text-[clamp(32px,6.4vw,48px)] font-extrabold leading-[1.05] tracking-[-0.025em] text-ink">
        In extra commissions paid to creators
      </h1>
      <p className="mt-1.5 text-[15px] leading-6 text-ink-muted sm:text-[16.25px]">
        3,000+ higher commission product links
      </p>
      <button
        type="button"
        onClick={() => {
          setOfficialMounted(true);
          setOfficialOpen(true);
        }}
        className="focus-ring mt-[21px] inline-flex max-w-full items-center gap-[7px] rounded-full border border-brand-pill-line bg-brand-pill-bg px-[10px] py-[6px] text-[12px] font-medium leading-4 text-[#2A9461] transition-colors hover:border-brand-ring hover:bg-[#E8F2EE]"
      >
        <CircleCheck className="size-[13px]" strokeWidth={2.25} />
        Official TikTok Shop links, paid directly by TikTok
        <ChevronRight className="size-3 opacity-60" strokeWidth={2.25} />
      </button>
      {officialMounted && (
        <OfficialLinksDialog open={officialOpen} onOpenChange={setOfficialOpen} />
      )}
    </header>
  );
}
