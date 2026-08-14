import type { Metadata } from "next";
import Link from "next/link";
import { deleteProduct, logout } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "Admin — Nos Fleurs",
};

export default function AdminDashboardPage() {
  const products = getProducts();

  return (
    <main className="flex-1 px-6 py-16 sm:px-12 sm:py-24">
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <div>
          <span className="font-mono text-xs uppercase tracking-wider text-moss">
            Admin
          </span>
          <h1 className="mt-2 font-heading text-3xl italic">Catálogo</h1>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button asChild variant="outline" className="rounded-sm">
            <Link href="/admin/categorias">Categorías</Link>
          </Button>
          <Button asChild variant="outline" className="rounded-sm">
            <Link href="/admin/productos/nuevo">Nuevo producto</Link>
          </Button>
          <form action={logout}>
            <Button type="submit" variant="ghost" className="rounded-sm">
              Cerrar sesión
            </Button>
          </form>
        </div>
      </div>

      <div className="mt-10 overflow-x-auto border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Ocasión</TableHead>
              <TableHead>Precio</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.slug}>
                <TableCell className="font-heading italic">{product.name}</TableCell>
                <TableCell>{product.occasion}</TableCell>
                <TableCell className="font-mono text-brass">{product.price}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button asChild variant="outline" size="sm" className="rounded-sm">
                      <Link href={`/admin/productos/${product.slug}`}>Editar</Link>
                    </Button>
                    <form action={deleteProduct.bind(null, product.slug)}>
                      <Button
                        type="submit"
                        variant="outline"
                        size="sm"
                        className="rounded-sm text-primary hover:text-primary"
                      >
                        Eliminar
                      </Button>
                    </form>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}
