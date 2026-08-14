import type { Metadata } from "next";
import { login } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const metadata: Metadata = {
  title: "Admin — Nos Fleurs",
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <main className="flex flex-1 items-center justify-center px-6 py-24">
      <form action={login} className="w-full max-w-xs">
        <span className="font-mono text-xs uppercase tracking-wider text-moss">
          Admin
        </span>
        <h1 className="mt-2 font-heading text-3xl italic">Iniciar sesión</h1>

        <div className="mt-8 space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="username">Usuario</Label>
            <Input id="username" name="username" required autoFocus />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="password">Contraseña</Label>
            <Input id="password" name="password" type="password" required />
          </div>
        </div>

        {error && (
          <p className="mt-4 text-sm text-primary">Usuario o contraseña incorrectos.</p>
        )}

        <Button type="submit" className="mt-6 w-full rounded-sm">
          Entrar
        </Button>
      </form>
    </main>
  );
}
