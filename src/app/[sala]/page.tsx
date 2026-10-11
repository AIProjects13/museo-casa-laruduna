import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Escena, type NombreEscena } from "@/components/Escena";
import { Estado, Fuentes } from "@/components/Procedencia";
import { fotografias } from "@/data/fotografias";
import { salaPorSlug, salas } from "@/data/museo";

type Props = { params: Promise<{ sala: string }> };

// Salas con página propia: no usan esta plantilla.
const PROPIAS = ["biblioteca", "alfonso-arrivillaga-cortes", "fonoteca", "atlas"];

// Escena de cabecera y aviso de estado de cada sala.
const CABECERA: Record<string, { escena: NombreEscena; aviso?: string }> = {
  "la-casa": { escena: "legado" },
  "archivo-visual": { escena: "memoria", aviso: "Sala en preparación" },
  exposiciones: { escena: "legado", aviso: "Sala en preparación" },
  contacto: { escena: "memoria", aviso: "Todavía sin formulario" },
};

export const dynamicParams = false;

export function generateStaticParams() {
  return salas.filter((s) => !PROPIAS.includes(s.slug)).map((s) => ({ sala: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const sala = salaPorSlug((await params).sala);
  if (!sala) notFound();
  return {
    title: sala.nombre,
    description: sala.resumen,
    alternates: { canonical: `/${sala.slug}` },
  };
}

// Los parámetros de ruta se leen dentro de Suspense, como pide el prerenderizado de Next.
export default function PaginaSala({ params }: Props) {
  return (
    <Suspense>
      <Sala params={params} />
    </Suspense>
  );
}

async function Sala({ params }: Props) {
  const sala = salaPorSlug((await params).sala);
  if (!sala) notFound();
  const cabecera = CABECERA[sala.slug] ?? { escena: "memoria" as const };

  return (
    <main id="museo">
      <section className="sobre-oscuro relative flex min-h-[78svh] flex-col justify-end overflow-hidden bg-carbon px-5 pb-14 pt-36 text-marfil md:px-12 md:pb-20">
        <Escena nombre={cabecera.escena} prioridad />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-t from-carbon via-carbon/60 to-carbon/25 md:bg-linear-to-r md:from-carbon md:via-carbon/70 md:to-transparent"
        />
        <div className="relative">
          <p className="text-bronce">{cabecera.aviso ?? sala.situacion}</p>
          <h1 className="mt-4 max-w-[14ch] text-(length:--text-portada) leading-[0.92]">
            {sala.nombre}
          </h1>
          <p className="mt-8 max-w-[54ch] text-(length:--text-entrada) leading-snug text-marfil/90">
            {sala.intro}
          </p>
        </div>
      </section>

      <div className="grano relative px-5 pb-24 md:px-12 md:pb-36">
        <div className="relative">
          {sala.slug === "archivo-visual" && fotografias.length > 0 && (
            <section aria-labelledby="galeria" className="pt-20 md:pt-28">
              <h2 id="galeria" className="text-(length:--text-titulo)">
                Fotografías
              </h2>
              <ul className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {fotografias.map((f) => (
                  <li key={f.archivo}>
                    <figure>
                      <a href={f.archivo}>
                        <img src={f.archivo} alt={f.descripcion} loading="lazy" className="w-full bg-marfil" />
                      </a>
                      <figcaption className="mt-3">
                        <span className="block font-serif text-xl leading-tight">{f.titulo}</span>
                        <span className="block text-(length:--text-nota) text-tinta-suave">
                          {[f.fecha, f.lugar, f.credito].filter(Boolean).join(". ")}
                        </span>
                        <span className="mt-1 flex flex-wrap gap-x-4">
                          <Estado estado={f.estado} />
                          <Fuentes ids={f.fuentes} />
                        </span>
                      </figcaption>
                    </figure>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {sala.hechos.length > 0 && (
            <section aria-labelledby="documentado" className="pt-20 md:pt-28">
              <h2 id="documentado" className="text-(length:--text-titulo)">
                Lo documentado
              </h2>
              <ul className="mt-8 border-t border-tinta/20">
                {sala.hechos.map((h) => (
                  <li
                    key={h.texto}
                    data-revelar
                    className="grid gap-3 border-b border-tinta/20 py-7 lg:grid-cols-[1.6fr_1fr] lg:gap-16"
                  >
                    <p className="max-w-[64ch]">{h.texto}</p>
                    <p className="flex flex-col gap-1">
                      <Estado estado={h.estado} />
                      <Fuentes ids={h.fuentes} />
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {sala.pendiente.length > 0 && (
            <section aria-labelledby="pendiente" className="max-w-[64ch] pt-20 md:pt-28">
              <h2 id="pendiente" className="text-(length:--text-titulo)">
                Lo que falta
              </h2>
              <ul className="mt-8 list-disc space-y-3 pl-5 marker:text-bronce">
                {sala.pendiente.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
    </main>
  );
}
