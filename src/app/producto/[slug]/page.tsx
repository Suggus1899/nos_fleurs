import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SealStamp } from "@/components/seal-stamp";
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
  return { title: product ? `${product.name} — Nos Fleurs` : "Nos Fleurs" };
}

export default async function ProductoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const product = getProductBySlug((await params).slug);
  if (!product) notFound();

  return (
    <main className="flex-1 px-6 py-16 sm:px-12 sm:py-24">
      <Link
        href="/catalogo"
        className="font-mono text-xs uppercase tracking-wider text-moss hover:text-foreground"
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
            className="object-cover"
            priority
          />
          <SealStamp className="absolute -top-4 -right-4 h-16 w-16" />
        </div>

        <div>
          <h1 className="font-heading text-4xl italic">{product.name}</h1>
          <p className="mt-1 font-mono text-xs uppercase tracking-wider text-muted-foreground">
            {product.latin}
          </p>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-foreground/80">
            {product.description}
          </p>
          <p className="mt-8 font-mono text-lg text-brass">{product.price}</p>
          <a
            href={whatsappLink(`Hola, me interesa el ${product.name}.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center rounded-sm bg-primary px-6 py-3 font-mono text-xs uppercase tracking-wider text-primary-foreground transition-opacity hover:opacity-90"
          >
            Consultar por WhatsApp
          </a>
        </div>
      </div>
    </main>
  );
}
