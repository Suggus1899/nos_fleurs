"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { checkCredentials, createSession, destroySession, requireAdmin } from "@/lib/auth";
import {
  getProducts,
  saveProducts,
  slugify,
  type Occasion,
  type Product,
} from "@/lib/products";

const ALLOWED_IMAGE_HOST = "https://images.pexels.com/";

function revalidateCatalog(slug?: string) {
  revalidatePath("/");
  revalidatePath("/catalogo");
  revalidatePath("/admin");
  if (slug) revalidatePath(`/producto/${slug}`);
}

export async function login(formData: FormData) {
  const username = String(formData.get("username") ?? "");
  const password = String(formData.get("password") ?? "");

  if (!checkCredentials(username, password)) {
    redirect("/admin/login?error=1");
  }

  await createSession();
  redirect("/admin");
}

export async function logout() {
  await destroySession();
  redirect("/admin/login");
}

function productFromForm(formData: FormData): Omit<Product, "slug" | "image"> & {
  image: string;
} {
  return {
    name: String(formData.get("name") ?? "").trim(),
    latin: String(formData.get("latin") ?? "").trim(),
    price: String(formData.get("price") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    occasion: String(formData.get("occasion") ?? "") as Occasion,
    image: String(formData.get("image") ?? "").trim(),
  };
}

export async function createProduct(formData: FormData) {
  await requireAdmin();

  const products = getProducts();
  const fields = productFromForm(formData);

  if (!fields.image.startsWith(ALLOWED_IMAGE_HOST)) {
    redirect("/admin/productos/nuevo?error=image");
  }

  let slug = slugify(fields.name);
  let suffix = 2;
  while (products.some((p) => p.slug === slug)) {
    slug = `${slugify(fields.name)}-${suffix}`;
    suffix += 1;
  }

  products.push({ slug, ...fields });
  saveProducts(products);
  revalidateCatalog(slug);
  redirect("/admin");
}

export async function updateProduct(slug: string, formData: FormData) {
  await requireAdmin();

  const products = getProducts();
  const index = products.findIndex((p) => p.slug === slug);
  if (index === -1) redirect("/admin");

  const fields = productFromForm(formData);
  if (!fields.image.startsWith(ALLOWED_IMAGE_HOST)) {
    redirect(`/admin/productos/${slug}?error=image`);
  }

  products[index] = { ...products[index], ...fields };
  saveProducts(products);
  revalidateCatalog(slug);
  redirect("/admin");
}

export async function deleteProduct(slug: string) {
  await requireAdmin();

  const products = getProducts().filter((p) => p.slug !== slug);
  saveProducts(products);
  revalidateCatalog(slug);
  redirect("/admin");
}
