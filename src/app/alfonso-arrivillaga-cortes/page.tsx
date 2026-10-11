import type { Metadata } from "next";
import Link from "next/link";
import { Escena } from "@/components/Escena";
import { cronologia } from "@/data/cronologia";
import { salaPorSlug } from "@/data/museo";
import { publicaciones } from "@/data/publicaciones";
import Cronologia from "./Cronologia";

const sala = salaPorSlug("alfonso-arrivillaga-cortes")!;

export const metadata: Metadata = {
  title: "Entre territorios y sonidos: Alfonso Arrivillaga Cortés",
  description: sala.intro,
  alternates: { canonical: "/alfonso-arrivillaga-cortes" },
};

const datosEstructurados = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Alfonso Arrivillaga Cortés",
  jobTitle: "Antropólogo y etnomusicólogo",
  affiliation: { "@type": "CollegeOrUniversity", name: "Universidad de San Carlos de Guatemala" },
};

export default function ExposicionAlfonso() {
  const anios = cronologia.map((h) => Math.floor(h.orden));
  const revisados = cronologia.filter((h) => h.estado === "revisado").length;

  return (
    <main id="museo" className="sobre-oscuro bg-carbon text-marfil">
      <section className="relative flex min-h-svh flex-col justify-end overflow-hidden px-5 pb-16 pt-36 md:px-12 md:pb-24">
        <Escena nombre="sonido" prioridad />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-t from-carbon via-carbon/60 to-carbon/20 md:bg-linear-to-r md:from-carbon md:via-carbon/70 md:to-transparent"
        />
        <div className="relative">
          <p className="text-bronce">Exposición permanente</p>
          <h1 className="mt-4 max-w-[13ch] text-(length:--text-portada) leading-[0.92]">
            Entre territorios y sonidos
          </h1>
          <p className="mt-6 font-serif text-(length:--text-titulo) leading-none text-marfil/90">
            Alfonso Arrivillaga Cortés
          </p>
          <p className="mt-8 max-w-[54ch] text-(length:--text-entrada) leading-snug text-marfil/85">
            {sala.intro}
          </p>
          <dl className="mt-12 grid max-w-3xl grid-cols-3 gap-6 border-t border-marfil/20 pt-6">
            {[
              [`${Math.min(...anios)}-${Math.max(...anios)}`, "periodo que cubre la cronología"],
              [String(cronologia.length), `hitos, ${revisados} revisados con su fuente`],
              [String(publicaciones.length), "obras escritas y sonoras catalogadas"],
            ].map(([cifra, rotulo]) => (
              <div key={rotulo}>
                <dt className="font-serif text-(length:--text-titulo) leading-none text-bronce">
                  {cifra}
                </dt>
                <dd className="mt-2 text-(length:--text-nota) text-marfil/70">{rotulo}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <Cronologia />

      <section className="bg-verde px-5 py-24 md:px-12 md:py-32">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-24">
          <div>
            <h2 className="text-(length:--text-titulo)">Lo que falta</h2>
            <p className="mt-6 max-w-[52ch] text-marfil/85">
              Esta cronología solo recoge lo que consta en publicaciones. Las fechas dudosas están
              marcadas y esperan confirmación de Alfonso o de la familia.
            </p>
          </div>
          <ul className="list-disc space-y-3 self-end pl-5 marker:text-bronce">
            {sala.pendiente.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>
        <p className="mt-14 flex flex-wrap gap-4">
          <Link
            href="/biblioteca"
            className="rounded-full bg-marfil px-6 py-3 font-medium text-carbon transition-colors hover:bg-bronce"
          >
            Ver sus obras en la biblioteca
          </Link>
          <Link
            href="/fuentes"
            className="rounded-full border border-marfil/50 px-6 py-3 transition-colors hover:bg-marfil hover:text-verde"
          >
            Consultar las fuentes
          </Link>
        </p>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(datosEstructurados) }}
      />
    </main>
  );
}
