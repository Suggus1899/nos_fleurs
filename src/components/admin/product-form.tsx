import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Product } from "@/lib/products";

export function ProductForm({
  action,
  product,
  occasions,
  submitLabel,
  error,
}: {
  action: (formData: FormData) => void;
  product?: Product;
  occasions: string[];
  submitLabel: string;
  error?: string;
}) {
  return (
    <form
      action={action}
      encType="multipart/form-data"
      className="mt-8 max-w-lg space-y-5"
    >
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
            defaultValue={product?.occasion ?? occasions[0]}
            required
            className="h-9 w-full rounded-sm border border-border bg-card px-3 text-sm"
          >
            {occasions.map((occasion) => (
              <option key={occasion} value={occasion}>
                {occasion}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="image">Foto</Label>
        {product?.image && (
          <div className="relative aspect-[4/5] w-28 overflow-hidden border border-border bg-secondary">
            <Image
              src={product.image}
              alt=""
              fill
              sizes="112px"
              className="object-cover"
            />
          </div>
        )}
        <Input
          id="image"
          name="image"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          required={!product}
        />
        <p className={error ? "text-xs text-primary" : "text-xs text-muted-foreground"}>
          {error
            ? "Subí una imagen válida: JPG, PNG o WEBP, hasta 5 MB."
            : product
              ? "Dejalo vacío para mantener la foto actual. JPG, PNG o WEBP, hasta 5 MB."
              : "JPG, PNG o WEBP, hasta 5 MB."}
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

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="available"
          name="available"
          defaultChecked={product?.available !== false}
          className="h-4 w-4 accent-primary"
        />
        <Label htmlFor="available" className="cursor-pointer">
          Disponible para pedido
        </Label>
      </div>

      <Button type="submit" className="rounded-sm">
        {submitLabel}
      </Button>
    </form>
  );
}
