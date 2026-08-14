import Link from "next/link";

const NAV = [
  { href: "/catalogo", label: "Catálogo" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
];

export function SiteHeader() {
  return (
    <header className="flex items-center justify-between px-6 py-5 sm:px-12">
      <Link href="/" className="font-heading text-lg italic">
        Nos Fleurs
      </Link>
      <nav className="flex gap-6 font-mono text-xs uppercase tracking-wider text-moss">
        {NAV.map((item) => (
          <Link key={item.href} href={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
