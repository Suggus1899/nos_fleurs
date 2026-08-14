import type { Metadata } from "next";
import Link from "next/link";
import { createOccasion, deleteOccasion } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getOccasions } from "@/lib/occasions";
import { getProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "Categorías — Nos Fleurs",
};

export default async function CategoriasPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const occasions = getOccasions();
  const products = getProducts();
  const countByOccasion = (occasion: string) =>
    products.filter((p) => p.occasion === occasion).length;

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
      <h1 className="mt-2 font-heading text-3xl italic">Categorías</h1>

      <ul className="mt-8 max-w-sm divide-y divide-border border-t border-b border-border">
        {occasions.map((occasion) => (
          <li key={occasion} className="flex items-center justify-between gap-4 py-3">
            <div>
              <p className="text-sm">{occasion}</p>
              <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                {countByOccasion(occasion)} producto(s)
              </p>
            </div>
            <form action={deleteOccasion.bind(null, occasion)}>
              <Button
                type="submit"
                variant="outline"
                size="sm"
                className="rounded-sm text-primary hover:text-primary"
              >
                Eliminar
              </Button>
            </form>
          </li>
        ))}
      </ul>

      {error === "in-use" && (
        <p className="mt-4 max-w-sm text-sm text-primary">
          No se puede eliminar: hay productos usando esa categoría. Cambiales la
          ocasión primero.
        </p>
      )}

      <form action={createOccasion} className="mt-8 max-w-sm space-y-1.5">
        <Label htmlFor="name">Nueva categoría</Label>
        <div className="flex gap-2">
          <Input id="name" name="name" placeholder="Día de la madre" required />
          <Button type="submit" className="shrink-0 rounded-sm">
            Agregar
          </Button>
        </div>
      </form>
    </main>
  );
}
