import Link from "next/link";

const NAV = [
  { href: "/catalogo", label: "Catálogo" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
];

export function SiteHeader() {
  return (
    <header className="flex flex-col gap-3 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-0 sm:px-12">
      <Link href="/" className="font-heading text-lg italic whitespace-nowrap">
        Nos Fleurs
      </Link>
      <nav className="flex gap-4 font-mono text-xs uppercase tracking-wider text-moss sm:gap-6">
        {NAV.map((item) => (
          <Link key={item.href} href={item.href} className="py-2 sm:py-0">
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
