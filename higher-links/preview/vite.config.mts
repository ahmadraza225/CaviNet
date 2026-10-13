import path from "node:path";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import autoprefixer from "autoprefixer";
import tailwindcss from "tailwindcss";
import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";

// Builds the site as one self-contained HTML file (no server, no API routes),
// used for the hosted preview. `npm run build:preview` writes preview/dist/index.html.

const here = path.dirname(fileURLToPath(import.meta.url));
const src = path.resolve(here, "../src");

export default defineConfig({
  root: here,
  plugins: [react(), viteSingleFile()],
  resolve: {
    alias: [
      { find: "@/lib/api", replacement: path.resolve(here, "shims/api.ts") },
      { find: "next/image", replacement: path.resolve(here, "shims/next-image.tsx") },
      { find: "next/navigation", replacement: path.resolve(here, "shims/next-navigation.ts") },
      { find: "next/link", replacement: path.resolve(here, "shims/next-link.tsx") },
      { find: "next/dynamic", replacement: path.resolve(here, "shims/next-dynamic.tsx") },
      { find: /^@\//, replacement: `${src}/` },
    ],
  },
  css: {
    postcss: {
      plugins: [
        tailwindcss({ config: path.resolve(here, "../tailwind.config.ts") }),
        autoprefixer(),
      ],
    },
  },
  build: {
    outDir: path.resolve(here, "dist"),
    emptyOutDir: true,
    assetsInlineLimit: Number.MAX_SAFE_INTEGER,
    cssCodeSplit: false,
  },
});
