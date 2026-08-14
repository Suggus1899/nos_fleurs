import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Envíos y cambios — Nos Fleurs",
};

const SECTIONS = [
  {
    title: "Zonas y tiempos de entrega",
    body: "Entregamos en CABA y alrededores. Los pedidos confirmados antes de las 14 h salen el mismo día; los que llegan después, al día siguiente.",
  },
  {
    title: "Costo de envío",
    body: "El costo varía según la zona y se confirma junto con el pedido por WhatsApp, antes de coordinar el pago.",
  },
  {
    title: "Cambios y cancelaciones",
    body: "Podés modificar o cancelar tu pedido sin costo mientras no haya salido a reparto. Una vez en camino, no se puede cancelar por ser un producto perecedero.",
  },
  {
    title: "Si algo llega mal",
    body: "Si el ramo llega dañado o distinto al pedido, escribinos con una foto dentro de las 24 h y lo reponemos o resolvemos sin cargo.",
  },
];

export default function EnviosYCambiosPage() {
  return (
    <main className="flex-1 px-6 py-16 sm:px-12 sm:py-24">
      <span className="font-mono text-xs uppercase tracking-wider text-moss">
        Ayuda
      </span>
      <h1 className="mt-2 font-heading text-4xl italic">Envíos y cambios</h1>

      <div className="mt-10 max-w-lg space-y-8 border-t border-border pt-8">
        {SECTIONS.map((section) => (
          <div key={section.title}>
            <h2 className="font-heading text-lg italic">{section.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-foreground/80">
              {section.body}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
