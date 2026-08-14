import type { Metadata } from "next";
import Link from "next/link";
import { createProduct } from "@/app/admin/actions";
import { ProductForm } from "@/components/admin/product-form";
import { getOccasions } from "@/lib/occasions";

export const metadata: Metadata = {
  title: "Nuevo producto — Nos Fleurs",
};

export default async function NewProductPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <main className="flex-1 px-6 py-10 sm:px-12 sm:py-16">
      <Link
        href="/admin"
        className="font-mono text-xs uppercase tracking-wider text-moss transition-colors hover:text-foreground"
      >
        ← Volver
      </Link>
      <span className="mt-8 block font-mono text-xs uppercase tracking-wider text-moss">
        Admin
      </span>
      <h1 className="mt-2 font-heading text-3xl italic">Nuevo producto</h1>
      <ProductForm
        action={createProduct}
        occasions={getOccasions()}
        submitLabel="Crear producto"
        error={error}
      />
    </main>
  );
}
