import fs from "node:fs";
import path from "node:path";

// Categories are admin-managed data, not a fixed set — see lib/occasions.ts.
export type Occasion = string;

export type Product = {
  slug: string;
  name: string;
  latin: string;
  price: string;
  description: string;
  occasion: Occasion;
  image: string;
};

const DATA_PATH = path.join(process.cwd(), "data", "products.json");

export function getProducts(): Product[] {
  return JSON.parse(fs.readFileSync(DATA_PATH, "utf-8"));
}

// ponytail: writes a flat JSON file, fine for local/dev editing. Swap for a
// real database (Postgres) before deploying somewhere with a read-only or
// ephemeral filesystem (e.g. Vercel).
export function saveProducts(products: Product[]) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(products, null, 2) + "\n");
}

export function getProductBySlug(slug: string) {
  return getProducts().find((product) => product.slug === slug);
}

const COMBINING_MARKS = new RegExp("[\\u0300-\\u036f]", "g");

export function slugify(name: string) {
  return name
    .normalize("NFD")
    .replace(COMBINING_MARKS, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
