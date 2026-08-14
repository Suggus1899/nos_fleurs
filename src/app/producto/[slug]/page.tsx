import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SealStamp } from "@/components/seal-stamp";
import { SpecimenCard } from "@/components/specimen-card";
import { getProductBySlug, getProducts } from "@/lib/products";
import { whatsappLink } from "@/lib/whatsapp";

export function generateStaticParams() {
  return getProducts().map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const product = getProductBySlug((await params).slug);
  if (!product) return { title: "Nos Fleurs" };
  return {
    title: `${product.name} — Nos Fleurs`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [{ url: product.image, alt: product.name }],
    },
  };
}

export default async function ProductoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const available = product.available !== false;

  const related = getProducts()
    .filter((p) => p.occasion === product.occasion && p.slug !== slug)
    .slice(0, 3);

  return (
    <main className="flex-1 px-6 py-10 sm:px-12 sm:py-16">
      <Link
        href="/catalogo"
        className="font-mono text-xs uppercase tracking-wider text-moss transition-colors hover:text-foreground"
      >
        ← Catálogo
      </Link>

      <div className="mt-8 grid gap-10 sm:grid-cols-2">
        <div className="relative aspect-[4/5] w-full overflow-hidden border border-border bg-secondary">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(min-width: 640px) 50vw, 100vw"
            className={`object-cover${!available ? " opacity-60" : ""}`}
            priority
          />
          <SealStamp className="absolute -top-4 -right-4 h-16 w-16" />
          {!available && (
            <div className="absolute inset-0 flex items-end p-4">
              <span className="rounded-sm bg-background/90 px-3 py-1.5 font-mono text-xs uppercase tracking-wider text-foreground">
                Agotado
              </span>
            </div>
          )}
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-wider text-moss">
            {product.occasion}
          </p>
          <h1 className="mt-2 font-heading text-4xl italic">{product.name}</h1>
          <p className="mt-1 font-mono text-xs uppercase tracking-wider text-muted-foreground">
            {product.latin}
          </p>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-foreground/80">
            {product.description}
          </p>
          <p className="mt-8 font-mono text-lg text-brass">{product.price}</p>
          {available ? (
            <a
              href={whatsappLink(`Hola, me interesa el ${product.name}.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center rounded-sm bg-primary px-6 py-3 font-mono text-xs uppercase tracking-wider text-primary-foreground transition hover:scale-[1.02] hover:opacity-90 active:scale-[0.98] motion-reduce:transition-none motion-reduce:hover:scale-100"
            >
              Consultar por WhatsApp
            </a>
          ) : (
            <p className="mt-6 font-mono text-xs uppercase tracking-wider text-muted-foreground">
              Sin stock por el momento
            </p>
          )}
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-16 border-t border-border pt-10">
          <h2 className="font-heading text-2xl italic">
            Más de {product.occasion}
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            {related.map((p) => (
              <SpecimenCard key={p.slug} {...p} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
