import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Preguntas frecuentes — Nos Fleurs",
};

const FAQS = [
  {
    q: "¿Cómo hago un pedido?",
    a: "Elegí un ramo del catálogo y consultanos por WhatsApp, o escribinos directamente si querés algo a medida.",
  },
  {
    q: "¿Cuánto tarda la entrega?",
    a: "Entregamos el mismo día si el pedido se confirma antes de las 14 h. Fuera de ese horario, coordinamos para el día siguiente.",
  },
  {
    q: "¿A qué zonas entregan?",
    a: "Maracay y alrededores, dentro del estado Aragua. Consultanos tu dirección por WhatsApp para confirmar cobertura.",
  },
  {
    q: "¿Puedo personalizar un ramo?",
    a: "Sí. Contanos colores, flores favoritas o una ocasión especial y ajustamos el arreglo antes de confirmarlo.",
  },
  {
    q: "¿Cómo cuido las flores para que duren más?",
    a: (
      <>
        Dejamos una guía paso a paso en{" "}
        <Link href="/cuidados" className="underline hover:text-foreground">
          Cuidados
        </Link>
        .
      </>
    ),
  },
  {
    q: "¿Puedo cambiar o cancelar un pedido?",
    a: (
      <>
        Sí, mientras no haya salido a reparto. Los detalles están en{" "}
        <Link href="/envios-y-cambios" className="underline hover:text-foreground">
          Envíos y cambios
        </Link>
        .
      </>
    ),
  },
];

export default function PreguntasFrecuentesPage() {
  return (
    <main className="flex-1 px-6 py-10 sm:px-12 sm:py-16">
      <span className="font-mono text-xs uppercase tracking-wider text-moss">
        Ayuda
      </span>
      <h1 className="mt-2 font-heading text-4xl italic">Preguntas frecuentes</h1>

      <dl className="mt-10 max-w-lg divide-y divide-border border-t border-border">
        {FAQS.map((item) => (
          <div key={item.q} className="py-6">
            <dt className="font-heading text-lg italic">{item.q}</dt>
            <dd className="mt-2 text-sm leading-relaxed text-foreground/80">
              {item.a}
            </dd>
          </div>
        ))}
      </dl>
    </main>
  );
}
