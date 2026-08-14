import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { OCCASIONS, type Product } from "@/lib/products";

export function ProductForm({
  action,
  product,
  submitLabel,
  error,
}: {
  action: (formData: FormData) => void;
  product?: Product;
  submitLabel: string;
  error?: string;
}) {
  return (
    <form action={action} className="mt-8 max-w-lg space-y-5">
      <div className="space-y-1.5">
        <Label htmlFor="name">Nombre</Label>
        <Input id="name" name="name" defaultValue={product?.name} required />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="latin">Nombre científico</Label>
        <Input id="latin" name="latin" defaultValue={product?.latin} required />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="price">Precio</Label>
          <Input
            id="price"
            name="price"
            defaultValue={product?.price}
            placeholder="$12.90"
            required
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="occasion">Ocasión</Label>
          <select
            id="occasion"
            name="occasion"
            defaultValue={product?.occasion ?? OCCASIONS[0]}
            required
            className="h-9 w-full rounded-sm border border-border bg-card px-3 text-sm"
          >
            {OCCASIONS.map((occasion) => (
              <option key={occasion} value={occasion}>
                {occasion}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="image">URL de imagen</Label>
        <Input id="image" name="image" defaultValue={product?.image} required />
        <p className={error ? "text-xs text-primary" : "text-xs text-muted-foreground"}>
          {error
            ? "La URL debe empezar con https://images.pexels.com/"
            : "Por ahora debe alojarse en images.pexels.com."}
        </p>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="description">Descripción</Label>
        <Textarea
          id="description"
          name="description"
          defaultValue={product?.description}
          rows={4}
          required
        />
      </div>

      <Button type="submit" className="rounded-sm">
        {submitLabel}
      </Button>
    </form>
  );
}
