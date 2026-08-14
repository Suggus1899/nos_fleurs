import Image from "next/image";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { SealStamp } from "@/components/seal-stamp";
import { SpecimenCard } from "@/components/specimen-card";
import { getProducts } from "@/lib/products";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL } from "@/lib/social";

const HERO_IMAGE =
  "https://images.pexels.com/photos/37309568/pexels-photo-37309568/free-photo-of-elegant-pink-flower-bouquet-in-florist-s-workshop.jpeg?auto=compress&cs=tinysrgb&w=1000";

export default function Home() {
  const products = getProducts();
  const featured = products.slice(0, 3);
  const galleryImages = [
    ...products.map((product) => product.image),
    "https://images.pexels.com/photos/38392600/pexels-photo-38392600/free-photo-of-colorful-flower-display-at-florist-shop.jpeg?auto=compress&cs=tinysrgb&w=600",
  ];

  return (
    <main className="flex-1 px-6 sm:px-12">
      <section className="grid items-center gap-10 py-16 sm:grid-cols-2 sm:py-24">
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
        <div className="relative aspect-[4/3] w-full overflow-hidden border border-border bg-secondary">
          <Image
            src={HERO_IMAGE}
            alt="Ramo de flores recién armado en el taller"
            fill
            sizes="(min-width: 640px) 50vw, 100vw"
            className="object-cover"
            priority
          />
          <SealStamp className="absolute -bottom-5 -right-5 h-24 w-24 sm:h-28 sm:w-28" />
        </div>
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

      <Separator className="bg-border" />

      <section className="py-16 sm:py-24">
        <div className="flex items-baseline justify-between">
          <h2 className="font-heading text-2xl italic">Seguinos en Instagram</h2>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs uppercase tracking-wider text-moss hover:text-foreground"
          >
            {INSTAGRAM_HANDLE} →
          </a>
        </div>
        <div className="mt-8 grid grid-cols-3 gap-2 sm:grid-cols-6">
          {galleryImages.map((src, i) => (
            <a
              key={src + i}
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="relative block aspect-square overflow-hidden border border-border bg-secondary transition-colors hover:border-moss/60"
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="(min-width: 640px) 16vw, 33vw"
                className="object-cover"
              />
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
