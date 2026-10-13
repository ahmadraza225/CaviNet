import { ApplyForm } from "@/components/ApplyForm";
import { BrandLogo } from "@/components/BrandLogo";
import { ChatIcon } from "@/components/icons/ChatIcon";
import { POWERED_BY } from "@/lib/config";
import type { Brand } from "@/lib/types";

/** Replica of the hosted "Join Campaign" application page. */
export function ApplyView({ brand }: { brand: Brand }) {
  const label = brand.name.toUpperCase();
  return (
    <div className="min-h-dvh bg-[#F3F3F3] px-4 pb-24 pt-6 font-dm text-[#1F1F1F] md:pt-[50px]">
      <div className="mx-auto max-w-[1150px] overflow-hidden rounded-2xl border border-[#E4E4E4] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
        <div className="relative h-[63px] bg-[linear-gradient(100deg,#D3BD9C_0%,#B7A182_28%,#A18A70_53%,#88735D_79%,#77624E_100%)]">
          <div className="absolute left-4 top-[45px] z-10 flex h-[33px] items-center gap-2 rounded-full border border-[#E6E6E6] bg-white pl-[7px] pr-3 shadow-[0_2px_6px_rgba(0,0,0,0.08)] md:left-7">
            {brand.logo ? (
              <BrandLogo brand={brand} size={22} className="shrink-0" />
            ) : (
              <span className="grid size-[22px] place-items-center rounded-full bg-[#EDEDED] text-[10px] text-[#6B6B6B]">
                {brand.name[0]}
              </span>
            )}
            <span className="text-[12px] font-medium">{label}</span>
          </div>
        </div>
        <div className="grid md:min-h-[466px] md:grid-cols-[56fr_44fr]">
          <section className="px-4 pb-8 pt-[50px] md:px-7 md:pt-[42px]">
            <h1 className="text-[19px] font-semibold uppercase leading-7 tracking-[-0.015em]">
              {brand.campaignTitle ?? `${label} CAMPAIGN`}
            </h1>
          </section>
          <section className="border-t border-[#E7E7E7] p-4 pb-8 md:border-l md:border-t-0 md:px-7 md:pt-[41.5px]">
            <ApplyForm slug={brand.slug} brandLabel={label} />
          </section>
        </div>
      </div>
      <p className="mt-4 flex items-center justify-center gap-[7px] text-[9.5px] text-[#6B6B6B]">
        <span>
          Powered by <span className="font-bold text-[#1F1F1F]">{POWERED_BY}</span>
        </span>
        <span aria-hidden="true" className="h-2.5 w-px bg-[#D6D6D6]" />
        <a href="#" className="hover:text-[#1F1F1F]">
          Terms
        </a>
        <a href="#" className="hover:text-[#1F1F1F]">
          Privacy
        </a>
      </p>
      <button
        type="button"
        aria-label="Chat with us"
        className="fixed bottom-5 right-5 grid size-12 place-items-center rounded-full bg-[#1C1C1C] text-white shadow-[0_6px_16px_rgba(0,0,0,0.2)] transition-transform hover:scale-105"
      >
        <ChatIcon className="size-[22px]" />
      </button>
    </div>
  );
}
