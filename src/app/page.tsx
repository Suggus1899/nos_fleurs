import { Separator } from "@/components/ui/separator";
import { SealStamp } from "@/components/seal-stamp";
import { SpecimenCard } from "@/components/specimen-card";

const CATALOG = [
  { code: "001", name: "Ramo Amanecer", latin: "Ranunculus asiaticus", price: "$8.500" },
  { code: "014", name: "Arreglo Plaza", latin: "Dahlia pinnata", price: "$12.900" },
  { code: "027", name: "Ramo Bruma", latin: "Paeonia lactiflora", price: "$15.200" },
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-background text-foreground">
      <header className="flex items-center justify-between px-6 py-5 sm:px-12">
        <span className="font-heading text-lg italic">Nos Fleurs</span>
        <nav className="flex gap-6 font-mono text-xs uppercase tracking-wider text-moss">
          <a href="#catalogo">Catálogo</a>
          <a href="#nosotros">Nosotros</a>
        </nav>
      </header>

      <main className="flex-1 px-6 sm:px-12">
        <section className="grid gap-10 py-16 sm:grid-cols-[1fr_auto] sm:items-end sm:py-24">
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-moss">
              N.° 001 — Catálogo de temporada
            </span>
            <h1 className="mt-4 max-w-lg font-heading text-5xl italic leading-tight sm:text-6xl">
              Flores de temporada, cortadas al amanecer.
            </h1>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-foreground/80">
              Ramos y arreglos hechos a mano, catalogados como piezas únicas y
              entregados el mismo día.
            </p>
            <a
              href="#catalogo"
              className="mt-8 inline-flex items-center rounded-sm bg-primary px-6 py-3 font-mono text-xs uppercase tracking-wider text-primary-foreground transition-opacity hover:opacity-90"
            >
              Ver catálogo
            </a>
          </div>
          <SealStamp className="hidden h-32 w-32 shrink-0 sm:block" />
        </section>

        <Separator className="bg-border" />

        <section id="catalogo" className="py-16 sm:py-24">
          <h2 className="font-heading text-2xl italic">Especímenes de la semana</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {CATALOG.map((item) => (
              <SpecimenCard key={item.code} {...item} />
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-border px-6 py-8 font-mono text-[11px] uppercase tracking-wider text-moss sm:px-12">
        Nos Fleurs — Buenos Aires
      </footer>
    </div>
  );
}
