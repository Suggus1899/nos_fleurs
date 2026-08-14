import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { SealStamp } from "@/components/seal-stamp";

type Specimen = {
  code: string;
  name: string;
  latin: string;
  price: string;
};

export function SpecimenCard({ code, name, latin, price }: Specimen) {
  return (
    <Card className="group relative gap-3 rounded-sm border-border bg-card p-5 shadow-none">
      <SealStamp className="absolute -top-3 -right-3 h-10 w-10" />
      <Badge
        variant="outline"
        className="w-fit rounded-none border-moss/40 font-mono text-[11px] tracking-wide text-moss"
      >
        N.° {code}
      </Badge>
      <div className="aspect-[4/5] w-full border border-border bg-secondary" />
      <div>
        <h3 className="font-heading text-xl italic text-foreground">{name}</h3>
        <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
          {latin}
        </p>
      </div>
      <p className="font-mono text-sm text-brass">{price}</p>
    </Card>
  );
}
