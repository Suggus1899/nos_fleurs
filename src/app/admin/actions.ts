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
import { getOccasions, saveOccasions } from "@/lib/occasions";
import { deleteUploadedImage, isValidImageFile, saveUploadedImage } from "@/lib/uploads";

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

function productFromForm(formData: FormData): Omit<Product, "slug" | "image"> {
  return {
    name: String(formData.get("name") ?? "").trim(),
    latin: String(formData.get("latin") ?? "").trim(),
    price: String(formData.get("price") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    occasion: String(formData.get("occasion") ?? "") as Occasion,
    available: formData.get("available") === "on",
  };
}

export async function createProduct(formData: FormData) {
  await requireAdmin();

  const products = getProducts();
  const fields = productFromForm(formData);
  const file = formData.get("image");

  if (!isValidImageFile(file)) {
    redirect("/admin/productos/nuevo?error=image");
  }
  const image = await saveUploadedImage(file);

  let slug = slugify(fields.name);
  let suffix = 2;
  while (products.some((p) => p.slug === slug)) {
    slug = `${slugify(fields.name)}-${suffix}`;
    suffix += 1;
  }

  products.push({ slug, ...fields, image });
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
  const file = formData.get("image");

  let image = products[index].image;
  if (file instanceof File && file.size > 0) {
    if (!isValidImageFile(file)) {
      redirect(`/admin/productos/${slug}?error=image`);
    }
    image = await saveUploadedImage(file);
    await deleteUploadedImage(products[index].image);
  }

  products[index] = { ...products[index], ...fields, image };
  saveProducts(products);
  revalidateCatalog(slug);
  redirect("/admin");
}

export async function deleteProduct(slug: string) {
  await requireAdmin();

  const products = getProducts();
  const product = products.find((p) => p.slug === slug);
  saveProducts(products.filter((p) => p.slug !== slug));
  if (product) await deleteUploadedImage(product.image);
  revalidateCatalog(slug);
  redirect("/admin");
}

function revalidateOccasions() {
  revalidatePath("/catalogo");
  revalidatePath("/admin/categorias");
  revalidatePath("/admin/productos/nuevo");
}

export async function createOccasion(formData: FormData) {
  await requireAdmin();

  const name = String(formData.get("name") ?? "").trim();
  if (!name) redirect("/admin/categorias");

  const occasions = getOccasions();
  if (!occasions.includes(name)) {
    occasions.push(name);
    saveOccasions(occasions);
  }
  revalidateOccasions();
  redirect("/admin/categorias");
}

export async function deleteOccasion(name: string) {
  await requireAdmin();

  const occasions = getOccasions();
  if (occasions.length <= 1) {
    redirect(`/admin/categorias?error=last-one`);
  }

  const inUse = getProducts().some((p) => p.occasion === name);
  if (inUse) {
    redirect(`/admin/categorias?error=in-use`);
  }

  saveOccasions(occasions.filter((occasion) => occasion !== name));
  revalidateOccasions();
  redirect("/admin/categorias");
}
