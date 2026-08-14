import type { Metadata } from "next";
import { ContactoForm } from "@/components/contacto-form";
import { WHATSAPP_DISPLAY } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Contacto — Nos Fleurs",
  description:
    "Escribinos por WhatsApp para consultas, pedidos o coordinar una entrega en Maracay, Aragua.",
};

const DETAILS = [
  { label: "WhatsApp", value: WHATSAPP_DISPLAY },
  { label: "Zona de entrega", value: "Maracay y alrededores, edo. Aragua" },
  { label: "Horario", value: "Lun. a sáb. de 9 a 19 h" },
];

export default function ContactoPage() {
  return (
    <main className="flex-1 px-6 py-10 sm:px-12 sm:py-16">
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

      <ContactoForm />
    </main>
  );
}
