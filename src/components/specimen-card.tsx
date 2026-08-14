import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { SealStamp } from "@/components/seal-stamp";
import type { Product } from "@/lib/products";

export function SpecimenCard({ slug, name, latin, price, image }: Product) {
  return (
    <Link href={`/producto/${slug}`} className="group block">
      <Card className="relative gap-3 rounded-sm border-border bg-card p-5 shadow-none transition-colors group-hover:border-moss/60">
        <div className="relative aspect-[4/5] w-full overflow-hidden border border-border bg-secondary">
          <Image
            src={image}
            alt={name}
            fill
            sizes="(min-width: 640px) 33vw, 100vw"
            className="object-cover"
          />
          <SealStamp className="absolute -top-3 -right-3 h-10 w-10" />
        </div>
        <div>
          <h3 className="font-heading text-xl italic text-foreground">{name}</h3>
          <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
            {latin}
          </p>
        </div>
        <p className="font-mono text-sm text-brass">{price}</p>
      </Card>
    </Link>
  );
}
