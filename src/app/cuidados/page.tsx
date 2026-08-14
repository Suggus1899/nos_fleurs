import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cuidados — Nos Fleurs",
};

const STEPS = [
  {
    title: "Cortá el tallo en diagonal",
    body: "Apenas llegue tu ramo, cortá 2 cm de cada tallo en ángulo, bajo el agua si podés. Eso evita que se sellen y les cuesta absorber agua.",
  },
  {
    title: "Sacá las hojas bajo la línea del agua",
    body: "Cualquier hoja sumergida acelera la descomposición y ensucia el agua. Dejá solo las flores y el follaje por encima del borde del florero.",
  },
  {
    title: "Cambiá el agua cada dos días",
    body: "Agua tibia y limpia, hasta cubrir un tercio del tallo. Aprovechá para volver a cortar la punta cada vez que la cambies.",
  },
  {
    title: "Alejalas del calor y la fruta",
    body: "Sol directo, calefacción y frutas maduras (liberan etileno) acortan la vida del ramo. El lugar más fresco de la casa es siempre mejor.",
  },
];

export default function CuidadosPage() {
  return (
    <main className="flex-1 px-6 py-16 sm:px-12 sm:py-24">
      <span className="font-mono text-xs uppercase tracking-wider text-moss">
        Guía
      </span>
      <h1 className="mt-2 max-w-lg font-heading text-4xl italic leading-tight">
        Cómo cuidar tu ramo
      </h1>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-foreground/80">
        Flores de temporada, con los cuidados justos, duran entre 6 y 10 días.
        Estos cuatro pasos alcanzan.
      </p>

      <ol className="mt-10 max-w-lg space-y-8 border-t border-border pt-8">
        {STEPS.map((step, i) => (
          <li key={step.title} className="flex gap-4">
            <span className="font-mono text-sm text-brass">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <h2 className="font-heading text-lg italic">{step.title}</h2>
              <p className="mt-1 text-sm leading-relaxed text-foreground/80">
                {step.body}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </main>
  );
}
