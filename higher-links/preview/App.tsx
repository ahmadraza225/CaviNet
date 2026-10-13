import { ArrowLeft } from "lucide-react";
import { Suspense, useEffect, useState } from "react";
import { ApplyView } from "@/components/ApplyView";
import { Directory, DirectoryFallback } from "@/components/Directory";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { MotionProvider } from "@/components/MotionProvider";
import { Toaster } from "@/components/Toast";
import { TopActions } from "@/components/TopActions";
import { getBrand } from "@/data/brands";
import { clearParam } from "./shims/next-navigation";

// The standalone preview has no server routes, so in-site links ("/" and
// "/apply/<slug>") switch views in place instead of opening new pages.

type View = { name: "directory" } | { name: "apply"; slug: string };

export function App() {
  const [view, setView] = useState<View>({ name: "directory" });

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a");
      const href = a?.getAttribute("href");
      if (!href || e.defaultPrevented || e.button !== 0) return;
      if (href === "#") {
        e.preventDefault();
        return;
      }
      const apply = href.match(/^\/apply\/([\w-]+)$/);
      if (apply) {
        e.preventDefault();
        clearParam("brand");
        setView({ name: "apply", slug: apply[1] });
        window.scrollTo(0, 0);
      } else if (href === "/") {
        e.preventDefault();
        setView({ name: "directory" });
        window.scrollTo(0, 0);
      }
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  const brand = view.name === "apply" ? getBrand(view.slug) : undefined;

  return (
    <MotionProvider>
      {brand ? (
        <>
          <ApplyView brand={brand} />
          <button
            type="button"
            onClick={() => setView({ name: "directory" })}
            className="fixed left-4 top-4 z-40 inline-flex h-8 items-center gap-1.5 rounded-full border border-[#E4E4E4] bg-white px-3 font-dm text-[12px] font-medium text-[#1F1F1F] shadow-[0_2px_6px_rgba(0,0,0,0.06)] hover:bg-[#FAFAFA]"
          >
            <ArrowLeft className="size-3.5" strokeWidth={2} />
            Back to Higher Links
          </button>
        </>
      ) : (
        <>
          <TopActions />
          <Hero />
          <main className="mx-auto w-full max-w-[1024px] px-4 sm:px-6">
            <Suspense fallback={<DirectoryFallback />}>
              <Directory />
            </Suspense>
          </main>
          <Footer />
        </>
      )}
      <Toaster />
    </MotionProvider>
  );
}
