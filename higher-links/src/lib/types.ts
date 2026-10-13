export type Product = {
  id: string;
  name: string;
  /** Product image URL. Empty string renders a branded placeholder tile. */
  image: string;
  price?: string;
  commission?: number;
  url: string;
};

export type CategoryKey =
  | "skincare"
  | "makeup"
  | "supplements"
  | "hair-body"
  | "fashion"
  | "food-drink"
  | "home";

export type Brand = {
  slug: string;
  name: string;
  /** Logo URL or /logos/<slug>.png */
  logo: string;
  /** "Up to X%"; null = no badge */
  commission: number | null;
  rating: number;
  reviews?: number;
  links: number;
  hot?: boolean;
  comingSoon?: boolean;
  category: CategoryKey;
  /** External application page. Falls back to /apply/<slug> when absent. */
  campaignUrl?: string;
  campaignTitle?: string;
  /** Dominant brand colour, used for placeholder product tiles. */
  accent?: string;
  products: Product[];
};

export type SortKey = "featured" | "commission" | "links" | "rating" | "az";

export type ApplicationInput = { slug: string; name: string; email: string };
