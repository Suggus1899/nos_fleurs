import type { Metadata } from "next";
import { SealStamp } from "@/components/seal-stamp";

export const metadata: Metadata = {
  title: "Nosotros — Nos Fleurs",
};

export default function NosotrosPage() {
  return (
    <main className="flex-1 px-6 py-16 sm:px-12 sm:py-24">
      <div className="grid gap-10 sm:grid-cols-[1fr_auto] sm:items-start">
        <div>
          <span className="font-mono text-xs uppercase tracking-wider text-moss">
            Nuestra historia
          </span>
          <h1 className="mt-2 max-w-lg font-heading text-4xl italic leading-tight">
            Cada ramo, catalogado como una pieza única.
          </h1>
          <div className="mt-6 max-w-md space-y-4 text-sm leading-relaxed text-foreground/80">
            <p>
              Nos Fleurs nació de la idea de tratar cada ramo como lo que es:
              un espécimen efímero, cortado en su punto justo y catalogado
              antes de que el tiempo lo cambie.
            </p>
            <p>
              Trabajamos con productores locales de temporada, armamos cada
              arreglo a mano el mismo día de la entrega y numeramos cada
              pieza en nuestro catálogo, como en un antiguo herbario.
            </p>
          </div>
        </div>
        <SealStamp className="hidden h-28 w-28 shrink-0 sm:block" />
      </div>
    </main>
  );
}
