import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { SealStamp } from "@/components/seal-stamp";
import { SpecimenCard } from "@/components/specimen-card";
import { PRODUCTS } from "@/lib/products";

export default function Home() {
  const featured = PRODUCTS.slice(0, 3);

  return (
    <main className="flex-1 px-6 sm:px-12">
      <section className="grid gap-10 py-16 sm:grid-cols-[1fr_auto] sm:items-end sm:py-24">
        <div>
          <span className="font-mono text-xs uppercase tracking-wider text-moss">
            Catálogo de temporada
          </span>
          <h1 className="mt-4 max-w-lg font-heading text-5xl italic leading-tight sm:text-6xl">
            Flores de temporada, cortadas al amanecer.
          </h1>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-foreground/80">
            Ramos y arreglos hechos a mano, catalogados como piezas únicas y
            entregados el mismo día.
          </p>
          <Link
            href="/catalogo"
            className="mt-8 inline-flex items-center rounded-sm bg-primary px-6 py-3 font-mono text-xs uppercase tracking-wider text-primary-foreground transition-opacity hover:opacity-90"
          >
            Ver catálogo
          </Link>
        </div>
        <SealStamp className="hidden h-32 w-32 shrink-0 sm:block" />
      </section>

      <Separator className="bg-border" />

      <section className="py-16 sm:py-24">
        <div className="flex items-baseline justify-between">
          <h2 className="font-heading text-2xl italic">Especímenes de la semana</h2>
          <Link
            href="/catalogo"
            className="font-mono text-xs uppercase tracking-wider text-moss hover:text-foreground"
          >
            Ver catálogo completo →
          </Link>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {featured.map((product) => (
            <SpecimenCard key={product.slug} {...product} />
          ))}
        </div>
      </section>
    </main>
  );
}
