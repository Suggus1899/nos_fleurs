import Link from "next/link";
import { MobileNav } from "@/components/mobile-nav";
import { NAV_LINKS } from "@/lib/nav";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 flex items-center justify-between border-b border-border bg-background px-6 py-4 sm:px-12">
      <Link href="/" className="font-heading text-lg italic whitespace-nowrap">
        Nos Fleurs
      </Link>
      <nav className="hidden gap-6 font-mono text-xs uppercase tracking-wider text-moss sm:flex">
        {NAV_LINKS.map((item) => (
          <Link key={item.href} href={item.href} className="hover:text-foreground">
            {item.label}
          </Link>
        ))}
      </nav>
      <MobileNav />
    </header>
  );
}
