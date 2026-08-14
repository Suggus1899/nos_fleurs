import Link from "next/link";
import { whatsappLink } from "@/lib/whatsapp";
import { INSTAGRAM_URL } from "@/lib/social";

const EXPLORE = [
  { href: "/catalogo", label: "Catálogo" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
];

const HELP = [
  { href: "/cuidados", label: "Cuidados" },
  { href: "/preguntas-frecuentes", label: "Preguntas frecuentes" },
  { href: "/envios-y-cambios", label: "Envíos y cambios" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border px-6 py-10 sm:px-12 sm:py-14">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <span className="font-heading text-lg italic">Nos Fleurs</span>
          <p className="mt-3 max-w-[26ch] text-sm text-foreground/70">
            Ramos y arreglos de temporada, catalogados como piezas únicas y
            entregados el mismo día.
          </p>
        </div>

        <div>
          <span className="font-mono text-[11px] uppercase tracking-wider text-moss">
            Explorar
          </span>
          <ul className="mt-3 space-y-2">
            {EXPLORE.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-foreground/80 hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <span className="font-mono text-[11px] uppercase tracking-wider text-moss">
            Ayuda
          </span>
          <ul className="mt-3 space-y-2">
            {HELP.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-foreground/80 hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <span className="font-mono text-[11px] uppercase tracking-wider text-moss">
            Contacto
          </span>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a
                href={whatsappLink("Hola, quería hacer una consulta.")}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/80 hover:text-foreground"
              >
                WhatsApp
              </a>
            </li>
            <li>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/80 hover:text-foreground"
              >
                Instagram
              </a>
            </li>
            <li className="text-foreground/60">Lun. a sáb. de 9 a 19 h</li>
          </ul>
        </div>
      </div>

      <div className="mt-10 flex flex-col gap-2 border-t border-border pt-6 font-mono text-[11px] uppercase tracking-wider text-moss sm:flex-row sm:items-center sm:justify-between">
        <span>Nos Fleurs — Buenos Aires</span>
        <span>Envíos en CABA y alrededores</span>
      </div>
    </footer>
  );
}
