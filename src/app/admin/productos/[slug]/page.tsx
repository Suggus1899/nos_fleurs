import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { updateProduct } from "@/app/admin/actions";
import { ProductForm } from "@/components/admin/product-form";
import { getProductBySlug } from "@/lib/products";

export const metadata: Metadata = {
  title: "Editar producto — Nos Fleurs",
};

export default async function EditProductPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const { slug } = await params;
  const { error } = await searchParams;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  return (
    <main className="flex-1 px-6 py-16 sm:px-12 sm:py-24">
      <span className="font-mono text-xs uppercase tracking-wider text-moss">Admin</span>
      <h1 className="mt-2 font-heading text-3xl italic">Editar {product.name}</h1>
      <ProductForm
        action={updateProduct.bind(null, slug)}
        product={product}
        submitLabel="Guardar cambios"
        error={error}
      />
    </main>
  );
}
