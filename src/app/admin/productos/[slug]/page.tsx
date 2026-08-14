import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { updateProduct } from "@/app/admin/actions";
import { ProductForm } from "@/components/admin/product-form";
import { getProductBySlug } from "@/lib/products";
import { getOccasions } from "@/lib/occasions";

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
      <Link
        href="/admin"
        className="font-mono text-xs uppercase tracking-wider text-moss hover:text-foreground"
      >
        ← Volver
      </Link>
      <span className="mt-8 block font-mono text-xs uppercase tracking-wider text-moss">
        Admin
      </span>
      <h1 className="mt-2 font-heading text-3xl italic">Editar {product.name}</h1>
      <ProductForm
        action={updateProduct.bind(null, slug)}
        product={product}
        occasions={getOccasions()}
        submitLabel="Guardar cambios"
        error={error}
      />
    </main>
  );
}
