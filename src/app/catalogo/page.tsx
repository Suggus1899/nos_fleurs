import type { Metadata } from "next";
import { SpecimenCard } from "@/components/specimen-card";
import { OCCASIONS, PRODUCTS } from "@/lib/products";

export const metadata: Metadata = {
  title: "Catálogo — Nos Fleurs",
};

export default function CatalogoPage() {
  return (
    <main className="flex-1 px-6 py-16 sm:px-12 sm:py-24">
      <span className="font-mono text-xs uppercase tracking-wider text-moss">
        Catálogo
      </span>
      <h1 className="mt-2 font-heading text-4xl italic">Todos los especímenes</h1>

      <div className="mt-12 space-y-16">
        {OCCASIONS.map((occasion) => {
          const products = PRODUCTS.filter((product) => product.occasion === occasion);
          if (!products.length) return null;
          return (
            <section key={occasion}>
              <h2 className="font-heading text-2xl italic">{occasion}</h2>
              <div className="mt-6 grid gap-6 sm:grid-cols-3">
                {products.map((product) => (
                  <SpecimenCard key={product.slug} {...product} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}
