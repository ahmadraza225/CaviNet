import { SITE_NAME, SITE_TAGLINE } from "@/lib/config";

export function Footer() {
  return (
    <footer className="mx-auto w-full max-w-[1024px] px-6">
      <p className="border-t border-line py-7 text-center text-sm text-ink-faint">
        {SITE_NAME} · {SITE_TAGLINE}
      </p>
    </footer>
  );
}
