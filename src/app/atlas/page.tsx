import type { Metadata } from "next";
import { Escena } from "@/components/Escena";
import { lugares } from "@/data/lugares";
import { salaPorSlug } from "@/data/museo";
import Mapa from "./Mapa";

const sala = salaPorSlug("atlas")!;

export const metadata: Metadata = {
  title: "Atlas",
  description: sala.resumen,
  alternates: { canonical: "/atlas" },
};

export default function Atlas() {
  return (
    <main id="museo" className="sobre-oscuro bg-carbon text-marfil">
      <section className="relative flex min-h-[70svh] flex-col justify-end overflow-hidden px-5 pb-14 pt-36 md:px-12 md:pb-20">
        <Escena nombre="territorio" prioridad />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-t from-carbon via-carbon/55 to-carbon/20 md:bg-linear-to-r md:from-carbon md:via-carbon/65 md:to-transparent"
        />
        <div className="relative">
          <p className="text-bronce">Previsualización. El atlas definitivo está en preparación.</p>
          <h1 className="mt-4 text-(length:--text-portada) leading-[0.92]">Atlas</h1>
          <p className="mt-8 max-w-[52ch] text-(length:--text-entrada) leading-snug text-marfil/90">
            {lugares.length} lugares que las fuentes nombran como escenarios del trabajo de la
            casa, del Caribe a la frontera con Chiapas.
          </p>
        </div>
      </section>

      <section aria-label="Mapa de lugares documentados" className="border-y border-marfil/15">
        <Mapa />
      </section>

      <section className="grid gap-12 px-5 py-24 md:px-12 md:py-32 lg:grid-cols-2 lg:gap-24">
        <div>
          <h2 className="text-(length:--text-titulo)">Lo que falta</h2>
          <p className="mt-6 max-w-[52ch] text-marfil/85">
            Los puntos sitúan la población o el área que cita la fuente; no son todavía
            localizaciones comprobadas sobre el terreno. El atlas definitivo enlazará cada lugar
            con sus publicaciones, fotografías y grabaciones.
          </p>
        </div>
        <ul className="list-disc space-y-3 self-end pl-5 marker:text-bronce">
          {sala.pendiente.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}
