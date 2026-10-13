# Higher Links

A clone of the Higher Links brand directory: a single page listing 53 brands that pay creators
higher-than-standard commission through official TikTok Shop links. Creators open a brand to see
its product links and tap **Join Campaign** to apply.

Built with Next.js (App Router), TypeScript, Tailwind CSS, Radix UI (shadcn/ui-style primitives),
framer-motion and lucide-react.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
```

Other scripts:

| Script                  | What it does                                                         |
| ----------------------- | -------------------------------------------------------------------- |
| `npm run build`         | Production build                                                     |
| `npm start`             | Serve the production build                                           |
| `npm run lint`          | ESLint (Next.js core-web-vitals + TypeScript rules)                  |
| `npm run typecheck`     | `tsc --noEmit`                                                       |
| `npm run format`        | Prettier                                                             |
| `npm run build:preview` | One self-contained HTML file in `preview/dist/` (no server required) |

## Deploy

Vercel picks the project up with no extra config. Because this app lives in the `higher-links/`
folder of the repository, set **Root Directory** to `higher-links` when importing the repo.
Set `NEXT_PUBLIC_SITE_URL` to the production URL so Open Graph images resolve to absolute URLs.

## How it's put together

```
src/
  app/
    layout.tsx             fonts (Inter, DM Sans), metadata, body background
    page.tsx               directory page
    api/brands/route.ts    GET: brand list (static)
    api/apply/route.ts     POST: validates and stores an application
    apply/[slug]/page.tsx  replica of the hosted "Join Campaign" application page
    globals.css            design tokens as CSS variables
  components/              Hero, CountUp, SearchBar, FilterBar, BrandGrid, BrandCard,
                           BrandModal, StarRating, Footer, TopActions, InfoDialog, ApplyView, …
  components/ui/           Dialog and DropdownMenu built on Radix
  data/brands.ts           seed data for all 53 brands, in display order
  lib/                     types, filtering/sorting, client API, config
preview/                   Vite build of the same components as a single static HTML file
public/logos/              brand logos
```

- **Data flow.** The page fetches `/api/brands` on the client, so the loading state
  (`LOADING...`, spinner, faded hero) is real. Search is debounced by 150 ms and matches brand
  names, categories and product names.
- **Shareable URLs.** `q`, `category`, `sort` and `brand` live in the query string.
  `/?brand=medicube` opens that brand's modal on load.
- **Applications.** `POST /api/apply` appends to `.data/applications.json` (or the path in
  `APPLICATIONS_FILE`). On read-only hosts such as Vercel it logs the application instead.
  To keep them in production, swap `src/lib/applications.ts` for a database or form service.
- **Rebranding the application page.** The "Powered by" label is `POWERED_BY` in
  `src/lib/config.ts`.

## What came from where

The reference site (higherlinks.com) couldn't be reached from the build environment, so
everything was taken from the 28-second screen recording:

- **Measured from the recording:** layout, spacing, type sizes, colours, card states (hot, hover,
  no badge, coming soon), modal and application page. Logos were cropped from the recording at
  2× resolution, and the logo mark was traced from it.
- **Inferred:** the Category and Sort options, the Help and "Official TikTok Shop links"
  dialogs, Share behaviour (copies a `?brand=` link), the modal's product list, review counts,
  categories and product names/prices. Product links point to TikTok search results as
  placeholders. Replace them with the brands' real affiliate links in `src/data/brands.ts`.
