import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Escena, type NombreEscena } from "@/components/Escena";
import { Estado, Fuentes } from "@/components/Procedencia";
import Galeria from "@/components/Galeria";
import { fotografias } from "@/data/fotografias";
import { videos } from "@/data/grabaciones";
import { salaPorSlug, salas } from "@/data/museo";

type Props = { params: Promise<{ sala: string }> };

// Salas con página propia: no usan esta plantilla.
const PROPIAS = ["biblioteca", "alfonso-arrivillaga-cortes", "fonoteca", "atlas"];

// Escena de cabecera y aviso de estado de cada sala.
const CABECERA: Record<string, { escena: NombreEscena; aviso?: string }> = {
  "la-casa": { escena: "legado" },
  "archivo-visual": { escena: "memoria" },
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
              <div className="flex flex-wrap items-end justify-between gap-6">
                <h2 id="galeria" className="max-w-[18ch] text-(length:--text-titulo)">
                  Fotografías de Sylvia Shaw Arrivillaga
                </h2>
                <p className="max-w-[46ch] text-tinta-suave">
                  Colección Casa Laruduna. Pulsa una imagen para verla a pantalla completa con su
                  ficha.
                </p>
              </div>
              <Galeria fotos={fotografias} />
            </section>
          )}

          {sala.slug === "archivo-visual" && videos.length > 0 && (
            <section aria-labelledby="videos" className="pt-12 md:pt-20">
              <h2 id="videos" className="text-(length:--text-titulo)">
                Vídeo de campo
              </h2>
              <ul className="mt-8 space-y-12">
                {videos.map((v) => (
                  <li key={v.id} data-revelar className="grid gap-6 lg:grid-cols-[1.6fr_1fr] lg:gap-12">
                    <video
                      controls
                      preload="none"
                      poster={v.poster}
                      src={v.archivo}
                      className="w-full bg-carbon"
                    >
                      <a href={v.archivo}>Descargar el vídeo</a>
                    </video>
                    <div>
                      <h3 className="text-[clamp(1.5rem,1.2rem+1vw,2.2rem)] leading-tight">{v.titulo}</h3>
                      <p className="mt-2 text-(length:--text-nota) text-tinta-suave">
                        {[v.lugar, v.fecha, v.duracion].filter(Boolean).join(". ")}
                      </p>
                      <p className="mt-4 max-w-[48ch]">{v.descripcion}</p>
                      {v.nota && (
                        <p className="mt-4 border-l border-arcilla pl-4 text-(length:--text-nota) text-arcilla">
                          {v.nota}
                        </p>
                      )}
                      <p className="mt-4 flex flex-col gap-1">
                        <Estado estado={v.estado} />
                        <Fuentes ids={v.fuentes} />
                      </p>
                    </div>
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
