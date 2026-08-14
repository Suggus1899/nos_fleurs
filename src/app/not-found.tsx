import Link from "next/link";
import { SealStamp } from "@/components/seal-stamp";

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 px-6 py-24 text-center">
      <SealStamp className="h-20 w-20" />
      <div>
        <span className="font-mono text-xs uppercase tracking-wider text-moss">
          N.° 404
        </span>
        <h1 className="mt-2 font-heading text-3xl italic">
          Espécimen no encontrado
        </h1>
        <p className="mt-3 max-w-xs text-sm text-foreground/80">
          Esta página no está catalogada. Puede que haya sido retirada o que
          nunca haya existido.
        </p>
      </div>
      <Link
        href="/"
        className="inline-flex items-center rounded-sm bg-primary px-6 py-3 font-mono text-xs uppercase tracking-wider text-primary-foreground transition-opacity hover:opacity-90"
      >
        Volver al inicio
      </Link>
    </main>
  );
}
