import { Suspense } from "react";
import { Directory, DirectoryFallback } from "@/components/Directory";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Toaster } from "@/components/Toast";
import { TopActions } from "@/components/TopActions";

export default function HomePage() {
  return (
    <>
      <TopActions />
      <Hero />
      <main className="mx-auto w-full max-w-[1024px] px-4 sm:px-6">
        <Suspense fallback={<DirectoryFallback />}>
          <Directory />
        </Suspense>
      </main>
      <Footer />
      <Toaster />
    </>
  );
}
