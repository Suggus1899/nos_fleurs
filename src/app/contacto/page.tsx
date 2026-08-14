import type { Metadata } from "next";
import { whatsappLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Contacto — Nos Fleurs",
};

const DETAILS = [
  { label: "WhatsApp", value: "+54 9 11 0000-0000" },
  { label: "Zona de entrega", value: "CABA y alrededores" },
  { label: "Horario", value: "Lun. a sáb. de 9 a 19 h" },
];

export default function ContactoPage() {
  return (
    <main className="flex-1 px-6 py-16 sm:px-12 sm:py-24">
      <span className="font-mono text-xs uppercase tracking-wider text-moss">
        Contacto
      </span>
      <h1 className="mt-2 font-heading text-4xl italic">Escribinos</h1>

      <dl className="mt-10 max-w-sm space-y-4 border-t border-border pt-6">
        {DETAILS.map((item) => (
          <div key={item.label} className="flex justify-between gap-6 text-sm">
            <dt className="font-mono uppercase tracking-wider text-muted-foreground">
              {item.label}
            </dt>
            <dd className="text-right text-foreground/80">{item.value}</dd>
          </div>
        ))}
      </dl>

      <a
        href={whatsappLink("Hola, quería hacer una consulta.")}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 inline-flex items-center rounded-sm bg-primary px-6 py-3 font-mono text-xs uppercase tracking-wider text-primary-foreground transition-opacity hover:opacity-90"
      >
        Consultar por WhatsApp
      </a>
    </main>
  );
}
