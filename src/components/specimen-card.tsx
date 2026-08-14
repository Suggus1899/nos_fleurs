import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { SealStamp } from "@/components/seal-stamp";
import type { Product } from "@/lib/products";

export function SpecimenCard({ slug, name, latin, price, image, available = true }: Product) {
  return (
    <Link href={`/producto/${slug}`} className="group block">
      <Card className="relative gap-3 rounded-sm border-border bg-card p-5 shadow-none transition-all duration-300 group-hover:-translate-y-1 group-hover:border-moss/60 group-hover:shadow-md motion-reduce:transition-none motion-reduce:group-hover:translate-y-0">
        <div className="relative aspect-[4/5] w-full overflow-hidden border border-border bg-secondary">
          <Image
            src={image}
            alt={name}
            fill
            sizes="(min-width: 640px) 33vw, 100vw"
            className={`object-cover transition-transform duration-300 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100 ${!available ? "opacity-50" : ""}`}
          />
          <SealStamp className="absolute -top-3 -right-3 h-10 w-10" />
          {!available && (
            <div className="absolute inset-0 flex items-end justify-start p-3">
              <span className="rounded-sm bg-background/90 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-foreground">
                Agotado
              </span>
            </div>
          )}
        </div>
        <div>
          <h3 className="font-heading text-xl italic text-foreground">{name}</h3>
          <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
            {latin}
          </p>
        </div>
        <p className="font-mono text-sm text-brass transition-colors group-hover:text-primary">
          {price}
        </p>
      </Card>
    </Link>
  );
}
